// Diagnostics for this site's server-rendered HTML, not a general HTML parser.
export function plainText(html) {
  return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|amp|quot|#39|#x27);/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}

export function mainContent(html) {
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
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
