"use client";
import {
  CaseDemo,
  CaseEvidence,
  ExampleNavigation,
  CapabilityDescription,
} from "@/components/service-examples/CaseDemo";
import { contactHref } from "@/content/services";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Eyebrow,
  editorialRoot,
  cx,
  SectionNav,
  SECTION_SCROLL_MT,
  type NavSection,
} from "@/components/editorial";
import { CONCEPT_ICONS, type ConceptIconKey } from "@/components/service-icons";

const ease = [0.22, 0.61, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — Industry-authentic colors
// ═══════════════════════════════════════════════════════════════
const CASE_THEMES = {
  nexus: {
    accent: "#1e3a5f",
    accentLight: "rgba(30,58,95,0.06)",
    accentBorder: "rgba(30,58,95,0.18)",
    accentText: "#1e3a5f",
    label: "Legal · Family Law",
    cardBg: "#f4f7fb",
    number: "01",
  },
  bridgepoint: {
    accent: "#0f5c5c",
    accentLight: "rgba(15,92,92,0.06)",
    accentBorder: "rgba(15,92,92,0.18)",
    accentText: "#0f5c5c",
    label: "Finance · SME Lending",
    cardBg: "#f0f7f7",
    number: "02",
  },
  meridian: {
    accent: "#2d5a3d",
    accentLight: "rgba(45,90,61,0.06)",
    accentBorder: "rgba(45,90,61,0.18)",
    accentText: "#2d5a3d",
    label: "Property · Management",
    cardBg: "#f2f7f3",
    number: "03",
  },
} as const;
type CaseId = keyof typeof CASE_THEMES;

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const rm = useReducedMotion();
  const fd = (d: number) => ({ duration: rm ? 0 : 0.7, ease, delay: d });

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="relative mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0)}
        >
          <Eyebrow index="01">AI &amp; Business Automation</Eyebrow>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.06)}
          className="mt-8 md:mt-12 max-w-5xl"
        >
          <span className="block text-[clamp(2.2rem,6vw,4.6rem)] font-extralight leading-[1.03] tracking-[-0.03em] text-[#050505]">
            Your business, working
          </span>
          <span className="block text-[clamp(2.2rem,6vw,4.6rem)] italic font-light leading-[1.03] tracking-[-0.01em] text-[#050505]/70 font-[family-name:var(--font-fraunces)] pl-[4vw] md:pl-[2vw]">
            while you sleep.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.12)}
          className="mt-8 md:mt-10 max-w-xl text-base md:text-lg font-light text-[#666666] leading-[1.75]"
        >
          We build AI agents and automation systems that handle the repetitive,
          time-consuming work across your business — so your team can focus on
          the decisions and relationships that generate revenue.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.18)}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href={contactHref("ai-business-automation")}
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-80 transition"
          >
            Book free automation audit
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 6h8M6 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href="#case-studies"
            className="inline-flex items-center gap-2 rounded-xl border border-black/[0.12] bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-black/[0.03] transition"
          >
            See client results
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fd(0.26)}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
        >
          {[
            "Free workflow audit — no cost to start",
            "Written ROI estimate before you commit",
            "No obligation to proceed",
            "6-week average from audit to live",
            "Clients across 12+ industries",
          ].map((t) => (
            <span
              key={t}
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#666666]"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* ── Compact explainer bullets ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.3)}
          className="mt-10 rounded-2xl border border-black/[0.08] bg-white/70 backdrop-blur p-5 md:p-6"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="space-y-4">
            {[
              {
                num: "1",
                title: "What AI automation actually is",
                body: "Connecting AI models (Claude, GPT-4o, Gemini) to your real business systems — CRM, WhatsApp, documents, databases — so they take actions, not just answer questions.",
                color: "#2563eb",
                bg: "rgba(37,99,235,0.08)",
              },
              {
                num: "2",
                title: "Why generic AI tools aren't enough",
                body: "ChatGPT knows the world, not your business. Custom automation books, scores, routes, and processes inside your actual systems.",
                color: "#d97706",
                bg: "rgba(217,119,6,0.08)",
              },
              {
                num: "3",
                title: "What we need from you",
                body: "Just describe which tasks your team repeats and where the bottlenecks are. We map the rest and show expected ROI before anything is built.",
                color: "#059669",
                bg: "rgba(5,150,105,0.08)",
              },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-3">
                <div
                  className="h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold"
                  style={{ background: item.bg, color: item.color }}
                >
                  {item.num}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// ═══════════════════════════════════════════════════════════════
// SECTION 2 — WHAT WE AUTOMATE CAROUSEL
// ═══════════════════════════════════════════════════════════════
const WHAT_WE_AUTOMATE: {
  key: ConceptIconKey;
  title: string;
  who: string;
  desc: string;
  example?: string;
}[] = [
  {
    key: "agent",
    title: "AI Business Agents",
    who: "For any client-facing business",
    desc: "Conversational AI trained on your business that responds on WhatsApp, email, and web chat 24/7 — qualifying leads, answering questions, and booking appointments without human intervention.",
    example:
      "e.g. A law firm's AI agent that responds at 11pm, qualifies the enquiry, and books a consultation directly into the partner's calendar.",
  },
  {
    key: "document",
    title: "Intelligent Client Onboarding",
    who: "For regulated industries",
    desc: "AI that reads, verifies, and cross-references every onboarding document — ID, proof of address, company registration, bank statements — scores the risk level, and flags only the cases that need human review.",
    example:
      "e.g. A lending firm processing 70+ KYC applications per week, reducing per-application time from 3 hours to 9 minutes.",
  },
  {
    key: "model",
    title: "Custom Claude / ChatGPT Integration",
    who: "For knowledge-heavy businesses",
    desc: "AI connected directly to your internal documents, SOPs, and policies so your team — or your customers — get accurate, sourced answers about your actual business, not generic responses.",
    example:
      "e.g. A property management company whose 21-person team can now query 9 years of institutional knowledge instantly.",
  },
  {
    key: "report",
    title: "Automated Reporting Pipelines",
    who: "For agencies and ops teams",
    desc: "Systems that pull from every data source you use, generate narrative commentary, and deliver formatted reports to the right inboxes on schedule — without a human pulling a single CSV.",
    example:
      "e.g. A marketing agency whose Monday morning reports now generate automatically at 6am, reviewed and sent by 8am.",
  },
  {
    key: "workflow",
    title: "CRM & Workflow Automation",
    who: "For sales and operations",
    desc: "Every trigger in one tool — a form submission, a payment, a booking — cascades automatically through your CRM, email platform, Slack, and database. Nothing manual, nothing missed.",
    example:
      "e.g. A B2B sales team where every inbound lead is scored, routed, and followed up before a human touches it.",
  },
  {
    key: "message",
    title: "WhatsApp & Email Sequences",
    who: "For customer-facing teams",
    desc: "Personalised conversation flows, follow-up sequences, appointment reminders, and re-engagement campaigns on the channels your customers already use — triggered automatically.",
    example:
      "e.g. A clinic whose no-show rate dropped 40% after automated appointment reminders and rescheduling flows.",
  },
  {
    key: "document",
    title: "Document Intelligence",
    who: "For professional services",
    desc: "AI that reads contracts, invoices, applications, and compliance documents — extracts key data, classifies content, routes to the right person, and flags anomalies automatically.",
    example:
      "e.g. An insurance broker whose policy renewal extraction went from 2 hours per case to under 4 minutes.",
  },
  {
    key: "api",
    title: "API & System Integrations",
    who: "For complex tech stacks",
    desc: "We connect any tool to any tool — legacy systems, custom APIs, government databases, payment gateways — so your automation stack works as one connected system.",
    example:
      "e.g. A fintech connecting a core banking system, identity verification API, and CRM into one automated onboarding pipeline.",
  },
];

function WhatWeAutomateCarousel() {
  // Was a carousel showing three of 8 behind arrow controls, so most of the
  // range was hidden. A grid lets someone find their own case at a glance.
  return (
    <section
      id="what-we-build"
      className={cx(
        SECTION_SCROLL_MT,
        "px-6 sm:px-10 lg:px-16 py-24 md:py-32 border-t border-[#050505]/10",
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <Eyebrow index="02">What we automate</Eyebrow>
          <h2 className="mt-6 text-3xl md:text-4xl font-extralight tracking-tight text-[#050505] leading-[1.1]">
            Where automation actually pays for itself.
          </h2>
          <p className="mt-5 text-base font-light text-[#666666] leading-[1.75]">
            Eight kinds of work we take off a team. If your people are doing any
            of this by hand every week, it is worth a conversation.
          </p>
        </div>

        <div className="service-capabilities mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 md:gap-y-14">
          {WHAT_WE_AUTOMATE.map((item, i) => {
            const Icon = CONCEPT_ICONS[item.key];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: (i % 4) * 0.06 }}
                className="group"
              >
                <Icon className="w-10 h-10 text-[#050505] transition-transform duration-500 ease-out group-hover:-translate-y-0.5" />
                <p className="mt-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                  {item.who}
                </p>
                <h3 className="mt-2 text-lg font-light tracking-tight text-[#050505]">
                  {item.title}
                </h3>
                <CapabilityDescription>{item.desc}</CapabilityDescription>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// ═══════════════════════════════════════════════════════════════
// HTML DEMOS — white-background, purposeful UI mocks
// ═══════════════════════════════════════════════════════════════

function NexusDemo() {
  return <CaseDemo id="nexus" />;
}

function BridgepointDemo() {
  return <CaseDemo id="bridgepoint" />;
}

function MeridianDemo() {
  return <CaseDemo id="meridian" />;
}
// ═══════════════════════════════════════════════════════════════
// SECTION 3 — CASE STUDIES
// ═══════════════════════════════════════════════════════════════
const CASES = [
  {
    id: "nexus" as CaseId,
    client: "Nexus Legal Partners",
    headline:
      "How we made it impossible for a law firm to lose another lead to a slow response — in 6 weeks.",
    subheadline:
      "They weren't losing clients because of poor service. They were losing them before the first conversation because nobody responded fast enough.",
    why: {
      title: "Why configuring an off-the-shelf chatbot didn't work",
      body: "Every chatbot they'd evaluated followed a fixed script — it could answer FAQ questions but couldn't reason. Legal enquiries don't follow scripts. 'Do I have a case?' requires judgment: what happened, in which jurisdiction, is there urgency, has any prior action been taken. A generic chatbot would either give a useless response or route everyone to a booking link regardless of fit. They needed an AI that could think, not just respond.",
    },
    how: {
      title: "The decision that shaped the entire build",
      body: "Before writing code, we spent two days with the partners learning how they actually assess a new enquiry — what they ask, what signals concern them, what makes a case worth taking. Then we mapped 78% of enquiries to WhatsApp (not the website) and built there. The agent doesn't open with a booking link — it opens with empathy, asks qualifying questions in order, and only books when it's appropriate. If the case doesn't fit, it says so clearly and suggests where to go instead.",
    },
    modules: [
      {
        name: "WhatsApp AI Qualifying Agent",
        problem:
          "Enquiries arrived at all hours. Nobody responded until morning. A third of leads had already moved on.",
        built:
          "AI agent on WhatsApp Business trained on the firm's practice areas, tone, and qualifying criteria. Responds in under 2 minutes, 24/7.",
        impact:
          "Response time: 14 hours → under 2 minutes. After-hours enquiries handled immediately instead of waiting until morning.",
      },
      {
        name: "Intelligent Case Qualification Flow",
        problem:
          "Unqualified enquiries consumed partner time during consultations that shouldn't have been booked.",
        built:
          "Structured qualifying conversation: nature of matter, jurisdiction, urgency, prior legal action. Books only qualified cases; declines others with clear explanation.",
        impact:
          "Lead-to-consultation conversion: 52% → 71%. Partners walk into consultations with full context already logged.",
      },
      {
        name: "Calendar Integration & Booking",
        problem:
          "Back-and-forth availability exchanges cost 3–4 messages per booking and introduced delays.",
        built:
          "Direct Google Calendar integration — agent reads availability and books the right partner for the right case type in one step.",
        impact:
          "Bookings happen inside the conversation, at any hour, with zero staff involvement.",
      },
      {
        name: "CRM Intake & Structured Logging",
        problem:
          "No structured record of enquiries. Partners walked into consultations with no context from the initial contact.",
        built:
          "Every conversation — transcript, qualifying answers, urgency flag, sentiment — structured and pushed to HubSpot automatically.",
        impact:
          "Partners open a file before every consultation and already know the full picture. First consultations changed.",
      },
    ],
    timeline: [
      {
        week: "Days 1–5",
        title: "Discovery & channel audit",
        items: [
          "Mapped every enquiry source and volume",
          "Identified 78% via WhatsApp as primary channel",
          "Documented qualifying criteria with all four partners",
          "Defined escalation rules and decline scripts",
        ],
      },
      {
        week: "Weeks 2–4",
        title: "Build & integration",
        items: [
          "AI agent trained on firm's practice areas and tone",
          "WhatsApp Business API configured",
          "Google Calendar and HubSpot integrated",
          "Qualifying conversation flow built and tested",
        ],
      },
      {
        week: "Week 5–6",
        title: "Live testing & launch",
        items: [
          "Tested with real enquiries — partners reviewed every conversation",
          "Edge cases added to escalation rules",
          "Launched with full monitoring in place",
        ],
      },
    ],
    outcomes: [
      {
        value: "14 hrs → 2 min",
        label: "Enquiry response time",
        why: "AI responds on WhatsApp within 2 minutes, 24/7 — no human required.",
      },
      {
        value: "52% → 71%",
        label: "Lead-to-consultation rate",
        why: "Faster response and better qualification converts more enquiries.",
      },
      {
        value: "~£14K",
        label: "Additional monthly revenue",
        why: "9–10 previously lost leads now converting at £1,400–1,800 avg. case value.",
      },
      {
        value: "7 weeks",
        label: "Project cost payback",
        why: "Revenue from recovered leads covered the project cost in 7 weeks.",
      },
    ],
    before: [
      "Enquiries waited until the next morning at the earliest",
      "A third of leads already booked elsewhere by the time of response",
      "Partners walked into consultations with no context",
      "After-hours enquiries entirely missed",
    ],
    after: [
      "Every enquiry acknowledged within 2 minutes, 24/7",
      "Lead-to-consultation conversion up 38% in 60 days",
      "Partners see full qualifying notes before every consultation",
      "Saturday bookings now happen while the team is at home",
    ],
    stack: [
      "WhatsApp Business API",
      "Claude (Anthropic)",
      "Make",
      "HubSpot CRM",
      "Google Calendar",
    ],
    duration: "6 weeks",
    DemoComponent: NexusDemo,
    demoCaption:
      "Family-law intake — follow a scripted enquiry, review qualification context and hand off a consultation or urgent callback.",
  },
  {
    id: "bridgepoint" as CaseId,
    client: "Bridgepoint Capital",
    headline:
      "How we cut KYC processing time from 3 hours to 9 minutes — and doubled Bridgepoint's lending capacity without a single new hire.",
    subheadline:
      "The problem wasn't the team. It was that four excellent compliance officers were spending most of their day on tasks that required no judgment at all.",
    why: {
      title: "Why off-the-shelf KYC platforms fell short",
      body: "Two platforms were evaluated. Both could verify an ID document in isolation — but neither could cross-reference details across multiple documents, understand the business context described in the application, or produce a risk report in Bridgepoint's format. Both still required a compliance officer to review every single file. They'd automated one step of a twelve-step process — and charged monthly for it. What Bridgepoint needed wasn't a product. It was a bespoke compliance engine built around their specific criteria.",
    },
    how: {
      title: "The insight that made the build possible",
      body: "Before touching any technology, we spent two full days with the compliance team going through real applications — not to document their checklist, but to learn their judgment. What's a soft flag versus a hard flag? When does an address anomaly matter and when doesn't it? What does a suspicious cash flow pattern look like versus a seasonal business? We designed the AI scoring model around their expertise and their risk appetite, not around a generic template. The output maps directly to how their credit committee already makes decisions.",
    },
    modules: [
      {
        name: "Secure Document Intake Pipeline",
        problem:
          "Documents arrived via email in various formats. Collecting and organising them for review took time before any analysis could begin.",
        built:
          "Branded secure upload link sent to applicants. Documents are collected, named, and organised automatically before any AI processing begins.",
        impact:
          "Intake is standardised. No more chasing missing documents or organising email attachments before review.",
      },
      {
        name: "Vision-Based Document Intelligence",
        problem:
          "Standard OCR extracts text but misses context — inconsistencies in formatting, subtle discrepancies between documents, or signs of tampering.",
        built:
          "Vision-capable AI reads documents the way a trained compliance officer does: understanding what legitimate looks like and identifying inconsistencies across multiple documents simultaneously.",
        impact:
          "Cross-document discrepancies caught automatically that OCR would have missed entirely.",
      },
      {
        name: "Custom Risk Scoring Engine",
        problem:
          "Generic KYC platforms produce generic risk outputs that don't map to Bridgepoint's SME lending criteria or credit committee format.",
        built:
          "Custom scoring model built around Bridgepoint's exact criteria: cash flow patterns, director net worth indicators, sector risk flags, trading history consistency.",
        impact:
          "Output maps directly to credit committee format. No translation required. Review time for clean files: under 5 minutes.",
      },
      {
        name: "Review Audit Trail",
        problem:
          "Manual review had no structured audit trail — decisions were in emails and notes, not exportable records.",
        built:
          "Every AI decision is logged: which documents were checked, what was extracted, which checks were run, what was flagged and why. Exportable, timestamped, subject to compliance assessment.",
        impact:
          "Full compliance documentation on every application. 'The AI said so' is never the audit trail — the reasoning is.",
      },
      {
        name: "Compliance Team Escalation Queue",
        problem:
          "Compliance officers reviewed every file regardless of risk level — 70% of their time on clean files.",
        built:
          "Clean files (no flags, score above threshold) are auto-processed with a 5-minute sign-off queue. Flagged files go to a structured review with the specific flags and reasons pre-documented.",
        impact:
          "Team allocation inverted: 20% reviewing, 80% judgment work. Processing capacity: 70 → 120+ applications per week.",
      },
    ],
    timeline: [
      {
        week: "Weeks 1–2",
        title: "Compliance process mapping & model design",
        items: [
          "2-day deep dive with compliance team on real applications",
          "Documented soft flags, hard flags, and edge cases",
          "Designed custom risk scoring model to Bridgepoint's criteria",
          "Defined FCA audit trail requirements",
        ],
      },
      {
        week: "Weeks 3–7",
        title: "Build & integration",
        items: [
          "Document intake pipeline built",
          "Vision AI document reading layer integrated",
          "Custom scoring model built and calibrated",
          "Audit trail and escalation queue built",
        ],
      },
      {
        week: "Weeks 8–9",
        title: "Parallel testing & full deployment",
        items: [
          "AI ran alongside manual processing for 2 weeks",
          "Results compared and scoring model calibrated",
          "Full deployment with compliance team trained on queue management",
        ],
      },
    ],
    outcomes: [
      {
        value: "3 hrs → 9 min",
        label: "Per-application processing time",
        why: "4 min AI processing + 5 min human sign-off for clean files.",
      },
      {
        value: "70 → 120+",
        label: "Applications processed per week",
        why: "Same team, same headcount — doubled throughput.",
      },
      {
        value: "18% → 6%",
        label: "Applicant dropout during onboarding",
        why: "Clean files approved same day instead of 3–5 days later.",
      },
      {
        value: "£150K/wk",
        label: "Additional fee revenue potential",
        why: "50 extra applications/week at 5% facility fee on £60K avg. loan.",
      },
    ],
    before: [
      "3–4 hours per application regardless of complexity",
      "18% of applicants withdrawing mid-process citing the wait",
      "70% of compliance team time on mechanical checking",
      "No structured audit trail — decisions in emails and notes",
    ],
    after: [
      "Clean files: 4 min AI + 5 min sign-off",
      "Applicant dropout down to 6% — most approved same day",
      "Compliance team doing compliance work, not data entry",
      "Structured review audit trail (compliance assessment required) on every application",
    ],
    stack: [
      "Claude Vision (Anthropic)",
      "GPT-4o",
      "Custom Python",
      "Companies House API",
      "Sanctions & PEP API",
      "Airtable",
      "Zapier",
    ],
    duration: "9 weeks",
    DemoComponent: BridgepointDemo,
    demoCaption:
      "Document review — inspect missing or conflicting sample fields, request clarification and record a human review. No credit decision.",
  },
  {
    id: "meridian" as CaseId,
    client: "Meridian Property Group",
    headline:
      "How we gave a 21-person property team instant access to 9 years of institutional knowledge — and let them take on 22 new portfolios without hiring.",
    subheadline:
      "The knowledge existed. It just lived inside five people's heads. When one of them resigned, the whole team felt it.",
    why: {
      title: "Why a Notion wiki and FAQ page didn't solve it",
      body: "A junior manager spent six weeks building a Notion knowledge base. Within three months, fewer than half the team used it — because it was hard to search, not kept current, and gave you a document to read rather than an answer to act on. Tenants got a static FAQ page on the website. They didn't read it. They messaged instead. The problem wasn't the absence of documentation — it was that documentation isn't the same as a searchable, always-current, plain-English answer available at any hour.",
    },
    how: {
      title: "The architectural decision that made it work",
      body: "We chose retrieval-augmented generation over fine-tuning deliberately. Fine-tuning bakes knowledge into model weights — stale the moment a policy changes, expensive to update. RAG searches the actual current documents every time a question is asked. When Meridian updates a tenancy template or adds a new local authority requirement, the AI's answer updates immediately. We also built two completely separate systems: one for staff (nuanced, policy-level, source-attributed), one for tenants (plain English, direct, friendly). Same knowledge base, completely different interfaces.",
    },
    modules: [
      {
        name: "Staff Knowledge Assistant",
        problem:
          "New staff took 10–12 weeks to reach full competency. Senior staff fielded 15–25 internal knowledge queries per day — interrupting high-value work.",
        built:
          "Claude integration connected to Notion, SOPs, tenancy templates, contracts, and local authority guidance. Staff ask questions in plain English and receive sourced answers with a link to the originating document.",
        impact:
          "New staff competency time: 12 weeks → 3 weeks. Senior staff interruptions: 15–25/day → under 4/day.",
      },
      {
        name: "Source Attribution Layer",
        problem:
          "Staff were reluctant to trust AI answers for property management — the consequences of a wrong answer about tenant rights are real.",
        built:
          "Every response shows exactly which document it came from with a direct link. Staff can verify in under 10 seconds. Adoption went from cautious to complete once staff could see the source.",
        impact:
          "Full team adoption within 2 weeks of launch. No scepticism after the first week of verified answers.",
      },
      {
        name: "Tenant WhatsApp Agent",
        problem:
          "The same 40 tenant questions came in every week — rent due dates, repair processes, lease renewal steps — answered differently by whoever picked up, with no consistency or audit trail.",
        built:
          "WhatsApp agent for tenants handling 40 automated query categories. Answers are plain English, consistent, and always accurate. Anything outside scope routes to a human with full context.",
        impact:
          "67% of tenant queries resolved without any staff involvement. Response time: 6.5 hours → under 3 minutes.",
      },
      {
        name: "Automatic Knowledge Update Pipeline",
        problem:
          "Any fine-tuned model would become stale as policies, regulations, and contracts changed — requiring expensive retraining.",
        built:
          "RAG pipeline connected directly to Notion via API. When any document is updated, the AI's knowledge updates immediately. No retraining, no maintenance overhead, no version management.",
        impact:
          "Knowledge base is always current. Policy changes propagate to both staff and tenant AI in real time.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        title: "Document audit & discovery",
        items: [
          "Catalogued all existing documents, SOPs, and policies",
          "Interviewed senior staff on most common knowledge queries",
          "Interviewed two tenants on most common questions",
          "Defined scope for staff vs tenant interfaces",
        ],
      },
      {
        week: "Weeks 2–4",
        title: "RAG build & staff system",
        items: [
          "Knowledge indexing pipeline built",
          "Claude RAG integration built and tested",
          "Staff interface built inside their property management system",
          "Source attribution layer built and tested",
        ],
      },
      {
        week: "Weeks 5–7",
        title: "Tenant agent & deployment",
        items: [
          "WhatsApp tenant agent built and tested with real queries",
          "Escalation paths defined for all 40 query categories",
          "Phased rollout: staff first, then tenant invitations",
        ],
      },
    ],
    outcomes: [
      {
        value: "12 wks → 3 wks",
        label: "New staff competency time",
        why: "Staff can query any process or policy from day one.",
      },
      {
        value: "67%",
        label: "Tenant queries auto-resolved",
        why: "40 query categories handled without any staff involvement.",
      },
      {
        value: "+22 portfolios",
        label: "New business taken on in 6 months",
        why: "Same headcount now manages 820 units instead of 650.",
      },
      {
        value: "+£13,600/mo",
        label: "Additional recurring revenue",
        why: "22 new portfolios at £80/unit/month management fee.",
      },
    ],
    before: [
      "Knowledge lived in 5 senior staff members' heads",
      "New staff took 12 weeks to reach full competency",
      "Same 40 tenant questions answered inconsistently every week",
      "No knowledge continuity plan when key staff left",
    ],
    after: [
      "Entire team has instant access to full institutional knowledge",
      "New staff useful from week one — competent by week three",
      "67% of tenant queries handled automatically and consistently",
      "22 new portfolios taken on with the same headcount",
    ],
    stack: [
      "Claude (Anthropic)",
      "RAG Pipeline (Python)",
      "Notion API",
      "WhatsApp Business API",
      "Reapit",
      "Slack",
      "Make",
    ],
    duration: "7 weeks",
    DemoComponent: MeridianDemo,
    demoCaption:
      "Knowledge assistant — follow the sourced HMO response, contractor handoff, acknowledgement and tenant follow-up.",
  },
] as const;
// ═══════════════════════════════════════════════════════════════
// DEVICE SLIDESHOW — Responsive: Phone on mobile, Laptop on desktop
// ═══════════════════════════════════════════════════════════════

function DeviceSlideshow({
  caseId,
}: {
  caseId: string;
  accent: string;
  accentText?: string;
  accentLight?: string;
}) {
  return <CaseDemo id={caseId} />;
}
// ═══════════════════════════════════════════════════════════════
// VISUAL BEFORE/AFTER
// ═══════════════════════════════════════════════════════════════

const VISUAL_BEFORE: Record<string, () => React.ReactElement> = {
  nexus: () => (
    <div
      className="rounded-xl overflow-hidden border border-red-200 bg-red-50/30 flex flex-col"
      style={{
        height: "220px",
        fontFamily: "ui-sans-serif,system-ui,sans-serif",
      }}
    >
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-300" />
          <div className="h-2 w-2 rounded-full bg-red-200" />
          <div className="h-2 w-2 rounded-full bg-red-200" />
        </div>
        <p className="text-[11px] text-red-600 font-medium">
          WhatsApp — Personal phone
        </p>
      </div>
      <div
        className="flex-1 p-2 space-y-1.5 overflow-hidden"
        style={{ background: "#fff5f5" }}
      >
        <p className="text-[8px] text-red-400 text-center pb-1">
          Monday 09:14 — 4 unread messages from overnight
        </p>
        {[
          {
            name: "Sarah M.",
            msg: "Hi, sent a message last night about my case? Hoping for a call back today",
            time: "23:04",
            unread: true,
          },
          {
            name: "David O.",
            msg: "Just wanted to follow up — I've not heard back and I'm quite urgent",
            time: "23:31",
            unread: true,
          },
          {
            name: "Anon",
            msg: "Is anyone there? I need advice urgently. Will call another firm if no reply",
            time: "01:14",
            unread: true,
          },
          {
            name: "Sarah M.",
            msg: "I've booked with another firm. Thanks anyway.",
            time: "08:52",
            unread: false,
          },
        ].map((m) => (
          <div
            key={m.name + m.time}
            className={`flex gap-2 p-2 rounded-lg ${m.unread ? "bg-white border border-red-100" : "bg-red-50/50 opacity-60"}`}
          >
            <div className="h-5 w-5 rounded-full bg-gray-300 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-[8px] font-semibold text-gray-700">
                  {m.name}
                </p>
                <p className="text-[7px] text-gray-600">{m.time}</p>
              </div>
              <p className="text-[8px] text-gray-500 truncate">{m.msg}</p>
            </div>
            {m.unread && (
              <div className="h-2 w-2 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
            )}
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-red-50 border-t border-red-200 text-center">
        <p className="text-[8px] text-red-500 font-medium">
          ⚠ 3 unresponded leads — 1 already gone
        </p>
      </div>
    </div>
  ),
  bridgepoint: () => (
    <div
      className="rounded-xl overflow-hidden border border-red-200 bg-red-50/30 flex flex-col"
      style={{ height: "220px", fontFamily: "ui-monospace,monospace" }}
    >
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-300" />
          <div className="h-2 w-2 rounded-full bg-red-200" />
          <div className="h-2 w-2 rounded-full bg-red-200" />
        </div>
        <p className="text-[11px] text-red-600 font-medium">
          KYC_Applications_2024.xlsx
        </p>
      </div>
      <div
        className="flex-1 p-2 overflow-hidden"
        style={{ background: "#fff8f8" }}
      >
        <div className="grid grid-cols-4 gap-0.5 mb-1">
          {["Name", "ID?", "CoHo?", "Status"].map((h) => (
            <div
              key={h}
              className="bg-red-100 px-1.5 py-1 text-[8px] text-red-600 font-semibold"
            >
              {h}
            </div>
          ))}
        </div>
        {[
          ["Thornton Mfg", "✓", "Pending", "In Review"],
          ["Osei Consult.", "✓", "✓", "Waiting"],
          ["Park & Lee", "?", "✓", "Chase docs"],
          ["Delta Freight", "✓", "Pending", "In Review"],
          ["Vantage Foods", "✓", "✓", "Waiting"],
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-0.5 mb-0.5">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`px-1.5 py-1 text-[8px] border ${cell === "?" ? "bg-red-100 text-red-600 border-red-200" : cell === "Chase docs" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-white text-gray-600 border-gray-100"}`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
        <p className="text-[8px] text-red-400 mt-2 text-center">
          Last updated: manually, 3 hrs ago
        </p>
      </div>
      <div className="px-3 py-2 bg-red-50 border-t border-red-200 text-center">
        <p className="text-[8px] text-red-500 font-medium">
          ⚠ 70 apps · 3–4 hrs each · 4 officers
        </p>
      </div>
    </div>
  ),
  meridian: () => (
    <div
      className="rounded-xl overflow-hidden border border-red-200 bg-red-50/30 flex flex-col"
      style={{
        height: "220px",
        fontFamily: "ui-sans-serif,system-ui,sans-serif",
      }}
    >
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-300" />
          <div className="h-2 w-2 rounded-full bg-red-200" />
          <div className="h-2 w-2 rounded-full bg-red-200" />
        </div>
        <p className="text-[11px] text-red-600 font-medium">
          WhatsApp — Diane (Senior PM)
        </p>
      </div>
      <div
        className="flex-1 p-2 space-y-1 overflow-hidden"
        style={{ background: "#fff5f5" }}
      >
        <p className="text-[8px] text-red-400 text-center pb-1">
          14 unread messages — Mon 09:02
        </p>
        {[
          {
            name: "Tom (New Staff)",
            msg: "Hi Diane — what's our process for a gas leak in a managed HMO?",
          },
          {
            name: "Tom (New Staff)",
            msg: "Also what's the approved contractor list for Birmingham HMOs?",
          },
          {
            name: "Tenant — Flat 4B",
            msg: "Hi when is my rent due? And how do I report a broken tap?",
          },
          {
            name: "Tom (New Staff)",
            msg: "Sorry one more — what are we supposed to do if landlord doesn't respond?",
          },
          {
            name: "Tenant — Unit 12",
            msg: "No one has got back to me about my boiler for 2 days now",
          },
        ].map((m, i) => (
          <div
            key={i}
            className="flex gap-2 p-1.5 rounded-lg bg-white border border-red-100"
          >
            <div className="h-4 w-4 rounded-full bg-gray-200 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-semibold text-gray-600">{m.name}</p>
              <p className="text-[8px] text-gray-500 truncate">{m.msg}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-red-50 border-t border-red-200 text-center">
        <p className="text-[8px] text-red-500 font-medium">
          ⚠ Diane interrupted 15–25 times/day
        </p>
      </div>
    </div>
  ),
};

const VISUAL_AFTER: Record<string, () => React.ReactElement> = {
  nexus: () => (
    <div
      className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col"
      style={{
        height: "220px",
        fontFamily: "ui-sans-serif,system-ui,sans-serif",
        background: "#f0f7f4",
      }}
    >
      <div className="bg-emerald-600 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-white/40" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <p className="text-[11px] text-white font-medium">
          Nexus Legal AI · 3 consultations booked overnight
        </p>
        <span className="ml-auto text-[8px] text-emerald-200">● Live</span>
      </div>
      <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
        {[
          {
            name: "Sarah M.",
            msg: "Booked 9am — Family Law · Custody",
            status: "booked",
            time: "23:04",
          },
          {
            name: "David O.",
            msg: "Booked 10am — Employment Law · Dismissal",
            status: "booked",
            time: "23:31",
          },
          {
            name: "Anon",
            msg: "Outside practice areas — referred to family law specialist",
            status: "referred",
            time: "01:14",
          },
          {
            name: "New enquiry",
            msg: "Qualifying in progress — awaiting jurisdiction confirmation",
            status: "active",
            time: "Now",
          },
        ].map((m) => (
          <div
            key={m.name + m.time}
            className="flex gap-2 p-2 rounded-lg bg-white border border-emerald-100"
          >
            <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[8px] font-bold flex-shrink-0 mt-0.5">
              {m.status === "booked" ? "✓" : m.status === "active" ? "⟳" : "→"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-[8px] font-semibold text-gray-700">
                  {m.name}
                </p>
                <p className="text-[7px] text-gray-600">{m.time}</p>
              </div>
              <p className="text-[8px] text-gray-500 truncate">{m.msg}</p>
            </div>
            <span
              className={`text-[7px] px-1.5 py-0.5 rounded-full h-fit mt-1 flex-shrink-0 ${m.status === "booked" ? "bg-emerald-100 text-emerald-700" : m.status === "active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-200 text-center">
        <p className="text-[8px] text-emerald-600 font-medium">
          ✓ 3 consultations booked while team slept
        </p>
      </div>
    </div>
  ),
  bridgepoint: () => (
    <div
      className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col"
      style={{ height: "220px", fontFamily: "ui-monospace,monospace" }}
    >
      <div className="bg-emerald-600 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-white/40" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <p className="text-[11px] text-white font-medium">
          KYC Engine · 47 processed this morning
        </p>
      </div>
      <div className="flex-1 p-2 overflow-hidden">
        <div className="grid grid-cols-4 gap-0.5 mb-1">
          {["Name", "Score", "Flag", "Action"].map((h) => (
            <div
              key={h}
              className="bg-emerald-50 border border-emerald-100 px-1.5 py-1 text-[8px] text-emerald-700 font-semibold"
            >
              {h}
            </div>
          ))}
        </div>
        {[
          ["Thornton Mfg", "88", "None", "✓ Auto"],
          ["Osei Consult.", "91", "None", "✓ Auto"],
          ["Park & Lee", "43", "⚑ Sector", "Review"],
          ["Delta Freight", "76", "None", "✓ Auto"],
          ["Vantage Foods", "34", "⚑ PEP", "Review"],
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-0.5 mb-0.5">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`px-1.5 py-1 text-[8px] border ${cell.startsWith("✓") ? "bg-emerald-50 text-emerald-700 border-emerald-200" : cell.startsWith("⚑") ? "bg-amber-50 text-amber-700 border-amber-200" : cell === "Review" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-white text-gray-600 border-gray-100"}`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
        <p className="text-[8px] text-emerald-600 mt-2 text-center font-medium">
          47 auto-processed · 3 flagged for review
        </p>
      </div>
      <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-200 text-center">
        <p className="text-[8px] text-emerald-600 font-medium">
          ✓ 4 min AI + 5 min sign-off per clean file
        </p>
      </div>
    </div>
  ),
  meridian: () => (
    <div
      className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col"
      style={{
        height: "220px",
        fontFamily: "ui-sans-serif,system-ui,sans-serif",
      }}
    >
      <div className="bg-emerald-600 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-white/40" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <p className="text-[11px] text-white font-medium">
          Meridian AI · Today&apos;s activity
        </p>
        <span className="ml-auto text-[8px] text-emerald-200">● Live</span>
      </div>
      <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {[
            {
              label: "Staff queries resolved",
              value: "38",
              sub: "AI answered instantly",
            },
            { label: "Tenant queries", value: "67%", sub: "auto-resolved" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg bg-emerald-50 border border-emerald-100 p-2"
            >
              <p className="text-[8px] text-emerald-700 font-bold text-lg leading-none">
                {s.value}
              </p>
              <p className="text-[8px] text-gray-500 mt-0.5">{s.label}</p>
              <p className="text-[7px] text-emerald-600">{s.sub}</p>
            </div>
          ))}
        </div>
        {[
          {
            role: "Tom (Staff)",
            q: "Gas leak process HMO?",
            status: "Answered · 2s",
            ok: true,
          },
          {
            role: "Tenant 4B",
            q: "When is my rent due?",
            status: "Answered · 1s",
            ok: true,
          },
          {
            role: "Unit 12",
            q: "Boiler broken 2 days",
            status: "Escalated to PM",
            ok: false,
          },
          {
            role: "Tom (Staff)",
            q: "Approved contractor list?",
            status: "Answered · 1s",
            ok: true,
          },
        ].map((r, i) => (
          <div
            key={i}
            className="flex gap-2 p-1.5 rounded-lg bg-white border border-emerald-100"
          >
            <span
              className={`text-[8px] mt-0.5 flex-shrink-0 ${r.ok ? "text-emerald-500" : "text-amber-500"}`}
            >
              {r.ok ? "✓" : "→"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-semibold text-gray-600 truncate">
                {r.role}:{" "}
                <span className="font-normal text-gray-500">{r.q}</span>
              </p>
              <p
                className={`text-[7px] ${r.ok ? "text-emerald-600" : "text-amber-600"}`}
              >
                {r.status}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-200 text-center">
        <p className="text-[8px] text-emerald-600 font-medium">
          ✓ Diane interrupted 4 times today (was 25)
        </p>
      </div>
    </div>
  ),
};

function VisualBeforeAfter({
  caseId,
  before,
  after,
}: {
  caseId: string;
  before: readonly string[];
  after: readonly string[];
}) {
  const BeforeScreen = VISUAL_BEFORE[caseId];
  const AfterScreen = VISUAL_AFTER[caseId];

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
              Before
            </span>
            <div className="flex-1 h-px bg-red-100" />
          </div>
          <div style={{ height: "220px" }}>
            {BeforeScreen && <BeforeScreen />}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
              After
            </span>
            <div className="flex-1 h-px bg-emerald-100" />
          </div>
          <div style={{ height: "220px" }}>
            {AfterScreen && <AfterScreen />}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <ul className="space-y-1">
          {before.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-gray-500"
            >
              <span className="text-red-300 flex-shrink-0 font-bold mt-0.5 text-[10px]">
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
        <ul className="space-y-1">
          {after.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-gray-600"
            >
              <span className="text-emerald-400 flex-shrink-0 font-bold mt-0.5 text-[10px]">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function ModuleRow({
  mod,
  accent,
}: {
  mod: { name: string; problem: string; built: string; impact: string };
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-black/[0.08] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 gap-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{ background: accent }}
          />
          <span className="text-sm font-medium text-gray-900 truncate">
            {mod.name}
          </span>
        </div>
        <span
          className={`text-gray-600 text-sm transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="b"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/[0.06] divide-y divide-black/[0.04]">
              {(
                [
                  ["The problem", mod.problem, "text-red-600/70"],
                  ["What we built", mod.built, "text-gray-500"],
                  ["Business impact", mod.impact, "text-emerald-700"],
                ] as const
              ).map(([l, t, c]) => (
                <div key={l} className="px-4 py-3">
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${c}`}
                  >
                    {l}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CaseTimeline({
  weeks,
  accent,
}: {
  weeks: readonly { week: string; title: string; items: readonly string[] }[];
  accent: string;
}) {
  return (
    <div>
      {weeks.map((w, i) => (
        <div key={w.week} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: accent }}
            >
              <span className="text-white text-[11px] font-bold">{i + 1}</span>
            </div>
            {i < weeks.length - 1 && (
              <div
                className="w-px flex-1 mt-1"
                style={{ background: `${accent}20` }}
              />
            )}
          </div>
          <div className="pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-900">
                {w.week}
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-500">{w.title}</span>
            </div>
            <ul className="space-y-1">
              {w.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-gray-500"
                >
                  <span
                    className="mt-[5px] h-1 w-1 rounded-full flex-shrink-0"
                    style={{ background: accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

type TabId = "story" | "modules" | "delivery" | "results";

const TABS: { id: TabId; label: string }[] = [
  { id: "story", label: "The story" },
  { id: "modules", label: "What we built" },
  { id: "delivery", label: "Delivery" },
  { id: "results", label: "Results" },
];

function CaseCard({
  study,
  isOpen,
  onToggle,
  index,
}: {
  study: (typeof CASES)[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const theme = CASE_THEMES[study.id];
  const rm = useReducedMotion();
  const [tab, setTab] = useState<TabId>("story");
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onToggle();
    setTab("story");
    if (!isOpen)
      setTimeout(
        () =>
          ref.current?.scrollIntoView({
            behavior: rm ? "auto" : "smooth",
            block: "start",
          }),
        90,
      );
  };

  return (
    <motion.div
      id={study.id}
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.5, ease, delay: index * 0.07 }}
      className="scroll-mt-28 rounded-3xl border overflow-hidden bg-white transition-shadow duration-300"
      style={{
        borderColor: isOpen ? theme.accentBorder : "rgba(0,0,0,0.09)",
        boxShadow: isOpen
          ? "0 20px 60px rgba(0,0,0,0.09)"
          : "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* ── Collapsed header ── */}
      <CaseEvidence />
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`${study.id}-details`}
        className="case-study-toggle w-full text-left p-5 md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Big number + label row */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-3xl md:text-4xl font-bold leading-none"
                style={{ color: theme.accent, opacity: 0.15 }}
              >
                {theme.number}
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  background: theme.accentLight,
                  color: theme.accentText,
                }}
              >
                {theme.label}
              </span>
            </div>
            <h3 className="text-base md:text-[1.1rem] font-medium text-gray-900 leading-snug max-w-2xl">
              {study.headline}
            </h3>
            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed max-w-xl">
              {study.subheadline}
            </p>
          </div>
          <div
            className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1 transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
            style={{
              background: isOpen ? theme.accentLight : "rgba(0,0,0,0.05)",
              color: isOpen ? theme.accent : "#9ca3af",
            }}
            aria-hidden="true"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <line
                x1="6"
                y1="1"
                x2="6"
                y2="11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="1"
                y1="6"
                x2="11"
                y2="6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Outcome pills — collapsed only */}
        {!isOpen && (
          <div className="mt-4 flex flex-wrap gap-2">
            {study.outcomes.slice(0, 3).map((o) => (
              <span
                key={o.value}
                className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1 text-[11px] text-gray-500"
              >
                <span className="font-semibold text-gray-900">{o.value}</span>
                {o.label}
              </span>
            ))}
            <span className="hidden md:flex items-center text-xs text-gray-600 ml-auto">
              Read full story →
            </span>
          </div>
        )}
      </button>

      {/* ── Expanded ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${study.id}-details`}
            key="exp"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <ExampleNavigation
              id={study.id}
              tabs={TABS}
              active={tab}
              onSelect={setTab}
            />
            {/* Device slideshow strip */}
            <div
              className="border-t border-black/[0.06]"
              style={{ background: theme.accentLight }}
            >
              <div className="case-demo-band px-1 sm:px-5 md:px-8 py-6 md:py-8">
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-4 md:mb-6"
                  style={{ color: theme.accentText }}
                >
                  Interactive sample — {study.demoCaption}
                </p>
                <DeviceSlideshow
                  caseId={study.id}
                  accent={theme.accent}
                  accentText={theme.accentText}
                  accentLight={theme.accentLight}
                />
              </div>
            </div>

            {/* Tab nav */}
            <div
              id={`${study.id}-reading`}
              className="scroll-mt-36 border-y border-black/[0.07]"
            >
              <div className="px-4 md:px-6 flex overflow-x-auto">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-pressed={tab === t.id}
                    className={`px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${
                      tab === t.id
                        ? "border-current"
                        : "border-transparent text-gray-600 hover:text-gray-600"
                    }`}
                    style={{ color: tab === t.id ? theme.accent : undefined }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab body */}
            <div className="px-4 md:px-6 py-6">
              <AnimatePresence mode="wait" initial={false}>
                {tab === "story" && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="space-y-6">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-2">
                            {study.why.title}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {study.why.body}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-2">
                            {study.how.title}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {study.how.body}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-3">
                          Before &amp; after
                        </p>
                        <VisualBeforeAfter
                          caseId={study.id}
                          before={study.before}
                          after={study.after}
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-2">
                          Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {study.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-lg border border-black/10 px-2.5 py-1 text-xs text-gray-600 font-mono"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {tab === "modules" && (
                  <motion.div
                    key="mod"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-xs text-gray-500 mb-4">
                      Each module below shows the exact problem it solved, what
                      was built, and the business impact.
                    </p>
                    <div className="space-y-2">
                      {study.modules.map((m) => (
                        <ModuleRow key={m.name} mod={m} accent={theme.accent} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {tab === "delivery" && (
                  <motion.div
                    key="del"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-xs text-gray-500 mb-5">
                      Every project starts with discovery — never with code.
                    </p>
                    <CaseTimeline
                      weeks={study.timeline}
                      accent={theme.accent}
                    />
                  </motion.div>
                )}

                {tab === "results" && (
                  <motion.div
                    key="res"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-xs text-gray-500 mb-4">
                      Each outcome includes the mechanism that produced it.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {study.outcomes.map((o) => (
                        <div
                          key={o.value}
                          className="rounded-xl border border-black/[0.08] bg-white p-4"
                        >
                          <p
                            className="text-2xl font-semibold leading-none mb-1"
                            style={{ color: theme.accent }}
                          >
                            {o.value}
                          </p>
                          <p className="text-xs font-medium text-gray-700 mb-1.5 leading-snug">
                            {o.label}
                          </p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            {o.why}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      className="mt-5 rounded-2xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      style={{
                        borderColor: theme.accentBorder,
                        background: theme.accentLight,
                      }}
                    >
                      <div>
                        <p className="text-xs text-gray-600">
                          Delivered in{" "}
                          <span className="font-semibold text-gray-900">
                            {study.duration}
                          </span>{" "}
                          from signed scope to live system.
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Written ROI estimate before any build begins. No
                          commitment required.
                        </p>
                      </div>
                      <Link
                        href={contactHref("ai-business-automation", study.id)}
                        className="flex-shrink-0 inline-flex items-center justify-center rounded-xl text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition"
                        style={{ background: theme.accent }}
                      >
                        Build something like this →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
function CaseStudiesSection() {
  const [openId, setOpenId] = useState<CaseId | null>(null);

  return (
    <section
      id="case-studies"
      className={cx(SECTION_SCROLL_MT, "px-4 md:px-6 py-12 md:py-20")}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#666666] mb-2">
            Workflow examples
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#050505] max-w-2xl leading-snug">
            Three businesses. Real problems. Here&apos;s exactly how we solved
            them.
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">
            Each case includes an interactive sample, the full story behind the
            design decisions, and the original outcome statements. These are
            real client projects with changed names for confidentiality.
            Commercial result figures still require supporting evidence.
          </p>
        </div>

        <div className="space-y-4">
          {CASES.map((study, i) => (
            <CaseCard
              key={study.id}
              study={study}
              index={i}
              isOpen={openId === study.id}
              onToggle={() =>
                setOpenId((prev) => (prev === study.id ? null : study.id))
              }
            />
          ))}
        </div>

        {/* How We Think block */}
        <div className="mt-6 rounded-3xl bg-black text-white p-5 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/65 mb-3">
              How we think
            </p>
            <p className="text-lg md:text-xl font-medium text-white max-w-2xl leading-snug">
              Most agencies start by asking what you want to automate. We start
              by asking what&apos;s actually breaking — and why the tools
              you&apos;ve already tried didn&apos;t fix it.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {CASES.map((c) => {
                const t = CASE_THEMES[c.id];
                return (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span
                      className="inline-block text-[11px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3"
                      style={{ background: `${t.accent}22`, color: t.accent }}
                    >
                      {t.label.split("·")[0].trim()}
                    </span>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {c.id === "nexus"
                        ? "The problem wasn't a missing chatbot — it was that nobody had mapped where the enquiries were actually coming from. 78% were on WhatsApp. The fix was building where clients already were, with AI that could reason about their situation, not just reply."
                        : c.id === "bridgepoint"
                          ? "Two off-the-shelf KYC platforms had already been tried and rejected. Both solved one step of a twelve-step process. The answer was learning the compliance team's judgment and encoding it into a bespoke scoring model — not a generic product."
                          : "The knowledge already existed — in Notion, SOPs, and people's heads. The problem was retrieval. The fix wasn't creating more documentation; it was putting an intelligent search layer on top of what already existed."}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-white/50 max-w-md leading-relaxed">
                If your business has a workflow that&apos;s slowing you down, we
                probably have questions that will change what you think needs to
                be built.
              </p>
              <Link
                href={contactHref("ai-business-automation")}
                className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-white text-black text-sm font-medium px-5 py-2.5 hover:opacity-90 transition"
              >
                Book a discovery call →
              </Link>
            </div>
          </div>
        </div>

        {/* Soft CTA */}
        <div className="mt-4 rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Not sure if automation is right for your business?
            </p>
            <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
              Book a free 30-minute workflow review. We&apos;ll map your
              processes, identify the highest-impact opportunities, and tell you
              honestly whether automation makes sense — and what the expected
              ROI is.
            </p>
          </div>
          <Link
            href={contactHref("ai-business-automation")}
            className="flex-shrink-0 inline-flex items-center justify-center rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition whitespace-nowrap"
          >
            Book a free review
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════
const FAQS = [
  {
    q: "How quickly does automation pay for itself?",
    a: "Most clients see full cost recovery within 8–14 weeks. AI agents recovering lost leads (like Nexus Legal) often pay back in 6–7 weeks from additional revenue alone. We include a projected payback period in the written ROI estimate we produce after every free audit — so you see the number before committing.",
  },
  {
    q: "How much does it cost?",
    a: "Projects are scoped after the free audit based on complexity and integrations. Most single-workflow automations start from £2,500–£4,000. Full AI agent deployments with CRM integration and multi-channel support start from £5,000–£8,000. You'll see the exact figure, with the expected ROI, before committing to anything.",
  },
  {
    q: "Will AI automation replace my team?",
    a: "No — and we design it that way deliberately. AI handles the repetitive, low-judgment work so your team can focus on what genuinely needs a human. The Bridgepoint compliance team didn't shrink — they went from spending 70% of their time on mechanical checking to 80% judgment and relationship work. That's the target in every project.",
  },
  {
    q: "How accurate are AI agents?",
    a: "A well-scoped AI agent handling a defined set of tasks typically achieves 90%+ accuracy in production. We build explicit escalation paths into every system — anything the AI can't handle confidently goes to a human with full context written up. You never lose a client because the AI didn't know the answer.",
  },
  {
    q: "What AI models do you use?",
    a: "We're model-agnostic. Anthropic Claude for nuanced conversation and document understanding. OpenAI GPT-4o for vision and multimodal tasks. Google Gemini for certain integrations. For data-privacy or latency requirements, we can deploy open-source models on your own infrastructure. The model is always chosen for the job.",
  },
  {
    q: "How long does a project take?",
    a: "A single focused automation — a WhatsApp qualifier, a KYC pipeline, a reporting system — typically takes 4–6 weeks from audit to live. A full AI agent with CRM integration and multi-channel deployment takes 6–10 weeks. We scope precisely after the audit so you know the exact timeline before committing.",
  },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-6"
        aria-expanded={open}
      >
        <span className="text-sm text-gray-900">{q}</span>
        <span
          className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
const SECTIONS: NavSection[] = [
  { id: "what-we-build", label: "What we automate" },
  { id: "case-studies", label: "Live demos" },
  { id: "faq", label: "FAQ" },
];

export default function AIAutomationPage() {
  return (
    <main
      className={cx(
        editorialRoot,
        "service-page min-h-screen bg-white text-[#050505]",
      )}
    >
      <SectionNav sections={SECTIONS} />
      <Hero />
      <WhatWeAutomateCarousel />
      <CaseStudiesSection />
      <section
        id="faq"
        className={cx(SECTION_SCROLL_MT, "px-4 md:px-6 pb-24 pt-4")}
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#666666] mb-2">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#050505] mb-2">
            Questions we get asked every time.
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">
            Answered here so your consultation time goes towards your actual
            project.
          </p>
          <div className="grid gap-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
