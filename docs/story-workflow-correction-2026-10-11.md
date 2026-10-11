# Service stories and interactive previews — correction

## Restoration boundary

The five service routes were restored from `87c0627`, not rebuilt around the generic `ServiceDetail` layout. The original hero copy, service lists/carousels, example introductions, stories, before/after comparisons, module explanations, delivery timelines, results sections, FAQs and editorial layout are retained. For the four operational service pages, examples begin closed and their demos mount only within the expanded example. The website service retains its original screenshot-first rows and explicit Site / Demo toggle.

Only the preview interfaces and targeted correctness/accessibility issues have been changed. Global navigation, hero and footer components are untouched. Existing unrelated WhatsApp work is not part of this correction.

## Workflow structure

| Example | Interactive structure | Important checks |
| --- | --- | --- |
| Medicore | Inventory lots → reserved transfer request → approval → dispatch → receiving acknowledgement → stock movement report | Held stock cannot move; quantity reservations; source/destination differ; total stock includes transit; completed transfers cannot replay; linked history prevents deletion |
| BuildCore | Project progress and site notes → materials request → threshold review → approval → supplier PO → goods receipt → committed/actual budget | Positive requests; remaining budget checked again at approval; receipt charges actual spend once |
| FactoryFlow | Raw store → material reservation/new batch → production → quality → packaging → warehouse → shipment → delivery proof | Material availability; three quality checks; held batches excluded from dispatch; required step references |
| PipelineDesk | Pipeline board → lead detail → dated visit → offer → stage change → property availability → reports | Visits/offers required for relevant transitions; sold / under-offer labels derive from linked lead state |
| StaffHub | Draft shift assignment → publish → attendance; leave request → cover check → approval → roster update | Overlapping same-time assignments and approved leave rejected; replacement checks; roster survives tab navigation |
| ServiceDesk | Ticket → named technician → vendor acknowledgement → work / resolution note → closure → client portal | Assignment and acknowledgement gates; an ordinary update does not qualify as a resolution; manually advanced sample SLA clock |
| Nexus | Family-law enquiry → qualification summary → review → appointment/callback dispatch → acceptance → handoff history | Scripted sample, not legal advice or a live calendar; family-law context matches the original story |
| Bridgepoint | Sample field comparison → missing / conflicting / unreadable flag → clarification request → acknowledgement → human review | Reviewer inspection required before completion; no identity verification, credit scoring or eligibility decision |
| Meridian | Sourced HMO enquiry → ticket and contractor draft → review → dispatch → acknowledgement → tenant update → follow-up | Unknown policy questions route to humans; contractor and tenant responses explicitly simulated |
| Zova | Method/gateway selection → normalized event → receipt → reconciliation → reviewed refund → audit | Outage/retry; invalid event rejection; duplicate prevention; refund bounded by remaining balance |
| SwiftHaul | Available driver → acceptance → collection → transit → proof of delivery → customer route / notification views | Busy driver check; acknowledgement before collection; delivery proof required; no live GPS or SMS |
| PulseClinic | Slot → confirmation / CRM → reminders → payment → attendance → invoice / follow-up | Slot conflicts; ordered state transitions; duplicate completion guarded; sample client only |
| NOTGATE | Screenshot → explicit demo → sample project → project detail → enquiry preview | Nothing sent externally; original dark editorial identity retained |
| LaMed | Screenshot → explicit demo → sample document → staff acknowledgement → branch collection | No real prescription or coverage verification; closed sample branch disabled |
| Elowen | Screenshot → explicit demo → property → room selection → viewing request preview | Sample property details; no real viewing booked; full website link retained |

## Verification

- `node scripts/check-demo-workflows.mjs`: **67 assertions passed**, covering domain transitions, inventory conservation/reservations, quality gates, budget overcommit, duplicate completion, material validation and restored disclosure/story sections.
- `node scripts/check-service-release.mjs --http`: five service pages and all 15 example anchors returned correctly; related contact / portfolio routes and projects redirect passed. Contact-provider tests used stubs, not real emails.
- `npx tsc --noEmit`: passed during implementation.
- Scoped ESLint across `src/components/service-examples` and the five service routes: passed during implementation.
- `npm run build:worker`: successful builds during implementation. Existing middleware deprecation and generated Sanity duplicate-key warnings remain.
- Chrome browser tests exercised complete stock receipt, procurement receipt, QC rejection/pass, lead visit/offer/sale, leave cover/roster persistence, documented repair/portal, payment outage/retry/duplicate/refund, driver acknowledgement/delivery, booking-to-invoice, sourced contractor follow-up and mandatory document review. All three website preview flows were also exercised.
- 1440px desktop and 390px mobile layouts reviewed; 320px staff layout checked for page overflow. Phone bezel is symmetric and only one device frame renders. Screenshots are in ignored `.local-evidence/story-workflow-correction/`.

## Evidence and limits

Original outcome figures and retrospective stories have been retained because the requested correction is to restore them, **not** to claim they are verified. Each example has an explicit evidence notice. Client attribution, contribution, delivery dates, comparative figures and commercial outcomes still need supporting records before use as proof of client results. Unsupported compliance badges were removed. The sample interface is not evidence that an integration, certification or client deployment exists.

These are browser-only, resettable product demonstrations. They cover the workflows above, not every production feature described in the original module narratives. There is no database, authenticated role enforcement, real stock, payments, document upload, notification delivery, GPS, model retrieval or external calendar connection. Production security, durable queues, real payroll calculations, full property/HR data models and vendor integration tests remain outside this website-preview change. Do not market this work as a complete deployed operational product.

The correction has not been pushed or deployed. Review locally before replacing production.
