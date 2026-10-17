// Diagnostics for this site's server-rendered HTML, not a general HTML parser.
export function plainText(html) {
  return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|amp|quot|#39|#x27);/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}

export function mainContent(html) {
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
}

export function canonicalProblems(values, expected) {
  if (values.length !== 1) return [`expected one canonical URL, found ${values.length}`];
  try {
    const canonical = new URL(values[0]);
    if (!['https:', 'http:'].includes(canonical.protocol)) throw new Error('Not a web URL');
    // Queries, fragments and trailing slashes can identify different resources.
    // Do not normalize them away when checking the sitemap's preferred URL.
    return canonical.href === new URL(expected).href ? [] : [`canonical is ${canonical.href}, expected ${expected}`];
  } catch {
    return [`canonical must be an absolute web URL: ${values[0] || '(empty)'}`];
  }
}

// Googlebot rule selection and longest-path matching for this site's robots.txt.
// Percent-encoded, non-ASCII matching is outside this audit's ASCII route set.
export function robotsAllows(robots, value, agent = 'Googlebot') {
  const groups = [];
  let current;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const field = line.slice(0, separator).trim().toLowerCase();
    const content = line.slice(separator + 1).trim();
    if (field === 'user-agent') {
      if (!current || current.startedRules) {
        current = { agents: [], rules: [], startedRules: false };
        groups.push(current);
      }
      current.agents.push(content.toLowerCase());
    } else if (current && ['allow', 'disallow'].includes(field)) {
      current.startedRules = true;
      if (content) current.rules.push({ allow: field === 'allow', path: content });
    }
  }
  const name = agent.toLowerCase();
  const selected = groups.filter(group => group.agents.includes(name));
  const relevant = selected.length ? selected : groups.filter(group => group.agents.includes('*'));
  const url = new URL(value, 'https://www.pixaloom.co.za');
  const target = `${url.pathname}${url.search}`;
  const matches = relevant.flatMap(group => group.rules).filter(rule => {
    const anchored = rule.path.endsWith('$');
    const pattern = (anchored ? rule.path.slice(0, -1) : rule.path)
      .split('*').map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*');
    return new RegExp(`^${pattern}${anchored ? '$' : ''}`).test(target);
  }).sort((a, b) => b.path.replace(/[*$]/g, '').length - a.path.replace(/[*$]/g, '').length || Number(b.allow) - Number(a.allow));
  return matches[0]?.allow ?? true;
}

// Next.js emits standard URL/width candidates; inline data placeholders are
// deliberately excluded from network checks.
export function renderedImageSources(attributes) {
  const candidates = [attributes.src, attributes.poster,
    ...[...(attributes.srcset || '').matchAll(/(?:^|,\s*)(\S+)\s+\d+(?:\.\d+)?[wx](?=\s*(?:,|$))/g)].map(match => match[1])];
  return [...new Set(candidates.filter(Boolean).map(value => value.trim())
    .filter(value => !/^(?:data|blob):/i.test(value)))];
}

export function schemaDates(value) {
  const dates = [];
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.dateModified) dates.push({ url: node.url || node.mainEntityOfPage, modified: node.dateModified });
    for (const child of Object.values(node)) {
      if (Array.isArray(child)) child.forEach(visit);
      else if (child && typeof child === 'object') visit(child);
    }
  }
  visit(value);
  return dates;
}

export function linkGraph(pages) {
  const byPath = new Map(pages.map(page => [page.path, page]));
  const incoming = new Map(pages.map(page => [page.path, new Set()]));
  const contextualIncoming = new Map(pages.map(page => [page.path, new Set()]));
  for (const page of pages) {
    for (const path of new Set(page.internalLinks.map(url => url.pathname))) {
      if (path !== page.path) incoming.get(path)?.add(page.path);
    }
    for (const path of new Set(page.contentLinks)) {
      if (path !== page.path) contextualIncoming.get(path)?.add(page.path);
    }
  }
  const depths = new Map(byPath.has('/') ? [['/', 0]] : []);
  const queue = byPath.has('/') ? ['/'] : [];
  for (let i = 0; i < queue.length; i++) {
    const path = queue[i];
    for (const link of byPath.get(path).internalLinks) {
      if (!byPath.has(link.pathname) || depths.has(link.pathname)) continue;
      depths.set(link.pathname, depths.get(path) + 1);
      queue.push(link.pathname);
    }
  }
  return pages.map(page => ({ path: page.path, depth: depths.get(page.path) ?? null,
    incoming: [...incoming.get(page.path)], contextualIncoming: [...contextualIncoming.get(page.path)] }));
}

export function brokenFragments(pages) {
  const byPath = new Map(pages.map(page => [page.path, new Set(page.ids)]));
  const failures = new Set();
  for (const page of pages) for (const url of page.internalLinks) {
    if (!url.hash || url.hash.startsWith('#:~:text=') || !byPath.has(url.pathname)) continue;
    let fragment;
    try { fragment = decodeURIComponent(url.hash.slice(1)); }
    catch { failures.add(`${page.path}: malformed fragment ${url.hash}`); continue; }
    if (!byPath.get(url.pathname).has(fragment)) failures.add(`${page.path}: missing fragment target ${url.pathname}${url.hash}`);
  }
  return [...failures];
}
