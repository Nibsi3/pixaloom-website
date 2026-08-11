import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { provinces, allCoverageAreas } from '@/lib/locations';
import { pageMetadata } from '@/lib/site';

export const metadata:Metadata=pageMetadata({title:'Web Design Across South Africa',description:'Website design, ecommerce, SEO and web application development across all nine South African provinces, cities and regional towns.',path:'/locations'});

export default function LocationsPage(){return <><Header/><main id="main-content">
  <section className="page-hero"><div className="site-container page-hero-grid"><div><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>South Africa</span></div><p className="eyebrow"><MapPin size={14}/> Nationwide service</p><h1>Web design for South Africa’s <em>ambitious businesses.</em></h1></div><p className="lead">Based in George and set up for focused remote collaboration across every province—from major metros to regional towns and specialist businesses serving national markets.</p></div></section>
  <section className="content-section alt"><div className="site-container"><div className="stats-strip"><div><strong>9</strong><span>provinces served</span></div><div><strong>8</strong><span>metropolitan markets</span></div><div><strong>{allCoverageAreas.length}+</strong><span>named towns and cities</span></div><div><strong>1</strong><span>senior delivery team</span></div></div><div className="location-card-grid" style={{marginTop:28}}>{provinces.map((province,index)=><Link className="location-card" href={`/locations/${province.slug}`} key={province.slug}><span>0{index+1}</span><h2>{province.name}</h2><p>{province.towns.slice(0,5).join(' · ')}</p><span className="card-link">View province <ArrowUpRight size={15}/></span></Link>)}</div></div></section>
  <section className="content-section"><div className="site-container content-grid"><div><p className="eyebrow">Real coverage, no pretend offices</p><h2>National reach without doorway-page spam.</h2></div><div className="body-copy"><p>Pixaloom has one real base in George and works remotely throughout South Africa. We do not invent local offices or publish hundreds of near-identical pages. Each province guide explains the market context and provides a useful, browseable coverage directory.</p><p>That creates a clear national service footprint for customers and search engines while keeping every claim accurate.</p><Link href="/services/website-design" className="text-link">Explore website design <ArrowRight size={15}/></Link></div></div></section>
  <section className="content-section alt"><div className="site-container cta-panel"><h2>Your town is part of our service area.</h2><Link href="/contact" className="button button-light">Tell us where you are <ArrowRight size={18}/></Link></div></section>
  </main><Footer/></>}
