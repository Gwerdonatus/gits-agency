// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://gits.technology";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Core pages ─────────────────────────────────────────────
    { url: SITE_URL,                        lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/services`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/what-we-build`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/about`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${SITE_URL}/blog`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/contact`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.75 },
    { url: `${SITE_URL}/audit`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.8 },

    // ── Individual service pages (REAL slugs from your services page code) ──
    // These MUST match the slugs in your SERVICES array exactly:
    // { icon: "💻", slug: "custom-software-development", ... }
    // { icon: "🌐", slug: "websites-digital-experiences", ... }
    // { icon: "🤖", slug: "ai-business-automation", ... }
    // { icon: "📊", slug: "internal-tools-crm", ... }
    // { icon: "🔗", slug: "integrations-apis", ... }

    { url: `${SITE_URL}/services/custom-software-development`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/websites-digital-experiences`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/ai-business-automation`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.95 },
    { url: `${SITE_URL}/services/internal-tools-crm`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/services/integrations-apis`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },

    // ── NEW: WhatsApp AI Agents (your flagship service) ──────
    // NOTE: This page does NOT exist in your current SERVICES array yet.
    // You need to create this page OR add it to your SERVICES array.
    // If you add it to SERVICES, use the slug "whatsapp-ai-agents".
    { url: `${SITE_URL}/services/whatsapp-ai-agents`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.95 },

    // ── Blog posts (uncomment as you publish) ─────────────────
    // { url: `${SITE_URL}/blog/ai-agency-guide`,                  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    // { url: `${SITE_URL}/blog/whatsapp-ai-agents-business`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    // { url: `${SITE_URL}/blog/choosing-ai-agency-2026`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
  ];
}