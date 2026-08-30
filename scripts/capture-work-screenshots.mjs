// scripts/capture-work-screenshots.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Captures the portfolio screenshots used on /services/websites-digital-experiences.
//
//   node scripts/capture-work-screenshots.mjs
//
// Re-run it whenever a client site is redesigned. Output goes straight to
// public/services/work as WebP at roughly 2x the size the frames render at.
// ─────────────────────────────────────────────────────────────────────────────
import puppeteer from "puppeteer";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "services", "work");
fs.mkdirSync(OUT, { recursive: true });

const SITES = [
  { slug: "notgate", url: "https://notgate-w6l1.vercel.app/" },
  { slug: "lamed", url: "https://lamed-pharmacy.vercel.app/" },
  // Elowen is served from this site; capture whatever origin is given.
  { slug: "elowen", url: process.env.SITE_ORIGIN
      ? `${process.env.SITE_ORIGIN}/elowen-living`
      : "https://gits.technology/elowen-living" },
];

const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };

const browser = await puppeteer.launch({ headless: true });
let failures = 0;

for (const site of SITES) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  try {
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 60_000 });

    // Hide chrome that belongs to us rather than to the client's design: the
    // Next.js dev indicator, and the GITS advisor widget, which appears on
    // Elowen because that project is served from this site.
    await page.addStyleTag({
      content: `
        [data-nextjs-dev-indicator], nextjs-portal,
        [class*="gits-advisor"], [class*="GITSAdvisor"], [aria-label*="Advisor"] {
          display: none !important;
        }
      `,
    });

    // Several of these animate the hero in; give it time to land.
    await new Promise((r) => setTimeout(r, 4500));

    const raw = await page.screenshot({ type: "png" });
    const out = path.join(OUT, `${site.slug}.webp`);
    await sharp(raw)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(out);

    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`  ${site.slug.padEnd(10)} ${String(kb).padStart(4)}KB  ${site.url}`);
  } catch (err) {
    failures++;
    console.log(`  ${site.slug.padEnd(10)} FAILED  ${site.url}\n             ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
process.exit(failures ? 1 : 0);
