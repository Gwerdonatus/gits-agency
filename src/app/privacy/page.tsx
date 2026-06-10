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
  { id: "who-we-are",   number: "01", title: "Who We Are"                 },
  { id: "data-collect", number: "02", title: "Data We Collect"            },
  { id: "why-collect",  number: "03", title: "Why We Collect It"          },
  { id: "legal-basis",  number: "04", title: "Legal Basis for Processing" },
  { id: "retention",    number: "05", title: "How Long We Keep Your Data" },
  { id: "sharing",      number: "06", title: "Who We Share Data With"     },
  { id: "your-rights",  number: "07", title: "Your Rights Under GDPR"     },
  { id: "security",     number: "08", title: "Security"                   },
  { id: "children",     number: "09", title: "Children's Privacy"         },
  { id: "changes",      number: "10", title: "Changes to This Policy"     },
  { id: "contact-dpo",  number: "11", title: "Contact & Data Requests"    },
];

/* ─── Active section tracker via IntersectionObserver ─── */
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
          // pick the first visible one in document order
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
      /* scroll-mt = nav height (72px) + a little breathing room */
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

/* ─── Mobile: sticky horizontal pill strip ─── */
function MobileTOC({ active }: { active: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.querySelector(`[data-id="${active}"]`) as HTMLElement | null;
    if (!el || !ref.current) return;
    const left = el.offsetLeft - ref.current.clientWidth / 2 + el.clientWidth / 2;
    ref.current.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    /* sits directly below the 64px mobile nav */
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

/* ─── Desktop: sticky sidebar TOC ─── */
function DesktopTOC({ active }: { active: string }) {
  return (
    /*
      KEY FIX: do NOT put the sticky div inside a grid column that has
      align-items: stretch cutting its height. Instead we use a plain
      <aside> with position:sticky directly on it — no wrapper div needed.
      top = desktop nav height (72px) + 32px breathing room = 104px
    */
    <aside
      className="hidden lg:block"
      style={{
        position: "sticky",
        top: 104,          /* 72px nav + 32px gap */
        alignSelf: "start",/* CRITICAL — prevents the column from stretching and breaking sticky */
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

      <Link href="/terms"
        className="text-[11px] font-light transition-colors duration-150"
        style={{ fontFamily: "DM Sans, sans-serif", color: "#ccc", textDecoration: "none" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#6366f1")}
        onMouseLeave={e => (e.currentTarget.style.color = "#ccc")}>
        Terms of Service →
      </Link>
    </aside>
  );
}

/* ─── Page ─── */
export default function PrivacyPage() {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  return (
    <main className="bg-white min-h-screen">
      <MobileTOC active={active} />

      {/*
        Outer container padding-top:
          Desktop → 72px nav + 48px breathing = 120px
          Mobile  → 64px nav + 48px pill bar + 48px breathing ≈ 160px
      */}
      <div className="mx-auto max-w-[960px] px-6 sm:px-10 pb-[120px]"
        style={{ paddingTop: "120px" }}>

        {/* extra space on mobile for the pill strip */}
        <div className="lg:hidden" style={{ height: 56 }} />

        {/*
          FLEX row instead of grid — this is the sticky fix.
          Grid columns stretch to fill row height by default,
          which breaks position:sticky on the sidebar.
          Flex with align-items:flex-start lets sticky work naturally.
        */}
        <div className="flex items-start gap-14">

          <DesktopTOC active={active} />

          {/* Main content — takes remaining width */}
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
                Privacy Policy
              </h1>
              <p className="text-[14px] font-light leading-[1.8] max-w-[520px]"
                style={{ fontFamily: "DM Sans, sans-serif", color: "#888" }}>
                How {COMPANY} collects, uses, and protects your personal data —
                written in plain English, compliant with GDPR and NDPR.
              </p>
              <div className="mt-7 h-px" style={{ background: "rgba(0,0,0,0.07)" }} />
            </motion.div>

            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: spring, delay: 0.1 }} className="mb-[44px]">
              <P>
                This Privacy Policy explains how {COMPANY} (&quot;GITS,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                collects, uses, stores, and protects personal data when you visit{" "}
                <a href={WEBSITE} style={{ color: "#6366f1", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  {WEBSITE}
                </a>{" "}
                or interact with our services.
              </P>
              <P>
                This policy complies with the EU General Data Protection Regulation{" "}
                <Tag>GDPR</Tag>, the Nigeria Data Protection Regulation{" "}
                <Tag>NDPR</Tag>, and applicable international data protection law.
              </P>
            </motion.div>

            <Section id="who-we-are" number="01" title="Who We Are" delay={0.12}>
              <P>
                {COMPANY} is a digital software studio providing custom software, web experiences,
                AI automation, internal tools, and API integrations. We are a remote-first agency
                based in Abuja, Nigeria, serving clients worldwide.
              </P>
              <P>
                For data protection purposes, GITS is the{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>data controller</strong>{" "}
                responsible for your personal data collected through this website.
              </P>
              <Highlight>Data controller contact: {EMAIL}</Highlight>
            </Section>

            <Section id="data-collect" number="02" title="Data We Collect" delay={0.14}>
              <P>
                We only collect data you provide directly through our{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>contact form</strong>:
              </P>
              <UL items={[
                "Full name",
                "Email address",
                "Company or organisation name (optional)",
                "Your message or enquiry content",
                "Any attachments or additional details you choose to include",
              ]} />
              <P>
                We do <strong className="font-semibold" style={{ color: "#222" }}>not</strong> use
                analytics, advertising trackers, or cookies of any kind. We do not collect IP
                addresses, device fingerprints, or behavioural data.
              </P>
            </Section>

            <Section id="why-collect" number="03" title="Why We Collect It" delay={0.16}>
              <P>Contact form submissions are used solely to:</P>
              <UL items={[
                "Respond to your enquiry, quote request, or project brief",
                "Follow up on discussions about working together",
                "Maintain a record of our pre-contractual communications",
              ]} />
              <P>
                We do not use your data for marketing without explicit consent, and we{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>never</strong> sell,
                rent, or trade your personal data to any third party.
              </P>
            </Section>

            <Section id="legal-basis" number="04" title="Legal Basis for Processing" delay={0.18}>
              <P>Under GDPR Article 6, we process your data on the following grounds:</P>
              <UL items={[
                "Legitimate interests (Art. 6(1)(f)) — responding to a contact request you initiated",
                "Pre-contractual necessity (Art. 6(1)(b)) — where your enquiry relates to a service agreement",
                "Consent (Art. 6(1)(a)) — where you have explicitly opted in to further communication",
              ]} />
            </Section>

            <Section id="retention" number="05" title="How Long We Keep Your Data" delay={0.2}>
              <P>
                We retain contact form submissions for a maximum of{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>24 months</strong> from
                receipt, or for the duration of any business relationship — whichever is longer.
              </P>
              <Highlight>
                If a project engagement begins, relevant communications may be retained for up to
                7 years for contractual and legal record-keeping, in line with standard business practice.
              </Highlight>
            </Section>

            <Section id="sharing" number="06" title="Who We Share Data With" delay={0.22}>
              <P>We do not sell your data. Your information may only be accessed by:</P>
              <UL items={[
                "GITS team members directly involved in responding to your enquiry",
                "Email service providers (e.g. Google Workspace) bound by data processing agreements",
                "Regulatory or law enforcement bodies if required by applicable law",
              ]} />
            </Section>

            <Section id="your-rights" number="07" title="Your Rights Under GDPR" delay={0.24}>
              <P>As a data subject, you have the following rights:</P>
              <UL items={[
                "Access — request a copy of the data we hold about you",
                "Rectification — request correction of inaccurate or incomplete data",
                "Erasure — request deletion of your data ('right to be forgotten')",
                "Restriction — ask us to limit how we use your data",
                "Portability — receive your data in a structured, machine-readable format",
                "Object — object to processing based on legitimate interests",
                "Withdraw consent — where processing is consent-based, withdraw at any time",
              ]} />
              <P>
                To exercise any right, contact{" "}
                <a href={`mailto:${EMAIL}`}
                  style={{ color: "#6366f1", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  {EMAIL}
                </a>. We respond within{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>30 days</strong> per GDPR Article 12.
              </P>
            </Section>

            <Section id="security" number="08" title="Security" delay={0.26}>
              <P>
                We take reasonable technical and organisational measures to protect your data —
                including encrypted communications, access controls, and regular review of our practices.
              </P>
              <P>
                In the event of a breach likely to affect your rights, we will notify affected individuals
                within{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>72 hours</strong> as
                required by GDPR Article 33.
              </P>
            </Section>

            <Section id="children" number="09" title="Children's Privacy" delay={0.28}>
              <P>
                Our services are not directed at individuals under 16. We do not knowingly collect
                data from minors. If you believe we hold data from a child, contact{" "}
                <a href={`mailto:${EMAIL}`}
                  style={{ color: "#6366f1", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  {EMAIL}
                </a>{" "}and we will delete it promptly.
              </P>
            </Section>

            <Section id="changes" number="10" title="Changes to This Policy" delay={0.3}>
              <P>
                We may update this policy from time to time. The &quot;Last updated&quot; date always reflects
                the most recent revision. Continued use of our website after changes constitutes acceptance.
              </P>
            </Section>

            <Section id="contact-dpo" number="11" title="Contact & Data Requests" delay={0.32}>
              <P>For all privacy enquiries, data subject requests, or concerns:</P>
              <Highlight>
                {COMPANY}<br />
                Email: {EMAIL}<br />
                Website: {WEBSITE}<br />
                Abuja, Nigeria · Remote-first · Available worldwide
              </Highlight>
              <P>
                We acknowledge all requests within{" "}
                <strong className="font-semibold" style={{ color: "#222" }}>5 business days</strong>{" "}
                and resolve them within 30 days.
              </P>
            </Section>

            {/* Bottom bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: spring, delay: 0.5 }}
              className="mt-[64px] pt-[28px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="text-[11px] font-light" style={{ fontFamily: "DM Sans, sans-serif", color: "#ccc" }}>
                © {new Date().getFullYear()} {COMPANY}
              </p>
              <Link href="/terms" style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#aaa",
                fontWeight: 300, textDecoration: "underline", textUnderlineOffset: 3 }}>
                Terms of Service
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}