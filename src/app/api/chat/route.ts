// app/api/chat/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// GITS AI Advisor — API route v4.0
//
// v4 change: the advisor answers questions.
//
// Until now every turn was forced through a discovery-stage script ("your ONLY
// job this turn is to ask one open question about their goal"), so a visitor who
// asked a direct question got a question back. Asked to list the services, it
// replied "tell me what you need first" — which reads as evasive and loses
// people who were only shopping.
//
// Now each turn is routed by intent (src/lib/advisor/intent.ts): a question gets
// answered from the canonical knowledge base (src/lib/advisor/knowledge.ts)
// first, and only then does the advisor ask its one forward question. Discovery
// still runs — it just no longer steamrolls a real question. The prompt is built
// server-side (src/lib/advisor/prompt.ts) so the browser can neither ship nor
// tamper with it.
//
// ENV VARS NEEDED (.env.local / Cloudflare secrets):
//   GROQ_API_KEY
//   SANITY_PROJECT_ID     = vih4pg3q
//   SANITY_DATASET        = production
//   SANITY_API_VERSION    = 2025-05-21
//   SANITY_WRITE_TOKEN    = <Editor token from manage.sanity.io → API → Tokens>
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

import { detectIntent } from "@/lib/advisor/intent";
import {
  buildSystemPrompt,
  maxTokensFor,
  type DiscoveryStage,
} from "@/lib/advisor/prompt";
import { isStage, nextStage } from "@/lib/advisor/stage";

// Groq decommissioned llama-3.1-8b-instant; requests for it now fail with
// model_not_found, and the route's catch-all turned that into the visitor-facing
// "Something went wrong" message. Override with GROQ_MODEL if this one is
// retired too — `curl https://api.groq.com/openai/v1/models` lists what a key
// can actually reach.
const CHAT_MODEL = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";

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

/* ═══════════════════════════════════════════════════════════════
   POST handler
═══════════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages      = [],
      context       = {},
      sessionId,
      ctaClicked,
      source,
    } = body as {
      messages:      { role: string; content: string }[];
      context:       Record<string, unknown>;
      sessionId:     string;
      ctaClicked?:   string;
      source?:       string;
    };

    /* ── What did the visitor actually just ask? ──
       The prompt is assembled server-side from the canonical knowledge base.
       A systemPrompt posted by the client is deliberately ignored: the two
       copies had drifted (the client shipped twelve invented case studies with
       hard metrics that the server's real-projects list contradicts), and
       anything the browser sends can be rewritten in devtools. ── */
    const lastUser = [...messages].reverse().find(m => m.role === "user")?.content ?? "";
    const result   = detectIntent(lastUser);

    const stage    = isStage(context?.discoveryStage) ? context.discoveryStage : "goal";
    const msgCount = (context?.msgCount as number) ?? 0;
    const discoveryTurns =
      ((context?.discoveryTurns as number) ?? msgCount) + (result.intent === "discovery" ? 1 : 0);

    const systemPromptFinal = buildSystemPrompt({ result, stage, msgCount, context });
    const maxTokens         = maxTokensFor(result.intent, stage);

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model:       CHAT_MODEL,
        messages: [
          { role: "system", content: systemPromptFinal },
          ...messages.slice(-12),
        ],
        max_tokens:  maxTokens,
        temperature: 0.7,
        // gpt-oss spends completion tokens on reasoning before it writes any
        // content. Left at the default, a 160-token budget was fully consumed
        // by reasoning and the reply came back empty, which is what surfaced
        // to visitors as "Something went wrong".
        reasoning_effort: "low",
        stream:      false,
      }),
    });

    let reply = "I'm having trouble reaching my brain for a second. Rather than keep you waiting: [message the team on WhatsApp](https://wa.me/2348116276212) or [book a quick call](https://calendly.com/donatusgwer) — someone will pick it up straight away.";
    let ok    = false;

    if (groqRes.ok) {
      const groqData = await groqRes.json();
      const content  = groqData.choices?.[0]?.message?.content?.trim();
      if (content) {
        reply = content;
        ok    = true;
      } else {
        console.error(`[Groq] empty content using model ${CHAT_MODEL} (finish_reason: ${groqData.choices?.[0]?.finish_reason})`);
      }
    } else {
      // Log status as well as body: a model_not_found here is indistinguishable
      // from a network failure in the visitor-facing message, so the status is
      // the only thing that makes it diagnosable from the logs.
      const err = await groqRes.text();
      console.error(`[Groq] ${groqRes.status} ${groqRes.statusText} using model ${CHAT_MODEL}:`, err);
    }

    // A failed turn must not push the conversation forward — the visitor never
    // got an answer, so the stage they are at has not changed.
    const stageOut = ok
      ? nextStage({ stage, intent: result.intent, discoveryTurns, reply })
      : stage;

    /* ── Background Sanity sync — get summary back for localStorage ── */
    let convSummary = "";
    if (sessionId) {
      try {
        convSummary = await syncToSanity({
          sessionId, messages, reply, ctaClicked, source, context,
          discoveryStage: stageOut,
        });
      } catch (e) {
        console.error("[Sanity sync]", e);
      }
    }

    return NextResponse.json({
      reply,
      summary:        convSummary,
      intent:         result.intent,
      stage:          stageOut,
      discoveryTurns: ok ? discoveryTurns : ((context?.discoveryTurns as number) ?? msgCount),
    });

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
          model:       CHAT_MODEL,
          messages: [{ role: "user", content: buildExtractionPrompt(fullMessages) }],
          max_tokens:  600,
          temperature: 0.1,
          reasoning_effort: "low",
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
