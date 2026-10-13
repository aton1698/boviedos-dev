import { skillGroups } from "@/content";
import { ui } from "@/content/ui";
import { SectionHeading } from "../SectionHeading";
import type { Locale } from "@/lib/i18n";

export function SkillsSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="skills-title" eyebrow={t.nav.skills} className="max-w-[16ch]">
          {t.headings.skills}
        </SectionHeading>
        <div className="mt-12">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="grid gap-4 border-t border-divider py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8"
            >
              <h3>{group.title[locale]}</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    {skill.name}
                    {skill.proficiencyNote && (
                      <span className="ml-2 text-sm text-text-muted">
                        ({skill.proficiencyNote[locale]})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
