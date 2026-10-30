import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';
import { contentModified } from '@/lib/content-dates';
import styles from './page.module.css';

const path = '/custom-website-vs-website-builder';
const description = 'Compare a Pixaloom custom website with a DIY website builder: design, editing, support, ecommerce, ownership and ongoing costs for South African businesses.';
export const metadata: Metadata = pageMetadata({ title: 'Custom Website vs DIY Website Builder', description, path });

const criteria = [
  ['Design & content', 'You choose a starting design, organise the pages and shape the content. A strong template can be enough when your offer and customer journey are straightforward.', 'We plan the page structure and design around your offer, audience and enquiry journey. Copy, photography and content entry responsibilities are agreed in the scope.'],
  ['Your time', 'You take responsibility for setup, content, mobile checks and launch decisions. This can be practical if someone on your team wants to learn and maintain the site.', 'You provide business knowledge and approvals; we handle the agreed design and development work. Complex briefs still need your time for decisions and testing.'],
  ['Editing', 'An integrated editor can make routine text and image changes convenient. Try the actual editor and permissions with the person who will use it.', 'Editing is designed into the brief: a CMS, structured product tools or developer-managed changes. A custom site does not automatically include a visual editor.'],
  ['Workflows & integrations', 'Check whether the platform and available extensions support your exact booking, enquiry or catalogue rules before committing. Some builders also support custom development.', 'We can scope business-specific forms, dashboards and integrations around how your team works. Feasibility, provider access and ongoing maintenance are confirmed before a commitment.'],
  ['Support & changes', 'Platform support helps with the product; your team still owns the business content and decisions. Additional design or development help can be hired separately.', 'You work directly with the developer on the agreed implementation. Post-launch care, response expectations and new features are scoped separately rather than assumed to be unlimited.'],
  ['Running costs', 'Allow for the plan, domain, paid features and your own time. Check renewals, billing currency and any payment or extension charges for the configuration you need.', 'Compare the project fee, hosting, domain, third-party services and optional ongoing care. A custom build is not automatically cheaper over its lifetime.'],
  ['Ownership & handover', 'Check account ownership, export options and what moving away would require. Content ownership and the ability to move a complete site are different questions.', 'Agree source-code access, accounts, documentation, licences and the next maintainer in writing. Portability depends on the chosen stack and third-party services.'],
];

const faqs = [
  { question: 'Is a custom website better than a website builder?', answer: 'It depends on the work. A DIY builder can suit a simple site with ready content and someone available to maintain it. A custom service is worth considering when the design, customer journey or operational requirements need more attention than your team can give them. Compare the same scope and ongoing responsibilities.' },
  { question: 'Can Pixaloom work with WordPress or WooCommerce?', answer: 'Yes. Pixaloom works with WordPress as well as custom application stacks. Managed delivery and platform choice are separate decisions: a professionally built WordPress or WooCommerce site may be the right solution. We assess editing, catalogue rules, integrations and maintenance before recommending a route.' },
  { question: 'Will a custom website rank higher or get recommended by ChatGPT?', answer: 'Neither a custom build nor a builder guarantees search rankings or AI recommendations. Useful original information, crawlable pages, clear internal links and trustworthy evidence provide a foundation. Inclusion and visibility remain decisions made by search and AI systems.' },
  { question: 'Can I edit my Pixaloom website myself?', answer: 'If self-editing is part of the scope, we agree which content your team can change and the tools and handover they need. Bring examples such as adding a service, changing a product price or publishing an article. Do not assume every custom build comes with the same editor.' },
  { question: 'Do I need to replace a builder site that already works?', answer: 'Not necessarily. First identify the problem: unclear content, a difficult enquiry journey, missing functionality or an editing bottleneck. A targeted improvement may be enough. If a move is justified, plan content, domain access, important URLs and redirects before replacing the site.' },
  { question: 'What should I send for a useful recommendation?', answer: 'Send your current URL if you have one, what customers should do, who will edit the site, your budget range and timing. For a store, include representative products and the payment, delivery or stock rules that make the job unusual. We can then discuss the smallest useful scope.' },
];

