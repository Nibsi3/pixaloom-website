import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { WebsiteCostEstimator } from '@/components/website-cost-estimator';
import { WebsiteBuildFit } from '@/components/website-build-fit';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';
import { contentModified } from '@/lib/content-dates';

const pageDescription =
  'Pixaloom custom business websites: R7,500–R12,500 for five pages. Compare scope, optional extras and recurring costs, then estimate your project.';

export const metadata: Metadata = pageMetadata({
  title: 'Website Design Prices South Africa (2026)',
  description: pageDescription,
  path: '/website-cost',
});

const faqs = [
  {
    question: 'How much does a website cost in South Africa in 2026?',
    answer:
      'Pixaloom’s focused custom business-website planning allowance starts at R7,500, excluding optional extras, VAT where applicable and recurring third-party charges. This is our indicative scope-based allowance, not a national average. The written quote follows discovery.',
  },
  {
    question: 'Why do quotes vary so widely?',
    answer:
      'Price follows scope: number of templates, content, payments, languages, integrations and how much of the current site is worth keeping. Two businesses in the same town can need very different sites. A useful quote names those decisions instead of hiding them in a package name.',
  },
  {
    question: 'Does this estimator replace a quote?',
    answer:
      'No. It is a planning range so you can budget before a conversation. Pixaloom quotes after we understand the audience, offer, proof and the next action a visitor should take.',
  },
  {
    question: 'What is included in a Pixaloom website?',
    answer:
      'Discovery, information architecture, custom responsive design, development, on-page SEO foundations, analytics, launch support and a handover your team can own. Hosting, domains and third-party software are billed separately so costs stay transparent.',
  },
  {
    question: 'How much is a five-page website in South Africa?',
    answer:
      'Pixaloom plans a focused five-page custom business website at R7,500–R12,500 before optional features and VAT where applicable. That range assumes one clear audience, one primary enquiry path and content that can be shaped within five core pages. A written scope confirms the actual templates, content and integrations.',
  },
  {
    question: 'What does a website cost per month?',
    answer:
      'The build is a project fee. Monthly or annual costs can include hosting, domain renewal, email, software licences and an optional care plan. We list these separately in the quote because they depend on traffic, editing, support and third-party providers.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': absoluteUrl('/website-cost#webpage'),
      url: absoluteUrl('/website-cost'),
      name: 'Website Design Prices in South Africa (2026) | Pixaloom',
      description: pageDescription,
      inLanguage: 'en-ZA',
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': `${site.url}/#organization` },
      dateModified: contentModified('/website-cost'),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Website cost', path: '/website-cost' },
    ]),
    faqPageSchema('/website-cost', faqs),
  ],
};

