/**
 * app/api/newsletter/route.ts
 * POST /api/newsletter
 * Now: Resend Audiences + unsubscribe token + plain text
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import {
  FROM, ADMIN, formatTimestamp,
  sendEmailPair, generatePlainText,
} from "@/lib/email";
import NewsletterAdminEmail   from "@/emails/templates/NewsletterAdminEmail";
import NewsletterWelcomeEmail from "@/emails/templates/NewsletterWelcomeEmail";

// ── Unsubscribe token ─────────────────────────────────
// A simple, non-guessable token tied to the email.
// In production, store this in your DB alongside the subscriber.
// For now: base64(email) + random suffix — good enough for low volume.
function generateUnsubscribeToken(email: string): string {
  const b64   = Buffer.from(email.toLowerCase()).toString("base64url");
  const rand  = Math.random().toString(36).slice(2, 8);
  return `${b64}.${rand}`;
}

// ── Rate limit (in-memory) ────────────────────────────
const recentSignups = new Map<string, number>();
const RATE_LIMIT_MS = 60 * 1000;

function isRateLimited(email: string): boolean {
  const last = recentSignups.get(email);
  if (!last) return false;
  if (Date.now() - last < RATE_LIMIT_MS) return true;
  recentSignups.delete(email);
  return false;
}

function recordSignup(email: string): void {
  recentSignups.set(email, Date.now());
  if (recentSignups.size > 500) {
    const cutoff = Date.now() - RATE_LIMIT_MS * 2;
    for (const [k, v] of recentSignups.entries()) {
      if (v < cutoff) recentSignups.delete(k);
    }
  }
}

// ── Validation ────────────────────────────────────────
function validate(body: unknown): { ok: true; email: string } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request body." };
  const b = body as Record<string, unknown>;
  if (typeof b.name === "string" && b.name.trim().length > 0) return { ok: false, error: "__honeypot__" };

  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  if (!email)                          return { ok: false, error: "An email address is required." };
  if (!/^\S+@\S+\.\S+$/.test(email))  return { ok: false, error: "Please enter a valid email address." };
  if (email.length > 320)             return { ok: false, error: "Email address is too long." };

  return { ok: true, email };
}

// ── Route handler ─────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 }); }

  const validation = validate(body);
  if (!validation.ok && validation.error === "__honeypot__") return NextResponse.json({ ok: true });
  if (!validation.ok) return NextResponse.json({ ok: false, error: validation.error }, { status: 422 });

  const { email } = validation;
  if (isRateLimited(email)) return NextResponse.json({ ok: true });

  const timestamp        = formatTimestamp();
  const unsubscribeToken = generateUnsubscribeToken(email);

  // ── 1. Add to Resend Audiences ──────────────────────
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
      console.log(`[api/newsletter] Added to Resend Audience: ${email}`);
    } catch (err) {
      // Non-fatal — log and continue. Duplicate contacts throw here too.
      console.warn("[api/newsletter] Resend Audience upsert failed:", err);
    }
  } else {
    console.warn("[api/newsletter] RESEND_AUDIENCE_ID not set — skipping audience sync.");
  }

  // ── 2. Render HTML + plain text ─────────────────────
  const adminHtml   = await render(NewsletterAdminEmail({ email, timestamp }));
  const welcomeHtml = await render(
    NewsletterWelcomeEmail({ email, unsubscribeToken })
  );

  const adminText   = generatePlainText(adminHtml);
  const welcomeText = generatePlainText(welcomeHtml);

  // ── 3. Send both emails ─────────────────────────────
  const { admin, customer } = await sendEmailPair(
    {
      from:    FROM.hello,
      to:      ADMIN.hello,
      subject: `New subscriber: ${email}`,
      html:    adminHtml,
      text:    adminText,
    },
    {
      from:    FROM.hello,
      to:      email,
      subject: "Welcome to Gits Technology",
      html:    welcomeHtml,
      text:    welcomeText,
    }
  );

  console.log("[api/newsletter] Admin:", admin.ok ? `sent (${admin.id})` : `FAILED: ${admin.error}`);
  console.log("[api/newsletter] Welcome:", customer.ok ? `sent (${customer.id})` : `FAILED: ${customer.error}`);

  recordSignup(email);

  if (!admin.ok && !customer.ok) {
    return NextResponse.json({ ok: false, error: "Subscription failed. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}