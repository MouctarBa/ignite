export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // In development Strapi serves HTTP, not HTTPS. Using an https URL here
  // can cause generated absolute media URLs to point to https://localhost:1337,
  // which won't be reachable without a proxy. Default to http locally.
  url: env('STRAPI_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
