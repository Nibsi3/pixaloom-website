import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { localHubs, provinces } from '@/lib/locations';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Web Design Across South Africa',
  description: 'Website design, ecommerce, SEO and web application development across all nine South African provinces, cities and regional towns.',
  path: '/locations',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Web design across South Africa',
  url: absoluteUrl('/locations'),
  about: { '@id': `${site.url}/#organization` },
};

export default function LocationsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <JsonLd id="locations-schema" data={schema} />
        <section className="page-hero">
          <div className="site-container page-hero-grid">
            <div>
              <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span>South Africa</span>
              </div>
              <p className="eyebrow">
                <MapPin size={14} /> Nationwide service
              </p>
              <h1>
                Web design for South Africa’s <em>ambitious businesses.</em>
              </h1>
            </div>
            <p className="lead">
              Work online with Cameron Falck, a website designer based in George. Review a design, try the enquiry form and agree what goes live from anywhere in South Africa.
            </p>
          </div>
        </section>
        <section className="content-section">
          <div className="site-container">
            <div className="section-heading-row">
              <div>
                <h2>Website design in George and the Garden Route.</h2>
              </div>
            </div>
            <div className="location-card-grid" style={{ marginTop: 28 }}>
              {localHubs.map((hub) => (
                <Link className="location-card" href={hub.href} key={hub.slug}>
                  <span>{hub.label}</span>
                  <h2>{hub.name}</h2>
                  <p>{hub.summary}</p>
                  <span className="card-link">
                    View {hub.name} <ArrowUpRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="content-section alt">
          <div className="site-container">
            <h2>Find your province.</h2>
            <div className="location-card-grid" style={{ marginTop: 28 }}>
              {provinces.map((province, index) => (
                <Link className="location-card" href={`/locations/${province.slug}`} key={province.slug}>
                  <span>0{index + 1}</span>
                  <h2>{province.name}</h2>
                  <p>{province.towns.slice(0, 5).join(' · ')}</p>
                  <span className="card-link">
                    View province <ArrowUpRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="site-container content-grid">
            <div>
              <h2>How an online project works.</h2>
            </div>
            <div className="body-copy">
              <p>
                Send your existing website, the services or products you sell, and an example of an enquiry you would like to receive. We use those details to agree the pages, features and price in writing.
              </p>
              <p>
                You can review a working version on your own phone before launch. For a price to plan around, compare our <Link href="/website-cost#price-list">website build estimates in rand</Link>.
              </p>
              <Link href="/services/website-design" className="text-link">
                Explore website design <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
        <section className="content-section alt">
          <div className="site-container cta-panel">
            <h2>Your town is part of our service area.</h2>
            <Link href="/contact" className="button button-light">
              Tell us where you are <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
