// app/api/chat/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// GITS AI Advisor — API route v3.0
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
  "projectType":          "AI Automation" | "Custom Software" | "Integration / API" | "Internal Tool / CRM" | "UI/UX Design" | "Mobile App" | "SaaS / Web App" | "E-commerce" | "Landing Page" | "Other" | null,
  "budgetRange":          string | null,
  "timeline":             string | null,
  "currentTools":         string | null,
  "goalSummary":          string,
  "painSummary":          string | null,
  "leadScore":            number,
  "conversationSummary":  string,
  "discoveryStage":       "goal" | "situation" | "pain" | "impact" | "qualification" | "recommendation"
}

leadScore rules (0–100):
  +20 if they have a real business with a named industry
  +15 if budget is mentioned or implied
  +15 if timeline is mentioned
  +10 if they asked about pricing
  +15 if project type is specific and clear
  +10 if they named a current tool they want to replace
  +25 if they asked for a proposal, clicked a CTA, or requested next steps

goalSummary: one tight sentence: "Wants to build [X] for [Y] to achieve [Z]"
painSummary: one sentence on the core problem if known, else null
conversationSummary: 2–3 sentences covering what was discussed, the visitor's core need, and recommended next step.
currentTools: comma-separated list of any tools the visitor mentioned using (HubSpot, Excel, WhatsApp, etc.)

CONVERSATION:
${transcript}`;
}

/* ─── Discovery stage types ─────────────────────────────────── */
type DiscoveryStage =
  | "goal"
  | "situation"
  | "pain"
  | "impact"
  | "qualification"
  | "recommendation";

/* ─── Stage instruction injector ────────────────────────────── */
function buildStageInstruction(stage: DiscoveryStage, msgCount: number): string {
  const instructions: Record<DiscoveryStage, string> = {
    goal: `
CURRENT DISCOVERY STAGE: 1 — GOAL
Your ONLY job this turn is to understand what the visitor wants to achieve.
React naturally to what they just said — acknowledge their specific situation in one sentence, then ask ONE open question about their goal.
Do NOT mention any past GITS projects. Do NOT mention pricing. Do NOT pitch.
Sound like a curious, warm human. Not a script.
Good openers: "What's the main thing you want this to do for your business?" / "What made you start thinking about this now?" / "What does success look like for you here?"
Keep your reply under 70 words. End with exactly one question.`,

    situation: `
CURRENT DISCOVERY STAGE: 2 — CURRENT SITUATION
You know what they want. Now understand what exists today.
React to their last message naturally before asking your question. ONE question about their current process, tools, or setup.
Do NOT mention any past GITS projects yet. Do NOT pitch.
Good questions: "How are you handling this today?" / "What tools are you working with right now?" / "Do you have anything in place already, or starting from scratch?"
Keep your reply under 70 words. End with exactly one question.`,

    pain: `
CURRENT DISCOVERY STAGE: 3 — PAIN DISCOVERY
You understand their goal and current setup. Now find the real friction.
React to what they said. ONE question about what's not working, what's frustrating, or what's blocking them.
Do NOT mention any past GITS projects yet. Do NOT pitch yet.
Good questions: "What's been the biggest frustration with that?" / "What's stopping you from getting where you want to be?" / "Where does it actually break down?"
Keep your reply under 80 words. End with exactly one question.`,

    impact: `
CURRENT DISCOVERY STAGE: 4 — IMPACT
You know the pain. Now understand what it costs them to leave it unsolved.
React naturally. ONE question about consequences — business, revenue, time, opportunity.
Do NOT mention any past GITS projects yet. Do NOT pitch yet.
If they mentioned a concrete problem, reflect it back: "So that's probably costing you [time/money] every [week/month]?"
Good questions: "How is that affecting the business right now?" / "What happens if this stays the same another 6 months?" / "What's it actually costing you?"
Keep your reply under 80 words. End with exactly one question.`,

    qualification: `
CURRENT DISCOVERY STAGE: 5 — QUALIFICATION
You understand goal, situation, pain, and impact. Now qualify the opportunity.
ONE question about timeline, budget, or decision process.
You MAY now reference a past GITS project — but ONLY if it genuinely matches their situation, ONLY once, and ONLY in one sentence woven naturally into your reply. Example: "We built something similar for a lending firm — cut their processing time from 3 hours to 9 minutes." Do not lead with it.
Good questions: "Do you have a target date you're working toward?" / "Have you set aside a rough budget?" / "Who else would be involved in the final decision?"
Keep your reply under 90 words. End with exactly one question.`,

    recommendation: `
CURRENT DISCOVERY STAGE: 6 — RECOMMENDATION
You have enough. This is the close. Be specific, warm, and confident.

Structure your reply:
1. Start EXACTLY with "So if I'm understanding correctly" — recap their goal, situation, core pain, and impact in 1–2 sentences.
2. ONE past project reference if it matches (one sentence, woven in naturally — not bolted on).
3. Recommend the specific GITS service, realistic USD price range, and timeline. For custom software: "pricing depends on scope — best to jump on a quick call and we can give you an accurate number."
4. ONE clear CTA: WhatsApp for urgency, book a call for complex projects, contact page for formal next step.

