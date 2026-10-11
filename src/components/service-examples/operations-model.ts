/** Browser-only sample operations. No external systems or real stock are touched. */
export type OperationKind = "stock" | "construction" | "factory";
export interface Asset {
  id: number;
  name: string;
  location: string;
  quantity: number;
  status: string;
  note: string;
  budget: number;
  spent: number;
}
export interface WorkOrder {
  id: number;
  assetId: number;
  title: string;
  quantity: number;
  destination: string;
  amount: number;
  status: string;
  reference: string;
  checks: string[];
}
export interface Operations {
  assets: Asset[];
  orders: WorkOrder[];
  audit: string[];
  nextId: number;
  message: string;
  raw: number;
}
export type Operation =
  | {
      type: "request";
      assetId: number;
      quantity: number;
      destination: string;
      amount: number;
      title: string;
    }
  | { type: "advance"; id: number; reference: string; checks: string[] }
  | { type: "cancel"; id: number }
  | { type: "adjust"; id: number; quantity: number; note: string }
  | {
      type: "create";
      name: string;
      location: string;
      quantity: number;
      note: string;
    }
  | { type: "remove"; id: number }
  | { type: "restock"; quantity: number };
export function initialOperations(kind: OperationKind): Operations {
  const seeds =
    kind === "stock"
      ? [
          [
            "Amoxicillin · lot AM-01",
            "Wuse",
            24,
            "Available",
            "Expiry: 30 Jun 2027",
          ],
          [
            "Metformin · lot ME-02",
            "Garki",
            67,
            "Available",
            "Expiry: 31 Dec 2027",
          ],
          [
            "Insulin · lot IN-03",
            "Maitama",
            21,
            "On hold",
            "Expiry review required; movement blocked",
          ],
        ]
      : kind === "construction"
        ? [
            [
              "Wuse office fit-out",
              "Site A",
              42,
              "In progress",
              "Electrical first fix",
            ],
            [
              "Garki apartment renovation",
              "Site B",
              68,
              "In progress",
              "Floor finishes",
            ],
            [
              "Maitama reception upgrade",
              "Site C",
              100,
              "Complete",
              "Handover complete",
            ],
          ]
        : [
            [
              "Granola · batch GF-041",
              "Line 1",
              120,
              "Awaiting QA",
              "Packaging and label review",
            ],
            [
              "Cereal · batch GF-042",
              "Line 2",
              80,
              "Released",
              "Quality and packaging cleared",
            ],
            [
              "Snack · batch GF-043",
              "Line 1",
              60,
              "On hold",
              "Label mismatch: investigate before rework",
            ],
          ];
  const assets = seeds.map((s, i) => ({
    id: i + 1,
    name: String(s[0]),
    location: String(s[1]),
    quantity: Number(s[2]),
    status: String(s[3]),
    note: String(s[4]),
    budget: 2000000,
    spent: kind === "construction" ? (i + 1) * 250000 : 0,
  }));
  const orders: WorkOrder[] =
    kind === "stock"
      ? [
          {
            id: 4,
            assetId: 1,
            title: "Branch replenishment",
            quantity: 6,
            destination: "Maitama",
            amount: 0,
            status: "Requested",
            reference: "",
            checks: [],
          },
        ]
      : kind === "construction"
        ? [
            {
              id: 4,
              assetId: 1,
              title: "Electrical cable · supplier quote",
              quantity: 1,
              destination: "Site A",
              amount: 75000,
              status: "Director review",
              reference: "Quote Q-104",
              checks: [],
            },
          ]
        : [
            {
              id: 4,
              assetId: 1,
              title: "Granola production run",
              quantity: 120,
              destination: "Abuja distributor",
              amount: 0,
              status: "Quality review",
              reference: "",
              checks: [],
            },
            {
              id: 5,
              assetId: 2,
              title: "Cereal production run",
              quantity: 80,
              destination: "Garki distributor",
              amount: 0,
              status: "Ready to dispatch",
              reference: "QC-042",
              checks: ["Weight", "Seal", "Label"],
            },
          ];
  return {
    assets,
    orders,
    audit: ["Workspace opened · sample records only"],
    nextId: 6,
    message: "",
    raw: 400,
  };
}
export function operate(
  state: Operations,
  action: Operation,
  kind: OperationKind,
): Operations {
  const reject = (message: string) => ({ ...state, message });
  const done = (next: Partial<Operations>, message: string) => ({
    ...state,
    ...next,
    message,
    audit: [message, ...state.audit],
  });
  const order =
    "id" in action ? state.orders.find((o) => o.id === action.id) : undefined;
  if (action.type === "restock")
    return Number.isInteger(action.quantity) && action.quantity > 0
      ? done(
          { raw: state.raw + action.quantity },
          `Raw materials received: ${action.quantity} units.`,
        )
      : reject("Enter a positive whole quantity.");
  if (action.type === "create") {
    if (
      !action.name.trim() ||
      !action.location.trim() ||
      !Number.isInteger(action.quantity) ||
      action.quantity <= 0 ||
      (kind === "construction" && action.quantity > 100)
    )
      return reject(
        "Enter a name, location and valid positive quantity (project progress: 1–100).",
      );
    if (kind === "factory" && action.quantity > state.raw)
      return reject(
        "Not enough raw material. Receive materials before creating this batch.",
      );
    const asset: Asset = {
      id: state.nextId,
      name: action.name.trim(),
      location: action.location.trim(),
      quantity: action.quantity,
      status:
        kind === "factory"
          ? "In production"
          : kind === "stock"
            ? "Available"
            : "In progress",
      note: action.note,
      budget: 2000000,
      spent: 0,
    };
    return done(
      {
        assets: [...state.assets, asset],
        nextId: state.nextId + 1,
        raw: kind === "factory" ? state.raw - action.quantity : state.raw,
      },
      `Created ${asset.name}${kind === "factory" ? `; reserved ${action.quantity} raw units` : ""}.`,
    );
  }
  if (action.type === "adjust" || action.type === "remove") {
    const asset = state.assets.find((a) => a.id === action.id);
    if (!asset) return reject("Record not found.");
    if (
      state.orders.some(
        (o) =>
          o.assetId === asset.id &&
          (action.type === "remove" ||
            !["Received", "Delivered", "Cancelled"].includes(o.status)),
      )
    )
      return reject(
        action.type === "remove"
          ? "This record has linked workflow history and cannot be deleted."
          : "This record has an active workflow. Complete or cancel it first.",
      );
    if (action.type === "remove")
      return done(
        { assets: state.assets.filter((a) => a.id !== asset.id) },
        `Removed ${asset.name}. Reset can restore sample records.`,
      );
    if (
      !Number.isInteger(action.quantity) ||
      action.quantity < 0 ||
      (kind === "construction" && action.quantity > 100) ||
      !action.note.trim()
    )
      return reject("Enter a valid quantity and a reason for this update.");
    return done(
      {
        assets: state.assets.map((a) =>
          a.id === asset.id
            ? { ...a, quantity: action.quantity, note: action.note }
            : a,
        ),
      },
      `${asset.name}: ${kind === "construction" ? "site progress" : "quantity"} updated to ${action.quantity}. ${action.note}`,
    );
  }
  if (action.type === "request") {
    const asset = state.assets.find((a) => a.id === action.assetId);
    if (!asset) return reject("Select a record.");
    if (
      !action.title.trim() ||
      !action.destination.trim() ||
      !Number.isInteger(action.quantity) ||
      action.quantity <= 0
    )
      return reject(
        "Enter a request description, destination and positive whole quantity.",
      );
    if (asset.status === "On hold" || asset.status === "Complete")
      return reject(
        "This record is held or complete. It cannot start this workflow.",
      );
    if (kind === "stock") {
      const reserved = state.orders
        .filter(
          (o) =>
            o.assetId === asset.id &&
            ["Requested", "Approved"].includes(o.status),
        )
        .reduce((n, o) => n + o.quantity, 0);
      if (action.destination === asset.location)
        return reject("Destination must differ from the source branch.");
      if (action.quantity > asset.quantity - reserved)
        return reject(
          "Insufficient unreserved stock. Existing requests are reserved.",
        );
    }
    if (kind === "construction") {
      const committed = state.orders
        .filter(
          (o) =>
            o.assetId === asset.id &&
            ["Approved", "PO sent"].includes(o.status),
        )
        .reduce((n, o) => n + o.amount, 0);
      if (
        !Number.isFinite(action.amount) ||
        action.amount <= 0 ||
        action.amount > asset.budget - asset.spent - committed
      )
        return reject(
          "Request must be positive and within the remaining project budget.",
        );
    }
    if (
      kind === "factory" &&
      state.orders.some(
        (o) => o.assetId === asset.id && o.status !== "Cancelled",
      )
    )
      return reject("This batch already has a production workflow.");
    const value: WorkOrder = {
      id: state.nextId,
      ...action,
      status:
        kind === "stock"
          ? "Requested"
          : kind === "construction"
            ? action.amount > 50000
              ? "Director review"
              : "Requested"
            : "In production",
      reference: "",
      checks: [],
    };
    return done(
      { orders: [...state.orders, value], nextId: state.nextId + 1 },
      `Request #${value.id} created: ${value.title}.`,
    );
  }
  if (!order) return reject("Workflow not found.");
  const asset = state.assets.find((a) => a.id === order.assetId);
  if (!asset) return reject("Linked record not found.");
  if (action.type === "cancel") {
    if (
      ![
        "Requested",
        "Director review",
        "Approved",
        "In production",
        "Quality review",
      ].includes(order.status)
    )
      return reject("This workflow has already moved beyond cancellation.");
    return done(
      {
        orders: state.orders.map((o) =>
          o.id === order.id ? { ...o, status: "Cancelled" } : o,
        ),
      },
      `Request #${order.id} cancelled${kind === "factory" ? "; batch retained for review" : "; reservation released"}.`,
    );
  }
  if (action.type !== "advance") return state;
  const stages =
    kind === "stock"
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
          ];
  const current =
      order.status === "Director review" ? 0 : stages.indexOf(order.status),
    next = stages[current + 1];
  if (current < 0 || !next)
    return reject("This workflow is already complete or cancelled.");
  if (kind === "construction" && next === "Approved") {
    const committed = state.orders
      .filter(
        (o) =>
          o.id !== order.id &&
          o.assetId === asset.id &&
          ["Approved", "PO sent"].includes(o.status),
      )
      .reduce((n, o) => n + o.amount, 0);
    if (order.amount > asset.budget - asset.spent - committed)
      return reject(
        "Approval blocked: the remaining budget changed. Review the request amount.",
      );
  }
  if (current > 0 && !action.reference.trim())
    return reject(
      "Enter the dispatch, receipt or supplier reference before continuing.",
    );
  if (
    kind === "factory" &&
    order.status === "Quality review" &&
    !["Weight", "Seal", "Label"].every((c) => action.checks.includes(c))
  )
    return reject("Quality gate: all three checks must pass before packaging.");
  let assets = state.assets;
  if (kind === "stock" && next === "Dispatched") {
    if (asset.status !== "Available" || asset.quantity < order.quantity)
      return reject("Dispatch blocked: held or insufficient stock.");
    assets = assets.map((a) =>
      a.id === asset.id ? { ...a, quantity: a.quantity - order.quantity } : a,
    );
  }
  let nextId = state.nextId;
  if (kind === "stock" && next === "Received") {
    const destination = assets.find(
      (a) =>
        a.name === asset.name &&
        a.location === order.destination &&
        a.status === "Available",
    );
    assets = destination
      ? assets.map((a) =>
          a.id === destination.id
            ? { ...a, quantity: a.quantity + order.quantity }
            : a,
        )
      : [
          ...assets,
          {
            ...asset,
            id: nextId++,
            location: order.destination,
            quantity: order.quantity,
            note: `Receipt #${order.id}: ${action.reference}`,
          },
        ];
  }
  if (kind === "construction" && next === "Received")
    assets = assets.map((a) =>
      a.id === asset.id ? { ...a, spent: a.spent + order.amount } : a,
    );
  if (kind === "factory")
    assets = assets.map((a) =>
      a.id === asset.id
        ? { ...a, status: next === "Ready to dispatch" ? "Released" : next }
        : a,
    );
  return done(
    {
      assets,
      nextId,
      orders: state.orders.map((o) =>
        o.id === order.id
          ? {
              ...o,
              status: next,
              reference: action.reference,
              checks: action.checks,
            }
          : o,
      ),
    },
    `#${order.id} · ${order.title} → ${next}${action.reference ? ` · ${action.reference}` : ""}.`,
  );
}
