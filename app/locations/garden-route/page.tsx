import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { services } from '@/lib/services';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Web Design on the Garden Route',
  description:
    'Web design for Garden Route businesses—from Mossel Bay and George to Knysna, Wilderness and Plettenberg Bay. Fast sites, local search and conversion paths that work on mobile.',
  path: '/locations/garden-route',
});

const towns = [
  'Mossel Bay',
  'Hartenbos',
  'Great Brak River',
  'George',
  'Wilderness',
  'Sedgefield',
  'Knysna',
  'Plettenberg Bay',
  'Nature’s Valley',
  'Oudtshoorn',
  'Stilbaai',
  'Albertinia',
];

const faqs = [
  {
    question: 'Do you have offices in Knysna, Mossel Bay and Plettenberg Bay?',
    answer:
      'No. Pixaloom is based in George and works across the Garden Route remotely, with in-person meetings when they earn their travel. Listing every town as a fake branch would be dishonest and is the kind of doorway pattern search engines already discount.',
  },
  {
    question: 'What makes a Garden Route website different?',
    answer:
      'Seasonal demand, tourism search, mobile visitors on holiday data, and local customers who still call or WhatsApp. The site has to load quickly, show availability or the offer clearly, and make contact effortless—then keep ranking when the season turns.',
  },
  {
    question: 'Can you help with Google Business Profile as well as the website?',
    answer:
      'Yes. Local visibility is usually a system: a fast website, accurate NAP details, a maintained Google Business Profile and pages that match how people actually search along the route.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Web design on the Garden Route',
      serviceType: 'Website design and development',
      provider: { '@id': `${site.url}/#organization` },
      areaServed: towns.map((name) => ({ '@type': 'City', name })),
      url: absoluteUrl('/locations/garden-route'),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'South Africa', path: '/locations' },
      { name: 'Garden Route', path: '/locations/garden-route' },
    ]),
    faqPageSchema('/locations/garden-route', faqs),
  ],
};

export default function GardenRoutePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <JsonLd id="garden-route-schema" data={schema} />

        <section className="page-hero">
          <div className="site-container page-hero-grid">
            <div>
              <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/locations">South Africa</Link>
                <span>/</span>
                <span>Garden Route</span>
              </div>
              <p className="eyebrow">
                <MapPin size={14} /> From George · Along the N2
              </p>
              <h1>
                Web design on the <em>Garden Route.</em>
              </h1>
            </div>
            <p className="lead">
              Tourism lodges, restaurants, trades, medical practices and retailers between Mossel Bay and Plettenberg Bay compete in search results that are more crowded every season. We design sites that hold up on mobile, explain the offer, and give visitors a way to book or enquire without hunting.
            </p>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">The market</p>
              <h2>Seasonal attention. Year-round systems.</h2>
            </div>
            <div className="body-copy">
              <p>
                Garden Route demand spikes with school holidays, whale season and December traffic, then has to keep producing local work in the quiet months. A brochure that only looks good in a screenshot fails both jobs. The useful version is fast, specific about place, honest about availability, and easy to update when rates or menus change.
              </p>
              <p>
                Pixaloom is based in George, so this is home ground rather than a national agency parachuting in. Knysna, Wilderness, Mossel Bay and Plett are service areas—not cloned city pages with the same paragraph and a swapped heading.
              </p>
              <Link href="/locations/george" className="text-link">
                Visit the George studio page <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="content-section alt">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Coverage directory</p>
              <h2>Towns we actually serve from George.</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                A listed town is a service area. It is not a claimed office.
              </p>
            </div>
            <div className="town-directory">
              {towns.map((town) => (
                <span key={town}>{town}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">What we deliver</p>
                <h2>From first search to the next booking.</h2>
              </div>
            </div>
            <div className="location-card-grid">
              {services.map((service) => (
                <Link className="location-card" href={`/services/${service.slug}`} key={service.slug}>
                  <span>Service</span>
                  <h3>{service.shortName}</h3>
                  <p>{service.promise}</p>
                  <span className="card-link">Explore <ArrowRight size={15} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section dark">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow eyebrow-light">Built for this coast</p>
              <h2>Local relevance without copied town pages.</h2>
            </div>
            <ul className="detail-list" style={{ borderColor: '#393c43' }}>
              {[
                'Tourism and hospitality journeys that make availability and contact obvious',
                'Local SEO that matches how people search the Garden Route—not stuffed town names',
                'Pages that stay usable on holiday mobile data',
                'One studio in George, covering the route without fake branches',
              ].map((item) => (
                <li key={item} style={{ borderColor: '#393c43' }}>
                  <Check size={18} />
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Questions, answered</p>
              <h2>Working along the Garden Route.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section alt">
          <div className="site-container cta-panel">
            <h2>Planning a Garden Route website?</h2>
            <div className="minimal-inline-links" style={{ marginTop: 28 }}>
              <Link href="/contact" className="button button-light">
                Start with your goal <ArrowRight size={18} />
              </Link>
              <Link href="/blog/george-tourism-website-best-practices">
                Tourism website notes <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
