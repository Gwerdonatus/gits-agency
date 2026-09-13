// src/lib/advisor/intent.ts
// ─────────────────────────────────────────────────────────────────────────────
// GITS AI Advisor — intent router.
//
// WHY THIS EXISTS
// The advisor used to force every single turn through a discovery-stage script
// ("your ONLY job this turn is to ask one open question about their goal"), so
// a visitor who asked a direct question got a question back instead of an
// answer. Ask it to list the services and it would reply "tell me what you need
// first" — which reads as evasive and loses people who were simply shopping.
//
// This module reads the visitor's last message and decides what the turn owes
// them. The route then instructs the model to ANSWER that first, and only then
// ask its one forward question. Discovery still happens — it just no longer
// steamrolls a real question.
//
// Rule-based on purpose: it runs on every message, so it has to be instant,
// free and predictable. No extra model round-trip.
// ─────────────────────────────────────────────────────────────────────────────

import { SERVICES, type ServiceId } from "./knowledge";

export type Intent =
  | "catalogue"        // "what do you offer?" — list everything
  | "service_detail"   // "tell me about your AI automation"
  | "pricing"          // "how much does a website cost?"
  | "timeline"         // "how long does it take?"
  | "capability"       // "can you build X?" / "do you do Y?"
  | "process"          // "how do you work?" / "do I own the code?"
  | "company"          // "who are you?" / "where are you based?"
  | "portfolio"        // "show me work you've done"
  | "tech"             // "what stack?" / "which AI models?"
  | "contact"          // "how do I reach you?" / "book a call"
  | "human"            // "I want to talk to a person"
  | "objection"        // "too expensive" / "how do I know you'll deliver"
  | "comparison"       // "why you and not Fiverr?"
  | "discovery";       // nothing asked — run the discovery ladder

export interface IntentResult {
  intent: Intent;
  /** Service line the message is about, when one is identifiable. */
  service: ServiceId | null;
  /** True when the visitor asked more than one thing in the same message. */
  multiQuestion: boolean;
  /** True when the visitor asked anything at all — drives "answer first". */
  isQuestion: boolean;
}

/* Matching helpers ───────────────────────────────────────────────────────── */

function hasAny(text: string, needles: string[]): boolean {
  return needles.some(n => text.includes(n));
}

/**
 * Whole-word match for single words, substring match for phrases and symbols.
 * Plain `includes` found "rate" inside "integrate", which sent "can you
 * integrate Paystack for me" down the pricing branch.
 */
function hasSignal(text: string, needles: string[]): boolean {
  return needles.some(n =>
    /^[a-z0-9]+$/.test(n) ? hasWord(text, [n]) : text.includes(n)
  );
}

/** Word-boundary match, so "app" does not fire on "happy" or "approach". */
function hasWord(text: string, words: string[]): boolean {
  return words.some(w => {
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(text);
  });
}

const QUESTION_OPENERS = [
  "what", "which", "who", "where", "when", "how", "why", "can you", "could you",
  "do you", "does gits", "are you", "is there", "will you", "would you", "have you",
  "tell me", "list", "show me", "explain", "give me", "i want to know", "i'd like to know",
  "any chance", "is it possible",
];

/** Openers that mean a question wherever they appear in the sentence. */
const MIDSENTENCE_OPENERS = [
  "can you", "could you", "do you", "would you", "will you", "does gits",
  "tell me", "show me", "give me", "i want to know", "i'd like to know",
  "is it possible", "any chance",
];

/* "so where are you based?" is a question; "not sure exactly what I need" is
   not. The difference is grammatical, so a bare interrogative word mid-sentence
   only counts when a conjunction or filler puts it at the head of its clause.
   Without this, ordinary discovery answers ("I don't know how to handle stock",
   "not sure what I need yet") were read as questions and got answered instead
   of listened to. */
const CLAUSE_QUESTION =
  /\b(and|but|so|also|then|plus|ok|okay|now)\s+(what|which|who|where|when|how|why)\b/;

function looksLikeQuestion(text: string): boolean {
  if (text.includes("?")) return true;
  if (QUESTION_OPENERS.some(o => text.startsWith(o))) return true;
  if (MIDSENTENCE_OPENERS.some(o => text.includes(` ${o} `))) return true;
  return CLAUSE_QUESTION.test(text);
}

/* "Everything" phrasing — the case that was failing outright ───────────────
   "list all the services you offer", "what else do you do", "full list". */
