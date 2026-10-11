# GITS service-page design audit

Date: 11 October 2026. Audit only; no website implementation, commit, push or deployment performed.

## Verdict

Keep the editorial identity, the full stories, the before/after explanations, delivery sections, results sections and existing footer artwork. The problem is not that these pages need a replacement design. They need a better hierarchy around the examples, usable mobile product previews, consistent interaction feedback and clearer evidence labels.

The highest-priority issues are the contradictory proof-of-work claims, insufficient contrast in important case-study text, and keyboard behavior of the shared mobile menu. The clearest visual defects are the narrow phone previews, wrapping tablet header and orphaned punctuation in the integrations hero.

## Scope and evidence

Inspected the current **local corrected version** at `http://127.0.0.1:3012`, not the older deployed version. Existing uncommitted changes were preserved.

| Page | Desktop review | Mobile review |
| --- | --- | --- |
| Custom software | Page structure; Medicore, BuildCore and FactoryFlow opened | 390px page and Medicore Dispatch; 320px FactoryFlow; 768px shared header/FAQ |
| Internal tools & CRM | PipelineDesk, StaffHub and ServiceDesk opened | 390px page and PipelineDesk opened |
| AI & business automation | Nexus, Bridgepoint and Meridian opened; Nexus urgent Actions | 390px page, Meridian conversation, Nexus Delivery/Results; shared menu keyboard test |
| Integrations & APIs | Hero, offering grid, Zova, SwiftHaul and PulseClinic opened | 390px page, Zova opened, integration details navigation |
| Websites & digital experiences | All three site/demo switches; Elowen property and room selection | 390px page, NOTGATE site/demo comparison and example layout |

Main viewport: 1440×900 desktop and 390×844 mobile. Additional checks: 320×780, 768×1024, and 1728×1117 for the shared footer. These are CSS viewport checks, not physical-device or Safari certification. Every example was opened on desktop; not every possible workflow transition or mobile example was exhaustively retested. Source inspection supplemented the browser review.

Some exploratory full-page screenshots contain a fixed-header capture artifact or content mid-animation. Those are not website defects. The focused screenshots linked below are the primary visual evidence.

## Prioritized findings

P1 = resolve before treating the pages as polished client-facing proof. P2 = important usability/design upgrade. P3 = refinement.

### 1. P1 — Proof labels contradict the strongest headlines and results

The examples disclose that client attribution and results are unverified, yet headlines still say “How we…”, “recovered ₦2.1M/month”, “recovered ₦480K/month”, and “made it impossible…to lose another lead”. Nexus Results presents additional monthly revenue and a seven-week payback as achieved outcomes. The small disclaimer does not reconcile that presentation. Hero claims such as “12+ countries served”, “Clients across 12+ industries” and “6-week average” also require evidence.

This is an unresolved evidence issue, not a finding that the claims are false. Separate **verified client work**, **concept demonstrations**, and **illustrative outcomes** prominently. Keep the stories, but align their tense and result labels with their actual evidence status. Never invent client attribution or measurements.

Evidence: [Nexus Results on mobile](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/ai-results-mobile.png). Source: `src/components/service-examples/CaseDemo.tsx`, the five page data sets.

### 2. P1 — Supporting case-study text is too faint

