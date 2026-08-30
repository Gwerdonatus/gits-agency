"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { EditorialButton, Eyebrow, editorialRoot, cx, SectionNav, ImageBand, SECTION_SCROLL_MT, type NavSection } from "@/components/editorial";

const ease = [0.22, 0.61, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — pure black & white, Apple-registered restraint
// ═══════════════════════════════════════════════════════════════
const INK = "#050505";        // matches the About page ink, so the section reads as one system
const GRAPHITE = "#666666";   // matches the About page "quiet"
const FAINT = "#C7C7CC";      // tertiary / ghost type
const MIST = "#F5F5F7";       // section wash
const HAIR = "rgba(0,0,0,0.08)";
const HAIR_STRONG = "rgba(0,0,0,0.14)";

// Was a system font stack, which resolved to Arial here via the body default
// in globals.css. Points at the Instrument Sans variable that editorialRoot loads.
const FONT = 'var(--font-instrument), system-ui, sans-serif';

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const rm = useReducedMotion();
  const fd = (d: number) => ({ duration: rm ? 0 : 0.8, ease, delay: d });

  // Same lockup as the other four service pages: left-aligned, extralight
  // display over a Fraunces italic second line, square buttons, mono trust
  // strip. This page was previously centred with a semibold headline and a
  // radial wash, which read as a different site.
  const notes = [
    {
      n: "01",
      title: "Designed, not templated",
      body: "Every page is drawn for your business. No theme, no page builder, nothing another company can buy the same version of.",
    },
    {
      n: "02",
      title: "Built to be found",
      body: "Structured markup, real metadata and fast first paint, so the site earns search traffic instead of relying on ads to be seen.",
    },
    {
      n: "03",
      title: "Yours to keep",
      body: "Full source code ownership on handover. No licence, no platform lock-in, no monthly fee to keep your own site online.",
    },
  ];

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="relative mx-auto max-w-[1400px]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0)}>
          <Eyebrow index="01">Websites &amp; Digital Experiences</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.08)}
          className="mt-8 md:mt-12 max-w-5xl"
        >
          <span className="block text-[clamp(2.2rem,6vw,4.6rem)] font-extralight leading-[1.03] tracking-[-0.03em] text-[#050505]">
            Your website is the first
          </span>
          <span className="block text-[clamp(2.2rem,6vw,4.6rem)] italic font-light leading-[1.03] tracking-[-0.01em] text-[#050505]/70 font-[family-name:var(--font-fraunces)] pl-[4vw] md:pl-[2vw]">
            conversation your business has.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.16)}
          className="mt-8 md:mt-10 max-w-xl text-base md:text-lg font-light text-[#666666] leading-[1.75]"
        >
          Templates make every business look the same. We design and build from
          scratch — every page, every interaction, every detail considered — so
          your site looks like it belongs to a company twice your size.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.24)}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <EditorialButton href="/contact">Start a project</EditorialButton>
          <EditorialButton href="#examples" variant="ghost">See selected work</EditorialButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fd(0.32)}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
        >
          {[
            "Designed from scratch — never a template",
            "Full source code ownership",
            "Built for search from day one",
            "Live in 2–6 weeks",
          ].map((t) => (
            <span
              key={t}
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#666666]"
            >
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.36)}
          className="mt-16 md:mt-20 grid gap-10 md:gap-0 md:grid-cols-3 border-t border-[#050505]/10 pt-10"
        >
          {notes.map((note, i) => (
            <div
              key={note.n}
              className={cx(
                "md:px-8",
                i === 0 && "md:pl-0",
                i === 2 && "md:pr-0",
                i > 0 && "md:border-l md:border-[#050505]/10"
              )}
            >
              <span className="font-[family-name:var(--font-mono)] text-xs text-[#666666]">{note.n}</span>
              <p className="mt-3 text-lg font-light tracking-tight text-[#050505]">{note.title}</p>
              <p className="mt-3 text-sm font-light text-[#666666] leading-[1.7]">{note.body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

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
    <section id="services" className={cx(SECTION_SCROLL_MT, "px-6 py-20 md:py-28 border-t")} style={{ background: MIST, borderColor: HAIR }}>
      <div className="mx-auto max-w-[1400px]">
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
/** Counts to a target once the demo scrolls into view. */
function useCountUp(target: number, active: boolean, duration = 1200) {
  const [n, setN] = useState(0);
  const rm = useReducedMotion();
  useEffect(() => {
    if (!active) return;
    if (rm) { setN(target); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out so the number settles rather than stopping dead
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, rm]);
  return n;
}

/** NOTGATE — dark editorial construction site with stats that count up. */
function NotgateDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const projects = useCountUp(120, inView);
  const value = useCountUp(65, inView, 900);
  const years = useCountUp(25, inView, 1000);

  return (
    <div ref={ref} className="h-full w-full flex flex-col justify-center px-6 sm:px-8" style={{ background: "#0B0B0D" }}>
      <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">Notgate Construction</p>
      <p className="mt-3 text-white text-[clamp(1.1rem,3.4vw,1.7rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
        Building
        <br />
        Nigeria&rsquo;s future.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          // Figures as published on the live NOTGATE site.
          { v: years, suffix: "+", l: "Years" },
          { v: projects, suffix: "+", l: "Projects" },
          { v: value, prefix: "\u20A6", suffix: "B+", l: "Delivered" },
        ].map((st) => (
          <div key={st.l} className="border-t border-white/15 pt-2.5">
            <p className="text-white text-lg sm:text-2xl font-semibold leading-none tabular-nums">
              {"prefix" in st ? st.prefix : ""}
              {st.v}
              {st.suffix}
            </p>
            <p className="mt-1.5 text-[8.5px] uppercase tracking-[0.14em] text-white/40 leading-tight">{st.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** LaMed Pharmacy — the prescription journey, step by step. */
function LamedDemo() {
  const [step, setStep] = useState(0); // 0 upload · 1 verifying · 2 verified/branch
  const rm = useReducedMotion();

  useEffect(() => {
    if (step !== 1) return;
    const t = setTimeout(() => setStep(2), rm ? 0 : 1100);
    return () => clearTimeout(t);
  }, [step, rm]);

  const branches = [
    { name: "Lamed · Rayfield", km: "1.2 km", open: true },
    { name: "Lamed · Terminus", km: "3.8 km", open: true },
    { name: "Lamed · Bukuru", km: "9.4 km", open: false },
  ];

  return (
    <div className="h-full w-full flex flex-col px-5 sm:px-6 py-5 bg-white">
      <div className="flex items-center gap-1.5">
        {["Upload", "Verify", "Collect"].map((lbl, i) => (
          <div key={lbl} className="flex items-center gap-1.5">
            {i > 0 && <span className="h-px w-4" style={{ background: step >= i ? "#0F7B5A" : HAIR_STRONG }} />}
            <span
              className="text-[8.5px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded"
              style={{
                color: step >= i ? "#0F7B5A" : GRAPHITE,
                background: step >= i ? "rgba(15,123,90,0.08)" : "transparent",
              }}
            >
              {lbl}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex-1 flex flex-col justify-center">
        {step === 0 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full rounded-xl border border-dashed py-6 text-center transition-colors hover:bg-black/[0.02]"
            style={{ borderColor: HAIR_STRONG }}
          >
            <span className="block text-[13px] font-medium" style={{ color: INK }}>
              Upload your prescription
            </span>
            <span className="mt-1 block text-[10.5px]" style={{ color: GRAPHITE }}>
              Photo or PDF · verified by a pharmacist
            </span>
          </button>
        )}

        {step === 1 && (
          <div className="text-center">
            <div className="mx-auto h-8 w-8 rounded-full border-2 border-black/10 border-t-[#0F7B5A] animate-spin" />
            <p className="mt-3 text-[11.5px]" style={{ color: GRAPHITE }}>
              Checking PLASCHEMA coverage&hellip;
            </p>
          </div>
        )}

        {step === 2 && (
          <div>
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{ background: "rgba(15,123,90,0.08)" }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#0F7B5A" strokeWidth="2">
                <path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] font-medium" style={{ color: "#0F7B5A" }}>
                PLASCHEMA verified &middot; covered
              </span>
            </div>
            <p className="mt-3 text-[9px] uppercase tracking-[0.16em]" style={{ color: GRAPHITE }}>
              Collect from
            </p>
            <div className="mt-1.5 space-y-1">
              {branches.map((b) => (
                <div key={b.name} className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: HAIR }}>
                  <span className="text-[11.5px]" style={{ color: b.open ? INK : FAINT }}>
                    {b.name}
                  </span>
                  <span className="text-[10px] tabular-nums" style={{ color: b.open ? GRAPHITE : FAINT }}>
                    {b.open ? b.km : "Closed"}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="mt-3 text-[10px] underline underline-offset-2"
              style={{ color: GRAPHITE }}
            >
              Reset demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** Elowen Living — an editorial listing that switches view. */
function ElowenDemo() {
  const [view, setView] = useState<"exterior" | "interior" | "plan">("exterior");
  const views = {
    exterior: { grad: "linear-gradient(135deg,#8E8578 0%,#3E3A34 100%)", cap: "North elevation" },
    interior: { grad: "linear-gradient(135deg,#C9C0B4 0%,#6E6559 100%)", cap: "Principal reception" },
    plan: { grad: "linear-gradient(135deg,#E8E4DC 0%,#B9B2A6 100%)", cap: "Ground floor plan" },
  } as const;

  return (
    <div className="h-full w-full flex flex-col bg-white">
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          key={view}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="absolute inset-0"
          style={{ background: views[view].grad }}
        />
        <div className="absolute left-4 bottom-3">
          <p className="text-[8.5px] uppercase tracking-[0.2em] text-white/70">{views[view].cap}</p>
        </div>
        <div className="absolute right-3 top-3 flex gap-1">
          {(Object.keys(views) as (keyof typeof views)[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setView(k)}
              className="px-2 py-1 text-[8.5px] uppercase tracking-[0.12em] rounded-sm backdrop-blur transition-colors"
              style={{
                background: view === k ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.22)",
                color: view === k ? INK : "#fff",
              }}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 py-3.5 flex items-end justify-between">
        <div>
          <p className="text-[8.5px] uppercase tracking-[0.2em]" style={{ color: GRAPHITE }}>
            Maitama, Abuja
          </p>
          <p className="mt-1 text-[15px] tracking-[-0.01em]" style={{ color: INK }}>
            Five-bedroom residence
          </p>
        </div>
        <p className="text-[13px] tabular-nums" style={{ color: INK }}>
          &#8358;480m
        </p>
      </div>
    </div>
  );
}

const WEBSITES = [
  {
    index: "01",
    title: "NOTGATE",
    category: "Construction & Infrastructure",
    url: "https://notgate-w6l1.vercel.app/",
    story:
      "A construction brand that needed to feel like it builds at scale. We wrote a dark, editorial layout with dramatic type and count-up stats that animate in as you scroll, so the site communicates precision before a single word is read.",
    tags: ["Framer Motion", "Dark UI", "Animated counters"],
    Demo: NotgateDemo,
  },
  {
    index: "02",
    title: "LaMed Pharmacy",
    category: "Healthcare · Jos",
    url: "https://lamed-pharmacy.vercel.app/",
    story:
      "A pharmacy platform where trust and clarity matter more than flourish. We built a prescription upload flow, a branch finder, and PLASCHEMA verification into a clean interface that reads well for every age group, on any device.",
    tags: ["Prescription upload", "Branch finder", "PLASCHEMA"],
    Demo: LamedDemo,
  },
  {
    index: "03",
    title: "Elowen Living",
    category: "Luxury Real Estate",
    url: "/elowen-living",
    story:
      "A real estate brand that sells a feeling before it sells square footage. We leaned into editorial typography and full-bleed property imagery, giving every listing room to breathe the way a magazine spread would.",
    tags: ["Editorial layout", "Property tours", "Typography-led"],
    Demo: ElowenDemo,
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
                {site.url.replace("https://", "") || site.url}
              </span>
            </div>
          </div>

          {/* Live demo. Replaces a frame that previously showed only the
              client's name — a mockup of a mockup. */}
          <div className="absolute inset-x-0 bottom-0 top-[38px]">
            <site.Demo />
          </div>

          {/* hover overlay */}
          {/* Sits in the chrome bar, not over the demo: a full-cover overlay
              would swallow clicks meant for the demo itself. */}
          <motion.a
            href={site.url}
            target={site.url.startsWith("http") ? "_blank" : undefined}
            rel={site.url.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute right-3 top-1.5 z-10 flex items-center justify-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium" style={{ color: "#fff", background: INK }}>
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
          target={site.url.startsWith("http") ? "_blank" : undefined}
          rel={site.url.startsWith("http") ? "noopener noreferrer" : undefined}
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
    <section id="examples" className={cx(SECTION_SCROLL_MT, "px-6 py-20 md:py-28")}>
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
    <section id="process" className={cx(SECTION_SCROLL_MT, "px-6 py-20 md:py-28 border-t")} style={{ borderColor: HAIR }}>
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
    <section id="faq" className={cx(SECTION_SCROLL_MT, "px-6 py-20 md:py-28 border-t")} style={{ borderColor: HAIR }}>
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
      <div className="mx-auto max-w-[1400px]">
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
const SECTIONS: NavSection[] = [
  { id: "services", label: "What we build" },
  { id: "examples", label: "Examples" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
];

export default function WebsitesDigitalExperiencesPage() {
  return (
    <main className={cx(editorialRoot, "min-h-screen bg-white")} style={{ fontFamily: FONT, color: INK }}>
      <SectionNav sections={SECTIONS} />
      <Hero />
      <ImageBand
        src="/services/web.webp"
        alt="A website and digital experience shown in use"
        caption="Sites built to convert, not merely to look finished"
        className="pb-4"
      />
      <ServicesSection />
      <ExamplesSection />
      <ProcessSection />
      <FaqSection />
      <CTASection />
    </main>
  );
}