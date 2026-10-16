"use client";

import { useRouter } from "next/navigation";
import GlideSelect from "./motion/GlideSelect";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";

// GlideSelect writes these into CSS custom properties, so CSS variables work: the chip follows the theme from the
// first paint instead of waiting for JavaScript to learn which theme is active.
const COLORS = {
  surface: "var(--select-surface)",
  highlight: "var(--select-highlight)",
  text: "var(--color-text)",
  accent: "var(--color-accent)",
} as const;

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
        surfaceColor={COLORS.surface}
        highlightColor={COLORS.highlight}
        textColor={COLORS.text}
        accentColor={COLORS.accent}
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
