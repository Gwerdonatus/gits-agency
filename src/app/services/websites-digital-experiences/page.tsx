"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — pure black & white, Apple-registered restraint
// ═══════════════════════════════════════════════════════════════
const INK = "#1D1D1F";        // Apple's near-black, never pure #000 on light bg
const GRAPHITE = "#86868B";   // secondary copy
const FAINT = "#C7C7CC";      // tertiary / ghost type
const MIST = "#F5F5F7";       // section wash
const HAIR = "rgba(0,0,0,0.08)";
const HAIR_STRONG = "rgba(0,0,0,0.14)";

const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif';

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const rm = useReducedMotion();
  const fd = (d: number) => ({ duration: rm ? 0 : 0.8, ease, delay: d });
  return (
    <section className="relative px-6 pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[560px] w-[900px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #000 0%, transparent 70%)" }}
        />
      </div>
      <div className="relative mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0)}
          className="text-[13px] font-medium uppercase tracking-[0.14em] mb-5"
          style={{ color: GRAPHITE }}
        >
          Services — Websites &amp; Digital Experiences
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.08)}
          className="text-[2.6rem] md:text-[4.4rem] font-semibold leading-[1.04] tracking-[-0.035em]"
          style={{ color: INK }}
        >
          Your website is the first
          <br />
          conversation your business has.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.16)}
          className="mt-6 mx-auto max-w-xl text-[17px] md:text-[19px] leading-relaxed"
          style={{ color: GRAPHITE }}
        >
          Templates make every business look the same. We design and build from
          scratch — every page, every interaction, every detail considered — so
          your site looks like it belongs to a company twice your size.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.24)}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
            style={{ background: INK }}
          >
            Start a project
          </Link>
          <a
            href="#examples"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium transition-colors"
            style={{ color: INK, border: `1px solid ${HAIR_STRONG}` }}
          >
            See our work
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fd(0.32)}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px]"
          style={{ color: FAINT }}
        >
          {[
            "Zero templates",
            "Mobile-first",
            "90+ Lighthouse",
            "WCAG 2.2 AA",
          ].map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true">·</span>}
              <span>{t}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════
const SERVICES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Custom design",
    desc: "Every page designed from scratch around your content and goals. No templates, no page builders.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="3" width="20" height="14" rx="3" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Responsive build",
    desc: "Mobile-first development that looks and works beautifully on every device, from phone to desktop.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Performance & SEO",
    desc: "Sub-2-second load times, semantic markup, and structured data built in from day one, not bolted on.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
    title: "CMS handoff",
    desc: "Update your content without touching code. We train your team so you own the site after launch.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
    title: "Commerce & booking",
    desc: "Storefronts and booking flows built around your specific products, not squeezed into a generic template.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Ongoing support",
    desc: "Post-launch updates and new features as your business grows. We don't disappear after launch day.",
  },
];

function ServicesSection() {
  const rm = useReducedMotion();
  return (
    <section className="px-6 py-20 md:py-28 border-t" style={{ background: MIST, borderColor: HAIR }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: rm ? 0 : 0.6, ease }}
          className="mb-14 text-center"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] mb-3" style={{ color: GRAPHITE }}>
            What we do
          </p>
          <h2 className="text-2xl md:text-[2.25rem] font-semibold tracking-[-0.02em] mx-auto max-w-xl" style={{ color: INK }}>
            Everything your website needs, in one place.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: rm ? 0 : 0.5, ease, delay: i * 0.06 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-[22px] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.18)]"
              style={{ border: `1px solid ${HAIR}` }}
            >
              <div
                className="h-11 w-11 rounded-full flex items-center justify-center mb-5"
                style={{ border: `1px solid ${HAIR_STRONG}`, color: INK }}
              >
                {service.icon}
              </div>
              <h3 className="text-[15px] font-semibold mb-2" style={{ color: INK }}>
                {service.title}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: GRAPHITE }}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CASE STUDIES — the signature element
// ═══════════════════════════════════════════════════════════════
const WEBSITES = [
  {
    index: "01",
    title: "NOTGATE",
    category: "Construction & Infrastructure",
    url: "https://notgate-w6l1.vercel.app/",
    story:
      "A construction brand that needed to feel like it builds at scale. We wrote a dark, editorial layout with dramatic type and count-up stats that animate in as you scroll, so the site communicates precision before a single word is read.",
    tags: ["Framer Motion", "Dark UI", "Animated counters"],
  },
  {
    index: "02",
    title: "LaMed Pharmacy",
    category: "Healthcare · Jos",
    url: "https://lamed-pharmacy.vercel.app/",
    story:
      "A pharmacy platform where trust and clarity matter more than flourish. We built a prescription upload flow, a branch finder, and PLASCHEMA verification into a clean interface that reads well for every age group, on any device.",
    tags: ["Prescription upload", "Branch finder", "PLASCHEMA"],
  },
  {
    index: "03",
    title: "Elowen Living",
    category: "Luxury Real Estate",
    url: "https://elowen-living.vercel.app/",
    story:
      "A real estate brand that sells a feeling before it sells square footage. We leaned into editorial typography and full-bleed property imagery, giving every listing room to breathe the way a magazine spread would.",
    tags: ["Editorial layout", "Property tours", "Typography-led"],
  },
];

