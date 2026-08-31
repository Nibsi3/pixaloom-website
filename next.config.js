/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['127.0.0.1'],
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    qualities: [75, 90, 92, 95],
  },
  async redirects() {
    return [
      { source: '/pricing', destination: 'https://www.pixaloom.co.za/services', permanent: true },
      { source: '/shop', destination: 'https://www.pixaloom.co.za/services/ecommerce-websites', permanent: true },
      { source: '/payment', destination: 'https://www.pixaloom.co.za/services/ecommerce-websites', permanent: true },
      { source: '/the-canyon', destination: 'https://www.pixaloom.co.za/projects', permanent: true },
      { source: '/watercolor', destination: 'https://www.pixaloom.co.za/projects', permanent: true },
      { source: '/tandem', destination: 'https://www.pixaloom.co.za/projects', permanent: true },
      { source: '/car', destination: 'https://www.pixaloom.co.za/projects', permanent: true },
      { source: '/work/caps-tutor', destination: '/work/covercrete', permanent: true },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'pixaloom.co.za' }],
        destination: 'https://www.pixaloom.co.za/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
        ],
      },
      {
        source: '/video/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/noise.svg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' }],
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
};

module.exports = nextConfig;
