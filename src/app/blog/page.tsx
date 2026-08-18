import { getAllPosts } from "@/lib/posts";
import BlogIndexClient from "./BlogIndexClient";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Build insights, design notes and short industry takes from the GITS studio — on software architecture, AI automation, and shipping work that lasts.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
