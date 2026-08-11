import type { Metadata } from 'next';

export const site = {
  name: 'Pixaloom',
  url: 'https://www.pixaloom.co.za',
  email: 'info@pixaloom.co.za',
  phoneDisplay: '066 299 5533',
  phoneInternational: '+27662995533',
  whatsapp: 'https://wa.me/27662995533',
  location: 'George, Western Cape, South Africa',
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
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'en_ZA',
      siteName: site.name,
      title: socialTitle,
      description,
      url: path,
      images: [{ url: image, alt: socialTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image === '/opengraph-image' ? '/twitter-image' : image],
    },
  };
}
