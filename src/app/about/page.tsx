"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";

/* ─────────────────────────────────────────────
   GITS — ABOUT
   Gwer Intelligent Tech Solutions
   Next.js 15 · TypeScript · Tailwind · Framer Motion

   Design system
   — Palette:  #FFFFFF paper · #050505 ink · #666666 quiet
               (a hairline black→transparent gradient is the
               only accent — no color)
   — Display:  Instrument Sans, extralight — the studio's voice
   — Emphasis: Fraunces italic, light — the human aside
   — Utility:  JetBrains Mono — captions, numerals, coordinates
   — Signature: the "process" section reads as a circuit trace,
     not an organic line — a studio that builds systems draws
     its own story like one. A single pulse of light travels the
     trace on loop, quietly, as if a job is always in flight.
   — Photography is desaturated to near-monochrome so imagery
     never breaks the three-color palette.
   ───────────────────────────────────────────── */

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-fraunces",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const ease = [0.22, 0.61, 0.36, 1] as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

/* ── Motion variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: d },
  }),
};

const letterReveal = {
  hidden: { opacity: 0, y: 44 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: i * 0.02 },
  }),
};

/* ─────────────────────────────────────────────
   Shared primitives
   ───────────────────────────────────────────── */

/** Small crosshair registration mark — the studio's recurring
 * "alignment" motif, borrowed from print/PCB registration marks. */
function RegMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cx("w-3 h-3 text-[#050505]", className)}
      fill="none"
    >
      <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function Eyebrow({
  index,
  children,
  invert = false,
}: {
  index: string;
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <RegMark className={invert ? "text-white/40" : "text-[#050505]/30"} />
      <p
        className={cx(
          "font-mono text-[11px] uppercase tracking-[0.22em]",
          invert ? "text-white/60" : "text-[#666666]"
        )}
      >
        <span className={invert ? "text-white/30" : "text-[#050505]/25"}>
          {index}
        </span>
        <span className="ml-3">{children}</span>
      </p>
    </div>
  );
}

