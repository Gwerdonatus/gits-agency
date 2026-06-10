"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════
const CASE_THEMES = {
  pipelinedesk: {
    accent: "#4f46e5", accentLight: "rgba(79,70,229,0.07)",
    accentBorder: "rgba(79,70,229,0.18)", accentText: "#312e81",
    label: "Real Estate · Custom CRM",
    number: "01",
    stageBg: "linear-gradient(145deg,#0a0818 0%,#0d0c20 55%,#0a0818 100%)",
    glow: "radial-gradient(ellipse 55% 45% at 45% 25%,rgba(79,70,229,0.20) 0%,transparent 70%),radial-gradient(ellipse 35% 30% at 85% 75%,rgba(79,70,229,0.09) 0%,transparent 60%)",
  },
  staffhub: {
    accent: "#be185d", accentLight: "rgba(190,24,93,0.07)",
    accentBorder: "rgba(190,24,93,0.18)", accentText: "#831843",
    label: "Hospitality · Staff Management",
    number: "02",
    stageBg: "linear-gradient(145deg,#1a0810 0%,#200b15 55%,#1a0810 100%)",
    glow: "radial-gradient(ellipse 55% 45% at 45% 25%,rgba(190,24,93,0.20) 0%,transparent 70%),radial-gradient(ellipse 35% 30% at 80% 75%,rgba(190,24,93,0.09) 0%,transparent 60%)",
  },
  servicedesk: {
    accent: "#b45309", accentLight: "rgba(180,83,9,0.07)",
    accentBorder: "rgba(180,83,9,0.20)", accentText: "#78350f",
    label: "Facilities · Service Ticketing",
    number: "03",
    stageBg: "linear-gradient(145deg,#140c00 0%,#1a1000 55%,#140c00 100%)",
    glow: "radial-gradient(ellipse 55% 45% at 45% 25%,rgba(180,83,9,0.20) 0%,transparent 70%),radial-gradient(ellipse 35% 30% at 80% 75%,rgba(180,83,9,0.09) 0%,transparent 60%)",
  },
} as const;
type CaseId = keyof typeof CASE_THEMES;

