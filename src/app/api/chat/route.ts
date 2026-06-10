// app/api/chat/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// GITS AI Advisor — API route
//
// Patches applied:
//   FIX 1: Accepts `systemPrompt` from the client. If present, it overrides
//           BASE_SYSTEM so the widget's SYSTEM_PROMPT is the source of truth.
//           Falls back to BASE_SYSTEM when called without it (e.g. curl tests).
//
//   FIX 4: Injects `discoveryStage` as a HARD per-turn instruction appended
//           to the system prompt. This is not a guideline — it tells the model
//           exactly which stage it is in and what it must (and must not) do
//           on THIS specific reply. This is what separates "instructed" from
//           "behaviorally enforced".
//
// ENV VARS NEEDED (.env.local / Cloudflare secrets):
//   GROQ_API_KEY
//   SANITY_PROJECT_ID     = vih4pg3q
//   SANITY_DATASET        = production
//   SANITY_API_VERSION    = 2025-05-21
//   SANITY_WRITE_TOKEN    = <Editor token from manage.sanity.io → API → Tokens>
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

const SANITY_PROJECT_ID  = process.env.SANITY_PROJECT_ID  ?? "vih4pg3q";
const SANITY_DATASET     = process.env.SANITY_DATASET     ?? "production";
const SANITY_API_VERSION = process.env.SANITY_API_VERSION ?? "2025-05-21";
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN ?? "";

const SANITY_MUTATIONS_URL =
  `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

/* ─── Sanity helper ─────────────────────────────────────────── */
async function sanityMutate(mutations: object[]) {
  if (!SANITY_WRITE_TOKEN) {
    console.warn("[Sanity] SANITY_WRITE_TOKEN not set — skipping write");
    return;
  }
  try {
    const res = await fetch(SANITY_MUTATIONS_URL, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${SANITY_WRITE_TOKEN}`,
      },
      body: JSON.stringify({ mutations }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("[Sanity] mutation error:", err);
    }
  } catch (e) {
    console.error("[Sanity] fetch error:", e);
  }
}

/* ─── Upsert a lead document ────────────────────────────────── */
async function upsertLead(sessionId: string, patch: Record<string, unknown>) {
  const docId = `advisorLead-${sessionId}`;
  await sanityMutate([
    {
      createIfNotExists: {
        _id:          docId,
        _type:        "advisorLead",
        sessionId,
        leadStatus:   "new",
        leadScore:    0,
        firstSeenAt:  new Date().toISOString(),
        messageCount: 0,
      },
    },
    {
      patch: {
        id:  docId,
        set: {
          ...patch,
          lastActiveAt: new Date().toISOString(),
        },
      },
    },
  ]);
}

/* ─── Entity extraction prompt ──────────────────────────────── */
function buildExtractionPrompt(messages: { role: string; content: string }[]): string {
  const transcript = messages
    .map(m => `${m.role === "user" ? "VISITOR" : "ADVISOR"}: ${m.content}`)
    .join("\n");

  return `You are an expert CRM data extractor. Read this sales conversation and extract any available information.
Return ONLY a valid JSON object — no markdown, no extra text.

Fields to extract (use null if not mentioned):
{
  "visitorName":          string | null,
  "email":                string | null,
  "whatsapp":             string | null,
  "businessName":         string | null,
  "industry":             string | null,
  "projectType":          "Website" | "Mobile App" | "SaaS / Web App" | "AI Automation" | "Internal Tool" | "E-commerce" | "Landing Page" | "Design Only" | "Other" | null,
  "budgetRange":          string | null,
  "timeline":             string | null,
  "goalSummary":          string,
  "leadScore":            number,
  "conversationSummary":  string,
  "discoveryStage":       "goal" | "situation" | "pain" | "impact" | "qualification" | "recommendation"
}

leadScore rules (0–100):
  +20 if they have a real business
  +15 if budget is mentioned
  +15 if timeline is mentioned
  +10 if they asked for pricing
  +15 if project type is clear
  +25 if they asked for a proposal or clicked a CTA

goalSummary: one tight sentence: "Wants to build [X] for [Y] to achieve [Z]"
conversationSummary: 2–3 sentences: what was discussed, what the visitor needs, recommended next step.
discoveryStage: the stage the conversation is currently at.

CONVERSATION:
${transcript}`;
}

