// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
// @ts-ignore
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GITSAdvisor from "@/components/GITSAdvisor";
import { OrganizationSchema, WebSiteSchema } from "@/app/structured-data";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SITE_URL  = "https://gits.technology";
const SITE_NAME = "GITS";
const IMG_ROOT  = "/GITS_Complete_Image_Package";

// Primary description — written to match search intent, not just explain the brand.
// Target queries: "digital agency Nigeria", "SaaS development company", "web agency Africa"
const SITE_DESC =
  "GITS is a premium digital agency building SaaS platforms, mobile apps, AI automation systems, websites, and internal tools for startups and businesses worldwide. Based in Nigeria, serving 12+ countries. clarity · speed · quality.";

// ─── VIEWPORT ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Title template: page titles use "%s — GITS", root uses the full default.
  // Keyword strategy: lead with the value prop + geo signal.
  title: {
    default: "SaaS, Mobile Apps & AI Automation Agency | GITS",
    template: "%s | GITS",
  },

  description: SITE_DESC,

  // Keywords still matter for Bing, DuckDuckGo, and AI crawlers even if
  // Google de-emphasises them. Keep tight, no keyword stuffing.
  keywords: [
    "digital agency Nigeria",
    "web development agency Africa",
    "SaaS development company",
    "mobile app development Nigeria",
    "AI automation agency",
    "custom software development",
    "Next.js agency",
    "React Native agency",
    "internal tools development",
    "UI UX design agency",
    "startup development partner",
    "GITS",
    "Gwer Intelligent Tech Solutions",
  ],

  authors: [{ name: "GITS — Gwer Intelligent Tech Solutions", url: SITE_URL }],
  creator: "GITS — Gwer Intelligent Tech Solutions",
  publisher: "GITS — Gwer Intelligent Tech Solutions",

  // ── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Canonical ──────────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: { "en-US": SITE_URL },
  },

  // ── Icons ──────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: `${IMG_ROOT}/favicon.ico`,                   sizes: "any"    },
      { url: `${IMG_ROOT}/favicons/favicon-16x16.png`,    sizes: "16x16", type: "image/png" },
      { url: `${IMG_ROOT}/favicons/favicon-32x32.png`,    sizes: "32x32", type: "image/png" },
      { url: `${IMG_ROOT}/favicons/favicon-48x48.png`,    sizes: "48x48", type: "image/png" },
      { url: `${IMG_ROOT}/favicons/favicon-96x96.png`,    sizes: "96x96", type: "image/png" },
    ],
    shortcut: `${IMG_ROOT}/favicon.ico`,
    apple: [
      { url: `${IMG_ROOT}/apple-touch-icon.png` },
      { url: `${IMG_ROOT}/apple-touch/apple-touch-icon-120x120.png`, sizes: "120x120" },
      { url: `${IMG_ROOT}/apple-touch/apple-touch-icon-152x152.png`, sizes: "152x152" },
      { url: `${IMG_ROOT}/apple-touch/apple-touch-icon-167x167.png`, sizes: "167x167" },
      { url: `${IMG_ROOT}/apple-touch/apple-touch-icon-180x180.png`, sizes: "180x180" },
    ],
    other: [
      { rel: "mask-icon", url: `${IMG_ROOT}/favicons/favicon-96x96.png`, color: "#000000" },
    ],
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "SaaS, Mobile Apps & AI Automation Agency | GITS",
    images: [
      {
        url: `${IMG_ROOT}/social/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GITS — Premium digital agency. SaaS, mobile apps, AI automation. clarity · speed · quality.",
        type: "image/png",
      },
      {
        url: `${IMG_ROOT}/social/og-square-1200x1200.png`,
        width: 1200,
        height: 1200,
        alt: "GITS",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@GITSAgency",       // Update to verified handle when live
    creator: "@GITSAgency",
    title: "SaaS, Mobile Apps & AI Automation Agency | GITS",
    images: [`${IMG_ROOT}/social/twitter-card.png`],
  },

  // ── PWA manifest ───────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Miscellaneous meta ─────────────────────────────────────────────────────
  other: {
    // Windows tiles
    "msapplication-TileColor":               "#000000",
    "msapplication-TileImage":               `${IMG_ROOT}/microsoft/mstile-144x144.png`,
    "msapplication-config":                  "/browserconfig.xml",

    // iOS PWA
    "apple-mobile-web-app-capable":          "yes",
    "apple-mobile-web-app-status-bar-style": "black",
    "apple-mobile-web-app-title":            SITE_NAME,
    "mobile-web-app-capable":                "yes",
    "application-name":                      SITE_NAME,

    // ── AEO: explicitly tell AI crawlers about the llms.txt file ───────────
    // Some crawlers look for this meta tag to find the machine-readable doc.
    "ai-content-declaration": `${SITE_URL}/llms.txt`,
  },
};

// ─── ROOT LAYOUT ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* ── Font preconnects ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Font loads ── */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/*
          ── AEO: explicit AI crawler permission meta tags ──────────────────
          These meta tags are read by AI crawlers that respect them.
          "index" = allowed to index content for training / retrieval
          "follow" = allowed to follow links
        */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

        {/*
          ── Structured data: Organisation + WebSite ───────────────────────
          Injected on every page via the layout.
          Service, FAQ, and BreadcrumbList schemas live in individual page
          server wrappers (see services/page.tsx, audit/page.tsx etc.)
        */}
        <OrganizationSchema />
        <WebSiteSchema />
      </head>

      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="overflow-x-hidden">
          <Navbar />
          {children}
          <Footer />
        </div>
        <GITSAdvisor />
      </body>
    </html>
  );
}