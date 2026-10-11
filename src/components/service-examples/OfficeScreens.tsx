"use client";
import { useState } from "react";
import { Badge, Empty } from "./DemoShell";
export interface OfficeEntry {
  id: number;
  name: string;
  context: string;
  value: number;
  stage: string;
  owner: string;
  notes: string[];
  covered: boolean;
}
export function SalesBoard({
  entries,
  onOpen,
}: {
  entries: OfficeEntry[];
  onOpen: (id: number) => void;
}) {
  return (
    <>
      <div className="demo-card">
        <h4>Sales pipeline</h4>
        <p>
          Open a lead to schedule a visit, record an offer, and advance its
          stage. Won listings are no longer available.
        </p>
      </div>
      <div className="demo-kanban">
        {["New enquiry", "Site visit", "Negotiation", "Won"].map((stage) => (
          <section className="demo-card" key={stage}>
            <h4>
              {stage} · {entries.filter((e) => e.stage === stage).length}
            </h4>
            {entries
              .filter((e) => e.stage === stage)
              .map((e) => (
                <button
                  className="demo-row"
                  key={e.id}
                  onClick={() => onOpen(e.id)}
                >
                  <strong>{e.name}</strong>
                  <small>{e.context}</small>
                  <small>
                    {e.owner} · ₦{e.value}M
                  </small>
                </button>
              ))}
          </section>
        ))}
      </div>
    </>
  );
}
export function RosterBoard({
  entries,
  log,
}: {
  entries: OfficeEntry[];
  log: (s: string) => void;
}) {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      staff: "Amaka N.",
      site: "Victoria",
      shift: "Morning",
      checked: false,
    },
    {
      id: 2,
      staff: "James O.",
      site: "Central",
      shift: "Evening",
      checked: false,
    },
    {
      id: 3,
      staff: "Lola A.",
      site: "Airport",
      shift: "Morning",
      checked: false,
    },
  ]);
  const [person, setPerson] = useState("Tomi"),
    [site, setSite] = useState("Central"),
    [shift, setShift] = useState("Morning"),
    [published, setPublished] = useState(false);
  function add() {
    if (assignments.some((a) => a.staff === person && a.shift === shift)) {
      log("Roster conflict: this employee already has a shift at this time.");
      return;
    }
    if (entries.some((e) => e.name === person && e.stage === "Approved")) {
      log("Roster conflict: this employee is on approved leave.");
      return;
    }
    setAssignments((a) => [
      ...a,
      {
        id: Math.max(...a.map((v) => v.id)) + 1,
        staff: person,
        site,
        shift,
        checked: false,
      },
    ]);
    setPublished(false);
    log(`${person} assigned to ${site} · ${shift}. Draft roster updated.`);
  }
  return (
    <>
      <div className="demo-card">
        <Badge tone={published ? "good" : "warn"}>
          {published ? "Published" : "Draft roster"}
        </Badge>
        <h4 style={{ marginTop: 12 }}>Monday · sample shift roster</h4>
        <p>
          Leave decisions update cover below. Assignments reject overlapping
          shifts and approved leave.
        </p>
      </div>
      {assignments.map((a) => {
        const onLeave = entries.some(
          (e) => e.name === a.staff && e.stage === "Approved",
        );
        return (
          <div className="demo-card" key={a.id}>
            <h4>{onLeave ? "Daniel · replacement" : a.staff}</h4>
            <p>
              {a.site} property · {a.shift} shift
              {onLeave ? ` · covering ${a.staff}` : ""}
            </p>
            <Badge tone={a.checked ? "good" : "warn"}>
              {a.checked ? "Clocked in" : "Awaiting attendance"}
            </Badge>
            <div className="demo-actions">
              <button
                className="demo-secondary"
                disabled={a.checked || !published}
                onClick={() => {
                  setAssignments((old) =>
                    old.map((v) =>
                      v.id === a.id ? { ...v, checked: true } : v,
                    ),
                  );
                  log(
                    `Attendance recorded for ${onLeave ? "Daniel" : a.staff}.`,
                  );
                }}
              >
                Clock in
              </button>
              <button
                className="demo-danger"
                disabled={published}
                onClick={() => {
                  setAssignments((old) => old.filter((v) => v.id !== a.id));
                  log("Draft shift removed.");
                }}
              >
                Remove shift
              </button>
            </div>
          </div>
        );
      })}
      <div className="demo-card">
        <h4>Add a draft shift</h4>
        <label className="demo-label">
          Employee
          <select
            className="demo-input"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          >
            {["Tomi", "Amaka N.", "James O.", "Lola A."].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="demo-label">
          Property
          <select
            className="demo-input"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          >
            {["Central", "Victoria", "Airport"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="demo-label">
          Shift
          <select
            className="demo-input"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          >
            <option>Morning</option>
            <option>Evening</option>
          </select>
        </label>
        <div className="demo-actions">
          <button className="demo-secondary" onClick={add}>
            Assign shift
          </button>
          <button
            className="demo-primary"
            disabled={published || !assignments.length}
            onClick={() => {
              setPublished(true);
              log("Sample roster published. Attendance is now open.");
            }}
          >
            Publish roster
          </button>
          <button
            className="demo-secondary"
            disabled={!published}
            onClick={() => {
              setPublished(false);
              log("Roster returned to draft.");
            }}
          >
            Revise roster
          </button>
        </div>
        <p>
          {assignments.filter((a) => a.checked).length} shifts attended ·{" "}
          {assignments.filter((a) => a.checked).length * 8} sample hours
          recorded. Export/real payroll integrations are not connected.
        </p>
      </div>
    </>
  );
}
export function ServicePortal({
  entries,
  onOpen,
}: {
  entries: OfficeEntry[];
  onOpen: (id: number) => void;
}) {
  const clients = Array.from(new Set(entries.map((e) => e.context))),
    [client, setClient] = useState("Lakeside Offices");
  return (
    <>
      <div className="demo-card">
        <h4>Client portal preview</h4>
        <p>
          The sample client sees only the selected property’s requests and
          published updates, not other clients’ tickets.
        </p>
        <label className="demo-label">
          Viewing as client
          <select
            className="demo-input"
            value={clients.includes(client) ? client : (clients[0] ?? "")}
            onChange={(e) => setClient(e.target.value)}
          >
            {clients.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      {entries
        .filter(
          (e) => e.context === (clients.includes(client) ? client : clients[0]),
        )
        .map((e) => (
          <div className="demo-card" key={e.id}>
            <Badge tone={e.stage === "Resolved" ? "good" : "warn"}>
              {e.stage}
            </Badge>
            <h4 style={{ marginTop: 12 }}>{e.name}</h4>
            <p>Assigned technician: {e.owner}</p>
            <p>{e.notes.at(-1)}</p>
            <button className="demo-secondary" onClick={() => onOpen(e.id)}>
              Open service record
            </button>
          </div>
        ))}
      {!entries.length && <Empty>No client requests.</Empty>}
    </>
  );
}
export function LeadWorkflow({
  entry,
  onNote,
  log,
}: {
  entry: OfficeEntry;
  onNote: (s: string) => void;
  log: (s: string) => void;
}) {
  const [date, setDate] = useState("2026-10-15"),
    [offer, setOffer] = useState(String(entry.value)),
    [next, setNext] = useState("Call after viewing");
  return (
    <div className="demo-card">
      <h4>Viewing, offer & next action</h4>
      <label className="demo-label">
        Visit date
        <input
          className="demo-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button
        className="demo-secondary"
        onClick={() => {
          if (!date) {
            log("Choose a visit date.");
            return;
          }
          onNote(`Visit: ${date} at 10:00 · assigned ${entry.owner}`);
        }}
      >
        Schedule site visit
      </button>
      <label className="demo-label">
        Offer (₦ millions)
        <input
          className="demo-input"
          type="number"
          min="1"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
      </label>
      <button
        className="demo-secondary"
        onClick={() => {
          if (!Number.isFinite(Number(offer)) || Number(offer) <= 0) {
            log("Enter a positive offer.");
            return;
          }
          onNote(`Offer: ₦${offer}M · awaiting client decision`);
        }}
      >
        Record offer
      </button>
      <label className="demo-label">
        Follow-up task
        <input
          className="demo-input"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          maxLength={160}
        />
      </label>
      <button
        className="demo-secondary"
        onClick={() => {
          if (next.trim())
            onNote(`Follow-up: ${next.trim()} · owner ${entry.owner}`);
          else log("Enter a follow-up.");
        }}
      >
        Set next action
      </button>
    </div>
  );
}
