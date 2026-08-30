"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Inter } from "next/font/google";
import { editorialRoot, cx } from "@/components/editorial";

const bodyFont = Inter({ subsets: ["latin"], weight: "400" });

const SERVICES = [
  {
    icon: "💻",
    title: "Custom Software Development",
    shortLabel: "Software",
    shortValue: "Build software tailored to the way your business works.",
    cta: "Build your product",
    slug: "custom-software-development",
    whatWeBuild: ["SaaS platforms","Online marketplaces","Booking systems","Membership platforms","Customer portals","Vendor management systems","Business management software","Enterprise applications"],
    idealFor: ["Startups building their first product","Growing businesses ready to scale","Organizations replacing legacy systems","Service providers needing custom workflows"],
    benefits: ["Increased operational efficiency","Better customer experiences","Scalable architecture built for growth","Reduced manual work and overhead"],
    image: "/services/software.webp",
    imageAlt: "Developer working on a custom software dashboard interface",
    accent: "rgba(37,99,235,0.22)",
    accentHex: "#2563eb",
    accentLight: "rgba(37,99,235,0.09)",
  },
  {
    icon: "🌐",
    title: "Websites & Digital Experiences",
    shortLabel: "Websites",
    shortValue: "Modern websites that attract customers and grow your business.",
    cta: "Launch your website",
    slug: "websites-digital-experiences",
    whatWeBuild: ["Business & corporate websites","E-commerce stores","Landing pages","Portfolio websites","Event websites","Product showcase websites","Marketing websites","Performance-first web experiences"],
    idealFor: ["Boutiques and fashion brands","Businesses selling online","Service-based businesses","Professional firms & founders"],
    benefits: ["Stronger online presence and authority","Better customer trust and credibility","Mobile-first, fast-loading experiences","Improved conversions and SEO"],
    image: "/services/web.webp",
    imageAlt: "Clean, modern website design shown on desktop and mobile screens",
    accent: "rgba(20,184,166,0.18)",
    accentHex: "#0d9488",
    accentLight: "rgba(20,184,166,0.08)",
  },
  {
    icon: "🤖",
    title: "AI & Business Automation",
    shortLabel: "AI & Auto",
    shortValue: "Automate repetitive work and improve business efficiency.",
    cta: "Automate your workflow",
    slug: "ai-business-automation",
    whatWeBuild: ["AI assistants and agents","Customer support automation","Lead qualification systems","Workflow automation","Reporting automation","WhatsApp & email automation","AI-powered business tools","Custom AI integrations"],
    idealFor: ["Customer support teams handling high volume","Sales teams qualifying leads at scale","Growing businesses seeking efficiency","Organizations reducing operational costs"],
    benefits: ["Reduced manual workload across teams","Faster response times for customers","Better customer experiences at scale","Increased productivity without extra headcount"],
    image: "/services/ai.webp",
    imageAlt: "AI automation dashboard showing workflow and conversation analytics",
    accent: "rgba(168,85,247,0.18)",
    accentHex: "#9333ea",
    accentLight: "rgba(168,85,247,0.08)",
  },
  {
    icon: "📊",
    title: "Internal Tools & CRM Systems",
    shortLabel: "Internal Tools",
    shortValue: "Custom systems that help your team work smarter.",
    cta: "Build your internal tools",
    slug: "internal-tools-crm",
    whatWeBuild: ["CRM systems","Inventory management systems","Admin dashboards","Employee portals","Reporting platforms","Vendor management systems","Internal workflow tools","Operations management systems"],
    idealFor: ["Multi-branch businesses","Healthcare providers","Educational institutions","Organizations with complex operations"],
    benefits: ["Centralized operations and visibility","Better team productivity","Improved reporting and decision-making","Reduced manual errors and duplication"],
    image: "/services/tools.webp",
    imageAlt: "Custom CRM dashboard with analytics, pipeline, and team views",
    accent: "rgba(245,158,11,0.16)",
    accentHex: "#d97706",
    accentLight: "rgba(245,158,11,0.08)",
  },
  {
    icon: "🔗",
    title: "Integrations & APIs",
    shortLabel: "Integrations",
    shortValue: "Connect your systems and eliminate unnecessary manual work.",
    cta: "Connect your systems",
    slug: "integrations-apis",
    whatWeBuild: ["Payment integrations (Stripe, Paystack)","REST & GraphQL API development","CRM & marketing integrations","WhatsApp & email integrations","Data synchronization pipelines","Third-party service integrations","Custom automation workflows","Webhook and event systems"],
    idealFor: ["E-commerce businesses needing smooth checkout","SaaS platforms expanding capabilities","Organizations using multiple disconnected tools","Growing companies ready to automate"],
    benefits: ["Reduced duplicate data entry","Better data accuracy across systems","Faster business processes end-to-end","Easier scalability as you grow"],
    image: "/services/integrations.webp",
    imageAlt: "API integration diagram showing connected services and data flows",
    accent: "rgba(59,130,246,0.18)",
    accentHex: "#3b82f6",
    accentLight: "rgba(59,130,246,0.08)",
  },
] as const;

