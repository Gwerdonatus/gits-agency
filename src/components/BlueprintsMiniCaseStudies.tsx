"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Blueprint = {
  key: string;
  label: string;
  headline: string;
  sub: string;
  problem: string[];
  approach: string[];
  outcomes: string[];
  proof: { k: string; v: string; note?: string }[];
};

const ease = [0.22, 0.61, 0.36, 1] as const;

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs text-gray-800 backdrop-blur">
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-black/70" />
      {children}
    </span>
  );
}

function MetricPill({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <div
      className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur"
      style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.03)" }}
    >
      <div className="text-[11px] uppercase tracking-widest text-gray-500">{k}</div>
      <div className="mt-1 text-lg sm:text-xl font-medium tracking-tight text-gray-900">{v}</div>
      {note ? <div className="mt-1 text-xs text-gray-500 leading-relaxed">{note}</div> : null}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <div className="grid gap-2">
      {items.map((t) => (
        <div key={t} className="flex items-start gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/80" />
          <p className="text-sm text-gray-700 leading-relaxed">{t}</p>
        </div>
      ))}
    </div>
  );
}

function BlueprintTab({
  active,
  title,
  subtitle,
  onClick,
  idx,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
  idx: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "w-full text-left rounded-2xl border px-4 py-4 transition",
        active ? "border-black/25 bg-black/[0.035]" : "border-black/10 bg-white hover:bg-black/[0.02]"
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="flex items-start gap-3">
        <div
          className={cx(
            "h-9 w-9 rounded-xl border grid place-items-center text-xs font-medium transition",
            active ? "border-black/25 bg-white" : "border-black/10 bg-white"
          )}
        >
          {String(idx + 1).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </button>
  );
}

/**
 * Mini Case Studies / Blueprints
 * Drop into any page. Example:
 * <BlueprintsMiniCaseStudies />
 */
export default function BlueprintsMiniCaseStudies() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.2"],
  });

  // Subtle “flow” movement for the background (scroll-linked)
  const bgY = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const glowA = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const glowB = useTransform(scrollYProgress, [0, 1], [0.35, 0.7]);

  const BLUEPRINTS: Blueprint[] = useMemo(
    () => [
      {
        key: "saas",
        label: "SaaS",
        headline: "If you’re a SaaS team losing trials or users after signup…",
        sub: "Fix activation + clarity so people reach value faster (and stick).",
        problem: [
          "Users don’t hit the “aha moment” quickly, so trials end with no adoption.",
          "Onboarding feels like steps—not progress—so activation drops.",
          "Core value is buried behind jargon or too many options.",
        ],
        approach: [
          "Define “time-to-first-value” and design one clean path to it.",
          "Reduce decisions during onboarding (defaults + guided setup).",
          "Instrument the funnel (activation events + drop-off points) and iterate.",
        ],
        outcomes: [
          "Clear activation path (less confusion, more completed setup).",
          "Reduced steps to first outcome (users feel progress sooner).",
          "Higher trust signals inside the product (less churn pressure).",
        ],
        proof: [
          { k: "Primary KPI", v: "Activation rate ↑", note: "More users reach the first meaningful action." },
          { k: "Friction", v: "Steps ↓", note: "Shorter path from signup → value." },
          { k: "Quality", v: "Support load ↓", note: "Fewer “how do I…” tickets after launch." },
        ],
      },
      {
        key: "service",
        label: "Service Business",
        headline: "If you’re a service business with traffic but weak leads…",
        sub: "Fix messaging + trust + conversion flow so visits turn into calls.",
        problem: [
          "Visitors can’t tell what you do in 5 seconds (message is unclear).",
          "The page lacks proof (no trust signals, weak positioning).",
          "Calls-to-action are scattered or too generic, so intent drops.",
        ],
        approach: [
          "Rebuild the page hierarchy: who it’s for → the outcome → why you’re credible.",
          "Design one strong CTA path (primary action + supportive proof blocks).",
          "Improve speed + mobile UX (fast load and calm layout = more trust).",
        ],
        outcomes: [
          "Clear CTA path (less scrolling before action).",
          "Better trust signals (credible, premium feel).",
          "More qualified inquiries (less “shopping around” leads).",
        ],
        proof: [
          { k: "Primary KPI", v: "Lead conversion ↑", note: "More visitors take the next action." },
          { k: "Trust", v: "Bounce rate ↓", note: "People stay because it makes sense fast." },
          { k: "Performance", v: "Load time ↓", note: "Faster pages reduce drop-offs." },
        ],
      },
      {
        key: "ops",
        label: "Internal Ops",
        headline: "If your team runs on spreadsheets + manual coordination…",
        sub: "Build dashboards + workflows that reduce noise and speed decisions.",
        problem: [
          "Data lives in too many places (teams don’t trust “the latest”).",
          "Approval flows are slow (work stalls waiting on people).",
          "Dashboards show everything, so key actions get missed.",
        ],
        approach: [
          "Map the workflow: roles → handoffs → approvals → exceptions.",
          "Design role-based views (each person sees only what they need).",
          "Add guardrails: audit trail, activity logs, and clear status states.",
        ],
        outcomes: [
          "Faster decisions (less back-and-forth).",
          "Cleaner operations (clear ownership + fewer errors).",
          "Higher adoption (tools feel obvious, not complicated).",
        ],
        proof: [
          { k: "Primary KPI", v: "Cycle time ↓", note: "Tasks move from request → done faster." },
          { k: "Reliability", v: "Errors ↓", note: "Guardrails reduce mistakes and rework." },
          { k: "Visibility", v: "Clarity ↑", note: "One source of truth, with audit trail." },
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const current = BLUEPRINTS[active];

  return (
    <section ref={sectionRef} className="relative px-5 sm:px-6 py-14 md:py-20 bg-white overflow-hidden">
      {/* “Flowing” background — subtle, premium */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -top-24 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-3xl bg-black/[0.05]"
          style={{ y: bgY, opacity: glowA }}
        />
        <motion.div
          className="absolute top-52 -left-28 h-[540px] w-[540px] rounded-full blur-3xl bg-black/[0.04]"
          style={{ y: bgY2, opacity: glowB }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.75, ease }}
          className="text-center"
        >
          <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500">Mini case studies</p>
          <h2 className="mt-3 text-2xl md:text-4xl font-medium tracking-tight text-gray-900">
            Blueprints that show senior thinking — without claiming past work.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pick your scenario. We’ll show the <span className="text-gray-900 font-medium">problem</span>, our{" "}
            <span className="text-gray-900 font-medium">approach</span>, and the{" "}
            <span className="text-gray-900 font-medium">outcomes</span> we’d optimize for.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Chip>Activation & retention</Chip>
            <Chip>Conversion & trust</Chip>
            <Chip>Ops efficiency</Chip>
            <Chip>Performance basics</Chip>
          </div>
        </motion.div>

        {/* Content */}
        <div className="mt-10 grid gap-7 lg:grid-cols-[0.95fr,1.05fr] items-start">
          {/* Left rail */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="grid gap-3 lg:sticky lg:top-24"
          >
            {BLUEPRINTS.map((b, idx) => (
              <BlueprintTab
                key={b.key}
                idx={idx}
                active={active === idx}
                title={b.label}
                subtitle={b.sub}
                onClick={() => setActive(idx)}
              />
            ))}

            <div className="hidden lg:block mt-3 text-xs text-gray-500">
              Tip: Click a blueprint — the panel updates smoothly.
            </div>
          </motion.div>

          {/* Right panel */}
          <div className="relative lg:sticky lg:top-24">
            <div
              className="rounded-[32px] border border-black/10 bg-white/70 backdrop-blur overflow-hidden"
              style={{
                boxShadow: "0 40px 120px rgba(0,0,0,0.10), 0 12px 26px rgba(0,0,0,0.06)",
              }}
            >
              {/* Top stripe: subtle “signal” */}
              <div className="relative h-16 overflow-hidden border-b border-black/10">
                <motion.div
                  className="absolute inset-0"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: ["0%", "-50%"],
                        }
                  }
                  transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: "200%",
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0.0) 80%, rgba(0,0,0,0.06) 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
                <div className="relative px-6 sm:px-7 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-widest text-gray-500">Blueprint</p>
                    <p className="text-xs text-gray-500">
                      {String(active + 1).padStart(2, "0")} / {String(BLUEPRINTS.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.key}
                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-black text-white px-3 py-1.5 text-xs font-medium">
                        {current.label}
                      </span>
                      <span className="text-xs text-gray-500">Problem → Approach → Outcomes (generic)</span>
                    </div>

                    <h3 className="mt-4 text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-gray-900">
                      {current.headline}
                    </h3>

                    {/* 3 columns: Problem, Approach, Outcomes */}
                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                      <div className="rounded-2xl border border-black/10 bg-white p-5">
                        <p className="text-[11px] uppercase tracking-widest text-gray-500">Problem</p>
                        <div className="mt-3">
                          <Bullets items={current.problem} />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white p-5">
                        <p className="text-[11px] uppercase tracking-widest text-gray-500">Approach</p>
                        <div className="mt-3">
                          <Bullets items={current.approach} />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white p-5">
                        <p className="text-[11px] uppercase tracking-widest text-gray-500">Outcomes</p>
                        <div className="mt-3">
                          <Bullets items={current.outcomes} />
                        </div>
                      </div>
                    </div>

                    {/* Metric-style outcomes (generic) */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {current.proof.map((m) => (
                        <MetricPill key={m.k} k={m.k} v={m.v} note={m.note} />
                      ))}
                    </div>

                    {/* Bottom CTA row */}
                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="text-sm text-gray-600 leading-relaxed">
                        Want this applied to <span className="text-gray-900 font-medium">your</span> product? We can
                        turn one blueprint into a build plan in a short call.
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition active:scale-[0.99]"
                        >
                          Talk to GITS →
                        </a>
                        <a
                          href="/audit"
                          className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
                        >
                          Get a priority list
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer strip */}
              <div className="px-6 sm:px-7 md:px-8 py-5 border-t border-black/10 bg-black/[0.02]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-xs text-gray-500">
                    Designed for: <span className="text-gray-800">Founders • CEOs • Product leads</span>
                  </p>
                  <p className="text-xs text-gray-500">Focus: clarity, trust, speed, and adoption</p>
                </div>
              </div>
            </div>

            {/* Mobile helper: “Swipe-like” hint without actual swipe */}
            <div className="lg:hidden mt-4 flex justify-center">
              <div className="text-xs text-gray-500">
                Tap the blueprint tabs to switch scenarios.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
