export default ({ env }) => {
  const origin = env('CORS_ORIGIN', 'https://localhost:3000')
  if (!origin.startsWith('https://')) {
    throw new Error('CORS_ORIGIN must use https')
  }
  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: origin.split(','),
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
