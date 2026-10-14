import type { Locale } from "./i18n";

/** Long date for blog posts, in the page language. `iso` is YYYY-MM-DD (read as UTC so the day never shifts). */
export function formatPostDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}
