import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { CinematicHero } from '@/components/cinematic-hero';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { workItems, type WorkItem } from '@/components/work-items';
import { services } from '@/lib/services';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Web Design South Africa',
  description: 'Pixaloom designs fast, distinctive websites, ecommerce stores and web applications for ambitious South African businesses.',
  path: '/',
});

const archiveSlugs = ['illumi', 'nordflam', 'buildvolume', 'caps-tutor'];
const archiveWork = archiveSlugs
  .map((slug) => workItems.find((item) => item.slug === slug))
  .filter((item): item is WorkItem => Boolean(item));
const collectionThemes = [
  { accent: '#9b8fc4', label: 'Business, made lighter' },
  { accent: '#b46f50', label: 'Warmth, made tangible' },
  { accent: '#8093b2', label: 'Making, made possible' },
  { accent: '#6f82bd', label: 'Learning, reimagined' },
];

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#business`,
  name: site.name,
  url: site.url,
  image: absoluteUrl('/opengraph-image'),
  email: site.email,
  telephone: site.phoneInternational,
  priceRange: 'R10,000–R250,000+',
  address: { '@type': 'PostalAddress', addressLocality: 'George', addressRegion: 'Western Cape', addressCountry: 'ZA' },
  areaServed: { '@type': 'Country', name: 'South Africa' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web design and digital services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.name, url: absoluteUrl(`/services/${service.slug}`) },
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
          <span className="exhibit-browser-bar"><i /><i /><i /><em>pixaloom / {item.slug}</em></span>
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

        <section className="reference-archive" id="work-archive">
          <div className="reference-archive-intro">
            <p>Selected works · 2024—2026</p>
            <h2>Digital work,<br /><em>composed with intent.</em></h2>
            <Link href="/projects">All projects <ArrowDown size={13} /></Link>
          </div>
          <div className="reference-collections">
            {archiveWork.map((item, index) => <ArchiveCollection item={item} index={index} key={item.slug} />)}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
