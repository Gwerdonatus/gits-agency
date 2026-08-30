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

import React, { useEffect, useState } from "react";
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


/* ─────────────────────────────────────────────────────────────────────────────
   Section navigation.

   The service pages are long, and everything past the hero — the categories,
   the live demos, the FAQ — was reachable only by scrolling. This pins a jump
   menu under the site header so the whole page is addressable from the top,
   on both desktop and mobile.

   The site header is fixed at 64px, so this sits at top-16 and every target
   section needs matching scroll margin (see SECTION_SCROLL_MT).
   ───────────────────────────────────────────────────────────────────────── */

export type NavSection = { id: string; label: string };

/** Apply to any section the nav targets, so it clears both fixed bars. */
export const SECTION_SCROLL_MT = "scroll-mt-[124px]";

export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    // Bias the observation band towards the top of the viewport so the active
    // item changes when a section reaches the reading position, not when it
    // first peeks in from the bottom.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    setActive(id);
    // Keep the address bar in step without triggering a second jump.
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-16 z-40 border-y border-[#050505]/10 bg-white/85 backdrop-blur-md"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        {/* Scrolls horizontally on narrow screens rather than wrapping or
            truncating, so every section stays reachable on a phone. */}
        <ul className="flex items-stretch gap-7 sm:gap-9 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="flex-shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cx(
                    "relative block py-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-300",
                    isActive ? "text-[#050505]" : "text-[#666666] hover:text-[#050505]"
                  )}
                >
                  {s.label}
                  <span
                    aria-hidden
                    className={cx(
                      "absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-300",
                      isActive ? "scale-x-100 bg-[#050505]" : "scale-x-0 bg-transparent"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Full-bleed photograph band. Gives the long service pages a visual rest
   between the hero and the dense content below it. Colour is kept: these are
   the same photographs used on the services index.
   ───────────────────────────────────────────────────────────────────────── */
export function ImageBand({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cx("px-6 sm:px-10 lg:px-16", className)}>
      <div className="mx-auto max-w-[1400px]">
        <div className="relative w-full aspect-[21/9] overflow-hidden border border-[#050505]/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
        {caption && (
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#666666]">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
