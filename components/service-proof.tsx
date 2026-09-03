import Link from 'next/link';
import { workItems } from '@/components/work-items';
import { serviceEvidence } from '@/lib/service-evidence';

export function ServiceProof({ slug }: { slug: string }) {
  const evidence = serviceEvidence[slug];
  if (!evidence) return null;
  return <>
    <section className="content-section"><div className="site-container content-grid"><div><p className="eyebrow">Scope and decisions</p><h2>{evidence.title}</h2></div><div className="body-copy">{evidence.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<Link className="text-link" href={`/blog/${evidence.guide}`}>Read the planning guide</Link></div></div></section>
    {evidence.projects.length ? <section className="content-section alt"><div className="site-container"><p className="eyebrow">Relevant work</p><h2>See the interface and the scope.</h2><div className="location-card-grid">{evidence.projects.map(slug => { const project = workItems.find(item => item.slug === slug); return project ? <Link key={slug} href={`/work/${slug}`} className="location-card"><span>{project.category} · Project study</span><h3>{project.name}</h3><p>{project.scope}</p><span className="card-link">Explore the project →</span></Link> : null; })}</div></div></section> : null}
    <section className="content-section"><div className="site-container content-grid"><div><p className="eyebrow">Before sign-off</p><h2>A scope you can verify.</h2><p className="service-budget">{evidence.budget}</p><Link className="text-link" href="/website-cost">Explore planning allowances</Link></div><ul className="detail-list">{evidence.acceptance.map(item => <li key={item}>{item}</li>)}</ul></div></section>
  </>;
}
