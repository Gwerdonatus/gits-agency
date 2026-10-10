"use client";
import { useState } from "react";

export function processPayment(processed: string[], fail: boolean) {
  const id = "payment.test.001";
  if (processed.includes(id)) return { processed, status: "Duplicate ignored — order unchanged." };
  if (fail) return { processed, status: "Failed — simulated destination unavailable. Retry is safe." };
  return { processed: [...processed, id], status: "Processed — test order marked paid. No money moved." };
}

export default function WorkflowSandbox({ kind }: { kind: string }) {
  const [quantity, setQuantity] = useState("6");
  const [stock, setStock] = useState(24);
  const [branch, setBranch] = useState("Branch A");
  const [covered, setCovered] = useState(false);
  const [approved, setApproved] = useState(false);
  const [fail, setFail] = useState(false);
  const [processed, setProcessed] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [status, setStatus] = useState("Ready — sample data only.");
  const button = "border border-black/20 bg-white px-4 py-3 text-sm disabled:opacity-50";
  function reset() { setQuantity("6"); setStock(24); setBranch("Branch A"); setCovered(false); setApproved(false); setFail(false); setProcessed([]); setEvents([]); setStatus("Reset — sample data restored."); }
  function record(message: string) { setStatus(message); setEvents(e => [...e.slice(-7), message]); }
  return <div className="space-y-5 border border-black/10 bg-[#f5f5f7] p-4 sm:p-6">
    <p className="text-xs font-mono uppercase tracking-wider">Local sandbox · sample data · no external requests</p>
    {kind === "stock" && <>
      <label className="block">Branch<select className="mt-2 block w-full border p-3" value={branch} onChange={e=>setBranch(e.target.value)}><option>Branch A</option><option>Branch B</option></select></label>
      <p>Warehouse stock: <strong>{stock} packs</strong>. Movement destination: {branch}.</p>
      <p className="text-sm">Expiry exception: sample batch EXP-01 is held for review and cannot be dispatched in this sandbox.</p>
      <label className="block">Packs to transfer<input type="number" min="1" step="1" className="mt-2 block w-full border p-3" value={quantity} onChange={e=>setQuantity(e.target.value)}/></label>
      <button className={button} onClick={()=>{const n=Number(quantity);if(!Number.isInteger(n)||n<=0||n>stock){record("Rejected — enter a whole quantity within available stock.");return;}setStock(s=>s-n);record(`Recorded ${n} packs to ${branch}; warehouse now ${stock-n}.`);}}>Record sample movement</button>
    </>}
    {kind === "roster" && <>
      <p>Request LV-01 · Front desk · sample morning shift</p>
      <p>Role being previewed: supervisor. These are not enforced permissions.</p>
      <label className="flex gap-3 items-start"><input type="checkbox" checked={covered} onChange={e=>setCovered(e.target.checked)} className="mt-1"/>Assign sample cover to this shift</label>
      <button disabled={approved} className={button} onClick={()=>{if(!covered){record("Conflict — the front desk would be uncovered. Assign cover before approval.");return;}setApproved(true);record("Approved — sample leave recorded; replacement assigned to the roster.");}}>Approve sample leave</button>
      <p>Roster preview: {approved ? "Replacement covering morning shift; requester on leave." : "Original staff member assigned; leave pending."}</p>
    </>}
    {kind === "payment" && <>
      <p>Test order ORD-001 · accepted updates: <strong>{processed.length}</strong></p>
      <label className="flex gap-3 items-start"><input type="checkbox" checked={fail} onChange={e=>setFail(e.target.checked)} className="mt-1"/>Simulate destination failure</label>
      <button className={button} onClick={()=>{const result=processPayment(processed,fail);setProcessed(result.processed);record("Received → validated → " + result.status);}}>Process / replay test event</button>
      <p className="text-sm">To retry a failure, clear the failure checkbox and process again. Replays do not create another update.</p>
    </>}
    <p role="status" className="border-l-2 border-black pl-3 text-sm">{status}</p>
    <details><summary className="cursor-pointer py-3">Sample event trail ({events.length})</summary>{events.length ? <ol className="list-decimal pl-6 space-y-2 text-sm">{events.map((e,i)=><li key={i}>{e}</li>)}</ol> : <p>No actions recorded yet.</p>}</details>
    <button onClick={reset} className={button}>Reset sample data</button>
  </div>;
}
