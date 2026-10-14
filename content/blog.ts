import fs from "node:fs";
import path from "node:path";
import { isProduction } from "@/lib/site";
import type { BlogPost, Localized } from "./types";

export const blogCategories = [
  {
    id: "professional",
    folder: "professional-blogs",
    accent: "#2563ff",
    title: { en: "Professional blog", es: "Blog profesional" },
    description: {
      en: "Software engineering, AI-driven development, architecture and lessons from building digital products.",
      es: "Ingeniería de software, desarrollo impulsado por IA, arquitectura y lecciones de construir productos digitales.",
    },
  },
  {
    id: "personal",
    folder: "personal-blogs",
    accent: "#93c5fd",
    title: { en: "Personal blog", es: "Blog personal" },
    description: {
      en: "Thoughts, experiences and things I learn outside of work.",
      es: "Ideas, experiencias y cosas que aprendo fuera del trabajo.",
    },
  },
] as const satisfies readonly {
  id: string;
  /** Folder at the project root with one JSON file per post. */
  folder: string;
  /** Glow color for the card grid (JS side: keep in sync with --brand-electric / --brand-soft). */
  accent: string;
  title: Localized;
  description: Localized;
}[];

export type BlogCategory = (typeof blogCategories)[number];
export type BlogCategoryId = BlogCategory["id"];

function isPost(value: unknown): value is BlogPost {
  if (typeof value !== "object" || value === null) return false;
  const post = value as Partial<BlogPost>;
  return (
    typeof post.id === "string" &&
    typeof post.date === "string" &&
    !!post.title?.en && !!post.title?.es &&
    !!post.excerpt?.en && !!post.excerpt?.es &&
    Array.isArray(post.body?.en) && Array.isArray(post.body?.es) &&
    (!post.cover || (typeof post.cover.src === "string" && !!post.cover.alt?.en && !!post.cover.alt?.es))
  );
}

/**
 * Posts of one blog, newest first. Reads the JSON files of its folder at build time. Mock posts are left out in
 * production unless `includeMock` is set (only generateStaticParams does, see the post page).
 */
export function getPosts(category: BlogCategoryId, { includeMock = false } = {}): BlogPost[] {
  const { folder } = blogCategories.find((c) => c.id === category) ?? { folder: "" };
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), folder);
  if (!folder || !fs.existsSync(/*turbopackIgnore: true*/ dir)) return [];
  return fs
    .readdirSync(/*turbopackIgnore: true*/ dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const post: unknown = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ path.join(dir, file), "utf8"));
      if (!isPost(post)) throw new Error(`${folder}/${file} is not a valid blog post`);
      if (post.id !== file.replace(/\.json$/, "")) throw new Error(`${folder}/${file}: id must match the file name`);
      return post;
    })
    .filter((post) => includeMock || !post.mock || !isProduction)
    .sort((a, b) => b.date.localeCompare(a.date));
}
