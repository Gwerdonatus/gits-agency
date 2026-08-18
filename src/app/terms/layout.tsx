// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing use of the GITS website and services.",
  path: "/terms",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
