// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How GITS collects, uses, and protects your data.",
  path: "/privacy",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
