/**
 * app/api/audit/route.ts
 * POST /api/audit
 */

import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import { FROM, ADMIN, generateRefId, formatTimestamp, sendEmailPair } from "@/lib/email";
import AuditAdminEmail    from "@/emails/templates/AuditAdminEmail";
import AuditCustomerEmail from "@/emails/templates/AuditCustomerEmail";

interface AuditPayload {
  website: string; email: string;
  industry?: string; goal?: string; notes?: string;
}

function normalizeUrl(input: string): string {
  const v = input.trim();
  if (!v) return v;
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return `https://${v}`;
}

function validate(body: unknown): { ok: true; data: AuditPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request body." };
  const b = body as Record<string, unknown>;
  if (typeof b.company === "string" && b.company.trim().length > 0) return { ok: false, error: "__honeypot__" };

  const rawWebsite = typeof b.website === "string" ? b.website.trim() : "";
  const email      = typeof b.email   === "string" ? b.email.trim()   : "";

  if (rawWebsite.length < 4)           return { ok: false, error: "A valid website URL is required." };
  if (!/^\S+@\S+\.\S+$/.test(email))   return { ok: false, error: "A valid email address is required." };

  const website = normalizeUrl(rawWebsite);
  try { new URL(website); } catch { return { ok: false, error: "Please enter a valid website URL (e.g. example.com)." }; }

  return {
    ok: true,
    data: {
      website, email,
      industry: typeof b.industry === "string" && b.industry.trim() ? b.industry.trim() : undefined,
      goal:     typeof b.goal     === "string" && b.goal.trim()     ? b.goal.trim()     : undefined,
      notes:    typeof b.notes    === "string" && b.notes.trim()    ? b.notes.trim()    : undefined,
    },
  };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 }); }

  const validation = validate(body);
  if (!validation.ok && validation.error === "__honeypot__") return NextResponse.json({ ok: true, id: "bot" });
  if (!validation.ok) return NextResponse.json({ ok: false, error: validation.error }, { status: 422 });

  const { data } = validation;
  const refId     = generateRefId();
  const timestamp = formatTimestamp();

  const adminHtml = await render(AuditAdminEmail({
    website: data.website, email: data.email, industry: data.industry,
    goal: data.goal, notes: data.notes, refId, timestamp,
  }));

  const customerHtml = await render(AuditCustomerEmail({
    email: data.email, website: data.website, refId,
  }));

  const { admin, customer } = await sendEmailPair(
    { from: FROM.audit, to: ADMIN.audit, subject: `New audit request: ${data.website}`, html: adminHtml, replyTo: data.email },
    { from: FROM.audit, to: data.email,  subject: "Your audit request is in the queue — Gits Technology", html: customerHtml }
  );

  console.log("[api/audit] Admin:", admin.ok ? `sent (${admin.id})` : `FAILED: ${admin.error}`);
  console.log("[api/audit] Customer:", customer.ok ? `sent (${customer.id})` : `FAILED: ${customer.error}`);

  if (!admin.ok) return NextResponse.json({ ok: false, error: "Failed to process your submission. Please try again or email audit@gits.technology directly." }, { status: 500 });
  return NextResponse.json({ ok: true, id: refId }, { status: 200 });
}