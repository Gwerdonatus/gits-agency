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
