// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services",
  description: "Custom software, websites, AI and business automation, internal tools and API integrations — designed and engineered by senior engineers for production use.",
  path: "/services",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
