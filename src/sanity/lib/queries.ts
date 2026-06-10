import { groq } from "next-sanity";

// All posts for the blog listing — summary fields only
export const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    readTime,
    category,
    tags,
    "coverImage": coverImage.asset->url + "?w=1200&auto=format",
    summary,
    excerpt,
    postType
  }
`;

// Single post — full fields
export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    date,
    readTime,
    category,
    tags,
    "coverImage": coverImage.asset->url + "?w=1200&auto=format",
    summary,
    excerpt,
    highlights,
    videoUrl,
    postType,
    content[] {
      type,
      text,
      items,
      url,
      caption
    }
  }
`;

// All slugs — for generateStaticParams
export const ALL_SLUGS_QUERY = groq`
  *[_type == "post"].slug.current
`;