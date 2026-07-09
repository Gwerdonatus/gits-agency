// src/app/robots.ts
// ─────────────────────────────────────────────────────────────────────────────
// Programmatic robots.txt for Next.js App Router.
// Serves at: /robots.txt
//
// KEY DECISION: We ALLOW all major AI crawlers explicitly.
// Most sites accidentally block GPTBot, ClaudeBot etc. via wildcard Disallow.
// For an agency that wants AEO (Answer Engine Optimization), being crawlable
// by AI models is as important as being crawlable by Google.
//
// Crawlers allowed here:
//   GPTBot         — OpenAI / ChatGPT
//   ClaudeBot      — Anthropic / Claude
//   anthropic-ai   — Anthropic training crawler
//   PerplexityBot  — Perplexity AI
//   Googlebot      — Google Search
//   Bingbot        — Microsoft Bing / Copilot
//   facebookexternalhit — Meta/Facebook link previews
//   LinkedInBot    — LinkedIn link previews
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next";

const SITE_URL = "https://gits.technology";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Standard search crawlers ──────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // ── AI answer engine crawlers — ALLOW ALL ─────────────────────────────
      // These power ChatGPT, Claude, Perplexity, Bing Copilot citations.
      // If you block these, AI models cannot cite you.
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "YouBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // ── Social preview crawlers ───────────────────────────────────────────
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      // ── Catch-all for everything else ─────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}