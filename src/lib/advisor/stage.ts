// src/lib/advisor/stage.ts
// ─────────────────────────────────────────────────────────────────────────────
// GITS AI Advisor — discovery stage progression.
//
// Intent-aware on purpose: a turn spent answering a question does NOT consume a
// discovery stage. Someone who asks three factual questions before saying a word
// about their own situation should still be at stage 1 afterwards, not shoved
// into a close they were never interviewed for. The old counter advanced on
// every message, so a visitor who only asked about pricing and timelines got
// "So if I'm understanding correctly..." about a project they had never
// described.
// ─────────────────────────────────────────────────────────────────────────────

import type { Intent } from "./intent";
import type { DiscoveryStage } from "./prompt";

export const STAGE_ORDER: DiscoveryStage[] = [
  "goal", "situation", "pain", "impact", "qualification", "recommendation",
];

/** Discovery turns needed before a stage hands over to the next. */
const STAGE_THRESHOLDS: Partial<Record<DiscoveryStage, number>> = {
  goal:          2,
  situation:     4,
  pain:          6,
  impact:        8,
  qualification: 11,
};

export function isStage(v: unknown): v is DiscoveryStage {
  return typeof v === "string" && (STAGE_ORDER as string[]).includes(v);
}

export function nextStage(opts: {
  stage: DiscoveryStage;
  intent: Intent;
  /** Discovery (non-question) visitor turns so far, including this one. */
  discoveryTurns: number;
  reply: string;
}): DiscoveryStage {
  const { stage, intent, discoveryTurns, reply } = opts;

  // The model opening with its recap is the strongest signal we have that it
  // has moved to the close.
  if (
    reply.includes("So if I'm understanding correctly") ||
    reply.includes("Based on everything you've told me")
  ) {
    return "recommendation";
  }

  if (stage === "recommendation") return stage;

  // Answering a question is not discovery progress — hold position.
  if (intent !== "discovery") return stage;

  const threshold = STAGE_THRESHOLDS[stage];
  if (threshold != null && discoveryTurns >= threshold) {
    const i = STAGE_ORDER.indexOf(stage);
    return STAGE_ORDER[Math.min(i + 1, STAGE_ORDER.length - 1)];
  }
  return stage;
}
