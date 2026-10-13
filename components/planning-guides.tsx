import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { publishedBlogPosts } from '@/components/blog-posts';

const serviceGuides: Record<string, string[]> = {
  'website-design': ['how-much-does-website-cost-south-africa', 'next-js-vs-wordpress-south-africa', 'lead-generation-website-design'],
  'ecommerce-websites': ['ecommerce-website-south-africa', 'mobile-first-design-importance'],
  'web-app-development': ['ai-app-launch-checklist', 'web-app-vs-website-difference'],
  'website-care': ['website-maintenance-importance', 'website-speed-matters-south-africa', 'ssl-https-website-security'],
  seo: ['seo-tips-garden-route-businesses', 'content-marketing-small-business', 'structured-data-schema-markup-seo'],
};

export function PlanningGuides({ service, slugs, heading = 'Make the next decision with confidence.' }: {
  service?: string; slugs?: string[]; heading?: string;
}) {
  const selected = slugs ?? (service ? serviceGuides[service] : []) ?? [];
  const posts = selected.flatMap(slug => {
    const post = publishedBlogPosts.find(item => item.slug === slug);
    return post ? [post] : [];
  });
  if (!posts.length) return null;
  return <section className="content-section alt"><div className="site-container">
    <div className="section-heading-row"><div><p className="eyebrow">Practical planning guides</p><h2>{heading}</h2></div></div>
    <div className="location-card-grid">{posts.map(post => <Link className="location-card" href={`/blog/${post.slug}`} key={post.slug}>
      <span>{post.category} · {post.readTime}</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="card-link">Read the guide <ArrowUpRight size={15} /></span>
    </Link>)}</div>
  </div></section>;
}
