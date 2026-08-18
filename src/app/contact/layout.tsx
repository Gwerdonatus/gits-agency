// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Tell us what you are building. GITS responds within 24 hours with an honest read on the work and a clear next step.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
