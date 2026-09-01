import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, CircleDot } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';
import { getService, services } from '@/lib/services';

export function generateStaticParams() { return services.map(({slug})=>({slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const service=getService(slug); if(!service)return {};
  return pageMetadata({title:service.seoTitle,description:service.description,path:`/services/${slug}`});
}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const service=getService(slug); if(!service)notFound();
  const schema={'@context':'https://schema.org','@graph':[{'@type':'Service','@id':absoluteUrl(`/services/${slug}#service`),name:service.name,description:service.description,provider:{'@id':`${site.url}/#organization`},areaServed:{'@type':'Country',name:'South Africa'},url:absoluteUrl(`/services/${slug}`)},breadcrumbSchema([{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:service.name,path:`/services/${slug}`}]),faqPageSchema(`/services/${slug}`,service.faqs)]};
  return <><Header/><main id="main-content"><JsonLd id="service-schema" data={schema}/>
    <section className="page-hero"><div className="site-container page-hero-grid"><div><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>{service.shortName}</span></div><p className="eyebrow">{service.eyebrow}</p><h1>{service.name}</h1></div><div><p className="lead">{service.description}</p><Link href="/contact" className="button button-accent" style={{marginTop:24}}>Discuss your project <ArrowRight size={18}/></Link></div></div></section>
    <section className="content-section alt"><div className="site-container content-grid"><div><p className="eyebrow">The outcome</p><h2>{service.promise}</h2></div><div className="feature-grid">{service.outcomes.map((outcome,index)=><article className="feature-card" key={outcome}><CircleDot size={22}/><h3>0{index+1}</h3><p>{outcome}</p></article>)}</div></div></section>
    <section className="content-section"><div className="site-container content-grid"><div><p className="eyebrow">What’s included</p><h2>A complete foundation, not a pretty handoff.</h2><div className="pill-list">{service.suitedFor.map((item)=><span className="pill" key={item}>{item}</span>)}</div></div><ul className="detail-list">{service.inclusions.map((item)=><li key={item}><Check size={18}/><strong>{item}</strong></li>)}</ul></div></section>
    <section className="content-section dark"><div className="site-container"><div className="section-heading-row"><div><p className="eyebrow eyebrow-light">The process</p><h2>Built in the right order.</h2></div></div><div className="steps-grid">{service.process.map((step,index)=><article className="step-card" key={step.title}><span>0{index+1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
    <section className="content-section"><div className="site-container content-grid"><div><p className="eyebrow">Questions, answered</p><h2>What clients ask before we start.</h2></div><div className="faq-list">{service.faqs.map((faq)=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="content-section alt"><div className="site-container cta-panel"><h2>Ready to make this commercially useful?</h2><Link href="/contact" className="button button-light">Start the conversation <ArrowRight size={18}/></Link></div></section>
  </main><Footer/></>;
}
