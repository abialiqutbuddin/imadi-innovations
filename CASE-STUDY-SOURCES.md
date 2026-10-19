# Portfolio content sources and editing handoff

Reviewed 17 October 2026. The user authorized local project documentation/source as material for the company website. This review read product guides and implemented routes/services; it did not run the client applications or query their business databases. Source establishes implemented scope, not deployment status, measured business results or an endorsement.

## Website content

Five existing projects now have fuller case studies: DockiShip, eClinicAssist, LyncHR, PMO Karachi and Magnet Cargo. Three additional entries are WhatsApp Worker, Codex Worker and Attendance System. Restro, One Window System and Nutrilife retain their short existing public descriptions because their repositories are unavailable. The portfolio has 11 entries; Tijarat remains a separate owned-product page.

Each expanded case study has an overview, challenge/approach, four descriptive capability cards, an operational workflow and a closer look at three product decisions. The workflow describes how the product is used; it does not invent a development history. Dates, team sizes, testimonials and measured impact were not supplied and have not been invented.

The three new projects use clearly labelled screenshot placeholders. Existing case studies retain the images from the company’s public portfolio. No new screenshots of private business records were captured. Tijarat uses its genuine public invoicing image and logo instead of the CashPilot concept; the caption notes that layout can vary by version.

## Source map

### DockiShip

Catalog, warehouse stock, purchasing, order fulfillment, marketplace connections and role-specific views.

- `OP/DockiShip/docs/AI_CODEBASE_MAP.md` — lines 3-8,52-66: Multi-tenant warehouse/3PL product, tenant-scoped owner/member operations
- `OP/DockiShip/frontend/src/routes/AppRoutes.jsx` — lines 3-14,54-96,125-155: Owner/admin/member entry points, supplier-specific landing and inventory/purchase/stock-verification routes
- `OP/DockiShip/frontend/src/features/orders/README.md` — lines 3-28: Fulfillment, bulk actions, returns/reshipments, labels, pickup, tracking and TikTok/Temu order screens
- `OP/DockiShip/dockiship-backend/src/orders/README.md` — lines 5-20,24-30,33-41: Orders, stock/cost relations, transaction ownership, reports and shipping prerequisites
- `OP/DockiShip/frontend/src/features/inventory/README.md` — lines 3-25: Variants, warehouses, transfers, reconciliation, reorder preparation, stock verification

### eClinicAssist

Practice/provider directory, guided intake and corrections, credentialing and revenue-cycle follow-up.

- `OP/ECA/docs/AI_CODEBASE_MAP.md` — lines 5-21,58-79: Four active product/control-plane apps and separate auth, role, directory, shared-access, subscription layers
- `OP/ECA/user_frontend/src/routes/index.jsx` — lines 22-69,126-152: Implemented dashboard/directory/intake/credentialing/revenue cycle/report page imports and public intake routes
- `OP/ECA/user_backend/app_backend/routes/routes.js` — lines 37-83: Active Directory, practice, facility, provider, credentialing, reports, intake and revenue-cycle route wiring
- `OP/ECA/user_backend/app_backend/routes/intakes/adminRoutes.js` — lines 29-47: Intake create/send/remind, review/apply/convert/reopen, provider completion
- `OP/ECA/user_backend/app_backend/routes/intakes/publicRoutes.js` — lines 33-56: OTP, progress, queued saves, documents, consent, entity edits and submission

### LyncHR

Employee records, attendance, leave/loan approvals, payroll and settlement administration.

- `OP/HR_ECA/hr-new/docs/AI_CODEBASE_MAP.md` — lines 22-40: HR application scope: employee records, attendance, leave/loans, payroll, permissions, engagement and US attendance
- `OP/HR_ECA/hr-new/hr-frontend/src/routing/route-definitions.jsx` — lines 9-78: Active employee, attendance, reporting, loan/leave, payroll, documents, resignation and organization routes
- `OP/HR_ECA/hr-new/hr-backend/src/modules/api.module.ts` — lines 29-52: Runtime wiring for employee, reports, loan, workforce time, salary, payroll, engagement and resignation
- `OP/HR_ECA/hr-new/hr-frontend/src/components/feature/profile/registries/profile-tabs.jsx` — lines 26-88,92-115: Profile details, documents, attendance, payroll, PF/tax history and approver-specific leave tabs
- `OP/HR_ECA/hr-new/hr-backend/src/modules/attendance/ARCHITECTURE.md` — lines 3-12,27-39: Device/manual attendance, shifts, policies, exceptions, holidays and leave precedence

