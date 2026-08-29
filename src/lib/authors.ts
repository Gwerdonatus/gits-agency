// src/lib/authors.ts
// ─────────────────────────────────────────────────────────────────────────────
// Named authors for blog posts.
//
// Search and AI engines weigh author identity (E-E-A-T) when deciding whether
// to cite a claim. An unattributed post is a claim from nobody, so every post
// resolves to a real person here, rendered as a visible byline and emitted as
// a Person in the Article schema.
//
// Only add people who actually write. A fabricated author is worse than none.
// ─────────────────────────────────────────────────────────────────────────────

export type Author = {
  key: string;
  name: string;
  role: string;
  /** One line of why this person is credible on the subject. Shown in the byline. */
  credential: string;
  /** Profile page for this author. */
  url: string;
  image?: string;
  sameAs: string[];
};

export const AUTHORS: Record<string, Author> = {
  gwer: {
    key: "gwer",
    name: "Gwer Msughter Donatus",
    role: "Founder & Senior Software Engineer, GITS",
    credential:
      "Builds payment reconciliation systems, AI automation and production web platforms for clients across 12 countries.",
    url: "https://gits.technology/about#founder",
    image: "https://gits.technology/about/founder1.webp",
    sameAs: [
      "https://donatus-gwer.vercel.app/",
      "https://github.com/Gwerdonatus",
      "https://www.linkedin.com/in/donatus-gwer-857610338",
      "https://x.com/donatus_gwer",
    ],
  },
};

export const DEFAULT_AUTHOR_KEY = "gwer";

export function getAuthor(key?: string): Author {
  return AUTHORS[key ?? DEFAULT_AUTHOR_KEY] ?? AUTHORS[DEFAULT_AUTHOR_KEY];
}