Keep the full reply under 180 words. Sound like a trusted advisor closing naturally — not a salesperson closing aggressively. The phrase "So if I'm understanding correctly" MUST appear to trigger recommendation detection.`,
  };

  const stalledWarning =
    msgCount >= 12 && (stage === "goal" || stage === "situation")
      ? `\nNOTE: This conversation has been going a while. The visitor may be hesitant or just browsing. Acknowledge it: "I realise I've asked a few questions — happy to just give you a rough sense of what something like this costs if that's more useful right now." Then wait.`
      : "";

  return instructions[stage] + stalledWarning;
}

/* ─── Fallback BASE_SYSTEM (used when no systemPrompt arrives) ─ */
const BASE_SYSTEM = `You are the GITS AI Advisor — a sharp, warm, experienced member of the GITS team (Gwer Intelligent Tech Solutions). You think like a senior tech consultant. Your job is to understand the visitor's situation before recommending anything. Ask one question at a time. Be direct, human, and helpful. Never pitch immediately. Always diagnose before recommending.`;

/* ═══════════════════════════════════════════════════════════════
   POST handler
═══════════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages      = [],
      systemPrompt,
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

    /* ── Use client systemPrompt if present ── */
    const basePrompt = (systemPrompt && systemPrompt.trim().length > 50)
      ? systemPrompt
      : BASE_SYSTEM;

    /* ── Build context note ── */
    let contextNote = "";
    if (context?.userProjectType)               contextNote += `\nVisitor's stated interest: ${context.userProjectType}`;
    if ((context?.userBudget as number) > 0)    contextNote += `\nVisitor's stated budget: $${(context.userBudget as number).toLocaleString()}`;
    if (context?.visitorName)                   contextNote += `\nVisitor's name: ${context.visitorName}`;
    if (context?.industry)                      contextNote += `\nVisitor's industry: ${context.industry}`;
    if (context?.currentTools)                  contextNote += `\nTools they currently use: ${context.currentTools}`;
    if ((context?.qualScore as number) >= 45)   contextNote += `\nHigh buying intent detected.`;
    if (context?.conversationSummary)           contextNote += `\nKnown context:\n${context.conversationSummary}`;

    /* ── Inject stage instruction ── */
    const discoveryStage = (context?.discoveryStage as DiscoveryStage) ?? "goal";
    const msgCount       = (context?.msgCount       as number)          ?? 0;
    const stageInstruction = buildStageInstruction(discoveryStage, msgCount);

    const systemPromptFinal =
      basePrompt
      + (contextNote ? `\n\n--- CURRENT VISITOR CONTEXT ---${contextNote}` : "")
      + `\n\n--- THIS TURN'S INSTRUCTION ---${stageInstruction}`;

    /* ── Call Groq with dynamic token limit by stage ── */
    const stageForTokens = (context?.discoveryStage as string) ?? "goal";
    const maxTokens = stageForTokens === "recommendation" ? 450 : 160;

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
        max_tokens:  maxTokens,
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

    /* ── Background Sanity sync — get summary back for localStorage ── */
    let convSummary = "";
    if (sessionId) {
      try {
        convSummary = await syncToSanity({
          sessionId, messages, reply, ctaClicked, source, context, discoveryStage,
        });
      } catch (e) {
        console.error("[Sanity sync]", e);
      }
    }

    return NextResponse.json({ reply, summary: convSummary });

  } catch (e) {
    console.error("[API] route error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ─── Background sync ───────────────────────────────────────── */
async function syncToSanity(opts: {
  sessionId:      string;
  messages:       { role: string; content: string }[];
  reply:          string;
  ctaClicked?:    string;
  source?:        string;
  context:        Record<string, unknown>;
  discoveryStage: DiscoveryStage;
}): Promise<string> {  // returns conversation summary
  const { sessionId, messages, reply, ctaClicked, source, context, discoveryStage } = opts;

  const fullMessages = [...messages, { role: "assistant", content: reply }];
  const userMessages = fullMessages.filter(m => m.role === "user");
  const messageCount = userMessages.length;
  if (messageCount === 0) return "";

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
          model:       "llama-3.1-8b-instant",
          messages: [{ role: "user", content: buildExtractionPrompt(fullMessages) }],
          max_tokens:  600,
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
    "projectType", "budgetRange", "timeline", "goalSummary", "painSummary",
    "currentTools", "leadScore", "conversationSummary",
  ] as const;

  for (const field of extractableFields) {
    if (extracted[field] != null && extracted[field] !== "") {
      patch[field] = extracted[field];
    }
  }

  if (!patch.visitorName  && context?.visitorName)          patch.visitorName  = context.visitorName;
  if (!patch.projectType  && context?.userProjectType)      patch.projectType  = context.userProjectType;
  if (!patch.industry     && context?.industry)             patch.industry     = context.industry;
  if (!patch.currentTools && context?.currentTools)         patch.currentTools = context.currentTools;
  if (!patch.budgetRange  && (context?.userBudget as number) > 0) {
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

  // Return summary so callers can store it locally for smart re-engagement
  return (extracted.conversationSummary as string) ?? (extracted.goalSummary as string) ?? "";
}