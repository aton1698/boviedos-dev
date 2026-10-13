"use client";

import { useRouter } from "next/navigation";
import GlideSelect from "./motion/GlideSelect";
import { locales, type Locale } from "@/lib/i18n";

// GlideSelect parses colors in JS, so it cannot take CSS variables: keep in sync with
// --color-surface / --color-divider / --color-text / --color-accent in globals.css.
const SURFACE = "#10151b";
const HIGHLIGHT = "#26313c";
const TEXT = "#f2f5f7";
const ACCENT = "#5aa9ff";

interface LanguageSelectProps {
  locale: Locale;
  label: string;
  names: Record<Locale, string>;
}

export function LanguageSelect({ locale, label, names }: LanguageSelectProps) {
  const router = useRouter();

  return (
    <>
      <GlideSelect
        ariaLabel={label}
        options={locales.map((value) => ({ value, label: names[value], tag: value.toUpperCase() }))}
        value={locale}
        onChange={(value) => router.push(`/${value}${window.location.hash}`)}
        align="right"
        size="lg"
        surfaceColor={SURFACE}
        highlightColor={HIGHLIGHT}
        textColor={TEXT}
        accentColor={ACCENT}
        menuWidth={176}
      />
      {/* No-JS fallback: the select needs JavaScript, so expose plain links. */}
      <noscript>
        {locales
          .filter((value) => value !== locale)
          .map((value) => (
            <a key={value} href={`/${value}`} lang={value} hrefLang={value} className="nav-link inline-flex min-h-11 items-center">
              {names[value]}
            </a>
          ))}
      </noscript>
    </>
  );
}
