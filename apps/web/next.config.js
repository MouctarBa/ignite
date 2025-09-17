/** @type {import('next').NextConfig} */

const remotePatterns = [
  // Sanity CDN images only (Strapi removed)
  { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
];

const nextConfig = {
  reactStrictMode: true,
  env: {
    // Ensure client selects Sanity provider
    NEXT_PUBLIC_CMS_PROVIDER:
      process.env.NEXT_PUBLIC_CMS_PROVIDER ||
      process.env.CMS_PROVIDER ||
      'sanity',
  },
  images: {
    // Allow images from Sanity CDN
    remotePatterns,
    deviceSizes: [
      360, 414, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840,
    ],
  },
};

module.exports = nextConfig
