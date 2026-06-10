import { BLOG_POSTS } from "@/app/blog/data";

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Normalize static posts ──────────────────────────────────────────────────

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

const STATIC_POSTS: UniversalPost[] = BLOG_POSTS.map(normalizeStaticPost);

// ─── Sanity fetch (only runs if env vars are present) ────────────────────────

async function fetchSanityPosts(): Promise<UniversalPost[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-21";

  // Skip entirely if Sanity isn't configured yet
  if (!projectId) return [];

  try {
    const { createClient } = await import("next-sanity");
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN,
    });

    const query = `
      *[_type == "post"] | order(date desc) {
        "slug": slug.current,
        title,
        date,
        readTime,
        category,
        tags,
        "coverImage": coverImage.asset->url + "?w=1200&auto=format",
        summary,
        excerpt,
        postType
      }
    `;

    const posts = await client.fetch(query, {}, { next: { revalidate: 60 } });
    return Array.isArray(posts) ? posts : [];
  } catch (err) {
    console.warn("[posts] Sanity fetch failed, using static posts only:", err);
    return [];
  }
}

async function fetchSanityPostBySlug(slug: string): Promise<UniversalPost | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-21";

  if (!projectId) return null;

  try {
    const { createClient } = await import("next-sanity");
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN,
    });

    const query = `
      *[_type == "post" && slug.current == $slug][0] {
        "slug": slug.current,
        title,
        date,
        readTime,
        category,
        tags,
        "coverImage": coverImage.asset->url + "?w=1200&auto=format",
        summary,
        excerpt,
        highlights,
        videoUrl,
        postType,
        content[] {
          type,
          text,
          items,
          url,
          caption
        }
      }
    `;

    const post = await client.fetch(query, { slug }, { next: { revalidate: 60 } });
    return post || null;
  } catch (err) {
    console.warn("[posts] Sanity slug fetch failed:", err);
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/** Returns Sanity posts (newest) + all static posts from data.ts */
export async function getAllPosts(): Promise<UniversalPost[]> {
  const sanity = await fetchSanityPosts();
  return [...sanity, ...STATIC_POSTS];
}

/** Checks Sanity first, then falls back to static data.ts posts */
export async function getPostBySlug(slug: string): Promise<UniversalPost | null> {
  const normalized = slug.trim().toLowerCase();

  const sanityPost = await fetchSanityPostBySlug(normalized);
  if (sanityPost) return sanityPost;

  return STATIC_POSTS.find((p) => p.slug.toLowerCase() === normalized) ?? null;
}

/** All slugs from both sources — for generateStaticParams */
export async function getAllSlugs(): Promise<string[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-21";

  let sanitySlugs: string[] = [];

  if (projectId) {
    try {
      const { createClient } = await import("next-sanity");
      const client = createClient({ projectId, dataset, apiVersion, useCdn: true });
      const result = await client.fetch(`*[_type == "post"].slug.current`);
      sanitySlugs = Array.isArray(result) ? result : [];
    } catch {
      sanitySlugs = [];
    }
  }

  const staticSlugs = STATIC_POSTS.map((p) => p.slug);
  return [...new Set([...sanitySlugs, ...staticSlugs])];
}