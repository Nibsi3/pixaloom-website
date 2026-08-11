import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { workItems } from '@/components/work-items';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export function generateStaticParams() { return workItems.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = workItems.find((project) => project.slug === slug);
  if (!item) return {};
  const description = item.scope.replace(/\s+/g, ' ').slice(0, 160);
  return pageMetadata({ title: `${item.name} Case Study`, description, path: `/work/${slug}`, image: item.png });
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workItems.find((project) => project.slug === slug);
  if (!item) notFound();
  const index = workItems.findIndex((project) => project.slug === slug);
  const nextProject = workItems[(index + 1) % workItems.length];
  const gallery = item.gallery?.length ? item.gallery : [item.png];
  const schema = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', '@id': absoluteUrl(`/work/${slug}#case-study`), name: `${item.name} case study`, description: item.scope,
    creator: { '@id': `${site.url}/#organization` }, provider: { '@id': `${site.url}/#organization` }, url: absoluteUrl(`/work/${slug}`), mainEntityOfPage: absoluteUrl(`/work/${slug}`), image: absoluteUrl(item.png),
    about: item.stack.map((name) => ({ '@type': 'Thing', name })), inLanguage: 'en-ZA',
  };

  return (
    <>
      <Header />
      <main id="main-content" className="case-study">
        <JsonLd id="work-schema" data={schema} />

        <section className="case-study-hero">
          <div className="site-container">
            <div className="case-nav"><Link href="/projects"><ArrowLeft size={14} /> All work</Link><span>Case study · {String(index + 1).padStart(2, '0')}</span></div>
            <p className="micro-label">{item.category} · Designed &amp; developed by Pixaloom</p>
            <h1>{item.name}</h1>
            <div className="case-hero-foot"><p>{item.meta}</p>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">Visit live project <ExternalLink size={14} /></a> : <span>Selected engagement</span>}</div>
          </div>
        </section>

        <section className="case-stage">
          <div className="case-stage-orbit" aria-hidden="true" />
          <div className="case-stage-image"><Image src={item.png || item.fallback} alt={`${item.name} interface`} fill loading="eager" sizes="100vw" /></div>
          <span className="case-stage-label">Pixaloom archive · {item.category}</span>
        </section>

        <section className="case-brief">
          <div className="site-container case-brief-grid">
            <div><p className="micro-label">The assignment</p><h2>Build the useful thing.<br /><em>Then make it unforgettable.</em></h2></div>
            <div className="case-copy"><p>{item.scope}</p></div>
          </div>
          {item.facts?.length ? <dl className="site-container case-fact-row">{item.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl> : null}
        </section>

        <section className="case-gallery">
          <div className="site-container"><p className="micro-label">Inside the experience · Interface study</p></div>
          <div className="site-container gallery-mosaic">
            {gallery.slice(0, 6).map((image, imageIndex) => (
              <figure className={`gallery-shot gallery-shot-${(imageIndex % 5) + 1}`} key={image}>
                <Image src={image} alt={`${item.name} screen ${imageIndex + 1}`} fill sizes="(max-width: 760px) 100vw, 60vw" />
                <figcaption>{String(imageIndex + 1).padStart(2, '0')} · {item.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-delivery">
          <div className="site-container case-brief-grid">
            <div><p className="micro-label">Capabilities delivered</p><h2>Every layer,<br />working together.</h2></div>
            <ol className="case-outcomes">{item.highlights.map((highlight, highlightIndex) => <li key={highlight}><span>{String(highlightIndex + 1).padStart(2, '0')}</span><p>{highlight}</p></li>)}</ol>
          </div>
        </section>

        {item.sections?.length ? <section className="case-details"><div className="site-container"><p className="micro-label">The system behind the screen</p><div className="case-detail-grid">{item.sections.map((section, sectionIndex) => <article key={section.title}><span>0{sectionIndex + 1}</span><h3>{section.title}</h3>{section.description ? <p>{section.description}</p> : null}{section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</article>)}</div></div></section> : null}

        <section className="case-stack"><div className="site-container case-brief-grid"><div><p className="micro-label">Technology</p><h2>The machinery<br />behind the magic.</h2></div><div className="stack-cloud">{item.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></div></section>

        <Link href={`/work/${nextProject.slug}`} className="next-project">
          <span>Next project · {nextProject.category}</span><strong>{nextProject.name}</strong><ArrowRight size={27} />
        </Link>
      </main>
      <Footer />
    </>
  );
}
