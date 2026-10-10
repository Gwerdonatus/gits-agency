"use client";
import { useState } from "react";

/** Manual storyboards: no model, document upload, provider or sensitive decision. */
function ReviewStoryboard({title, steps}:{title:string; steps:string[]}) {
  const [step,setStep]=useState(0);
  return <section className="rounded-xl border border-black/15 bg-white overflow-hidden">
    <h4 className="bg-gray-50 border-b border-black/10 px-5 py-4 font-medium">{title}</h4>
    <p className="p-5 text-sm text-gray-600">Scripted UI prototype. Advance through sample input, proposed output and review. Nothing is sent or approved externally.</p>
    <ol className="px-5 space-y-4 text-base leading-7">{steps.slice(0,step+1).map((text,i)=><li className="border-l-2 border-black/25 pl-4" key={text}><span className="text-xs font-mono">STEP {i+1}</span><p>{text}</p></li>)}</ol>
    <p role="status" className="px-5 pt-4 text-sm">Showing {step+1} of {steps.length} sample steps.</p>
    <div className="flex flex-wrap gap-3 p-5"><button className="border px-4 py-3 disabled:opacity-50" disabled={step===steps.length-1} onClick={()=>setStep(s=>s+1)}>Show next step</button><button className="border px-4 py-3" onClick={()=>setStep(0)}>Reset preview</button></div>
  </section>;
}
export function NexusDemo(){return <ReviewStoryboard title="Enquiry intake and human review" steps={[
  'Sample input: a person asks for help with a sensitive family matter and a consultation.',
  'Proposed category: family enquiry. This is a fixed sample label, not an AI classification or legal advice.',
  'Review queue: sensitive case — a person checks urgency and the response before any reply or booking.',
  'Proposed response: the team can review the request and confirm an available consultation. No appointment is booked and no email is sent in this preview.',
]}/>;}
export function BridgepointDemo(){return <ReviewStoryboard title="Document intake and review queue" steps={[
  'Sample input: a fictional application with a name field, an address field and a missing supporting document. No document upload is connected.',
  'Proposed extraction: sample name and address displayed for checking. This uses deterministic sample fields, not document recognition.',
  'Exception: supporting document missing. Route to a human reviewer; do not infer the missing information.',
  'Review outcome shown: request additional information. This preview makes no credit, identity, sanctions or eligibility decision.',
]}/>;}
export function MeridianDemo(){return <ReviewStoryboard title="Source-backed answer and unanswered question" steps={[
  'Sample question: where should a maintenance request be recorded?',
  'Sample source passage: “Record maintenance requests in the shared queue and assign a reviewer.” Source: fictional team guide, section 2.',
  'Proposed answer: record the request in the shared queue, then assign a reviewer. This is a scripted answer with its supporting passage, not a live retrieval model.',
  'Unanswered question: what does the insurance policy cover? No source supplied. The correct boundary is “Not established by these documents — ask the responsible person.”',
]}/>;}
