"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════
const CASE_THEMES = {
  medicore: {
    accent: "#059669", accentLight: "rgba(5,150,105,0.07)",
    accentBorder: "rgba(5,150,105,0.18)", accentText: "#065f46",
    label: "Healthcare · Pharmacy Operations",
    number: "01",
  },
  buildcore: {
    accent: "#ea580c", accentLight: "rgba(234,88,12,0.07)",
    accentBorder: "rgba(234,88,12,0.20)", accentText: "#7c2d12",
    label: "Construction · Site Management",
    number: "02",
  },
  factoryflow: {
    accent: "#7c3aed", accentLight: "rgba(124,58,237,0.07)",
    accentBorder: "rgba(124,58,237,0.18)", accentText: "#4c1d95",
    label: "Manufacturing · Production Ops",
    number: "03",
  },
} as const;
type CaseId = keyof typeof CASE_THEMES;

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const rm = useReducedMotion();
  const fd = (d: number) => ({ duration: rm ? 0 : 0.7, ease, delay: d });
  return (
    <section className="relative px-6 pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute top-48 -left-32 h-[380px] w-[380px] rounded-full bg-cyan-400/6 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-[400px] w-[400px] rounded-full bg-indigo-400/7 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0)} className="text-xs uppercase tracking-widest text-gray-400 mb-4">
          Services / Custom Software Development
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.06)} className="text-4xl md:text-[3.4rem] font-medium leading-[1.08] tracking-tight text-gray-900 max-w-4xl">
          Software built exactly for<br className="hidden md:block" />
          <span className="text-blue-600"> the way your business works.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.12)} className="mt-5 text-gray-500 max-w-2xl leading-relaxed text-base md:text-lg">
          Off-the-shelf tools make your business adapt to someone else's product.
          Custom software adapts to you — built around your workflows, your team, and your growth plan.
          You own the code. No licensing. No lock-in.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.18)} className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-80 transition">
            Start a project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <a href="#case-studies" className="inline-flex items-center gap-2 rounded-xl border border-black/12 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-black/[0.03] transition">
            See our work
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fd(0.26)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {["Full code ownership — no lock-in","NDA before any details are shared","Fixed scope — no surprise invoices","12+ countries served"].map(t => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="h-1 w-1 rounded-full bg-gray-300" />{t}
            </span>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.3)} className="mt-12 rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 md:p-8" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
          <div className="grid gap-8 md:grid-cols-[1fr,1px,1fr,1px,1fr]">
            <div>
              <div className="h-8 w-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="#2563eb" strokeWidth="1.25"/><path d="M5 7l2 2 4-3" stroke="#2563eb" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">Built for your business</p>
              <p className="text-sm text-gray-500 leading-relaxed">Custom software is designed from scratch around your specific workflows, roles, and data — not around what's easiest to build.</p>
            </div>
            <div className="hidden md:block bg-black/6 self-stretch" />
            <div>
              <div className="h-8 w-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#d97706" strokeWidth="1.25"/><path d="M8 5v4M8 11v.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">Why generic tools break down</p>
              <p className="text-sm text-gray-500 leading-relaxed">Off-the-shelf tools serve the average business. If your operations have any complexity — multiple locations, multiple roles, custom workflows — they create more manual work than they save.</p>
            </div>
            <div className="hidden md:block bg-black/6 self-stretch" />
            <div>
              <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14" stroke="#059669" strokeWidth="1.25" strokeLinecap="round"/><circle cx="8" cy="8" r="3.5" stroke="#059669" strokeWidth="1.25"/></svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">What we need from you</p>
              <p className="text-sm text-gray-500 leading-relaxed">Not a technical spec. Just a clear description of how your business currently operates and where the friction is. We handle architecture, design, development, and launch.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CAROUSEL
// ═══════════════════════════════════════════════════════════════
const WHAT_WE_BUILD = [
  { icon: "⚙️", title: "SaaS Platforms", who: "Startups & scale-ups", desc: "Multi-tenant applications with subscription billing, role management, and real-time features built to handle 10× your current volume.", example: "e.g. A B2B compliance tracking tool used by 200 companies." },
  { icon: "🏗️", title: "Construction Management", who: "Contractors & developers", desc: "Multi-site dashboards, material tracking, procurement approvals, and progress reporting — replacing WhatsApp updates and Excel reports.", example: "e.g. A director tracking 4 active sites, budgets, and procurement from one screen." },
  { icon: "🏭", title: "Manufacturing Systems", who: "Factories & processors", desc: "Raw material intake, production planning, quality control, and dispatch tracking connected into one operational system.", example: "e.g. A food processor tracking batches from intake to finished goods." },
  { icon: "💊", title: "Healthcare & Pharmacy Ops", who: "Clinics & pharmacy networks", desc: "Multi-branch inventory, expiry monitoring, dispensing workflows, and unified management dashboards for healthcare operations.", example: "e.g. A pharmacy network connecting warehouse, branches, and delivery." },
  { icon: "📦", title: "Fleet & Logistics Ops", who: "Companies that own vehicles", desc: "Maintenance schedules, fuel tracking, driver assignment, route logs, and downtime monitoring for businesses managing their own fleets.", example: "e.g. A distributor tracking 40 trucks across 3 depots." },
  { icon: "🏫", title: "School Management Platforms", who: "Private & independent schools", desc: "Admissions, fee management, results, parent portals, attendance, and staff management — replacing disconnected school admin tools.", example: "e.g. A group of private schools with a shared management system." },
  { icon: "🏨", title: "Hotel & Hospitality Systems", who: "Hotels & guest houses", desc: "Reservations, housekeeping, room status, restaurant billing, and staff management — built for operations that don't fit generic hotel software.", example: "e.g. A boutique hotel group replacing Opera PMS with a custom-fit system." },
  { icon: "📊", title: "Internal Tools & CRMs", who: "Operations-heavy teams", desc: "Purpose-built internal dashboards, CRMs, and management tools replacing disconnected SaaS stacks with one system designed for your process.", example: "e.g. A custom CRM for a sales team with pipeline stages no generic tool supports." },
];

