/** @type {import('next').NextConfig} */

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  process.env.STRAPI_API_URL ||
  'https://localhost:1337';

const { hostname } = new URL(strapiUrl);

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow images from the configured Strapi instance
    remotePatterns: [
      {
        protocol: 'https',
        hostname,
        pathname: '/uploads/**',
      },
    ],
    deviceSizes: [
      360, 414, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840,
    ],
  },
};

module.exports = nextConfig
