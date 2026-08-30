// src/components/service-icons.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Hairline system icons for the service pages.
//
// These replace the emoji (🏫 🏨 📊) that previously labelled each category.
// Emoji render differently on every OS, carry their own colour, and read as
// placeholder — all three fight the monochrome editorial system. These are
// drawn on one 32×32 grid at a single stroke weight so the set reads as a
// family and stays legible at a glance.
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";

type IconProps = { className?: string };

const base = (className?: string) => ({
  viewBox: "0 0 32 32",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: className ?? "w-9 h-9",
  "aria-hidden": true,
});

/** Stacked layers — multi-tenant platform */
export const SaasIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M16 4 28 10 16 16 4 10Z" />
    <path d="M4 16 16 22 28 16" />
    <path d="M4 22 16 28 28 22" />
  </svg>
);

/** Tower crane — site management */
export const ConstructionIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M9 28V7h17" />
    <path d="M4 7h5" />
    <path d="M9 7 15 13" />
    <path d="M21 7v6" />
    <path d="M18 13h6v5h-6z" />
    <path d="M5 28h8" />
  </svg>
);

/** Factory roofline — production operations */
export const ManufacturingIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 27V17l7 4v-4l7 4v-6h10v12Z" />
    <path d="M25 15V8h3v7" />
    <path d="M22 23h3" />
  </svg>
);

/** Cross in a circle — healthcare and pharmacy */
export const HealthcareIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="16" cy="16" r="11" />
    <path d="M16 10v12M10 16h12" />
  </svg>
);

/** Box truck — fleet and logistics */
export const FleetIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 10h13v11H4z" />
    <path d="M17 14h5l4 4v3h-9" />
    <circle cx="10" cy="23" r="2.4" />
    <circle cx="21" cy="23" r="2.4" />
    <path d="M4 21h3.6M12.4 21h6.2" />
  </svg>
);

/** Mortarboard — school management */
export const SchoolIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M16 6 29 12 16 18 3 12Z" />
    <path d="M8 15v6c0 2 3.6 3.4 8 3.4s8-1.4 8-3.4v-6" />
    <path d="M29 12v6" />
  </svg>
);

/** Bed — hospitality operations */
export const HotelIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 24V11" />
    <path d="M4 18h24v6" />
    <path d="M7 14h7v4H7z" />
    <path d="M4 24h24" />
  </svg>
);

/** Dashboard with bars — internal tools and CRM */
export const InternalToolsIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="4" y="6" width="24" height="20" rx="1" />
    <path d="M4 12h24" />
    <path d="M9 21v-4M14 21v-6M19 21v-3M24 21v-7" />
  </svg>
);

/** Keyed by the slug stored on each WHAT_WE_BUILD entry. */
export const SERVICE_ICONS = {
  saas: SaasIcon,
  construction: ConstructionIcon,
  manufacturing: ManufacturingIcon,
  healthcare: HealthcareIcon,
  fleet: FleetIcon,
  school: SchoolIcon,
  hotel: HotelIcon,
  internal: InternalToolsIcon,
} as const;

export type ServiceIconKey = keyof typeof SERVICE_ICONS;

/* ─────────────────────────────────────────────────────────────────────────────
   Second set, covering the categories on the automation, internal-tools and
   integrations pages. Same 32x32 grid and stroke weight as the set above, so
   every service page draws from one visual family.
   ───────────────────────────────────────────────────────────────────────── */

/** Agent head — autonomous AI agents */
export const AgentIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="7" y="10" width="18" height="14" rx="3" />
    <path d="M16 6.5V10" />
    <circle cx="16" cy="5" r="1.5" />
    <path d="M12.5 15.5v2M19.5 15.5v2" />
    <path d="M13 20.5h6" />
  </svg>
);

/** Page with a fold — document handling and onboarding */
export const DocumentIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M8 4h11l5 5v19H8z" />
    <path d="M19 4v5h5" />
    <path d="M12 16h8M12 21h8" />
  </svg>
);

/** Linked nodes in a circle — language models */
export const ModelIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="16" cy="16" r="11" />
    <circle cx="12" cy="13" r="1.5" />
    <circle cx="20" cy="13" r="1.5" />
    <circle cx="16" cy="21" r="1.5" />
    <path d="M13.4 13.6h5.2M12.7 14.4 15 19.6M19.3 14.4 17 19.6" />
  </svg>
);

/** Page with bars — automated reporting */
export const ReportIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="7" y="4" width="18" height="24" rx="1" />
    <path d="M12 23v-5M16 23v-9M20 23v-3" />
  </svg>
);

/** Branching nodes — workflow automation */
export const WorkflowIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="7" cy="8" r="3" />
    <circle cx="25" cy="8" r="3" />
    <circle cx="16" cy="25" r="3" />
    <path d="M7 11v5h18v-5M16 16v6" />
  </svg>
);

/** Speech bubble — messaging sequences */
export const MessageIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M5 8h22v13H14l-6 5v-5H5z" />
    <path d="M11 14.5h10" />
  </svg>
);

