"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
const Advisor=dynamic(()=>import('./GITSAdvisor'),{ssr:false});
const InlineAdvisor=dynamic(()=>import('./InlineAdvisor'),{loading:()=> <p role="status">Loading advisor…</p>});
export default function AdvisorPlacement(){
 const path=usePathname();
 const [open,setOpen]=useState(false);
 if(path.startsWith('/elowen-living'))return null;
 if(path.startsWith('/services')||path==='/contact'||path==='/what-we-build')return <aside className="bg-black text-white border-b border-white/15 px-6 py-6"><div className="max-w-6xl mx-auto"><button className="border border-white/50 px-5 py-3 focus-visible:outline-2 focus-visible:outline-white" aria-expanded={open} aria-controls="inline-advisor-panel" onClick={()=>setOpen(!open)}>{open?'Close GITS Advisor':'Ask the GITS Advisor'}</button><p className="mt-3 text-sm text-white/70">AI-assisted guidance. Project scope and commitments are confirmed by a person.</p><div id="inline-advisor-panel">{open&&<InlineAdvisor/>}</div></div></aside>;
 return <Advisor/>;
}
