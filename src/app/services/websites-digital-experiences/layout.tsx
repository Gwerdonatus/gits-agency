// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Websites & Digital Experiences",
  description: "Corporate sites, e-commerce and landing pages built with Next.js — mobile-first, fast, and engineered to convert rather than merely look good.",
  path: "/services/websites-digital-experiences",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
