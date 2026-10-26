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
    'Business websites and redesigns across the Garden Route, from our George studio. Plan service pages, booking enquiries and costs directly with Cameron.',
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
      'Pixaloom is based in George. We work with Garden Route businesses remotely and arrange in-person meetings by agreement. Contact us with your location and project requirements.',
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
              Work with Cameron Falck at our George studio on a website for your Garden Route business. We help service businesses, accommodation providers and retailers explain their offer, serve mobile visitors and make booking or quote enquiries easier.
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
                Tourism and accommodation briefs need clear availability, arrival information and a dependable booking handover. Local-service briefs need accurate coverage, useful project evidence and an enquiry route someone actually monitors. We identify that primary journey before drawing the homepage.
              </p>
              <p>
                Work runs from our George studio through shared previews, focused calls and agreed approval milestones. Bring the existing site, who updates prices or availability, and the services you want to grow. We scope content, photography, integrations and handover separately so each has a clear owner.
              </p>
              <Link href="/locations/george" className="text-link">
                Visit the George studio page <ArrowRight size={15} />
              </Link>
              <p>For a local service structure, see <Link href="/work/paws-on-route">Paws On Route</Link>. For a different kind of product, see the <Link href="/work/spotlight">Spotlight map interface study</Link>. These examples show the described work, not a promise of booking or ranking results.</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Plan your business website</p>
              <h2>A practical brief for the customers you serve.</h2>
              <p className="service-budget">A focused five-page custom business website has a Pixaloom planning allowance of R35,000–R55,000. Optional features, VAT where applicable and recurring costs are separate. Smaller template briefs can be scoped separately.</p>
              <Link href="/website-cost" className="text-link">Compare website costs and inclusions <ArrowRight size={15} /></Link>
            </div>
            <div className="body-copy">
              <h3>Trades and businesses that travel to customers</h3>
              <p>Identify the towns you actually cover, the jobs you accept and the information needed for a quote. A useful enquiry can include the service, town and preferred contact method. Agree who answers it and whether the customer needs a site visit before receiving a price.</p>
              <h3>Accommodation and visitor experiences</h3>
              <p>Show room or activity options, location, arrival details and the next booking step. Decide whether the website links to an existing booking provider, sends an availability enquiry or needs a separately scoped integration. See our <Link href="/blog/george-tourism-website-best-practices">tourism website planning guide</Link>.</p>
              <h3>A redesign of an existing local website</h3>
              <p>Bring the current URL and the services you want to promote. We identify useful pages to retain, map changed addresses and test contact routes before launch. See the <Link href="/locations/george">George website design page</Link> for local project examples and how we work.</p>
              <p>These are planning examples, not claims about previous customers. Send your business name, location and current website to <a href={`${site.whatsapp}?text=${encodeURIComponent('Hi Cameron, I would like a website for my Garden Route business.')}`}>discuss your brief with Cameron</a>.</p>
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
