import type { Locale } from "@/lib/i18n";
import {
  contributions,
  credentials,
  education,
  experiences,
  profile,
  publications,
  skillGroups,
} from "./profile";
import type { Credential, Localized } from "./types";

export * from "./types";
export { blogCategories, type BlogCategory, type BlogCategoryId } from "./blog";
export {
  contributions,
  education,
  experiences,
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
  assert(profile.cvUrl.startsWith("/"), "profile.cvUrl must be a site path");
  assertLocalized(profile.headline, "profile.headline");
  assertLocalized(profile.summary, "profile.summary");

  const ids = new Set<string>();
  for (const e of experiences) {
    assert(Boolean(e.id && e.employer), "every experience needs an id and employer");
    assert(!ids.has(e.id), `duplicate experience id ${e.id}`);
    ids.add(e.id);
    assert(ISO_MONTH.test(e.startDate), `${e.id}.startDate must be YYYY-MM`);
    assert(
      e.endDate === null || ISO_MONTH.test(e.endDate),
      `${e.id}.endDate must be YYYY-MM or null`,
    );
    assertLocalized(e.role, `${e.id}.role`);
    assertLocalized(e.bullets, `${e.id}.bullets`);
  }
  const order = experiences.map((e) => e.startDate);
  assert(
    order.every((d, i) => i === 0 || order[i - 1] >= d),
    "experiences must be in reverse chronological order",
  );

  for (const c of contributions) {
    assert(
      ids.has(c.relatedExperienceId),
      `contribution ${c.id} references unknown experience ${c.relatedExperienceId}`,
    );
    assert(
      !c.caseStudyUrl || isHttpsUrl(c.caseStudyUrl),
      `contribution ${c.id}.caseStudyUrl must be https`,
    );
    assertLocalized(c.description, `${c.id}.description`);
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
  "skills",
  "experience",
  "contributions",
  "education",
  "credentials",
  "contact",
] as const;
export type SectionId = (typeof sectionIds)[number];

/** Sections of the home page; the full CV lives at /cv (sectionIds). */
export const homeSectionIds = ["profile", "cv", "blog", "contact"] as const;
export type HomeSectionId = (typeof homeSectionIds)[number];
export type NavId = SectionId | HomeSectionId;

/** Single source for rendered sections and navigation links. */
export const visibleSections: SectionId[] = sectionIds.filter(
  (id) => id !== "credentials" || verifiedCredentials.length > 0,
);

/** Sections of the /cv page: the full CV without the hero and contact blocks (those live on home). */
export const cvPageSectionIds: SectionId[] = visibleSections.filter(
  (id) => id !== "profile" && id !== "contact",
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
