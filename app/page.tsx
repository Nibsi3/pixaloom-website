import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { RescueIntro } from '@/components/rescue-intro';
import { CinematicHero } from '@/components/cinematic-hero';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { workItems, type WorkItem } from '@/components/work-items';
import { services } from '@/lib/services';
import { contentModified } from '@/lib/content-dates';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';
import { estimateContactUrl, estimateWebsiteCost, formatRandRange, type ProjectKindId } from '@/lib/website-cost';

const pageTitle = 'Web Design Studio for South African Businesses';
const pageDescription = 'Work online with Cameron Falck in George. See websites Pixaloom has built, compare budgets for a business website or online store and request a quote.';

export const metadata: Metadata = pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/',
});

const archiveSlugs = ['team-colours', 'featherbleu-store', 'illumi'];
const archiveWork = archiveSlugs
  .map((slug) => workItems.find((item) => item.slug === slug))
  .filter((item): item is WorkItem => Boolean(item))
  .map((item): WorkItem => item.slug === 'featherbleu-store' ? {
    ...item,
    name: 'Featherbleu Store',
    category: 'Ecommerce',
    png: '/work/featherbleu-store-2026-10-29.png',
    meta: 'Storefront · Security · Smart Home',
    scope: 'A storefront for security and smart-home products, bringing cameras, access control and gate automation together in a clear, considered shopping experience.',
  } : item.slug === 'team-colours' ? {
    ...item,
    png: '/capabilities/team-colours-clear-headline.png',
  } : item);
const collectionThemes = [
  { accent: '#b46f50', label: 'Shopping, made simple' },
  { accent: '#8093b2', label: 'Smarter spaces, made possible' },
  { accent: '#9b8fc4', label: 'Business, made lighter' },
];

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site.url}/#webpage`,
  url: site.url,
  name: `${pageTitle} | ${site.name}`,
  description: pageDescription,
  inLanguage: 'en-ZA',
  isPartOf: { '@id': `${site.url}/#website` },
  about: { '@id': `${site.url}/#organization` },
  dateModified: contentModified('/'),
  primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl('/opengraph-image') },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Pixaloom web design and digital services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  },
};

function focusedBudget(kind: ProjectKindId) {
  const { min, max } = estimateWebsiteCost(kind, 'focused', []);
  return formatRandRange(min, max);
}

