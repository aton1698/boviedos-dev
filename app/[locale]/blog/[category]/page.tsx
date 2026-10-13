import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogCategories, homeSectionIds } from "@/content";
import { ui } from "@/content/ui";
import { isLocale } from "@/lib/i18n";
import { localePath, localeUrl } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function generateStaticParams() {
  return blogCategories.map(({ id }) => ({ category: id }));
}

function findCategory(id: string) {
  return blogCategories.find((c) => c.id === id);
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[category]">): Promise<Metadata> {
  const { locale, category: id } = await params;
  const category = findCategory(id);
  if (!isLocale(locale) || !category) notFound();
  const path = `/blog/${category.id}`;
  const title = `${category.title[locale]} | Brandon Oviedo Sánchez`;
  const description = category.description[locale];
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale, path),
      languages: { en: localeUrl("en", path), es: localeUrl("es", path), "x-default": localeUrl("en", path) },
    },
    openGraph: { url: localeUrl(locale, path), title, description },
    twitter: { title, description },
  };
}

export default async function BlogCategoryPage({ params }: PageProps<"/[locale]/blog/[category]">) {
  const { locale, category: id } = await params;
  const category = findCategory(id);
  if (!isLocale(locale) || !category) notFound();
  const t = ui[locale];

  return (
    <>
      <SiteHeader locale={locale} sections={[]} path={`/blog/${category.id}`} />
      <main id="main" className="min-h-[60vh] pb-24 min-[1440px]:pb-0">
        <section aria-labelledby="blog-category-title">
          <div className="container-page section-y">
            <Link className="link-arrow" href={localePath(locale)}>
              <span className="mr-2 text-accent" aria-hidden="true">
                ←
              </span>
              {t.backHome}
            </Link>
            <div className="mt-8">
              <SectionHeading id="blog-category-title" eyebrow={t.nav.blog}>
                {category.title[locale]}
              </SectionHeading>
            </div>
            <p className="mt-6 max-w-[48ch] text-text-muted">{category.description[locale]}</p>
            <div className="mt-12 rounded-2xl border border-divider bg-surface p-8">
              <h2 className="text-xl">{t.blog.emptyTitle}</h2>
              <p className="mt-2 text-text-muted">{t.blog.emptyCopy}</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} sections={homeSectionIds} anchorBase={localePath(locale)} />
    </>
  );
}