// ═══════════════════════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// SHARED CHROME BAR
// ═══════════════════════════════════════════════════════════════
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
// DEMO 1 — PIPELINEDESK: Custom Real Estate CRM
// Pipeline board + lead detail + activity feed
// ═══════════════════════════════════════════════════════════════
function PipelineDeskDemo() {
  const [selectedLead, setSelectedLead] = useState<string | null>("Adaeze O.");
  const [noteAdded, setNoteAdded] = useState(false);

  const totalLeads   = useCounter(147, 1000, 400);
  const thisMonth    = useCounter(23,  800, 500);
  const dealValue    = useCounter(842, 1100, 600);
  const convRate     = useCounter(18,  700, 700);

  const stages = [
    {
      name: "New Enquiry", color: "#e0e7ff", textColor: "#3730a3",
      leads: [
        { name: "Adaeze O.", property: "3-bed Lekki Phase 1", value: "₦85M", days: 1 },
        { name: "Kunle B.", property: "Land · Ibeju-Lekki", value: "₦22M", days: 2 },
      ],
    },
    {
      name: "Site Visit", color: "#fce7f3", textColor: "#9d174d",
      leads: [
        { name: "Emeka D.", property: "2-bed Banana Island", value: "₦120M", days: 5 },
      ],
    },
    {
      name: "Negotiation", color: "#fef3c7", textColor: "#92400e",
      leads: [
        { name: "Fatima S.", property: "4-bed Maitama, Abuja", value: "₦95M", days: 8 },
        { name: "Bola A.", property: "Commercial · VI", value: "₦210M", days: 12 },
      ],
    },
    {
      name: "Offer Made", color: "#d1fae5", textColor: "#065f46",
      leads: [
        { name: "Chidi I.", property: "Duplex · Ajah", value: "₦68M", days: 3 },
      ],
    },
  ];

  const selectedDetail = {
    name: "Adaeze O.", property: "3-bedroom apartment, Lekki Phase 1",
    value: "₦85,000,000", source: "Instagram ad", agent: "Tunde A.",
    phone: "+234 803 xxx xxxx", email: "adaeze@—",
    activity: [
      { type: "call", text: "Initial enquiry call — confirmed budget and timeline", time: "Today, 10:14am" },
      { type: "note", text: "Prefers ground or first floor. Available weekends only for visits.", time: "Today, 10:22am" },
      { type: "visit", text: "Site visit scheduled — Saturday 14 June, 11am", time: "Today, 10:35am" },
    ],
  };

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden p-5 md:p-7"
      style={{ background: CASE_THEMES.pipelinedesk.stageBg, boxShadow: "0 40px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: CASE_THEMES.pipelinedesk.glow }} />

      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md flex items-center justify-center" style={{ background: "rgba(79,70,229,0.25)", border: "1px solid rgba(79,70,229,0.4)" }}>
            <span className="text-indigo-400 text-[9px] font-bold">PD</span>
          </div>
          <span className="text-white/50 text-[11px] font-medium">PipelineDesk · Sales CRM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-indigo-400/60 text-[10px]">147 active leads</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.28)" }}>
        <DemoChrome url="pipelinedesk.internal / pipeline" badge="Sales pipeline" />
        <div className="flex bg-white" style={{ height: 290, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
          {/* Sidebar */}
          <div className="w-28 flex flex-col p-3 gap-0.5 flex-shrink-0 border-r border-black/[0.06]"
            style={{ background: "linear-gradient(180deg,#0f0e2a 0%,#141235 100%)" }}>
            <div className="mb-4">
              <p className="text-white/80 text-[10px] font-semibold mb-0.5">PipelineDesk</p>
              <p className="text-white/25 text-[8px]">Sales Team</p>
            </div>
            {["Pipeline","Leads","Properties","Reports","Settings"].map((item, i) => (
              <button key={item} type="button" className="text-left px-2.5 py-1.5 rounded-lg text-[9px] transition"
                style={{ background: i === 0 ? "rgba(79,70,229,0.18)" : "transparent", color: i === 0 ? "#a5b4fc" : "rgba(255,255,255,0.35)" }}>{item}</button>
            ))}
            <div className="mt-auto pt-3 border-t border-white/[0.07]">
              <p className="text-white/20 text-[8px] mb-1">Agents</p>
              {["Tunde A.","Ngozi B.","Seun C."].map(a => (
                <div key={a} className="flex items-center gap-1.5 py-0.5">
                  <div className="h-3 w-3 rounded-full bg-indigo-400/30 flex items-center justify-center">
                    <span className="text-[6px] text-indigo-300 font-bold">{a[0]}</span>
                  </div>
                  <span className="text-[8px] text-white/25">{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
            {/* KPIs */}
            <div className="grid grid-cols-4 divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
              {[
                { label: "Active Leads",  value: totalLeads, suffix: "",  delta: "in pipeline",      warn: false },
                { label: "This Month",    value: thisMonth,  suffix: "",  delta: "new enquiries",    warn: false },
                { label: "Pipeline Value",value: dealValue,  suffix: "M", delta: "total open deals", warn: false, prefix: "₦" },
                { label: "Conv. Rate",    value: convRate,   suffix: "%", delta: "enquiry to offer",  warn: false },
              ].map(s => (
                <div key={s.label} className="px-3 py-3">
                  <p className="text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-gray-900 leading-none">{s.prefix || ""}{s.value.toLocaleString()}{s.suffix}</p>
                  <p className="text-[8px] mt-1 text-gray-400">{s.delta}</p>
                </div>
              ))}
            </div>

            {/* Pipeline board + detail panel */}
            <div className="flex flex-1 overflow-hidden">
              {/* Kanban columns */}
              <div className="flex-1 overflow-x-auto overflow-y-hidden p-2 flex gap-2">
                {stages.map(stage => (
                  <div key={stage.name} className="flex-shrink-0 w-32 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[8px] font-semibold text-gray-500">{stage.name}</span>
                      <span className="text-[7px] bg-gray-100 text-gray-500 rounded-full px-1.5 leading-4">{stage.leads.length}</span>
                    </div>
                    {stage.leads.map(lead => (
                      <button key={lead.name} type="button" onClick={() => setSelectedLead(lead.name)}
                        className={`w-full text-left rounded-xl p-2 border transition-all ${selectedLead === lead.name ? "border-indigo-300 bg-indigo-50/60" : "border-black/[0.07] bg-white hover:border-indigo-200"}`}
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="h-4 w-4 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-[7px] font-bold text-indigo-600">{lead.name[0]}</span>
                          </div>
                          <span className="text-[9px] font-semibold text-gray-800 truncate">{lead.name}</span>
                        </div>
                        <p className="text-[8px] text-gray-500 leading-tight truncate">{lead.property}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[8px] font-semibold text-indigo-600">{lead.value}</span>
                          <span className="text-[7px] text-gray-400">{lead.days}d</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Lead detail panel */}
              {selectedLead && (
                <div className="w-48 flex-shrink-0 border-l border-black/[0.07] bg-white overflow-y-auto p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-indigo-600">AO</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-900">{selectedDetail.name}</p>
                      <p className="text-[8px] text-gray-400">New Enquiry</p>
                    </div>
                  </div>
                  <div className="space-y-1 mb-3">
                    {[
                      { l: "Property", v: "Lekki Ph 1, 3BR" },
                      { l: "Value", v: selectedDetail.value },
                      { l: "Source", v: selectedDetail.source },
                      { l: "Agent", v: selectedDetail.agent },
                    ].map(f => (
                      <div key={f.l} className="flex items-start justify-between gap-2">
                        <span className="text-[7px] text-gray-400">{f.l}</span>
                        <span className="text-[8px] font-medium text-gray-700 text-right">{f.v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[7px] uppercase tracking-widest text-gray-400 font-semibold mb-1.5">Activity</p>
                  <div className="space-y-1.5">
                    {selectedDetail.activity.map((a, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <div className={`h-3 w-3 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${a.type === "call" ? "bg-indigo-100" : a.type === "note" ? "bg-amber-100" : "bg-emerald-100"}`}>
                          <span className="text-[6px]">{a.type === "call" ? "📞" : a.type === "note" ? "📝" : "📍"}</span>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-700 leading-tight">{a.text}</p>
                          <p className="text-[7px] text-gray-400 mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    ))}
                    {!noteAdded ? (
                      <button type="button" onClick={() => setNoteAdded(true)}
                        className="w-full mt-1 text-[8px] font-semibold rounded-lg py-1.5 text-white hover:opacity-90 transition"
                        style={{ background: "#4f46e5" }}>+ Add note</button>
                    ) : (
                      <div className="flex items-start gap-1.5 mt-1">
                        <div className="h-3 w-3 rounded-full bg-indigo-100 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <span className="text-[6px]">📝</span>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-700 leading-tight">Note saved to lead record</p>
                          <p className="text-[7px] text-gray-400 mt-0.5">Just now</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Satellite cards */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "New lead assigned", detail: "Adaeze O. → Tunde A. · Lekki Ph 1", time: "just now", r: "-0.5deg", color: "#4f46e5" },
          { label: "Site visit confirmed", detail: "Fatima S. · Maitama · Saturday 14 June", time: "8m ago", r: "0.3deg", color: "#059669" },
          { label: "Offer accepted", detail: "Chidi I. · Duplex Ajah · ₦68M", time: "1hr ago", r: "0.7deg", color: "#d97706" },
        ].map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 + i * 0.08 }}
            className="rounded-xl p-2.5" style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.10)", transform: `rotate(${c.r})`, fontFamily: "ui-monospace,monospace" }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
              <span className="text-[8px] text-gray-400">{c.time}</span>
            </div>
            <p className="text-[9px] font-semibold text-gray-800">{c.label}</p>
            <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">{c.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Follow-up reminder card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.55 }}
        className="mt-2 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 4px 16px rgba(0,0,0,0.18),0 1px 4px rgba(0,0,0,0.08)", transform: "rotate(-0.3deg)", fontFamily: "ui-monospace,monospace" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Follow-up reminders — Today</p>
            <div className="flex gap-4 text-[9px]">
              <span><span className="font-bold text-indigo-600">4</span> due today</span>
              <span><span className="font-bold text-amber-600">2</span> overdue</span>
              <span><span className="font-bold text-gray-500">8</span> tomorrow</span>
            </div>
          </div>
          <span className="text-[8px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">Auto-assigned by pipeline stage</span>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEMO 2 — STAFFHUB: Hotel Staff Management System
// Shift roster + leave approval + payroll summary
// ═══════════════════════════════════════════════════════════════
function StaffHubDemo() {
  const [leaveApproved, setLeaveApproved] = useState(false);
  const [activeView, setActiveView] = useState<"roster" | "payroll">("roster");

  const totalStaff   = useCounter(84,   900, 400);
  const onShift      = useCounter(31,   700, 500);
  const leaveToday   = useCounter(4,    400, 600);
  const hoursThisWk  = useCounter(312,  1000, 700);

  const shifts = [
    { dept: "Front Desk",   morning: ["Aisha M.", "Kola B."],   evening: ["Ngozi A."],      night: [] },
    { dept: "Housekeeping", morning: ["Tunde O.", "Bola S."],   evening: ["Emeka N.","Ada C."], night: ["Sola T."] },
    { dept: "Restaurant",   morning: ["Chidi A.", "Fatima B."], evening: ["Seun O."],       night: [] },
    { dept: "Security",     morning: ["James K."],              evening: ["Ola P."],         night: ["Musa D."] },
  ];

  const leaveRequests = [
    { name: "Ngozi Adeyemi", dept: "Front Desk", dates: "14–16 Jun", type: "Annual leave", status: "pending" },
    { name: "Emeka Nwosu",   dept: "Housekeeping", dates: "20 Jun",  type: "Sick leave",   status: "pending" },
  ];

  const payrollRows = [
    { dept: "Front Desk",   headcount: 12, hoursLogged: 487, overtimeHrs: 24, basePayroll: "₦1.44M" },
    { dept: "Housekeeping", headcount: 28, hoursLogged: 1092, overtimeHrs: 67, basePayroll: "₦2.80M" },
    { dept: "Restaurant",   headcount: 18, hoursLogged: 701, overtimeHrs: 31, basePayroll: "₦1.62M" },
    { dept: "Security",     headcount: 14, hoursLogged: 588, overtimeHrs: 84, basePayroll: "₦1.12M" },
  ];

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden p-5 md:p-7"
      style={{ background: CASE_THEMES.staffhub.stageBg, boxShadow: "0 40px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: CASE_THEMES.staffhub.glow }} />

      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md flex items-center justify-center" style={{ background: "rgba(190,24,93,0.25)", border: "1px solid rgba(190,24,93,0.4)" }}>
            <span className="text-pink-400 text-[9px] font-bold">SH</span>
          </div>
          <span className="text-white/50 text-[11px] font-medium">StaffHub · HR & Scheduling</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
          <span className="text-pink-400/60 text-[10px]">84 staff · 3 properties</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.28)" }}>
        <DemoChrome url="staffhub.internal / shifts" badge="This week" />
        <div className="flex bg-white" style={{ height: 290, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
          {/* Sidebar */}
          <div className="w-28 flex flex-col p-3 gap-0.5 flex-shrink-0 border-r border-black/[0.06]"
            style={{ background: "linear-gradient(180deg,#2d0520 0%,#38072a 100%)" }}>
            <div className="mb-4">
              <p className="text-white/80 text-[10px] font-semibold mb-0.5">StaffHub</p>
              <p className="text-white/25 text-[8px]">HR Manager</p>
            </div>
            {[
              { id: "roster", label: "Roster" },
              { id: "payroll", label: "Payroll", badge: true },
              { id: "leave", label: "Leave", badge: true },
              { id: "reports", label: "Reports" },
            ].map(item => (
              <button key={item.id} type="button"
                onClick={() => (item.id === "roster" || item.id === "payroll") && setActiveView(item.id as "roster" | "payroll")}
                className="text-left px-2.5 py-1.5 rounded-lg text-[9px] flex items-center justify-between transition"
                style={{ background: activeView === item.id ? "rgba(190,24,93,0.18)" : "transparent", color: activeView === item.id ? "#f9a8d4" : "rgba(255,255,255,0.35)" }}>
                <span>{item.label}</span>
                {item.badge && <span className="text-[7px] bg-pink-500 text-white rounded-full px-1.5 leading-4">!</span>}
              </button>
            ))}
            <div className="mt-auto pt-3 border-t border-white/[0.07]">
              {["Grand Hotel","Suites East","Pool Villa"].map(p => (
                <div key={p} className="flex items-center gap-1.5 py-0.5">
                  <span className="h-1 w-1 rounded-full bg-pink-400/50" />
                  <span className="text-[8px] text-white/25">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
            {/* KPIs */}
            <div className="grid grid-cols-4 divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
              {[
                { label: "Total Staff",   value: totalStaff,  suffix: "", delta: "across 3 properties", warn: false },
                { label: "On Shift Now",  value: onShift,     suffix: "", delta: "across all depts",    warn: false },
                { label: "On Leave Today",value: leaveToday,  suffix: "", delta: "approved absences",   warn: false },
                { label: "Hours This Wk", value: hoursThisWk, suffix: "", delta: "logged so far",       warn: false },
              ].map(s => (
                <div key={s.label} className="px-3 py-3">
                  <p className="text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-gray-900 leading-none">{s.value.toLocaleString()}{s.suffix}</p>
                  <p className="text-[8px] mt-1 text-gray-400">{s.delta}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 overflow-auto p-3">
              {activeView === "roster" ? (
                <>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Shift Roster — Today</p>
                  <table className="w-full">
                    <thead><tr className="text-[7px] text-gray-400 uppercase tracking-wider">
                      <th className="text-left pb-1.5 font-medium">Dept</th>
                      <th className="text-left pb-1.5 font-medium">Morning</th>
                      <th className="text-left pb-1.5 font-medium">Evening</th>
                      <th className="text-left pb-1.5 font-medium">Night</th>
                    </tr></thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {shifts.map(row => (
                        <tr key={row.dept}>
                          <td className="py-1.5 text-[9px] font-semibold text-gray-700">{row.dept}</td>
                          <td className="py-1.5">
                            <div className="flex flex-wrap gap-0.5">
                              {row.morning.map(n => (
                                <span key={n} className="text-[7px] bg-pink-50 text-pink-700 border border-pink-200 px-1.5 py-0.5 rounded-full">{n}</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-1.5">
                            <div className="flex flex-wrap gap-0.5">
                              {row.evening.map(n => (
                                <span key={n} className="text-[7px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded-full">{n}</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-1.5">
                            <div className="flex flex-wrap gap-0.5">
                              {row.night.length > 0 ? row.night.map(n => (
                                <span key={n} className="text-[7px] bg-gray-100 text-gray-600 border border-gray-200 px-1.5 py-0.5 rounded-full">{n}</span>
                              )) : <span className="text-[7px] text-gray-300">—</span>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Leave requests */}
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mt-3 mb-1.5">Pending Leave Requests</p>
                  <div className="space-y-1.5">
                    {leaveRequests.map(req => (
                      <div key={req.name} className="bg-white rounded-xl border border-black/[0.07] px-3 py-2 flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-[9px] font-semibold text-gray-800">{req.name} <span className="font-normal text-gray-400">· {req.dept}</span></p>
                          <p className="text-[8px] text-gray-500">{req.type} · {req.dates}</p>
                        </div>
                        {!leaveApproved ? (
                          <button type="button" onClick={() => setLeaveApproved(true)}
                            className="text-[8px] font-bold px-2.5 py-1 rounded-lg text-white hover:opacity-90 transition"
                            style={{ background: "#be185d" }}>Approve</button>
                        ) : (
                          <span className="text-[8px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Approved</span>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Payroll Summary — This Month</p>
                  <table className="w-full">
                    <thead><tr className="text-[7px] text-gray-400 uppercase tracking-wider">
                      <th className="text-left pb-1.5 font-medium">Dept</th>
                      <th className="text-left pb-1.5 font-medium">Staff</th>
                      <th className="text-left pb-1.5 font-medium">Hours</th>
                      <th className="text-left pb-1.5 font-medium">OT Hrs</th>
                      <th className="text-left pb-1.5 font-medium">Payroll</th>
                    </tr></thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {payrollRows.map(r => (
                        <tr key={r.dept}>
                          <td className="py-1.5 text-[9px] font-semibold text-gray-700">{r.dept}</td>
                          <td className="py-1.5 text-[9px] text-gray-500">{r.headcount}</td>
                          <td className="py-1.5 text-[9px] text-gray-500">{r.hoursLogged}</td>
                          <td className="py-1.5 text-[9px] text-amber-600 font-semibold">{r.overtimeHrs}</td>
                          <td className="py-1.5 text-[9px] font-bold text-gray-800">{r.basePayroll}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-black/[0.08]">
                        <td className="pt-1.5 text-[9px] font-bold text-gray-900" colSpan={4}>Total payroll this month</td>
                        <td className="pt-1.5 text-[9px] font-bold text-pink-700">₦6.98M</td>
                      </tr>
                    </tfoot>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Satellite cards */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "Shift gap flagged", detail: "Front Desk · Evening · Wed 18 Jun — no cover", r: "-0.5deg", color: "#dc2626" },
          { label: "Late clock-in", detail: "Tunde Okafor · Housekeeping · 14 mins late", r: "0.3deg", color: "#d97706" },
          { label: "Overtime alert", detail: "Security dept — 84 OT hours this month", r: "0.7deg", color: "#be185d" },
        ].map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 + i * 0.08 }}
            className="rounded-xl p-2.5" style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.10)", transform: `rotate(${c.r})`, fontFamily: "ui-monospace,monospace" }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
              <span className="text-[8px] text-gray-400">Alert</span>
            </div>
            <p className="text-[9px] font-semibold text-gray-800">{c.label}</p>
            <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">{c.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Weekly roster summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.55 }}
        className="mt-2 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 4px 16px rgba(0,0,0,0.18),0 1px 4px rgba(0,0,0,0.08)", transform: "rotate(-0.3deg)", fontFamily: "ui-monospace,monospace" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Weekly roster published</p>
            <p className="text-[9px] text-gray-700">Week of 9–15 Jun · 84 staff · All shifts covered · 2 pending approvals</p>
          </div>
          <span className="text-[8px] font-bold text-pink-600 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-lg ml-4 flex-shrink-0">Auto-notified via SMS</span>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DEMO 3 — SERVICEDESK: Facilities Ticketing & Client Portal
// Ticket board + SLA timer + client portal view
// ═══════════════════════════════════════════════════════════════
function ServiceDeskDemo() {
  const [escalated, setEscalated] = useState(false);
  const [activeView, setActiveView] = useState<"board" | "client">("board");
  const [slaSeconds, setSlaSeconds] = useState(7240);

  const openTickets   = useCounter(28,  800, 400);
  const resolvedToday = useCounter(14,  700, 500);
  const avgResolution = useCounter(6,   500, 600);
  const slaBreaches   = useCounter(2,   400, 700);

  useEffect(() => {
    const id = setInterval(() => setSlaSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);

  const formatSLA = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const columns = [
    {
      name: "Open", color: "#e0e7ff", textColor: "#3730a3",
      tickets: [
        { id: "TK-441", title: "AC not cooling — Suite 204", client: "Greenfield Towers", priority: "high", sla: "2h 14m" },
        { id: "TK-442", title: "Lobby light fitting broken", client: "Marina Court", priority: "medium", sla: "8h 30m" },
      ],
    },
    {
      name: "Assigned", color: "#fce7f3", textColor: "#9d174d",
      tickets: [
        { id: "TK-438", title: "Lift service overdue", client: "Greenfield Towers", priority: "high", sla: formatSLA(slaSeconds) },
        { id: "TK-440", title: "Plumbing leak — 3rd floor", client: "Palm Estate", priority: "high", sla: "4h 00m" },
      ],
    },
    {
      name: "In Progress", color: "#fef3c7", textColor: "#92400e",
      tickets: [
        { id: "TK-435", title: "Generator service", client: "Marina Court", priority: "medium", sla: "12h 00m" },
      ],
    },
    {
      name: "Resolved", color: "#d1fae5", textColor: "#065f46",
      tickets: [
        { id: "TK-431", title: "Water pump replaced", client: "Palm Estate", priority: "low", sla: "Done" },
        { id: "TK-433", title: "CCTV reinstalled", client: "Greenfield Towers", priority: "medium", sla: "Done" },
      ],
    },
  ];

  const clientTickets = [
    { id: "TK-441", title: "AC not cooling — Suite 204", status: "Open", priority: "High", submitted: "Today 08:14", update: "Technician assigned — en route" },
    { id: "TK-438", title: "Lift service overdue", status: "In Progress", priority: "High", submitted: "Yesterday", update: "Service engineer on site, ETA 2hrs" },
    { id: "TK-431", title: "Water pump replaced", status: "Resolved", priority: "Low", submitted: "3 days ago", update: "Resolved. Pump replaced and tested." },
  ];

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden p-5 md:p-7"
      style={{ background: CASE_THEMES.servicedesk.stageBg, boxShadow: "0 40px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: CASE_THEMES.servicedesk.glow }} />

      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md flex items-center justify-center" style={{ background: "rgba(180,83,9,0.25)", border: "1px solid rgba(180,83,9,0.4)" }}>
            <span className="text-amber-400 text-[9px] font-bold">SD</span>
          </div>
          <span className="text-white/50 text-[11px] font-medium">ServiceDesk · Facilities Management</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400/60 text-[10px]">28 open tickets</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.28)" }}>
        <DemoChrome url="servicedesk.internal / tickets" badge={activeView === "board" ? "Ops view" : "Client portal"} />
        <div className="flex bg-white" style={{ height: 290, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
          {/* Sidebar */}
          <div className="w-28 flex flex-col p-3 gap-0.5 flex-shrink-0 border-r border-black/[0.06]"
            style={{ background: "linear-gradient(180deg,#1c0e00 0%,#231200 100%)" }}>
            <div className="mb-4">
              <p className="text-white/80 text-[10px] font-semibold mb-0.5">ServiceDesk</p>
              <p className="text-white/25 text-[8px]">Operations</p>
            </div>
            {[
              { id: "board", label: "Ticket Board", badge: "2" },
              { id: "client", label: "Client Portal" },
              { id: "vendors", label: "Vendors" },
              { id: "reports", label: "Reports" },
            ].map(item => (
              <button key={item.id} type="button"
                onClick={() => (item.id === "board" || item.id === "client") && setActiveView(item.id as "board" | "client")}
                className="text-left px-2.5 py-1.5 rounded-lg text-[9px] flex items-center justify-between transition"
                style={{ background: activeView === item.id ? "rgba(180,83,9,0.18)" : "transparent", color: activeView === item.id ? "#fbbf24" : "rgba(255,255,255,0.35)" }}>
                <span>{item.label}</span>
                {"badge" in item && item.badge && <span className="text-[7px] bg-red-500 text-white rounded-full px-1.5 leading-4">{item.badge}</span>}
              </button>
            ))}
            <div className="mt-auto pt-3 border-t border-white/[0.07]">
              {["Greenfield","Marina Ct","Palm Estate"].map(p => (
                <div key={p} className="flex items-center gap-1.5 py-0.5">
                  <span className="h-1 w-1 rounded-full bg-amber-400/50" />
                  <span className="text-[8px] text-white/25">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
            {/* KPIs */}
            <div className="grid grid-cols-4 divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
              {[
                { label: "Open Tickets",    value: openTickets,   suffix: "", delta: "across all clients",  warn: false },
                { label: "Resolved Today",  value: resolvedToday, suffix: "", delta: "this shift",          warn: false },
                { label: "Avg Resolution",  value: avgResolution, suffix: "h", delta: "last 30 days",      warn: false },
                { label: "SLA Breaches",    value: slaBreaches,   suffix: "", delta: "this week",           warn: true },
              ].map(s => (
                <div key={s.label} className="px-3 py-3">
                  <p className="text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className={`text-xl font-bold leading-none ${s.warn ? "text-red-600" : "text-gray-900"}`}>{s.value}{s.suffix}</p>
                  <p className={`text-[8px] mt-1 ${s.warn ? "text-red-400" : "text-gray-400"}`}>{s.delta}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 overflow-auto p-3">
              {activeView === "board" ? (
                <>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Ticket Board</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {columns.map(col => (
                      <div key={col.name} className="flex-shrink-0 w-36 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 mb-1 px-0.5">
                          <span className="text-[8px] font-semibold text-gray-500">{col.name}</span>
                          <span className="text-[7px] bg-gray-100 text-gray-500 rounded-full px-1.5 leading-4">{col.tickets.length}</span>
                        </div>
                        {col.tickets.map(tk => (
                          <div key={tk.id} className={`rounded-xl border px-2.5 py-2 ${tk.priority === "high" && col.name !== "Resolved" ? "border-red-100 bg-red-50/30" : "border-black/[0.07] bg-white"}`}
                            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[8px] font-mono text-gray-400">{tk.id}</span>
                              <span className={`text-[7px] px-1 py-0.5 rounded font-semibold ${tk.priority === "high" ? "bg-red-50 text-red-600" : tk.priority === "medium" ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-500"}`}>
                                {tk.priority}
                              </span>
                            </div>
                            <p className="text-[8px] font-medium text-gray-800 leading-tight">{tk.title}</p>
                            <p className="text-[7px] text-gray-400 mt-0.5">{tk.client}</p>
                            {col.name !== "Resolved" && (
                              <div className="mt-1.5 flex items-center gap-1">
                                <span className={`h-1.5 w-1.5 rounded-full ${tk.id === "TK-438" ? "bg-red-400 animate-pulse" : "bg-amber-400"}`} />
                                <span className={`text-[7px] font-semibold ${tk.id === "TK-438" ? "text-red-600" : "text-amber-700"}`}>SLA: {tk.sla}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Client Portal — Greenfield Towers</p>
                  <div className="space-y-1.5">
                    {clientTickets.map(tk => (
                      <div key={tk.id} className="bg-white rounded-xl border border-black/[0.07] px-3 py-2.5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                        <div className="flex items-start justify-between mb-1.5">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[8px] font-mono text-gray-400">{tk.id}</span>
                              <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-semibold border ${tk.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : tk.status === "In Progress" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>{tk.status}</span>
                            </div>
                            <p className="text-[9px] font-semibold text-gray-800 mt-0.5">{tk.title}</p>
                          </div>
                          <span className="text-[7px] text-gray-400 flex-shrink-0">{tk.submitted}</span>
                        </div>
                        <p className="text-[8px] text-gray-500 leading-relaxed">{tk.update}</p>
                      </div>
                    ))}
                    <p className="text-[8px] text-gray-400 text-center mt-1">Clients see live status without calling your team</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Satellite cards */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "SLA breach warning", detail: "TK-438 · Lift service · breaches in " + formatSLA(slaSeconds), color: "#dc2626", r: "-0.5deg" },
          { label: "Vendor dispatched", detail: "Kola Electricals → Marina Court · ETA 45m", color: "#b45309", r: "0.3deg" },
          { label: "Client self-served", detail: "Greenfield Towers checked TK-441 via portal", color: "#059669", r: "0.7deg" },
        ].map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 + i * 0.08 }}
            className="rounded-xl p-2.5" style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.10)", transform: `rotate(${c.r})`, fontFamily: "ui-monospace,monospace" }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
              <span className="text-[8px] text-gray-400">Live</span>
            </div>
            <p className="text-[9px] font-semibold text-gray-800">{c.label}</p>
            <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">{c.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Escalation card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.55 }}
        className="mt-2 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 4px 16px rgba(0,0,0,0.18),0 1px 4px rgba(0,0,0,0.08)", transform: "rotate(-0.3deg)", fontFamily: "ui-monospace,monospace" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">TK-438 · Lift service · SLA at risk</p>
            <p className="text-[9px] text-gray-700">Breaches in <span className="font-bold text-red-600">{formatSLA(slaSeconds)}</span> · Assigned to Ola Maintenance Ltd · Last update: 2hrs ago</p>
          </div>
          {!escalated ? (
            <button type="button" onClick={() => setEscalated(true)}
              className="flex-shrink-0 rounded-lg text-white text-[8px] font-bold px-3 py-1.5 hover:opacity-90 transition ml-4"
              style={{ background: "#b45309" }}>Escalate</button>
          ) : (
            <span className="flex-shrink-0 rounded-lg text-[8px] font-bold px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 ml-4">⚡ Escalated</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const rm = useReducedMotion();
  const fd = (d: number) => ({ duration: rm ? 0 : 0.7, ease, delay: d });
  return (
    <section className="relative px-6 pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/8 blur-3xl" />
        <div className="absolute top-48 -left-32 h-[380px] w-[380px] rounded-full bg-violet-400/6 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-[400px] w-[400px] rounded-full bg-purple-400/7 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0)}
          className="text-xs uppercase tracking-widest text-gray-400 mb-4">
          Services / Internal Tools &amp; CRM
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.06)}
          className="text-4xl md:text-[3.4rem] font-medium leading-[1.08] tracking-tight text-gray-900 max-w-4xl">
          Your team shouldn't adapt<br className="hidden md:block" />
          <span style={{ color: "#4f46e5" }}> to software that doesn't fit.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.12)}
          className="mt-5 text-gray-500 max-w-2xl leading-relaxed text-base md:text-lg">
          Generic CRMs and off-the-shelf tools were built for the average business. If your sales process, team structure, or client workflow is even slightly unique, they create friction instead of removing it. We build internal tools designed around exactly how your team works.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.18)}
          className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-80 transition">
            Start with a discovery call
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href="#case-studies"
            className="inline-flex items-center gap-2 rounded-xl border border-black/12 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-black/[0.03] transition">
            See what we've built
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fd(0.26)}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {[
            "Built for your exact workflow — not the average one",
            "Full source code ownership on every project",
            "Role-based access and permissions as standard",
            "3–8 week typical delivery",
          ].map(t => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="h-1 w-1 rounded-full bg-gray-300" />{t}
            </span>
          ))}
        </motion.div>
        {/* Explainer card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={fd(0.3)}
          className="mt-12 rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 md:p-8"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
          <div className="grid gap-8 md:grid-cols-[1fr,1px,1fr,1px,1fr]">
            <div>
              <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="#4f46e5" strokeWidth="1.25" />
                  <path d="M5 8h6M5 11h4" stroke="#4f46e5" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">What internal tools means</p>
              <p className="text-sm text-gray-500 leading-relaxed">Software built exclusively for your team's internal use — CRMs, dashboards, staff management systems, ticketing tools, and operations platforms designed around how your business actually runs.</p>
            </div>
            <div className="hidden md:block bg-black/6 self-stretch" />
            <div>
              <div className="h-8 w-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#d97706" strokeWidth="1.25" />
                  <path d="M8 5v4M8 11v.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">Why generic tools slow teams down</p>
              <p className="text-sm text-gray-500 leading-relaxed">HubSpot, Salesforce, and Zendesk are powerful — if your workflow matches theirs. When it doesn't, teams spend more time working around the tool than using it. Workarounds become permanent. Spreadsheets fill the gaps. Manual steps become habits.</p>
            </div>
            <div className="hidden md:block bg-black/6 self-stretch" />
            <div>
              <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3 3 7-6" stroke="#059669" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">What makes a custom tool worth it</p>
              <p className="text-sm text-gray-500 leading-relaxed">A custom internal tool does exactly what your team needs and nothing they don't. It fits your pipeline stages, your terminology, your approval flows, and your reporting requirements — because we designed it around your operation, not a generic template.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CAROUSEL — internal tool types
// ═══════════════════════════════════════════════════════════════
const WHAT_WE_BUILD = [
  { icon: "🗂️", title: "Custom CRM Systems", who: "Sales & service teams", desc: "Pipeline management, lead tracking, deal stages, activity logging, and follow-up reminders — built around your exact sales process, not a generic template.", example: "e.g. A real estate agency with custom pipeline stages, property matching, and automated site visit scheduling." },
  { icon: "👥", title: "Staff & HR Management", who: "Hospitality, retail & ops", desc: "Shift scheduling, attendance tracking, leave management, and payroll inputs — replacing WhatsApp rosters and paper leave forms with a single system.", example: "e.g. A hotel group managing 80+ staff across three properties with automated shift conflict detection." },
  { icon: "🎫", title: "Ticketing & Service Desks", who: "Facilities & support teams", desc: "Internal and client-facing ticketing systems with SLA tracking, vendor assignment, escalation workflows, and self-service client portals.", example: "e.g. A facilities management company tracking maintenance requests across 12 client properties." },
  { icon: "📋", title: "Project & Operations Dashboards", who: "Agencies & project businesses", desc: "Custom project tracking, task assignment, milestone management, and client reporting — built for how your team manages delivery, not how Jira thinks you should.", example: "e.g. A construction firm tracking materials, approvals, and site progress across 4 active projects." },
  { icon: "📦", title: "Inventory & Stock Management", who: "Retail, manufacturing & distribution", desc: "Multi-location stock tracking, low-stock alerts, purchase order workflows, and supplier management — connected to your sales and fulfilment systems.", example: "e.g. A distributor managing 400+ SKUs across two warehouses with automated reorder triggers." },
  { icon: "💰", title: "Quotation & Invoicing Tools", who: "Professional services", desc: "Custom quote builders, approval workflows, invoice generation, and payment tracking — replacing email threads and spreadsheet templates.", example: "e.g. An engineering firm generating site-specific quotes with automated approval routing to directors." },
  { icon: "📊", title: "Business Intelligence Dashboards", who: "Owner-managed businesses", desc: "Live reporting dashboards that pull from your POS, CRM, and operations tools — giving management a single real-time view of the whole business.", example: "e.g. A retail chain owner seeing revenue, stock, and staff metrics across 3 locations in one screen." },
  { icon: "🔐", title: "Client & Vendor Portals", who: "B2B service companies", desc: "Self-service portals where clients track orders, submit requests, download documents, and manage their account — reducing your team's inbound support load.", example: "e.g. A logistics company where clients track shipments and generate delivery reports without calling ops." },
];

function WhatWeBuildCarousel() {
  const [active, setActive] = useState(0);
  const total = WHAT_WE_BUILD.length;
  const prev = () => setActive(i => (i - 1 + total) % total);
  const next = () => setActive(i => (i + 1) % total);
  const visible = [
    WHAT_WE_BUILD[active % total],
    WHAT_WE_BUILD[(active + 1) % total],
    WHAT_WE_BUILD[(active + 2) % total],
  ];
  return (
    <section className="px-6 py-16 md:py-20 border-t border-black/[0.06]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Tool types</p>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 max-w-lg leading-snug">
              Not sure what kind of internal tool you need?
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">
              Here are eight types of internal tools we build. If any of these describe work your team is currently doing manually or through a tool that doesn't quite fit, we should talk.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button type="button" onClick={prev}
              className="h-9 w-9 rounded-xl border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition"
              aria-label="Previous">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-xs text-gray-400 font-mono w-12 text-center">{active + 1} / {total}</span>
            <button type="button" onClick={next}
              className="h-9 w-9 rounded-xl border border-black/10 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition"
              aria-label="Next">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visible.map((item, i) => (
            <motion.div key={`${active}-${i}`}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.32, ease, delay: i * 0.05 }}
              className={`rounded-2xl border border-black/10 bg-white p-5 flex flex-col ${i > 0 ? "hidden md:flex" : ""}`}
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 border border-black/10 rounded-full px-2.5 py-1">
                  {item.who}
                </span>
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
            <button key={i} type="button" onClick={() => setActive(i)}
              className={`transition-all duration-200 rounded-full ${i === active ? "h-1.5 w-5 bg-black" : "h-1.5 w-1.5 bg-black/20"}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-600 max-w-xl">
            If your team has a process that involves copying between tools, maintaining a spreadsheet, or sending information over WhatsApp — that's a candidate for a custom internal tool. We've built for all of the above.
          </p>
          <Link href="/contact"
            className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:opacity-80 transition whitespace-nowrap">
            Describe your process
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CASE STUDY DATA
// ═══════════════════════════════════════════════════════════════
const CASES = [
  {
    id: "pipelinedesk" as CaseId,
    client: "Independent Property Agency · 8 agents · residential & commercial sales",
    industry: "Real Estate", scope: "Custom CRM · Pipeline Management · Lead Tracking · Activity Logging",
    headline: "How we built a CRM that actually understands property sales — after HubSpot proved it doesn't.",
    subheadline: "This agency had paid for HubSpot for 14 months. Agents used it for two. The pipeline stages didn't match how property is sold. The workarounds became permanent. We removed them.",
    why: {
      title: "HubSpot was built for SaaS. Property sales work nothing like SaaS.",
      body: "This agency — 8 agents, residential and commercial listings, leads coming from portals, referrals, social media, and walk-ins — had tried HubSpot after a consultant recommended it. The problem was structural. HubSpot's data model has Contacts, Companies, and Deals. Property sales have Leads, Listings, Site Visits, Offers, and Negotiations. There is no native concept of a property listing in HubSpot. There is no way to put a unit 'on hold' while a negotiation is active, or flag it 'sold' the moment a deal closes so another agent doesn't inadvertently show it. Every agent who tried to make HubSpot work ended up maintaining a personal spreadsheet alongside it. The CRM became a compliance exercise, not a tool.",
    },
    how: {
      title: "We modelled the system around the property transaction, not the generic deal",
      body: "In discovery we mapped every stage of the agency's actual sales process: enquiry → viewing qualification → site visit scheduled → negotiation → offer made → accepted → completed. Each stage had specific information that only made sense at that moment — site visit preferences, counter-offer amounts, completion timelines, solicitor details. We designed each stage as a structured form that captured exactly what was needed and nothing else. The system introduced a native concept of a 'listing' — a property with its own record, availability status, and linked leads. An agent marking a unit 'under offer' automatically updates the listing status across the system. No other agent can see it as available. This is the feature HubSpot's community forum has been requesting for years.",
    },
    insight: "Every property agency using HubSpot or Salesforce has a spreadsheet running alongside it. That spreadsheet is not a failure of discipline — it is evidence that the CRM doesn't model how property is actually sold. The custom system didn't replace their process. It finally reflected it.",
    modules: [
      { name: "Property-Linked Pipeline", problem: "Leads in HubSpot couldn't be linked to specific property listings. Agents kept separate notes on which properties each lead had viewed.", built: "A pipeline board where each lead card is linked to one or more properties, with property details, listing price, and availability surfaced directly on the card.", impact: "Agents see the full picture of each lead — which properties they've viewed, which they've shown interest in, and what's still available — without switching systems." },
      { name: "Structured Stage Forms", problem: "Moving a lead to 'Site Visit Booked' in HubSpot was just changing a label. No information was captured about when the visit was, who was attending, or what the outcome was.", built: "Each stage transition triggers a structured form: booking a site visit captures date, time, property, and agent; recording a negotiation captures the offer, counter-offer, and decision.", impact: "Every stage transition produces a record. Pipeline health reporting is based on structured data, not whatever agents remembered to type into a notes field." },
      { name: "Automated Follow-Up Reminders", problem: "Follow-up reminders in HubSpot fired on fixed schedules. A lead who had just done a site visit got the same reminder cadence as a cold enquiry from three weeks ago.", built: "Stage-aware follow-up logic: the reminder schedule and content changes based on which stage the lead is at and how long they've been there. Overdue leads surface automatically.", impact: "Agents spend follow-up time on leads that need attention — not on calls that a system reminder triggered at an arbitrary interval." },
      { name: "Agent Performance Dashboard", problem: "Management had no reliable view of which agents had the most active leads, the highest conversion rates, or the longest time-in-stage — because the data wasn't being maintained.", built: "An agent performance dashboard pulling from the structured pipeline data: leads per agent, stage distribution, average time to close, and conversion rate by source.", impact: "Management reviews are based on real pipeline data — not anecdotes from the weekly meeting." },
      { name: "WhatsApp Enquiry Capture", problem: "Most new enquiries came via WhatsApp. Agents would have the conversation, then — if they remembered — manually create a lead in the CRM. Many leads were never logged.", built: "A quick-capture flow where agents log a WhatsApp enquiry in under 30 seconds: name, phone, property interest, and budget. The lead is created and assigned immediately.", impact: "Lead capture rate from WhatsApp increased significantly. New enquiries are in the system before the conversation ends." },
    ],
    timeline: [
      { week: "Week 1", title: "Discovery & process mapping", items: ["Shadowed agents through the full sales lifecycle", "Mapped every stage and the information relevant to it", "Identified the property-lead relationship as the core design problem", "Fixed scope and timeline agreed"] },
      { week: "Week 2", title: "Design & prototype", items: ["Pipeline board and all stage forms designed", "Property database structure and lead linking mapped", "Follow-up logic and reminder rules designed", "All screens approved by agency owner and lead agent before build"] },
      { week: "Weeks 3–4", title: "Build & agent onboarding", items: ["Core pipeline and lead management built first", "Stage forms and property linking built and tested", "One-agent pilot for three days — feedback incorporated", "Full team onboarded with a single two-hour session"] },
    ],
    outcomes: [
      { value: "100%", label: "Of pipeline stages now produce structured, queryable data", why: "Stage transitions require structured input — the system captures the right information at the right moment without relying on agents to remember to log it." },
      { value: "Zero", label: "Shadow spreadsheets maintained by the team post-launch", why: "The CRM now models how they actually sell. Workarounds stopped because the workarounds were no longer necessary." },
      { value: "3×", label: "More complete lead records compared to HubSpot period", why: "Structured forms at every stage capture the information that matters — not a blank notes field that agents fill inconsistently." },
      { value: "4 wks", label: "From kickoff to full team on the system", why: "Tight scope from discovery, one-agent pilot week, then full team rollout." },
    ],
    before: ["Leads tracked across Excel, WhatsApp, and individual notebooks", "HubSpot pipeline stages didn't match the property sales process", "No link between leads and specific property listings", "Follow-up reminders fired regardless of lead stage or activity", "Management couldn't see true pipeline health — data was incomplete"],
    after: ["Single pipeline board linked to property listings and structured data", "Every stage transition captures the information relevant to that stage", "Follow-up reminders are stage-aware and activity-triggered", "Agent performance dashboard based on real structured pipeline data", "WhatsApp enquiries captured in the system before the conversation ends"],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Role-Based Auth", "Resend", "Vercel"],
    duration: "4 weeks",
    DemoComponent: PipelineDeskDemo,
    demoCaption: "Sales CRM — click any lead card to open the detail panel. Tap 'Add note' to see activity logging in action.",
  },
  {
    id: "staffhub" as CaseId,
    client: "Independent Hotel Group · 3 properties · 80+ staff · food & beverage, housekeeping, front desk, security",
    industry: "Hospitality", scope: "Staff Scheduling · Shift Management · Leave Approval · Payroll Inputs",
    headline: "How we cut a hotel group's weekly roster preparation from two days to two hours — and eliminated WhatsApp as a business-critical system.",
    subheadline: "The HR manager had tried Deputy and 7Shifts. Both were built for restaurant chains. Neither understood a hotel with four departments, three properties, and rotating staff between them.",
    why: {
      title: "Generic scheduling tools were built for restaurants, not hotels",
      body: "This independent hotel group — three properties, 84 staff, departments running 24-hour rotations — had invested in two off-the-shelf scheduling tools before calling us. Deputy handled single-location restaurants well. 7Shifts was faster to set up. Neither had a concept of a staff member who works front desk on Mondays and covers the pool villa on Thursdays. Neither could handle leave requests that update availability across all three properties simultaneously. Neither generated payroll inputs in a format their accounts team could use without reformatting. The HR manager ended up running both tools in parallel with an Excel roster and a WhatsApp broadcast group — four systems doing the job that one should. She was spending two days every week on scheduling alone.",
    },
    how: {
      title: "We built the roster as the core data structure — everything else derives from it",
      body: "The insight from discovery was specific: every HR problem this group had — leave tracking, overtime alerts, payroll inputs — was downstream of the roster. If the roster was accurate and live, every other piece of data could be derived from it automatically. We built the system roster-first. Staff are attached to departments and properties, not fixed to one location. When a leave request is approved, availability updates instantly. When a staff member clocks in against their scheduled shift, the attendance record writes itself. At month-end, the payroll team receives a report, not a spreadsheet they have to build.",
    },
    insight: "The HR manager wasn't inefficient. She was running four systems simultaneously because no single tool understood what a multi-property hotel operation actually looks like. The right system doesn't speed up the old process — it makes most of the old process unnecessary.",
    modules: [
      { name: "Shift Roster Builder", problem: "Rosters were built manually in Excel, took up to two days per week, and had to be reformatted, photographed, and sent via WhatsApp for staff to see their schedules.", built: "A roster builder that displays the full week's shifts by department and property. Shifts are created, assigned, and published in one interface. Staff are notified by SMS when their roster is published.", impact: "Roster preparation time dropped from two days to under two hours. Staff receive their schedules automatically — no WhatsApp distribution needed." },
      { name: "Conflict Detection", problem: "When a staff member was accidentally scheduled for two overlapping shifts or scheduled on a day they had approved leave, this wasn't discovered until the shift was missed.", built: "Automatic conflict detection that flags double-bookings, leave clashes, and consecutive-shift violations before the roster is published.", impact: "Shift gaps and conflicts are caught during planning — not when a position is unmanned at 6am." },
      { name: "Leave Request & Approval Workflow", problem: "Leave requests arrived via text to the HR manager's personal phone. There was no formal record of what had been approved, when, or how much leave each staff member had remaining.", built: "Staff submit leave requests through the system. The HR manager reviews and approves or declines with one action. Approved leave automatically updates the staff member's availability in the roster.", impact: "Every leave request has a formal record. Leave balances are calculated automatically from approved requests. The HR manager's personal phone is no longer a business system." },
      { name: "Clock-In & Attendance Tracking", problem: "Attendance was tracked on paper sign-in sheets that had to be manually compiled for payroll. Late arrivals and no-shows were discovered only when staff physically didn't appear.", built: "A simple clock-in interface for staff — accessible by phone — that records arrival time against their scheduled shift. Lates and absences surface automatically in the dashboard.", impact: "Attendance data flows directly into payroll inputs. The manual compilation step is removed." },
      { name: "Payroll Input Reports", problem: "Payroll was prepared by the accounts team by manually collating hours from three property spreadsheets, adjusting for overtime, and cross-referencing leave. The process took the better part of a day.", built: "Automated payroll input reports generated from attendance data: hours logged per staff member, overtime hours, approved leave days, and total payroll by department — ready for the accounts team on the first of each month.", impact: "Payroll input preparation reduced from a full-day manual exercise to a report review." },
    ],
    timeline: [
      { week: "Week 1", title: "Discovery & roster logic mapping", items: ["Mapped all shift patterns across 4 departments and 3 properties", "Documented leave types, approval rules, and overtime thresholds", "Identified roster as the central data structure", "Fixed scope and timeline agreed"] },
      { week: "Week 2", title: "Architecture & interface design", items: ["Roster builder interface and shift model designed", "Leave request workflow and availability logic mapped", "Clock-in interface designed for mobile use by staff", "All interfaces approved before development"] },
      { week: "Weeks 3–5", title: "Build, test & phased rollout", items: ["Roster builder built and tested with real shift data", "Leave system connected to roster availability", "Clock-in interface tested by 10 staff across two properties", "Full rollout with HR manager training and staff SMS notification setup"] },
    ],
    outcomes: [
      { value: "2 days → 2 hrs", label: "Weekly roster preparation time — same output, 10× faster", why: "The roster builder holds all the information the HR manager was previously gathering from multiple sources. The inputs are already in the system." },
      { value: "Zero", label: "Leave requests received via personal WhatsApp or text post-launch", why: "The formal leave request flow is where staff submit requests. The HR manager's personal phone is no longer a business channel." },
      { value: "Automatic", label: "Payroll inputs generated — no manual compilation required", why: "Clock-in data against assigned shifts generates the payroll figures directly. The accounts team receives a report, not a spreadsheet to build." },
      { value: "5 wks", label: "From discovery to all 84 staff on the system", why: "Phased rollout by property — main hotel first, then suites and villa — with SMS notifications to staff at each stage." },
    ],
    before: ["Weekly roster built in Excel — 2 days of HR manager time per week", "Leave requests sent via text to HR manager's personal phone", "No formal leave balance tracking — approximated from memory", "Attendance tracked on paper sign-in sheets", "Payroll inputs compiled manually from three property spreadsheets"],
    after: ["Roster built and published in the system — under 2 hours per week", "Leave requests submitted, approved, and recorded in-system", "Leave balances calculated automatically from approved requests", "Clock-in records attendance against scheduled shifts", "Payroll input report auto-generated on the 1st of each month"],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Twilio SMS", "Role-Based Auth", "Vercel"],
    duration: "5 weeks",
    DemoComponent: StaffHubDemo,
    demoCaption: "HR system — tab between Roster (shift assignments + leave approvals) and Payroll (department summary). Tap Approve on a leave request.",
  },
  {
    id: "servicedesk" as CaseId,
    client: "Facilities Management Company · 12 client properties · 3 ops staff · mixed commercial and residential",
    industry: "Facilities Management", scope: "Ticket Management · SLA Tracking · Vendor Assignment · Client Portal",
    headline: "How we gave a facilities management company the ticketing system they needed — without paying for 80% of ServiceNow they would never use.",
    subheadline: "They had budgeted for ServiceNow. The implementation quote was $40,000 before a single ticket was raised. Zendesk was cheaper but built for customer support, not property maintenance. We built exactly what they needed.",
    why: {
      title: "ServiceNow was built for enterprise IT departments — not 3-person ops teams managing buildings",
      body: "This facilities company managed maintenance across 12 commercial and residential properties for long-term corporate clients. They had SLA commitments in signed contracts. They had vendors to coordinate, client expectations to manage, and an operations team of three people handling everything from lift servicing to HVAC repairs. They needed a ticketing system with SLA tracking, vendor assignment, and a client-facing portal. The enterprise quote for ServiceNow was $40,000 in implementation fees alone, before licensing. Zendesk was cheaper but was designed for customer support teams, not building operations — there was no native concept of a property, a vendor, or a maintenance SLA. Freshdesk had the same problem. Every tool they evaluated required them to contort their operation to fit the software's assumptions.",
    },
    how: {
      title: "We introduced the ticket as the unit of accountability — and built everything around it",
      body: "In discovery we found that the company's core problem was not software — it was accountability structure. There was no formal definition of what 'handling a maintenance request' meant, end to end. Requests arrived by WhatsApp, email, and phone. Each was handled by whoever received it. There was no record that proved work had been done, by whom, when, or at what cost. We introduced the ticket as the single formal unit: every request creates one, every ticket has a named owner at every stage, every stage transition is timestamped. SLA timers run from the moment of creation. Clients have a self-service portal showing live ticket status — so they stop calling.",
    },
    insight: "Enterprise ticketing tools assume you have a dedicated system administrator, a six-month implementation window, and a budget that starts at five figures. This company needed a ticketing system in six weeks for a team of three. The gap between what they needed and what the market offered was exactly the space a custom build fills.",
    modules: [
      { name: "Unified Ticket Intake", problem: "Requests arrived via WhatsApp, email, and phone call — each handled by whoever received it, with no central log of what had been raised.", built: "A single intake system where all new requests are created as tickets — either by the client via the portal, by the operations team logging a phone or email request, or via an email parsing integration.", impact: "Every maintenance request has a ticket. Nothing is handled informally and then forgotten. The central log is complete." },
      { name: "SLA Timer & Escalation", problem: "SLA commitments to clients were tracked in the operations manager's head. Breaches were discovered when clients called to complain — not before.", built: "SLA timers that start when a ticket is created and display a countdown in the ticket view. A warning fires at 75% of the SLA window. Tickets approaching breach are surfaced in the dashboard. Persistent inaction triggers an automatic escalation.", impact: "SLA breaches dropped significantly in the first month. The operations team acts on warnings, not on client complaints." },
      { name: "Vendor Assignment & Job Briefs", problem: "Vendors were assigned to jobs via WhatsApp message. There was no formal job brief, no record of who had been assigned, and no way to track whether they had actually shown up.", built: "Ticket assignment to a vendor generates a formal job brief by email or WhatsApp: property address, issue description, contact person, and SLA deadline. The vendor acknowledges receipt in the system.", impact: "Every vendor assignment is documented. Disputes about whether a vendor was briefed, when they were briefed, and what they were told are resolved from the system record." },
      { name: "Client Self-Service Portal", problem: "Clients had no visibility into the status of their tickets without calling the operations team. Every status call consumed staff time that could have been spent on operations.", built: "A property-specific client portal where authorised client contacts can see every ticket for their property: status, assigned vendor, last update, and resolved date. New requests can be submitted directly.", impact: "Client inbound status calls dropped substantially. Clients who used the portal stopped calling for updates because they had real-time visibility." },
      { name: "Resolution Documentation", problem: "When work was completed, there was no formal record of what was done, by whom, when, and at what cost. Disputes about completed work could not be resolved.", built: "Work completion requires the operations team or vendor to log: work performed, time on site, materials used, and an optional photo. This creates a resolution record attached to the ticket.", impact: "Every resolved ticket has a documented history from intake to closure. The company can demonstrate to any client — at any time — exactly what was done for their property and when." },
    ],
    timeline: [
      { week: "Week 1", title: "Discovery & SLA mapping", items: ["Mapped every channel through which requests currently arrived", "Documented SLA commitments per client from signed contracts", "Designed the ticket pipeline and escalation rules", "Fixed scope agreed"] },
      { week: "Week 2", title: "Architecture & interface design", items: ["Ticket board and intake form designed", "SLA timer logic and escalation thresholds defined", "Client portal designed separately from operations view", "All interfaces approved before development"] },
      { week: "Weeks 3–5", title: "Build, testing & client onboarding", items: ["Core ticket system and SLA timers built first", "Vendor assignment and job brief email integration tested", "Client portal piloted with two properties before full rollout", "All 12 client properties onboarded with portal access"] },
    ],
    outcomes: [
      { value: "Zero", label: "Maintenance requests handled informally post-launch — every request has a ticket", why: "Intake flows for email, portal, and manually logged requests all create tickets. There is no longer an informal channel." },
      { value: "Before", label: "SLA warnings fire before breach — not after clients call", why: "The SLA timer and 75% warning give the operations team a window to act. The operations manager is no longer discovering breaches from complaints." },
      { value: "100%", label: "Of resolved tickets have a documented resolution record", why: "Completion requires logging what was done. A ticket cannot be closed without a resolution record." },
      { value: "5 wks", label: "From discovery to all 12 client properties live on the portal", why: "Phased client portal rollout — two properties as pilot, then full rollout with email invitations to authorised contacts." },
    ],
    before: ["Maintenance requests arrived via WhatsApp, email, and phone — no central log", "SLA tracking relied on the operations manager's memory", "Vendor assignments sent informally with no written brief", "Clients called for updates — no self-service status visibility", "Resolved work had no formal documentation"],
    after: ["Every request creates a ticket — regardless of how it arrived", "SLA timers warn the operations team before deadlines are breached", "Vendor job briefs generated formally on assignment with acknowledgement required", "Clients check ticket status via their property portal — without calling", "Every resolved ticket has a timestamped resolution record with work logged"],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Resend", "WhatsApp Business API", "Vercel"],
    duration: "5 weeks",
    DemoComponent: ServiceDeskDemo,
    demoCaption: "Facilities desk — tab between Ticket Board (ops view) and Client Portal (client view). Watch the SLA timer count down. Tap Escalate on TK-438.",
  },
] as const;

// ═══════════════════════════════════════════════════════════════
// SHARED SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════
function ModuleRow({ mod, accent }: { mod: { name: string; problem: string; built: string; impact: string }; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-black/[0.08] overflow-hidden">
      <button type="button" onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-4 py-3 gap-4 text-left" aria-expanded={open}>
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
          <span className="text-sm font-medium text-gray-900 truncate">{mod.name}</span>
        </div>
        <span className={`text-gray-400 text-sm transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease }} className="overflow-hidden">
            <div className="border-t border-black/[0.06] divide-y divide-black/[0.04]">
              {[
                { l: "The operational problem", t: mod.problem, c: "text-red-600/70" },
                { l: "What we built",           t: mod.built,   c: "text-gray-500"   },
                { l: "Business impact",         t: mod.impact,  c: "text-emerald-700"},
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
    <div>
      {weeks.map((w, i) => (
        <div key={w.week} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: accent }}>
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
            <ul className="space-y-1">
              {w.items.map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="mt-[5px] h-1 w-1 rounded-full flex-shrink-0" style={{ background: accent }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function BeforeAfter({ before, after }: { before: readonly string[]; after: readonly string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="rounded-xl border border-red-100 bg-red-50/40 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400 mb-3">Before</p>
        <ul className="space-y-2">
          {before.map(item => (
            <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-red-300 flex-shrink-0 text-[10px] font-bold mt-0.5">✕</span>{item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500 mb-3">After</p>
        <ul className="space-y-2">
          {after.map(item => (
            <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-emerald-400 flex-shrink-0 text-[10px] font-bold mt-0.5">✓</span>{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type TabId = "story" | "modules" | "delivery" | "results";
const TABS: { id: TabId; label: string }[] = [
  { id: "story",    label: "The story"    },
  { id: "modules",  label: "What we built"},
  { id: "delivery", label: "Delivery"     },
  { id: "results",  label: "Results"      },
];

function CaseCard({ study, isOpen, onToggle, index }: {
  study: typeof CASES[number]; isOpen: boolean; onToggle: () => void; index: number;
}) {
  const theme = CASE_THEMES[study.id];
  const rm = useReducedMotion();
  const [tab, setTab] = useState<TabId>("story");
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onToggle(); setTab("story");
    if (!isOpen) setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 90);
  };

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.5, ease, delay: index * 0.07 }}
      className="rounded-3xl border overflow-hidden bg-white transition-shadow duration-300"
      style={{
        borderColor: isOpen ? theme.accentBorder : "rgba(0,0,0,0.09)",
        boxShadow: isOpen ? "0 20px 60px rgba(0,0,0,0.09)" : "0 2px 10px rgba(0,0,0,0.05)",
      }}>

      {/* Collapsed header */}
      <button type="button" onClick={handleToggle} aria-expanded={isOpen} className="w-full text-left p-5 md:p-6">
        <div className="flex items-start gap-4 md:gap-6">
          {/* Editorial number */}
          <div className="flex-shrink-0 select-none leading-none font-bold tracking-tighter hidden sm:block"
            style={{
              fontSize: "clamp(3rem,6vw,4.5rem)",
              color: isOpen ? theme.accent : "transparent",
              WebkitTextStroke: isOpen ? "0px" : `1.5px ${theme.accentBorder}`,
              transition: "color 0.3s ease, -webkit-text-stroke 0.3s ease",
              marginTop: "-4px", lineHeight: 1,
            }}
            aria-hidden="true">
            {theme.number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: theme.accentLight, color: theme.accentText }}>
                  {theme.label}
                </span>
                <p className="text-[9px] text-gray-400 mt-1.5">
                  {study.client} · {study.industry} · {study.scope}
                </p>
              </div>
              <div className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
                style={{ background: isOpen ? theme.accentLight : "rgba(0,0,0,0.05)", color: isOpen ? theme.accent : "#9ca3af" }}
                aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
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

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="exp"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease }}
            className="overflow-hidden">
            {/* Demo band */}
            <div className="border-t border-black/[0.06]" style={{ background: theme.accentLight }}>
              <div className="px-5 md:px-8 py-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: theme.accentText }}>
                  System demo — {study.demoCaption}
                </p>
                <study.DemoComponent />
              </div>
            </div>

            {/* Tab nav */}
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
                    {/* Insight callout */}
                    <div className="mb-5 rounded-2xl border p-4 flex items-start gap-3"
                      style={{ borderColor: theme.accentBorder, background: theme.accentLight }}>
                      <div className="h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: theme.accent }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v5.5M6 9v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
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
                          <div className="flex flex-wrap gap-1.5">
                            {study.stack.map(s => (
                              <span key={s} className="rounded-lg border border-black/10 px-2.5 py-1 text-xs text-gray-600 font-mono">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {tab === "modules" && (
                  <motion.div key="mod" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-4 max-w-xl leading-relaxed">Each module below shows the specific problem it solved, what was designed and built, and the measurable change it made.</p>
                    <div className="space-y-2">
                      {study.modules.map(m => <ModuleRow key={m.name} mod={m} accent={theme.accent} />)}
                    </div>
                  </motion.div>
                )}

                {tab === "delivery" && (
                  <motion.div key="del" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-5 max-w-xl leading-relaxed">Every project starts with a discovery phase — we understand how the business currently works before designing anything. We never write code in week one.</p>
                    <CaseTimeline weeks={study.timeline} accent={theme.accent} />
                  </motion.div>
                )}

                {tab === "results" && (
                  <motion.div key="res" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <p className="text-xs text-gray-500 mb-4 max-w-xl leading-relaxed">Each outcome includes the mechanism that produced it — not just the number.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {study.outcomes.map(o => (
                        <div key={o.value} className="rounded-xl border border-black/[0.08] bg-white p-4">
                          <p className="text-2xl font-semibold leading-none mb-1" style={{ color: theme.accent }}>{o.value}</p>
                          <p className="text-xs font-medium text-gray-700 mb-1.5 leading-snug">{o.label}</p>
                          <p className="text-[11px] text-gray-400 leading-relaxed">{o.why}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-2xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      style={{ borderColor: theme.accentBorder, background: theme.accentLight }}>
                      <div>
                        <p className="text-xs text-gray-600">Delivered in <span className="font-semibold text-gray-900">{study.duration}</span> from discovery to live system.</p>
                        <p className="text-xs text-gray-400 mt-0.5">Full source code ownership. NDA signed before discovery begins.</p>
                      </div>
                      <Link href="/contact"
                        className="flex-shrink-0 inline-flex items-center justify-center rounded-xl text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition"
                        style={{ background: theme.accent }}>
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
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Internal tools — built & live</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 max-w-2xl leading-snug">
            Three businesses. Three tools that didn't fit. Here's how we built the right ones.
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">
            Each case includes an interactive system demo, the full story behind our decisions, the delivery timeline, and the outcomes — with the reasoning behind every result.
          </p>
        </div>

        <div className="space-y-4">
          {CASES.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i}
              isOpen={openId === study.id}
              onToggle={() => setOpenId(prev => prev === study.id ? null : study.id)} />
          ))}
        </div>

        {/* How we think */}
        <div className="mt-6 rounded-3xl bg-black text-white p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-3">How we think about internal tools</p>
            <p className="text-lg md:text-xl font-medium text-white max-w-2xl leading-snug">
              The right question isn't "which software should we use?" It's "what does our team actually need the software to do?" Those are rarely the same question — and the gap between them is where most generic tools fail.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="inline-block text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3" style={{ background: "rgba(79,70,229,0.22)", color: "#818cf8" }}>Real Estate</span>
                <p className="text-xs text-white/60 leading-relaxed">Every property agency using HubSpot has a spreadsheet running alongside it. That spreadsheet is evidence the CRM doesn't model how property is actually sold — not a failure of discipline.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="inline-block text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3" style={{ background: "rgba(190,24,93,0.22)", color: "#f472b6" }}>Hospitality</span>
                <p className="text-xs text-white/60 leading-relaxed">Generic scheduling tools were built for single-location restaurants. Multi-property hotels with rotating staff and 24-hour departments need something different — and the market doesn't have it off the shelf.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="inline-block text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3" style={{ background: "rgba(180,83,9,0.22)", color: "#fbbf24" }}>Facilities</span>
                <p className="text-xs text-white/60 leading-relaxed">Enterprise ticketing tools assume a dedicated admin, a six-month implementation, and a five-figure budget. A 3-person ops team managing 12 properties needs exactly the same functionality — delivered in six weeks.</p>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-white/50 max-w-md leading-relaxed">
                If your team has a process that relies on spreadsheets, WhatsApp, or a generic tool with too many workarounds — describe it to us. We'll tell you what a custom system would actually change.
              </p>
              <Link href="/contact"
                className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-white text-black text-sm font-medium px-5 py-2.5 hover:opacity-90 transition">
                Book a discovery call →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Not sure if your process needs a custom tool?</p>
            <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
              Book a free 30-minute process review. We'll map how your team currently works, identify where friction is costing time, and tell you honestly whether a custom tool would solve it.
            </p>
          </div>
          <Link href="/contact"
            className="flex-shrink-0 inline-flex items-center justify-center rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition whitespace-nowrap">
            Book a free review
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════
const FAQS = [
  { q: "When does a custom internal tool make sense vs. configuring an existing tool?", a: "A custom tool makes sense when the configuration required to make an existing tool fit your workflow is more work than building from scratch — or when the workarounds your team has developed are permanent. A good signal: if your team maintains a spreadsheet alongside an existing tool to fill its gaps, that gap is a custom tool. If an existing tool would genuinely work with some configuration, we'll tell you that rather than recommend a build." },
  { q: "What kinds of teams and industries do you build internal tools for?", a: "We build for any team where the process is specific enough that generic tools create friction. Common categories: sales teams with unusual pipeline structures, hospitality and retail operations managing staff and scheduling, facilities and property management companies tracking service delivery, professional services firms managing projects and client delivery, and any business where the reporting or approval structure doesn't match what off-the-shelf tools assume." },
  { q: "How long does it typically take to build a custom internal tool?", a: "A focused single-function tool — a custom CRM, a scheduling system, or a ticketing dashboard — typically takes 3–5 weeks from discovery to live. A more complex system covering multiple operational functions takes 6–10 weeks. We give you a precise timeline after the discovery phase, before you commit to the build." },
  { q: "Will my team need technical knowledge to use or maintain it?", a: "No. We design internal tools for the people who will actually use them — not for people with technical backgrounds. Every tool we build goes through user testing with the real team members before launch. For maintenance: we hand over full source code and documentation, and most clients stay on a support retainer so we handle ongoing changes and improvements." },
  { q: "Can you build on top of or improve an existing internal tool we already have?", a: "Yes — and this is often the better choice. If you have an existing internal system that mostly works but is missing specific functionality, we audit the codebase, identify what's salvageable, and build only what needs to change. This is faster and less expensive than rebuilding from scratch, and it's our recommendation in most cases." },
  { q: "Do you build mobile apps for internal tools?", a: "We build mobile-first web applications that work on any device — phone, tablet, or desktop — without requiring your team to install an app. For most internal tools, this is the right approach: no app store approvals, no installation overhead, and full access from any browser. If a native iOS or Android app is genuinely required for your use case, we'll discuss that during discovery." },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur overflow-hidden">
      <button type="button" onClick={() => setOpen(p => !p)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-6" aria-expanded={open}>
        <span className="text-sm text-gray-900">{q}</span>
        <span className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
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
export default function InternalToolsCRMPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Hero />
      <WhatWeBuildCarousel />
      <CaseStudiesSection />
      <section className="px-6 pb-24 pt-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">Questions about internal tools, answered directly.</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">Straight answers about when custom tools make sense, what they cost, and what to expect.</p>
          <div className="grid gap-3">
            {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </main>
  );
}