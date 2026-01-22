"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Inter } from "next/font/google";

const bodyFont = Inter({ subsets: ["latin"], weight: "400" });

const SERVICES = [
  {
    icon: "💻",
    title: "Custom Software Development",
    description:
      "We build scalable web and mobile applications tailored to your business needs — from MVPs to full platforms.",
    bullets: ["MVPs & product builds", "Web apps & mobile apps", "Scalable architecture"],
    image: "/services/software.jpg",
    accent: "rgba(37,99,235,0.22)",
  },
  {
    icon: "🌐",
    title: "Web & Digital Platforms",
    description:
      "Modern, high-performance websites and platforms designed to convert, scale, and represent your brand globally.",
    bullets: ["Marketing sites that convert", "Dashboards & portals", "Performance + SEO first"],
    image: "/services/web.jpg",
    accent: "rgba(20,184,166,0.18)",
  },
  {
    icon: "🤖",
    title: "AI & Business Automations",
    description:
      "Smart systems that automate workflows, improve efficiency, and unlock new growth opportunities.",
    bullets: ["AI assistants & agents", "Workflow automation", "Integrations + orchestration"],
    image: "/services/ai.jpg",
    accent: "rgba(168,85,247,0.18)",
  },
  {
    icon: "📊",
    title: "Internal Tools & CRMs",
    description: "Custom dashboards, CRMs, and internal tools that help teams work faster and smarter.",
    bullets: ["Admin panels & internal apps", "CRMs & pipelines", "Role-based access + security"],
    image: "/services/tools.jpg",
    accent: "rgba(245,158,11,0.16)",
  },
  {
    icon: "🔗",
    title: "Integrations & APIs",
    description: "We connect systems, services, and data seamlessly using secure and reliable integrations.",
    bullets: ["REST/GraphQL APIs", "3rd-party integrations", "Data sync + reliability"],
    image: "/services/integrations.png",
    accent: "rgba(59,130,246,0.18)",
  },
] as const;

