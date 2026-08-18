// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Free Technical Audit",
  description: "Request a free technical audit of your website or platform — performance, architecture, and the specific fixes worth making first.",
  path: "/audit",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
