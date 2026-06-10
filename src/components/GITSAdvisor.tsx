"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   GITS AI ADVISOR — 3D Robot Edition (White / Box Head)
   + Enhanced UX v2 merged over your updated main file

   UX additions:
   · Smart auto-scroll — only follows bottom when you're already there
   · Scroll-to-bottom FAB with "N new" badge when scrolled up
   · Persistent clear-chat button in header (always visible)
   · Inline confirm strip — no accidental clears
   · Animated status dot reacts to robot mood (amber=thinking, green=talking)
   · Quick-reply chips scroll horizontally on mobile (no layout jump)
   · Send button becomes a spinner while waiting
   · Footer keyboard hint  ↵ send · shift+↵ new line
   · Enhanced typing indicator with "typing" label
   + Sanity integration patch:
   · Stable session ID per visitor/day (localStorage)
   · sessionId + source URL forwarded to /api/chat
   · fireCTAPush() fires enriched push on CTA clicks
   · CTA link clicks inside messages are intercepted
   · Speech bubble "Let's talk" fires a push too
   + Sales rep enforcement patch (Fix 1–4):
   · FIX 1: SYSTEM_PROMPT now wired into every API call (was unused)
   · FIX 2: discoveryStage tracked per-session (goal→situation→pain→
     impact→qualification→recommendation) — sent in context so route
     knows exactly what question to enforce next
   · FIX 3: QUICK_INITIAL chips rewritten to open-ended Stage-1
     openers — visitor lands in discovery, not solution mode
   · FIX 4: route.ts injects discoveryStage as a hard per-turn
     instruction, not just a guideline
═══════════════════════════════════════════════════════════════ */

const API_ENDPOINT = "/api/chat";

const SYSTEM_PROMPT = `You are the GITS AI Advisor — a sharp, friendly, senior member of the GITS team (Gwer Intelligent Tech Solutions). You're not a generic chatbot. You think like a real tech consultant who genuinely wants to help visitors figure out what they need and move toward building it with GITS.

GITS at a glance:
- Full name: Gwer Intelligent Tech Solutions
- Tagline: clarity · speed · quality
- Fully remote, global clients
- Founded by Gwer Msughter Donatus — backend engineer, AI systems, product thinker
- Senior team: Aisha Adeyemi (UI/UX), Chinedu Okafor (Engineering), Tomi Afolayan (DevOps), Nneka Eze (Backend/Security)

Services & realistic pricing:
- Landing page / small site: $500–$2k · 1–2 weeks
- Multi-page website: $1k–$5k · 2–4 weeks
- Mobile app MVP (iOS + Android): $3k–$10k+ · 4–8 weeks
- SaaS / web app: $5k–$20k+ · 4–10 weeks
- AI automation / chatbots / workflows: $1k–$8k · 1–4 weeks
- Internal tools / CRM / dashboards: $2k–$10k · 2–6 weeks
- Chrome extension: $500–$3k · 1–3 weeks
- Integrations / API work: $1k–$5k · 1–3 weeks
- Design only (Figma/UI/UX): custom · 1–3 weeks

Tech stack: Next.js, React, TypeScript, Node.js, PostgreSQL, React Native, Vercel/AWS/GCP, OpenAI, Claude, Stripe, HubSpot, Salesforce, Notion, Docker, CI/CD

Key links — include one naturally at the right moment (not every reply):
- Contact / start project: https://gits.donatusgwer.workers.dev/contact
- Free site audit: https://gits.donatusgwer.workers.dev/audit
- Services page: https://gits.donatusgwer.workers.dev/services
- Portfolio: https://gits.donatusgwer.workers.dev/what-we-build
- WhatsApp (fastest): https://wa.me/2348116276212
- Book a call: https://calendly.com/donatusgwer
- Email: hellogits@outlook.com

---

BEHAVIOR PRIORITY ORDER

1. Understand before advising
2. Diagnose before recommending
3. Ask before assuming
4. Clarify before quoting
5. Help before selling

The visitor should feel: "This person actually gets what I'm trying to do."
NOT: "This chatbot is trying to sell me something."

Every answer should either:
- uncover information
- clarify information
- validate information
- move toward a recommendation

Never skip steps.

---

SALES METHODOLOGY (VERY IMPORTANT)

You are not a support chatbot.

You are a highly skilled discovery salesperson and solutions consultant.

Your primary goal is NOT to sell. Your primary goal is to understand.

People buy when they feel understood.

Always slow down and gather context before recommending solutions.

Think like a salesperson running a discovery call.

Every response should move the conversation one step deeper.

Never interrogate the visitor. Never ask multiple discovery questions at once.

Ask ONE thoughtful question at a time. Keep the conversation natural.

Do not immediately pitch GITS after hearing a problem.

Understand in this order:
1. What they are trying to achieve
2. Why it matters
3. What they currently do
4. What is not working
5. What happens if they do nothing
6. Their timeline
7. Their budget
8. Who makes decisions

Only after understanding these should you discuss solutions.

When the visitor is vague, ask clarifying questions. One question. Wait. Then continue.

Example:
Visitor: "I need a website."
Bad: "What type of website? What's your budget? What's your timeline?"
Good: "Happy to help. What's the main thing you want the website to do for your business?"

---

DISCOVERY FRAMEWORK — use this sequence naturally

Stage 1 — Goal Discovery: Understand what they want.
"What are you hoping this helps you accomplish?"
"What made you start looking into this now?"
"What's the end result you're aiming for?"

Stage 2 — Current Situation: Understand what exists today.
"How are you handling that currently?"
"Do you already have something in place?"
"What's your current process?"

Stage 3 — Pain Discovery: Find friction.
"What's been the biggest challenge so far?"
"What's frustrating about the current setup?"
"What's stopping you from getting the result you want?"

Stage 4 — Impact: Understand consequences.
"How is that affecting the business today?"
"What happens if this isn't solved in the next few months?"

Stage 5 — Qualification: Only after understanding the problem.
"Do you have a target launch date in mind?"
"Have you set aside a budget for this yet?"
"Who else would be involved in making the final decision?"

Stage 6 — Recommendation: Only after enough information.
Summarize what you heard: "So if I'm understanding correctly..."
Repeat their goal, current situation, problem, desired outcome.
Then recommend the appropriate service with pricing range and timeline.

---

CONVERSATION STYLE

Keep messages short. Usually under 100 words. Never send walls of text.

Use natural human language. Do not sound like ChatGPT or a corporate assistant.

Do not sound overly enthusiastic.

Avoid phrases like: "Absolutely!", "Certainly!", "I'd be delighted to help."

Instead sound like: "Got it." / "That makes sense." / "Interesting." / "Tell me more about that."

---

PRICING QUESTIONS

If the visitor asks pricing too early, do not dodge it.
Give a realistic range, but immediately seek context.

Example:
"A project like that is usually somewhere between $3k–$8k depending on what's involved.
Out of curiosity, what's the main thing you need the app to do?"

---

SUGGESTING A CALL

Do not push calls too early. A call is only suggested when:
- enough discovery has happened
- buying intent is clear
- complexity is high

When suggesting a call, never sound pushy:
"I think we're at the point where a quick 15-minute conversation would probably save a lot of back-and-forth. Would you prefer WhatsApp or a call?"

---

CONVERSATION MEMORY

You may receive a conversation summary in the context.
Treat it as facts already discovered. Never ask for information already learned.
Continue the conversation from where it left off. Reference previous details naturally.
The visitor should feel remembered.

---

LINKS

Use **markdown links** so they are clickable: [link text](url)
Only include a link when it's the natural next step — not at the end of every message.
If someone seems stuck, offer the free audit as the zero-risk next step.
Never hard-sell. Trust is the product. Be the advisor they wish they had.`;


const QUICK_INITIAL = [
  { label: "🌐 Website",       val: "I'm thinking about a website but not sure exactly what I need yet" },
  { label: "🤖 AI Automation", val: "I want to automate something in my business but haven't mapped it out" },
  { label: "📱 Mobile App",    val: "I have an idea for an app but it's still early" },
  { label: "🚀 SaaS Product",  val: "I want to build a product but need help thinking it through" },
  { label: "💰 Rough costs",   val: "I want to understand what something like this would cost before going further" },
  { label: "🤷 Not sure yet",  val: "I'm not sure what I need — I just know something needs to change" },
];
const QUICK_FOLLOWUP = [
  { label: "⏱ Timeline",       val: "how long would this typically take" },
  { label: "💰 Rough budget",   val: "what budget range should I have in mind" },
  { label: "🔍 Free audit",     val: "tell me about the free audit" },
  { label: "👋 Talk to someone", val: "I'd like to speak with someone directly" },
];

const VKEY = "gits_3d_v2";

function loadVisitor() {
  try { return JSON.parse(localStorage.getItem(VKEY) || "null"); } catch { return null; }
}
function saveVisitor(name: string, topic: string) {
  try { localStorage.setItem(VKEY, JSON.stringify({ name, topic, lastVisit: Date.now() })); } catch {}
}

/* ─── MINI AVATAR for chat messages ──────────────────────────── */
const AVATAR_SVG = `<svg viewBox="0 0 22 22" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;border-radius:50%;display:block;">
  <rect x="0" y="0" width="22" height="22" rx="5" fill="#f0f0ee"/>
  <rect x="2.5" y="6" width="17" height="12" rx="4" fill="#111110"/>
  <circle cx="7.5" cy="12" r="2.6" fill="rgba(255,255,255,.9)"/>
  <circle cx="14.5" cy="12" r="2.6" fill="rgba(255,255,255,.9)"/>
  <circle cx="7.5" cy="12" r="1.3" fill="#080807"/>
  <circle cx="14.5" cy="12" r="1.3" fill="#080807"/>
  <circle cx="8.1" cy="11.4" r=".55" fill="rgba(255,255,255,.5)"/>
  <circle cx="15.1" cy="11.4" r=".55" fill="rgba(255,255,255,.5)"/>
  <line x1="11" y1=".5" x2="11" y2="4" stroke="rgba(0,0,0,.3)" stroke-width="1.1" stroke-linecap="round"/>
  <circle cx="11" cy=".5" r="1.1" fill="rgba(0,0,0,.4)"/>
</svg>`;

/* ─── SPRING HELPER ──────────────────────────────────────────── */
function spring(
  current: number,
  target: number,
  velocity: number,
  stiffness = 0.13,
  damping = 0.74
) {
  const force = (target - current) * stiffness;
  const newVel = (velocity + force) * damping;
  return { value: current + newVel, velocity: newVel };
}

