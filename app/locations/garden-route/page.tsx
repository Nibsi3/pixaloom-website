import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { estimateWebsiteCost, formatRandRange } from '@/lib/website-cost';
import { services } from '@/lib/services';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Web Design on the Garden Route',
  description:
    'Website design for Garden Route trades, accommodation and tourism businesses. Plan website costs, service pages and booking enquiries with Cameron in George.',
  path: '/locations/garden-route',
});

const businessBuild = estimateWebsiteCost('business', 'focused', []);
const businessRange = formatRandRange(businessBuild.min, businessBuild.max);

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
    question: 'How do we work together from Knysna, Mossel Bay or Plettenberg Bay?',
    answer:
      'Cameron runs Pixaloom from George and works entirely online. We discuss the brief by phone or video, share a preview for you to try and agree changes before launch.',
  },
  {
    question: 'How will bookings work on my accommodation website?',
    answer:
      'The scope can use an availability enquiry, a link to your existing booking provider or a separately quoted integration. Bring the provider you already use and how staff confirm a booking. We check what it supports, who maintains availability, and what guests see when their requested dates are unavailable before confirming the approach.',
  },
  {
    question: 'Who updates seasonal rates and availability after launch?',
    answer:
      'Agree who maintains each piece of information: your booking provider, a staff member using the website editor, or a separately scoped care service. The proposal should name editable content, handover responsibilities and recurring software charges. Keep website offers consistent with the system your staff uses to confirm reservations.',
  },
  {
    question: 'Can you help with Google Business Profile as well as the website?',
    answer:
      'Yes. We can review your existing profile alongside the website, check that the business name, contact details and genuine service area agree, and identify useful pages for your services. Access, eligibility and the changes required are checked during discovery.',
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
            <div>
              <p className="lead">
                Work online with Cameron Falck in George on a website for your Garden Route business. Help customers choose a service, check accommodation or request a quote from their phone.
              </p>
              <div className="minimal-inline-links" style={{ marginTop: 28 }}>
                <a href={`${site.whatsapp}?text=${encodeURIComponent('Hi Cameron, I would like to discuss a website for my Garden Route business.')}`}>WhatsApp Cameron <ArrowRight size={18} /></a>
                <Link href="/website-cost">See website prices in rand <ArrowUpRight size={14} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Booking and enquiry websites</p>
              <h2>Website design for bookings and quotes.</h2>
            </div>
            <div className="body-copy">
              <p>
                A guest looking for a room needs to know whether they can confirm dates online or should wait for a reply. A homeowner requesting a quote needs to know whether you cover their town and what information to send. We plan that enquiry or booking flow before designing the homepage.
              </p>
              <p>
                Work runs from our George studio through shared previews, focused calls and agreed approval milestones. Bring the existing site, who updates prices or availability, and the services you want to grow. We scope content, photography, integrations and handover separately so each has a clear owner.
              </p>
              <p>At <Link href="/work/paws-on-route">Paws On Route in George</Link>, a pet owner can check daycare fees before asking the team for availability on WhatsApp. A guesthouse can make the same distinction explicit by labelling its booking button "Ask about dates" or "Check live availability", according to what happens next.</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Plan your business website</p>
              <h2>A practical brief for the customers you serve.</h2>
              <p className="service-budget">A focused five-page custom business website has a Pixaloom planning allowance of {businessRange}. Optional features, VAT where applicable and recurring costs are separate. Smaller template briefs can be scoped separately.</p>
              <Link href="/website-cost" className="text-link">Compare website costs and inclusions <ArrowRight size={15} /></Link>
            </div>
            <div className="body-copy">
              <h3>Trades and businesses that travel to customers</h3>
              <p>Identify the towns you actually cover, the jobs you accept and the information needed for a quote. A useful enquiry can include the service, town and preferred contact method. Agree who answers it and whether the customer needs a site visit before receiving a price.</p>
              <h3>Accommodation and visitor experiences</h3>
              <p>Show room or activity options, location, arrival details and the next booking step. Decide whether the website links to an existing booking provider, sends an availability enquiry or needs a separately scoped integration. Test one set of available dates and one sold-out date on a phone. The <Link href="/blog/george-tourism-website-best-practices">tourism website planning guide</Link> covers booking information and handover. An agreed <Link href="/services/website-care">website maintenance plan</Link> can cover recurring checks and updates.</p>
              <h3>A redesign of an existing local website</h3>
              <p>Bring the current URL and the services you want to promote. We identify useful pages to retain, map changed addresses and test contact routes before launch. See the <Link href="/locations/george">George website design page</Link> for local project examples and how we work.</p>
              <p>Send Cameron your business name, town and current website to <a href={`${site.whatsapp}?text=${encodeURIComponent('Hi Cameron, I would like a website for my Garden Route business.')}`}>discuss your website on WhatsApp</a>.</p>
            </div>
          </div>
        </section>

        <section className="content-section alt">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Coverage directory</p>
              <h2>Garden Route service area.</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                Cameron handles discovery, design reviews and handover online from George.
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
                Send your project brief <ArrowRight size={18} />
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
