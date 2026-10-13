import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { PageBackground } from "@/components/motion/PageBackground";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ui } from "@/content/ui";
import { isLocale, locales } from "@/lib/i18n";
import { isProduction, localeUrl, siteUrl } from "@/lib/site";
import "../globals.css";

// Brand font (docs/brand.md): one variable family (Light 300 to Bold 700) for headings and body.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { title, description } = ui[locale].meta;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: localeUrl(locale),
      languages: { en: localeUrl("en"), es: localeUrl("es"), "x-default": localeUrl("en") },
    },
    openGraph: {
      type: "website",
      url: localeUrl(locale),
      siteName: "Brandon Oviedo Sánchez",
      title,
      description,
      locale: locale === "en" ? "en_US" : "es_CR",
      alternateLocale: locale === "en" ? "es_CR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${jakarta.variable} [--font-body:var(--font-heading)]`}
    >
      <body>
        <a className="skip-link print:hidden" href="#main">
          {ui[locale].skipLink}
        </a>
        <PageBackground />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
