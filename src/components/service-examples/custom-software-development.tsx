"use client";
import {useState,useEffect} from "react";
import {motion,AnimatePresence} from "framer-motion";
const ease=[0.22,0.61,0.36,1] as const;
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

export function MedicoreDemo() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "inventory">("overview");
  const [transferApproved, setTransferApproved] = useState(false);

  const orders = useCounter(29, 1000, 600);
  const revenue = useCounter(369, 1200, 700);
  const deliveries = useCounter(7, 700, 650);
  const stockAlerts = useCounter(3, 500, 800);

  useEffect(() => {
    const t = setTimeout(() => setAlertVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const branches = [
    { name: "Wuse Branch", orders: 14, stock: 92, revenue: "₦184k", status: "good" as const },
    { name: "Garki Branch", orders: 9, stock: 61, revenue: "₦112k", status: "good" as const },
    { name: "Maitama Branch", orders: 6, stock: 38, revenue: "₦73k", status: "warn" as const },
  ];
  const inventory = [
    { name: "Amoxicillin 500mg", total: 248, expiry: "Aug 2026", status: "ok" as const },
    { name: "Metformin 850mg", total: 67, expiry: "Mar 2026", status: "low" as const },
    { name: "Insulin Glargine", total: 21, expiry: "Jan 2026", status: "expiry" as const },
    { name: "Losartan 50mg", total: 8, expiry: "May 2026", status: "critical" as const },
    { name: "Ampiclox 500mg", total: 134, expiry: "Dec 2026", status: "ok" as const },
  ];

  const BRAND = "#0A3D2E";
  const BRAND_SOFT = "rgba(10,61,46,0.12)";

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden"
      style={{ background: "linear-gradient(145deg,#051a12 0%,#0a2e1f 55%,#051a12 100%)", boxShadow: "0 40px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)" }}>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 55% 45% at 45% 25%,rgba(10,61,46,0.25) 0%,transparent 70%), radial-gradient(ellipse 35% 30% at 85% 75%,rgba(10,61,46,0.10) 0%,transparent 60%)" }} />

      <div className="relative p-4 sm:p-5 md:p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg flex items-center justify-center" style={{ background: BRAND_SOFT, border: `1px solid ${BRAND}` }}>
              <span className="text-emerald-400 text-[10px] font-bold">M</span>
            </div>
            <span className="text-white/50 text-xs font-medium tracking-wide">Medicore · Owner Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400/60 text-[10px]">Live</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
          className="relative rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.30)" }}>

          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-black/[0.08]"
            style={{ background: "linear-gradient(180deg,#f9fafb 0%,#f3f4f6 100%)" }}>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded border border-black/[0.09] px-3 py-1 max-w-sm mx-auto">
              <span className="text-[10px] text-gray-400 truncate">medicore.ops / owner-dashboard</span>
            </div>
            <span className="text-[9px] text-gray-400 border border-black/[0.08] rounded px-2 py-0.5 ml-auto hidden sm:block">Today</span>
          </div>

          <div className="flex flex-col sm:flex-row bg-white" style={{ minHeight: 280, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
            <div className="sm:w-28 flex flex-row sm:flex-col p-2 sm:p-3 gap-1 sm:gap-0.5 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-black/[0.06] overflow-x-auto"
              style={{ background: "linear-gradient(180deg,#0d1117 0%,#0f1420 100%)" }}>
              <div className="hidden sm:block mb-4">
                <p className="text-white/80 text-[10px] font-semibold mb-0.5">Medicore</p>
                <p className="text-white/25 text-[8px]">Owner View</p>
              </div>
              {[{ id: "overview" as const, label: "Overview", dot: null }, { id: "inventory" as const, label: "Inventory", dot: "2" }, { id: "dispatch" as const, label: "Dispatch", dot: "1" }, { id: "reports" as const, label: "Reports", dot: null }].map(item => (
                <button key={item.id} type="button"
                  onClick={() => (item.id === "overview" || item.id === "inventory") && setActiveTab(item.id)}
                  className="text-left px-3 sm:px-2.5 py-2 sm:py-1.5 rounded-lg text-[10px] sm:text-[9px] flex items-center justify-between transition-all whitespace-nowrap flex-shrink-0"
                  style={{ background: activeTab === item.id ? "rgba(10,61,46,0.25)" : "transparent", color: activeTab === item.id ? "#34d399" : "rgba(255,255,255,0.35)" }}>
                  <span>{item.label}</span>
                  {item.dot && <span className="text-[8px] sm:text-[7px] bg-red-500 text-white rounded-full px-1.5 leading-4 ml-2">{item.dot}</span>}
                </button>
              ))}
              <div className="hidden sm:block mt-auto pt-3 border-t border-white/[0.07] space-y-1">
                {["Wuse", "Garki", "Maitama"].map(b => (
                  <div key={b} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400/50" />
                    <span className="text-[8px] text-white/25">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x-0 sm:divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
                {[
                  { label: "Today's Orders", value: orders, suffix: "", delta: "+4 vs yesterday", warn: false },
                  { label: "Revenue", value: revenue, suffix: "k", delta: "3 branches", warn: false, prefix: "₦" },
                  { label: "Deliveries", value: deliveries, suffix: "", delta: "3 en route", warn: false },
                  { label: "Stock Alerts", value: stockAlerts, suffix: "", delta: "action needed", warn: true },
                ].map(s => (
                  <div key={s.label} className="px-3 py-3 border-b sm:border-b-0 border-black/[0.04]">
                    <p className="text-[8px] sm:text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                    <p className={`text-lg sm:text-xl font-bold leading-none ${s.warn ? "text-red-600" : "text-gray-900"}`}>
                      {s.prefix || ""}{s.value}{s.suffix}
                    </p>
                    <p className={`text-[9px] sm:text-[8px] mt-1 ${s.warn ? "text-red-400" : "text-gray-400"}`}>{s.delta}</p>
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-auto p-3">
                {activeTab === "overview" ? (
                  <>
                    <p className="text-[9px] sm:text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Branch Performance — Today</p>
                    <div className="space-y-2">
                      {branches.map(b => (
                        <div key={b.name} className="bg-white rounded-xl border border-black/[0.07] px-3 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`h-2 w-2 rounded-full ${b.status === "warn" ? "bg-amber-400" : "bg-emerald-400"}`} />
                              <p className="text-xs sm:text-[10px] font-semibold text-gray-800">{b.name}</p>
                            </div>
                            <div className="flex gap-3 text-[10px] sm:text-[9px]">
                              <span className="text-gray-400">{b.orders} orders</span>
                              <span className="font-semibold" style={{ color: BRAND }}>{b.revenue}</span>
                            </div>
                          </div>
                          <div className="w-full sm:w-20">
                            <div className="flex justify-between text-[8px] sm:text-[7px] text-gray-400 mb-1">
                              <span>Stock</span>
                              <span className={`font-semibold ${b.stock < 50 ? "text-amber-600" : "text-gray-500"}`}>{b.stock}%</span>
                            </div>
                            <div className="h-2 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div className={`h-full rounded-full ${b.stock < 50 ? "bg-amber-400" : "bg-emerald-400"}`}
                                initial={{ width: 0 }} animate={{ width: `${b.stock}%` }} transition={{ duration: 1, ease, delay: 0.8 }} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-3 flex items-start gap-2">
                        <span className="text-amber-500 text-sm flex-shrink-0 mt-0.5">⚠</span>
                        <div>
                          <p className="text-[10px] sm:text-[9px] font-semibold text-amber-800">Maitama below 40% — redistribution suggested</p>
                          <p className="text-[9px] sm:text-[8px] text-amber-600 mt-0.5">Wuse has surplus. Initiate transfer or place restock.</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[9px] sm:text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Network Inventory</p>
                    <div className="space-y-2">
                      {inventory.map(item => (
                        <div key={item.name} className={`bg-white rounded-xl border px-3 py-3 flex flex-col sm:flex-row sm:items-center gap-2 ${item.status === "critical" || item.status === "expiry" ? "border-red-100" : "border-black/[0.06]"}`}>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-[9px] font-medium text-gray-800">{item.name}</p>
                            <p className="text-[9px] sm:text-[8px] text-gray-400">Exp: {item.expiry}</p>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <p className="text-base sm:text-sm font-bold text-gray-700">{item.total}</p>
                            <span className={`text-[9px] sm:text-[8px] px-2.5 sm:px-2 py-1 sm:py-0.5 rounded-full font-medium border ${
                              item.status === "ok" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                              item.status === "low" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              "bg-red-50 text-red-700 border-red-200"
                            }`}>{item.status === "ok" ? "In stock" : item.status === "low" ? "Low" : item.status === "expiry" ? "⚠ Expiring" : "⚠ Critical"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {alertVisible && (
            <motion.div initial={{ opacity: 0, x: 44, y: -12, rotate: 3 }} animate={{ opacity: 1, x: 0, y: 0, rotate: 2 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}
              className="absolute top-16 sm:top-14 right-2 sm:right-3 md:-right-1 w-56 sm:w-52 rounded-2xl p-3 z-20"
              style={{ background: "#fff", boxShadow: "0 0 0 1px rgba(220,38,38,0.18),0 8px 24px rgba(0,0,0,0.25),0 2px 8px rgba(220,38,38,0.15)", transform: "rotate(2deg)" }}>
              <div className="flex items-start gap-2.5">
                <div className="h-7 w-7 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-50 border border-red-200">
                  <span className="text-red-500 text-sm">⚡</span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-[9px] font-bold text-gray-900 leading-tight">Urgent restock needed</p>
                  <p className="text-[9px] sm:text-[8px] text-gray-500 mt-0.5 leading-tight">Insulin Glargine · Maitama</p>
                  <p className="text-[9px] sm:text-[8px] font-semibold mt-1 text-red-600">3 units · Exp Jan 2026</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "MC-0914", patient: "Aisha Musa", branch: "Wuse", status: "Delivered ✓", color: "emerald", r: "-0.6deg" },
            { id: "MC-1002", patient: "Chidi Obi", branch: "Garki", status: "In transit", color: "amber", r: "0.2deg" },
            { id: "MC-1045", patient: "James K.", branch: "Maitama", status: "⚡ Urgent", color: "red", r: "0.7deg" },
          ].map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 + i * 0.08 }}
              className="rounded-xl p-4 sm:p-2.5"
              style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.12)", transform: `rotate(${d.r})`, fontFamily: "ui-monospace,monospace" }}>
              <div className="flex items-center justify-between mb-2 sm:mb-1.5">
                <span className="text-[10px] sm:text-[8px] text-gray-400">{d.id}</span>
                <span className={`text-[9px] sm:text-[7px] font-bold px-2.5 sm:px-1.5 py-1 sm:py-0.5 rounded-full border ${d.color === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : d.color === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200"}`}>{d.status}</span>
              </div>
              <p className="text-sm sm:text-[9px] font-semibold text-gray-800">{d.patient}</p>
              <p className="text-[10px] sm:text-[8px] text-gray-400">{d.branch} branch</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.55 }}
          className="mt-3 rounded-xl p-4 sm:p-3"
          style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 4px 16px rgba(0,0,0,0.18),0 1px 4px rgba(0,0,0,0.10)", transform: "rotate(-0.3deg)", fontFamily: "ui-monospace,monospace" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] sm:text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">Stock Transfer Request</p>
              <p className="text-sm sm:text-[10px] font-semibold text-gray-900">Losartan 50mg · 40 units · Wuse → Maitama</p>
              <p className="text-[10px] sm:text-[8px] text-gray-400 mt-0.5">Requested by Branch Manager · awaiting owner approval</p>
            </div>
            {transferApproved ? (
              <span className="sm:ml-4 flex-shrink-0 rounded-lg text-sm sm:text-[9px] font-bold px-4 sm:px-3 py-2 sm:py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-center">✓ Approved</span>
            ) : (
              <button type="button" onClick={() => setTransferApproved(true)} className="sm:ml-4 flex-shrink-0 rounded-lg text-white text-sm sm:text-[9px] font-bold px-4 sm:px-3 py-2 sm:py-1.5 hover:opacity-90 transition" style={{ background: BRAND }}>Approve</button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function BuildCoreDemo() {
  const [budgetAnim, setBudgetAnim] = useState(false);
  const [approvalDone, setApprovalDone] = useState(false);

  const sites24 = useCounter(3, 400, 300);
  const workers = useCounter(64, 900, 500);
  const budgetM = useCounter(285, 1100, 600);
  const progress = useCounter(63, 900, 650);

  useEffect(() => { const t = setTimeout(() => setBudgetAnim(true), 450); return () => clearTimeout(t); }, []);

  const sites = [
    { name: "Maitama Towers", phase: "Structural", prog: 68, budget: 142, spent: 98, workers: 34, ok: true },
    { name: "Jabi Lake Mall", phase: "Foundation", prog: 31, budget: 87, spent: 29, workers: 18, ok: true },
    { name: "Gwarinpa Estate", phase: "Finishing", prog: 89, budget: 56, spent: 51, workers: 12, ok: false },
  ];

  const BRAND = "#431407";
  const BRAND_SOFT = "rgba(67,20,7,0.18)";

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden"
      style={{ background: "linear-gradient(145deg,#1a0a04 0%,#2a1008 55%,#1a0a04 100%)", boxShadow: "0 40px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 40% at 40% 30%,rgba(67,20,7,0.22) 0%,transparent 70%),radial-gradient(ellipse 30% 25% at 80% 80%,rgba(67,20,7,0.10) 0%,transparent 60%)" }} />

      <div className="relative p-4 sm:p-5 md:p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg flex items-center justify-center" style={{ background: BRAND_SOFT, border: `1px solid ${BRAND}` }}>
              <span className="text-orange-400 text-[10px] font-bold">B</span>
            </div>
            <span className="text-white/50 text-xs font-medium">BuildCore · Director View</span>
          </div>
          <span className="text-orange-400/60 text-[10px]">3 active sites</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
          className="relative rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.28)" }}>

          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-black/[0.08]"
            style={{ background: "linear-gradient(180deg,#f9fafb 0%,#f3f4f6 100%)" }}>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded border border-black/[0.09] px-3 py-1 max-w-sm mx-auto">
              <span className="text-[10px] text-gray-400 truncate">buildcore.ops / director-view</span>
            </div>
            <span className="text-[9px] text-gray-400 border border-black/[0.08] rounded px-2 py-0.5 ml-auto hidden sm:block">Week 24 of 52</span>
          </div>

          <div className="flex flex-col sm:flex-row bg-white" style={{ minHeight: 280, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
            <div className="sm:w-28 flex flex-row sm:flex-col p-2 sm:p-3 gap-1 sm:gap-0.5 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-black/[0.06] overflow-x-auto"
              style={{ background: "linear-gradient(180deg,#0f1923 0%,#111c27 100%)" }}>
              <div className="hidden sm:block mb-4">
                <p className="text-white/80 text-[10px] font-semibold mb-0.5">BuildCore</p>
                <p className="text-white/25 text-[8px]">Director</p>
              </div>
              {["All Sites", "Materials", "Procurement", "Attendance", "Reports"].map((item, i) => (
                <button key={item} type="button" className="text-left px-3 sm:px-2.5 py-2 sm:py-1.5 rounded-lg text-[10px] sm:text-[9px] transition whitespace-nowrap flex-shrink-0"
                  style={{ background: i === 0 ? "rgba(67,20,7,0.20)" : "transparent", color: i === 0 ? "#fb923c" : "rgba(255,255,255,0.35)" }}>{item}</button>
              ))}
              <div className="hidden sm:block mt-auto pt-3 border-t border-white/[0.07] space-y-1">
                {sites.map(s => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <span className={`h-1 w-1 rounded-full ${s.ok ? "bg-emerald-400" : "bg-amber-400"}`} />
                    <span className="text-[8px] text-white/25 truncate">{s.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x-0 sm:divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
                {[
                  { label: "Active Sites", value: sites24, suffix: "", delta: "across 3 projects", warn: false },
                  { label: "Workers Today", value: workers, suffix: "", delta: "all sites combined", warn: false },
                  { label: "Budget Spent", value: budgetM, suffix: "M", delta: "of ₦285M total", warn: false, prefix: "₦" },
                  { label: "Avg Progress", value: progress, suffix: "%", delta: "on target", warn: false },
                ].map(s => (
                  <div key={s.label} className="px-3 py-3 border-b sm:border-b-0 border-black/[0.04]">
                    <p className="text-[8px] sm:text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 leading-none">{s.prefix || ""}{s.value}{s.suffix}</p>
                    <p className="text-[9px] sm:text-[8px] text-gray-400 mt-1">{s.delta}</p>
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-auto p-3">
                <p className="text-[9px] sm:text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-2">Sites — Budget vs Actual</p>
                <div className="space-y-3 sm:space-y-2">
                  {sites.map(s => (
                    <div key={s.name} className="bg-white rounded-xl border border-black/[0.07] p-4 sm:p-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-2 gap-1">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-[10px] font-semibold text-gray-900">{s.name}</p>
                            <span className={`text-[9px] sm:text-[7px] px-2 sm:px-1.5 py-1 sm:py-0.5 rounded-full font-medium border ${s.ok ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>{s.ok ? "On track" : "Needs review"}</span>
                          </div>
                          <p className="text-[10px] sm:text-[8px] text-gray-400 mt-0.5">{s.phase} · {s.workers} workers</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] sm:text-[9px] font-bold text-gray-900">₦{s.spent}M <span className="text-gray-400 font-normal">/ ₦{s.budget}M</span></p>
                          <p className="text-[9px] sm:text-[8px] text-gray-400">{Math.round((s.spent / s.budget) * 100)}% used</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                        <div className="flex-1">
                          <p className="text-[8px] sm:text-[7px] text-gray-400 mb-1">Budget used</p>
                          <div className="h-2.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div className={`h-full rounded-full ${s.ok ? "bg-orange-600" : "bg-amber-400"}`}
                              initial={{ width: 0 }} animate={{ width: budgetAnim ? `${Math.round((s.spent / s.budget) * 100)}%` : 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-[8px] sm:text-[7px] text-gray-400 mb-1">Progress</p>
                          <div className="h-2.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div className="h-full rounded-full bg-blue-400"
                              initial={{ width: 0 }} animate={{ width: budgetAnim ? `${s.prog}%` : 0 }} transition={{ duration: 0.9, ease, delay: 0.2 }} />
                          </div>
                          <p className="text-[8px] sm:text-[7px] text-right text-gray-400 mt-0.5">{s.prog}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 }}
            className="rounded-xl p-4 sm:p-3"
            style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.12)", transform: "rotate(-0.5deg)", fontFamily: "ui-monospace,monospace" }}>
            <p className="text-[9px] sm:text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-2 sm:mb-1.5">Material Request</p>
            <p className="text-sm sm:text-[10px] font-semibold text-gray-800">Dangote Cement 50kg</p>
            <p className="text-[10px] sm:text-[8px] text-gray-500 mb-3 sm:mb-2">200 bags · Maitama site</p>
            <span className="text-[9px] sm:text-[7px] font-semibold px-2.5 sm:px-2 py-1 sm:py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Awaiting approval</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.33 }}
            className="rounded-xl p-4 sm:p-3"
            style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.12)", transform: "rotate(0.3deg)", fontFamily: "ui-monospace,monospace" }}>
            <p className="text-[9px] sm:text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-2 sm:mb-1.5">Procurement · ₦2.4M</p>
            <p className="text-sm sm:text-[10px] font-semibold text-gray-800">Reinforcement Rods</p>
            <p className="text-[10px] sm:text-[8px] text-gray-500 mb-3 sm:mb-2">Jabi Lake · Arewa Steel</p>
            {!approvalDone ? (
              <button type="button" onClick={() => setApprovalDone(true)} className="w-full text-center rounded-lg text-white text-sm sm:text-[8px] font-bold py-2 sm:py-1.5 hover:opacity-90 transition" style={{ background: BRAND }}>Approve purchase order</button>
            ) : (
              <div className="w-full text-center rounded-lg text-sm sm:text-[8px] font-bold py-2 sm:py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Approved — PO sent</div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.41 }}
            className="rounded-xl p-4 sm:p-3 hidden sm:block"
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
    </div>
  );
}

export function FactoryFlowDemo() {
  const [activeStage, setActiveStage] = useState(0);
  const [qcSigned, setQcSigned] = useState(false);

  const batches = useCounter(3, 400, 300);
  const unitsToday = useCounter(7400, 1200, 500);
  const onHold = useCounter(1, 300, 600);
  const dispatched = useCounter(2, 400, 700);

  useEffect(() => {
    const id = setInterval(() => setActiveStage(s => s < 4 ? s + 1 : s), 850);
    return () => clearInterval(id);
  }, []);

  const pipeline = [
    { label: "Raw Intake", icon: "📥" },
    { label: "Production", icon: "⚙️" },
    { label: "QC Check", icon: "🔬" },
    { label: "Packaging", icon: "📦" },
    { label: "Dispatch", icon: "🚛" },
  ];

  const batchRows = [
    { id: "FF-2401", product: "Tomato Paste 400g", qty: "2,400 units", stage: "Packaging", st: "running" as const },
    { id: "FF-2402", product: "Groundnut Oil 1L", qty: "860 units", stage: "QC Check", st: "hold" as const },
    { id: "FF-2403", product: "Seasoning Cubes (bulk)", qty: "5,000 units", stage: "Dispatched", st: "done" as const },
  ];

  const materials = [
    { name: "Tomatoes (raw)", avail: 1840, needed: 1200, unit: "kg", ok: true },
    { name: "Tin cans (400g)", avail: 2800, needed: 2400, unit: "units", ok: true },
    { name: "Groundnut Oil crude", avail: 320, needed: 860, unit: "L", ok: false },
    { name: "Packaging film", avail: 4, needed: 3, unit: "rolls", ok: true },
  ];

  const BRAND = "#1E1B4B";
  const BRAND_SOFT = "rgba(30,27,75,0.20)";

  return (
    <div className="relative w-full select-none rounded-3xl overflow-hidden"
      style={{ background: "linear-gradient(145deg,#0a0918 0%,#121030 55%,#0a0918 100%)", boxShadow: "0 40px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 25%,rgba(30,27,75,0.25) 0%,transparent 70%),radial-gradient(ellipse 30% 25% at 80% 75%,rgba(30,27,75,0.10) 0%,transparent 60%)" }} />

      <div className="relative p-4 sm:p-5 md:p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg flex items-center justify-center" style={{ background: BRAND_SOFT, border: `1px solid ${BRAND}` }}>
              <span className="text-violet-400 text-[10px] font-bold">F</span>
            </div>
            <span className="text-white/50 text-xs font-medium">FactoryFlow · Production Control</span>
          </div>
          <span className="text-violet-400/60 text-[10px]">Shift 1 · Active</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
          className="relative rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07),0 4px 8px rgba(0,0,0,0.35),0 16px 40px rgba(0,0,0,0.45),0 40px 80px rgba(0,0,0,0.28)" }}>

          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-black/[0.08]"
            style={{ background: "linear-gradient(180deg,#f9fafb 0%,#f3f4f6 100%)" }}>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded border border-black/[0.09] px-3 py-1 max-w-sm mx-auto">
              <span className="text-[10px] text-gray-400 truncate">factoryflow.ops / production-control</span>
            </div>
            <span className="text-[9px] text-gray-400 border border-black/[0.08] rounded px-2 py-0.5 ml-auto hidden sm:block">Shift 1 · Active</span>
          </div>

          <div className="flex flex-col sm:flex-row bg-white" style={{ minHeight: 280, fontFamily: "ui-sans-serif,system-ui,sans-serif", fontSize: 11 }}>
            <div className="sm:w-28 flex flex-row sm:flex-col p-2 sm:p-3 gap-1 sm:gap-0.5 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-black/[0.06] overflow-x-auto"
              style={{ background: "linear-gradient(180deg,#1a0a2e 0%,#1e0d35 100%)" }}>
              <div className="hidden sm:block mb-4">
                <p className="text-white/80 text-[10px] font-semibold mb-0.5">FactoryFlow</p>
                <p className="text-white/25 text-[8px]">Supervisor</p>
              </div>
              {["Production", "Inventory", "QC", "Dispatch", "Reports"].map((item, i) => (
                <button key={item} type="button" className="text-left px-3 sm:px-2.5 py-2 sm:py-1.5 rounded-lg text-[10px] sm:text-[9px] transition whitespace-nowrap flex-shrink-0"
                  style={{ background: i === 0 ? "rgba(30,27,75,0.25)" : "transparent", color: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.35)" }}>{item}</button>
              ))}
              <div className="hidden sm:block mt-auto pt-3 border-t border-white/[0.07]">
                <p className="text-white/20 text-[8px] mb-1">Today</p>
                <p className="text-white/50 text-[10px] font-semibold">{batches} batches</p>
                <p className="text-amber-400/70 text-[8px]">{onHold} on hold</p>
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col bg-gray-50/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x-0 sm:divide-x divide-black/[0.06] border-b border-black/[0.07] bg-white">
                {[
                  { label: "Active Batches", value: batches, suffix: "", delta: "this shift", warn: false },
                  { label: "Units Today", value: unitsToday, suffix: "", delta: "across all lines", warn: false },
                  { label: "On Hold", value: onHold, suffix: "", delta: "material shortage", warn: true },
                  { label: "Dispatched", value: dispatched, suffix: "", delta: "orders today", warn: false },
                ].map(s => (
                  <div key={s.label} className="px-3 py-3 border-b sm:border-b-0 border-black/[0.04]">
                    <p className="text-[8px] sm:text-[7px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                    <p className={`text-lg sm:text-xl font-bold leading-none ${s.warn ? "text-amber-600" : "text-gray-900"}`}>{s.value.toLocaleString()}</p>
                    <p className={`text-[9px] sm:text-[8px] mt-1 ${s.warn ? "text-amber-500" : "text-gray-400"}`}>{s.delta}</p>
                  </div>
                ))}
              </div>
              <div className="flex-1 overflow-auto p-3">
                <div className="bg-white rounded-xl border border-black/[0.07] px-4 py-3 mb-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <p className="text-[9px] sm:text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-3">FF-2401 · Tomato Paste — Live Progress</p>
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
                          <p className={`text-[8px] sm:text-[7px] mt-1 text-center leading-tight ${i < activeStage ? "text-violet-600 font-semibold" : i === activeStage ? "text-violet-500" : "text-gray-400"}`}>{stage.label}</p>
                        </div>
                        {i < pipeline.length - 1 && <div className={`h-0.5 w-3 mx-0.5 transition-all duration-500 ${i < activeStage ? "bg-violet-400" : "bg-gray-200"}`} />}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[9px] sm:text-[8px] uppercase tracking-widest text-gray-400 font-semibold mb-1.5">All Batches</p>
                <div className="space-y-2">
                  {batchRows.map(b => (
                    <div key={b.id} className="bg-white rounded-lg border border-black/[0.07] px-3 py-2.5 sm:py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] sm:text-[8px] text-gray-400 font-mono">{b.id}</span>
                          <span className={`text-[8px] sm:text-[7px] px-1.5 sm:px-1.5 py-0.5 sm:py-0.5 rounded-full font-medium border ${b.st === "running" ? "bg-violet-50 text-violet-700 border-violet-200" : b.st === "hold" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                            {b.st === "running" ? "● Running" : b.st === "hold" ? "⚠ On hold" : "✓ Done"}
                          </span>
                        </div>
                        <p className="text-[10px] sm:text-[9px] font-medium text-gray-800">{b.product}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] sm:text-[9px] font-semibold text-gray-700">{b.qty}</p>
                        <p className="text-[9px] sm:text-[8px] text-gray-400">{b.stage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.25 }}
            className="rounded-xl border border-amber-200 p-4 sm:p-3"
            style={{ background: "rgba(255,251,235,0.97)", boxShadow: "0 3px 10px rgba(0,0,0,0.18),0 1px 3px rgba(217,119,6,0.12)", transform: "rotate(-0.6deg)", fontFamily: "ui-monospace,monospace" }}>
            <p className="text-[9px] sm:text-[8px] font-semibold uppercase tracking-widest text-amber-600 mb-2 sm:mb-1.5">Material Shortage</p>
            <p className="text-sm sm:text-[10px] font-semibold text-gray-800">Groundnut Oil (crude)</p>
            <p className="text-[10px] sm:text-[8px] text-gray-600 mb-1">Required: 860L · Available: 320L</p>
            <p className="text-[9px] sm:text-[7px] text-amber-700 font-semibold">FF-2402 on hold until restocked</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.33 }}
            className="rounded-xl p-4 sm:p-3"
            style={{ background: "#fff", boxShadow: "0 3px 10px rgba(0,0,0,0.20),0 1px 3px rgba(0,0,0,0.10)", transform: "rotate(0.4deg)", fontFamily: "ui-monospace,monospace" }}>
            <p className="text-[9px] sm:text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-2 sm:mb-1.5">QC Sign-Off</p>
            <p className="text-sm sm:text-[10px] font-semibold text-gray-800">FF-2401 · Batch 3 sample</p>
            <p className="text-[10px] sm:text-[8px] text-gray-500 mb-3 sm:mb-2">pH 4.2 · Brix 28 · Seal: Pass</p>
            {!qcSigned ? (
              <button type="button" onClick={() => setQcSigned(true)} className="w-full text-center rounded-lg text-white text-sm sm:text-[8px] font-bold py-2 sm:py-1.5 hover:opacity-90 transition" style={{ background: BRAND }}>Sign off → advance to packaging</button>
            ) : (
              <div className="w-full text-center rounded-lg text-sm sm:text-[8px] font-bold py-2 sm:py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Signed — batch advancing</div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.41 }}
            className="rounded-xl p-4 sm:p-3 hidden sm:block"
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

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: 0.5 }}
          className="mt-3 rounded-xl p-4 sm:p-3"
          style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 2px 8px rgba(0,0,0,0.16),0 1px 3px rgba(0,0,0,0.08)", transform: "rotate(-0.2deg)", fontFamily: "ui-monospace,monospace" }}>
          <p className="text-[9px] sm:text-[8px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Raw Material Allocation — Current Shift</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-1.5">
            {materials.map(m => (
              <div key={m.name} className={`rounded-lg px-3 sm:px-2.5 py-2.5 sm:py-2 border ${!m.ok ? "border-red-200 bg-red-50/50" : "border-black/[0.06] bg-gray-50/70"}`}>
                <p className="text-[9px] sm:text-[8px] font-semibold text-gray-800 leading-tight mb-1">{m.name}</p>
                <p className={`text-[9px] sm:text-[8px] ${!m.ok ? "text-red-600 font-semibold" : "text-gray-500"}`}>{m.avail.toLocaleString()} {m.unit} avail</p>
                <p className="text-[8px] sm:text-[7px] text-gray-400">Needed: {m.needed.toLocaleString()}</p>
                {!m.ok && <p className="text-[8px] sm:text-[7px] text-red-600 font-semibold mt-0.5">⚠ Insufficient</p>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
