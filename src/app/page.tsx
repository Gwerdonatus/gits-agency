// src/app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Homepage — SERVER COMPONENT.
//
// The original page.tsx was "use client" with no metadata.
// This version:
//   1. Exports homepage metadata (the most important metadata on the site)
//   2. Injects homepage-specific FAQs as a FAQPage schema
//   3. Renders all the same components as before
//
// All components (Hero, ServicesOverview, etc.) are client components already.
// They can be imported in a server component without any changes.
// Simply remove "use client" from this file.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import ProcessFlow from "@/components/ProcessFlow";
import BlueprintsMiniCaseStudies from "@/components/BlueprintsMiniCaseStudies";
import { BreadcrumbSchema, FAQSchema } from "./structured-data";

const SITE_URL = "https://gits.technology";

// ── Homepage metadata ──────────────────────────────────────────────────────
// The homepage gets the broadest, highest-intent keywords.
// Title: lead with the primary value prop, include geo signal.
export const metadata: Metadata = {
  title: "SaaS, Apps & AI Automation Agency | GITS",
  description:
    "GITS builds SaaS platforms, mobile apps, AI automation systems, websites, and internal tools for startups and businesses worldwide. Based in Nigeria. Scoped delivery, reviewable milestones and documented handover.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "SaaS, Mobile Apps & AI Automation Agency | GITS",
    description:
      "Premium digital agency. SaaS, mobile apps, AI automation, websites, and internal tools. Scoped delivery, reviewable milestones and documented handover.",
    url: SITE_URL,
    type: "website",
    // images MUST be repeated here. A page-level openGraph object replaces the
    // root layout's wholesale rather than deep-merging, so omitting this left
    // the homepage with no og:image at all — WhatsApp, Facebook, LinkedIn,
    // iMessage and Slack rendered the share with no image.
    images: [
      {
        url: "/GITS_Complete_Image_Package/social/og-image.png",
        width: 1200,
        height: 630,
        alt: "GITS — Software, engineered with restraint.",
        type: "image/png",
      },
      {
        url: "/GITS_Complete_Image_Package/social/og-square-1200x1200.png",
        width: 1200,
        height: 1200,
        alt: "GITS",
        type: "image/png",
      },
    ],
  },
};

// ── Homepage FAQs — for FAQPage schema ────────────────────────────────────
// These target informational queries about GITS specifically.
// High value for AEO: AI models answering "what is GITS?" or "does GITS
// build mobile apps?" will find these.
const HOMEPAGE_FAQS = [
  {
    q: "What does GITS build?",
    a: "GITS (Gwer Intelligent Tech Solutions) builds SaaS platforms, mobile apps (iOS and Android), AI automation systems, business websites, internal tools and CRM systems, and API integrations for startups and businesses worldwide.",
  },
  {
    q: "Where is GITS based?",
    a: "GITS is based in Abuja, Nigeria, and operates as a fully remote agency available to work with businesses internationally.",
  },
  {
    q: "How much does GITS charge?",
    a: "Project pricing follows an agreed scope, dependencies, milestones and support. Ask for a scoped proposal.",
  },
  {
    q: "How do I contact GITS?",
    a: "You can contact GITS via WhatsApp at +2349034360747, book a call at https://calendly.com/donatusgwer, or submit a project enquiry at https://gits.technology/contact.",
  },
  {
    q: "Does GITS offer a free audit?",
    a: "Yes. GITS offers a free website audit covering UX clarity, conversion friction, performance, SEO fundamentals, and accessibility. It is returned within 24–72 hours on weekdays with no obligation to hire GITS. Request it at https://gits.technology/audit.",
  },
  {
    q: "What technology does GITS use?",
    a: "GITS primarily uses Next.js, React, and TypeScript for web development; React Native for mobile apps; Node.js and PostgreSQL for backend systems; and integrates OpenAI and Anthropic Claude for AI features. Deployments are on Vercel, AWS, and GCP.",
  },
  {
    q: "Who is the founder of GITS?",
    a: "GITS was founded by Gwer Msughter Donatus, a backend engineer and AI systems specialist based in Abuja, Nigeria.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      {/* Homepage FAQ schema — AEO + Google rich results */}
      <FAQSchema faqs={HOMEPAGE_FAQS} />

      {/* Breadcrumb — minimal for homepage */}
      <BreadcrumbSchema
        items={[{ name: "GITS — Digital Agency", url: SITE_URL }]}
      />

      <Hero />
      <ServicesOverview />
      <ProcessFlow />
      <BlueprintsMiniCaseStudies />
    </>
  );
}