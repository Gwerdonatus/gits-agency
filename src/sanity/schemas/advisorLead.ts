// schemas/advisorLead.ts
// Add this to your sanity.config.ts schema array:
//   import { advisorLead } from './schemas/advisorLead'
//   schema: { types: [post, ..., advisorLead] }

import { defineField, defineType } from "sanity";

export const advisorLead = defineType({
  name: "advisorLead",
  title: "Advisor Leads",
  type: "document",
  icon: () => "🤖",
  fields: [
    // ── Identity
    defineField({
      name: "sessionId",
      title: "Session ID",
      type: "string",
      description: "Auto-generated unique session identifier",
      readOnly: true,
    }),
    defineField({
      name: "visitorName",
      title: "Visitor Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
    }),

    // ── Project details
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          "Website",
          "Mobile App",
          "SaaS / Web App",
          "AI Automation",
          "Internal Tool",
          "E-commerce",
          "Landing Page",
          "Design Only",
          "Other",
        ],
      },
    }),
    defineField({
      name: "budgetRange",
      title: "Budget Range",
      type: "string",
    }),
    defineField({
      name: "timeline",
      title: "Timeline / Urgency",
      type: "string",
    }),
    defineField({
      name: "businessName",
      title: "Business / Company",
      type: "string",
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
    }),
    defineField({
      name: "goalSummary",
      title: "Goal Summary",
      type: "text",
      rows: 3,
      description: "Auto-generated one-line summary of what the visitor wants to build",
    }),

    // ── Lead quality
    defineField({
      name: "leadScore",
      title: "Lead Score",
      type: "number",
      description: "0–100 based on qualification signals",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "leadStatus",
      title: "Lead Status",
      type: "string",
      options: {
        list: ["new", "partial", "qualified", "hot", "contacted", "closed"],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "ctaClicked",
      title: "CTA Clicked",
      type: "string",
      description: "Which CTA the visitor clicked (whatsapp / book_call / contact / audit)",
    }),

    // ── Conversation
    defineField({
      name: "messageCount",
      title: "Message Count",
      type: "number",
    }),
    defineField({
      name: "conversationSummary",
      title: "Conversation Summary",
      type: "text",
      rows: 5,
      description: "AI-generated summary of the full conversation",
    }),
    defineField({
      name: "transcript",
      title: "Full Transcript",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "role",    type: "string",  title: "Role" },
            { name: "content", type: "text",    title: "Content" },
            { name: "time",    type: "datetime", title: "Time" },
          ],
        },
      ],
    }),

    // ── Metadata
    defineField({
      name: "source",
      title: "Source Page",
      type: "string",
      description: "URL where the conversation happened",
    }),
    defineField({
      name: "firstSeenAt",
      title: "First Seen",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "lastActiveAt",
      title: "Last Active",
      type: "datetime",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 3,
      description: "Your follow-up notes (not visible to visitor)",
    }),
  ],

  // ── Studio preview
  preview: {
    select: {
      title:    "visitorName",
      subtitle: "goalSummary",
      status:   "leadStatus",
      score:    "leadScore",
    },
    prepare({ title, subtitle, status, score }) {
      const statusEmoji: Record<string, string> = {
        new:       "🆕",
        partial:   "📋",
        qualified: "✅",
        hot:       "🔥",
        contacted: "📞",
        closed:    "✔️",
      };
      return {
        title:    title || "Anonymous Visitor",
        subtitle: `${statusEmoji[status] ?? "?"} ${status?.toUpperCase() ?? "NEW"} · Score: ${score ?? 0} · ${subtitle ?? "No summary yet"}`,
      };
    },
  },

  // ── Ordering in Studio
  orderings: [
    {
      title: "Newest First",
      name:  "lastActiveDesc",
      by:    [{ field: "lastActiveAt", direction: "desc" }],
    },
    {
      title: "Hottest Leads",
      name:  "scoreDesc",
      by:    [{ field: "leadScore", direction: "desc" }],
    },
  ],
});