const CAPABILITIES = [
  "Product strategy & MVP planning","UI/UX design & prototyping","Design systems",
  "Web apps (Next.js / React)","Mobile apps (iOS / Android)","Backend & APIs (REST/GraphQL)",
  "AI automations & agents","Integrations (Stripe, CRM, etc.)","Dashboards & internal tools",
  "Cloud deployment & DevOps","Performance optimization","Maintenance & support",
  "Security best practices","Analytics & tracking setup",
] as const;

// Tonal ramp for the mobile service list. Each service sits one step darker
// than the last, so position in the list is readable at a glance while
// scrolling. The jump from step 3 to step 4 inverts to white-on-ink rather
// than passing through the mid-greys, which carry neither text colour well.
const MOBILE_SHADES = [
  { bg: "#FFFFFF", ink: "#050505", quiet: "#666666", rule: "rgba(5,5,5,0.12)", invert: false },
  { bg: "#F4F4F4", ink: "#050505", quiet: "#666666", rule: "rgba(5,5,5,0.12)", invert: false },
  { bg: "#E7E7E7", ink: "#050505", quiet: "#5A5A5A", rule: "rgba(5,5,5,0.14)", invert: false },
  { bg: "#1F1F1F", ink: "#FFFFFF", quiet: "#A2A2A2", rule: "rgba(255,255,255,0.16)", invert: true },
  { bg: "#050505", ink: "#FFFFFF", quiet: "#8A8A8A", rule: "rgba(255,255,255,0.16)", invert: true },
];

