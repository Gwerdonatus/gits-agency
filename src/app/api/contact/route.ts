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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot (spam trap)
    const company = clean(body.company, 120);
    if (company) return NextResponse.json({ ok: true });

    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const projectType = clean(body.projectType, 80);
    const timeline = clean(body.timeline, 80);
    const budget = clean(body.budget, 80);
    const prefer = clean(body.prefer, 80);
    const phone = clean(body.phone, 80);
    const message = clean(body.message, 6000);

    const okEmail = /^\S+@\S+\.\S+$/.test(email);

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
    }
    if (!okEmail) {
      return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json({ ok: false, error: "Message is too short." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY || !to || !from) {
      return NextResponse.json(
        { ok: false, error: "Email is not configured. Missing env vars." },
        { status: 500 }
      );
    }

    const subject = `New Contact Message — ${name}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5;">
        <h2 style="margin:0 0 12px;">New Contact Message</h2>
        <div style="padding:14px; border:1px solid #e5e7eb; border-radius:12px; background:#fafafa;">
          <p style="margin:0 0 8px;"><b>Name:</b> ${esc(name)}</p>
          <p style="margin:0 0 8px;"><b>Email:</b> ${esc(email)}</p>
          <p style="margin:0 0 8px;"><b>Phone:</b> ${esc(phone || "-")}</p>
          <p style="margin:0 0 8px;"><b>Project type:</b> ${esc(projectType || "-")}</p>
          <p style="margin:0 0 8px;"><b>Timeline:</b> ${esc(timeline || "-")}</p>
          <p style="margin:0 0 8px;"><b>Budget:</b> ${esc(budget || "-")}</p>
          <p style="margin:0 0 8px;"><b>Preferred contact:</b> ${esc(prefer || "-")}</p>
          <p style="margin:0;"><b>Message:</b><br/>${esc(message).replaceAll("\n", "<br/>")}</p>
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
      text: `New Contact Message
Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Project type: ${projectType || "-"}
Timeline: ${timeline || "-"}
Budget: ${budget || "-"}
Preferred contact: ${prefer || "-"}
Message:
${message}
`,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id || null });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unexpected server error." },
      { status: 500 }
    );
  }
}
