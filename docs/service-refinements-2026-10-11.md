# Service page refinements — 11 October 2026

## Delivered locally

- Preserved the five service pages, existing visual identity, case narratives, delivery sections, outcome statements and footer artwork. Operational examples still reveal their demos only when opened.
- All 15 examples are identified as real client projects with identifying names changed for confidentiality, following the owner's clarification. This confirms client-project origin, not independent verification of every result figure or delivery detail.
- Separated the client story from the preview: all interactive actions use sample data and do not contact live recipients or transact externally.
- Fixed sticky section navigation by removing the outer vertical scrolling container created by `overflow-x-hidden`.
- Added direct navigation to story, scope, delivery and results above operational previews. Explained that the preview covers selected workflows rather than every module in the full project scope.
- Made mobile service catalogues compact disclosures without removing their descriptions. Desktop descriptions remain visible. Shortened collapsed mobile case cards; the complete narratives and outcomes remain in the expanded sections.
- Widened mobile phone previews and enlarged controls. Added an expanded reading view that retains demo state, using element fullscreen where supported and inline enlargement otherwise.
- Improved secondary text contrast, sample statistics layout, screen icons and case/demo colour consistency. Removed the website example's oversized decorative-number collision and the orphaned integration hero dash.
- Fixed mobile menu focus trapping, Escape dismissal, focus restoration and background inertness. The compact header remains available through tablet widths; the smallest phone header moves Blog into the menu.
- Enlarged footer link/social hit areas, improved availability-label contrast and retained the artwork and overall footer composition.
- Fixed Nexus urgent intake to display record U-002 rather than the consultation reference. Added a visible AI workflow progress indicator.
- Improved website-preview typography, palettes and Elowen imagery. Property selections and gallery controls change actual images; virtual-tour imagery is labelled as such, not presented as a kitchen photograph. Requests remain simulated.

## Verification

- `npx tsc --noEmit`: passed.
- Scoped ESLint on the edited navigation, service pages and demo components: passed with no warnings.
- `node scripts/check-demo-workflows.mjs`: 67 assertions passed. Covers transfer conservation, stock reservations/holds, budgets, quality gates, duplicate transitions, materials and preserved disclosure/story sections.
- `node scripts/check-service-release.mjs --http`: passed. All five service routes and related routes returned HTTP 200; 15 example identifiers remain present; contextual contact validation and failure handling passed with mocked providers. No real messages were sent.
- `npm run build`: passed. Existing middleware and Node module-registration deprecation warnings remain. Initial sandbox attempt was blocked from opening a local port; the permitted build completed successfully.
- Browser checks: all 12 operational examples expose four distinct working screen tabs (48 screen states), without desktop page overflow at 1440px. All three website samples expose three distinct page states (nine states). This is UI verification, not an exhaustive test of every possible action.
- Representative operational previews checked at 390px and 320px: no page or preview-content horizontal overflow. At 320px Medicore/CRM phone width is 256px; AI/integration phone width is 272px. Sticky navigation remains below the fixed header.
- Header tested at 320px, 390px and 768px; menu focus cycling and Escape dismissal verified. Wide footer checked at 1728px. Elowen gallery verified to load different image sources.

Screenshots: `.local-evidence/service-refinements-2026-10-11/` includes desktop and mobile service previews. The local preview is at http://127.0.0.1:3012/.

## Owner confirmation still needed

1. Client-project origin is confirmed by the owner for all 15 examples. All displayed client names are changed for confidentiality; protected client identities do not need to be disclosed to visitors.
2. Confirm the measured outcomes and delivery facts (especially financial, conversion, speed and headcount claims) before treating them as verified proof. A changed client name does not by itself verify a business-result figure.
3. Previews intentionally use simulated data, guided AI responses and no live external dispatch. They are not production backends, deployed client systems or demonstrations of every module described in the story.

Nothing was pushed or deployed during this refinement pass. Existing unrelated WhatsApp/advisor changes were left intact.