/* ─── BUILD THE 3D ROBOT — White / Box Head ──────────────────── */
function buildGITSRobot(THREE: any, scene: any) {

  /* ══════════════════════════════════════════
     MATERIALS — Pearl White palette
  ══════════════════════════════════════════ */

  const whiteMat = new THREE.MeshPhysicalMaterial({
    color: 0xF8F8F4,
    metalness: 0.10,
    roughness: 0.28,
    clearcoat: 0.85,
    clearcoatRoughness: 0.06,
  });

  const whiteLightMat = new THREE.MeshPhysicalMaterial({
    color: 0xFFFFFF,
    metalness: 0.06,
    roughness: 0.18,
    clearcoat: 0.95,
    clearcoatRoughness: 0.04,
  });

  const whiteOffMat = new THREE.MeshPhysicalMaterial({
    color: 0xE8E8E4,
    metalness: 0.08,
    roughness: 0.35,
    clearcoat: 0.50,
  });

  const veryDarkMat = new THREE.MeshPhysicalMaterial({
    color: 0x0C0C0B,
    metalness: 0.35,
    roughness: 0.55,
  });

  const darkPanelMat = new THREE.MeshPhysicalMaterial({
    color: 0x111110,
    metalness: 0.28,
    roughness: 0.62,
  });

  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x080807,
    metalness: 0.08,
    roughness: 0.04,
    transparent: true,
    opacity: 0.95,
  });

  const eyeWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.10,
    metalness: 0.0,
  });

  const eyePupilMat = new THREE.MeshStandardMaterial({
    color: 0x080807,
    roughness: 0.3,
  });

  const eyeShineMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 1.5,
  });

  const antGlowMat = new THREE.MeshStandardMaterial({
    color: 0xE8E8E4,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.9,
  });

  const earGlowMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.65,
  });

  const scanMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.55,
  });

  const chestLight1Mat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 1.1,
  });
  const chestLight2Mat = new THREE.MeshStandardMaterial({
    color: 0xDDDDDD, emissive: 0xFFFFFF, emissiveIntensity: 0.7,
  });
  const chestLight3Mat = new THREE.MeshStandardMaterial({
    color: 0xBBBBBB, emissive: 0xFFFFFF, emissiveIntensity: 0.4,
  });

  const mouthMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.55,
    transparent: true,
    opacity: 0.88,
  });

  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.10,
    depthWrite: false,
  });

  /* ── helper mesh factory ── */
  const M = (
    geo: any, mat: any,
    px = 0, py = 0, pz = 0,
    sx = 1, sy = 1, sz = 1,
    rx = 0, ry = 0, rz = 0
  ) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(px, py, pz);
    m.scale.set(sx, sy, sz);
    m.rotation.set(rx, ry, rz);
    return m;
  };

  const root      = new THREE.Group();
  const headGroup = new THREE.Group();
  headGroup.position.y = 3.50;
  root.add(headGroup);

  /* ════════════════════════════════════════════
     HEAD — BOX GEOMETRY (sharp cubic)
  ════════════════════════════════════════════ */

  const HEAD_W = 2.72;
  const HEAD_H = 2.18;
  const HEAD_D = 2.10;

  const skull = new THREE.Mesh(
    new THREE.BoxGeometry(HEAD_W, HEAD_H, HEAD_D, 1, 1, 1),
    whiteLightMat
  );
  headGroup.add(skull);

  const topEdge = new THREE.Mesh(
    new THREE.BoxGeometry(HEAD_W - 0.04, 0.08, HEAD_D - 0.04),
    new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.05,
      roughness: 0.10,
      clearcoat: 1.0,
    })
  );
  topEdge.position.y = HEAD_H / 2 + 0.04;
  headGroup.add(topEdge);

  [-HEAD_W / 2 - 0.01, HEAD_W / 2 + 0.01].forEach((x, i) => {
    const sidePanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, HEAD_H * 0.70, HEAD_D * 0.68),
      whiteOffMat
    );
    sidePanel.position.set(x, 0.05, 0);
    headGroup.add(sidePanel);
  });

  /* ════════════════════════════════════════════
     VISOR HOUSING — flush-mounted into box face
  ════════════════════════════════════════════ */

  const VISOR_FRONT_Z = HEAD_D / 2;

  const visorHousing = new THREE.Mesh(
    new THREE.BoxGeometry(2.20, 1.38, 0.18),
    veryDarkMat
  );
  visorHousing.position.set(0, 0.08, VISOR_FRONT_Z - 0.01);
  headGroup.add(visorHousing);

  const visorGlass = new THREE.Mesh(
    new THREE.BoxGeometry(2.02, 1.22, 0.09),
    visorMat
  );
  visorGlass.position.set(0, 0.08, VISOR_FRONT_Z + 0.06);
  headGroup.add(visorGlass);

  /* ── SCAN LINE ── */
  const scanLine = new THREE.Mesh(
    new THREE.BoxGeometry(1.94, 0.055, 0.06),
    scanMat
  );
  scanLine.position.set(0, 0.08, VISOR_FRONT_Z + 0.10);
  headGroup.add(scanLine);

  /* ════════════════════════════════════════════
     EYES
  ════════════════════════════════════════════ */

  const EYE_X_OFFSET = 0.52;
  const EYE_Y        = 0.22;
  const EYE_Z        = VISOR_FRONT_Z + 0.12;
  const EYE_RADIUS   = 0.255;

  function makeEye(xPos: number) {
    const g = new THREE.Group();
    g.position.set(xPos, EYE_Y, EYE_Z);

    const white = new THREE.Mesh(
      new THREE.SphereGeometry(EYE_RADIUS, 24, 18),
      eyeWhiteMat
    );
    g.add(white);

    const pupil = new THREE.Mesh(
      new THREE.CylinderGeometry(0.115, 0.115, 0.035, 20),
      eyePupilMat
    );
    pupil.rotation.x = Math.PI / 2;
    pupil.position.set(0, 0, EYE_RADIUS - 0.01);
    g.add(pupil);

    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.048, 10, 8),
      eyeShineMat
    );
    shine.position.set(0.072, 0.072, EYE_RADIUS + 0.018);
    g.add(shine);

    return { group: g, pupil, shine };
  }

  const eyeL = makeEye(-EYE_X_OFFSET);
  const eyeR = makeEye( EYE_X_OFFSET);
  headGroup.add(eyeL.group, eyeR.group);

  /* ── MOUTH SLIT ── */
  const mouth = new THREE.Mesh(
    new THREE.BoxGeometry(0.98, 0.095, 0.07),
    mouthMat
  );
  mouth.position.set(0, -0.55, VISOR_FRONT_Z + 0.10);
  headGroup.add(mouth);

  /* ════════════════════════════════════════════
     ANTENNAS
  ════════════════════════════════════════════ */

  const antLGroup = new THREE.Group();
  antLGroup.position.set(-HEAD_W * 0.28, HEAD_H / 2, 0.08);
  antLGroup.add(M(new THREE.CylinderGeometry(0.040, 0.062, 0.82, 8), whiteMat, 0, 0.41, 0));
  const antLOrb = new THREE.Mesh(new THREE.SphereGeometry(0.155, 14, 12), antGlowMat);
  antLOrb.position.set(0, 0.88, 0);
  antLGroup.add(antLOrb);
  antLGroup.add(M(new THREE.SphereGeometry(0.075, 10, 8), veryDarkMat, 0, 0, 0));
  headGroup.add(antLGroup);

  const antRGroup = new THREE.Group();
  antRGroup.position.set(HEAD_W * 0.32, HEAD_H / 2, 0.04);
  antRGroup.add(M(new THREE.CylinderGeometry(0.052, 0.082, 0.98, 8), whiteMat, 0, 0.49, 0));
  const antROrb = new THREE.Mesh(new THREE.SphereGeometry(0.205, 16, 14), antGlowMat);
  antROrb.position.set(0, 1.06, 0);
  antRGroup.add(antROrb);
  antRGroup.add(M(new THREE.SphereGeometry(0.092, 10, 8), veryDarkMat, 0, 0, 0));
  headGroup.add(antRGroup);

  /* ════════════════════════════════════════════
     EAR DISCS
  ════════════════════════════════════════════ */
  function makeEar(xSide: number) {
    const g = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.22, 18), veryDarkMat);
    disc.rotation.z = Math.PI / 2;
    g.add(disc);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.10, 12, 10), earGlowMat);
    dot.position.x = xSide * 0.13;
    g.add(dot);
    g.position.set(xSide * (HEAD_W / 2 + 0.12), 0.04, 0.06);
    return { group: g, dot };
  }
  const earL = makeEar(-1);
  const earR = makeEar( 1);
  headGroup.add(earL.group, earR.group);

  /* ════════════════════════════════════════════
     NECK
  ════════════════════════════════════════════ */
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.50, 0.58, 14),
    whiteMat
  );
  neck.position.y = 2.56;
  root.add(neck);

  /* ════════════════════════════════════════════
     TORSO
  ════════════════════════════════════════════ */
  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(2.32, 2.18, 1.50),
    whiteMat
  );
  torso.position.y = 1.24;
  root.add(torso);

  [-1.24, 1.24].forEach(x => {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.55, 18, 14), whiteLightMat);
    b.scale.set(0.65, 0.75, 0.70);
    b.position.set(x, 2.10, 0.08);
    root.add(b);
  });

  const chestPanel = new THREE.Mesh(
    new THREE.BoxGeometry(1.72, 1.22, 0.10),
    darkPanelMat
  );
  chestPanel.position.set(0, 1.30, 0.82);
  root.add(chestPanel);

  const gitsLabel = new THREE.Mesh(
    new THREE.BoxGeometry(1.14, 0.32, 0.08),
    veryDarkMat
  );
  gitsLabel.position.set(0, 1.45, 0.88);
  root.add(gitsLabel);

  const lightMats = [chestLight1Mat, chestLight2Mat, chestLight3Mat];
  const chestLights = [-0.32, 0, 0.32].map((x, i) => {
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.072, 10, 8), lightMats[i]);
    l.position.set(x, 0.98, 0.88);
    root.add(l);
    return l;
  });

  [-1.22, 1.22].forEach(x => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.28, 1.20), whiteLightMat);
    p.position.set(x, 1.24, 0.02);
    root.add(p);
  });

  const backPanel = new THREE.Mesh(
    new THREE.BoxGeometry(1.80, 1.42, 0.09),
    darkPanelMat
  );
  backPanel.position.set(0, 1.24, -0.82);
  root.add(backPanel);

  for (let i = 0; i < 5; i++) {
    const vent = new THREE.Mesh(
      new THREE.BoxGeometry(1.38, 0.058, 0.10),
      veryDarkMat
    );
    vent.position.set(0, 0.58 + i * 0.20, -0.86);
    root.add(vent);
  }

  const backDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0xEEEEEE, emissive: 0xFFFFFF, emissiveIntensity: 0.42 })
  );
  backDot.position.set(0.52, 1.72, -0.87);
  root.add(backDot);

  /* ════════════════════════════════════════════
     ARMS
  ════════════════════════════════════════════ */
  function buildArm() {
    const g = new THREE.Group();
    g.add(M(new THREE.SphereGeometry(0.38, 16, 14), whiteMat));
    g.add(M(new THREE.TorusGeometry(0.34, 0.030, 6, 22), veryDarkMat, 0, 0, 0, 1, 1, 1, Math.PI / 2));
    g.add(M(new THREE.CylinderGeometry(0.270, 0.238, 1.0, 14), whiteMat, 0, -0.52, 0));
    g.add(M(new THREE.SphereGeometry(0.255, 14, 12), whiteOffMat, 0, -1.06, 0));
    g.add(M(new THREE.CylinderGeometry(0.218, 0.185, 0.88, 14), whiteMat, 0, -1.58, 0));
    g.add(M(new THREE.SphereGeometry(0.195, 12, 10), whiteOffMat, 0, -2.08, 0));
    g.add(M(new THREE.SphereGeometry(0.265, 14, 10), whiteMat, 0, -2.38, 0, 1.10, 0.78, 1.04));
    for (let i = 0; i < 4; i++) {
      g.add(M(new THREE.SphereGeometry(0.072, 8, 6), whiteOffMat, -0.13 + i * 0.088, -2.64, 0.13));
    }
    g.add(M(new THREE.SphereGeometry(0.082, 8, 6), whiteOffMat, 0.20, -2.48, 0.10));
    return g;
  }

  const armL = buildArm();
  armL.position.set(-1.48, 2.10, 0.04);
  armL.rotation.z =  Math.PI / 16;
  armL.rotation.x =  0.05;

  const armR = buildArm();
  armR.position.set( 1.48, 2.10, 0.04);
  armR.rotation.z = -Math.PI / 16;
  armR.rotation.x =  0.05;

  root.add(armL, armR);

  /* ════════════════════════════════════════════
     HIP
  ════════════════════════════════════════════ */
  const hip = new THREE.Mesh(
    new THREE.BoxGeometry(1.94, 0.48, 1.38),
    whiteOffMat
  );
  hip.position.y = 0.16;
  root.add(hip);

  const hipPanel = new THREE.Mesh(
    new THREE.BoxGeometry(1.54, 0.28, 0.08),
    darkPanelMat
  );
  hipPanel.position.set(0, 0.18, 0.74);
  root.add(hipPanel);

  /* ════════════════════════════════════════════
     LEGS
  ════════════════════════════════════════════ */
  function buildLeg() {
    const g = new THREE.Group();
    g.add(M(new THREE.SphereGeometry(0.320, 16, 14), whiteMat));
    g.add(M(new THREE.CylinderGeometry(0.295, 0.268, 1.08, 14), whiteMat, 0, -0.54, 0));
    g.add(M(new THREE.SphereGeometry(0.285, 14, 12), whiteOffMat, 0, -1.12, 0));
    g.add(M(new THREE.CylinderGeometry(0.242, 0.210, 0.96, 14), whiteMat, 0, -1.66, 0));
    g.add(M(new THREE.SphereGeometry(0.228, 12, 10), whiteOffMat, 0, -2.20, 0));
    const foot = new THREE.Mesh(new THREE.SphereGeometry(0.355, 18, 14), whiteMat);
    foot.scale.set(1.50, 0.52, 1.96);
    foot.position.set(0, -2.44, 0.25);
    g.add(foot);
    const sole = new THREE.Mesh(new THREE.SphereGeometry(0.325, 16, 12), whiteOffMat);
    sole.scale.set(1.38, 0.18, 1.72);
    sole.position.set(0, -2.60, 0.26);
    g.add(sole);
    g.add(M(new THREE.BoxGeometry(0.30, 0.55, 0.07), darkPanelMat, 0, -1.60, 0.25));
    return g;
  }

  const legL = buildLeg();
  legL.position.set(-0.54, 0.0, 0.02);

  const legR = buildLeg();
  legR.position.set( 0.54, 0.0, 0.02);

  root.add(legL, legR);

  /* ── GROUND SHADOW ── */
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -2.68;
  root.add(shadow);

  /* ── ROBOT POINT LIGHT ── */
  const robotLight = new THREE.PointLight(0xFFFFEE, 0.28, 8.0);
  robotLight.position.set(0, 1.0, 3.5);
  root.add(robotLight);

  scene.add(root);

  return {
    root, headGroup,
    scanLine, scanMat,
    eyeGroupL: eyeL.group,
    eyeGroupR: eyeR.group,
    pupilL: eyeL.pupil,
    pupilR: eyeR.pupil,
    shineL: eyeL.shine,
    shineR: eyeR.shine,
    EYE_RADIUS,
    EYE_X_OFFSET,
    EYE_Y,
    EYE_Z,
    mouth, mouthMat,
    antLOrb, antROrb, antLGroup, antRGroup,
    earDotL: earL.dot, earDotR: earR.dot,
    chestLights,
    backDot, robotLight,
    armL, armR, legL, legR,
  };
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function GITSAdvisor3D() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const threeRef     = useRef<any>(null);
  const chatStarted  = useRef(false);
  const msgsEndRef   = useRef<HTMLDivElement>(null);
  const msgsAreaRef  = useRef<HTMLDivElement>(null);
  const textareaRef  = useRef<HTMLTextAreaElement>(null);
  const historyRef   = useRef<{ role: string; content: string }[]>([]);
  const isAtBottomRef = useRef(true);

  // ─── CHANGE 1: Stable session ID per visitor/day ───────────────
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    // Reuse session across page loads within the same day,
    // but generate a new one the next day so leads stay clean.
    const storageKey = "gits_session_id";
    const stored = localStorage.getItem(storageKey);
    const today  = new Date().toISOString().slice(0, 10); // "2025-06-02"

    if (stored) {
      const [date, id] = stored.split("|");
      if (date === today) {
        sessionIdRef.current = id;
        return;
      }
    }
    // New session
    const newId = `${today}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(storageKey, `${today}|${newId}`);
    sessionIdRef.current = newId;
  }, []);
  // ──────────────────────────────────────────────────────────────

  const [chatOpen,      setChatOpen]      = useState(false);
  const [messages,      setMessages]      = useState<{ role: string; content: string; time: number }[]>([]);
  const [inputVal,      setInputVal]      = useState("");
  const [isTyping,      setIsTyping]      = useState(false);
  const [quickReplies,  setQuickReplies]  = useState<{ label: string; val: string }[]>([]);
  const [unread,        setUnread]        = useState(0);
  const [bubble,        setBubble]        = useState({ show: false, text: "" });
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [robotMood,     setRobotMood]     = useState("idle");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [newMsgWhileUp, setNewMsgWhileUp] = useState(0);
  const [confirmClear,  setConfirmClear]  = useState(false);

  // ─── FIX 2: Discovery stage tracking ──────────────────────────
  // Tracks where we are in the 6-stage discovery framework so the
  // API can enforce the right next question rather than guessing.
  type DiscoveryStage = "goal" | "situation" | "pain" | "impact" | "qualification" | "recommendation";
  const discoveryStageRef = useRef<DiscoveryStage>("goal");
  const userMsgCountRef   = useRef(0);

  // Advance stage based on how many user messages have been exchanged.
  // These thresholds are conservative — it's better to stay in discovery
  // too long than to rush to a recommendation.
  function advanceStage() {
    userMsgCountRef.current += 1;
    const count = userMsgCountRef.current;
    const current = discoveryStageRef.current;
    // Only advance forward, never backward
    if      (count >= 8 && current === "impact")        discoveryStageRef.current = "qualification";
    else if (count >= 6 && current === "pain")          discoveryStageRef.current = "impact";
    else if (count >= 4 && current === "situation")     discoveryStageRef.current = "pain";
    else if (count >= 2 && current === "goal")          discoveryStageRef.current = "situation";
    // "qualification" → "recommendation" only happens explicitly when
    // the AI itself signals readiness (handled via prompt injection)
  }
  // ──────────────────────────────────────────────────────────────

  /* ─── THREE.JS SETUP ─────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let cleanupFn: (() => void) | null = null;

    import("three").then((THREE) => {
      if (cancelled) return;

      const W = 130, H = 188;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const scene    = new THREE.Scene();
      const camera   = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
      camera.position.set(0, 1.1, 11.5);
      camera.lookAt(0, 1.1, 0);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(dpr);
      renderer.setSize(W, H);
      renderer.toneMapping         = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      /* ── 3-POINT LIGHTING ── */
      scene.add(new THREE.AmbientLight(0xF8F8F4, 0.55));

      const key = new THREE.DirectionalLight(0xFFFCF8, 1.40);
      key.position.set(2.8, 7.0, 8.5);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xDDE8FF, 0.30);
      fill.position.set(-6.0, 2.5, -4.0);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0xCCDDFF, 0.40);
      rim.position.set(0, 2.0, -12.0);
      scene.add(rim);

      const bot = new THREE.DirectionalLight(0xF8F0E8, 0.12);
      bot.position.set(0, -10, 5);
      scene.add(bot);

      /* ── BUILD ROBOT ── */
      const robot = buildGITSRobot(THREE, scene);
      robot.root.position.y = -5.5;

      /* ── SPRING ANIMATION STATE ── */
      const sp: Record<string, { v: number; vel: number }> = {
        posY:     { v: -5.5, vel: 0 },
        rotY:     { v: 0,    vel: 0 },
        headRotY: { v: 0,    vel: 0 },
        headRotX: { v: 0,    vel: 0 },
        headY:    { v: 0,    vel: 0 },
        armLZ:    { v:  Math.PI / 16, vel: 0 },
        armRZ:    { v: -Math.PI / 16, vel: 0 },
        armLX:    { v: 0.05, vel: 0 },
        armRX:    { v: 0.05, vel: 0 },
        antLY:    { v: 0,    vel: 0 },
        antRY:    { v: 0,    vel: 0 },
        pupilLX:  { v: 0,    vel: 0 },
        pupilLY:  { v: 0,    vel: 0 },
        pupilRX:  { v: 0,    vel: 0 },
        pupilRY:  { v: 0,    vel: 0 },
      };

      const anim: any = {
        targetY:     -5.5,
        ndcX: 0, ndcY: 0,
        mode:        "idle",
        clock:       new THREE.Clock(),
        blinkTimer:  0,
        nextBlink:   3.2 + Math.random() * 3.5,
        scrollCount: 0,
        greeted:     false,
        lastScrollY: window.scrollY,
      };

      threeRef.current = { anim };

      /* ── EYE TRACKING MATH ── */
      const _raycaster   = new THREE.Raycaster();
      const _screenNDC   = new THREE.Vector2();
      const _eyeWorldPos = new THREE.Vector3();
      const _eyeWorldL   = new THREE.Vector3();
      const _eyeWorldR   = new THREE.Vector3();
      const _camForward  = new THREE.Vector3();
      const _planeNormal = new THREE.Vector3();
      const _plane       = new THREE.Plane();
      const _hitPoint    = new THREE.Vector3();
      const _eyeToHit    = new THREE.Vector3();
      const _localRight  = new THREE.Vector3();
      const _localUp     = new THREE.Vector3();
      const _quat        = new THREE.Quaternion();
      const _mat4        = new THREE.Matrix4();

      function computePupilOffset(
        eyeGroup: any,
        ndcX: number,
        ndcY: number,
        eyeRadius: number
      ): { px: number; py: number } {
        eyeGroup.getWorldPosition(_eyeWorldPos);
        _screenNDC.set(ndcX, ndcY);
        _raycaster.setFromCamera(_screenNDC, camera);
        const ray = _raycaster.ray;
        _camForward.copy(camera.position).sub(_eyeWorldPos).normalize();
        _plane.setFromNormalAndCoplanarPoint(_camForward, _eyeWorldPos);
        const hit = ray.intersectPlane(_plane, _hitPoint);
        if (!hit) return { px: 0, py: 0 };
        _eyeToHit.copy(_hitPoint).sub(_eyeWorldPos);
        _mat4.extractRotation(robot.headGroup.matrixWorld);
        _localRight.set(1, 0, 0).applyMatrix4(_mat4).normalize();
        _localUp.set(0, 1, 0).applyMatrix4(_mat4).normalize();
        let px = _eyeToHit.dot(_localRight);
        let py = _eyeToHit.dot(_localUp);
        const maxOff = eyeRadius * 0.55;
        const dist   = Math.sqrt(px * px + py * py);
        if (dist > maxOff) {
          const s = maxOff / dist;
          px *= s;
          py *= s;
        }
        return { px, py };
      }

      /* ── ANIMATION LOOP ── */
      let rafId = 0;

      function loop() {
        rafId = requestAnimationFrame(loop);
        const t = anim.clock.getElapsedTime();
        const r = robot;
        const m = anim.mode;

        /* Position rise */
        {
          const s = spring(sp.posY.v, anim.targetY, sp.posY.vel, 0.036, 0.75);
          sp.posY.v = s.value; sp.posY.vel = s.velocity;
          r.root.position.y = sp.posY.v;
        }

        const risen = sp.posY.v > -2.5;

        /* Breathing */
        if (risen) {
          const breath = Math.sin(t * 1.74) * 0.018 + Math.sin(t * 3.1) * 0.007;
          r.root.position.y += breath;
        }

        /* Patrol body rotation */
        const patrolTarget = Math.sin(t * 0.20) * 0.62;
        {
          const s = spring(sp.rotY.v, patrolTarget, sp.rotY.vel, 0.020, 0.77);
          sp.rotY.v = s.value; sp.rotY.vel = s.velocity;
          r.root.rotation.y = sp.rotY.v;
        }

        /* Head cursor tracking */
        {
          const s = spring(sp.headRotY.v, anim.ndcX * 0.28, sp.headRotY.vel, 0.058, 0.77);
          sp.headRotY.v = s.value; sp.headRotY.vel = s.velocity;
          r.headGroup.rotation.y = sp.headRotY.v;
        }
        {
          const s = spring(sp.headRotX.v, -anim.ndcY * 0.14, sp.headRotX.vel, 0.058, 0.77);
          sp.headRotX.v = s.value; sp.headRotX.vel = s.velocity;
          r.headGroup.rotation.x = sp.headRotX.v;
        }

        /* Head bob */
        {
          const bobTarget = Math.sin(t * 1.74 + 0.4) * 0.020;
          const s = spring(sp.headY.v, bobTarget, sp.headY.vel, 0.11, 0.73);
          sp.headY.v = s.value; sp.headY.vel = s.velocity;
          r.headGroup.position.y = 3.50 + sp.headY.v;
        }

        r.root.updateMatrixWorld(true);

        /* ════ PRECISE EYE TRACKING ════ */
        const tL = computePupilOffset(r.eyeGroupL, anim.ndcX, anim.ndcY, r.EYE_RADIUS);
        const tR = computePupilOffset(r.eyeGroupR, anim.ndcX, anim.ndcY, r.EYE_RADIUS);

        {
          const sx = spring(sp.pupilLX.v, tL.px, sp.pupilLX.vel, 0.14, 0.72);
          sp.pupilLX.v = sx.value; sp.pupilLX.vel = sx.velocity;
          const sy = spring(sp.pupilLY.v, tL.py, sp.pupilLY.vel, 0.14, 0.72);
          sp.pupilLY.v = sy.value; sp.pupilLY.vel = sy.velocity;
        }
        {
          const sx = spring(sp.pupilRX.v, tR.px, sp.pupilRX.vel, 0.14, 0.72);
          sp.pupilRX.v = sx.value; sp.pupilRX.vel = sx.velocity;
          const sy = spring(sp.pupilRY.v, tR.py, sp.pupilRY.vel, 0.14, 0.72);
          sp.pupilRY.v = sy.value; sp.pupilRY.vel = sy.velocity;
        }

        const R = r.EYE_RADIUS;

        function applyPupilOnSphere(
          pupil: any, shine: any,
          ox: number, oy: number
        ) {
          const maxR = R * 0.54;
          const d = Math.sqrt(ox * ox + oy * oy);
          let fx = ox, fy = oy;
          if (d > maxR) { fx *= maxR / d; fy *= maxR / d; }

          const pz = Math.sqrt(Math.max(0, R * R - fx * fx - fy * fy));

          pupil.position.set(fx, fy, pz - 0.008);
          pupil.rotation.x = 0;
          const nx = fx / R, ny = fy / R, nz = pz / R;
          const angle = Math.acos(Math.max(-1, Math.min(1, nz)));
          if (angle > 0.001) {
            const ax = -ny, ay = nx;
            const len = Math.sqrt(ax * ax + ay * ay);
            pupil.rotation.x = 0;
            pupil.rotation.y = 0;
            pupil.rotation.z = 0;
            if (len > 0.001) {
              pupil.setRotationFromAxisAngle(
                new THREE.Vector3(ax / len, ay / len, 0),
                angle
              );
            }
          }

          shine.position.set(
            fx + 0.062,
            fy + 0.062,
            pz + 0.015
          );
        }

        applyPupilOnSphere(r.pupilL, r.shineL, sp.pupilLX.v, sp.pupilLY.v);
        applyPupilOnSphere(r.pupilR, r.shineR, sp.pupilRX.v, sp.pupilRY.v);

        /* SCAN LINE sweep */
        r.scanLine.position.y = 0.08 + Math.sin(t * 1.42) * 0.42;
        r.scanMat.opacity = 0.25 + 0.32 * (0.5 + 0.5 * Math.cos(t * 1.42));

        /* BLINK SYSTEM */
        anim.blinkTimer += 0.016;
        let blinkScaleY = 1.0;
        if (anim.blinkTimer >= anim.nextBlink) {
          const bp = anim.blinkTimer - anim.nextBlink;
          if (bp < 0.08)       blinkScaleY = 1.0 - (bp / 0.08) * 0.92;
          else if (bp < 0.18)  blinkScaleY = 0.08;
          else if (bp < 0.34)  blinkScaleY = 0.08 + ((bp - 0.18) / 0.16) * 0.92;
          else { anim.blinkTimer = 0; anim.nextBlink = 3.0 + Math.random() * 4.0; }
        }
        r.eyeGroupL.scale.y = blinkScaleY;
        r.eyeGroupR.scale.y = blinkScaleY;

        /* ANTENNA GLOW pulse */
        r.antLOrb.material.emissiveIntensity = 0.65 + 0.55 * Math.abs(Math.sin(t * 2.60));
        r.antROrb.material.emissiveIntensity = 0.80 + 0.55 * Math.abs(Math.sin(t * 2.20 + 0.55));

        /* ANTENNA sway */
        {
          const lT = Math.sin(t * 1.30) * 0.12;
          const s = spring(sp.antLY.v, lT, sp.antLY.vel, 0.08, 0.74);
          sp.antLY.v = s.value; sp.antLY.vel = s.velocity;
          r.antLGroup.rotation.z = sp.antLY.v - 0.06;
        }
        {
          const rT = Math.sin(t * 1.10 + 0.4) * 0.10;
          const s2 = spring(sp.antRY.v, rT, sp.antRY.vel, 0.08, 0.74);
          sp.antRY.v = s2.value; sp.antRY.vel = s2.velocity;
          r.antRGroup.rotation.z = sp.antRY.v + 0.05;
        }

        /* EAR GLOW */
        r.earDotL.material.emissiveIntensity = 0.35 + 0.60 * Math.abs(Math.sin(t * 1.82));
        r.earDotR.material.emissiveIntensity = 0.35 + 0.60 * Math.abs(Math.sin(t * 1.82 + 0.70));

        /* CHEST LIGHTS */
        r.chestLights[0].material.emissiveIntensity = 0.6 + 0.7 * Math.abs(Math.sin(t * 1.60));
        r.chestLights[1].material.emissiveIntensity = 0.4 + 0.6 * Math.abs(Math.sin(t * 2.00 + 0.4));
        r.chestLights[2].material.emissiveIntensity = 0.2 + 0.5 * Math.abs(Math.sin(t * 1.40 + 0.8));

        /* MOUTH talking animation */
        if (m === "talking") {
          r.mouth.scale.x = 0.85 + 0.35 * Math.abs(Math.sin(t * 9.2));
        } else {
          r.mouth.scale.x += (1.0 - r.mouth.scale.x) * 0.08;
        }

        /* ARM ANIMATIONS */
        let tArmLZ =  Math.PI / 16;
        let tArmRZ = -Math.PI / 16;
        let tArmLX = 0.05, tArmRX = 0.05;

        if (m === "idle" || m === "curious") {
          tArmLZ =  Math.PI / 16 + Math.sin(t * 0.98) * 0.060;
          tArmRZ = -Math.PI / 16 - Math.sin(t * 0.98 + 0.44) * 0.060;
        } else if (m === "talking") {
          tArmLZ =  Math.PI / 16 + Math.sin(t * 2.9) * 0.24;
          tArmRZ = -Math.PI / 16 - Math.sin(t * 2.9 + 0.7) * 0.16;
          tArmLX = 0.05 + Math.sin(t * 2.1) * 0.055;
          tArmRX = 0.05 - Math.sin(t * 2.1 + 0.5) * 0.040;
        } else if (m === "thinking") {
          tArmRZ = -Math.PI / 16 - 0.64;
          tArmRX = 0.38;
          tArmLZ =  Math.PI / 16 + Math.sin(t * 1.0) * 0.042;
        } else if (m === "excited") {
          tArmLZ =  Math.PI / 16 + Math.sin(t * 7.5) * 0.95;
          tArmLX = -0.28;
          tArmRZ = -Math.PI / 16 - 0.28;
        } else if (m === "handsup") {
          tArmLZ = -Math.PI * 0.85;
          tArmRZ =  Math.PI * 0.85;
        }

        {
          const lz = spring(sp.armLZ.v, tArmLZ, sp.armLZ.vel, 0.088, 0.74);
          sp.armLZ.v = lz.value; sp.armLZ.vel = lz.velocity;
          r.armL.rotation.z = sp.armLZ.v;
        }
        {
          const rz = spring(sp.armRZ.v, tArmRZ, sp.armRZ.vel, 0.088, 0.74);
          sp.armRZ.v = rz.value; sp.armRZ.vel = rz.velocity;
          r.armR.rotation.z = sp.armRZ.v;
        }
        {
          const lx = spring(sp.armLX.v, tArmLX, sp.armLX.vel, 0.095, 0.75);
          sp.armLX.v = lx.value; sp.armLX.vel = lx.velocity;
          r.armL.rotation.x = sp.armLX.v;
        }
        {
          const rx = spring(sp.armRX.v, tArmRX, sp.armRX.vel, 0.095, 0.75);
          sp.armRX.v = rx.value; sp.armRX.vel = rx.velocity;
          r.armR.rotation.x = sp.armRX.v;
        }

        /* EXCITED BOUNCE */
        if (m === "excited") {
          r.root.position.y += Math.sin(t * 11.5) * 0.11;
        }

        /* LEG MICRO-MOVEMENT */
        r.legL.rotation.x = Math.sin(t * 1.62) * 0.018;
        r.legR.rotation.x = -Math.sin(t * 1.62 + 0.28) * 0.018;
        r.legL.rotation.z = Math.sin(t * 0.82) * 0.008;
        r.legR.rotation.z = -Math.sin(t * 0.82 + 0.3) * 0.008;

        renderer.render(scene, camera);
      }
      loop();

      /* ── SCROLL HANDLER ── */
      function onScroll() {
        const sy = window.scrollY;
        const delta = sy - anim.lastScrollY;
        anim.lastScrollY = sy;
        anim.scrollCount++;

        const progress = Math.min(sy / 420, 1);
        anim.targetY = -5.5 + progress * 5.5;

        sp.rotY.vel += delta * 0.0008;

        anim.ndcY = Math.max(-0.8, Math.min(0.8, delta > 0 ? 0.45 : -0.28));
        setTimeout(() => { anim.ndcY *= 0.3; }, 550);

        if (anim.scrollCount === 3 && !anim.greeted) {
          anim.greeted = true;
          setTimeout(() => {
            const v = loadVisitor();
            const txt = v && Date.now() - v.lastVisit < 7 * 86400000
              ? (v.name
                  ? `Welcome back, ${v.name}! 👋\n\nStill working on that **${v.topic || "project"}**?`
                  : `Welcome back! 👋 What are you building today?`)
              : `👀 Hey — I see you exploring.\n\nWhat are you trying to build?`;
            setBubble({ show: true, text: txt });
            if (threeRef.current) threeRef.current.anim.mode = "excited";
            setRobotMood("excited");
            setTimeout(() => {
              if (threeRef.current) threeRef.current.anim.mode = "idle";
              setRobotMood("idle");
            }, 1400);
          }, 800);
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true });

      const riseTimer = setTimeout(() => {
        if (anim.targetY < 0) anim.targetY = 0;
      }, 2600);

      /* ── MOUSE — update NDC from actual canvas position ── */
      function onMouse(e: MouseEvent) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const rawX = ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
        const rawY = ((e.clientY - rect.top)   / rect.height) * 2 - 1;
        anim.ndcX = Math.max(-1, Math.min(1,  rawX));
        anim.ndcY = Math.max(-1, Math.min(1, -rawY));
      }
      document.addEventListener("mousemove", onMouse);

      /* ── GYROSCOPE ── */
      function onGyro(e: DeviceOrientationEvent) {
        if (e.gamma != null) anim.ndcX = Math.max(-1, Math.min(1, e.gamma / 22));
        if (e.beta  != null) anim.ndcY = Math.max(-1, Math.min(1, -(e.beta - 50) / 28));
      }
      window.addEventListener("deviceorientation", onGyro);

      /* ── CANVAS HOVER ── */
      function onEnter() { if (threeRef.current && threeRef.current.anim.mode === "idle") { threeRef.current.anim.mode = "curious"; setRobotMood("curious"); } }
      function onLeave() { if (threeRef.current && threeRef.current.anim.mode === "curious") { threeRef.current.anim.mode = "idle"; setRobotMood("idle"); } }
      if (canvas) {
        canvas.addEventListener("mouseenter", onEnter);
        canvas.addEventListener("mouseleave", onLeave);
      }

      cleanupFn = () => {
        cancelAnimationFrame(rafId);
        renderer.dispose();
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("mousemove", onMouse);
        window.removeEventListener("deviceorientation", onGyro);
        if (canvas) canvas.removeEventListener("mouseenter", onEnter);
        if (canvas) canvas.removeEventListener("mouseleave", onLeave);
        clearTimeout(riseTimer);
        threeRef.current = null;
      };
    });

    return () => { cancelled = true; cleanupFn?.(); };
  }, []);

  /* ─── SCROLL TRACKING (chat messages area) ──────────────── */
  useEffect(() => {
    const el = msgsAreaRef.current;
    if (!el) return;

    function onMsgsScroll() {
      const { scrollTop, scrollHeight, clientHeight } = el!;
      const distFromBottom = scrollHeight - scrollTop - clientHeight;
      const atBottom = distFromBottom < 40;
      isAtBottomRef.current = atBottom;
      setShowScrollBtn(!atBottom && scrollHeight > clientHeight + 60);
      if (atBottom) setNewMsgWhileUp(0);
    }

    el.addEventListener("scroll", onMsgsScroll, { passive: true });
    return () => el.removeEventListener("scroll", onMsgsScroll);
  }, []);

  /* ─── AUTO-SCROLL — only when already at bottom ─────────── */
  useEffect(() => {
    if (isAtBottomRef.current) {
      msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.role === "assistant") setNewMsgWhileUp(n => n + 1);
    }
  }, [messages, isTyping]);

  /* ─── SCROLL TO BOTTOM ───────────────────────────────────── */
  const scrollToBottom = useCallback(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setNewMsgWhileUp(0);
    isAtBottomRef.current = true;
  }, []);

  /* ─── ROBOT MODE SETTER ──────────────────────────────────── */
  const setRobotMode = useCallback((mode: string, ms = 0) => {
    if (!threeRef.current?.anim) return;
    threeRef.current.anim.mode = mode;
    setRobotMood(mode);
    if (ms > 0) setTimeout(() => {
      if (threeRef.current?.anim) {
        threeRef.current.anim.mode = "idle";
        setRobotMood("idle");
      }
    }, ms);
  }, []);

  /* ─── CLEAR CHAT ─────────────────────────────────────────── */
  const clearChat = useCallback(() => {
    setMessages([]);
    setQuickReplies([]);
    historyRef.current = [];
    chatStarted.current = false;
    discoveryStageRef.current = "goal";   // ← reset stage
    userMsgCountRef.current   = 0;        // ← reset counter
    setConfirmClear(false);
    setNewMsgWhileUp(0);
    setShowScrollBtn(false);
    isAtBottomRef.current = true;
    setRobotMode("excited", 700);
    setTimeout(() => openChat(), 380);
  }, []);

  // ─── CTA push helper ──────────────────────────────────────────
  const fireCTAPush = useCallback(async (ctaType: string) => {
    if (!sessionIdRef.current) return;
    try {
      await fetch(API_ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages:     historyRef.current.slice(-14),
          systemPrompt: SYSTEM_PROMPT,
          context: {
            discoveryStage: discoveryStageRef.current,
            msgCount:       userMsgCountRef.current,
          },
          sessionId:    sessionIdRef.current,
          ctaClicked:   ctaType,
          source:       window.location.href,
        }),
      });
    } catch (e) {
      console.warn("[CTA push]", e);
    }
  }, []);
  // ──────────────────────────────────────────────────────────────

  // ─── FIX 1 + 2: sendMessage — wires systemPrompt + discoveryStage ──
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const trimmed = text.trim();
    setInputVal("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setQuickReplies([]);
    setConfirmClear(false);

    isAtBottomRef.current = true;
    setShowScrollBtn(false);
    setNewMsgWhileUp(0);

    const now = Date.now();
    setMessages(prev => [...prev, { role: "user", content: trimmed, time: now }]);
    saveVisitor("", trimmed.slice(0, 60));
    historyRef.current.push({ role: "user", content: trimmed });
    if (historyRef.current.length > 18) historyRef.current = historyRef.current.slice(-18);

    // Advance discovery stage BEFORE the API call so the stage sent
    // reflects the state AFTER this user message arrives
    advanceStage();

    setIsTyping(true);
    setRobotMode("thinking");

    let reply: string | null = null;

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages:       historyRef.current.slice(-14),
          systemPrompt:   SYSTEM_PROMPT,                  // ← FIX 1: wire the prompt
          context: {
            discoveryStage: discoveryStageRef.current,    // ← FIX 2: send stage
            msgCount:       userMsgCountRef.current,
          },
          sessionId:      sessionIdRef.current,
          source:         window.location.href,
        }),
      });
      if (res.ok) {
        const d = await res.json();
        reply = d.reply || d.content?.[0]?.text || null;
      } else {
        console.warn("[GITS] /api/chat returned", res.status);
      }
    } catch (err) {
      console.warn("[GITS] fetch error:", err);
    }

    if (!reply) {
      reply = "Something went wrong — try [contacting the team](https://wa.me/2348116276212) directly.";
    }

    historyRef.current.push({ role: "assistant", content: reply });

    setIsTyping(false);
    setRobotMode("talking", 3000);
    setMessages(prev => [...prev, { role: "assistant", content: reply!, time: Date.now() }]);
    setQuickReplies(QUICK_FOLLOWUP);
    setUnread(u => u + 1);
  }, [setRobotMode]);
  // ──────────────────────────────────────────────────────────────

  /* ─── OPEN / CLOSE ───────────────────────────────────────── */
  const openChat = useCallback(() => {
    setChatOpen(true);
    setUnread(0);
    setMenuOpen(false);
    setConfirmClear(false);
    setBubble(b => ({ ...b, show: false }));
    setRobotMode("handsup");
    setTimeout(() => setRobotMode("excited", 900), 800);
    if (window.innerWidth < 600) document.body.style.overflow = "hidden";

    if (!chatStarted.current) {
      chatStarted.current = true;
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setRobotMode("talking", 2800);
        const v = loadVisitor();
        const greet = v?.name ? `Hey ${v.name}! 👋` : "Hey! 👋";
        setMessages([{
          role: "assistant",
          content: `${greet} I'm the GITS Advisor.\n\nWhat are you trying to build or solve?`,
          time: Date.now(),
        }]);
        setQuickReplies(QUICK_INITIAL);
        setUnread(0);
        isAtBottomRef.current = true;
      }, 900);
    }
    setTimeout(() => {
      textareaRef.current?.focus();
      msgsEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, 600);
  }, [setRobotMode]);

  const closeChat = useCallback(() => {
    setChatOpen(false);
    setMenuOpen(false);
    setConfirmClear(false);
    setRobotMode("idle");
    document.body.style.overflow = "";
  }, [setRobotMode]);

  /* ─── TEXT FORMATTING ────────────────────────────────────── */
  function fmt(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`)
      .replace(/\n/g, "<br>");
  }
  function relTime(ts: number) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 5)    return "just now";
    if (s < 60)   return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    return `${Math.floor(s / 3600)}h ago`;
  }

  const statusLabel =
    robotMood === "thinking" ? "Thinking…" :
    robotMood === "talking"  ? "Responding…" :
    robotMood === "excited"  ? "Excited!" :
    "Online · AI-powered";

  /* ─── JSX ────────────────────────────────────────────────── */
  return (
    <>
      <style>{CSS}</style>

      <div id="g3d-root" data-chat={chatOpen ? "1" : "0"}>

        {/* ── SPEECH BUBBLE ── */}
        {bubble.show && !chatOpen && (
          <div className="g3d-bubble">
            <button className="g3d-bubble-x" onClick={() => setBubble(b => ({ ...b, show: false }))} aria-label="Dismiss">✕</button>
            <div className="g3d-bubble-txt" dangerouslySetInnerHTML={{ __html: fmt(bubble.text) }} />
            <div className="g3d-bubble-ctas">
              {/* ── CHANGE 5: fire CTA push on "Let's talk" click ── */}
              <button
                className="g3d-bubble-yes"
                onClick={() => {
                  setBubble(b => ({ ...b, show: false }));
                  fireCTAPush("bubble_cta");
                  openChat();
                }}
              >
                Let's talk →
              </button>
              <button className="g3d-bubble-no"  onClick={() => setBubble(b => ({ ...b, show: false }))}>Keep browsing</button>
            </div>
          </div>
        )}

        {/* ── CHAT PANEL ── */}
        <div className={`g3d-chat${chatOpen ? " open" : ""}`} role="dialog" aria-label="GITS AI Advisor" aria-modal="true">

          {/* Header */}
          <div className="g3d-head">
            <div className="g3d-head-ava">
              <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
                <rect x="4" y="6" width="32" height="26" rx="4" fill="#F0F0EC" stroke="rgba(0,0,0,.06)" strokeWidth=".5"/>
                <rect x="8" y="11" width="24" height="16" rx="3" fill="#0c0c0b"/>
                <rect x="8" y="11" width="24" height="16" rx="3" fill="rgba(255,255,255,.04)"/>
                <circle cx="15" cy="19" r="4.2" fill="rgba(255,255,255,.92)"/>
                <circle cx="25" cy="19" r="4.2" fill="rgba(255,255,255,.92)"/>
                <circle cx="15" cy="19" r="2.0" fill="#080807"/>
                <circle cx="25" cy="19" r="2.0" fill="#080807"/>
                <circle cx="15.8" cy="18.2" r=".85" fill="rgba(255,255,255,.55)"/>
                <circle cx="25.8" cy="18.2" r=".85" fill="rgba(255,255,255,.55)"/>
                <rect x="14" y="24" width="12" height="1.8" rx=".9" fill="rgba(255,255,255,.70)"/>
                <line x1="20" y1="1" x2="20" y2="6" stroke="rgba(0,0,0,.25)" strokeWidth="1.3" strokeLinecap="round"/>
                <circle cx="20" cy="1" r="1.8" fill="rgba(0,0,0,.35)"/>
                <circle cx="4" cy="19" r="3" fill="#0c0c0b" stroke="rgba(255,255,255,.15)" strokeWidth=".8"/>
                <circle cx="4" cy="19" r="1.5" fill="rgba(255,255,255,.65)"/>
                <circle cx="36" cy="19" r="3" fill="#0c0c0b" stroke="rgba(255,255,255,.15)" strokeWidth=".8"/>
                <circle cx="36" cy="19" r="1.5" fill="rgba(255,255,255,.65)"/>
              </svg>
              <span className="g3d-status"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="g3d-head-name">GITS Advisor</div>
              <div className="g3d-head-sub">
                <span className={`g3d-dot${robotMood === "thinking" ? " thinking" : robotMood === "talking" ? " talking" : ""}`}/>
                {statusLabel}
              </div>
            </div>

            {/* ── CLEAR CHAT BUTTON — always visible in header ── */}
            <button
              className="g3d-icon-btn g3d-clear-btn"
              onClick={() => { setConfirmClear(c => !c); setMenuOpen(false); }}
              aria-label="Clear conversation"
              title="Clear chat"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>

            <div style={{ position: "relative" }}>
              <button className="g3d-icon-btn" onClick={() => { setMenuOpen(o => !o); setConfirmClear(false); }} aria-label="Menu">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5"  r="1.5"/>
                  <circle cx="12" cy="12" r="1.5"/>
                  <circle cx="12" cy="19" r="1.5"/>
                </svg>
              </button>
              {menuOpen && (
                <div className="g3d-menu">
                  <button className="g3d-menu-item" onClick={() => { setMenuOpen(false); setConfirmClear(true); }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    Clear chat
                  </button>
                  <button className="g3d-menu-item" onClick={() => {
                    setMenuOpen(false);
                    const t = messages.map(m => `${m.role === "user" ? "You" : "GITS"}: ${m.content}`).join("\n\n");
                    navigator.clipboard.writeText(t).catch(() => {});
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    Copy transcript
                  </button>
                  <div className="g3d-menu-div"/>
                  <a className="g3d-menu-item g3d-menu-wa" href="https://wa.me/2348116276212" target="_blank" rel="noopener">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp team
                  </a>
                </div>
              )}
            </div>

            <button className="g3d-close" onClick={closeChat} aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <line x1="18" y1="6"  x2="6"  y2="18"/>
                <line x1="6"  y1="6"  x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* ── CONFIRM CLEAR STRIP ── */}
          {confirmClear && (
            <div className="g3d-confirm-strip">
              <span className="g3d-confirm-txt">Clear all messages?</span>
              <div className="g3d-confirm-actions">
                <button className="g3d-confirm-yes" onClick={clearChat}>Yes, clear</button>
                <button className="g3d-confirm-no"  onClick={() => setConfirmClear(false)}>Cancel</button>
              </div>
            </div>
          )}

          {/* ── CHANGE 4: Messages area with CTA link click interception ── */}
          <div
            className="g3d-msgs"
            ref={msgsAreaRef}
            onClick={(e) => {
              const target = e.target as HTMLAnchorElement;
              if (target.tagName !== "A") return;

              const href = target.getAttribute("href") ?? "";

              // Map known CTA URLs to types
              const ctaMap: Record<string, string> = {
                "wa.me":        "whatsapp",
                "calendly.com": "book_call",
                "/contact":     "contact",
                "/audit":       "audit",
              };

              for (const [key, ctaType] of Object.entries(ctaMap)) {
                if (href.includes(key)) {
                  fireCTAPush(ctaType);
                  break;
                }
              }
              // Allow the link to open normally — do not preventDefault
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`g3d-row ${msg.role}`} style={{ animationDelay: `${Math.min(i * 20, 80)}ms` }}>
                {msg.role === "assistant" && <span dangerouslySetInnerHTML={{ __html: AVATAR_SVG }}/>}
                <div className="g3d-msg-wrap">
                  <div className="g3d-bub" dangerouslySetInnerHTML={{ __html: fmt(msg.content) }}/>
                  <span className="g3d-ts">{relTime(msg.time)}</span>
                </div>
                {msg.role === "user" && <div className="g3d-you">You</div>}
              </div>
            ))}
            {isTyping && (
              <div className="g3d-row assistant">
                <span dangerouslySetInnerHTML={{ __html: AVATAR_SVG }}/>
                <div className="g3d-typing-wrap">
                  <div className="g3d-dots"><span/><span/><span/></div>
                  <span className="g3d-typing-label">typing</span>
                </div>
              </div>
            )}
            <div ref={msgsEndRef} style={{ height: 1 }}/>
          </div>

          {/* ── SCROLL-TO-BOTTOM FLOAT BUTTON ── */}
          {showScrollBtn && (
            <button
              className={`g3d-scroll-btn${newMsgWhileUp > 0 ? " has-new" : ""}`}
              onClick={scrollToBottom}
              aria-label="Scroll to latest message"
            >
              {newMsgWhileUp > 0 && (
                <span className="g3d-new-badge">{newMsgWhileUp} new</span>
              )}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          )}

          {/* Quick replies — horizontal scroll on mobile */}
          {quickReplies.length > 0 && !isTyping && (
            <div className="g3d-quicks">
              <div className="g3d-quicks-inner">
                {quickReplies.map((q, i) => (
                  <button key={i} className="g3d-q" style={{ animationDelay: `${i * 45}ms` }}
                    onClick={() => { setQuickReplies([]); sendMessage(q.val); }}>
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input row */}
          <div className="g3d-input-row">
            <textarea ref={textareaRef} className="g3d-input" value={inputVal} rows={1}
              placeholder="Ask me anything…" autoComplete="off" enterKeyHint="send"
              onChange={e => {
                setInputVal(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
              }}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (inputVal.trim() && !isTyping) sendMessage(inputVal.trim());
                }
              }}
            />
            <button
              className={`g3d-send${isTyping ? " sending" : ""}`}
              disabled={!inputVal.trim() || isTyping}
              onClick={() => { if (inputVal.trim() && !isTyping) sendMessage(inputVal.trim()); }}
              aria-label="Send"
            >
              {isTyping ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" strokeDasharray="28 28" className="g3d-send-spin"/>
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0a0a09" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none"/>
                </svg>
              )}
            </button>
          </div>
          <div className="g3d-footer">
            <span>GITS · clarity · speed · quality</span>
            <span className="g3d-footer-hint">↵ send · shift+↵ new line</span>
          </div>
        </div>

        {/* ── UNREAD BADGE ── */}
        {unread > 0 && !chatOpen && (
          <div className="g3d-badge">{unread}</div>
        )}

        {/* ── 3D ROBOT CANVAS ── */}
        <canvas ref={canvasRef} className="g3d-canvas"
          onClick={openChat} role="button" tabIndex={0}
          aria-label="Chat with GITS AI Advisor"
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openChat(); } }}
        />
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════════ */
const CSS = `
:root {
  --gb:   #080807;
  --gb2:  #111110;
  --gb3:  #1c1c1a;
  --gb4:  #272725;
  --gb5:  #323230;
  --gw:   #f2f2ee;
  --gw2:  #c8c8c4;
  --gw3:  #888884;
  --gw4:  #4a4a48;
  --gbr:  rgba(255,255,255,0.08);
  --gbr2: rgba(255,255,255,0.14);
  --gbr3: rgba(255,255,255,0.24);
  --gsh:  0 32px 80px rgba(0,0,0,0.92), 0 6px 22px rgba(0,0,0,0.65);
  --gsh2: 0 12px 40px rgba(0,0,0,0.8);
  --gf:   'Syne','Bricolage Grotesque',system-ui,sans-serif;
  --gm:   'DM Mono',monospace;
  --gdanger: #e05252;
}

@media(prefers-color-scheme:light) {
  :root {
    --gb:   #f8f8f6;
    --gb2:  #ffffff;
    --gb3:  #f0f0ec;
    --gb4:  #e8e8e4;
    --gb5:  #e0e0dc;
    --gw:   #111110;
    --gw2:  #333330;
    --gw3:  #777774;
    --gw4:  #aaaaaa;
    --gbr:  rgba(0,0,0,0.08);
    --gbr2: rgba(0,0,0,0.12);
    --gbr3: rgba(0,0,0,0.2);
    --gsh:  0 32px 80px rgba(0,0,0,0.18), 0 6px 22px rgba(0,0,0,0.1);
    --gsh2: 0 12px 40px rgba(0,0,0,0.12);
  }
}

#g3d-root {
  position: fixed !important;
  bottom: 24px !important;
  right: 24px !important;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;
  pointer-events: none;
  font-family: var(--gf);
}
#g3d-root > * { pointer-events: auto; }

