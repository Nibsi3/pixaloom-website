import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Web Design in George | Business Websites & Redesigns',
  description:
    'See the Paws On Route website built in George. Work with Cameron on a new site or redesign. Budget R7,500–R12,500 for a five-page custom website.',
  path: '/locations/george',
});

const faqs = [
  {
    question: 'How much does a business website in George cost?',
    answer: 'Pixaloom’s focused five-page custom website allowance is R7,500–R12,500, excluding optional features, VAT where applicable and recurring costs. This is our planning range, not a George market average. A smaller template website can be scoped separately. We confirm the price after agreeing the content, pages and enquiry journey.',
  },
  {
    question: 'How long will my business website take?',
    answer: 'Allow about four to eight weeks for a focused build once the scope, content responsibilities and approval milestones are agreed. Bookings, integrations, content collection or a substantial migration can extend the schedule. We confirm timing in the proposal.',
  },
  {
    question: 'Is Pixaloom actually based in George?',
    answer:
      'Yes. Cameron is based in George, Western Cape. All client work takes place online, including discovery calls, design reviews and handover.',
  },
  {
    question: 'Do you only work with George businesses?',
    answer:
      'We also work remotely with businesses across the Garden Route and elsewhere in South Africa. We use shared previews so you can review the pages and try the enquiry flow before launch.',
  },
  {
    question: 'Can you rebuild a site that already ranks in George?',
    answer:
      'Yes. Bring your existing URL. We review which pages customers already find, agree which addresses to keep and map redirects for pages that need to move. We check those redirects and your contact routes at launch.',
  },
  {
    question: 'What should I ask a website designer in George?',
    answer:
      'Ask who owns the domain, who updates the content and where enquiries go. Ask the designer to walk through one customer journey on a phone and to name the hosting, renewal and support costs in the quote.',
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
            <div>
              <p className="lead">Work online with Cameron Falck, a website designer and developer based in George. Pixaloom builds websites for businesses that take bookings, quote for work or sell online.</p>
              <p className="service-budget"><strong>Planning a new five-page business website? Budget R7,500–R12,500</strong> for a custom build with one main enquiry route. Optional features, ongoing costs and VAT where applicable are separate.</p>
              <div className="minimal-inline-links" style={{ marginTop: 28 }}>
                <a href={`${site.whatsapp}?text=${encodeURIComponent('Hi Cameron, I would like to discuss a website for my George or Garden Route business.')}`}>Discuss your website <ArrowRight size={18} /></a>
                <Link href="/website-cost">Compare website prices and inclusions <ArrowUpRight size={14} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section alt" aria-labelledby="george-project-heading">
          <div className="site-container content-grid">
            <div className="body-copy">
              <p className="eyebrow">Local website project</p>
              <h2 id="george-project-heading">How Paws On Route takes booking enquiries.</h2>
              <p>This George pet-care business offers grooming, sitting, daycare and boarding. A pet owner can read about the service they need and start a WhatsApp conversation from the same WordPress page.</p>
              <p>The booking prompt asks for the pet’s name, breed and the service needed. It also explains that the team will reply with availability and price.</p>
              <Link href="/work/paws-on-route" className="text-link">See the Paws On Route case study <ArrowRight size={16} /></Link>
            </div>
            <figure className="article-project-evidence" style={{ margin: 0 }}>
              <Image
                src="/portfolio/2026-10-19/paws-on-route-detail-1.png"
                width={3200}
                height={2000}
                sizes="(max-width: 900px) calc(100vw - 32px), (max-width: 1400px) 62vw, 850px"
                alt="Paws On Route services page showing grooming, sitting, daycare and boarding alongside a WhatsApp booking prompt"
              />
              <figcaption>Paws On Route, captured 19 October 2026. The “Ready to book?” box sits beside the grooming information so a visitor can enquire from the services page.</figcaption>
            </figure>
          </div>
        </section>

        <section className="content-section" aria-labelledby="george-project-paths">
          <div className="site-container">
            <div className="section-heading-row">
              <div><h2 id="george-project-paths">What kind of website do you need?</h2></div>
            </div>
            <div className="location-card-grid">
              <Link className="location-card" href="/services/website-design">
                <h3>A website for a service business</h3>
                <p>Bring your service list, where you work and one question customers ask before they call. We use those details to plan the pages, photos and enquiry form.</p>
                <span className="card-link">See what a business website includes <ArrowRight size={15} /></span>
              </Link>
              <Link className="location-card" href="/services/ecommerce-websites">
                <h3>An online store</h3>
                <p>Start with a typical product, its variants and how you deliver or arrange collection in George. These decisions shape the catalogue, checkout and order notifications.</p>
                <span className="card-link">Explore ecommerce development <ArrowRight size={15} /></span>
              </Link>
              <Link className="location-card" href="/contact">
                <h3>A redesign of an existing site</h3>
                <p>Send the current address and one task customers struggle with. We can check which pages already attract visitors and what needs to carry across to the new site.</p>
                <span className="card-link">Discuss your redesign <ArrowRight size={15} /></span>
              </Link>
            </div>
          </div>
        </section>

        <section className="content-section alt">
          <div className="site-container content-grid">
            <div><h2>Before you commission a website.</h2></div>
            <div className="body-copy">
              <p>Our <Link href="/blog/why-george-businesses-need-modern-website">George business website brief</Link> helps you list the services, photographs and contact details you already have. A smaller brochure site with ready-to-use content may be enough. You can <Link href="/custom-website-vs-website-builder">compare a custom build with a DIY website</Link>.</p>
              <p>If you are choosing a website designer or web developer in George, use the <Link href="/blog/choosing-web-developer-george">developer comparison checklist</Link> to ask who owns the domain, who can edit the pages and who checks that enquiries reach you. Use the <Link href="/blog/lead-generation-website-design">phone and enquiry checklist</Link> to test that handover.</p>
              <p>Already have the website you need? See our <Link href="/services/seo">search visibility services</Link> if customers struggle to find it, or <Link href="/ai-website-app-rescue">get help with an unfinished AI-built site</Link> if a specific feature is stopping launch.</p>
            </div>
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
