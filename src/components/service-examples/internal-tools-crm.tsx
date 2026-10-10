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

export function PhoneFrame({ children, accent, label, badge }: {
  children: React.ReactNode;
  accent: string;
  label: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Phone bezel */}
      <div className="relative w-full max-w-[340px] mx-auto rounded-[2.5rem] p-2"
        style={{ background: "linear-gradient(180deg, #2a2a2e 0%, #1a1a1e 100%)", boxShadow: "0 25px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)" }}>
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <div className="h-5 w-20 rounded-full bg-black/80 backdrop-blur-sm" />
        </div>
        {/* Screen */}
        <div className="relative rounded-[2rem] overflow-hidden bg-white"
          style={{ aspectRatio: "9/19.5", maxHeight: "640px" }}>
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pt-3 pb-1">
            <span className="text-[10px] font-semibold text-gray-900">9:41</span>
            <div className="flex items-center gap-1">
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none"><rect x="0.5" y="3.5" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1" className="text-gray-900"/><rect x="12" y="5" width="1.5" height="3" rx="0.5" className="fill-gray-900"/></svg>
            </div>
          </div>
          {/* App content */}
          <div className="h-full overflow-hidden pt-8">
            {children}
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-black/20" />
        </div>
      </div>
      {/* Caption below phone */}
      <div className="mt-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <span className="text-[11px] text-white/50 font-medium">{label}</span>
        {badge && <span className="text-[9px] text-white/30 ml-1">· {badge}</span>}
      </div>
    </div>
  );
}

