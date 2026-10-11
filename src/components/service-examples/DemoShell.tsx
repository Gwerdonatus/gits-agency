"use client";
import type { CSSProperties, ReactNode } from 'react';
import { LayoutDashboard, ListChecks, BarChart3, Layers, RotateCcw, Signal, Battery } from 'lucide-react';
import './demos.css';
export interface DemoTab { id: string; label: string }
export function DemoShell({name,subtitle,accent,tabs,active,onTab,onReset,phone=false,children,notice}:{name:string;subtitle:string;accent:string;tabs:DemoTab[];active:string;onTab:(id:string)=>void;onReset:()=>void;phone?:boolean;children:ReactNode;notice:string}) {
 const icons=[LayoutDashboard,ListChecks,Layers,BarChart3];
 return <section className={`interactive-demo ${phone?'always-phone':'responsive-workspace'}`} style={{'--demo-accent':accent} as CSSProperties} aria-label={`${name} interactive demonstration`}>
  <div className="demo-intro"><span className="demo-dot"/>Interactive demo · {notice}<button className="demo-reset" onClick={onReset}><RotateCcw size={14}/>Reset</button></div>
  <div className="demo-device">
   <div className="demo-status" aria-hidden="true"><span>9:41</span><i/><span><Signal size={13}/><Battery size={16}/></span></div>
   <div className="demo-window" aria-hidden="true"><span>● ● ●</span><span>{name.toLowerCase()}.demo / workspace</span><span>Sample workspace</span></div>
   <div className="demo-app">
    <header className="demo-app-header"><div className="demo-monogram">{name.slice(0,2).toUpperCase()}</div><div><strong>{name}</strong><small>{subtitle}</small></div><span className="demo-user">DT</span></header>
    <div className="demo-body">
     <nav className="demo-nav" aria-label={`${name} screens`}>{tabs.map((tab,i)=>{const Icon=icons[i%icons.length];return <button key={tab.id} aria-current={active===tab.id?'page':undefined} onClick={()=>onTab(tab.id)}><Icon size={18}/><span>{tab.label}</span></button>;})}</nav>
     <div className="demo-scroll" key={active}>{children}</div>
    </div>
   </div>
   <div className="demo-home" aria-hidden="true"/>
  </div>
  <p className="demo-caption">Explore the screens. Changes stay in this demo; Reset restores the sample.</p>
 </section>;
}
export function Stats({items}:{items:{label:string;value:string|number}[]}) {return <div className="demo-stats">{items.map(item=><div key={item.label}><small>{item.label}</small><strong>{item.value}</strong></div>)}</div>;}
export function Badge({children,tone='neutral'}:{children:ReactNode;tone?:string}){return <span className={`demo-badge ${tone}`}>{children}</span>;}
export function Empty({children}:{children:ReactNode}){return <p className="demo-empty">{children}</p>;}
export function exportSample(name:string,headers:string[],rows:(string|number)[][]){const csv=[headers,...rows].map(row=>row.map(cell=>'"'+String(cell).replaceAll('"','""')+'"').join(',')).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download=`${name}-sample.csv`;a.click();URL.revokeObjectURL(url);}
