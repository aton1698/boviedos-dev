import { ui } from "@/content/ui";
import { SectionHeading } from "../SectionHeading";
import type { Locale } from "@/lib/i18n";
import { ExperienceList } from "../ExperienceList";

export function ExperienceSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="experience-title" eyebrow={t.nav.experience} className="max-w-[20ch]">
          {t.headings.experience}
        </SectionHeading>
        <ExperienceList locale={locale} />
      </div>
    </section>
  );
}
