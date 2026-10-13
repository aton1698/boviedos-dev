import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDocuments } from "@/content";
import { isLocale } from "@/lib/i18n";
import { localeUrl } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { title, intro } = legalDocuments.privacy[locale];
  const fullTitle = `${title} | Brandon Oviedo Sánchez`;
  return {
    title: fullTitle,
    description: intro,
    alternates: {
      canonical: localeUrl(locale, "/privacy"),
      languages: { en: localeUrl("en", "/privacy"), es: localeUrl("es", "/privacy"), "x-default": localeUrl("en", "/privacy") },
    },
    openGraph: { url: localeUrl(locale, "/privacy"), title: fullTitle, description: intro },
    twitter: { title: fullTitle, description: intro },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage id="privacy" locale={locale} />;
}
