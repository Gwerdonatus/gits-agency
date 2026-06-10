import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAllSlugs } from "@/lib/posts";
import BlogPostClient from "./BlogPostClient";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 4);

  return <BlogPostClient post={post as any} related={related as any} />;
}