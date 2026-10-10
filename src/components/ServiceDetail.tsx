"use client";
import { Component, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Eyebrow, EditorialButton, editorialRoot, SectionNav } from "@/components/editorial";
import { serviceContent, serviceExamples, contactHref, type ServiceExample } from "@/content/services";
const Sandbox=dynamic(()=>import('./service-examples/WorkflowSandbox'));
const LegacyPreview=dynamic(()=>import('./service-examples/LegacyPreview'));
class PreviewBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed ? <p role="alert">The interactive preview could not load. The workflow and limitations above remain available; you can still discuss this example.</p>:this.props.children;}
}
function ExampleCard({example:e}:{example:ServiceExample}) {
 const [show,setShow]=useState(false);
 const [imageFailed,setImageFailed]=useState(false);
 return <article id={e.id} className="scroll-mt-28 border-t border-black/15 py-10 md:py-14">
  <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
   <div className="min-w-0">
    <p className="font-mono text-xs uppercase tracking-wider text-[#666]">{e.buyerType}</p>
    <h3 className="mt-4 text-2xl md:text-3xl font-light tracking-tight">{e.title}</h3>
    <p className="mt-4 inline-block border border-black/15 px-3 py-2 text-xs">{e.origin==='demonstration'?'Demonstration':'Workflow preview'} · {e.functionality} · sample data</p>
    <p className="mt-5 leading-7 text-[#555]">{e.summary}</p>
    <p className="mt-3 text-sm leading-6 text-[#555]">{e.exactContribution}</p>
    <a className="mt-4 inline-block text-sm underline underline-offset-4" href={e.caseUrl}>Link to this example</a>
   </div>
   <figure className="min-w-0">
    {e.previewImage&&!imageFailed ? <div className="relative aspect-[16/10] overflow-hidden border border-black/10 bg-[#f5f5f7]"><Image src={e.previewImage} alt={`${e.title} — website interface preview`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain" onError={()=>setImageFailed(true)}/></div> : <div className="border border-black/10 bg-[#f5f5f7] p-5 sm:p-8 min-h-56"><p className="text-xs font-mono uppercase text-[#555]">Sample workflow screen</p><ol className="mt-5 space-y-3">{e.workflow.map((step,i)=><li key={step} className="flex gap-3 border border-black/10 bg-white p-4 text-sm"><span className="text-[#666]">0{i+1}</span><span>{step}</span></li>)}</ol></div>}
    <figcaption className="mt-3 text-xs leading-5 text-[#666]">{e.journey}. {e.previewImage?'Website interface preview. Connected features are described in the scope below.':e.functionality==='static preview'?'Sample workflow illustration; no connected systems.':'Sample workflow illustration. Open the preview to inspect the available controls.'}</figcaption>
   </figure>
  </div>
  <details className="mt-6 border-y border-black/10 py-1"><summary className="cursor-pointer py-4 font-medium">Read scope and limitations — {e.title}</summary><dl className="grid gap-6 pb-6 text-sm leading-6 md:grid-cols-2"><div><dt className="font-semibold">Input / action / output</dt><dd>{e.journey}</dd></div><div><dt className="font-semibold">Implemented evidence</dt><dd>{e.deliveredScope} No measured commercial result is asserted.</dd></div><div><dt className="font-semibold">Limitations</dt><dd>{e.limitations}</dd></div><div><dt className="font-semibold">Dependencies and ownership</dt><dd>{e.thirdPartyDependencies.join('. ')}. Production scope and source-code access are agreed in the contract.</dd></div></dl></details>
  <div className="mt-6 flex flex-wrap gap-4 items-center">
   {(e.sandbox||!e.demoUrl&&e.functionality==='UI prototype')&&<button className="border border-black px-5 py-3 text-sm" aria-expanded={show} aria-controls={`${e.id}-preview`} onClick={()=>setShow(!show)}>{show?'Close preview':e.sandbox?'Try sandbox':'View UI prototype'}</button>}
   {e.demoUrl&&<a className="border border-black px-5 py-3 text-sm" href={e.demoUrl} target={e.demoUrl.startsWith('http')?'_blank':undefined} rel="noopener noreferrer">View website preview{e.demoUrl.startsWith('http')?' (new tab)':''}</a>}
   <Link href={contactHref(e.serviceSlug,e.id)} className="underline underline-offset-4 text-sm py-3">Discuss a similar workflow</Link>
  </div>
  <div id={`${e.id}-preview`}>{show&&<div className="mt-6"><PreviewBoundary>{e.sandbox?<Sandbox kind={e.sandbox}/>:<LegacyPreview id={e.id}/>}</PreviewBoundary></div>}</div>
 </article>;
}
export default function ServiceDetail({slug}:{slug:string}) {
 const s=serviceContent.find(s=>s.slug===slug)!;
 const examples=serviceExamples.filter(e=>e.serviceSlug===slug);
 return <main className={`${editorialRoot} service-detail bg-white text-[#050505]`}>
  <section className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-28 pb-12 md:pt-36">
   <Eyebrow index="01">{s.name}</Eyebrow>
   <h1 className="mt-8 max-w-5xl text-[clamp(2.2rem,5.5vw,4.6rem)] font-extralight leading-[1.06] tracking-tight">{s.headline}</h1>
   <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-[#666]">{s.description}</p>
   <div className="mt-8 flex flex-wrap gap-4"><EditorialButton href={contactHref(slug)}>Discuss a project</EditorialButton><EditorialButton href="#examples" variant="ghost">See examples</EditorialButton></div>
   <a href={`#${examples[0].id}`} className="mt-10 block border-l-2 border-black pl-5 py-2 max-w-xl"><span className="block font-mono text-xs uppercase text-[#666]">Start with a relevant example</span><span className="mt-2 block text-xl font-light">{examples[0].title} ↗</span><span className="mt-2 block text-sm text-[#666]">{examples[0].summary}</span></a>
  </section>
  <SectionNav sections={[{id:'examples',label:'Examples'},{id:'start',label:'A useful start'},{id:'capabilities',label:'Capabilities'},{id:'delivery',label:'Delivery'},{id:'faq',label:'FAQs'}]}/>
  <section className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-12"><Eyebrow index="02">Common situations</Eyebrow><div className="mt-8 grid gap-6 md:grid-cols-3">{s.situations.map(t=><p key={t} className="border-t border-black/10 pt-5 text-lg font-light leading-7">{t}</p>)}</div></section>
  <section id="examples" className="scroll-mt-28 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-12"><span id="case-studies" className="scroll-mt-28"/><Eyebrow index="03">Examples & boundaries</Eyebrow><h2 className="mt-6 text-3xl md:text-4xl font-extralight">See the workflow, not just the interface.</h2><p className="mt-5 mb-10 max-w-2xl leading-7 text-[#666]">{s.introduction}</p>{examples.map(e=><ExampleCard key={e.id} example={e}/>)}</section>
  <section id="start" className="scroll-mt-28 bg-[#f5f5f7] px-6 sm:px-10 lg:px-16 py-16"><div className="mx-auto max-w-[1272px]"><Eyebrow index="04">A useful place to start</Eyebrow><h2 className="mt-6 max-w-3xl text-3xl md:text-4xl font-extralight">{s.offer}</h2><p className="mt-6 max-w-2xl leading-8 text-[#555]">{s.offerBody}</p><div className="mt-8"><EditorialButton href={contactHref(slug)}>{s.contactAction}</EditorialButton></div></div></section>
  <section id="capabilities" className="scroll-mt-28 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-16"><details><summary className="cursor-pointer text-2xl font-light py-4">Explore the full capability catalogue</summary><p className="my-5 max-w-2xl leading-7 text-[#666]">We first check whether configuring your current tool or connecting existing systems will meet the need. Custom development follows an agreed limitation. These are available scope areas, not claims of past deployments.</p><ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{s.capabilities.map(c=><li className="border-t border-black/10 py-4" key={c}>{c}</li>)}</ul></details></section>
  <section id="delivery" className="scroll-mt-28 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-12"><Eyebrow index="05">Delivery & handover</Eyebrow><div className="mt-8 grid gap-8 md:grid-cols-3">{[['Define','Agree users, inputs, boundaries, dependencies and an acceptance check.'],['Build & review','Review the selected workflow with representative examples, including an exception.'],['Hand over','Document the agreed setup, responsibilities and next milestone.']].map(([title,body])=><div key={title}><h3 className="text-xl font-light">{title}</h3><p className="mt-3 leading-7 text-[#666]">{body}</p></div>)}</div><div className="mt-10 space-y-4 max-w-3xl text-sm leading-7 text-[#555]"><p>You receive the agreed project deliverables and source-code access under the contract. Hosting, domains and third-party services have their own terms and costs.</p><p>The proposal identifies handover, the agreed defect-fix period and any optional maintenance. Ongoing work is priced separately. Price and delivery dates follow the agreed scope, not a universal starting package.</p></div></section>
  <section id="faq" className="scroll-mt-28 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 py-16"><Eyebrow index="06">Questions before starting</Eyebrow>{[['Can you improve our existing setup?','Yes. We can assess configuration, integration or a focused repair before proposing a new build.'],['Are these live client results?','Each example states its functionality and limitations. Sample screens and local sandboxes do not establish a production delivery or a measured business result.'],['What access will you need?','That depends on scope. We agree content, sample data, API permissions and third-party plans before work starts. Do not send passwords or sensitive documents in the enquiry form.'],['What will it cost and who maintains it?','A scoped proposal sets out deliverables, dependencies, milestones and support. Provider fees and ongoing work are identified separately.']].map(([q,a])=><details key={q} className="border-b border-black/10 py-2"><summary className="cursor-pointer py-5 font-medium">{q}</summary><p className="pb-6 max-w-3xl text-[#555] leading-7">{a}</p></details>)}</section>
  <section className="bg-black text-white px-6 sm:px-10 lg:px-16 py-16"><div className="max-w-[1272px] mx-auto"><h2 className="text-3xl md:text-4xl font-extralight">{s.contactAction}</h2><p className="mt-6 max-w-2xl leading-7 text-white/75">Tell us what you need to build or improve. We will review the brief and suggest the next step. A scoped proposal sets out deliverables, dependencies, milestones and support.</p><Link className="mt-8 inline-block bg-white text-black px-6 py-4" href={contactHref(slug)}>Discuss a project</Link></div></section>
 </main>;
}