export default function WebsiteCostPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="minimal-page">
        <JsonLd id="website-cost-schema" data={schema} />

        <section className="minimal-hero">
          <div className="minimal-shell">
            <div className="minimal-crumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Website cost</span>
            </div>
            <p className="minimal-kicker">South Africa · Planning ranges · 2026</p>
            <h1>Website design prices<br /> <em>in South Africa.</em></h1>
            <div className="minimal-hero-foot">
              <p>
                Compare Pixaloom’s 2026 website prices, see what changes the cost and build a planning allowance for your scope. These are our own indicative ranges—not national market averages or a binding quotation.
              </p>
              <span>Ranges, not theatre</span>
            </div>
          </div>
        </section>

        <section className="minimal-index-section">
          <div className="minimal-shell">
            <div className="minimal-index-heading">
              <div className="minimal-section-mark">
                <span>01</span>
                <p>Price list</p>
              </div>
              <h2>Start with the closest<br /> <em>scope, then refine it.</em></h2>
            </div>
            <ol className="minimal-principle-list">
              <li>
                <span>01</span>
                <h3>Five-page business website</h3>
                <p>R7,500–R12,500. Five core pages, custom responsive design, one primary enquiry journey, on-page SEO foundations, analytics and launch handover.</p>
              </li>
              <li>
                <span>02</span>
                <h3>Growing business website</h3>
                <p>R15,000–R25,000. More page templates, services, proof, locations or content depth, with conversion measurement from launch.</p>
              </li>
              <li>
                <span>03</span>
                <h3>Ecommerce website</h3>
                <p>R15,000–R25,000 for a focused store, including one standard hosted payment integration. Larger catalogues and more complex operations are planned at R25,000–R80,000; bespoke integrations are scoped separately.</p>
              </li>
              <li>
                <span>04</span>
                <h3>Custom web application</h3>
                <p>From R35,000. Accounts, permissions, data models, workflows and external systems are scoped through discovery before a delivery range is confirmed.</p>
              </li>
            </ol>
            <p className="service-budget">Build prices exclude VAT where applicable, domains, hosting, email, software subscriptions, payment fees and ongoing care. They describe Pixaloom’s current planning allowances, not an industry-wide average.</p>
          </div>
        </section>

        <WebsiteBuildFit />

        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Compare like for like</p>
              <h2>What would your five pages actually do?</h2>
              <p className="service-budget">An illustrative scope for a service business. This is not a completed client quote or a promise that every five-page website needs the same work.</p>
            </div>
            <div className="body-copy">
              <p>A focused brief might include a homepage explaining the offer, two pages for the main services, an about-and-work page showing genuine evidence, and a contact page with service area and enquiry options. The page count alone does not define the cost: content preparation, unique layouts and integrations still need agreement.</p>
              <h3>Separate the build from the first year of ownership</h3>
              <p>Compare the quoted build fee plus any content work, optional features, twelve months of monthly subscriptions, annual renewals and agreed support. Confirm VAT treatment and whether any first-year discounts change at renewal. Ask who owns each account and which fees are paid directly to providers.</p>
              <h3>Keep a smaller brief small</h3>
              <p>If your content is ready and you only need a simple brochure, ask us to scope a template website before budgeting for a custom build. If the existing website already works, a targeted repair may be sufficient. We confirm the appropriate scope before quoting.</p>
              <p>For a local project, explore <Link href="/locations/george">business website design in George</Link> or our <Link href="/locations/garden-route">Garden Route website service</Link>. Bring your current URL, priority services and the action you want customers to take.</p>
            </div>
          </div>
        </section>

        <section className="minimal-statement">
          <div className="minimal-shell">
            <div className="minimal-section-mark">
              <span>02</span>
              <p>Estimator</p>
            </div>
            <WebsiteCostEstimator />
          </div>
        </section>

        <section className="minimal-index-section">
          <div className="minimal-shell">
            <div className="minimal-index-heading">
              <div className="minimal-section-mark">
                <span>03</span>
                <p>What changes the price</p>
              </div>
              <h2>Price follows the<br /> <em>job to be done.</em></h2>
            </div>
            <ol className="minimal-principle-list">
              <li>
                <span>01</span>
                <h3>Pages and templates</h3>
                <p>Five pages can share a simple structure. Larger sites may need distinct service, location, article, product or resource templates, each with its own content and quality checks.</p>
              </li>
              <li>
                <span>02</span>
                <h3>Content and migration</h3>
                <p>Writing, photography, product data and moving useful content from an existing site all affect the workload. A redesign also needs a URL inventory and redirect plan.</p>
              </li>
              <li>
                <span>03</span>
                <h3>Features and integrations</h3>
                <p>Bookings, payments, multilingual content, editable content and links to stock, accounting or CRM systems are priced from the actual workflow.</p>
              </li>
              <li>
                <span>04</span>
                <h3>Monthly website costs</h3>
                <p>Hosting, domain renewal, email, software licences and optional care are recurring costs. The quote lists them separately from the build so ownership and future commitments stay clear.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <p className="eyebrow">Questions, answered</p>
              <h2>Before you request a quote.</h2>
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

        <section className="minimal-close">
          <div className="minimal-shell">
            <p className="minimal-kicker">Next step</p>
            <h2>Bring the business context.<br /> <em>We’ll return a real range.</em></h2>
            <div className="minimal-inline-links">
              <Link href="/contact">
                Start a project <ArrowRight size={15} />
              </Link>
              <Link href="/blog/how-much-does-website-cost-south-africa">
                Read the full cost guide <ArrowUpRight size={14} />
              </Link>
              <Link href="/services/website-design">
                Website design <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
