// src/lib/advisor/knowledge.ts
// ─────────────────────────────────────────────────────────────────────────────
// GITS AI Advisor — canonical knowledge base.
//
// This is the ONLY place advisor facts live. It runs server-side, so the
// browser neither ships it nor can tamper with it (the route used to trust a
// systemPrompt posted from the client).
//
// Everything here must be checkable against a page on this site:
//   services        → src/app/services/page.tsx + /services/* pages
//   pricing floors  → src/app/faq-data.ts and src/app/page.tsx (both emitted as
//                     FAQPage JSON-LD) + the Service offers in
//                     src/app/structured-data.tsx. A floor quoted here must
//                     match all three, or the advisor undercuts or oversells
//                     what Google is showing for the same service.
//   process         → src/components/ProcessFlow.tsx
//   portfolio       → src/app/what-we-build/page.tsx
//   contact         → src/components/Footer.tsx + src/app/contact/page.tsx
//
// If a number or a claim is not on a page, it does not belong here.
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceId =
  | "software"
  | "websites"
  | "ai"
  | "internal-tools"
  | "integrations"
  | "mobile";

export interface ServiceEntry {
  id: ServiceId;
  /** Name used when the advisor lists or names the service. */
  name: string;
  /** One line the advisor can use verbatim in a list. */
  oneLiner: string;
  /** Concrete things GITS builds under this line — mirrors the services page. */
  builds: string[];
  /** Who it tends to be right for. */
  idealFor: string[];
  /**
   * Concrete kinds of business that come to us for this, in the shape a
   * visitor recognises themselves in ("a pharmacy with three branches"),
   * because "ideal for multi-branch businesses" makes nobody think "that's me".
   *
   * These are ILLUSTRATIVE BUSINESS TYPES, not clients. The advisor is told
   * never to present one as work GITS has done — real work lives in
   * REAL_CLIENT_WORK and nowhere else.
   */
  exampleBusinesses: string[];
  /** Published price bands. Never quote a number that is not in here. */
  pricing: string;
  /** Published timeline bands. */
  timeline: string;
  /** Path on this site. */
  path: string;
  /** Words that mean the visitor is talking about this service. */
  keywords: string[];
}

/* ─── The service catalogue ──────────────────────────────────────────────
   Five lines come straight from the services page; "mobile" is the sixth —
   the site sells mobile apps on the capabilities list and in the FAQ, and
   the lead form has a Mobile App project type, but the advisor never knew
   about it and so kept steering app enquiries into "custom software".
   ─────────────────────────────────────────────────────────────────────── */
