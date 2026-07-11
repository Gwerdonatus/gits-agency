// src/app/robots.ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://gits.technology";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all, block internals
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Google crawlers
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Google-InspectionTool", allow: "/" },
      // AI / LLM crawlers — explicitly allowed
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "ImagesiftBot", allow: "/" },
      // Search engines
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Slurp", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Baiduspider", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },
      // Social / preview bots
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "WhatsApp", allow: "/" },
      { userAgent: "Discordbot", allow: "/" },
      { userAgent: "TelegramBot", allow: "/" },
      { userAgent: "Slackbot", allow: "/" },
      { userAgent: "Pinterestbot", allow: "/" },
      { userAgent: "Snapchat", allow: "/" },
      { userAgent: "TikTokBot", allow: "/" },
      { userAgent: "Instagram", allow: "/" },
      // SEO tools
      { userAgent: "AhrefsBot", allow: "/" },
      { userAgent: "SemrushBot", allow: "/" },
      { userAgent: "MJ12bot", allow: "/" },
      { userAgent: "DotBot", allow: "/" },
      { userAgent: "SiteAuditBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}