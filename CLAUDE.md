# boviedos.dev

Personal professional site of Brandon Oviedo Sánchez. Bilingual (en/es): home (hero, CV experience tabs, blog cards, contact) plus a full CV page.
Next.js 16 App Router, React 19, strict TypeScript, Tailwind 4. Yarn 4 only (never npm/pnpm).

## Commands
`yarn dev` · `yarn typecheck` · `yarn lint` · `yarn build` (run build before typecheck if route types look stale).

## Paths
- `app/[locale]/` layout + home page; subpages `cv`, `blog/[category]` and `blog/[category]/[slug]`, `privacy`, `terms` (English is served without prefix via rewrites in `next.config.ts`, e.g. `/cv`; `/es/...` for Spanish)
- `app/globals.css` design tokens, type scale, base components
- `content/` typed content (`types.ts`, `profile.ts`, `experience.json`, `credentials.json`, `blog.ts`, `legal.ts`), validation, `verifiedCredentials`, `visibleSections`, `formatMonth` (`index.ts`)
- `professional-blogs/` and `personal-blogs/` (project root): one JSON per post (`id` = file name, `date`, `title`/`excerpt`/`body` in en+es, optional `mock: true`), read by `getPosts()` in `content/blog.ts`. Mock posts show everywhere except production. The whole blog is behind the flag `features.blog` in `lib/features.ts` (off: /blog/* is 404, home cards are not links, footer and sitemap omit the blogs).
- `lib/i18n.ts` locales; `lib/site.ts` canonical URL + production gate (`SITE_ENV=production` / `VERCEL_ENV`); `docs/spec.md` normalized spec; `docs/design/` renders 01–07
- Rules: `.claude/rules/react.md` (React/Next/a11y/i18n best practices)

## Brand
Visual identity is **Pulse Flow**: follow `docs/brand.md` (and `.claude/rules/brand.md`) for every UI change. It overrides the earlier dark/lime direction in the spec.

## Scope
Public site only: home, full CV, blog landing pages and post pages (posts are JSON files; the current ones are mock), privacy and terms. No auth, CMS, backend, DB, contact form, analytics or theme switcher. The legal texts in `content/legal.ts` describe the site as it works today (no cookies/analytics/forms): update them if that changes.
Spec v1.1 is English-only; EN/ES is an owner-approved extension — update DD/REQ entries before changing behavior (DD-12).
Home sections: Profile → CV → Blog → Contact (IDs profile, cv, blog, contact). `/cv` sections: Skills → Experience → Contributions → Education → Certifications & Courses (IDs skills, experience, contributions, education, credentials).
Never invent credentials, metrics, testimonials or links. Credentials/research URLs stay empty until supplied; the credentials section and its nav item are hidden when no verified records exist. Spanish copy is draft pending owner review.

## Workflow
- Trello board: https://trello.com/b/OxamtfwJ/boviedosdev-website-delivery (tickets T01–T20, REQ-01–12). One ticket per session.
- Spec: https://docs.google.com/document/d/1MDR2_uPVNUOh7YXPoDl4rReK14v92m4mQyBLtxJyMVI/edit · Renders: https://drive.google.com/drive/folders/1mW55BX5x9ydlsL0l4j-ctuXUMm_1AVLr
- No unit tests, frameworks, snapshots or coverage. Run typecheck/lint/build once after edits plus targeted manual checks; report only checks actually run.
- Token rules: read CLAUDE.md, package.json and only files relevant to the task; targeted `rg`, no full-repo dumps; no new dependencies unless required; no unrelated refactors.
- Finish with <= 8 bullets: changed files, checks run/results, blockers.

## Unresolved inputs
- T05 final CV PDF (`/cv/Brandon Oviedo FS.pdf` supplied by owner 2026-10-12; awaiting owner approval as final)
- T11 verified credentials
- T20 hosting/git/domain/DNS
- Optional exact research URLs (JOCICI 2019, State of the Map Latam 2019)
