/** @type {import('next').NextConfig} */

// Default to HTTP for development.
const strapiUrl =
  process.env.STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  'http://localhost:1337';

const { hostname, port, protocol } = new URL(strapiUrl);
const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname);

// Optional separate uploads host, e.g. a CDN
const uploadsUrl =
  process.env.STRAPI_UPLOADS_URL ||
  process.env.NEXT_PUBLIC_STRAPI_UPLOADS_URL ||
  null;

// Build remotePatterns allowing the actual protocol from STRAPI URL (http or https)
const remotePatterns = [
  // Env-configured Strapi host
  {
    protocol: protocol.replace(':', ''),
    hostname,
    port: isLocalhost ? (port || (protocol === 'http:' ? '80' : '443')) : '',
    pathname: '/uploads/**',
  },
  // Always allow typical local development hosts
  { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
  { protocol: 'http', hostname: '127.0.0.1', port: '1337', pathname: '/uploads/**' },
  // Sanity CDN images
  { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
  // Optional separate uploads host, e.g. a CDN
  ...(uploadsUrl
    ? (() => {
        try {
          const { hostname: uploadsHostname, protocol: uploadsProtocol } = new URL(uploadsUrl);
          return [
            {
              protocol: uploadsProtocol.replace(':', '') || 'https',
              hostname: uploadsHostname,
              pathname: '/uploads/**',
            },
          ];
        } catch {
          return [];
        }
      })()
    : []),
];

const nextConfig = {
  reactStrictMode: true,
  // Make the Strapi base URL available to the client to avoid SSR/CSR mismatches
  env: {
    NEXT_PUBLIC_STRAPI_API_URL:
      process.env.NEXT_PUBLIC_STRAPI_API_URL ||
      process.env.STRAPI_API_URL ||
      'http://localhost:1337',
  },
  images: {
    // Allow images from the configured Strapi instance and common local patterns
    remotePatterns,
    deviceSizes: [
      360, 414, 512, 640, 750, 828, 1080, 1200, 1536, 1920, 2048, 3840,
    ],
  },
};

module.exports = nextConfig
