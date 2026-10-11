import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';
import { contentModified } from '@/lib/content-dates';
import { websiteOffer } from '@/lib/website-offer';

const description = 'Pixaloom offers websites for R3000 in South Africa. Tell us about your business and discuss whether the R3000 website offer fits your needs.';
export const metadata: Metadata = pageMetadata({ title: 'Websites for R3000 in South Africa', description, path: '/website-offer' });

export default function WebsiteOfferPage() {
  return <><Header /><main id="main-content">
    <JsonLd id="website-offer-schema" data={{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Websites for R3000', description, url: absoluteUrl('/website-offer'), dateModified: contentModified('/website-offer'), about: { '@id': `${site.url}/#organization` } }} />
    <section className="page-hero"><div className="site-container page-hero-grid">
      <div><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Website offer</span></div><p className="eyebrow">Pixaloom · South Africa</p><h1>Websites for <em>R3000.</em></h1></div>
      <div><p className="lead">Tell us about your business and what you need your website to do. Let&apos;s discuss whether the R3000 website offer fits.</p><Link href={websiteOffer.contactUrl} className="button button-dark">Ask about the R3000 offer <ArrowRight size={18} /></Link></div>
    </div></section>
    <section className="content-section alt"><div className="site-container contact-grid">
      <div><p className="eyebrow">Start a conversation</p><h2>Is this offer right for your business?</h2><p>Share your business name, your existing website if you have one, and the outcome you want. Choose the R3000 website offer in our enquiry form so we can discuss it with you.</p><Link href={websiteOffer.contactUrl} className="text-link">Enquire about a R3000 website <ArrowRight size={18} /></Link></div>
      <div><p className="eyebrow">Custom projects</p><h2>Have a different brief?</h2><p>Our custom website planning ranges are separate from this offer. Explore them if you are planning a custom website, ecommerce store or web application.</p><Link href="/website-cost" className="text-link">Explore custom website pricing <ArrowRight size={18} /></Link><p><Link href="/contact">Discuss a custom project</Link></p></div>
    </div></section>
  </main><Footer /></>;
}