export const SERVICES: ServiceEntry[] = [
  {
    id: "websites",
    name: "Websites & Digital Experiences",
    oneLiner: "Marketing sites, e-commerce stores and landing pages built to convert.",
    builds: [
      "Business & corporate websites",
      "E-commerce stores",
      "Landing pages and one-pagers",
      "Portfolio and event websites",
      "Product showcase and marketing sites",
      "Performance-first web experiences",
      "Full UI/UX product design in Figma",
    ],
    idealFor: [
      "Boutiques and fashion brands",
      "Businesses selling online",
      "Service-based businesses",
      "Professional firms and founders",
    ],
    exampleBusinesses: [
      "a boutique selling through Instagram DMs that needs a real storefront and checkout",
      "a law firm or clinic whose only web presence is an outdated one-pager",
      "a founder who needs one sharp landing page for a launch next week",
      "a company whose site looks nothing like the quality of its actual work",
    ],
    pricing:
      "from $200 for a one-pager; $800–$3,000 for a multi-page marketing site; $1,500–$5,000 for e-commerce; $1,500–$5,000 for a full UI/UX product design in Figma",
    timeline:
      "3–5 days for a one-pager, 1–3 weeks multi-page, 2–5 weeks e-commerce, 2–4 weeks for a full product design",
    path: "/services/websites-digital-experiences",
    keywords: [
      "website", "web site", "webpage", "web page", "landing page", "one pager",
      "one-pager", "ecommerce", "e-commerce", "online store", "shop", "storefront",
      "portfolio site", "web design", "redesign", "wordpress", "shopify",
      "ui", "ux", "ui/ux", "figma", "design system", "prototype", "mockup",
    ],
  },
  {
    id: "ai",
    name: "AI & Business Automation",
    oneLiner:
      "AI assistants, WhatsApp and email agents, and workflow automation that take repetitive work off your team.",
    builds: [
      "AI assistants and agents",
      "WhatsApp Business API AI agents",
      "Customer support automation",
      "Lead qualification systems",
      "Workflow and reporting automation",
      "Document intelligence (KYC, contracts)",
      "Custom AI integrations (GPT, Claude, Gemini)",
    ],
    idealFor: [
      "Support teams handling high volume",
      "Sales teams qualifying leads at scale",
      "Businesses trying to grow without extra headcount",
    ],
    exampleBusinesses: [
      "a business answering the same twenty WhatsApp questions every day",
      "a sales team losing leads because nobody replies until the next morning",
      "a support inbox where the team re-types the same answers by hand",
      "an office keying details off documents into a spreadsheet all afternoon",
    ],
    pricing:
      "from $1,000; WhatsApp or email AI agent $2,500–$6,500; CRM & workflow automation $2,000–$5,000; document intelligence $4,000–$9,000; full multi-channel agent $6,500–$13,000",
    timeline: "3–6 weeks for most automations, 6–10 weeks for a full multi-channel agent",
    path: "/services/ai-business-automation",
    keywords: [
      "ai", "a.i.", "artificial intelligence", "automation", "automate", "agent",
      "chatbot", "chat bot", "bot", "whatsapp", "llm", "gpt", "claude", "gemini",
      "rag", "machine learning", "voice agent", "customer support", "support tickets",
    ],
  },
  {
    id: "software",
    name: "Custom Software Development",
    oneLiner: "SaaS platforms, marketplaces, booking systems and portals built around how you actually work.",
    builds: [
      "SaaS platforms",
      "Online marketplaces",
      "Booking systems",
      "Membership platforms",
      "Customer portals",
      "Vendor management systems",
      "Business management software",
      "Enterprise applications",
    ],
    idealFor: [
      "Startups building their first product",
      "Growing businesses ready to scale",
      "Organisations replacing legacy systems",
      "Service providers needing custom workflows",
    ],
    exampleBusinesses: [
      "a service business run out of spreadsheets and WhatsApp groups that has outgrown both",
      "a founder with a product idea and no system built yet",
      "a company whose customers keep asking for a portal to check their own status",
      "a business paying for four tools that still do not talk to each other",
    ],
    pricing:
      "from $5,000; typical range $8,000–$35,000+ — scope decides the number, so this one is best pinned down on a call",
    timeline: "4–12 weeks depending on scope",
    path: "/services/custom-software-development",
    keywords: [
      "custom software", "software", "saas", "platform", "marketplace", "portal",
      "booking system", "membership", "web app", "webapp", "web application",
      "system", "product", "mvp", "enterprise",
    ],
  },
  {
    id: "internal-tools",
    name: "Internal Tools & CRM Systems",
    oneLiner: "CRMs, dashboards and operations tools that replace the spreadsheets your team is holding together.",
    builds: [
      "CRM systems",
      "Inventory management",
      "Admin dashboards",
      "Employee portals",
      "Reporting platforms",
      "Staff / HR and scheduling systems",
      "Ticketing and service desk",
      "Operations management systems",
    ],
    idealFor: [
      "Multi-branch businesses",
      "Healthcare providers",
      "Educational institutions",
      "Organisations with complex operations",
    ],
    exampleBusinesses: [
      "a multi-branch pharmacy or store where head office finds out about stock too late",
      "a team whose CRM has no idea what their industry actually sells",
      "a manager preparing the same report by hand every Monday",
      "a company where the roster, leave and shift swaps live in one person's head",
    ],
    pricing:
      "from $2,000; custom CRM $5,000–$12,000; operations dashboard $4,000–$9,000; staff/HR system $6,000–$13,000; ticketing $5,000–$11,000",
    timeline: "3–6 weeks for most internal tools",
    path: "/services/internal-tools-crm",
    keywords: [
      "internal tool", "internal tools", "crm", "dashboard", "admin panel",
      "back office", "backoffice", "inventory", "erp", "hr", "payroll",
      "scheduling", "roster", "ticketing", "service desk", "spreadsheet",
      "excel", "google sheets", "operations", "reporting",
    ],
  },
  {
    id: "integrations",
    name: "Integrations & APIs",
    oneLiner: "Payments, CRMs, WhatsApp and third-party systems wired together so data stops being re-typed.",
    builds: [
      "Payment integrations (Stripe, Paystack, Flutterwave)",
      "REST & GraphQL API development",
      "CRM and marketing integrations",
      "WhatsApp and email integrations",
      "Data synchronisation pipelines",
      "Webhook and event systems",
    ],
    idealFor: [
      "E-commerce businesses needing smooth checkout",
      "SaaS platforms expanding capabilities",
      "Teams running several disconnected tools",
    ],
    exampleBusinesses: [
      "an online store where payments and orders are reconciled by hand",
      "a business re-entering the same customer into two systems",
      "a platform that needs Paystack, WhatsApp or Maps wired in properly",
      "a company whose accounting and sales figures never quite agree",
    ],
    pricing:
      "single integration (payment, SMS, maps) $2,500–$5,000; custom API $3,500–$10,000; multi-system integration $7,000–$18,000",
    timeline: "2–3 weeks for a single integration, 4–8 weeks multi-system",
    path: "/services/integrations-apis",
    keywords: [
      "integration", "integrate", "api", "apis", "webhook", "sync", "stripe",
      "paystack", "flutterwave", "payment", "payments", "checkout", "zapier",
      "hubspot", "salesforce", "zoho", "third party", "third-party",
    ],
  },
  {
    id: "mobile",
    name: "Mobile Apps",
    oneLiner: "iOS and Android apps, usually launched as a focused MVP first.",
    builds: [
      "iOS and Android apps",
      "Cross-platform apps",
      "Customer-facing companion apps",
      "Field and staff apps",
      "App + backend + dashboard as one build",
    ],
    idealFor: [
      "Founders validating a product idea",
      "Businesses whose customers live on their phones",
      "Teams working off-desk or in the field",
    ],
    exampleBusinesses: [
      "a business whose customers would use an app but currently phone in",
      "field or delivery staff working off paper and phone calls",
      "a founder validating a product idea with a focused first version",
      "a service with regulars who would reorder in two taps",
    ],
    pricing: "from $3,000; scoped like custom software once the feature list is clear",
    timeline: "4–8 weeks for an MVP",
    path: "/services",
    keywords: [
      "mobile app", "mobile", "app", "ios", "android", "iphone", "play store",
      "app store", "react native", "flutter",
    ],
  },
];

