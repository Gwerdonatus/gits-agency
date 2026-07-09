/**
 * app/api/contact/route.ts
 * POST /api/contact — now includes plain text
 */

import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import {
  FROM, ADMIN, generateRefId, formatTimestamp,
  sendEmailPair, generatePlainText,
} from "@/lib/email";
import ContactAdminEmail    from "@/emails/templates/ContactAdminEmail";
import ContactCustomerEmail from "@/emails/templates/ContactCustomerEmail";

interface ContactPayload {
  name: string; email: string; phone?: string; prefer?: string;
  projectType: string; timeline: string; budget: string;
  message: string; company?: string;
}

function validate(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request body." };
  const b = body as Record<string, unknown>;
  if (typeof b.company === "string" && b.company.trim().length > 0) return { ok: false, error: "__honeypot__" };

  const name    = typeof b.name    === "string" ? b.name.trim()    : "";
  const email   = typeof b.email   === "string" ? b.email.trim()   : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (name.length < 2)               return { ok: false, error: "Name is required (minimum 2 characters)." };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "A valid email address is required." };
  if (message.length < 10)           return { ok: false, error: "Please include a message (minimum 10 characters)." };

  return {
    ok: true,
    data: {
      name, email, message,
      phone:       typeof b.phone       === "string" ? b.phone.trim()       : undefined,
      prefer:      typeof b.prefer      === "string" ? b.prefer.trim()      : undefined,
      projectType: typeof b.projectType === "string" ? b.projectType.trim() : "Not specified",
      timeline:    typeof b.timeline    === "string" ? b.timeline.trim()    : "Not specified",
      budget:      typeof b.budget      === "string" ? b.budget.trim()      : "Not specified",
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

  const adminHtml = await render(ContactAdminEmail({
    name: data.name, email: data.email, phone: data.phone, prefer: data.prefer,
    projectType: data.projectType, timeline: data.timeline, budget: data.budget,
    message: data.message, refId, timestamp,
  }));

  const customerHtml = await render(ContactCustomerEmail({
    name: data.name, projectType: data.projectType, refId,
  }));

  const { admin, customer } = await sendEmailPair(
    {
      from:    FROM.contact,
      to:      ADMIN.contact,
      subject: `New contact: ${data.name} — ${data.projectType}`,
      html:    adminHtml,
      text:    generatePlainText(adminHtml),
      replyTo: data.email,
    },
    {
      from:    FROM.support,
      to:      data.email,
      subject: "We received your message — Gits Technology",
      html:    customerHtml,
      text:    generatePlainText(customerHtml),
    }
  );

  console.log("[api/contact] Admin:", admin.ok ? `sent (${admin.id})` : `FAILED: ${admin.error}`);
  console.log("[api/contact] Customer:", customer.ok ? `sent (${customer.id})` : `FAILED: ${customer.error}`);

  if (!admin.ok) return NextResponse.json({ ok: false, error: "Failed to process your submission. Please try again or email us directly." }, { status: 500 });
  return NextResponse.json({ ok: true, id: refId }, { status: 200 });
}