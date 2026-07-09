"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const spring = [0.22, 0.61, 0.36, 1] as const;

/* ── Inline SVG social icons — crisp, no dependency ── */
function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function TwitterXIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { label: "Facebook",  href: "https://facebook.com",  Icon: FacebookIcon  },
  { label: "LinkedIn",  href: "https://linkedin.com",  Icon: LinkedInIcon  },
  { label: "Twitter",   href: "https://twitter.com",   Icon: TwitterXIcon  },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
];

const services = [
  { label: "Custom Software Development", href: "/services/custom-software"   },
  { label: "Websites & Digital Experiences", href: "/services/websites"         },
  { label: "AI & Business Automation",    href: "/services/ai-automation"     },
  { label: "Internal Tools & CRM",        href: "/services/internal-tools"    },
  { label: "Integrations & APIs",         href: "/services/integrations"      },
];

const company = [
  { label: "About",    href: "/about"    },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog"     },
  { label: "Contact",  href: "/contact"  },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.22, ease: spring }}>
      <Link
        href={href}
        className="text-[12.5px] font-light text-white/45 hover:text-white/90 transition-colors duration-[220ms] leading-none"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {children}
      </Link>
    </motion.div>
  );
}

// ── Newsletter signup — new, minimal, native to footer ──
function NewsletterSignup() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [name, setName]   = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError]   = useState<string | null>(null);

  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  const canSend = emailOk && !name.trim() && status !== "sending";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim(), name }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      setEmail("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setStatus("error");
      setError(msg);
      setTimeout(() => { setStatus("idle"); setError(null); }, 5000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: spring, delay: 0.18 }}
      className="mx-auto max-w-[860px] px-10 py-[44px] border-b border-white/[0.07]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

        {/* Left: label + desc */}
        <div className="max-w-[280px]">
          <p
            className="text-[10.5px] uppercase tracking-[0.18em] text-white/22 mb-2"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Newsletter
          </p>
          <p
            className="text-[13.5px] font-light text-white/55 leading-[1.65]"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Build insights, design notes, and short industry takes. Low frequency. No filler.
          </p>
        </div>

        {/* Right: form */}
        <div className="flex-1 max-w-[360px]">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: spring }}
                className="text-[12.5px] text-white/55 leading-[1.6]"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                You&apos;re on the list.{" "}
                <span className="text-white/30">Check your inbox.</span>
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Honeypot — hidden from real users */}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    autoComplete="email"
                    inputMode="email"
                    className="flex-1 min-w-0 rounded-full border border-white/10 bg-white/[0.05]
                               px-4 py-[9px] text-[12.5px] text-white/80
                               placeholder:text-white/20 outline-none
                               focus:border-white/20 focus:bg-white/[0.07]
                               transition-all duration-200"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                  <motion.button
                    type="submit"
                    disabled={!canSend}
                    whileHover={canSend ? { y: -1 } : {}}
                    transition={{ duration: 0.18, ease: spring }}
                    className="rounded-full px-5 py-[9px] text-[12.5px] font-medium
                               transition-all duration-200 whitespace-nowrap
                               disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      backgroundColor: status === "sending" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)",
                      color: status === "sending" ? "rgba(255,255,255,0.4)" : "#000000",
                    }}
                  >
                    {status === "sending" ? "…" : "Subscribe"}
                  </motion.button>
                </div>

                {/* Inline error */}
                <AnimatePresence>
                  {status === "error" && error ? (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 text-[11.5px] text-red-400/80"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                      {error}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-black text-white overflow-hidden isolate"
      style={{
        backgroundColor: "#000000",
      }}
    >

      {/* ════════════════════════════════════
          CTA BAND
      ════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: spring, delay: 0.05 }}
        className="mx-auto max-w-[860px] px-10 pt-[72px] pb-[52px] border-b border-white/[0.07]"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">

          {/* Hook copy */}
          <div>
            <p
              className="text-[10.5px] uppercase tracking-[0.18em] text-white/22 mb-3"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Ready to build something great?
            </p>
            <h2
              className="text-[28px] sm:text-[34px] font-medium leading-[1.15] text-white tracking-[-0.02em] max-w-[360px]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Let&apos;s turn your idea<br />into a product.
            </h2>
          </div>

          {/* CTA group */}
          <div className="flex flex-col gap-3">
            <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.18, ease: spring }}>
              <Link
                href="/audit"
                className="inline-flex items-center gap-2 bg-white text-black
                           px-6 py-[11px] rounded-full text-[12.5px] font-medium
                           hover:bg-white/90 transition-colors duration-200"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Get a free audit ↗
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.18, ease: spring }}>
              <Link
                href="mailto:hello@gits.technology"
                className="inline-flex items-center gap-2 border border-white/14 rounded-full
                           px-6 py-[11px] text-[12.5px] text-white/55 hover:text-white
                           hover:border-white/35 hover:bg-white/[0.04]
                           transition-all duration-[250ms]"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                hello@gits.technology
              </Link>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* ════════════════════════════════════
          NEWSLETTER SIGNUP — new section
      ════════════════════════════════════ */}
      <NewsletterSignup />

      {/* ════════════════════════════════════
          MAIN FOOTER GRID
      ════════════════════════════════════ */}
      <div className="mx-auto max-w-[860px] px-10 pt-[52px] pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-y-12 gap-x-14">

          {/* ── Brand column ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: spring, delay: 0.1 }}
          >
            {/* Logo + wordmark */}
            <div className="flex items-center gap-[10px] mb-[14px]">
              <Image
                src="/email-icon1.png"
                alt="GITS"
                width={48}
                height={48}
                className="object-contain"
              />
              <span
                className="text-[17px] font-medium tracking-[0.22em] uppercase text-white"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                GITS.
              </span>
            </div>

            {/* Tagline */}
            <p
              className="text-[12px] font-light text-white/32 leading-[1.8] max-w-[200px] mb-6"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Premium web experiences — design that feels expensive,
              engineering that stays clean.
            </p>

            {/* Location */}
            <p
              className="text-[11px] font-light text-white/20 leading-[1.8] mb-6"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
             <br />
              <span className="text-white/13">Available worldwide · Remote-first</span>
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-[14px]">
              {socials.map(({ label, href, Icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: spring, delay: 0.3 + i * 0.07 }}
                  whileHover={{ y: -2, color: "#ffffff" }}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center
                             text-white/35 hover:text-white hover:border-white/30 hover:bg-white/[0.05]
                             transition-colors duration-200"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Services column ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: spring, delay: 0.28 }}
              className="text-[10px] uppercase tracking-[0.15em] text-white/18 mb-[18px]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Services
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: spring, delay: 0.36 }}
              className="flex flex-col gap-[12px]"
            >
              {services.map(({ label, href }) => (
                <NavLink key={href} href={href}>{label}</NavLink>
              ))}
            </motion.div>
          </div>

          {/* ── Company column ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: spring, delay: 0.32 }}
              className="text-[10px] uppercase tracking-[0.15em] text-white/18 mb-[18px]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Company
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: spring, delay: 0.40 }}
              className="flex flex-col gap-[12px]"
            >
              {company.map(({ label, href }) => (
                <NavLink key={href} href={href}>{label}</NavLink>
              ))}
            </motion.div>
          </div>

        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
          style={{ originX: 0 }}
          className="mt-[52px] h-px bg-white/[0.08]"
        />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: spring, delay: 1.2 }}
          className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <p
              className="text-[11px] font-light text-white/16 tracking-[0.02em]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              © {year} GITS · Gwer Intelligent Tech Solutions
            </p>
            <span className="hidden sm:block text-white/10 text-[11px]">·</span>
            <p
              className="text-[11px] font-light text-white/12 tracking-[0.02em]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
               · Remote-first · Available worldwide
            </p>
          </div>
          <nav className="flex gap-6" aria-label="Legal">
            {["Privacy", "Terms"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="text-[11px] font-light text-white/16 hover:text-white/50 transition-colors duration-150"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* ── Full-bleed cinematic image ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
        className="relative w-full"
        style={{ aspectRatio: "16 / 7" }}
      >
        <Image
          src="/footer-hands.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
          priority={false}
          aria-hidden="true"
        />
        {/* Top fade blends from the footer&apos;s black */}
        <div
          className="absolute inset-x-0 top-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #000000 0%, transparent 100%)" }}
        />
        {/* Bottom vignette so image doesn&apos;t cut too harshly */}
        <div
          className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
        />
      </motion.div>

    </footer>
  );
}