export const CAPABILITIES = [
  "Product strategy & MVP planning",
  "UI/UX design & prototyping (Figma)",
  "Design systems",
  "Web apps (Next.js / React)",
  "Mobile apps (iOS / Android)",
  "Backend & APIs (REST / GraphQL)",
  "AI automations & agents",
  "Integrations (Stripe, Paystack, CRM)",
  "Dashboards & internal tools",
  "Cloud deployment & DevOps",
  "Performance optimisation",
  "Maintenance & support",
  "Security best practices",
  "Analytics & tracking setup",
];

/* ─── Company facts ─────────────────────────────────────────────────────── */
export const COMPANY_FACTS = `
ABOUT GITS — facts you may state:
- Full name: Gwer Intelligent Tech Solutions (GITS). Tagline: clarity · speed · quality.
- An AI agency and digital product studio: custom software, web, mobile, AI automation.
- Headquartered in Abuja, Nigeria. Remote-first, serving clients globally —
  including the US, UK and across Africa. Clients in 12+ countries.
- Founded by Gwer Msughter Donatus — senior engineer and AI systems architect.
- Team published on /about: Gwer Msughter Donatus (founder, engineering),
  Daniel Ochai (UI/UX & design systems), Aisha Adeyemi (marketing & media).
  Name no one else — describe the roles on a project instead.
- Senior-only team. The site publishes 98% on-time delivery across 40+ projects.
- Every project: you own the full source code, NDA before discovery,
  documentation on handoff, post-launch support.
- Discovery is free and carries no commitment.
`;

export const PROCESS_FACTS = `
HOW A GITS PROJECT RUNS — five steps, from the process section of the site:
1. Discovery — clarify goals, users, constraints and success metrics; define
   scope and a realistic plan. Free, no commitment.
2. Strategy & Architecture — map flows, data and integrations; choose the stack.
3. Design & Build — design the interfaces, ship in iterations with constant
   feedback and quality checks.
4. Launch — deploy, monitor and validate in production.
5. Scale & Support — optimise, expand features, support long-term growth.

Also true and worth saying when asked: scope and a written estimate come before
any commitment, so there are no surprises.
`;

