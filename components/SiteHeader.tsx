import { profile, visibleSections } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { LanguageSelect } from "./LanguageSelect";
import { SiteNav } from "./SiteNav";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const links = visibleSections.map((id) => ({ id, label: t.nav[id] }));

  return (
    <>
      <header className="print:hidden sticky top-0 z-40 border-b border-divider bg-bg/80 backdrop-blur">
        <div className="container-page flex min-h-[var(--header-height)] items-center justify-between gap-4">
          <a
            href="#profile"
            aria-label={t.homeLabel}
            className="font-heading text-base font-semibold tracking-tight min-[400px]:text-lg"
          >
            {profile.fullName}
          </a>
          <LanguageSelect
            locale={locale}
            label={t.languageLabel}
            names={{ en: ui.en.languageName, es: ui.es.languageName }}
          />
        </div>
      </header>
      <SiteNav links={links} navLabel={t.mainNav} />
    </>
  );
}
