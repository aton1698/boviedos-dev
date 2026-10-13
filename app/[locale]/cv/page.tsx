import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cvPageSectionIds, profile, type SectionId } from "@/content";
import { ui } from "@/content/ui";
import { isLocale, type Locale } from "@/lib/i18n";
import { localePath, localeUrl } from "@/lib/site";
import { PlaceholderSection } from "@/components/sections/PlaceholderSection";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { ContributionsSection } from "@/components/sections/ContributionsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

function renderSection(id: SectionId, locale: Locale) {
  if (id === "skills") return <SkillsSection key={id} locale={locale} />;
  if (id === "experience") return <ExperienceSection key={id} locale={locale} />;
  if (id === "contributions") return <ContributionsSection key={id} locale={locale} />;
  if (id === "credentials") return <CredentialsSection key={id} locale={locale} />;
  if (id === "education") return <EducationSection key={id} locale={locale} />;
  return <PlaceholderSection key={id} id={id} locale={locale} />;
}

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
      <SiteHeader locale={locale} sections={cvPageSectionIds} path="/cv" />
      <main id="main" className="pb-24 min-[1440px]:pb-0 print:pb-0">
        <div className="container-page pt-6 print:hidden">
          <div>
            <Link className="link-arrow" href={localePath(locale)}>
              <span className="mr-2 text-accent" aria-hidden="true">
                ←
              </span>
              {ui[locale].backHome}
            </Link>
          </div>
          <p className="eyebrow mt-8">{ui[locale].nav.cv}</p>
          <h1 className="mt-6">{profile.fullName}</h1>
          <p className="mt-6 mb-12 max-w-[64ch] text-lg text-text-muted">{profile.cvSummary[locale]}</p>
        </div>
        {cvPageSectionIds.map((id) => renderSection(id, locale))}
      </main>
      <SiteFooter locale={locale} sections={cvPageSectionIds} />
    </>
  );
}
