import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { RescueIntro } from '@/components/rescue-intro';
import { PlanningGuides } from '@/components/planning-guides';
import { CinematicHero } from '@/components/cinematic-hero';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { workItems, type WorkItem } from '@/components/work-items';
import { services } from '@/lib/services';
import { aiRescueService } from '@/lib/ai-rescue';
import { contentModified } from '@/lib/content-dates';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Web Design South Africa & AI App Rescue',
  description: site.description,
  path: '/',
});

const archiveSlugs = ['nordflam', 'buildvolume', 'illumi'];
const homeServices = [aiRescueService, ...services.map(service => ({ name: service.name, path: `/services/${service.slug}`, description: service.promise }))];
const archiveWork = archiveSlugs
  .map((slug) => workItems.find((item) => item.slug === slug))
  .filter((item): item is WorkItem => Boolean(item));
const collectionThemes = [
  { accent: '#b46f50', label: 'Warmth, made tangible' },
  { accent: '#8093b2', label: 'Making, made possible' },
  { accent: '#9b8fc4', label: 'Business, made lighter' },
];

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site.url}/#webpage`,
  url: site.url,
  name: 'Web Design South Africa & AI App Rescue | Pixaloom',
  description: site.description,
  inLanguage: 'en-ZA',
  isPartOf: { '@id': `${site.url}/#website` },
  about: { '@id': `${site.url}/#organization` },
  dateModified: contentModified('/'),
  primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl('/opengraph-image') },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Pixaloom AI project help and digital services',
    itemListElement: homeServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: absoluteUrl(service.path),
    })),
  },
};

function ArchiveCollection({ item, index }: { item: WorkItem; index: number }) {
  const summary = item.scope.split('\n')[0];
  const theme = collectionThemes[index % collectionThemes.length];

  return (
    <article
      className={`work-exhibit exhibit-${index + 1}`}
      data-depth-section
      style={{ '--collection-accent': theme.accent } as CSSProperties}
    >
      <header className="exhibit-heading">
        <div className="exhibit-index">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <i />
          <p>{item.category} · Selected work</p>
        </div>
        <p className="exhibit-theme">{theme.label}</p>
        <h2>{item.name}</h2>
      </header>

      <div className="exhibit-art">
        <div className="exhibit-aura" aria-hidden="true" />
        <Link className="exhibit-window exhibit-window-main" href={`/work/${item.slug}`} aria-label={`View ${item.name}`} data-depth="0.045">
          <span className="exhibit-screen" style={{ position: 'relative' }}>
            <Image src={item.png} alt={`${item.name} project interface`} fill quality={92} sizes="(max-width: 720px) 100vw, 72vw" />
          </span>
        </Link>
        <span className="exhibit-count">{String(index + 1).padStart(2, '0')} / {String(archiveWork.length).padStart(2, '0')}</span>
      </div>

      <footer className="exhibit-foot">
        <p>{summary}</p>
        <div>
          <span>{item.meta}</span>
          <Link href={`/work/${item.slug}`}>Explore case study <ArrowUpRight size={13} /></Link>
        </div>
      </footer>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="reference-home">
        <JsonLd id="home-schema" data={homeSchema} />

        <CinematicHero />
        <RescueIntro />

        <section className="reference-archive" id="work-archive">
          <div className="reference-archive-intro">
            <p>Selected works · 2024—2026</p>
            <h2>Digital work,<br /> <em>composed with intent.</em></h2>
            <Link href="/projects">All projects <ArrowDown size={13} /></Link>
          </div>
          <div className="reference-collections">
            {archiveWork.map((item, index) => <ArchiveCollection item={item} index={index} key={item.slug} />)}
          </div>
        </section>

        <section className="home-capabilities" aria-labelledby="home-capabilities-title">
          <div className="home-capabilities-heading">
            <p>What we build · South Africa</p>
            <div>
              <h2 id="home-capabilities-title">AI project help, backed by <em>web development.</em></h2>
              <p>Our focus is helping people finish, connect and launch projects started with AI. Based in George, Western Cape, Pixaloom also builds custom websites, ecommerce stores and web applications for businesses across South Africa.</p>
            </div>
          </div>
          <ol className="home-capabilities-list">
            {homeServices.map((service, index) => (
              <li key={service.path}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Link href={service.path}>
                  <strong>{service.name}</strong>
                  <p>{service.description}</p>
                  <ArrowUpRight size={15} />
                </Link>
              </li>
            ))}
          </ol>
          <div className="home-capabilities-foot">
            <p>Based in George · Working nationwide</p>
            <Link href="/locations/george">Web design in George <ArrowUpRight size={14} /></Link>
            <Link href="/website-cost">Website cost in South Africa <ArrowUpRight size={14} /></Link>
            <Link href="/website-offer">Websites for R3000 <ArrowUpRight size={14} /></Link>
            <Link href="/contact">Start a project <ArrowUpRight size={14} /></Link>
          </div>
        </section>

        <PlanningGuides slugs={['ai-app-launch-checklist', 'how-much-does-website-cost-south-africa', 'ecommerce-website-south-africa']} heading="Planning a website or finishing an app?" />
      </main>
      <Footer />
    </>
  );
}
