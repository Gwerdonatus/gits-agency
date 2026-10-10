import type { Metadata } from "next";
import ElowenShell from "./ElowenShell";
export const metadata: Metadata = {title:"Elowen Living — Property UI Demonstration", description:"A GITS property interface demonstration using sample listings. No live property feed or booking system.", alternates:{canonical:"https://www.gits.technology/elowen-living"}, robots:{index:false,follow:true}};
export default function Layout({children}:{children:React.ReactNode}) {return <ElowenShell>{children}</ElowenShell>;}
