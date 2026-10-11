"use client";
import { Component, type ReactNode } from "react";
import LegacyPreview from "./LegacyPreview";
export function CapabilityDescription({ children }: { children: ReactNode }) {
  return (
    <>
      <p className="hidden sm:block mt-3 text-sm font-light text-[#666666] leading-[1.7]">
        {children}
      </p>
      <details className="capability-details mt-3 sm:hidden">
        <summary className="text-sm font-medium">
          Details <span aria-hidden="true">+</span>
        </summary>
        <p className="mt-3 text-sm font-light text-[#666666] leading-[1.7]">
          {children}
        </p>
      </details>
    </>
  );
}
export function CaseEvidence() {
  return (
    <p className="px-5 py-3 text-xs leading-5 text-[#666] border-b border-black/10 bg-[#fafafa]">
      Real client project — identifying names have been changed to protect the client.{" "}
      The interactive preview uses sample data and simulated actions, not the
      client’s live system.
    </p>
  );
}

export function ExampleNavigation<T extends string>({
  id,
  tabs,
  active,
  onSelect,
}: {
  id: string;
  tabs: { id: T; label: string }[];
  active: T;
  onSelect: (tab: T) => void;
}) {
  const jump = (target: string) =>
    document.getElementById(target)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  return (
    <nav aria-label="Explore this example" className="example-navigation">
      <p className="w-full text-xs leading-5 text-[#475467]">
        Try selected workflows in the preview. Read the project sections for the
        full scope and delivery story.
      </p>
      <a
        href={`#${id}-preview`}
        onClick={(event) => {
          event.preventDefault();
          jump(`${id}-preview`);
        }}
      >
        Try the demo ↓
      </a>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          aria-pressed={active === tab.id}
          onClick={() => {
            onSelect(tab.id);
            jump(`${id}-reading`);
          }}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
class DemoBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p role="alert">
        The demo could not load. The full story and delivery details remain
        available.
      </p>
    ) : (
      this.props.children
    );
  }
}
export function CaseDemo({ id }: { id: string }) {
  return (
    <div id={`${id}-preview`} className="min-w-0">
      <DemoBoundary>
        <LegacyPreview id={id} />
      </DemoBoundary>
    </div>
  );
}
