import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { publishedBlogPosts } from '@/components/blog-posts';
import { absoluteUrl, pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({ title: 'Web Design & SEO Journal', description: 'Evidence-led guidance on website strategy, ecommerce, SEO, performance and digital growth for South African businesses.', path: '/blog' });

const featuredPost = publishedBlogPosts[0];
const journalSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Pixaloom Journal',
  url: absoluteUrl('/blog'),
  blogPost: publishedBlogPosts.map((post) => ({ '@type': 'BlogPosting', headline: post.title, description: post.excerpt, datePublished: post.date, url: absoluteUrl(`/blog/${post.slug}`) })),
};

export default function BlogPage() {
  return <><Header /><main id="main-content" className="minimal-page">
    <JsonLd id="journal-schema" data={journalSchema} />

    <section className="minimal-hero minimal-journal-hero">
      <div className="minimal-shell">
        <div className="minimal-crumb"><Link href="/">Home</Link><span>/</span><span>Journal</span></div>
        <p className="minimal-kicker">Strategy · Design · Development · SEO</p>
        <h1>Useful thinking.<br /><em>No trend theatre.</em></h1>
        <div className="minimal-hero-foot"><p>Research-backed guidance shaped by hands-on South African website, ecommerce and search work. Sources and practical context are included with every published article.</p><span>{publishedBlogPosts.length} reviewed articles</span></div>
      </div>
    </section>

    {featuredPost ? <section className="minimal-featured-article"><div className="minimal-shell">
      <div className="minimal-section-mark"><span>01</span><p>Featured thinking</p></div>
      <Link href={`/blog/${featuredPost.slug}`}>
        <div><span>{featuredPost.category}</span><time dateTime={featuredPost.date}>{new Intl.DateTimeFormat('en-ZA', { dateStyle: 'medium' }).format(new Date(featuredPost.date))}</time></div>
        <h2>{featuredPost.title}</h2><p>{featuredPost.excerpt}</p><strong>Read article <ArrowUpRight size={14} /></strong>
      </Link>
    </div></section> : null}

    <section className="minimal-journal-index"><div className="minimal-shell">
      <div className="minimal-index-heading"><div className="minimal-section-mark"><span>02</span><p>Journal index</p></div><h2>Browse every<br />perspective.</h2></div>
      <div className="minimal-article-list">{publishedBlogPosts.slice(1).map((post, index) => <Link href={`/blog/${post.slug}`} key={post.slug}>
        <span>{String(index + 2).padStart(2, '0')}</span><div><p>{post.category} · {post.readTime}</p><h3>{post.title}</h3></div><time dateTime={post.date}>{new Intl.DateTimeFormat('en-ZA', { year: 'numeric', month: 'short' }).format(new Date(post.date))}</time><ArrowRight size={14} />
      </Link>)}</div>
    </div></section>
  </main><Footer /></>;
}
