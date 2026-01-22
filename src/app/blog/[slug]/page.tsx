// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../data";
import BlogPostClient from "./BlogPostClient";

function normalizeSlug(input: string) {
  try {
    return decodeURIComponent(input).trim().toLowerCase();
  } catch {
    return input.trim().toLowerCase();
  }
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved = await Promise.resolve(params);
  const slug = normalizeSlug(resolved.slug);

  const post = BLOG_POSTS.find((p) => normalizeSlug(p.slug) === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 4);

  // ✅ Pass data down to the client component
  return <BlogPostClient post={post} related={related} />;
}
