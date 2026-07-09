"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const spring = [0.22, 0.61, 0.36, 1] as const;

const LAST_UPDATED = "4 June 2025";
const COMPANY = "Gwer Intelligent Tech Solutions (GITS)";
const EMAIL = "hello@gits.technology";
const WEBSITE = "https://gits.technology";

const sections = [
  { id: "acceptance",      number: "01", title: "Acceptance of Terms"             },
  { id: "services",        number: "02", title: "Services We Provide"             },
  { id: "engagement",      number: "03", title: "Project Engagement & Agreements" },
  { id: "payment",         number: "04", title: "Payment Terms"                   },
  { id: "ip",              number: "05", title: "Intellectual Property"           },
  { id: "confidentiality", number: "06", title: "Confidentiality"                 },
  { id: "client-duties",   number: "07", title: "Client Responsibilities"         },
  { id: "warranties",      number: "08", title: "Warranties & Disclaimers"        },
  { id: "liability",       number: "09", title: "Limitation of Liability"         },
  { id: "termination",     number: "10", title: "Termination"                     },
  { id: "governing-law",   number: "11", title: "Governing Law & Disputes"        },
  { id: "changes",         number: "12", title: "Changes to These Terms"          },
  { id: "contact",         number: "13", title: "Contact"                         },
];

/* ─── Active section tracker ─── */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const map = new Map<string, boolean>();
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          map.set(id, entry.isIntersecting);
          const first = ids.find((i) => map.get(i));
          if (first) setActive(first);
        },
        { rootMargin: "-72px 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

/* ─── Shared content atoms ─── */
function Section({ id, number, title, children, delay = 0 }: {
  id: string; number: string; title: string;
  children: React.ReactNode; delay?: number;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: spring, delay }}
      className="scroll-mt-[100px] pt-[44px] border-t border-black/[0.06] first:border-none first:pt-0"
    >
      <div className="flex items-start gap-4 mb-5">
        <span className="text-[10.5px] font-medium tracking-[0.1em] mt-[6px] min-w-[24px]"
          style={{ fontFamily: "DM Sans, sans-serif", color: "#6366f1" }}>
          {number}
        </span>
        <h2 className="text-[18px] font-semibold text-black/80 tracking-[-0.01em]"
          style={{ fontFamily: "Playfair Display, serif" }}>
          {title}
        </h2>
      </div>
      <div className="pl-[40px]">{children}</div>
    </motion.section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13.5px] font-light leading-[1.9] mb-4 last:mb-0"
      style={{ fontFamily: "DM Sans, sans-serif", color: "#3a3a3a" }}>
      {children}
    </p>
  );
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 flex flex-col gap-[8px]">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[9px] w-[5px] h-[5px] rounded-full flex-shrink-0"
            style={{ background: "#6366f1", opacity: 0.5 }} />
          <span className="text-[13.5px] font-light leading-[1.85]"
            style={{ fontFamily: "DM Sans, sans-serif", color: "#3a3a3a" }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 px-5 py-4 rounded-lg"
      style={{ background: "rgba(99,102,241,0.05)", borderLeft: "2.5px solid rgba(99,102,241,0.35)" }}>
      <p className="text-[13px] font-light leading-[1.85]"
        style={{ fontFamily: "DM Sans, sans-serif", color: "#444" }}>
        {children}
      </p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[10.5px] font-medium tracking-[0.08em] px-2 py-[3px] rounded-md mr-1"
      style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1", fontFamily: "DM Sans, sans-serif" }}>
      {children}
    </span>
  );
}

