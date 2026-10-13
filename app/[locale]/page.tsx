import { notFound } from "next/navigation";
import { visibleSections, type SectionId } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { PlaceholderSection } from "@/components/sections/PlaceholderSection";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ContributionsSection } from "@/components/sections/ContributionsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

function renderSection(id: SectionId, locale: Locale) {
  if (id === "profile") return <ProfileSection key={id} locale={locale} />;
  if (id === "skills") return <SkillsSection key={id} locale={locale} />;
  if (id === "experience") return <ExperienceSection key={id} locale={locale} />;
  if (id === "contributions") return <ContributionsSection key={id} locale={locale} />;
  if (id === "credentials") return <CredentialsSection key={id} locale={locale} />;
  if (id === "contact") return <ContactSection key={id} locale={locale} />;
  if (id === "education") return <EducationSection key={id} locale={locale} />;
  return <PlaceholderSection key={id} id={id} locale={locale} />;
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PersonJsonLd locale={locale} />
      <SiteHeader locale={locale} />
      <main id="main" className="pb-24 min-[1440px]:pb-0 print:pb-0">
        {visibleSections.map((id) => renderSection(id, locale))}
      </main>
      <SiteFooter />
    </>
  );
}
