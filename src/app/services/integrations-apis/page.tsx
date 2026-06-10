"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — sky/blue palette
// ═══════════════════════════════════════════════════════════════
const CASE_THEMES = {
  zova: {
    accent: "#0369a1", accentLight: "rgba(3,105,161,0.07)",
    accentBorder: "rgba(3,105,161,0.22)", accentText: "#0c4a6e",
    label: "E-Commerce · Retail",
  },
  swifthaul: {
    accent: "#b45309", accentLight: "rgba(180,83,9,0.07)",
    accentBorder: "rgba(180,83,9,0.22)", accentText: "#78350f",
    label: "Logistics · SaaS Platform",
  },
  pulseclinic: {
    accent: "#059669", accentLight: "rgba(5,150,105,0.07)",
    accentBorder: "rgba(5,150,105,0.22)", accentText: "#065f46",
    label: "Healthcare · Appointments",
  },
} as const;
type CaseId = keyof typeof CASE_THEMES;

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const rm = useReducedMotion();
  const fd = (d: number) => ({ duration: rm ? 0 : 0.7, ease, delay: d });

  return (
    <section className="relative px-6 pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-sky-500/[0.08] blur-3xl" />
        <div className="absolute top-48 -left-32 h-[380px] w-[380px] rounded-full bg-blue-500/[0.06] blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-[400px] w-[400px] rounded-full bg-cyan-400/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0)}
          className="text-xs uppercase tracking-widest text-gray-400 mb-4">
          Services / Integrations &amp; APIs
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.06)}
          className="text-4xl md:text-[3.4rem] font-medium leading-[1.08] tracking-tight text-gray-900 max-w-4xl">
          Your tools should work together —<br className="hidden md:block" />
          <span className="text-sky-700"> not against each other.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.12)}
          className="mt-5 text-gray-500 max-w-2xl leading-relaxed text-base md:text-lg">
          When your payment platform, CRM, shipping provider, messaging tools, and database don't talk to each other,
          your team fills the gaps manually — every single day. We build the connections that eliminate that work
          and make your entire operation run as one.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.18)}
          className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-80 transition">
            Get a free integration audit
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href="#case-studies"
            className="inline-flex items-center gap-2 rounded-xl border border-black/[0.12] bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-black/[0.03] transition">
            See what we've connected
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fd(0.26)}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {["Retry logic & graceful failure modes built-in", "Full monitoring & alerting on every integration", "Complete API documentation on handoff", "OAuth 2.0 & secure credential management", "Post-launch support included"].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="h-1 w-1 rounded-full bg-gray-300" />{t}
            </span>
          ))}
        </motion.div>

        {/* Explainer card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.3)}
          className="mt-12 rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 md:p-8"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
          <div className="grid gap-8 md:grid-cols-[1fr,1px,1fr,1px,1fr]">
            <div>
              <div className="h-8 w-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="3" cy="8" r="2" stroke="#0369a1" strokeWidth="1.25" />
                  <circle cx="13" cy="3" r="2" stroke="#0369a1" strokeWidth="1.25" />
                  <circle cx="13" cy="13" r="2" stroke="#0369a1" strokeWidth="1.25" />
                  <path d="M5 7.5L11 4M5 8.5L11 12" stroke="#0369a1" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">What API integration actually is</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Connecting two or more software systems so they share data automatically — without a human copying, pasting, or manually triggering anything. One action in one system triggers the right response in every other.
              </p>
            </div>
            <div className="hidden md:block bg-black/[0.06] self-stretch" />
            <div>
              <div className="h-8 w-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#dc2626" strokeWidth="1.25" />
                  <path d="M8 5v4M8 11v.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">The cost of disconnected systems</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Every gap between your tools is filled by a human — copying data, triggering follow-ups, pulling reports manually. That hidden labour cost compounds daily. And the errors that slip through are invisible until they become customer complaints.
              </p>
            </div>
            <div className="hidden md:block bg-black/[0.06] self-stretch" />
            <div>
              <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14" stroke="#059669" strokeWidth="1.25" strokeLinecap="round" />
                  <circle cx="8" cy="8" r="3.5" stroke="#059669" strokeWidth="1.25" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">What we need from you</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                A list of the tools you use, a description of what data should flow between them, and where the manual work currently happens. We scope the integration, estimate the effort, and present a plan before any build begins.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// WHAT WE INTEGRATE CAROUSEL
// ═══════════════════════════════════════════════════════════════
const WHAT_WE_INTEGRATE = [
  {
    icon: "💳",
    title: "Payment Gateway Integration",
    who: "For e-commerce & SaaS",
    desc: "Stripe, Paystack, Flutterwave, Square, and Braintree — embedded natively into your product with full webhook handling, reconciliation, refund flows, and multi-currency support.",
    example: "e.g. An e-commerce brand accepting card, bank transfer, USSD, and mobile money through one unified checkout — with zero manual reconciliation.",
  },
  {
    icon: "🔔",
    title: "WhatsApp & SMS Notification APIs",
    who: "For any customer-facing business",
    desc: "Twilio, Termii, WhatsApp Business API, and Africa's Talking wired into your core system — order updates, appointment reminders, OTPs, and alerts triggered automatically by real events.",
    example: "e.g. A logistics company whose customers receive live delivery updates via WhatsApp — triggered automatically when a driver marks a job in-transit.",
  },
  {
    icon: "🗺️",
    title: "Maps & Routing API Integration",
    who: "For logistics & field services",
    desc: "Google Maps Platform, Mapbox, and HERE Maps integrated for real-time tracking, route optimisation, distance calculation, and address validation inside your application.",
    example: "e.g. A courier SaaS showing live rider locations to dispatchers and sharing a tracking link with clients — without a single manual update.",
  },
  {
    icon: "🤝",
    title: "CRM & Marketing Automation",
    who: "For sales & marketing teams",
    desc: "HubSpot, Salesforce, Zoho, Mailchimp, and ActiveCampaign connected to your product — so leads flow in, contacts update, and nurture sequences trigger without anyone touching them.",
    example: "e.g. A SaaS product where a new sign-up automatically creates a HubSpot contact, triggers a 5-email onboarding sequence, and notifies the sales owner.",
  },
  {
    icon: "🧾",
    title: "Accounting & ERP Integration",
    who: "For finance & operations teams",
    desc: "Xero, QuickBooks, Sage, and SAP connected to your billing, orders, and payroll — invoices created automatically, payments reconciled in real time, reports always current.",
    example: "e.g. A services business where every completed project milestone auto-generates an invoice in Xero and logs the payment against the right client record.",
  },
  {
    icon: "🆔",
    title: "Identity Verification & KYC APIs",
    who: "For regulated industries",
    desc: "Smile ID, Onfido, Jumio, and government database APIs for automated identity checks, document verification, and compliance screening embedded directly in your onboarding flow.",
    example: "e.g. A fintech whose applicants upload a selfie and ID — and receive an automated pass/fail decision in under 60 seconds, fully compliant.",
  },
  {
    icon: "🚚",
    title: "Shipping & Logistics APIs",
    who: "For e-commerce & fulfilment",
    desc: "DHL, FedEx, UPS, Sendbox, and Shipbob APIs integrated for real-time rate calculation, label generation, shipment tracking, and returns management inside your own platform.",
    example: "e.g. An online retailer where checkout automatically shows live shipping rates, generates a waybill on purchase, and sends a tracking link when dispatched.",
  },
  {
    icon: "📊",
    title: "Analytics & Data Pipeline APIs",
    who: "For data-driven teams",
    desc: "Google Analytics 4, Mixpanel, Segment, and custom data warehouse connections — structured pipelines that move event data from your product into the right reporting and analysis tools automatically.",
    example: "e.g. A SaaS product where every user action feeds Mixpanel in real time, revenue events sync to Stripe, and a weekly report lands in Slack automatically.",
  },
  {
    icon: "📅",
    title: "Booking & Scheduling API Integration",
    who: "For appointment-based businesses",
    desc: "Calendly, Cal.com, and custom booking APIs connected to your CRM, payment system, and messaging tools — so every booking triggers an invoice, confirmation, and reminder automatically.",
    example: "e.g. A clinic where a patient books online, receives a WhatsApp confirmation, pays via link, and the therapist's calendar updates — all without staff involvement.",
  },
  {
    icon: "🤖",
    title: "AI & LLM API Integration",
    who: "For product teams adding AI",
    desc: "OpenAI, Anthropic Claude, Google Gemini, and open-source model APIs embedded into your existing product — adding AI-powered features without rebuilding your infrastructure.",
    example: "e.g. A legal SaaS platform where uploaded contracts are automatically summarised and key clause risks flagged using Claude — inside the existing document workflow.",
  },
  {
    icon: "🏦",
    title: "Open Banking & Financial Data APIs",
    who: "For fintech & lending",
    desc: "Mono, Okra, Plaid, and Truelayer connected for real-time bank account verification, transaction history retrieval, and income analysis in your lending or financial product.",
    example: "e.g. A lending platform where applicants connect their bank account and receive an automated creditworthiness assessment in under 2 minutes.",
  },
  {
    icon: "🌐",
    title: "Custom API Development",
    who: "For platforms needing their own API",
    desc: "Well-documented, secure, versioned REST or GraphQL APIs that let your partners, clients, or internal tools interact with your system reliably at scale.",
    example: "e.g. A B2B SaaS that built a public API so enterprise clients can pull their own data and push updates programmatically — without needing the UI.",
  },
];

function WhatWeIntegrateCarousel() {
  const [active, setActive] = useState(0);
  const total = WHAT_WE_INTEGRATE.length;
  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);
  const visible = [WHAT_WE_INTEGRATE[active % total], WHAT_WE_INTEGRATE[(active + 1) % total], WHAT_WE_INTEGRATE[(active + 2) % total]];

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">What we integrate</p>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 max-w-lg leading-snug">
              12 types of API integration. Find your situation.
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">
              These are the integrations businesses hire us for most. If you see your tools here, we've connected them before.
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
            <motion.div key={`${active}-${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease, delay: i * 0.05 }}
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
          {WHAT_WE_INTEGRATE.map((_, i) => (
            <button key={i} type="button" onClick={() => setActive(i)}
              className={`transition-all duration-200 rounded-full ${i === active ? "h-1.5 w-5 bg-black" : "h-1.5 w-1.5 bg-black/20"}`}
              aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Don't see your exact stack? Tell us which tools you use and where data is falling through the cracks — if it has an API, we can connect it.
          </p>
          <Link href="/contact" className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:opacity-80 transition whitespace-nowrap">
            Tell us what you need
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CASE SLIDE SCREENS
// ═══════════════════════════════════════════════════════════════
const CASE_SLIDES: Record<string, { label: string; Screen: () => React.ReactElement }[]> = {

  zova: [
    {
      label: "Broken checkout — before",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-gray-50 border-b border-black/[0.07] px-3 py-2 flex items-center gap-2 flex-shrink-0">
            <div className="flex gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-400/80"/><div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80"/><div className="h-2.5 w-2.5 rounded-full bg-green-400/80"/></div>
            <span className="text-[10px] text-gray-400 flex-1 text-center">zova.store/checkout</span>
          </div>
          <div className="flex-1 p-4 overflow-hidden">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Order Summary · ₦47,500</p>
            <div className="space-y-2 mb-4">
              {[{ name:"Sneakers — Size 42", price:"₦32,000" },{ name:"Cap", price:"₦8,500" },{ name:"Tote Bag", price:"₦7,000" }].map(i=>(
                <div key={i.name} className="flex justify-between text-[10px] border-b border-black/[0.05] pb-1.5"><span className="text-gray-700">{i.name}</span><span className="text-gray-900 font-semibold">{i.price}</span></div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Pay with</p>
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-50 px-3 py-2">
                <span className="text-[9px] font-bold text-blue-600">CARD</span>
                <span className="text-[9px] text-blue-500">Visa / Mastercard only</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 opacity-40">
                <span className="text-[9px] text-gray-400">Bank transfer — contact us on WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 opacity-40">
                <span className="text-[9px] text-gray-400">USSD — not available</span>
              </div>
            </div>
            <div className="rounded-lg bg-red-50 border border-red-200 p-2.5 text-[9px] text-red-600">
              ⚠ Card payment failed — "Gateway timeout." Please try again or contact support.
            </div>
            <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 p-2 text-[9px] text-amber-700">
              📊 This checkout has a 34% abandonment rate. Manual bank transfers reconciled every Friday.
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Unified checkout — after",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-gray-50 border-b border-black/[0.07] px-3 py-2 flex items-center gap-2 flex-shrink-0">
            <div className="flex gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-400/80"/><div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80"/><div className="h-2.5 w-2.5 rounded-full bg-green-400/80"/></div>
            <span className="text-[10px] text-gray-400 flex-1 text-center">zova.store/checkout</span>
            <span className="text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">🔒 Secure</span>
          </div>
          <div className="flex-1 p-4 overflow-hidden">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Pay ₦47,500 with</p>
            <div className="space-y-1.5 mb-3">
              {[
                { label:"Card (Visa / Mastercard / Verve)", active:true, badge:"Recommended" },
                { label:"Bank Transfer — instant confirmation", active:false, badge:"" },
                { label:"USSD — *737# and all networks", active:false, badge:"" },
                { label:"PayPal — for international buyers", active:false, badge:"" },
              ].map((m,i)=>(
                <div key={i} className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${m.active?"border-blue-500 bg-blue-50":"border-gray-200 bg-white hover:bg-gray-50"}`}>
                  <div className={`h-3 w-3 rounded-full border-2 flex-shrink-0 ${m.active?"border-blue-500 bg-blue-500":"border-gray-300"}`}/>
                  <span className={`text-[9px] flex-1 ${m.active?"text-blue-700 font-medium":"text-gray-600"}`}>{m.label}</span>
                  {m.badge && <span className="text-[7px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">{m.badge}</span>}
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 mb-2">
              <input className="w-full text-[10px] bg-transparent outline-none text-gray-400" readOnly value="5399 •••• •••• 4221" />
              <div className="flex gap-3 mt-1.5">
                <input className="flex-1 text-[10px] bg-transparent outline-none text-gray-400" readOnly value="12/28" />
                <input className="flex-1 text-[10px] bg-transparent outline-none text-gray-400" readOnly value="•••" />
              </div>
            </div>
            <button className="w-full rounded-lg bg-blue-600 text-white text-[10px] font-semibold py-2.5">Pay ₦47,500 →</button>
            <div className="mt-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-[9px] text-emerald-700">
              ✓ Abandonment rate: 34% → 18% · Reconciliation: automated daily at midnight
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Reconciliation dashboard",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-monospace,monospace" }}>
          <div className="bg-blue-700 px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-white text-[9px] font-semibold">Zova Payments · Reconciliation</p>
            <span className="text-blue-200 text-[8px]">Auto-updated · midnight daily</span>
          </div>
          <div className="flex-shrink-0 grid grid-cols-4 divide-x divide-black/[0.06] border-b border-black/[0.07]">
            {[{ label:"Today's Revenue", value:"₦3.84M" },{ label:"Transactions", value:"142" },{ label:"Success Rate", value:"98.6%" },{ label:"Pending Reconcile", value:"0" }].map(s=>(
              <div key={s.label} className="px-3 py-2"><p className="text-[8px] text-gray-400">{s.label}</p><p className="text-sm font-bold text-gray-900">{s.value}</p></div>
            ))}
          </div>
          <div className="flex-1 overflow-hidden p-3 space-y-1.5">
            <p className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold">Recent Transactions</p>
            {[
              { ref:"ZOV-9841", method:"Card", amount:"₦47,500", status:"Settled", time:"14:32" },
              { ref:"ZOV-9840", method:"Transfer", amount:"₦12,000", status:"Settled", time:"14:28" },
              { ref:"ZOV-9839", method:"USSD", amount:"₦8,500", status:"Settled", time:"14:15" },
              { ref:"ZOV-9838", method:"Card", amount:"₦92,000", status:"Settled", time:"13:58" },
              { ref:"ZOV-9837", method:"PayPal", amount:"$42.00", status:"Settled", time:"13:44" },
            ].map((t,i)=>(
              <div key={t.ref} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[9px] ${i%2===0?"bg-gray-50":"bg-white"}`}>
                <span className="font-mono text-gray-400 w-16">{t.ref}</span>
                <span className="flex-1 text-gray-600">{t.method}</span>
                <span className="font-semibold text-gray-900">{t.amount}</span>
                <span className="text-[7px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">{t.status}</span>
                <span className="text-gray-400">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],

  swifthaul: [
    {
      label: "Disconnected stack — before",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-red-50 border-b border-red-200 px-3 py-2 flex-shrink-0">
            <p className="text-[9px] text-red-600 font-semibold">Swifthaul Platform · Current Integration Status</p>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            <p className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Tools in use — none connected</p>
            {[
              { tool:"Swifthaul App", status:"Live", issue:"No maps — dispatcher types addresses manually", color:"amber" },
              { tool:"Google Maps", status:"Not integrated", issue:"Riders use their personal Maps app — no tracking", color:"red" },
              { tool:"Termii SMS", status:"Not integrated", issue:"Status updates sent via WhatsApp manually", color:"red" },
              { tool:"Client systems", status:"Not integrated", issue:"Clients call for ETA — no self-serve tracking", color:"red" },
              { tool:"Daily reports", status:"Manual", issue:"Ops manager exports CSV, formats in Excel every evening", color:"red" },
            ].map(t=>(
              <div key={t.tool} className="flex items-start gap-2 rounded-lg border border-black/[0.07] p-2.5">
                <div className={`h-2 w-2 rounded-full mt-0.5 flex-shrink-0 ${t.color==="red"?"bg-red-400":"bg-amber-400"}`}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><p className="text-[9px] font-semibold text-gray-800">{t.tool}</p><span className={`text-[7px] px-1.5 py-0.5 rounded-full ${t.color==="red"?"bg-red-50 text-red-600 border border-red-200":"bg-amber-50 text-amber-700 border border-amber-200"}`}>{t.status}</span></div>
                  <p className="text-[8px] text-gray-500 mt-0.5">{t.issue}</p>
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-red-50 border border-red-200 p-2 text-[9px] text-red-600 text-center">⚠ 4 hours/day in manual coordination · clients churning due to no tracking</div>
          </div>
        </div>
      ),
    },
    {
      label: "Live tracking — maps integrated",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-[#1a0d00] px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-white text-[9px] font-semibold">Swifthaul · Live Dispatch Map</p>
            <div className="flex gap-2">
              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/30">8 active riders</span>
              <span className="text-[8px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full border border-amber-500/30">23 jobs live</span>
            </div>
          </div>
          {/* Map simulation */}
          <div className="flex-1 relative overflow-hidden bg-gray-100">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #e8f4f8 0%, #d4e8f0 50%, #c8e0ec 100%)" }}>
              {/* Road lines */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/60"/>
              <div className="absolute top-1/3 left-0 right-0 h-px bg-white/40"/>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/60"/>
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/40"/>
              {/* Rider dots */}
              {[{ left:"22%", top:"35%", label:"D1", color:"#b45309" },{ left:"55%", top:"48%", label:"D2", color:"#059669" },{ left:"38%", top:"62%", label:"D3", color:"#b45309" },{ left:"70%", top:"28%", label:"D4", color:"#059669" },{ left:"48%", top:"72%", label:"D5", color:"#0369a1" }].map(d=>(
                <div key={d.label} className="absolute flex flex-col items-center gap-0.5" style={{ left:d.left, top:d.top, transform:"translate(-50%,-50%)" }}>
                  <div className="h-5 w-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-lg" style={{ background: d.color }}>{d.label}</div>
                  <div className="h-1 w-1 rounded-full bg-black/20"/>
                </div>
              ))}
              {/* Destination pin */}
              <div className="absolute" style={{ left:"62%", top:"55%" }}>
                <div className="h-4 w-4 rounded-full border-2 border-red-500 bg-red-100 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500"/>
                </div>
              </div>
            </div>
            {/* Overlay panel */}
            <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 backdrop-blur border border-black/[0.08] px-3 py-2">
              <div className="flex items-center justify-between">
                <div><p className="text-[9px] font-semibold text-gray-800">SWH-1042 · Emeka A.</p><p className="text-[8px] text-gray-500">14 Victoria Island → 8 Lekki · ETA 14:45</p></div>
                <span className="text-[8px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full">In Transit</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-gray-200 overflow-hidden"><div className="h-full rounded-full bg-amber-500 w-[60%]"/></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Automated SMS notifications",
      Screen: () => (
        <div className="w-full flex flex-col" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif", background: "#f0f2f5" }}>
          <div className="bg-[#075e54] px-3 py-2 flex items-center gap-2 flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-[8px] font-bold">S</div>
            <div><p className="text-white text-[9px] font-semibold">Swifthaul Tracking</p><p className="text-white/50 text-[8px]">Automated delivery updates</p></div>
          </div>
          <div className="flex-1 px-3 py-2 space-y-2 overflow-hidden flex flex-col justify-end">
            {[
              { from:"system", t:"Your order #SWH-1042 has been picked up by Emeka A. Track live: swifthaul.co/track/1042", time:"13:58" },
              { from:"system", t:"📍 Emeka is 15 minutes away. Your package will be delivered to: 8 Lekki Phase 1.", time:"14:30" },
              { from:"system", t:"✅ Delivered! Your package was received at 14:44. Photo proof: swifthaul.co/proof/1042", time:"14:44" },
              { from:"system", t:"⭐ How was your delivery? Rate Emeka: swifthaul.co/rate/1042 (takes 10 seconds)", time:"14:46" },
            ].map((m,i)=>(
              <motion.div key={i} initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} className="flex justify-start">
                <div className="max-w-[85%] bg-white rounded-xl rounded-bl-sm shadow-sm px-3 py-2">
                  <p className="text-[9px] text-gray-800 leading-relaxed">{m.t}</p>
                  <p className="text-[8px] text-gray-400 mt-0.5 text-right">{m.time} ✓✓</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-white px-3 py-2 flex gap-2 items-center flex-shrink-0 border-t border-black/[0.06]">
            <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 text-[9px] text-gray-400">Automated — no staff involved</div>
          </div>
        </div>
      ),
    },
  ],

  pulseclinic: [
    {
      label: "Manual booking chaos — before",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-red-50 border-b border-red-200 px-3 py-2 flex-shrink-0">
            <p className="text-[9px] text-red-600 font-semibold">Pulse Clinic · Current booking &amp; billing flow</p>
          </div>
          <div className="flex-1 p-3 overflow-hidden">
            <p className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-2">What happens when a patient books</p>
            <div className="space-y-2">
              {[
                { step:"1", label:"Patient books on Calendly", note:"Staff receives email — manually copies to spreadsheet", issue:true },
                { step:"2", label:"Staff messages patient on WhatsApp", note:"Sends confirmation manually — sometimes 2hrs later", issue:true },
                { step:"3", label:"Payment chased before appointment", note:"Staff sends bank details on WhatsApp, waits for proof", issue:true },
                { step:"4", label:"Post-appointment invoice", note:"Created in Excel, emailed as PDF manually — 20mins each", issue:true },
                { step:"5", label:"CRM update", note:"Doesn't happen — patient record never created", issue:true },
              ].map(s=>(
                <div key={s.step} className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50/50 p-2">
                  <div className="h-4 w-4 rounded-full bg-red-200 flex items-center justify-center text-red-700 text-[8px] font-bold flex-shrink-0">{s.step}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-semibold text-gray-800">{s.label}</p>
                    <p className="text-[8px] text-red-600">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-lg bg-red-50 border border-red-200 p-2 text-[9px] text-red-600 text-center">⚠ 3 hrs/day in admin · 22% no-show rate · ~₦480K/month never invoiced</div>
          </div>
        </div>
      ),
    },
    {
      label: "Automated booking pipeline",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
          <div className="bg-emerald-700 px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-white text-[9px] font-semibold">Pulse Clinic · Booking Pipeline</p>
            <span className="text-emerald-200 text-[8px]">Fully automated</span>
          </div>
          <div className="flex-1 p-3 overflow-hidden">
            <p className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-2">When a patient books — what happens automatically</p>
            <div className="space-y-2">
              {[
                { step:"1", label:"Patient books online", sub:"Calendly API → booking logged in CRM instantly", color:"emerald", auto:true },
                { step:"2", label:"WhatsApp confirmation sent", sub:"Templated message with date, time, location — under 30 seconds", color:"emerald", auto:true },
                { step:"3", label:"Payment link sent automatically", sub:"Paystack link for ₦15,000 consultation fee — no chasing", color:"emerald", auto:true },
                { step:"4", label:"Reminders sent 24h + 2h before", sub:"WhatsApp reminders via Termii · no-show rate dropped 40%", color:"emerald", auto:true },
                { step:"5", label:"Post-visit invoice auto-generated", sub:"Session complete → invoice to patient + logged in CRM · 0 manual steps", color:"emerald", auto:true },
              ].map(s=>(
                <div key={s.step} className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50/50 p-2">
                  <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">✓</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-semibold text-gray-800">{s.label}</p>
                    <p className="text-[8px] text-emerald-700">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "CRM & revenue dashboard",
      Screen: () => (
        <div className="w-full flex flex-col bg-white" style={{ height: "332px", fontFamily: "ui-monospace,monospace" }}>
          <div className="bg-emerald-700 px-3 py-2 flex items-center justify-between flex-shrink-0">
            <p className="text-white text-[9px] font-semibold">Pulse Clinic · Patient CRM</p>
            <span className="text-emerald-200 text-[8px]">Auto-populated from bookings</span>
          </div>
          <div className="flex-shrink-0 grid grid-cols-4 divide-x divide-black/[0.06] border-b border-black/[0.07]">
            {[{ label:"Active Patients", value:"312" },{ label:"Bookings This Wk", value:"48" },{ label:"Revenue (MTD)", value:"₦6.2M" },{ label:"Outstanding", value:"₦0" }].map(s=>(
              <div key={s.label} className="px-2 py-2"><p className="text-[7px] text-gray-400">{s.label}</p><p className="text-xs font-bold text-gray-900">{s.value}</p></div>
            ))}
          </div>
          <div className="flex-1 overflow-hidden p-2 space-y-1.5">
            <p className="text-[8px] text-gray-400 uppercase tracking-wider font-semibold">Recent Patients</p>
            {[
              { name:"Aisha Okonkwo", type:"Physiotherapy", paid:"₦15,000", status:"Paid · Confirmed", visits:4 },
              { name:"Chidi Eze", type:"Consultation", paid:"₦15,000", status:"Paid · Confirmed", visits:1 },
              { name:"Fatima Sule", type:"Follow-up", paid:"₦8,000", status:"Paid · 10am tomorrow", visits:7 },
              { name:"James Adebayo", type:"Physiotherapy", paid:"₦15,000", status:"Paid · 2pm today", visits:2 },
            ].map(p=>(
              <div key={p.name} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-[9px]">
                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[7px] font-bold flex-shrink-0">{p.name[0]}</div>
                <span className="flex-1 font-semibold text-gray-800">{p.name}</span>
                <span className="text-gray-400">{p.type}</span>
                <span className="font-bold text-emerald-700">{p.paid}</span>
                <span className="text-[7px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">{p.status}</span>
              </div>
            ))}
          </div>
          <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-200 text-center flex-shrink-0">
            <p className="text-[8px] text-emerald-700 font-medium">✓ 3 hrs/day admin eliminated · ₦480K/month no longer missed</p>
          </div>
        </div>
      ),
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// VISUAL BEFORE / AFTER SCREENS
// ═══════════════════════════════════════════════════════════════
const VISUAL_BEFORE: Record<string, () => React.ReactElement> = {
  zova: () => (
    <div className="rounded-xl overflow-hidden border border-red-200 flex flex-col" style={{ height:"220px", fontFamily:"ui-sans-serif,system-ui,sans-serif", background:"#fff5f5" }}>
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-red-300"/><div className="h-2 w-2 rounded-full bg-red-200"/><div className="h-2 w-2 rounded-full bg-red-200"/></div>
        <p className="text-[9px] text-red-600 font-medium">zova.store/checkout — 34% abandonment</p>
      </div>
      <div className="flex-1 p-2 overflow-hidden space-y-1.5">
        <p className="text-[8px] text-red-400 text-center pb-0.5">Only card accepted · bank transfer via WhatsApp · USSD unavailable</p>
        {[
          { label:"Card (Visa / Mastercard only)", available:true },
          { label:"Bank transfer — contact us on WhatsApp", available:false },
          { label:"USSD — not available", available:false },
          { label:"Mobile money — not available", available:false },
        ].map(m=>(
          <div key={m.label} className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${m.available?"border-gray-200 bg-white":"border-red-100 bg-red-50/50 opacity-60"}`}>
            <span className={`text-[8px] ${m.available?"text-gray-700":"text-red-400"}`}>{m.available?"✓":"✕"}</span>
            <span className={`text-[8px] ${m.available?"text-gray-700":"text-red-400"}`}>{m.label}</span>
          </div>
        ))}
        <div className="rounded-lg bg-red-50 border border-red-200 p-1.5 text-center">
          <p className="text-[8px] text-red-600 font-medium">⚠ Friday: staff manually reconciles bank transfers from phone · 2–3 hrs</p>
        </div>
      </div>
      <div className="px-3 py-1.5 bg-red-50 border-t border-red-200 text-center flex-shrink-0">
        <p className="text-[8px] text-red-500 font-medium">⚠ 34% checkout abandonment · unreconciled payments every week</p>
      </div>
    </div>
  ),
  swifthaul: () => (
    <div className="rounded-xl overflow-hidden border border-red-200 flex flex-col" style={{ height:"220px", fontFamily:"ui-sans-serif,system-ui,sans-serif", background:"#fff8f8" }}>
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-red-300"/><div className="h-2 w-2 rounded-full bg-red-200"/><div className="h-2 w-2 rounded-full bg-red-200"/></div>
        <p className="text-[9px] text-red-600 font-medium">Swifthaul — before API integrations</p>
      </div>
      <div className="flex-1 p-2 overflow-hidden space-y-1.5">
        <p className="text-[8px] text-red-400 text-center pb-0.5">Good product · no connections · everything manual</p>
        {[
          { tool:"Maps & routing", state:"Riders use personal Google Maps · no live tracking for dispatcher" },
          { tool:"SMS notifications", state:"Staff sends manual WhatsApp updates · 2hrs delay typical" },
          { tool:"Client tracking", state:"Clients call dispatch for ETAs · 30+ calls/day" },
          { tool:"Daily report", state:"Ops manager exports CSV every evening · 45 min task" },
        ].map(t=>(
          <div key={t.tool} className="flex gap-2 p-1.5 rounded-lg bg-white border border-red-100">
            <span className="text-red-400 font-bold text-[8px] mt-0.5 flex-shrink-0">✕</span>
            <div><p className="text-[8px] font-semibold text-gray-700">{t.tool}</p><p className="text-[8px] text-gray-500">{t.state}</p></div>
          </div>
        ))}
      </div>
      <div className="px-3 py-1.5 bg-red-50 border-t border-red-200 text-center flex-shrink-0">
        <p className="text-[8px] text-red-500 font-medium">⚠ 4+ hrs/day manual coordination · clients churning</p>
      </div>
    </div>
  ),
  pulseclinic: () => (
    <div className="rounded-xl overflow-hidden border border-red-200 flex flex-col" style={{ height:"220px", fontFamily:"ui-sans-serif,system-ui,sans-serif", background:"#fff5f5" }}>
      <div className="bg-red-100 border-b border-red-200 px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-red-300"/><div className="h-2 w-2 rounded-full bg-red-200"/><div className="h-2 w-2 rounded-full bg-red-200"/></div>
        <p className="text-[9px] text-red-600 font-medium">Pulse Clinic — 3 disconnected tools · 3 hrs admin/day</p>
      </div>
      <div className="flex-1 p-2 overflow-hidden space-y-1.5">
        <p className="text-[8px] text-red-400 text-center pb-0.5">Calendly + WhatsApp + Excel · nothing talks to anything</p>
        {[
          { tool:"Calendly", issue:"Bookings arrive as emails — manually entered into spreadsheet" },
          { tool:"WhatsApp", issue:"Confirmations sent by hand · payment chased via DM" },
          { tool:"Excel invoices", issue:"20 mins per invoice · ~22% never sent" },
          { tool:"CRM", issue:"Doesn't exist — patient history in staff memory" },
        ].map(t=>(
          <div key={t.tool} className="flex gap-2 p-1.5 rounded-lg bg-white border border-red-100">
            <span className="text-red-400 font-bold text-[8px] mt-0.5 flex-shrink-0">✕</span>
            <div><p className="text-[8px] font-semibold text-gray-700">{t.tool}</p><p className="text-[8px] text-gray-500">{t.issue}</p></div>
          </div>
        ))}
      </div>
      <div className="px-3 py-1.5 bg-red-50 border-t border-red-200 text-center flex-shrink-0">
        <p className="text-[8px] text-red-500 font-medium">⚠ 22% no-show rate · ₦480K/month in missed invoices</p>
      </div>
    </div>
  ),
};

const VISUAL_AFTER: Record<string, () => React.ReactElement> = {
  zova: () => (
    <div className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col" style={{ height:"220px", fontFamily:"ui-sans-serif,system-ui,sans-serif" }}>
      <div className="bg-blue-600 px-3 py-2 flex items-center justify-between flex-shrink-0">
        <p className="text-[9px] text-white font-medium">Zova Checkout — unified payment layer</p>
        <span className="text-[8px] text-blue-200">🔒 PCI compliant</span>
      </div>
      <div className="flex-1 p-2 overflow-hidden space-y-1.5">
        <p className="text-[8px] text-emerald-700 text-center font-medium pb-0.5">All payment methods · one integration · auto-reconciled</p>
        {[
          { label:"Card (Visa · Mastercard · Verve)", note:"Instant confirmation" },
          { label:"Bank Transfer — auto-verified", note:"Reconciled in real time" },
          { label:"USSD — *737# all networks", note:"Works on any phone" },
          { label:"PayPal — international buyers", note:"Multi-currency" },
        ].map(m=>(
          <div key={m.label} className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/50 px-2.5 py-1.5">
            <span className="text-emerald-500 font-bold text-[8px]">✓</span>
            <span className="flex-1 text-[8px] text-gray-700 font-medium">{m.label}</span>
            <span className="text-[7px] text-emerald-600">{m.note}</span>
          </div>
        ))}
        <p className="text-[8px] text-blue-600 text-center font-medium">Abandonment: 34% → 18% · Reconciliation: automated midnight</p>
      </div>
      <div className="px-3 py-1.5 bg-emerald-50 border-t border-emerald-200 text-center flex-shrink-0">
        <p className="text-[8px] text-emerald-600 font-medium">✓ +₦2.1M/month recovered from previously lost checkouts</p>
      </div>
    </div>
  ),
  swifthaul: () => (
    <div className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col" style={{ height:"220px", fontFamily:"ui-sans-serif,system-ui,sans-serif" }}>
      <div className="bg-amber-700 px-3 py-2 flex items-center justify-between flex-shrink-0">
        <p className="text-[9px] text-white font-medium">Swifthaul — fully connected stack</p>
        <span className="text-[8px] text-amber-200">● Live</span>
      </div>
      <div className="flex-1 p-2 overflow-hidden space-y-1.5">
        <p className="text-[8px] text-emerald-700 text-center font-medium pb-0.5">Every tool connected · zero manual coordination</p>
        {[
          { tool:"Maps & routing", state:"Live rider tracking · dispatcher sees all 8 riders · clients get tracking link" },
          { tool:"SMS via Termii", state:"Auto-sent: pickup confirmation, ETA update, delivery proof" },
          { tool:"Client portal", state:"Self-serve tracking link — 30+ daily calls eliminated" },
          { tool:"Daily report", state:"Auto-generated at 06:00 · ops manager starts day informed" },
        ].map(t=>(
          <div key={t.tool} className="flex gap-2 p-1.5 rounded-lg bg-white border border-emerald-100">
            <span className="text-emerald-500 font-bold text-[8px] mt-0.5 flex-shrink-0">✓</span>
            <div><p className="text-[8px] font-semibold text-gray-700">{t.tool}</p><p className="text-[8px] text-gray-500">{t.state}</p></div>
          </div>
        ))}
      </div>
      <div className="px-3 py-1.5 bg-emerald-50 border-t border-emerald-200 text-center flex-shrink-0">
        <p className="text-[8px] text-emerald-600 font-medium">✓ 4 hrs/day manual work eliminated · 3 enterprise clients won</p>
      </div>
    </div>
  ),
  pulseclinic: () => (
    <div className="rounded-xl overflow-hidden border border-emerald-200 flex flex-col" style={{ height:"220px", fontFamily:"ui-sans-serif,system-ui,sans-serif" }}>
      <div className="bg-emerald-600 px-3 py-2 flex items-center justify-between flex-shrink-0">
        <p className="text-[9px] text-white font-medium">Pulse Clinic — one integrated pipeline</p>
        <span className="text-[8px] text-emerald-200">Calendly + Termii + Paystack + CRM</span>
      </div>
      <div className="flex-1 p-2 overflow-hidden space-y-1.5">
        <p className="text-[8px] text-emerald-700 text-center font-medium pb-0.5">Patient books → everything else is automatic</p>
        {[
          { step:"Booking → CRM", note:"Patient record created instantly · no data entry" },
          { step:"CRM → WhatsApp", note:"Confirmation sent in 30 seconds via Termii" },
          { step:"WhatsApp → Paystack", note:"Payment link sent · ₦15,000 collected before visit" },
          { step:"Appointment → Invoice", note:"Auto-generated on completion · emailed immediately" },
        ].map(t=>(
          <div key={t.step} className="flex gap-2 p-1.5 rounded-lg bg-white border border-emerald-100">
            <span className="text-emerald-500 font-bold text-[8px] mt-0.5 flex-shrink-0">✓</span>
            <div><p className="text-[8px] font-semibold text-gray-700">{t.step}</p><p className="text-[8px] text-gray-500">{t.note}</p></div>
          </div>
        ))}
      </div>
      <div className="px-3 py-1.5 bg-emerald-50 border-t border-emerald-200 text-center flex-shrink-0">
        <p className="text-[8px] text-emerald-600 font-medium">✓ No-shows down 40% · ₦480K/month recovered · 3 hrs admin → 0</p>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════
// CASES DATA
// ═══════════════════════════════════════════════════════════════
const CASES = [
  {
    id: "zova" as CaseId,
    client: "Zova Store",
    headline: "How we unified four payment methods into one checkout — and recovered ₦2.1M/month in revenue an e-commerce brand was losing to abandonment.",
    subheadline: "The problem wasn't the products or the marketing. It was that 34% of customers who wanted to buy couldn't complete the purchase because the payment method they trusted wasn't available.",
    why: {
      title: "Why this happens to almost every African e-commerce brand",
      body: "Most e-commerce stores launch with one payment gateway — usually card-only via a single provider. That works for customers with international cards. But in Nigeria, Ghana, and across Africa, a significant portion of buyers prefer bank transfer, USSD, or mobile money. When those options aren't available natively at checkout, buyers leave. And when bank transfer is accepted manually via WhatsApp, reconciliation becomes a weekly Friday nightmare. Zova had all of these problems simultaneously.",
    },
    how: {
      title: "The architecture that solved it",
      body: "The solution wasn't switching payment providers — it was building a unified payment layer that sits between the storefront and multiple gateways. We integrated Paystack for card and bank transfer, Flutterwave as a fallback and for mobile money, and PayPal for international buyers — all behind a single checkout UI that automatically routes each transaction to the optimal gateway and reconciles everything in real time. One webhook handler normalises events from all three providers into the same data structure. The reconciliation dashboard updates at midnight daily without a human touching it.",
    },
    modules: [
      {
        name: "Multi-Gateway Payment Integration",
        problem: "Card-only checkout rejected by buyers preferring local payment methods. Abandonment rate was 34% — tracked in analytics but never connected to the root cause.",
        built: "Unified checkout layer integrating Paystack (card + bank transfer + USSD), Flutterwave (mobile money), and PayPal (international). Single UI, automatic gateway routing, single webhook normalisation layer.",
        impact: "Checkout abandonment: 34% → 18% in 6 weeks. Monthly revenue from recovered checkouts: +₦2.1M. Zero manual payment processing.",
      },
      {
        name: "Automated Reconciliation Pipeline",
        problem: "Finance team spent every Friday manually matching WhatsApp payment screenshots to orders in the spreadsheet. Errors were common. Disputed transactions had no audit trail.",
        built: "Real-time reconciliation engine: every payment event from every gateway is normalised, matched to its order, and logged with a full audit trail. Dashboard shows settled, pending, and failed transactions by gateway and day.",
        impact: "Manual Friday reconciliation: eliminated entirely. First disputed transaction resolved in 4 minutes using the audit trail. Finance team recovered 3 hours per week.",
      },
      {
        name: "Webhook & Event Reliability System",
        problem: "Payment confirmations occasionally failed to reach the storefront — customers paid but orders weren't confirmed. Support tickets were raised, staff processed manually.",
        built: "Idempotent webhook handler with signature verification, retry logic with exponential backoff, and dead-letter queue for failed events. Every payment event processed at least once, never twice.",
        impact: "Zero missed payment confirmations since launch. Support tickets related to payment confirmation: eliminated.",
      },
      {
        name: "Refund & Dispute Management",
        problem: "Refunds processed manually — staff requested them from the payment provider dashboard, then updated the order manually. No audit trail, no customer notification.",
        built: "Refund flow triggered from the admin dashboard. Refund initiated to originating gateway automatically, customer notified via email, order status updated, and refund logged against the transaction record.",
        impact: "Refund processing time: 2 days (manual) → under 10 minutes (automated). Customer satisfaction score on refunds improved significantly.",
      },
    ],
    timeline: [
      { week: "Days 1–3", title: "Integration audit & gateway selection", items: ["Audited existing checkout flow and abandonment data", "Identified card, bank transfer, USSD, and international as priority payment methods", "Selected Paystack + Flutterwave + PayPal as the gateway stack", "Designed unified checkout UI and routing logic"] },
      { week: "Weeks 2–3", title: "Payment integration build", items: ["Paystack card, bank transfer, and USSD integrated", "Flutterwave mobile money integrated as fallback", "PayPal integration for international buyers", "Unified webhook normalisation layer built"] },
      { week: "Week 4", title: "Reconciliation & reliability", items: ["Real-time reconciliation pipeline built", "Retry logic and dead-letter queue implemented", "Refund and dispute flow built", "Full end-to-end testing across all payment methods"] },
      { week: "Week 5", title: "Launch & monitoring", items: ["Deployed with full logging and alerting", "Finance team trained on reconciliation dashboard", "Post-launch monitoring for 2 weeks", "Documentation and handoff completed"] },
    ],
    outcomes: [
      { value: "34% → 18%", label: "Checkout abandonment rate", why: "Local payment methods now available natively — buyers no longer leave to find alternatives." },
      { value: "+₦2.1M/mo", label: "Additional monthly revenue", why: "Recovered from the 16-point abandonment reduction across average monthly order volume." },
      { value: "0", label: "Manual reconciliation hours", why: "Real-time pipeline replaced the Friday manual process entirely." },
      { value: "5 weeks", label: "Audit to full deployment", why: "Three gateways, unified UI, reconciliation, and refund flow — shipped in one project." },
    ],
    before: [
      "Card-only checkout — 34% abandonment rate from buyers who couldn't pay",
      "Bank transfers accepted via WhatsApp — manually matched every Friday",
      "No audit trail — disputed payments had no resolution path",
      "Refunds took 2 days and required manual steps at every stage",
    ],
    after: [
      "Four payment methods in one checkout — card, transfer, USSD, PayPal",
      "Automated reconciliation pipeline — updates at midnight daily",
      "Every transaction logged with full audit trail from all three gateways",
      "Refunds processed in under 10 minutes from the admin dashboard",
    ],
    stack: ["Paystack API", "Flutterwave API", "PayPal SDK", "Next.js", "PostgreSQL", "Prisma", "Vercel"],
    duration: "5 weeks",
    demoCaption: "Checkout before vs after — unified payment methods, live reconciliation dashboard.",
  },
  {
    id: "swifthaul" as CaseId,
    client: "Swifthaul Logistics",
    headline: "How we connected Google Maps, SMS notifications, and a client tracking portal to a logistics SaaS — and helped them win three enterprise clients they'd previously lost to better-integrated competitors.",
    subheadline: "The platform was good. The problem was that it existed in isolation — riders navigated on personal phones, clients called dispatch for ETAs, and the ops manager spent 45 minutes every evening compiling a report from a CSV.",
    why: {
      title: "Why logistics platforms stall without API integrations",
      body: "A logistics SaaS without maps integration is a booking system. A logistics SaaS without notification APIs is a black box. The platform Swifthaul had built was functional for internal tracking — but from a client's perspective, it offered nothing more than a spreadsheet would have. Three enterprise clients had specifically cited lack of real-time tracking and automated notifications as reasons for choosing a competitor. The integrations weren't nice-to-haves. They were the difference between a product clients would pay a premium for and a product they'd replace.",
    },
    how: {
      title: "The integration architecture we designed",
      body: "We treated each integration as a distinct layer: the maps layer (Google Maps Platform for live rider tracking, distance calculation, and ETA estimation), the notification layer (Termii for SMS — WhatsApp Business API for richer updates), and the reporting layer (automated daily ops report generated from the database and delivered via email at 06:00). Each layer was built independently and connected to the same job state machine — so every status change in the dispatch board triggers the right downstream action automatically.",
    },
    modules: [
      {
        name: "Google Maps Platform Integration",
        problem: "Dispatchers had no live view of rider locations. ETAs were guessed. Riders used personal Google Maps with no connection to the dispatch system.",
        built: "Google Maps Platform integrated for live rider location display on the dispatcher board, real-time ETA calculation based on current traffic, distance-based job assignment suggestions, and address validation at job creation.",
        impact: "Dispatcher can now assign jobs to the nearest available rider — average assignment time dropped from 8 minutes to under 90 seconds. ETAs accurate to within 3 minutes.",
      },
      {
        name: "Automated SMS Notification System",
        problem: "Status updates sent by staff via personal WhatsApp — 2-hour average delay, inconsistent messaging, no delivery confirmation, no record.",
        built: "Termii SMS API integrated with the job state machine. Four automated messages triggered: pickup confirmed (with rider name), in-transit update with ETA, delivered confirmation with photo link, and post-delivery rating request.",
        impact: "Inbound 'where is my delivery?' calls: reduced by 78%. Client satisfaction scores increased. Staff time on status updates: zero.",
      },
      {
        name: "Self-Serve Client Tracking Portal",
        problem: "Clients had no visibility into their deliveries without calling dispatch. 30+ status calls per day consumed dispatcher time and signalled operational immaturity to enterprise buyers.",
        built: "Auto-generated tracking URL created at job assignment. No login required. Shows rider location on map, current status, estimated arrival, and delivery confirmation photo. Branded with Swifthaul identity.",
        impact: "Status calls: reduced by 83%. Three enterprise clients signed specifically citing the tracking portal as a requirement for their procurement process.",
      },
      {
        name: "Automated Daily Operations Report",
        problem: "Operations manager exported a CSV from the platform every evening, formatted it in Excel, and emailed a summary to the director. 45 minutes per day, often after 10pm.",
        built: "Automated pipeline pulls completed job data from the database at 23:55 every day. Report generated with jobs completed, on-time rate, revenue, incidents, and driver performance rankings. Delivered by email at 06:00.",
        impact: "Operations manager saved 45 minutes every evening. Director starts every morning with current data rather than waiting for a manual summary.",
      },
    ],
    timeline: [
      { week: "Days 1–4", title: "Integration scoping & architecture", items: ["Audited existing platform and API surface area", "Identified maps, notifications, tracking, and reporting as four integration layers", "Google Maps Platform account configured and billing estimated", "Termii and WhatsApp Business API accounts activated"] },
      { week: "Weeks 2–3", title: "Maps & notifications", items: ["Google Maps live tracking integrated into dispatch board", "ETA calculation and address validation integrated", "Termii SMS integrated with job state machine", "Four automated message templates built and tested"] },
      { week: "Week 4", title: "Tracking portal & reporting", items: ["Client tracking URL system built", "Branded tracking page built (no login required)", "Automated daily report pipeline built", "End-to-end testing across all integrations"] },
      { week: "Week 5", title: "Deployment & monitoring", items: ["All integrations deployed to production", "Full monitoring and alerting configured", "Team trained on new dispatcher view", "Documentation completed and handed over"] },
    ],
    outcomes: [
      { value: "83%", label: "Reduction in inbound status calls", why: "Self-serve tracking portal eliminated the need for clients to call dispatch." },
      { value: "90 secs", label: "Average job assignment time (was 8 mins)", why: "Live map with nearest-rider suggestion replaced guesswork." },
      { value: "3", label: "Enterprise clients won citing the integrations", why: "Tracking portal and automated notifications met enterprise procurement requirements." },
      { value: "45 mins", label: "Daily ops report time saved (every day)", why: "Automated pipeline replaced the manual CSV-to-Excel process entirely." },
    ],
    before: [
      "No live rider tracking — dispatchers guessed ETAs, clients called constantly",
      "Status updates via personal WhatsApp — 2-hour average delay",
      "No client tracking — 30+ inbound status calls per day",
      "Ops manager spent 45 mins every evening compiling a manual report",
    ],
    after: [
      "Live rider locations on dispatcher map — ETAs accurate to 3 minutes",
      "Four automated SMS notifications triggered by job state changes",
      "Client tracking link generated automatically — 83% fewer status calls",
      "Daily ops report delivered automatically at 06:00 every morning",
    ],
    stack: ["Google Maps Platform", "Termii SMS API", "WhatsApp Business API", "Next.js", "PostgreSQL", "Node.js", "Railway"],
    duration: "5 weeks",
    demoCaption: "Disconnected stack before vs live map, automated SMS, and client tracking after.",
  },
  {
    id: "pulseclinic" as CaseId,
    client: "Pulse Clinic",
    headline: "How we connected a clinic's booking, messaging, payment, and invoicing tools — and recovered ₦480K/month in revenue they were leaving on the table every month.",
    subheadline: "Three tools. None of them talked to each other. Every booking triggered a chain of manual steps that took staff 20 minutes and still failed 22% of the time.",
    why: {
      title: "Why appointment businesses haemorrhage revenue through tool gaps",
      body: "The pattern is almost universal in appointment-based businesses: a booking tool, a WhatsApp for communication, a separate payment method, and either no invoicing or manual invoicing in Excel. Each tool works individually. The gaps between them are filled by a human — and every human step introduces delay, errors, and the possibility that it simply doesn't happen. For Pulse Clinic, 22% of invoices were never sent. Not because staff forgot — but because the process required too many manual steps across too many tools for every single appointment.",
    },
    how: {
      title: "Designing the integration pipeline",
      body: "The core insight was that a single trigger — a booking event from Calendly — should cascade through every subsequent step automatically. We mapped the ideal patient journey end-to-end: book → confirm → pay → remind → attend → invoice → follow up. Then we built the integrations that connected each step: Calendly webhook → CRM record creation → Termii WhatsApp confirmation → Paystack payment link → scheduled reminder messages → session completion → automated invoice generation. Each step triggers the next. No human in the loop unless a decision genuinely requires one.",
    },
    modules: [
      {
        name: "Calendly → CRM Integration",
        problem: "Booking confirmation emails arrived in a shared inbox. Staff manually copied patient details into a spreadsheet — when they remembered. No patient history existed in any structured form.",
        built: "Calendly webhook connected to a custom CRM. Every new booking automatically creates or updates a patient record with name, contact, appointment type, date, and referring source. Patient history accumulates automatically across every visit.",
        impact: "Patient record creation: automated and instant. Staff data entry for bookings: eliminated entirely. Patient history available for the first time.",
      },
      {
        name: "Automated WhatsApp Confirmation & Reminders",
        problem: "Confirmation messages sent manually 1–2 hours after booking. No-show rate was 22% — directly linked to lack of timely confirmation and reminders.",
        built: "Termii WhatsApp Business API integration. Booking triggers a confirmation message within 30 seconds. Automated reminders sent 24 hours and 2 hours before the appointment with date, time, location, and a rescheduling link.",
        impact: "No-show rate: 22% → 13% — a 41% reduction. Confirmation message delay: 2 hours → 30 seconds. Staff time on manual messaging: zero.",
      },
      {
        name: "Automated Payment Collection",
        problem: "Consultation fees chased via WhatsApp message with bank account details. Patients sometimes paid, sometimes didn't. No payment confirmation before appointment. Staff checked manually.",
        built: "Paystack payment link generated automatically at booking and sent via WhatsApp. Payment confirmation triggers a receipt and updates the patient record. Unpaid bookings flagged in the dashboard 24 hours before the appointment.",
        impact: "Pre-appointment payment collection rate: 91% (was under 50%). Staff time chasing payments: eliminated. Revenue secured before the appointment begins.",
      },
      {
        name: "Automated Invoice Generation",
        problem: "Post-appointment invoices created manually in Excel, exported as PDF, and emailed individually. Took 15–20 minutes per patient. Approximately 22% were never created.",
        built: "Session completion event triggers automatic invoice generation: patient details pulled from CRM, treatment type and fee populated from appointment record, PDF generated and emailed to patient, and invoice logged in the finance dashboard.",
        impact: "22% missed invoice rate: eliminated. Invoice generation time: 18 minutes (manual) → zero (automatic). ₦480K/month in previously uninvoiced sessions now captured.",
      },
    ],
    timeline: [
      { week: "Days 1–3", title: "Process mapping & API audit", items: ["Mapped every step from booking to invoice across the existing tools", "Confirmed Calendly, Termii, Paystack, and custom CRM as the four integration points", "Designed the end-to-end trigger chain", "API credentials and webhook endpoints configured"] },
      { week: "Weeks 2–3", title: "Booking, CRM, and messaging integrations", items: ["Calendly webhook integrated with CRM", "Patient record creation and update logic built", "Termii WhatsApp confirmation message integrated", "24h and 2h reminder sequences built"] },
      { week: "Week 4", title: "Payment and invoicing integrations", items: ["Paystack payment link generation integrated", "Pre-appointment unpaid flag logic built", "Invoice auto-generation pipeline built", "Finance dashboard built for invoice tracking"] },
      { week: "Week 5", title: "Testing, launch, and monitoring", items: ["End-to-end testing with real appointments", "Staff trained on dashboard and exception handling", "Full monitoring and alerting deployed", "Documentation and handoff completed"] },
    ],
    outcomes: [
      { value: "22% → 13%", label: "No-show rate", why: "30-second confirmation + automated reminders replaced 2-hour manual follow-up." },
      { value: "₦480K/mo", label: "Revenue recovered from missed invoices", why: "Automated invoice generation closed a 22% billing gap invisible before integration." },
      { value: "91%", label: "Pre-appointment payment collection rate", why: "Paystack link sent automatically at booking — no chasing required." },
      { value: "3 hrs → 0", label: "Daily admin time eliminated", why: "Confirmation, payment chasing, and invoicing all automated end-to-end." },
    ],
    before: [
      "Calendly, WhatsApp, and Excel — three tools, zero connections",
      "22% of patients no-showed — manual confirmations 2 hours late",
      "Payment chased via WhatsApp bank transfer — less than 50% collected pre-visit",
      "22% of invoices never sent — ₦480K/month left on the table",
    ],
    after: [
      "One integrated pipeline: book → confirm → pay → remind → attend → invoice",
      "No-show rate down 41% — confirmation in 30 seconds, reminders automatic",
      "91% of consultations paid before the appointment begins",
      "Every session auto-invoiced — ₦480K/month now captured without fail",
    ],
    stack: ["Calendly Webhooks", "Termii WhatsApp API", "Paystack API", "Next.js", "PostgreSQL", "Prisma", "Resend"],
    duration: "5 weeks",
    demoCaption: "Manual chaos before vs automated pipeline — booking to invoice with zero admin.",
  },
] as const;

// ═══════════════════════════════════════════════════════════════
// DEVICE SLIDESHOW
// ═══════════════════════════════════════════════════════════════
function DeviceSlideshow({ caseId, accent }: { caseId: string; accent: string }) {
  const slides = CASE_SLIDES[caseId] ?? [];
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const prev = () => setCurrent((i) => (i - 1 + total) % total);
  const next = () => setCurrent((i) => (i + 1) % total);
  const ActiveScreen = slides[current]?.Screen;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="rounded-xl bg-[#1a1a1a] p-1.5" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)" }}>
          <div className="rounded-lg overflow-hidden" style={{ height: "360px", background: "#111" }}>
            <div className="bg-[#1c1c1e] px-3 flex items-center justify-between flex-shrink-0" style={{ height: "28px" }}>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="bg-black/30 rounded px-3 py-0.5 text-white/40 text-[8px] flex-1 mx-4 text-center truncate">
                {slides[current]?.label}
              </div>
              <div className="w-12 flex-shrink-0" />
            </div>
            <div className="overflow-hidden" style={{ height: "332px" }}>
              <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25, ease }}
                  style={{ width: "100%", height: "100%" }}>
                  {ActiveScreen && <ActiveScreen />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="h-2.5 rounded-b-xl bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] w-full" />
        <div className="mx-auto h-1 rounded-b-full bg-[#111] w-4/5" />
      </div>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button type="button" onClick={prev}
          className="h-7 w-7 rounded-full border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition text-sm leading-none"
          aria-label="Previous slide">‹</button>
        <div className="flex gap-1.5 items-center">
          {slides.map((s, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)}
              className="transition-all duration-200 rounded-full h-1.5 flex-shrink-0"
              style={{ width: i === current ? "20px" : "6px", background: i === current ? accent : "rgba(0,0,0,0.15)" }}
              aria-label={s.label} />
          ))}
        </div>
        <button type="button" onClick={next}
          className="h-7 w-7 rounded-full border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition text-sm leading-none"
          aria-label="Next slide">›</button>
        <span className="text-[10px] text-gray-400 font-mono">{current + 1}/{total} · {slides[current]?.label}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VISUAL BEFORE / AFTER COMPONENT
// ═══════════════════════════════════════════════════════════════
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
          {before.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
              <span className="text-red-300 flex-shrink-0 font-bold mt-0.5 text-[10px]">✕</span>{item}
            </li>
          ))}
        </ul>
        <ul className="space-y-1">
          {after.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-emerald-400 flex-shrink-0 font-bold mt-0.5 text-[10px]">✓</span>{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODULE ROW
// ═══════════════════════════════════════════════════════════════
function ModuleRow({ mod, accent }: { mod: { name: string; problem: string; built: string; impact: string }; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-black/[0.08] overflow-hidden">
      <button type="button" onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 gap-4 text-left" aria-expanded={open}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
          <span className="text-sm font-medium text-gray-900 truncate">{mod.name}</span>
        </div>
        <span className={`text-gray-400 text-sm transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease }} className="overflow-hidden">
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

// ═══════════════════════════════════════════════════════════════
// CASE TIMELINE
// ═══════════════════════════════════════════════════════════════
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
              {w.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="mt-[5px] h-1 w-1 rounded-full flex-shrink-0" style={{ background: accent }} />
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

// ═══════════════════════════════════════════════════════════════
// TABS + CASE CARD
// ═══════════════════════════════════════════════════════════════
type TabId = "story" | "modules" | "delivery" | "results";
const TABS: { id: TabId; label: string }[] = [
  { id: "story", label: "The story" },
  { id: "modules", label: "What we integrated" },
  { id: "delivery", label: "Delivery" },
  { id: "results", label: "Results" },
];

function CaseCard({ study, isOpen, onToggle, index }: {
  study: typeof CASES[number]; isOpen: boolean; onToggle: () => void; index: number;
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
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.5, ease, delay: index * 0.07 }}
      className="rounded-3xl border overflow-hidden bg-white transition-shadow duration-300"
      style={{ borderColor: isOpen ? theme.accentBorder : "rgba(0,0,0,0.09)", boxShadow: isOpen ? "0 20px 60px rgba(0,0,0,0.09)" : "0 2px 10px rgba(0,0,0,0.05)" }}>

      <button type="button" onClick={handleToggle} aria-expanded={isOpen} className="w-full text-left p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: theme.accentLight, color: theme.accentText }}>{theme.label}</span>
              <span className="text-xs text-gray-300 font-mono">0{index + 1}</span>
            </div>
            <h3 className="text-base md:text-[1.1rem] font-medium text-gray-900 leading-snug max-w-2xl">{study.headline}</h3>
            <p className="mt-1.5 text-sm text-gray-400 leading-relaxed max-w-xl">{study.subheadline}</p>
          </div>
          <div className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1 transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
            style={{ background: isOpen ? theme.accentLight : "rgba(0,0,0,0.05)", color: isOpen ? theme.accent : "#9ca3af" }}
            aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
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

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="exp" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">

            <div className="border-t border-black/[0.06]" style={{ background: theme.accentLight }}>
              <div className="px-5 md:px-8 py-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: theme.accentText }}>
                  Live demo — {study.demoCaption}
                </p>
                <DeviceSlideshow caseId={study.id} accent={theme.accent} />
              </div>
            </div>

            <div className="border-y border-black/[0.07]">
              <div className="px-5 md:px-6 flex overflow-x-auto">
                {TABS.map((t) => (
                  <button key={t.id} type="button" onClick={() => setTab(t.id)}
                    className={`px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${tab === t.id ? "border-current" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                    style={{ color: tab === t.id ? theme.accent : undefined }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 md:px-6 py-6">
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
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">APIs &amp; stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {study.stack.map((s) => (
                            <span key={s} className="rounded-lg border border-black/10 px-2.5 py-1 text-xs text-gray-600 font-mono">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {tab === "modules" && (
                  <motion.div key="mod" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-4">Each integration below shows the exact problem it solved, what was built, and the measurable business impact.</p>
                    <div className="space-y-2">
                      {study.modules.map((m) => <ModuleRow key={m.name} mod={m} accent={theme.accent} />)}
                    </div>
                  </motion.div>
                )}

                {tab === "delivery" && (
                  <motion.div key="del" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-5">Every project starts with an integration audit — we never build before we understand what needs to connect and why.</p>
                    <CaseTimeline weeks={study.timeline} accent={theme.accent} />
                  </motion.div>
                )}

                {tab === "results" && (
                  <motion.div key="res" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-4">Each outcome includes the specific mechanism that produced it.</p>
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
                        <p className="text-xs text-gray-600">Delivered in <span className="font-semibold text-gray-900">{study.duration}</span> from audit to full deployment.</p>
                        <p className="text-xs text-gray-400 mt-0.5">Full documentation and monitoring included. You own everything.</p>
                      </div>
                      <Link href="/contact"
                        className="flex-shrink-0 inline-flex items-center justify-center rounded-xl text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition"
                        style={{ background: theme.accent }}>
                        Connect your systems →
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

// ═══════════════════════════════════════════════════════════════
// CASE STUDIES SECTION
// ═══════════════════════════════════════════════════════════════
function CaseStudiesSection() {
  const [openId, setOpenId] = useState<CaseId | null>(null);
  return (
    <section id="case-studies" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Built &amp; deployed</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 max-w-2xl leading-snug">
            Three businesses. Real integration problems. Here's exactly what we connected — and what it changed.
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">
            Every case below shows the before state, the exact integrations we built, the technical decisions we made, and the revenue impact. Expand any card to read the full account.
          </p>
        </div>

        <div className="space-y-4">
          {CASES.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i}
              isOpen={openId === study.id}
              onToggle={() => setOpenId((prev) => (prev === study.id ? null : study.id))} />
          ))}
        </div>

        {/* How We Think */}
        <div className="mt-6 rounded-3xl bg-black text-white p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-3">How we think about integrations</p>
            <p className="text-lg md:text-xl font-medium text-white max-w-2xl leading-snug">
              Most integration projects fail because they start with the API, not the problem. We start by mapping every manual step your team takes between your tools — then build the connections that eliminate those steps.
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
                      {c.id === "zova"
                        ? "The checkout abandonment wasn't a UX problem — it was a payment method problem. 34% of buyers wanted to pay via bank transfer or USSD and couldn't. No amount of UI improvement would have fixed that. Only the right integrations could."
                        : c.id === "swifthaul"
                        ? "The platform was fine. The integrations were the product. Three enterprise clients hadn't rejected the platform — they'd rejected what it couldn't show them: live tracking, automated notifications, and self-serve visibility."
                        : "Three tools, three manual steps between each one, 22% of the value leaking through the cracks. The integration didn't add a new capability — it made the capabilities already purchased actually work together."}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-white/50 max-w-md leading-relaxed">
                Tell us which tools you use and where the manual work happens. We'll map the integration and give you a clear plan before anything is built.
              </p>
              <Link href="/contact"
                className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-white text-black text-sm font-medium px-5 py-2.5 hover:opacity-90 transition">
                Book a free integration audit →
              </Link>
            </div>
          </div>
        </div>

        {/* Soft CTA */}
        <div className="mt-4 rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Not sure which integrations you need?</p>
            <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
              Book a free 30-minute integration audit. We'll map your current tools, identify every manual step between them, and show you what connecting them would actually change.
            </p>
          </div>
          <Link href="/contact"
            className="flex-shrink-0 inline-flex items-center justify-center rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition whitespace-nowrap">
            Book a free audit
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
  { q: "What APIs and platforms do you integrate with?", a: "We integrate with virtually any platform that exposes an API. Common integrations include Stripe, Paystack, Flutterwave (payments), HubSpot, Salesforce, Zoho (CRMs), Mailchimp, ActiveCampaign (email marketing), Twilio, Termii, WhatsApp Business API (messaging), Google Maps Platform, Mapbox (mapping), Xero, QuickBooks (accounting), Smile ID, Onfido (identity verification), DHL, FedEx, Sendbox (shipping), and OpenAI, Anthropic Claude (AI). If it has an API, we can connect it." },
  { q: "How much does an integration project cost?", a: "A single focused integration — one payment gateway, one SMS provider, one CRM connection — typically starts from £2,500–£5,000. A full multi-system project connecting four or more tools with custom event logic, retry systems, monitoring, and documentation typically ranges from £8,000–£18,000 depending on complexity. We scope precisely after the audit and give you a fixed price before any build begins." },
  { q: "What happens if an integration breaks after launch?", a: "We build monitoring and alerting into every integration as standard. Failed webhook deliveries, API errors, and sync failures trigger automated alerts before they escalate into user-facing problems. We also build retry logic and graceful failure modes so a temporary outage in one system doesn't cascade into your whole operation. Every project includes a post-launch support window." },
  { q: "How do you handle API authentication and security?", a: "We implement OAuth 2.0, API keys with proper secret management, webhook signature verification, and encrypted data transmission as standard on every project. All credentials are stored in secure environment variable systems — never in code. We follow OWASP API security guidelines and can provide security documentation for compliance purposes." },
  { q: "How long does a typical integration project take?", a: "A single payment integration or notification system typically takes 2–3 weeks from audit to deployment. A full multi-system project — connecting your CRM, payment platform, messaging tools, and reporting — typically takes 4–8 weeks depending on the number of integrations and the quality of the APIs involved. We give you a precise timeline after the audit." },
  { q: "Can you integrate with custom-built or legacy systems?", a: "Yes. If your internal system has an API or database we can access, we can integrate it. If it doesn't have an API, we can build one as part of the project. For legacy systems with no API surface, we can sometimes work around them using scheduled data sync or other approaches — we'll tell you honestly what's possible after reviewing your setup." },
  { q: "Do we own the integration code after delivery?", a: "Yes — fully. You receive all source code, documentation, environment configuration, and runbooks. No licensing restrictions, no lock-in. If you want to modify or extend the integration yourself later, you have everything you need to do so." },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur overflow-hidden">
      <button type="button" onClick={() => setOpen((p) => !p)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-6" aria-expanded={open}>
        <span className="text-sm text-gray-900">{q}</span>
        <span className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
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
export default function IntegrationsAPIsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Hero />
      <WhatWeIntegrateCarousel />
      <CaseStudiesSection />
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">API and integration questions, answered.</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">Straight answers about how integrations work, what they cost, and what's included on every project.</p>
          <div className="grid gap-3">
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </main>
  );
}