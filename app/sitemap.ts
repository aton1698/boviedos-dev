import type { MetadataRoute } from "next";
import { blogCategories, legalPages } from "@/content";
import { locales } from "@/lib/i18n";
import { localeUrl } from "@/lib/site";

const paths = ["", "/cv", ...blogCategories.map((c) => `/blog/${c.id}`), ...legalPages.map((id) => `/${id}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((l) => [l, localeUrl(l, path)]));
    return locales.map((locale) => ({ url: localeUrl(locale, path), alternates: { languages } }));
  });
}
