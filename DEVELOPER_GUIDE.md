# Developer Guide

This document outlines setup and deployment instructions for working on the Jane Next.js template.

## Local Development

1. Install dependencies using `npm install`.
2. Run the development server with `npm run dev` and visit `http://localhost:3000`.
3. Configure Sanity by creating `apps/web/.env.local` with `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and optionally `SANITY_READ_TOKEN`.

## Production Build

To create a production build run:

```bash
npm run build
```

Start the optimized server with:

```bash
npm run start
```

Ensure that the environment variables are set in production so the application can reach your Sanity project securely.

## Security Notes

- Never commit `.env.local` or any file containing credentials.
- Store tokens and private URLs in environment variables on your deployment platform.

