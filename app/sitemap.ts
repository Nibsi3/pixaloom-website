import type { MetadataRoute } from 'next';
import { publishedBlogPosts } from '@/components/blog-posts';
import { workItems } from '@/components/work-items';
import { contentModified } from '@/lib/content-dates';
import { provinces } from '@/lib/locations';
import { services } from '@/lib/services';
import { absoluteUrl, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const core = [
    '/',
    '/services',
    '/ai-website-app-rescue',
    '/projects',
    '/capabilities',
    '/locations',
    '/locations/george',
    '/locations/garden-route',
    '/website-cost',
    '/custom-website-vs-website-builder',
    '/about',
    '/blog',
    '/contact',
    '/privacy',
  ];
  const paths = [
    ...core,
    ...services.map(({ slug }) => `/services/${slug}`),
    ...provinces.map(({ slug }) => `/locations/${slug}`),
  ];

  return [
    ...paths.map((path) => ({
      url: path === '/' ? site.url : absoluteUrl(path),
      lastModified: contentModified(path),
    })),
    ...workItems.map((item) => ({
      url: absoluteUrl(`/work/${item.slug}`),
      lastModified: contentModified(`/work/${item.slug}`),
      images: (item.gallery?.length ? item.gallery.slice(0, 6) : [item.png]).map((image) => absoluteUrl(image)),
    })),
    ...publishedBlogPosts.map((post) => {
      const image = workItems.find((item) => item.slug === post.project)?.gallery?.[0];
      return {
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post.modified,
        ...(image ? { images: [absoluteUrl(image)] } : {}),
      };
    }),
  ];
}
