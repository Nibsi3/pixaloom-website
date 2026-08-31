import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { WebsiteCostEstimator } from '@/components/website-cost-estimator';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

const pageDescription =
  'A practical 2026 planning range for South African websites, ecommerce stores and web apps—plus an estimator you can adjust before requesting a Pixaloom quote.';

export const metadata: Metadata = pageMetadata({
  title: 'Website Cost in South Africa',
  description: pageDescription,
  path: '/website-cost',
});

const faqs = [
  {
    question: 'How much does a website cost in South Africa in 2026?',
    answer:
      'A custom business website typically starts around R35,000. Ecommerce, integrations and software products cost more because the work includes catalogue structure, payments, operations and testing—not only page design. Template sites advertised under R10,000 exist; they rarely include original design, technical SEO or a conversion path you can measure.',
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
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': absoluteUrl('/website-cost#webpage'),
      url: absoluteUrl('/website-cost'),
      name: 'Website Cost in South Africa | Pixaloom',
      description: pageDescription,
      inLanguage: 'en-ZA',
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': `${site.url}/#organization` },
      dateModified: site.contentRevised,
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
            <h1>
              Website cost in<br />{' '}
              <em>South Africa.</em>
            </h1>
            <div className="minimal-hero-foot">
              <p>
                Most serious South African business websites sit well above cheap template pricing and well below enterprise software. Use the estimator to shape a range, then we will quote the actual work.
              </p>
              <span>Ranges, not theatre</span>
            </div>
          </div>
        </section>

        <section className="minimal-statement">
          <div className="minimal-shell">
            <div className="minimal-section-mark">
              <span>01</span>
              <p>Estimator</p>
            </div>
            <WebsiteCostEstimator />
          </div>
        </section>

        <section className="minimal-index-section">
          <div className="minimal-shell">
            <div className="minimal-index-heading">
              <div className="minimal-section-mark">
                <span>02</span>
                <p>What the number buys</p>
              </div>
              <h2>
                Price follows the<br />{' '}
                <em>job to be done.</em>
              </h2>
            </div>
            <ol className="minimal-principle-list">
              <li>
                <span>01</span>
                <h3>Business websites</h3>
                <p>Typically R35,000–R140,000. The difference is page count, proof, locations, copy and how tightly the site is built around enquiry.</p>
              </li>
              <li>
                <span>02</span>
                <h3>Ecommerce</h3>
                <p>Typically R60,000–R240,000. Catalogue structure, payments, shipping, product content and operations dominate the budget—not the homepage animation.</p>
              </li>
              <li>
                <span>03</span>
                <h3>Custom web apps</h3>
                <p>Typically R80,000 and up. Software needs accounts, data, permissions and a first release that is small enough to ship.</p>
              </li>
              <li>
                <span>04</span>
                <h3>What we do not sell</h3>
                <p>R2,000–R8,000 template WordPress packages. They exist; they are not how Pixaloom works, and they are rarely cheaper once you add the missing design, SEO and support.</p>
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
            <h2>
              Bring the business context.<br />{' '}
              <em>We’ll return a real range.</em>
            </h2>
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
