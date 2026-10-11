"use client";
import dynamic from "next/dynamic";
const Advisor=dynamic(()=>import('./GITSAdvisor'),{ssr:false});
export default function AdvisorPlacement(){
 return <Advisor/>;
}
