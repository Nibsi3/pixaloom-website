import type { Metadata, Viewport } from 'next';
import './globals.css';
import { JsonLd } from '@/components/json-ld';
import { absoluteUrl, site } from '@/lib/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0b0b',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Web Design South Africa | Pixaloom', template: '%s | Pixaloom' },
  description: site.description,
  applicationName: site.name,
  category: 'Web design and development',
  keywords: ['web design South Africa', 'website design company', 'web development South Africa', 'ecommerce website development', 'SEO company South Africa'],
  authors: [{ name: 'Pixaloom', url: site.url }],
  creator: 'Pixaloom',
  publisher: 'Pixaloom',
  alternates: { canonical: '/' },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website', locale: 'en_ZA', url: '/', siteName: site.name,
    title: 'Web Design South Africa | Pixaloom',
    description: site.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Pixaloom web design company in South Africa' }],
  },
  twitter: { card: 'summary_large_image', title: 'Web Design South Africa | Pixaloom', description: site.description, images: ['/twitter-image'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'], '@id': `${site.url}/#organization`, name: site.name, url: site.url,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.png'), width: 512, height: 512 },
      image: absoluteUrl('/opengraph-image'), email: site.email, telephone: site.phoneInternational,
      description: site.description,
      foundingLocation: { '@type': 'Place', name: 'George, Western Cape' },
      address: { '@type': 'PostalAddress', addressLocality: 'George', addressRegion: 'Western Cape', addressCountry: 'ZA' },
      areaServed: [
        { '@type': 'City', name: 'George' },
        { '@type': 'AdministrativeArea', name: 'Western Cape' },
        { '@type': 'Country', name: 'South Africa' },
      ],
      knowsAbout: ['Web design', 'Web development', 'Ecommerce', 'Technical SEO', 'Web application development'],
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: site.phoneInternational, email: site.email, areaServed: 'ZA', availableLanguage: ['English', 'Afrikaans'] },
      sameAs: ['https://github.com/Nibsi3'],
    },
    { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, inLanguage: 'en-ZA', publisher: { '@id': `${site.url}/#organization` } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" data-scroll-behavior="auto">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <JsonLd id="organization-schema" data={organizationSchema} />
        <div className="site-frame">{children}</div>
      </body>
    </html>
  );
}