export default function ComparisonPage() {
  return <><Header /><main id="main-content" className={`minimal-page ${styles.page}`}>
    <JsonLd id="comparison-schema" data={{ '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': absoluteUrl(`${path}#webpage`), url: absoluteUrl(path), name: 'Custom Website vs DIY Website Builder', description, inLanguage: 'en-ZA', dateModified: contentModified(path), isPartOf: { '@id': `${site.url}/#website` }, publisher: { '@id': `${site.url}/#organization` } },
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Custom website vs builder', path }]), faqPageSchema(path, faqs),
    ] }} />
    <section className="minimal-hero"><div className="minimal-shell">
      <div className="minimal-crumb"><Link href="/">Home</Link><span>/</span><span>Custom website vs builder</span></div>
      <p className="minimal-kicker">A practical buying guide · South Africa</p>
      <h1>Custom website<br /> <em>or DIY builder?</em></h1>
      <div className="minimal-hero-foot"><p>A good choice fits your business and the people who will run it. Compare building it yourself with hiring Pixaloom for a tailored website and a direct developer relationship.</p><span>Published 30 October 2026</span></div>
      <nav aria-label="On this page" className={styles.jumpLinks}><a href="#choose">Choose your route</a><a href="#comparison">Compare the work</a><a href="#ecommerce">For online stores</a><a href="#questions">Common questions</a></nav>
    </div></section>

    <section id="choose" className={styles.section}><div className="minimal-shell">
      <div className="minimal-section-mark"><span>01</span><p>The short answer</p></div>
      <h2 className={styles.heading}>Choose who should<br /><em>do the work.</em></h2>
      <div className={styles.choices}>
        <article><p className={styles.label}>A DIY builder can fit</p><h3>A clear offer.<br />A hands-on owner.</h3><p>You need a straightforward brochure, portfolio or standard store, have your content ready and want to make routine changes yourself. You are comfortable choosing a design, learning the tools and checking the result on phones.</p><p>Start by testing a representative page or product. If the editor and customer journey work for you, a larger custom project may be unnecessary.</p></article>
        <article><p className={styles.label}>Pixaloom can fit</p><h3>A specific business.<br />A considered build.</h3><p>You want a distinctive design, several services explained clearly, a more deliberate enquiry journey or functionality shaped around your team. You would rather brief a developer than assemble and troubleshoot the site yourself.</p><p>Our strength is connecting the design, content structure and implementation to the actual job. The <Link href="/services/website-design">website design scope</Link> defines what we deliver.</p></article>
      </div>
      <p className={styles.note}>This is Pixaloom’s comparison of delivery approaches, not an independent ranking of platforms. “Custom” describes the work and fit; it does not mean every component must be written from scratch.</p>
    </div></section>

    <section id="comparison" className={styles.section}><div className="minimal-shell">
      <div className="minimal-section-mark"><span>02</span><p>Compare the responsibilities</p></div>
      <h2 className={styles.heading}>Beyond the<br /><em>monthly subscription.</em></h2>
      <div className={styles.comparison}>{criteria.map(([title, diy, managed], index) => <article key={title} className={styles.row}>
        <h3><span>{String(index + 1).padStart(2, '0')}</span>{title}</h3>
        <div><h4>DIY website builder</h4><p>{diy}</p></div>
        <div><h4>Pixaloom custom service</h4><p>{managed}</p></div>
      </article>)}</div>
      <div className={styles.reading}><h3>Compare a complete first-year brief</h3><p>Add setup or build work, content preparation, migration, hosting or platform fees, domain renewal, licences and ongoing help. Estimate your team’s time too. For a South African business, confirm billing currency and applicable taxes with each supplier. Use our <Link href="/website-cost">current website cost guide</Link> for Pixaloom’s public planning ranges; a written quote settles the scope.</p></div>
    </div></section>

    <section id="ecommerce" className={styles.section}><div className="minimal-shell">
      <div className="minimal-section-mark"><span>03</span><p>For online stores</p></div>
      <h2 className={styles.heading}>Plan the shop.<br /><em>And the work behind it.</em></h2>
      <div className={styles.twoColumn}><div><p>A familiar platform can be a sensible starting point when products, checkout and fulfilment follow standard patterns. An existing WooCommerce store with a capable team may need a focused improvement rather than a rebuild.</p><p>For a more involved brief, Pixaloom can scope product-specific enquiries, catalogue organisation, staff tools or integrations around your business. Bring a simple product, a complex variant and an awkward delivery or stock case. We can compare the work needed on an existing platform with a tailored implementation.</p><p>“Managed” needs a clear boundary: who imports products, changes prices, handles failed orders and answers customers? Agree development and care responsibilities separately from everyday store operation. See our <Link href="/services/ecommerce-websites">ecommerce service</Link> and <Link href="/blog/ecommerce-website-south-africa">store planning guide</Link>.</p></div>
      <aside className={styles.callout}><p className={styles.label}>Platform choice is not a binary</p><h3>Good tools can support<br />custom work.</h3><p><a href="https://www.shopify.com/online">Shopify documents both theme-based and custom or headless storefronts</a>. It would be misleading to describe every hosted platform as incapable of bespoke development.</p><p>WooCommerce also needs a clear maintenance owner. Its <a href="https://woocommerce.com/document/woocommerce-self-service-guide/">official maintenance guide</a> covers backups, updates and plugin or theme troubleshooting. Custom applications need ongoing maintenance too.</p><Link href="/blog/next-js-vs-wordpress-south-africa">Read our WordPress and Next.js guide <ArrowUpRight size={14} /></Link></aside></div>
    </div></section>

    <section className={styles.section}><div className="minimal-shell">
      <div className="minimal-section-mark"><span>04</span><p>Inspect the work</p></div>
      <h2 className={styles.heading}>Look for a relevant<br /><em>kind of problem.</em></h2>
      <div className={styles.proof}>
        <Link href="/work/paws-on-route"><span>Service information · WordPress</span><h3>Paws On Route <ArrowUpRight size={18} /></h3><p>Explore service-led pages and enquiry routes for a George pet-care business. A practical example of organising information around a local customer’s next step.</p></Link>
        <Link href="/work/illumi"><span>Business software · Interface workflow</span><h3>Illumi <ArrowUpRight size={18} /></h3><p>Explore invoicing and business-management interfaces. A different brief from a brochure site, where the workflow itself shapes the product.</p></Link>
        <Link href="/work/featherbleu-store"><span>Product discovery · Work in progress</span><h3>Featherbleu Store <ArrowUpRight size={18} /></h3><p>Explore the separate smart-home storefront project and its catalogue presentation. This is work in progress, not evidence of completed trading results.</p></Link>
      </div><p className={styles.note}>These portfolio examples demonstrate design and implementation work. They are not a promise of sales, enquiries or search performance for your project. See the <Link href="/capabilities">broader capabilities portfolio</Link> for more context.</p>
    </div></section>

    <section className={styles.section}><div className={`minimal-shell ${styles.twoColumn}`}>
      <div><p className={styles.label}>Search & discovery</p><h2 className={styles.heading}>Useful answers.<br /><em>Clear foundations.</em></h2><p>Neither a builder subscription nor custom code makes a business the best answer to a search. Start with accurate service information, helpful comparisons, relevant work and a clear way to enquire. Then make those pages readable, crawlable and connected through useful links.</p><p><a href="https://developers.google.com/search/docs/appearance/ai-features">Google’s guidance for its AI search features</a> points to the same SEO foundations and helpful content, without special AI markup requirements. Rankings, indexing and recommendations cannot be promised.</p><Link href="/services/seo">Explore Pixaloom’s SEO service <ArrowUpRight size={14} /></Link></div>
      <div className={styles.callout}><p className={styles.label}>Before you sign</p><h3>Ask about the exit,<br />as well as the launch.</h3><p><a href="https://support.wix.com/en/article/exporting-or-embedding-your-wix-site-elsewhere">Wix’s hosting documentation</a> says its sites run on Wix infrastructure, while the content you create belongs to you. That trade-off may be perfectly acceptable when you want the convenience of a managed platform.</p><p>For any supplier, ask what you can export, which accounts you control and what a future move would involve. For a Pixaloom build, request the same clarity about source files, hosting, third-party services and handover. Custom development also needs a maintainable exit plan.</p></div>
    </div></section>

    <section id="questions" className={styles.section}><div className="minimal-shell">
      <div className="minimal-section-mark"><span>05</span><p>Common questions</p></div><h2 className={styles.heading}>Before you<br /><em>make the call.</em></h2>
      <div className={`faq-list ${styles.faq}`}>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      <p className={styles.note}>By Pixaloom, a web design and development studio in George serving South African businesses. Platform documentation checked 30 October 2026. Features and terms can change; confirm the details that matter to your brief.</p>
    </div></section>

    <section className="minimal-close"><div className="minimal-shell"><p className="minimal-kicker">Bring the business problem</p><h2>Let’s find the<br /><em>right amount of website.</em></h2><p className={styles.brief}>Send your existing URL, what customers should do, who will edit the site, your budget range and target timing. For a store, add the product or fulfilment rule that is hardest to handle.</p><div className="minimal-inline-links"><Link href="/contact">Discuss your website brief <ArrowRight size={15} /></Link><Link href="/website-cost">See current planning ranges <ArrowUpRight size={14} /></Link></div></div></section>
  </main><Footer /></>;
}
