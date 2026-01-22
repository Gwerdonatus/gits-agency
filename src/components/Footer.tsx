"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Shared easing curve for subtle footer motion
 */
const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * Utility: conditionally join classNames
 */
function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Decorative water-like wave separator
 */
function BlueWave({ flip = false }: { flip?: boolean }) {
  return (
    <div className={flip ? "rotate-180" : ""} aria-hidden="true">
      <svg viewBox="0 0 1440 90" className="block w-full h-[60px] sm:h-[70px] md:h-[90px]">
        <defs>
          <linearGradient id="gitsFooterWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(37,99,235,0.18)" />
            <stop offset="40%" stopColor="rgba(34,211,238,0.16)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.16)" />
          </linearGradient>
        </defs>
        <path
          d="M0,64L60,58.7C120,53,240,43,360,32C480,21,600,11,720,16C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,90L1380,90C1320,90,1200,90,1080,90C960,90,840,90,720,90C600,90,480,90,360,90C240,90,120,90,60,90L0,90Z"
          fill="url(#gitsFooterWave)"
        />
      </svg>
    </div>
  );
}

/**
 * CTA pill button
 */
function Pill({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ghost" | "solid";
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition active:scale-[0.99]",
        variant === "solid"
          ? "bg-white text-black hover:opacity-90"
          : "border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
      )}
      style={{ fontFamily: "Inter" }}
    >
      {children}
    </Link>
  );
}

/**
 * Footer navigation link
 */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-white/70 hover:text-white transition"
      style={{ fontFamily: "Inter" }}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8">
      {/* Soft water-like separator */}
      <div className="relative">
        <BlueWave />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.35 }}
        >
          <BlueWave />
        </motion.div>
      </div>

      {/* Main footer */}
      <section className="relative bg-black text-white overflow-hidden">
        {/* Ambient background motion */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <motion.div
            className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "rgba(255,255,255,0.06)" }}
            animate={{ x: [0, 14, -10, 0], y: [0, -10, 12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 h-[640px] w-[640px] rounded-full blur-3xl"
            style={{ background: "rgba(37,99,235,0.10)" }}
            animate={{ x: [0, 18, -12, 0], y: [0, 12, -10, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-48 right-[-220px] h-[720px] w-[720px] rounded-full blur-3xl"
            style={{ background: "rgba(34,211,238,0.08)" }}
            animate={{ x: [0, -16, 10, 0], y: [0, -8, 14, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-16">
          {/* Top CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease }}
            className="rounded-[28px] sm:rounded-[34px] border border-white/12 bg-white/5 backdrop-blur-xl p-6 sm:p-7 md:p-8 overflow-hidden"
            style={{
              boxShadow:
                "0 50px 140px rgba(0,0,0,0.55), 0 12px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.20), transparent 45%), radial-gradient(circle at 85% 30%, rgba(34,211,238,0.16), transparent 55%)",
              }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <div
                  className="text-xs uppercase tracking-widest text-white/55"
                  style={{ fontFamily: "Inter" }}
                >
                  Ready when you are
                </div>
                <h3
                  className="mt-3 text-2xl md:text-3xl font-medium leading-tight text-white"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  Want a premium website that converts and feels expensive?
                </h3>
                <p
                  className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "Inter" }}
                >
                  We design clean UI/UX, build fast Next.js apps, and automate workflows that save teams hours every week.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Pill href="/contact" variant="solid">
                  Contact
                </Pill>
                <Pill href="/audit">Get free audit</Pill>
              </div>
            </div>

            {/* Living ticker */}
            <motion.div className="relative mt-6 overflow-hidden" aria-hidden="true">
              <motion.div
                className="flex gap-3 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
              >
                {[
                  "UI/UX that earns trust",
                  "Performance that feels instant",
                  "Clean engineering",
                  "Conversion-first pages",
                  "Automation & integrations",
                  "Design systems",
                  "SEO-ready structure",
                  "Accessibility checks",
                ].map((text, i) => (
                  <span
                    key={`${text}-${i}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-4 py-2 text-xs text-white/75"
                    style={{ fontFamily: "Inter" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Footer grid */}
          <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr,1fr,1fr,1fr]">
            <div>
              <div
                className="text-2xl font-bold tracking-[0.15em] uppercase"
                style={{ fontFamily: "Playfair Display" }}
              >
                GITS.
              </div>
              <p
                className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-md"
                style={{ fontFamily: "Inter" }}
              >
                We help businesses ship premium web experiences—design that feels expensive, engineering that stays clean,
                and automation that scales.
              </p>
            </div>

            <div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: "Inter" }}>
                Company
              </div>
              <div className="mt-4 grid gap-2">
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/projects">Projects</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: "Inter" }}>
                Services
              </div>
              <div className="mt-4 grid gap-2">
                <FooterLink href="/services">Web design & development</FooterLink>
                <FooterLink href="/services">Product UI/UX</FooterLink>
                <FooterLink href="/services">Automation & integrations</FooterLink>
                <FooterLink href="/audit">Free audit</FooterLink>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: "Inter" }}>
                Contact
              </div>
              <div className="mt-4 grid gap-2 text-sm text-white/70" style={{ fontFamily: "Inter" }}>
                <span>Response time: 24–72h</span>
                <span className="text-white/55">Prefer email? Use the audit form.</span>
                <div className="pt-2">
                  <Pill href="/audit" variant="solid">
                    Get free audit
                  </Pill>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 pt-6">
            <p className="text-xs text-white/55" style={{ fontFamily: "Inter" }}>
              © {year} GITS • Built with clarity, speed, and quality.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="text-xs text-white/55 hover:text-white transition" style={{ fontFamily: "Inter" }}>
                Privacy
              </Link>
              <Link href="/about" className="text-xs text-white/55 hover:text-white transition" style={{ fontFamily: "Inter" }}>
                Terms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
