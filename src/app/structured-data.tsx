// src/app/structured-data.tsx
// ─────────────────────────────────────────────────────────────────────────────
// All JSON-LD structured data for GITS.
// Import the relevant component(s) into each page's <head> or server layout.
//
// Usage:
//   import { OrganizationSchema, WebSiteSchema } from "@/app/structured-data";
//   // in layout.tsx <head>:
//   <OrganizationSchema />
//   <WebSiteSchema />
//
//   // in services/page.tsx (server wrapper):
//   <ServicesSchema />
//   <BreadcrumbSchema items={[...]} />
//
//   // in audit/page.tsx (server wrapper):
//   <FAQSchema faqs={AUDIT_FAQS} />
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL  = "https://gits.technology";
const IMG_ROOT  = `${SITE_URL}/GITS_Complete_Image_Package`;
const SITE_NAME = "GITS";

// ─── HELPER ──────────────────────────────────────────────────────────────────
function LD({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

// ─── 1. ORGANIZATION ─────────────────────────────────────────────────────────
// Core entity. Google uses this to build the knowledge panel.
// sameAs links to all social profiles = crucial for entity disambiguation.
export function OrganizationSchema() {
  return (
    <LD data={{
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "GITS",
      legalName: "Gwer Intelligent Tech Solutions",
      alternateName: ["GITS Agency", "Gwer Intelligent Tech Solutions", "GITS Technology"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${IMG_ROOT}/seo/schema-logo-600x120.png`,
        width: 600,
        height: 120,
      },
      image: `${IMG_ROOT}/social/og-image.png`,
      description:
        "GITS (Gwer Intelligent Tech Solutions) is a premium AI agency and digital product studio building SaaS platforms, mobile apps, AI automation systems, WhatsApp AI agents, internal tools, and websites for startups and businesses globally. Founded by Gwer Msughter Donatus.",
      slogan: "clarity · speed · quality",
      foundingDate: "2022",
      founder: {
        "@type": "Person",
        name: "Gwer Msughter Donatus",
        jobTitle: "Founder & Lead Engineer",
        url: `${SITE_URL}/#founder`,
        sameAs: [
          "https://github.com/donatusgwer",
          "https://linkedin.com/in/donatusgwer",
        ],
      },
      employee: [
        { "@type": "Person", name: "Aisha Adeyemi",   jobTitle: "UI/UX Lead"             },
        { "@type": "Person", name: "Chinedu Okafor",  jobTitle: "Senior Engineer"         },
        { "@type": "Person", name: "Tomi Afolayan",   jobTitle: "DevOps Engineer"         },
        { "@type": "Person", name: "Nneka Eze",       jobTitle: "Backend & Security Lead" },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "NG",
        addressRegion: "Abuja",
      },
      areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "AdministrativeArea", name: "Africa" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      knowsAbout: [
        "SaaS Development",
        "Mobile App Development",
        "AI Automation",
        "AI Agents",
        "WhatsApp AI Agents",
        "WhatsApp Business API",
        "Web Engineering",
        "UI/UX Design",
        "Next.js",
        "React Native",
        "Business Process Automation",
        "Internal Tools Development",
        "Chrome Extension Development",
        "API Development",
        "DevOps",
        "Custom Software Development",
        "E-commerce Development",
        "CRM Systems",
        "Workflow Automation",
        "LLM Integration",
        "OpenAI Integration",
        "Claude Integration",
        "Retrieval-Augmented Generation",
        "Chatbot Development",
        "Conversational AI",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "GITS Digital Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Platform Development"  } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development"     } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation & Agents"     } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp AI Agents"         } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Design & Development"} },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Internal Tools & CRM Systems"} },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Integrations & APIs"         } },
        ],
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          url: `${SITE_URL}/contact`,
          availableLanguage: "English",
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: "+2348116276212",
          availableLanguage: "English",
        },
        {
          "@type": "ContactPoint",
          contactType: "WhatsApp",
          telephone: "+2348116276212",
          url: "https://wa.me/2348116276212",
          availableLanguage: "English",
        },
      ],
      email: "hellogits@outlook.com",
      telephone: "+2348116276212",
      sameAs: [
        "https://wa.me/2348116276212",
        "https://calendly.com/donatusgwer",
        "https://github.com/donatusgwer",
        "https://linkedin.com/company/gits-agency",
        // Add Twitter/X, Instagram when live
      ],
    }} />
  );
}