export function PipelineDeskDemo() {
  const [view, setView] = useState<"pipeline" | "lead" | "add">("pipeline");
  const [selectedLead, setSelectedLead] = useState(0);
  const [noteAdded, setNoteAdded] = useState(false);
  const totalLeads = useCounter(147, 1000, 400);
  const dealValue = useCounter(842, 1100, 600);

  const leads = [
    { name: "Adaeze O.", stage: "New Enquiry", property: "3-bed Lekki Ph 1", value: "₦85M", color: "#4f46e5", days: 1 },
    { name: "Kunle B.", stage: "New Enquiry", property: "Land · Ibeju-Lekki", value: "₦22M", color: "#4f46e5", days: 2 },
    { name: "Emeka D.", stage: "Site Visit", property: "2-bed Banana Island", value: "₦120M", color: "#be185d", days: 5 },
    { name: "Fatima S.", stage: "Negotiation", property: "4-bed Maitama", value: "₦95M", color: "#d97706", days: 8 },
    { name: "Bola A.", stage: "Negotiation", property: "Commercial · VI", value: "₦210M", color: "#d97706", days: 12 },
    { name: "Chidi I.", stage: "Offer Made", property: "Duplex · Ajah", value: "₦68M", color: "#059669", days: 3 },
  ];

  const lead = leads[selectedLead];

  return (
    <div className="h-full flex flex-col bg-gray-50" style={{ fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
      {/* Header */}
      <div className="px-4 pt-2 pb-3 bg-white border-b border-black/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(79,70,229,0.12)" }}>
              <span className="text-[9px] font-bold" style={{ color: "#4f46e5" }}>PD</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-900">PipelineDesk</p>
              <p className="text-[8px] text-gray-400">Sales CRM</p>
            </div>
          </div>
          <div className="h-7 w-7 rounded-full bg-indigo-50 flex items-center justify-center">
            <span className="text-[9px] font-bold text-indigo-600">TA</span>
          </div>
        </div>
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2.5" style={{ background: "rgba(79,70,229,0.06)" }}>
            <p className="text-[8px] text-gray-400 mb-0.5">Active Leads</p>
            <p className="text-lg font-bold text-gray-900 leading-none">{totalLeads}</p>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: "rgba(79,70,229,0.06)" }}>
            <p className="text-[8px] text-gray-400 mb-0.5">Pipeline Value</p>
            <p className="text-lg font-bold text-gray-900 leading-none">₦{dealValue}M</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {view === "pipeline" && (
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold text-gray-700">Leads</p>
              <span className="text-[8px] text-gray-400">6 active</span>
            </div>
            {leads.map((l, i) => (
              <button key={l.name} onClick={() => { setSelectedLead(i); setView("lead"); }}
                className="w-full text-left rounded-xl p-3 bg-white border border-black/[0.06] transition active:scale-[0.98]"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                      style={{ background: l.color }}>
                      {l.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-900">{l.name}</p>
                      <p className="text-[8px] text-gray-400">{l.property}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: l.color }}>{l.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] px-2 py-0.5 rounded-full font-medium" style={{ background: l.color + "15", color: l.color }}>
                    {l.stage}
                  </span>
                  <span className="text-[8px] text-gray-400">{l.days}d</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {view === "lead" && (
          <div className="p-3">
            <button onClick={() => setView("pipeline")} className="flex items-center gap-1 text-[10px] text-gray-400 mb-3">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Back to leads
            </button>
            <div className="rounded-2xl bg-white border border-black/[0.06] p-4 mb-3" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ background: lead.color }}>
                  {lead.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900">{lead.name}</p>
                  <p className="text-[9px] text-gray-400">{lead.property}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg p-2" style={{ background: "rgba(79,70,229,0.05)" }}>
                  <p className="text-[8px] text-gray-400">Value</p>
                  <p className="text-[11px] font-bold text-gray-900">{lead.value}</p>
                </div>
                <div className="rounded-lg p-2" style={{ background: "rgba(79,70,229,0.05)" }}>
                  <p className="text-[8px] text-gray-400">Stage</p>
                  <p className="text-[11px] font-bold text-gray-900">{lead.stage}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[7px]">📞</span>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-700">Initial enquiry call</p>
                    <p className="text-[7px] text-gray-400">Today, 10:14am</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[7px]">📝</span>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-700">Prefers ground floor</p>
                    <p className="text-[7px] text-gray-400">Today, 10:22am</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[7px]">📍</span>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-700">Site visit scheduled</p>
                    <p className="text-[7px] text-gray-400">Sat 14 Jun, 11am</p>
                  </div>
                </div>
              </div>
              {!noteAdded ? (
                <button onClick={() => setNoteAdded(true)}
                  className="w-full mt-3 rounded-xl py-2.5 text-[10px] font-semibold text-white"
                  style={{ background: "#4f46e5" }}>+ Add note</button>
              ) : (
                <div className="mt-3 flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-[7px]">📝</span>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-700">Note saved</p>
                    <p className="text-[7px] text-gray-400">Just now</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="px-4 py-2 bg-white border-t border-black/[0.06] flex items-center justify-around">
        {[
          { id: "pipeline", icon: "◫", label: "Pipeline" },
          { id: "leads", icon: "👤", label: "Leads" },
          { id: "properties", icon: "🏠", label: "Properties" },
          { id: "reports", icon: "📊", label: "Reports" },
        ].map(item => (
          <button key={item.id} onClick={() => item.id === "pipeline" && setView("pipeline")}
            className={`flex flex-col items-center gap-0.5 ${item.id === "pipeline" ? "text-indigo-600" : "text-gray-400"}`}>
            <span className="text-[13px]">{item.icon}</span>
            <span className="text-[7px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function StaffHubDemo() {
  const [activeTab, setActiveTab] = useState<"roster" | "leave">("roster");
  const [leaveApproved, setLeaveApproved] = useState(false);
  const totalStaff = useCounter(84, 900, 400);
  const onShift = useCounter(31, 700, 500);

  const shifts = [
    { dept: "Front Desk", time: "07:00–15:00", staff: ["Aisha M.", "Kola B."], color: "#be185d" },
    { dept: "Housekeeping", time: "08:00–16:00", staff: ["Tunde O.", "Bola S.", "Emeka N."], color: "#7c3aed" },
    { dept: "Restaurant", time: "11:00–23:00", staff: ["Chidi A.", "Fatima B."], color: "#d97706" },
  ];

  const leaveRequests = [
    { name: "Ngozi A.", dept: "Front Desk", dates: "14–16 Jun", type: "Annual" },
    { name: "Emeka N.", dept: "Housekeeping", dates: "20 Jun", type: "Sick" },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50" style={{ fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
      {/* Header */}
      <div className="px-4 pt-2 pb-3 bg-white border-b border-black/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(190,24,93,0.12)" }}>
              <span className="text-[9px] font-bold" style={{ color: "#be185d" }}>SH</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-900">StaffHub</p>
              <p className="text-[8px] text-gray-400">3 properties · 84 staff</p>
            </div>
          </div>
          <div className="h-7 w-7 rounded-full bg-pink-50 flex items-center justify-center">
            <span className="text-[9px] font-bold text-pink-600">HR</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2.5" style={{ background: "rgba(190,24,93,0.06)" }}>
            <p className="text-[8px] text-gray-400 mb-0.5">Total Staff</p>
            <p className="text-lg font-bold text-gray-900 leading-none">{totalStaff}</p>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: "rgba(190,24,93,0.06)" }}>
            <p className="text-[8px] text-gray-400 mb-0.5">On Shift</p>
            <p className="text-lg font-bold text-gray-900 leading-none">{onShift}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-3 pt-3 flex gap-1">
        {[
          { id: "roster" as const, label: "Roster" },
          { id: "leave" as const, label: "Leave", badge: 2 },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex-1 rounded-xl py-2 text-[10px] font-semibold transition ${activeTab === t.id ? "text-white" : "text-gray-500 bg-gray-100"}`}
            style={activeTab === t.id ? { background: "#be185d" } : {}}>
            {t.label}
            {"badge" in t && <span className="ml-1 text-[8px] bg-white/20 px-1.5 rounded-full">{t.badge}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === "roster" && (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-gray-700 mb-1">Today&apos;s Shifts</p>
            {shifts.map(s => (
              <div key={s.dept} className="rounded-xl bg-white border border-black/[0.06] p-3" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-900">{s.dept}</span>
                  <span className="text-[8px] text-gray-400">{s.time}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {s.staff.map(name => (
                    <span key={name} className="text-[8px] px-2 py-1 rounded-full font-medium"
                      style={{ background: s.color + "12", color: s.color }}>{name}</span>
                  ))}
                </div>
              </div>
            ))}
            <div className="rounded-xl p-3 mt-2" style={{ background: "rgba(190,24,93,0.06)" }}>
              <p className="text-[9px] font-semibold text-gray-700 mb-1">Weekly Summary</p>
              <p className="text-[8px] text-gray-500">Week of 9–15 Jun · All shifts covered · 2 pending approvals</p>
            </div>
          </div>
        )}

        {activeTab === "leave" && (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-gray-700 mb-1">Pending Requests</p>
            {leaveRequests.map((req, i) => (
              <div key={req.name} className="rounded-xl bg-white border border-black/[0.06] p-3" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-pink-100 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-pink-600">{req.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-900">{req.name}</p>
                      <p className="text-[8px] text-gray-400">{req.dept}</p>
                    </div>
                  </div>
                  <span className="text-[8px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{req.type}</span>
                </div>
                <p className="text-[9px] text-gray-500 mb-2">{req.dates}</p>
                {i === 0 && !leaveApproved ? (
                  <button onClick={() => setLeaveApproved(true)}
                    className="w-full rounded-lg py-2 text-[10px] font-semibold text-white"
                    style={{ background: "#be185d" }}>Approve</button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    ✓ Approved
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="px-4 py-2 bg-white border-t border-black/[0.06] flex items-center justify-around">
        {[
          { icon: "◫", label: "Roster" },
          { icon: "👤", label: "Staff" },
          { icon: "📋", label: "Leave" },
          { icon: "💰", label: "Payroll" },
        ].map((item, i) => (
          <button key={item.label} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "text-pink-600" : "text-gray-400"}`}>
            <span className="text-[13px]">{item.icon}</span>
            <span className="text-[7px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ServiceDeskDemo() {
  const [activeView, setActiveView] = useState<"board" | "client">("board");
  const [escalated, setEscalated] = useState(false);
  const [slaSeconds, setSlaSeconds] = useState(7240);
  const openTickets = useCounter(28, 800, 400);
  const resolvedToday = useCounter(14, 700, 500);

  useEffect(() => {
    const id = setInterval(() => setSlaSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);

  const formatSLA = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const tickets = [
    { id: "TK-441", title: "AC not cooling — Suite 204", client: "Greenfield", priority: "high", sla: "2h 14m", status: "Open" },
    { id: "TK-438", title: "Lift service overdue", client: "Greenfield", priority: "high", sla: formatSLA(slaSeconds), status: "Assigned" },
    { id: "TK-442", title: "Lobby light fitting broken", client: "Marina Ct", priority: "medium", sla: "8h 30m", status: "Open" },
    { id: "TK-435", title: "Generator service", client: "Marina Ct", priority: "medium", sla: "12h 00m", status: "In Progress" },
  ];

  const clientTickets = [
    { id: "TK-441", title: "AC not cooling — Suite 204", status: "Open", priority: "High", update: "Technician assigned — en route" },
    { id: "TK-438", title: "Lift service overdue", status: "In Progress", priority: "High", update: "Engineer on site, ETA 2hrs" },
    { id: "TK-431", title: "Water pump replaced", status: "Resolved", priority: "Low", update: "Resolved and tested" },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50" style={{ fontFamily: "ui-sans-serif,system-ui,sans-serif" }}>
      {/* Header */}
      <div className="px-4 pt-2 pb-3 bg-white border-b border-black/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(180,83,9,0.12)" }}>
              <span className="text-[9px] font-bold" style={{ color: "#b45309" }}>SD</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-900">ServiceDesk</p>
              <p className="text-[8px] text-gray-400">12 properties</p>
            </div>
          </div>
          <div className="h-7 w-7 rounded-full bg-amber-50 flex items-center justify-center">
            <span className="text-[9px] font-bold text-amber-600">OP</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2.5" style={{ background: "rgba(180,83,9,0.06)" }}>
            <p className="text-[8px] text-gray-400 mb-0.5">Open</p>
            <p className="text-lg font-bold text-gray-900 leading-none">{openTickets}</p>
          </div>
          <div className="rounded-xl p-2.5" style={{ background: "rgba(180,83,9,0.06)" }}>
            <p className="text-[8px] text-gray-400 mb-0.5">Resolved</p>
            <p className="text-lg font-bold text-gray-900 leading-none">{resolvedToday}</p>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="px-3 pt-3 flex gap-1">
        {[
          { id: "board" as const, label: "Ops View" },
          { id: "client" as const, label: "Client Portal" },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveView(t.id)}
            className={`flex-1 rounded-xl py-2 text-[10px] font-semibold transition ${activeView === t.id ? "text-white" : "text-gray-500 bg-gray-100"}`}
            style={activeView === t.id ? { background: "#b45309" } : {}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeView === "board" && (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-gray-700 mb-1">Active Tickets</p>
            {tickets.map(tk => (
              <div key={tk.id} className={`rounded-xl bg-white border p-3 ${tk.id === "TK-438" ? "border-red-200 bg-red-50/30" : "border-black/[0.06]"}`}
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-mono text-gray-400">{tk.id}</span>
                  <span className={`text-[7px] px-1.5 py-0.5 rounded font-semibold ${tk.priority === "high" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>
                    {tk.priority}
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-gray-900 mb-1">{tk.title}</p>
                <p className="text-[8px] text-gray-400 mb-2">{tk.client}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${tk.id === "TK-438" ? "bg-red-400 animate-pulse" : "bg-amber-400"}`} />
                    <span className={`text-[8px] font-semibold ${tk.id === "TK-438" ? "text-red-600" : "text-amber-700"}`}>SLA: {tk.sla}</span>
                  </div>
                  {tk.id === "TK-438" && !escalated && (
                    <button onClick={() => setEscalated(true)}
                      className="text-[8px] font-bold px-2 py-1 rounded-lg text-white"
                      style={{ background: "#b45309" }}>Escalate</button>
                  )}
                  {tk.id === "TK-438" && escalated && (
                    <span className="text-[8px] font-bold text-red-600">⚡ Escalated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === "client" && (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-gray-700 mb-1">Greenfield Towers</p>
            {clientTickets.map(tk => (
              <div key={tk.id} className="rounded-xl bg-white border border-black/[0.06] p-3" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-mono text-gray-400">{tk.id}</span>
                  <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-semibold border ${tk.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : tk.status === "In Progress" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                    {tk.status}
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-gray-900 mb-1">{tk.title}</p>
                <p className="text-[8px] text-gray-500 leading-relaxed">{tk.update}</p>
              </div>
            ))}
            <p className="text-[8px] text-gray-400 text-center mt-1">Clients see live status without calling</p>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="px-4 py-2 bg-white border-t border-black/[0.06] flex items-center justify-around">
        {[
          { icon: "◫", label: "Tickets" },
          { icon: "🏢", label: "Clients" },
          { icon: "🔧", label: "Vendors" },
          { icon: "📊", label: "Reports" },
        ].map((item, i) => (
          <button key={item.label} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "text-amber-600" : "text-gray-400"}`}>
            <span className="text-[13px]">{item.icon}</span>
            <span className="text-[7px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
