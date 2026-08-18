// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "AI & Business Automation",
  description: "AI assistants, lead qualification, WhatsApp and workflow automation built with guardrails — automation you can explain to an auditor, not a black box.",
  path: "/services/ai-business-automation",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
