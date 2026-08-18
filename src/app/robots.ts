// src/app/robots.ts
// ─────────────────────────────────────────────────────────────────────────────
// Served at /robots.txt.
//
// NOTE: Cloudflare can override this file entirely. If Security -> Settings ->
// "Manage your robots.txt" is set to block AI training, Cloudflare injects its
// own managed block (Disallow: / for GPTBot, ClaudeBot, Google-Extended, CCBot
// and friends) and nothing below reaches the wire. Turn that setting off for
// this file to take effect.
// ─────────────────────────────────────────────────────────────────────────────
import type { MetadataRoute } from "next";

const SITE_URL = "https://gits.technology";

// Private surfaces. Every user-agent group must repeat these: per the robots
// spec a crawler obeys ONLY its most specific matching group, so a named group
// without Disallow lines would let that bot crawl /admin and /studio freely —
// which is exactly what the previous version of this file did.
const DISALLOW = ["/api/", "/admin/", "/studio/"];

// /_next/ is deliberately NOT disallowed. Nearly every page here is a client
// component, so Googlebot must fetch the JS and CSS chunks to render any
// content at all. Blocking /_next/ would leave crawlers looking at empty pages.

const AI_CRAWLERS = [
  // OpenAI
  "GPTBot", "ChatGPT-User", "OAI-SearchBot",
  // Anthropic
  "ClaudeBot", "Claude-Web", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  // Google / Apple / Meta / Amazon
  "Google-Extended", "Applebot", "Applebot-Extended",
  "meta-externalagent", "Meta-ExternalFetcher", "Amazonbot",
  // Search-and-answer engines
  "PerplexityBot", "Perplexity-User", "DuckAssistBot", "YouBot",
  "MistralAI-User", "cohere-ai", "Bytespider", "CCBot", "Diffbot",
  "Timpibot", "Omgilibot", "Webzio-Extended", "ImagesiftBot",
];

const SEARCH_CRAWLERS = [
  "Googlebot", "Googlebot-Image", "Googlebot-News", "Google-InspectionTool",
  "Bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "YandexBot", "PetalBot",
];

const SOCIAL_CRAWLERS = [
  "Twitterbot", "LinkedInBot", "WhatsApp", "Discordbot", "TelegramBot",
  "Slackbot", "Pinterestbot", "Snapchat", "TikTokBot", "Instagram",
  "facebookexternalhit",
];

const SEO_CRAWLERS = ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "SiteAuditBot"];

export default function robots(): MetadataRoute.Robots {
  const named = [
    ...AI_CRAWLERS,
    ...SEARCH_CRAWLERS,
    ...SOCIAL_CRAWLERS,
    ...SEO_CRAWLERS,
  ].map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW }));

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: DISALLOW }, ...named],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
