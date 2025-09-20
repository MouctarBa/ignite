# Developer Guide

This guide documents local development, configuration, and deployment for the Ignite product. This is a licensed codebase and is not publicly reusable.

## Local Development

1. Prerequisites: Node.js 18+ and npm 9+
2. Install dependencies at the repo root: `npm install`
3. Configure environments:
   - Web: create `apps/web/.env.local` (see variables below or `.env.example` in repo root)
   - Studio: copy `apps/studio/.env.example` to `apps/studio/.env`
4. Start both apps: `npm run dev`
   - Web: `http://localhost:3000`
   - Studio: `http://localhost:3333`

## Environment Variables

Web app (`apps/web/.env.local`):

```
NEXT_PUBLIC_CMS_PROVIDER=sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-sanity-project-id>
NEXT_PUBLIC_SANITY_DATASET=production

# Optional server-side token for drafts/private content
SANITY_READ_TOKEN=<server-read-token>

# Incremental Static Regeneration interval (seconds)
REVALIDATE_INTERVAL=60

# Secret required by /api/revalidate for webhook-triggered cache refreshes
REVALIDATE_SECRET=<strong-random-string>
```

Studio (`apps/studio/.env`):

```
SANITY_STUDIO_PROJECT_ID=<your-sanity-project-id>
SANITY_STUDIO_DATASET=production
```

Notes:
- This branch uses Sanity only. Any old references to Strapi are compatibility shims and can be ignored.
- Images are served from `cdn.sanity.io` (see `apps/web/next.config.js`).

## Revalidation & Caching

- Set `REVALIDATE_INTERVAL` to control Next.js ISR timings.
- Optional webhook endpoint: `POST /api/revalidate?secret=<REVALIDATE_SECRET>` accepts Sanity webhook payloads to refresh affected paths.

## Production Build

1. Build all workspaces: `npm run build`
2. Start the web app: `npm run start --workspace apps/web`
3. (Optional) Deploy Studio: `npm run deploy --workspace apps/studio`

Ensure production environment variables are set in your hosting platform for both apps.

## Security & Licensing

- Do not commit secrets or `.env*` files.
- Store tokens and private URLs in your hosting provider’s environment settings.
- This repository is proprietary. Do not copy, redistribute, or reuse any part of the codebase or bundled assets without explicit written permission from the owner.

