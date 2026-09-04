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
  {
    question: 'What should I ask a website designer in George?',
    answer:
      'Ask who owns the domain, hosting and source code; how content, redirects and enquiry delivery will be tested; and what is included after launch. A useful proposal should connect those responsibilities to your actual services and customers, not only show a visual concept.',
  },
];

const proof = [
  {
    href: '/work/team-colours',
    name: 'Team Colours',
    text: 'An ecommerce catalogue interface with product hierarchy and a clear shopping journey.',
  },
  {
    href: '/work/paws-on-route',
    name: 'Paws On Route',
    text: 'A George pet-care website with separate services and direct contact routes.',
  },
  {
    href: '/work/vicbay',
    name: 'VicBay',
    text: 'An apparel ecommerce interface study. The current public website may differ from the version shown.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': absoluteUrl('/locations/george#service'),
      name: 'Website design in George',
      url: absoluteUrl('/locations/george'),
      image: absoluteUrl('/opengraph-image'),
      email: site.email,
      telephone: site.phoneInternational,
      areaServed: [
        { '@type': 'City', name: 'George' },
        { '@type': 'AdministrativeArea', name: 'Garden Route' },
        { '@type': 'AdministrativeArea', name: 'Western Cape' },
      ],
      provider: { '@id': `${site.url}/#organization` },
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
              <p className="eyebrow">Start with the local enquiry</p>
              <h2>Clear services. Useful proof. Easy contact.</h2>
            </div>
            <div className="body-copy">
              <p>
                For a local service business, the first website conversation is practical: which services do customers ask about, where do you travel, and what do they need to know before requesting a quote or appointment? We turn those answers into pages with clear scope, genuine examples and a direct contact route.
              </p>
              <p>
                For a retailer, we work through catalogue and stock responsibilities. For a tourism operator, we clarify availability and the booking handover. We agree language requirements with the business, test mobile journeys and keep useful existing URLs during a redesign. Our studio is in George; meetings are arranged by agreement.
              </p>
              <p>
                If you are comparing a <Link href="/services/website-design">website designer or web developer in George</Link>, look beyond the first mock-up. The practical differences are who will shape the content, test real enquiries, protect existing search visibility and remain accountable for the launch.
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
                <p className="eyebrow">Relevant project examples</p>
                <h2>Examine the work and its scope.</h2>
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
