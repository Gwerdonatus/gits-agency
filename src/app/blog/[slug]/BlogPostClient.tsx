"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: d },
  }),
};

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose prose-gray max-w-none prose-p:leading-relaxed prose-li:leading-relaxed">
      {blocks.map((b, idx) => {
        if (b.type === "p") return <p key={idx}>{b.text}</p>;
        if (b.type === "h2") return <h2 key={idx}>{b.text}</h2>;
        if (b.type === "h3") return <h3 key={idx}>{b.text}</h3>;
        if (b.type === "quote")
          return (
            <blockquote key={idx} className="border-l-4 border-blue-600/40">
              {b.text}
            </blockquote>
          );
        if (b.type === "ul")
          return (
            <ul key={idx}>
              {b.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          );
        return null;
      })}
    </div>
  );
}

// Flexible post typing so it works with your static data
type Post = (typeof import("../data").BLOG_POSTS)[number];

export default function BlogPostClient({
  post,
  related,
}: {
  post: Post;
  related: Post[];
}) {
  const tags = "tags" in post ? (post as any).tags : undefined;
  const excerpt = "excerpt" in post ? (post as any).excerpt : undefined;
  const highlights = "highlights" in post ? (post as any).highlights : undefined;
  const content = "content" in post ? (post as any).content : undefined;
  const readTime = "readTime" in post ? (post as any).readTime : undefined;

  return (
    <main className="bg-white text-gray-900">
      <section className="relative px-5 sm:px-6 pt-24 pb-10 md:pt-32">
        {/* soft background accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-40 -left-28 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              <span aria-hidden>←</span> Back to blog
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.05}
            className="mt-7 flex flex-wrap items-center gap-3 text-xs text-gray-500"
          >
            <span className="uppercase tracking-widest">{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-black/20" />
            <span>{post.date}</span>
            {readTime ? (
              <>
                <span className="h-1 w-1 rounded-full bg-black/20" />
                <span>{readTime}</span>
              </>
            ) : null}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]"
          >
            {post.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.16}
            className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base"
          >
            {excerpt || post.summary}
          </motion.p>

          {Array.isArray(tags) ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.22}
              className="mt-5 flex flex-wrap gap-2"
            >
              {tags.map((t: string) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-gray-700"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600/90" />
                  {t}
                </span>
              ))}
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="mt-8 overflow-hidden rounded-[22px] sm:rounded-[28px] border border-black/10 bg-white/70"
            style={{
              boxShadow: "0 30px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
            </div>
          </motion.div>

          {Array.isArray(highlights) ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease }}
              className="mt-8 rounded-[22px] sm:rounded-[28px] border border-black/10 bg-white/70 backdrop-blur p-6 sm:p-7"
            >
              <p className="text-sm uppercase tracking-widest text-gray-500">Key Highlights</p>
              <ul className="mt-4 grid gap-3">
                {highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-blue-600/90" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.08}
            className="mt-10"
          >
            {Array.isArray(content) ? (
              <ContentRenderer blocks={content as ContentBlock[]} />
            ) : (
              <div className="prose prose-gray max-w-none">
                <p>{post.summary}</p>
              </div>
            )}
          </motion.article>

          {/* Related */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease }}
            className="mt-12"
          >
            <div className="flex items-end justify-between gap-6">
              <h3 className="text-xl font-medium">More posts</h3>
              <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition">
                View all →
              </Link>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={"/blog/" + p.slug}
                  className={cx(
                    "group rounded-[20px] border border-black/10 bg-white/70 p-4 hover:border-black/20 transition",
                    "focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:ring-offset-2"
                  )}
                  style={{
                    boxShadow: "0 18px 44px rgba(0,0,0,0.08), 0 2px 10px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="uppercase tracking-widest">{p.category}</span>
                    <span className="h-1 w-1 rounded-full bg-black/20" />
                    <span>{p.date}</span>
                  </div>

                  <div className="mt-2 font-medium text-gray-900 group-hover:opacity-90">{p.title}</div>
                  <div className="mt-2 text-sm text-gray-600 line-clamp-2">{p.summary}</div>
                </Link>
              ))}
            </div>
          </motion.div>

          <div className="h-16" />
        </div>
      </section>
    </main>
  );
}
