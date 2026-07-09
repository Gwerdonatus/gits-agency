"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  type MotionValue,
  type PanInfo,
} from "framer-motion";

const STEPS = [
  {
    title: "Discovery",
    subtitle: "Align & de-risk",
    body: "We clarify goals, users, constraints, and success metrics. Then we define scope and a realistic plan.",
    badge: "01",
  },
  {
    title: "Strategy & Architecture",
    subtitle: "Design the system",
    body: "We map flows, data, and integrations — choosing the right stack and structure for scalability.",
    badge: "02",
  },
  {
    title: "Design & Build",
    subtitle: "Iterate fast, build clean",
    body: "We design interfaces and ship in iterations with constant feedback, quality checks, and clear progress.",
    badge: "03",
  },
  {
    title: "Launch",
    subtitle: "Go live with confidence",
    body: "We deploy, monitor, and validate in production — ensuring performance, stability, and smooth rollout.",
    badge: "04",
  },
  {
    title: "Scale & Support",
    subtitle: "Improve continuously",
    body: "We optimize, expand features, and support long-term growth — acting like your technical partner.",
    badge: "05",
  },
] as const;

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const WAVE_VIEWBOX_W = 1200;
const WAVE_VIEWBOX_H = 80;

export default function ProcessCarouselPerfect() {
  const total = STEPS.length;

  const sectionRef = useRef<HTMLElement | null>(null);
  const waveRef = useRef<HTMLDivElement | null>(null);

  // Dot refs so wave can follow exact dot center
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [active, setActive] = useState(0);

  // sizing
  const [cardW, setCardW] = useState(560);
  const [gap, setGap] = useState(28);
  const [waveW, setWaveW] = useState(0);

  // fill in PX (orb position), then mapped into SVG units for clipPath
  const [fillPx, setFillPx] = useState(0);

  // Track translate
  const x: MotionValue<number> = useMotionValue(0);

  // Trackpad/momentum control state (desktop only)
  const wheelAccum = useRef(0);
  const wheelLock = useRef(false);
  const rafRef = useRef<number | null>(null);

  // For drag resistance
  const dragStartX = useRef(0);

  // Unique IDs per component instance (avoids SVG id collisions if rendered twice)
  const uid = useMemo(
    () => `gits-${Math.random().toString(36).slice(2, 9)}`,
    []
  );
  const clipId = `${uid}-waveClip`;
  const gradId = `${uid}-waveGrad`;

  // Ensure dotRefs length is stable
  useEffect(() => {
    if (dotRefs.current.length !== total) {
      dotRefs.current = Array.from(
        { length: total },
        (_, i) => dotRefs.current[i] ?? null
      );
    }
  }, [total]);

  // Measure responsive layout (desktop design unchanged)
  useLayoutEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;

      const nextCardW =
        vw < 360
          ? Math.floor(vw * 0.9)
          : vw < 520
          ? Math.floor(vw * 0.88)
          : vw < 768
          ? Math.floor(vw * 0.8)
          : vw < 1024
          ? 520
          : 560;

      const nextGap = vw < 520 ? 14 : vw < 768 ? 18 : 28;

      setCardW(nextCardW);
      setGap(nextGap);

      if (waveRef.current) {
        const rect = waveRef.current.getBoundingClientRect();
        setWaveW(rect.width);
      }

      // iOS Safari sometimes finalizes layout after paint
      requestAnimationFrame(() => {
        if (!waveRef.current) return;
        setWaveW(waveRef.current.getBoundingClientRect().width);
      });
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  // Centering math (true screen center)
  const targetXForIndex = (idx: number) => {
    const step = cardW + gap;
    const viewportCenter = window.innerWidth / 2;
    const cardCenter = idx * step + cardW / 2;
    return -(cardCenter - viewportCenter);
  };

  const animateTo = (
    idx: number,
    opts: Parameters<typeof animate>[2] = {}
  ) => {
    const target = targetXForIndex(idx);

    // ✅ Build-safe across Framer Motion type versions:
    // Some versions don't expose the MotionValue<number> overload correctly,
    // so we cast to avoid TS choosing the wrong object-target overload.
    return animate(x as unknown as any, target as unknown as any, {
      type: "spring",
      stiffness: 140,
      damping: 22,
      mass: 0.25,
      ...opts,
    });
  };

  const goTo = (idx: number, { immediate = false } = {}) => {
    const nextIdx = clamp(idx, 0, total - 1);
    setActive(nextIdx);

    if (immediate) x.set(targetXForIndex(nextIdx));
    else animateTo(nextIdx);
  };

  const next = () => goTo(active === total - 1 ? 0 : active + 1);
  const prev = () => goTo(active === 0 ? total - 1 : active - 1);

  // Keep centered on responsive sizing changes
  useEffect(() => {
    goTo(active, { immediate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardW, gap]);

  // Dot-accurate wave position
  const computeFillFromDot = () => {
    if (!waveRef.current) return;

    const waveRect = waveRef.current.getBoundingClientRect();
    const dotEl = dotRefs.current[active];

    // fallback: percentage if dot ref not ready
    if (!dotEl) {
      const p = total <= 1 ? 0 : active / (total - 1);
      setFillPx(p * Math.max(0, waveRect.width));
      return;
    }

    const dotRect = dotEl.getBoundingClientRect();
    const dotCenterX = dotRect.left + dotRect.width / 2;

    // fillPx is dot center relative to wave container left
    const px = clamp(dotCenterX - waveRect.left, 0, waveRect.width);
    setFillPx(px);
  };

  // Keep wave aligned on active change + after layout settles
  useEffect(() => {
    computeFillFromDot();
    const raf1 = requestAnimationFrame(() => computeFillFromDot());
    const raf2 = requestAnimationFrame(() => computeFillFromDot()); // extra for Safari
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, waveW]);

  // Observe wave resizing (mobile safe)
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    if (!waveRef.current) return;

    const ro = new ResizeObserver(() => {
      if (!waveRef.current) return;
      const rect = waveRef.current.getBoundingClientRect();
      setWaveW(rect.width);
      computeFillFromDot();
    });

    ro.observe(waveRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Map px fill into SVG units (clipPath uses viewBox units!)
  const fillSvg = waveW > 0 ? (fillPx / waveW) * WAVE_VIEWBOX_W : 0;

  // Scrub wave
  const setFromClientX = (clientX: number) => {
    if (!waveRef.current) return;
    const rect = waveRef.current.getBoundingClientRect();
    const localX = clamp(clientX - rect.left, 0, rect.width);
    const p = rect.width === 0 ? 0 : localX / rect.width;
    const idx = Math.round(p * (total - 1));
    goTo(idx);
  };

  // Wheel + Trackpad + Momentum (desktop only)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Don’t hijack scroll on touch devices
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const threshold = 65;
    const decay = 0.86;

    const commitIfNeeded = () => {
      if (wheelLock.current) return;

      if (wheelAccum.current > threshold) {
        wheelLock.current = true;
        wheelAccum.current = 0;
        next();
        setTimeout(() => (wheelLock.current = false), 280);
      } else if (wheelAccum.current < -threshold) {
        wheelLock.current = true;
        wheelAccum.current = 0;
        prev();
        setTimeout(() => (wheelLock.current = false), 280);
      }
    };

    const tick = () => {
      wheelAccum.current *= decay;

      if (Math.abs(wheelAccum.current) < 0.5) {
        wheelAccum.current = 0;
        rafRef.current = null;
        return;
      }

      commitIfNeeded();
      rafRef.current = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      wheelAccum.current += delta;

      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      commitIfNeeded();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, cardW, gap]);

  // Drag / Swipe with snap + resistance
  const onDragStart = () => {
    dragStartX.current = x.get();
  };

  const onDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    x.set(dragStartX.current + info.offset.x * 0.9);
  };

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipe = info.offset.x;
    const threshold = cardW * 0.18;

    if (swipe < -threshold) next();
    else if (swipe > threshold) prev();
    else animateTo(active, { damping: 26 });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#f4f5f7" }}
    >
      {/* Curvy demarcation */}
      <div className="absolute top-0 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1440 140"
          className="w-full h-[120px] md:h-[140px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,140 420,20 720,80 C1020,140 1200,30 1440,70 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="relative pt-28 md:pt-32 pb-24">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Our Process
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-medium leading-tight text-gray-900">
            From idea to launch — in clear, proven steps.
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            We align on the goal, design the right solution, build with
            precision, and support you as you grow — so your product ships
            confidently and scales smoothly.
          </p>
        </div>

        {/* Wave */}
        <div className="max-w-7xl mx-auto px-6 mt-10 md:mt-14">
          <div
            ref={waveRef}
            className="relative h-14 select-none"
            onPointerDown={(e) => setFromClientX(e.clientX)}
            onPointerMove={(e) => {
              if (e.buttons === 1) setFromClientX(e.clientX);
            }}
            style={{ touchAction: "none" }}
          >
            {/* Base wave */}
            <svg
              viewBox={`0 0 ${WAVE_VIEWBOX_W} ${WAVE_VIEWBOX_H}`}
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 40 C120 10 240 70 360 40 C480 10 600 70 720 40 C840 10 960 70 1080 40 C1140 25 1170 20 1200 30"
                fill="none"
                stroke="rgba(17, 24, 39, 0.22)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            {/* Filled wave */}
            <svg
              viewBox={`0 0 ${WAVE_VIEWBOX_W} ${WAVE_VIEWBOX_H}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <clipPath id={clipId}>
                  <rect x="0" y="0" width={fillSvg} height={WAVE_VIEWBOX_H} />
                </clipPath>

                <linearGradient
                  id={gradId}
                  x1="0"
                  y1="0"
                  x2={WAVE_VIEWBOX_W}
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="45%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>

              <path
                d="M0 40 C120 10 240 70 360 40 C480 10 600 70 720 40 C840 10 960 70 1080 40 C1140 25 1170 20 1200 30"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="5.5"
                strokeLinecap="round"
                clipPath={`url(#${clipId})`}
                style={{ filter: "drop-shadow(0 0 18px rgba(37,99,235,0.55))" }}
              />
            </svg>

            {/* Orb follows dot-center in px */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${fillPx}px` }}
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  background: "#2563eb",
                  boxShadow:
                    "0 0 0 8px rgba(37,99,235,0.18), 0 0 40px rgba(37,99,235,0.7)",
                }}
              />
            </div>
          </div>

          {/* Step dots */}
          <div className="mt-5 flex items-center justify-between">
            {STEPS.map((s, i) => {
              const isActive = i === active;

              return (
                <button
                  key={s.badge}
                  onClick={() => goTo(i)}
                  className="flex flex-col items-center gap-2"
                  aria-label={`Go to step ${s.badge}: ${s.title}`}
                  type="button"
                >
                  <span
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="h-3 w-3 rounded-full transition"
                    style={{
                      background: isActive
                        ? "#2563eb"
                        : "rgba(17,24,39,0.25)",
                      boxShadow: isActive
                        ? "0 0 18px rgba(37,99,235,0.45)"
                        : "none",
                    }}
                  />
                  <span
                    className={`text-[11px] tracking-[0.25em] ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {s.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-12 relative w-full">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-28"
            style={{
              background:
                "linear-gradient(to right, rgba(244,245,247,1), rgba(244,245,247,0))",
              zIndex: 4,
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-28"
            style={{
              background:
                "linear-gradient(to left, rgba(244,245,247,1), rgba(244,245,247,0))",
              zIndex: 4,
            }}
          />

          {/* Buttons (desktop only) */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl bg-white border border-black/10 items-center justify-center shadow-sm hover:shadow-md transition"
            aria-label="Previous"
            style={{ zIndex: 5 }}
            type="button"
          >
            ←
          </button>

          <button
            onClick={next}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl bg-white border border-black/10 items-center justify-center shadow-sm hover:shadow-md transition"
            aria-label="Next"
            style={{ zIndex: 5 }}
            type="button"
          >
            →
          </button>

          {/* Full-width viewport; center via padding */}
          <div
            className="overflow-hidden w-full"
            style={{
              paddingLeft: `calc(50% - ${cardW / 2}px)`,
              paddingRight: `calc(50% - ${cardW / 2}px)`,
            }}
          >
            <motion.div
              className="flex"
              style={{ x, gap: `${gap}px` }}
              drag="x"
              dragElastic={0.12}
              dragConstraints={{
                left: -(total - 1) * (cardW + gap),
                right: 0,
              }}
              onDragStart={onDragStart}
              onDrag={onDrag}
              onDragEnd={onDragEnd}
            >
              {STEPS.map((s, idx) => {
                const dist = Math.abs(idx - active);
                const isActive = dist === 0;
                const opacity = isActive ? 1 : dist === 1 ? 0.55 : 0.2;

                return (
                  <div
                    key={s.badge}
                    className="relative shrink-0 bg-white border border-black/10 p-9 md:p-10"
                    style={{
                      width: `${cardW}px`,
                      borderRadius: "40px",
                      opacity,
                      boxShadow: isActive
                        ? "0 32px 90px rgba(0,0,0,0.18), 0 10px 22px rgba(0,0,0,0.06)"
                        : "0 16px 36px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
                      transform: isActive
                        ? "translateY(0px)"
                        : "translateY(10px)",
                      transition:
                        "opacity 260ms ease, transform 260ms ease, box-shadow 260ms ease",
                      overflow: "hidden",
                    }}
                  >
                    {/* Parallax glow (active only) */}
                    {isActive && (
                      <motion.div
                        aria-hidden="true"
                        className="absolute -inset-24"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 25%, rgba(37,99,235,0.28), rgba(37,99,235,0.0) 55%)",
                        }}
                        animate={{
                          x: [0, 14, -10, 0],
                          y: [0, -10, 12, 0],
                          opacity: [0.85, 1, 0.9, 0.85],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}

                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="text-sm tracking-[0.25em] text-gray-500 uppercase">
                          Step {s.badge}
                        </div>

                        <div
                          className="h-10 w-10 rounded-2xl flex items-center justify-center font-medium"
                          style={{
                            background: isActive ? "#2563eb" : "rgb(17,24,39)",
                            color: "white",
                            boxShadow: isActive
                              ? "0 0 22px rgba(37,99,235,0.55)"
                              : "none",
                          }}
                        >
                          {idx + 1}
                        </div>
                      </div>

                      <h3
                        className="mt-6 text-2xl font-medium text-gray-900"
                        style={{
                          textShadow: isActive
                            ? "0 0 18px rgba(37,99,235,0.35)"
                            : "none",
                        }}
                      >
                        {s.title}
                      </h3>

                      <p className="mt-2 text-gray-500">{s.subtitle}</p>

                      <p className="mt-6 text-gray-700 leading-relaxed">
                        {s.body}
                      </p>

                      <div
                        className="mt-10 h-[2px] w-16"
                        style={{
                          background: isActive
                            ? "rgba(37,99,235,0.8)"
                            : "rgba(17,24,39,0.15)",
                          boxShadow: isActive
                            ? "0 0 18px rgba(37,99,235,0.25)"
                            : "none",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Mobile nav */}
          <div className="mt-10 flex md:hidden items-center justify-between px-6">
            <button
              className="h-12 px-5 rounded-2xl bg-white border border-black/10 shadow-sm active:scale-[0.99]"
              onClick={prev}
              aria-label="Previous step"
              type="button"
            >
              ← Prev
            </button>
            <div className="text-sm text-gray-700 font-medium">
              Step {String(active + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </div>
            <button
              className="h-12 px-5 rounded-2xl bg-white border border-black/10 shadow-sm active:scale-[0.99]"
              onClick={next}
              aria-label="Next step"
              type="button"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </section>
  );
}
