import { client } from "@/sanity/lib/client";
import { ALL_POSTS_QUERY, POST_BY_SLUG_QUERY, ALL_SLUGS_QUERY } from "@/sanity/lib/queries";
import { BLOG_POSTS } from "@/app/blog/data";

// ─── Types ─────────────────────────────────────────────────────────────────

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "video"; url: string; caption?: string };

export type UniversalPost = {
  slug: string;
  title: string;
  date: string;
  readTime?: string;
  category: string;
  tags?: string[];
  coverImage: string;
  summary: string;
  excerpt?: string;
  highlights?: string[];
  videoUrl?: string;
  postType?: string;
  content?: ContentBlock[];
};

// ─── Fetch Sanity posts ─────────────────────────────────────────────────────

export async function getSanityPosts(): Promise<UniversalPost[]> {
  try {
    return await client.fetch(ALL_POSTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch (e) {
    console.error("Sanity fetch failed:", e);
    return [];
  }
}

export async function getSanityPostBySlug(slug: string): Promise<UniversalPost | null> {
  try {
    return await client.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } });
  } catch (e) {
    console.error("Sanity post fetch failed:", e);
    return null;
  }
}

export async function getSanitySlugs(): Promise<string[]> {
  try {
    return await client.fetch(ALL_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}

// ─── Normalize static posts to UniversalPost shape ─────────────────────────

function normalizeStaticPost(p: (typeof BLOG_POSTS)[number]): UniversalPost {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    readTime: "readTime" in p ? (p as any).readTime : undefined,
    category: p.category,
    tags: "tags" in p ? (p as any).tags : undefined,
    coverImage: p.coverImage,
    summary: p.summary,
    excerpt: "excerpt" in p ? (p as any).excerpt : undefined,
    highlights: "highlights" in p ? (p as any).highlights : undefined,
    videoUrl: "videoUrl" in p ? (p as any).videoUrl : undefined,
    content: "content" in p ? (p as any).content : undefined,
  };
}

// ─── Merged getters ─────────────────────────────────────────────────────────

// Sanity posts first (newest), then static posts
export async function getAllPosts(): Promise<UniversalPost[]> {
  const sanity = await getSanityPosts();
  const staticPosts = BLOG_POSTS.map(normalizeStaticPost);
  return [...sanity, ...staticPosts];
}

// Check Sanity first, fall back to static
export async function getPostBySlug(slug: string): Promise<UniversalPost | null> {
  const sanity = await getSanityPostBySlug(slug);
  if (sanity) return sanity;

  const found = BLOG_POSTS.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );
  return found ? normalizeStaticPost(found) : null;
}

// All slugs for generateStaticParams
export async function getAllSlugs(): Promise<string[]> {
  const sanitySlugs = await getSanitySlugs();
  const staticSlugs = BLOG_POSTS.map((p) => p.slug);
  return [...new Set([...sanitySlugs, ...staticSlugs])];
}