/* ─── Fallback BASE_SYSTEM (used when client sends no systemPrompt) ── */
const BASE_SYSTEM = `You are the GITS AI Advisor — a sharp, friendly, senior member of the GITS team (Gwer Intelligent Tech Solutions). You're not a generic chatbot. You think like a real tech consultant who genuinely wants to help visitors figure out what they need and move toward building it with GITS.

Your personality:
- Warm but direct. No fluff, no filler.
- Ask smart ONE-AT-A-TIME follow-up questions to understand the visitor's situation
- Be genuinely helpful even if they're not ready to buy — they'll remember you
- When you sense buying intent, smoothly guide toward booking a call or WhatsApp
- Use light formatting: **bold** for key points, bullet points sparingly
- Never say "I'm just an AI" or similar. You ARE the GITS Advisor.
- Never make up services or pricing outside the ranges below
- Mirror the visitor's energy: technical people get technical answers, non-technical people get plain English

GITS at a glance:
- Full name: Gwer Intelligent Tech Solutions
- Tagline: clarity · speed · quality
- Fully remote, global clients
- Founded by Gwer Msughter Donatus — backend engineer, AI systems, product thinker

Services & realistic pricing:
- Landing page / small site: $500–$2k · 1–2 weeks
- Multi-page website: $1k–$5k · 2–4 weeks
- Mobile app MVP (iOS + Android): $3k–$10k+ · 4–8 weeks
- SaaS / web app: $5k–$20k+ · 4–10 weeks
- AI automation / chatbots / workflows: $1k–$8k · 1–4 weeks
- Internal tools / CRM / dashboards: $2k–$10k · 2–6 weeks
- Chrome extension: $500–$3k · 1–3 weeks
- Integrations / API work: $1k–$5k · 1–3 weeks
- Design only (Figma/UI/UX): custom · 1–3 weeks

Key links (use markdown, only when it's the natural next step):
- Contact / start project: https://gits.donatusgwer.workers.dev/contact
- Free site audit: https://gits.donatusgwer.workers.dev/audit
- Services: https://gits.donatusgwer.workers.dev/services
- Portfolio: https://gits.donatusgwer.workers.dev/what-we-build
- WhatsApp (fastest): https://wa.me/2348116276212
- Book a call: https://calendly.com/donatusgwer
- Email: hellogits@outlook.com`;

/* ─── FIX 4: Discovery stage instruction injector ───────────── */
// This is the core of the behavioral enforcement.
// Each stage gets a HARD instruction telling the model:
//   - what it knows so far
//   - what it must do THIS turn
//   - what it must NOT do yet
// "Must" beats "should". Specificity beats generality.

type DiscoveryStage = "goal" | "situation" | "pain" | "impact" | "qualification" | "recommendation";

