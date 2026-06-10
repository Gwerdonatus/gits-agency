import { defineField, defineType } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Product News",
          "Engineering Insights",
          "UI/UX Strategy",
          "AI Insights",
          "Security",
          "Design Trends",
          "DevOps",
          "Update",
          "Video",
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "postType",
      title: "Post Type",
      type: "string",
      options: {
        list: ["article", "video", "update"],
        layout: "radio",
      },
      initialValue: "article",
    }),
    defineField({
      name: "date",
      title: "Publish Date",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      placeholder: "5 min read",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "Shown in blog listing cards",
      type: "text",
      rows: 2,
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Longer intro shown at top of post (falls back to summary)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "highlights",
      title: "Key Highlights",
      description: "Bullet points shown in the highlights card on the post",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (optional)",
      description: "YouTube or Vimeo — turns this into a video post",
      type: "url",
    }),
    defineField({
      name: "content",
      title: "Article Content",
      type: "array",
      of: [
        {
          type: "object",
          name: "contentBlock",
          title: "Content Block",
          fields: [
            {
              name: "type",
              title: "Block Type",
              type: "string",
              options: {
                list: [
                  { title: "Paragraph", value: "p" },
                  { title: "Heading 2", value: "h2" },
                  { title: "Heading 3", value: "h3" },
                  { title: "Quote", value: "quote" },
                  { title: "Bullet List", value: "ul" },
                  { title: "Video Embed", value: "video" },
                ],
                layout: "radio",
              },
              validation: (R: any) => R.required(),
            },
            {
              name: "text",
              title: "Text",
              description: "For paragraph, heading, quote blocks",
              type: "text",
              rows: 3,
            },
            {
              name: "items",
              title: "List Items",
              description: "For bullet list blocks — one item per entry",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "url",
              title: "Video URL",
              description: "For video embed blocks — YouTube or Vimeo",
              type: "url",
            },
            {
              name: "caption",
              title: "Caption",
              description: "Optional caption for video blocks",
              type: "string",
            },
          ],
          preview: {
            select: { type: "type", text: "text" },
            prepare({ type, text }: any) {
              const labels: Record<string, string> = {
                p: "¶", h2: "H2", h3: "H3", quote: '"', ul: "•", video: "▶",
              };
              return {
                title: `${labels[type] || type} — ${text?.slice(0, 60) || "…"}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", date: "date" },
    prepare({ title, media, date }) {
      return { title, media, subtitle: date };
    },
  },
});