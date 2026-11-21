import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, CircleDot } from 'lucide-react';
import { RescueIntro } from '@/components/rescue-intro';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { ServiceProof } from '@/components/service-proof';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';
import { getService, services } from '@/lib/services';
import { estimateContactUrl } from '@/lib/website-cost';

export function generateStaticParams() { return services.map(({slug})=>({slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const service=getService(slug); if(!service)return {};
  return pageMetadata({title:service.seoTitle,description:service.description,path:`/services/${slug}`});
}

function EcommerceExample() {
  return (
    <section className="content-section alt" aria-labelledby="vicbay-example">
      <div className="site-container content-grid">
        <div className="body-copy">
          <p className="eyebrow">VicBay apparel catalogue</p>
          <h2 id="vicbay-example">One T-shirt, eight sizes and reseller pricing.</h2>
          <p>On VicBay’s Premium T-Shirt page, a buyer can browse colours and sizes before signing in to see pricing or place an order. New trade customers can apply to become resellers from the same page.</p>
          <p>For your online shop, start with one product. What options does the customer choose? Who can see the price? Those answers shape the catalogue and whether your store needs trade accounts.</p>
          <Link className="text-link" href="/work/vicbay">See the VicBay ecommerce project <ArrowRight size={16} /></Link>
        </div>
        <figure className="article-project-evidence" style={{ margin: 0 }}>
          <Image
            src="/portfolio/2026-10-19/vicbay-detail-2.png"
            alt="VicBay Premium T-Shirt 220g page showing colour swatches, sizes S to 5XL and reseller sign-in"
            width={3200}
            height={2000}
            sizes="(max-width: 900px) calc(100vw - 32px), (max-width: 1400px) 62vw, 850px"
          />
          <figcaption>VicBay’s product page, captured 19 October 2026. The size choices and sign-in requirement sit beside the product photograph.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const service=getService(slug); if(!service)notFound();
  const isStore = slug === 'ecommerce-websites';
  const enquiryUrl = isStore ? estimateContactUrl('ecommerce', 'focused', []) : `/contact?service=${slug}#project-enquiry`;
  const enquiryLabel = isStore ? 'Get an online shop quote' : `Ask about ${service.shortName.toLowerCase()}`;
  const schema={'@context':'https://schema.org','@graph':[{'@type':'Service','@id':absoluteUrl(`/services/${slug}#service`),name:service.name,description:service.description,provider:{'@id':`${site.url}/#organization`},areaServed:{'@type':'Country',name:'South Africa'},url:absoluteUrl(`/services/${slug}`)},breadcrumbSchema([{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:service.name,path:`/services/${slug}`}]),faqPageSchema(`/services/${slug}`,service.faqs)]};
  return <><Header/><main id="main-content"><JsonLd id="service-schema" data={schema}/>
    <section className="page-hero">
      <div className="site-container page-hero-grid">
        <div>
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>{service.shortName}</span></div>
          <p className="eyebrow">{service.eyebrow}</p><h1>{service.name}</h1>
        </div>
        <div>
          <p className="lead">{service.description}</p>
          {isStore && <p className="service-budget">Hosting, transaction fees and VAT where applicable are separate. The quote depends on your products, delivery rules and any systems the store needs to connect to.</p>}
          <Link href={enquiryUrl} className="button button-accent" style={{marginTop:24}}>
            {enquiryLabel} <ArrowRight size={18}/>
          </Link>
        </div>
      </div>
    </section>
    {isStore ? <EcommerceExample /> : (
      <section className="content-section alt"><div className="site-container content-grid"><div><p className="eyebrow">The outcome</p><h2>{service.promise}</h2></div><div className="feature-grid">{service.outcomes.map(outcome=><article className="feature-card" key={outcome}><CircleDot size={22} aria-hidden="true"/><h3>{outcome}</h3></article>)}</div></div></section>
    )}
    <section className="content-section"><div className="site-container content-grid"><div><h2>What's included</h2><div className="pill-list">{service.suitedFor.map((item)=><span className="pill" key={item}>{item}</span>)}</div></div><ul className="detail-list">{service.inclusions.map((item)=><li key={item}><Check size={18}/><strong>{item}</strong></li>)}</ul></div></section>
    <ServiceProof slug={slug} />
    <section className="content-section dark"><div className="site-container"><div className="section-heading-row"><div><p className="eyebrow eyebrow-light">The process</p><h2>Built in the right order.</h2></div></div><div className="steps-grid">{service.process.map((step,index)=><article className="step-card" key={step.title}><span>0{index+1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
    <section className="content-section"><div className="site-container content-grid"><div><p className="eyebrow">Questions, answered</p><h2>What clients ask before we start.</h2></div><div className="faq-list">{service.faqs.map((faq)=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    {service.slug === 'web-app-development' || service.slug === 'website-care' ? <RescueIntro /> : null}
    <section className="content-section alt"><div className="site-container cta-panel"><h2>{isStore ? 'What would you like to sell online?' : 'Tell Cameron what you need.'}</h2><Link href={enquiryUrl} className="button button-light">{enquiryLabel} <ArrowRight size={18}/></Link></div></section>
  </main><Footer/></>;
}