const TRUST_STATS = [
  { value: "40+", label: "Businesses served" },
  { value: "12", label: "Countries" },
  { value: "98%", label: "On-time delivery" },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsMobile(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return isMobile;
}

const easeOut = [0.22, 0.61, 0.36, 1] as const;

export default function ServicesPage() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const liveRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.5 });
  const heroY = useTransform(smoothProgress, [0, 1], [0, -8]);
  const heroGlow = useTransform(smoothProgress, [0, 1], [0.22, 0.08]);

  useEffect(() => {
    if (liveRef.current) liveRef.current.textContent = `Now showing: ${SERVICES[active].title}`;
  }, [active]);

  const activeService = SERVICES[active];

  const panelVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8, filter: "blur(4px)" },
  }), []);

  return (
    <main className="w-full bg-white text-black" style={{ fontFamily: bodyFont.style.fontFamily }}>
      <div ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />

      {/* ─── HERO ─── */}
      <section className="relative px-6 pt-28 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto" ref={heroRef}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-sm uppercase tracking-widest text-gray-500"
          >Services</motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.06 }}
            className="mt-3 text-4xl md:text-6xl font-medium leading-[1.05] text-gray-900 max-w-4xl"
            style={{ y: heroY }}
          >
            Everything you need to build, launch, and scale a modern product.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.12 }}
            className="mt-5 text-gray-600 max-w-2xl leading-relaxed"
          >
            GITS partners with startups and teams globally to deliver websites, apps, automations, internal tools, and
            integrations — built with clarity, speed, and quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="/contact" className="inline-flex items-center justify-center rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition">Start a project</a>
            <a href="/what-we-do" className="inline-flex items-center justify-center rounded-xl border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition">See our process</a>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-10 h-80"
            style={{ opacity: heroGlow, background: "radial-gradient(600px 260px at 20% 10%, rgba(37,99,235,0.22), rgba(37,99,235,0) 60%)" }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DESKTOP LAYOUT — numbered pill selector + split panel
      ═══════════════════════════════════════════════════ */}
      <section className="hidden lg:block bg-white px-6 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Trust stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: easeOut }}
            className="flex items-center gap-6 flex-wrap mb-10"
          >
            {TRUST_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && <div className="h-5 w-px bg-black/15" />}
                <div>
                  <span className="text-xl font-semibold text-gray-900 tracking-tight">{stat.value}</span>
                  <span className="ml-1.5 text-sm text-gray-500">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── STICKY PILL SELECTOR BAR ── */}
          {/* Outer sticky wrapper — full bleed so backdrop covers edge-to-edge */}
          <div
            className="sticky z-40 -mx-6 px-6 mb-6"
            style={{
              top: 64, // clears the navbar (adjust to match your navbar height)
              paddingTop: 10,
              paddingBottom: 10,
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(17,24,39,0.07)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Pills */}
              <div className="flex items-center gap-2">
                {SERVICES.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "true" : "false"}
                      className="relative flex items-center gap-2 rounded-full transition-all duration-200"
                      style={{
                        outline: "none",
                        WebkitTapHighlightColor: "transparent",
                        padding: "7px 14px 7px 9px",
                        background: isActive ? s.accentHex : "rgba(17,24,39,0.04)",
                        border: isActive ? `1.5px solid ${s.accentHex}` : "1.5px solid transparent",
                        boxShadow: isActive ? `0 4px 14px ${s.accentHex}40` : "none",
                        transform: isActive ? "scale(1.04)" : "scale(1)",
                      }}
                    >
                      {/* Number circle */}
                      <span
                        className="inline-flex items-center justify-center rounded-full text-[10px] font-bold leading-none flex-shrink-0"
                        style={{
                          width: 19, height: 19,
                          background: isActive ? "rgba(255,255,255,0.25)" : "rgba(17,24,39,0.08)",
                          color: isActive ? "#fff" : "#9ca3af",
                        }}
                      >
                        {i + 1}
                      </span>
                      {/* Emoji icon */}
                      <span className="text-[13px] leading-none">{s.icon}</span>
                      {/* Label */}
                      <span
                        className="text-[12px] font-semibold whitespace-nowrap leading-none"
                        style={{ color: isActive ? "#fff" : "#4b5563" }}
                      >
                        {s.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right side hint */}
              <p className="text-[11px] text-gray-400 font-medium">
                {String(active + 1).padStart(2, "0")} / {SERVICES.length} · Click to explore
              </p>
            </div>
          </div>

          {/* ── CONTENT PANEL — split layout ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.title}
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              exit={reducedMotion ? undefined : "exit"}
              variants={panelVariants}
              transition={{ duration: 0.32, ease: easeOut }}
              className="rounded-3xl border bg-white overflow-hidden"
              style={{
                borderColor: activeService.accentHex + "2a",
                boxShadow: `0 20px 60px rgba(0,0,0,0.08), 0 4px 16px ${activeService.accentHex}12`,
              }}
            >
              {/* Accent top bar */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${activeService.accentHex} 0%, ${activeService.accentHex}55 60%, transparent 100%)` }} />

              <div className="flex min-h-[420px]">

                {/* ── LEFT: Image column — fixed width, full height, sharp crop ── */}
                <div
                  className="relative flex-shrink-0 overflow-hidden"
                  style={{ width: 340 }}
                >
                  <img
                    src={activeService.image}
                    alt={activeService.imageAlt}
                    className="absolute inset-0 w-full h-full"
                    style={{ objectFit: "cover", objectPosition: "center center" }}
                    loading="eager"
                    draggable={false}
                  />
                  {/* Scrim confined to the lower third: enough to carry the
                      overlaid title, without washing the photograph out. */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 100%)" }}
                  />
                  {/* Badge top-left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white"
                      style={{ background: activeService.accentHex, boxShadow: `0 4px 12px ${activeService.accentHex}60` }}
                    >
                      {activeService.icon} {String(active + 1).padStart(2, "0")} / {SERVICES.length}
                    </span>
                  </div>
                  {/* Service name bottom-left */}
                  <div className="absolute bottom-5 left-5 z-10 right-8">
                    <p className="text-white text-[11px] font-semibold uppercase tracking-widest opacity-70 mb-1">Service</p>
                    <h2 className="text-white text-[17px] font-bold leading-snug drop-shadow-sm">{activeService.title}</h2>
                  </div>
                </div>

                {/* ── MIDDLE: Text content ── */}
                <div className="flex-1 min-w-0 px-7 py-7 flex flex-col">
                  {/* Value prop */}
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-6 max-w-lg"
                     style={{ borderLeft: `3px solid ${activeService.accentHex}`, paddingLeft: 12 }}>
                    {activeService.shortValue}
                  </p>

                  {/* Two columns: What We Build | Ideal For + Benefits */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-0 flex-1">

                    {/* Col 1 — What We Build */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: activeService.accentHex }}>
                        What we build
                      </p>
                      <div className="space-y-2">
                        {activeService.whatWeBuild.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <span className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: activeService.accentHex }} />
                            <span className="text-[12.5px] text-gray-700 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Col 2 — Ideal For + Benefits stacked */}
                    <div className="space-y-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: activeService.accentHex }}>
                          Ideal for
                        </p>
                        <div className="space-y-2">
                          {activeService.idealFor.map((item) => (
                            <div key={item} className="flex items-start gap-2">
                              <span className="mt-[4px] text-[8px] flex-shrink-0" style={{ color: activeService.accentHex }}>◆</span>
                              <span className="text-[12.5px] text-gray-700 leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="h-px bg-black/[0.07]" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: activeService.accentHex }}>
                          Benefits
                        </p>
                        <div className="space-y-2">
                          {activeService.benefits.map((item) => (
                            <div key={item} className="flex items-start gap-2">
                              <span className="mt-[1px] text-[12px] font-bold flex-shrink-0" style={{ color: activeService.accentHex }}>✓</span>
                              <span className="text-[12.5px] text-gray-700 leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ── RIGHT: CTA column ── */}
                <div
                  className="flex-shrink-0 flex flex-col justify-between p-6"
                  style={{
                    width: 220,
                    borderLeft: `1px solid ${activeService.accentHex}20`,
                    background: activeService.accentLight,
                  }}
                >
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: activeService.accentHex }}>
                      Get started
                    </p>

                    {/* Primary CTA */}
                    <a
                      href="/contact"
                      className="flex items-center justify-between w-full rounded-xl text-white px-4 py-3.5 text-[13px] font-semibold hover:opacity-90 transition"
                      style={{ background: activeService.accentHex, boxShadow: `0 6px 20px ${activeService.accentHex}45` }}
                    >
                      <span>{activeService.cta}</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>

                    {/* View full page */}
                    <a
                      href={`/services/${activeService.slug}`}
                      className="flex items-center justify-between w-full rounded-xl bg-white px-4 py-3.5 text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition"
                      style={{ border: `1.5px solid ${activeService.accentHex}30` }}
                    >
                      <span>View full page</span>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                        <path d="M2.5 6.5h8M6.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>

                  {/* Quick jump chips */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">Other services</p>
                    <div className="space-y-1.5">
                      {SERVICES.filter((_, i) => i !== active).map((s) => (
                        <button
                          key={s.title}
                          type="button"
                          onClick={() => setActive(SERVICES.indexOf(s))}
                          className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left bg-white/60 hover:bg-white transition"
                          style={{ outline: "none", border: "1px solid rgba(17,24,39,0.07)" }}
                        >
                          <span className="text-[12px]">{s.icon}</span>
                          <span className="text-[11px] text-gray-600 font-medium truncate">{s.shortLabel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MOBILE CARDS — unchanged
      ═══════════════════════════════════════════════════ */}
      {/* Mobile service list. Full-bleed tonal bands rather than a stack of
          identical floating cards — the shade tells you where you are. */}
      <section className={cx(editorialRoot, "lg:hidden bg-white")}>
        <div className="px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: easeOut }}
            className="flex items-center gap-6 flex-wrap mb-8"
          >
            {TRUST_STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                {i > 0 && <div className="h-5 w-px bg-black/15" />}
                <div>
                  <span className="text-xl font-light text-[#050505] tracking-tight">{stat.value}</span>
                  <span className="ml-1.5 text-sm text-[#666666]">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#666666]">
            What we deliver
          </p>
        </div>

        {SERVICES.map((s, i) => {
          const shade = MOBILE_SHADES[i % MOBILE_SHADES.length];
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: easeOut }}
              style={{ background: shade.bg, color: shade.ink }}
              className="px-6 py-14"
            >
              {/* Position marker: the numeral does the work the emoji tile did,
                  and reinforces where you are in the ramp. */}
              <div className="flex items-baseline justify-between">
                <span
                  className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em]"
                  style={{ color: shade.quiet }}
                >
                  {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </span>
                {i === 0 && (
                  <span
                    className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: shade.quiet }}
                  >
                    Most requested
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-[1.75rem] font-extralight leading-[1.15] tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] font-light leading-[1.7]" style={{ color: shade.quiet }}>
                {s.shortValue}
              </p>

              {/* Photograph, uncovered — no colour glow, no wash. */}
              <div className="mt-7 relative w-full aspect-[16/10] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "grayscale(1) contrast(1.04)" }}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>

              <div className="mt-8">
                <p
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: shade.quiet }}
                >
                  What we build
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2.5">
                  {s.whatWeBuild.map((item) => (
                    <span key={item} className="text-[13px] font-light leading-snug">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 h-px w-full" style={{ background: shade.rule }} />

              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6">
                <div>
                  <p
                    className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: shade.quiet }}
                  >
                    Ideal for
                  </p>
                  <ul className="mt-3 space-y-2">
                    {s.idealFor.map((item) => (
                      <li key={item} className="text-[13px] font-light leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p
                    className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: shade.quiet }}
                  >
                    Benefits
                  </p>
                  <ul className="mt-3 space-y-2">
                    {s.benefits.map((item) => (
                      <li key={item} className="text-[13px] font-light leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-[13px] font-normal tracking-wide transition-colors duration-300"
                  style={{ background: shade.ink, color: shade.bg }}
                >
                  {s.cta}
                </a>
                <a
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-[13px] font-normal tracking-wide border transition-colors duration-300"
                  style={{ borderColor: shade.rule, color: shade.ink }}
                >
                  View full page
                  <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* ─── CONVERSION STRIP ─── */}
      <section className="bg-white px-6 py-0">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65, ease: easeOut }}
            className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-gray-50 px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true" style={{ background: "radial-gradient(700px 300px at 0% 50%, rgba(37,99,235,0.06), transparent 60%)" }} />
            <div className="relative z-10">
              <p className="text-[13px] text-gray-500 uppercase tracking-widest font-semibold">Ready to build?</p>
              <p className="mt-1 text-xl font-semibold text-gray-900 leading-snug">Tell us what you need. We'll scope it in 24 hours.</p>
            </div>
            <div className="relative z-10 flex items-center gap-3 flex-shrink-0">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition">Start a project <span aria-hidden>→</span></a>
              <a href="/contact" className="text-sm text-gray-500 hover:text-gray-800 transition">or book a call</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="bg-white px-4 sm:px-6 pb-24 pt-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.7, ease: easeOut }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[34px] sm:rounded-[44px] px-6 sm:px-10 py-10 sm:py-12 shadow-[0_40px_120px_rgba(0,0,0,0.20)] border border-black/10" style={{ background: "#2B1B12" }}>
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -top-32 -left-40 h-[420px] w-[420px] rounded-full blur-3xl opacity-70" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-70" style={{ background: "rgba(37,99,235,0.14)" }} />
              </div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-widest text-white/65">Capabilities</p>
                    <h3 className="mt-3 text-2xl md:text-3xl font-medium text-white">A full-spectrum delivery team — from strategy to launch.</h3>
                    <p className="mt-3 text-white/75 leading-relaxed">We don't just build. We help you make the right decisions, ship faster, and scale with confidence.</p>
                  </div>
                  <a href="/#contact" className="inline-flex items-center justify-center rounded-xl bg-white text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition">Talk to us</a>
                </div>
                <div className="mt-10">
                  <div className="relative hidden md:block">
                    <motion.div
                      className="flex gap-3 whitespace-nowrap"
                      animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
                      transition={reducedMotion ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
                      style={{ willChange: "transform" }}
                    >
                      {[...CAPABILITIES, ...CAPABILITIES].map((item, idx) => (
                        <span key={`${item}-${idx}`} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85">
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-300/90" />{item}
                        </span>
                      ))}
                    </motion.div>
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-16" style={{ background: "linear-gradient(to right, #2B1B12, rgba(43,27,18,0))" }} />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-16" style={{ background: "linear-gradient(to left, #2B1B12, rgba(43,27,18,0))" }} />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, ease: easeOut }}
                    className="mt-0 md:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {CAPABILITIES.slice(0, 12).map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, ease: easeOut, delay: Math.min(i * 0.03, 0.18) }}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-blue-300/90" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <div className="h-px w-[96%] sm:w-[92%] bg-black/10" />
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        button:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; border-radius: 99px; }
        a:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; border-radius: 10px; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </main>
  );
}