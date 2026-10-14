import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { cvPageSectionIds, profile, type CvSectionId } from "@/content";
import { ui } from "@/content/ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { localeUrl } from "@/lib/site";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { ContributionsSection } from "@/components/sections/ContributionsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { BackButton } from "@/components/BackButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

// The navigation starts with the intro block (name and summary), which is not a section component.
const navSections = ["profile", ...cvPageSectionIds] as const;

const sectionComponents: Record<CvSectionId, ComponentType<{ locale: Locale }>> = {
  skills: SkillsSection,
  experience: ExperienceSection,
  contributions: ContributionsSection,
  education: EducationSection,
  credentials: CredentialsSection,
};

export async function generateMetadata({ params }: PageProps<"/[locale]/cv">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { title, description } = ui[locale].cvMeta;
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale, "/cv"),
      languages: { en: localeUrl("en", "/cv"), es: localeUrl("es", "/cv"), "x-default": localeUrl("en", "/cv") },
    },
    openGraph: { url: localeUrl(locale, "/cv"), title, description },
    twitter: { title, description },
  };
}

export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PersonJsonLd locale={locale} />
      <SiteHeader locale={locale} sections={navSections} path="/cv" />
      <main id="main" className="pb-24 min-[1440px]:pb-0 print:pb-0">
        <section id="profile" aria-labelledby="cv-title" className="hero-exit container-page pt-6 print:hidden">
          <BackButton locale={locale} />
          <p className="eyebrow mt-6">{ui[locale].nav.cv}</p>
          <h1 id="cv-title" className="mt-6">{profile.fullName}</h1>
          <p className="reveal mt-6 mb-12 max-w-[64ch] text-lg leading-relaxed text-text-muted">{profile.cvSummary[locale]}</p>
        </section>
        {cvPageSectionIds.map((id) => {
          const Section = sectionComponents[id];
          return <Section key={id} locale={locale} />;
        })}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