export const TECH_FACTS = `
TECHNICAL ANSWERS you may give:
- Web: Next.js / React, TypeScript. Backend: Node, REST and GraphQL APIs.
- Mobile: iOS and Android.
- AI: OpenAI GPT, Anthropic Claude, Gemini, custom fine-tuned models,
  Retrieval-Augmented Generation (RAG), vector databases, custom AI pipelines.
- WhatsApp: WhatsApp Business API — agents that support, qualify, book and
  track orders, handle several languages, and hand off to a human when needed.
- Payments: Stripe, Paystack (card, bank transfer, USSD — strong in Nigeria and
  Ghana), Flutterwave (mobile money, broader Africa). Notifications: Termii
  (WhatsApp + SMS, Nigeria).
- Integrations we do regularly: Stripe, Paystack, Salesforce, HubSpot, Zoho,
  WhatsApp Business API, email platforms, custom REST/GraphQL APIs.
- Cloud deployment, DevOps, performance work, analytics and security practices
  are part of what we do, not add-ons.
If asked about something not listed, say you will confirm with the team rather
than guessing — then offer the call.
`;

export const PLATFORM_KNOWLEDGE = `
WHEN A VISITOR NAMES A TOOL THEY ARE STRUGGLING WITH:
- HubSpot → strong for SaaS, awkward for property, legal, manufacturing.
- Salesforce → heavy for a mid-size team.
- ServiceNow → enterprise IT, expensive to implement.
- Zendesk / Freshdesk → support tools, not operations tools.
- Deputy / 7Shifts → single-location restaurant tools, not multi-property.
- Procore / Buildertrend → built for large Western contractors.
Be fair about these. Naming a real limitation is useful; trashing a tool is not.
`;

/* ─── Real client work ──────────────────────────────────────────────────
   The only projects the advisor may cite. Every entry is a named client with
   a page or a live URL on this site, so anything the advisor says can be
   checked by the person reading it.

   Without this the model invented case studies unprompted, complete with
   fabricated metrics. Keep in sync with /what-we-build.
   ───────────────────────────────────────────────────────────────────────── */
export const REAL_CLIENT_WORK = `
REAL GITS PROJECTS — the only work you may ever reference:
1. Sanmark Luxury (sanmarkluxury.com) — premium fashion store in Lagos.
   Editorial product photography, clean taxonomy, conversion-focused checkout.
2. Blakdhut Exchange (blakdhut.com) — dark-mode crypto trading platform.
   Live pricing and a secure transaction flow.
3. Lamed Pharmacy (lamed-pharmacy.vercel.app) — patient-facing pharmacy platform
   in Jos. Prescription upload, branch finder, PLASCHEMA verification.
4. NOTGATE (notgate-w6l1.vercel.app) — corporate site for a construction firm.
   Project gallery and partner trust signals. The firm publishes 25+ years,
   120+ projects and over N65B delivered.
5. Selo (selo-red.vercel.app) — a curated store selling only purple clothing,
   accessories and bags.
6. Elowen Living (gits.technology/elowen-living) — luxury real estate.
   Editorial layout, full-bleed property imagery, virtual tours.

RULES FOR USING THESE — these override anything else in this prompt:
- Reference a project ONLY from this list. Never any other company.
- Never state a metric, percentage, timeline or money figure for a client
  unless it appears above. Do not estimate one, and do not illustrate with a
  hypothetical that reads like a real result.
- If nothing here matches what they are describing, say so plainly and talk
  about the approach instead. "We have not built exactly that" is a better
  answer than an invented one, and it is the honest one.
- Never invent a client name, industry or outcome under any circumstances.
`;

/* ─── Contact facts ─────────────────────────────────────────────────────
   The advisor used to be told to close with a WhatsApp or booking CTA without
   ever being given the details, so it invented them — it offered a prospect
   "+123-456-7890". Anything it hands out has to come from here.
   Keep in sync with components/Footer.tsx and app/contact/page.tsx.
   ───────────────────────────────────────────────────────────────────────── */
