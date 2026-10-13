import { visibleSections } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { LanguageSelect } from "./LanguageSelect";
import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const links = visibleSections.map((id) => ({ id, label: t.nav[id] }));

  return (
    // The blur lives on a background layer (not on the header) so the fixed navigation inside the
    // header keeps the viewport as its containing block, while DOM order matches the visual order.
    <header className="sticky top-0 z-40 border-b border-divider print:hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-bg/80 backdrop-blur" />
      <div className="container-page flex min-h-[var(--header-height)] items-center justify-between gap-4">
        {/* Logo only (owner request); the link keeps its accessible name through aria-label. */}
        <a href="#profile" aria-label={t.homeLabel} className="flex min-w-11 items-center">
          <Logo className="h-11 w-auto shrink-0" />
        </a>
        <SiteNav links={links} navLabel={t.mainNav} />
        <div className="flex items-center gap-3">
          <LanguageSelect
            locale={locale}
            label={t.languageLabel}
            names={{ en: ui.en.languageName, es: ui.es.languageName }}
          />
          <a href="#contact" className="btn-primary hidden !min-h-11 !px-5 text-sm sm:inline-flex">
            {t.cta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
