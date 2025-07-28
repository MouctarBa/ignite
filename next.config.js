/** @type {import('next').NextConfig} */

const strapiUrl =
  process.env.STRAPI_API_URL ||
  'http://localhost:1337';

const { protocol, hostname, port } = new URL(strapiUrl);

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow images from the configured Strapi instance
    remotePatterns: [
      {
        protocol: protocol.replace(':', ''),
        hostname,
        port: port || '',
        pathname: '/uploads/**',
      },
    ],
    deviceSizes: [
      360, 414, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840,
    ],
  },
};

module.exports = nextConfig
