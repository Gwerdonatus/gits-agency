"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "./data";

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

function Pill({
  children,
  href,
  variant = "solid",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition",
        "active:scale-[0.99]",
        variant === "solid"
          ? "bg-black text-white hover:opacity-90"
          : "border border-black/15 text-gray-900 hover:bg-black hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}

function BlueWave({ flip = false }: { flip?: boolean }) {
  return (
    <div className={flip ? "rotate-180" : ""} aria-hidden="true">
      <svg viewBox="0 0 1440 90" className="block w-full h-[60px] sm:h-[70px] md:h-[90px]">
        <defs>
          <linearGradient id="blueWave" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(37,99,235,0.16)" />
            <stop offset="40%" stopColor="rgba(34,211,238,0.14)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.14)" />
          </linearGradient>
        </defs>
        <path
          d="M0,64L60,58.7C120,53,240,43,360,32C480,21,600,11,720,16C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,90L1380,90C1320,90,1200,90,1080,90C960,90,840,90,720,90C600,90,480,90,360,90C240,90,120,90,60,90L0,90Z"
          fill="url(#blueWave)"
        />
      </svg>
    </div>
  );
}

export default function BlogIndex() {
  const featured = BLOG_POSTS[0] as typeof BLOG_POSTS[number] | undefined;
  const rest = BLOG_POSTS.slice(1);

  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="relative px-5 sm:px-6 pt-24 pb-8 md:pt-32">
        {/* soft background accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-40 -left-28 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center text-[2.1rem] leading-[1.05] sm:text-4xl md:text-6xl font-medium tracking-tight"
          >
            The latest from us
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.08}
            className="mt-4 text-center text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base"
          >
            Announcements, insights, and updates from GITS — short, useful, and easy to scan.
          </motion.p>

          {/* Featured post */}
          {featured ? (
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.16} className="mt-10">
              <Link
                href={"/blog/" + featured.slug}
                className="group block overflow-hidden rounded-[26px] sm:rounded-[32px] border border-black/10 bg-white/70 backdrop-blur"
                style={{
                  boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
                }}
              >
                <div className="grid md:grid-cols-[1.2fr,0.8fr]">
                  {/* ✅ FIXED: mobile image on mobile, desktop crop on md+ */}
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px]">
                    {/* Mobile / default */}
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:hidden"
                    />

                    {/* Desktop crop (only if available) */}
                    {"coverImageDesktop" in featured ? (
                      <Image
                        src={(featured as any).coverImageDesktop}
                        alt={featured.title}
                        fill
                        priority
                        quality={92}
                        sizes="(min-width: 768px) 60vw"
                        className="hidden md:block object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        priority
                        quality={92}
                        sizes="(min-width: 768px) 60vw"
                        className="hidden md:block object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
                  </div>

                  <div className="p-6 sm:p-7 md:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="uppercase tracking-widest">{featured.category}</span>
                      <span className="h-1 w-1 rounded-full bg-black/20" />
                      <span>{featured.date}</span>
                    </div>

                    <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
                      {featured.title}
                    </h2>

                    <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">{featured.summary}</p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                      Read more <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ) : null}
        </div>
      </section>

      <BlueWave />

      {/* CTA */}
      <section className="px-5 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="rounded-[28px] sm:rounded-[36px] border border-black/10 bg-white/70 backdrop-blur p-7 sm:p-8 md:p-10"
            style={{
              boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <p className="text-sm uppercase tracking-widest text-gray-500">Big ideas deserve to go deeper!</p>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-gray-700 max-w-2xl leading-relaxed text-sm sm:text-base">
                If you’re building something serious, we’ll help you clarify the scope, ship fast, and keep it clean.
              </p>

              <div className="flex flex-wrap gap-3">
                <Pill href="/contact">Let&apos;s talk</Pill>
                <Pill href="/audit" variant="ghost">
                  Get free audit
                </Pill>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <BlueWave flip />

      {/* POSTS */}
      <section className="px-5 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500">News</p>
              <h3 className="mt-3 text-2xl md:text-3xl font-medium">Updates from GITS</h3>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:gap-5">
            {rest.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease, delay: Math.min(idx * 0.03, 0.18) }}
              >
                <Link
                  href={"/blog/" + post.slug}
                  className={cx(
                    "group rounded-[22px] sm:rounded-[28px] border border-black/10 bg-white/70 backdrop-blur",
                    "p-4 sm:p-5 md:p-6 hover:border-black/20 transition",
                    "flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5"
                  )}
                  style={{
                    boxShadow: "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-28 sm:h-24 sm:w-36 overflow-hidden rounded-2xl border border-black/10 bg-black/5 shrink-0">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 40vw, 220px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="uppercase tracking-widest">{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-black/20" />
                        <span>{post.date}</span>
                      </div>

                      <h4 className="mt-2 text-[1.05rem] sm:text-lg md:text-xl font-medium text-gray-900">
                        {post.title}
                      </h4>

                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.summary}</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                    Read <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-gray-500">
            You want more? Follow us on{" "}
            <Link href="https://twitter.com/gits_co" target="_blank" rel="noopener noreferrer" className="underline">
              Twitter
            </Link>
            !
          </div>
        </div>
      </section>

      {/* FINAL SMOOTH ENDING */}
      <section className="px-5 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <BlueWave />
          </div>

          {/* Smooth ticker */}
          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/70 backdrop-blur p-4 sm:p-5">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.10), transparent 45%), radial-gradient(circle at 80% 50%, rgba(34,211,238,0.10), transparent 50%)",
              }}
            />

            <div className="relative">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500">
                Always building • Always improving
              </p>

              <motion.div
                className="mt-4 flex gap-3 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
              >
                {[...BLOG_POSTS, ...BLOG_POSTS].map((p, i) => (
                  <span
                    key={`${p.slug}-${i}`}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600/90" />
                    {p.category}
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{p.title}</span>
                  </span>
                ))}
              </motion.div>

              <div
                className="pointer-events-none absolute left-0 top-10 h-12 w-16"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))" }}
              />
              <div
                className="pointer-events-none absolute right-0 top-10 h-12 w-16"
                style={{ background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))" }}
              />
            </div>
          </div>

          {/* Big closing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative mt-8 rounded-[32px] border border-black/10 bg-white/70 backdrop-blur p-8 md:p-10 overflow-hidden"
            style={{
              boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "rgba(37,99,235,0.14)" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "rgba(34,211,238,0.12)" }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-widest text-gray-500">Work with GITS</p>
                <h3 className="mt-3 text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                  Want this level of design + engineering on your product?
                </h3>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  If you’re building a serious website, app, internal tool, or automation — let’s plan it properly and
                  ship it fast.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition active:scale-[0.99]"
                >
                  Let&apos;s talk
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white transition active:scale-[0.99]"
                >
                  Book a call
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
