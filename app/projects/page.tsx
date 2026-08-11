import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { workItems } from '@/components/work-items';
import { labProjects } from '@/lib/product-lab';
import { absoluteUrl, pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({ title: 'Website Design Portfolio', description: 'Explore websites, ecommerce stores and web applications designed and developed by Pixaloom for South African organisations.', path: '/projects' });

const priorityOrder = ['illumi', 'nordflam', 'buildvolume', 'caps-tutor'];
const orderedWorkItems = [
  ...priorityOrder.map((slug) => workItems.find((item) => item.slug === slug)).filter((item): item is (typeof workItems)[number] => Boolean(item)),
  ...workItems.filter((item) => !priorityOrder.includes(item.slug)),
];
const additionalWork = labProjects.filter((project) => !project.href);
const totalProjects = orderedWorkItems.length + additionalWork.length;
const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Pixaloom website and digital product portfolio',
  url: absoluteUrl('/projects'),
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      ...orderedWorkItems.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: absoluteUrl(`/work/${item.slug}`) })),
      ...additionalWork.map((item, index) => ({ '@type': 'ListItem', position: orderedWorkItems.length + index + 1, name: item.name, url: absoluteUrl(`/projects#${item.name.toLowerCase().replaceAll(' ', '-')}`) })),
    ],
  },
};

export default function ProjectsPage() {
  return <><Header /><main id="main-content" className="minimal-page">
    <JsonLd id="portfolio-schema" data={portfolioSchema} />

    <section className="minimal-hero">
      <div className="minimal-shell">
        <div className="minimal-crumb"><Link href="/">Home</Link><span>/</span><span>Works</span></div>
        <p className="minimal-kicker">Pixaloom archive · 2024—2026</p>
        <h1>Work with a pulse.<br /><em>Products with purpose.</em></h1>
        <div className="minimal-hero-foot"><p>A living collection of websites, ecommerce stores, platforms and practical digital products created for ambitious South African organisations.</p><span>{totalProjects} selected projects</span></div>
      </div>
    </section>

    <section className="minimal-work-index"><div className="minimal-shell">
      <div className="minimal-section-mark"><span>01</span><p>Work index</p></div>
      <div className="minimal-work-list">
        {orderedWorkItems.map((item, index) => <Link href={`/work/${item.slug}`} key={item.slug}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <p>{item.category}</p>
          <h2>{item.name}</h2>
          <em>{item.meta}</em>
          <ArrowUpRight size={17} />
        </Link>)}
        {additionalWork.map((item, index) => {
          const projectIndex = orderedWorkItems.length + index;
          return <article id={item.name.toLowerCase().replaceAll(' ', '-')} key={item.name}>
            <span>{String(projectIndex + 1).padStart(2, '0')}</span>
            <p>{item.category}</p>
            <h2>{item.name}</h2>
            <em>{item.description}</em>
            <strong>Selected work</strong>
          </article>;
        })}
      </div>
    </div></section>

    <section className="minimal-close"><div className="minimal-shell"><p className="minimal-kicker">The next case study</p><h2>Make yours<br /><em>the one people notice.</em></h2><Link href="/contact">Start the conversation <ArrowRight size={15} /></Link></div></section>
  </main><Footer /></>;
}