.g3d-canvas {
  display: block;
  width: 130px;
  height: 188px;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  filter: drop-shadow(0 8px 28px rgba(0,0,0,0.45))
          drop-shadow(0 2px 8px rgba(0,0,0,0.38));
  transition: filter 0.35s ease;
}
.g3d-canvas:hover {
  filter: drop-shadow(0 14px 44px rgba(0,0,0,0.55))
          drop-shadow(0 2px 12px rgba(0,0,0,0.45));
}
.g3d-canvas:focus-visible {
  outline: 2px solid var(--gbr3);
  outline-offset: 4px;
  border-radius: 10px;
}

.g3d-badge {
  position: absolute;
  bottom: 186px;
  right: -3px;
  min-width: 20px;
  height: 20px;
  background: #dc2626;
  color: #fff;
  font-family: var(--gm);
  font-size: 10px;
  font-weight: 700;
  border-radius: 100px;
  padding: 0 5px;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--gb);
  animation: g3d-badge-in 0.30s cubic-bezier(0.34,1.6,0.64,1),
             g3d-badge-pulse 2.2s ease-in-out infinite 0.6s;
}
@keyframes g3d-badge-in { from{transform:scale(0)} to{transform:scale(1)} }
@keyframes g3d-badge-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0.5)} 50%{box-shadow:0 0 0 7px rgba(220,38,38,0)} }

