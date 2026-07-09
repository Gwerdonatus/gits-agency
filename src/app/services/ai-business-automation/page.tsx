"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — Industry-authentic colors
// ═══════════════════════════════════════════════════════════════
const CASE_THEMES = {
  nexus: {
    accent: "#1e3a5f", accentLight: "rgba(30,58,95,0.06)",
    accentBorder: "rgba(30,58,95,0.18)", accentText: "#1e3a5f",
    label: "Legal · Family Law",
    cardBg: "#f4f7fb",
    number: "01",
  },
  bridgepoint: {
    accent: "#0f5c5c", accentLight: "rgba(15,92,92,0.06)",
    accentBorder: "rgba(15,92,92,0.18)", accentText: "#0f5c5c",
    label: "Finance · SME Lending",
    cardBg: "#f0f7f7",
    number: "02",
  },
  meridian: {
    accent: "#2d5a3d", accentLight: "rgba(45,90,61,0.06)",
    accentBorder: "rgba(45,90,61,0.18)", accentText: "#2d5a3d",
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
    <section className="relative px-6 pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/[0.08] blur-3xl" />
        <div className="absolute top-48 -left-32 h-[380px] w-[380px] rounded-full bg-cyan-400/[0.06] blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-[400px] w-[400px] rounded-full bg-indigo-400/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0)}
          className="text-xs uppercase tracking-widest text-gray-400 mb-4"
        >
          Services / AI &amp; Business Automation
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.06)}
          className="text-4xl md:text-[3.4rem] font-medium leading-[1.08] tracking-tight text-gray-900 max-w-4xl"
        >
          Your business, working<br className="hidden md:block" />
          <span className="text-blue-600"> while you sleep.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.12)}
          className="mt-5 text-gray-500 max-w-2xl leading-relaxed text-base md:text-lg"
        >
          We build AI agents and automation systems that handle the repetitive,
          time-consuming work across your business — so your team can focus on the
          decisions and relationships that generate revenue.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.18)}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-80 transition"
          >
            Book free automation audit
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fd(0.26)}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
        >
          {[
            "Free workflow audit — no cost to start",
            "Written ROI estimate before you commit",
            "No obligation to proceed",
            "6-week average from audit to live",
            "Clients across 12+ industries",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* ── Compact explainer bullets ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.3)}
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
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
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
const WHAT_WE_AUTOMATE = [
  {
    icon: "🤖",
    title: "AI Business Agents",
    who: "For any client-facing business",
    desc: "Conversational AI trained on your business that responds on WhatsApp, email, and web chat 24/7 — qualifying leads, answering questions, and booking appointments without human intervention.",
    example: "e.g. A law firm's AI agent that responds at 11pm, qualifies the enquiry, and books a consultation directly into the partner's calendar.",
  },
  {
    icon: "🧾",
    title: "Intelligent Client Onboarding",
    who: "For regulated industries",
    desc: "AI that reads, verifies, and cross-references every onboarding document — ID, proof of address, company registration, bank statements — scores the risk level, and flags only the cases that need human review.",
    example: "e.g. A lending firm processing 70+ KYC applications per week, reducing per-application time from 3 hours to 9 minutes.",
  },
  {
    icon: "🧠",
    title: "Custom Claude / ChatGPT Integration",
    who: "For knowledge-heavy businesses",
    desc: "AI connected directly to your internal documents, SOPs, and policies so your team — or your customers — get accurate, sourced answers about your actual business, not generic responses.",
    example: "e.g. A property management company whose 21-person team can now query 9 years of institutional knowledge instantly.",
  },
  {
    icon: "📊",
    title: "Automated Reporting Pipelines",
    who: "For agencies and ops teams",
    desc: "Systems that pull from every data source you use, generate narrative commentary, and deliver formatted reports to the right inboxes on schedule — without a human pulling a single CSV.",
    example: "e.g. A marketing agency whose Monday morning reports now generate automatically at 6am, reviewed and sent by 8am.",
  },
  {
    icon: "🔗",
    title: "CRM & Workflow Automation",
    who: "For sales and operations",
    desc: "Every trigger in one tool — a form submission, a payment, a booking — cascades automatically through your CRM, email platform, Slack, and database. Nothing manual, nothing missed.",
    example: "e.g. A B2B sales team where every inbound lead is scored, routed, and followed up before a human touches it.",
  },
  {
    icon: "💬",
    title: "WhatsApp & Email Sequences",
    who: "For customer-facing teams",
    desc: "Personalised conversation flows, follow-up sequences, appointment reminders, and re-engagement campaigns on the channels your customers already use — triggered automatically.",
    example: "e.g. A clinic whose no-show rate dropped 40% after automated appointment reminders and rescheduling flows.",
  },
  {
    icon: "📋",
    title: "Document Intelligence",
    who: "For professional services",
    desc: "AI that reads contracts, invoices, applications, and compliance documents — extracts key data, classifies content, routes to the right person, and flags anomalies automatically.",
    example: "e.g. An insurance broker whose policy renewal extraction went from 2 hours per case to under 4 minutes.",
  },
  {
    icon: "🌐",
    title: "API & System Integrations",
    who: "For complex tech stacks",
    desc: "We connect any tool to any tool — legacy systems, custom APIs, government databases, payment gateways — so your automation stack works as one connected system.",
    example: "e.g. A fintech connecting a core banking system, identity verification API, and CRM into one automated onboarding pipeline.",
  },
];

