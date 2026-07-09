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
      alternateName: ["GITS Agency", "Gwer Intelligent Tech Solutions"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${IMG_ROOT}/seo/schema-logo-600x120.png`,
        width: 600,
        height: 120,
      },
      image: `${IMG_ROOT}/social/og-image.png`,
      description:
        "GITS (Gwer Intelligent Tech Solutions) is a premium digital agency building SaaS platforms, mobile apps, AI automation systems, internal tools, and websites for startups and businesses globally. Founded by Gwer Msughter Donatus.",
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
        "Web Engineering",
        "UI/UX Design",
        "Next.js",
        "React Native",
        "Business Process Automation",
        "Internal Tools Development",
        "Chrome Extension Development",
        "API Development",
        "DevOps",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "GITS Digital Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Platform Development"  } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development"     } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation & Agents"     } },
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
      description: "Premium digital agency building SaaS, mobile apps, AI automation, and websites for startups and businesses globally.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    }} />
  );
}

// ─── 3. SERVICES (individual Service schemas) ─────────────────────────────────
// Each service gets its own schema for maximum topical coverage.
export function ServicesSchema() {
  const services = [
    {
      name: "Custom Software Development",
      description:
        "GITS builds SaaS platforms, online marketplaces, booking systems, membership platforms, and enterprise applications tailored to your business workflows.",
      url: `${SITE_URL}/services`,
      offers: { price: "5000", priceCurrency: "USD", priceSpecification: "Starting from $5,000" },
    },
    {
      name: "Website Design & Development",
      description:
        "Modern, conversion-first websites built with Next.js — from landing pages to full e-commerce stores. Mobile-first, fast-loading, and SEO-optimised.",
      url: `${SITE_URL}/services`,
      offers: { price: "500", priceCurrency: "USD", priceSpecification: "Starting from $500" },
    },
    {
      name: "AI Automation & Business Automation",
      description:
        "Custom AI assistants, chatbots, lead qualification systems, WhatsApp automation, and workflow automation for businesses seeking to scale without extra headcount.",
      url: `${SITE_URL}/services`,
      offers: { price: "1000", priceCurrency: "USD", priceSpecification: "Starting from $1,000" },
    },
    {
      name: "Mobile App Development",
      description:
        "iOS and Android mobile app MVPs built with React Native. From concept to launch in 4–8 weeks with a stable, scalable foundation.",
      url: `${SITE_URL}/services`,
      offers: { price: "3000", priceCurrency: "USD", priceSpecification: "Starting from $3,000" },
    },
    {
      name: "Internal Tools & CRM Systems",
      description:
        "Custom CRM systems, inventory management, admin dashboards, employee portals, and operations management tools for multi-branch businesses and organisations.",
      url: `${SITE_URL}/services`,
      offers: { price: "2000", priceCurrency: "USD", priceSpecification: "Starting from $2,000" },
    },
    {
      name: "Integrations & API Development",
      description:
        "Payment integrations (Stripe, Paystack), REST and GraphQL APIs, CRM integrations, WhatsApp automation, and third-party service connections.",
      url: `${SITE_URL}/services`,
      offers: { price: "1000", priceCurrency: "USD", priceSpecification: "Starting from $1,000" },
    },
  ];

  return (
    <>
      {services.map((s) => (
        <LD key={s.name} data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${SITE_URL}/#service-${s.name.toLowerCase().replace(/\s+/g, "-")}`,
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