function buildStageInstruction(stage: DiscoveryStage, msgCount: number): string {
  const stageInstructions: Record<DiscoveryStage, string> = {
    goal: `
CURRENT DISCOVERY STAGE: 1 — GOAL
Your ONLY job this turn is to understand what the visitor wants to achieve.
Ask ONE question that uncovers their end goal or motivation.
Do NOT ask about their current situation yet.
Do NOT mention pricing, timelines, or services yet.
Do NOT pitch GITS yet.
Good questions: "What's the main thing you're hoping this solves?" / "What made you start looking into this now?" / "What does success look like for you here?"
Keep your reply under 60 words. End with your one question.`,

    situation: `
CURRENT DISCOVERY STAGE: 2 — CURRENT SITUATION
You have a sense of what they want. Now understand what exists today.
Ask ONE question about their current process, tools, or setup.
Do NOT jump to problems or pain yet — just understand what they have.
Do NOT mention pricing or services yet.
Good questions: "How are you handling this today?" / "Do you have anything in place already?" / "What does your current setup look like?"
Keep your reply under 60 words. End with your one question.`,

    pain: `
CURRENT DISCOVERY STAGE: 3 — PAIN DISCOVERY
You understand their goal and current situation. Now find the friction.
Ask ONE question about what's not working, what's frustrating, or what's blocking them.
Do NOT move to impact or consequences yet.
Do NOT mention solutions or pricing yet.
Good questions: "What's been the biggest challenge with that?" / "What's frustrating about how it works today?" / "What's stopping you from getting the result you want?"
Keep your reply under 60 words. End with your one question.`,

    impact: `
CURRENT DISCOVERY STAGE: 4 — IMPACT
You know the pain. Now understand what it costs them to leave it unsolved.
Ask ONE question about consequences — business, time, money, opportunity.
Do NOT qualify budget or timeline yet.
Do NOT pitch a solution yet.
Good questions: "How is that affecting the business right now?" / "What's the cost of this not being solved?" / "What happens if this stays the same for another 6 months?"
Keep your reply under 70 words. End with your one question.`,

    qualification: `
CURRENT DISCOVERY STAGE: 5 — QUALIFICATION
You understand the goal, situation, pain, and impact. Now qualify the opportunity.
Ask ONE question about timeline, budget, or decision-making.
You may now briefly hint that GITS can help — but do NOT recommend a specific service yet.
Good questions: "Do you have a target date you're working toward?" / "Have you set aside a rough budget for this?" / "Who else would be involved in the final decision?"
Keep your reply under 80 words. End with your one question.`,

    recommendation: `
CURRENT DISCOVERY STAGE: 6 — RECOMMENDATION
You have enough information. It's time to recommend a specific solution.
Start with a brief summary of what you've heard: "So if I'm understanding correctly..."
Recap their goal, current situation, core pain, and desired outcome.
Then recommend the specific GITS service that fits best — include a realistic price range and timeline.
End with ONE clear next step: book a call, WhatsApp, or free audit.
Keep your reply under 180 words. This is the close — be specific and confident.`,
  };

  // Extra nudge for very long conversations still in early stages
  const stalledWarning = msgCount >= 10 && (stage === "goal" || stage === "situation")
    ? "\nNOTE: This conversation has gone on a while. The visitor may be hesitant. Acknowledge that and gently ask what's holding them back."
    : "";

  return stageInstructions[stage] + stalledWarning;
}

