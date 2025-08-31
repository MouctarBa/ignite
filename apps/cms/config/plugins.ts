export default ({ env }) => ({
  upload: {
    config: {
      sizeLimit: env.int('UPLOAD_MAX_SIZE', 5 * 1024 * 1024),
      mimeTypes: [
        'image/png',
        'image/jpeg',
        'image/svg+xml',
        'video/mp4',
      ],
    },
  },
});
