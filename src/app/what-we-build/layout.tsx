// Server wrapper: page.tsx is a client component and cannot export metadata.
// Without this the route inherits the root layout's canonical, which points
// at the homepage and tells search engines this page is a duplicate of it.
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Our Work",
  description: "Live client work from GITS — e-commerce, crypto trading, pharmacy, construction and retail platforms, with the build breakdown behind each project.",
  path: "/what-we-build",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
