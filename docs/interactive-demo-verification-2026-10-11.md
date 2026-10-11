# Interactive service demo review — 11 October 2026

## Delivered

- Removed narrated service video players. Rejected video files and production sources are preserved in ignored `.local-evidence/video-production/`, outside public assets.
- Twelve repository-local interactive examples: Medicore, BuildCore, FactoryFlow, PipelineDesk, StaffHub, ServiceDesk, Meridian, Nexus, Bridgepoint, Zova, SwiftHaul and PulseClinic.
- Custom software and integration workspaces use desktop layouts on larger screens and a purpose-designed phone layout on mobile. CRM and AI examples use symmetric phone frames with fixed navigation and an independently scrolling screen.
- All screen navigation operates on browser-local sample data. Record actions, validation, notes, reports, deletion confirmation and undo are implemented where relevant. CSV exports are local downloads.
- AI examples retain three selectable/swipeable scenarios each. Intake proceeds through approval, simulated dispatch, acknowledgement and follow-up. Sources, action history and human-review boundaries are inspectable.
- Existing website-example links remain available; external websites have not been modified or represented as connected applications.

## Browser verification

Chrome, local preview on port 3012:

- Four dashboard service pages at 360, 768 and 1440px: three demos per page, zero video players, page width equal to viewport width (no horizontal overflow).
- Mobile device frames: equal 8px left/right borders. Navigation remains within the phone.
- Medicore rejects excess quantities; transfer changes Wuse 24 to 18 and creates Maitama 6, preserving total 112. Delete confirmation and undo restore the record.
- BuildCore rejects a ₦60,000 request against the sample ₦50,000 limit; approving one project leaves another project's approval available.
- FactoryFlow blocks release until the sample quality check is confirmed; release and dispatch update the batch state. Checks are associated with the selected record.
- PipelineDesk navigation, property-linked views, saved notes, stage changes and derived report counts verified.
- StaffHub blocks leave approval without replacement cover, then updates the roster after cover confirmation.
- ServiceDesk blocks resolution without a resolution note, then resolves after the note is saved.
- All nine AI scenarios reached the reviewed follow-up outcome. Scenario switching retains separate state. Activity and source screens verified.
- Zova, SwiftHaul and PulseClinic failure/retry/duplicate paths verified; delivery and booking acknowledgement remain separate from provider acceptance.
- Browser error log empty during final AI scenario checks.

## Automated verification

- TypeScript type check.
- Scoped ESLint for changed service components/content.
- Existing service release checks: five routes, fifteen examples, contextual contact links, payment failure/retry/duplicate behavior, contact validation and provider/render failure paths. No real messages or network side effects.
- Cloudflare/OpenNext production build. Existing middleware deprecation and third-party Sanity bundle duplicate-key warnings remain.

## Boundaries / remaining work

These are interactive sales demonstrations, not production systems. Data resets on reload; no live payment, contractor contact, notifications, document upload, model inference, backend persistence or server-enforced authorization is connected. Fictional policies and records are labelled. No new client attribution or business-result claims were added. Existing unverified project origins remain unresolved. Changes are local and have not been pushed or deployed.

Screenshots are in `.local-evidence/interactive-demos/`.
