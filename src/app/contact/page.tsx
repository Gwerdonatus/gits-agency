"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { InlineWidget } from "react-calendly";

type FAQ = { q: string; a: string };

const FAQS: FAQ[] = [
  {
    q: "What kind of projects do you take on?",
    a: "Web apps, mobile apps, dashboards, internal tools, AI automations, and integrations. If it involves users, workflows, or data—we can build it cleanly.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes—especially MVPs, redesigns, and scaling existing products. We help you ship fast without messy architecture.",
  },
  {
    q: "How fast can we start?",
    a: "If your scope is clear, we can begin quickly. If not, we’ll run a short discovery to align on goals, timeline, and next steps.",
  },
  {
    q: "Do you do fixed price?",
    a: "Sometimes. If scope is well-defined we can do fixed. Otherwise we do sprint-based work for clarity and flexibility.",
  },
];

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

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>{label}</span>
        {required ? <span className="text-gray-400">*</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function QuickAction({
  href,
  title,
  sub,
  icon,
  external,
}: {
  href: string;
  title: string;
  sub: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cx(
        "group rounded-2xl border border-black/10 bg-white/60 backdrop-blur px-5 py-4 transition",
        "hover:bg-white hover:border-black/15"
      )}
      style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.07), 0 2px 10px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-10 w-10 rounded-2xl border border-black/10 bg-black text-white grid place-items-center">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-900">{title}</div>
          <div className="mt-1 text-xs text-gray-500 leading-relaxed">{sub}</div>
        </div>
        <div className="ml-auto text-gray-400 group-hover:text-gray-700 transition" aria-hidden="true">
          →
        </div>
      </div>
    </a>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm15 8H2v11a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V10z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12.06 0C5.49.02.17 5.36.2 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.63a11.9 11.9 0 0 0 5.7 1.45h.01c6.57-.02 11.9-5.36 11.92-11.93a11.88 11.88 0 0 0-3.36-8.41zM12 21.65h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.22-3.71.97.99-3.62-.24-.37a9.7 9.7 0 0 1-1.49-5.13C2.26 6.57 6.6 2.22 11.99 2.2c2.6 0 5.05 1.02 6.89 2.86a9.66 9.66 0 0 1 2.84 6.87c-.02 5.38-4.37 9.72-9.72 9.72zm5.66-7.23c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.7.16-.21.31-.81 1-1 1.2-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.51-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.7-.96-2.33-.25-.6-.5-.52-.7-.53h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.4 5.37 4.77.75.33 1.33.53 1.78.68.75.24 1.43.21 1.97.13.6-.09 1.82-.74 2.08-1.45.26-.7.26-1.3.18-1.45-.08-.16-.28-.23-.6-.39z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

function Spinner() {
  return (
    <motion.span
      aria-hidden="true"
      className="inline-flex h-4 w-4 rounded-full border border-black/25 border-t-black"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
    />
  );
}

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const successRef = useRef<HTMLDivElement | null>(null);

  const PRIMARY_EMAIL = "hellogits@outlook.com";
  const PHONE_E164 = "+2348116276212";
  const WHATSAPP_E164 = "+2348116276212";
  const CALENDLY_URL = "https://calendly.com/donatusgwer";

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [refId, setRefId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Website",
    timeline: "2–4 weeks",
    budget: "$1k–$3k",
    prefer: "Email",
    message: "",
    consent: true,
    company: "",
    phone: "",
  });

  const canSend = useMemo(() => {
    const okEmail = /^\S+@\S+\.\S+$/.test(form.email.trim());
    return (
      form.company.trim().length === 0 &&
      form.name.trim().length >= 2 &&
      okEmail &&
      form.message.trim().length >= 10 &&
      form.consent &&
      status !== "sending"
    );
  }, [form, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    setStatus("sending");
    setStatusMsg("");
    setRefId(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          prefer: form.prefer,
          projectType: form.projectType,
          timeline: form.timeline,
          budget: form.budget,
          message: form.message,
          company: form.company, // honeypot
        }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (!res.ok || data?.ok === false) {
        const msg = data?.error || "Something went wrong. Please try again or email us.";
        setStatus("error");
        setStatusMsg(msg);
        window.setTimeout(() => setStatus("idle"), 6500);
        return;
      }

      setStatus("success");
      setRefId(typeof data?.id === "string" && data.id.length ? data.id : null);
      setStatusMsg("Message sent. We’ll reply within 24 hours (Mon–Sat).");

      // clear form, keep their email so it feels “recognized”
      setForm((p) => ({
        ...p,
        name: "",
        phone: "",
        message: "",
        prefer: "Email",
        projectType: "Website",
        timeline: "2–4 weeks",
        budget: "$1k–$3k",
        company: "",
        consent: true,
      }));

      // scroll success panel into view so user never misses it
      window.setTimeout(() => {
        if (successRef.current) {
          successRef.current.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "nearest",
          });
        }
      }, 50);

      // toast can auto-fade later, but success panel stays until user clicks “Send another”
      window.setTimeout(() => setStatus("idle"), 7000);
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please email us instead.");
      window.setTimeout(() => setStatus("idle"), 6500);
    }
  }

  const mailtoHref = `mailto:${PRIMARY_EMAIL}`;
  const telHref = `tel:${PHONE_E164.replace(/\s/g, "")}`;

  const waNumber = WHATSAPP_E164.replace(/[^\d]/g, "");
  const waText = encodeURIComponent(
    "Hi GITS — I’m reaching out about a project. " +
      "Here’s what I want to build:\n\n" +
      "• Project type:\n" +
      "• Goal:\n" +
      "• Timeline:\n" +
      "• Budget range:\n\n" +
      "Best way to reach me:"
  );
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;

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

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-52 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      {/* Sticky toast (same “hard to miss” behavior as audits) */}
      <AnimatePresence>
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease }}
            className="fixed z-50 left-4 right-4 bottom-4 md:left-auto md:right-6 md:bottom-auto md:top-6 md:w-[460px]"
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
                  <p className="text-sm font-medium text-gray-900">Message received</p>
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                    We’ll reply within <span className="font-medium text-gray-900">24 hours</span> (Mon–Sat).
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

        {status === "error" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease }}
            className="fixed z-50 left-4 right-4 bottom-4 md:left-auto md:right-6 md:bottom-auto md:top-6 md:w-[520px]"
          >
            <div
              className="rounded-2xl border border-red-500/30 bg-white/90 backdrop-blur px-4 py-3"
              style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.06)" }}
            >
              <p className="text-sm font-medium text-gray-900">Couldn’t send</p>
              <p className="mt-1 text-xs text-gray-600 leading-relaxed">{statusMsg || "Something went wrong."}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="relative px-6 pt-28 pb-12 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-sm uppercase tracking-widest text-gray-500">
            Contact
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="mt-3 text-4xl md:text-6xl font-medium leading-[1.05] max-w-3xl text-gray-900"
          >
            Let’s talk about the build — and the fastest path to launch.
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.12} className="mt-5 text-gray-600 max-w-2xl leading-relaxed">
            Share what you’re building. We’ll reply with the clearest next step — a quick question list, a rough plan, or a call if needed.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.18} className="mt-8 grid gap-4 md:grid-cols-3">
            <QuickAction href="#book" title="Book a call" sub="Pick a time. No back-and-forth." icon={<CalendarIcon />} />
            <QuickAction href={mailtoHref} title="Email" sub={PRIMARY_EMAIL} icon={<MailIcon />} />
            <QuickAction href={waHref} title="WhatsApp" sub={PHONE_E164} icon={<WhatsAppIcon />} external />
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr,0.95fr] items-start">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease }}
              className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-6 md:p-8"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Fastest route</p>
                    <p className="mt-1 text-gray-900 font-medium">Book a quick call or send details below.</p>
                    <p className="mt-1 text-xs text-gray-500">Typical reply time: within 24 hours (Mon–Sat).</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={waHref}
                      className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                      <span className="ml-2" aria-hidden="true">
                        <WhatsAppIcon />
                      </span>
                    </a>
                    <a
                      href="#book"
                      className="inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                    >
                      Book a call
                    </a>
                  </div>
                </div>

                <div className="mt-6 h-px w-full bg-black/10" />

                {/* Strong in-card confirmation (replaces form) */}
                <div ref={successRef} className="mt-6">
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success-panel"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease }}
                        className="rounded-2xl border border-black/10 bg-white p-5"
                        style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)" }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-10 w-10 rounded-2xl bg-black text-white grid place-items-center">
                            <CheckIcon />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900">Sent successfully</p>
                            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                              Thanks — we’ve received your message. We’ll reply within{" "}
                              <span className="font-medium text-gray-900">24 hours</span> (Mon–Sat).
                            </p>

                            {refId ? (
                              <div className="mt-3 rounded-xl border border-black/10 bg-white px-3 py-2 text-xs text-gray-600">
                                <span className="text-gray-500">Reference ID:</span>{" "}
                                <span className="font-medium text-gray-900">{refId}</span>
                              </div>
                            ) : null}

                            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                              If you don’t see our reply soon, check <span className="text-gray-700">Spam</span> or{" "}
                              <span className="text-gray-700">Promotions</span>, or message us on WhatsApp.
                            </p>

                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setStatus("idle");
                                  setStatusMsg("");
                                  setRefId(null);
                                  // keep email so they can send again quickly
                                }}
                                className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 transition"
                              >
                                Send another
                              </button>
                              <a
                                href={waHref}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white text-gray-900 px-4 py-2.5 text-sm font-medium hover:bg-black hover:text-white transition"
                              >
                                WhatsApp instead
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Form only when not success */}
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
                      <Field label="Your name" required>
                        <input
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                          placeholder="Your name"
                          autoComplete="name"
                        />
                      </Field>

                      <Field label="Your email" required>
                        <input
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                          placeholder="you@company.com"
                          autoComplete="email"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                      <Field label="Project type">
                        <select
                          value={form.projectType}
                          onChange={(e) => setForm((p) => ({ ...p, projectType: e.target.value }))}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                        >
                          <option>Website</option>
                          <option>Web app</option>
                          <option>Mobile app</option>
                          <option>Dashboard / Admin</option>
                          <option>Automation / AI</option>
                          <option>Integrations / API</option>
                          <option>Not sure yet</option>
                        </select>
                      </Field>

                      <Field label="Timeline">
                        <select
                          value={form.timeline}
                          onChange={(e) => setForm((p) => ({ ...p, timeline: e.target.value }))}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                        >
                          <option>ASAP</option>
                          <option>1–2 weeks</option>
                          <option>2–4 weeks</option>
                          <option>1–2 months</option>
                          <option>Flexible</option>
                        </select>
                      </Field>

                      <Field label="Budget range">
                        <select
                          value={form.budget}
                          onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                        >
                          <option>$500–$1k</option>
                          <option>$1k–$3k</option>
                          <option>$3k–$7k</option>
                          <option>$7k–$15k</option>
                          <option>$15k+</option>
                          <option>Not sure yet</option>
                        </select>
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Preferred contact">
                        <select
                          value={form.prefer}
                          onChange={(e) => setForm((p) => ({ ...p, prefer: e.target.value }))}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                        >
                          <option>Email</option>
                          <option>Call</option>
                          <option>WhatsApp</option>
                        </select>
                      </Field>

                      <Field label="Phone (optional)">
                        <input
                          value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                          placeholder="+234..."
                          autoComplete="tel"
                        />
                      </Field>
                    </div>

                    <Field label="Project details" required>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        className="min-h-[160px] w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black/25"
                        placeholder="What are you building, who is it for, and what should it achieve?"
                      />
                    </Field>

                    <label className="flex items-start gap-3 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-black/20"
                      />
                      <span>
                        By submitting, you agree to the{" "}
                        <a className="underline underline-offset-4 hover:opacity-80" href="/privacy">
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={!canSend}
                        className={cx(
                          "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition",
                          canSend ? "bg-black text-white hover:opacity-90" : "bg-black/10 text-black/40 cursor-not-allowed"
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
                              Sending…
                            </motion.span>
                          </>
                        ) : (
                          "Send message"
                        )}
                      </button>

                      <AnimatePresence mode="wait">
                        {status === "error" ? (
                          <motion.p
                            key="err-inline"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="text-sm text-red-600"
                          >
                            {statusMsg || "Something went wrong. Please email us."}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </form>
                ) : null}
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="lg:sticky lg:top-28 space-y-4"
            >
              <div
                className="rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-6"
                style={{ boxShadow: "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)" }}
              >
                <p className="text-sm uppercase tracking-widest text-gray-500">Reach us</p>
                <div className="mt-4 grid gap-3">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition"
                  >
                    Email
                  </a>
                  <a
                    href={telHref}
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition"
                  >
                    Call
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section id="book" className="relative px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: reduceMotion ? 0 : 0.75, ease }}
          >
            <p className="text-sm uppercase tracking-widest text-gray-500">Calendar</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-medium text-gray-900">Book a quick call.</h2>
            <p className="mt-3 text-gray-600 max-w-2xl">Choose a time that works. You’ll get confirmation automatically.</p>
          </motion.div>

          <div
            className="mt-8 rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-2 md:p-3 overflow-hidden"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)" }}
          >
            <div className="h-[820px] w-full">
              <InlineWidget url={CALENDLY_URL} styles={{ height: "820px", width: "100%" }} />
            </div>
          </div>
        </div>
      </section>

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
