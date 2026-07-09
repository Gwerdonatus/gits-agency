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

// Wave dividers removed for an unbroken white page. Kept as a no-op so existing
// call sites don't need to be hunted down — renders nothing.
function BlueWave(_props: { flip?: boolean } = {}) {
  return null;
}

function SectionDivider() {
  return <div className="border-t border-black/8" />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs text-gray-600">
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
      className="rounded-[26px] border border-black/8 bg-white p-6 sm:p-7"
      style={{
        boxShadow: "0 18px 44px rgba(0,0,0,0.05), 0 2px 10px rgba(0,0,0,0.03)",
        willChange: "transform",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22 }}
    >
      <p className="text-[11px] uppercase tracking-widest text-gray-400">{eyebrow}</p>
      <h3 className="mt-4 text-lg sm:text-xl font-medium tracking-tight text-gray-900">{title}</h3>
      <p className="mt-2 text-sm sm:text-base text-gray-500 leading-relaxed">{desc}</p>
      <div className="mt-5 grid gap-2">
        {bullets.map((b) => (
          <div key={b} className="flex items-start gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/70 shrink-0" />
            <p className="text-sm text-gray-600 leading-relaxed">{b}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA MOSAIC
// ─────────────────────────────────────────────────────────────────────────────

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
        <div className="relative rounded-[28px] border border-black/8 bg-white p-3 sm:p-4">
          <div className="grid gap-3 sm:gap-4 grid-cols-2">
            {images.map((src, i) => {
              const isHero = i === 0;
              return (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => openAt(i)}
                  className={cx(
                    "group relative overflow-hidden rounded-2xl border border-black/8 bg-black/[0.02] text-left",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2",
                    isHero ? "col-span-2 h-44 sm:h-56" : "h-36 sm:h-44"
                  )}
                  style={{
                    boxShadow: "0 18px 55px rgba(0,0,0,0.05), 0 2px 10px rgba(0,0,0,0.03)",
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
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/8" />
                    <div className="absolute inset-0 bg-white/5" />
                  </div>
                  <div className="absolute left-3 bottom-3">
                    <div className="rounded-full border border-black/8 bg-white/90 px-3 py-1.5 backdrop-blur">
                      <p className="text-[11px] text-gray-900">Preview {String(i + 1).padStart(2, "0")}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 rounded-full border border-black/8 bg-white/90 px-2.5 py-2 backdrop-blur">
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

function TestimonialCard({
  emoji,
  title,
  quote,
  name,
  meta,
  avatarSrc,
}: {
  emoji: string;
  title: string;
  quote: string;
  name: string;
  meta: string;
  avatarSrc: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-[28px] border border-black/8 bg-white p-6 sm:p-7"
      style={{
        boxShadow: "0 22px 60px rgba(0,0,0,0.05), 0 2px 10px rgba(0,0,0,0.03)",
        willChange: "transform",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22 }}
    >
      <p className="text-2xl">{emoji}</p>
      <p className="mt-3 text-xs uppercase tracking-widest text-gray-400">{title}</p>
      <p className="mt-1 text-[11px] text-amber-500">★★★★★</p>

      <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">"{quote}"</p>

      <div className="mt-5 h-px bg-black/8" />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-10 w-10 rounded-2xl overflow-hidden border border-black/8 bg-black/[0.02]">
            <Image src={avatarSrc} alt={name} fill sizes="40px" className="object-cover" quality={95} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium leading-tight truncate text-gray-900">{name}</p>
            <p className="mt-1 text-xs truncate text-gray-400">{meta}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400">Verified</span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLUEPRINTS — real, shippable examples we point people to when they ask
// "can you show me something like this?" No testimonials here on purpose.
//
// Two shapes:
// 1) BlueprintRow — the five live, URL-able builds. A big faint number sits
//    beside each row, and each thumbnail is a real screenshot (swap the image
//    paths below once you've captured them — exact filenames are listed in
//    the chat reply).
// 2) FeatureShowcase — the AI assistant and the internal dashboard tool.
//    Neither has a public URL, so instead of a link-out row they get a short
//    plain-language explanation plus a small gallery of real screenshots.
// ─────────────────────────────────────────────────────────────────────────────

type BlueprintItem = {
  id: string;
  number: string;
  kind: string;
  title: string;
  desc: string;
  accent: string;
  image: string;
  url: string;
};

const blueprintItems: BlueprintItem[] = [
  {
    id: "sanmark",
    number: "01",
    kind: "Website",
    title: "Sanmark Luxury",
    desc: "Premium fashion store in Lagos — editorial product photography, clean taxonomy, conversion-optimized checkout.",
    accent: "#c4a060",
    image: "/projects/blueprints/sanmark.jpeg",
    url: "https://sanmarkluxury.com/",
  },
  {
    id: "notgate",
    number: "02",
    kind: "Website",
    title: "NOTGATE",
    desc: "Corporate site for a construction firm — project gallery, partner trust badges, and stats front and center.",
    accent: "#a060c4",
    image: "/projects/blueprints/notgate.jpeg",
    url: "https://notgate-w6l1.vercel.app/",
  },
  {
    id: "lamed",
    number: "03",
    kind: "Website",
    title: "Lamed Pharmacy",
    desc: "Patient-facing pharmacy platform — prescription upload, PLASCHEMA integration, branch locator, auto-refill.",
    accent: "#60c4a0",
    image: "/projects/blueprints/lamed.jpeg",
    url: "https://lamed-pharmacy.vercel.app/",
  },
  {
    id: "selo",
    number: "04",
    kind: "Website",
    title: "Selo",
    desc: "A curated store selling only purple clothing, accessories, and bags — bold monochromatic brand identity.",
    accent: "#c460c4",
    image: "/projects/blueprints/selo.jpeg",
    url: "https://selo-red.vercel.app/",
  },
  {
    id: "blakdhut",
    number: "05",
    kind: "Dashboard",
    title: "Blakdhut Exchange",
    desc: "Dark-mode crypto trading platform — live pricing, secure transaction flows, built for speed and trust.",
    accent: "#60a0c4",
    image: "/projects/blueprints/blakdhut.jpeg",
    url: "https://www.blakdhut.com/",
  },
];

function BlueprintRow({ item, reduceMotion }: { item: BlueprintItem; reduceMotion: boolean | null }) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease }}
      className="group flex items-center gap-3 sm:gap-6 rounded-[20px] border border-black/8 bg-white p-4 sm:p-5 transition hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2"
    >
      <span
        aria-hidden
        className="hidden sm:grid shrink-0 w-14 place-items-center text-5xl font-semibold leading-none text-black/[0.07] select-none"
      >
        {item.number}
      </span>

      <div className="relative shrink-0 h-20 w-28 sm:h-24 sm:w-32 rounded-2xl overflow-hidden border border-black/8 bg-black/[0.02]">
        <Image
          src={item.image}
          alt={`${item.title} homepage`}
          fill
          sizes="128px"
          className="object-cover object-top"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-widest text-gray-400">
          {item.number} · {item.kind}
        </p>
        <h3 className="mt-1.5 text-base sm:text-lg font-medium tracking-tight text-gray-900">{item.title}</h3>
        <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
      </div>

      <span className="hidden sm:block shrink-0 text-sm text-gray-900 group-hover:opacity-70 transition">
        View site →
      </span>
    </motion.a>
  );
}

type FeatureShowcaseProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  points: string[];
  images: string[];
  accent: string;
};

function FeatureShowcase({ eyebrow, title, paragraph, points, images, accent }: FeatureShowcaseProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="rounded-[28px] border border-black/8 bg-white p-6 sm:p-8"
      style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.04), 0 2px 10px rgba(0,0,0,0.02)" }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr,1.15fr] items-start">
        <div>
          <p className="text-[11px] uppercase tracking-widest" style={{ color: accent }}>
            {eyebrow} · Internal build
          </p>
          <h3 className="mt-2 text-xl sm:text-2xl font-medium tracking-tight text-gray-900">{title}</h3>
          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">{paragraph}</p>
          <div className="mt-5 grid gap-2">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                <p className="text-sm text-gray-600 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={cx("grid gap-3", images.length > 2 ? "grid-cols-2" : "grid-cols-2")}>
          {images.map((src, i) => (
            <div
              key={src}
              className={cx(
                "relative rounded-2xl overflow-hidden border border-black/8 bg-black/[0.02] aspect-[9/16]",
                images.length === 3 && i === 0 ? "col-span-2 aspect-[16/9]" : ""
              )}
            >
              <Image src={src} alt={`${title} screenshot ${i + 1}`} fill sizes="320px" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BlueprintsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-5 sm:px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-[11px] uppercase tracking-widest text-gray-400">Blueprints</p>
          <h2 className="mt-3 text-2xl md:text-[2rem] font-medium tracking-tight text-gray-900">
            What we send when someone asks to see the work.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
            Real builds we point to as examples — click through to the live ones.
          </p>
        </motion.div>

        <div className="mt-12 md:mt-16 grid gap-3">
          {blueprintItems.map((item) => (
            <BlueprintRow key={item.id} item={item} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-14 md:mt-20 grid gap-8">
        <FeatureShowcase
          eyebrow="AI Assistant"
          title="AI Spa Assistant"
          accent="#c46090"
          paragraph="A WhatsApp and web assistant that handles bookings end to end. A client messages, the assistant checks the calendar, confirms a time with the right specialist, remembers preferences like a favorite oil or room, and sends a reminder before the appointment — no admin picking up the phone until it's time to actually work."
          points={[
            "Books, reschedules, and confirms over WhatsApp and web",
            "Remembers each client's preferences automatically",
            "Sends reminders so no-shows drop on their own",
          ]}
          images={["/projects/blueprints/ai-spa-1.jpeg", "/projects/blueprints/ai-spa-2.png"]}
        />

        <FeatureShowcase
          eyebrow="Internal Tool"
          title="Pet Internal System"
          accent="#60c480"
          paragraph="A custom dashboard built for a pet services business to replace a stack of spreadsheets the team no longer trusted. Scheduling, inventory, and billing live in one calm interface, so the whole team is looking at the same source of truth instead of three different tabs."
          points={[
            "One schedule view for the whole team, no double-bookings",
            "Inventory and billing tracked alongside appointments",
            "Cut admin time by 60% for the business running it",
          ]}
          images={[
            "/projects/blueprints/pet-system-1.jpeg",
            "/projects/blueprints/pet-system-2.png",
            "/projects/blueprints/pet-system-3.png",
          ]}
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

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

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative px-5 sm:px-6 pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center text-xs sm:text-sm uppercase tracking-widest text-gray-400"
          >
            What we build
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.06}
            className="mt-4 text-center text-[2.15rem] leading-[1.05] sm:text-4xl md:text-6xl font-medium tracking-tight text-gray-900"
          >
            We build digital products that{" "}
            <span className="text-black">sell clearly</span> and{" "}
            <span className="text-black">scale cleanly</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.12}
            className="mt-5 text-center text-gray-500 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
          >
            GITS helps founders, startups, and teams launch websites, mobile apps, dashboards, and extensions with
            strong UX, stable engineering, and automation that doesn't break in production.
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
                eyebrow="01 · Product thinking"
                title="We build what moves the needle"
                desc={'Not "features." We map the clearest user journey from attention → trust → action.'}
                bullets={["Sharp messaging + hierarchy", "Clear CTAs and conversion points", "Scope trimmed to a strong v1"]}
              />
              <SellingCard
                eyebrow="02 · Premium execution"
                title="Design that feels finished"
                desc="Calm layouts, strong typography, and micro-interactions that make your product feel credible."
                bullets={["Design system consistency", "Mobile-first responsiveness", "Clean motion (not noise)"]}
              />
              <SellingCard
                eyebrow="03 · Engineering that scales"
                title="Stable systems from day one"
                desc="Clean architecture + reliable integrations so your product doesn't become fragile later."
                bullets={["Performance-first builds", "Predictable integrations + guardrails", "Deployment + monitoring basics"]}
              />
            </div>

            <div
              className="rounded-[28px] border border-black/8 bg-white p-6 sm:p-7"
              style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.05), 0 2px 10px rgba(0,0,0,0.03)" }}
            >
              <p className="text-sm uppercase tracking-widest text-gray-400">Best place to start</p>
              <h2 className="mt-3 text-xl sm:text-2xl font-medium leading-tight text-gray-900">
                We'll tell you what to fix first — and why.
              </h2>
              <p className="mt-3 text-gray-500 leading-relaxed text-sm sm:text-base">
                Get a free audit that highlights friction hurting trust, conversions, and speed — then a clear
                priority list you can act on.
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
                  className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

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
            <p className="text-sm uppercase tracking-widest text-gray-400">Testimonials</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-medium text-gray-900">
              What people say after working with us
            </h2>
            <p className="mt-3 text-gray-500 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
              We keep things human: clear communication, clean delivery, and a product that feels "right" when you
              use it.
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
              meta="Pet services · Website refresh"
              avatarSrc="/people/aisha.jpg"
            />
            <TestimonialCard
              emoji="🧩"
              title="Chrome Extension"
              quote="The extension feels lightweight and polished. It's simple for users, but the logic under the hood is solid. We also appreciated how clearly everything was explained during delivery."
              name="Chinedu"
              meta="Product team · Chrome extension"
              avatarSrc="/people/chinedu.jpg"
            />
            <TestimonialCard
              emoji="📅"
              title="Scheduling Dashboard"
              quote="We went from messy scheduling to a calm system the team can actually use. The dashboard is fast, the flow makes sense, and the work feels structured instead of rushed."
              name="Sarah"
              meta="Operations · Internal dashboard"
              avatarSrc="/people/sarah.jpg"
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
                className="rounded-[28px] border border-black/8 bg-white p-6 sm:p-7"
                style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.05), 0 2px 10px rgba(0,0,0,0.03)" }}
              >
                <p className="text-sm uppercase tracking-widest text-gray-400">Visuals</p>
                <h3 className="mt-3 text-xl sm:text-2xl font-medium leading-tight text-gray-900">
                  A quick look at the UI quality we aim for
                </h3>
                <p className="mt-3 text-gray-500 leading-relaxed text-sm sm:text-base">
                  Tap any image to preview it in full clarity.
                </p>
              </div>
              <MediaMosaic />
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* BLUEPRINTS — numbered live sites + the two feature-explainer builds */}
      <BlueprintsSection />

      {/* SERVICES */}
      <section className="px-5 sm:px-6 py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-sm text-neutral-400 tracking-wide">Services</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-medium text-neutral-900 tracking-tight">
              Explore in detail
            </h2>
          </motion.div>

          <motion.div
            className="mt-14 space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {/* Card 1 — Custom Software */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <Link
                href="/services/custom-software-development"
                className="group block rounded-[32px] p-8 sm:p-10 transition-all duration-500 hover:scale-[1.01]"
                style={{ background: "#1a1a1a" }}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  whileHover={reduceMotion ? {} : { rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8l4-4 4 4" />
                    <path d="M12 16l4 4 4-4" />
                    <path d="M8 4v16" />
                    <path d="M16 20V4" />
                  </svg>
                </motion.div>
                <h3 className="mt-7 text-xl font-medium text-white">
                  Custom Software Development
                </h3>
                <p className="mt-3 text-base text-white/50 leading-relaxed max-w-lg">
                  SaaS platforms, marketplaces, booking systems, and enterprise applications built to scale.
                </p>
                <div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors duration-300">
                  <span className="text-sm font-medium">View case studies</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </Link>
            </motion.div>

            {/* Card 2 — Websites */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <Link
                href="/services/websites-digital-experiences"
                className="group block rounded-[32px] p-8 sm:p-10 transition-all duration-500 hover:scale-[1.01]"
                style={{ background: "#f2f2f2" }}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.05)" }}
                  whileHover={reduceMotion ? {} : { rotate: -5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="3" />
                    <line x1="2" y1="8" x2="22" y2="8" />
                    <circle cx="6" cy="5.5" r="0.8" fill="#1a1a1a" />
                    <circle cx="9" cy="5.5" r="0.8" fill="#1a1a1a" />
                  </svg>
                </motion.div>
                <h3 className="mt-7 text-xl font-medium text-neutral-900">
                  Websites & Digital Experiences
                </h3>
                <p className="mt-3 text-base text-neutral-500 leading-relaxed max-w-lg">
                  Business sites, e-commerce stores, landing pages, and portfolios that convert.
                </p>
                <div className="mt-6 flex items-center gap-2 text-neutral-400 group-hover:text-neutral-600 transition-colors duration-300">
                  <span className="text-sm font-medium">View case studies</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </Link>
            </motion.div>

            {/* Card 3 — AI */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <Link
                href="/services/ai-business-automation"
                className="group block rounded-[32px] p-8 sm:p-10 transition-all duration-500 hover:scale-[1.01]"
                style={{ background: "#e8e8e8" }}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.04)" }}
                  whileHover={reduceMotion ? {} : { rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="M4.93 19.07l2.83-2.83" />
                    <path d="M16.24 7.76l2.83-2.83" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </motion.div>
                <h3 className="mt-7 text-xl font-medium text-neutral-900">
                  AI & Business Automation
                </h3>
                <p className="mt-3 text-base text-neutral-500 leading-relaxed max-w-lg">
                  AI assistants, workflow automation, and customer support bots that work around the clock.
                </p>
                <div className="mt-6 flex items-center gap-2 text-neutral-400 group-hover:text-neutral-600 transition-colors duration-300">
                  <span className="text-sm font-medium">View case studies</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </Link>
            </motion.div>

            {/* Card 4 — Internal Tools */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <Link
                href="/services/internal-tools-crm"
                className="group block rounded-[32px] p-8 sm:p-10 transition-all duration-500 hover:scale-[1.01]"
                style={{ background: "#d4d4d4" }}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.05)" }}
                  whileHover={reduceMotion ? {} : { rotate: -5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                    <path d="M8 6v12" />
                    <path d="M16 6v12" />
                  </svg>
                </motion.div>
                <h3 className="mt-7 text-xl font-medium text-neutral-900">
                  Internal Tools & CRM Systems
                </h3>
                <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-lg">
                  CRM systems, admin dashboards, inventory, and operations tools your team will actually use.
                </p>
                <div className="mt-6 flex items-center gap-2 text-neutral-500 group-hover:text-neutral-800 transition-colors duration-300">
                  <span className="text-sm font-medium">View case studies</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </Link>
            </motion.div>

            {/* Card 5 — Integrations */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <Link
                href="/services/integrations-apis"
                className="group block rounded-[32px] p-8 sm:p-10 transition-all duration-500 hover:scale-[1.01]"
                style={{ background: "#262626" }}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  whileHover={reduceMotion ? {} : { rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.5 10.5l7-4" />
                    <path d="M8.5 13.5l7 4" />
                  </svg>
                </motion.div>
                <h3 className="mt-7 text-xl font-medium text-white">
                  Integrations & APIs
                </h3>
                <p className="mt-3 text-base text-white/50 leading-relaxed max-w-lg">
                  Payment integrations, REST & GraphQL APIs, and data sync that keeps everything connected.
                </p>
                <div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors duration-300">
                  <span className="text-sm font-medium">View case studies</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* CLOSING CTA */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="rounded-[34px] border border-black/8 bg-white p-7 sm:p-8 md:p-10"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.05), 0 8px 20px rgba(0,0,0,0.03)" }}
          >
            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] items-center">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400">Next step</p>
                <h3 className="mt-3 text-2xl md:text-3xl font-medium leading-tight text-gray-900">
                  If you want a product that looks premium, start with clarity.
                </h3>
                <p className="mt-3 text-gray-500 leading-relaxed text-sm sm:text-base">
                  Send your website (or idea). We'll return a clean priority list, then you decide whether to
                  implement fixes or build the full product with GITS.
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
                  className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}