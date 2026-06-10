"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease, delay: d },
  }),
};

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

function normalizeUrl(input: string) {
  const v = (input || "").trim();
  if (!v) return v;
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return `https://${v}`;
}

function Field({
  label,
  required,
  children,
  dark,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <label className="block">
      <div className={cx("flex items-center gap-2 text-sm", dark ? "text-white/85" : "text-gray-700")}>
        <span>{label}</span>
        {required ? <span className={cx("text-xs", dark ? "text-white/40" : "text-gray-400")}>*</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Spinner() {
  return (
    <motion.span
      aria-hidden="true"
      className="inline-flex h-4 w-4 rounded-full border border-white/30 border-t-white"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
    />
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

const FAQS = [
  {
    q: "What does the free audit include?",
    a: "A prioritized review of UX clarity, conversion friction, performance basics, SEO fundamentals, accessibility red flags, and technical hygiene — with quick wins and a short roadmap.",
  },
  {
    q: "How fast do I get the audit?",
    a: "Usually within 24–72 hours on weekdays. If it’s a heavy week, we’ll still reply with an accurate timeframe.",
  },
  {
    q: "Will you change anything on my website?",
    a: "No. This is read-only analysis. We don’t log in or modify anything — we audit what’s visible plus common performance signals.",
  },
  {
    q: "What if my site is behind a login?",
    a: "We can only audit public pages. If it’s gated, share a demo URL or a short screen recording and we’ll audit the flow instead.",
  },
  {
    q: "Will you spam me after?",
    a: "No. We send the audit. If you want help implementing fixes, you reply. That’s it.",
  },
] as const;

export default function AuditsPage() {
  const reduceMotion = useReducedMotion();
  const successRef = useRef<HTMLDivElement | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refId, setRefId] = useState<string | null>(null);

  const [form, setForm] = useState({
    website: "",
    email: "",
    industry: "",
    goal: "",
    notes: "",
    company: "", // honeypot
  });

  const canSend = useMemo(() => {
    const websiteOk = form.website.trim().length >= 6;
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
    return websiteOk && emailOk && !form.company.trim() && status !== "sending";
  }, [form, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    setStatus("sending");
    setErrorMsg(null);
    setRefId(null);

    const payload = {
      website: normalizeUrl(form.website),
      email: form.email.trim(),
      industry: form.industry.trim(),
      goal: form.goal.trim(),
      notes: form.notes.trim(),
      company: form.company,
    };

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Something went wrong. Please try again.");

      setStatus("success");
      setRefId(typeof data?.id === "string" && data.id.length ? data.id : null);

      // keep email, clear rest
      setForm((p) => ({ ...p, website: "", industry: "", goal: "", notes: "", company: "" }));

      // scroll success into view
      window.setTimeout(() => {
        if (successRef.current) {
          successRef.current.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "nearest",
          });
        }
      }, 50);

      // toast auto-clear later (success panel stays until user clicks submit another)
      window.setTimeout(() => setStatus("idle"), 7000);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Failed to submit. Please try again.");
      window.setTimeout(() => setStatus("idle"), 6500);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <style jsx global>{`
        html:focus-within {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          html:focus-within {
            scroll-behavior: auto;
          }
        }
      `}</style>

      {/* Soft accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-52 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      {/* Sticky toast */}
      <AnimatePresence>
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease }}
            className="fixed z-50 left-4 right-4 bottom-4 md:left-auto md:right-6 md:bottom-auto md:top-6 md:w-[440px]"
          >
            <div
              className="rounded-2xl border border-black/10 bg-white/90 backdrop-blur px-4 py-3"
              style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-9 w-9 rounded-xl bg-black text-white grid place-items-center">
                  <CheckIcon />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">Request received</p>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    We’ll email your audit in <span className="font-medium text-gray-900">24–72 hours</span> (weekdays).
                    {refId ? (
                      <>
                        {" "}
                        <span className="text-gray-500">Ref:</span>{" "}
                        <span className="font-medium text-gray-900">{refId.slice(0, 8)}</span>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative px-6 pt-28 pb-12 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-sm uppercase tracking-widest text-gray-500">
            Audits
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="mt-3 text-4xl md:text-6xl font-medium leading-[1.05] max-w-4xl text-gray-900"
          >
            Get a free website audit — built for conversion and clarity.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.12}
            className="mt-5 text-gray-600 max-w-2xl leading-relaxed"
          >
            Share your website and what you’re trying to achieve. We’ll reply with quick wins first, then a short roadmap.
            No fluff — just actionable fixes.
          </motion.p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr,0.95fr] items-start">
            {/* FORM CARD */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, ease }}
              className="relative overflow-hidden rounded-3xl border border-black/10 bg-black text-white p-6 md:p-8"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.12)" }}
            >
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/70">Free audit request</p>
                    <p className="mt-1 text-white font-medium">Submit details — we’ll respond within 24–72 hours.</p>
                    <p className="mt-1 text-xs text-white/55">Weekdays. You’ll get a confirmation right after submitting.</p>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-white text-black px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                  >
                    Prefer contact?
                  </Link>
                </div>

                <div className="mt-6 h-px w-full bg-white/10" />

                {/* SUCCESS / ERROR */}
                <div ref={successRef} className="mt-6">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success-panel"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease }}
                        className="rounded-2xl border border-white/10 bg-white/10 p-5"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-10 w-10 rounded-2xl bg-white text-black grid place-items-center">
                            <CheckIcon />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white">Submitted successfully</p>
                            <p className="mt-1 text-sm text-white/75 leading-relaxed">
                              Thanks — we’ve received your audit request. You’ll get your audit via email in{" "}
                              <span className="text-white font-medium">24–72 hours</span> (weekdays).
                            </p>

                            {refId ? (
                              <div className="mt-3 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/75">
                                <span className="text-white/55">Reference ID:</span>{" "}
                                <span className="font-medium text-white">{refId}</span>
                              </div>
                            ) : null}

                            <p className="mt-3 text-xs text-white/55 leading-relaxed">
                              If you don’t see our email, check your <span className="text-white/80">Spam</span> or{" "}
                              <span className="text-white/80">Promotions</span> tab.
                            </p>

                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setStatus("idle");
                                  setErrorMsg(null);
                                  setRefId(null);
                                }}
                                className="inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium hover:opacity-90 transition"
                              >
                                Submit another
                              </button>
                              <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent text-white px-4 py-2.5 text-sm font-medium hover:bg-white/10 transition"
                              >
                                Contact instead
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}

                    {status === "error" ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease }}
                        className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
                      >
                        {errorMsg || "Something went wrong. Please try again."}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* FORM */}
                {status !== "success" ? (
                  <form onSubmit={onSubmit} className="mt-6 grid gap-5">
                    <input
                      value={form.company}
                      onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Website URL" required dark>
                        <input
                          value={form.website}
                          onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 focus:ring-4 focus:ring-white/10 transition"
                          placeholder="example.com"
                          autoComplete="url"
                          inputMode="url"
                        />
                      </Field>

                      <Field label="Email" required dark>
                        <input
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 focus:ring-4 focus:ring-white/10 transition"
                          placeholder="you@company.com"
                          autoComplete="email"
                          inputMode="email"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Industry (optional)" dark>
                        <input
                          value={form.industry}
                          onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 focus:ring-4 focus:ring-white/10 transition"
                          placeholder="SaaS, services, ecommerce..."
                        />
                      </Field>

                      <Field label="Primary goal (optional)" dark>
                        <input
                          value={form.goal}
                          onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 focus:ring-4 focus:ring-white/10 transition"
                          placeholder="More leads, more sales..."
                        />
                      </Field>
                    </div>

                    <Field label="Notes (optional)" dark>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                        className="min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/25 focus:ring-4 focus:ring-white/10 transition"
                        placeholder="What feels broken? Where do users drop off? Offer/audience context?"
                      />
                    </Field>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <button
                        type="submit"
                        disabled={!canSend}
                        className={cx(
                          "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition active:scale-[0.99]",
                          canSend ? "bg-white text-black hover:opacity-90" : "bg-white/15 text-white/40 cursor-not-allowed"
                        )}
                      >
                        {status === "sending" ? (
                          <>
                            <Spinner />
                            <motion.span
                              initial={{ opacity: 0.7 }}
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                            >
                              Submitting…
                            </motion.span>
                          </>
                        ) : (
                          "Request free audit"
                        )}
                      </button>

                      <p className="text-xs text-white/55 leading-relaxed">
                        By submitting, you agree we can email you the audit. We don’t sell your data.{" "}
                        <Link href="/privacy-policy" className="text-white/85 hover:underline">
                          Privacy
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                ) : null}
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.aside
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.08, ease }}
              className="lg:sticky lg:top-28 space-y-4"
            >
              <div
                className="rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-6"
                style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)" }}
              >
                <p className="text-sm uppercase tracking-widest text-gray-500">What happens next</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/80" />
                    We review your site and identify the biggest conversion leaks.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/70" />
                    You get quick wins first, then a short roadmap.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/60" />
                    Audit delivery: <span className="font-medium">24–72 hours</span> (weekdays).
                  </li>
                </ul>
              </div>

              <div
                className="rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-6"
                style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)" }}
              >
                <p className="text-sm uppercase tracking-widest text-gray-500">Best for</p>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  Landing pages, agency sites, SaaS, ecommerce, and portfolios that need stronger trust + clearer CTAs.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-widest text-gray-500">FAQ</p>
          <h2 className="mt-3 text-2xl md:text-3xl font-medium text-gray-900">Quick answers.</h2>

          <div className="mt-8 grid gap-3">
            {FAQS.map((f, idx) => {
              const open = openFaq === idx;
              return (
                <div key={f.q} className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((p) => (p === idx ? null : idx))}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-6"
                  >
                    <span className="text-sm md:text-base text-gray-900">{f.q}</span>
                    <span className={cx("text-gray-500 transition", open ? "rotate-45" : "rotate-0")} aria-hidden="true">
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                      >
                        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{f.a}</div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