function WhatWeBuildCarousel() {
  const [active, setActive] = useState(0);
  const total = WHAT_WE_BUILD.length;
  const prev = () => setActive(i => (i - 1 + total) % total);
  const next = () => setActive(i => (i + 1) % total);
  const visible = [WHAT_WE_BUILD[active % total], WHAT_WE_BUILD[(active + 1) % total], WHAT_WE_BUILD[(active + 2) % total]];
  return (
    <section className="px-6 py-16 md:py-20 border-t border-black/[0.06]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">What we build</p>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 max-w-lg leading-snug">Not sure if your business needs custom software?</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">Here are eight types of operational systems we build. If any of these describe a problem your business has right now, we should talk.</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button type="button" onClick={prev} className="h-9 w-9 rounded-xl border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition" aria-label="Previous">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span className="text-xs text-gray-400 font-mono w-12 text-center">{active + 1} / {total}</span>
            <button type="button" onClick={next} className="h-9 w-9 rounded-xl border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition" aria-label="Next">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visible.map((item, i) => (
            <motion.div key={`${active}-${i}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.32, ease, delay: i * 0.05 }}
              className={`rounded-2xl border border-black/10 bg-white p-5 flex flex-col ${i > 0 ? "hidden md:flex" : ""}`}
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 border border-black/10 rounded-full px-2.5 py-1">{item.who}</span>
              </div>
              <p className="text-base font-semibold text-gray-900 mb-2">{item.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.desc}</p>
              <div className="mt-4 pt-4 border-t border-black/[0.06]">
                <p className="text-xs text-gray-400 leading-relaxed italic">{item.example}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {WHAT_WE_BUILD.map((_, i) => (
            <button key={i} type="button" onClick={() => setActive(i)} className={`transition-all duration-200 rounded-full ${i === active ? "h-1.5 w-5 bg-black" : "h-1.5 w-1.5 bg-black/20"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-600 max-w-xl">If your business is currently running critical operations through WhatsApp, spreadsheets, or a tool that wasn't built for your industry — there's a better way. We've built it before.</p>
          <Link href="/contact" className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:opacity-80 transition whitespace-nowrap">Tell us what you need</Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// UPGRADED DEMO SYSTEM — 9.5/10 industry standard
// Five visual upgrades applied to all three demos:
//   1. Dark stage container + per-case ambient glow
//   2. Three-tier shadow system (close / mid / far)
//   3. Satellite cards with subtle rotation + staggered entry
//   4. Aggressive KPI typography (2xl bold metric vs 8px label)
//   5. Rich chrome (gradient, real traffic lights, branded favicon)
// ═══════════════════════════════════════════════════════════════

// ── Animated counter utility ──────────────────────────────────
function useCounter(target: number, duration = 1100, delay = 500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const steps = 36;
      let step = 0;
      const id = setInterval(() => {
        step++;
        setVal(Math.min(Math.round((target / steps) * step), target));
        if (step >= steps) clearInterval(id);
      }, duration / steps);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return val;
}

// ── Shared chrome bar ─────────────────────────────────────────
function DemoChrome({ url, badge }: { url: string; badge?: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-black/[0.08]"
      style={{ background: "linear-gradient(180deg,#f9fafb 0%,#f3f4f6 100%)" }}>
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
      </div>
      <div className="flex-1 flex items-center gap-2 bg-white rounded border border-black/[0.09] px-3 py-1 max-w-sm mx-auto">
        <span className="text-[10px] text-gray-400 truncate">{url}</span>
      </div>
      {badge && <span className="text-[9px] text-gray-400 border border-black/[0.08] rounded px-2 py-0.5 ml-auto">{badge}</span>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEMO 1 — MEDICORE (Pharmacy Operations)
// ═══════════════════════════════════════════════════════════════
function MedicoreDemo() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "inventory">("overview");
  const [transferApproved, setTransferApproved] = useState(false);

  const orders   = useCounter(29, 1000, 600);
  const revenue  = useCounter(369, 1200, 700);
  const deliveries = useCounter(7, 700, 650);
  const stockAlerts = useCounter(3, 500, 800);

  useEffect(() => {
    const t = setTimeout(() => setAlertVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const branches = [
    { name: "Wuse Branch",   orders: 14, stock: 92, revenue: "₦184k", status: "good" },
    { name: "Garki Branch",  orders: 9,  stock: 61, revenue: "₦112k", status: "good" },
    { name: "Maitama Branch",orders: 6,  stock: 38, revenue: "₦73k",  status: "warn" },
  ];
  const inventory = [
    { name: "Amoxicillin 500mg",  total: 248, expiry: "Aug 2026", status: "ok"       },
    { name: "Metformin 850mg",    total: 67,  expiry: "Mar 2026", status: "low"      },
    { name: "Insulin Glargine",   total: 21,  expiry: "Jan 2026", status: "expiry"   },
    { name: "Losartan 50mg",      total: 8,   expiry: "May 2026", status: "critical" },
    { name: "Ampiclox 500mg",     total: 134, expiry: "Dec 2026", status: "ok"       },
  ];

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden p-5 md:p-7"
      style={{
        background: "linear-gradient(145deg,#080e1a 0%,#0b1220 55%,#080e1a 100%)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 55% 45% at 45% 25%,rgba(5,150,105,0.20) 0%,transparent 70%), radial-gradient(ellipse 35% 30% at 85% 75%,rgba(5,150,105,0.09) 0%,transparent 60%)" }} />

      {/* Stage label */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md flex items-center justify-center" style={{ background: "rgba(5,150,105,0.25)", border: "1px solid rgba(5,150,105,0.4)" }}>
            <span className="text-emerald-400 text-[9px] font-bold">M</span>
          </div>
          <span className="text-white/50 text-[11px] font-medium tracking-wide">Medicore · Owner Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400/60 text-[10px]">Live</span>
        </div>
      </div>

      {/* ── MAIN PANEL ── */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.30)" }}>
        <DemoChrome url="medicore.ops / owner-dashboard" badge="Today" />
        <div className="flex bg-white" style={{ height: 280, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
          {/* Sidebar */}
          <div className="w-28 flex flex-col p-3 gap-0.5 flex-shrink-0 border-r border-black/[0.06]"
            style={{ background: "linear-gradient(180deg,#0d1117 0%,#0f1420 100%)" }}>
            <div className="mb-4">
              <p className="text-white/80 text-[10px] font-semibold mb-0.5">Medicore</p>
              <p className="text-white/25 text-[8px]">Owner View</p>
            </div>
            {[{ id:"overview",label:"Overview",dot:null },{ id:"inventory",label:"Inventory",dot:"2" },{ id:"dispatch",label:"Dispatch",dot:"1" },{ id:"reports",label:"Reports",dot:null }].map(item => (
              <button key={item.id} type="button"
                onClick={() => (item.id === "overview" || item.id === "inventory") && setActiveTab(item.id as "overview"|"inventory")}
                className="text-left px-2.5 py-1.5 rounded-lg text-[9px] flex items-center justify-between transition-all"
                style={{ background: activeTab === item.id ? "rgba(5,150,105,0.15)" : "transparent", color: activeTab === item.id ? "#34d399" : "rgba(255,255,255,0.35)" }}>
                <span>{item.label}</span>
                {item.dot && <span className="text-[7px] bg-red-500 text-white rounded-full px-1.5 leading-4">{item.dot}</span>}
              </button>
            ))}
            <div className="mt-auto pt-3 border-t border-white/[0.07] space-y-1">
              {["Wuse","Garki","Maitama"].map(b => (
                <div key={b} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-400/50" />
                  <span className="text-[8px] text-white/25">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
            {/* KPIs — large scale */}
            <div className="grid grid-cols-4 divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
              {[
                { label: "Today's Orders",   value: orders,      suffix: "",    delta: "+4 vs yesterday",  warn: false },
                { label: "Revenue",          value: revenue,     suffix: "k",   delta: "3 branches",       warn: false, prefix: "₦" },
                { label: "Deliveries",       value: deliveries,  suffix: "",    delta: "3 en route",       warn: false },
                { label: "Stock Alerts",     value: stockAlerts, suffix: "",    delta: "action needed",    warn: true  },
              ].map(s => (
                <div key={s.label} className="px-3 py-3">
                  <p className="text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className={`text-xl font-bold leading-none ${s.warn ? "text-red-600" : "text-gray-900"}`}>
                    {s.prefix || ""}{s.value}{s.suffix}
                  </p>
                  <p className={`text-[8px] mt-1 ${s.warn ? "text-red-400" : "text-gray-400"}`}>{s.delta}</p>
                </div>
              ))}
            </div>
            {/* Tab content */}
            <div className="flex-1 overflow-auto p-3">
              {activeTab === "overview" ? (
                <>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Branch Performance — Today</p>
                  <div className="space-y-1.5">
                    {branches.map(b => (
                      <div key={b.name} className="bg-white rounded-xl border border-black/[0.07] px-3 py-2.5 flex items-center gap-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`h-1.5 w-1.5 rounded-full ${b.status === "warn" ? "bg-amber-400" : "bg-emerald-400"}`} />
                            <p className="text-[10px] font-semibold text-gray-800">{b.name}</p>
                          </div>
                          <div className="flex gap-3 text-[9px]">
                            <span className="text-gray-400">{b.orders} orders</span>
                            <span className="font-semibold text-emerald-600">{b.revenue}</span>
                          </div>
                        </div>
                        <div className="w-20">
                          <div className="flex justify-between text-[7px] text-gray-400 mb-1">
                            <span>Stock</span>
                            <span className={`font-semibold ${b.stock < 50 ? "text-amber-600" : "text-gray-500"}`}>{b.stock}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div className={`h-full rounded-full ${b.stock < 50 ? "bg-amber-400" : "bg-emerald-400"}`}
                              initial={{ width: 0 }} animate={{ width: `${b.stock}%` }} transition={{ duration: 1, ease, delay: 0.8 }} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-start gap-2">
                      <span className="text-amber-500 text-sm flex-shrink-0 mt-px">⚠</span>
                      <div>
                        <p className="text-[9px] font-semibold text-amber-800">Maitama below 40% — redistribution suggested</p>
                        <p className="text-[8px] text-amber-600 mt-0.5">Wuse has surplus. Initiate transfer or place restock.</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Network Inventory</p>
                  <div className="space-y-1">
                    {inventory.map(item => (
                      <div key={item.name} className={`bg-white rounded-xl border px-3 py-2 flex items-center gap-3 ${item.status === "critical" || item.status === "expiry" ? "border-red-100" : "border-black/[0.06]"}`}>
                        <div className="flex-1">
                          <p className="text-[9px] font-medium text-gray-800">{item.name}</p>
                          <p className="text-[8px] text-gray-400">Exp: {item.expiry}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-700">{item.total}</p>
                        <span className={`text-[8px] px-2 py-0.5 rounded-full font-medium border ${
                          item.status === "ok" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          item.status === "low" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-red-50 text-red-700 border-red-200"
                        }`}>{item.status === "ok" ? "In stock" : item.status === "low" ? "Low" : item.status === "expiry" ? "⚠ Expiring" : "⚠ Critical"}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating alert — slides in, stays rotated */}
      <AnimatePresence>
        {alertVisible && (
          <motion.div initial={{ opacity: 0, x: 44, y: -12, rotate: 3 }} animate={{ opacity: 1, x: 0, y: 0, rotate: 2 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
            className="absolute top-14 right-3 md:-right-1 w-52 rounded-2xl p-3 z-20"
            style={{ background: "#fff", boxShadow: "0 0 0 1px rgba(220,38,38,0.18),0 8px 24px rgba(0,0,0,0.25),0 2px 8px rgba(220,38,38,0.15)", transform: "rotate(2deg)" }}>
            <div className="flex items-start gap-2.5">
              <div className="h-7 w-7 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-50 border border-red-200">
                <span className="text-red-500 text-sm">⚡</span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-900 leading-tight">Urgent restock needed</p>
                <p className="text-[8px] text-gray-500 mt-0.5 leading-tight">Insulin Glargine · Maitama</p>
                <p className="text-[8px] font-semibold mt-1 text-red-600">3 units · Exp Jan 2026</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delivery status cards — staggered entry, subtle rotation */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { id:"MC-0914", patient:"Aisha Musa",  branch:"Wuse",    status:"Delivered ✓",    color:"emerald", r:"-0.6deg" },
          { id:"MC-1002", patient:"Chidi Obi",   branch:"Garki",   status:"In transit",      color:"amber",   r:"0.2deg"  },
          { id:"MC-1045", patient:"James K.",     branch:"Maitama", status:"⚡ Urgent",       color:"red",     r:"0.7deg"  },
        ].map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 + i * 0.08 }}
            className="rounded-xl p-2.5"
            style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.12)", transform: `rotate(${d.r})`, fontFamily: "ui-monospace,monospace" }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8px] text-gray-400">{d.id}</span>
              <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full border ${d.color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : d.color === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200"}`}>{d.status}</span>
            </div>
            <p className="text-[9px] font-semibold text-gray-800">{d.patient}</p>
            <p className="text-[8px] text-gray-400">{d.branch} branch</p>
          </motion.div>
        ))}
      </div>

      {/* Transfer action card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.55 }}
        className="mt-2 rounded-xl p-3"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 4px 16px rgba(0,0,0,0.18),0 1px 4px rgba(0,0,0,0.10)", transform: "rotate(-0.3deg)", fontFamily: "ui-monospace,monospace" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Stock Transfer Request</p>
            <p className="text-[10px] font-semibold text-gray-900">Losartan 50mg · 40 units · Wuse → Maitama</p>
            <p className="text-[8px] text-gray-400 mt-0.5">Requested by Branch Manager · awaiting owner approval</p>
          </div>
          {transferApproved ? (
            <span className="ml-4 flex-shrink-0 rounded-lg text-[9px] font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Approved</span>
          ) : (
            <button type="button" onClick={() => setTransferApproved(true)} className="ml-4 flex-shrink-0 rounded-lg text-white text-[9px] font-bold px-3 py-1.5 hover:opacity-90 transition" style={{ background: "#059669" }}>Approve</button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEMO 2 — BUILDCORE (Construction Management)
// ═══════════════════════════════════════════════════════════════
function BuildCoreDemo() {
  const [budgetAnim, setBudgetAnim] = useState(false);
  const [approvalDone, setApprovalDone] = useState(false);

  const sites24  = useCounter(3,  400, 300);
  const workers  = useCounter(64, 900, 500);
  const budgetM  = useCounter(285, 1100, 600);
  const progress = useCounter(63,  900, 650);

  useEffect(() => { const t = setTimeout(() => setBudgetAnim(true), 450); return () => clearTimeout(t); }, []);

  const sites = [
    { name: "Maitama Towers",  phase: "Structural", prog: 68, budget: 142, spent: 98,  workers: 34, ok: true  },
    { name: "Jabi Lake Mall",  phase: "Foundation", prog: 31, budget: 87,  spent: 29,  workers: 18, ok: true  },
    { name: "Gwarinpa Estate", phase: "Finishing",  prog: 89, budget: 56,  spent: 51,  workers: 12, ok: false },
  ];

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden p-5 md:p-7"
      style={{ background: "linear-gradient(145deg,#0c0f0a 0%,#0f1410 55%,#0c0f0a 100%)", boxShadow: "0 40px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 40% at 40% 30%,rgba(234,88,12,0.18) 0%,transparent 70%),radial-gradient(ellipse 30% 25% at 80% 80%,rgba(234,88,12,0.08) 0%,transparent 60%)" }} />

      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md flex items-center justify-center" style={{ background: "rgba(234,88,12,0.25)", border: "1px solid rgba(234,88,12,0.4)" }}>
            <span className="text-orange-400 text-[9px] font-bold">B</span>
          </div>
          <span className="text-white/50 text-[11px] font-medium">BuildCore · Director View</span>
        </div>
        <span className="text-orange-400/60 text-[10px]">3 active sites</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.28)" }}>
        <DemoChrome url="buildcore.ops / director-view" badge="Week 24 of 52" />
        <div className="flex bg-white" style={{ height: 280, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
          <div className="w-28 flex flex-col p-3 gap-0.5 flex-shrink-0 border-r border-black/[0.06]"
            style={{ background: "linear-gradient(180deg,#0f1923 0%,#111c27 100%)" }}>
            <div className="mb-4">
              <p className="text-white/80 text-[10px] font-semibold mb-0.5">BuildCore</p>
              <p className="text-white/25 text-[8px]">Director</p>
            </div>
            {["All Sites","Materials","Procurement","Attendance","Reports"].map((item, i) => (
              <button key={item} type="button" className="text-left px-2.5 py-1.5 rounded-lg text-[9px] transition"
                style={{ background: i === 0 ? "rgba(234,88,12,0.15)" : "transparent", color: i === 0 ? "#fb923c" : "rgba(255,255,255,0.35)" }}>{item}</button>
            ))}
            <div className="mt-auto pt-3 border-t border-white/[0.07] space-y-1">
              {sites.map(s => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <span className={`h-1 w-1 rounded-full ${s.ok ? "bg-emerald-400" : "bg-amber-400"}`} />
                  <span className="text-[8px] text-white/25 truncate">{s.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
            {/* KPIs */}
            <div className="grid grid-cols-4 divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
              {[
                { label:"Active Sites",   value:sites24,  suffix:"",  delta:"across 3 projects",  warn:false },
                { label:"Workers Today",  value:workers,  suffix:"",  delta:"all sites combined",  warn:false },
                { label:"Budget Spent",   value:budgetM,  suffix:"M", delta:"of ₦285M total",      warn:false, prefix:"₦" },
                { label:"Avg Progress",   value:progress, suffix:"%", delta:"on target",            warn:false },
              ].map(s => (
                <div key={s.label} className="px-3 py-3">
                  <p className="text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-gray-900 leading-none">{s.prefix||""}{s.value}{s.suffix}</p>
                  <p className="text-[8px] text-gray-400 mt-1">{s.delta}</p>
                </div>
              ))}
            </div>
            <div className="flex-1 overflow-auto p-3">
              <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Sites — Budget vs Actual</p>
              <div className="space-y-2">
                {sites.map(s => (
                  <div key={s.name} className="bg-white rounded-xl border border-black/[0.07] p-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-semibold text-gray-900">{s.name}</p>
                          <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-medium border ${s.ok ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>{s.ok ? "On track" : "Needs review"}</span>
                        </div>
                        <p className="text-[8px] text-gray-400 mt-0.5">{s.phase} · {s.workers} workers</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-gray-900">₦{s.spent}M <span className="text-gray-400 font-normal">/ ₦{s.budget}M</span></p>
                        <p className="text-[8px] text-gray-400">{Math.round((s.spent/s.budget)*100)}% used</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <p className="text-[7px] text-gray-400 mb-1">Budget used</p>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div className={`h-full rounded-full ${s.ok ? "bg-orange-500" : "bg-amber-400"}`}
                            initial={{ width: 0 }} animate={{ width: budgetAnim ? `${Math.round((s.spent/s.budget)*100)}%` : 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-[7px] text-gray-400 mb-1">Progress</p>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full bg-blue-400"
                            initial={{ width: 0 }} animate={{ width: budgetAnim ? `${s.prog}%` : 0 }} transition={{ duration: 0.9, ease, delay: 0.2 }} />
                        </div>
                        <p className="text-[7px] text-right text-gray-400 mt-0.5">{s.prog}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Satellite cards */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
        {/* Material request */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 }}
          className="rounded-xl p-3"
          style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.12)", transform: "rotate(-0.5deg)", fontFamily: "ui-monospace,monospace" }}>
          <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Material Request</p>
          <p className="text-[10px] font-semibold text-gray-800">Dangote Cement 50kg</p>
          <p className="text-[8px] text-gray-500 mb-2">200 bags · Maitama site</p>
          <span className="text-[7px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Awaiting approval</span>
        </motion.div>

        {/* Procurement — interactive */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.33 }}
          className="rounded-xl p-3"
          style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.12)", transform: "rotate(0.3deg)", fontFamily: "ui-monospace,monospace" }}>
          <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Procurement · ₦2.4M</p>
          <p className="text-[10px] font-semibold text-gray-800">Reinforcement Rods</p>
          <p className="text-[8px] text-gray-500 mb-2">Jabi Lake · Arewa Steel</p>
          {!approvalDone ? (
            <button type="button" onClick={() => setApprovalDone(true)} className="w-full text-center rounded-lg text-white text-[8px] font-bold py-1.5 hover:opacity-90 transition" style={{ background: "#ea580c" }}>Approve purchase order</button>
          ) : (
            <div className="w-full text-center rounded-lg text-[8px] font-bold py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Approved — PO sent</div>
          )}
        </motion.div>

        {/* Daily progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.41 }}
          className="rounded-xl p-3 hidden md:block"
          style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.12)", transform: "rotate(0.6deg)", fontFamily: "ui-monospace,monospace" }}>
          <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Site Update</p>
          <p className="text-[10px] font-semibold text-gray-800">Gwarinpa — Day 127</p>
          <p className="text-[8px] text-gray-500 mb-0.5">3rd floor slab pour ✓</p>
          <p className="text-[8px] text-gray-500 mb-1.5">12 / 12 workers present</p>
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded bg-gray-100 border border-black/[0.07] flex items-center justify-center text-[9px]">📷</div>
            <span className="text-[8px] text-gray-400">4 photos attached</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEMO 3 — FACTORYFLOW (Manufacturing Operations)
// ═══════════════════════════════════════════════════════════════
function FactoryFlowDemo() {
  const [activeStage, setActiveStage] = useState(0);
  const [qcSigned, setQcSigned] = useState(false);

  const batches   = useCounter(3,   400, 300);
  const unitsToday = useCounter(7400, 1200, 500);
  const onHold    = useCounter(1,   300, 600);
  const dispatched = useCounter(2,  400, 700);

  useEffect(() => {
    const id = setInterval(() => setActiveStage(s => s < 4 ? s + 1 : s), 850);
    return () => clearInterval(id);
  }, []);

  const pipeline = [
    { label: "Raw Intake", icon: "📥" },
    { label: "Production", icon: "⚙️" },
    { label: "QC Check",   icon: "🔬" },
    { label: "Packaging",  icon: "📦" },
    { label: "Dispatch",   icon: "🚛" },
  ];

  const batchRows = [
    { id: "FF-2401", product: "Tomato Paste 400g",       qty: "2,400 units", stage: "Packaging",  st: "running" },
    { id: "FF-2402", product: "Groundnut Oil 1L",         qty: "860 units",  stage: "QC Check",   st: "hold"    },
    { id: "FF-2403", product: "Seasoning Cubes (bulk)",   qty: "5,000 units",stage: "Dispatched", st: "done"    },
  ];

  const materials = [
    { name: "Tomatoes (raw)",      avail: 1840, needed: 1200, unit: "kg",    ok: true  },
    { name: "Tin cans (400g)",     avail: 2800, needed: 2400, unit: "units", ok: true  },
    { name: "Groundnut Oil crude", avail: 320,  needed: 860,  unit: "L",     ok: false },
    { name: "Packaging film",      avail: 4,    needed: 3,    unit: "rolls", ok: true  },
  ];

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden p-5 md:p-7"
      style={{ background: "linear-gradient(145deg,#0d0818 0%,#110b20 55%,#0d0818 100%)", boxShadow: "0 40px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 25%,rgba(124,58,237,0.20) 0%,transparent 70%),radial-gradient(ellipse 30% 25% at 80% 75%,rgba(124,58,237,0.09) 0%,transparent 60%)" }} />

      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md flex items-center justify-center" style={{ background: "rgba(124,58,237,0.25)", border: "1px solid rgba(124,58,237,0.4)" }}>
            <span className="text-violet-400 text-[9px] font-bold">F</span>
          </div>
          <span className="text-white/50 text-[11px] font-medium">FactoryFlow · Production Control</span>
        </div>
        <span className="text-violet-400/60 text-[10px]">Shift 1 · Active</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.28)" }}>
        <DemoChrome url="factoryflow.ops / production-control" badge="Shift 1 · Active" />
        <div className="flex bg-white" style={{ height: 280, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
          <div className="w-28 flex flex-col p-3 gap-0.5 flex-shrink-0 border-r border-black/[0.06]"
            style={{ background: "linear-gradient(180deg,#1a0a2e 0%,#1e0d35 100%)" }}>
            <div className="mb-4">
              <p className="text-white/80 text-[10px] font-semibold mb-0.5">FactoryFlow</p>
              <p className="text-white/25 text-[8px]">Supervisor</p>
            </div>
            {["Production","Inventory","QC","Dispatch","Reports"].map((item, i) => (
              <button key={item} type="button" className="text-left px-2.5 py-1.5 rounded-lg text-[9px] transition"
                style={{ background: i === 0 ? "rgba(124,58,237,0.15)" : "transparent", color: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.35)" }}>{item}</button>
            ))}
            <div className="mt-auto pt-3 border-t border-white/[0.07]">
              <p className="text-white/20 text-[8px] mb-1">Today</p>
              <p className="text-white/50 text-[10px] font-semibold">{batches} batches</p>
              <p className="text-amber-400/70 text-[8px]">{onHold} on hold</p>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
            {/* KPIs */}
            <div className="grid grid-cols-4 divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
              {[
                { label:"Active Batches",  value:batches,    suffix:"",  delta:"this shift",         warn:false },
                { label:"Units Today",     value:unitsToday, suffix:"",  delta:"across all lines",   warn:false },
                { label:"On Hold",         value:onHold,     suffix:"",  delta:"material shortage",  warn:true  },
                { label:"Dispatched",      value:dispatched, suffix:"",  delta:"orders today",       warn:false },
              ].map(s => (
                <div key={s.label} className="px-3 py-3">
                  <p className="text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className={`text-xl font-bold leading-none ${s.warn ? "text-amber-600" : "text-gray-900"}`}>{s.value.toLocaleString()}</p>
                  <p className={`text-[8px] mt-1 ${s.warn ? "text-amber-500" : "text-gray-400"}`}>{s.delta}</p>
                </div>
              ))}
            </div>
            <div className="flex-1 overflow-auto p-3">
              {/* Pipeline */}
              <div className="bg-white rounded-xl border border-black/[0.07] px-4 py-3 mb-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-3">FF-2401 · Tomato Paste — Live Progress</p>
                <div className="flex items-center gap-1">
                  {pipeline.map((stage, i) => (
                    <div key={stage.label} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                          i < activeStage ? "bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.45)]" :
                          i === activeStage ? "bg-violet-100 border-2 border-violet-500 animate-pulse" : "bg-gray-100"
                        }`}>
                          <span className={i < activeStage ? "text-white text-[10px]" : "text-xs"}>{i < activeStage ? "✓" : stage.icon}</span>
                        </div>
                        <p className={`text-[7px] mt-1 text-center leading-tight ${i < activeStage ? "text-violet-600 font-semibold" : i === activeStage ? "text-violet-500" : "text-gray-400"}`}>{stage.label}</p>
                      </div>
                      {i < pipeline.length - 1 && <div className={`h-0.5 w-3 mx-0.5 transition-all duration-500 ${i < activeStage ? "bg-violet-400" : "bg-gray-200"}`} />}
                    </div>
                  ))}
                </div>
              </div>
              {/* Batch rows */}
              <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-1.5">All Batches</p>
              <div className="space-y-1">
                {batchRows.map(b => (
                  <div key={b.id} className="bg-white rounded-lg border border-black/[0.07] px-3 py-2 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] text-gray-400 font-mono">{b.id}</span>
                        <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-medium border ${b.st === "running" ? "bg-violet-50 text-violet-700 border-violet-200" : b.st === "hold" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                          {b.st === "running" ? "● Running" : b.st === "hold" ? "⚠ On hold" : "✓ Done"}
                        </span>
                      </div>
                      <p className="text-[9px] font-medium text-gray-800">{b.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-semibold text-gray-700">{b.qty}</p>
                      <p className="text-[8px] text-gray-400">{b.stage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Satellite cards */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 }}
          className="rounded-xl border border-amber-200 p-3"
          style={{ background: "rgba(255,251,235,0.97)", boxShadow: "0 3px 10px rgba(0,0,0,0.18),0 1px 3px rgba(217,119,6,0.12)", transform: "rotate(-0.6deg)", fontFamily: "ui-monospace,monospace" }}>
          <p className="text-[8px] font-semibold uppercase tracking-widest text-amber-600 mb-1.5">Material Shortage</p>
          <p className="text-[10px] font-semibold text-gray-800">Groundnut Oil (crude)</p>
          <p className="text-[8px] text-gray-600 mb-1">Required: 860L · Available: 320L</p>
          <p className="text-[7px] text-amber-700 font-semibold">FF-2402 on hold until restocked</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.33 }}
          className="rounded-xl p-3"
          style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.10)", transform: "rotate(0.4deg)", fontFamily: "ui-monospace,monospace" }}>
          <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">QC Sign-Off</p>
          <p className="text-[10px] font-semibold text-gray-800">FF-2401 · Batch 3 sample</p>
          <p className="text-[8px] text-gray-500 mb-2">pH 4.2 · Brix 28 · Seal: Pass</p>
          {!qcSigned ? (
            <button type="button" onClick={() => setQcSigned(true)} className="w-full text-center rounded-lg text-white text-[8px] font-bold py-1.5 hover:opacity-90 transition" style={{ background: "#7c3aed" }}>Sign off → advance to packaging</button>
          ) : (
            <div className="w-full text-center rounded-lg text-[8px] font-bold py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Signed — batch advancing</div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.41 }}
          className="rounded-xl p-3 hidden md:block"
          style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.10)", transform: "rotate(0.7deg)", fontFamily: "ui-monospace,monospace" }}>
          <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Dispatch Order</p>
          <p className="text-[10px] font-semibold text-gray-800">FF-2403 · Seasoning Cubes</p>
          <p className="text-[8px] text-gray-500 mb-0.5">5,000 units · Truck LG-482-KJA</p>
          <p className="text-[8px] text-gray-500 mb-1.5">Destination: Kano depot</p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[8px] text-emerald-600 font-semibold">Departed 09:14 — En route</span>
          </div>
        </motion.div>
      </div>

      {/* Raw materials mini-grid */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.5 }}
        className="mt-2 rounded-xl p-3"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 2px 8px rgba(0,0,0,0.16),0 1px 3px rgba(0,0,0,0.08)", transform: "rotate(-0.2deg)", fontFamily: "ui-monospace,monospace" }}>
        <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Raw Material Allocation — Current Shift</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
          {materials.map(m => (
            <div key={m.name} className={`rounded-lg px-2.5 py-2 border ${!m.ok ? "border-red-200 bg-red-50/50" : "border-black/[0.06] bg-gray-50/70"}`}>
              <p className="text-[8px] font-semibold text-gray-800 leading-tight mb-1">{m.name}</p>
              <p className={`text-[8px] ${!m.ok ? "text-red-600 font-semibold" : "text-gray-500"}`}>{m.avail.toLocaleString()} {m.unit} avail</p>
              <p className="text-[7px] text-gray-400">Needed: {m.needed.toLocaleString()}</p>
              {!m.ok && <p className="text-[7px] text-red-600 font-semibold mt-0.5">⚠ Insufficient</p>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// CASE STUDY DATA
// ═══════════════════════════════════════════════════════════════
const CASES = [
  {
    id: "medicore" as CaseId,
    client: "Multi-Branch Pharmacy Group",
    industry: "Healthcare", scope: "Warehouse Ops · Inventory Visibility · Expiry Management · Reporting",
    headline: "How we gave a multi-branch pharmacy network a single operational view of its own business.",
    subheadline: "Six separate workflows — warehouse, branches, dispatch, inventory, expiry, and reporting — had grown apart as the business scaled. We connected them.",
    why: {
      title: "Why this was an operational problem, not just a software problem",
      body: "A growing pharmacy network was managing daily operations across a central warehouse and multiple branches using spreadsheets, an existing point-of-sale system, and manual reporting. Each part of the operation functioned — but independently. As transaction volume grew, the gaps between systems became the bottleneck. Stock moved between the warehouse and branches with no central record. Expiry monitoring relied on staff physically checking shelves. Branch managers spent hours preparing reports that were already outdated by the time management saw them. The objective was not to replace what worked. It was to connect the systems that couldn't talk to each other.",
    },
    how: {
      title: "What we discovered in discovery — and what it changed",
      body: "During the first week, we mapped six separate operational flows that were each being handled through a different combination of spreadsheets, WhatsApp messages, and phone calls. The insight was specific: the pharmacy wasn't missing a tool — it was missing a shared data layer. Every branch, the warehouse, and management were making decisions based on different versions of the same information. We designed a centralised platform that let each role continue working the way they already worked, but with every action now writing to a single shared record. No retraining. No disruption. The system was built around their operation, not the other way around.",
    },
    insight: "The pharmacy wasn't disorganised. It was running six separate operational systems that had never been connected — and each one was generating its own version of the truth.",
    modules: [
      { name: "Unified Inventory Layer", problem: "Warehouse and branch stock were tracked separately, making it impossible to know the true network position of any drug at any time.", built: "A centralised inventory database that every branch and the warehouse writes to simultaneously. Transfers, sales, and restocks all update the same record in real time.", impact: "Management can see the network position of any drug across all locations in one view. Stock redistribution decisions are now based on live data, not day-old spreadsheets." },
      { name: "Expiry Monitoring Engine", problem: "Expiry tracking required staff to manually review shelves and spreadsheets. Products approaching expiry were frequently missed until it was too late to redistribute them.", built: "Automated expiry monitoring that flags products within a configurable threshold of their expiry date. Branch and warehouse managers receive alerts before the window for action closes.", impact: "The system surfaces redistribution opportunities — moving near-expiry stock from low-demand branches to high-demand ones — before those products become a loss." },
      { name: "Role-Based Dashboards", problem: "Different staff roles needed completely different information, but they were all working from the same shared spreadsheets — seeing too much of what they didn't need and not enough of what they did.", built: "Separate interfaces for warehouse staff, branch pharmacists, branch managers, cashiers, and business owners. Each role sees only the data and actions relevant to their function.", impact: "Operational clarity improved without increasing training overhead. Staff work faster because the system surfaces only what they need to act on." },
      { name: "Warehouse-to-Branch Transfer System", problem: "Stock transfers between the warehouse and branches were coordinated over WhatsApp and phone calls, with no central record of what was requested, approved, or dispatched.", built: "A structured transfer request and approval workflow: branches request stock, the warehouse confirms availability, dispatches, and the receiving branch acknowledges receipt. Every transfer creates an auditable record.", impact: "The full movement history of any stock item — from warehouse intake to branch sale — is traceable in a single log." },
      { name: "Automated Management Reporting", problem: "Business owners relied on branch managers manually compiling and sending operational reports — a process that took significant time and was prone to inconsistency.", built: "Automated daily, weekly, and monthly reports generated directly from system data: sales by branch, stock movement, expiry alerts, and transfer activity. Sent to management without anyone preparing them manually.", impact: "Business owners access a live operational view at any time, rather than waiting for manually prepared summaries." },
    ],
    timeline: [
      { week: "Week 1", title: "Discovery & operational mapping", items: ["Interviewed warehouse manager, branch managers, cashiers, and owner", "Mapped all six operational flows and their breakpoints", "Identified the shared data layer as the core architectural need", "Delivered a fixed technical specification"] },
      { week: "Week 2", title: "Architecture & role-based design", items: ["Designed each role's interface separately from its function", "Database schema and inventory logic finalised", "Transfer request and approval workflow mapped", "All screens reviewed and approved before development"] },
      { week: "Weeks 3–4", title: "Build, test & phased launch", items: ["Core inventory and transfer modules built first", "Tested with live warehouse and branch data", "Expiry monitoring alerts configured per product category", "Branch staff onboarded role by role"] },
    ],
    outcomes: [
      { value: "Real-time", label: "Stock visibility across all branches and warehouse", why: "Every sale, transfer, and restock now writes to a single shared database — eliminating the lag between what happened and what management knows." },
      { value: "Automated", label: "Expiry alerts before the redistribution window closes", why: "The system monitors expiry dates continuously and flags products before action is no longer possible — turning a reactive problem into a proactive one." },
      { value: "Zero", label: "Manual steps required to produce management reports", why: "Reports are generated directly from operational data on a schedule. No branch manager prepares them. No figures need to be consolidated." },
      { value: "One", label: "System connecting warehouse, branches, and management", why: "Where six separate tools and communication channels existed, there is now a single operational record that everyone reads from and writes to." },
    ],
    before: ["Warehouse and branch stock tracked in separate spreadsheets", "Expiry monitoring relied on manual shelf checks", "Stock transfers coordinated by WhatsApp and phone", "Management reports compiled manually by branch managers", "No unified view of network-wide inventory position"],
    after: ["Single inventory database updated in real time across all locations", "Automated expiry alerts surface redistribution opportunities early", "Transfers logged from request to receipt with full audit trail", "Management reports generated automatically from live data", "Business owners see a live operational dashboard at any time"],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Role-Based Auth", "Resend", "Vercel"],
    duration: "4 weeks",
    DemoComponent: MedicoreDemo,
    demoCaption: "Owner dashboard — tab between Overview (branch performance) and Inventory (network-wide stock with expiry alerts).",
  },
  {
    id: "buildcore" as CaseId,
    client: "Mid-Size Construction Firm",
    industry: "Construction", scope: "Site Management · Materials Tracking · Procurement · Progress Reporting",
    headline: "How we replaced WhatsApp updates and Excel reports with a live view of every active construction site.",
    subheadline: "Directors were making financial decisions based on weekly summaries that were already five days old. We gave them a live operational picture — without changing how site teams work.",
    why: {
      title: "Why construction firms specifically need custom software",
      body: "Construction companies in Nigeria already know software exists for this problem — Procore, Buildertrend, and Autodesk Construction Cloud are well-known globally. The gap is that those tools were built for large contractors in Western markets with dedicated project management offices and IT departments. A mid-size Nigerian construction firm managing three to six active sites simultaneously has a completely different operational reality: site managers sending progress updates over voice notes, materials tracked in site notebooks, procurement handled through personal supplier relationships, and directors receiving consolidated reports once a week — by which time decisions are already overdue. The software exists. The right fit for how Nigerian construction actually operates has been missing.",
    },
    how: {
      title: "The core design decision: director visibility without disrupting site workflows",
      body: "In discovery, we found that the site managers had good instincts and ran their sites well. The problem wasn't at site level — it was that all the information those managers held in their heads and notebooks was invisible to directors until the weekly meeting. We made one decision early: we would not try to change how site managers work. We would build them a simple tool that captured what they were already doing — materials used, workers present, progress notes, photos — and surfaced it instantly to the director dashboard. The site manager's job gets slightly easier. The director's visibility transforms completely.",
    },
    insight: "The problem wasn't that site managers weren't managing well. It was that everything they knew was invisible to anyone above them until Friday.",
    modules: [
      { name: "Multi-Site Director Dashboard", problem: "Directors had no live view of site progress, budget consumption, or material status across multiple active projects. They managed by intuition and weekly reports.", built: "A unified dashboard showing all active sites simultaneously: progress percentage, budget vs actual spend, workers on site today, open material requests, and recent site updates.", impact: "Directors can see in real time which sites are on track, which are consuming budget faster than progress justifies, and which need attention — without calling anyone." },
      { name: "Daily Site Progress Logging", problem: "Site managers communicated progress through WhatsApp voice notes and personal calls. No structured record of daily activity, decisions, or incidents existed.", built: "A simple daily log interface for site managers: work completed today, workers present, equipment in use, photos uploaded, and any issues flagged. Takes under three minutes to complete.", impact: "A complete chronological record of every site exists in the system. Progress photos are timestamped and attached to the correct date and site." },
      { name: "Materials Request & Tracking", problem: "Material requests were made verbally or by message, procurement was handled informally, and no one could see exactly what had been delivered to each site at any point.", built: "Structured material requests raised by site managers, reviewed by procurement, approved by directors above a threshold, and logged as delivered when goods arrive on site.", impact: "The full material movement history — requested, approved, ordered, delivered — for every site is traceable. Budget overruns from unapproved purchases become visible before they happen." },
      { name: "Procurement Approval Workflow", problem: "Purchases above certain values were supposed to require director approval. In practice, site-level procurement happened informally and was reconciled retrospectively.", built: "Tiered approval workflow: site-level purchases below a threshold proceed automatically; above it, procurement raises a purchase order that routes to the director for approval before the vendor is contacted.", impact: "Directors approve expenditure above the threshold before it happens, not after. Vendors receive formal purchase orders, creating a paper trail for every significant spend." },
      { name: "Budget vs Actual Tracking", problem: "Budget monitoring happened in spreadsheets updated monthly. Overspending was discovered after the fact, when the options for correction were already limited.", built: "Live budget tracking per site: every approved purchase updates the 'actual spent' figure against the original budget. Directors see the burn rate per site at any time.", impact: "Budget pressure surfaces early enough to act — adjust scope, pause procurement, or reallocate — rather than being discovered at month-end." },
    ],
    timeline: [
      { week: "Week 1", title: "Discovery across roles", items: ["Interviewed directors, project managers, site managers", "Mapped information flow from site to boardroom", "Identified the director-visibility gap as the core problem", "Fixed scope and timeline agreed"] },
      { week: "Week 2", title: "Architecture & interface design", items: ["Director dashboard and site manager log designed separately", "Procurement approval workflow and thresholds defined", "Budget tracking logic mapped to existing project structures", "All screens approved before development began"] },
      { week: "Weeks 3–5", title: "Build, pilot & rollout", items: ["Director dashboard and budget tracking built first", "Piloted on one active site for two weeks", "Site manager log refined based on field feedback", "Full rollout across all active sites in week 5"] },
    ],
    outcomes: [
      { value: "Daily", label: "Site progress visibility — not weekly", why: "Site managers log daily. Directors see it the same day. The one-week information lag is eliminated." },
      { value: "Before", label: "Directors approve procurement above threshold — not after", why: "The approval workflow routes purchase orders to directors before the vendor is contacted. Retrospective reconciliation is replaced by real-time oversight." },
      { value: "Live", label: "Budget vs actual for every active site", why: "Every approved purchase updates the budget ledger immediately. Burn rate is visible at any time, not at month-end." },
      { value: "Zero", label: "WhatsApp messages needed to get a site update", why: "Directors open the dashboard. The information is there — progress, workers, materials, photos — without calling anyone." },
    ],
    before: ["Progress updates received via WhatsApp voice notes and calls", "Budget monitoring in spreadsheets updated monthly", "Material requests made verbally with no formal record", "Directors waited for weekly meetings to understand site status", "Procurement happened informally and was reconciled after the fact"],
    after: ["Daily site logs give directors a live operational picture", "Budget vs actual tracked in real time per site", "Every material request, approval, and delivery is logged", "Director dashboard shows all sites simultaneously — no calls needed", "Procurement above threshold requires approval before the order is placed"],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Cloudinary", "Resend", "Vercel"],
    duration: "5 weeks",
    DemoComponent: BuildCoreDemo,
    demoCaption: "Director dashboard — budget bars animate on load. Tap 'Approve purchase order' in the satellite card to see the procurement flow live.",
  },
  {
    id: "factoryflow" as CaseId,
    client: "Food Processing Manufacturer",
    industry: "Manufacturing", scope: "Production Planning · Raw Materials · QC · Warehouse · Dispatch",
    headline: "How we connected raw material intake, production, quality control, and dispatch for a food processing business — into one operational system.",
    subheadline: "Each stage of production was tracked independently. When something went wrong, nobody could say exactly where it had gone wrong, when, or why.",
    why: {
      title: "Why manufacturing businesses outgrow spreadsheets faster than most",
      body: "A food processing business has at least five distinct operational stages that all depend on each other: raw material procurement, intake and allocation, production scheduling, quality control, finished goods warehousing, and dispatch. In a small or growing factory, these are almost always managed in separate spreadsheets or informal logs — because the people running each stage are specialists in their stage, not in coordination. The problem appears slowly. A raw material shortage isn't discovered until the production batch is already started. A quality hold on one batch isn't visible to the dispatch team. Finished goods are committed to a customer before the warehouse has confirmed they exist. The tools that large manufacturers use — SAP, Odoo Manufacturing, Katana — are either too expensive, too complex to implement, or built around assumptions that don't match how a growing African manufacturer actually operates.",
    },
    how: {
      title: "The architectural insight — each stage needed its own interface, but shared data",
      body: "We ran discovery sessions separately with the procurement officer, the production supervisor, the quality control manager, and the dispatch team. The insight was that each person had a clear and reasonable view of their own stage — the problem was that those views were completely disconnected from each other. A batch could move from production to QC without the QC manager knowing it was coming. A dispatch order could be raised for goods that were still on hold in QC. We designed a production pipeline model: every batch is a formal object that moves through defined stages, and each stage transition requires a named action from the responsible person. Nothing moves forward silently.",
    },
    insight: "Raw materials, production, QC, and dispatch were all being managed competently — in complete isolation. The business had no system for the space between stages.",
    modules: [
      { name: "Production Batch Tracker", problem: "Production runs were logged in a notebook or not at all. There was no formal record of what was being produced, at what quantity, and at which stage of the process.", built: "Every production run is created as a batch with a unique ID, product type, target quantity, and responsible supervisor. The batch moves through a defined pipeline: raw intake → production → QC → packaging → dispatch.", impact: "Any production run can be located at its exact stage at any time. If something goes wrong, the record shows exactly when it entered that stage, who was responsible, and what the inputs were." },
      { name: "Raw Material Allocation Engine", problem: "Raw materials were procured and stored without a clear link to production requirements. Shortages were discovered mid-batch when the material had already run out.", built: "When a production batch is created, the system checks raw material availability against the batch requirement and flags shortages before the batch begins. Allocations are reserved, not just noted.", impact: "Production batches are not started without confirming material availability. The scenario where a batch begins and then stops because of a missing material is eliminated." },
      { name: "Quality Control Sign-Off Workflow", problem: "QC results were logged in a separate notebook. Production moved batches to packaging or dispatch without formal QC clearance — creating food safety and compliance risk.", built: "Each batch reaching the QC stage generates a checklist for the QC manager: test results, sample data, pass/fail decision. The batch cannot advance to packaging until QC is signed off.", impact: "No batch moves forward without documented QC clearance. The audit trail for every batch — from production through QC to dispatch — exists in the system." },
      { name: "Finished Goods & Warehouse Visibility", problem: "Finished goods were stored in a warehouse managed by a separate team with no connection to production or dispatch systems. Dispatch orders were sometimes raised for goods that weren't ready.", built: "When QC clears a batch for packaging, finished goods are logged into the warehouse record with quantity and date. Dispatch orders can only be raised against confirmed finished goods inventory.", impact: "Sales and dispatch teams work from accurate finished goods figures. Overselling or dispatching goods that aren't ready is prevented by the system structure." },
      { name: "Dispatch & Delivery Management", problem: "Dispatch was coordinated informally. Customers were sometimes given delivery commitments before the goods had left the factory, and there was no formal record of what had been sent where.", built: "Dispatch orders are raised against confirmed inventory, assigned to a vehicle and driver, and marked as departed with a timestamp. Customers can be given accurate dispatch information because the system holds it.", impact: "Every dispatch has a formal record: goods, quantity, vehicle, driver, departure time, and destination. Disputes about what was sent are resolvable from the system log." },
    ],
    timeline: [
      { week: "Week 1", title: "Discovery with all five operational roles", items: ["Separate interviews with procurement, production, QC, warehouse, and dispatch", "Mapped all five operational stages and the gaps between them", "Designed the batch pipeline model as the core architecture", "Fixed specification agreed"] },
      { week: "Week 2", title: "Architecture & interface design", items: ["Each stage interface designed for its specific user", "Batch state machine and transition rules defined", "Material allocation logic designed", "All interfaces approved before development"] },
      { week: "Weeks 3–5", title: "Build, test & staged rollout", items: ["Production batch tracker built and tested first", "Raw material allocation engine integrated", "QC sign-off workflow piloted with one product line", "Full rollout with all five operational roles in week 5"] },
    ],
    outcomes: [
      { value: "One", label: "System tracking every batch from raw intake to dispatch", why: "Where five separate logs and notebooks existed, there is now a single production record that all five roles read from and write to." },
      { value: "Zero", label: "Batches started without confirmed material availability", why: "The allocation engine checks and reserves materials before a batch begins. Starting a batch with insufficient stock is prevented by the system, not by someone remembering to check." },
      { value: "Auditable", label: "QC record for every batch — with timestamps and sign-offs", why: "QC sign-off is a required step in the batch pipeline. It cannot be skipped. Every batch that reaches a customer has a documented QC clearance." },
      { value: "Accurate", label: "Finished goods inventory before dispatch orders are raised", why: "Dispatch can only be raised against confirmed warehouse stock. Sales commitments are made against real inventory, not estimates." },
    ],
    before: ["Production runs logged in notebooks with no formal tracking", "Raw material shortages discovered mid-batch", "QC results in a separate notebook with no system link", "Dispatch orders raised against unconfirmed finished goods", "No single view of what was in production, QC, or warehouse at any time"],
    after: ["Every batch tracked through a defined pipeline from intake to dispatch", "Material availability confirmed before a batch begins", "QC sign-off required before any batch advances", "Dispatch raised only against confirmed finished goods inventory", "Supervisors and management see live production status at any time"],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Role-Based Auth", "Resend", "Railway"],
    duration: "5 weeks",
    DemoComponent: FactoryFlowDemo,
    demoCaption: "Production pipeline — watch the batch advance automatically. Interact with 'QC Sign-Off' and 'Material Shortage' satellite cards.",
  },
] as const;

// ═══════════════════════════════════════════════════════════════
// SHARED SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════
function ModuleRow({ mod, accent }: { mod: { name: string; problem: string; built: string; impact: string }; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-black/[0.08] overflow-hidden">
      <button type="button" onClick={() => setOpen(p => !p)} className="w-full flex items-center justify-between px-4 py-3 gap-4 text-left" aria-expanded={open}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
          <span className="text-sm font-medium text-gray-900 truncate">{mod.name}</span>
        </div>
        <span className={`text-gray-400 text-sm transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease }} className="overflow-hidden">
            <div className="border-t border-black/[0.06] divide-y divide-black/[0.04]">
              {
              }
              {[
                { l: "The operational problem", t: mod.problem, c: "text-red-600/70" },
                { l: "What we built", t: mod.built, c: "text-gray-500" },
                { l: "Business impact", t: mod.impact, c: "text-emerald-700" },
              ].map(({ l, t, c }) => (
                <div key={l} className="px-4 py-3">
                  <p className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${c}`}>{l}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CaseTimeline({ weeks, accent }: { weeks: readonly { week: string; title: string; items: readonly string[] }[]; accent: string }) {
  return (
    <div>{weeks.map((w, i) => (
      <div key={w.week} className="flex gap-3">
        <div className="flex flex-col items-center">
          <div className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: accent }}>
            <span className="text-white text-[9px] font-bold">{i + 1}</span>
          </div>
          {i < weeks.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: `${accent}22` }} />}
        </div>
        <div className="pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-900">{w.week}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">{w.title}</span>
          </div>
          <ul className="space-y-1">{w.items.map(item => (
            <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
              <span className="mt-[5px] h-1 w-1 rounded-full flex-shrink-0" style={{ background: accent }} />
              {item}
            </li>
          ))}</ul>
        </div>
      </div>
    ))}</div>
  );
}

function BeforeAfter({ before, after }: { before: readonly string[]; after: readonly string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="rounded-xl border border-red-100 bg-red-50/40 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-3">Before</p>
        <ul className="space-y-2">{before.map(item => (
          <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
            <span className="text-red-300 flex-shrink-0 text-[10px] font-bold mt-0.5">✕</span>{item}
          </li>
        ))}</ul>
      </div>
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500 mb-3">After</p>
        <ul className="space-y-2">{after.map(item => (
          <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
            <span className="text-emerald-400 flex-shrink-0 text-[10px] font-bold mt-0.5">✓</span>{item}
          </li>
        ))}</ul>
      </div>
    </div>
  );
}

type TabId = "story" | "modules" | "delivery" | "results";
const TABS: { id: TabId; label: string }[] = [
  { id: "story", label: "The story" },
  { id: "modules", label: "What we built" },
  { id: "delivery", label: "Delivery" },
  { id: "results", label: "Results" },
];

function CaseCard({ study, isOpen, onToggle, index }: { study: typeof CASES[number]; isOpen: boolean; onToggle: () => void; index: number }) {
  const theme = CASE_THEMES[study.id];
  const rm = useReducedMotion();
  const [tab, setTab] = useState<TabId>("story");
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onToggle(); setTab("story");
    if (!isOpen) setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 90);
  };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.5, ease, delay: index * 0.07 }}
      className="rounded-3xl border overflow-hidden bg-white transition-shadow duration-300"
      style={{ borderColor: isOpen ? theme.accentBorder : "rgba(0,0,0,0.09)", boxShadow: isOpen ? "0 20px 60px rgba(0,0,0,0.09)" : "0 2px 10px rgba(0,0,0,0.05)" }}>

      {/* Collapsed header */}
      <button type="button" onClick={handleToggle} aria-expanded={isOpen} className="w-full text-left p-5 md:p-6">
        <div className="flex items-start gap-4 md:gap-6">
          {/* Editorial number */}
          <div className="flex-shrink-0 select-none leading-none font-bold tracking-tighter hidden sm:block"
            style={{ fontSize: "clamp(3rem,6vw,4.5rem)", color: isOpen ? theme.accent : "transparent",
              WebkitTextStroke: isOpen ? "0px" : `1.5px ${theme.accentBorder}`,
              transition: "color 0.3s ease, -webkit-text-stroke 0.3s ease", marginTop: "-4px", lineHeight: 1 }}
            aria-hidden="true">
            {theme.number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: theme.accentLight, color: theme.accentText }}>
                  {theme.label}
                </span>
                <p className="text-[9px] text-gray-400 mt-1.5">{study.client} · {study.industry} · {study.scope}</p>
              </div>
              <div className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
                style={{ background: isOpen ? theme.accentLight : "rgba(0,0,0,0.05)", color: isOpen ? theme.accent : "#9ca3af" }} aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
            </div>
            <h3 className="text-base md:text-[1.1rem] font-medium text-gray-900 leading-snug max-w-2xl">{study.headline}</h3>
            <p className="mt-1.5 text-sm text-gray-400 leading-relaxed max-w-xl">{study.subheadline}</p>
          </div>
        </div>
        {!isOpen && (
          <div className="mt-4 flex flex-wrap gap-2">
            {study.outcomes.slice(0, 3).map(o => (
              <span key={o.value} className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1 text-[11px] text-gray-500">
                <span className="font-semibold text-gray-900">{o.value}</span>{o.label}
              </span>
            ))}
            <span className="hidden md:flex items-center text-xs text-gray-400 ml-auto">Read full story →</span>
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="exp" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
            {/* Demo band */}
            <div className="border-t border-black/[0.06]" style={{ background: theme.accentLight }}>
              <div className="px-5 md:px-8 py-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: theme.accentText }}>
                  System demo — {study.demoCaption}
                </p>
                <study.DemoComponent />
              </div>
            </div>

            {/* Tabs */}
            <div className="border-y border-black/[0.07]">
              <div className="px-5 md:px-6 flex overflow-x-auto">
                {TABS.map(t => (
                  <button key={t.id} type="button" onClick={() => setTab(t.id)}
                    className={`px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${tab === t.id ? "border-current" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                    style={{ color: tab === t.id ? theme.accent : undefined }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab body */}
            <div className="px-5 md:px-6 py-6">
              <AnimatePresence mode="wait" initial={false}>
                {tab === "story" && (
                  <motion.div key="story" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    {/* Key insight callout */}
                    <div className="mb-5 rounded-2xl border p-4 flex items-start gap-3" style={{ borderColor: theme.accentBorder, background: theme.accentLight }}>
                      <div className="h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: theme.accent }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1v5.5M6 9v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: theme.accentText }}>Key insight</p>
                        <p className="text-sm leading-relaxed" style={{ color: theme.accentText }}>{study.insight}</p>
                      </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-5">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">{study.why.title}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{study.why.body}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">{study.how.title}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{study.how.body}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Before & after</p>
                        <BeforeAfter before={study.before} after={study.after} />
                        <div className="mt-4">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Stack</p>
                          <div className="flex flex-wrap gap-1.5">{study.stack.map(s => <span key={s} className="rounded-lg border border-black/10 px-2.5 py-1 text-xs text-gray-600 font-mono">{s}</span>)}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {tab === "modules" && (
                  <motion.div key="mod" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-4 max-w-xl leading-relaxed">Each module below shows the specific operational problem it solved, what was designed and built, and the measurable change it made.</p>
                    <div className="space-y-2">{study.modules.map(m => <ModuleRow key={m.name} mod={m} accent={theme.accent} />)}</div>
                  </motion.div>
                )}
                {tab === "delivery" && (
                  <motion.div key="del" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-5 max-w-xl leading-relaxed">Every project begins with operational discovery — mapping how the business actually works before designing anything. We never write code in week one.</p>
                    <CaseTimeline weeks={study.timeline} accent={theme.accent} />
                  </motion.div>
                )}
                {tab === "results" && (
                  <motion.div key="res" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-4 max-w-xl leading-relaxed">Outcomes are stated with the mechanism that produced them. We don't publish numbers we can't explain.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {study.outcomes.map(o => (
                        <div key={o.value} className="rounded-xl border border-black/[0.08] bg-white p-4">
                          <p className="text-2xl font-semibold leading-none mb-1" style={{ color: theme.accent }}>{o.value}</p>
                          <p className="text-xs font-medium text-gray-700 mb-1.5 leading-snug">{o.label}</p>
                          <p className="text-[11px] text-gray-400 leading-relaxed">{o.why}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-2xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ borderColor: theme.accentBorder, background: theme.accentLight }}>
                      <div>
                        <p className="text-xs text-gray-600">Delivered in <span className="font-semibold text-gray-900">{study.duration}</span> from signed scope to live system.</p>
                        <p className="text-xs text-gray-400 mt-0.5">Full source code ownership. NDA signed before discovery begins.</p>
                      </div>
                      <Link href="/contact" className="flex-shrink-0 inline-flex items-center justify-center rounded-xl text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition" style={{ background: theme.accent }}>
                        Build something like this →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CASE STUDIES SECTION
// ═══════════════════════════════════════════════════════════════
function CaseStudiesSection() {
  const [openId, setOpenId] = useState<CaseId | null>(null);
  return (
    <section id="case-studies" className="px-6 py-16 md:py-20 border-t border-black/[0.06]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Operational systems — built & shipped</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 max-w-2xl leading-snug">Three businesses. Three complex operational problems. Here's exactly how we thought through each one.</h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">Each case below includes an interactive system demo, the full story behind our decisions, the delivery timeline, and the outcomes — with the reasoning behind each result.</p>
        </div>
        <div className="space-y-4">
          {CASES.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i} isOpen={openId === study.id}
              onToggle={() => setOpenId(prev => prev === study.id ? null : study.id)} />
          ))}
        </div>

        {/* How we think */}
        <div className="mt-6 rounded-3xl bg-black text-white p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-3">How we approach every project</p>
            <p className="text-lg md:text-xl font-medium text-white max-w-2xl leading-snug">We help growing businesses replace disconnected spreadsheets, manual reporting, and fragmented workflows with software designed around how their operations actually run.</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {CASES.map(c => {
                const t = CASE_THEMES[c.id];
                return (
                  <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="inline-block text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3" style={{ background: `${t.accent}22`, color: t.accent }}>{t.label.split("·")[0].trim()}</span>
                    <p className="text-xs text-white/60 leading-relaxed">{c.insight}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-white/50 max-w-md leading-relaxed">If your business has an operational problem that spreadsheets and generic tools haven't solved, it probably has a software answer. Let's find out what it is.</p>
              <Link href="/contact" className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-white text-black text-sm font-medium px-5 py-2.5 hover:opacity-90 transition">Book a discovery call →</Link>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Not sure if your problem needs custom software?</p>
            <p className="text-sm text-gray-500 mt-0.5 max-w-lg">Book a free 30-minute operational review. We'll map your current process and tell you honestly whether a custom system makes sense — or whether an existing tool would serve you better.</p>
          </div>
          <Link href="/contact" className="flex-shrink-0 inline-flex items-center justify-center rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition whitespace-nowrap">Book a free review</Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════
const FAQS = [
  { q: "How long does it take to build a custom operational system?", a: "Most projects take between 4 and 8 weeks depending on scope. A focused system for one or two operational flows ships in 4 weeks. A platform covering multiple roles, locations, and workflows typically takes 6–8 weeks. We give you a precise timeline after Discovery — before you commit to anything." },
  { q: "How much does it cost?", a: "Projects typically start from $8,000–$15,000 for a focused operational system and scale based on complexity. We don't provide a quote until we fully understand your scope — that's what the Discovery phase is for. In most cases, the cost is recovered within the first year through reduced manual overhead and improved operational visibility." },
  { q: "Will I own the code after the project?", a: "Yes — 100%, unconditionally. You receive the full source code, database schema, deployment configuration, and documentation. No licensing fees, no lock-in. You can take the system to any developer in the future. Most clients stay with us because of the working relationship, not because they have to." },
  { q: "What do you need from me to start?", a: "Not a technical specification. A clear description of how your business currently operates, where the manual work is happening, and what visibility you're missing. We run a structured Discovery session and produce the technical specification ourselves. You focus on the business problem; we translate it into a system." },
  { q: "Do you work with clients outside Nigeria?", a: "Yes — the majority of our active clients are outside Nigeria. We work with businesses in the UK, US, Canada, Germany, and across West Africa. We operate fully remotely with structured asynchronous communication and weekly video check-ins." },
  { q: "What if our processes change after the system is built?", a: "We build for change. Every system we deliver is documented, built on standard open-source technologies, and structured to be extended. Most clients stay on a post-launch support and iteration retainer — we become a long-term operational partner, not just a build contractor." },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur overflow-hidden">
      <button type="button" onClick={() => setOpen(p => !p)} className="w-full px-5 py-4 text-left flex items-center justify-between gap-6" aria-expanded={open}>
        <span className="text-sm text-gray-900">{q}</span>
        <span className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
            <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
export default function CustomSoftwareDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Hero />
      <WhatWeBuildCarousel />
      <CaseStudiesSection />
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">Questions we hear before every project starts.</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">Answered here so your first conversation with us can focus on your specific situation.</p>
          <div className="grid gap-3">{FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>
    </main>
  );
}