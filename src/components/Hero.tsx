"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

export default function Hero() {
  const services = useMemo(
    () => ["Websites", "Mobile Apps", "Chrome Extensions", "AI Automations"] as const,
    []
  );

  const prefersReducedMotion = useReducedMotion();

  // ================= DESKTOP (unchanged behavior) =================
  const [desktopIndex, setDesktopIndex] = useState(0);

  useEffect(() => {
    const i = window.setInterval(() => {
      setDesktopIndex((prev) => (prev + 1) % services.length);
    }, 2200);
    return () => window.clearInterval(i);
  }, [services.length]);

  // Mouse parallax (kept)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window === "undefined") return;
    const { innerWidth, innerHeight } = window;
    x.set((e.clientX - innerWidth / 2) / 25);
    y.set((e.clientY - innerHeight / 2) / 25);
  };

  const glowX = useTransform(x, (v) => v * 1.5);
  const glowY = useTransform(y, (v) => v * 1.5);

  const floatIn = {
    hidden: { opacity: 0, y: 28, filter: prefersReducedMotion ? "none" : "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "none",
      transition: { duration: prefersReducedMotion ? 0.55 : 0.9, ease: "easeOut" as const },
    },
  };

  // Detect md+ (protect desktop)
  const [isMdUp, setIsMdUp] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // ================= MOBILE INTRO SEQUENCE =================
  type MobilePhase = "bg" | "typing" | "reveal";
  const [mobilePhase, setMobilePhase] = useState<MobilePhase>("bg");

  const [bgReady, setBgReady] = useState(false);

  const mobileHeadline = "We Build Digital Products That Help Businesses Grow";
  const [typedHeadline, setTypedHeadline] = useState("");

  // Lock scroll until reveal completes + ~3s total “attention lock”
  useEffect(() => {
    if (isMdUp) return;

    const root = document.documentElement;
    const body = document.body;

    const prevRootOverflow = root.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevTouchAction = root.style.touchAction;

    // lock immediately on mobile mount
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    root.style.touchAction = "none";

    // unlock only after reveal + buffer (to make total feel ~3s)
    let unlockTimer: number | undefined;
    if (mobilePhase === "reveal") {
      unlockTimer = window.setTimeout(() => {
        root.style.overflow = prevRootOverflow;
        body.style.overflow = prevBodyOverflow;
        root.style.touchAction = prevTouchAction;
      }, 1200); // ~1.2s after reveal (typing + this ≈ ~3s)
    }

    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      root.style.overflow = prevRootOverflow;
      body.style.overflow = prevBodyOverflow;
      root.style.touchAction = prevTouchAction;
    };
  }, [isMdUp, mobilePhase]);

  // Step 1 -> 2: background ready => start typing
  useEffect(() => {
    if (isMdUp) return;
    if (!bgReady) return;

    const t = window.setTimeout(() => setMobilePhase("typing"), 120);
    return () => window.clearTimeout(t);
  }, [bgReady, isMdUp]);

  // Step 2: typewriter with “human cadence”
  useEffect(() => {
    if (isMdUp) return;
    if (mobilePhase !== "typing") return;

    let cancelled = false;

    setTypedHeadline("");

    const base = prefersReducedMotion ? 12 : 22;

    const nextDelay = (nextText: string) => {
      const lastChar = nextText[nextText.length - 1] ?? "";

      // Punctuation pauses
      if (",.;:!?".includes(lastChar)) return base + 200;

      // Slight pause after spaces (feels like thinking / word boundaries)
      if (lastChar === " ") return base + 35;

      // Special “That” beat: pause right after typing “That ”
      if (nextText.endsWith("That ")) return base + 220;

      // Tiny variability so it doesn’t feel robotic
      const jitter = prefersReducedMotion ? 0 : Math.floor(Math.random() * 10); // 0–9ms
      return base + jitter;
    };

    const type = (i: number) => {
      if (cancelled) return;

      const next = mobileHeadline.slice(0, i);
      setTypedHeadline(next);

      if (i >= mobileHeadline.length) {
        window.setTimeout(() => {
          if (cancelled) return;
          setMobilePhase("reveal");
        }, prefersReducedMotion ? 120 : 180);
        return;
      }

      window.setTimeout(() => type(i + 1), nextDelay(next));
    };

    // Start typing
    window.setTimeout(() => type(1), prefersReducedMotion ? 80 : 120);

    return () => {
      cancelled = true;
    };
  }, [isMdUp, mobileHeadline, mobilePhase, prefersReducedMotion]);

  const handleMobileVideoReady = () => {
    if (isMdUp) return;
    setBgReady(true);
  };

  // ================= MOBILE SERVICE ROTATION (after reveal) =================
  const [mobileIndex, setMobileIndex] = useState(0);

  // First-swap micro blink
  const firstSwapDoneRef = useRef(false);
  const prevMobileIndexRef = useRef(0);

  useEffect(() => {
    if (isMdUp) return;
    if (mobilePhase !== "reveal") return;

    const i = window.setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % services.length);
    }, 2200);

    return () => window.clearInterval(i);
  }, [isMdUp, mobilePhase, services.length]);

  const shouldBlinkThisSwap = (() => {
    // Compute based on current + previous index, without forcing re-renders
    const prev = prevMobileIndexRef.current;
    const curr = mobileIndex;
    if (prev !== curr && !firstSwapDoneRef.current) return true;
    return false;
  })();

  useEffect(() => {
    // Track index changes and mark first swap as done
    const prev = prevMobileIndexRef.current;
    if (prev !== mobileIndex) {
      if (!firstSwapDoneRef.current) firstSwapDoneRef.current = true;
      prevMobileIndexRef.current = mobileIndex;
    }
  }, [mobileIndex]);

  return (
    <section
      className="relative w-full min-h-screen bg-black text-white overflow-hidden font-light"
      onMouseMove={handleMouseMove}
    >
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:grid grid-cols-2 h-screen">
        {/* TEXT SIDE */}
        <div className="relative flex flex-col items-start justify-center px-12 select-none">
          <motion.div
            style={{ x: glowX, y: glowY }}
            className="absolute -z-10 w-[450px] h-[450px] bg-white/20 rounded-full blur-[170px]
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          <motion.h1
            variants={floatIn}
            initial="hidden"
            animate="visible"
            className="text-4xl lg:text-5xl tracking-wide leading-tight"
          >
            Designing &amp; Engineering Digital Products That Drive Growth
          </motion.h1>

          <motion.p
            variants={floatIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-gray-300 mt-4 text-lg max-w-md leading-relaxed"
          >
            We design and build{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={services[desktopIndex]}
                initial={{ opacity: 0, y: 12, filter: prefersReducedMotion ? "none" : "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "none" }}
                exit={{ opacity: 0, y: -12, filter: prefersReducedMotion ? "none" : "blur(4px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-white font-medium inline-block"
              >
                {services[desktopIndex]}
              </motion.span>
            </AnimatePresence>{" "}
            — built to solve real business problems, ship fast, and scale confidently.
          </motion.p>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="mt-8 inline-flex items-center justify-center border border-white/30 px-6 py-3 rounded-md hover:bg-white/10 transition"
          >
            Start a Project
          </motion.a>
        </div>

        {/* VIDEO SIDE */}
        <div className="relative">
          <video
            src="/run1.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden relative h-screen w-full flex items-center justify-center text-center px-4">
        {/* Background loads first */}
        <video
          src="/geo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={handleMobileVideoReady}
          onCanPlay={handleMobileVideoReady}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            // a little hint to browsers for smoother compositing on low-end devices
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 select-none w-full max-w-[28rem]">
          {/* Headline appears only after bg ready */}
          <AnimatePresence mode="wait">
            {(mobilePhase === "typing" || mobilePhase === "reveal") && (
              <motion.h1
                key="mobile-headline"
                initial={{ opacity: 0, y: 10, filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "none" }}
                exit={{ opacity: 0, y: -10, filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.45, ease: "easeOut" }}
                className="text-3xl tracking-wide leading-tight"
              >
                {typedHeadline}
                {mobilePhase === "typing" && (
                  <motion.span
                    aria-hidden
                    className="inline-block align-baseline ml-0.5"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: prefersReducedMotion ? 1.1 : 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    |
                  </motion.span>
                )}
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Rest reveals AFTER typing finishes */}
          <AnimatePresence>
            {mobilePhase === "reveal" && (
              <motion.div
                key="mobile-rest"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 10, filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                variants={floatIn}
                className="mt-4"
              >
                <p className="text-gray-300 leading-relaxed">
                  From{" "}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={services[mobileIndex]}
                      initial={{ opacity: 0, y: 10, filter: prefersReducedMotion ? "none" : "blur(4px)" }}
                      animate={
                        shouldBlinkThisSwap
                          ? { opacity: [1, 0.25, 1], y: 0, filter: "none" } // micro blink on FIRST swap
                          : { opacity: 1, y: 0, filter: "none" }
                      }
                      exit={{ opacity: 0, y: -10, filter: prefersReducedMotion ? "none" : "blur(4px)" }}
                      transition={
                        shouldBlinkThisSwap
                          ? { duration: 0.18, ease: "easeInOut" }
                          : { duration: 0.5, ease: "easeOut" }
                      }
                      className="text-white font-medium inline-block"
                    >
                      {services[mobileIndex]}
                    </motion.span>
                  </AnimatePresence>{" "}
                  to AI-driven automations, we build custom systems that streamline operations and unlock new
                  revenue.
                </p>

                <motion.a
                  href="/contact"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0.1 : 0.2, duration: 0.6, ease: "easeOut" }}
                  className="mt-6 inline-flex items-center justify-center border border-white/30 px-6 py-3 rounded-md hover:bg-white/10 transition"
                >
                  Start a Project
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
