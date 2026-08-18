// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Custom Software Development",
  description: "Software designed around your workflows, roles and data — SaaS platforms, healthcare, construction, logistics, school and hospitality systems built to last.",
  path: "/services/custom-software-development",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
