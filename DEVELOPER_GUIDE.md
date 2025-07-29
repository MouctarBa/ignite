# Developer Guide

This document outlines setup and deployment instructions for working on the Jane Next.js template.

## Local Development

1. Install dependencies using `npm install`.
2. Run the development server with `npm run dev` and visit `http://localhost:3000`.
3. Configure Strapi access by creating a `.env.local` file with your `STRAPI_API_URL` and `STRAPI_API_TOKEN`.

## Production Build

To create a production build run:

```bash
npm run build
```

Start the optimized server with:

```bash
npm run start
```

Ensure that the environment variables are set in production so the application can reach your Strapi instance securely.

## Security Notes

- Never commit `.env.local` or any file containing credentials.
- Store tokens and private URLs in environment variables on your deployment platform.