// ─── 2. WEBSITE ──────────────────────────────────────────────────────────────
// Establishes the site entity and enables Sitelinks Searchbox in Google.
export function WebSiteSchema() {
  return (
    <LD data={{
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: "Premium AI agency and digital product studio building SaaS, mobile apps, AI automation, WhatsApp AI agents, and websites for startups and businesses globally.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    }} />
  );
}

// ─── 3. SERVICES (individual Service schemas) ─────────────────────────────────
// Each service gets its own schema for maximum topical coverage.
// REAL slugs from your services page code:
//   custom-software-development
//   websites-digital-experiences
//   ai-business-automation
//   internal-tools-crm
//   integrations-apis
//   whatsapp-ai-agents (NEW)
export function ServicesSchema() {
  const services = [
    {
      name: "Custom Software Development",
      description:
        "GITS builds SaaS platforms, online marketplaces, booking systems, membership platforms, customer portals, vendor management systems, business management software, and enterprise applications tailored to your business workflows.",
      url: `${SITE_URL}/services/custom-software-development`,
      offers: { price: "5000", priceCurrency: "USD", priceSpecification: "Starting from $5,000" },
    },
    {
      name: "Website Design & Development",
      description:
        "Modern, conversion-first websites and digital experiences built with Next.js — business & corporate websites, e-commerce stores, landing pages, portfolio websites, event websites, and marketing websites. Mobile-first, fast-loading, and SEO-optimised.",
      url: `${SITE_URL}/services/websites-digital-experiences`,
      offers: { price: "500", priceCurrency: "USD", priceSpecification: "Starting from $500" },
    },
    {
      name: "AI Automation & Business Automation",
      description:
        "Custom AI assistants, chatbots, lead qualification systems, workflow automation, reporting automation, WhatsApp automation, email automation, AI-powered business tools, and custom AI integrations. We integrate OpenAI GPT-4, Claude, and other LLMs into business workflows.",
      url: `${SITE_URL}/services/ai-business-automation`,
      offers: { price: "1000", priceCurrency: "USD", priceSpecification: "Starting from $1,000" },
    },
    {
      name: "WhatsApp AI Agents",
      description:
        "Custom AI-powered conversational agents built on WhatsApp Business API. Automate customer support, lead qualification, sales, appointment booking, and order tracking. Integrates with CRMs and helpdesks. Multi-language support with human handoff. Built with OpenAI GPT-4, Claude, and custom LLMs.",
      url: `${SITE_URL}/services/whatsapp-ai-agents`,
      offers: { price: "1000", priceCurrency: "USD", priceSpecification: "Starting from $1,000" },
    },
    {
      name: "Internal Tools & CRM Systems",
      description:
        "Custom CRM systems, inventory management systems, admin dashboards, employee portals, reporting platforms, vendor management systems, internal workflow tools, and operations management systems for multi-branch businesses and organizations.",
      url: `${SITE_URL}/services/internal-tools-crm`,
      offers: { price: "2000", priceCurrency: "USD", priceSpecification: "Starting from $2,000" },
    },
    {
      name: "Integrations & API Development",
      description:
        "Payment integrations (Stripe, Paystack), REST & GraphQL API development, CRM & marketing integrations, WhatsApp & email integrations, data synchronization pipelines, third-party service integrations, custom automation workflows, and webhook & event systems.",
      url: `${SITE_URL}/services/integrations-apis`,
      offers: { price: "1000", priceCurrency: "USD", priceSpecification: "Starting from $1,000" },
    },
  ];

  return (
    <>
      {services.map((s) => (
        <LD key={s.name} data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${SITE_URL}/#service-${s.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`,
          name: s.name,
          description: s.description,
          url: s.url,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "Worldwide",
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: `${SITE_URL}/contact`,
          },
          offers: {
            "@type": "Offer",
            price: s.offers.price,
            priceCurrency: s.offers.priceCurrency,
            description: s.offers.priceSpecification,
            availability: "https://schema.org/InStock",
          },
        }} />
      ))}
    </>
  );
}

// ─── 4. FAQ PAGE SCHEMA ───────────────────────────────────────────────────────
// Powers FAQ rich results in Google + gets pulled by AI answer engines.
export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <LD data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    }} />
  );
}

// ─── 5. BREADCRUMB ────────────────────────────────────────────────────────────
// Powers breadcrumb rich results in Google SERPs.
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <LD data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }} />
  );
}

// ─── 6. ARTICLE (for blog posts) ─────────────────────────────────────────────
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return (
    <LD data={{
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: title,
      description,
      url,
      datePublished,
      dateModified: dateModified ?? datePublished,
      image: image ?? `${IMG_ROOT}/social/og-image.png`,
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: "en-US",
    }} />
  );
}

// ─── 7. LOCAL BUSINESS (optional, if you want local SEO) ──────────────────────
export function LocalBusinessSchema() {
  return (
    <LD data={{
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "GITS",
      description: "Premium AI agency and digital product studio in Abuja, Nigeria. Building custom software, AI automation, and WhatsApp AI agents for global clients.",
      url: SITE_URL,
      telephone: "+2348116276212",
      email: "hellogits@outlook.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NG",
        addressRegion: "Abuja",
        addressLocality: "Abuja",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "9.0765",
        longitude: "7.3986",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "$$$",
      areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
    }} />
  );
}