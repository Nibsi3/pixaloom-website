import type { Metadata } from 'next';

export const site = {
  name: 'Pixaloom',
  url: 'https://www.pixaloom.co.za',
  email: 'info@pixaloom.co.za',
  phoneDisplay: '066 299 5533',
  phoneInternational: '+27662995533',
  whatsapp: 'https://wa.me/27662995533',
  location: 'George, Western Cape, South Africa',
  editor: 'Cameron Falck',
  description:
    'South African web design company building fast, conversion-focused websites, ecommerce stores and custom web applications with SEO built in.',
} as const;

export const primaryNavigation = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Works' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Journal' },
] as const;

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}

export function truncateDescription(value: string, maximumLength = 155) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maximumLength) return normalized;

  const candidate = normalized.slice(0, maximumLength + 1);
  const wordBoundary = candidate.lastIndexOf(' ');
  const shortened = candidate.slice(0, wordBoundary > maximumLength * 0.75 ? wordBoundary : maximumLength);
  return `${shortened.replace(/[,:;.!?\s]+$/u, '')}…`;
}

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  image = '/opengraph-image',
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
}): Metadata {
  const socialTitle = `${title} | ${site.name}`;
  const summary = truncateDescription(description);
  return {
    title: path === '/' ? { absolute: socialTitle } : title,
    description: summary,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type,
      locale: 'en_ZA',
      siteName: site.name,
      title: socialTitle,
      description: summary,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl(image), alt: socialTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: summary,
      images: [absoluteUrl(image === '/opengraph-image' ? '/twitter-image' : image)],
    },
  };
}
