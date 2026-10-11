"use client";
import { useState } from "react";
import { ArrowLeft, ChevronRight, Plus, Download } from "lucide-react";
import { DemoShell, Stats, Badge, Empty, exportSample } from "./DemoShell";
import {
  SalesBoard,
  RosterBoard,
  ServicePortal,
  LeadWorkflow,
} from "./OfficeScreens";
type Kind = "crm" | "staff" | "tickets";
interface Entry {
  id: number;
  name: string;
  context: string;
  value: number;
  stage: string;
  owner: string;
  notes: string[];
  covered: boolean;
}
const configs = {
  crm: {
    name: "PipelineDesk",
    subtitle: "Sales CRM",
    accent: "#4f46e5",
    tabs: ["Pipeline", "Leads", "Properties", "Reports"],
    stages: ["New enquiry", "Site visit", "Negotiation", "Won"],
    seed: [
      {
        id: 1,
        name: "Adaeze O.",
        context: "3-bed · Lekki Phase 1",
        value: 85,
        stage: "New enquiry",
        owner: "Tomi",
        notes: ["Prefers ground floor."],
        covered: false,
      },
      {
        id: 2,
        name: "Kunle B.",
        context: "Land · Ibeju-Lekki",
        value: 22,
        stage: "New enquiry",
        owner: "Tomi",
        notes: ["Follow up on survey documents."],
        covered: false,
      },
      {
        id: 3,
        name: "Emeka D.",
        context: "2-bed · Banana Island",
        value: 120,
        stage: "Site visit",
        owner: "Amaka",
        notes: ["Viewing requested for Friday."],
        covered: false,
      },
      {
        id: 4,
        name: "Fatima S.",
        context: "4-bed · Maitama",
        value: 95,
        stage: "Negotiation",
        owner: "Amaka",
        notes: ["Offer awaiting review."],
        covered: false,
      },
    ],
  },
  staff: {
    name: "StaffHub",
    subtitle: "Team & leave management",
    accent: "#be185d",
    tabs: ["Roster", "Requests", "Team", "Reports"],
    stages: ["Pending", "Approved", "Declined"],
    seed: [
      {
        id: 1,
        name: "Amaka N.",
        context: "Front desk · Morning shift",
        value: 1,
        stage: "Pending",
        owner: "Supervisor",
        notes: ["Annual leave requested. Cover needed before approval."],
        covered: false,
      },
      {
        id: 2,
        name: "James O.",
        context: "Housekeeping · Evening shift",
        value: 2,
        stage: "Approved",
        owner: "Supervisor",
        notes: ["Sample leave approved with replacement."],
        covered: true,
      },
      {
        id: 3,
        name: "Lola A.",
        context: "Kitchen · Morning shift",
        value: 1,
        stage: "Pending",
        owner: "Supervisor",
        notes: ["Personal leave requested."],
        covered: false,
      },
    ],
  },
  tickets: {
    name: "ServiceDesk",
    subtitle: "Facilities & service requests",
    accent: "#b45309",
    tabs: ["Tickets", "Assigned", "Clients", "Reports"],
    stages: ["Open", "Assigned", "In progress", "Resolved"],
    seed: [
      {
        id: 1,
        name: "Cooling fault · Suite 204",
        context: "Lakeside Offices",
        value: 1,
        stage: "Open",
        owner: "Unassigned",
        notes: ["Cooling unit reported offline."],
        covered: false,
      },
      {
        id: 2,
        name: "Access reader · Reception",
        context: "Park View Apartments",
        value: 2,
        stage: "Assigned",
        owner: "Daniel",
        notes: ["Sample inspection slot booked."],
        covered: false,
      },
      {
        id: 3,
        name: "Lighting · East corridor",
        context: "Lakeside Offices",
        value: 3,
        stage: "In progress",
        owner: "Tomi",
        notes: ["Replacement parts ready."],
        covered: false,
      },
    ],
  },
} satisfies Record<
  Kind,
  {
    name: string;
    subtitle: string;
    accent: string;
    tabs: string[];
    stages: string[];
    seed: Entry[];
  }