### PMO Karachi

Event structures, task ownership, web/mobile coordination, chat and reporting.

- `OP/PMO/backend/src/events/dto/create-event.dto.ts` — lines 6-27: Event dates, zonal/hierarchical structure, optional software and knowledge directories, departments and members.
- `OP/PMO/backend/src/tasks/dto/create-task.dto.ts` — lines 16-55: Task ownership, dates, statuses, priorities, progress, custom fields, venue/zone and software metadata.
- `OP/PMO/backend/src/tasks/tasks.controller.ts` — lines 680-784: Activity, linked tasks and dependencies endpoints with actor context.
- `OP/PMO/frontend/src/routes/AppRouter.tsx` — lines 1-40,151-218: Implemented web page imports and permission/role route guards.
- `OP/PMO/mobile-app/docs/AI_CODEBASE_MAP.md` — lines 7-16,98-150: Current-code overview, mobile feature map and permission-aware tabs; chat queue, meeting notes and work tracking.

### Magnet Cargo

Guided shipment bookings, pickup-day validation, admin views and linked driver delivery records.

- `OP/MAGNET_CARGO/frontend/frontend/src/components/BookingForm.tsx` — lines 18-45,67-143,152-183: Guided intake fields, schedule and numeric validation, persisted createBooking call.
- `OP/MAGNET_CARGO/backend/prisma/schema.prisma` — lines 3-5,12-72: MySQL data model, booking statuses, sender/receiver shipment fields, delivery records and admin/driver roles.
- `OP/MAGNET_CARGO/backend/src/bookings/bookings.service.ts` — lines 11-62: Server-side city/day validation, booking persistence, lookup and status update.
- `OP/MAGNET_CARGO/frontend/frontend/src/pages/AdminPortalPage.tsx` — lines 23-81,100-112,200-224: Loading bookings/deliveries, counts by status and driver provisioning UI.
- `OP/MAGNET_CARGO/frontend/frontend/src/pages/DriverPortalPage.tsx` — lines 54-146,161-165: Booking loading/search and latest delivery update prefill in driver workflow.

### WhatsApp Worker

Reusable sender sessions, message queues, receipt/reply webhooks and operator controls.

- `OP/PMO/WHATSAPP AUTOMATION/whatsapp_backend/README.md` — lines 1-16,33-40,64-115: Reusable connector boundary, session/transport APIs, queues, sender checks, webhooks, receipts and documented pacing limits.
- `OP/PMO/WHATSAPP AUTOMATION/whatsapp_backend/README.md` — lines 194-208: Shared numbers, per-application references, STOP suppression, reconnection and uncertain send handling.
- `OP/PMO/WHATSAPP AUTOMATION/whatsapp_backend/src/transport/transport.controller.ts` — lines 88-165: Guarded application-scoped media, pairing/session, queue, lookup and cancellation endpoints.
- `OP/PMO/WHATSAPP AUTOMATION/whatsapp_backend/src/transport/transport.service.ts` — lines 106-162,228-244,344-428,479-492: Idempotency, sender ownership, suppression, scheduling, pause/retry and uncertain-send paths in current source.
- `OP/PMO/WHATSAPP AUTOMATION/whatsapp_backend/README.md` — lines 25-31,89-95,130-147: Known Business-profile/native-choice limitations and implemented operator view; do not present as official platform approval.

### Codex Worker

Published AI capabilities, scoped application context, structured output, execution history and a separately described approved coding workflow.

The reusable execution service is `PMO/codex-worker`. The PMO coding-task approval flow is described separately; its repository access/release behavior is not claimed as a universal ability of every execution.

- `OP/PMO/codex-worker/README.md` — lines 13-16,97-114,177-208: Official SDK/App Server wrapper, application registry/admin configuration, generic execution scope and policies.
- `OP/PMO/codex-worker/docs/GENERIC_WORKER_API.md` — lines 14-46: Current generic capabilities and explicit exclusions for write tools, vector retrieval and generic repository implementation.
- `OP/PMO/codex-worker/src/generic-executor.ts` — lines 46-64,75-113,187-227: Structured execution result context, callback gateway identity and read-only/network-disabled execution settings.
- `OP/PMO/codex-worker/src/server.ts` — lines 1174-1289: Current generic usage, create, get, event and cancellation endpoint implementations.
- `OP/PMO/backend/docs/CODEX_DEVELOPER_WORKFLOW.md` — lines 44-63,102-105,138-170: Separate PMO requirement/plan approvals, scoped analysis, isolated workspaces, checks and explicit release stages.