/* ═══════════════════════════════════════════════════════════════
   POST handler
═══════════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages      = [],
      systemPrompt,           // ← FIX 1: client-provided prompt (may be absent)
      context       = {},
      sessionId,
      ctaClicked,
      source,
    } = body as {
      messages:      { role: string; content: string }[];
      systemPrompt?: string;
      context:       Record<string, unknown>;
      sessionId:     string;
      ctaClicked?:   string;
      source?:       string;
    };

    /* ── FIX 1: Use client systemPrompt if present, else fall back ── */
    const basePrompt = (systemPrompt && systemPrompt.trim().length > 50)
      ? systemPrompt
      : BASE_SYSTEM;

    /* ── Build context note (existing fields) ── */
    let contextNote = "";
    if (context?.userProjectType)                    contextNote += `\nVisitor's project type: ${context.userProjectType}`;
    if ((context?.userBudget as number) > 0)         contextNote += `\nVisitor's stated budget: $${(context.userBudget as number).toLocaleString()}`;
    if (context?.visitorName)                        contextNote += `\nVisitor's name: ${context.visitorName}`;
    if ((context?.qualScore as number) >= 45)        contextNote += `\nHigh buying intent detected.`;
    if (context?.conversationSummary)                contextNote += `\nKnown conversation summary:\n${context.conversationSummary}`;

    /* ── FIX 4: Inject discovery stage as a HARD per-turn instruction ── */
    const discoveryStage = (context?.discoveryStage as DiscoveryStage) ?? "goal";
    const msgCount       = (context?.msgCount       as number)          ?? 0;
    const stageInstruction = buildStageInstruction(discoveryStage, msgCount);

    // The stage instruction goes at the END of the system prompt, after
    // all other context, so it's the last thing the model reads before
    // generating its reply — highest recency weight.
    const systemPromptFinal =
      basePrompt
      + (contextNote ? `\n\n--- CURRENT VISITOR CONTEXT ---${contextNote}` : "")
      + `\n\n--- THIS TURN'S INSTRUCTION ---${stageInstruction}`;

    /* ── Call Groq ── */
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model:       "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPromptFinal },
          ...messages.slice(-12),
        ],
        max_tokens:  400,
        temperature: 0.7,
        stream:      false,
      }),
    });

    let reply = "Something went wrong — please try [contacting the team](https://wa.me/2348116276212) directly.";

    if (groqRes.ok) {
      const groqData = await groqRes.json();
      reply = groqData.choices?.[0]?.message?.content?.trim() ?? reply;
    } else {
      const err = await groqRes.text();
      console.error("[Groq] error:", err);
    }

    /* ── Background Sanity sync (non-blocking) ── */
    if (sessionId) {
      syncToSanity({
        sessionId,
        messages,
        reply,
        ctaClicked,
        source,
        context,
        discoveryStage,
      }).catch(e => console.error("[Sanity sync]", e));
    }

    return NextResponse.json({ reply });

  } catch (e) {
    console.error("[API] route error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ─── Background sync logic ─────────────────────────────────── */
async function syncToSanity(opts: {
  sessionId:      string;
  messages:       { role: string; content: string }[];
  reply:          string;
  ctaClicked?:    string;
  source?:        string;
  context:        Record<string, unknown>;
  discoveryStage: DiscoveryStage;
}) {
  const { sessionId, messages, reply, ctaClicked, source, context, discoveryStage } = opts;

  const fullMessages = [
    ...messages,
    { role: "assistant", content: reply },
  ];

  const userMessages = fullMessages.filter(m => m.role === "user");
  const messageCount = userMessages.length;
  if (messageCount === 0) return;

  const shouldExtract = messageCount === 1 || messageCount % 3 === 0 || !!ctaClicked;

  let extracted: Record<string, unknown> = {};

  if (shouldExtract) {
    try {
      const extractRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "user", content: buildExtractionPrompt(fullMessages) },
          ],
          max_tokens:  500,
          temperature: 0.1,
          stream:      false,
        }),
      });

      if (extractRes.ok) {
        const extractData = await extractRes.json();
        const raw   = extractData.choices?.[0]?.message?.content?.trim() ?? "{}";
        const clean = raw.replace(/```json|```/g, "").trim();
        extracted   = JSON.parse(clean);
      }
    } catch (e) {
      console.warn("[Sanity] extraction parse error:", e);
    }
  }

  let leadStatus = "partial";
  const score = (extracted.leadScore as number) ?? 0;
  if (extracted.email || extracted.whatsapp) leadStatus = "qualified";
  if (score >= 80 || ctaClicked)             leadStatus = "hot";
  if (ctaClicked === "contacted")            leadStatus = "contacted";

  const patch: Record<string, unknown> = {
    messageCount,
    source:         source ?? null,
    leadStatus,
    discoveryStage: (extracted.discoveryStage as string) ?? discoveryStage,
  };

  const extractableFields = [
    "visitorName", "email", "whatsapp", "businessName", "industry",
    "projectType", "budgetRange", "timeline", "goalSummary",
    "leadScore", "conversationSummary",
  ] as const;

  for (const field of extractableFields) {
    if (extracted[field] != null && extracted[field] !== "") {
      patch[field] = extracted[field];
    }
  }

  if (!patch.visitorName && context?.visitorName)            patch.visitorName = context.visitorName;
  if (!patch.projectType && context?.userProjectType)        patch.projectType = context.userProjectType;
  if (!patch.budgetRange && (context?.userBudget as number) > 0) {
    patch.budgetRange = `$${(context.userBudget as number).toLocaleString()}`;
  }

  if (ctaClicked) patch.ctaClicked = ctaClicked;

  patch.transcript = fullMessages.slice(-20).map(m => ({
    _key:    `${m.role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role:    m.role,
    content: m.content,
    time:    new Date().toISOString(),
  }));

  await upsertLead(sessionId, patch);
}