function AnimatedHeading({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  /** The hero composes two lines inside a single <h1>, so this renders
   *  as a plain <span> there — one heading, not two. */
  as?: "h1" | "h2" | "span";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {/* aria-hidden: without it, a screen reader announces the heading one
          letter at a time. The aria-label above carries the real text. */}
      <span aria-hidden="true">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i + delay * 25}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={letterReveal}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

/** Editorial photography block — desaturated to hold the
 * three-color palette, hairline border, mask reveal + parallax. */
function EditorialImage({
  src,
  alt,
  className,
  parallax = 0.25,
  caption,
}: {
  src: string;
  alt: string;
  className?: string;
  parallax?: number;
  caption?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50 * parallax, -50 * parallax]);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Tailwind declares `.relative` AFTER `.absolute`, so hardcoding "relative"
  // here silently beat any positioned className a caller passed in (the hero
  // photo was meant to be `absolute` and was being laid out in flow instead).
  // Only supply the default when the caller hasn't chosen a position.
  const hasPosition = /(^|\s)(absolute|fixed|sticky|static)(\s|$)/.test(
    className ?? ""
  );

  return (
    <motion.figure
      ref={ref}
      style={reduceMotion ? undefined : { y }}
      className={cx(!hasPosition && "relative", className)}
    >
      <motion.div
        // Driven by useInView rather than whileInView so the reveal can be
        // skipped outright under reduced motion — a variant that fails to
        // fire would otherwise strand the image at inset(0 0 100% 0),
        // i.e. clipped to nothing and invisible.
        initial={false}
        animate={{
          clipPath:
            reduceMotion || inView ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="relative w-full h-full overflow-hidden border border-[#050505]/10"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale contrast-[1.05] brightness-[0.98]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/15 via-transparent to-transparent" />
      </motion.div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#666666]">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-10 h-10 border border-[#050505]/15 text-[#666666] hover:bg-[#050505] hover:text-white hover:border-[#050505] transition-colors duration-300"
    >
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────────
   Signature section — the process circuit
   ───────────────────────────────────────────── */

type Stage = { num: string; title: string; desc: string };

const STAGES: Stage[] = [
  { num: "01", title: "Research", desc: "We study the business before we study the interface — market, users, and the technical debt already on the books." },
  { num: "02", title: "Strategy", desc: "A written point of view on what to build, what to defer, and what to refuse. Direction before decoration." },
  { num: "03", title: "Design", desc: "Interfaces drawn with editorial restraint. Every spacing and weight decision is deliberate, not default." },
  { num: "04", title: "Engineering", desc: "Senior engineers only — no bench of juniors learning on your invoice. Clean architecture, documented, owned." },
  { num: "05", title: "Automation", desc: "Workflows that remove friction with guardrails, not black boxes. Automation you can explain to an auditor." },
  { num: "06", title: "Launch", desc: "Deployed with monitoring and a rollback plan already written — launch day should be uneventful." },
  { num: "07", title: "Growth", desc: "We stay on past handoff, reading the data and shipping the next quiet improvement." },
];

// Node coordinates for the circuit trace, in a 1200×1080 viewBox.
// A staircase, not a curve — the shape of a board trace, not a river.
const NODES = [
  { x: 60, y: 40 },
  { x: 60, y: 240 },
  { x: 430, y: 240 },
  { x: 430, y: 440 },
  { x: 800, y: 440 },
  { x: 800, y: 660 },
  { x: 1160, y: 660 },
];

function pathFromNodes(nodes: { x: number; y: number }[]) {
  return nodes.map((n, i) => `${i === 0 ? "M" : "L"}${n.x},${n.y}`).join(" ");
}

function ProcessCircuit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.3"],
  });
  const drawPct = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const reduceMotion = useReducedMotion();
  const d = pathFromNodes(NODES);

  return (
    <div ref={ref} className="relative">
      {/* Desktop: circuit trace with stage blocks pinned near nodes.
          The container carries the viewBox's own aspect ratio (1200×1080)
          so the SVG scales uniformly with no letterboxing. That is what lets
          the stage blocks below anchor to percentages that map 1:1 onto
          viewBox coordinates at any width — they were previously positioned
          in raw px, so they only aligned at exactly 1200px wide and drifted
          off (and collided with) their own nodes at every other size. */}
      <div className="hidden lg:block relative w-full aspect-[1200/1080]">
        <svg
          viewBox="0 0 1200 1080"
          className="absolute inset-0 w-full h-full"
          fill="none"
        >
          {/* base trace, quiet */}
          <path
            d={d}
            stroke="#e5e5e5"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* animated draw-on-scroll trace */}
          <motion.path
            d={d}
            stroke="#050505"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={1}
            style={
              reduceMotion
                ? undefined
                : { strokeDasharray: "1 1", strokeDashoffset: drawPct as any }
            }
          />
          {NODES.map((n, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="4.5"
                fill="#050505"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06, ease }}
              />
              <circle cx={n.x} cy={n.y} r="9" fill="none" stroke="#050505" strokeOpacity="0.15" />
            </motion.g>
          ))}

          {/* Traveling pulse — a job always in flight. It lives inside the
              SVG so it travels in viewBox units and stays welded to the
              trace at any width; as an absolutely-positioned div it moved
              in CSS px and slid off the line as the SVG scaled. */}
          {!reduceMotion && (
            <motion.circle
              aria-hidden
              cx="0"
              cy="0"
              r="4"
              fill="#050505"
              opacity={0.35}
              style={{ offsetPath: `path("${d}")` as any, offsetRotate: "0deg" }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
          )}
        </svg>

        {STAGES.map((stage, i) => {
          const n = NODES[i];
          const alignRight = n.x > 700;
          // Percentages of the viewBox — these track the node as it scales.
          const xPct = `${(n.x / 1200) * 100}%`;
          const yPct = `${(n.y / 1080) * 100}%`;
          return (
            <motion.div
              key={stage.num}
              className="absolute w-[300px]"
              style={{
                left: alignRight
                  ? `calc(${xPct} - 300px - 24px)`
                  : `calc(${xPct} + 24px)`,
                top: `calc(${yPct} - 8px)`,
                textAlign: alignRight ? "right" : "left",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease }}
            >
              <span className="font-mono text-xs text-[#666666]">{stage.num}</span>
              <h3 className="mt-1 text-xl font-light text-[#050505] tracking-tight">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm font-light text-[#666666] leading-[1.7]">
                {stage.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile / tablet: same signature — a zigzag circuit trace —
          rebuilt on a two-column grid so the dots and the line stay
          locked to each row no matter how many lines the copy wraps
          to (fixed pixel coordinates would drift and overlap). */}
      <div className="lg:hidden relative grid grid-cols-[40px_1fr] gap-x-5 gap-y-16">
        {/* decorative zigzag rail — stretches to the grid's actual
            rendered height, doesn't need to hit exact row pixels */}
        <svg
          aria-hidden
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
          className="absolute left-0 top-0 w-10 h-full pointer-events-none"
          fill="none"
        >
          <path
            d="M20,0 L20,6 L32,15 L32,21 L8,29 L8,35 L32,44 L32,50 L8,58 L8,64 L32,73 L32,79 L20,88 L20,100"
            stroke="#e5e5e5"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d="M20,0 L20,6 L32,15 L32,21 L8,29 L8,35 L32,44 L32,50 L8,58 L8,64 L32,73 L32,79 L20,88 L20,100"
            stroke="#050505"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            style={
              reduceMotion
                ? undefined
                : { strokeDasharray: "1 1", strokeDashoffset: drawPct as any }
            }
          />
        </svg>

        {STAGES.map((stage, i) => (
          <React.Fragment key={stage.num}>
            <div className="relative flex justify-center pt-1.5">
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-[#050505]"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.05, ease }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease }}
            >
              <span className="font-mono text-xs text-[#666666]">{stage.num}</span>
              <h3 className="mt-1 text-lg font-light text-[#050505] tracking-tight">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm font-light text-[#666666] leading-[1.7]">
                {stage.desc}
              </p>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Principles
   ───────────────────────────────────────────── */

function PrincipleRow({
  number,
  title,
  text,
  invert = false,
}: {
  number: string;
  title: string;
  text: string;
  invert?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={cx(
        "group grid grid-cols-[64px_1fr] md:grid-cols-[96px_200px_1fr] items-baseline gap-x-6 gap-y-2 py-8 border-t",
        invert ? "border-white/10" : "border-[#050505]/10"
      )}
    >
      <span
        className={cx(
          "font-mono text-sm",
          invert ? "text-white/35" : "text-[#666666]"
        )}
      >
        {number}
      </span>
      <h3
        className={cx(
          "text-xl md:text-2xl font-light tracking-tight",
          invert ? "text-white" : "text-[#050505]"
        )}
      >
        {title}
      </h3>
      <p
        className={cx(
          "col-span-2 md:col-span-1 text-sm font-light leading-[1.75] max-w-md",
          invert ? "text-white/50" : "text-[#666666]"
        )}
      >
        {text}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Team
   ───────────────────────────────────────────── */

function TeamMember({
  name,
  role,
  bio,
  imageSrc,
  linkedin,
  index,
}: {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  linkedin?: string;
  index: number;
}) {
  return (
    // `group` is required for the image's group-hover zoom to fire — it was
    // referenced by the child but never declared on a parent.
    <motion.div
      variants={fadeUp}
      custom={index * 0.08}
      className="group text-center sm:text-left"
    >
      {/* Capped and centred on small screens: at full column width these ran
          the height of the phone screen and read as stretched, with dead
          space beside them once capped. Card text centres to match, then
          both revert to the page's left-aligned editorial grid at sm+. */}
      <div className="relative aspect-[3/4] w-full max-w-[200px] sm:max-w-none mx-auto sm:mx-0 overflow-hidden bg-[#f0f0f0] border border-[#050505]/10">
        <Image
          src={imageSrc}
          alt={`${name} — ${role} at GITS`}
          fill
          className="object-cover object-top grayscale contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 200px, 45vw"
        />
      </div>
      <p className="mt-5 text-base font-normal text-[#050505] tracking-tight">{name}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#666666]">
        {role}
      </p>
      <p className="mt-3 text-sm font-light text-[#666666] leading-[1.7]">{bio}</p>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="group/link mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#666666] hover:text-[#050505] transition-colors duration-300"
        >
          <span className="border-b border-[#050505]/15 group-hover/link:border-[#050505]/60 transition-colors duration-300 pb-0.5">
            LinkedIn
          </span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          >
            ↗
          </span>
        </a>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 0.6], [0, -60]);

  return (
    <main
      className={cx(
        fraunces.variable,
        instrument.variable,
        mono.variable,
        "relative min-h-screen bg-white text-[#050505] overflow-x-hidden font-[family-name:var(--font-instrument)]"
      )}
    >
      {/* ═══ 1 · EDITORIAL HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-16 md:pb-24 pt-28"
      >
        <motion.div
          style={reduceMotion ? undefined : { opacity: heroOpacity, y: heroY }}
          className="relative max-w-[1600px] mx-auto w-full"
        >
          <EditorialImage
            src="/about/hero-workspace.webp"
            alt="GITS studio workspace"
            className="absolute -top-8 right-0 md:right-8 w-40 h-56 md:w-64 md:h-80 hidden md:block"
            parallax={0.4}
          />

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            <Eyebrow index="00">GITS — Gwer Intelligent Tech Solutions</Eyebrow>
          </motion.div>

          {/* The page's only <h1>. Both lines live inside it so the document
              outline reads "Software, engineered. with restraint." once —
              previously these were two sibling <h2>s and the page had no h1. */}
          <h1 className="mt-10 md:mt-14">
            <AnimatedHeading
              as="span"
              text="Software, engineered."
              className="block text-[clamp(2.6rem,8.5vw,7.5rem)] font-extralight leading-[0.98] tracking-[-0.03em] text-[#050505] font-[family-name:var(--font-instrument)]"
              delay={0.25}
            />
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.25}
              className="block text-[clamp(2.6rem,8.5vw,7.5rem)] italic font-light leading-[0.98] tracking-[-0.01em] text-[#050505]/80 font-[family-name:var(--font-fraunces)] pl-[6vw] md:pl-[3vw]"
            >
              with restraint.
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="mt-10 md:mt-14 max-w-xl text-base md:text-lg font-light text-[#666666] leading-[1.7]"
          >
            We are a small studio of senior engineers, designers, and systems
            thinkers building software, digital platforms, and AI automation
            for companies that refuse to look ordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 md:mt-20 flex items-center gap-3"
          >
            <div className="w-px h-12 bg-[#050505]/10 relative overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-1/2 bg-[#050505]"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#999999]">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ 2 · AGENCY MANIFESTO ═══ */}
      <section className="px-6 sm:px-10 lg:px-16 py-28 md:py-40 border-t border-[#050505]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              <Eyebrow index="01">Manifesto</Eyebrow>
              <EditorialImage
                src="/about/manifesto-studio.webp"
                alt="Studio at work"
                className="mt-8 aspect-[4/5]"
                caption="GITS studio, Abuja"
              />
            </motion.div>

            <div className="lg:col-span-7 lg:col-start-6 flex flex-col justify-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease }}
                className="text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.12] tracking-tight text-[#050505]"
              >
                Ambition without architecture is just noise.
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease, delay: 0.08 }}
                className="mt-10 space-y-6"
              >
                <p className="text-base md:text-lg font-light text-[#666666] leading-[1.75]">
                  Most software is built to function, not to last. We build
                  the opposite: fewer features, held to a higher standard,
                  designed to still make sense in three years.
                </p>
                <p className="text-base md:text-lg font-light text-[#666666] leading-[1.75]">
                  Every engineer we staff is senior. Not because juniors
                  can&rsquo;t learn — but because your product isn&rsquo;t
                  the place for it. Craft is non-negotiable, and it shows in
                  the parts no one asks to see.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3 · OUR STORY ═══ */}
      <section className="px-6 sm:px-10 lg:px-16 py-28 md:py-36 bg-[#fafafa] border-t border-[#050505]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              <Eyebrow index="02">Our story</Eyebrow>
              <h2 className="mt-6 text-3xl md:text-4xl lg:text-[3.1rem] font-extralight leading-[1.1] tracking-tight text-[#050505]">
                Started by one engineer who couldn&rsquo;t ship anything
                ordinary.
              </h2>
              <div className="mt-10 space-y-6">
                <p className="text-base font-light text-[#666666] leading-[1.75]">
                  GITS began as one person&rsquo;s refusal to hand over
                  work that merely worked. What started as independent
                  builds grew into a studio where product design, senior
                  engineering, and intelligent automation sit at the same
                  table.
                </p>
                <p className="text-base font-light text-[#666666] leading-[1.75]">
                  Today we partner with founders and operators in fintech,
                  entertainment, and commerce — building platforms that
                  hold up under real traffic and automation that survives
                  an audit.
                </p>
                <p className="text-base font-light text-[#666666] leading-[1.75]">
                  We stay small on purpose. A small, senior team is
                  slower to hire and faster to trust.
                </p>
              </div>
            </motion.div>

            <div className="relative">
              <EditorialImage
                src="/about/story-office.webp"
                alt="GITS office"
                className="aspect-[3/4]"
                parallax={0.2}
              />
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 , ease }}
                className="absolute -bottom-8 -left-6 md:-left-14 bg-white border border-[#050505]/10 p-6 md:p-8 max-w-[220px]"
              >
                <p className="font-mono text-4xl md:text-5xl font-light text-[#050505]">
                  0
                </p>
                <p className="mt-2 text-sm font-light text-[#666666]">
                  Junior hires. Every engineer on your project is senior,
                  full stop.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4 · ANIMATED PROCESS JOURNEY ═══ */}
      <section className="px-6 sm:px-10 lg:px-16 py-28 md:py-40 border-t border-[#050505]/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease }}
            className="mb-16 md:mb-24"
          >
            <Eyebrow index="03">How we work</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.1] tracking-tight text-[#050505] max-w-2xl">
              Seven stages, one continuous trace.
            </h2>
            <p className="mt-5 max-w-lg text-sm font-light text-[#666666] leading-[1.7]">
              We draw our process the way we&rsquo;d draw a system — no
              stage exists on its own.
            </p>
          </motion.div>

          <ProcessCircuit />
        </div>
      </section>

      {/* ═══ 5 · PRINCIPLES ═══ */}
      <section className="px-6 sm:px-10 lg:px-16 py-28 md:py-36 bg-[#050505] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease }}
            className="mb-16"
          >
            <Eyebrow index="04" invert>
              What we believe
            </Eyebrow>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.1] tracking-tight text-white max-w-xl">
              Six rules we don&rsquo;t break for a deadline.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            <PrincipleRow invert number="01" title="Senior only" text="Every engineer on staff is senior. Your project is not where anyone practices." />
            <PrincipleRow invert number="02" title="Systems over screens" text="We design reusable architecture, not one-off pages that fall apart at scale." />
            <PrincipleRow invert number="03" title="Automation with judgment" text="Intelligent workflows built with guardrails — automation you can explain, not a black box." />
            <PrincipleRow invert number="04" title="Speed is trust" text="Every millisecond is a signal. Performance is treated as a feature, not an afterthought." />
            <PrincipleRow invert number="05" title="Global voice, local craft" text="Work built to a worldwide standard, informed by the market it actually ships into." />
            <PrincipleRow invert number="06" title="Partnership, not hours" text="We think like founders on your project, and we say so when a good idea is a bad idea." />
          </motion.div>
        </div>
      </section>

      {/* ═══ 6 · FOUNDER FEATURE ═══ */}
      {/* id="founder" makes the Person.url in OrganizationSchema
          (/about#founder) resolve to a real anchor instead of nothing. */}
      {/* Runs a touch tighter than the page's md:py-40 rhythm on purpose:
          it buys the ~64px needed for the portrait and its caption to land
          inside one screen rather than spilling past the fold. */}
      <section
        id="founder"
        className="scroll-mt-24 px-6 sm:px-10 lg:px-16 py-28 md:py-32 border-t border-[#050505]/10"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              {/* Sizing does two jobs:
                  · mobile — capped and centred, so it stops running half the
                    screen tall and stranding dead space beside it;
                  · desktop — height is driven off the viewport (not the
                    column width) so the portrait and its caption sit inside
                    a single screen instead of forcing a scroll. Width follows
                    from the 3:4 ratio, so the frame never distorts. */}
              <EditorialImage
                src="/about/founder1.webp"
                alt="Gwer Msughter Donatus, Founder of GITS"
                className="aspect-[3/4] w-full max-w-[240px] sm:max-w-[300px] mx-auto sm:mx-0 lg:w-auto lg:max-w-none lg:h-[52vh] lg:max-h-[620px]"
                parallax={0.12}
              />
              <div className="mt-5 text-center sm:text-left">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                  Founder &amp; Principal Engineer
                </p>
                <p className="mt-1 text-xl font-light text-[#050505]">
                  Gwer Msughter Donatus
                </p>
                <a
                  href="https://donatus-gwer.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Gwer Msughter Donatus — personal site (opens in a new tab)"
                  className="group/site mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#666666] hover:text-[#050505] transition-colors duration-300"
                >
                  <span className="border-b border-[#050505]/15 group-hover/site:border-[#050505]/60 transition-colors duration-300 pb-0.5">
                    Personal site
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </motion.div>

            <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease }}
              >
                <Eyebrow index="05">Leadership</Eyebrow>
                <h2 className="mt-6 text-3xl md:text-4xl lg:text-[2.6rem] font-extralight leading-[1.1] tracking-tight text-[#050505]">
                  Built by someone who believes good technology disappears.
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease, delay: 0.08 }}
                className="mt-10 space-y-6"
              >
                <p className="text-base md:text-lg font-light text-[#666666] leading-[1.75]">
                  Gwer founded GITS on a simple premise: technical
                  excellence and human-centered design shouldn&rsquo;t be
                  two separate hires.
                </p>
                <p className="text-base md:text-lg font-light text-[#666666] leading-[1.75]">
                  With a background spanning backend systems, web
                  platforms, and AI-driven workflows, he approaches every
                  build as both engineer and product owner — which is why
                  GITS ships fewer, better things.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="mt-10 flex items-center gap-3"
              >
                <SocialLink href="https://www.linkedin.com/in/donatus-gwer-857610338" label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5H4.5V24H.5V8.5zM8 8.5h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V24H16.4v-7.85c0-1.87-.03-4.28-2.61-4.28-2.61 0-3.01 2.04-3.01 4.15V24H8V8.5z" />
                  </svg>
                </SocialLink>
                <SocialLink href="https://github.com/Gwerdonatus" label="GitHub">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.26.79-.57 0-.28-.01-1.02-.02-2-3.2.71-3.87-1.58-3.87-1.58-.52-1.37-1.28-1.73-1.28-1.73-1.05-.73.08-.72.08-.72 1.16.08 1.77 1.22 1.77 1.22 1.03 1.81 2.7 1.29 3.36.99.1-.77.4-1.29.73-1.58-2.55-.3-5.23-1.31-5.23-5.83 0-1.29.45-2.35 1.19-3.18-.12-.3-.52-1.52.11-3.17 0 0 .97-.32 3.18 1.21.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.53 3.17-1.21 3.17-1.21.63 1.65.23 2.87.12 3.17.74.83 1.19 1.89 1.19 3.18 0 4.53-2.69 5.53-5.25 5.82.41.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .31.21.68.8.57C19.96 21.42 23.25 17.1 23.25 12 23.25 5.62 18.27.5 12 .5z" />
                  </svg>
                </SocialLink>
                <SocialLink href="https://x.com/donatus_gwer" label="X">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H22l-6.77 7.74L23 22h-6.4l-5.01-6.53L5.88 22H2.78l7.29-8.33L1 2h6.56l4.53 5.9L18.9 2zm-1.12 18h1.78L6.6 3.9H4.7L17.78 20z" />
                  </svg>
                </SocialLink>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7 · TEAM SHOWCASE ═══ */}
      <section className="px-6 sm:px-10 lg:px-16 py-28 md:py-36 bg-[#fafafa] border-t border-[#050505]/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease }}
            className="mb-16 md:mb-24"
          >
            <Eyebrow index="06">The team</Eyebrow>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.1] tracking-tight text-[#050505] max-w-xl">
              Small by design. No bench, no bloat.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 max-w-3xl"
          >
            <TeamMember
              index={0}
              name="Daniel Ochai"
              role="UI/UX & Design Systems"
              bio="Owns every spacing token and interaction pattern. Nothing ships until it earns its place."
              imageSrc="/about/daniel.webp"
              linkedin="https://www.linkedin.com/in/daniel-o-ochai-596a47319/"
            />
            <TeamMember
              index={1}
              name="Aisha Adeyemi"
              role="Marketing & Media"
              bio="Runs how the studio sounds in public — channels, campaigns, and the story around the work. Positioning before promotion."
              imageSrc="/about/team-aisha.webp"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══ 8 · CLOSING STATEMENT ═══ */}
      <section className="px-6 sm:px-10 lg:px-16 py-28 md:py-40 border-t border-[#050505]/10">
        {/* One max-width, not two — this carried both max-w-[1400px] and
            max-w-4xl, so which won depended on Tailwind's stylesheet order
            rather than intent. The pull quote wants the narrower measure. */}
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease }}
            className="text-[clamp(2rem,6.5vw,4.5rem)] italic font-light leading-[1.15] tracking-tight text-[#050505] font-[family-name:var(--font-fraunces)]"
          >
            We don&rsquo;t chase trends. We build the things that are
            still standing after they&rsquo;ve passed.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="mt-10 text-lg md:text-xl font-light text-[#666666] leading-[1.7] max-w-2xl"
          >
            If you&rsquo;re building something that has to work, and has
            to look like it works — we should talk.
          </motion.p>
        </div>
      </section>

      {/* ═══ 9 · MINIMAL CTA ═══ */}
      <section className="px-6 sm:px-10 lg:px-16 py-24 md:py-32 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, ease }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-12"
          >
            <div className="max-w-xl">
              <Eyebrow index="07" invert>
                Start a conversation
              </Eyebrow>
              <h2 className="mt-6 text-3xl md:text-4xl font-extralight leading-[1.1] tracking-tight text-white">
                Building something serious?
              </h2>
              <p className="mt-4 text-base font-light text-[#999999] leading-[1.7]">
                Tell us what it is. We respond within 24 hours with an
                honest read and a clear next step.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-[#050505] px-8 py-4 text-sm font-normal tracking-wide hover:bg-[#f0f0f0] transition-colors duration-300"
              >
                Start a project
              </Link>
              <Link
                href="/what-we-build"
                className="inline-flex items-center justify-center border border-white/25 px-8 py-4 text-sm font-normal tracking-wide text-white hover:bg-white hover:text-[#050505] hover:border-white transition-colors duration-300"
              >
                View our work
              </Link>
            </div>
          </motion.div>

          {/* No copyright/legal bar here. The global <Footer> from
              app/layout.tsx renders directly below this section and already
              carries the © line, legal links, and socials — duplicating them
              made the page appear to end twice. */}
        </div>
      </section>
    </main>
  );
}