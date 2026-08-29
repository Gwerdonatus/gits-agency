// src/components/editorial.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Shared primitives for the editorial design system established on the About
// page, so the service pages stop being their own visual island.
//
//   Palette   #FFFFFF paper · #050505 ink · #666666 quiet  (no accent colour)
//   Display   Instrument Sans, extralight — the studio's voice
//   Emphasis  Fraunces italic, light — the human aside
//   Utility   JetBrains Mono — eyebrows, numerals, labels
//   Frames    hairline borders, square corners, no shadow, no radius
//
// Deliberately NOT applied to the interactive product mockups on these pages:
// those depict real software (a pharmacy dashboard, a factory floor monitor)
// and their industry palettes are doing honest work. Chrome is monochrome;
// the demos keep their colour.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import React from "react";
import Link from "next/link";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], style: ["italic", "normal"], variable: "--font-fraunces" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

/** Root class for a page adopting the system. Without this the page inherits
 *  the Arial fallback set on body in globals.css. */
export const editorialRoot = [
  fraunces.variable,
  instrument.variable,
  mono.variable,
  "font-[family-name:var(--font-instrument)]",
].join(" ");

export function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

/** Crosshair registration mark — the recurring alignment motif. */
export function RegMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cx("w-3 h-3", className)} fill="none">
      <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export function Eyebrow({
  index,
  children,
  invert = false,
}: {
  index?: string;
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <RegMark className={invert ? "text-white/40" : "text-[#050505]/30"} />
      <p
        className={cx(
          "font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em]",
          invert ? "text-white/60" : "text-[#666666]"
        )}
      >
        {index && (
          <span className={invert ? "text-white/30" : "text-[#050505]/25"}>{index}</span>
        )}
        <span className={index ? "ml-3" : undefined}>{children}</span>
      </p>
    </div>
  );
}

/** Section heading: extralight display, tight tracking, generous scale. */
export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cx(
        "text-3xl md:text-4xl lg:text-[2.75rem] font-extralight leading-[1.1] tracking-tight text-[#050505]",
        className
      )}
    >
      {children}
    </h2>
  );
}

/** Square, hairline buttons — no pill radius, no shadow. */
export function EditorialButton({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-normal tracking-wide transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-[#050505] text-white hover:bg-[#242424]"
      : "border border-[#050505]/15 text-[#050505] hover:bg-[#050505] hover:text-white hover:border-[#050505]";
  const cls = cx(base, styles, className);
  return href.startsWith("#") ? (
    <a href={href} className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}
