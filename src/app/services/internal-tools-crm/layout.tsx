// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Internal Tools & CRM Systems",
  description: "CRMs, dashboards, staff management, ticketing and operations platforms designed around how your team actually works.",
  path: "/services/internal-tools-crm",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