>;
export default function OfficeWorkspace({ kind }: { kind: Kind }) {
  const c = configs[kind];
  const [entries, setEntries] = useState<Entry[]>(() =>
    c.seed.map((e) => ({ ...e, notes: [...e.notes] })),
  );
  const [tab, setTab] = useState("main"),
    [selected, setSelected] = useState<number | null>(null),
    [search, setSearch] = useState(""),
    [filter, setFilter] = useState("All"),
    [note, setNote] = useState("");
  const [message, setMessage] = useState(""),
    [history, setHistory] = useState<string[]>([]),
    [deleting, setDeleting] = useState(false),
    [removed, setRemoved] = useState<Entry | null>(null),
    [adding, setAdding] = useState(false);
  const [epoch, setEpoch] = useState(0),
    [resolution, setResolution] = useState(false);
  const [hours, setHours] = useState(0);
  const [draft, setDraft] = useState({
    name: "",
    context: "",
    value: "1",
    owner: "Tomi",
  });
  const item = entries.find((e) => e.id === selected),
    ids = ["main", "second", "third", "reports"];
  const noun =
    kind === "crm" ? "lead" : kind === "staff" ? "leave request" : "ticket";
  function log(text: string) {
    setMessage(text);
    setHistory((h) => [text, ...h]);
  }
  function nav(id: string) {
    setTab(id);
    setSelected(null);
    setAdding(false);
    setDeleting(false);
    setSearch("");
    setFilter("All");
    setNote("");
  }
  function update(value: Partial<Entry>) {
    setEntries((es) =>
      es.map((e) => (e.id === selected ? { ...e, ...value } : e)),
    );
  }
  function reset() {
    setHours(0);
    setEpoch((n) => n + 1);
    setEntries(c.seed.map((e) => ({ ...e, notes: [...e.notes] })));
    nav("main");
    setHistory([]);
    setRemoved(null);
    setMessage("Sample workspace restored.");
  }
  function stage(next: string) {
    if (!item) return;
    if (
      kind === "crm" &&
      next === "Site visit" &&
      !item.notes.some((n) => n.startsWith("Visit:"))
    ) {
      log("Schedule a site visit before entering this stage.");
      return;
    }
    if (
      kind === "crm" &&
      (next === "Negotiation" || next === "Won") &&
      !item.notes.some((n) => n.startsWith("Offer:"))
    ) {
      log("Record an offer before progressing to negotiation or won.");
      return;
    }
    if (
      kind === "staff" &&
      next === "Approved" &&
      entries.some(
        (e) =>
          e.id !== item.id &&
          e.stage === "Approved" &&
          e.covered &&
          e.context.includes(
            item.context.includes("Morning") ? "Morning" : "Evening",
          ),
      )
    ) {
      log("Cover conflict: the sample replacement already covers this shift.");
      return;
    }
    if (kind === "staff" && next === "Approved" && !item.covered) {
      log("Cover conflict: assign a replacement before approving this leave.");
      return;
    }
    if (
      kind === "tickets" &&
      next === "Assigned" &&
      item.owner === "Unassigned"
    ) {
      log("Assign a technician before entering the assigned stage.");
      return;
    }
    if (
      kind === "tickets" &&
      ["In progress", "Resolved"].includes(next) &&
      !item.covered
    ) {
      log(
        "The assigned vendor must acknowledge the brief before work progresses.",
      );
      return;
    }
    if (
      kind === "tickets" &&
      next === "Resolved" &&
      !item.notes.some((n) => n.startsWith("Resolution:"))
    ) {
      log("Add a resolution note before closing the ticket.");
      return;
    }
    update({ stage: next });
    log(`${item.name}: ${next}.`);
  }
  const visible = entries.filter(
    (e) =>
      (filter === "All" || e.stage === filter || e.context === filter) &&
      `${e.name} ${e.context}`.toLowerCase().includes(search.toLowerCase()) &&
      (kind !== "tickets" || tab !== "second" || e.owner !== "Unassigned"),
  );
  const stats =
    kind === "crm"
      ? [
          { label: "Sample leads", value: entries.length },
          {
            label: "Pipeline value",
            value: "₦" + entries.reduce((n, e) => n + e.value, 0) + "M",
          },
          {
            label: "Won",
            value: entries.filter((e) => e.stage === "Won").length,
          },
        ]
      : kind === "staff"
        ? [
            { label: "Requests", value: entries.length },
            {
              label: "Pending",
              value: entries.filter((e) => e.stage === "Pending").length,
            },
            {
              label: "Approved",
              value: entries.filter((e) => e.stage === "Approved").length,
            },
          ]
        : [
            { label: "Sample tickets", value: entries.length },
            {
              label: "Unassigned",
              value: entries.filter((e) => e.owner === "Unassigned").length,
            },
            {
              label: "Resolved",
              value: entries.filter((e) => e.stage === "Resolved").length,
            },
          ];
  function add() {
    const value = Number(draft.value);
    if (
      !draft.name.trim() ||
      !draft.context.trim() ||
      !Number.isFinite(value) ||
      value <= 0 ||
      (kind !== "crm" && !Number.isInteger(value)) ||
      (kind === "tickets" && value > 3)
    ) {
      log("Enter a name, context and positive value.");
      return;
    }
    const id = Math.max(0, ...entries.map((e) => e.id)) + 1;
    setEntries((es) => [
      ...es,
      {
        id,
        name: draft.name.trim(),
        context: draft.context.trim(),
        value,
        owner: draft.owner,
        stage: c.stages[0],
        notes: ["Created in the sample workspace."],
        covered: false,
      },
    ]);
    setAdding(false);
    setSelected(id);
    log("Added " + noun + ".");
  }
  return (
    <DemoShell
      name={c.name}
      subtitle={c.subtitle}
      accent={c.accent}
      phone
      tabs={c.tabs.map((label, i) => ({ id: ids[i], label }))}
      active={tab}
      onTab={nav}
      onReset={reset}
      notice="sample records"
    >
      {message && (
        <p role="status" className="demo-notice">
          {message}
          {removed && (
            <button
              className="demo-secondary"
              onClick={() => {
                setEntries((es) => [...es, removed]);
                setRemoved(null);
                log("Sample record restored.");
              }}
            >
              Undo delete
            </button>
          )}
        </p>
      )}
      {kind === "staff" && (
        <div hidden={tab !== "main" || !!item || adding}>
          <RosterBoard key={epoch} entries={entries} log={log} />
        </div>
      )}
      {adding ? (
        <div className="demo-card">
          <h4>Add {noun}</h4>
          <label className="demo-label">
            Name
            <input
              className="demo-input"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              maxLength={80}
            />
          </label>
          <label className="demo-label">
            {kind === "crm"
              ? "Property"
              : kind === "staff"
                ? "Team / shift"
                : "Client / location"}
            <input
              className="demo-input"
              value={draft.context}
              onChange={(e) => setDraft({ ...draft, context: e.target.value })}
              maxLength={80}
            />
          </label>
          <label className="demo-label">
            {kind === "crm"
              ? "Value (₦ millions)"
              : kind === "staff"
                ? "Leave days"
                : "Priority (1–3)"}
            <input
              className="demo-input"
              type="number"
              min="1"
              value={draft.value}
              onChange={(e) => setDraft({ ...draft, value: e.target.value })}
            />
          </label>
          <div className="demo-actions">
            <button className="demo-primary" onClick={add}>
              Create {noun}
            </button>
            <button className="demo-secondary" onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : item ? (
        <>
          <button
            className="demo-secondary"
            onClick={() => {
              setSelected(null);
              setDeleting(false);
              setNote("");
            }}
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <div className="demo-card" style={{ marginTop: 12 }}>
            <Badge
              tone={
                item.stage === "Approved" ||
                item.stage === "Resolved" ||
                item.stage === "Won"
                  ? "good"
                  : "warn"
              }
            >
              {item.stage}
            </Badge>
            <h4 style={{ marginTop: 12 }}>{item.name}</h4>
            <p>{item.context}</p>
            <p>
              {kind === "crm"
                ? `₦${item.value}M sample value`
                : kind === "staff"
                  ? `${item.value} day(s) requested`
                  : `Priority ${item.value}`}
            </p>
            {kind === "tickets" && (
              <div className="demo-notice">
                <p>
                  Sample SLA: {item.value === 1 ? 4 : 24} hours · elapsed{" "}
                  {hours} hours ·{" "}
                  {hours >= (item.value === 1 ? 4 : 24)
                    ? "Escalated to service manager"
                    : hours >= (item.value === 1 ? 4 : 24) * 0.75
                      ? "75% threshold: supervisor notified"
                      : "Within response window"}
                </p>
                <button
                  className="demo-secondary"
                  disabled={item.stage === "Resolved"}
                  onClick={() => {
                    setHours((h) => h + 1);
                    log("Sample service clock advanced by one hour.");
                  }}
                >
                  Advance sample clock +1h
                </button>
                <p>
                  Vendor brief: {item.context}, priority {item.value}, issue{" "}
                  {item.name}. Assign a technician, record the repair, then
                  resolve.
                </p>
              </div>
            )}
            <label className="demo-label">
              {kind === "staff" ? "Reviewer" : "Assigned to"}
              <select
                className="demo-input"
                value={item.owner}
                onChange={(e) => {
                  update({ owner: e.target.value });
                  log("Assignment updated.");
                }}
              >
                {Array.from(
                  new Set([
                    item.owner,
                    "Tomi",
                    "Amaka",
                    "Daniel",
                    kind === "staff" ? "Supervisor" : "Unassigned",
                  ]),
                ).map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            {kind === "staff" ? (
              <>
                <label className="demo-label">
                  <input
                    type="checkbox"
                    checked={item.covered}
                    disabled={item.stage === "Approved"}
                    onChange={(e) => update({ covered: e.target.checked })}
                  />{" "}
                  Replacement cover confirmed
                </label>
                <div className="demo-actions">
                  <button
                    className="demo-primary"
                    disabled={item.stage === "Approved"}
                    onClick={() => stage("Approved")}
                  >
                    Approve leave
                  </button>
                  <button
                    className="demo-secondary"
                    disabled={
                      item.stage === "Declined" || item.stage === "Approved"
                    }
                    onClick={() => stage("Declined")}
                  >
                    Decline
                  </button>
                </div>
              </>
            ) : (
              <label className="demo-label">
                Stage
                <select
                  className="demo-input"
                  value={item.stage}
                  onChange={(e) => stage(e.target.value)}
                >
                  {c.stages.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            )}
            {kind === "tickets" && item.owner !== "Unassigned" && (
              <label className="demo-label">
                <input
                  type="checkbox"
                  checked={item.covered}
                  onChange={(e) => {
                    update({ covered: e.target.checked });
                    log(
                      e.target.checked
                        ? "Sample vendor acknowledged the job brief."
                        : "Vendor acknowledgement cleared.",
                    );
                  }}
                />{" "}
                Vendor acknowledged the brief
              </label>
            )}
            <div className="demo-actions">
              <button className="demo-danger" onClick={() => setDeleting(true)}>
                Delete {noun}
              </button>
            </div>
            {deleting && (
              <div className="demo-notice">
                <p>Delete this sample {noun}?</p>
                <div className="demo-actions">
                  <button
                    className="demo-danger"
                    onClick={() => {
                      setRemoved(item);
                      setEntries((es) => es.filter((e) => e.id !== item.id));
                      setSelected(null);
                      setDeleting(false);
                      log("Deleted sample " + noun + ".");
                    }}
                  >
                    Confirm delete
                  </button>
                  <button
                    className="demo-secondary"
                    onClick={() => setDeleting(false)}
                  >
                    Keep record
                  </button>
                </div>
              </div>
            )}
          </div>
          {kind === "crm" && (
            <LeadWorkflow
              key={item.id}
              entry={item}
              log={log}
              onNote={(text) => {
                update({ notes: [...item.notes, text] });
                log(text);
              }}
            />
          )}
          <div className="demo-card">
            <h4>
              {kind === "tickets"
                ? "Activity & resolution"
                : "Activity & notes"}
            </h4>
            <ul className="demo-history">
              {item.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
            {kind === "tickets" && (
              <label className="demo-label">
                <input
                  type="checkbox"
                  checked={resolution}
                  onChange={(e) => setResolution(e.target.checked)}
                />{" "}
                This is a completed repair / resolution, not just an update
              </label>
            )}
            <label className="demo-label">
              {kind === "tickets"
                ? "Work performed, materials / cost and completion reference"
                : "Add a note"}
              <textarea
                className="demo-input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                maxLength={400}
                placeholder={
                  kind === "tickets"
                    ? "Describe the repair or update…"
                    : "Record a useful follow-up…"
                }
              />
            </label>
            <button
              className="demo-primary"
              onClick={() => {
                if (!note.trim()) {
                  log("Enter a note first.");
                  return;
                }
                update({
                  notes: [
                    ...item.notes,
                    (kind === "tickets"
                      ? resolution
                        ? "Resolution: "
                        : "Update: "
                      : "") + note.trim(),
                  ],
                });
                setNote("");
                log("Note saved to this record.");
              }}
            >
              Save note
            </button>
          </div>
        </>
      ) : tab === "reports" ? (
        <>
          <Stats items={stats} />
          <div className="demo-card">
            <h4>By status</h4>
            {c.stages.map((s) => (
              <button
                className="demo-row"
                key={s}
                onClick={() => {
                  nav("main");
                  setFilter(s);
                }}
              >
                <span className="demo-row-main">
                  <strong>{s}</strong>
                </span>
                <Badge>{entries.filter((e) => e.stage === s).length}</Badge>
                <ChevronRight size={14} />
              </button>
            ))}
            <button
              className="demo-secondary"
              onClick={() => {
                exportSample(
                  c.name,
                  ["Name", "Context", "Value", "Status", "Owner"],
                  entries.map((e) => [
                    e.name,
                    e.context,
                    e.value,
                    e.stage,
                    e.owner,
                  ]),
                );
                log("Downloaded the current sample report.");
              }}
            >
              <Download size={14} />
              Export sample CSV
            </button>
          </div>
          <div className="demo-card">
            <h4>Action history</h4>
            {history.length ? (
              <ul className="demo-history">
                {history.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            ) : (
              <Empty>No actions yet. Try a record or approval.</Empty>
            )}
          </div>
        </>
      ) : tab === "main" && kind === "crm" ? (
        <>
          <Stats items={stats} />
          <SalesBoard entries={entries} onOpen={setSelected} />
        </>
      ) : tab === "main" && kind === "staff" ? null : tab === "third" &&
        kind === "tickets" ? (
        <ServicePortal entries={entries} onOpen={setSelected} />
      ) : tab === "third" ? (
        <>
          <div className="demo-toolbar">
            <h4>{c.tabs[2]}</h4>
          </div>
          {Array.from(
            new Set(
              entries.map((e) => (kind === "staff" ? e.name : e.context)),
            ),
          ).map((group) => (
            <button
              className="demo-row"
              key={group}
              onClick={() => {
                if (kind === "staff") {
                  setSelected(entries.find((e) => e.name === group)!.id);
                } else {
                  setTab("main");
                  setFilter(group);
                }
              }}
            >
              <span className="demo-avatar">
                {group.slice(0, 2).toUpperCase()}
              </span>
              <span className="demo-row-main">
                <strong>{group}</strong>
                <small>
                  {kind === "staff"
                    ? "View shift and leave request"
                    : kind === "crm"
                      ? entries.some(
                          (e) => e.context === group && e.stage === "Won",
                        )
                        ? "Sold · view sale history"
                        : entries.some(
                              (e) =>
                                e.context === group &&
                                e.stage === "Negotiation",
                            )
                          ? "Under offer · review negotiations"
                          : "Available · view linked leads"
                      : "View linked requests"}
                </small>
              </span>
              <ChevronRight size={14} />
            </button>
          ))}
          {entries.length === 0 && (
            <Empty>Add a record to populate this directory.</Empty>
          )}
        </>
      ) : (
        <>
          <Stats items={stats} />
          <div className="demo-toolbar">
            <h4>{c.tabs[ids.indexOf(tab)]}</h4>
            <button
              className="demo-primary"
              onClick={() => {
                setAdding(true);
                setDraft({ name: "", context: "", value: "1", owner: "Tomi" });
              }}
            >
              <Plus size={13} />
              Add
            </button>
          </div>
          <label className="demo-label">
            Search
            <input
              className="demo-input"
              aria-label={`Search ${c.name}`}
              placeholder="Find a record…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <select
            className="demo-input"
            aria-label="Filter status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            {[
              ...c.stages,
              ...Array.from(new Set(entries.map((e) => e.context))),
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <div style={{ marginTop: 14 }}>
            {visible.map((e) => (
              <button
                className="demo-row"
                key={e.id}
                onClick={() => {
                  setSelected(e.id);
                  setNote("");
                }}
              >
                <span className="demo-avatar">
                  {e.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="demo-row-main">
                  <strong>{e.name}</strong>
                  <small>{e.context}</small>
                  <Badge
                    tone={
                      e.stage === "Approved" ||
                      e.stage === "Resolved" ||
                      e.stage === "Won"
                        ? "good"
                        : "warn"
                    }
                  >
                    {e.stage}
                  </Badge>
                  {kind === "staff" && (
                    <small>
                      {e.stage === "Approved"
                        ? "Replacement covering · requester on leave"
                        : e.covered
                          ? "Cover confirmed"
                          : "Cover required"}
                    </small>
                  )}
                </span>
                {kind === "crm" ? (
                  <strong style={{ color: c.accent, fontSize: 12 }}>
                    ₦{e.value}M
                  </strong>
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
            ))}
          </div>
          {!visible.length && (
            <Empty>
              No matching records. Change the filter or add a sample.
            </Empty>
          )}
        </>
      )}
    </DemoShell>
  );
}
