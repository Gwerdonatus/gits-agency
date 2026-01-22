"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";

export default function Hero() {
  const services = ["Websites", "Mobile Apps", "Chrome Extensions", "AI Automations"] as const;

  const [index, setIndex] = useState(0);

  // Rotate service words
  useEffect(() => {
    const i = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 2200);

    return () => window.clearInterval(i);
  }, [services.length]);

  // Mouse parallax
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

  // Shared smooth float animation
  const floatIn = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: "easeOut" as const },
    },
  };

  return (
    <section
      className="relative w-full min-h-screen bg-black text-white overflow-hidden font-light"
      onMouseMove={handleMouseMove}
    >
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:grid grid-cols-2 h-screen">
        {/* TEXT SIDE */}
        <div className="relative flex flex-col items-start justify-center px-12 select-none">
          {/* Glow */}
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
                key={services[index]}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-white font-medium inline-block"
              >
                {services[index]}
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
        <video
          src="/blue.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <motion.div initial="hidden" animate="visible" variants={floatIn} className="relative z-10 select-none">
          <h1 className="text-3xl tracking-wide leading-tight">
            We Build Digital Products That Help Businesses Grow
          </h1>

          <p className="text-gray-300 mt-4 leading-relaxed">
            From{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={services[index]}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-white font-medium inline-block"
              >
                {services[index]}
              </motion.span>
            </AnimatePresence>{" "}
            to AI-driven automations, we build custom systems that streamline operations and unlock new revenue.
          </p>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="mt-6 inline-flex items-center justify-center border border-white/30 px-6 py-3 rounded-md hover:bg-white/10 transition"
          >
            Start a Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