function CaseStudyRow({ site, i }: { site: (typeof WEBSITES)[number]; i: number }) {
  const rm = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const reversed = i % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: rm ? 0 : 0.7, ease }}
      className="grid md:grid-cols-2 gap-8 md:gap-14 items-center py-14 md:py-20"
      style={{ borderTop: i > 0 ? `1px solid ${HAIR}` : "none" }}
    >
      {/* Media */}
      <div className={reversed ? "md:order-2" : "md:order-1"}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative rounded-[28px] overflow-hidden aspect-[4/3]"
          style={{ background: MIST, border: `1px solid ${HAIR}` }}
        >
          {/* ghost index number */}
          <span
            aria-hidden="true"
            className="absolute -top-6 -left-3 select-none font-semibold leading-none pointer-events-none"
            style={{ fontSize: "9rem", color: "transparent", WebkitTextStroke: `1.5px ${FAINT}` }}
          >
            {site.index}
          </span>

          {/* browser chrome */}
          <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: `1px solid ${HAIR}` }}>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-2 w-2 rounded-full" style={{ border: `1px solid ${HAIR_STRONG}` }} />
              ))}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span
                className="text-[10px] rounded px-3 py-0.5 truncate max-w-[70%]"
                style={{ color: GRAPHITE, border: `1px solid ${HAIR}`, background: "#fff" }}
              >
                {site.url.replace("https://", "")}
              </span>
            </div>
          </div>

          {/* center label */}
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
            <motion.div animate={hovered ? { y: -6 } : { y: 0 }} transition={{ duration: 0.4, ease }}>
              <p className="text-[11px] uppercase tracking-[0.16em] mb-2" style={{ color: GRAPHITE }}>
                {site.category}
              </p>
              <h3 className="text-3xl font-semibold tracking-[-0.02em]" style={{ color: INK }}>
                {site.title}
              </h3>
            </motion.div>
          </div>

          {/* hover overlay */}
          <motion.a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(29,29,31,0.88)" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-medium" style={{ color: INK }}>
              View live site
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </motion.a>
        </div>
      </div>

      {/* Copy */}
      <div className={reversed ? "md:order-1" : "md:order-2"}>
        <p className="text-[13px] uppercase tracking-[0.14em] mb-3" style={{ color: GRAPHITE }}>
          {site.category}
        </p>
        <h3 className="text-2xl md:text-[1.9rem] font-semibold tracking-[-0.02em] mb-4" style={{ color: INK }}>
          {site.title}
        </h3>
        <p className="text-[15px] leading-relaxed mb-5" style={{ color: GRAPHITE }}>
          {site.story}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 text-[13px]" style={{ color: FAINT }}>
          {site.tags.map((tag, idx) => (
            <span key={tag} className="flex items-center gap-3">
              {idx > 0 && <span aria-hidden="true">·</span>}
              <span>{tag}</span>
            </span>
          ))}
        </div>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[15px] font-medium border-b pb-0.5 transition-opacity hover:opacity-60"
          style={{ color: INK, borderColor: HAIR_STRONG }}
        >
          View live site
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

