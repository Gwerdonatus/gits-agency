// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://gits.donatusgwer.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL,                        lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/services`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/what-we-build`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/about`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${SITE_URL}/blog`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/contact`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.75 },
    { url: `${SITE_URL}/audit`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.8 },
  ];
}