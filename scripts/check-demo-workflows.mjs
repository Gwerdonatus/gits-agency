import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const exports = {};
vm.runInNewContext(
  ts.transpileModule(
    fs.readFileSync(
      "src/components/service-examples/operations-model.ts",
      "utf8",
    ),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText,
  { exports },
);
const { initialOperations, operate } = exports;
let count = 0;
function check(value) {
  assert.ok(value);
  count++;
}
function advance(state, kind, id, reference = "QA reference", checks = []) {
  return operate(state, { type: "advance", id, reference, checks }, kind);
}
let s = initialOperations("stock");
const total = s.assets.reduce((n, a) => n + a.quantity, 0);
s = advance(s, "stock", 4);
check(s.orders[0].status === "Approved");
check(s.assets[0].quantity === 24);
s = advance(s, "stock", 4);
check(s.orders[0].status === "Dispatched");
check(s.assets[0].quantity === 18);
check(
  s.assets.reduce((n, a) => n + a.quantity, 0) +
    s.orders
      .filter((o) => o.status === "Dispatched")
      .reduce((n, o) => n + o.quantity, 0) ===
    total,
);
s = advance(s, "stock", 4);
check(s.orders[0].status === "Received");
check(
  s.assets.find((a) => a.name === s.assets[0].name && a.location === "Maitama")
    .quantity === 6,
);
check(s.assets.reduce((n, a) => n + a.quantity, 0) === total);
const completed = s;
s = advance(s, "stock", 4);
check(s.assets === completed.assets && s.orders === completed.orders);
const request = (assetId, quantity, destination, amount = 0) => ({
  type: "request",
  assetId,
  quantity,
  destination,
  amount,
  title: "QA request",
});
check(operate(s, request(3, 1, "Wuse"), "stock").orders === s.orders); // held lot
check(operate(s, request(1, 1000, "Garki"), "stock").orders === s.orders); // over stock
check(operate(s, request(1, 1, "Wuse"), "stock").orders === s.orders); // same branch
check(operate(s, request(1, 1.5, "Garki"), "stock").orders === s.orders);
check(operate(s, { type: "remove", id: 1 }, "stock").assets === s.assets); // historical record retained
let r = initialOperations("stock");
r = operate(r, request(1, 18, "Garki"), "stock");
check(r.orders.length === 2);
check(operate(r, request(1, 1, "Garki"), "stock").orders === r.orders);
r = operate(r, { type: "cancel", id: 4 }, "stock");
check(operate(r, request(1, 6, "Garki"), "stock").orders.length === 3);
let b = initialOperations("construction");
check(b.orders[0].status === "Director review");
b = advance(b, "construction", 4);
check(b.orders[0].status === "Approved" && b.assets[0].spent === 250000);
check(advance(b, "construction", 4, "").orders === b.orders);
b = advance(b, "construction", 4, "PO-104");
check(b.orders[0].status === "PO sent");
b = advance(b, "construction", 4, "GR-104");
check(b.assets[0].spent === 325000);
check(advance(b, "construction", 4).assets === b.assets);
check(
  operate(b, request(1, 1, "Site A", 9999999), "construction").orders ===
    b.orders,
);
b = operate(b, request(1, 1, "Site A", 1600000), "construction");
b = operate(b, request(1, 1, "Site A", 1600000), "construction");
b = advance(b, "construction", b.orders[1].id);
check(advance(b, "construction", b.orders[2].id).orders === b.orders); // prevent approval overcommit
let f = initialOperations("factory");
check(advance(f, "factory", 4, "QC-104", []).orders === f.orders);
f = advance(f, "factory", 4, "QC-104", ["Weight", "Seal", "Label"]);
check(f.orders[0].status === "Packaging");
f = advance(f, "factory", 4, "Packaging checked");
check(f.orders[0].status === "Ready to dispatch");
f = advance(f, "factory", 4, "Van 02 · driver Ada");
check(f.orders[0].status === "In transit");
f = advance(f, "factory", 4, "POD-104");
check(f.orders[0].status === "Delivered");
check(advance(f, "factory", 4).orders === f.orders);
check(
  operate(
    f,
    { type: "create", name: "QA", location: "Line 1", quantity: 401, note: "" },
    "factory",
  ).assets === f.assets,
);
let created = operate(
  f,
  { type: "create", name: "QA", location: "Line 1", quantity: 40, note: "" },
  "factory",
);
check(created.raw === 360 && created.assets.length === 4);
check(operate(f, { type: "restock", quantity: -1 }, "factory").raw === 400);
check(operate(f, { type: "restock", quantity: 20 }, "factory").raw === 420);
for (const slug of [
  "custom-software-development",
  "internal-tools-crm",
  "ai-business-automation",
  "integrations-apis",
]) {
  const page = fs.readFileSync(`src/app/services/${slug}/page.tsx`, "utf8");
  for (const label of ["The story", "What we built", "Delivery", "Results"])
    check(page.includes(label));
  check(page.includes("useState<CaseId | null>(null)"));
  check(page.includes("isOpen &&"));
  check(page.includes("id={study.id}"));
  check(!page.includes("<ServiceDetail"));
}
console.log(
  `${count} assertions passed: transfer conservation, reservations, held stock, budgets, quality gates, duplicate transitions, materials, and restored disclosure/story sections.`,
);