export const CONTACT_FACTS = `
GITS CONTACT DETAILS — the only ones you may ever give out:
- WhatsApp (fastest): https://wa.me/2348116276212  (+234 811 627 6212)
- Book a call: https://calendly.com/donatusgwer
- Email: hello@gits.technology
- Contact page: https://gits.technology/contact
- Free site audit: https://gits.technology/audit
- Services: https://gits.technology/services
- Portfolio: https://gits.technology/what-we-build

NEVER invent or guess a phone number, email address, link or booking URL.
If you need a detail that is not listed above, send them to the contact page.
`;

/* ─── Rendered catalogue for the prompt ──────────────────────────────── */

/**
 * Compact list with NO prices — what each line is, and the kind of business it
 * is for. This is what a visitor asking "what do you offer?" gets.
 *
 * Prices are deliberately absent. Leading with money answers a question nobody
 * asked, anchors the conversation on cost before the visitor has said what they
 * need, and reads like a rate card rather than a person. They arrive the moment
 * someone asks — see renderPricing().
 */
export function renderServiceList(): string {
  return SERVICES.map(
    s => `- ${s.name} — ${s.oneLiner}\n  Typically for: ${s.exampleBusinesses.slice(0, 2).join("; ")}.`
  ).join("\n");
}

/**
 * Detail for one service line.
 *
 * The price band is omitted unless the caller asks for it. Telling the model
 * "here is the number, do not say it" is a weaker guarantee than not putting the
 * number in front of it: on a turn where nobody asked about money, the band
 * simply is not in the prompt.
 */
export function renderServiceDetail(id: ServiceId, withPricing = false): string {
  const s = SERVICES.find(x => x.id === id);
  if (!s) return "";
  return [
    `${s.name} — ${s.oneLiner}`,
    `What this covers: ${s.builds.join(", ")}.`,
    `The kinds of business that come to us for it: ${s.exampleBusinesses.join("; ")}.`,
    `Timeline: ${s.timeline}.`,
    `Page: https://gits.technology${s.path}`,
    ...(withPricing ? [`Price band: ${s.pricing}.`] : []),
  ].join("\n");
}

/** Every band, for a turn where the visitor actually asked about cost. */
export function renderPricing(id?: ServiceId | null): string {
  return (id ? SERVICES.filter(s => s.id === id) : SERVICES)
    .map(s => `- ${s.name}: ${s.pricing}. Timeline: ${s.timeline}.`)
    .join("\n");
}

/** Every service in full — builds, example businesses, timelines. */
export function renderFullCatalogue(withPricing = false): string {
  return SERVICES.map(s => renderServiceDetail(s.id, withPricing)).join("\n\n");
}

export const PRICING_RULES = `
PRICING RULES:
- DO NOT VOLUNTEER PRICES. Quote a band only when the visitor asks about cost,
  price, budget or what something "goes for" — or has asked earlier in the
  conversation. A list of services is not a price list, and money raised before
  they have said what they need anchors the whole conversation on cost.
- When they DO ask: lead with the number, in the first sentence. Never answer a
  pricing question with a question.
- Quote only the bands in this prompt. Never invent a number, and never quote a
  figure lower than a band's floor to make a sale look easier.
- Say plainly that a band is a band: the final number comes out of scope.
- Write money as $200, $1,000, $8,000 — comma thousands, never spaces.
- Custom software and anything large: give the range, then say scope decides the
  number and a short call is the honest way to pin it down.
- Never ask for their budget before you understand what they want built.
`;

export const HANDOFF_FACTS = `
HANDING OVER TO A HUMAN — do this the moment you are out of your depth:
- Trigger it when: you do not know; you are not certain; the visitor says you got
  something wrong and this prompt does not tell you the right answer; they ask for
  something GITS does not do; they want a firm quote, a contract or an NDA; they
  ask about an existing project, invoice or deadline; or they simply ask for a
  person.
- Say it plainly: "I'm not certain about that one, and I'd rather not guess than
  tell you something wrong." Never invent an answer to stay useful — guessing
  costs more trust than not knowing ever does.
- Hand over in the SAME message: WhatsApp https://wa.me/2348116276212 is the
  fastest way to reach the team, or book a call at
  https://calendly.com/donatusgwer.
- Offer to summarise what they have told you so whoever picks it up is already up
  to speed, and say the team carries on from there.
- You are the GITS AI advisor. If asked, say so plainly. Never claim to be human.
`;
