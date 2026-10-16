import type { Locale } from "@/lib/i18n";

export type Localized<T = string> = Record<Locale, T>;

export interface Profile {
  fullName: string;
  headline: Localized;
  summary: Localized;
  supportingLine: Localized;
  /** Longer professional summary, shown as the subtitle of the capabilities page. */
  cvSummary: Localized;
  location: Localized;
  languages: Localized<string[]>;
  focusAreas: Localized<string[]>;
  email: string;
  linkedinUrl: string;
}

export interface Skill {
  name: string;
  proficiencyNote?: Localized;
}

export interface SkillGroup {
  id: string;
  title: Localized;
  skills: Skill[];
}

export interface Capability {
  id: string;
  title: Localized;
  /** One sentence shown on the home page. */
  summary: Localized;
  /** What the capability covers, shown on the full page. */
  points: Localized<string[]>;
  /** Related technologies; may be empty. */
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  qualification: Localized;
  startDate: string;
  endDate: string;
}

export interface Publication {
  id: string;
  event: string;
  eventLocation?: Localized;
  year: number;
  role: Localized;
  title: Localized;
  note?: Localized;
  url?: string; // only exact verified URLs
}

export interface BlogPost {
  id: string;
  /** Mock posts are placeholders: they show up in development and previews, never in production. */
  mock?: boolean;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: Localized;
  excerpt: Localized;
  /** The post's single image, shown above the text: `src` is a path under public/, e.g. "/blog/posts/my-post/cover.png". */
  cover?: { src: string; alt: Localized };
  /** One string per paragraph. */
  body: Localized<string[]>;
}

export interface Credential {
  id: string;
  kind: "certification" | "course";
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  topics: string[];
  verified: boolean;
}
