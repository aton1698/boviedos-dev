import { profile } from "@/content";
import { localeUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/** Truthful Person data only: no credentials or unverified claims. */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.headline[locale],
    url: localeUrl(locale),
    sameAs: [profile.linkedinUrl],
  };
  // Escape "<" so the JSON can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
