"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease, delay: d },
  }),
};

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

function BlueWave({ flip = false }: { flip?: boolean }) {
  return (
    <div className={flip ? "rotate-180" : ""} aria-hidden="true">
      <svg viewBox="0 0 1440 90" className="block w-full h-[52px] sm:h-[70px] md:h-[90px]">
        <defs>
          <linearGradient id="gitsWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,0,0,0.07)" />
            <stop offset="55%" stopColor="rgba(0,0,0,0.035)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.07)" />
          </linearGradient>
        </defs>
        <path
          d="M0,64L60,58.7C120,53,240,43,360,32C480,21,600,11,720,16C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,90L1380,90C1320,90,1200,90,1080,90C960,90,840,90,720,90C600,90,480,90,360,90C240,90,120,90,60,90L0,90Z"
          fill="url(#gitsWave)"
        />
      </svg>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs sm:text-sm text-gray-800">
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-black/75" />
      {children}
    </span>
  );
}

function SellingCard({
  eyebrow,
  title,
  desc,
  bullets,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-[26px] border border-black/10 bg-white p-6 sm:p-7"
      style={{
        boxShadow: "0 18px 44px rgba(0,0,0,0.07), 0 2px 10px rgba(0,0,0,0.04)",
        willChange: "transform",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22 }}
    >
      <div className="flex items-baseline gap-3">
        <div className="text-[11px] uppercase tracking-widest text-gray-500">{eyebrow}</div>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      <h3 className="mt-4 text-lg sm:text-xl font-medium tracking-tight text-gray-900">{title}</h3>
      <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{desc}</p>

      <div className="mt-5 grid gap-2">
        {bullets.map((b) => (
          <div key={b} className="flex items-start gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/80" />
            <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BlueprintCard({
  title,
  tag,
  desc,
  img,
  chips,
  wide,
}: {
  title: string;
  tag: string;
  desc: string;
  img: string;
  chips: string[];
  wide?: boolean;
}) {
  if (wide) {
    return (
      <motion.article
        variants={fadeUp}
        className={cx(
          "group relative overflow-hidden rounded-[28px] border border-white/10 bg-black md:col-span-2",
          "grid md:grid-cols-2"
        )}
        style={{
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.32), 0 10px 26px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.07)",
          willChange: "transform",
        }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.22 }}
      >
        <div className="relative h-56 sm:h-64 md:h-[320px]">
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={false}
            quality={96}
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl bg-white/10" />
          </div>
        </div>

        <div className="relative p-6 sm:p-7 md:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "90px 90px",
            }}
          />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-widest text-white/55">{tag}</p>
              <span className="text-xs text-white/35 group-hover:text-white/70 transition">→</span>
            </div>

            <h3 className="mt-2 text-xl sm:text-2xl font-medium tracking-tight text-white">{title}</h3>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">{desc}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/75"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-6 h-px bg-white/10" />
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={fadeUp}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-black md:col-span-1"
      style={{
        boxShadow:
          "0 40px 120px rgba(0,0,0,0.32), 0 10px 26px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.07)",
        willChange: "transform",
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22 }}
    >
      <div className="relative h-52 sm:h-56 md:h-60">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
          quality={96}
        />

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl bg-white/10" />
        </div>
      </div>

      <div className="relative p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-widest text-white/55">{tag}</p>
          <span className="text-xs text-white/35 group-hover:text-white/70 transition">→</span>
        </div>

        <h3 className="mt-2 text-lg sm:text-xl font-medium tracking-tight text-white">{title}</h3>
        <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed">{desc}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/75"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function StepRailItem({
  idx,
  title,
  text,
  active,
  onClick,
}: {
  idx: number;
  title: string;
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "w-full text-left rounded-2xl border px-4 py-4 transition",
        active ? "border-black/25 bg-black/[0.035]" : "border-black/10 bg-white hover:bg-black/[0.02]"
      )}
      style={{ willChange: "transform" }}
    >
      <div className="flex items-start gap-3">
        <div
          className={cx(
            "h-9 w-9 rounded-xl border grid place-items-center text-xs font-medium transition",
            active ? "border-black/25 bg-white" : "border-black/10 bg-white"
          )}
        >
          {String(idx + 1).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">{text}</p>
        </div>
      </div>
    </button>
  );
}

function useActiveStepFromAnchors(anchorCount: number) {
  const [active, setActive] = useState(0);
  const anchorsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const nodes = anchorsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible) {
          const idx = Number((visible.target as HTMLElement).dataset.step ?? "0");
          setActive(idx);
        }
      },
      {
        root: null,
        rootMargin: "-34% 0px -56% 0px",
        threshold: [0.15, 0.35, 0.55],
      }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const setAnchor = (idx: number) => (el: HTMLDivElement | null) => {
    anchorsRef.current[idx] = el;
  };

  const scrollTo = (idx: number) => {
    const el = anchorsRef.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return { active, setAnchor, scrollTo, setActive };
}

function MediaMosaic() {
  const reduceMotion = useReducedMotion();

  const images = useMemo(
    () => [
      "/projects/showcase-1.jpg",
      "/projects/showcase-2.jpg",
      "/projects/showcase-3.jpg",
      "/projects/showcase-4.jpg",
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const openAt = (idx: number) => {
    setActiveIdx(idx);
    setOpen(true);
  };

  const close = () => setOpen(false);
  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 rounded-[28px] border border-black/10 bg-white"
            style={{ transform: "translate(10px, 10px)" }}
          />
          <div
            className="absolute inset-0 rounded-[28px] border border-black/10 bg-white"
            style={{ transform: "translate(5px, 5px)" }}
          />
        </div>

        <div className="relative rounded-[28px] border border-black/10 bg-white p-3 sm:p-4">
          <div className="grid gap-3 sm:gap-4 grid-cols-2">
            {images.map((src, i) => {
              const isHero = i === 0;

              return (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => openAt(i)}
                  className={cx(
                    "group relative overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] text-left",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2",
                    isHero ? "col-span-2 h-44 sm:h-56" : "h-36 sm:h-44"
                  )}
                  style={{
                    boxShadow: "0 18px 55px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
                    willChange: "transform",
                  }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.18 }}
                >
                  <Image
                    src={src}
                    alt={`UI preview ${i + 1}`}
                    fill
                    sizes={isHero ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover"
                    priority={i === 0}
                    quality={96}
                  />

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                    <div className="absolute inset-0 bg-white/5" />
                  </div>

                  <div className="absolute left-3 bottom-3">
                    <div className="rounded-full border border-black/10 bg-white/90 px-3 py-1.5 backdrop-blur">
                      <p className="text-[11px] text-gray-900">Preview {String(i + 1).padStart(2, "0")}</p>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 rounded-full border border-black/10 bg-white/90 px-2.5 py-2 backdrop-blur">
                    <span className="text-[10px] text-gray-900">↗</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <motion.button
              type="button"
              onClick={close}
              className="absolute inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close preview"
            />

            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.99 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease }}
                className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/12 bg-black shadow-[0_50px_140px_rgba(0,0,0,0.55)]"
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-5 py-3">
                  <p className="text-xs text-white/70">
                    {String(activeIdx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs text-white/85 hover:bg-white/10 transition"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs text-white/85 hover:bg-white/10 transition"
                    >
                      Next →
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs text-white/85 hover:bg-white/10 transition"
                    >
                      Close ✕
                    </button>
                  </div>
                </div>

                <div className="relative aspect-[16/10] w-full bg-black">
                  <Image
                    src={images[activeIdx]}
                    alt={`UI preview large ${activeIdx + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                    quality={100}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** ✅ UPDATED: testimonials now use avatar images + colored names */
function TestimonialCard({
  emoji,
  title,
  quote,
  name,
  meta,
  avatarSrc,
  nameTone = "dark",
}: {
  emoji: string;
  title: string;
  quote: string;
  name: string;
  meta: string;
  avatarSrc: string;
  nameTone?: "dark" | "white";
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-[28px] border border-black/10 bg-white p-6 sm:p-7"
      style={{
        boxShadow: "0 22px 60px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
        willChange: "transform",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22 }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-900">
          <span className="mr-2">{emoji}</span>
          {title}
        </p>
        <span className="text-xs text-gray-400">★★★★★</span>
      </div>

      <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">“{quote}”</p>

      <div className="mt-5 h-px bg-black/10" />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-10 w-10 rounded-2xl overflow-hidden border border-black/10 bg-black/[0.03]">
            <Image src={avatarSrc} alt={name} fill sizes="40px" className="object-cover" quality={95} />
          </div>

          <div className="min-w-0">
            <p
              className={cx(
                "text-sm font-medium leading-tight truncate",
                nameTone === "white" ? "text-white" : "text-gray-900"
              )}
            >
              {name}
            </p>
            <p className={cx("mt-1 text-xs truncate", nameTone === "white" ? "text-white/70" : "text-gray-500")}>
              {meta}
            </p>
          </div>
        </div>

        <span className={cx("text-xs", nameTone === "white" ? "text-white/40" : "text-gray-400")}>Verified</span>
      </div>

      {/* subtle color strip so the section feels more alive */}
      <div className="mt-5 h-[3px] w-full rounded-full bg-gradient-to-r from-black/10 via-black/5 to-black/10" />
    </motion.div>
  );
}

export default function WhatWeBuildPage() {
  const reduceMotion = useReducedMotion();

  const categories = useMemo(
    () => [
      "Websites that convert",
      "Mobile apps",
      "Dashboards & admin",
      "Chrome extensions",
      "Automation systems",
      "Product design + UI kits",
    ],
    []
  );

  const blueprints = useMemo(
    () => [
      {
        title: "Lead-First Website Blueprint",
        tag: "Website",
        desc:
          "A conversion-first structure with clear messaging, trust signals, and a path that moves visitors to action — designed to feel premium and load fast.",
        img: "/projects/blueprint-website.jpg",
        chips: ["Messaging + layout", "Speed", "Trust signals"],
        wide: true,
      },
      {
        title: "SaaS Dashboard Blueprint",
        tag: "Dashboard",
        desc:
          "Operational UI designed for real teams: calm hierarchy, roles, audit trails, and reliable data flows for day-to-day work.",
        img: "/projects/blueprint-dashboard.jpg",
        chips: ["RBAC", "Audit logs", "Data UX"],
      },
      {
        title: "Mobile MVP Blueprint",
        tag: "Mobile",
        desc:
          "A focused MVP flow that validates the core loop, with a clean foundation that won’t fight you when it’s time to scale v2.",
        img: "/projects/blueprint-mobile.jpg",
        chips: ["MVP flow", "Retention", "Stable foundation"],
      },
      {
        title: "Chrome Extension Blueprint",
        tag: "Extension",
        desc:
          "A lightweight tool that lives inside the workflow — with clear UX and safe permissions, designed for reliability and speed.",
        img: "/projects/blueprint-extension.jpg",
        chips: ["Permissions", "UX clarity", "Backend sync"],
      },
    ],
    []
  );

  const process = useMemo(
    () => [
      {
        k: "Discovery that removes guessing",
        t: "We align the build to one clear outcome.",
        body:
          "We define success (leads, sign-ups, retention) and map the shortest user journey to get there. That’s how we keep v1 sharp and avoid overbuilding.",
        bullets: ["Offer + goal clarity", "User journey map", "Scope + risk alignment"],
      },
      {
        k: "UX that earns trust fast",
        t: "We design hierarchy that guides attention.",
        body:
          "Not decoration—direction. We craft calm layouts, strong typography, and friction-free flows so users understand the value quickly and act with confidence.",
        bullets: ["Conversion-first structure", "Reusable UI patterns", "Accessibility baseline"],
      },
      {
        k: "Engineering that stays stable",
        t: "We build clean systems that don’t crack under growth.",
        body:
          "Performance, maintainability, and predictable integrations. When automation is needed, we ship guardrails: logs, approvals, fallbacks, safe retries.",
        bullets: ["Performance budget", "Secure patterns", "Deploy + monitoring basics"],
      },
      {
        k: "Launch + iteration",
        t: "We measure what matters and improve the next release.",
        body:
          "We instrument the product so you can see drop-offs and bottlenecks—then iterate with intention (not guesswork).",
        bullets: ["Analytics events", "Friction fixes", "Roadmap for v2"],
      },
    ],
    []
  );

  const { active, setAnchor, scrollTo, setActive } = useActiveStepFromAnchors(process.length);

  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="relative px-5 sm:px-6 pt-24 pb-10 md:pt-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-28 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-black/[0.05] blur-3xl" />
          <div className="absolute top-56 -left-28 h-[520px] w-[520px] rounded-full bg-black/[0.035] blur-3xl" />
          <div className="absolute -bottom-12 right-[-120px] h-[560px] w-[560px] rounded-full bg-black/[0.04] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
              backgroundSize: "84px 84px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center text-xs sm:text-sm uppercase tracking-widest text-gray-500"
          >
            What we build
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.06}
            className="mt-4 text-center text-[2.15rem] leading-[1.05] sm:text-4xl md:text-6xl font-medium tracking-tight"
          >
            We build digital products that <span className="text-black">sell clearly</span> and{" "}
            <span className="text-black">scale cleanly</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.12}
            className="mt-5 text-center text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
          >
            GITS helps founders, startups, and teams launch websites, mobile apps, dashboards, and extensions with
            strong UX, stable engineering, and automation that doesn’t break in production.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.18}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {categories.map((c) => (
              <Pill key={c}>{c}</Pill>
            ))}
          </motion.div>

          {/* WHY CHOOSE GITS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.24}
            className="mt-10 grid gap-5 lg:grid-cols-[1.1fr,0.9fr] items-start"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <SellingCard
                eyebrow="01 • Product thinking"
                title="We build what moves the needle"
                desc="Not “features.” We map the clearest user journey from attention → trust → action."
                bullets={["Sharp messaging + hierarchy", "Clear CTAs and conversion points", "Scope trimmed to a strong v1"]}
              />
              <SellingCard
                eyebrow="02 • Premium execution"
                title="Design that feels finished"
                desc="Calm layouts, strong typography, and micro-interactions that make your product feel credible."
                bullets={["Design system consistency", "Mobile-first responsiveness", "Clean motion (not noise)"]}
              />
              <SellingCard
                eyebrow="03 • Engineering that scales"
                title="Stable systems from day one"
                desc="Clean architecture + reliable integrations so your product doesn’t become fragile later."
                bullets={["Performance-first builds", "Predictable integrations + guardrails", "Deployment + monitoring basics"]}
              />
            </div>

            <div
              className="rounded-[28px] border border-black/10 bg-white p-6 sm:p-7"
              style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.07), 0 2px 10px rgba(0,0,0,0.04)" }}
            >
              <p className="text-sm uppercase tracking-widest text-gray-500">Best place to start</p>
              <h2 className="mt-3 text-xl sm:text-2xl font-medium leading-tight">
                We’ll tell you what to fix first — and why.
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                Get a free audit that highlights friction hurting trust, conversions, and speed—then a clear priority list you can act on.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/get-free-audit"
                  className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition active:scale-[0.99]"
                >
                  Get free audit →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BlueWave />

      {/* TESTIMONIALS */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500">Testimonials</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-medium">What people say after working with us</h2>
            <p className="mt-3 text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
              We keep things human: clear communication, clean delivery, and a product that feels “right” when you use it.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="mt-8 grid gap-5 md:grid-cols-3"
          >
            <TestimonialCard
              emoji="🐾"
              title="Pet Website"
              quote="Our site finally feels warm and trustworthy. The layout is clean, the pages load fast, and customers actually find what they need without asking questions. The little details made a big difference."
              name="Aisha"
              meta="Pet services • Website refresh"
              avatarSrc="/people/aisha.jpg"
              nameTone="dark"
            />
            <TestimonialCard
              emoji="🧩"
              title="Chrome Extension"
              quote="The extension feels lightweight and polished. It’s simple for users, but the logic under the hood is solid. We also appreciated how clearly everything was explained during delivery."
              name="Chinedu"
              meta="Product team • Chrome extension"
              avatarSrc="/people/chinedu.jpg"
              nameTone="dark"
            />
            <TestimonialCard
              emoji="📅"
              title="Scheduling Dashboard"
              quote="We went from messy scheduling to a calm system the team can actually use. The dashboard is fast, the flow makes sense, and the work feels structured instead of rushed."
              name="Sarah"
              meta="Operations • Internal dashboard"
              avatarSrc="/people/sarah.jpg"
              nameTone="dark"
            />
          </motion.div>

          {/* VISUAL PREVIEW */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="mt-10"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr,1fr] items-start">
              <div
                className="rounded-[28px] border border-black/10 bg-white p-6 sm:p-7"
                style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.07), 0 2px 10px rgba(0,0,0,0.04)" }}
              >
                <p className="text-sm uppercase tracking-widest text-gray-500">Visuals</p>
                <h3 className="mt-3 text-xl sm:text-2xl font-medium leading-tight">
                  A quick look at the UI quality we aim for
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                  Tap any image to preview it in full clarity.
                </p>
              </div>

              <MediaMosaic />
            </div>
          </motion.div>
        </div>
      </section>

      <BlueWave flip />

      {/* BLUEPRINTS */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500">Blueprints</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-medium">Blueprint-style examples (structure + outcome)</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="mt-8 grid gap-5 md:grid-cols-2"
          >
            {blueprints.map((b) => (
              <BlueprintCard
                key={b.title}
                title={b.title}
                tag={b.tag}
                desc={b.desc}
                img={b.img}
                chips={b.chips}
                wide={b.wide}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <BlueWave />

      {/* PROCESS */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500">How we deliver</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-medium">A process that stays fast without becoming messy</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              Scroll — the panel updates cleanly as you move. It’s built to feel guided, not scattered.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-7 lg:grid-cols-[0.95fr,1.05fr] items-start">
            {/* ✅ Mobile: make this rail also “flow in” smoothly */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease }}
              className="lg:sticky lg:top-24 grid gap-3"
            >
              {process.map((s, idx) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.55, ease, delay: reduceMotion ? 0 : idx * 0.06 }}
                >
                  <StepRailItem
                    idx={idx}
                    title={s.k}
                    text={s.t}
                    active={active === idx}
                    onClick={() => scrollTo(idx)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* ✅ Mobile: panel “comes up” smoothly too */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75, ease }}
              className="relative lg:sticky lg:top-24"
            >
              <div
                className="rounded-[30px] border border-black/10 bg-white overflow-hidden"
                style={{
                  boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
                  willChange: "transform",
                }}
              >
                <div className="p-6 sm:p-7 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] uppercase tracking-widest text-gray-500">
                      Step {String(active + 1).padStart(2, "0")} / {String(process.length).padStart(2, "0")}
                    </p>

                    <div className="flex items-center gap-1.5">
                      {process.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setActive(i);
                            scrollTo(i);
                          }}
                          aria-label={`Go to step ${i + 1}`}
                          className={cx(
                            "h-2.5 w-2.5 rounded-full transition",
                            active === i ? "bg-black" : "bg-black/20 hover:bg-black/35"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ✅ Smoother step transitions */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: reduceMotion ? 0 : 0.42, ease }}
                      className="mt-4"
                    >
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight">
                        {process[active].t}
                      </h3>
                      <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">{process[active].body}</p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {process[active].bullets.map((b) => (
                          <motion.div
                            key={b}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
                            className="rounded-2xl border border-black/10 bg-white p-4"
                          >
                            <p className="text-sm font-medium text-gray-900">{b}</p>
                            <p className="mt-1 text-xs text-gray-500">Delivered in your build plan.</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                          href="/audit"
                          className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition active:scale-[0.99]"
                        >
                          Start with a free audit →
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
                        >
                          Talk about your project
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="px-6 sm:px-7 md:px-8 py-5 border-t border-black/10 bg-black/[0.02] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-sm text-gray-700">
                    Outcome: <span className="text-gray-900 font-medium">clarity + stability</span>
                  </p>
                  <p className="text-xs text-gray-500">Websites • Mobile • Dashboards • Extensions</p>
                </div>
              </div>

              <div className="pointer-events-none absolute -z-10 inset-0" aria-hidden="true">
                {process.map((_, idx) => (
                  <div key={idx} ref={setAnchor(idx)} data-step={idx} className="h-[34vh] sm:h-[38vh] lg:h-[42vh]" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BlueWave />

      {/* CLOSING CTA */}
      <section className="px-5 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="rounded-[34px] border border-black/10 bg-white p-7 sm:p-8 md:p-10"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)" }}
          >
            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] items-center">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500">Next step</p>
                <h3 className="mt-3 text-2xl md:text-3xl font-medium leading-tight">
                  If you want a product that looks premium, start with clarity.
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                  Send your website (or idea). We’ll return a clean priority list, then you decide whether to implement
                  fixes or build the full product with GITS.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Link
                  href="/audit"
                  className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition active:scale-[0.99]"
                >
                  Get free audit →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="mt-6">
            <BlueWave />
          </div>
        </div>
      </section>
    </main>
  );
}
