import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { PageBackground } from "@/components/motion/PageBackground";
import { ui } from "@/content/ui";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const heading = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-heading",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const body = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["monospace"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Brandon Oviedo Sánchez | Full Stack Software Engineer",
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${heading.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link print:hidden" href="#main">
          {ui[locale].skipLink}
        </a>
        <PageBackground />
        {children}
      </body>
    </html>
  );
}
