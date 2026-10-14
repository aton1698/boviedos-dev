import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { blogCategories, getPosts } from "@/content";
import { ui } from "@/content/ui";
import { formatPostDate } from "@/lib/format";
import { features } from "@/lib/features";
import { isLocale, locales } from "@/lib/i18n";
import { localePath, localeUrl } from "@/lib/site";
import { BackButton } from "@/components/BackButton";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogCategories.flatMap(({ id }) => getPosts(id).map((post) => ({ locale, category: id, slug: post.id }))),
  );
}

function findPost(categoryId: string, slug: string) {
  if (!features.blog) return null; // flag off: every blog URL answers 404
  const category = blogCategories.find((c) => c.id === categoryId);
  const post = category && getPosts(category.id).find((p) => p.id === slug);
  return category && post ? { category, post } : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[category]/[slug]">): Promise<Metadata> {
  const { locale, category: categoryId, slug } = await params;
  const found = findPost(categoryId, slug);
  if (!isLocale(locale) || !found) notFound();
  const path = `/blog/${found.category.id}/${found.post.id}`;
  const title = `${found.post.title[locale]} | Brandon Oviedo Sánchez`;
  const description = found.post.excerpt[locale];
  return {
    title,
    description,
    alternates: {
      canonical: localeUrl(locale, path),
      languages: { en: localeUrl("en", path), es: localeUrl("es", path), "x-default": localeUrl("en", path) },
    },
    openGraph: { type: "article", url: localeUrl(locale, path), title, description },
    twitter: { title, description },
  };
}

type Params = PageProps<"/[locale]/blog/[category]/[slug]">["params"];

// The URL data (`params`) is awaited inside Suspense so the page shell can be prefetched and navigation stays instant.
export default function BlogPostPage({ params }: PageProps<"/[locale]/blog/[category]/[slug]">) {
  return (
    <Suspense fallback={<main id="main" className="min-h-[60vh]" />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: { params: Params }) {
  const { locale, category: categoryId, slug } = await params;
  const found = findPost(categoryId, slug);
  if (!isLocale(locale) || !found) notFound();
  const { category, post } = found;
  const t = ui[locale];

  return (
    <>
      <SiteHeader locale={locale} sections={[]} path={`/blog/${category.id}/${post.id}`} />
      <main id="main" className="min-h-[60vh] pb-24 min-[1440px]:pb-0">
        <article aria-labelledby="post-title">
          <div className="container-page section-y">
            <BackButton locale={locale} href={localePath(locale, `/blog/${category.id}`)} label={t.backToBlog} />
            {/* Solid navy with transparency: the animated background never competes with the text. */}
            <div className="mt-6 rounded-2xl border border-divider bg-[var(--nav-surface)] p-6 md:p-10">
              <SectionHeading id="post-title" eyebrow={category.title[locale]} className="max-w-[26ch]">
                {post.title[locale]}
              </SectionHeading>
              <p className="label mt-6">
                <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
              </p>
              {post.cover && (
                <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-xl border border-divider bg-surface">
                  <Image
                    src={post.cover.src}
                    alt={post.cover.alt[locale]}
                    fill
                    unoptimized
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 1280px) 1100px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-8 max-w-[64ch]">
                {post.body[locale].map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-7 text-text lg:leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
