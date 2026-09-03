// Evidence-gated one-time cleanup. Prints an apply_patch patch; never writes files.
const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const root = path.resolve(__dirname, '..');
const dead = new Set(['hero-project-images', 'opening-portal', 'opening-ring', 'opening-mark', 'hero-film', 'hero-orbit', 'orbit-a', 'orbit-b', 'cinematic-copy', 'cinematic-intro', 'hero-project-meta', 'hero-switcher', 'hero-scroll', 'studio-manifesto', 'manifesto-grid', 'manifesto-body', 'selected-work', 'archive-heading', 'round-link', 'project-stories', 'editorial-project', 'editorial-project-2', 'project-index', 'project-story', 'project-collage', 'collage-main', 'collage-detail', 'collage-caption', 'product-lab-section', 'lab-intro']);
const sources = [];
function walk(dir) { for (const item of fs.readdirSync(dir, { withFileTypes: true })) { const file = path.join(dir, item.name); if (item.isDirectory()) walk(file); else if (/\.(tsx?|jsx?)$/.test(file)) sources.push(fs.readFileSync(file, 'utf8')); } }
for (const dir of ['app', 'components', 'lib']) walk(path.join(root, dir));
for (const name of dead) if (sources.some(text => text.includes(name))) throw new Error(`Class may still be referenced: ${name}`);
const file = path.join(root, 'app/globals.css');
const original = fs.readFileSync(file, 'utf8');
const lines = original.split('\n');
const css = postcss.parse(original); const remove = new Set(); let rules = 0;
css.walkRules(rule => {
  if (!rule.selectors.every(selector => [...selector.matchAll(/\.([a-zA-Z][\w-]*)/g)].some(match => dead.has(match[1])))) return;
  const start = rule.source.start.line - 1, end = rule.source.end.line - 1;
  // Preserve shared lines instead of risking a neighbouring declaration.
  if (lines[start].slice(0, rule.source.start.column - 1).trim() || lines[end].slice(rule.source.end.column).trim()) return;
  for (let i = start; i <= end; i++) remove.add(i);
  rules++;
});
const groups = []; let group;
for (const i of [...remove].sort((a,b) => a-b)) { if (!group || i > group.at(-1) + 3) { group = []; groups.push(group); } group.push(i); }
const hunks = groups.map(group => `@@\n${lines.slice(group[0]-1,group.at(-1)+2).map((line,index) => (remove.has(group[0]-1+index) ? '-' : ' ') + line).join('\n')}`).join('\n');
console.log(JSON.stringify({ rules, removedBytes: [...remove].reduce((sum, i) => sum + lines[i].length + 1, 0), patch: `*** Begin Patch\n*** Update File: ${file}\n${hunks}\n*** End Patch` }));
