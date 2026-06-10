"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Inter } from "next/font/google";

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
    image: "/services/software.jpg",
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
    image: "/services/web.jpg",
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
    image: "/services/ai.jpg",
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
    image: "/services/tools.jpg",
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
    slug: "integrations-api",
    whatWeBuild: ["Payment integrations (Stripe, Paystack)","REST & GraphQL API development","CRM & marketing integrations","WhatsApp & email integrations","Data synchronization pipelines","Third-party service integrations","Custom automation workflows","Webhook and event systems"],
    idealFor: ["E-commerce businesses needing smooth checkout","SaaS platforms expanding capabilities","Organizations using multiple disconnected tools","Growing companies ready to automate"],
    benefits: ["Reduced duplicate data entry","Better data accuracy across systems","Faster business processes end-to-end","Easier scalability as you grow"],
    image: "/services/integrations.png",
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
                  {/* Dark gradient right-edge fade into content */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to right, transparent 40%, rgba(255,255,255,0.97) 100%)" }}
                  />
                  {/* Bottom overlay with service name */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }}
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
      <section className="lg:hidden bg-white px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: easeOut }}
            className="flex items-center gap-6 flex-wrap mb-8"
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
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-6">What we deliver</p>
          <div className="space-y-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, ease: easeOut }}
                className="relative overflow-hidden rounded-3xl border border-black/10 bg-white"
                style={{ boxShadow: i === 0 ? `0 20px 60px rgba(0,0,0,0.12), 0 6px 20px ${s.accentHex}22` : "0 8px 32px rgba(0,0,0,0.07)" }}
              >
                {i === 0 && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white" style={{ background: s.accentHex }}>★ Most requested</span>
                  </div>
                )}
                <div className="relative w-full aspect-[16/8] overflow-hidden">
                  <img src={s.image} alt={s.imageAlt} className="absolute inset-0 h-full w-full object-cover" loading={i === 0 ? "eager" : "lazy"} draggable={false} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.20) 50%, transparent 100%)" }} />
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: `radial-gradient(500px 280px at 0% 100%, ${s.accent}, transparent 60%)` }} />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accentHex }} />
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute left-4 right-4 bottom-4 flex items-end gap-3 z-10">
                    <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur text-xl border border-white/15">{s.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold text-[18px] leading-tight">{s.title}</h3>
                      <p className="text-white/70 text-[13px] leading-snug mt-0.5">{s.shortValue}</p>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-6 pt-5 space-y-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">What We Build</p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                      {s.whatWeBuild.map((item) => (
                        <div key={item} className="flex items-start gap-1.5">
                          <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: s.accentHex }} />
                          <span className="text-[13px] text-gray-700 leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-px w-full bg-black/[0.07]" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2.5">Ideal For</p>
                      <ul className="space-y-2">
                        {s.idealFor.map((item) => (
                          <li key={item} className="flex items-start gap-1.5">
                            <span className="mt-[5px] text-[9px] flex-shrink-0" style={{ color: s.accentHex }}>◆</span>
                            <span className="text-[13px] text-gray-700 leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2.5">Benefits</p>
                      <ul className="space-y-2">
                        {s.benefits.map((item) => (
                          <li key={item} className="flex items-start gap-1.5">
                            <span className="mt-[3px] text-[13px] flex-shrink-0 font-medium" style={{ color: s.accentHex }}>✓</span>
                            <span className="text-[13px] text-gray-700 leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="h-px w-full bg-black/[0.07]" />
                  <div className="flex items-center gap-3 flex-wrap">
                    <a href="/contact" className="inline-flex items-center gap-2 rounded-xl text-white px-5 py-2.5 text-[13px] font-semibold hover:opacity-90 transition" style={{ background: s.accentHex }}>
                      {s.cta} <span aria-hidden>→</span>
                    </a>
                    <a href={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition" style={{ borderColor: "rgba(17,24,39,0.14)" }}>
                      View full page
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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