function ArchiveCollection({ item, index }: { item: WorkItem; index: number }) {
  const summary = item.scope.split('\n')[0];
  const theme = collectionThemes[index % collectionThemes.length];
  const projectImage = (
    <span className="exhibit-screen" style={{ position: 'relative' }}>
      <Image src={item.slug === 'illumi' ? '/work/illumi-home-2026-10-29.png' : item.png} alt={`${item.name} project interface`} fill quality={92} sizes="(max-width: 720px) 100vw, 72vw" />
    </span>
  );

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
        {item.slug === 'featherbleu-store' ? (
          <div className="exhibit-window exhibit-window-main" data-depth="0.045">{projectImage}</div>
        ) : (
          <Link className="exhibit-window exhibit-window-main" href={`/work/${item.slug}`} aria-label={`View ${item.name}`} data-depth="0.045">{projectImage}</Link>
        )}
        <span className="exhibit-count">{String(index + 1).padStart(2, '0')} / {String(archiveWork.length).padStart(2, '0')}</span>
      </div>

      <footer className="exhibit-foot">
        <p>{summary}</p>
        <div>
          <span>{item.meta}</span>
          {item.slug !== 'featherbleu-store' && <Link href={`/work/${item.slug}`}>Explore case study <ArrowUpRight size={13} /></Link>}
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
        <section className="home-buying-guide" aria-labelledby="website-project-title">
          <div className="site-container">
            <h2 id="website-project-title">What kind of website <em>does your business need?</em></h2>
            <p className="lead">Work directly with Cameron Falck from the first brief through launch. For businesses in <Link href="/locations/george">George</Link> and across the <Link href="/locations/garden-route">Garden Route</Link>, see how local service and booking websites work. For a first budget, compare these three project types.</p>
            <div className="buying-options">
              <article>
                <h3>A five-page business website</h3>
                <p>Budget <strong>{focusedBudget('business')}</strong> for a custom site that explains your services and gives customers a way to enquire by phone, WhatsApp or form.</p>
                <Link href="/services/website-design">See what a business website includes <ArrowUpRight size={16} /></Link>
              </article>
              <article>
                <h3>An online store</h3>
                <p>Budget <strong>{focusedBudget('ecommerce')}</strong> for a focused store with a product catalogue, checkout and one hosted payment integration.</p>
                <Link href="/services/ecommerce-websites">Explore online store development <ArrowUpRight size={16} /></Link>
                <Link href="/blog/ecommerce-website-south-africa">Plan products, payments and delivery <ArrowUpRight size={16} /></Link>
              </article>
              <article>
                <h3>A website redesign</h3>
                <p>Budget <strong>{focusedBudget('redesign')}</strong> for a focused rebuild that reuses your content. Share your current URL and one thing customers struggle to do on it.</p>
                <Link href={estimateContactUrl('redesign', 'focused', [])}>Request a redesign quote <ArrowUpRight size={16} /></Link>
              </article>
            </div>
            <p className="buying-scope">These build estimates exclude optional features, recurring costs and VAT where applicable. <Link href="/website-cost#cost-estimator">Calculate your first-year website budget</Link> with hosting and other running costs.</p>
            <div className="buying-proof">
              <div>
                <h3>From a grooming page to a booking enquiry</h3>
                <p>A dog owner browsing Paws On Route in George can choose a service and ask about availability on WhatsApp. The booking prompt asks for the pet’s name, breed and service so the groomer can reply with a price.</p>
                <Link className="text-link" href="/work/paws-on-route">See the Paws On Route website <ArrowUpRight size={16} /></Link>
              </div>
              <div>
                <h3>Get a quote for your business</h3>
                <p>Tell Cameron what you sell and what you want a customer to do on your site. Include your existing website if you have one. A few sentences are enough to start.</p>
                <Link className="text-link" href="/contact">Send your website brief <ArrowUpRight size={16} /></Link>
              </div>
            </div>
          </div>
        </section>

        <RescueIntro />

        <section className="reference-archive" id="work-archive" tabIndex={-1} aria-label="Selected work">
          <div className="reference-collections">
            {archiveWork.map((item, index) => <ArchiveCollection item={item} index={index} key={item.slug} />)}
          </div>
        </section>

        <section className="home-capabilities" aria-labelledby="home-capabilities-title">
          <div className="home-capabilities-heading">
            <p>What we build · South Africa</p>
            <div>
              <h2 id="home-capabilities-title">Website design, <em>development and care.</em></h2>
              <p>Alongside websites and stores, Pixaloom builds custom web applications, reviews search visibility and looks after existing sites. Each service sets out what is included and how to brief the work.</p>
            </div>
          </div>
          <ol className="home-capabilities-list">
            {services.map((service, index) => (
              <li key={service.slug}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Link href={`/services/${service.slug}`}>
                  <strong>{service.name}</strong>
                  <p>{service.promise}</p>
                  <ArrowUpRight size={15} />
                </Link>
              </li>
            ))}
          </ol>
          <div className="home-capabilities-foot">
            <p>Based in George · Working nationwide</p>
            <Link href="/locations/george">Web design in George <ArrowUpRight size={14} /></Link>
            <Link href="/capabilities">Explore our capabilities & download the CV <ArrowUpRight size={14} /></Link>
            <Link href="/website-cost">Website cost in South Africa <ArrowUpRight size={14} /></Link>
            <Link href="/contact">Start a project <ArrowUpRight size={14} /></Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
