export type Origin = "client" | "internal" | "demonstration" | "unclassified";
export interface ServiceContent { slug: string; name: string; headline: string; description: string; introduction: string; offer: string; offerBody: string; contactAction: string; situations: string[]; capabilities: string[] }
export interface ServiceExample {
 id: string; serviceSlug: string; title: string; summary: string; buyerType: string; workflow: string[]; journey: string; origin: Origin;
 functionality: "static preview" | "UI prototype" | "working sandbox" | "production";
 exactContribution: string; deliveredScope: string; limitations: string; previewImage: string | null; caseUrl: string; demoUrl: string | null; sourceUrl: string | null; deliveryPeriod: string | null;
 thirdPartyDependencies: string[]; outcomes: {value: string; baseline: string; measurementPeriod: string; method: string; evidenceReference: string}[];
 permissionToNameClient: boolean; lastVerifiedAt: string; sandbox: string | null;
}
export const serviceContent: ServiceContent[] = [
  {
    "slug": "custom-software-development",
    "name": "Custom software development",
    "headline": "Turn a business process into software your team can use.",
    "description": "Build a product or operational system around an agreed workflow. Start with the part that matters most, review it with your team, and expand after it works.",
    "introduction": "Explore workflows for stock, project approvals and production. Each example explains what it demonstrates, what was built, and where the boundaries are.",
    "offer": "Define and build the first useful workflow.",
    "offerBody": "Agree one user journey, its required inputs, the action it enables and how completion will be checked. The scope can include roles, validation and a simple report where needed. Larger products continue in separate milestones.",
    "contactAction": "Discuss a software workflow",
    "situations": [
      "Specialist operational rules span several teams.",
      "A product needs more than one user group.",
      "An existing product cannot support a confirmed requirement."
    ],
    "capabilities": [
      "SaaS platforms",
      "Construction management",
      "Manufacturing systems",
      "Healthcare & pharmacy operations",
      "Fleet & logistics",
      "School management",
      "Hotel & hospitality",
      "Internal tools & CRM"
    ]
  },
  {
    "slug": "websites-digital-experiences",
    "name": "Websites and digital experiences",
    "headline": "Make your website easier to trust, use and enquire through.",
    "description": "We design and build websites that help visitors understand your offer and take the next step. Choose a new build, a focused redesign or an improvement to your existing site.",
    "introduction": "See the design, the visitor journey and the functional scope of each website. These previews are not presented as verified client deliveries.",
    "offer": "Improve the journey that matters most.",
    "offerBody": "Start with one agreed page or journey: an enquiry, booking, product request or purchase. Define content, mobile behavior and the submission destination before expanding the scope.",
    "contactAction": "Discuss a website project",
    "situations": [
      "Visitors cannot find the right service or next step.",
      "Mobile enquiries are difficult to complete.",
      "Content needs a practical editing and publishing workflow."
    ],
    "capabilities": [
      "Custom design",
      "Responsive build",
      "Performance & SEO",
      "CMS handoff",
      "Commerce & booking",
      "Ongoing support"
    ]
  },
  {
    "slug": "internal-tools-crm",
    "name": "Internal tools and CRM",
    "headline": "Give your team one clear place to manage the work.",
    "description": "Keep leads, approvals, tasks and reports connected in a tool shaped around your operation. We can improve an existing setup or build the missing workflow.",
    "introduction": "See how a daily task moves from entry to review and completion. Each example shows the relevant roles and what the team receives at the end.",
    "offer": "Fix one operational bottleneck.",
    "offerBody": "Choose one pipeline, approval queue or recurring report. Agree the users, import format, permissions and completion check before adding more departments or features.",
    "contactAction": "Discuss an internal workflow",
    "situations": [
      "Leads lose an owner or follow-up date.",
      "Approvals live in disconnected messages.",
      "A recurring report requires repeated manual consolidation."
    ],
    "capabilities": [
      "Custom CRM systems",
      "Staff & HR management",
      "Ticketing & service desks",
      "Project & operations dashboards",
      "Inventory & stock management",
      "Quotation & invoicing tools",
      "Business intelligence dashboards",
      "Client & vendor portals"
    ]
  },
  {
    "slug": "ai-business-automation",
    "name": "AI and business automation",
    "headline": "Automate a repeat task. Keep control of the exceptions.",
    "description": "Connect AI and automation to an agreed workflow, check the results, and route uncertain cases for human review. Start with a useful task and measure it before expanding.",
    "introduction": "See the input, the proposed output and the review step. Preview actions use sample data; no live AI, messages or sensitive decisions are connected.",
    "offer": "Test one task against representative examples.",
    "offerBody": "Agree an input, an expected output, a review rule and a small evaluation set. Use the findings to decide whether the workflow is ready for a paid implementation.",
    "contactAction": "Discuss an automation task",
    "situations": [
      "Enquiries need consistent intake and routing.",
      "Documents require extraction followed by a check.",
      "Staff need answers grounded in approved sources."
    ],
    "capabilities": [
      "AI business agents",
      "Client onboarding",
      "Document retrieval",
      "Automated reporting",
      "CRM & workflow automation",
      "WhatsApp & email sequences",
      "Document intelligence",
      "API orchestration"
    ]
  },
  {
    "slug": "integrations-apis",
    "name": "Integrations and APIs",
    "headline": "Keep your systems in step.",
    "description": "Connect payments, bookings, messages and business tools so your team can follow what happened. Agree the data rules, make failures visible and hand over a system your team can understand.",
    "introduction": "Follow an event from one system to the next. See how the workflow handles a failure or a repeat event.",
    "offer": "Connect one trigger to one useful outcome.",
    "offerBody": "Agree the source event, destination record and expected data. Include validation, a recovery path and an acceptance check. Add further systems in separate milestones.",
    "contactAction": "Discuss an integration",
    "situations": [
      "Payment and order records disagree.",
      "A booking needs a traceable handoff.",
      "Repeated or failed events need a safe recovery path."
    ],
    "capabilities": [
      "Payment gateways",
      "WhatsApp & SMS APIs",
      "Maps & routing",
      "CRM & marketing",
      "Accounting & ERP",
      "Identity verification APIs",
      "Shipping & logistics",
      "Analytics pipelines",
      "Booking & scheduling",
      "AI & LLM APIs",
      "Open banking APIs",
      "Custom API development"
    ]
  }
];
export const serviceExamples: ServiceExample[] = [
  {
    "id": "medicore",
    "serviceSlug": "custom-software-development",
    "title": "Stock movement and expiry review",
    "summary": "Select a sample branch and review inventory and expiry flags.",
    "buyerType": "Pharmacy operations",
    "workflow": [
      "Branch A · sample stock: 24 packs",
      "Transfer request: 6 packs",
      "Expiry exception: review batch before dispatch"
    ],
    "journey": "Branch → movement → checked stock record",
    "origin": "client",
    "functionality": "working sandbox",
    "exactContribution": "Repository-local interactive demonstration; Responsive inventory workspace with search, branch filters, add/edit/delete/undo, validated sample transfers, activity history and CSV export.",
    "deliveredScope": "Responsive inventory workspace with search, branch filters, add/edit/delete/undo, validated sample transfers, activity history and CSV export.",
    "limitations": "No dispensing advice, live stock database or enforced staff permissions. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/custom-software-development#medicore",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": "stock"
  },
  {
    "id": "buildcore",
    "serviceSlug": "custom-software-development",
    "title": "Site updates and spending approvals",
    "summary": "Follow a site update into a spending review.",
    "buyerType": "Construction operations",
    "workflow": [
      "Site update: materials requested",
      "Director review: pending",
      "Project record: awaiting decision"
    ],
    "journey": "Site manager → approval → project record",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Responsive projects workspace with editable progress, add/delete/undo, per-project materials approval, budget exceptions and reports.",
    "deliveredScope": "Responsive projects workspace with editable progress, add/delete/undo, per-project materials approval, budget exceptions and reports.",
    "limitations": "No purchase order is sent; approval roles are illustrative. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/custom-software-development#buildcore",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  },
  {
    "id": "factoryflow",
    "serviceSlug": "custom-software-development",
    "title": "Trace a production batch",
    "summary": "Inspect intake, quality checks and dispatch states.",
    "buyerType": "Food production",
    "workflow": [
      "Material intake: sample lot A",
      "Quality check: awaiting review",
      "Dispatch: held until check"
    ],
    "journey": "Intake → batch → quality → dispatch",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Responsive batch workspace with editable records, quality-release checks, dispatch state, deletion recovery and reports.",
    "deliveredScope": "Responsive batch workspace with editable records, quality-release checks, dispatch state, deletion recovery and reports.",
    "limitations": "No physical traceability, sensor data or compliance certification. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/custom-software-development#factoryflow",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  },
  {
    "id": "notgate",
    "serviceSlug": "websites-digital-experiences",
    "title": "Construction website: projects to enquiries",
    "summary": "Explore a project-focused website presentation.",
    "buyerType": "Construction website",
    "workflow": [
      "Browse project categories",
      "Inspect project content",
      "Identify an enquiry destination"
    ],
    "journey": "Project → details → enquiry",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Anonymized client website project, confirmed by the owner. Repository contains a website screenshot and an interface preview; the full implementation scope requires supporting records.",
    "deliveredScope": "Repository contains a website screenshot and an interface preview of the anonymized client project.",
    "limitations": "Client names have been changed for confidentiality. Project totals, awards and partner logos require supporting evidence.",
    "previewImage": "/services/work/notgate.webp",
    "caseUrl": "/services/websites-digital-experiences#notgate",
    "demoUrl": "https://notgate-w6l1.vercel.app/",
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "Production integrations require agreed API access, permissions and provider plans"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-09",
    "sandbox": null
  },
  {
    "id": "lamed",
    "serviceSlug": "websites-digital-experiences",
    "title": "Pharmacy website: services and branch discovery",
    "summary": "Review a service and branch-finding interface.",
    "buyerType": "Pharmacy website",
    "workflow": [
      "Find a service",
      "Locate branch information",
      "Review a request route"
    ],
    "journey": "Service → branch → request",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository contains a screenshot and a pharmacy interface preview; backend connectivity is not established.",
    "deliveredScope": "Repository contains a screenshot and a pharmacy interface preview; backend connectivity is not established.",
    "limitations": "Do not upload prescriptions or pay through this example. Licensing, privacy/provider statements and live upload/order flows need owner verification.",
    "previewImage": "/services/work/lamed.webp",
    "caseUrl": "/services/websites-digital-experiences#lamed",
    "demoUrl": "https://lamed-pharmacy.vercel.app/",
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "Production integrations require agreed API access, permissions and provider plans"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-09",
    "sandbox": null
  },
  {
    "id": "elowen",
    "serviceSlug": "websites-digital-experiences",
    "title": "Property website: browse to viewing request",
    "summary": "Browse sample listings and their displayed details.",
    "buyerType": "Property website",
    "workflow": [
      "Browse sample properties",
      "Inspect listing information",
      "Discuss a similar viewing journey"
    ],
    "journey": "Search → sample listing → enquiry design",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Inspectable Next.js listing, agents and seller pages with sample content.",
    "deliveredScope": "Inspectable Next.js listing, agents and seller pages with sample content.",
    "limitations": "UI demonstration; no verified listing feed, account system, connected viewing booking or editable CMS.",
    "previewImage": "/services/work/elowen.webp",
    "caseUrl": "/services/websites-digital-experiences#elowen",
    "demoUrl": "/elowen-living",
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "Production integrations require agreed API access, permissions and provider plans"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-09",
    "sandbox": null
  },
  {
    "id": "pipelinedesk",
    "serviceSlug": "internal-tools-crm",
    "title": "Follow a property enquiry through the pipeline",
    "summary": "Inspect a lead and record a sample activity.",
    "buyerType": "Property sales CRM",
    "workflow": [
      "Lead: sample buyer",
      "Owner: sample agent",
      "Follow-up: activity record"
    ],
    "journey": "Lead → owner → activity → stage",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Interactive phone CRM with pipeline, leads, properties and reports screens; editable ownership and stages, saved notes, add/delete/undo and CSV export.",
    "deliveredScope": "Interactive phone CRM with pipeline, leads, properties and reports screens; editable ownership and stages, saved notes, add/delete/undo and CSV export.",
    "limitations": "Browser-local sample CRM; CSV export works, but no persistent database, server-enforced roles, imports or scheduled reminders. Changes reset on reload.",
    "previewImage": null,
    "caseUrl": "/services/internal-tools-crm#pipelinedesk",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  },
  {
    "id": "staffhub",
    "serviceSlug": "internal-tools-crm",
    "title": "Review a roster and leave request",
    "summary": "Review sample cover before approving a leave request.",
    "buyerType": "Hotel staff operations",
    "workflow": [
      "Front desk: cover required",
      "Leave request: pending",
      "Roster: review conflict"
    ],
    "journey": "Staff request → supervisor review → roster",
    "origin": "client",
    "functionality": "working sandbox",
    "exactContribution": "Repository-local interactive demonstration; Interactive phone roster with requests, team and reports screens; cover-gated approval, decline, editable requests, notes and deletion recovery.",
    "deliveredScope": "Interactive phone roster with requests, team and reports screens; cover-gated approval, decline, editable requests, notes and deletion recovery.",
    "limitations": "Browser-only simulation. No payroll, employee records or enforced authorization. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/internal-tools-crm#staffhub",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": "roster"
  },
  {
    "id": "servicedesk",
    "serviceSlug": "internal-tools-crm",
    "title": "Track a maintenance request to resolution",
    "summary": "Inspect assignment and timing warnings on sample tickets.",
    "buyerType": "Facilities ticketing",
    "workflow": [
      "Ticket: cooling fault",
      "Assigned: sample technician",
      "Timing: review priority"
    ],
    "journey": "Request → assignment → warning → closure",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Interactive phone ticket workspace with assignment, clients and reports screens; editable ownership/status, resolution-note validation and deletion recovery.",
    "deliveredScope": "Interactive phone ticket workspace with assignment, clients and reports screens; editable ownership/status, resolution-note validation and deletion recovery.",
    "limitations": "No real SLA monitoring, customer notification or stored closure. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/internal-tools-crm#servicedesk",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  },
  {
    "id": "nexus",
    "serviceSlug": "ai-business-automation",
    "title": "Enquiry intake and consultation routing",
    "summary": "Inspect a sample enquiry and the point requiring human review.",
    "buyerType": "Legal enquiries",
    "workflow": [
      "Input: consultation enquiry",
      "Draft: categorise request",
      "Review: sensitive or ambiguous content"
    ],
    "journey": "Enquiry → draft → human review",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Three scripted phone journeys for consultation intake, urgent human escalation and rescheduling; reviewed drafts, simulated handoffs, acknowledgements and activity.",
    "deliveredScope": "Three scripted phone journeys for consultation intake, urgent human escalation and rescheduling; reviewed drafts, simulated handoffs, acknowledgements and activity.",
    "limitations": "No legal advice, connected calendar, message delivery or automated legal decisions. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/ai-business-automation#nexus",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  },
  {
    "id": "bridgepoint",
    "serviceSlug": "ai-business-automation",
    "title": "Document intake and review queue",
    "summary": "Review sample document completeness before a human decision.",
    "buyerType": "Lending onboarding",
    "workflow": [
      "Input: sample document fields",
      "Exception: missing information",
      "Decision: human reviewer"
    ],
    "journey": "Document → fields → missing items → review",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Three scripted phone journeys for missing documents, mismatched fields and unreadable scans; reviewer approval, simulated requests and follow-up without automated eligibility decisions.",
    "deliveredScope": "Three scripted phone journeys for missing documents, mismatched fields and unreadable scans; reviewer approval, simulated requests and follow-up without automated eligibility decisions.",
    "limitations": "No identity verification, credit decision or verified extraction accuracy. No real documents should be submitted. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/ai-business-automation#bridgepoint",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  },
  {
    "id": "meridian",
    "serviceSlug": "ai-business-automation",
    "title": "Find an answer with its source",
    "summary": "Inspect a sample question alongside its supporting reference.",
    "buyerType": "Property knowledge",
    "workflow": [
      "Question: sample policy query",
      "Source: sample policy passage",
      "Unknown answer: ask a reviewer"
    ],
    "journey": "Question → source passage → answer or escalation",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Three scripted phone journeys: hot-water maintenance, rent reminder and manager escalation. Each includes a reviewed draft, simulated handoff, acknowledgement, follow-up, sources and activity.",
    "deliveredScope": "Three scripted phone journeys: hot-water maintenance, rent reminder and manager escalation. Each includes a reviewed draft, simulated handoff, acknowledgement, follow-up, sources and activity.",
    "limitations": "No live retrieval, model training or guarantee of answer correctness. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/ai-business-automation#meridian",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  },
  {
    "id": "zova",
    "serviceSlug": "integrations-apis",
    "title": "Payment event to order status",
    "summary": "Process a sample event, replay it and recover a simulated failure.",
    "buyerType": "Retail payments",
    "workflow": [
      "Event: payment.test.001",
      "Validation: test order reference",
      "Result: one order update"
    ],
    "journey": "Received → validated → processed / failed → retry",
    "origin": "client",
    "functionality": "working sandbox",
    "exactContribution": "Repository-local interactive demonstration; Responsive sample order dashboard with event processing, failure/retry, duplicate detection, mapping and exportable activity.",
    "deliveredScope": "Responsive sample order dashboard with event processing, failure/retry, duplicate detection, mapping and exportable activity.",
    "limitations": "No payment provider, funds movement or real webhook signature validation. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/integrations-apis#zova",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": "payment"
  },
  {
    "id": "swifthaul",
    "serviceSlug": "integrations-apis",
    "title": "Assignment to customer update",
    "summary": "Follow a sample assignment into a notification handoff.",
    "buyerType": "Logistics",
    "workflow": [
      "Assignment: sample driver",
      "Update: awaiting notification provider",
      "Exception: review failed handoff"
    ],
    "journey": "Assignment → tracking record → notification status",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Responsive delivery dashboard with driver selection, simulated event failure/retry, duplicate detection, recipient acknowledgement and activity.",
    "deliveredScope": "Responsive delivery dashboard with driver selection, simulated event failure/retry, duplicate detection, recipient acknowledgement and activity.",
    "limitations": "No live maps, driver tracking or messages. Provider acceptance would not establish delivery. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/integrations-apis#swifthaul",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  },
  {
    "id": "pulseclinic",
    "serviceSlug": "integrations-apis",
    "title": "Booking to reminder and payment status",
    "summary": "Review a booking's reminder and payment handoffs.",
    "buyerType": "Clinic bookings",
    "workflow": [
      "Booking: sample appointment",
      "Reminder: awaiting provider",
      "Payment: not connected"
    ],
    "journey": "Booking → reminder → payment reference → review",
    "origin": "client",
    "functionality": "UI prototype",
    "exactContribution": "Repository-local interactive demonstration; Responsive booking dashboard with slot selection, simulated reminder failure/retry, duplicate detection, acknowledgement and activity.",
    "deliveredScope": "Responsive booking dashboard with slot selection, simulated reminder failure/retry, duplicate detection, acknowledgement and activity.",
    "limitations": "No patient data, message delivery, payment collection or clinical decisions. Changes reset on reload. Sample data only; this demonstration does not establish a client deployment or business-result claim.",
    "previewImage": null,
    "caseUrl": "/services/integrations-apis#pulseclinic",
    "demoUrl": null,
    "sourceUrl": null,
    "deliveryPeriod": null,
    "thirdPartyDependencies": [
      "React browser-local state; no live external services"
    ],
    "outcomes": [],
    "permissionToNameClient": false,
    "lastVerifiedAt": "2026-10-11",
    "sandbox": null
  }
];
export function contactHref(service: string, example?: string) {
 const params = new URLSearchParams({service});
 if(example) params.set("example", example);
 return "/contact?" + params.toString() + "#project-form";
}
export function resolveContactContext(search: string) {
 const params = new URLSearchParams(search);
 const service = serviceContent.find(s => s.slug === params.get("service"));
 const example = serviceExamples.find(e => e.id === params.get("example") && e.serviceSlug === service?.slug);
 return service ? {service, example} : null;
}
