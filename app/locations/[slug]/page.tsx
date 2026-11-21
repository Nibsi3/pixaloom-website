import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { publishedBlogPosts } from '@/components/blog-posts';
import { getProvince, localHubs, provinces } from '@/lib/locations';
import { regionalBriefs } from '@/lib/regional-briefs';
import { breadcrumbSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

type ProvinceProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return provinces.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProvinceProps): Promise<Metadata> {
  const { slug } = await params;
  const province = getProvince(slug);
  if (!province) return {};
  return pageMetadata({
    title: `Web Design in ${province.name}`,
    description: province.lead,
    path: `/locations/${slug}`,
  });
}

export default async function ProvincePage({ params }: ProvinceProps) {
  const { slug } = await params;
  const province = getProvince(slug);
  if (!province) notFound();

  const brief = regionalBriefs[slug];
  const guide = publishedBlogPosts.find((post) => post.slug === brief.guide);
  const path = `/locations/${slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Website design for businesses in ${province.name}`,
        serviceType: 'Website design and development',
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'AdministrativeArea', name: province.name, containedInPlace: { '@type': 'Country', name: 'South Africa' } },
        url: absoluteUrl(path),
      },
      breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'South Africa', path: '/locations' }, { name: province.name, path }]),
    ],
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <JsonLd id="location-schema" data={schema} />
        <section className="page-hero">
          <div className="site-container page-hero-grid">
            <div>
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link><span aria-hidden="true">/</span>
                <Link href="/locations">South Africa</Link><span aria-hidden="true">/</span>
                <span aria-current="page">{province.name}</span>
              </nav>
              <h1>Web design in <em>{province.name}.</em></h1>
            </div>
            <div>
              <p className="lead">{province.lead}</p>
              <div className="minimal-inline-links" style={{ marginTop: 28 }}>
                <Link href="/website-cost#price-list">Compare website prices <ArrowRight size={15} /></Link>
                <Link href="/contact">Discuss your website with Cameron</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="site-container content-grid">
            <div><h2>{brief.title}</h2></div>
            <div className="body-copy">
              <p>{brief.brief}</p>
              <ul>{brief.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
              {guide && <Link href={`/blog/${guide.slug}`} className="text-link">{guide.title} <ArrowRight size={15} /></Link>}
            </div>
          </div>
        </section>
        {slug === 'western-cape' && (
          <section className="content-section alt">
            <div className="site-container">
              <h2>George and the Garden Route.</h2>
              <div className="location-card-grid" style={{ marginTop: 28 }}>
                {localHubs.map((hub) => (
                  <Link className="location-card" href={hub.href} key={hub.slug}>
                    <h3>{hub.name}</h3><p>{hub.summary}</p>
                    <span className="card-link">Website design in {hub.name} <ArrowRight size={15} /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="content-section alt">
          <div className="site-container content-grid">
            <div>
              <h2>Working online across {province.name}.</h2>
              <p>{province.opportunity}</p>
            </div>
            <div className="body-copy">
              <p>Cameron works online from George. Send a link to your current site, the action you want customers to take and who will handle the enquiry. We agree the scope in writing and share a working preview for you to try on your own phone.</p>
              <details><summary>View towns we serve online</summary>
                <div className="town-directory">{province.towns.map((town) => <span key={town}>{town}</span>)}</div>
              </details>
              <div className="minimal-inline-links">
                <Link href="/services/website-design">Business website design</Link>
                <Link href="/services/ecommerce-websites">Online stores</Link>
                <Link href="/services">All services</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
