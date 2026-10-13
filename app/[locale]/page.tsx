import { notFound } from "next/navigation";
import { homeSectionIds, type HomeSectionId } from "@/content";
import { isLocale, type Locale } from "@/lib/i18n";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CvSection } from "@/components/sections/CvSection";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

function renderSection(id: HomeSectionId, locale: Locale) {
  if (id === "profile") return <ProfileSection key={id} locale={locale} />;
  if (id === "cv") return <CvSection key={id} locale={locale} />;
  if (id === "blog") return <BlogSection key={id} locale={locale} />;
  return <ContactSection key={id} locale={locale} />;
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <PersonJsonLd locale={locale} />
      <SiteHeader locale={locale} sections={homeSectionIds} />
      <main id="main" className="pb-24 min-[1440px]:pb-0 print:pb-0">
        {homeSectionIds.map((id) => renderSection(id, locale))}
      </main>
      <SiteFooter locale={locale} sections={homeSectionIds} />
    </>
  );
}
