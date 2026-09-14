import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { InquiryForm } from '@/components/inquiry-form';
import { JsonLd } from '@/components/json-ld';
import { rescueFaqs, rescuePackages } from '@/lib/ai-rescue';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';
import './rescue.css';

export const metadata = pageMetadata({
  title: 'AI Website & App Rescue | Fix, Finish & Launch',
  description: 'Stuck with an AI-built website or app? Pixaloom fixes login, forms and deployment problems. Get a free initial diagnosis and a clear scope for launch.',
  path: '/ai-website-app-rescue',
});
const problems = [
  ['It works in preview, but not live.', 'Build errors, failed deployments, environment setup, custom domains and HTTPS.'],
  ['People cannot log in or save data.', 'Registration, password reset, OAuth, database connections and permissions.'],
  ['The important parts do nothing.', 'Forms, APIs, transactional email, checkout, subscriptions and webhooks.'],
  ['One AI edit broke something else.', 'Restore affected features, repair mobile layouts and finish agreed launch requirements.'],
];
const steps = [
  ['Show us the problem', 'Tell us what is broken and what should happen. The free initial review helps us recommend a next step.'],
  ['Agree the work', 'We check suitability and access, then confirm scope, price, acceptance criteria and a delivery estimate.'],
  ['Fix, test and launch', 'We preserve a recovery path, make the agreed changes and test the affected journey. Deployment follows your authorised workflow.'],
  ['Know what changed', 'Receive a short handover with test results, the change record, the live URL where included and any known limitations.'],
];
export default function RescuePage() {
  return <><Header /><main id="main-content" className="rescue-page">
    <JsonLd id="rescue-service-schema" data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'AI Website & App Rescue', serviceType: 'Website and web application troubleshooting and deployment', url: absoluteUrl('/ai-website-app-rescue'), provider: { '@id': `${site.url}/#organization` }, description: 'Diagnosis, agreed fixes, focused testing and deployment support for existing AI-built websites and web applications.' }} />
    <section className="rescue-hero rescue-shell">
      <nav className="rescue-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link></nav>
      <p className="rescue-kicker">AI Website &amp; App Rescue by Pixaloom</p>
      <h1>Built it with AI?<br /><em>Let’s get it live.</em></h1>
      <p className="rescue-lead">Stuck with broken login, payment errors or a deployment that keeps failing? We help fix and finish AI-built websites and web apps, so you can move from preview to a working launch.</p>
      <a href="#diagnosis" className="button button-light">Get a free app diagnosis <ArrowUpRight size={18} /></a>
      <p className="rescue-caption">A brief initial review. Clear scope before paid work.</p>
      <p className="rescue-platforms">Lovable · Bolt.new · Replit · Cursor · Claude Code · Codex · v0</p>
    </section>
    <section className="rescue-section"><div className="rescue-shell">
      <p className="rescue-kicker">From stuck to a clear next step</p><h2>You’ve built something.<br />Now make it work.</h2>
      <p className="rescue-copy">For founders with a stalled MVP, business owners with broken forms and creators spending more AI credits on the same error. Whether you call it AI building or vibe coding, you do not need to diagnose the technical cause yourself. We establish what is actually needed before promising a launch.</p>
      <div className="rescue-problems">{problems.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div>
      <p className="rescue-caption">Depending on the project: React, Next.js, TypeScript, Supabase, Firebase, PostgreSQL, Cloudflare, Vercel, Netlify, Railway and third-party APIs. These are examples of work we assess, not claims of certification or platform partnership.</p>
    </div></section>
    <section className="rescue-section" id="packages"><div className="rescue-shell">
      <p className="rescue-kicker">South African launch pricing</p><h2>A defined problem.<br />A defined scope.</h2>
      <div className="rescue-packages">{rescuePackages.map((item, index) => <article key={item.name}><span className="rescue-kicker">0{index + 1}</span><h3>{item.name}</h3><p className="rescue-price">{index < 2 ? 'From ' : ''}{item.price}</p><p><strong>{item.scope}</strong></p><p>{item.detail}</p><a className="rescue-link" href="#diagnosis">Get a free app diagnosis <ArrowUpRight size={16}/></a></article>)}</div>
      <div className="rescue-terms"><p>We confirm suitability before you buy. Delivery estimates follow review of the issue and required access. Hosting, domains, subscriptions and usage charges are separate.</p><p>Quick Fix and Ship It include one revision; Full Rescue includes two. Revisions correct the agreed deliverables. New features and unrelated problems are additional work. If diagnosis reveals a larger issue, we explain the options and agree any change before extra work. Basic checks are not a comprehensive security audit.</p></div>
    </div></section>
    <section className="rescue-section"><div className="rescue-shell"><p className="rescue-kicker">How it works</p><h2>Clarity at every step.</h2><ol className="rescue-steps">{steps.map(([title, detail], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol></div></section>
    <section className="rescue-section"><div className="rescue-shell"><p className="rescue-kicker">Selected Pixaloom work</p><h2>Real development work.</h2><p className="rescue-copy">Examples of our website and application capabilities. These projects are not presented as AI rescue case studies.</p><div className="rescue-problems">
      <article><h3>Illumi</h3><p>An invoicing and finance web app with Next.js, Supabase and email/payment workflows. Relevant to application logic, data and integrations.</p><Link className="rescue-link" href="/work/illumi">Explore the project <ArrowUpRight size={16}/></Link></article>
      <article><h3>NORDflam SA</h3><p>A product catalogue website with product detail pages and retailer discovery. Relevant to responsive interfaces and website delivery.</p><Link className="rescue-link" href="/work/nordflam">Explore the project <ArrowUpRight size={16}/></Link></article>
    </div></div></section>
    <section className="rescue-section"><div className="rescue-shell"><p className="rescue-kicker">After launch</p><h2>Care with clear limits.</h2><div className="rescue-problems"><article><h3>App Care · R1,490/month</h3><p>1.5 hours per month for maintenance and small fixes. Acknowledgement within two business days.</p></article><article><h3>App Care Pro · R2,990/month</h3><p>3 hours per month for maintenance and small fixes. Acknowledgement within one business day.</p></article></div><p className="rescue-copy">Support runs Monday–Friday, 09:00–17:00 South African time, excluding public holidays. Time includes investigation, communication, testing and implementation, recorded in 15-minute increments. No rollover; one request at a time. Response windows mean acknowledgement, not a guaranteed resolution time.</p><p className="rescue-copy">New features, major upgrades, migrations, incident response, comprehensive audits and third-party costs are excluded. Extra time needs a separate quote. Monthly renewal is by agreement; cancel before the next renewal. We confirm suitability and terms before maintenance starts.</p></div></section>
    <section className="rescue-section"><div className="rescue-shell"><p className="rescue-kicker">Questions before we start</p><h2>What to expect.</h2><div className="rescue-faqs">{rescueFaqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="rescue-section" id="diagnosis"><div className="rescue-shell rescue-contact"><div><p className="rescue-kicker">Start with the problem</p><h2>Get a free<br />app diagnosis.</h2><p>A brief initial review to understand the reported problem and recommend a next step. It is not a free comprehensive code audit or a promise to fix the app without charge.</p><p>Do not include passwords, API keys, database credentials or private customer data. We arrange private repository invitations later.</p><p>Prefer email? <a className="rescue-link" href={`mailto:${site.email}?subject=AI%20app%20diagnosis`}>{site.email}</a></p><p className="rescue-caption">Already working with us through Fiverr or Upwork? Keep your enquiry, communication and payment on that platform.</p></div><InquiryForm rescue /></div></section>
  </main><Footer /></>;
}