.g3d-bubble {
  position: absolute;
  bottom: 200px;
  right: 0;
  width: 252px;
  background: var(--gb2);
  border: 1px solid var(--gbr2);
  border-radius: 18px 18px 4px 18px;
  padding: 15px 16px 14px;
  box-shadow: var(--gsh2), inset 0 1px 0 var(--gbr);
  transform-origin: bottom right;
  animation: g3d-bub-in 0.52s cubic-bezier(0.34,1.40,0.64,1) both;
  z-index: 2;
}
@keyframes g3d-bub-in { from{opacity:0;transform:scale(0.04) translateY(30px)} to{opacity:1;transform:scale(1) translateY(0)} }
.g3d-bubble::after  { content:''; position:absolute; bottom:-9px; right:18px; border-left:10px solid transparent; border-top:10px solid var(--gbr2); }
.g3d-bubble::before { content:''; position:absolute; bottom:-7px; right:19px; z-index:1; border-left:9px solid transparent; border-top:9px solid var(--gb2); }
.g3d-bubble-x { position:absolute; top:-10px; right:-10px; width:24px; height:24px; background:var(--gb3); border:1px solid var(--gbr); border-radius:50%; color:var(--gw3); font-size:10px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:color .2s,background .2s; }
.g3d-bubble-x:hover { color:var(--gw); background:var(--gb4); }
.g3d-bubble-txt { font-size:12.5px; font-weight:500; line-height:1.65; color:var(--gw); letter-spacing:-0.01em; }
.g3d-bubble-txt strong { font-weight:700; color:var(--gw); }
.g3d-bubble-ctas { display:flex; gap:6px; margin-top:12px; flex-wrap:wrap; }
.g3d-bubble-yes { background:var(--gw); color:var(--gb); border:none; font-family:var(--gf); font-size:11.5px; font-weight:700; padding:7px 16px; border-radius:100px; cursor:pointer; white-space:nowrap; transition:background .2s,transform .15s; }
.g3d-bubble-yes:hover { background:var(--gw2); transform:scale(1.04); }
.g3d-bubble-no { background:transparent; color:var(--gw3); border:1px solid var(--gbr); font-family:var(--gf); font-size:11.5px; padding:7px 13px; border-radius:100px; cursor:pointer; white-space:nowrap; transition:color .2s,border-color .2s; }
.g3d-bubble-no:hover { color:var(--gw2); border-color:var(--gbr2); }

