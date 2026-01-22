"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease, delay: d },
  }),
};

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

function BlueWave({ flip = false }: { flip?: boolean }) {
  return (
    <div className={flip ? "rotate-180" : ""} aria-hidden="true">
      <svg viewBox="0 0 1440 90" className="block w-full h-[56px] sm:h-[70px] md:h-[90px]">
        <defs>
          <linearGradient id="gitsBlueWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(37,99,235,0.18)" />
            <stop offset="45%" stopColor="rgba(34,211,238,0.16)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.16)" />
          </linearGradient>
        </defs>
        <path
          d="M0,64L60,58.7C120,53,240,43,360,32C480,21,600,11,720,16C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,90L1380,90C1320,90,1200,90,1080,90C960,90,840,90,720,90C600,90,480,90,360,90C240,90,120,90,60,90L0,90Z"
          fill="url(#gitsBlueWave)"
        />
      </svg>
    </div>
  );
}

function Stat({ value, label, hint }: { value: string; label: string; hint?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-[26px] border border-black/10 bg-white/70 backdrop-blur p-5 sm:p-6"
      style={{
        boxShadow: "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <div className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-700">{label}</div>
      {hint ? <div className="mt-2 text-xs text-gray-500 leading-relaxed">{hint}</div> : null}
    </motion.div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-[26px] border border-black/10 bg-white/70 backdrop-blur p-6"
      style={{
        boxShadow: "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{text}</p>
    </motion.div>
  );
}

function IconWrap({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cx(
        "group inline-flex items-center justify-center rounded-full",
        "h-10 w-10 border border-black/10 bg-white/70 backdrop-blur",
        "hover:bg-black hover:border-black transition",
        "active:scale-[0.99]"
      )}
      style={{ boxShadow: "0 14px 30px rgba(0,0,0,0.06)" }}
    >
      <span className="text-gray-800 group-hover:text-white transition">{children}</span>
    </a>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5H4.5V24H.5V8.5zM8 8.5h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V24H16.4v-7.85c0-1.87-.03-4.28-2.61-4.28-2.61 0-3.01 2.04-3.01 4.15V24H8V8.5z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.26.79-.57 0-.28-.01-1.02-.02-2-3.2.71-3.87-1.58-3.87-1.58-.52-1.37-1.28-1.73-1.28-1.73-1.05-.73.08-.72.08-.72 1.16.08 1.77 1.22 1.77 1.22 1.03 1.81 2.7 1.29 3.36.99.1-.77.4-1.29.73-1.58-2.55-.3-5.23-1.31-5.23-5.83 0-1.29.45-2.35 1.19-3.18-.12-.3-.52-1.52.11-3.17 0 0 .97-.32 3.18 1.21.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.53 3.17-1.21 3.17-1.21.63 1.65.23 2.87.12 3.17.74.83 1.19 1.89 1.19 3.18 0 4.53-2.69 5.53-5.25 5.82.41.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .31.21.68.8.57C19.96 21.42 23.25 17.1 23.25 12 23.25 5.62 18.27.5 12 .5z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.77 7.74L23 22h-6.4l-5.01-6.53L5.88 22H2.78l7.29-8.33L1 2h6.56l4.53 5.9L18.9 2zm-1.12 18h1.78L6.6 3.9H4.7L17.78 20z" />
    </svg>
  );
}

function Person({
  name,
  role,
  bio,
  initials,
}: {
  name: string;
  role: string;
  bio: string;
  initials: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-[28px] border border-black/10 bg-white/70 backdrop-blur p-6 sm:p-7"
      style={{
        boxShadow: "0 22px 60px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-start gap-4">
        <div
          className="h-12 w-12 shrink-0 rounded-2xl border border-black/10"
          style={{
            background:
              "radial-gradient(circle at 25% 25%, rgba(37,99,235,0.18), transparent 55%), radial-gradient(circle at 80% 65%, rgba(34,211,238,0.14), transparent 55%), rgba(0,0,0,0.03)",
          }}
        >
          <div className="h-full w-full grid place-items-center text-sm font-medium text-gray-900">{initials}</div>
        </div>

        <div className="min-w-0">
          <p className="text-base font-medium text-gray-900 leading-tight">{name}</p>
          <p className="mt-1 text-sm text-gray-600">{role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">{bio}</p>
    </motion.div>
  );
}

/* ✅ UPDATED: founder is always small, circular, and never “face-big”.
   - Mobile: tiny circular avatar
   - Desktop: still small circular avatar (shows reliably)
   - No big hero image panel anymore
*/
function FounderCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-[32px] border border-black/10 bg-white/70 backdrop-blur p-6 sm:p-7 md:p-8"
      style={{
        boxShadow: "0 28px 80px rgba(0,0,0,0.10), 0 2px 10px rgba(0,0,0,0.04)",
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-start gap-4">
        {/* Small circular avatar (all breakpoints) */}
        <div className="relative shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden border border-black/10 bg-black/[0.03]">
          <Image
            src="/about/founder.jpeg"
            alt="Founder profile"
            fill
            sizes="44px"
            priority={false}
            quality={92}
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm uppercase tracking-widest text-gray-500">Founder</p>
          <p className="mt-1 text-base sm:text-lg font-medium text-gray-900 leading-tight">
            Gwer Msughter Donatus
          </p>
          <p className="mt-1 text-sm text-gray-600">Product-focused engineer • systems thinker</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          GITS was founded by Gwer Msughter Donatus, a product-focused engineer and systems thinker with a deep interest
          in how technology, design, and automation come together to solve real business problems.
        </p>

        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          With strong foundations in backend systems, web platforms, and AI-driven workflows, Gwer builds digital
          products that prioritize clarity, scalability, and long-term value.
        </p>

        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          The goal is simple: ship clean, reliable work that supports real business growth—without unnecessary
          complexity.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <IconWrap href="https://www.linkedin.com/in/donatus-gwer-857610338" label="LinkedIn">
          <LinkedInIcon />
        </IconWrap>
        <IconWrap href="https://github.com/Gwerdonatus" label="GitHub">
          <GitHubIcon />
        </IconWrap>
        <IconWrap href="https://x.com/donatus_gwer" label="X (Twitter)">
          <XIcon />
        </IconWrap>

        <div className="ml-1 text-xs text-gray-500">
          <span className="font-medium text-gray-800">GITS</span> — Gwer Intelligent Tech Solutions
        </div>
      </div>

      {/* Subtle “flow” divider (helps the section feel like it’s entering) */}
      <motion.div
        aria-hidden="true"
        className="mt-7 h-px w-full bg-black/10"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0.9 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="bg-white text-gray-900">
      {/* ✅ Smooth scroll for the whole page */}
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

      {/* HERO */}
      <section className="relative px-5 sm:px-6 pt-24 pb-10 md:pt-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-52 -left-28 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-center text-xs sm:text-sm uppercase tracking-widest text-gray-500">
            About GITS
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.06}
            className="mt-4 text-center text-[2.15rem] leading-[1.05] sm:text-4xl md:text-6xl font-medium tracking-tight"
          >
            We build digital products that feel <span className="text-blue-700">simple</span> — even when the system is complex.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.12}
            className="mt-5 text-center text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
          >
            GITS is a product-focused studio. We help businesses improve trust, conversion, and speed through clean UX, strong engineering, and automation that works in real life.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.18} className="mt-10 grid gap-4 md:grid-cols-3">
            <Stat value="Clarity" label="Interfaces that guide attention" hint="We design layouts and flows so users always know what to do next." />
            <Stat value="Reliability" label="Systems that don’t break under growth" hint="Clean architecture, predictable integrations, and performance-first builds." />
            <Stat value="Leverage" label="Automation that saves time (safely)" hint="Workflows with guardrails: approvals, logs, fallbacks—built for business." />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.24} className="mt-10 flex flex-wrap justify-center gap-3">
            {/* ✅ URL fixed */}
            <Link
              href="/audit"
              className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition active:scale-[0.99]"
            >
              Get free audit →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
            >
              Contact us
            </Link>
          </motion.div>
        </div>
      </section>

      <BlueWave />

      {/* STORY */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75, ease }}
            >
              <p className="text-sm uppercase tracking-widest text-gray-500">Our story</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-medium leading-tight">Why we started GITS</h2>

              <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                We noticed a pattern: many businesses don’t just need “a website” — they need a product that communicates value instantly, earns trust, and converts. On the technical side, they need systems that stay stable as the business grows.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                GITS exists to bridge the gap between design and engineering. We bring structure to messy workflows, simplify confusing user journeys, and build platforms that don’t become slow or fragile over time.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                We don’t sell hype. We sell clean thinking, careful execution, and results you can feel: better usability, stronger conversion, faster performance, and less time wasted manually.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75, ease, delay: reduceMotion ? 0 : 0.05 }}
              className="rounded-[28px] border border-black/10 bg-white/70 backdrop-blur p-6 sm:p-7"
              style={{
                boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
              }}
            >
              <p className="text-sm uppercase tracking-widest text-gray-500">Mission</p>
              <h3 className="mt-3 text-xl sm:text-2xl font-medium leading-tight">Build products that feel premium, fast, and easy to use.</h3>

              <div className="mt-5 grid gap-3">
                {[
                  { t: "Design that sells", d: "Clear hierarchy, calm layouts, and flows that make users confident." },
                  { t: "Engineering that scales", d: "Solid foundations: performance, security basics, maintainable code." },
                  { t: "Automation with control", d: "Workflows with checks, logs, and reliability—built for reality." },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-black/10 bg-white/70 p-4">
                    <p className="text-sm font-medium text-gray-900">{x.t}</p>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{x.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BlueWave flip />

      {/* VALUES */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-widest text-gray-500">What we believe</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-medium">Principles we build with</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              These are the standards we use when designing and shipping client work—so your product feels intentional.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="mt-8 grid gap-5 md:grid-cols-3"
          >
            <Card title="Clarity over noise" text="Users shouldn’t work hard to understand your offer. We simplify content and remove friction." />
            <Card title="Systems, not one-off pages" text="We design reusable components and scalable patterns so the product stays consistent as you grow." />
            <Card title="Speed that feels premium" text="Performance is part of trust. We optimize load, interaction, and flow so everything feels sharp." />
          </motion.div>
        </div>
      </section>

      <BlueWave />

      {/* FOUNDER + TEAM */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease }}
          >
            <p className="text-sm uppercase tracking-widest text-gray-500">People</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-medium">Founder & team</h2>
            <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed text-sm sm:text-base">
              GITS is founder-led with trusted contributors across engineering and design. The focus is simple: build clean products, ship reliably, and support business growth without unnecessary complexity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease }}
            className="mt-8"
          >
            <FounderCard />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="mt-8 grid gap-5 md:grid-cols-2"
          >
            <Person
              name="Aisha Adeyemi"
              initials="AA"
              role="UI/UX • Product Interface & Design Systems"
              bio="Supports GITS projects with UI execution and design systems—clean hierarchy, consistent components, and calm layouts that build trust fast."
            />
            <Person
              name="Chinedu Okafor"
              initials="CO"
              role="Engineering • Integrations & Performance"
              bio="Works on APIs, integrations, and performance. Focused on reliability: safe retries, clean contracts, and smooth user experiences."
            />
            <Person
              name="Tomi Afolayan"
              initials="TA"
              role="DevOps • CI/CD & Infrastructure"
              bio="Helps keep delivery stable: automated deployments, environment consistency, monitoring basics, and safe rollbacks so shipping stays predictable."
            />
            <Person
              name="Nneka Eze"
              initials="NE"
              role="Backend • Security & Platform Hygiene"
              bio="Contributes to secure platform foundations—auth patterns, access control, and practical security defaults that don’t slow down delivery."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease }}
            className="mt-10 rounded-[32px] border border-black/10 bg-white/70 backdrop-blur p-7 sm:p-8 md:p-10"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)" }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-widest text-gray-500">Work with GITS</p>
                <h3 className="mt-3 text-2xl md:text-3xl font-medium leading-tight">
                  Want your product to feel premium, fast, and clear?
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
                  Start with a free audit. We’ll highlight what’s hurting trust, what’s slowing performance, and what’s blocking conversions—then give you a clean priority list.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {/* ✅ URL fixed */}
                <Link
                  href="/audit"
                  className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition active:scale-[0.99]"
                >
                  Get free audit →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <BlueWave />
        </div>
      </section>
    </main>
  );
}
