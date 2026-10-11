"use client";
import {
  CaseDemo,
  CaseEvidence,
  ExampleNavigation,
  CapabilityDescription,
} from "@/components/service-examples/CaseDemo";
import { contactHref } from "@/content/services";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Eyebrow,
  EditorialButton,
  editorialRoot,
  cx,
  SectionNav,
  SECTION_SCROLL_MT,
  type NavSection,
} from "@/components/editorial";
import { SERVICE_ICONS, type ServiceIconKey } from "@/components/service-icons";

const ease = [0.22, 0.61, 0.36, 1] as const;

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — Bold, unique industry-authentic colors
// ═══════════════════════════════════════════════════════════════
const CASE_THEMES = {
  medicore: {
    accent: "#0A3D2E",
    accentLight: "rgba(10,61,46,0.08)",
    accentBorder: "rgba(10,61,46,0.20)",
    accentText: "#0A3D2E",
    accentSoft: "#E8F5E9",
    accentGlow: "rgba(10,61,46,0.15)",
    label: "Healthcare · Pharmacy Operations",
    number: "01",
  },
  buildcore: {
    accent: "#431407",
    accentLight: "rgba(67,20,7,0.08)",
    accentBorder: "rgba(67,20,7,0.20)",
    accentText: "#431407",
    accentSoft: "#FFF3E0",
    accentGlow: "rgba(67,20,7,0.15)",
    label: "Construction · Site Management",
    number: "02",
  },
  factoryflow: {
    accent: "#1E1B4B",
    accentLight: "rgba(30,27,75,0.08)",
    accentBorder: "rgba(30,27,75,0.20)",
    accentText: "#1E1B4B",
    accentSoft: "#EDE9FE",
    accentGlow: "rgba(30,27,75,0.15)",
    label: "Manufacturing · Production Ops",
    number: "03",
  },
} as const;
type CaseId = keyof typeof CASE_THEMES;

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const rm = useReducedMotion();
  const fd = (d: number) => ({ duration: rm ? 0 : 0.7, ease, delay: d });

  // Three supporting notes. Numbered in mono rather than sat behind coloured
  // icon tiles — the numeral carries the hierarchy, so no accent is needed.
  const notes = [
    {
      n: "01",
      title: "Built for your business",
      body: "Custom software is designed from scratch around your specific workflows, roles, and data — not around what's easiest to build.",
    },
    {
      n: "02",
      title: "Why generic tools break down",
      body: "Off-the-shelf tools serve the average business. If your operations have any complexity — multiple locations, multiple roles, custom workflows — they create more manual work than they save.",
    },
    {
      n: "03",
      title: "What we need from you",
      body: "Not a technical spec. Just a clear description of how your business currently operates and where the friction is. We handle architecture, design, development, and launch.",
    },
  ];

  return (
    <section className="relative px-6 sm:px-10 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="relative mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0)}
        >
          <Eyebrow index="01">Custom Software Development</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.06)}
          className="mt-8 md:mt-12 max-w-5xl"
        >
          <span className="block text-[clamp(2.2rem,6vw,4.6rem)] font-extralight leading-[1.03] tracking-[-0.03em] text-[#050505]">
            Software built exactly for
          </span>
          <span className="block text-[clamp(2.2rem,6vw,4.6rem)] italic font-light leading-[1.03] tracking-[-0.01em] text-[#050505]/70 font-[family-name:var(--font-fraunces)] pl-[4vw] md:pl-[2vw]">
            the way your business works.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.12)}
          className="mt-8 md:mt-10 max-w-xl text-base md:text-lg font-light text-[#666666] leading-[1.75]"
        >
          Off-the-shelf tools make your business adapt to someone else&rsquo;s
          product. Custom software adapts to you — built around your workflows,
          your team, and your growth plan. You own the code. No licensing. No
          lock-in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.18)}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <EditorialButton href={contactHref("custom-software-development")}>
            Start a project
          </EditorialButton>
          <EditorialButton href="#case-studies" variant="ghost">
            See our work
          </EditorialButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fd(0.26)}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
        >
          {[
            "Full code ownership — no lock-in",
            "NDA before any details are shared",
            "Fixed scope — no surprise invoices",
            "12+ countries served",
          ].map((t) => (
            <span
              key={t}
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#666666]"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* Hairline-ruled columns instead of a floating rounded card: the rules
            do the separating, so no shadow, radius or backdrop blur is needed. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fd(0.3)}
          className="mt-16 md:mt-20 grid gap-10 md:gap-0 md:grid-cols-3 border-t border-[#050505]/10 pt-10"
        >
          {notes.map((note, i) => (
            <div
              key={note.n}
              className={cx(
                "md:px-8",
                i === 0 && "md:pl-0",
                i === 2 && "md:pr-0",
                i > 0 && "md:border-l md:border-[#050505]/10",
              )}
            >
              <span className="font-[family-name:var(--font-mono)] text-xs text-[#666666]">
                {note.n}
              </span>
              <p className="mt-3 text-lg font-light tracking-tight text-[#050505]">
                {note.title}
              </p>
              <p className="mt-3 text-sm font-light text-[#666666] leading-[1.7]">
                {note.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CAROUSEL
// ═══════════════════════════════════════════════════════════════
const WHAT_WE_BUILD: {
  key: ServiceIconKey;
  title: string;
  who: string;
  desc: string;
}[] = [
  {
    key: "saas",
    title: "SaaS Platforms",
    who: "Startups & scale-ups",
    desc: "Multi-tenant apps with subscription billing, role management and real-time features — built for 10× your current volume.",
  },
  {
    key: "construction",
    title: "Construction Management",
    who: "Contractors & developers",
    desc: "Multi-site dashboards, material tracking and procurement approvals, replacing WhatsApp updates and Excel reports.",
  },
  {
    key: "manufacturing",
    title: "Manufacturing Systems",
    who: "Factories & processors",
    desc: "Raw material intake, production planning, quality control and dispatch connected into one system.",
  },
  {
    key: "healthcare",
    title: "Healthcare & Pharmacy Ops",
    who: "Clinics & pharmacy networks",
    desc: "Multi-branch inventory, expiry monitoring and dispensing workflows under one dashboard.",
  },
  {
    key: "fleet",
    title: "Fleet & Logistics Ops",
    who: "Companies that own vehicles",
    desc: "Maintenance schedules, fuel tracking, driver assignment and downtime monitoring.",
  },
  {
    key: "school",
    title: "School Management",
    who: "Private & independent schools",
    desc: "Admissions, fees, results, parent portals and attendance in a single platform.",
  },
  {
    key: "hotel",
    title: "Hotel & Hospitality",
    who: "Hotels & guest houses",
    desc: "Reservations, housekeeping, room status and restaurant billing for operations generic PMS software cannot fit.",
  },
  {
    key: "internal",
    title: "Internal Tools & CRMs",
    who: "Operations-heavy teams",
    desc: "Purpose-built dashboards and CRMs replacing a disconnected stack of SaaS subscriptions.",
  },
];

function WhatWeBuildCarousel() {
  // Previously a carousel showing three of eight (one on mobile), so most of
  // the range was hidden behind arrow clicks and nothing could be scanned.
  // A plain grid lets someone recognise their own industry at a glance, which
  // is the only job this section has.
  return (
    <section
      id="what-we-build"
      className={cx(
        SECTION_SCROLL_MT,
        "px-6 sm:px-10 lg:px-16 py-24 md:py-32 border-t border-[#050505]/10",
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <Eyebrow index="02">What we build</Eyebrow>
          <h2 className="mt-6 text-3xl md:text-4xl font-extralight tracking-tight text-[#050505] leading-[1.1]">
            Not sure if your business needs custom software?
          </h2>
          <p className="mt-5 text-base font-light text-[#666666] leading-[1.75]">
            Eight kinds of operational system we build. If one of these
            describes a problem you have right now, we should talk.
          </p>
        </div>

        <div className="service-capabilities mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 md:gap-y-14">
          {WHAT_WE_BUILD.map((item, i) => {
            const Icon = SERVICE_ICONS[item.key];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: (i % 4) * 0.06 }}
                className="group"
              >
                <Icon className="w-10 h-10 text-[#050505] transition-transform duration-500 ease-out group-hover:-translate-y-0.5" />
                <p className="mt-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                  {item.who}
                </p>
                <h3 className="mt-2 text-lg font-light tracking-tight text-[#050505]">
                  {item.title}
                </h3>
                <CapabilityDescription>{item.desc}</CapabilityDescription>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 border-t border-[#050505]/10 pt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <p className="text-sm font-light text-[#666666] leading-[1.75] max-w-xl">
            If your business is currently running critical operations through
            WhatsApp, spreadsheets, or a tool that wasn&rsquo;t built for your
            industry — there&rsquo;s a better way. We&rsquo;ve built it before.
          </p>
          <EditorialButton
            href={contactHref("custom-software-development")}
            className="flex-shrink-0 whitespace-nowrap"
          >
            Tell us what you need
          </EditorialButton>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// DEMO 1 — MEDICORE (Pharmacy Operations)
// Deep Apothecary Green: #0A3D2E
// ═══════════════════════════════════════════════════════════════
function MedicoreDemo() {
  return <CaseDemo id="medicore" />;
}

// ═══════════════════════════════════════════════════════════════
// DEMO 2 — BUILDCORE (Construction Management)
// Burnt Sienna: #431407
// ═══════════════════════════════════════════════════════════════
function BuildCoreDemo() {
  return <CaseDemo id="buildcore" />;
}

// ═══════════════════════════════════════════════════════════════
// DEMO 3 — FACTORYFLOW (Manufacturing Operations)
// Ink Indigo: #1E1B4B
// ═══════════════════════════════════════════════════════════════
function FactoryFlowDemo() {
  return <CaseDemo id="factoryflow" />;
}

// ═══════════════════════════════════════════════════════════════
// CASE STUDY DATA
// ═══════════════════════════════════════════════════════════════
const CASES = [
  {
    id: "medicore" as CaseId,
    client: "Multi-Branch Pharmacy Group",
    industry: "Healthcare",
    scope:
      "Warehouse Ops · Inventory Visibility · Expiry Management · Reporting",
    headline:
      "How we gave a multi-branch pharmacy network a single operational view of its own business.",
    subheadline:
      "Six separate workflows — warehouse, branches, dispatch, inventory, expiry, and reporting — had grown apart as the business scaled. We connected them.",
    why: {
      title: "Why this was an operational problem, not just a software problem",
      body: "A growing pharmacy network was managing daily operations across a central warehouse and multiple branches using spreadsheets, an existing point-of-sale system, and manual reporting. Each part of the operation functioned — but independently. As transaction volume grew, the gaps between systems became the bottleneck. Stock moved between the warehouse and branches with no central record. Expiry monitoring relied on staff physically checking shelves. Branch managers spent hours preparing reports that were already outdated by the time management saw them. The objective was not to replace what worked. It was to connect the systems that couldn't talk to each other.",
    },
    how: {
      title: "What we discovered in discovery — and what it changed",
      body: "During the first week, we mapped six separate operational flows that were each being handled through a different combination of spreadsheets, WhatsApp messages, and phone calls. The insight was specific: the pharmacy wasn't missing a tool — it was missing a shared data layer. Every branch, the warehouse, and management were making decisions based on different versions of the same information. We designed a centralised platform that let each role continue working the way they already worked, but with every action now writing to a single shared record. No retraining. No disruption. The system was built around their operation, not the other way around.",
    },
    insight:
      "The pharmacy wasn't disorganised. It was running six separate operational systems that had never been connected — and each one was generating its own version of the truth.",
    modules: [
      {
        name: "Unified Inventory Layer",
        problem:
          "Warehouse and branch stock were tracked separately, making it impossible to know the true network position of any drug at any time.",
        built:
          "A centralised inventory database that every branch and the warehouse writes to simultaneously. Transfers, sales, and restocks all update the same record in real time.",
        impact:
          "Management can see the network position of any drug across all locations in one view. Stock redistribution decisions are now based on live data, not day-old spreadsheets.",
      },
      {
        name: "Expiry Monitoring Engine",
        problem:
          "Expiry tracking required staff to manually review shelves and spreadsheets. Products approaching expiry were frequently missed until it was too late to redistribute them.",
        built:
          "Automated expiry monitoring that flags products within a configurable threshold of their expiry date. Branch and warehouse managers receive alerts before the window for action closes.",
        impact:
          "The system surfaces redistribution opportunities — moving near-expiry stock from low-demand branches to high-demand ones — before those products become a loss.",
      },
      {
        name: "Role-Based Dashboards",
        problem:
          "Different staff roles needed completely different information, but they were all working from the same shared spreadsheets — seeing too much of what they didn't need and not enough of what they did.",
        built:
          "Separate interfaces for warehouse staff, branch pharmacists, branch managers, cashiers, and business owners. Each role sees only the data and actions relevant to their function.",
        impact:
          "Operational clarity improved without increasing training overhead. Staff work faster because the system surfaces only what they need to act on.",
      },
      {
        name: "Warehouse-to-Branch Transfer System",
        problem:
          "Stock transfers between the warehouse and branches were coordinated over WhatsApp and phone calls, with no central record of what was requested, approved, or dispatched.",
        built:
          "A structured transfer request and approval workflow: branches request stock, the warehouse confirms availability, dispatches, and the receiving branch acknowledges receipt. Every transfer creates an auditable record.",
        impact:
          "The full movement history of any stock item — from warehouse intake to branch sale — is traceable in a single log.",
      },
      {
        name: "Automated Management Reporting",
        problem:
          "Business owners relied on branch managers manually compiling and sending operational reports — a process that took significant time and was prone to inconsistency.",
        built:
          "Automated daily, weekly, and monthly reports generated directly from system data: sales by branch, stock movement, expiry alerts, and transfer activity. Sent to management without anyone preparing them manually.",
        impact:
          "Business owners access a live operational view at any time, rather than waiting for manually prepared summaries.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        title: "Discovery & operational mapping",
        items: [
          "Interviewed warehouse manager, branch managers, cashiers, and owner",
          "Mapped all six operational flows and their breakpoints",
          "Identified the shared data layer as the core architectural need",
          "Delivered a fixed technical specification",
        ],
      },
      {
        week: "Week 2",
        title: "Architecture & role-based design",
        items: [
          "Designed each role's interface separately from its function",
          "Database schema and inventory logic finalised",
          "Transfer request and approval workflow mapped",
          "All screens reviewed and approved before development",
        ],
      },
      {
        week: "Weeks 3–4",
        title: "Build, test & phased launch",
        items: [
          "Core inventory and transfer modules built first",
          "Tested with live warehouse and branch data",
          "Expiry monitoring alerts configured per product category",
          "Branch staff onboarded role by role",
        ],
      },
    ],
    outcomes: [
      {
        claim:
          "Real-time stock visibility across all branches and the warehouse.",
        why: "Every sale, transfer, and restock now writes to a single shared database — eliminating the lag between what happened and what management knows.",
      },
      {
        claim:
          "Automated expiry alerts fire before the redistribution window closes.",
        why: "The system monitors expiry dates continuously and flags products before action is no longer possible — turning a reactive problem into a proactive one.",
      },
      {
        claim: "Zero manual steps to produce management reports.",
        why: "Reports are generated directly from operational data on a schedule. No branch manager prepares them. No figures need to be consolidated.",
      },
      {
        claim: "One system connecting the warehouse, branches and management.",
        why: "Where six separate tools and communication channels existed, there is now a single operational record that everyone reads from and writes to.",
      },
    ],
    before: [
      "Warehouse and branch stock tracked in separate spreadsheets",
      "Expiry monitoring relied on manual shelf checks",
      "Stock transfers coordinated by WhatsApp and phone",
      "Management reports compiled manually by branch managers",
      "No unified view of network-wide inventory position",
    ],
    after: [
      "Single inventory database updated in real time across all locations",
      "Automated expiry alerts surface redistribution opportunities early",
      "Transfers logged from request to receipt with full audit trail",
      "Management reports generated automatically from live data",
      "Business owners see a live operational dashboard at any time",
    ],
    stack: [
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Role-Based Auth",
      "Resend",
      "Vercel",
    ],
    duration: "4 weeks",
    DemoComponent: MedicoreDemo,
    demoCaption:
      "Branch inventory — request replenishment, approve, dispatch, acknowledge receipt and inspect stock movements.",
  },
  {
    id: "buildcore" as CaseId,
    client: "Mid-Size Construction Firm",
    industry: "Construction",
    scope:
      "Site Management · Materials Tracking · Procurement · Progress Reporting",
    headline:
      "How we replaced WhatsApp updates and Excel reports with a live view of every active construction site.",
    subheadline:
      "Directors were making financial decisions based on weekly summaries that were already five days old. We gave them a live operational picture — without changing how site teams work.",
    why: {
      title: "Why construction firms specifically need custom software",
      body: "Construction companies in Nigeria already know software exists for this problem — Procore, Buildertrend, and Autodesk Construction Cloud are well-known globally. The gap is that those tools were built for large contractors in Western markets with dedicated project management offices and IT departments. A mid-size Nigerian construction firm managing three to six active sites simultaneously has a completely different operational reality: site managers sending progress updates over voice notes, materials tracked in site notebooks, procurement handled through personal supplier relationships, and directors receiving consolidated reports once a week — by which time decisions are already overdue. The software exists. The right fit for how Nigerian construction actually operates has been missing.",
    },
    how: {
      title:
        "The core design decision: director visibility without disrupting site workflows",
      body: "In discovery, we found that the site managers had good instincts and ran their sites well. The problem wasn't at site level — it was that all the information those managers held in their heads and notebooks was invisible to directors until the weekly meeting. We made one decision early: we would not try to change how site managers work. We would build them a simple tool that captured what they were already doing — materials used, workers present, progress notes, photos — and surfaced it instantly to the director dashboard. The site manager's job gets slightly easier. The director's visibility transforms completely.",
    },
    insight:
      "The problem wasn't that site managers weren't managing well. It was that everything they knew was invisible to anyone above them until Friday.",
    modules: [
      {
        name: "Multi-Site Director Dashboard",
        problem:
          "Directors had no live view of site progress, budget consumption, or material status across multiple active projects. They managed by intuition and weekly reports.",
        built:
          "A unified dashboard showing all active sites simultaneously: progress percentage, budget vs actual spend, workers on site today, open material requests, and recent site updates.",
        impact:
          "Directors can see in real time which sites are on track, which are consuming budget faster than progress justifies, and which need attention — without calling anyone.",
      },
      {
        name: "Daily Site Progress Logging",
        problem:
          "Site managers communicated progress through WhatsApp voice notes and personal calls. No structured record of daily activity, decisions, or incidents existed.",
        built:
          "A simple daily log interface for site managers: work completed today, workers present, equipment in use, photos uploaded, and any issues flagged. Takes under three minutes to complete.",
        impact:
          "A complete chronological record of every site exists in the system. Progress photos are timestamped and attached to the correct date and site.",
      },
      {
        name: "Materials Request & Tracking",
        problem:
          "Material requests were made verbally or by message, procurement was handled informally, and no one could see exactly what had been delivered to each site at any point.",
        built:
          "Structured material requests raised by site managers, reviewed by procurement, approved by directors above a threshold, and logged as delivered when goods arrive on site.",
        impact:
          "The full material movement history — requested, approved, ordered, delivered — for every site is traceable. Budget overruns from unapproved purchases become visible before they happen.",
      },
      {
        name: "Procurement Approval Workflow",
        problem:
          "Purchases above certain values were supposed to require director approval. In practice, site-level procurement happened informally and was reconciled retrospectively.",
        built:
          "Tiered approval workflow: site-level purchases below a threshold proceed automatically; above it, procurement raises a purchase order that routes to the director for approval before the vendor is contacted.",
        impact:
          "Directors approve expenditure above the threshold before it happens, not after. Vendors receive formal purchase orders, creating a paper trail for every significant spend.",
      },
      {
        name: "Budget vs Actual Tracking",
        problem:
          "Budget monitoring happened in spreadsheets updated monthly. Overspending was discovered after the fact, when the options for correction were already limited.",
        built:
          "Live budget tracking per site: every approved purchase updates the 'actual spent' figure against the original budget. Directors see the burn rate per site at any time.",
        impact:
          "Budget pressure surfaces early enough to act — adjust scope, pause procurement, or reallocate — rather than being discovered at month-end.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        title: "Discovery across roles",
        items: [
          "Interviewed directors, project managers, site managers",
          "Mapped information flow from site to boardroom",
          "Identified the director-visibility gap as the core problem",
          "Fixed scope and timeline agreed",
        ],
      },
      {
        week: "Week 2",
        title: "Architecture & interface design",
        items: [
          "Director dashboard and site manager log designed separately",
          "Procurement approval workflow and thresholds defined",
          "Budget tracking logic mapped to existing project structures",
          "All screens approved before development began",
        ],
      },
      {
        week: "Weeks 3–5",
        title: "Build, pilot & rollout",
        items: [
          "Director dashboard and budget tracking built first",
          "Piloted on one active site for two weeks",
          "Site manager log refined based on field feedback",
          "Full rollout across all active sites in week 5",
        ],
      },
    ],
    outcomes: [
      {
        claim: "Daily site progress visibility, not weekly.",
        why: "Site managers log daily. Directors see it the same day. The one-week information lag is eliminated.",
      },
      {
        claim:
          "Procurement above the threshold is approved before the vendor is contacted, not reconciled after.",
        why: "The approval workflow routes purchase orders to directors before the vendor is contacted. Retrospective reconciliation is replaced by real-time oversight.",
      },
      {
        claim: "Live budget against actual for every active site.",
        why: "Every approved purchase updates the budget ledger immediately. Burn rate is visible at any time, not at month-end.",
      },
      {
        claim: "Zero WhatsApp messages needed to get a site update.",
        why: "Directors open the dashboard. The information is there — progress, workers, materials, photos — without calling anyone.",
      },
    ],
    before: [
      "Progress updates received via WhatsApp voice notes and calls",
      "Budget monitoring in spreadsheets updated monthly",
      "Material requests made verbally with no formal record",
      "Directors waited for weekly meetings to understand site status",
      "Procurement happened informally and was reconciled after the fact",
    ],
    after: [
      "Daily site logs give directors a live operational picture",
      "Budget vs actual tracked in real time per site",
      "Every material request, approval, and delivery is logged",
      "Director dashboard shows all sites simultaneously — no calls needed",
      "Procurement above threshold requires approval before the order is placed",
    ],
    stack: [
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Cloudinary",
      "Resend",
      "Vercel",
    ],
    duration: "5 weeks",
    DemoComponent: BuildCoreDemo,
    demoCaption:
      "Project operations — inspect site progress, request materials, review approvals and record purchase orders and goods receipts.",
  },
  {
    id: "factoryflow" as CaseId,
    client: "Food Processing Manufacturer",
    industry: "Manufacturing",
    scope: "Production Planning · Raw Materials · QC · Warehouse · Dispatch",
    headline:
      "How we connected raw material intake, production, quality control, and dispatch for a food processing business — into one operational system.",
    subheadline:
      "Each stage of production was tracked independently. When something went wrong, nobody could say exactly where it had gone wrong, when, or why.",
    why: {
      title:
        "Why manufacturing businesses outgrow spreadsheets faster than most",
      body: "A food processing business has at least five distinct operational stages that all depend on each other: raw material procurement, intake and allocation, production scheduling, quality control, finished goods warehousing, and dispatch. In a small or growing factory, these are almost always managed in separate spreadsheets or informal logs — because the people running each stage are specialists in their stage, not in coordination. The problem appears slowly. A raw material shortage isn't discovered until the production batch is already started. A quality hold on one batch isn't visible to the dispatch team. Finished goods are committed to a customer before the warehouse has confirmed they exist. The tools that large manufacturers use — SAP, Odoo Manufacturing, Katana — are either too expensive, too complex to implement, or built around assumptions that don't match how a growing African manufacturer actually operates.",
    },
    how: {
      title:
        "The architectural insight — each stage needed its own interface, but shared data",
      body: "We ran discovery sessions separately with the procurement officer, the production supervisor, the quality control manager, and the dispatch team. The insight was that each person had a clear and reasonable view of their own stage — the problem was that those views were completely disconnected from each other. A batch could move from production to QC without the QC manager knowing it was coming. A dispatch order could be raised for goods that were still on hold in QC. We designed a production pipeline model: every batch is a formal object that moves through defined stages, and each stage transition requires a named action from the responsible person. Nothing moves forward silently.",
    },
    insight:
      "Raw materials, production, QC, and dispatch were all being managed competently — in complete isolation. The business had no system for the space between stages.",
    modules: [
      {
        name: "Production Batch Tracker",
        problem:
          "Production runs were logged in a notebook or not at all. There was no formal record of what was being produced, at what quantity, and at which stage of the process.",
        built:
          "Every production run is created as a batch with a unique ID, product type, target quantity, and responsible supervisor. The batch moves through a defined pipeline: raw intake → production → QC → packaging → dispatch.",
        impact:
          "Any production run can be located at its exact stage at any time. If something goes wrong, the record shows exactly when it entered that stage, who was responsible, and what the inputs were.",
      },
      {
        name: "Raw Material Allocation Engine",
        problem:
          "Raw materials were procured and stored without a clear link to production requirements. Shortages were discovered mid-batch when the material had already run out.",
        built:
          "When a production batch is created, the system checks raw material availability against the batch requirement and flags shortages before the batch begins. Allocations are reserved, not just noted.",
        impact:
          "Production batches are not started without confirming material availability. The scenario where a batch begins and then stops because of a missing material is eliminated.",
      },
      {
        name: "Quality Control Sign-Off Workflow",
        problem:
          "QC results were logged in a separate notebook. Production moved batches to packaging or dispatch without formal QC clearance — creating food safety and compliance risk.",
        built:
          "Each batch reaching the QC stage generates a checklist for the QC manager: test results, sample data, pass/fail decision. The batch cannot advance to packaging until QC is signed off.",
        impact:
          "No batch moves forward without documented QC clearance. The audit trail for every batch — from production through QC to dispatch — exists in the system.",
      },
      {
        name: "Finished Goods & Warehouse Visibility",
        problem:
          "Finished goods were stored in a warehouse managed by a separate team with no connection to production or dispatch systems. Dispatch orders were sometimes raised for goods that weren't ready.",
        built:
          "When QC clears a batch for packaging, finished goods are logged into the warehouse record with quantity and date. Dispatch orders can only be raised against confirmed finished goods inventory.",
        impact:
          "Sales and dispatch teams work from accurate finished goods figures. Overselling or dispatching goods that aren't ready is prevented by the system structure.",
      },
      {
        name: "Dispatch & Delivery Management",
        problem:
          "Dispatch was coordinated informally. Customers were sometimes given delivery commitments before the goods had left the factory, and there was no formal record of what had been sent where.",
        built:
          "Dispatch orders are raised against confirmed inventory, assigned to a vehicle and driver, and marked as departed with a timestamp. Customers can be given accurate dispatch information because the system holds it.",
        impact:
          "Every dispatch has a formal record: goods, quantity, vehicle, driver, departure time, and destination. Disputes about what was sent are resolvable from the system log.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        title: "Discovery with all five operational roles",
        items: [
          "Separate interviews with procurement, production, QC, warehouse, and dispatch",
          "Mapped all five operational stages and the gaps between them",
          "Designed the batch pipeline model as the core architecture",
          "Fixed specification agreed",
        ],
      },
      {
        week: "Week 2",
        title: "Architecture & interface design",
        items: [
          "Each stage interface designed for its specific user",
          "Batch state machine and transition rules defined",
          "Material allocation logic designed",
          "All interfaces approved before development",
        ],
      },
      {
        week: "Weeks 3–5",
        title: "Build, test & staged rollout",
        items: [
          "Production batch tracker built and tested first",
          "Raw material allocation engine integrated",
          "QC sign-off workflow piloted with one product line",
          "Full rollout with all five operational roles in week 5",
        ],
      },
    ],
    outcomes: [
      {
        claim: "One system tracking every batch from raw intake to dispatch.",
        why: "Where five separate logs and notebooks existed, there is now a single production record that all five roles read from and write to.",
      },
      {
        claim: "Zero batches started without confirmed material availability.",
        why: "The allocation engine checks and reserves materials before a batch begins. Starting a batch with insufficient stock is prevented by the system, not by someone remembering to check.",
      },
      {
        claim:
          "An auditable QC record for every batch, with timestamps and sign-offs.",
        why: "QC sign-off is a required step in the batch pipeline. It cannot be skipped. Every batch that reaches a customer has a documented QC clearance.",
      },
      {
        claim:
          "Accurate finished-goods inventory before dispatch orders are raised.",
        why: "Dispatch can only be raised against confirmed warehouse stock. Sales commitments are made against real inventory, not estimates.",
      },
    ],
    before: [
      "Production runs logged in notebooks with no formal tracking",
      "Raw material shortages discovered mid-batch",
      "QC results in a separate notebook with no system link",
      "Dispatch orders raised against unconfirmed finished goods",
      "No single view of what was in production, QC, or warehouse at any time",
    ],
    after: [
      "Every batch tracked through a defined pipeline from intake to dispatch",
      "Material availability confirmed before a batch begins",
      "QC sign-off required before any batch advances",
      "Dispatch raised only against confirmed finished goods inventory",
      "Supervisors and management see live production status at any time",
    ],
    stack: [
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Role-Based Auth",
      "Resend",
      "Railway",
    ],
    duration: "5 weeks",
    DemoComponent: FactoryFlowDemo,
    demoCaption:
      "Production pipeline — reserve materials, complete quality checks, confirm packaging and follow shipments through delivery.",
  },
] as const;

// ═══════════════════════════════════════════════════════════════
// SHARED SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════
function ModuleRow({
  mod,
  accent,
}: {
  mod: { name: string; problem: string; built: string; impact: string };
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-black/[0.08] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 gap-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{ background: accent }}
          />
          <span className="text-sm font-medium text-gray-900 truncate">
            {mod.name}
          </span>
        </div>
        <span
          className={`text-gray-600 text-sm transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="b"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/[0.06] divide-y divide-black/[0.04]">
              {}
              {[
                {
                  l: "The operational problem",
                  t: mod.problem,
                  c: "text-red-600/70",
                },
                { l: "What we built", t: mod.built, c: "text-gray-500" },
                { l: "Business impact", t: mod.impact, c: "text-emerald-700" },
              ].map(({ l, t, c }) => (
                <div key={l} className="px-4 py-3">
                  <p
                    className={`font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] mb-1 ${c}`}
                  >
                    {l}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CaseTimeline({
  weeks,
  accent,
}: {
  weeks: readonly { week: string; title: string; items: readonly string[] }[];
  accent: string;
}) {
  return (
    <div>
      {weeks.map((w, i) => (
        <div key={w.week} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: accent }}
            >
              <span className="text-white text-[11px] font-bold">{i + 1}</span>
            </div>
            {i < weeks.length - 1 && (
              <div
                className="w-px flex-1 mt-1"
                style={{ background: `${accent}22` }}
              />
            )}
          </div>
          <div className="pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-gray-900">
                {w.week}
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-500">{w.title}</span>
            </div>
            <ul className="space-y-1">
              {w.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-gray-500"
                >
                  <span
                    className="mt-[5px] h-1 w-1 rounded-full flex-shrink-0"
                    style={{ background: accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function BeforeAfter({
  before,
  after,
}: {
  before: readonly string[];
  after: readonly string[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="rounded-xl border border-red-100 bg-red-50/40 p-4">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-red-400 mb-3">
          Before
        </p>
        <ul className="space-y-2">
          {before.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-gray-600"
            >
              <span className="text-red-300 flex-shrink-0 text-[10px] font-bold mt-0.5">
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-emerald-500 mb-3">
          After
        </p>
        <ul className="space-y-2">
          {after.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs text-gray-600"
            >
              <span className="text-emerald-400 flex-shrink-0 text-[10px] font-bold mt-0.5">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type TabId = "story" | "modules" | "delivery" | "results";
const TABS: { id: TabId; label: string }[] = [
  { id: "story", label: "The story" },
  { id: "modules", label: "What we built" },
  { id: "delivery", label: "Delivery" },
  { id: "results", label: "Results" },
];

function CaseCard({
  study,
  isOpen,
  onToggle,
  index,
}: {
  study: (typeof CASES)[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const theme = CASE_THEMES[study.id];
  const rm = useReducedMotion();
  const [tab, setTab] = useState<TabId>("story");
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onToggle();
    setTab("story");
    if (!isOpen)
      setTimeout(
        () =>
          ref.current?.scrollIntoView({
            behavior: rm ? "auto" : "smooth",
            block: "start",
          }),
        90,
      );
  };

  return (
    <motion.div
      id={study.id}
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rm ? 0 : 0.5, ease, delay: index * 0.07 }}
      className="scroll-mt-28 border overflow-hidden bg-white transition-colors duration-300"
      style={{ borderColor: isOpen ? theme.accentBorder : "rgba(5,5,5,0.12)" }}
    >
      <CaseEvidence />
      {/* Collapsed header */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`${study.id}-details`}
        className="case-study-toggle w-full text-left p-5 md:p-6"
      >
        <div className="flex items-start gap-4 md:gap-6">
          {/* Editorial number */}
          <div
            className="flex-shrink-0 select-none leading-none font-bold tracking-tighter hidden sm:block"
            style={{
              fontSize: "clamp(3rem,6vw,4.5rem)",
              color: isOpen ? theme.accent : "transparent",
              WebkitTextStroke: isOpen ? "0px" : `1.5px ${theme.accentBorder}`,
              transition: "color 0.3s ease, -webkit-text-stroke 0.3s ease",
              marginTop: "-4px",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {theme.number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span
                  className="inline-block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] px-2.5 py-1"
                  style={{
                    background: theme.accentLight,
                    color: theme.accentText,
                  }}
                >
                  {theme.label}
                </span>
                <p className="case-metadata mt-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.08em] text-[#666666]">
                  {study.client} · {study.scope}
                </p>
              </div>
              <div
                className={`h-7 w-7 flex-shrink-0 flex items-center justify-center border transition-all duration-300 ${isOpen ? "rotate-45" : ""}`}
                style={{
                  background: isOpen ? theme.accentLight : "transparent",
                  borderColor: isOpen ? theme.accentBorder : "rgba(5,5,5,0.12)",
                  color: isOpen ? theme.accent : "#666666",
                }}
                aria-hidden="true"
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <line
                    x1="6"
                    y1="1"
                    x2="6"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="1"
                    y1="6"
                    x2="11"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-base md:text-[1.1rem] font-medium text-gray-900 leading-snug max-w-2xl">
              {study.headline}
            </h3>
            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed max-w-xl">
              {study.subheadline}
            </p>
          </div>
        </div>
        {!isOpen && (
          <>
            <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-3">
              {study.outcomes.slice(0, 3).map((o) => (
                <p
                  key={o.claim}
                  className="border-t border-[#050505]/10 pt-3 text-[12px] font-light leading-[1.6] text-[#666666]"
                >
                  {o.claim}
                </p>
              ))}
            </div>
            <span className="mt-4 hidden md:flex items-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#666666]">
              Read full story →
            </span>
          </>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${study.id}-details`}
            key="exp"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <ExampleNavigation
              id={study.id}
              tabs={TABS}
              active={tab}
              onSelect={setTab}
            />
            {/* Demo band */}
            <div
              className="border-t border-black/[0.06]"
              style={{ background: theme.accentLight }}
            >
              <div className="case-demo-band px-1 sm:px-5 md:px-8 py-6">
                <p
                  className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] mb-4"
                  style={{ color: theme.accentText }}
                >
                  Interactive sample — {study.demoCaption}
                </p>
                <study.DemoComponent />
              </div>
            </div>

            {/* Tabs */}
            <div
              id={`${study.id}-reading`}
              className="scroll-mt-36 border-y border-black/[0.07]"
            >
              <div className="px-5 md:px-6 flex overflow-x-auto">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-pressed={tab === t.id}
                    className={`px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${tab === t.id ? "border-current" : "border-transparent text-gray-600 hover:text-gray-600"}`}
                    style={{ color: tab === t.id ? theme.accent : undefined }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab body */}
            <div className="px-5 md:px-6 py-6">
              <AnimatePresence mode="wait" initial={false}>
                {tab === "story" && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* Key insight callout */}
                    <div
                      className="mb-6 border-l-2 pl-4 py-1 flex items-start gap-3"
                      style={{
                        borderColor: theme.accentBorder,
                        background: theme.accentLight,
                      }}
                    >
                      <div
                        className="h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: theme.accent }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M6 1v5.5M6 9v.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <p
                          className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] mb-1"
                          style={{ color: theme.accentText }}
                        >
                          Key insight
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: theme.accentText }}
                        >
                          {study.insight}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-5">
                        <div>
                          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-gray-600 mb-2">
                            {study.why.title}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {study.why.body}
                          </p>
                        </div>
                        <div>
                          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-gray-600 mb-2">
                            {study.how.title}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {study.how.body}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-gray-600 mb-2">
                          Before & after
                        </p>
                        <BeforeAfter
                          before={study.before}
                          after={study.after}
                        />
                        <div className="mt-4">
                          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-gray-600 mb-2">
                            Stack
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {study.stack.map((s) => (
                              <span
                                key={s}
                                className="border border-[#050505]/12 px-2.5 py-1 text-xs text-[#666666] font-[family-name:var(--font-mono)]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {tab === "modules" && (
                  <motion.div
                    key="mod"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-xs text-gray-500 mb-4 max-w-xl leading-relaxed">
                      Each module below shows the specific operational problem
                      it solved, what was designed and built, and the measurable
                      change it made.
                    </p>
                    <div className="space-y-2">
                      {study.modules.map((m) => (
                        <ModuleRow key={m.name} mod={m} accent={theme.accent} />
                      ))}
                    </div>
                  </motion.div>
                )}
                {tab === "delivery" && (
                  <motion.div
                    key="del"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-xs text-gray-500 mb-5 max-w-xl leading-relaxed">
                      Every project begins with operational discovery — mapping
                      how the business actually works before designing anything.
                      We never write code in week one.
                    </p>
                    <CaseTimeline
                      weeks={study.timeline}
                      accent={theme.accent}
                    />
                  </motion.div>
                )}
                {tab === "results" && (
                  <motion.div
                    key="res"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p className="text-xs text-gray-500 mb-4 max-w-xl leading-relaxed">
                      Outcomes are stated with the mechanism that produced them.
                      We don&apos;t publish numbers we can&apos;t explain.
                    </p>
                    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                      {study.outcomes.map((o, i) => (
                        <div
                          key={o.claim}
                          className="border-t border-[#050505]/10 pt-5"
                        >
                          <span
                            className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em]"
                            style={{ color: theme.accent }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="mt-3 text-base font-light leading-snug tracking-tight text-[#050505]">
                            {o.claim}
                          </p>
                          <p className="mt-2.5 text-[13px] font-light leading-[1.7] text-[#666666]">
                            {o.why}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      className="mt-6 border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      style={{
                        borderColor: theme.accentBorder,
                        background: theme.accentLight,
                      }}
                    >
                      <div>
                        <p className="text-xs text-gray-600">
                          Delivered in{" "}
                          <span className="font-semibold text-gray-900">
                            {study.duration}
                          </span>{" "}
                          from signed scope to live system.
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Full source code ownership. NDA signed before
                          discovery begins.
                        </p>
                      </div>
                      <Link
                        href={contactHref(
                          "custom-software-development",
                          study.id,
                        )}
                        className="flex-shrink-0 inline-flex items-center justify-center rounded-xl text-white text-sm font-medium px-4 py-2.5 hover:opacity-90 transition"
                        style={{ background: theme.accent }}
                      >
                        Build something like this →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CASE STUDIES SECTION
// ═══════════════════════════════════════════════════════════════
function CaseStudiesSection() {
  const [openId, setOpenId] = useState<CaseId | null>(null);
  return (
    <section
      id="case-studies"
      className={cx(
        SECTION_SCROLL_MT,
        "px-6 sm:px-10 lg:px-16 py-24 md:py-32 border-t border-[#050505]/10",
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#666666] mb-2">
            Operational systems — workflow examples
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#050505] max-w-2xl leading-snug">
            Three businesses. Three complex operational problems. Here&apos;s
            exactly how we thought through each one.
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xl leading-relaxed">
            Each case below includes an interactive system demo, the full story
            behind our decisions, the delivery timeline, and the outcomes — with
            the reasoning behind each result.
          </p>
        </div>
        <div className="space-y-4">
          {CASES.map((study, i) => (
            <CaseCard
              key={study.id}
              study={study}
              index={i}
              isOpen={openId === study.id}
              onToggle={() =>
                setOpenId((prev) => (prev === study.id ? null : study.id))
              }
            />
          ))}
        </div>

        {/* How we think */}
        <div className="mt-6 rounded-3xl bg-black text-white p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-white/65 mb-3">
              How we approach every project
            </p>
            <p className="text-lg md:text-xl font-medium text-white max-w-2xl leading-snug">
              We help growing businesses replace disconnected spreadsheets,
              manual reporting, and fragmented workflows with software designed
              around how their operations actually run.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {CASES.map((c) => {
                const t = CASE_THEMES[c.id];
                return (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <span
                      className="inline-block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] px-2 py-0.5 mb-3"
                      style={{ background: `${t.accent}22`, color: t.accent }}
                    >
                      {t.label.split("·")[0].trim()}
                    </span>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {c.insight}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-white/50 max-w-md leading-relaxed">
                If your business has an operational problem that spreadsheets
                and generic tools haven&apos;t solved, it probably has a
                software answer. Let&apos;s find out what it is.
              </p>
              <Link
                href={contactHref("custom-software-development")}
                className="flex-shrink-0 inline-flex items-center justify-center rounded-xl bg-white text-black text-sm font-medium px-5 py-2.5 hover:opacity-90 transition"
              >
                Book a discovery call →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Not sure if your problem needs custom software?
            </p>
            <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
              Book a free 30-minute operational review. We&apos;ll map your
              current process and tell you honestly whether a custom system
              makes sense — or whether an existing tool would serve you better.
            </p>
          </div>
          <Link
            href={contactHref("custom-software-development")}
            className="flex-shrink-0 inline-flex items-center justify-center rounded-xl border border-black/15 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition whitespace-nowrap"
          >
            Book a free review
          </Link>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════
const FAQS = [
  {
    q: "How long does it take to build a custom operational system?",
    a: "Most projects take between 4 and 8 weeks depending on scope. A focused system for one or two operational flows ships in 4 weeks. A platform covering multiple roles, locations, and workflows typically takes 6–8 weeks. We give you a precise timeline after Discovery — before you commit to anything.",
  },
  {
    q: "How much does it cost?",
    a: "Projects typically start from $8,000–$15,000 for a focused operational system and scale based on complexity. We don't provide a quote until we fully understand your scope — that's what the Discovery phase is for. In most cases, the cost is recovered within the first year through reduced manual overhead and improved operational visibility.",
  },
  {
    q: "Will I own the code after the project?",
    a: "Yes — 100%, unconditionally. You receive the full source code, database schema, deployment configuration, and documentation. No licensing fees, no lock-in. You can take the system to any developer in the future. Most clients stay with us because of the working relationship, not because they have to.",
  },
  {
    q: "What do you need from me to start?",
    a: "Not a technical specification. A clear description of how your business currently operates, where the manual work is happening, and what visibility you're missing. We run a structured Discovery session and produce the technical specification ourselves. You focus on the business problem; we translate it into a system.",
  },
  {
    q: "Do you work with clients outside Nigeria?",
    a: "Yes — the majority of our active clients are outside Nigeria. We work with businesses in the UK, US, Canada, Germany, and across West Africa. We operate fully remotely with structured asynchronous communication and weekly video check-ins.",
  },
  {
    q: "What if our processes change after the system is built?",
    a: "We build for change. Every system we deliver is documented, built on standard open-source technologies, and structured to be extended. Most clients stay on a post-launch support and iteration retainer — we become a long-term operational partner, not just a build contractor.",
  },
] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-6"
        aria-expanded={open}
      >
        <span className="text-sm text-gray-900">{q}</span>
        <span
          className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE EXPORT
// ═══════════════════════════════════════════════════════════════
const SECTIONS: NavSection[] = [
  { id: "what-we-build", label: "What we build" },
  { id: "case-studies", label: "Live demos" },
  { id: "faq", label: "FAQ" },
];

export default function CustomSoftwareDevelopmentPage() {
  return (
    <main
      className={cx(
        editorialRoot,
        "service-page min-h-screen bg-white text-[#050505]",
      )}
    >
      <SectionNav sections={SECTIONS} />
      <Hero />
      {/* Photograph sits between the hero and the dense content below, so the
            page opens with something other than a wall of type. */}
      <WhatWeBuildCarousel />
      <CaseStudiesSection />
      <section
        id="faq"
        className={cx(SECTION_SCROLL_MT, "px-6 sm:px-10 lg:px-16 pb-28 pt-4")}
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#666666] mb-2">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#050505] mb-2">
            Questions we hear before every project starts.
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">
            Answered here so your first conversation with us can focus on your
            specific situation.
          </p>
          <div className="grid gap-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
