import { Fragment } from 'react';

export function safeHref(href: string): string | undefined {
  if (/\s|[\u0000-\u001f\\]/u.test(href)) return undefined;
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  if (href.startsWith('#')) return href;
  try { const url = new URL(href); return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : undefined; } catch { return undefined; }
}

export function InlineText({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^\s)]+\))/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) { const href = safeHref(link[2]); return href ? <a key={index} href={href}>{link[1]}</a> : <Fragment key={index}>{link[1]}</Fragment>; }
    return <Fragment key={index}>{part}</Fragment>;
  })}</>;
}

// Deliberately small, escaped Markdown subset. Raw HTML is always text.
export function ArticleContent({ content }: { content: string }) {
  const lines = content.replaceAll('\r\n', '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  for (let i = 0; i < lines.length;) {
    if (!lines[i].trim()) { i++; continue; }
    const heading = /^(#{1,3})\s+(.+)$/.exec(lines[i]);
    if (heading) {
      const Tag = heading[1].length === 3 ? 'h3' : 'h2';
      blocks.push(<Tag key={i}><InlineText text={heading[2]} /></Tag>); i++; continue;
    }
    const ordered = /^\d+\.\s+/.test(lines[i]);
    const listPattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
    if (listPattern.test(lines[i])) {
      const start = i; const items = [];
      while (i < lines.length && listPattern.test(lines[i])) { items.push(<li key={i}><InlineText text={lines[i].replace(listPattern, '')} /></li>); i++; }
      blocks.push(ordered ? <ol key={start}>{items}</ol> : <ul key={start}>{items}</ul>); continue;
    }
    const start = i; const paragraph = [lines[i++]];
    while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|[-*]\s|\d+\.\s)/.test(lines[i])) paragraph.push(lines[i++]);
    blocks.push(<p key={start}><InlineText text={paragraph.join(' ')} /></p>);
  }
  return <div className="article-body">{blocks}</div>;
}
