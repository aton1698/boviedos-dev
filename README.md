# boviedos.dev

Personal professional website of Brandon Oviedo Sánchez. Next.js App Router, React, TypeScript and Tailwind CSS, in English and Spanish (`/en`, `/es`).

## Requirements

- Node.js 22+
- Yarn 4 (via Corepack: `corepack enable`)

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000); `/` redirects to `/en`.

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `yarn dev`       | Start the development server |
| `yarn build`     | Production build             |
| `yarn start`     | Serve the production build   |
| `yarn typecheck` | TypeScript check             |
| `yarn lint`      | ESLint                       |

Run `yarn build` before `yarn typecheck` if route types look stale.

## Notes

- Package manager is Yarn only; do not commit `package-lock.json`.
- `.yarnrc.yml` sets `nodeLinker: node-modules` (Next.js does not work well with Yarn PnP).
- Specification and design references live in [docs/](docs/).
