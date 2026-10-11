"use client";
import dynamic from "next/dynamic";
const loading = () => <p role="status" className="p-6">Loading sample interface… The workflow summary remains available above.</p>;
const previews = {
 zova: dynamic(()=>import('./IntegrationWorkspace').then(m=>m.ZovaDemo),{loading}),
 swifthaul: dynamic(()=>import('./IntegrationWorkspace').then(m=>m.SwiftHaulDemo),{loading}),
 pulseclinic: dynamic(()=>import('./IntegrationWorkspace').then(m=>m.PulseClinicDemo),{loading}),
 medicore: dynamic(()=>import('./custom-software-development').then(m=>m.MedicoreDemo),{loading}),
 buildcore: dynamic(()=>import('./custom-software-development').then(m=>m.BuildCoreDemo),{loading}),
 factoryflow: dynamic(()=>import('./custom-software-development').then(m=>m.FactoryFlowDemo),{loading}),
 pipelinedesk: dynamic(()=>import('./internal-tools-crm').then(m=>m.PipelineDeskDemo),{loading}),
 staffhub: dynamic(()=>import('./internal-tools-crm').then(m=>m.StaffHubDemo),{loading}),
 servicedesk: dynamic(()=>import('./internal-tools-crm').then(m=>m.ServiceDeskDemo),{loading}),
 nexus: dynamic(()=>import('./ai-business-automation').then(m=>m.NexusDemo),{loading}),
 bridgepoint: dynamic(()=>import('./ai-business-automation').then(m=>m.BridgepointDemo),{loading}),
 meridian: dynamic(()=>import('./ai-business-automation').then(m=>m.MeridianDemo),{loading}),
};
export default function LegacyPreview({id}:{id:string}) {
 const Preview=previews[id as keyof typeof previews];
 return Preview ? <Preview/> : null;
}
