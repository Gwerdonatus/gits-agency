// src/app/about/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Server wrapper for /about.
//
// about/page.tsx is a client component ("use client"), so it cannot export
// metadata itself. Without this file the page silently inherits the root
// layout's metadata — which means /about was serving the homepage's <title>
// AND the homepage's canonical URL, i.e. telling Google that /about is a
// duplicate of /. This restores a page-specific title, description, and
// self-referencing canonical.
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/app/structured-data";

const SITE_URL = "https://gits.technology";
const IMG_ROOT = "/GITS_Complete_Image_Package";

const TITLE = "About the Studio";
const DESCRIPTION =
  "GITS is a small studio of senior engineers and designers in Abuja, Nigeria, building software, digital platforms, and AI automation. No junior hires, no bench — meet the team and how we work.";

export const metadata: Metadata = {
  // Root layout's template renders this as "About the Studio | GITS".
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    siteName: "GITS",
    title: `${TITLE} | GITS`,
    description: DESCRIPTION,
    images: [
      {
        url: `${IMG_ROOT}/social/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GITS — Gwer Intelligent Tech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | GITS`,
    description: DESCRIPTION,
    images: [`${IMG_ROOT}/social/og-image.png`],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
        ]}
      />
      {children}
    </>
  );
}
