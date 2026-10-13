# boviedos.dev

Personal professional website of Brandon Oviedo Sánchez. Next.js App Router, React, TypeScript and Tailwind CSS, in English and Spanish. Home (hero, CV experience tabs, blog cards, contact), a full CV page (`/cv`), blog landing pages (`/blog/professional`, `/blog/personal`) and privacy/terms pages.

## Requirements

- Node.js 22+
- Yarn 4 (via Corepack: `corepack enable`)

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). English is served at `/` (rewritten to `/en`), Spanish at `/es`.

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `yarn dev`       | Start the development server |
| `yarn build`     | Production build             |
| `yarn start`     | Serve the production build   |
| `yarn typecheck` | TypeScript check             |
| `yarn lint`      | ESLint                       |

Run `yarn build` before `yarn typecheck` if route types look stale.

## Indexing (production vs preview)

Only production is indexable. Everything else (previews, local builds) gets `noindex` in the page metadata, an `X-Robots-Tag` header and `Disallow: /` in robots.txt.

- Vercel: nothing to configure; `VERCEL_ENV=production` is set on the production environment.
- Any other host: set `SITE_ENV=production` for the production build only.
- English is served at `https://boviedos.dev` (canonical); Spanish at `https://boviedos.dev/es`. `/en` still resolves but canonicalizes to the root.

## Notes

- Package manager is Yarn only; do not commit `package-lock.json`.
- `.yarnrc.yml` sets `nodeLinker: node-modules` (Next.js does not work well with Yarn PnP).
- Specification and design references live in [docs/](docs/).
