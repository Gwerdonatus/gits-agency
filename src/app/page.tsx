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
import GITSAdvisor from "@/components/GITSAdvisor";
import { BreadcrumbSchema, FAQSchema } from "./structured-data";

const SITE_URL = "https://gits.technology";

// ── Homepage metadata ──────────────────────────────────────────────────────
// The homepage gets the broadest, highest-intent keywords.
// Title: lead with the primary value prop, include geo signal.
export const metadata: Metadata = {
  title: "SaaS, Apps & AI Automation Agency | GITS",
  description:
    "GITS builds SaaS platforms, mobile apps, AI automation systems, websites, and internal tools for startups and businesses worldwide. Based in Nigeria. Senior-only team. Transparent pricing. 40+ businesses served across 12 countries.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "SaaS, Mobile Apps & AI Automation Agency | GITS",
    description:
      "Premium digital agency. SaaS, mobile apps, AI automation, websites, and internal tools. Senior-only team. Starting from $500. 40+ businesses, 12 countries.",
    url: SITE_URL,
    type: "website",
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
    a: "GITS is based in Abuja, Nigeria, and operates as a fully remote agency serving clients in 12+ countries including the United States, United Kingdom, and across Africa.",
  },
  {
    q: "How much does GITS charge?",
    a: "GITS pricing ranges from $500 for a landing page to $20,000+ for a complex SaaS platform. Mobile app MVPs start at $3,000, AI automation from $1,000, and internal tools from $2,000. All pricing is transparent and quoted upfront.",
  },
  {
    q: "How do I contact GITS?",
    a: "You can contact GITS via WhatsApp at +2348116276212, book a call at https://calendly.com/donatusgwer, or submit a project enquiry at https://gits.technology/contact.",
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
      <GITSAdvisor />
    </>
  );
}