### Attendance System

Independent event attendance portal: imports, WhatsApp follow-ups, coordinator inbox, claim review and queued response-sheet outputs.

This is the independent attendance follow-up portal under `PMO/WHATSAPP AUTOMATION`, distinct from LyncHR employee attendance and PMO event registrations.

- `OP/PMO/WHATSAPP AUTOMATION/attendance_backend/README.md` — lines 1-5,18-35,62-81: Independent product identity, integration boundaries, imports, campaign idempotency, history/output, absence-only sources, individual follow-up controls.
- `OP/PMO/WHATSAPP AUTOMATION/attendance_backend/src/portal/sheets/sheet-mapping.ts` — lines 4-27,37-79,91-105: Input mapping, attendance parsing, response output columns.
- `OP/PMO/WHATSAPP AUTOMATION/attendance_backend/src/portal/sheets/sheets.service.ts` — lines 335-358,460-485: Event-scoped uploaded worksheets, Google source reading, CSV/XLSX parsing and limits.
- `OP/PMO/WHATSAPP AUTOMATION/attendance_backend/src/portal/attendance.ts` — lines 1-27: Canonical attendance precedence and filter semantics.
- `OP/PMO/WHATSAPP AUTOMATION/attendance_backend/src/portal/campaigns/eligibility.ts` — lines 19-24,39-74: Personalization aliases and legacy attendance prompt eligibility/exclusion rules.

### Tijarat

Local-first billing, stock/payment connections, business reports, staff permissions and store assignments.

- `OP/Tijarat/tijarat_flutter/desktop_app/README.md` — lines 1-16,42-55: Original wholesale/local-first product aim, local persistence, stock ledger, event queue, atomic sale foundation.
- `OP/Tijarat/tijarat_flutter/desktop_app/docs/user_guide/INVOICING_PAGE_GUIDE.md` — lines 1-44: Invoice controls, payment splits, history, saving effects, customer credit rules.
- `OP/Tijarat/tijarat_flutter/desktop_app/lib/features/billing/domain/services/billing_transaction_service.dart` — lines 495-509,644-669,768-795: Customer required for unpaid balance, transaction boundary, stock posting, balance update, sale outbox event.
- `OP/Tijarat/tijarat_flutter/desktop_app/lib/core/sync/queue_sync_service.dart` — lines 13-33,171-188,502-537,559-569: Queued push/acknowledgement, pull/apply/cursor update, non-fatal offline-first pull errors.
- `OP/Tijarat/tijarat_flutter/desktop_app/lib/app/routing/app_routes.dart` — lines 174-193,278-312,578-597: Real quotation, invoice, inventory, report, and owner-only user routes.

## Remaining content needs

- Restro, One Window and Nutrilife: approved project briefs or source before expanding beyond current public descriptions.
- Actual screenshot groups, mockups and design-system boards to finish the Figma case-study composition.
- Approved project dates, client quotations and substantiated numerical outcomes, if desired.
- Fresh product screenshots as the applications evolve. Replace the placeholders through Media/Projects.

## Editing and future updates

Use **Content library → Projects** to change the summary, client/industry, cover, gallery, challenge, approach, results and Project story. Additional case-study sections contain the operational workflow and detailed narrative; these are editable and reorderable. Replace a cover image without changing its page code. Shared contact, FAQ and CTA records still update all pages that use them.

Starter content lives in `src/content/case-studies-*.ts`, assembled by `src/content/project-case-studies.ts`. A fresh seed includes it. The guarded `scripts/refine-project-case-studies.ts` upgrades only the untouched initial preview before administrator setup, defaults to dry-run and refuses edited/private records or slug conflicts. It is not a normal deployment step. Once editing begins, use the admin panel.

For visual follow-up, keep using [DESIGN-GAPS.md](DESIGN-GAPS.md), especially G02, G06, G07 and G11. The new case-study text reduces the narrative gap; final artwork and source-specific composition still require a later design pass.
