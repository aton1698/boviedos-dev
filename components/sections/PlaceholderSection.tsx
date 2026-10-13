import type { SectionId } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

// Temporary anchor target until the section's own ticket (T06–T12) lands.
export function PlaceholderSection({ id, locale }: { id: SectionId; locale: Locale }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-divider">
      <div className="container-page section-y">
        <h2 id={`${id}-title`}>{ui[locale].nav[id]}</h2>
      </div>
    </section>
  );
}
