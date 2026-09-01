import type { MetadataRoute } from 'next';
import { publishedBlogPosts } from '@/components/blog-posts';
import { workItems } from '@/components/work-items';
import { provinces } from '@/lib/locations';
import { services } from '@/lib/services';
import { absoluteUrl, site } from '@/lib/site';

const lastModified = new Date(site.contentRevised);

export default function sitemap(): MetadataRoute.Sitemap {
  const core = [
    ['', 1, 'weekly'],
    ['/services', .95, 'monthly'],
    ['/projects', .85, 'monthly'],
    ['/locations', .9, 'monthly'],
    ['/locations/george', .95, 'monthly'],
    ['/locations/garden-route', .9, 'monthly'],
    ['/website-cost', .92, 'monthly'],
    ['/about', .7, 'yearly'],
    ['/blog', .8, 'weekly'],
    ['/contact', .7, 'yearly'],
  ] as const;

  return [
    ...core.map(([path, priority, changeFrequency]) => ({ url: path ? absoluteUrl(path) : site.url, lastModified, changeFrequency, priority })),
    ...services.map((item) => ({ url: absoluteUrl(`/services/${item.slug}`), lastModified, changeFrequency: 'monthly' as const, priority: .9 })),
    ...provinces.map((item) => ({ url: absoluteUrl(`/locations/${item.slug}`), lastModified, changeFrequency: 'monthly' as const, priority: .8 })),
    ...workItems.map((item) => ({ url: absoluteUrl(`/work/${item.slug}`), lastModified, changeFrequency: 'yearly' as const, priority: .65 })),
    ...publishedBlogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date(post.date), changeFrequency: 'yearly' as const, priority: .65 })),
  ];
}
