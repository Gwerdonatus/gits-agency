import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(s: string) {
  return (s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clean(s: unknown, max = 4000) {
  return String(s ?? "").trim().slice(0, max);
}

function normalizeUrl(input: string) {
  const v = (input || "").trim();
  if (!v) return v;
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return `https://${v}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot
    const company = clean(body.company, 120);
    if (company) return NextResponse.json({ ok: true });

    const website = normalizeUrl(clean(body.website, 300));
    const email = clean(body.email, 200);
    const industry = clean(body.industry, 200);
    const goal = clean(body.goal, 200);
    const notes = clean(body.notes, 6000);

    const okEmail = /^\S+@\S+\.\S+$/.test(email);

    if (!website || website.length < 6) {
      return NextResponse.json({ ok: false, error: "Website URL is required." }, { status: 400 });
    }
    if (!okEmail) {
      return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
    }

    const to = process.env.AUDIT_TO_EMAIL;
    const from = process.env.AUDIT_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY || !to || !from) {
      return NextResponse.json({ ok: false, error: "Email is not configured. Missing env vars." }, { status: 500 });
    }

    const subject = `New Free Audit Request — ${website}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5;">
        <h2 style="margin:0 0 12px;">New Free Audit Request</h2>
        <div style="padding:14px; border:1px solid #e5e7eb; border-radius:12px; background:#fafafa;">
          <p style="margin:0 0 8px;"><b>Website:</b> ${esc(website)}</p>
          <p style="margin:0 0 8px;"><b>Email:</b> ${esc(email)}</p>
          <p style="margin:0 0 8px;"><b>Industry:</b> ${esc(industry || "-")}</p>
          <p style="margin:0 0 8px;"><b>Primary goal:</b> ${esc(goal || "-")}</p>
          <p style="margin:0;"><b>Notes:</b><br/>${esc(notes || "-").replaceAll("\n", "<br/>")}</p>
        </div>
        <p style="margin:14px 0 0; color:#6b7280; font-size:13px;">
          Reply to this email to contact the lead directly.
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
      text: `New Free Audit Request

Website: ${website}
Email: ${email}
Industry: ${industry || "-"}
Goal: ${goal || "-"}
Notes:
${notes || "-"}`,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Return id for UI confirmation / debugging
    return NextResponse.json({ ok: true, id: data?.id || null });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unexpected server error." }, { status: 500 });
  }
}
