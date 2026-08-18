// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://gits.technology";

// Only slugs that have a real page on disk. /services/whatsapp-ai-agents was
// listed here previously and returned 404 — a dead entry in a sitemap wastes
// crawl budget and is treated as a quality signal against the whole file.
const SERVICE_SLUGS = [
  "custom-software-development",
  "websites-digital-experiences",
  "ai-business-automation",
  "internal-tools-crm",
  "integrations-apis",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL,                    lastModified: now, changeFrequency: "monthly", priority: 1.0  },
    { url: `${SITE_URL}/services`,      lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/what-we-build`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/about`,         lastModified: now, changeFrequency: "yearly",  priority: 0.7  },
    { url: `${SITE_URL}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.8  },
    { url: `${SITE_URL}/contact`,       lastModified: now, changeFrequency: "yearly",  priority: 0.75 },
    { url: `${SITE_URL}/audit`,         lastModified: now, changeFrequency: "yearly",  priority: 0.8  },
    { url: `${SITE_URL}/privacy`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3  },
    { url: `${SITE_URL}/terms`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3  },
  ];

  const services: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Generated from the posts themselves so publishing a post lists it here
  // automatically — the previous file had them commented out by hand.
  let posts: MetadataRoute.Sitemap = [];
  try {
    const all = await getAllPosts();
    posts = all.map((p: { slug: string; date?: string }) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    posts = [];
  }

  return [...core, ...services, ...posts];
}
