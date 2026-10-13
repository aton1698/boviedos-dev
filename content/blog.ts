import type { Localized } from "./types";

export const blogCategories = [
  {
    id: "professional",
    title: { en: "Professional blog", es: "Blog profesional" },
    description: {
      en: "Software engineering, AI-driven development, architecture and lessons from building digital products.",
      es: "Ingeniería de software, desarrollo impulsado por IA, arquitectura y lecciones de construir productos digitales.",
    },
  },
  {
    id: "personal",
    title: { en: "Personal blog", es: "Blog personal" },
    description: {
      en: "Thoughts, experiences and things I learn outside of work.",
      es: "Ideas, experiencias y cosas que aprendo fuera del trabajo.",
    },
  },
] as const satisfies readonly { id: string; title: Localized; description: Localized }[];

export type BlogCategory = (typeof blogCategories)[number];
export type BlogCategoryId = BlogCategory["id"];
