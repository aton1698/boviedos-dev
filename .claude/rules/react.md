---
paths:
  - "**/*.{ts,tsx}"
---

# React & Next.js rules (React 19 / Next.js 16 App Router)

Verify unfamiliar Next.js APIs in `node_modules/next/dist/docs/` before using them; this version differs from older docs.

## Server vs client
- Components are Server Components by default. Add `"use client"` only for state, effects, event handlers, refs or browser APIs.
- Push `"use client"` to the smallest leaf (menu, active-nav observer, motion effects). Never mark `page.tsx`, `layout.tsx` or section components as client for a decorative effect.
- Pass serializable props from server to client. Keep content/data imports in server components.
- `params`/`searchParams` are async: `await params`; type with the generated `PageProps<"/route">` / `LayoutProps<"/route">` helpers.
- Static pages need `generateStaticParams` for dynamic segments. Do not read cookies/headers/time in the static content path.

## Components
- Function components with a named props `interface`/`type`; no `React.FC`, no `defaultProps` (use default parameters).
- `ref` is a regular prop in React 19: no `forwardRef`.
- One component per file for sections; colocate small private helpers. Name files after the component (PascalCase).
- Prefer composition and `children` over boolean-prop sprawl. Avoid prop drilling beyond two levels; lift or compose instead.
- Stable `key` from data ids, never array index for reorderable or filterable lists.

## State, effects, performance
- Derive values during render; do not store derived state or mirror props into state.
- Do not use `useEffect` for data transforms, event handling or syncing state. Use it only to synchronize with external systems (IntersectionObserver, canvas, matchMedia) and always return cleanup.
- Use `useSyncExternalStore` for external subscriptions, `useId` for generated ids, `useTransition`/`useDeferredValue` for non-urgent updates.
- No manual `useMemo`/`useCallback`/`memo` by default; add only for a measured problem and say why in a comment.
- Never mutate props, state or module-level data during render. Keep render pure.
- Lazy-load heavy, non-critical client code with `next/dynamic` (e.g. canvas effects); content must render without it.

## Next.js specifics
- Internal navigation with `next/link`; images with `next/image` (explicit dimensions, `priority` only for LCP); fonts via `next/font` with CSS variables.
- Metadata through the Metadata API (`metadata` / `generateMetadata`), not manual `<head>` tags.
- Do not add `useRouter` for plain links. Do not fetch in client components what a server component can read directly.

## TypeScript
- `strict` stays on. No `any`, no non-null `!` without a comment; prefer `unknown` + narrowing.
- Type content through `content/types.ts`; derive unions from `as const` arrays (see `lib/i18n.ts`).
- Use `import type` for type-only imports. Prefer discriminated unions to optional-flag combinations.

## Accessibility (WCAG 2.2 AA)
- Semantic elements first (`header`, `nav`, `main`, `section`, `ol`, `button`, `a`); ARIA only when no native element fits.
- Buttons for actions, links for navigation. Interactive targets >= 44px, visible `:focus-visible`, never hover-only.
- One `h1`, sequential headings. Decorative elements are `aria-hidden` and not focusable.
- Respect `prefers-reduced-motion` in CSS and JS; content visible by default, motion is progressive enhancement.
- Menus/dialogs: report `aria-expanded`, close on Escape, return focus to the trigger.

## i18n
- All user-visible copy lives in `content/` as `{ en, es }` or in per-locale dictionaries; no hard-coded strings in components.
- Locale comes from the route segment; set `<html lang>` from it; format dates with `Intl` using the locale.
- Every new string needs both `en` and `es` before the task is done.

## Styling
- Use the tokens in `app/globals.css` (Tailwind theme variables); no raw hex or font names in components.
- Mobile-first; verify 320px and 200% zoom with no horizontal overflow.

## Lint hygiene
- Fix `react-hooks/*` and `@next/next/*` warnings; do not disable rules without a comment explaining why.
- Remove unused code and imports; no commented-out code.
