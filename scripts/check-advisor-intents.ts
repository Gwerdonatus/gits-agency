// scripts/check-advisor-intents.ts
// ─────────────────────────────────────────────────────────────────────────────
// Regression check for the advisor's intent router.
//
//   npm run check:advisor
//
// The router decides whether a turn owes the visitor an ANSWER (what do you
// offer, what does it cost, can you build X) or a discovery question. Get it
// wrong and the advisor goes back to replying to questions with questions,
// which is the exact behaviour this was built to end.
//
// Add a case here whenever you see a real visitor phrasing the router muffed —
// the fix belongs in src/lib/advisor/intent.ts, and the case stops it coming
// back. Every case must pass before deploying a change to the router.
// ─────────────────────────────────────────────────────────────────────────────

import { detectIntent, type Intent } from "../src/lib/advisor/intent";
import { buildSystemPrompt, maxTokensFor } from "../src/lib/advisor/prompt";
import { SERVICES } from "../src/lib/advisor/knowledge";
import { nextStage } from "../src/lib/advisor/stage";

const CASES: [string, Intent][] = [
  /* The reported failure: asked to list the services, the advisor used to
     insist the visitor state their needs first. */
  ["list all the services you offer",                    "catalogue"],
  ["What services do you offer?",                        "catalogue"],
  ["what do you guys do",                                "catalogue"],
  ["what do you do?",                                    "catalogue"],
  ["Please list everything you offer",                   "catalogue"],
  ["what else do you do apart from websites",            "catalogue"],
  ["can you give me a full list of your services",       "catalogue"],
  ["what other services do you offer",                   "catalogue"],
  ["what kind of work do you do?",                       "catalogue"],
  ["show me all your services",                          "catalogue"],

  /* Pricing — answer with the number, never with a question. */
  ["how much for a website",                             "pricing"],
  ["What does a CRM cost?",                              "pricing"],
  ["price of a whatsapp bot",                            "pricing"],
  ["Do you have payment plans?",                         "pricing"],
  ["what's your pricing like",                           "pricing"],

  /* Timeline */
  ["how long does an ecommerce site take",               "timeline"],
  ["what's your turnaround time",                        "timeline"],

  /* Capability — a yes/no question deserves a yes/no first. */
  ["can you build an inventory system for a pharmacy",   "capability"],
  ["do you do mobile apps?",                             "capability"],
  ["Do you work with Shopify?",                          "capability"],
  ["can you integrate Paystack for me",                  "capability"],

  /* Detail on one line */
  ["tell me more about your AI automation",              "service_detail"],
  ["what is included in the internal tools service?",    "service_detail"],

  /* Process, company, portfolio, technical */
  ["how does your process work",                         "process"],
  ["do I own the source code?",                          "process"],
  ["where are you based",                                "company"],
  ["who is behind GITS?",                                "company"],
  ["how many projects have you done",                    "company"],
  ["show me some of your work",                          "portfolio"],
  ["have you built anything for a pharmacy before?",      "portfolio"],
  ["what tech stack do you use",                         "tech"],
  ["which AI models do you work with?",                  "tech"],

  /* Contact, handoff, hesitation, comparison */
  ["how do I reach you",                                 "contact"],
  ["I'd like to speak with someone directly",            "human"],
  ["are you a bot?",                                     "human"],
  ["that's too expensive",                               "objection"],
  ["I need to think about it",                           "objection"],
  ["we already have a developer in-house",               "objection"],
  ["why should I choose you instead of Fiverr",           "comparison"],

  /* Discovery — statements about their own situation must NOT be mistaken for
     questions, or the advisor answers instead of listening. */
  ["I run a pharmacy in Jos with three branches",         "discovery"],
  ["We handle everything on WhatsApp and excel right now", "discovery"],
  ["Mostly it's the stock tracking that breaks down",      "discovery"],
  ["It costs us maybe two days a week",                    "discovery"],
  ["our deadline is sometime in March",                    "discovery"],
  ["I'm thinking about a website but not sure exactly what I need yet", "discovery"],
  ["we don't know how to handle stock across the branches", "discovery"],
  ["I know something needs to change but I'm not sure what the solution is", "discovery"],

  /* An interrogative word mid-sentence still reads as a question when a
     conjunction puts it at the head of its clause. */
  ["ok so where are you based",                            "company"],
  ["and how much would that be",                           "pricing"],
];

