import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { ArticleContent } from '@/components/article-content';
import { publishedBlogPosts } from '@/components/blog-posts';
import { workItems } from '@/components/work-items';
import { getService } from '@/lib/services';
import { projectMediaDescription } from '@/lib/project-evidence';
import { absoluteUrl, pageMetadata, site } from '@/lib/site';

export function generateStaticParams() { return publishedBlogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = publishedBlogPosts.find(p => p.slug === slug);
  if (!post) return {};
  const project = workItems.find(item => item.slug === post.project);
  const metadata = pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${slug}`, type: 'article', image: project?.gallery?.[0] });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: 'article', publishedTime: post.date, modifiedTime: post.modified, authors: [site.name], tags: post.tags } };
}
const dateLabel = (date: string) => new Intl.DateTimeFormat('en-ZA', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date));

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = publishedBlogPosts.find(p => p.slug === slug);
  if (!post) notFound();
  const project = workItems.find(item => item.slug === post.project);
  const media = project?.gallery?.[0];
  const service = getService(post.service);
  const related = publishedBlogPosts.filter(item => item.slug !== slug && item.service === post.service).slice(0, 2);
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BlogPosting', '@id': absoluteUrl(`/blog/${slug}#article`), headline: post.title, description: post.excerpt, datePublished: post.date, dateModified: post.modified, mainEntityOfPage: absoluteUrl(`/blog/${slug}`), url: absoluteUrl(`/blog/${slug}`), image: absoluteUrl(media || '/opengraph-image'), inLanguage: 'en-ZA', author: { '@id': `${site.url}/#organization` }, publisher: { '@id': `${site.url}/#organization` }, citation: post.sources.map(source => source.url) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: site.url }, { '@type': 'ListItem', position: 2, name: 'Journal', item: absoluteUrl('/blog') }, { '@type': 'ListItem', position: 3, name: post.title, item: absoluteUrl(`/blog/${slug}`) }] },
  ] };
  return <><Header /><main id="main-content"><JsonLd id="article-schema" data={schema} />
    <article><header className="article-hero"><div className="article-container"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/blog">Journal</Link><span>/</span><span>{post.category}</span></div><p className="eyebrow">{post.category} · {post.readTime}</p><h1>{post.title}</h1><p>{post.excerpt}</p></div></header>
      <div className="article-container article-layout"><aside><span>Published</span><strong><time dateTime={post.date}>{dateLabel(post.date)}</time></strong><span>Updated</span><strong><time dateTime={post.modified}>{dateLabel(post.modified)}</time></strong><span>By Pixaloom</span><p>Editorial contact: <Link href="/about#cameron-falck">{site.editor}</Link>. Questions or corrections? <Link href="/contact">Get in touch</Link>.</p><div className="pill-list">{post.tags.map(tag => <span className="pill" key={tag}>{tag}</span>)}</div></aside>
        <div><ArticleContent content={post.content} />
          {project && media ? <figure className="article-project-evidence"><Image src={media} alt={projectMediaDescription(project, media)} width={1440} height={1000} sizes="(max-width: 760px) 100vw, 720px" /><figcaption><Link href={`/work/${project.slug}`}>{project.name}: view the interface study</Link>. Existing project capture; illustrates the interface, not independently verified commercial results.</figcaption></figure> : null}
          {service ? <section className="article-sources"><h2>Put this into practice</h2><p><Link href={`/services/${service.slug}`}>{service.name}</Link>: {service.description}</p>{related.map(item => <p key={item.slug}><Link href={`/blog/${item.slug}`}>{item.title}</Link></p>)}</section> : null}
          <section className="article-sources" aria-labelledby="article-sources-title"><h2 id="article-sources-title">Further reading and technical sources</h2><p>Primary guidance for the topics above. Pixaloom pricing and project descriptions are our own, not findings from these sources.</p><ol>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span></li>)}</ol></section>
        </div></div>
    </article><section className="content-section alt"><div className="site-container cta-panel"><h2>Turn the thinking into a better website.</h2><Link href="/contact" className="button button-light">Discuss your project <ArrowRight size={18} /></Link></div></section>
  </main><Footer /></>;
}
