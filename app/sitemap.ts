import type { MetadataRoute } from "next";
import { blogCategories, getPosts, legalPages } from "@/content";
import { locales } from "@/lib/i18n";
import { features } from "@/lib/features";
import { localeUrl } from "@/lib/site";

const paths = ["", "/cv", ...(features.blog ? blogCategories : []).flatMap((c) => [`/blog/${c.id}`, ...getPosts(c.id).map((post) => `/blog/${c.id}/${post.id}`)]), ...legalPages.map((id) => `/${id}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((l) => [l, localeUrl(l, path)]));
    return locales.map((locale) => ({ url: localeUrl(locale, path), alternates: { languages } }));
  });
}