/** Angle brackets — APIs and custom endpoints */
export const ApiIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M11 10 5 16l6 6M21 10l6 6-6 6" />
    <path d="M18.5 7 13.5 25" />
  </svg>
);

/** Card — payment gateways */
export const PaymentIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="3" y="7" width="26" height="18" rx="2" />
    <path d="M3 13h26" />
    <path d="M8 19.5h6" />
  </svg>
);

/** Pin — maps and routing */
export const MapIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M16 28s9-8.6 9-15a9 9 0 1 0-18 0c0 6.4 9 15 9 15z" />
    <circle cx="16" cy="13" r="3.4" />
  </svg>
);

/** Ledger — accounting and ERP */
export const LedgerIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="7" y="4" width="18" height="24" rx="2" />
    <path d="M11 10h10" />
    <path d="M11 16h3M18 16h3M11 21h3M18 21h3" />
  </svg>
);

/** Badge with a person — identity and KYC */
export const IdentityIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="4" y="6" width="24" height="20" rx="2" />
    <circle cx="13" cy="14" r="3" />
    <path d="M8.5 21.5c1.1-2.3 2.7-3.4 4.5-3.4s3.4 1.1 4.5 3.4" />
    <path d="M21 13h4M21 17h4" />
  </svg>
);

/** Parcel — shipping and logistics APIs */
export const ParcelIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M16 4 28 10.5v11L16 28 4 21.5v-11z" />
    <path d="M4 10.5 16 17l12-6.5M16 17v11" />
  </svg>
);

/** Plotted line — analytics pipelines */
export const AnalyticsIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M5 5v22h22" />
    <path d="M9 21l5-6 4 4 7-9" />
  </svg>
);

/** Calendar — booking and scheduling */
export const CalendarIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="4" y="7" width="24" height="21" rx="2" />
    <path d="M4 13h24M11 4v6M21 4v6" />
    <path d="M11 19h3M18 19h3" />
  </svg>
);

/** Columned facade — banking and financial data */
export const BankIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 12 16 5l12 7" />
    <path d="M8 12v11M14 12v11M18 12v11M24 12v11" />
    <path d="M4 26h24" />
  </svg>
);

/** Contact card — CRM systems */
export const CrmIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="4" y="7" width="24" height="19" rx="2" />
    <circle cx="12" cy="14.5" r="3" />
    <path d="M7.5 21.5c1-2.2 2.6-3.2 4.5-3.2s3.5 1 4.5 3.2" />
    <path d="M20 13h4.5M20 17.5h4.5" />
  </svg>
);

/** Two figures — staff and HR */
export const PeopleIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="11" r="4" />
    <path d="M4.5 25c1.6-4 4.3-6 7.5-6s5.9 2 7.5 6" />
    <circle cx="23" cy="12.5" r="3" />
    <path d="M21 19.2c.7-.3 1.3-.4 2-.4 2.2 0 4 1.6 5 4.4" />
  </svg>
);

/** Perforated ticket — service desks */
export const TicketIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 10h24v4a3 3 0 0 0 0 6v4H4v-4a3 3 0 0 0 0-6z" />
    <path d="M19 11.5v3M19 17.5v3" />
  </svg>
);

/** Stacked cartons — inventory and stock */
export const InventoryIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="4" y="17" width="11" height="9" />
    <rect x="17" y="17" width="11" height="9" />
    <rect x="10.5" y="7" width="11" height="9" />
  </svg>
);

/** Invoice — quotations and billing */
export const InvoiceIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M8 4h13l4 4v20H8z" />
    <path d="M21 4v4h4" />
    <path d="M13 15h7M13 20h7" />
  </svg>
);

/** Shield with a lock — client and vendor portals */
export const PortalIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M16 4 27 8v8c0 6.9-5 10.9-11 12C10 26.9 5 22.9 5 16V8z" />
    <rect x="12.5" y="15" width="7" height="6" rx="1" />
    <path d="M14 15v-1.6a2 2 0 0 1 4 0V15" />
  </svg>
);

/** Keyed by the concept each category represents. */
export const CONCEPT_ICONS = {
  agent: AgentIcon,
  document: DocumentIcon,
  model: ModelIcon,
  report: ReportIcon,
  workflow: WorkflowIcon,
  message: MessageIcon,
  api: ApiIcon,
  payment: PaymentIcon,
  map: MapIcon,
  ledger: LedgerIcon,
  identity: IdentityIcon,
  parcel: ParcelIcon,
  analytics: AnalyticsIcon,
  calendar: CalendarIcon,
  bank: BankIcon,
  crm: CrmIcon,
  people: PeopleIcon,
  ticket: TicketIcon,
  inventory: InventoryIcon,
  invoice: InvoiceIcon,
  portal: PortalIcon,
  dashboard: InternalToolsIcon,
} as const;

export type ConceptIconKey = keyof typeof CONCEPT_ICONS;
