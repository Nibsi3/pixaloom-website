import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import content from '@/lib/capabilities.json';
import captureSizes from '@/lib/capability-image-sizes.json';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';
import styles from './page.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Development Capabilities & Portfolio CV',
  description: 'Cameron Falck’s Pixaloom portfolio: AI workflows, payment integrations, WordPress, ecommerce and custom software. Explore the work and download the PDF.',
  path: '/capabilities',
});

function Capture({ src, caption, width = 1680, height = 1000 }: { src: string; caption: string; width?: number; height?: number }) {
  const dimensions = (captureSizes as Record<string, { width: number; height: number }>)[src] ?? { width, height };
  return <figure className={styles.capture}>
    <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${caption}`}>
      <Image src={src} alt={caption} width={dimensions.width} height={dimensions.height} sizes="(max-width: 760px) 92vw, 1100px" />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export default function CapabilitiesPage() {
  return <><Header /><main id="main-content" className={styles.page}>
    <JsonLd id="capabilities-schema" data={{ '@context': 'https://schema.org', '@type': 'ProfilePage', name: 'Pixaloom development capabilities', url: absoluteUrl('/capabilities'), dateModified: '2026-10-29', mainEntity: { '@type': 'Person', name: site.editor, url: absoluteUrl('/about'), worksFor: { '@type': 'Organization', name: 'Pixaloom', url: site.url } } }} />
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Cameron Falck / Pixaloom / Selected capabilities</p>
      <h1>From a good idea<br />to a <em>working system.</em></h1>
      <div className={styles.heroBottom}><p>{content.intro}</p><a className={styles.button} href="#portfolio">Explore the work <ArrowDown size={17} /></a></div>
      <div className={styles.signature}><span>Independent developer · George, South Africa</span><span>Custom code + WordPress + integrated systems</span></div>
    </section>

    <nav className={styles.index} aria-label="Capabilities on this page"><a href="#payments">Payments</a><a href="#assistant">AI & data</a><a href="#growth">Organic growth</a><a href="#commerce">Ecommerce</a><a href="#routing">Money routing</a><a href="#clinical">Clinical tools</a><a href="#download">Download CV <Download size={14} /></a></nav>

    <div id="portfolio" className={styles.portfolio}>
      {content.sections.map((section) => <section className={styles.section} id={section.id} key={section.id}>
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>{section.eyebrow}</p><h2>{section.title}</h2><p className={styles.lead}>{section.intro}</p></div>
        {section.id === 'payments' && <div className={styles.providers} aria-label="Supported payment integrations">{content.providers.map((provider) => <span key={provider}>{provider}</span>)}</div>}
        {section.id === 'growth' && <dl className={styles.metrics}><div><dt>Google Search clicks</dt><dd>1,655</dd></div><div><dt>Search impressions</dt><dd>553K</dd></div><div><dt>Average position</dt><dd>9.9</dd></div><div><dt>Click-through rate</dt><dd>0.3%</dd></div></dl>}
        <Capture src={section.image} caption={section.caption} width={section.id === 'assistant' ? 962 : section.id === 'growth' ? 1296 : 1680} height={section.id === 'assistant' ? 740 : section.id === 'growth' ? 527 : 1000} />
        {section.id === 'routing' && <ol className={styles.flow} aria-label="Slip a Tip payment flow">{['Scan worker QR', 'Confirm payment', 'Record fees & balance', 'Clear settlement holds', 'Request withdrawal', 'Track payout outcome'].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>}
        <div className={styles.details}><h3>What sits behind it</h3><ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
        {section.id === 'assistant' && <div className={styles.paired}>
          <Capture src="/capabilities/illumi-assistant.png" caption="Illumi Assistant completing a client record with explicitly fictional test-company details." width={942} height={875} />
          <Capture src="/portfolio/2026-10-19/illumi-detail-1.png" caption="Illumi’s public invoicing page, with an illustrative invoice preview. Sample data, not a customer invoice." width={3200} height={2000} />
        </div>}
        <div className={styles.sectionFoot}><p>{section.note}</p><Link href={section.link}>Explore {section.id === 'growth' ? 'SEO services' : 'the project'} <ArrowUpRight size={15} /></Link></div>
      </section>)}
    </div>

    <section className={styles.more}><p className={styles.eyebrow}>More of the work</p><h2>Different problems.<br /><em>The same care in the build.</em></h2><div className={styles.otherGrid}>{content.other.map((project) => <article key={project.name}><h3>{project.name}</h3><p>{project.description}</p>{project.href && <Link href={project.href}>View work <ArrowUpRight size={15} /></Link>}</article>)}</div><div className={styles.skills}>{content.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>

    <section className={styles.download} id="download"><div><p className={styles.eyebrow}>Keep the portfolio</p><h2>The whole picture.<br /><em>Ready to share.</em></h2><p>Download the Pixaloom capabilities CV: selected projects, product screenshots, technical strengths and the people behind the work.</p><a className={styles.button} href="/downloads/pixaloom-capabilities.pdf" download>Download portfolio CV <Download size={18} /></a><small>9-page PDF · 5.2 MB · Updated {content.date}</small></div><aside><span>Have a project in mind?</span><h3>Let’s build something useful.</h3><p>Tell me what your business needs to do. We can shape the right website, store or custom application around it.</p><Link href="/contact">Talk to Cameron <ArrowUpRight size={17} /></Link><a href={`mailto:${site.email}`}>{site.email}</a></aside></section>
  </main><Footer /></>;
}
