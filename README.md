# Ignite

Ignite is a licensed, production Next.js application. It uses **Next.js 14** (App Router), **React 18**, and **Tailwind CSS 3**, with content managed in **Sanity**. This repository is not a public template; usage requires permission from the owner.

## Getting Started

- Prerequisites: Node.js 18+ and npm 9+
- Install dependencies at the repo root: `npm install`
- Copy environment variables:
  - Web app: create `apps/web/.env.local` (see examples below or `.env.example` in repo root)
  - Studio: copy `apps/studio/.env.example` to `apps/studio/.env`
- Start development:
  - Run both apps: `npm run dev` (web on `http://localhost:3000`, Studio on `http://localhost:3333`)
  - Or run individually: `npm run dev --workspace apps/web` / `npm run dev --workspace apps/studio`

## Configuration

Sanity is the sole CMS provider on this branch. Configure the following environment variables.

Web app (`apps/web/.env.local`):

```
NEXT_PUBLIC_CMS_PROVIDER=sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-sanity-project-id>
NEXT_PUBLIC_SANITY_DATASET=production

# Optional: server-side token for draft/private content
SANITY_READ_TOKEN=<server-read-token>

# Optional: control ISR revalidation interval (seconds)
REVALIDATE_INTERVAL=60

# Required for the revalidation API endpoint
REVALIDATE_SECRET=<strong-random-string>
```

Studio (`apps/studio/.env`):

```
SANITY_STUDIO_PROJECT_ID=<your-sanity-project-id>
SANITY_STUDIO_DATASET=production
```

## Production Build

- Build all workspaces: `npm run build`
- Start the web app: `npm run start --workspace apps/web`
- Optional: deploy Studio with `npm run deploy --workspace apps/studio` (requires Sanity account and CLI auth)

Note: This project does not use Strapi. Remove any old Strapi env vars. Content is fetched exclusively from Sanity.

## Sanity Studio

- Run the Studio locally: `npm run dev:studio`
- Seed example content (optional): `npm run seed:sanity`
- See `apps/studio/README.md` for schema details and deploy instructions.

## Repository Structure

This is a monorepo using npm workspaces.

- `apps/web` — Next.js app (App Router)
- `apps/studio` — Sanity Studio for content management
- `packages/config` — Shared linting/formatting configuration

Key paths in the web app:

- `apps/web/src/app` — Routes and layouts
- `apps/web/src/components` — Reusable UI components
- `apps/web/src/lib` — Data providers and utilities (Sanity provider)
- `apps/web/src/styles/globals.css` — Tailwind CSS entry point


## Tailwind CSS

- Tailwind CSS v3.4 with official plugins: `forms`, `aspect-ratio`, `typography`
- Config: `apps/web/tailwind.config.js`, `apps/web/postcss.config.js`
- Styles entry: `apps/web/src/styles/globals.css`

## Fonts

Uses [Inter](https://fonts.google.com/specimen/Inter), [Lexend](https://fonts.google.com/specimen/Lexend), and [Gochi Hand](https://fonts.google.com/specimen/Gochi+Hand) via `next/font` for automatic optimization.

## Icons

- Heroicons are used under their [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).
- Premium icon assets (e.g., Nucleo) are licensed for this product only and are not transferable. Obtain your own license to reuse them outside this codebase.

## Images

Included media may contain assets from sources such as [Unsplash](https://unsplash.com/) and [Pexels](https://www.pexels.com/) under their respective licenses. This repository does not grant additional rights to third‑party assets. Ensure you have rights to use them in your deployment.

## Deployment

- Vercel: connect the repo, set environment variables for the web app, and deploy. See [Next.js deployment docs](https://nextjs.org/docs/deployment) for details.
- Other platforms: build with `npm run build` and serve `apps/web` using `next start` with the same environment variables.

Revalidation endpoint (optional): `POST /api/revalidate?secret=<REVALIDATE_SECRET>` accepts Sanity webhook payloads to refresh affected paths.

## License and Usage

This software is proprietary and licensed. All rights reserved. Any use, reproduction, distribution, or modification requires prior written permission from the owner. Unauthorized use is strictly prohibited.

## Support

For access, licensing, or technical support, contact the project maintainers.

See `DEVELOPER_GUIDE.md` for detailed development and deployment instructions.
