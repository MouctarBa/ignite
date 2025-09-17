# Sanity Studio (apps/studio)

This is a minimal Sanity Studio configured to match the content types used by the web app.

## Setup

1) Create a project on sanity.io (or use an existing project)
2) Add environment variables (see `.env.example`)
3) Install deps and run the studio

```
npm install
npm run dev --workspace apps/studio
```

## Environment

Copy `.env.example` to `.env` and set values:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`

Optionally add `SANITY_STUDIO_READ_TOKEN` if you need token-based reads in custom tools.

## Build / Deploy

```
npm run build --workspace apps/studio
npm run deploy --workspace apps/studio
```

