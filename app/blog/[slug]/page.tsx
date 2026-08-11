import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { publishedBlogPosts } from '@/components/blog-posts';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

const seoTitles: Record<string, string> = {
  'why-george-businesses-need-modern-website': 'George Business Website Guide',
  'next-js-vs-wordpress-south-africa': 'Next.js vs WordPress in South Africa',
  'seo-tips-garden-route-businesses': 'Garden Route SEO: 10 Practical Tips',
  'how-much-does-website-cost-south-africa': 'Website Costs in South Africa',
  'website-speed-matters-south-africa': 'Website Speed in South Africa',
  'lead-generation-website-design': 'Lead-Generation Website Design',
  'google-business-profile-george': 'Google Business Profile in George',
  'ecommerce-website-south-africa': 'Ecommerce Websites in South Africa',
  'mobile-first-design-importance': 'Mobile-First Website Design',
  'ssl-https-website-security': 'SSL and HTTPS Website Security',
  'content-marketing-small-business': 'Small-Business Content Marketing',
  'web-app-vs-website-difference': 'Web App vs Website',
  'george-tourism-website-best-practices': 'Garden Route Tourism Websites',
  'website-maintenance-importance': 'Website Maintenance Guide',
  'structured-data-schema-markup-seo': 'Structured Data for SEO',
  'choosing-web-developer-george': 'Choosing a Web Developer in George',
};

const seoDescriptions: Record<string, string> = {
  'why-george-businesses-need-modern-website': 'A practical guide to building a credible, fast and search-ready website for a business in George, Western Cape.',
  'next-js-vs-wordpress-south-africa': 'Compare Next.js and WordPress on editing, performance, maintenance and cost for a South African business website.',
  'seo-tips-garden-route-businesses': 'Ten practical local SEO improvements for businesses in George, Knysna, Mossel Bay and the wider Garden Route.',
  'how-much-does-website-cost-south-africa': 'Understand the scope, quality and ongoing costs that shape website pricing in South Africa.',
  'website-speed-matters-south-africa': 'How website speed affects South African users, search visibility and conversion, with practical performance priorities.',
  'lead-generation-website-design': 'A practical framework for turning website visits into qualified enquiries without sacrificing clarity or trust.',
  'google-business-profile-george': 'Set up and improve a Google Business Profile for accurate, useful local visibility in George.',
  'ecommerce-website-south-africa': 'Planning guidance for South African ecommerce payments, delivery, security, performance and customer experience.',
  'mobile-first-design-importance': 'Why mobile-first design matters and what to test before launching a South African business website.',
  'ssl-https-website-security': 'A plain-language guide to HTTPS, TLS certificates and the security foundations every business website needs.',
  'content-marketing-small-business': 'A practical content system for small businesses that prioritises useful expertise over publishing volume.',
  'web-app-vs-website-difference': 'Understand when a conventional website is enough and when your workflow genuinely requires a web application.',
  'george-tourism-website-best-practices': 'Website priorities for Garden Route tourism businesses, from mobile booking journeys to local trust signals.',
  'website-maintenance-importance': 'What ongoing website maintenance should cover, including security, content, performance and conversion checks.',
  'structured-data-schema-markup-seo': 'How structured data helps search engines understand a website, with practical implementation guidance.',
  'choosing-web-developer-george': 'A practical checklist for evaluating a web developer in George, including ownership, performance and support.',
};

export function generateStaticParams(){return publishedBlogPosts.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const post=publishedBlogPosts.find(p=>p.slug===slug);if(!post)return{};const title=seoTitles[slug]??post.title;const description=seoDescriptions[slug]??post.excerpt;const metadata=pageMetadata({title,description,path:`/blog/${slug}`,type:'article'});return{...metadata,openGraph:{...metadata.openGraph,type:'article',publishedTime:post.date,modifiedTime:'2026-08-11',authors:[site.name],tags:post.tags}}}

function InlineText({text}:{text:string}){const parts=text.split(/(\*\*[^*]+\*\*)/g);return <>{parts.map((part,i)=>part.startsWith('**')&&part.endsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:<span key={i}>{part}</span>)}</>}
function ArticleContent({content}:{content:string}){return <div className="article-body">{content.split('\n\n').filter(Boolean).map((block,index)=>{if(block.startsWith('# '))return <h2 key={index}>{block.slice(2)}</h2>;if(block.startsWith('## '))return <h2 key={index}>{block.slice(3)}</h2>;if(block.startsWith('**')&&block.endsWith('**')&&!block.includes('\n'))return <h2 key={index}>{block.replace(/\*\*/g,'')}</h2>;if(block.split('\n').every(line=>/^[-*] /.test(line)))return <ul key={index}>{block.split('\n').map(line=><li key={line}><InlineText text={line.replace(/^[-*] /,'')}/></li>)}</ul>;if(block.split('\n').every(line=>/^\d+\. /.test(line)))return <ol key={index}>{block.split('\n').map(line=><li key={line}><InlineText text={line.replace(/^\d+\. /,'')}/></li>)}</ol>;return <p key={index}><InlineText text={block.replace(/^#+\s*/, '')}/></p>})}</div>}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=publishedBlogPosts.find(p=>p.slug===slug);if(!post)notFound();const schema={'@context':'https://schema.org','@graph':[{'@type':'BlogPosting','@id':absoluteUrl(`/blog/${slug}#article`),headline:post.title,description:post.excerpt,datePublished:post.date,dateModified:'2026-08-11',mainEntityOfPage:{'@type':'WebPage','@id':absoluteUrl(`/blog/${slug}`)},url:absoluteUrl(`/blog/${slug}`),image:absoluteUrl('/opengraph-image'),inLanguage:'en-ZA',keywords:post.tags.join(', '),author:{'@id':`${site.url}/#organization`},publisher:{'@id':`${site.url}/#organization`},isPartOf:{'@id':`${site.url}/#website`},citation:post.sources?.map(source=>source.url)},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:site.url},{'@type':'ListItem',position:2,name:'Journal',item:absoluteUrl('/blog')},{'@type':'ListItem',position:3,name:post.title,item:absoluteUrl(`/blog/${slug}`)}]}]};return <><Header/><main id="main-content"><JsonLd id="article-schema" data={schema}/>
  <article><header className="article-hero"><div className="article-container"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/blog">Journal</Link><span>/</span><span>{post.category}</span></div><p className="eyebrow">{post.category} · {post.readTime}</p><h1>{post.title}</h1><p>{post.excerpt}</p></div></header><div className="article-container article-layout"><aside><span>Published</span><strong>{new Intl.DateTimeFormat('en-ZA',{dateStyle:'long'}).format(new Date(post.date))}</strong><span>Reviewed</span><strong>11 August 2026</strong><span>Editorial basis</span><p>Pixaloom project experience and the cited primary sources.</p><span>Topics</span><div className="pill-list">{post.tags.map(t=><span className="pill" key={t}>{t}</span>)}</div></aside><div><ArticleContent content={post.content}/>{post.sources?.length?<section className="article-sources" aria-labelledby="article-sources-title"><h2 id="article-sources-title">Research sources</h2><ol>{post.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span></li>)}</ol></section>:null}</div></div></article>
  <section className="content-section alt"><div className="site-container cta-panel"><h2>Turn the thinking into a better website.</h2><Link href="/contact" className="button button-light">Discuss your project <ArrowRight size={18}/></Link></div></section>
  </main><Footer/></>}
