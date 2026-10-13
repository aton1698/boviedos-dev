import type { Locale } from "./i18n";

export const siteUrl = "https://boviedos.dev";

/**
 * Only the production deployment is indexable. Set SITE_ENV=production on the
 * production environment (Vercel sets VERCEL_ENV=production automatically).
 * Anything else, including previews and local builds, is noindex.
 */
export const isProduction =
  process.env.SITE_ENV === "production" || process.env.VERCEL_ENV === "production";

/** English is served at the site root; other locales live under their own prefix. `path` is "" or "/cv", "/blog/professional"... */
export function localePath(locale: Locale, path = ""): string {
  if (locale === "en") return path || "/";
  return `/${locale}${path}`;
}

export function localeUrl(locale: Locale, path = ""): string {
  return `${siteUrl}${localePath(locale, path) === "/" ? "" : localePath(locale, path)}`;
}
