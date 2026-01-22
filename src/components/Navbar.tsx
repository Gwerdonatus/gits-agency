"use client";

import { useMemo, useState } from "react";
import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Easing curve used across navbar micro-interactions
 */
const ease = [0.22, 0.61, 0.36, 1] as const;

/**
 * Small utility to conditionally join classNames
 */
function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Premium hover text interaction
 * - stacked base + hover layers
 * - subtle vertical flip + rotation
 * - optional shine sweep on hover
 *
 * NOTE: We keep this for desktop + rich interactions,
 * but for mobile we will wrap it in a no-wrap + slightly italic container.
 */
function TwistText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom leading-none">
      {/* shine sweep */}
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute -inset-y-2 -left-10 w-10 rotate-12",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
          "opacity-0 group-hover:opacity-100",
          "translate-x-0 group-hover:translate-x-[220%]",
          "transition-all duration-500 ease-out"
        )}
      />

      {/* base layer */}
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-[105%] group-hover:rotate-[-6deg]">
        {children}
      </span>

      {/* hover layer */}
      <span className="absolute left-0 top-0 block translate-y-[105%] rotate-[6deg] opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:rotate-0 group-hover:opacity-100">
        {children}
      </span>
    </span>
  );
}

/**
 * Primary navigation link (desktop)
 * Desktop design stays the same, but we add italic to the label
 */
function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(
        "group relative inline-flex items-center rounded-full px-3 py-2 text-sm",
        "text-white/85 hover:text-white transition",
        active && "text-white"
      )}
      style={{ fontFamily: "Inter" }}
    >
      {/* italic label */}
      <span className="italic">
        <TwistText>{children}</TwistText>
      </span>

      {/* underline */}
      <span
        className={cx(
          "pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full transition",
          active ? "bg-white/85" : "bg-white/0 group-hover:bg-white/70"
        )}
      />
    </Link>
  );
}

/**
 * Secondary CTA button (outlined)
 */
function GhostButton({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(
        "group inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
        "border border-white/20 text-white/90 hover:text-white hover:border-white/35",
        "bg-black hover:bg-white/5 transition active:scale-[0.99]"
      )}
      style={{ fontFamily: "Inter" }}
    >
      <TwistText>{children}</TwistText>
    </Link>
  );
}

/**
 * Primary CTA button (filled)
 */
function PrimaryButton({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(
        "group inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
        "bg-white text-black hover:opacity-90 transition active:scale-[0.99]"
      )}
      style={{ fontFamily: "Inter" }}
    >
      <TwistText>{children}</TwistText>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  /**
   * Desktop + Mobile primary navigation
   * - Desktop keeps "What We Build"
   * - Mobile uses shorter label to prevent wrapping (durable)
   */
  const primary = useMemo(
    () => [
      { label: "Services", href: "/services", mobileLabel: "Services" },
      { label: "What We Build", href: "/what-we-build", mobileLabel: "Projects" }, // ✅ mobile label
      { label: "Blog", href: "/blog", mobileLabel: "Blog" },
      { label: "About", href: "/about", mobileLabel: "About" },
    ],
    []
  );

  /**
   * Mobile secondary navigation (inside menu)
   */
  const secondary = useMemo(
    () => [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Get free audit", href: "/audit" },
    ],
    []
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Solid black navbar */}
      <div className="relative bg-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 sm:h-[72px] items-center justify-between gap-3">
            {/* Brand */}
            <Link href="/" className="inline-flex items-center gap-3 select-none flex-shrink-0">
              <motion.div
                className="text-xl sm:text-2xl font-bold"
                style={{
                  fontFamily: "Playfair Display",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.70), rgba(255,255,255,0.95))",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                animate={{ backgroundPositionX: ["200%", "-50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                GITS.
              </motion.div>

              <span
                className="hidden sm:inline text-xs text-white/55 -mt-0.5"
                style={{ fontFamily: "Great Vibes" }}
              >
                clarity • speed • quality
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {primary.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <GhostButton href="/contact">Contact</GhostButton>
              <PrimaryButton href="/audit">Get free audit</PrimaryButton>
            </div>

            {/* Mobile top row */}
            <div className="md:hidden flex items-center gap-2 min-w-0">
              {/* Use shorter labels on mobile + prevent wrap */}
              {primary.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "group rounded-full px-3 py-2",
                    "text-[13px] text-white/85 hover:text-white transition",
                    "whitespace-nowrap leading-none italic" // ✅ italic + never stack
                  )}
                  style={{ fontFamily: "Inter" }}
                >
                  <TwistText>{item.mobileLabel ?? item.label}</TwistText>
                </Link>
              ))}

              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className={cx(
                  "ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0",
                  "border border-white/20 bg-black text-white",
                  "hover:bg-white/5 transition active:scale-[0.99]"
                )}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* bottom hairline */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease }}
            className="md:hidden fixed inset-x-0 top-0 z-[60]"
          >
            <div className="fixed inset-0 bg-black/70" onClick={() => setOpen(false)} />

            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              transition={{ duration: 0.22, ease }}
              className="relative mx-3 mt-3 overflow-hidden rounded-[22px] border border-white/12 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.70)]"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="text-sm text-white/70" style={{ fontFamily: "Inter" }}>
                  Menu
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-black text-white/90 hover:bg-white/5 transition"
                >
                  ✕
                </button>
              </div>

              <div className="px-4 pb-4">
                <div className="grid gap-2">
                  {secondary.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-2xl px-4 py-3 border border-white/12 bg-black text-white/90 hover:bg-white/5 transition"
                      style={{ fontFamily: "Inter" }}
                    >
                      {/* italic menu items too */}
                      <span className="text-sm font-medium italic">
                        <TwistText>{item.label}</TwistText>
                      </span>
                      <span className="text-white/50">→</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 grid gap-2">
                  <GhostButton href="/contact" onClick={() => setOpen(false)}>
                    Contact
                  </GhostButton>
                  {/* Keep route consistent with the rest of the app */}
                  <PrimaryButton href="/audit" onClick={() => setOpen(false)}>
                    Get free audit
                  </PrimaryButton>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/5 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
