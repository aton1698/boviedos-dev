import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content";
import { ui } from "@/content/ui";
import { isLocale, locales } from "@/lib/i18n";

export const alt = ui.en.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Code-native brand image: tokens from globals.css, no screenshots of the UI.
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const logo = await readFile(join(process.cwd(), "public/logo/BOS-tech-gradient.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "linear-gradient(160deg, #0a1a4a, #030816)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 6, background: "#2563ff", marginBottom: 40 }} />
          <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            {profile.fullName}
          </div>
          <div style={{ fontSize: 28, color: "#93c5fd", marginTop: 24, letterSpacing: 5, textTransform: "uppercase" }}>
            {profile.headline[locale]}
          </div>
          <div style={{ fontSize: 28, color: "#b9c6e4", marginTop: 56 }}>boviedos.dev</div>
        </div>
        <img src={logoSrc} alt="" width={260} height={260} style={{ flexShrink: 0 }} />
      </div>
    ),
    size,
  );
}
