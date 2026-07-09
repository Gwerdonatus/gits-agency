"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ease = [0.22, 0.61, 0.36, 1] as const;

const floatIn = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: d },
  }),
};

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ===================== TRUST FLAGS =====================
// Four national flags shown as overlapping "coin" badges, conveying the
// international spread of clients/teams (interlocking like Audi's rings).

function FlagNigeria() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="40" fill="#ffffff" />
      <rect width="20" height="40" fill="#008751" />
      <rect x="40" width="20" height="40" fill="#008751" />
    </svg>
  );
}

function FlagCanada() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="40" fill="#ffffff" />
      <rect width="15" height="40" fill="#D80621" />
      <rect x="45" width="15" height="40" fill="#D80621" />
      <polygon
        points="30,9 32.5,16 40,16 34,20.5 36,28 30,23.5 24,28 26,20.5 20,16 27.5,16"
        fill="#D80621"
      />
    </svg>
  );
}

function FlagUK() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="40" fill="#00247D" />
      <polygon points="0,0 60,40 60,32 8,0" fill="#FFFFFF" />
      <polygon points="60,0 0,40 0,32 52,0" fill="#FFFFFF" />
      <polygon points="0,0 60,40 60,36 4,0" fill="#CF142B" />
      <polygon points="60,0 0,40 0,36 56,0" fill="#CF142B" />
      <rect x="25" width="10" height="40" fill="#FFFFFF" />
      <rect y="15" width="60" height="10" fill="#FFFFFF" />
      <rect x="27" width="6" height="40" fill="#CF142B" />
      <rect y="17" width="60" height="6" fill="#CF142B" />
    </svg>
  );
}

function FlagUS() {
  const stripeH = 40 / 13;
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} y={i * stripeH} width="60" height={stripeH} fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
      ))}
      <rect width="24" height="22" fill="#3C3B6E" />
    </svg>
  );
}

const trustFlags = [
  { id: "ng", Flag: FlagNigeria },
  { id: "ca", Flag: FlagCanada },
  { id: "uk", Flag: FlagUK },
  { id: "us", Flag: FlagUS },
];

function LogoStack({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center">
      {trustFlags.map(({ id, Flag }, i) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.6, x: -10 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: i * 0.12 }}
          className="rounded-full overflow-hidden border-2 border-white"
          style={{
            height: size,
            width: size,
            marginLeft: i === 0 ? 0 : -size * 0.32,
            zIndex: trustFlags.length - i,
            boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
          }}
        >
          <Flag />
        </motion.div>
      ))}
    </div>
  );
}

// ===================== WIDGETS =====================

function SoftwareWidget() {
  const stats = [
    { value: "40+", label: "Products shipped" },
    { value: "12", label: "Countries" },
    { value: "0", label: "Junior devs" },
  ];
  const stack = ["React", "Node", "TS", "AWS"];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.2 }}
      className="rounded-2xl bg-white/95 backdrop-blur-xl p-4 w-[220px] sm:w-[240px]"
      style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.16)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-[#4A7C59]" />
        <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Delivery track record</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-lg font-bold text-gray-900 leading-none">{s.value}</p>
            <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span key={tech} className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function PlatformWidget() {
  const metrics = [
    { label: "Load time", before: "4.2s", after: "1.1s", improvement: "74%" },
    { label: "Conversion", before: "1.8%", after: "5.4%", improvement: "3x" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.2 }}
      className="flex flex-col sm:flex-row gap-3"
    >
      <div
        className="rounded-2xl bg-white/95 backdrop-blur-xl p-4 w-full sm:w-[220px]"
        style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.16)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-[#4A7C59]" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Performance lift</span>
        </div>
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between mb-2 last:mb-0">
            <span className="text-[11px] text-gray-500 font-medium">{m.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400 line-through">{m.before}</span>
              <span className="text-[11px] font-bold text-[#4A7C59]">{m.after}</span>
              <span className="text-[9px] font-semibold text-white bg-[#4A7C59] px-1.5 py-0.5 rounded-full">
                {m.improvement}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl bg-white/95 backdrop-blur-xl p-4 w-full sm:w-[160px] flex flex-col justify-center"
        style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.16)" }}
      >
        <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-2">SEO-first</p>
        <p className="text-2xl font-bold text-gray-900">Top 3</p>
        <p className="text-[10px] text-gray-400">Avg. ranking for client target keywords</p>
      </div>
    </motion.div>
  );
}