Zova’s 12px subheadline and 9px story labels render with `lab(65.9269 -0.832707 -8.17473)` against white: approximately **2.6:1** contrast. The same `text-gray-400` treatment appears throughout the four operational service pages. This affects real explanatory content, not just decoration. Normal text needs at least 4.5:1 under [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Darken meaningful secondary copy and increase tiny metadata/section labels. Preserve the quiet hierarchy through weight, size and spacing instead of low contrast. Recheck all accent palettes, not only grayscale.

Evidence: [CRM opened card](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/crm-open-mobile.png), [integration details](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/integration-tabs-mobile.png).

### 3. P1 — Mobile menu allows keyboard focus behind its overlay

With the menu open, Escape did not dismiss it. Starting at Close menu, six Tab presses moved through five menu links and then into the obscured “What we automate” page link. The menu also repeats Contact and Get free audit in two places. It lacks an explicit dialog/focus-management structure.

Add focus containment, Escape dismissal, focus return and a clearly named menu structure. Remove duplicated choices while keeping the existing visual treatment. This is shared by all five pages.

Evidence: [mobile menu](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/mobile-menu.png). Source: `src/components/Navbar.tsx` mobile-menu block.

### 4. P2 — The supposedly sticky page-section navigation disappears

The bar has `position: sticky; top: 64px`, but an ancestor in `layout.tsx` uses `overflow-x-hidden`, which computes to vertical overflow `auto`. After navigating to Custom Software FAQ, the bar’s top was −7121.5px instead of remaining beneath the header. This deprives readers of an easy way to move between sections on very long pages.

Fix the overflow/sticky relationship and reconcile its offset with the actual header height. Keep anchor navigation and reduced-motion handling. At narrow widths, add a subtle indication that additional section links can be horizontally scrolled.

Source: `src/app/layout.tsx:185`, `src/components/editorial.tsx:140`.

### 5. P2 — Proof is buried too far down the mobile pages

With examples closed, their sections begin at the following approximate document positions at 390px:

| Page | Examples start | Entire page height |
| --- | ---: | ---: |
| Custom software | 4119px | 10466px |
| Internal tools | 4290px | 10611px |
| AI automation | 3991px | 9651px |
| Integrations | 5266px | 10724px |
| Websites | 3242px | 10339px |

Long content is not inherently wrong, but visitors seeking proof must pass several screens of introduction and capability lists first. Introduce a compact, intentional example teaser or prominent jump link earlier. Compress the mobile capability catalogue through progressive disclosure. **Do not delete the full stories or delivery content.**

### 6. P2 — Nested mobile frames waste the screen width

Custom Software and Internal Tools stack page gutters, card padding, demo-band padding, demo-wrapper padding, phone bezel, and app padding. At 390px, PipelineDesk’s phone is only 282px wide. At 320px, FactoryFlow’s phone is 212px wide and its inner scrolling region only 196px. “Production” breaks across two lines in the bottom navigation; a statistics label also exceeds its narrow cell.

Give the phone most of the available width, using fewer nested margins on mobile. Allow outer demo bands to go nearly edge-to-edge inside the expanded card. Preserve the clean, symmetrical bezel. Adjust statistics and navigation at genuinely narrow widths rather than forcing the desktop density into a small phone.

Evidence: [FactoryFlow at 320px](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/factoryflow-320.png), [CRM mobile](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/crm-open-mobile.png).

### 7. P2 — The story navigation comes after a large demo block

Opening an example first shows the disclosure, a long header, instructions and the demo. Story / What we built / Delivery / Results are below that entire block. The Medicore mobile demo wrapper alone is about 845px tall. Readers cannot quickly choose the story without scrolling through the demo first.

Expose the example’s content navigation near its top, with separate, clear access to the demo. Keep all four sections and the existing collapsed-card behavior. Add an accessible way to enlarge a demo for exploration; currently the inspected shells have no expand control.

Evidence: [Medicore Dispatch and story navigation](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/custom-dispatch-mobile.png).

### 8. P2 — Tablet switches to desktop navigation too early

At 768px, “What We Build” and “Get free audit” wrap into two lines while neighboring labels remain single-line. The header looks compressed and inconsistent.

Use a breakpoint based on available space, or a deliberately compact tablet navigation. Do not shrink the type to make everything fit.

Evidence: [768px header above FAQ](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/faq-tablet.png). Source: `src/components/Navbar.tsx` `md:flex` desktop blocks.

### 9. P2 — Website simulations do not match the visual quality of the sites

NOTGATE’s site preview shows branded artwork, imagery, composition and warm colors. Switching to Demo replaces this with a plain black panel, generic white buttons and a purple primary action. LaMed and Elowen likewise use a much simpler shared simulation rather than their actual site presentation. This lowers the perceived quality precisely when visitors try the work.

Reuse each site’s actual design tokens, imagery and suitable components for the simulated journey. Keep the safety boundary and no-live-submission labeling; it does not require a live backend to demonstrate a high-quality interface.

Evidence: [NOTGATE site preview](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/websites-examples-mobile.png), [NOTGATE demo](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/website-demo-mobile.png).

### 10. P2 — Elowen room buttons promise a visual interaction they do not deliver

Selecting Kitchen only adds a text notice. No room image or scene changes, although the example describes property tours and the demo invites visitors to explore room views.

Show actual sample room imagery with a selected-state indicator, a usable gallery and accessible labels. Keep sample-property labeling. If imagery is unavailable, describe the interaction as a planning concept instead of implying a tour.

Evidence: [room selection](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/elowen-room-desktop.png). Source: `src/components/service-examples/WebsiteMiniDemo.tsx` room buttons.

### 11. P2 — Story scope and demonstrated scope are not consistently distinguished

For example, Medicore’s story describes automated expiry alerts and role-specific operation, while the current demo offers dated sample lot notes, held-stock rules and replenishment workflows—not an expiry-alert or role-switching interface. Website copy mentions PLASCHEMA verification and property tours, while the mini demos explicitly do not perform verification or show tours.

Add a concise “Try in this demo” versus “Full solution scope” distinction tied to each story. Where a capability is central to the sales promise, demonstrate its interface or label the gap honestly. Do not remove the story to conceal the gap, or present simulated actions as real integrations.

Source: relevant page stories, `operations-model.ts`, `OperationsProduct.tsx`, `WebsiteMiniDemo.tsx`.

### 12. P2 — Nexus urgent-case identifiers disagree

The Urgent intake Actions screen displays **Urgent callback U-002** but **Intake summary · C-014**. The latter is hardcoded across Nexus scenarios. This makes the system look less dependable when clients inspect the workflow closely.

Use scenario-specific references consistently across conversation, action, summary and activity views.

Evidence: [urgent intake](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/ai-urgent-desktop.png). Source: `src/components/service-examples/AIWorkspace.tsx` intake-summary block.

### 13. P2 — Integration hero has an orphaned em dash

At 1440px, the first headline phrase wraps the em dash onto a line by itself, before the italic second phrase. This looks like a layout error rather than deliberate editorial typography.

Keep punctuation attached to its phrase and tune the measure/responsive type sizing. Review line breaks at tablet widths as well.

Evidence: [integration hero](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/integration-hero-desktop.png).

### 14. P3 — Case headers contain too much competing metadata

Internal Tools combines client description, industry and scope into a 9px line, sometimes repeating the same category. Collapsed cards add long headlines, subheadlines and multiple outcome pills. The mobile opening screen can become mostly disclaimer and header rather than an enticing example.

Use a short category, product name and one clear problem statement in the collapsed state; keep the detailed context in the full example. Put the evidence type into a compact but legible label. Replace repetitive blanket disclosures with accurate, case-specific disclosure text—especially on the website examples, whose copy does not actually include the delivery/results structure mentioned by the generic notice.

Evidence: [collapsed custom-software section](/Users/user1/Downloads/GITS/gits-whatsapp/.local-evidence/service-design-audit-2026-10-11/custom-collapsed-mobile.png), CRM mobile evidence above.

### 15. P3 — Demo navigation and visual identity need more intentional details

The shell assigns the same four icons by position rather than meaning: Chat receives a dashboard icon; Sources receives a chart icon. BuildCore’s outer brown treatment surrounds a blue app; FactoryFlow’s purple outer treatment surrounds an orange app. Desktop action-centre cards stretch to the height of adjacent record lists, leaving large empty areas.

Use semantic icons, harmonize the case/app accent relationship, and arrange desktop summaries around information priority instead of equal-height filler. Keep each product’s industry-specific character rather than making every demo look identical.

Source: `DemoShell.tsx` icon array; `demos.css` `.demo-product-grid`; case theme data.

### 16. P3 — Small utility controls can be easier to touch

Demo Reset is a small utility button; social links are 32px squares; footer service links have roughly 15px text boxes. The footer itself fits the inspected widths and its artwork remains intact. This is a hit-area refinement, not evidence that the footer needs rebuilding or that every small link fails an accessibility criterion.

Increase clickable padding without changing the footer composition. Prefer comfortable touch areas and keep visible focus states across outer page controls as well as the demos.

## Page-by-page upgrade direction

| Page | Preserve | Targeted upgrades |
| --- | --- | --- |
| Custom software | Desktop workspaces; full narrative and before/after; green/brown/purple case character | Wider mobile phones; readable metadata; accessible example navigation above demo; demonstrate or label expiry/role scope; improve action-centre layout |
| Internal tools & CRM | Phone presentation; PipelineDesk, StaffHub and ServiceDesk workflows; full stories | Remove nested mobile gutters; shorten duplicated category lines; make the pipeline introduction less dominant so real records appear sooner; clarify sample payroll/attendance scope |
| AI automation | Scenario selection; source references; human approval/dispatch/acknowledgement stages | Surface a compact progress trail and the next useful action; reconcile reference IDs; clearly distinguish scripted guidance from actual agent execution; substantiate or relabel ROI claims |
| Integrations & APIs | Distinct checkout/events/finance, dispatch/tracking/updates and booking/CRM/finance views | Fix hero wrapping; shorten the mobile 12-item catalogue; improve story navigation; distinguish queued/accepted/delivered events consistently; resolve revenue-evidence labels |
| Websites | Actual site previews; editorial copy; visible live-site links; process section | Bring demo fidelity up to site fidelity; implement real room imagery; improve preview-chrome hierarchy; use accurate project labels and disclosures |

## What passed / should not be thrown away

- All five service pages fit the 390px viewport without page-level horizontal overflow. The tested Custom Software 320px state also contained page overflow, although individual demo labels were cramped.
- All 15 example entries remain present, and all were opened on desktop. The four operational pages retain their story, modules, delivery and results sections.
- Desktop custom-software and integration examples use workspaces; narrow layouts switch to phones. The phone bezel is symmetric in the focused mobile captures.
- The shared footer retains its original hands artwork and fits both 390px and 1728px. Preserve it.
- Contextual service contact links are present. The tested Websites CTA reached the contact form with “Websites and digital experiences” in its editable context field. No form was submitted.
- Demo actions are explicitly sample/simulated; no live payments, prescriptions, legal advice or external contractor messages were performed.
- Native buttons, expanded-state attributes and demo focus-visible styling are a useful existing foundation.

## Verification results

- `node scripts/check-demo-workflows.mjs`: **67 assertions passed** covering model invariants and restored sections.
- `node scripts/check-service-release.mjs --http`: **passed** route/example/context-link and stubbed contact tests; all five pages returned HTTP 200; `/projects` redirected to `/what-we-build`.
- The first local HTTP check was blocked by the shell sandbox; rerunning with local-network permission passed. Stub-provider log lines are test output, not real messages.
- Browser checks: menu Escape/Tab failure reproduced; sticky navigation failure reproduced; Nexus reference mismatch reproduced; Elowen room interaction reproduced; website service contact context verified without submission.
- No new build was required because the audit did not change application code. These checks do not constitute a full accessibility certification, performance benchmark or production deployment verification.

## Recommended implementation order

1. Resolve evidence labels and unreadable text; repair shared menu keyboard behavior.
2. Fix shared sticky navigation and tablet header.
3. Improve mobile demo width and example content navigation, preserving the stories.
4. Upgrade website-demo fidelity and story/demo scope alignment.
5. Refine case metadata, icon semantics, color alignment and utility hit areas.

Remaining verification after implementation: real iOS/Android scrolling, keyboard and screen-reader review, reduced-motion behavior, text zoom, every example’s mobile detail forms and transitions, and production parity. Client attribution and business-result evidence require owner-provided records; they cannot be resolved by visual inspection.