function ExamplesSection() {
  const rm = useReducedMotion();
  return (
    <section id="examples" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: rm ? 0 : 0.6, ease }}
          className="mb-4 text-center"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] mb-3" style={{ color: GRAPHITE }}>
            Selected work
          </p>
          <h2 className="text-2xl md:text-[2.25rem] font-semibold tracking-[-0.02em] mx-auto max-w-xl" style={{ color: INK }}>
            Three sites. Three different problems solved.
          </h2>
        </motion.div>

        <div>
          {WEBSITES.map((site, i) => (
            <CaseStudyRow key={site.title} site={site} i={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: rm ? 0 : 0.5, ease }}
          className="mt-6 rounded-[22px] p-7 md:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ background: MIST, border: `1px solid ${HAIR}` }}
        >
          <div>
            <p className="text-[15px] font-medium" style={{ color: INK }}>
              Want something like this for your business?
            </p>
            <p className="text-[14px] mt-1" style={{ color: GRAPHITE }}>
              We'll design and build a site that fits your brand, your goals, and your budget.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-80"
            style={{ background: INK }}
          >
            Start a project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROCESS
// ═══════════════════════════════════════════════════════════════
const STEPS = [
  { num: "01", title: "Discovery", desc: "We start by understanding your business, your audience, and what you want visitors to do." },
  { num: "02", title: "Design", desc: "Every page is designed from scratch in Figma before we write a single line of code." },
  { num: "03", title: "Development", desc: "We build in Next.js and TypeScript, with weekly demos so you see real progress." },
  { num: "04", title: "Launch", desc: "We handle deployment, DNS, and SSL, with a 30-day support window after launch." },
];

function ProcessSection() {
  const rm = useReducedMotion();
  return (
    <section className="px-6 py-20 md:py-28 border-t" style={{ borderColor: HAIR }}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: rm ? 0 : 0.6, ease }}
          className="mb-14 text-center"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] mb-3" style={{ color: GRAPHITE }}>
            How we work
          </p>
          <h2 className="text-2xl md:text-[2.25rem] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            A clear process, start to finish.
          </h2>
        </motion.div>

        <div>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: rm ? 0 : 0.5, ease, delay: i * 0.08 }}
              className="flex items-start gap-6 md:gap-10 py-7"
              style={{ borderTop: i > 0 ? `1px solid ${HAIR}` : "none" }}
            >
              <span
                className="text-[2.25rem] md:text-[2.75rem] font-semibold leading-none w-16 md:w-20 flex-shrink-0"
                style={{ color: "transparent", WebkitTextStroke: `1.2px ${FAINT}` }}
              >
                {step.num}
              </span>
              <div>
                <h3 className="text-[16px] font-semibold mb-1.5" style={{ color: INK }}>
                  {step.title}
                </h3>
                <p className="text-[14px] leading-relaxed max-w-md" style={{ color: GRAPHITE }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════
const FAQS = [
  { q: "How long does a website project take?", a: "A focused marketing site typically takes 4–6 weeks from kickoff to launch. A multi-page platform with custom functionality typically takes 10–12 weeks. You get a precise timeline after a discovery call, before committing to anything." },
  { q: "Do you work with a CMS so we can update content ourselves?", a: "Yes. Every site includes a content management system, typically Sanity or a similar headless CMS, plus a training session at handoff so your team can update text, images, and pages independently." },
  { q: "What about SEO — will our site actually get found?", a: "SEO is built in from the start: semantic HTML, structured data, optimised images, and fast load times. We also configure analytics and search console access before launch." },
  { q: "Do you handle hosting and domains?", a: "We typically deploy on Vercel or a similar edge-hosting platform under your own account, so you retain full ownership. We handle migration for existing domains and can advise on registering a new one." },
  { q: "For e-commerce — which payment providers do you support?", a: "Stripe, Paystack, and Flutterwave, chosen based on your market and currency needs, with proper webhook handling for automatic order confirmation." },
  { q: "What happens after launch?", a: "Every project includes a 30-day post-launch support window. After that, most clients move to an ongoing support retainer. You receive full source code regardless." },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${HAIR}` }}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full py-5 text-left flex items-center justify-between gap-6"
        aria-expanded={open}
      >
        <span className="text-[15px]" style={{ color: INK }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-lg"
          style={{ color: GRAPHITE }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] leading-relaxed max-w-2xl" style={{ color: GRAPHITE }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  return (
    <section className="px-6 py-20 md:py-28 border-t" style={{ borderColor: HAIR }}>
      <div className="mx-auto max-w-3xl">
        <p className="text-[13px] font-medium uppercase tracking-[0.14em] mb-3" style={{ color: GRAPHITE }}>
          FAQ
        </p>
        <h2 className="text-2xl md:text-[2.25rem] font-semibold tracking-[-0.02em] mb-3" style={{ color: INK }}>
          Questions we hear before every project starts.
        </h2>
        <p className="text-[15px] mb-8" style={{ color: GRAPHITE }}>
          Answered here so your first conversation with us can focus on your project.
        </p>
        <div>
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CTA
// ═══════════════════════════════════════════════════════════════
function CTASection() {
  const rm = useReducedMotion();
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: rm ? 0 : 0.6, ease }}
          className="rounded-[32px] p-10 md:p-16 text-center"
          style={{ background: INK }}
        >
          <h2 className="text-2xl md:text-[2.75rem] font-semibold tracking-[-0.02em] text-white max-w-2xl mx-auto leading-[1.1] mb-5">
            Ready for a website that works for your business?
          </h2>
          <p className="max-w-lg mx-auto mb-9 text-[15px] md:text-[16px] leading-relaxed" style={{ color: "rgba(255,255,255,0.56)" }}>
            Tell us what you need. We'll tell you honestly whether we're the right
            fit, and if we are, show you exactly what we can build.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium transition-opacity hover:opacity-80"
              style={{ color: INK }}
            >
              Start a project
            </Link>
            <a
              href="#examples"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              See our work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
export default function WebsitesDigitalExperiencesPage() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: FONT, color: INK }}>
      <Hero />
      <ServicesSection />
      <ExamplesSection />
      <ProcessSection />
      <FaqSection />
      <CTASection />
    </main>
  );
}