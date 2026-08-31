import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { services } from '@/lib/services';
import { absoluteUrl, pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({ title: 'Web Design & SEO Services', description: 'Website design, ecommerce, SEO, web application development and ongoing website care for businesses across South Africa.', path: '/services' });

const delivery = [
  ['Discover', 'Commercial goals, users, constraints and proof.'],
  ['Structure', 'Page hierarchy, messaging and conversion plan.'],
  ['Design', 'A distinctive, responsive interface system.'],
  ['Deliver', 'Development, testing, launch and measurement.'],
];

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Pixaloom digital services',
  itemListElement: services.map((service, index) => ({ '@type': 'ListItem', position: index + 1, name: service.name, url: absoluteUrl(`/services/${service.slug}`) })),
};

export default function ServicesPage() {
  return <><Header /><main id="main-content" className="minimal-page">
    <JsonLd id="services-index-schema" data={servicesSchema} />

    <section className="minimal-hero">
      <div className="minimal-shell">
        <div className="minimal-crumb"><Link href="/">Home</Link><span>/</span><span>Services</span></div>
        <p className="minimal-kicker">Strategy · Design · Engineering · Search</p>
        <h1>Web design &amp; SEO<br /> <em>that earns its place.</em></h1>
        <div className="minimal-hero-foot"><p>Connected web design, ecommerce, SEO and software development for South African businesses that want clearer positioning, better performance and measurable outcomes.</p><span>Five connected capabilities</span></div>
      </div>
    </section>

    <section className="minimal-service-section">
      <div className="minimal-shell">
        <div className="minimal-section-mark"><span>01</span><p>Capabilities</p></div>
        <div className="minimal-service-list">
          {services.map((service, index) => <Link href={`/services/${service.slug}`} key={service.slug}>
            <span>0{index + 1}</span><h2>{service.name}</h2><p>{service.description}</p><ArrowUpRight size={16} />
          </Link>)}
        </div>
      </div>
    </section>

    <section className="minimal-statement">
      <div className="minimal-shell minimal-statement-grid">
        <div className="minimal-section-mark"><span>02</span><p>One connected system</p></div>
        <div><h2>Not separate<br /> <em>departments.</em></h2><div className="minimal-prose"><p>A site can look impressive and still be difficult to find, slow to use or vague about what to do next. Pixaloom considers positioning, content, interface, engineering, search and conversion as one system from the beginning.</p><p>That gives every visual decision a commercial reason and every technical decision a clear owner.</p></div></div>
      </div>
    </section>

    <section className="minimal-index-section">
      <div className="minimal-shell">
        <div className="minimal-index-heading"><div className="minimal-section-mark"><span>03</span><p>Delivery</p></div><h2>Clear at every<br />handover.</h2></div>
        <ol className="minimal-process-list">{delivery.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </div>
    </section>

    <section className="minimal-close"><div className="minimal-shell"><p className="minimal-kicker">Start with the problem</p><h2>Not sure which service fits?<br /> <em>We’ll make it clear.</em></h2><div className="minimal-inline-links"><Link href="/contact">Talk it through <ArrowRight size={15} /></Link><Link href="/website-cost">Estimate website cost <ArrowUpRight size={14} /></Link></div></div></section>
  </main><Footer /></>;
}
