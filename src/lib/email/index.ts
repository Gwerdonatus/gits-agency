/**
 * lib/email/index.ts
 * Centralized email utility for Gits Technology.
 */

import { Resend } from "resend";
import type { CreateEmailOptions } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("[gits/email] RESEND_API_KEY is not set.");
    _resend = new Resend(key);
  }
  return _resend;
}

export const FROM = {
  hello:    process.env.EMAIL_FROM_HELLO    ?? "Gits Technology <hello@gits.technology>",
  support:  process.env.EMAIL_FROM_SUPPORT  ?? "Gits Support <support@gits.technology>",
  audit:    process.env.EMAIL_FROM_AUDIT    ?? "Gits Audits <audit@gits.technology>",
  contact:  process.env.EMAIL_FROM_CONTACT  ?? "Gits Contact <contact@gits.technology>",
  projects: process.env.EMAIL_FROM_PROJECTS ?? "Gits Projects <projects@gits.technology>",
} as const;

export const ADMIN = {
  hello:    "hello@gits.technology",
  support:  "support@gits.technology",
  audit:    "audit@gits.technology",
  contact:  "contact@gits.technology",
  projects: "projects@gits.technology",
} as const;

export function generateRefId(): string {
  const hex = Math.random().toString(16).slice(2, 10).toUpperCase();
  const ts  = Date.now().toString(16).slice(-4).toUpperCase();
  return `GITS-${hex}${ts}`;
}

export function formatTimestamp(date = new Date()): string {
  return (
    date.toLocaleString("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Africa/Lagos",
    }) + " WAT"
  );
}

// ── Plain text generator ──────────────────────────────
// Converts rendered HTML email to clean plain text.
// Used as the `text` fallback in every send call.
export function generatePlainText(html: string): string {
  return html
    // Remove <style> and <head> blocks entirely
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
    // Block elements → newlines
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "  • ")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<h[1-6][^>]*>/gi, "\n")
    .replace(/<hr[^>]*>/gi, "\n──────────────────────────────\n")
    // Links → text (url)
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
    // Strip remaining tags
    .replace(/<[^>]+>/g, "")
    // Decode common HTML entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&apos;/g, "'")
    // Collapse excessive whitespace / blank lines
    .replace(/\t/g, " ")
    .replace(/ {2,}/g, " ")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

// ── Send helper ───────────────────────────────────────
export interface SendResult {
  ok: boolean;
  id?: string;
  error?: string;
}

export async function sendEmail(
  options: Omit<CreateEmailOptions, "from"> & { from: string }
): Promise<SendResult> {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send(
      options as CreateEmailOptions
    );
    if (error) {
      console.error("[gits/email] Resend error:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true, id: data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[gits/email] Send exception:", msg);
    return { ok: false, error: msg };
  }
}

export async function sendEmailPair(
  adminOptions:    Omit<CreateEmailOptions, "from"> & { from: string },
  customerOptions: Omit<CreateEmailOptions, "from"> & { from: string }
): Promise<{ admin: SendResult; customer: SendResult }> {
  const [admin, customer] = await Promise.allSettled([
    sendEmail(adminOptions),
    sendEmail(customerOptions),
  ]);
  return {
    admin:    admin.status    === "fulfilled" ? admin.value    : { ok: false, error: String(admin.reason)    },
    customer: customer.status === "fulfilled" ? customer.value : { ok: false, error: String(customer.reason) },
  };
}