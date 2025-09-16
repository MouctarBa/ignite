export default ({ env }) => {
  const nodeEnv = env('NODE_ENV', 'development')
  const isProd = nodeEnv === 'production'
  const origin = env(
    'CORS_ORIGIN',
    isProd ? 'https://localhost:3000' : 'http://localhost:3000,https://localhost:3000',
  )
  // Allow both HTTP and HTTPS origins; no HTTPS-only enforcement.
  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: origin.split(',').map((o) => o.trim()),
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ]
}
