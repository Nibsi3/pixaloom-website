import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Public experiments must be crawlable for their noindex tags to work.
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
