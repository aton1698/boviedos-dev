import { blogCategories } from "@/content";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/site";
import ChromaGrid from "../motion/ChromaGrid";
import { SectionHeading } from "../SectionHeading";

// ChromaGrid takes colors in JS: keep in sync with --brand-electric / --brand-soft in globals.css.
const ACCENTS = { professional: "#2563ff", personal: "#93c5fd" } as const;

export function BlogSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section id="blog" aria-labelledby="blog-title" className="border-t border-divider">
      <div className="container-page section-y">
        <SectionHeading id="blog-title" eyebrow={t.nav.blog} className="max-w-[20ch]">
          {t.headings.blog}
        </SectionHeading>
        <p className="mt-6 max-w-[48ch] text-text-muted">{t.blog.intro}</p>
        <div className="mt-12">
          <ChromaGrid
            columns={2}
            minCardWidth={280}
            gap={24}
            items={blogCategories.map((category) => ({
              id: category.id,
              image: `/blog/${category.id}.svg`,
              title: category.title[locale],
              subtitle: category.description[locale],
              tag: t.blog.comingSoon,
              href: localePath(locale, `/blog/${category.id}`),
              accent: ACCENTS[category.id],
            }))}
          />
        </div>
      </div>
    </section>
  );
}
