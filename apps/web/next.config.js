/** @type {import('next').NextConfig} */

const strapiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
const { hostname, port } = new URL(strapiUrl);
const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname);


const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow images from the configured Strapi instance and optional uploads host
    remotePatterns: [
      {
        protocol: isLocalhost ? 'http' : 'https',
        hostname,
        port: isLocalhost ? port : '',
        pathname: '/uploads/**',
      },
      ...(uploadsUrl
        ? (() => {
            try {
              const { hostname: uploadsHostname } = new URL(uploadsUrl);
              return [
                {
                  protocol: 'https',
                  hostname: uploadsHostname,
                  pathname: '/uploads/**',
                },
              ];
            } catch {
              return [];
            }
          })()
        : []),
    ],
    deviceSizes: [
      360, 414, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840,
    ],
  },
};

module.exports = nextConfig
