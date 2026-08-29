import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAllSlugs } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import { ArticleSchema, BreadcrumbSchema } from "@/app/structured-data";
import BlogPostClient from "./BlogPostClient";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

const SITE_URL = "https://gits.technology";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const description = post.summary ?? post.excerpt ?? "";
  // Sanity returns absolute cdn.sanity.io URLs while local posts use relative
  // paths, so only prefix the site origin when the path is actually relative.
  // Prefixing blindly produced "https://gits.technologyhttps://cdn.sanity.io/..."
  // and left every Sanity-backed post imageless when shared.
  const image = post.coverImage
    ? /^https?:\/\//i.test(post.coverImage)
      ? post.coverImage
      : `${SITE_URL}${post.coverImage}`
    : undefined;

  const author = getAuthor((post as { author?: string }).author);

  return {
    title: post.title,
    description,
    authors: [{ name: author.name, url: author.url }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description,
      publishedTime: post.date,
      images: image ? [{ url: image, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 4);

  const author = getAuthor((post as { author?: string }).author);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.coverImage
    ? /^https?:\/\//i.test(post.coverImage)
      ? post.coverImage
      : `${SITE_URL}${post.coverImage}`
    : undefined;

  return (
    <>
      {/* Blog posts previously carried no Article schema at all. */}
      <ArticleSchema
        title={post.title}
        description={post.summary ?? ""}
        url={url}
        datePublished={post.date}
        image={image}
        author={{
          name: author.name,
          jobTitle: author.role,
          url: author.url,
          sameAs: author.sameAs,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url },
        ]}
      />
      <BlogPostClient post={post as any} related={related as any} />
    </>
  );
}