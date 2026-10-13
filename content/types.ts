import type { Locale } from "@/lib/i18n";

export type Localized<T = string> = Record<Locale, T>;

export interface Profile {
  fullName: string;
  headline: Localized;
  summary: Localized;
  supportingLine: Localized;
  /** Longer professional summary, shown as the subtitle of the full CV page. */
  cvSummary: Localized;
  location: Localized;
  languages: Localized<string[]>;
  focusAreas: string[];
  currentEmployer: string;
  email: string;
  linkedinUrl: string;
  cvUrl: string;
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

export interface Experience {
  id: string;
  employer: string;
  role: Localized;
  startDate: string; // ISO month, YYYY-MM
  endDate: string | null; // null = present
  bullets: Localized<string[]>;
  technologies: string[];
}

export interface Contribution {
  id: string;
  title: Localized;
  employer: string;
  description: Localized;
  relatedExperienceId: string;
  caseStudyUrl?: string;
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
