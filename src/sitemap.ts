// src/app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
// Dynamic sitemap generator for Next.js App Router.
// Run locally: GET /sitemap.xml
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next";

const SITE_URL = "https://gits.technology";

async function getBlogSlugs(): Promise<string[]> {
  try {
    const { getAllPosts } = await import("@/lib/posts");
    const posts = await getAllPosts();
    return posts.map((p: { slug: string }) => p.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getBlogSlugs();

  // ── Static pages — ordered by SEO priority ──────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    // Tier 1 — Homepage
    { url: SITE_URL,                                                         lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },

    // Tier 2 — Core service hub + conversion pages
    { url: `${SITE_URL}/services`,                                           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`,                                            lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/audit`,                                              lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // Tier 3 — Individual service pages (high keyword value)
    { url: `${SITE_URL}/services/custom-software-development`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/services/websites-digital-experiences`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/services/ai-business-automation`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/services/internal-tools-crm`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },
    { url: `${SITE_URL}/services/integrations-apis`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.88 },

    // Tier 4 — Portfolio & blog hub
    { url: `${SITE_URL}/what-we-build`,                                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`,                                               lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
  ];

  // ── Blog posts ──────────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}