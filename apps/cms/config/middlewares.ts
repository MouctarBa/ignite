export default ({ env }) => {
  const nodeEnv = env('NODE_ENV', 'development')
  const isProd = nodeEnv === 'production'
  const origin = env(
    'CORS_ORIGIN',
    isProd ? 'https://localhost:3000' : 'http://localhost:3000,https://localhost:3000',
  )
  // In production, enforce https-only origins. In dev, allow http for localhost.
  if (isProd) {
    const allHttps = origin
      .split(',')
      .map((o) => o.trim())
      .every((o) => o.startsWith('https://'))
    if (!allHttps) {
      throw new Error('CORS_ORIGIN must use https in production')
    }
  }
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