function AutomationWidget() {
  const workflows = [
    { name: "Lead scoring", tool: "OpenAI", status: "Live" },
    { name: "Onboarding", tool: "Make", status: "Live" },
    { name: "Reporting", tool: "Zapier", status: "Live" },
    { name: "Support", tool: "n8n", status: "Live" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.2 }}
      className="flex flex-col sm:flex-row gap-3"
    >
      <div
        className="rounded-2xl bg-white/95 backdrop-blur-xl p-4 w-full sm:w-[220px]"
        style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.16)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-[#4A7C59]" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Workflows automated</span>
        </div>
        <div className="space-y-2">
          {workflows.map((w) => (
            <div key={w.name} className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-gray-800">{w.name}</p>
                <p className="text-[9px] text-gray-400">via {w.tool}</p>
              </div>
              <span className="text-[9px] font-semibold text-[#4A7C59] bg-[#4A7C59]/10 px-2 py-0.5 rounded-full">
                {w.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl bg-white/95 backdrop-blur-xl p-4 w-full sm:w-[140px] flex flex-col items-center justify-center"
        style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.16)" }}
      >
        <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">Hours saved</p>
        <p className="text-3xl font-bold text-[#4A7C59]">1,240</p>
        <p className="text-[10px] text-gray-400">this year for clients</p>
      </div>
    </motion.div>
  );
}

// ===================== DATA =====================

interface CardData {
  id: string;
  label: string;
  title: string;
  description: string;
  bgImage?: string;
  bgImageAlt?: string; // second image to crossfade with, for the software card
  bgGradient?: string;
  overlayGradient?: string;
  widget: React.ReactNode;
  href: string;
}

// Shared: renders both images stacked (both preloaded via `priority`) and
// crossfades opacity between them — no remount, no flash, instant swap.
function CrossfadeBackground({
  card,
  showAlt,
  sizes,
}: {
  card: CardData;
  showAlt: boolean;
  sizes: string;
}) {
  if (!card.bgImage) {
    return <div className="absolute inset-0" style={{ background: card.bgGradient }} />;
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={card.bgImage}
        alt={card.title}
        fill
        sizes={sizes}
        priority
        className={`object-cover transition-opacity duration-500 ease-out ${
          showAlt ? "opacity-0" : "opacity-100"
        }`}
      />
      {card.bgImageAlt && (
        <Image
          src={card.bgImageAlt}
          alt={card.title}
          fill
          sizes={sizes}
          priority
          className={`absolute inset-0 object-cover transition-opacity duration-500 ease-out ${
            showAlt ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

const cardsData: CardData[] = [
  {
    id: "software",
    label: "Software",
    title: "Custom Software",
    description: "From MVPs to full platforms — built to scale with your business. Senior engineers only. No handoffs.",
    bgImage: "/hero/software-lead.png",
    bgImageAlt: "/hero/software-lead2.png",
    overlayGradient: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 70%)",
    widget: <SoftwareWidget />,
    href: "/services/custom-software-development",
  },
  {
    id: "platforms",
    label: "Platforms",
    title: "Web & Platforms",
    description: "High-performance sites that convert. We design for speed, SEO, and revenue — not just aesthetics.",
    bgGradient: "linear-gradient(160deg, #334155 0%, #1e293b 60%, #0f172a 100%)",
    overlayGradient: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 80%)",
    widget: <PlatformWidget />,
    href: "/services/websites-digital-experiences",
  },
  {
    id: "automation",
    label: "Automation",
    title: "AI & Automation",
    description: "Automate the work that slows your team down. We build smart systems that run 24/7 and scale infinitely.",
    bgGradient: "linear-gradient(160deg, #4A7C59 0%, #2f5940 55%, #1C2A1E 100%)",
    overlayGradient: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 80%)",
    widget: <AutomationWidget />,
    href: "/services/ai-business-automation",
  },
];

// ===================== DESKTOP CARD =====================

function DesktopCard({
  card,
  isActive,
  onClick,
  showAlt = false,
}: {
  card: CardData;
  isActive: boolean;
  onClick: () => void;
  showAlt?: boolean;
}) {
  return (
    <motion.div
      onClick={onClick}
      className="relative rounded-[24px] overflow-hidden cursor-pointer h-full"
      animate={{
        flex: isActive ? 3.5 : 0.55,
      }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      style={{
        minWidth: isActive ? 320 : 80,
      }}
    >
      {/* Background */}
      <CrossfadeBackground card={card} showAlt={showAlt} sizes="55vw" />

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: card.overlayGradient }} />

      {/* Vertical Label (inactive only) */}
      <AnimatePresence>
        {!isActive && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-white text-lg lg:text-xl font-medium tracking-wide"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {card.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Content (active only) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="relative z-10 h-full flex flex-col justify-between p-6 lg:p-7"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-medium text-white">{card.title}</h3>
              <p className="mt-2 max-w-[280px] text-[13px] text-white/85 leading-relaxed">
                {card.description}
              </p>
            </div>
            {card.widget}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow button — ONLY on active card */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease, delay: 0.2 }}
            className="absolute bottom-5 right-5 z-20"
          >
            <Link
              href={card.href}
              onClick={(e) => e.stopPropagation()}
              className="h-11 w-11 rounded-full bg-[#1a1a1a] grid place-items-center text-white hover:bg-white hover:text-black transition"
            >
              <ArrowRightIcon />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ===================== MOBILE ACCORDION CARD =====================

function MobileAccordionCard({
  card,
  isActive,
  onClick,
  showAlt = false,
}: {
  card: CardData;
  isActive: boolean;
  onClick: () => void;
  showAlt?: boolean;
}) {
  return (
    <motion.div
      onClick={onClick}
      className="relative rounded-[24px] overflow-hidden cursor-pointer h-full select-none min-w-0"
      animate={{
        flex: isActive ? 3.2 : 0.9,
      }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Background */}
      <CrossfadeBackground card={card} showAlt={showAlt} sizes="55vw" />

      <div className="absolute inset-0" style={{ background: card.overlayGradient }} />

      {/* Inactive: vertical label */}
      <AnimatePresence>
        {!isActive && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium tracking-wide"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {card.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active: full content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="relative z-10 h-full flex flex-col justify-between p-5"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 font-medium">
                {card.label}
              </span>
              <h3 className="text-xl font-medium text-white mt-1 leading-tight">
                {card.title}
              </h3>
              <p className="mt-2 text-[12px] text-white/80 leading-relaxed line-clamp-3">
                {card.description}
              </p>
            </div>

            <div className="space-y-3">
              {/* Stat pill */}
              <div className="bg-white/15 backdrop-blur-2xl rounded-xl px-3 py-2.5 border border-white/10">
                <p className="text-[9px] text-white/50 font-medium uppercase tracking-wider">
                  {card.id === "software" && "Products shipped"}
                  {card.id === "platforms" && "Performance gain"}
                  {card.id === "automation" && "Hours saved"}
                </p>
                <p className="text-lg font-medium text-white leading-none mt-1">
                  {card.id === "software" && "40+"}
                  {card.id === "platforms" && "74%"}
                  {card.id === "automation" && "1,240"}
                </p>
              </div>

              {/* Arrow */}
              <Link
                href={card.href}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/20 text-white hover:bg-white hover:text-black transition"
              >
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ===================== MOBILE CAROUSEL CARD =====================

function MobileCarouselCard({
  card,
  isActive,
  showAlt = false,
}: {
  card: CardData;
  isActive: boolean;
  showAlt?: boolean;
}) {
  return (
    <div className="relative w-full h-full rounded-[24px] overflow-hidden select-none flex-shrink-0 snap-center">
      {/* Background */}
      <CrossfadeBackground card={card} showAlt={showAlt} sizes="100vw" />

      <div className="absolute inset-0" style={{ background: card.overlayGradient }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 font-medium">
            {card.label}
          </span>
          <h3 className="text-2xl font-medium text-white mt-1 leading-tight">
            {card.title}
          </h3>
          <p className="mt-3 text-[13px] text-white/80 leading-relaxed">
            {card.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/15 backdrop-blur-2xl rounded-xl px-4 py-3 border border-white/10 inline-block">
            <p className="text-[9px] text-white/50 font-medium uppercase tracking-wider">
              {card.id === "software" && "Products shipped"}
              {card.id === "platforms" && "Performance gain"}
              {card.id === "automation" && "Hours saved"}
            </p>
            <p className="text-xl font-medium text-white leading-none mt-1">
              {card.id === "software" && "40+"}
              {card.id === "platforms" && "74%"}
              {card.id === "automation" && "1,240"}
            </p>
          </div>

          <Link
            href={card.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition"
          >
            Learn more
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN HERO =====================

export default function Hero() {
  // ================= DESKTOP =================
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tracks how many times the software card has become active on desktop,
  // so the image can alternate between software-lead.png and software-lead2.png
  const [desktopSoftwareVisits, setDesktopSoftwareVisits] = useState(0);
  const prevActiveIndexRef = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex === 0 && prevActiveIndexRef.current !== 0) {
      setDesktopSoftwareVisits((v) => v + 1);
    }
    prevActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardsData.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [startAutoPlay]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    startAutoPlay();
  };

  // ================= MOBILE =================
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileAutoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Same alternating-image tracking, but for the mobile active index
  const [mobileSoftwareVisits, setMobileSoftwareVisits] = useState(0);
  const prevMobileActiveIndexRef = useRef(mobileActiveIndex);

  useEffect(() => {
    if (mobileActiveIndex === 0 && prevMobileActiveIndexRef.current !== 0) {
      setMobileSoftwareVisits((v) => v + 1);
    }
    prevMobileActiveIndexRef.current = mobileActiveIndex;
  }, [mobileActiveIndex]);

  // Detect compact mode (< 360px)
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 360);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const startMobileAutoPlay = useCallback(() => {
    if (mobileAutoPlayRef.current) clearInterval(mobileAutoPlayRef.current);
    mobileAutoPlayRef.current = setInterval(() => {
      setMobileActiveIndex((prev) => {
        const next = (prev + 1) % cardsData.length;
        if (isCompact && scrollRef.current) {
          const cardWidth = scrollRef.current.scrollWidth / cardsData.length;
          scrollRef.current.scrollTo({ left: cardWidth * next, behavior: "smooth" });
        }
        return next;
      });
    }, 4000);
  }, [isCompact]);

  useEffect(() => {
    startMobileAutoPlay();
    return () => {
      if (mobileAutoPlayRef.current) clearInterval(mobileAutoPlayRef.current);
    };
  }, [startMobileAutoPlay]);

  const handleMobileCardClick = (index: number) => {
    setMobileActiveIndex(index);
    if (isCompact && scrollRef.current) {
      const cardWidth = scrollRef.current.scrollWidth / cardsData.length;
      scrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    }
    startMobileAutoPlay();
  };

  // Both software images are preloaded (priority) and permanently mounted —
  // these just flip which one is visible via opacity crossfade.
  const desktopShowAlt = desktopSoftwareVisits % 2 !== 0;
  const mobileShowAlt = mobileSoftwareVisits % 2 !== 0;

  // ================= RENDER =================

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block mt-[72px]">
        <div
          className="flex flex-col px-10 lg:px-12 xl:px-16 pt-5 pb-6"
          style={{ height: "calc(100vh - 72px)" }}
        >
          {/* Header row */}
          <div className="shrink-0 flex items-end justify-between gap-6 pb-3">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#4A7C59]/90 mb-1.5">
                Digital Product Agency
              </p>
              <h2 className="text-[1.75rem] lg:text-[2.1rem] xl:text-[2.4rem] leading-[1.12] tracking-tight text-gray-900 font-normal">
                We design & engineer <br className="hidden lg:block" />
                digital products that drive <span className="font-medium">growth</span>.
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/what-we-build"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900"
              >
                See our process
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] text-white pl-5 pr-1.5 py-1.5 text-sm font-medium hover:opacity-90 transition active:scale-[0.99]"
              >
                Get started
                <span className="grid place-items-center h-8 w-8 rounded-full bg-white text-black">
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Trust bar — text, then flag stack */}
          <div className="shrink-0 flex items-center gap-4 pb-4 border-b border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium">
              Trusted by 40+ teams worldwide
            </p>
            <LogoStack size={22} />
          </div>

          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="visible"
            custom={0.22}
            className="flex-1 min-h-0 pt-3"
          >
            <div className="flex gap-3 h-full">
              {cardsData.map((card, index) => (
                <DesktopCard
                  key={card.id}
                  card={card}
                  isActive={index === activeIndex}
                  onClick={() => handleCardClick(index)}
                  showAlt={card.id === "software" ? desktopShowAlt : false}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden relative bg-white">
        {/* Text content — lowered with more breathing room */}
        <div className="relative z-10 px-6 pt-12 pb-4">
          <motion.p
            variants={floatIn}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#4A7C59]"
          >
            Digital Product Agency
          </motion.p>

          <motion.h1
            variants={floatIn}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-5 text-[2.4rem] leading-[1.05] tracking-tight text-gray-900 font-normal"
          >
            We design & engineer products that drive{" "}
            <span className="font-medium">growth</span>.
          </motion.h1>

          <motion.p
            variants={floatIn}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="mt-4 text-[15px] leading-[1.75] text-gray-500 max-w-[340px]"
          >
            From MVPs to enterprise platforms — built to scale with your business. Senior engineers only. No handoffs.
          </motion.p>

          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="mt-7 flex flex-col gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] text-white h-14 px-6 text-[15px] font-medium hover:opacity-90 transition active:scale-[0.98]"
            >
              Get started
              <span className="grid place-items-center h-7 w-7 rounded-full bg-white/15">
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              href="/what-we-do"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 h-12"
            >
              See our process
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Cards — Accordion (normal) or Carousel (compact) */}
        <motion.div
          variants={floatIn}
          initial="hidden"
          animate="visible"
          custom={0.65}
          className="relative z-10 px-5 mt-10"
        >
          {isCompact ? (
            /* Compact: single rotating carousel with peek */
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory h-[420px]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cardsData.map((card, index) => (
                <div
                  key={card.id}
                  className="w-[85%] flex-shrink-0 snap-center"
                  onClick={() => handleMobileCardClick(index)}
                >
                  <MobileCarouselCard
                    card={card}
                    isActive={index === mobileActiveIndex}
                    showAlt={card.id === "software" ? mobileShowAlt : false}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Normal: 3-card accordion, active dominates */
            <div className="flex gap-2 h-[400px]">
              {cardsData.map((card, index) => (
                <MobileAccordionCard
                  key={card.id}
                  card={card}
                  isActive={index === mobileActiveIndex}
                  onClick={() => handleMobileCardClick(index)}
                  showAlt={card.id === "software" ? mobileShowAlt : false}
                />
              ))}
            </div>
          )}

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {cardsData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleMobileCardClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === mobileActiveIndex ? "w-6 bg-[#1a1a1a]" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust & continuation */}
        <motion.div
          variants={floatIn}
          initial="hidden"
          animate="visible"
          custom={0.9}
          className="relative z-10 px-6 pt-10 pb-10"
        >
          <div className="border-t border-gray-100 pt-6 flex flex-col items-center gap-4">
            <p className="text-[11px] text-gray-400 font-medium text-center">
              Trusted by 40+ teams worldwide
            </p>
            <LogoStack size={26} />
          </div>

          {/* Scroll cue */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center mt-8"
          >
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-gray-400 font-medium tracking-wide">Scroll</span>
              <div className="h-6 w-[1px] bg-gradient-to-b from-gray-300 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}