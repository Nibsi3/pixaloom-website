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
  title: 'Web Design in George',
  description:
    'Pixaloom is a web design studio in George, Western Cape. We build fast, search-ready websites, ecommerce stores and web apps for Garden Route and South African businesses.',
  path: '/locations/george',
});

const faqs = [
  {
    question: 'Is Pixaloom actually based in George?',
    answer:
      'Yes. The studio is in George, Western Cape. We meet locally when it helps and work remotely with clients across South Africa. We do not invent extra branch offices.',
  },
  {
    question: 'Do you only work with George businesses?',
    answer:
      'No. George is the base. We regularly deliver for clients in other provinces. Local companies get a partner who understands Garden Route search behaviour, mobile use and WhatsApp-first contact habits.',
  },
  {
    question: 'Can you rebuild a site that already ranks in George?',
    answer:
      'Yes. We audit useful URLs, protect what already earns traffic and plan redirects before the new site launches. Redesigns should not throw away search equity for a visual refresh.',
  },
];

const proof = [
  {
    href: '/work/team-colours',
    name: 'Team Colours',
    text: 'A George ecommerce catalogue built for product discovery, SEO and conversion.',
  },
  {
    href: '/work/george-herald',
    name: 'George Herald',
    text: 'A local news presence that has to stay fast, readable and easy to update.',
  },
  {
    href: '/work/vicbay',
    name: 'VicBay',
    text: 'A nearby Garden Route property of place—proof that local context belongs in the design, not as an afterthought.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': absoluteUrl('/locations/george#local-business'),
      name: 'Pixaloom — web design in George',
      url: absoluteUrl('/locations/george'),
      image: absoluteUrl('/opengraph-image'),
      email: site.email,
      telephone: site.phoneInternational,
      priceRange: 'ZAR',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'George',
        addressRegion: 'Western Cape',
        addressCountry: 'ZA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      areaServed: [
        { '@type': 'City', name: 'George' },
        { '@type': 'AdministrativeArea', name: 'Garden Route' },
        { '@type': 'AdministrativeArea', name: 'Western Cape' },
      ],
      parentOrganization: { '@id': `${site.url}/#organization` },
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'South Africa', path: '/locations' },
      { name: 'George', path: '/locations/george' },
    ]),
    faqPageSchema('/locations/george', faqs),
  ],
};

export default function GeorgePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <JsonLd id="george-schema" data={schema} />

        <section className="page-hero">
          <div className="site-container page-hero-grid">
            <div>
              <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/locations">South Africa</Link>
                <span>/</span>
                <span>George</span>
              </div>
              <p className="eyebrow">
                <MapPin size={14} /> Studio base · Western Cape
              </p>
              <h1>
                Web design in <em>George.</em>
              </h1>
            </div>
            <p className="lead">
              Pixaloom is an independent web design and development studio in George. We build websites that load quickly on South African mobile connections, make the next action obvious, and can be found when someone searches for a Garden Route business.
            </p>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Why a George page exists</p>
              <h2>A real studio, not a doorway town.</h2>
            </div>
            <div className="body-copy">
              <p>
                George is the regional centre of the Garden Route: professional services around York Street, tourism and hospitality toward Wilderness and Victoria Bay, trades and construction serving new suburbs, and owner-run retailers who still win a lot of work by word of mouth. Those businesses now lose customers to whoever is easier to find on Google and WhatsApp.
              </p>
              <p>
                A useful George website is not a Cape Town template with the town name swapped in. It has to respect mobile data, load-shedding-shaped browsing habits, bilingual customers, and the fact that many enquiries still happen on the phone. That is the work we do from here.
              </p>
              <div className="pill-list">
                {['Tourism and hospitality', 'Trades and construction', 'Professional services', 'Retail and ecommerce', 'Local media and institutions'].map((item) => (
                  <span className="pill" key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="content-section alt">
          <div className="site-container">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Work from this town</p>
                <h2>Proof, not a generic claims list.</h2>
              </div>
            </div>
            <div className="location-card-grid">
              {proof.map((item) => (
                <Link className="location-card" href={item.href} key={item.href}>
                  <span>Case study</span>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                  <span className="card-link">View project <ArrowUpRight size={15} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">What we deliver in George</p>
                <h2>From first search to qualified enquiry.</h2>
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
              <p className="eyebrow eyebrow-light">How the work runs</p>
              <h2>Local when it helps. Remote when it is faster.</h2>
            </div>
            <ul className="detail-list" style={{ borderColor: '#393c43' }}>
              {[
                'Discovery by call or in George when the brief is easier face to face',
                'Mobile-first pages designed for Garden Route connections, not only fibre screenshots',
                'On-page SEO, Google Business Profile guidance and WhatsApp as a first-class action',
                'Nationwide delivery from the same studio—no invented Knysna or Cape Town offices',
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
              <h2>Working with a George studio.</h2>
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
            <h2>Planning a website in George?</h2>
            <div className="minimal-inline-links" style={{ marginTop: 28 }}>
              <Link href="/contact" className="button button-light">
                Start with your goal <ArrowRight size={18} />
              </Link>
              <Link href="/locations/garden-route">
                Garden Route coverage <ArrowUpRight size={14} />
              </Link>
              <Link href="/website-cost">
                Website cost range <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
