"use client";
import { useState } from "react";
import { DemoShell, Stats, Badge, Empty, exportSample } from "./DemoShell";
import {
  initialOperations,
  operate,
  type OperationKind,
  type Operation,
  type Asset,
  type WorkOrder,
} from "./operations-model";
const configuration = {
  stock: {
    name: "Medicore",
    accent: "#0A3D2E",
    subtitle: "Inventory · branch replenishment",
    tabs: ["Overview", "Inventory", "Dispatch", "Reports"],
  },
  construction: {
    name: "BuildCore",
    accent: "#431407",
    subtitle: "Site operations · procurement",
    tabs: ["Overview", "Projects", "Approvals", "Reports"],
  },
  factory: {
    name: "FactoryFlow",
    accent: "#1E1B4B",
    subtitle: "Materials · production · quality",
    tabs: ["Production", "Materials", "Quality", "Dispatch"],
  },
};
const cash = (n: number) => "₦" + n.toLocaleString();
export default function OperationsProduct({ kind }: { kind: OperationKind }) {
  const c = configuration[kind];
  const [state, setState] = useState(() => initialOperations(kind)),
    [tab, setTab] = useState("overview"),
    [selected, setSelected] = useState<number | null>(null),
    [orderId, setOrderId] = useState<number | null>(null),
    [query, setQuery] = useState(""),
    [filter, setFilter] = useState("All");
  const [form, setForm] = useState<"create" | "request" | "edit" | null>(null),
    [name, setName] = useState(""),
    [location, setLocation] = useState("Maitama"),
    [quantity, setQuantity] = useState("6"),
    [amount, setAmount] = useState("25000"),
    [note, setNote] = useState(""),
    [reference, setReference] = useState(""),
    [checks, setChecks] = useState<string[]>([]),
    [deleting, setDeleting] = useState(false);
  const asset = state.assets.find((a) => a.id === selected),
    order = state.orders.find((o) => o.id === orderId),
    ids = ["overview", "records", "workflow", "reports"];
  function run(action: Operation) {
    const next = operate(state, action, kind);
    setState(next);
    return next.audit !== state.audit;
  }
  function nav(id: string) {
    setTab(id);
    setSelected(null);
    setOrderId(null);
    setForm(null);
    setDeleting(false);
    setReference("");
    setChecks([]);
  }
  function reset() {
    setState(initialOperations(kind));
    nav("overview");
    setQuery("");
    setFilter("All");
  }
  function openAsset(a: Asset) {
    setSelected(a.id);
    setOrderId(null);
    setForm(null);
    setDeleting(false);
    setNote("");
  }
  function openOrder(o: WorkOrder) {
    setOrderId(o.id);
    setSelected(null);
    setForm(null);
    setReference("");
    setChecks(o.checks);
  }
  const active = state.orders.filter(
    (o) => !["Received", "Delivered", "Cancelled"].includes(o.status),
  );
  const committed = (id: number) =>
    state.orders
      .filter(
        (o) => o.assetId === id && ["Approved", "PO sent"].includes(o.status),
      )
      .reduce((n, o) => n + o.amount, 0);
  const stats =
    kind === "stock"
      ? [
          {
            label: "On-hand packs",
            value: state.assets.reduce((n, a) => n + a.quantity, 0),
          },
          {
            label: "In transit",
            value: state.orders
              .filter((o) => o.status === "Dispatched")
              .reduce((n, o) => n + o.quantity, 0),
          },
          { label: "Active transfers", value: active.length },
        ]
      : kind === "construction"
        ? [
            {
              label: "Active sites",
              value: state.assets.filter((a) => a.status !== "Complete").length,
            },
            {
              label: "Actual spend",
              value: cash(state.assets.reduce((n, a) => n + a.spent, 0)),
            },
            { label: "Open requests", value: active.length },
          ]
        : [
            { label: "Raw units", value: state.raw },
            {
              label: "In production",
              value: state.assets.filter((a) => a.status === "In production")
                .length,
            },
            {
              label: "Quality holds",
              value: state.assets.filter((a) => a.status === "On hold").length,
            },
          ];
  const assetRows = state.assets.filter(
    (a) =>
      `${a.name} ${a.location}`.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "All" || a.location === filter),
  );
  function request(a: Asset) {
    setForm("request");
    setName(
      kind === "stock"
        ? "Branch replenishment"
        : kind === "construction"
          ? "Materials request"
          : "Production run",
    );
    setQuantity(kind === "factory" ? String(a.quantity) : "6");
    setLocation(
      kind === "stock"
        ? a.location === "Maitama"
          ? "Garki"
          : "Maitama"
        : kind === "construction"
          ? a.location
          : "Abuja distributor",
    );
  }
  const orders = (items: WorkOrder[]) => (
    <>
      {items.map((o) => (
        <button className="demo-row" key={o.id} onClick={() => openOrder(o)}>
          <span className="demo-avatar">#{o.id}</span>
          <span className="demo-row-main">
            <strong>{o.title}</strong>
            <small>
              {state.assets.find((a) => a.id === o.assetId)?.name} →{" "}
              {o.destination}
            </small>
            <small>
              {kind === "construction" ? cash(o.amount) : `${o.quantity} units`}{" "}
              · {o.reference || "Reference pending"}
            </small>
          </span>
          <Badge
            tone={
              ["Received", "Delivered"].includes(o.status) ? "good" : "warn"
            }
          >
            {o.status}
          </Badge>
        </button>
      ))}
      {!items.length && <Empty>No records in this queue.</Empty>}
    </>
  );
  const audit = (
    <div className="demo-card">
      <h4>Movement & decision history</h4>
      <ol className="demo-history">
        {state.audit.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ol>
      <button
        className="demo-secondary"
        onClick={() =>
          exportSample(
            c.name + "-audit",
            ["Sequence", "Action"],
            state.audit.toReversed().map((a, i) => [i + 1, a]),
          )
        }
      >
        Export audit CSV
      </button>
    </div>
  );
  const newButton = (
    <button
      className="demo-primary"
      onClick={() => {
        setForm("create");
        setName("");
        setLocation(
          kind === "stock"
            ? "Wuse"
            : kind === "construction"
              ? "Site D"
              : "Line 1",
        );
        setQuantity(kind === "construction" ? "1" : "40");
        setNote("");
      }}
    >
      Add{" "}
      {kind === "stock"
        ? "stock lot"
        : kind === "construction"
          ? "project"
          : "batch"}
    </button>
  );
  function save() {
    let saved = false;
    if (form === "create") {
      saved = run({
        type: "create",
        name,
        location,
        quantity: Number(quantity),
        note,
      });
    } else if (form === "edit" && asset) {
      saved = run({
        type: "adjust",
        id: asset.id,
        quantity: Number(quantity),
        note,
      });
    } else if (asset) {
      saved = run({
        type: "request",
        assetId: asset.id,
        title: name,
        destination: location,
        quantity: Number(quantity),
        amount: Number(amount),
      });
    }
    if (saved) {
      setForm(null);
      setSelected(null);
      setOrderId(null);
      setTab(form === "request" ? "workflow" : "records");
    }
  }
  return (
    <DemoShell
      name={c.name}
      subtitle={c.subtitle}
      accent={c.accent}
      tabs={c.tabs.map((label, i) => ({ id: ids[i], label }))}
      active={tab}
      onTab={nav}
      onReset={reset}
      notice="illustrative operational workspace"
    >
      {state.message && (
        <p className="demo-notice" role="status">
          {state.message}
        </p>
      )}
      {form ? (
        <div className="demo-card">
          <button className="demo-secondary" onClick={() => setForm(null)}>
            Back to workspace
          </button>
          <h4 style={{ marginTop: 14 }}>
            {form === "create"
              ? "Create record"
              : form === "edit"
                ? "Record an update"
                : "Create workflow request"}
          </h4>
          {form !== "edit" && (
            <>
              <label className="demo-label">
                {form === "request" ? "Request description" : "Name"}
                <input
                  className="demo-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={90}
                />
              </label>
              <label className="demo-label">
                {form === "request" ? "Destination / site" : "Location"}
                {kind === "stock" ? (
                  <select
                    className="demo-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {["Wuse", "Garki", "Maitama"].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="demo-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    maxLength={80}
                  />
                )}
              </label>
            </>
          )}
          <label className="demo-label">
            {kind === "construction" && form !== "request"
              ? "Progress (%)"
              : "Quantity"}
            <input
              className="demo-input"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          {kind === "construction" && form === "request" && (
            <label className="demo-label">
              Quoted cost (₦)
              <input
                className="demo-input"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          )}
          {form !== "request" && (
            <label className="demo-label">
              {form === "edit" ? "Reason / daily site log" : "Notes"}
              <textarea
                className="demo-input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={400}
              />
            </label>
          )}
          <div className="demo-actions">
            <button className="demo-primary" onClick={save}>
              Save {form === "request" ? "request" : "record"}
            </button>
            <button className="demo-secondary" onClick={() => setForm(null)}>
              Done / cancel
            </button>
          </div>
        </div>
      ) : order ? (
        <>
          <button className="demo-secondary" onClick={() => setOrderId(null)}>
            Back to queue
          </button>
          <div className="demo-card" style={{ marginTop: 14 }}>
            <Badge tone="warn">{order.status}</Badge>
            <h4 style={{ marginTop: 12 }}>
              #{order.id} · {order.title}
            </h4>
            <p>{state.assets.find((a) => a.id === order.assetId)?.name}</p>
            <p>
              {order.quantity} units → {order.destination}
              {kind === "construction" ? ` · ${cash(order.amount)}` : ""}
            </p>
            <ol className="demo-steps">
              {(kind === "stock"
                ? ["Requested", "Approved", "Dispatched", "Received"]
                : kind === "construction"
                  ? ["Requested", "Approved", "PO sent", "Received"]
                  : [
                      "In production",
                      "Quality review",
                      "Packaging",
                      "Ready to dispatch",
                      "In transit",
                      "Delivered",
                    ]
              ).map((s) => (
                <li
                  key={s}
                  aria-current={s === order.status ? "step" : undefined}
                >
                  {s}
                </li>
              ))}
            </ol>
            <p className="demo-muted">
              {kind === "stock"
                ? "Approving reserves the request. Dispatch removes source stock; receipt adds it at the destination."
                : kind === "construction"
                  ? "The sample director reviews requests above ₦50,000. Approval commits budget; receipt records actual cost."
                  : "Complete all quality checks, confirm packaging, then enter vehicle/driver and delivery proof references."}
            </p>
            {kind === "factory" &&
              order.status === "Quality review" &&
              ["Weight", "Seal", "Label"].map((check) => (
                <label className="demo-label" key={check}>
                  <input
                    type="checkbox"
                    checked={checks.includes(check)}
                    onChange={(e) =>
                      setChecks((c) =>
                        e.target.checked
                          ? [...c, check]
                          : c.filter((v) => v !== check),
                      )
                    }
                  />{" "}
                  {check} check passed
                </label>
              ))}
            {!["Received", "Delivered", "Cancelled"].includes(order.status) && (
              <>
                <label className="demo-label">
                  {kind === "stock"
                    ? "Dispatch / receiving acknowledgement"
                    : kind === "construction"
                      ? "Supplier PO / goods receipt reference"
                      : "QC / packaging / vehicle & driver / delivery proof"}
                  <input
                    className="demo-input"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    maxLength={100}
                    placeholder="Enter this step’s reference"
                  />
                </label>
                <div className="demo-actions">
                  <button
                    className="demo-primary"
                    onClick={() =>
                      run({ type: "advance", id: order.id, reference, checks })
                    }
                  >
                    {order.status === "Requested" ||
                    order.status === "Director review"
                      ? "Approve request"
                      : kind === "stock"
                        ? order.status === "Approved"
                          ? "Confirm dispatch"
                          : "Acknowledge receipt"
                        : kind === "construction"
                          ? order.status === "Approved"
                            ? "Send supplier PO"
                            : "Record goods received"
                          : "Complete next step"}
                  </button>
                  {[
                    "Requested",
                    "Director review",
                    "Approved",
                    "In production",
                    "Quality review",
                  ].includes(order.status) && (
                    <button
                      className="demo-danger"
                      onClick={() => run({ type: "cancel", id: order.id })}
                    >
                      Cancel request
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          {audit}
        </>
      ) : asset ? (
        <>
          <button className="demo-secondary" onClick={() => setSelected(null)}>
            Back to {c.tabs[1].toLowerCase()}
          </button>
          <div className="demo-card" style={{ marginTop: 14 }}>
            <Badge tone={asset.status === "On hold" ? "danger" : "good"}>
              {asset.status}
            </Badge>
            <h4 style={{ marginTop: 12 }}>{asset.name}</h4>
            <p>
              {asset.location} · {asset.quantity}
              {kind === "construction" ? "% complete" : " units"}
            </p>
            <p>{asset.note}</p>
            {kind === "construction" && (
              <Stats
                items={[
                  { label: "Budget", value: cash(asset.budget) },
                  { label: "Committed", value: cash(committed(asset.id)) },
                  { label: "Actual", value: cash(asset.spent) },
                ]}
              />
            )}
            <div className="demo-actions">
              <button className="demo-primary" onClick={() => request(asset)}>
                {kind === "stock"
                  ? "Request transfer"
                  : kind === "construction"
                    ? "Request materials"
                    : "Start batch workflow"}
              </button>
              <button
                className="demo-secondary"
                onClick={() => {
                  setForm("edit");
                  setQuantity(String(asset.quantity));
                  setNote("");
                }}
              >
                {kind === "construction"
                  ? "Record site update"
                  : "Adjust record"}
              </button>
              <button className="demo-danger" onClick={() => setDeleting(true)}>
                Delete record
              </button>
            </div>
            {deleting && (
              <div className="demo-notice">
                <p>
                  Delete this sample record? Active workflows block deletion.
                </p>
                <button
                  className="demo-danger"
                  onClick={() => run({ type: "remove", id: asset.id })}
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
            )}
          </div>
          <div className="demo-card">
            <h4>Linked workflow records</h4>
            {orders(state.orders.filter((o) => o.assetId === asset.id))}
          </div>
        </>
      ) : tab === "overview" ? (
        <>
          <Stats items={stats} />
          <div className="demo-product-grid">
            <div className="demo-card">
              <h4>
                {kind === "factory" ? "Production board" : "Action centre"}
              </h4>
              <p>
                {kind === "stock"
                  ? "Replenish branches without losing the transfer trail."
                  : kind === "construction"
                    ? "Connect site requests, director decisions and supplier receipts."
                    : "Raw materials → production → quality → packaging → dispatch."}
              </p>
              <div className="demo-actions">
                <button
                  className="demo-primary"
                  onClick={() => nav("workflow")}
                >
                  {kind === "factory"
                    ? "Open quality queue"
                    : "Review pending work"}
                </button>
                {newButton}
              </div>
            </div>
            <div className="demo-card">
              <h4>
                {kind === "construction"
                  ? "Site progress"
                  : kind === "stock"
                    ? "Branch stock balance"
                    : "Batch progress"}
              </h4>
              {state.assets.map((a) => (
                <button
                  className="demo-row"
                  key={a.id}
                  onClick={() => openAsset(a)}
                >
                  <span className="demo-row-main">
                    <strong>{a.name}</strong>
                    <small>
                      {a.location} · {a.status}
                    </small>
                  </span>
                  <strong>
                    {a.quantity}
                    {kind === "construction" ? "%" : ""}
                  </strong>
                </button>
              ))}
            </div>
          </div>
          <div className="demo-card">
            <h4>Pending decisions</h4>
            {orders(active.slice(0, 3))}
          </div>
        </>
      ) : tab === "records" && kind === "factory" ? (
        <>
          <Stats items={stats} />
          <div className="demo-card">
            <h4>Raw material store</h4>
            <p>
              Oats & cereal blend · sample unit basis 1 raw unit per finished
              unit.
            </p>
            <strong>{state.raw} units available</strong>
            <label className="demo-label">
              Supplier receipt quantity
              <input
                className="demo-input"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>
            <button
              className="demo-primary"
              onClick={() =>
                run({ type: "restock", quantity: Number(quantity) })
              }
            >
              Receive raw materials
            </button>
          </div>
          <div className="demo-toolbar">
            <h4>Reserve materials into a batch</h4>
            {newButton}
          </div>
          {state.assets.map((a) => (
            <button
              className="demo-row"
              key={a.id}
              onClick={() => openAsset(a)}
            >
              <span className="demo-row-main">
                <strong>{a.name}</strong>
                <small>
                  {a.quantity} units · {a.status}
                </small>
              </span>
            </button>
          ))}
        </>
      ) : tab === "records" ? (
        <>
          <div className="demo-toolbar">
            <h4>{c.tabs[1]}</h4>
            {newButton}
          </div>
          <div className="demo-search">
            <input
              className="demo-input"
              aria-label="Search records"
              placeholder="Search name or location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="demo-input"
              aria-label="Filter location"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              {Array.from(new Set(state.assets.map((a) => a.location))).map(
                (l) => (
                  <option key={l}>{l}</option>
                ),
              )}
            </select>
          </div>
          {assetRows.map((a) => (
            <button
              className="demo-row"
              key={a.id}
              onClick={() => openAsset(a)}
            >
              <span className="demo-avatar">
                {kind === "stock" ? "Rx" : "PR"}
              </span>
              <span className="demo-row-main">
                <strong>{a.name}</strong>
                <small>
                  {a.location} · {a.note}
                </small>
                {kind === "construction" && (
                  <span className="demo-progress">
                    <span style={{ width: `${a.quantity}%` }} />
                  </span>
                )}
              </span>
              <strong>
                {a.quantity}
                {kind === "construction" ? "%" : ""}
              </strong>
              <Badge tone={a.status === "On hold" ? "danger" : "good"}>
                {a.status}
              </Badge>
            </button>
          ))}
          {!assetRows.length && <Empty>No matching records.</Empty>}
        </>
      ) : tab === "workflow" ? (
        <>
          <div className="demo-toolbar">
            <h4>
              {kind === "factory"
                ? "Quality & packaging queue"
                : c.tabs[2] + " queue"}
            </h4>
            <button
              className="demo-secondary"
              onClick={() => nav(kind === "factory" ? "overview" : "records")}
            >
              Create a request
            </button>
          </div>
          {orders(
            kind === "factory"
              ? state.orders.filter(
                  (o) =>
                    ![
                      "Ready to dispatch",
                      "In transit",
                      "Delivered",
                      "Cancelled",
                    ].includes(o.status),
                )
              : state.orders,
          )}
          {kind === "factory" && (
            <div className="demo-card">
              <h4>Held batches</h4>
              {state.assets
                .filter((a) => a.status === "On hold")
                .map((a) => (
                  <p key={a.id}>
                    {a.name}: {a.note}. This batch is not cleared for shipment.
                  </p>
                ))}
            </div>
          )}
        </>
      ) : (
        <>
          <Stats items={stats} />
          <div className="demo-card">
            <h4>
              {kind === "factory"
                ? "Warehouse & shipment records"
                : "Operational report"}
            </h4>
            {kind === "factory" ? (
              orders(
                state.orders.filter((o) =>
                  ["Ready to dispatch", "In transit", "Delivered"].includes(
                    o.status,
                  ),
                ),
              )
            ) : (
              <>
                {state.assets.map((a) => (
                  <div className="demo-row" key={a.id}>
                    <span className="demo-row-main">
                      <strong>{a.name}</strong>
                      <small>{a.location}</small>
                    </span>
                    <strong>
                      {kind === "construction" ? cash(a.spent) : a.quantity}
                    </strong>
                  </div>
                ))}
                <button
                  className="demo-secondary"
                  onClick={() =>
                    exportSample(
                      c.name,
                      [
                        "Record",
                        "Location",
                        "Quantity",
                        "Status",
                        "Actual spend",
                      ],
                      state.assets.map((a) => [
                        a.name,
                        a.location,
                        a.quantity,
                        a.status,
                        a.spent,
                      ]),
                    )
                  }
                >
                  Export current records
                </button>
              </>
            )}
          </div>
          {audit}
        </>
      )}
    </DemoShell>
  );
}