const CATALOGUE_PHRASES = [
  "all the services", "all services", "all of your services", "all your services",
  "list of services", "services you offer", "services do you offer", "services does gits",
  "service you offer", "what services", "which services", "your services",
  "what do you offer", "what do you guys offer", "what do you do", "what does gits do",
  "what can you do", "what can you build", "what do you build", "what else do you do",
  "what else can you", "everything you offer", "everything you do", "everything gits",
  "full list", "complete list", "list them", "list everything", "list all",
  "other services", "range of services", "what are your services", "breakdown of your services",
  "what you guys do", "what you people do", "areas you cover", "what do u do",
  "what do u offer", "what kind of work", "what type of work", "what sort of work",
];

/** "what do you (guys/people/all) do/offer/build/handle" in its many spellings. */
const CATALOGUE_PATTERNS: RegExp[] = [
  /\bwhat\s+(do|does|can)\s+(you|u|ya'?ll|gits|your\s+(team|company|agency|guys))\s*(guys|people|all|folks)?\s*(do|offer|offers|build|handle|provide|cover|specialise|specialize)\b/,
  /\b(list|show|tell)\s+(me\s+)?(all|everything|every)\b/,
  /\ball\s+(the\s+|your\s+|of\s+your\s+)?(services|offerings|things you do)\b/,
];

/* Unambiguous price talk — fires whether or not it is phrased as a question. */
const PRICING_STRONG = [
  "price", "prices", "pricing", "how much", "what do you charge", "your rate",
  "your rates", "quote me", "a quote", "price range", "price list", "$",
];

/* Price-adjacent words that also turn up in ordinary discovery answers
   ("it costs us two days a week", "our budget is tight"), so these only count
   when the visitor is actually asking. */
const PRICING_WEAK = [
  "cost", "costs", "charge", "charges", "rate", "rates", "fee", "fees",
  "budget", "expensive", "afford", "payment plan", "installment", "instalment",
  "deposit", "naira", "dollars", "quote",
];

const TIMELINE_STRONG = [
  "how long", "how fast", "how quickly", "how soon", "turnaround",
  "when can you", "when will it", "delivery time",
];

const TIMELINE_WEAK = [
  "timeline", "time frame", "timeframe", "deadline", "duration", "lead time",
];

const PROCESS_WORDS = [
  "how do you work", "how does it work", "your process", "the process", "what happens after",
  "next step", "next steps", "get started", "getting started", "how do we start",
  "how do i start", "what do you need from me", "own the code", "source code",
  "nda", "contract", "agreement", "milestone", "milestones", "revisions",
  "after launch", "maintenance", "support after", "warranty", "payment terms",
  "discovery call", "discovery session", "how many meetings", "project management",
];

const COMPANY_WORDS = [
  "who are you", "who is gits", "who's gits", "what is gits", "about gits",
  "about you", "about your company", "about your team", "about your agency",
  "who is behind", "who's behind", "who runs", "who started", "who founded",
  "founder", "who owns", "how did you start",
  "where are you", "where is gits", "based in", "located", "location", "office",
  "how big is your team", "team size", "how many people", "how many staff",
  "your team", "who works", "how long have you", "years of experience",
  "experience do you", "are you legit", "are you real", "registered",
  "legal name", "how many projects", "how many clients", "remote",
];

const PORTFOLIO_WORDS = [
  "portfolio", "your work", "past work", "previous work", "case study", "case studies",
  "examples", "example of", "show me some", "have you built", "have you done",
  "who have you worked", "clients you", "your clients", "any client", "references",
  "testimonial", "testimonials", "live site", "live project", "something you built",
];

const TECH_WORDS = [
  "tech stack", "what stack", "which stack", "technology", "technologies",
  "what language", "which language", "framework", "next.js", "nextjs", "react",
  "node", "python", "flutter", "react native", "wordpress", "shopify", "webflow",
  "database", "hosting", "host it", "aws", "cloud", "which ai", "what ai model",
  "what model", "which model", "gpt", "claude", "gemini", "openai", "rag",
  "vector", "fine-tune", "fine tune", "api", "graphql", "security", "secure",
  "scalable", "scale to",
];

const CONTACT_WORDS = [
  "contact", "reach you", "get in touch", "your number", "phone number",
  "whatsapp number", "email address", "your email", "book a call", "schedule a call",
  "set up a call", "calendly", "meeting", "consultation", "audit",
];

const HUMAN_WORDS = [
  "talk to a human", "speak to a human", "real person", "talk to someone",
  "speak to someone", "speak with someone", "talk to a person", "actual person",
  "your manager", "the founder", "speak to gwer", "human agent", "customer service",
  "not a bot", "are you a bot", "are you human", "are you ai", "are you an ai",
];

const OBJECTION_WORDS = [
  "too expensive", "too much", "out of my budget", "can't afford", "cannot afford",
  "cheaper", "discount", "reduce the price", "negotiate", "lower price",
  "i have a developer", "we have a developer", "in-house", "in house team",
  "how do i know", "how can i trust", "can i trust", "scam", "guarantee",
  "what if it fails", "what if you don't", "need to think", "think about it",
  "get back to you", "not ready", "just browsing", "just looking", "just checking",
];

const COMPARISON_WORDS = [
  "why should i choose", "why you", "why gits", "instead of", "compared to",
  "vs ", "versus", "better than", "difference between you", "fiverr", "upwork",
  "freelancer", "other agencies", "another agency", "competitor",
];

const CAPABILITY_OPENERS = [
  "can you build", "can you do", "can you make", "can you create", "can you help",
  "can gits", "do you build", "do you do", "do you make", "do you offer",
  "do you handle", "do you work with", "are you able to", "is it possible to",
  "would you be able", "do you also", "can you integrate", "can you connect",
  "can you automate", "can you fix", "can you redesign", "can you rebuild",
  "do you build", "do you develop", "do you design",
];

/* Service matching ───────────────────────────────────────────────────────── */

/**
 * Which service line the text is about. Scores every line by keyword hits so a
 * message like "a website with a CRM behind it" resolves to the stronger match
 * rather than whichever keyword happened to be checked first.
 */
export function matchService(text: string): ServiceId | null {
  let best: { id: ServiceId; score: number } | null = null;

  for (const s of SERVICES) {
    let score = 0;
    for (const kw of s.keywords) {
      if (kw.includes(" ")) {
        if (text.includes(kw)) score += 2;       // multi-word hits are stronger
      } else if (hasWord(text, [kw])) {
        score += 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { id: s.id, score };
  }

  return best ? best.id : null;
}

/* The router ─────────────────────────────────────────────────────────────── */

export function detectIntent(lastUserMessage: string): IntentResult {
  const text = (lastUserMessage || "").toLowerCase().trim();
  const service = matchService(text);
  const isQuestion = looksLikeQuestion(text);

  // More than one thing asked in one message — the reply has to cover both.
  const multiQuestion =
    (text.match(/\?/g)?.length ?? 0) > 1 ||
    (isQuestion && hasAny(text, [" and also", "also, ", " and how ", " and what ", " and when ", " and how much"]));

  const base = { service, multiQuestion, isQuestion };

  /* Order matters. Two principles:
     · the most specific and most commonly mishandled signals go first;
     · a signal that also shows up in ordinary discovery answers ("it costs us
       two days a week", "our deadline is March", "we use Postgres") only counts
       when the visitor is actually asking something — otherwise a statement
       about their own situation gets answered as if it were a question. */

  // "I want to talk to a person" outranks everything — never argue with it.
  if (hasAny(text, HUMAN_WORDS)) return { ...base, intent: "human" };

  // The headline failure: asked to list what GITS offers.
  if (hasAny(text, CATALOGUE_PHRASES) || CATALOGUE_PATTERNS.some(re => re.test(text))) {
    return { ...base, intent: "catalogue" };
  }

  // Hesitation and comparison are usually statements, so they are not gated.
  if (hasAny(text, OBJECTION_WORDS)) return { ...base, intent: "objection" };
  if (hasAny(text, COMPARISON_WORDS)) return { ...base, intent: "comparison" };

  // A yes/no capability question ("do you work with Shopify?") is a capability
  // question even when it names a technology — so this goes ahead of the
  // technical branch, but only when the message actually opens that way.
  if (CAPABILITY_OPENERS.some(o => text.startsWith(o))) {
    return { ...base, intent: "capability" };
  }

  if (hasSignal(text, PRICING_STRONG)) return { ...base, intent: "pricing" };
  if (isQuestion && hasSignal(text, PRICING_WEAK)) return { ...base, intent: "pricing" };

  if (hasSignal(text, TIMELINE_STRONG)) return { ...base, intent: "timeline" };
  if (isQuestion && hasSignal(text, TIMELINE_WEAK)) return { ...base, intent: "timeline" };

  if (isQuestion || hasAny(text, ["show me", "tell me"])) {
    if (hasWord(text, COMPANY_WORDS))  return { ...base, intent: "company" };
    if (hasAny(text, PORTFOLIO_WORDS)) return { ...base, intent: "portfolio" };
    if (hasAny(text, PROCESS_WORDS))   return { ...base, intent: "process" };
    if (hasAny(text, TECH_WORDS))      return { ...base, intent: "tech" };
    if (hasAny(text, CONTACT_WORDS))   return { ...base, intent: "contact" };
  }

  // A capability opener anywhere in the message, having ruled out the above.
  if (hasAny(text, CAPABILITY_OPENERS)) return { ...base, intent: "capability" };

  // A question naming a service line but none of the above: they want to know
  // what that line actually covers.
  if (isQuestion && service) return { ...base, intent: "service_detail" };

  // Nothing asked — run the discovery ladder as before.
  return { ...base, intent: "discovery" };
}