/* ─── Mobile horizontal pill TOC ─── */
function MobileTOC({ active }: { active: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.querySelector(`[data-id="${active}"]`) as HTMLElement | null;
    if (!el || !ref.current) return;
    const left = el.offsetLeft - ref.current.clientWidth / 2 + el.clientWidth / 2;
    ref.current.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <div className="lg:hidden fixed inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/[0.06]"
      style={{ top: 64 }}>
      <div ref={ref} className="flex items-center gap-2 px-4 py-[10px] overflow-x-auto"
        style={{ scrollbarWidth: "none" }}>
        {sections.map(({ id, number, title }) => {
          const on = active === id;
          return (
            <a key={id} href={`#${id}`} data-id={id}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-[6px] rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-200"
              style={{
                fontFamily: "DM Sans, sans-serif",
                color: on ? "#6366f1" : "#999",
                background: on ? "rgba(99,102,241,0.09)" : "transparent",
                border: on ? "1px solid rgba(99,102,241,0.22)" : "1px solid transparent",
              }}>
              <span style={{ fontSize: "9px", color: on ? "#6366f1" : "#ccc" }}>{number}</span>
              {title}
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Desktop sticky sidebar ─── */
function DesktopTOC({ active }: { active: string }) {
  return (
    <aside
      className="hidden lg:block"
      style={{
        position: "sticky",
        top: 104,           /* 72px nav + 32px gap */
        alignSelf: "start", /* CRITICAL — prevents grid/flex stretch from breaking sticky */
        height: "fit-content",
        width: 188,
        flexShrink: 0,
      }}
    >
      <p className="text-[9.5px] uppercase tracking-[0.18em] mb-4"
        style={{ fontFamily: "DM Sans, sans-serif", color: "#bbb" }}>
        On this page
      </p>

      <nav className="flex flex-col gap-[6px]">
        {sections.map(({ id, number, title }) => {
          const on = active === id;
          return (
            <a key={id} href={`#${id}`}
              className="flex items-center gap-2 rounded-md px-2 py-[6px] -mx-2 transition-all duration-200"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11.5px",
                fontWeight: on ? 500 : 300,
                color: on ? "#6366f1" : "#aaa",
                background: on ? "rgba(99,102,241,0.07)" : "transparent",
                textDecoration: "none",
              }}>
              <span style={{ fontSize: "9px", minWidth: 18, color: on ? "#6366f1" : "rgba(99,102,241,0.3)" }}>
                {number}
              </span>
              {title}
            </a>
          );
        })}
      </nav>

      <div className="mt-7 mb-5 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />

      <Link href="/privacy"
        className="text-[11px] font-light"
        style={{ fontFamily: "DM Sans, sans-serif", color: "#ccc", textDecoration: "none" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#6366f1")}
        onMouseLeave={e => (e.currentTarget.style.color = "#ccc")}>
        Privacy Policy →
      </Link>
    </aside>
  );
}

/* ─── Page ─── */
export default function TermsPage() {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  return (
    <main className="bg-white min-h-screen">
      <MobileTOC active={active} />

      <div className="mx-auto max-w-[960px] px-6 sm:px-10 pb-[120px]"
        style={{ paddingTop: "120px" }}>

        {/* extra space on mobile for pill strip (~48px strip + 8px gap) */}
        <div className="lg:hidden" style={{ height: 56 }} />

        {/*
          FLEX not GRID — critical for sticky sidebar.
          align-items: flex-start lets the sidebar stay at its natural height
          so position:sticky can do its job.
        */}
        <div className="flex items-start gap-14">

          <DesktopTOC active={active} />

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Page header */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: spring }} className="mb-[52px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] uppercase tracking-[0.18em] font-medium"
                  style={{ fontFamily: "DM Sans, sans-serif", color: "#6366f1" }}>Legal</span>
                <span style={{ color: "rgba(0,0,0,0.1)" }}>·</span>
                <span className="text-[10px] font-light"
                  style={{ fontFamily: "DM Sans, sans-serif", color: "#bbb" }}>
                  Updated {LAST_UPDATED}
                </span>
              </div>
              <h1 className="text-[38px] sm:text-[46px] font-semibold tracking-[-0.025em] leading-[1.08] mb-6"
                style={{ fontFamily: "Playfair Display, serif", color: "#111" }}>
                Terms of Service
              </h1>
              <p className="text-[14px] font-light leading-[1.8] max-w-[520px]"
                style={{ fontFamily: "DM Sans, sans-serif", color: "#888" }}>
                The agreement between you and {COMPANY} — covering project
                engagements, payments, intellectual property, and your rights as a client.
              </p>
              <div className="mt-7 h-px" style={{ background: "rgba(0,0,0,0.07)" }} />
            </motion.div>

            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: spring, delay: 0.1 }} className="mb-[44px]">
              <P>
                These Terms of Service (&quot;Terms&quot;) govern your use of{" "}
                <a href={WEBSITE} style={{ color: "#6366f1", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  {WEBSITE}
                </a>{" "}
                and any services provided by {COMPANY} (&quot;GITS,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              </P>
              <P>
                By accessing our website or engaging our services, you agree to these Terms.
                Each project engagement is also subject to a project-specific{" "}
                <Tag>SOW</Tag> or proposal that supplements these Terms.
              </P>
            </motion.div>

            <Section id="acceptance" number="01" title="Acceptance of Terms" delay={0.12}>
              <P>
                These Terms constitute a legally binding agreement between you (&quot;Client&quot;) and GITS.
                Continued use of our website or engagement of our services signifies full acceptance.
              </P>
            </Section>

            <Section id="services" number="02" title="Services We Provide" delay={0.14}>
              <P>GITS offers the following digital services:</P>
              <UL items={[
                "Custom Software Development — bespoke applications tailored to your workflows",
                "Websites & Digital Experiences — modern, high-performance websites and web apps",
                "AI & Business Automation — intelligent tools that improve operational efficiency",
                "Internal Tools & CRM Systems — platforms that help teams work smarter",
                "Integrations & APIs — connecting systems and building scalable API architectures",
              ]} />
              <P>
                Specific scope, deliverables, timeline, and pricing are defined in a separate written
                proposal or Statement of Work agreed before work commences.
              </P>
            </Section>

            <Section id="engagement" number="03" title="Project Engagement & Agreements" delay={0.16}>
              <P>
                All projects begin with a discovery call or scoping session, followed by a written
                proposal. Work only commences upon written acceptance and receipt of any required deposit.
              </P>
              <P>
                Changes to scope after sign-off are treated as change requests — they may affect
                timelines and pricing, and require written approval before implementation.
              </P>
              <Highlight>
                GITS is remote-first and serves clients worldwide. All agreements are conducted
                digitally and are fully legally valid.
              </Highlight>
            </Section>

            <Section id="payment" number="04" title="Payment Terms" delay={0.18}>
              <P>Standard payment terms unless otherwise agreed in writing:</P>
              <UL items={[
                "40–50% deposit required before work begins — non-refundable",
                "Milestone payments invoiced at agreed project stages",
                "Final payment due before delivery or production deployment",
                "Invoices payable within 14 days of issue",
                "Late payments may incur a 2% monthly fee on the outstanding balance",
              ]} />
              <P>
                GITS reserves the right to pause or withhold delivery until outstanding invoices
                are settled.
              </P>
            </Section>

            <Section id="ip" number="05" title="Intellectual Property" delay={0.2}>
              <P>
                Upon receipt of{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>full payment</strong>,
                GITS assigns to the Client full ownership of all custom deliverables — including
                source code, design files, and documentation.
              </P>
              <P>Excluded from this transfer:</P>
              <UL items={[
                "Internal frameworks and boilerplates developed by GITS independently",
                "Open-source components (subject to their respective licences)",
                "GITS branding, methodologies, and proprietary processes",
              ]} />
              <P>
                GITS reserves the right to display completed work in our portfolio unless the Client
                explicitly requests otherwise in writing before project start.
              </P>
            </Section>

            <Section id="confidentiality" number="06" title="Confidentiality" delay={0.22}>
              <P>
                Both parties agree to treat as confidential any non-public information shared during
                an engagement — including business strategy, technical architecture, financials, and
                customer data.
              </P>
              <P>
                This obligation survives termination for a period of{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>3 years</strong>.
                GITS is happy to execute a formal NDA before any discovery conversations.
              </P>
            </Section>

            <Section id="client-duties" number="07" title="Client Responsibilities" delay={0.24}>
              <P>To ensure project success, the Client agrees to:</P>
              <UL items={[
                "Provide timely feedback and approvals within agreed review windows",
                "Supply required assets, content, credentials, and access promptly",
                "Designate a primary point of contact authorised to make decisions",
                "Notify GITS promptly of any changes to requirements or constraints",
                "Ensure provided content does not infringe third-party rights",
              ]} />
              <P>
                Delays caused by the Client — late feedback, missing assets, scope changes — may
                result in timeline adjustments and are not the responsibility of GITS.
              </P>
            </Section>

            <Section id="warranties" number="08" title="Warranties & Disclaimers" delay={0.26}>
              <P>
                GITS warrants that all work will be delivered with reasonable skill and professionalism
                in accordance with the agreed specification.
              </P>
              <P>
                This website is provided &quot;as is.&quot; GITS does not warrant uninterrupted availability or
                that software will be entirely free of bugs — but we commit to addressing defects
                within scope during any warranty period stated in the project agreement.
              </P>
            </Section>

            <Section id="liability" number="09" title="Limitation of Liability" delay={0.28}>
              <P>
                To the maximum extent permitted by law, GITS shall not be liable for indirect,
                incidental, or consequential damages — including loss of revenue, data loss, or
                business interruption.
              </P>
              <P>
                GITS&apos;s total aggregate liability shall not exceed the{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>total fees paid</strong>{" "}
                by the Client in the three months preceding the claim.
              </P>
              <Highlight>
                Nothing in these Terms excludes liability for death, personal injury, fraud, or any
                other liability that cannot be excluded by law.
              </Highlight>
            </Section>

            <Section id="termination" number="10" title="Termination" delay={0.3}>
              <P>
                Either party may terminate with{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>14 days written notice</strong>.
                Upon termination:
              </P>
              <UL items={[
                "Client is liable for payment of all work completed to the termination date",
                "GITS delivers completed work upon receipt of outstanding payment",
                "Deposits are non-refundable unless GITS is in material breach",
                "Prepaid work not yet started will be refunded",
              ]} />
              <P>
                GITS may terminate immediately in cases of non-payment, abusive conduct, or requests
                to produce illegal or unethical materials.
              </P>
            </Section>

            <Section id="governing-law" number="11" title="Governing Law & Disputes" delay={0.32}>
              <P>
                These Terms are governed by the laws of the{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>Federal Republic of Nigeria</strong>.
                Disputes shall first be subject to good-faith negotiation. If unresolved within 30 days,
                both parties agree to binding arbitration before pursuing formal legal proceedings.
              </P>
              <P>
                International clients may agree in writing to an alternative governing jurisdiction
                prior to signing a project agreement.
              </P>
            </Section>

            <Section id="changes" number="12" title="Changes to These Terms" delay={0.34}>
              <P>
                We may update these Terms at any time. The current version is always at{" "}
                <a href={`${WEBSITE}/terms`}
                  style={{ color: "#6366f1", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  {WEBSITE}/terms
                </a>. Changes do not affect existing signed agreements unless both parties consent
                in writing.
              </P>
            </Section>

            <Section id="contact" number="13" title="Contact" delay={0.36}>
              <P>For questions about these Terms or to discuss an engagement:</P>
              <Highlight>
                {COMPANY}<br />
                Email: {EMAIL}<br />
                Website: {WEBSITE}<br />
                Abuja, Nigeria · Remote-first · Available worldwide
              </Highlight>
            </Section>

            {/* Bottom bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: spring, delay: 0.55 }}
              className="mt-[64px] pt-[28px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="text-[11px] font-light" style={{ fontFamily: "DM Sans, sans-serif", color: "#ccc" }}>
                © {new Date().getFullYear()} {COMPANY}
              </p>
              <Link href="/privacy"
                style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#aaa",
                  fontWeight: 300, textDecoration: "underline", textUnderlineOffset: 3 }}>
                Privacy Policy
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}