.g3d-chat {
  position: fixed;
  bottom: 226px;
  right: 24px;
  width: 340px;
  max-height: calc(100vh - 226px - 80px);
  min-height: 200px;
  background: var(--gb2);
  border: 1px solid var(--gbr2);
  border-radius: 20px;
  box-shadow: var(--gsh);
  display: flex; flex-direction: column; overflow: hidden;
  opacity: 0;
  transform: scale(0.05) translateY(40px);
  transform-origin: bottom right;
  pointer-events: none;
  transition: opacity 0.50s cubic-bezier(0.34,1.25,0.64,1), transform 0.54s cubic-bezier(0.34,1.25,0.64,1);
  z-index: 99998;
}
.g3d-chat.open { opacity:1; transform:scale(1) translateY(0); pointer-events:all; }

.g3d-head {
  display: flex; align-items: center;
  gap: 6px;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid var(--gbr);
  background: var(--gb3);
  flex-shrink: 0; position: relative;
}
.g3d-head-ava { position:relative; flex-shrink:0; transform:scale(0.88); transform-origin:left center; }
.g3d-status { position:absolute; bottom:2px; right:2px; width:9px; height:9px; border-radius:50%; background:var(--gw3); border:2px solid var(--gb3); animation:g3d-status 2.4s ease-in-out infinite; }
@keyframes g3d-status { 0%,100%{opacity:1} 50%{opacity:.45} }
.g3d-head-name { font-size:13px; font-weight:700; color:var(--gw); letter-spacing:-0.025em; }
.g3d-head-sub { font-family:var(--gm); font-size:8.5px; color:var(--gw3); display:flex; align-items:center; gap:4px; letter-spacing:.05em; margin-top:1px; }

