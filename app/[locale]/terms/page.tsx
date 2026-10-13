import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDocuments } from "@/content";
import { isLocale } from "@/lib/i18n";
import { localeUrl } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { title, intro } = legalDocuments.terms[locale];
  const fullTitle = `${title} | Brandon Oviedo Sánchez`;
  return {
    title: fullTitle,
    description: intro,
    alternates: {
      canonical: localeUrl(locale, "/terms"),
      languages: { en: localeUrl("en", "/terms"), es: localeUrl("es", "/terms"), "x-default": localeUrl("en", "/terms") },
    },
    openGraph: { url: localeUrl(locale, "/terms"), title: fullTitle, description: intro },
    twitter: { title: fullTitle, description: intro },
  };
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage id="terms" locale={locale} />;
}
