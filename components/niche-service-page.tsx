import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { NicheBrief } from '@/components/niche-brief';
import { workItems } from '@/components/work-items';
import { nicheServices, type NicheService } from '@/lib/niche-services';
import { breadcrumbSchema } from '@/lib/schema';
import { contentModified } from '@/lib/content-dates';
import { projectMediaDescription } from '@/lib/project-evidence';
import { absoluteUrl, site } from '@/lib/site';
import '@/app/ai-website-app-rescue/rescue.css';
import './niche-service.css';

export function NicheServicePage({ service }: { service: NicheService }) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    ...(service.parent.path === '/services' ? [] : [service.parent]),
    { name: service.name, path: service.path },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', '@id': absoluteUrl(`${service.path}#service`), name: service.name,
        serviceType: service.name, description: service.description, url: absoluteUrl(service.path),
        provider: { '@id': `${site.url}/#organization` }, areaServed: { '@type': 'Country', name: 'South Africa' } },
      { '@type': 'WebPage', '@id': absoluteUrl(`${service.path}#webpage`), name: service.title,
        url: absoluteUrl(service.path), dateModified: contentModified(service.path),
        about: { '@id': absoluteUrl(`${service.path}#service`) }, isPartOf: { '@id': `${site.url}/#website` } },
      breadcrumbSchema(crumbs),
    ],
  };
  const related = nicheServices.filter(item => item.path !== service.path
    && (service.parent.path === '/services' ? false : item.parent.path === service.parent.path));

  return <><Header /><main id="main-content" className="rescue-page niche-service-page">
    <JsonLd id="niche-service-schema" data={schema} />
    <section className="rescue-hero rescue-shell">
      <nav className="rescue-breadcrumb" aria-label="Breadcrumb">{crumbs.map((crumb, index) => <span key={crumb.path}>
        {index > 0 ? <span aria-hidden="true">/ </span> : null}
        {index === crumbs.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
      </span>)}</nav>
      <p className="rescue-kicker">{service.eyebrow}</p><h1>{service.heading}</h1>
      <p className="rescue-lead">{service.lead}</p>
      <Link className="button button-light" href={service.action.href}>{service.action.label} <ArrowUpRight size={18} /></Link>
      <a className="rescue-link niche-secondary" href="#project-brief">Prepare your project brief</a>
      <p className="rescue-caption">Pixaloom · Based in George, working with South African businesses. Updated <time dateTime={contentModified(service.path)}>7 October 2026</time>.</p>
    </section>
    {service.sections.map((section, index) => <section className="rescue-section" key={section.title}><div className="rescue-shell niche-prose">
      <p className="rescue-kicker">0{index + 1} · Plan the work</p><h2>{section.title}</h2>
      {section.paragraphs.map(paragraph => <p className="rescue-copy" key={paragraph}>{paragraph}</p>)}
    </div></section>)}
    <section className="rescue-section"><div className="rescue-shell">
      <h2>A scope you can verify.</h2>
      <div className="niche-table-scroll" role="region" aria-label={service.table.caption} tabIndex={0}><table>
        <caption>{service.table.caption}</caption>
        <thead><tr>{service.table.headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{service.table.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody>
      </table></div>
      <p className="rescue-copy niche-scope">{service.scope}</p>
      <Link className="rescue-link" href={service.parent.path === '/services' ? '/services/ecommerce-websites' : '/ai-website-app-rescue#packages'}>{service.parent.path === '/services' ? 'Compare with a checkout store' : 'Review rescue packages and terms'} <ArrowUpRight size={16} /></Link>
    </div></section>
    <section className="rescue-section"><div className="rescue-shell">
      <p className="rescue-kicker">Relevant Pixaloom work</p><h2>Inspect the interface and scope.</h2>
      <p className="rescue-copy">These are archived project studies, not measured sales, ranking or rescue outcomes. External websites can change after the captured work.</p>
      <div className="rescue-problems">{service.proof.map(proof => {
        const project = workItems.find(item => item.slug === proof.slug);
        const image = project?.gallery?.[0];
        return project ? <article key={proof.slug}>
          {image ? <figure className="niche-proof"><div className="niche-proof-image"><Image src={image} alt={projectMediaDescription(project, image)} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><figcaption>Archived interface capture · {project.name}</figcaption></figure> : null}
          <h3>{project.name}</h3><p>{proof.description}</p><Link className="rescue-link" href={`/work/${proof.slug}`}>Examine the project <ArrowUpRight size={16} /></Link>
        </article> : null;
      })}</div>
    </div></section>
    <section className="rescue-section" id="project-brief"><div className="rescue-shell niche-prose">
      <p className="rescue-kicker">An actionable starting point</p><h2>Prepare your project brief.</h2>
      <NicheBrief name={service.name} checks={service.checks} />
      <Link className="rescue-link" href={service.action.href}>{service.action.label} <ArrowUpRight size={16} /></Link>
    </div></section>
    <section className="rescue-section"><div className="rescue-shell niche-prose">
      <h2>Before you enquire.</h2><div className="rescue-faqs">{service.questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      {service.sources.length ? <aside className="niche-sources"><h3>Platform documentation</h3><p>Reference guidance for the checks above. Platform features and settings can change; confirm against your project before applying a change.</p><ul>{service.sources.map(source => <li key={source.href}><a className="rescue-link" href={source.href}>{source.label}</a></li>)}</ul></aside> : null}
      {related.length ? <nav className="niche-sources" aria-label="Related rescue help"><h3>Another launch problem?</h3>{related.map(item => <p key={item.path}><Link className="rescue-link" href={item.path}>{item.name} <ArrowUpRight size={16} /></Link></p>)}</nav> : null}
    </div></section>
  </main><Footer /></>;
}
