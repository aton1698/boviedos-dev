import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { blogCategories, getPosts } from "@/content";
import { ui } from "@/content/ui";
import { formatPostDate } from "@/lib/format";
import { features } from "@/lib/features";
import { isLocale, locales } from "@/lib/i18n";
import { localePath, localeUrl } from "@/lib/site";
import { BlogSearchGrid } from "@/components/BlogSearchGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { BackButton } from "@/components/BackButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function generateStaticParams() {
  return locales.flatMap((locale) => blogCategories.map(({ id }) => ({ locale, category: id })));
}

function findCategory(id: string) {
  if (!features.blog) return undefined; // flag off: every blog URL answers 404
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

type Params = PageProps<"/[locale]/blog/[category]">["params"];

// The URL data (`params`) is awaited inside Suspense so the page shell can be prefetched and navigation stays instant.
export default function BlogCategoryPage({ params }: PageProps<"/[locale]/blog/[category]">) {
  return (
    <Suspense fallback={<main id="main" className="min-h-[60vh]" />}>
      <BlogCategoryContent params={params} />
    </Suspense>
  );
}

async function BlogCategoryContent({ params }: { params: Params }) {
  const { locale, category: id } = await params;
  const category = findCategory(id);
  if (!isLocale(locale) || !category) notFound();
  const t = ui[locale];
  const posts = getPosts(category.id);

  return (
    <>
      <SiteHeader locale={locale} sections={[]} path={`/blog/${category.id}`} />
      <main id="main" className="min-h-[60vh] pb-24 min-[1440px]:pb-0">
        <section aria-labelledby="blog-category-title">
          <div className="container-page section-y">
            <BackButton locale={locale} />
            <div className="mt-6">
              <SectionHeading id="blog-category-title" eyebrow={t.nav.blog}>
                {category.title[locale]}
              </SectionHeading>
            </div>
            <p className="reveal mt-6 max-w-[48ch] text-text-muted">{category.description[locale]}</p>
            {posts.length > 0 ? (
              <div className="mt-12">
                <BlogSearchGrid
                  labels={t.blog.search}
                  posts={posts.map((post) => ({
                    id: post.id,
                    image: `/blog/${category.id}.svg`,
                    title: post.title[locale],
                    subtitle: post.excerpt[locale],
                    tag: formatPostDate(post.date, locale),
                    href: localePath(locale, `/blog/${category.id}/${post.id}`),
                    accent: category.accent,
                    searchText: [post.title[locale], post.excerpt[locale], ...post.body[locale]].join(" "),
                  }))}
                />
              </div>
            ) : (
              <div className="reveal mt-12 rounded-2xl border border-divider bg-surface p-8">
                <h2 className="text-xl">{t.blog.emptyTitle}</h2>
                <p className="mt-2 text-text-muted">{t.blog.emptyCopy}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
