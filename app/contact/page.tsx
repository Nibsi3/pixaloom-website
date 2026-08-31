import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { InquiryForm } from '@/components/inquiry-form';
import { JsonLd } from '@/components/json-ld';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export const metadata:Metadata=pageMetadata({title:'Contact Our Web Design Studio',description:'Discuss a website, ecommerce, SEO or web application project with Pixaloom in George, Western Cape.',path:'/contact'});
export default function ContactPage(){const schema={'@context':'https://schema.org','@type':'ContactPage',name:'Contact Pixaloom',url:absoluteUrl('/contact'),mainEntity:{'@id':`${site.url}/#organization`}};return <><Header/><main id="main-content"><JsonLd id="contact-schema" data={schema}/>
  <section className="page-hero"><div className="site-container page-hero-grid"><div><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Contact</span></div><p className="eyebrow">Let’s talk</p><h1>Start with the <em>outcome.</em></h1></div><p className="lead">Share the business context, what is not working and what a successful result would change. We’ll reply with useful questions and the clearest next step.</p></div></section>
  <section className="content-section alt"><div className="site-container contact-grid"><div><p className="eyebrow">Direct contact</p><h2>No switchboard. No sales maze.</h2><p>Pixaloom is based in George and works with clients across South Africa. Remote projects run through focused video calls, shared decisions and visible delivery.</p><ul className="detail-list"><li><Mail size={18}/><div><strong>Email</strong><a href={`mailto:${site.email}`}>{site.email}</a></div></li><li><Phone size={18}/><div><strong>Phone</strong><a href={`tel:${site.phoneInternational}`}>{site.phoneDisplay}</a></div></li><li><MessageCircle size={18}/><div><strong>WhatsApp</strong><a href={site.whatsapp}>Start a conversation</a></div></li><li><MapPin size={18}/><div><strong>Base</strong><span>{site.location}</span></div></li></ul><p className="lead" style={{marginTop:28}}><Link href="/website-cost" className="text-link">Check a website cost range first</Link> if you want a planning number before the brief.</p></div><InquiryForm/></div></section>
  </main><Footer/></>}