.g3d-dot { width:5px; height:5px; border-radius:50%; background:var(--gw3); flex-shrink:0; animation:g3d-status 2.5s ease infinite; }
.g3d-dot.thinking { background:#f0a040; animation:g3d-think 0.7s ease infinite; }
.g3d-dot.talking  { background:#52c87a; animation:g3d-status 0.9s ease infinite; }
@keyframes g3d-think { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.5);opacity:1} }

.g3d-clear-btn {
  color: var(--gw3) !important;
  transition: color .2s, background .2s, transform .15s !important;
}
.g3d-clear-btn:hover {
  color: var(--gdanger) !important;
  background: rgba(224,82,82,0.12) !important;
  transform: scale(1.05);
}

.g3d-icon-btn { background:none; border:none; cursor:pointer; color:var(--gw4); padding:5px; border-radius:7px; display:flex; align-items:center; justify-content:center; transition:color .2s,background .2s; flex-shrink:0; }
.g3d-icon-btn:hover { color:var(--gw2); background:var(--gb4); }

.g3d-close {
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  width: 28px; height: 28px;
  background: var(--gb4);
  border: 1px solid var(--gbr2);
  border-radius: 8px;
  cursor: pointer;
  color: var(--gw2);
  transition: background .18s, color .18s, transform .15s;
  padding: 0;
}
.g3d-close:hover {
  background: var(--gb5);
  color: var(--gw);
  transform: scale(1.08);
}