const CAPABILITIES = [
  "Product strategy & MVP planning",
  "UI/UX design & prototyping",
  "Design systems",
  "Web apps (Next.js / React)",
  "Mobile apps (iOS / Android)",
  "Backend & APIs (REST/GraphQL)",
  "AI automations & agents",
  "Integrations (Stripe, CRM, etc.)",
  "Dashboards & internal tools",
  "Cloud deployment & DevOps",
  "Performance optimization",
  "Maintenance & support",
  "Security best practices",
  "Analytics & tracking setup",
] as const;

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

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

  const scrubRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [cursorY, setCursorY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrubRef,
    offset: ["start 0.8", "end 0.25"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.6,
  });

  // ✅ Build-safe: no @ts-expect-error. Works across framer-motion versions.
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const unsub = smoothProgress.on("change", (p) => {
      const idx = Math.round(p * (SERVICES.length - 1));
      setActive(clamp(idx, 0, SERVICES.length - 1));
    });

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [reducedMotion, isMobile, smoothProgress]);

  useEffect(() => {
    const listEl = listRef.current;
    const itemEl = itemRefs.current[active];
    if (!listEl || !itemEl) return;

    const listBox = listEl.getBoundingClientRect();
    const itemBox = itemEl.getBoundingClientRect();
    setCursorY(itemBox.top - listBox.top + itemBox.height / 2);
  }, [active]);

  const activeService = SERVICES[active];

  const panelVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10, scale: 0.99, filter: "blur(6px)" },
      visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      exit: { opacity: 0, y: -8, scale: 0.99, filter: "blur(6px)" },
    }),
    []
  );

  const heroY = useTransform(smoothProgress, [0, 1], [0, -10]);
  const heroGlow = useTransform(smoothProgress, [0, 1], [0.22, 0.08]);

  const handleMobileView = (i: number) => {
    setActive(i);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <main className="w-full bg-white text-black" style={{ fontFamily: bodyFont.style.fontFamily }}>
      <section ref={scrubRef} className="relative px-6 pt-28 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-sm uppercase tracking-widest text-gray-500"
          >
            Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.06 }}
            className="mt-3 text-4xl md:text-6xl font-medium leading-[1.05] text-gray-900 max-w-4xl"
            style={{ y: heroY }}
          >
            Everything you need to build, launch, and scale a modern product.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.12 }}
            className="mt-5 text-gray-600 max-w-2xl leading-relaxed"
          >
            GITS partners with startups and teams globally to deliver websites, apps, automations, internal tools, and
            integrations — built with clarity, speed, and quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Start a project
            </a>
            <a
              href="/what-we-do"
              className="inline-flex items-center justify-center rounded-xl border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition"
            >
              See our process
            </a>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-10 h-80"
            style={{
              opacity: heroGlow,
              background: "radial-gradient(600px 260px at 20% 10%, rgba(37,99,235,0.22), rgba(37,99,235,0) 60%)",
            }}
          />

          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="text-sm uppercase tracking-widest text-gray-500"
              >
                What we deliver
              </motion.p>

              <div className="hidden lg:block mt-6 relative">
                <div ref={listRef} className="relative space-y-2 pl-6">
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-black/10" aria-hidden="true" />

                  <motion.div
                    aria-hidden="true"
                    className="absolute left-[6px] h-3 w-3 rounded-full bg-blue-600 shadow-[0_10px_30px_rgba(37,99,235,0.35)]"
                    animate={reducedMotion ? undefined : { y: cursorY - 6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    style={{ top: 0 }}
                  />

                  {SERVICES.map((s, i) => {
                    const isActive = i === active;

                    return (
                      <button
                        key={s.title}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        className="w-full text-left"
                        aria-current={isActive ? "true" : "false"}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        <motion.div
                          layout
                          initial={false}
                          animate={{
                            backgroundColor: isActive ? "rgba(17,24,39,0.04)" : "rgba(255,255,255,0)",
                            borderColor: isActive ? "rgba(37,99,235,0.25)" : "rgba(17,24,39,0.10)",
                            y: isActive ? -1 : 0,
                          }}
                          transition={{ duration: 0.28, ease: easeOut }}
                          className="group relative rounded-2xl border px-6 py-5 will-change-transform"
                          style={{
                            boxShadow: isActive
                              ? "0 18px 50px rgba(0,0,0,0.10), 0 6px 18px rgba(37,99,235,0.10)"
                              : "0 10px 28px rgba(0,0,0,0.06)",
                          }}
                        >
                          <motion.div
                            initial={false}
                            animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.6 }}
                            transition={{ duration: 0.28, ease: easeOut }}
                            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                            style={{ background: "#2563eb" }}
                          />

                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white text-lg shadow-sm">
                              {s.icon}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-3">
                                <h2
                                  className="text-xl font-medium text-gray-900"
                                  style={{ textShadow: isActive ? "0 0 18px rgba(37,99,235,0.18)" : "none" }}
                                >
                                  {s.title}
                                </h2>

                                <span
                                  className="text-xs px-2 py-1 rounded-full border"
                                  style={{
                                    borderColor: isActive ? "rgba(37,99,235,0.25)" : "rgba(17,24,39,0.14)",
                                    color: isActive ? "#1d4ed8" : "rgba(17,24,39,0.6)",
                                  }}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                              </div>

                              <p className="mt-2 text-gray-600 leading-relaxed line-clamp-2">{s.description}</p>
                            </div>
                          </div>

                          <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-2xl"
                            initial={false}
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 0.25, ease: easeOut }}
                            style={{
                              background:
                                "radial-gradient(500px 140px at 20% 10%, rgba(37,99,235,0.10), rgba(37,99,235,0) 60%)",
                            }}
                          />
                        </motion.div>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-sm text-gray-500">Just scroll — the cursor glides and the preview updates automatically.</p>
              </div>

              <div className="lg:hidden mt-6 relative">
                <div className="pointer-events-none absolute -inset-6" aria-hidden="true">
                  <div className="absolute -top-6 left-2 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="absolute top-28 right-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
                  <div className="absolute bottom-0 left-10 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />
                </div>

                <div className="relative space-y-6">
                  {SERVICES.map((s, i) => {
                    const isActive = i === active;
                    const alignRight = i % 2 === 0;

                    return (
                      <div key={s.title} className={`flex ${alignRight ? "justify-end" : "justify-start"}`}>
                        <button
                          ref={(el) => {
                            itemRefs.current[i] = el;
                          }}
                          type="button"
                          onClick={() => setActive(i)}
                          className="text-left"
                          aria-current={isActive ? "true" : "false"}
                          style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 10, x: alignRight ? 18 : -18 }}
                            whileInView={{ opacity: 1, y: 0, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: easeOut }}
                            className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-6 will-change-transform"
                            style={{
                              width: "min(92vw, 520px)",
                              boxShadow: isActive
                                ? "0 26px 70px rgba(0,0,0,0.14), 0 8px 18px rgba(0,0,0,0.06)"
                                : "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
                            }}
                          >
                            <div
                              className="absolute -top-24 -left-24 h-56 w-56 rounded-full blur-3xl"
                              style={{ background: s.accent, opacity: isActive ? 1 : 0.55 }}
                              aria-hidden="true"
                            />

                            <div className="relative z-10 flex items-start gap-4">
                              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white text-lg">
                                {s.icon}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-medium text-gray-900">{s.title}</h3>

                                  <span
                                    className="text-[11px] px-2 py-1 rounded-full border"
                                    style={{
                                      borderColor: isActive ? "rgba(37,99,235,0.25)" : "rgba(17,24,39,0.14)",
                                      color: isActive ? "#1d4ed8" : "rgba(17,24,39,0.6)",
                                    }}
                                  >
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                </div>

                                <p className="mt-2 text-gray-600 leading-relaxed">{s.description}</p>

                                <div
                                  className="mt-4 h-[2px] w-10"
                                  style={{ background: isActive ? "#2563eb" : "rgba(17,24,39,0.18)" }}
                                />

                                <div className={`mt-4 flex ${alignRight ? "justify-end" : "justify-start"}`}>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMobileView(i);
                                    }}
                                    className="rounded-full border border-black/10 bg-black text-white px-4 py-2 text-xs font-medium hover:opacity-90 transition"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>

                            <motion.div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0"
                              initial={false}
                              animate={{ opacity: isActive ? 1 : 0 }}
                              transition={{ duration: 0.25, ease: easeOut }}
                              style={{
                                background:
                                  "radial-gradient(500px 180px at 20% 20%, rgba(37,99,235,0.10), rgba(37,99,235,0) 60%)",
                              }}
                            />
                          </motion.div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div ref={panelRef} className="scroll-mt-24">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.title}
                    initial={reducedMotion ? false : "hidden"}
                    animate="visible"
                    exit={reducedMotion ? undefined : "exit"}
                    variants={panelVariants}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className="relative overflow-hidden rounded-3xl border border-black/10 bg-gray-100 shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      {/* Note: <img> is fine for build. If you want Next/Image later, we can swap safely. */}
                      <img
                        src={activeService.image}
                        alt={activeService.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                      <motion.div
                        aria-hidden="true"
                        className="absolute -inset-24"
                        style={{
                          background: `radial-gradient(circle at 30% 25%, ${activeService.accent}, rgba(37,99,235,0) 55%)`,
                        }}
                        animate={reducedMotion ? undefined : { x: [0, 18, -10, 0], y: [0, -12, 14, 0] }}
                        transition={reducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      />

                      <div className="absolute left-0 right-0 bottom-0 p-6 md:p-7">
                        <div className="flex items-center gap-3">
                          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white text-lg backdrop-blur">
                            {activeService.icon}
                          </div>
                          <div>
                            <p className="text-white/80 text-sm">Service</p>
                            <h3 className="text-white text-xl md:text-2xl font-medium">{activeService.title}</h3>
                          </div>
                        </div>

                        <p className="mt-4 text-white/85 leading-relaxed max-w-xl">{activeService.description}</p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {activeService.bullets.map((b) => (
                            <span
                              key={b}
                              className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/15 backdrop-blur"
                            >
                              {b}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6">
                          <a
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                          >
                            Start a project <span aria-hidden>→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-14 h-px w-full bg-black/10" />
        </div>
      </section>

      <section className="bg-white px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-[34px] sm:rounded-[44px] px-6 sm:px-10 py-10 sm:py-12 shadow-[0_40px_120px_rgba(0,0,0,0.20)] border border-black/10"
              style={{ background: "#2B1B12", marginLeft: "auto", marginRight: "auto", maxWidth: "100%" }}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div
                  className="absolute -top-32 -left-40 h-[420px] w-[420px] rounded-full blur-3xl opacity-70"
                  style={{ background: "rgba(255, 255, 255, 0.08)" }}
                />
                <div
                  className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-70"
                  style={{ background: "rgba(37,99,235,0.14)" }}
                />
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background:
                      "radial-gradient(1200px 600px at 20% 10%, rgba(255,255,255,0.10), rgba(255,255,255,0) 55%)",
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-widest text-white/65">Capabilities</p>
                    <h3 className="mt-3 text-2xl md:text-3xl font-medium text-white">
                      A full-spectrum delivery team — from strategy to launch.
                    </h3>
                    <p className="mt-3 text-white/75 leading-relaxed">
                      We don’t just build. We help you make the right decisions, ship faster, and scale with confidence.
                    </p>
                  </div>

                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center rounded-xl bg-white text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition"
                  >
                    Talk to us
                  </a>
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
                        <span
                          key={`${item}-${idx}`}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85"
                        >
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-300/90" />
                          {item}
                        </span>
                      ))}
                    </motion.div>

                    <div
                      className="pointer-events-none absolute left-0 top-0 h-full w-16"
                      style={{ background: "linear-gradient(to right, #2B1B12, rgba(43,27,18,0))" }}
                    />
                    <div
                      className="pointer-events-none absolute right-0 top-0 h-full w-16"
                      style={{ background: "linear-gradient(to left, #2B1B12, rgba(43,27,18,0))" }}
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="mt-0 md:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {CAPABILITIES.slice(0, 12).map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.55, ease: easeOut, delay: Math.min(i * 0.03, 0.18) }}
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

      {/* ✅ Build-safe: avoid styled-jsx Turbopack edge cases by using a plain <style> tag */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}