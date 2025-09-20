# Sanity Studio (apps/studio)

This is the Sanity Studio for the Ignite product. It manages content types and editorial workflows used by the web application. This repository is a licensed product and is not a public template; usage requires prior permission from the owner.

## Setup

1) Create or use an existing project at sanity.io
2) Configure environment variables (see `.env.example`)
3) Install dependencies and run the Studio

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

## License and Usage

This software is proprietary and licensed. All rights reserved. Any use, reproduction, distribution, or modification requires prior written permission from the owner. Unauthorized use is strictly prohibited.

