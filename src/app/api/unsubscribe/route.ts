/**
 * app/api/unsubscribe/route.ts
 * GET /api/unsubscribe?token=xxx
 *
 * One-click unsubscribe handler.
 * Decodes the token → extracts email → removes from Resend Audiences
 * → returns a clean HTML confirmation page inline.
 *
 * No extra Next.js page needed — this route IS the confirmation page.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Decode token → email ──────────────────────────────
// Token format: base64url(email).randomSuffix
function decodeToken(token: string): string | null {
  try {
    const [b64] = token.split(".");
    if (!b64) return null;
    const decoded = Buffer.from(b64, "base64url").toString("utf-8");
    // Basic sanity check
    if (!/^\S+@\S+\.\S+$/.test(decoded)) return null;
    return decoded;
  } catch {
    return null;
  }
}

// ── HTML response pages ───────────────────────────────
function successPage(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribed — Gits Technology</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
      background: #f8f8f8;
      color: #0a0a0a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      padding: 48px 40px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    }
    .mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: #0a0a0a;
      color: #fff;
      font-size: 20px;
      margin-bottom: 24px;
    }
    .wordmark {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 32px;
      display: block;
    }
    h1 {
      font-size: 22px;
      font-weight: 500;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
      color: #0a0a0a;
    }
    p {
      font-size: 14px;
      line-height: 1.7;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .email-pill {
      display: inline-block;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      border-radius: 100px;
      padding: 4px 14px;
      font-size: 12px;
      color: #374151;
      margin: 12px 0 24px;
      font-family: 'Courier New', monospace;
    }
    .back {
      display: inline-block;
      background: #0a0a0a;
      color: #fff;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      padding: 10px 24px;
      border-radius: 8px;
      margin-top: 8px;
      transition: opacity 0.15s;
    }
    .back:hover { opacity: 0.85; }
  </style>
</head>
<body>
  <div class="card">
    <div class="mark">✓</div>
    <span class="wordmark">GITS.</span>
    <h1>You've been unsubscribed.</h1>
    <p>You won't receive any more newsletter emails from Gits Technology.</p>
    <div class="email-pill">${email}</div>
    <p style="font-size:12px; color:#9ca3af;">
      Changed your mind? You can always re-subscribe from our website.
    </p>
    <a href="https://gits.technology" class="back">Back to gits.technology</a>
  </div>
</body>
</html>`;
}

function errorPage(reason: "invalid" | "failed"): string {
  const messages = {
    invalid: { heading: "Invalid unsubscribe link.", body: "This link may have expired or been used already. If you'd like to unsubscribe, please email <strong>hello@gits.technology</strong> and we'll remove you immediately." },
    failed:  { heading: "Something went wrong.",     body: "We couldn't process your unsubscribe request right now. Please email <strong>hello@gits.technology</strong> and we'll remove you manually within 24 hours." },
  };

  const { heading, body } = messages[reason];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribe — Gits Technology</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
      background: #f8f8f8;
      color: #0a0a0a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: #ffffff;
      border: 1px solid #fecaca;
      border-radius: 16px;
      padding: 48px 40px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    }
    .wordmark {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 32px;
      display: block;
    }
    h1 { font-size: 20px; font-weight: 500; margin-bottom: 12px; }
    p  { font-size: 14px; line-height: 1.7; color: #6b7280; }
    .back {
      display: inline-block;
      background: #0a0a0a;
      color: #fff;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      padding: 10px 24px;
      border-radius: 8px;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="wordmark">GITS.</span>
    <h1>${heading}</h1>
    <p>${body}</p>
    <a href="https://gits.technology" class="back">Back to gits.technology</a>
  </div>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") ?? "";

  const email = decodeToken(token);

  if (!email) {
    return new NextResponse(errorPage("invalid"), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // ── Remove from Resend Audiences ────────────────────
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (audienceId) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Resend requires the contact ID to delete, so we fetch it first by email
      const { data: contacts } = await resend.contacts.list({ audienceId });
      const contact = contacts?.data?.find(
        (c: { email: string }) => c.email.toLowerCase() === email.toLowerCase()
      );

      if (contact?.id) {
        await resend.contacts.remove({ audienceId, id: contact.id });
        console.log(`[api/unsubscribe] Removed ${email} from audience ${audienceId}`);
      } else {
        // Contact not found in list — mark as unsubscribed anyway
        await resend.contacts.create({
          email,
          audienceId,
          unsubscribed: true,
        });
        console.log(`[api/unsubscribe] Marked ${email} as unsubscribed`);
      }
    } catch (err) {
      console.error("[api/unsubscribe] Resend error:", err);
      return new NextResponse(errorPage("failed"), {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  } else {
    // No audience configured — log and still show success
    // (manual removal fallback)
    console.warn(`[api/unsubscribe] No RESEND_AUDIENCE_ID set. Manual removal needed for: ${email}`);
  }

  return new NextResponse(successPage(email), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Prevent caching — each unsubscribe is a one-time action
      "Cache-Control": "no-store",
    },
  });
}