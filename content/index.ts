import type { Locale } from "@/lib/i18n";
import {
  credentials,
  education,
  profile,
  publications,
  skillGroups,
} from "./profile";
import { capabilities } from "./capabilities";
import type { Credential, Localized } from "./types";

export * from "./types";
export { legalDocuments, legalPages, legalUpdated, type LegalPageId } from "./legal";
export { blogCategories, getPosts, type BlogCategory, type BlogCategoryId } from "./blog";
export { capabilities } from "./capabilities";
export {
  education,
  profile,
  publications,
  skillGroups,
};

const ISO_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`[content] ${message}`);
}

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function assertLocalized(value: Localized<unknown>, label: string) {
  for (const locale of ["en", "es"] as const) {
    const v = value[locale];
    assert(
      Array.isArray(v) ? v.length > 0 : typeof v === "string" && v.trim(),
      `${label} is missing ${locale} copy`,
    );
  }
}

function isValidCredential(c: Credential) {
  return (
    Boolean(c.id && c.title && c.issuer) &&
    ISO_MONTH.test(c.issueDate) &&
    (!c.expiryDate || ISO_MONTH.test(c.expiryDate)) &&
    (!c.verificationUrl || isHttpsUrl(c.verificationUrl))
  );
}

function validateContent() {
  assert(profile.email.includes("@"), "profile.email is malformed");
  assert(isHttpsUrl(profile.linkedinUrl), "profile.linkedinUrl must be https");
  assertLocalized(profile.headline, "profile.headline");
  assertLocalized(profile.summary, "profile.summary");
  assertLocalized(profile.cvSummary, "profile.cvSummary");

  const ids = new Set<string>();
  for (const c of capabilities) {
    assert(Boolean(c.id), "every capability needs an id");
    assert(!ids.has(c.id), `duplicate capability id ${c.id}`);
    ids.add(c.id);
    assertLocalized(c.title, `${c.id}.title`);
    assertLocalized(c.summary, `${c.id}.summary`);
    assertLocalized(c.points, `${c.id}.points`);
  }

  for (const ed of education) {
    assert(ISO_MONTH.test(ed.startDate) && ISO_MONTH.test(ed.endDate), `${ed.id} dates must be YYYY-MM`);
  }
  for (const p of publications) {
    assert(!p.url || isHttpsUrl(p.url), `publication ${p.id}.url must be https`);
    assertLocalized(p.title, `${p.id}.title`);
  }
}

validateContent();

/** Only verified, well-formed credentials; invalid records never publish. */
export const verifiedCredentials: Credential[] = credentials.filter(
  (c) => c.verified && isValidCredential(c),
);

export const sectionIds = [
  "profile",
  "capabilities",
  "skills",
  "education",
  "credentials",
  "contact",
] as const;
export type SectionId = (typeof sectionIds)[number];

/** Sections of the home page; the full CV lives at /cv (sectionIds). */
export const homeSectionIds = ["profile", "capabilities", "blog", "contact"] as const;
export type HomeSectionId = (typeof homeSectionIds)[number];
export type NavId = SectionId | HomeSectionId;

/** Single source for rendered sections and navigation links. */
export const visibleSections: SectionId[] = sectionIds.filter(
  (id) => id !== "credentials" || verifiedCredentials.length > 0,
);

/** Sections of the /cv page: the full CV without the hero and contact blocks (those live on home). */
export type CvSectionId = Exclude<SectionId, "profile" | "contact">;
export const cvPageSectionIds: CvSectionId[] = visibleSections.filter(
  (id): id is CvSectionId => id !== "profile" && id !== "contact",
);

/** Formats an ISO month (YYYY-MM) for display; null means present. */
export function formatMonth(iso: string | null, locale: Locale): string {
  if (iso === null) return locale === "es" ? "Actualidad" : "Present";
  const [year, month] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace(".", "");
}
