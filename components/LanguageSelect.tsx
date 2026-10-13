"use client";

import { useRouter } from "next/navigation";
import GlideSelect from "./motion/GlideSelect";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";

// GlideSelect parses colors in JS, so it cannot take CSS variables: keep in sync with
// --color-text / --color-accent in globals.css; surface and highlight are the navy popover variants.
const SURFACE = "#0d1a3d";
const HIGHLIGHT = "#1b2f6b";
const TEXT = "#f3f6ff";
const ACCENT = "#93c5fd";

interface LanguageSelectProps {
  locale: Locale;
  label: string;
  names: Record<Locale, string>;
  /** Route of the current page without the locale ("" for home). */
  path?: string;
}

export function LanguageSelect({ locale, label, names, path = "" }: LanguageSelectProps) {
  const router = useRouter();

  return (
    <>
      <GlideSelect
        ariaLabel={label}
        // The chip shows only the code (EN / ES); the menu rows add the full language name as a tag.
        options={locales.map((value) => ({ value, label: value.toUpperCase(), tag: names[value] }))}
        value={locale}
        onChange={(value) => {
          if (isLocale(value)) router.push(`${localePath(value, path)}${window.location.hash}`);
        }}
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
            <a key={value} href={localePath(value, path)} lang={value} hrefLang={value} className="nav-link inline-flex min-h-11 items-center">
              {names[value]}
            </a>
          ))}
      </noscript>
    </>
  );
}