.g3d-confirm-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 14px;
  background: rgba(224,82,82,0.08);
  border-bottom: 1px solid rgba(224,82,82,0.18);
  animation: g3d-strip-in .22s ease both;
  flex-shrink: 0;
}
@keyframes g3d-strip-in { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
.g3d-confirm-txt { font-size:12px; font-weight:600; color:var(--gdanger); letter-spacing:-0.01em; }
.g3d-confirm-actions { display:flex; gap:6px; }
.g3d-confirm-yes { background:var(--gdanger); color:#fff; border:none; font-family:var(--gf); font-size:11px; font-weight:700; padding:5px 13px; border-radius:100px; cursor:pointer; transition:background .2s,transform .15s; }
.g3d-confirm-yes:hover { background:#c84040; transform:scale(1.03); }
.g3d-confirm-no { background:transparent; color:var(--gw3); border:1px solid var(--gbr); font-family:var(--gf); font-size:11px; padding:5px 11px; border-radius:100px; cursor:pointer; transition:color .2s; }
.g3d-confirm-no:hover { color:var(--gw2); }

.g3d-menu { position:absolute; top:calc(100% + 6px); right:0; min-width:182px; background:var(--gb3); border:1px solid var(--gbr2); border-radius:12px; box-shadow:var(--gsh2); padding:5px; z-index:30; animation:g3d-menu-in .22s cubic-bezier(0.34,1.4,0.64,1); transform-origin:top right; }
@keyframes g3d-menu-in { from{opacity:0;transform:scale(.88) translateY(-6px)} to{opacity:1;transform:scale(1) translateY(0)} }
.g3d-menu-item { display:flex; align-items:center; gap:9px; width:100%; background:none; border:none; color:var(--gw2); font-family:var(--gf); font-size:12.5px; padding:9px 12px; border-radius:8px; cursor:pointer; text-align:left; text-decoration:none; transition:background .15s,color .15s; }
.g3d-menu-item:hover { background:var(--gb4); color:var(--gw); }
.g3d-menu-wa { color:#4ade80; }
.g3d-menu-wa:hover { background:rgba(74,222,128,.08); }
.g3d-menu-div { height:1px; background:var(--gbr); margin:4px 0; }

.g3d-msgs {
  flex:1; overflow-y:auto; padding:14px 12px 6px;
  display:flex; flex-direction:column; gap:10px;
  scroll-behavior:smooth; min-height:80px;
  scrollbar-width: thin;
  scrollbar-color: var(--gb4) transparent;
}
.g3d-msgs::-webkit-scrollbar { width:3px; }
.g3d-msgs::-webkit-scrollbar-track { background:transparent; }
.g3d-msgs::-webkit-scrollbar-thumb { background:var(--gb4); border-radius:3px; }
.g3d-msgs::-webkit-scrollbar-thumb:hover { background:var(--gb5); }

.g3d-row { display:flex; gap:7px; align-items:flex-end; animation:g3d-msg-in 0.35s cubic-bezier(0.34,1.4,0.64,1) both; }
.g3d-row.user { flex-direction:row-reverse; }
@keyframes g3d-msg-in { from{opacity:0;transform:translateY(10px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
.g3d-msg-wrap { display:flex; flex-direction:column; max-width:84%; }
.g3d-row.user .g3d-msg-wrap { align-items:flex-end; }
.g3d-bub { padding:9px 12px; font-size:12.5px; font-weight:500; line-height:1.66; color:var(--gw); background:var(--gb3); border:1px solid var(--gbr); border-radius:14px 14px 14px 3px; word-break:break-word; }
.g3d-row.user .g3d-bub { background:var(--gb4); border-color:var(--gbr); border-radius:14px 14px 3px 14px; color:var(--gw2); }
.g3d-bub a { color:var(--gw); text-decoration:underline; text-underline-offset:2px; text-decoration-color:var(--gbr3); }
.g3d-bub a:hover { text-decoration-color:var(--gw2); }
.g3d-bub strong { color:var(--gw); font-weight:700; }
.g3d-ts { display:block; font-family:var(--gm); font-size:8.5px; color:var(--gw4); margin-top:4px; letter-spacing:.04em; }
.g3d-row.user .g3d-ts { text-align:right; }
.g3d-you { width:22px; height:22px; border-radius:50%; background:var(--gb4); color:var(--gw3); font-size:8.5px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:1px solid var(--gbr); }

.g3d-typing-wrap { display:flex; flex-direction:column; gap:3px; }
.g3d-typing-label { font-family:var(--gm); font-size:8px; color:var(--gw4); letter-spacing:.06em; padding-left:2px; animation:g3d-fade 1.4s ease-in-out infinite; }
@keyframes g3d-fade { 0%,100%{opacity:.4} 50%{opacity:1} }

.g3d-dots { display:flex; gap:4px; align-items:center; background:var(--gb3); border:1px solid var(--gbr); padding:10px 13px; border-radius:14px 14px 14px 3px; }
.g3d-dots span { width:5px; height:5px; border-radius:50%; background:var(--gw4); animation:g3d-dot 1.3s ease infinite; }
.g3d-dots span:nth-child(2){animation-delay:.15s}
.g3d-dots span:nth-child(3){animation-delay:.30s}
@keyframes g3d-dot { 0%,60%,100%{transform:translateY(0);opacity:.4;background:var(--gw4)} 30%{transform:translateY(-5px);opacity:1;background:var(--gw2)} }

.g3d-scroll-btn {
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  display: flex; align-items: center; gap: 5px;
  background: var(--gb3);
  border: 1px solid var(--gbr2);
  color: var(--gw2);
  font-family: var(--gf); font-size: 11px; font-weight: 600;
  padding: 6px 14px 6px 10px;
  border-radius: 100px;
  cursor: pointer;
  box-shadow: var(--gsh2);
  animation: g3d-scroll-in .28s cubic-bezier(0.34,1.6,0.64,1);
  transition: background .18s, color .18s, transform .15s;
  z-index: 10;
  white-space: nowrap;
}
.g3d-scroll-btn:hover { background:var(--gb4); color:var(--gw); transform:translateX(-50%) scale(1.04); }
.g3d-scroll-btn.has-new { background:var(--gw); color:var(--gb); border-color:transparent; }
.g3d-scroll-btn.has-new:hover { background:var(--gw2); transform:translateX(-50%) scale(1.04); }
@keyframes g3d-scroll-in { from{opacity:0;transform:translateX(-50%) translateY(10px) scale(.9)} to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)} }
.g3d-new-badge { font-family:var(--gm); font-size:9px; font-weight:700; letter-spacing:.02em; margin-right:1px; }

.g3d-quicks { padding:4px 0 10px; flex-shrink:0; overflow:hidden; }
.g3d-quicks-inner {
  display:flex; gap:5px; overflow-x:auto; padding:0 12px;
  scrollbar-width:none; -ms-overflow-style:none;
}
.g3d-quicks-inner::-webkit-scrollbar { display:none; }
.g3d-q { background:var(--gb3); border:1px solid var(--gbr2); color:var(--gw2); font-family:var(--gf); font-size:11px; font-weight:500; padding:6px 12px; border-radius:100px; cursor:pointer; white-space:nowrap; letter-spacing:-0.01em; transition:all .18s; animation:g3d-q-in 0.40s cubic-bezier(0.34,1.5,0.64,1) both; flex-shrink:0; }
@keyframes g3d-q-in { from{opacity:0;transform:translateX(14px) scale(.88)} to{opacity:1;transform:translateX(0) scale(1)} }
.g3d-q:hover { background:var(--gb4); border-color:var(--gbr3); color:var(--gw); }

.g3d-input-row { display:flex; gap:6px; align-items:flex-end; padding:8px 10px 10px; border-top:1px solid var(--gbr); background:var(--gb3); flex-shrink:0; }
.g3d-input { flex:1; background:var(--gb); border:1px solid var(--gbr2); border-radius:11px; color:var(--gw); font-family:var(--gf); font-size:12.5px; padding:8px 12px; outline:none; resize:none; min-height:36px; max-height:80px; line-height:1.52; overflow-y:hidden; transition:border-color .22s,box-shadow .22s; }
.g3d-input::placeholder { color:var(--gw4); }
.g3d-input:focus { border-color:var(--gbr3); box-shadow:0 0 0 2px rgba(255,255,255,0.04); }

.g3d-send { width:36px; height:36px; flex-shrink:0; background:var(--gw); border:none; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--gb); transition:background .2s,transform .15s,opacity .2s; }
.g3d-send:hover:not(:disabled) { background:var(--gw2); transform:scale(1.06); }
.g3d-send:disabled { opacity:.22; cursor:not-allowed; transform:none; }
.g3d-send.sending { background:var(--gb4); opacity:1 !important; cursor:default; }
.g3d-send-spin { animation:g3d-spin 1s linear infinite; transform-origin:center; }
@keyframes g3d-spin { from{stroke-dashoffset:56} to{stroke-dashoffset:0} }

.g3d-footer { display:flex; align-items:center; justify-content:space-between; text-align:center; font-family:var(--gm); font-size:8px; color:var(--gw4); letter-spacing:.08em; padding:5px 12px 9px; background:var(--gb3); flex-shrink:0; }
.g3d-footer-hint { opacity:0.55; }

@media(max-width:440px){
  #g3d-root { bottom:14px!important; right:12px!important; }
  .g3d-canvas { width:100px!important; height:145px!important; }
  .g3d-chat {
    width: calc(100vw - 24px) !important;
    right: 12px !important;
    bottom: 180px !important;
    max-height: calc(100vh - 180px - 70px) !important;
    border-radius: 18px;
  }
  .g3d-bubble { width:214px; right:0; }
  .g3d-badge { bottom:158px; }
  .g3d-scroll-btn { bottom:100px; }
}

@media(max-width:360px){
  .g3d-chat {
    width: calc(100vw - 16px) !important;
    right: 8px !important;
  }
}

@media(prefers-reduced-motion:reduce){
  .g3d-bubble,.g3d-chat,.g3d-q,.g3d-row,.g3d-dots span,.g3d-badge,
  .g3d-confirm-strip,.g3d-scroll-btn { animation:none!important; transition:none!important; }
  .g3d-bubble { transition:opacity .15s!important; }
  .g3d-chat   { transition:opacity .15s!important; }
}
`;