function WhatWeAutomateCarousel() {
  const [active, setActive] = useState(0);
  const total = WHAT_WE_AUTOMATE.length;
  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  const visible = [
    WHAT_WE_AUTOMATE[active % total],
    WHAT_WE_AUTOMATE[(active + 1) % total],
    WHAT_WE_AUTOMATE[(active + 2) % total],
  ];

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">What we automate</p>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 max-w-lg leading-snug">
              Not sure what AI can actually do for your business?
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">
              Here are eight types of automation we build. If any of these sound like your situation, we should talk.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button type="button" onClick={prev} className="h-9 w-9 rounded-xl border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition" aria-label="Previous">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="text-xs text-gray-400 font-mono w-12 text-center">{active + 1} / {total}</span>
            <button type="button" onClick={next} className="h-9 w-9 rounded-xl border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition" aria-label="Next">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visible.map((item, i) => (
            <motion.div key={`${active}-${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, ease, delay: i * 0.05 }}
              className={`rounded-2xl border border-black/10 bg-white p-5 flex flex-col ${i > 0 ? "hidden md:flex" : ""}`}
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 border border-black/10 rounded-full px-2.5 py-1 truncate max-w-[160px]">{item.who}</span>
              </div>
              <p className="text-base font-semibold text-gray-900 mb-2">{item.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.desc}</p>
              <div className="mt-4 pt-4 border-t border-black/[0.06]">
                <p className="text-xs text-gray-400 leading-relaxed italic">{item.example}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-1.5">
          {WHAT_WE_AUTOMATE.map((_, i) => (
            <button key={i} type="button" onClick={() => setActive(i)}
              className={`transition-all duration-200 rounded-full ${i === active ? "h-1.5 w-5 bg-black" : "h-1.5 w-1.5 bg-black/20"}`}
              aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-600">Don't see your use case? If your team is doing anything repeatedly — responding, reviewing, reporting, routing — there's almost certainly a viable automation. Tell us what's slowing you down.</p>
          <Link href="/contact" className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:opacity-80 transition whitespace-nowrap">Tell us what you need</Link>
        </div>
      </div>
    </section>
  );
}
// ═══════════════════════════════════════════════════════════════
// HTML DEMOS — white-background, purposeful UI mocks
// ═══════════════════════════════════════════════════════════════

function NexusDemo() {
  const [step, setStep] = useState(0);
  const messages = [
    { from: "user", text: "Hi, I need urgent advice about a custody situation. It's 11pm, really stressed.", time: "23:04" },
    { from: "ai",   text: "I'm sorry you're going through this — let me help. Is this a new matter, or has there been prior legal action?", time: "23:04" },
    { from: "user", text: "New matter. My ex is refusing to let me see my daughter.", time: "23:05" },
    { from: "ai",   text: "Understood. This is a family law matter our partners handle. I can book you with James Okafor (Managing Partner) tomorrow — 9am or 11am?", time: "23:05" },
    { from: "user", text: "9am please.", time: "23:05" },
    { from: "ai",   text: "✓ Booked — 9am with James Okafor. Confirmation sent to your email. Please try to rest — you're in safe hands.", time: "23:05" },
  ];

  useEffect(() => {
    if (step >= messages.length) {
      const t = setTimeout(() => setStep(0), 3200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : 1500);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="rounded-xl border border-black/10 bg-white overflow-hidden text-[11px]">
      <div className="bg-gray-50 border-b border-black/8 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 bg-white rounded-md border border-black/8 px-3 py-1 text-gray-400 text-[10px]">WhatsApp Business · Nexus Legal Partners AI</div>
        <span className="text-[9px] text-green-600 font-semibold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">● LIVE</span>
      </div>
      <div className="h-[268px] flex flex-col" style={{ background: "#f0f2f5" }}>
        <div className="bg-[#075e54] px-4 py-2.5 flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-purple-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">NL</div>
          <div>
            <p className="text-white text-[11px] font-semibold leading-none">Nexus Legal — AI Assistant</p>
            <p className="text-white/50 text-[9px] mt-0.5">Typically responds instantly</p>
          </div>
        </div>
        <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col justify-end gap-1.5">
          {step === 0 && <p className="text-center text-gray-400 text-[10px] py-6">Simulating live conversation…</p>}
          {messages.slice(0, step).map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 5, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25 }}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed shadow-sm ${m.from === "user" ? "text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm"}`}
                style={m.from === "user" ? { background: "#075e54" } : {}}>
                {m.text}
                <span className="block text-right mt-0.5 opacity-40 text-[9px]">{m.time} {m.from === "ai" ? "✓✓" : ""}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="bg-white border-t border-black/[0.06] px-3 py-2 flex items-center gap-2">
          <div className="flex-1 rounded-full bg-gray-100 px-3 py-1.5 text-[10px] text-gray-400">AI responding…</div>
          <div className="h-7 w-7 rounded-full bg-[#075e54] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BridgepointDemo() {
  const [phase, setPhase] = useState(0);
  const docs = [
    { name: "Passport — J. Thornton", result: "✓ Valid · Expires 2028" },
    { name: "Proof of Address", result: "✓ Matches director record" },
    { name: "Companies House Cert.", result: "✓ Active · Registered 2019" },
    { name: "Bank Statements × 6", result: "✓ Cash flow consistent" },
    { name: "Sanctions / PEP Check", result: "✓ No flags detected" },
  ];

  useEffect(() => {
    if (phase > docs.length + 2) {
      const t = setTimeout(() => setPhase(0), 2500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase((p) => p + 1), phase === 0 ? 500 : 950);
    return () => clearTimeout(t);
  }, [phase]);

  const score = Math.min(92, Math.round((phase / (docs.length + 1)) * 92));
  const showScore = phase > docs.length;
  const showApproval = phase > docs.length + 1;

  return (
    <div className="rounded-xl border border-black/10 bg-white overflow-hidden text-[11px]" style={{ fontFamily: "ui-monospace, monospace" }}>
      <div className="bg-gray-50 border-b border-black/8 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 bg-white rounded-md border border-black/8 px-3 py-1 text-gray-400 text-[10px]">bridgepoint.internal / kyc-engine</div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-900 font-semibold text-[11px]">Thornton Manufacturing Ltd</p>
            <p className="text-gray-400 text-[9px]">Loan Application · £85,000 · Received 09:14</p>
          </div>
          <span className="text-[9px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">AI Engine · Processing</span>
        </div>
        <div className="space-y-1.5 mb-3">
          {docs.map((doc, i) => {
            const active = phase === i + 1;
            const done = phase > i + 1;
            return (
              <div key={i} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[10px] transition-all duration-300 ${done ? "bg-emerald-50 border border-emerald-100" : active ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-100"}`}>
                <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  {done ? <span className="text-emerald-500 font-bold text-[10px]">✓</span> : active ? <motion.div className="w-3 h-3 rounded-full border-2 border-blue-500 border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} /> : <span className="text-gray-300 text-[10px]">○</span>}
                </div>
                <span className={`flex-1 font-medium ${done ? "text-emerald-700" : active ? "text-blue-700" : "text-gray-300"}`}>{doc.name}</span>
                {done && <span className="text-emerald-600 text-[9px] font-medium">{doc.result}</span>}
              </div>
            );
          })}
        </div>
        <div className="rounded-lg border border-black/[0.08] bg-gray-50 px-3 py-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">Risk Score</p>
            <p className="font-bold text-sm" style={{ color: showScore ? "#059669" : "transparent" }}>{score}/100 — Low Risk</p>
          </div>
          <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #0369a1, #059669)" }} initial={{ width: "0%" }} animate={{ width: `${score}%` }} transition={{ duration: 0.5 }} />
          </div>
          {showApproval && (
            <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center justify-between">
              <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">✓ APPROVED — Ready for sign-off</span>
              <span className="text-gray-400 text-[9px]">4m 12s</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function MeridianDemo() {
  const [step, setStep] = useState(0);
  const conversation = [
    { from: "user", text: "What's our process if a tenant in an HMO reports no hot water?" },
    { from: "ai",   text: "Under HMO Maintenance SOP (§4.2), no hot water is Priority 1:", detail: ["1. Log ticket as Priority 1 in Reapit within 2 hours", "2. Contact HMO-approved plumber from contractor list", "3. Notify landlord within 4 hours using urgent repair template", "4. Resolve within 24hrs or arrange temporary provision"], source: "HMO Maintenance SOP v3.1 · Updated Feb 2025" },
    { from: "user", text: "Can I use any plumber or only from the approved list?" },
    { from: "ai",   text: "HMO properties require approved contractors only (Landlord Agreement, Clause 8.1). Using unapproved contractors voids the landlord's insurance policy.", source: "Standard Landlord Agreement · Clause 8.1" },
  ];

  useEffect(() => {
    if (step >= conversation.length) {
      const t = setTimeout(() => setStep(0), 3000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 600 : 2300);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="rounded-xl border border-black/10 bg-white overflow-hidden text-[11px]" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div className="bg-gray-50 border-b border-black/8 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 bg-white rounded-md border border-black/8 px-3 py-1 text-gray-400 text-[10px]">meridian.internal / knowledge-assistant</div>
        <span className="text-[9px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">● Live</span>
      </div>
      <div className="h-[268px] flex flex-col">
        <div className="px-4 py-2.5 border-b border-black/[0.06] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-[9px] font-bold">M</span>
            </div>
            <p className="text-[10px] font-semibold text-gray-700">Meridian AI · Staff Knowledge Base</p>
          </div>
          <span className="text-[9px] text-gray-400">Sources: SOPs · Contracts · Policies</span>
        </div>
        <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col justify-end gap-2 bg-gray-50/50">
          {step === 0 && <p className="text-center text-gray-400 text-[10px] py-4">Live knowledge base demo…</p>}
          {conversation.slice(0, step).map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className={`flex flex-col ${m.from === "user" ? "items-end" : "items-start"}`}>
              {m.from === "user" ? (
                <div className="max-w-[82%] px-3 py-2 rounded-2xl rounded-br-sm bg-gray-800 text-white text-[11px] leading-relaxed">{m.text}</div>
              ) : (
                <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-white border border-black/[0.08] px-3 py-2.5 shadow-sm space-y-1.5">
                  <p className="text-gray-800 text-[11px] leading-relaxed">{m.text}</p>
                  {m.detail && <ul className="space-y-0.5 pl-1">{m.detail.map((d, j) => <li key={j} className="text-gray-500 text-[10px] leading-relaxed">{d}</li>)}</ul>}
                  {m.source && <div className="mt-1.5 inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-md px-2 py-0.5"><span className="text-emerald-500 text-[8px]">📄</span><span className="text-emerald-700 text-[9px] font-medium">{m.source}</span></div>}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="bg-white border-t border-black/[0.06] px-3 py-2 flex items-center gap-2">
          <div className="flex-1 rounded-lg bg-gray-100 px-3 py-1.5 text-[10px] text-gray-400">Ask anything about your SOPs, policies, or contracts…</div>
          <div className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════
// SECTION 3 — CASE STUDIES
// ═══════════════════════════════════════════════════════════════
const CASES = [
  {
    id: "nexus" as CaseId,
    client: "Nexus Legal Partners",
    headline: "How we made it impossible for a law firm to lose another lead to a slow response — in 6 weeks.",
    subheadline: "They weren't losing clients because of poor service. They were losing them before the first conversation because nobody responded fast enough.",
    why: {
      title: "Why configuring an off-the-shelf chatbot didn't work",
      body: "Every chatbot they'd evaluated followed a fixed script — it could answer FAQ questions but couldn't reason. Legal enquiries don't follow scripts. 'Do I have a case?' requires judgment: what happened, in which jurisdiction, is there urgency, has any prior action been taken. A generic chatbot would either give a useless response or route everyone to a booking link regardless of fit. They needed an AI that could think, not just respond.",
    },
    how: {
      title: "The decision that shaped the entire build",
      body: "Before writing code, we spent two days with the partners learning how they actually assess a new enquiry — what they ask, what signals concern them, what makes a case worth taking. Then we mapped 78% of enquiries to WhatsApp (not the website) and built there. The agent doesn't open with a booking link — it opens with empathy, asks qualifying questions in order, and only books when it's appropriate. If the case doesn't fit, it says so clearly and suggests where to go instead.",
    },
    modules: [
      { name: "WhatsApp AI Qualifying Agent", problem: "Enquiries arrived at all hours. Nobody responded until morning. A third of leads had already moved on.", built: "AI agent on WhatsApp Business trained on the firm's practice areas, tone, and qualifying criteria. Responds in under 2 minutes, 24/7.", impact: "Response time: 14 hours → under 2 minutes. After-hours enquiries handled immediately instead of waiting until morning." },
      { name: "Intelligent Case Qualification Flow", problem: "Unqualified enquiries consumed partner time during consultations that shouldn't have been booked.", built: "Structured qualifying conversation: nature of matter, jurisdiction, urgency, prior legal action. Books only qualified cases; declines others with clear explanation.", impact: "Lead-to-consultation conversion: 52% → 71%. Partners walk into consultations with full context already logged." },
      { name: "Calendar Integration & Booking", problem: "Back-and-forth availability exchanges cost 3–4 messages per booking and introduced delays.", built: "Direct Google Calendar integration — agent reads availability and books the right partner for the right case type in one step.", impact: "Bookings happen inside the conversation, at any hour, with zero staff involvement." },
      { name: "CRM Intake & Structured Logging", problem: "No structured record of enquiries. Partners walked into consultations with no context from the initial contact.", built: "Every conversation — transcript, qualifying answers, urgency flag, sentiment — structured and pushed to HubSpot automatically.", impact: "Partners open a file before every consultation and already know the full picture. First consultations changed." },
    ],
    timeline: [
      { week: "Days 1–5", title: "Discovery & channel audit", items: ["Mapped every enquiry source and volume", "Identified 78% via WhatsApp as primary channel", "Documented qualifying criteria with all four partners", "Defined escalation rules and decline scripts"] },
      { week: "Weeks 2–4", title: "Build & integration", items: ["AI agent trained on firm's practice areas and tone", "WhatsApp Business API configured", "Google Calendar and HubSpot integrated", "Qualifying conversation flow built and tested"] },
      { week: "Week 5–6", title: "Live testing & launch", items: ["Tested with real enquiries — partners reviewed every conversation", "Edge cases added to escalation rules", "Launched with full monitoring in place"] },
    ],
    outcomes: [
      { value: "14 hrs → 2 min", label: "Enquiry response time", why: "AI responds on WhatsApp within 2 minutes, 24/7 — no human required." },
      { value: "52% → 71%", label: "Lead-to-consultation rate", why: "Faster response and better qualification converts more enquiries." },
      { value: "~£14K", label: "Additional monthly revenue", why: "9–10 previously lost leads now converting at £1,400–1,800 avg. case value." },
      { value: "7 weeks", label: "Project cost payback", why: "Revenue from recovered leads covered the project cost in 7 weeks." },
    ],
    before: ["Enquiries waited until the next morning at the earliest", "A third of leads already booked elsewhere by the time of response", "Partners walked into consultations with no context", "After-hours enquiries entirely missed"],
    after: ["Every enquiry acknowledged within 2 minutes, 24/7", "Lead-to-consultation conversion up 38% in 60 days", "Partners see full qualifying notes before every consultation", "Saturday bookings now happen while the team is at home"],
    stack: ["WhatsApp Business API", "Claude (Anthropic)", "Make", "HubSpot CRM", "Google Calendar"],
    duration: "6 weeks",
    DemoComponent: NexusDemo,
    demoCaption: "Live WhatsApp agent — watch it qualify a custody enquiry and book a 9am consultation at 11pm.",
  },
  {
    id: "bridgepoint" as CaseId,
    client: "Bridgepoint Capital",
    headline: "How we cut KYC processing time from 3 hours to 9 minutes — and doubled Bridgepoint's lending capacity without a single new hire.",
    subheadline: "The problem wasn't the team. It was that four excellent compliance officers were spending most of their day on tasks that required no judgment at all.",
    why: {
      title: "Why off-the-shelf KYC platforms fell short",
      body: "Two platforms were evaluated. Both could verify an ID document in isolation — but neither could cross-reference details across multiple documents, understand the business context described in the application, or produce a risk report in Bridgepoint's format. Both still required a compliance officer to review every single file. They'd automated one step of a twelve-step process — and charged monthly for it. What Bridgepoint needed wasn't a product. It was a bespoke compliance engine built around their specific criteria.",
    },
    how: {
      title: "The insight that made the build possible",
      body: "Before touching any technology, we spent two full days with the compliance team going through real applications — not to document their checklist, but to learn their judgment. What's a soft flag versus a hard flag? When does an address anomaly matter and when doesn't it? What does a suspicious cash flow pattern look like versus a seasonal business? We designed the AI scoring model around their expertise and their risk appetite, not around a generic template. The output maps directly to how their credit committee already makes decisions.",
    },
    modules: [
      { name: "Secure Document Intake Pipeline", problem: "Documents arrived via email in various formats. Collecting and organising them for review took time before any analysis could begin.", built: "Branded secure upload link sent to applicants. Documents are collected, named, and organised automatically before any AI processing begins.", impact: "Intake is standardised. No more chasing missing documents or organising email attachments before review." },
      { name: "Vision-Based Document Intelligence", problem: "Standard OCR extracts text but misses context — inconsistencies in formatting, subtle discrepancies between documents, or signs of tampering.", built: "Vision-capable AI reads documents the way a trained compliance officer does: understanding what legitimate looks like and identifying inconsistencies across multiple documents simultaneously.", impact: "Cross-document discrepancies caught automatically that OCR would have missed entirely." },
      { name: "Custom Risk Scoring Engine", problem: "Generic KYC platforms produce generic risk outputs that don't map to Bridgepoint's SME lending criteria or credit committee format.", built: "Custom scoring model built around Bridgepoint's exact criteria: cash flow patterns, director net worth indicators, sector risk flags, trading history consistency.", impact: "Output maps directly to credit committee format. No translation required. Review time for clean files: under 5 minutes." },
      { name: "FCA-Compliant Audit Trail", problem: "Manual review had no structured audit trail — decisions were in emails and notes, not exportable records.", built: "Every AI decision is logged: which documents were checked, what was extracted, which checks were run, what was flagged and why. Exportable, timestamped, FCA-ready.", impact: "Full compliance documentation on every application. 'The AI said so' is never the audit trail — the reasoning is." },
      { name: "Compliance Team Escalation Queue", problem: "Compliance officers reviewed every file regardless of risk level — 70% of their time on clean files.", built: "Clean files (no flags, score above threshold) are auto-processed with a 5-minute sign-off queue. Flagged files go to a structured review with the specific flags and reasons pre-documented.", impact: "Team allocation inverted: 20% reviewing, 80% judgment work. Processing capacity: 70 → 120+ applications per week." },
    ],
    timeline: [
      { week: "Weeks 1–2", title: "Compliance process mapping & model design", items: ["2-day deep dive with compliance team on real applications", "Documented soft flags, hard flags, and edge cases", "Designed custom risk scoring model to Bridgepoint's criteria", "Defined FCA audit trail requirements"] },
      { week: "Weeks 3–7", title: "Build & integration", items: ["Document intake pipeline built", "Vision AI document reading layer integrated", "Custom scoring model built and calibrated", "Audit trail and escalation queue built"] },
      { week: "Weeks 8–9", title: "Parallel testing & full deployment", items: ["AI ran alongside manual processing for 2 weeks", "Results compared and scoring model calibrated", "Full deployment with compliance team trained on queue management"] },
    ],
    outcomes: [
      { value: "3 hrs → 9 min", label: "Per-application processing time", why: "4 min AI processing + 5 min human sign-off for clean files." },
      { value: "70 → 120+", label: "Applications processed per week", why: "Same team, same headcount — doubled throughput." },
      { value: "18% → 6%", label: "Applicant dropout during onboarding", why: "Clean files approved same day instead of 3–5 days later." },
      { value: "£150K/wk", label: "Additional fee revenue potential", why: "50 extra applications/week at 5% facility fee on £60K avg. loan." },
    ],
    before: ["3–4 hours per application regardless of complexity", "18% of applicants withdrawing mid-process citing the wait", "70% of compliance team time on mechanical checking", "No structured audit trail — decisions in emails and notes"],
    after: ["Clean files: 4 min AI + 5 min sign-off", "Applicant dropout down to 6% — most approved same day", "Compliance team doing compliance work, not data entry", "Full FCA-compliant audit trail on every application"],
    stack: ["Claude Vision (Anthropic)", "GPT-4o", "Custom Python", "Companies House API", "Sanctions & PEP API", "Airtable", "Zapier"],
    duration: "9 weeks",
    DemoComponent: BridgepointDemo,
    demoCaption: "Live KYC pipeline — watch the AI process a loan application from document intake to risk score.",
  },
  {
    id: "meridian" as CaseId,
    client: "Meridian Property Group",
    headline: "How we gave a 21-person property team instant access to 9 years of institutional knowledge — and let them take on 22 new portfolios without hiring.",
    subheadline: "The knowledge existed. It just lived inside five people's heads. When one of them resigned, the whole team felt it.",
    why: {
      title: "Why a Notion wiki and FAQ page didn't solve it",
      body: "A junior manager spent six weeks building a Notion knowledge base. Within three months, fewer than half the team used it — because it was hard to search, not kept current, and gave you a document to read rather than an answer to act on. Tenants got a static FAQ page on the website. They didn't read it. They messaged instead. The problem wasn't the absence of documentation — it was that documentation isn't the same as a searchable, always-current, plain-English answer available at any hour.",
    },
    how: {
      title: "The architectural decision that made it work",
      body: "We chose retrieval-augmented generation over fine-tuning deliberately. Fine-tuning bakes knowledge into model weights — stale the moment a policy changes, expensive to update. RAG searches the actual current documents every time a question is asked. When Meridian updates a tenancy template or adds a new local authority requirement, the AI's answer updates immediately. We also built two completely separate systems: one for staff (nuanced, policy-level, source-attributed), one for tenants (plain English, direct, friendly). Same knowledge base, completely different interfaces.",
    },
    modules: [
      { name: "Staff Knowledge Assistant", problem: "New staff took 10–12 weeks to reach full competency. Senior staff fielded 15–25 internal knowledge queries per day — interrupting high-value work.", built: "Claude integration connected to Notion, SOPs, tenancy templates, contracts, and local authority guidance. Staff ask questions in plain English and receive sourced answers with a link to the originating document.", impact: "New staff competency time: 12 weeks → 3 weeks. Senior staff interruptions: 15–25/day → under 4/day." },
      { name: "Source Attribution Layer", problem: "Staff were reluctant to trust AI answers for property management — the consequences of a wrong answer about tenant rights are real.", built: "Every response shows exactly which document it came from with a direct link. Staff can verify in under 10 seconds. Adoption went from cautious to complete once staff could see the source.", impact: "Full team adoption within 2 weeks of launch. No scepticism after the first week of verified answers." },
      { name: "Tenant WhatsApp Agent", problem: "The same 40 tenant questions came in every week — rent due dates, repair processes, lease renewal steps — answered differently by whoever picked up, with no consistency or audit trail.", built: "WhatsApp agent for tenants handling 40 automated query categories. Answers are plain English, consistent, and always accurate. Anything outside scope routes to a human with full context.", impact: "67% of tenant queries resolved without any staff involvement. Response time: 6.5 hours → under 3 minutes." },
      { name: "Automatic Knowledge Update Pipeline", problem: "Any fine-tuned model would become stale as policies, regulations, and contracts changed — requiring expensive retraining.", built: "RAG pipeline connected directly to Notion via API. When any document is updated, the AI's knowledge updates immediately. No retraining, no maintenance overhead, no version management.", impact: "Knowledge base is always current. Policy changes propagate to both staff and tenant AI in real time." },
    ],
    timeline: [
      { week: "Week 1", title: "Document audit & discovery", items: ["Catalogued all existing documents, SOPs, and policies", "Interviewed senior staff on most common knowledge queries", "Interviewed two tenants on most common questions", "Defined scope for staff vs tenant interfaces"] },
      { week: "Weeks 2–4", title: "RAG build & staff system", items: ["Knowledge indexing pipeline built", "Claude RAG integration built and tested", "Staff interface built inside their property management system", "Source attribution layer built and tested"] },
      { week: "Weeks 5–7", title: "Tenant agent & deployment", items: ["WhatsApp tenant agent built and tested with real queries", "Escalation paths defined for all 40 query categories", "Phased rollout: staff first, then tenant invitations"] },
    ],
    outcomes: [
      { value: "12 wks → 3 wks", label: "New staff competency time", why: "Staff can query any process or policy from day one." },
      { value: "67%", label: "Tenant queries auto-resolved", why: "40 query categories handled without any staff involvement." },
      { value: "+22 portfolios", label: "New business taken on in 6 months", why: "Same headcount now manages 820 units instead of 650." },
      { value: "+£13,600/mo", label: "Additional recurring revenue", why: "22 new portfolios at £80/unit/month management fee." },
    ],
    before: ["Knowledge lived in 5 senior staff members' heads", "New staff took 12 weeks to reach full competency", "Same 40 tenant questions answered inconsistently every week", "No knowledge continuity plan when key staff left"],
    after: ["Entire team has instant access to full institutional knowledge", "New staff useful from week one — competent by week three", "67% of tenant queries handled automatically and consistently", "22 new portfolios taken on with the same headcount"],
    stack: ["Claude (Anthropic)", "RAG Pipeline (Python)", "Notion API", "WhatsApp Business API", "Reapit", "Slack", "Make"],
    duration: "7 weeks",
    DemoComponent: MeridianDemo,
    demoCaption: "Live knowledge base — watch the AI answer a complex HMO maintenance query and cite the exact source.",
  },
] as const;
// ═══════════════════════════════════════════════════════════════
// DEVICE SLIDESHOW — Responsive: Phone on mobile, Laptop on desktop
// ═══════════════════════════════════════════════════════════════

const CASE_SLIDES: Record<string, { label: string; Screen: () => React.ReactElement }[]> = {
  nexus: [
    {
      label: "WhatsApp conversation",
      Screen: () => (
        <div className="w-full flex flex-col" style={{ height: "332px", background: "#f0f2f5", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-[#075e54] px-3 py-2 flex items-center gap-2 flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-purple-400 flex items-center justify-center text-white text-[8px] font-bold">NL</div>
            <div><p className="text-white text-[9px] font-semibold leading-none">Nexus Legal AI</p><p className="text-white/50 text-[8px]">Online · responds instantly</p></div>
            <div className="ml-auto text-[8px] text-green-300 font-medium">● LIVE</div>
          </div>
          <div className="flex-1 overflow-hidden px-2 py-2 flex flex-col gap-1.5 justify-end">
            {[
              { f: "user", t: "Hi, urgent custody issue. 11pm, really stressed." },
              { f: "ai",   t: "I'm sorry — let me help. Is this a new matter or has there been prior legal action?" },
              { f: "user", t: "New. My ex is refusing to let me see my daughter." },
              { f: "ai",   t: "This is urgent family law we handle. I can book you with James Okafor — 9am or 11am tomorrow?" },
              { f: "user", t: "9am please." },
              { f: "ai",   t: "✓ Booked — 9am with James Okafor. Confirmation sent. You're in safe hands." },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.f === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-2 py-1.5 rounded-xl text-[9px] leading-relaxed ${m.f === "user" ? "text-white rounded-br-sm" : "bg-white text-gray-800 shadow-sm rounded-bl-sm"}`}
                  style={m.f === "user" ? { background: "#075e54" } : {}}>{m.t}</div>
              </div>
            ))}
          </div>
          <div className="bg-white px-2 py-1.5 flex gap-1.5 items-center flex-shrink-0 border-t border-black/[0.06]">
            <div className="flex-1 bg-gray-100 rounded-full px-2 py-1 text-[8px] text-gray-400">Message…</div>
            <div className="w-5 h-5 rounded-full bg-[#075e54] flex items-center justify-center text-white text-[7px]">↑</div>
          </div>
        </div>
      ),
    },
    {
      label: "CRM intake logged",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-monospace,monospace" }}>
          <div className="bg-gray-50 border-b border-black/[0.07] px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-[9px] font-semibold text-gray-700">HubSpot CRM — New Lead</p>
            <span className="text-[8px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded-full">AI Logged · 23:05</span>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            {[
              ["Contact", "Anonymous (pre-booking)"],
              ["Channel", "WhatsApp Business"],
              ["Time of enquiry", "23:04 — Saturday"],
              ["Case type", "Family Law · Custody"],
              ["Urgency flag", "🔴 High — immediate response required"],
              ["Qualifying status", "✓ Qualified — consultation booked"],
              ["Consultation", "9am Mon — James Okafor"],
              ["Sentiment", "Distressed · empathetic response applied"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start gap-2">
                <p className="text-[8px] text-gray-400 w-24 flex-shrink-0 pt-0.5">{k}</p>
                <p className="text-[9px] text-gray-800 font-medium">{v}</p>
              </div>
            ))}
          </div>
          <div className="px-3 pb-2 flex gap-1.5 flex-shrink-0">
            <div className="flex-1 text-center text-[8px] py-1 rounded-lg bg-purple-600 text-white font-semibold">View full transcript</div>
            <div className="flex-1 text-center text-[8px] py-1 rounded-lg border border-black/10 text-gray-600">Assign partner</div>
          </div>
        </div>
      ),
    },
    {
      label: "Calendar booked",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-gray-50 border-b border-black/[0.07] px-3 py-2 flex items-center gap-2 flex-shrink-0">
            <div className="h-4 w-4 rounded bg-blue-500 flex items-center justify-center text-white text-[7px] font-bold">G</div>
            <p className="text-[9px] text-gray-600 font-medium">Google Calendar — James Okafor</p>
          </div>
          <div className="px-3 py-2 flex-shrink-0">
            <p className="text-[8px] text-gray-400 uppercase tracking-wider mb-1">Monday</p>
            <div className="grid grid-cols-7 gap-0.5 text-[8px] text-center text-gray-400 mb-1">
              {["M","T","W","T","F","S","S"].map((d,i) => <span key={i}>{d}</span>)}
            </div>
          </div>
          <div className="flex-1 px-3 space-y-1 overflow-hidden">
            {[
              { time: "08:00", label: "", empty: true },
              { time: "09:00", label: "🟣 AI Booked — Family Law Consultation (New Client)", empty: false },
              { time: "10:00", label: "", empty: true },
              { time: "11:00", label: "Existing client — litigation review", empty: false, muted: true },
              { time: "12:00", label: "", empty: true },
              { time: "13:00", label: "Team meeting", empty: false, muted: true },
            ].map((slot) => (
              <div key={slot.time} className="flex gap-2 items-start">
                <span className="text-[8px] text-gray-300 w-8 flex-shrink-0 pt-1">{slot.time}</span>
                {!slot.empty ? (
                  <div className={`flex-1 rounded px-2 py-1 text-[8px] font-medium ${slot.muted ? "bg-gray-100 text-gray-500" : "bg-purple-100 text-purple-800 border border-purple-200"}`}>{slot.label}</div>
                ) : (
                  <div className="flex-1 border-t border-gray-100 mt-2" />
                )}
              </div>
            ))}
          </div>
          <div className="px-3 pb-3 pt-1 flex-shrink-0">
            <div className="rounded-lg bg-green-50 border border-green-200 px-2 py-1.5 text-[8px] text-green-700">
              <span className="font-bold">✓ Auto-booked by AI agent</span> at 23:05 — no staff involvement required
            </div>
          </div>
        </div>
      ),
    },
  ],

  bridgepoint: [
    {
      label: "Document processing",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-monospace,monospace" }}>
          <div className="bg-gray-50 border-b border-black/[0.07] px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-[9px] font-semibold text-gray-700">KYC Engine — Thornton Manufacturing Ltd</p>
            <span className="text-[8px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-full">Processing…</span>
          </div>
          <div className="flex-1 p-3 space-y-1.5 overflow-hidden">
            {[
              { name: "Passport — J. Thornton", done: true, result: "✓ Valid · exp 2028" },
              { name: "Proof of Address", done: true, result: "✓ Address matched" },
              { name: "Companies House Cert.", done: true, result: "✓ Active since 2019" },
              { name: "Bank Statements × 6", done: true, result: "✓ Cash flow consistent" },
              { name: "Sanctions / PEP Check", done: false, active: true, result: "" },
            ].map((doc, i) => (
              <div key={i} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[9px] ${doc.done ? "bg-emerald-50 border border-emerald-100" : doc.active ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-100"}`}>
                <span className="w-3 text-center">{doc.done ? "✓" : doc.active ? "⟳" : "○"}</span>
                <span className={`flex-1 font-medium ${doc.done ? "text-emerald-700" : doc.active ? "text-blue-700" : "text-gray-300"}`}>{doc.name}</span>
                {doc.done && <span className="text-emerald-600 text-[8px]">{doc.result}</span>}
              </div>
            ))}
          </div>
          <div className="px-3 pb-3 flex-shrink-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[8px] text-gray-400 uppercase tracking-wider">Risk Score</p>
              <p className="text-[9px] font-bold text-emerald-600">88/100 — Low Risk</p>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full w-[88%]" style={{ background: "linear-gradient(90deg,#0369a1,#059669)" }} />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Risk report generated",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-monospace,monospace" }}>
          <div className="bg-gray-50 border-b border-black/[0.07] px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-[9px] font-semibold text-gray-700">AI Risk Report · Thornton Mfg</p>
            <span className="text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">✓ Auto-generated · 4m 12s</span>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Overall Risk", value: "LOW", color: "text-emerald-600" },
                { label: "KYC Status", value: "PASSED", color: "text-emerald-600" },
                { label: "PEP / Sanctions", value: "CLEAR", color: "text-emerald-600" },
                { label: "Fraud Indicators", value: "NONE", color: "text-emerald-600" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-gray-50 border border-gray-100 p-2">
                  <p className="text-[8px] text-gray-400">{s.label}</p>
                  <p className={`text-[10px] font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-2 py-1.5">
              <p className="text-[8px] font-semibold text-amber-700 mb-0.5">Soft Flag — Sector</p>
              <p className="text-[8px] text-amber-600">Manufacturing sector — standard enhanced monitoring applies. Not a hard flag.</p>
            </div>
            <div className="rounded-lg bg-blue-50 border border-blue-200 px-2 py-1.5">
              <p className="text-[8px] font-semibold text-blue-700 mb-0.5">AI Recommendation</p>
              <p className="text-[8px] text-blue-600">Approve with standard terms. 5-min sign-off required.</p>
            </div>
          </div>
          <div className="px-3 pb-2 flex-shrink-0">
            <div className="flex-1 text-center text-[8px] py-1.5 rounded-lg bg-blue-600 text-white font-semibold">Sign off (5 min review)</div>
          </div>
        </div>
      ),
    },
    {
      label: "Compliance queue",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-monospace,monospace" }}>
          <div className="bg-[#0a1628] px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-white text-[9px] font-semibold">Bridgepoint · Compliance Queue</p>
            <div className="flex gap-1.5">
              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/30">47 clean</span>
              <span className="text-[8px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full border border-amber-500/30">3 flagged</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-5 px-3 py-1.5 border-b border-black/[0.06] bg-gray-50">
              {["Applicant","Type","Score","Status","Action"].map(h => <p key={h} className="text-[8px] text-gray-400 font-semibold uppercase tracking-wider">{h}</p>)}
            </div>
            {[
              { name: "Thornton Mfg", type: "Ltd Co", score: 88, status: "clean", action: "Sign off" },
              { name: "Osei Consulting", type: "Sole trader", score: 91, status: "clean", action: "Sign off" },
              { name: "Park & Lee Ltd", type: "Ltd Co", score: 43, status: "flagged", action: "Review" },
              { name: "Delta Freight", type: "Ltd Co", score: 76, status: "clean", action: "Sign off" },
              { name: "Vantage Foods", type: "Partnership", score: 34, status: "flagged", action: "Review" },
            ].map((r) => (
              <div key={r.name} className="grid grid-cols-5 px-3 py-2 border-b border-black/[0.04] items-center hover:bg-gray-50/50">
                <p className="text-[9px] font-medium text-gray-800">{r.name}</p>
                <p className="text-[8px] text-gray-400">{r.type}</p>
                <p className={`text-[9px] font-bold ${r.score > 70 ? "text-emerald-600" : "text-amber-600"}`}>{r.score}</p>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full w-fit ${r.status === "clean" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>{r.status}</span>
                <button className={`text-[8px] px-2 py-0.5 rounded font-semibold w-fit ${r.status === "clean" ? "bg-blue-600 text-white" : "bg-amber-100 text-amber-700"}`}>{r.action}</button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],

  meridian: [
    {
      label: "Staff knowledge query",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-gray-50 border-b border-black/[0.07] px-3 py-2 flex items-center gap-2 flex-shrink-0">
            <div className="h-5 w-5 rounded bg-emerald-600 flex items-center justify-center text-white text-[8px] font-bold">M</div>
            <p className="text-[9px] text-gray-600 font-semibold">Meridian AI · Staff Assistant</p>
            <span className="ml-auto text-[8px] text-emerald-600 font-medium">● Live</span>
          </div>
          <div className="flex-1 px-2 py-2 flex flex-col gap-2 justify-end overflow-hidden bg-gray-50/30">
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-gray-800 text-white rounded-xl rounded-br-sm px-2.5 py-2 text-[9px]">What's our process if an HMO tenant reports no hot water?</div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[90%] bg-white border border-black/[0.08] rounded-xl rounded-bl-sm px-2.5 py-2 shadow-sm space-y-1.5">
                <p className="text-[9px] text-gray-800">Under HMO Maintenance SOP (§4.2), no hot water = Priority 1:</p>
                <ul className="space-y-0.5">
                  {["Log in Reapit as P1 within 2 hrs", "Contact HMO-approved plumber only", "Notify landlord within 4 hrs", "Resolve within 24 hrs"].map((s, i) => (
                    <li key={i} className="text-[8px] text-gray-500 flex gap-1"><span className="text-emerald-500">{i+1}.</span>{s}</li>
                  ))}
                </ul>
                <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5 w-fit">
                  <span className="text-[7px]">📄</span>
                  <span className="text-[8px] text-emerald-700 font-medium">HMO Maintenance SOP v3.1</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 py-2 flex gap-1.5 items-center flex-shrink-0 border-t border-black/[0.06] bg-white">
            <div className="flex-1 bg-gray-100 rounded-lg px-2 py-1.5 text-[8px] text-gray-400">Ask anything about your SOPs…</div>
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-[7px]">↵</div>
          </div>
        </div>
      ),
    },
    {
      label: "Tenant WhatsApp agent",
      Screen: () => (
        <div className="w-full flex flex-col" style={{ height: "332px", background: "#f0f2f5", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-[#075e54] px-3 py-2 flex items-center gap-2 flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-emerald-400 flex items-center justify-center text-white text-[8px] font-bold">M</div>
            <div><p className="text-white text-[9px] font-semibold">Meridian Property</p><p className="text-white/50 text-[8px]">Tenant AI · online</p></div>
          </div>
          <div className="flex-1 px-2 py-2 flex flex-col gap-1.5 justify-end overflow-hidden">
            {[
              { f: "user", t: "When is my rent due this month?" },
              { f: "ai",   t: "Your rent of £925 is due on the 1st. You can pay via the tenant portal or bank transfer to the account on file." },
              { f: "user", t: "How do I report a repair?" },
              { f: "ai",   t: "Send a photo and description here or via the portal at meridian.portal/repairs — we'll log a ticket and update you within 4 hours." },
              { f: "user", t: "Thanks!" },
              { f: "ai",   t: "Happy to help! Anything else, just message anytime 🏠" },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.f === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-2 py-1.5 rounded-xl text-[9px] leading-relaxed ${m.f === "user" ? "text-white rounded-br-sm" : "bg-white text-gray-800 shadow-sm rounded-bl-sm"}`}
                  style={m.f === "user" ? { background: "#075e54" } : {}}>{m.t}</div>
              </div>
            ))}
          </div>
          <div className="bg-white px-2 py-1.5 flex gap-1.5 items-center flex-shrink-0 border-t border-black/[0.06]">
            <div className="flex-1 bg-gray-100 rounded-full px-2 py-1 text-[8px] text-gray-400">Message…</div>
            <div className="w-5 h-5 rounded-full bg-[#075e54] flex items-center justify-center text-white text-[7px]">↑</div>
          </div>
        </div>
      ),
    },
    {
      label: "Knowledge dashboard",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-monospace,monospace" }}>
          <div className="bg-[#0a1a14] px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-white text-[9px] font-semibold">Meridian AI · Admin</p>
            <span className="text-[8px] text-emerald-400">● 4 sources synced</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-black/[0.06] border-b border-black/[0.07] flex-shrink-0">
            {[
              { label: "Queries today", value: "142", sub: "67% auto-resolved" },
              { label: "Escalated", value: "8", sub: "avg 3 min to human" },
            ].map(s => (
              <div key={s.label} className="px-3 py-2">
                <p className="text-[8px] text-gray-400">{s.label}</p>
                <p className="text-sm font-bold text-gray-900">{s.value}</p>
                <p className="text-[8px] text-emerald-600">{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 space-y-1.5 overflow-hidden">
            <p className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Indexed Sources</p>
            {[
              { name: "HMO Maintenance SOP v3.1", status: "synced", docs: "1 doc" },
              { name: "Standard Landlord Agreement", status: "synced", docs: "1 doc" },
              { name: "Tenant FAQ Library", status: "synced", docs: "40 Q&A" },
              { name: "Local Authority Guidelines", status: "synced", docs: "6 docs" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5">
                <span className="text-[8px] text-emerald-500">●</span>
                <p className="flex-1 text-[9px] text-gray-800 font-medium">{s.name}</p>
                <span className="text-[8px] text-gray-400">{s.docs}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],
};
function DeviceSlideshow({ caseId, accent, accentText, accentLight }: { caseId: string; accent: string; accentText: string; accentLight: string }) {
  const slides = CASE_SLIDES[caseId] ?? [];
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const prev = () => setCurrent((i) => (i - 1 + total) % total);
  const next = () => setCurrent((i) => (i + 1) % total);
  const ActiveScreen = slides[current]?.Screen;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* LAPTOP FRAME — Desktop only */}
      <div className="hidden md:block w-full max-w-2xl mx-auto">
        <div className="rounded-xl bg-[#1a1a1a] p-1.5" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)" }}>
          <div className="rounded-lg overflow-hidden" style={{ height: "360px", background: "#111" }}>
            <div className="bg-[#1c1c1e] px-3 flex items-center justify-between flex-shrink-0" style={{ height: "28px" }}>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="bg-black/30 rounded px-3 py-0.5 text-white/40 text-[8px] flex-1 mx-4 text-center truncate">{slides[current]?.label}</div>
              <div className="w-12 flex-shrink-0" />
            </div>
            <div className="overflow-hidden" style={{ height: "332px" }}>
              <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25, ease }} style={{ width: "100%", height: "100%" }}>
                  {ActiveScreen && <ActiveScreen />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="h-2.5 rounded-b-xl bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] w-full" />
        <div className="mx-auto h-1 rounded-b-full bg-[#111] w-4/5" />
      </div>

      {/* PHONE FRAME — Mobile only */}
      <div className="md:hidden w-full max-w-[280px] mx-auto">
        {/* Phone bezel */}
        <div className="rounded-[2rem] bg-[#1a1a1a] p-2" style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)" }}>
          {/* Notch */}
          <div className="flex justify-center mb-1">
            <div className="h-1.5 w-16 rounded-full bg-[#2a2a2a]" />
          </div>
          {/* Screen */}
          <div className="rounded-[1.5rem] overflow-hidden bg-white" style={{ height: "420px" }}>
            <div className="bg-[#1c1c1e] px-3 flex items-center justify-between flex-shrink-0" style={{ height: "24px" }}>
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-red-500/60" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                <div className="h-2 w-2 rounded-full bg-green-500/60" />
              </div>
              <div className="bg-black/30 rounded px-2 py-0.5 text-white/30 text-[7px] flex-1 mx-3 text-center truncate">{slides[current]?.label}</div>
              <div className="w-8 flex-shrink-0" />
            </div>
            <div className="overflow-hidden" style={{ height: "396px" }}>
              <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25, ease }} style={{ width: "100%", height: "100%" }}>
                  {ActiveScreen && <ActiveScreen />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Home indicator */}
          <div className="flex justify-center mt-2">
            <div className="h-1 w-20 rounded-full bg-[#333]" />
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button type="button" onClick={prev} className="h-7 w-7 rounded-full border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition text-sm leading-none" aria-label="Previous slide">‹</button>
        <div className="flex gap-1.5 items-center">
          {slides.map((s, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)} className="transition-all duration-200 rounded-full h-1.5 flex-shrink-0"
              style={{ width: i === current ? "20px" : "6px", background: i === current ? accent : "rgba(0,0,0,0.15)" }} aria-label={s.label} />
          ))}
        </div>
        <button type="button" onClick={next} className="h-7 w-7 rounded-full border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition text-sm leading-none" aria-label="Next slide">›</button>
        <span className="text-[10px] text-gray-400 font-mono">{current + 1}/{total} · {slides[current]?.label}</span>
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════
// VISUAL BEFORE/AFTER
// ═══════════════════════════════════════════════════════════════

const VISUAL_BEFORE: Record<string, () => React.ReactElement> = {
  nexus: () => (
    <div className="rounded-xl overflow-hidden border border-red-200 bg-red-50/30 flex flex-col" style={{ height: "220px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-red-300" /><div className="h-2 w-2 rounded-full bg-red-200" /><div className="h-2 w-2 rounded-full bg-red-200" /></div>
        <p className="text-[9px] text-red-600 font-medium">WhatsApp — Personal phone</p>
      </div>
      <div className="flex-1 p-2 space-y-1.5 overflow-hidden" style={{ background: "#fff5f5" }}>
        <p className="text-[8px] text-red-400 text-center pb-1">Monday 09:14 — 4 unread messages from overnight</p>
        {[
          { name: "Sarah M.", msg: "Hi, sent a message last night about my case? Hoping for a call back today", time: "23:04", unread: true },
          { name: "David O.", msg: "Just wanted to follow up — I've not heard back and I'm quite urgent", time: "23:31", unread: true },
          { name: "Anon", msg: "Is anyone there? I need advice urgently. Will call another firm if no reply", time: "01:14", unread: true },
          { name: "Sarah M.", msg: "I've booked with another firm. Thanks anyway.", time: "08:52", unread: false },
        ].map((m) => (
          <div key={m.name + m.time} className={`flex gap-2 p-2 rounded-lg ${m.unread ? "bg-white border border-red-100" : "bg-red-50/50 opacity-60"}`}>
            <div className="h-5 w-5 rounded-full bg-gray-300 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between"><p className="text-[8px] font-semibold text-gray-700">{m.name}</p><p className="text-[7px] text-gray-400">{m.time}</p></div>
              <p className="text-[8px] text-gray-500 truncate">{m.msg}</p>
            </div>
            {m.unread && <div className="h-2 w-2 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />}
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-red-50 border-t border-red-200 text-center">
        <p className="text-[8px] text-red-500 font-medium">⚠ 3 unresponded leads — 1 already gone</p>
      </div>
    </div>
  ),
  bridgepoint: () => (
    <div className="rounded-xl overflow-hidden border border-red-200 bg-red-50/30 flex flex-col" style={{ height: "220px", fontFamily: "ui-monospace,monospace" }}>
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-red-300" /><div className="h-2 w-2 rounded-full bg-red-200" /><div className="h-2 w-2 rounded-full bg-red-200" /></div>
        <p className="text-[9px] text-red-600 font-medium">KYC_Applications_2024.xlsx</p>
      </div>
      <div className="flex-1 p-2 overflow-hidden" style={{ background: "#fff8f8" }}>
        <div className="grid grid-cols-4 gap-0.5 mb-1">
          {["Name", "ID?", "CoHo?", "Status"].map(h => <div key={h} className="bg-red-100 px-1.5 py-1 text-[8px] text-red-600 font-semibold">{h}</div>)}
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
              <div key={j} className={`px-1.5 py-1 text-[8px] border ${cell === "?" ? "bg-red-100 text-red-600 border-red-200" : cell === "Chase docs" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-white text-gray-600 border-gray-100"}`}>{cell}</div>
            ))}
          </div>
        ))}
        <p className="text-[8px] text-red-400 mt-2 text-center">Last updated: manually, 3 hrs ago</p>
      </div>
      <div className="px-3 py-2 bg-red-50 border-t border-red-200 text-center">
        <p className="text-[8px] text-red-500 font-medium">⚠ 70 apps · 3–4 hrs each · 4 officers</p>
      </div>
    </div>
  ),
  meridian: () => (
    <div className="rounded-xl overflow-hidden border border-red-200 bg-red-50/30 flex flex-col" style={{ height: "220px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-red-300" /><div className="h-2 w-2 rounded-full bg-red-200" /><div className="h-2 w-2 rounded-full bg-red-200" /></div>
        <p className="text-[9px] text-red-600 font-medium">WhatsApp — Diane (Senior PM)</p>
      </div>
      <div className="flex-1 p-2 space-y-1 overflow-hidden" style={{ background: "#fff5f5" }}>
        <p className="text-[8px] text-red-400 text-center pb-1">14 unread messages — Mon 09:02</p>
        {[
          { name: "Tom (New Staff)", msg: "Hi Diane — what's our process for a gas leak in a managed HMO?" },
          { name: "Tom (New Staff)", msg: "Also what's the approved contractor list for Birmingham HMOs?" },
          { name: "Tenant — Flat 4B", msg: "Hi when is my rent due? And how do I report a broken tap?" },
          { name: "Tom (New Staff)", msg: "Sorry one more — what are we supposed to do if landlord doesn't respond?" },
          { name: "Tenant — Unit 12", msg: "No one has got back to me about my boiler for 2 days now" },
        ].map((m, i) => (
          <div key={i} className="flex gap-2 p-1.5 rounded-lg bg-white border border-red-100">
            <div className="h-4 w-4 rounded-full bg-gray-200 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-semibold text-gray-600">{m.name}</p>
              <p className="text-[8px] text-gray-500 truncate">{m.msg}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-red-50 border-t border-red-200 text-center">
        <p className="text-[8px] text-red-500 font-medium">⚠ Diane interrupted 15–25 times/day</p>
      </div>
    </div>
  ),
};

const VISUAL_AFTER: Record<string, () => React.ReactElement> = {
  nexus: () => (
    <div className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col" style={{ height: "220px", fontFamily: "ui-sans-serif,system-ui,sans-serif", background: "#f0f7f4" }}>
      <div className="bg-emerald-600 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-white/40" /><div className="h-2 w-2 rounded-full bg-white/30" /><div className="h-2 w-2 rounded-full bg-white/30" /></div>
        <p className="text-[9px] text-white font-medium">Nexus Legal AI · 3 consultations booked overnight</p>
        <span className="ml-auto text-[8px] text-emerald-200">● Live</span>
      </div>
      <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
        {[
          { name: "Sarah M.", msg: "Booked 9am — Family Law · Custody", status: "booked", time: "23:04" },
          { name: "David O.", msg: "Booked 10am — Employment Law · Dismissal", status: "booked", time: "23:31" },
          { name: "Anon", msg: "Outside practice areas — referred to family law specialist", status: "referred", time: "01:14" },
          { name: "New enquiry", msg: "Qualifying in progress — awaiting jurisdiction confirmation", status: "active", time: "Now" },
        ].map((m) => (
          <div key={m.name + m.time} className="flex gap-2 p-2 rounded-lg bg-white border border-emerald-100">
            <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[8px] font-bold flex-shrink-0 mt-0.5">
              {m.status === "booked" ? "✓" : m.status === "active" ? "⟳" : "→"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between"><p className="text-[8px] font-semibold text-gray-700">{m.name}</p><p className="text-[7px] text-gray-400">{m.time}</p></div>
              <p className="text-[8px] text-gray-500 truncate">{m.msg}</p>
            </div>
            <span className={`text-[7px] px-1.5 py-0.5 rounded-full h-fit mt-1 flex-shrink-0 ${m.status === "booked" ? "bg-emerald-100 text-emerald-700" : m.status === "active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>{m.status}</span>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-200 text-center">
        <p className="text-[8px] text-emerald-600 font-medium">✓ 3 consultations booked while team slept</p>
      </div>
    </div>
  ),
  bridgepoint: () => (
    <div className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col" style={{ height: "220px", fontFamily: "ui-monospace,monospace" }}>
      <div className="bg-emerald-600 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-white/40" /><div className="h-2 w-2 rounded-full bg-white/30" /><div className="h-2 w-2 rounded-full bg-white/30" /></div>
        <p className="text-[9px] text-white font-medium">KYC Engine · 47 processed this morning</p>
      </div>
      <div className="flex-1 p-2 overflow-hidden">
        <div className="grid grid-cols-4 gap-0.5 mb-1">
          {["Name","Score","Flag","Action"].map(h => <div key={h} className="bg-emerald-50 border border-emerald-100 px-1.5 py-1 text-[8px] text-emerald-700 font-semibold">{h}</div>)}
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
              <div key={j} className={`px-1.5 py-1 text-[8px] border ${cell.startsWith("✓") ? "bg-emerald-50 text-emerald-700 border-emerald-200" : cell.startsWith("⚑") ? "bg-amber-50 text-amber-700 border-amber-200" : cell === "Review" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-white text-gray-600 border-gray-100"}`}>{cell}</div>
            ))}
          </div>
        ))}
        <p className="text-[8px] text-emerald-600 mt-2 text-center font-medium">47 auto-processed · 3 flagged for review</p>
      </div>
      <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-200 text-center">
        <p className="text-[8px] text-emerald-600 font-medium">✓ 4 min AI + 5 min sign-off per clean file</p>
      </div>
    </div>
  ),
  meridian: () => (
    <div className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col" style={{ height: "220px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
      <div className="bg-emerald-600 px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-white/40" /><div className="h-2 w-2 rounded-full bg-white/30" /><div className="h-2 w-2 rounded-full bg-white/30" /></div>
        <p className="text-[9px] text-white font-medium">Meridian AI · Today's activity</p>
        <span className="ml-auto text-[8px] text-emerald-200">● Live</span>
      </div>
      <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {[
            { label: "Staff queries resolved", value: "38", sub: "AI answered instantly" },
            { label: "Tenant queries", value: "67%", sub: "auto-resolved" },
          ].map(s => (
            <div key={s.label} className="rounded-lg bg-emerald-50 border border-emerald-100 p-2">
              <p className="text-[8px] text-emerald-700 font-bold text-lg leading-none">{s.value}</p>
              <p className="text-[8px] text-gray-500 mt-0.5">{s.label}</p>
              <p className="text-[7px] text-emerald-600">{s.sub}</p>
            </div>
          ))}
        </div>
        {[
          { role: "Tom (Staff)", q: "Gas leak process HMO?", status: "Answered · 2s", ok: true },
          { role: "Tenant 4B", q: "When is my rent due?", status: "Answered · 1s", ok: true },
          { role: "Unit 12", q: "Boiler broken 2 days", status: "Escalated to PM", ok: false },
          { role: "Tom (Staff)", q: "Approved contractor list?", status: "Answered · 1s", ok: true },
        ].map((r, i) => (
          <div key={i} className="flex gap-2 p-1.5 rounded-lg bg-white border border-emerald-100">
            <span className={`text-[8px] mt-0.5 flex-shrink-0 ${r.ok ? "text-emerald-500" : "text-amber-500"}`}>{r.ok ? "✓" : "→"}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-semibold text-gray-600 truncate">{r.role}: <span className="font-normal text-gray-500">{r.q}</span></p>
              <p className={`text-[7px] ${r.ok ? "text-emerald-600" : "text-amber-600"}`}>{r.status}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-200 text-center">
        <p className="text-[8px] text-emerald-600 font-medium">✓ Diane interrupted 4 times today (was 25)</p>
      </div>
    </div>
  ),
};

function VisualBeforeAfter({ caseId, before, after }: { caseId: string; before: readonly string[]; after: readonly string[] }) {
  const BeforeScreen = VISUAL_BEFORE[caseId];
  const AfterScreen = VISUAL_AFTER[caseId];

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Before</span>
            <div className="flex-1 h-px bg-red-100" />
          </div>
          <div style={{ height: "220px" }}>{BeforeScreen && <BeforeScreen />}</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">After</span>
            <div className="flex-1 h-px bg-emerald-100" />
          </div>
          <div style={{ height: "220px" }}>{AfterScreen && <AfterScreen />}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <ul className="space-y-1">
          {before.map((item) => <li key={item} className="flex items-start gap-2 text-xs text-gray-500"><span className="text-red-300 flex-shrink-0 font-bold mt-0.5 text-[10px]">✕</span>{item}</li>)}
        </ul>
        <ul className="space-y-1">
          {after.map((item) => <li key={item} className="flex items-start gap-2 text-xs text-gray-600"><span className="text-emerald-400 flex-shrink-0 font-bold mt-0.5 text-[10px]">✓</span>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
function ModuleRow({ mod, accent }: { mod: { name: string; problem: string; built: string; impact: string }; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-black/[0.08] overflow-hidden">
      <button type="button" onClick={() => setOpen((p) => !p)} className="w-full flex items-center justify-between px-4 py-3 gap-4 text-left" aria-expanded={open}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
          <span className="text-sm font-medium text-gray-900 truncate">{mod.name}</span>
        </div>
        <span className={`text-gray-400 text-sm transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease }} className="overflow-hidden">
            <div className="border-t border-black/[0.06] divide-y divide-black/[0.04]">
              {([["The problem", mod.problem, "text-red-600/70"], ["What we built", mod.built, "text-gray-500"], ["Business impact", mod.impact, "text-emerald-700"]] as const).map(([l, t, c]) => (
                <div key={l} className="px-4 py-3">
                  <p className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${c}`}>{l}</p>
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

function CaseTimeline({ weeks, accent }: { weeks: readonly { week: string; title: string; items: readonly string[] }[]; accent: string }) {
  return (
    <div>
      {weeks.map((w, i) => (
        <div key={w.week} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: accent }}>
              <span className="text-white text-[9px] font-bold">{i + 1}</span>
            </div>
            {i < weeks.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: `${accent}20` }} />}
          </div>
          <div className="pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-900">{w.week}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-500">{w.title}</span>
            </div>
            <ul className="space-y-1">
              {w.items.map((item) => <li key={item} className="flex items-start gap-2 text-xs text-gray-500"><span className="mt-[5px] h-1 w-1 rounded-full flex-shrink-0" style={{ background: accent }} />{item}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

type TabId = "story" | "modules" | "delivery" | "results";

const TABS: { id: TabId; label: string }[] = [
  { id: "story",    label: "The story" },
  { id: "modules",  label: "What we built" },
  { id: "delivery", label: "Delivery" },
  { id: "results",  label: "Results" },
];

function CaseCard({
  study, isOpen, onToggle, index,
}: {
  study: typeof CASES[number];
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
    if (!isOpen) setTimeout(() => ref.current?.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" }), 90);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.5, ease, delay: index * 0.07 }}
      className="rounded-3xl border overflow-hidden bg-white transition-shadow duration-300"
      style={{
        borderColor: isOpen ? theme.accentBorder : "rgba(0,0,0,0.09)",
        boxShadow: isOpen ? "0 20px 60px rgba(0,0,0,0.09)" : "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* ── Collapsed header ── */}
      <button type="button" onClick={handleToggle} aria-expanded={isOpen} className="w-full text-left p-5 md:p-6">
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
                style={{ background: theme.accentLight, color: theme.accentText }}
              >
                {theme.label}
              </span>
            </div>
            <h3 className="text-base md:text-[1.1rem] font-medium text-gray-900 leading-snug max-w-2xl">{study.headline}</h3>
            <p className="mt-1.5 text-sm text-gray-400 leading-relaxed max-w-xl">{study.subheadline}</p>
          </div>
          <div
            className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1 transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
            style={{ background: isOpen ? theme.accentLight : "rgba(0,0,0,0.05)", color: isOpen ? theme.accent : "#9ca3af" }}
            aria-hidden="true"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Outcome pills — collapsed only */}
        {!isOpen && (
          <div className="mt-4 flex flex-wrap gap-2">
            {study.outcomes.slice(0, 3).map((o) => (
              <span key={o.value} className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1 text-[11px] text-gray-500">
                <span className="font-semibold text-gray-900">{o.value}</span>{o.label}
              </span>
            ))}
            <span className="hidden md:flex items-center text-xs text-gray-400 ml-auto">Read full story →</span>
          </div>
        )}
      </button>

      {/* ── Expanded ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="exp"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            {/* Device slideshow strip */}
            <div className="border-t border-black/[0.06]" style={{ background: theme.accentLight }}>
              <div className="px-4 md:px-8 py-6 md:py-8">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-4 md:mb-6" style={{ color: theme.accentText }}>
                  Live demo — {study.demoCaption}
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
            <div className="border-y border-black/[0.07]">
              <div className="px-4 md:px-6 flex overflow-x-auto">
                {TABS.map((t) => (
                  <button
                    key={t.id} type="button" onClick={() => setTab(t.id)}
                    className={`px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${
                      tab === t.id ? "border-current" : "border-transparent text-gray-400 hover:text-gray-600"
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
                  <motion.div key="story" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <div className="space-y-6">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">{study.why.title}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{study.why.body}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">{study.how.title}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{study.how.body}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Before &amp; after</p>
                        <VisualBeforeAfter caseId={study.id} before={study.before} after={study.after} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {study.stack.map((s) => <span key={s} className="rounded-lg border border-black/10 px-2.5 py-1 text-xs text-gray-600 font-mono">{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {tab === "modules" && (
                  <motion.div key="mod" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-4">Each module below shows the exact problem it solved, what was built, and the business impact.</p>
                    <div className="space-y-2">
                      {study.modules.map((m) => <ModuleRow key={m.name} mod={m} accent={theme.accent} />)}
                    </div>
                  </motion.div>
                )}

                {tab === "delivery" && (
                  <motion.div key="del" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-5">Every project starts with discovery — never with code.</p>
                    <CaseTimeline weeks={study.timeline} accent={theme.accent} />
                  </motion.div>
                )}

                {tab === "results" && (
                  <motion.div key="res" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-4">Each outcome includes the mechanism that produced it.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {study.outcomes.map((o) => (
                        <div key={o.value} className="rounded-xl border border-black/[0.08] bg-white p-4">
                          <p className="text-2xl font-semibold leading-none mb-1" style={{ color: theme.accent }}>{o.value}</p>
                          <p className="text-xs font-medium text-gray-700 mb-1.5 leading-snug">{o.label}</p>
                          <p className="text-[11px] text-gray-400 leading-relaxed">{o.why}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-2xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      style={{ borderColor: theme.accentBorder, background: theme.accentLight }}>
                      <div>
                        <p className="text-xs text-gray-600">Delivered in <span className="font-semibold text-gray-900">{study.duration}</span> from signed scope to live system.</p>
                        <p className="text-xs text-gray-400 mt-0.5">Written ROI estimate before any build begins. No commitment required.</p>
                      </div>
                      <Link href="/contact"
                        className="flex-shrink-0 inline-flex items-center justify-center rounded-xl text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition"
                        style={{ background: theme.accent }}>
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
    <section id="case-studies" className="px-4 md:px-6 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Built &amp; shipped</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 max-w-2xl leading-snug">
            Three businesses. Real problems. Here's exactly how we solved them.
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">
            Each case includes a live demo of the automation we built, the full story behind our decisions, and the measured commercial outcomes.
          </p>
        </div>

        <div className="space-y-4">
          {CASES.map((study, i) => (
            <CaseCard
              key={study.id}
              study={study}
              index={i}
              isOpen={openId === study.id}
              onToggle={() => setOpenId((prev) => (prev === study.id ? null : study.id))}
            />
          ))}
        </div>

        {/* How We Think block */}
        <div className="mt-6 rounded-3xl bg-black text-white p-5 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-3">How we think</p>
            <p className="text-lg md:text-xl font-medium text-white max-w-2xl leading-snug">
              Most agencies start by asking what you want to automate. We start by asking what's actually breaking — and why the tools you've already tried didn't fix it.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {CASES.map((c) => {
                const t = CASE_THEMES[c.id];
                return (
                  <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="inline-block text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3"
                      style={{ background: `${t.accent}22`, color: t.accent }}>
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
                If your business has a workflow that's slowing you down, we probably have questions that will change what you think needs to be built.
              </p>
              <Link href="/contact"
                className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-white text-black text-sm font-medium px-5 py-2.5 hover:opacity-90 transition">
                Book a discovery call →
              </Link>
            </div>
          </div>
        </div>

        {/* Soft CTA */}
        <div className="mt-4 rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Not sure if automation is right for your business?</p>
            <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
              Book a free 30-minute workflow review. We'll map your processes, identify the highest-impact opportunities, and tell you honestly whether automation makes sense — and what the expected ROI is.
            </p>
          </div>
          <Link href="/contact"
            className="flex-shrink-0 inline-flex items-center justify-center rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition whitespace-nowrap">
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
  { q: "How quickly does automation pay for itself?", a: "Most clients see full cost recovery within 8–14 weeks. AI agents recovering lost leads (like Nexus Legal) often pay back in 6–7 weeks from additional revenue alone. We include a projected payback period in the written ROI estimate we produce after every free audit — so you see the number before committing." },
  { q: "How much does it cost?", a: "Projects are scoped after the free audit based on complexity and integrations. Most single-workflow automations start from £2,500–£4,000. Full AI agent deployments with CRM integration and multi-channel support start from £5,000–£8,000. You'll see the exact figure, with the expected ROI, before committing to anything." },
  { q: "Will AI automation replace my team?", a: "No — and we design it that way deliberately. AI handles the repetitive, low-judgment work so your team can focus on what genuinely needs a human. The Bridgepoint compliance team didn't shrink — they went from spending 70% of their time on mechanical checking to 80% judgment and relationship work. That's the target in every project." },
  { q: "How accurate are AI agents?", a: "A well-scoped AI agent handling a defined set of tasks typically achieves 90%+ accuracy in production. We build explicit escalation paths into every system — anything the AI can't handle confidently goes to a human with full context written up. You never lose a client because the AI didn't know the answer." },
  { q: "What AI models do you use?", a: "We're model-agnostic. Anthropic Claude for nuanced conversation and document understanding. OpenAI GPT-4o for vision and multimodal tasks. Google Gemini for certain integrations. For data-privacy or latency requirements, we can deploy open-source models on your own infrastructure. The model is always chosen for the job." },
  { q: "How long does a project take?", a: "A single focused automation — a WhatsApp qualifier, a KYC pipeline, a reporting system — typically takes 4–6 weeks from audit to live. A full AI agent with CRM integration and multi-channel deployment takes 6–10 weeks. We scope precisely after the audit so you know the exact timeline before committing." },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur overflow-hidden">
      <button type="button" onClick={() => setOpen((p) => !p)} className="w-full px-5 py-4 text-left flex items-center justify-between gap-6" aria-expanded={open}>
        <span className="text-sm text-gray-900">{q}</span>
        <span className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
            <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
export default function AIAutomationPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Hero />
      <WhatWeAutomateCarousel />
      <CaseStudiesSection />
      <section className="px-4 md:px-6 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">Questions we get asked every time.</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">Answered here so your consultation time goes towards your actual project.</p>
          <div className="grid gap-3">
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
