import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
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

export const metadata: Metadata = pageMetadata({
  title: 'Web Design George & Garden Route',
  description: 'Business websites, online stores and redesigns by Cameron at Pixaloom in George. Serving South Africa. View real work, compare costs and discuss your website.',
  path: '/',
});

const archiveSlugs = ['emberwell', 'layerforge', 'illumi'];
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
  name: 'Web Design George & Garden Route | Pixaloom',
  description: site.description,
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
        <section className="home-buying-guide" aria-labelledby="website-project-title">
          <div className="site-container">
            <p className="eyebrow">Your website project</p>
            <h2 id="website-project-title">Make it easy to choose your business.<br /><em>And easy to contact you.</em></h2>
            <p className="lead">Work directly with Cameron Falck, a website designer and developer in George. Start with what you sell, who you serve and how customers should enquire. We’ll help you choose the right scope before committing to a build.</p>
            <div className="buying-options">
              <article><h3>A new business website</h3><p>Clear service pages, mobile layouts and call, WhatsApp or form enquiries. A focused five-page custom build has a planning range of R35,000–R55,000; smaller template briefs can be scoped separately.</p><Link href="/services/website-design">Explore website design <ArrowUpRight size={16} /></Link></article>
              <article><h3>An online store</h3><p>Plan products, payments, delivery and who keeps the catalogue up to date. Start with the practical requirements before choosing the platform.</p><Link href="/blog/ecommerce-website-south-africa">Read the ecommerce planning guide <ArrowUpRight size={16} /></Link><Link href="/services/ecommerce-websites">Explore ecommerce development <ArrowUpRight size={16} /></Link></article>
              <article><h3>A better existing website</h3><p>Bring your current URL and what needs to change. We review the pages worth keeping, the mobile experience and the steps between arriving and making an enquiry.</p><Link href="/contact">Discuss your redesign <ArrowUpRight size={16} /></Link></article>
            </div>
            <p className="buying-scope">Planning figures exclude optional features, recurring costs and VAT where applicable. Your written scope determines the quote. <Link href="/website-cost">Compare website costs and inclusions</Link>.</p>
            <div className="buying-proof"><div><h3>A local business example</h3><p>See the service pages and contact routes in our <Link href="/work/paws-on-route">Paws On Route website case study</Link>, for a George pet grooming and pet sitting business. The selected designs below also include clearly labelled independent concepts.</p></div><div><h3>Start with a short conversation</h3><p>Send your business name, the website you need and any existing URL. You do not need a finished brief or a confirmed budget.</p><a className="text-link" href={`${site.whatsapp}?text=${encodeURIComponent('Hi Cameron, I would like to discuss a website for my business.')}`}>Talk to Cameron on WhatsApp <ArrowUpRight size={16} /></a></div></div>
          </div>
        </section>
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
              <h2 id="home-capabilities-title">Web design, ecommerce, SEO and software—<em>one coherent system.</em></h2>
              <p>Pixaloom is an independent web design and development studio in George, Western Cape. We work with ambitious businesses across South Africa to create fast, search-ready digital experiences that turn attention into action.</p>
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
            <Link href="/website-cost">Website cost in South Africa <ArrowUpRight size={14} /></Link>
            <Link href="/contact">Start a project <ArrowUpRight size={14} /></Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
