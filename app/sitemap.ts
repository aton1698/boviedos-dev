import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, localeUrl(l)]));
  return locales.map((locale) => ({
    url: localeUrl(locale),
    alternates: { languages },
  }));
}
