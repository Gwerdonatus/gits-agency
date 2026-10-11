"use client";
import { useState } from "react";
import { DemoShell, Stats, Badge, exportSample } from "./DemoShell";
type Kind = "payment" | "logistics" | "booking";
interface RecordItem {
  id: number;
  name: string;
  status: string;
  selection: string;
  amount: number;
  refunded: number;
  accepted: boolean;
}
const settings = {
  payment: {
    name: "Zova",
    accent: "#0369a1",
    subtitle: "Checkout · reconciliation · refunds",
    tabs: ["Checkout", "Events", "Finance", "Activity"],
    stages: ["Pending", "Paid"],
  },
  logistics: {
    name: "SwiftHaul",
    accent: "#b45309",
    subtitle: "Dispatch · tracking · customer updates",
    tabs: ["Dispatch", "Tracking", "Updates", "Activity"],
    stages: ["Pending", "Assigned", "Collected", "In transit", "Delivered"],
  },
  booking: {
    name: "PulseClinic",
    accent: "#059669",
    subtitle: "Booking · payment · attendance",
    tabs: ["Bookings", "CRM", "Finance", "Activity"],
    stages: ["Pending", "Confirmed", "Paid", "Attended", "Invoiced"],
  },
};
export default function ConnectedProduct({ kind }: { kind: Kind }) {
  const c = settings[kind],
    defaultSelection =
      kind === "payment"
        ? "Card · Paystack"
        : kind === "logistics"
          ? "Ada · Van 02 · 1.2 km"
          : "Tuesday · 10:00";
  const seed: RecordItem = {
    id: 1,
    name:
      kind === "payment"
        ? "Sample order"
        : kind === "logistics"
          ? "Wuse → Garki · 3 parcels"
          : "Sample client consultation",
    status: "Pending",
    selection: defaultSelection,
    amount: kind === "payment" ? 24500 : kind === "booking" ? 15000 : 3500,
    refunded: 0,
    accepted: false,
  };
  const [records, setRecords] = useState([seed]),
    [id, setId] = useState(1),
    [tab, setTab] = useState("records"),
    [message, setMessage] = useState(""),
    [events, setEvents] = useState<string[]>([]),
    [failed, setFailed] = useState(false),
    [invalid, setInvalid] = useState(false),
    [proof, setProof] = useState(""),
    [refund, setRefund] = useState("24500"),
    [confirmRefund, setConfirmRefund] = useState(false);
  const item = records.find((r) => r.id === id) ?? records[0],
    ids = ["records", "second", "third", "activity"];
  function log(s: string) {
    setMessage(s);
    setEvents((e) => [s, ...e]);
  }
  function update(v: Partial<RecordItem>) {
    setRecords((rs) => rs.map((r) => (r.id === item.id ? { ...r, ...v } : r)));
  }
  function advance() {
    const current = c.stages.indexOf(item.status),
      next = c.stages[current + 1];
    if (!next) {
      log("Duplicate ignored: this workflow is already complete.");
      return;
    }
    if (failed) {
      log(
        "Destination unavailable. Event remains pending; clear failure to retry.",
      );
      return;
    }
    if (kind === "payment" && invalid) {
      log(
        "Rejected: sample signature / amount check failed. Order remains unpaid.",
      );
      return;
    }
    if (
      kind === "logistics" &&
      next === "Assigned" &&
      records.some(
        (r) =>
          r.id !== item.id &&
          r.selection === item.selection &&
          !["Pending", "Delivered"].includes(r.status),
      )
    ) {
      log("Assignment blocked: this driver is already on another active job.");
      return;
    }
    if (kind === "logistics" && item.status === "Assigned" && !item.accepted) {
      log("Driver acknowledgement required before collection.");
      return;
    }
    if (kind === "logistics" && item.status === "In transit" && !proof.trim()) {
      log("Enter a delivery proof reference before closing this job.");
      return;
    }
    if (
      kind === "booking" &&
      next === "Confirmed" &&
      records.some(
        (r) =>
          r.id !== item.id &&
          r.selection === item.selection &&
          r.status !== "Pending",
      )
    ) {
      log(
        "Slot conflict: this appointment is already reserved. Select another slot.",
      );
      return;
    }
    update({ status: next });
    log(
      `#${item.id} → ${next}. ${kind === "payment" ? "Verified sample event applied once; payment ledger updated." : kind === "logistics" ? `Customer update queued · ${item.selection}${proof ? " · proof " + proof : ""}` : next === "Confirmed" ? "CRM intake created; confirmation and 24h / 2h reminders queued." : next === "Paid" ? "Sample payment receipt recorded." : next === "Attended" ? "Attendance recorded by staff." : "Sample invoice generated; follow-up queued."}`,
    );
  }
  function reset() {
    setRecords([seed]);
    setId(1);
    setTab("records");
    setMessage("Sample workspace restored.");
    setEvents([]);
    setFailed(false);
    setInvalid(false);
    setProof("");
    setConfirmRefund(false);
  }
  const selections =
    kind === "payment"
      ? [
          "Card · Paystack",
          "Bank transfer · Flutterwave",
          "USSD · Paystack",
          "International · PayPal",
        ]
      : kind === "logistics"
        ? ["Ada · Van 02 · 1.2 km", "Tomi · Van 07 · 3.8 km"]
        : ["Tuesday · 10:00", "Wednesday · 14:00", "Friday · 11:00"];
  const primary =
    kind === "payment"
      ? "Simulate verified payment"
      : kind === "logistics"
        ? {
            Pending: "Assign driver",
            Assigned: "Confirm collection",
            Collected: "Start journey",
            "In transit": "Confirm delivery",
            Delivered: "Workflow complete",
          }[item.status]
        : {
            Pending: "Confirm slot",
            Confirmed: "Record sample payment",
            Paid: "Mark attended",
            Attended: "Generate sample invoice",
            Invoiced: "Workflow complete",
          }[item.status];
  const controls = (
    <>
      <label className="demo-label">
        <input
          type="checkbox"
          checked={failed}
          onChange={(e) => setFailed(e.target.checked)}
        />{" "}
        Simulate destination outage
      </label>
      {kind === "payment" && (
        <label className="demo-label">
          <input
            type="checkbox"
            checked={invalid}
            onChange={(e) => setInvalid(e.target.checked)}
          />{" "}
          Invalid event signature / amount
        </label>
      )}
      <button className="demo-primary" onClick={advance}>
        {primary}
      </button>
      {kind === "logistics" && item.status === "Assigned" && (
        <button
          className="demo-secondary"
          disabled={item.accepted}
          onClick={() => {
            update({ accepted: true });
            log(
              `Driver accepted job #${item.id}. Customer sees the assignment.`,
            );
          }}
        >
          Driver accepts assignment
        </button>
      )}
      {kind === "logistics" && item.status === "In transit" && (
        <label className="demo-label">
          Delivery proof reference
          <input
            className="demo-input"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            maxLength={80}
          />
        </label>
      )}
    </>
  );
  return (
    <DemoShell
      name={c.name}
      subtitle={c.subtitle}
      accent={c.accent}
      tabs={c.tabs.map((label, i) => ({ id: ids[i], label }))}
      active={tab}
      onTab={setTab}
      onReset={reset}
      notice="simulated integrations · no external transactions"
    >
      <Stats
        items={[
          { label: "Records", value: records.length },
          {
            label: kind === "payment" ? "Paid orders" : "Completed",
            value: records.filter((r) => r.status === c.stages.at(-1)).length,
          },
          {
            label: kind === "payment" ? "Net receipts" : "Pending",
            value:
              kind === "payment"
                ? "₦" +
                  records
                    .filter((r) => r.status === "Paid")
                    .reduce((n, r) => n + r.amount - r.refunded, 0)
                    .toLocaleString()
                : records.filter((r) => r.status === "Pending").length,
          },
        ]}
      />
      {message && (
        <p className="demo-notice" role="status">
          {message}
        </p>
      )}
      <label className="demo-label">
        Active{" "}
        {kind === "payment"
          ? "order"
          : kind === "logistics"
            ? "delivery"
            : "booking"}
        <select
          className="demo-input"
          value={id}
          onChange={(e) => {
            setId(Number(e.target.value));
            setConfirmRefund(false);
            setProof("");
          }}
        >
          {records.map((r) => (
            <option value={r.id} key={r.id}>
              #{r.id} · {r.name} · {r.status}
            </option>
          ))}
        </select>
      </label>
      {tab === "records" ? (
        <>
          <div className="demo-card">
            <Badge tone={item.status === "Pending" ? "warn" : "good"}>
              {item.status}
            </Badge>
            <h4 style={{ marginTop: 12 }}>
              #{item.id} · {item.name}
            </h4>
            <p>
              ₦{item.amount.toLocaleString()} ·{" "}
              {kind === "booking"
                ? "fictional client; no medical records"
                : "sample record"}
            </p>
            <label className="demo-label">
              {kind === "payment"
                ? "Payment method & gateway"
                : kind === "logistics"
                  ? "Available driver · sample distance"
                  : "Available appointment slot"}
              <select
                className="demo-input"
                value={item.selection}
                disabled={item.status !== "Pending"}
                onChange={(e) => update({ selection: e.target.value })}
              >
                {selections.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            {kind === "logistics" && (
              <p className="demo-source">
                Ada is closest in this fictional route. Selecting a busy driver
                is blocked; the job follows acceptance, collection and delivery.
              </p>
            )}
            <div className="demo-actions">{controls}</div>
          </div>
          <button
            className="demo-secondary"
            onClick={() => {
              const next = Math.max(...records.map((r) => r.id)) + 1;
              setRecords((rs) => [...rs, { ...seed, id: next }]);
              setId(next);
              setProof("");
              log(`Draft #${next} created.`);
            }}
          >
            Create another sample{" "}
            {kind === "payment"
              ? "order"
              : kind === "logistics"
                ? "delivery"
                : "booking"}
          </button>
        </>
      ) : tab === "second" && kind === "payment" ? (
        <div className="demo-card">
          <h4>Normalized payment event</h4>
          <p>
            payment.test.{item.id} → Order #{item.id} → {item.status}
          </p>
          <p>
            Gateway: {item.selection} · expected amount ₦
            {item.amount.toLocaleString()}
          </p>
          <p>
            Event must match the sample signature, amount and order. Replays do
            not create a second receipt. Failed destinations can be retried.
          </p>
          {controls}
          <button className="demo-secondary" onClick={() => setTab("third")}>
            Inspect reconciliation
          </button>
        </div>
      ) : tab === "second" && kind === "logistics" ? (
        <div className="demo-card">
          <h4>Customer tracking view · SH-{item.id}</h4>
          <svg
            viewBox="0 0 320 140"
            role="img"
            aria-label="Illustrative Wuse to Garki route"
            style={{ width: "100%", background: "#edf4fa", borderRadius: 12 }}
          >
            <path
              d="M35 105L95 55L190 80L285 25"
              fill="none"
              stroke="#2563eb"
              strokeWidth="5"
              strokeDasharray="8 5"
            />
            <circle
              cx={
                item.status === "Delivered"
                  ? 285
                  : item.status === "In transit"
                    ? 190
                    : 35
              }
              cy={
                item.status === "Delivered"
                  ? 25
                  : item.status === "In transit"
                    ? 80
                    : 105
              }
              r="10"
              fill="#2563eb"
            />
            <text x="15" y="130" fontSize="12">
              Wuse
            </text>
            <text x="250" y="55" fontSize="12">
              Garki
            </text>
          </svg>
          <ol className="demo-steps">
            {c.stages.map((s) => (
              <li key={s} aria-current={s === item.status ? "step" : undefined}>
                {s}
              </li>
            ))}
          </ol>
          <p>
            {item.status === "Delivered"
              ? "Delivery complete · proof recorded"
              : item.status === "In transit"
                ? "Sample ETA: 25 minutes · not live GPS"
                : "Location and ETA become available once the driver starts the job."}
          </p>
          <button className="demo-primary" onClick={() => setTab("records")}>
            Open dispatch controls
          </button>
        </div>
      ) : tab === "second" ? (
        <div className="demo-card">
          <h4>CRM intake record</h4>
          <p>
            Client #{item.id} · appointment {item.selection}
          </p>
          <p>
            Stage:{" "}
            {item.status === "Pending"
              ? "Awaiting slot confirmation"
              : item.status}
          </p>
          <p>Source: booking form → client record → appointment → finance.</p>
          <h4>Message queue</h4>
          {[
            "Appointment confirmation",
            "24-hour reminder",
            "2-hour reminder",
            "Post-visit follow-up",
          ].map((s, i) => (
            <div className="demo-row" key={s}>
              <span className="demo-row-main">
                <strong>{s}</strong>
                <small>
                  {item.status === "Pending"
                    ? "Not queued"
                    : i === 3 && item.status !== "Invoiced"
                      ? "Waiting for completed visit"
                      : "Queued in sample outbox"}
                </small>
              </span>
            </div>
          ))}
          <button className="demo-secondary" onClick={() => setTab("records")}>
            Return to appointment
          </button>
        </div>
      ) : tab === "third" && kind === "logistics" ? (
        <div className="demo-card">
          <h4>Customer notification outbox</h4>
          {c.stages.slice(1).map((s, i) => (
            <div className="demo-row" key={s}>
              <span className="demo-row-main">
                <strong>{s} notification</strong>
                <small>
                  {c.stages.indexOf(item.status) > i
                    ? "Accepted by sample provider"
                    : "Waiting for status transition"}
                </small>
              </span>
            </div>
          ))}
          <p className="demo-source">
            Provider acceptance is not proof of customer delivery. No SMS,
            WhatsApp or map API is called.
          </p>
        </div>
      ) : tab === "third" ? (
        <div className="demo-card">
          <h4>
            {kind === "payment"
              ? "Receipt & refund ledger"
              : "Billing & invoice"}
          </h4>
          <p>Expected: ₦{item.amount.toLocaleString()}</p>
          <p>
            Received: ₦
            {(item.status === "Pending" ||
            (kind === "booking" && item.status === "Confirmed")
              ? 0
              : item.amount
            ).toLocaleString()}
          </p>
          {kind === "payment" ? (
            <>
              <p>
                Refunded: ₦{item.refunded.toLocaleString()} · remaining
                refundable ₦{(item.amount - item.refunded).toLocaleString()}
              </p>
              <label className="demo-label">
                Refund amount (₦)
                <input
                  className="demo-input"
                  type="number"
                  min="1"
                  value={refund}
                  onChange={(e) => setRefund(e.target.value)}
                />
              </label>
              <button
                className="demo-danger"
                disabled={
                  item.status !== "Paid" || item.refunded === item.amount
                }
                onClick={() => setConfirmRefund(true)}
              >
                Review sample refund
              </button>
              {confirmRefund && (
                <div className="demo-notice">
                  <p>
                    Simulate refund via {item.selection}? No money is moved.
                  </p>
                  <button
                    className="demo-danger"
                    onClick={() => {
                      const n = Number(refund);
                      if (
                        !Number.isFinite(n) ||
                        n <= 0 ||
                        n > item.amount - item.refunded
                      ) {
                        log(
                          "Refund blocked: enter an amount within the refundable balance.",
                        );
                        return;
                      }
                      update({ refunded: item.refunded + n });
                      setConfirmRefund(false);
                      log(
                        `Sample refund of ₦${n.toLocaleString()} recorded for #${item.id}; customer notification queued.`,
                      );
                    }}
                  >
                    Confirm simulated refund
                  </button>
                  <button
                    className="demo-secondary"
                    onClick={() => setConfirmRefund(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <p>
                Invoice:{" "}
                {item.status === "Invoiced"
                  ? `INV-${item.id} · issued in demo`
                  : "Not issued · attendance required"}
              </p>
              {controls}
            </>
          )}
          <div className="demo-actions">
            <button
              className="demo-secondary"
              onClick={() =>
                exportSample(
                  c.name + "-ledger",
                  ["ID", "Stage", "Gateway / slot", "Amount", "Refunded"],
                  records.map((r) => [
                    r.id,
                    r.status,
                    r.selection,
                    r.amount,
                    r.refunded,
                  ]),
                )
              }
            >
              Export ledger CSV
            </button>
          </div>
        </div>
      ) : (
        <div className="demo-card">
          <h4>Integration audit</h4>
          <ol className="demo-history">
            {events.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <p className="demo-source">
            Guided browser simulation, not connected APIs. Real integrations
            require signed webhooks, authentication, a durable queue and
            server-side permissions.
          </p>
          <button
            className="demo-secondary"
            onClick={() =>
              exportSample(
                c.name + "-events",
                ["Sequence", "Activity"],
                events.toReversed().map((s, i) => [i + 1, s]),
              )
            }
          >
            Export audit CSV
          </button>
        </div>
      )}
    </DemoShell>
  );
}