let checks   = 0;
let failures = 0;

for (const [message, expected] of CASES) {
  const { intent, service } = detectIntent(message);
  const pass = intent === expected;
  checks++;
  if (!pass) failures++;
  console.log(
    `${pass ? "  ok  " : " FAIL "} ${intent.padEnd(15)}` +
    `${pass ? "" : `(expected ${expected}) `}` +
    `service=${String(service).padEnd(15)} "${message}"`
  );
}

/* The catalogue turn is the one that was broken, so assert its prompt really
   does carry every service line and the instruction to list them all. */
function assert(label: string, condition: boolean) {
  checks++;
  if (!condition) failures++;
  console.log(`${condition ? "  ok  " : " FAIL "} ${label}`);
}

const catalogue = detectIntent("what services do you offer?");
const prompt = buildSystemPrompt({ result: catalogue, stage: "goal", msgCount: 1, context: {} });

console.log("");
for (const s of SERVICES) {
  assert(`catalogue prompt names "${s.name}"`, prompt.includes(s.name));
}
assert("catalogue prompt requires all six lines", prompt.includes("ALL SIX service lines"));
assert("catalogue prompt forbids deflecting", prompt.includes("Do NOT ask them to state their needs before listing"));
assert("catalogue reply budget leaves room for a list", maxTokensFor("catalogue", "goal") >= 700);
assert("contact details are always in the prompt", prompt.includes("https://wa.me/2348116276212"));
assert("real-client guardrail is always in the prompt", prompt.includes("the only work you may ever reference"));

const discovery = detectIntent("I run a pharmacy in Jos");
const discoveryPrompt = buildSystemPrompt({ result: discovery, stage: "goal", msgCount: 1, context: {} });
assert("a discovery turn still runs the ladder", discoveryPrompt.includes("DISCOVERY STAGE 1 — GOAL"));
assert("an answer turn does not run the ladder", !prompt.includes("DISCOVERY STAGE 1 — GOAL"));

/* Stage progression: answering questions must not push the conversation toward
   a close the visitor was never interviewed for. */
console.log("");
assert(
  "a pricing question does not consume a discovery stage",
  nextStage({ stage: "goal", intent: "pricing", discoveryTurns: 1, reply: "Websites run $500-$3,000." }) === "goal"
);
assert(
  "a catalogue question does not consume a discovery stage",
  nextStage({ stage: "situation", intent: "catalogue", discoveryTurns: 3, reply: "Here's the full picture..." }) === "situation"
);
assert(
  "a discovery turn advances once the stage is satisfied",
  nextStage({ stage: "goal", intent: "discovery", discoveryTurns: 2, reply: "Got it - how are you handling it today?" }) === "situation"
);
assert(
  "a discovery turn holds until the stage is satisfied",
  nextStage({ stage: "goal", intent: "discovery", discoveryTurns: 1, reply: "Got it." }) === "goal"
);
assert(
  "the recap signal jumps straight to recommendation",
  nextStage({ stage: "pain", intent: "discovery", discoveryTurns: 3, reply: "So if I'm understanding correctly, you want..." }) === "recommendation"
);
assert(
  "recommendation never regresses",
  nextStage({ stage: "recommendation", intent: "pricing", discoveryTurns: 12, reply: "Roughly $8,000." }) === "recommendation"
);

console.log(
  `\n${checks - failures}/${checks} checks passed` +
  (failures ? ` — ${failures} FAILED` : "") + "."
);
process.exit(failures ? 1 : 0);
