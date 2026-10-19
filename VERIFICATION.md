# Build and verification record — 18 October 2026

The local Next.js + Payload CMS production preview runs at <http://localhost:3100>. Create the first administrator at `/admin`; no owner account or shared password is seeded. The main preview database has no test account or synthetic enquiry. This record separates the current form-builder checks from earlier layout and fresh-seed evidence. It is not a production deployment receipt.

## Delivered

- Eight main pages, five service details, eleven case studies and three original articles: 27 published public routes.
- Seventeen reusable section types, including shared contact, FAQ and consultation CTA, plus the new editable Email & collaboration block.
- CMS-managed copy, images, services, projects, posts, testimonials, FAQs, uploads, branding, menus, contact details, SEO, section order and publication.
- Drafts, version history, authenticated preview, administrator/editor access, media resizing and alternative text.
- Validated `/api/contact` submission with the private `/api/enquiries` inbox. Optional preferred time is saved with browser time-zone context; it does not reserve an appointment.
- An admin field builder for adding, removing, hiding and reordering fields; editable required rules, widths, hints, constraints, dropdown choices, picker labels and status copy. Branded dropdown/date controls replace the browser-native menus/picker.
- Updated Contact form/callout, dark email channels and exact office photograph; About's four-step dark process; the shared consultation CTA after FAQ; updated Client Stories headings and photo-card presentation.
- Exact text-free Contact/CTA artwork, self-hosted Space Grotesk/Satoshi, original Figma assets and genuine portfolio imagery.
- Source-based stories for eight projects, including WhatsApp Worker, Codex Worker and Attendance System with labelled screenshot placeholders. Tijarat uses genuine public product imagery.
- Five previously specified hover transitions, sticky header, working navigation, category filters, mobile menu and native FAQ controls.

## Current form-builder code, schema and content checks

- TypeScript checks and the production build passed; all **24 focused tests** passed.
- All **five PostgreSQL migrations** are applied to the local preview. The latest is `20261018_183306_contact_form_builder`: ordered field/option arrays, editable picker/status copy, private answer snapshots and optional original enquiry summary fields. Incremental checks in a clean isolated PostgreSQL database preserve content/private drafts and retain `users.role NOT NULL`. The main preview's `users.role` column was already nullable before this change, as confirmed by its pre-migration backup; the new migration does not alter it. The clean-database assertion is not a claim about that existing main schema.
- The main database was backed up before this migration and the guarded form upgrade. A reviewed, fingerprint-checked plan enabled the builder on the Contact page and shared Contact section transactionally, preserving their existing wording and field order. No owner/test accounts or synthetic enquiries were added to the main preview.
- Isolated CMS/API integration exercises published form authority, required-field additions/removals, allowed choices, checkbox consent, real calendar dates, private drafts, disabled/empty forms, ordered historical answer snapshots, enquiry privacy, rate limits and the honeypot. Later editorial status updates cannot rewrite answer snapshots.
- A fresh disposable PostgreSQL database applied all five migrations and ran the current seed twice with production schema push disabled. The first run created 8 pages, 3 shared sections, 5 services, 11 projects, 3 posts, 8 FAQs, 33 media records and one settings record, with no users, enquiries or testimonials. Contact and shared Contact had 7 and 6 custom fields. The second run preserved all 286 table row hashes/counts, including timestamps and versions, and all 101 upload files (38,223,585 bytes), checksums and modification times. The disposable database and media directory were removed. Receipt: `work/form-builder-2026-10-18/fresh-seed-verification.json`.

## Current form browser checks — 18 October

- In a separate QA database, the real Payload admin added `qaReference` as the eighth Contact field, moved it up to seventh with **Move Up**, published and verified the public order, then used **Remove** and published to restore the original seven fields. Final field-row labels and the hidden legacy label controls in builder mode were verified. These edits did not use the main preview database.
- Contact was checked at **1920 CSS px** desktop and **390 CSS px** phone width with no horizontal page overflow. Custom dropdown checks covered End/Enter selection, typeahead, Escape dismissal and pointer selection.
- The calendar accepted keyboard day navigation and Enter selection, then applied **14:30**. Cancel preserved the selected value, Escape closed the picker, and Clear reset it. Entering hour **25** showed the inline time error. The dialog's keyboard loop was verified from Apply → Tab → Close and Close → Shift+Tab → Apply.
- A fictional browser enquiry saved to the separate QA database with the ordered field labels and `2026-10-21T14:30` / `Asia/Karachi` time-zone snapshot. It was not inserted into the main preview database.
- A deliberately delayed HTTP 503 fixture verified the pending state: `aria-busy` became true, all form controls were disabled, and after failure the answers remained and the controls were re-enabled. This is failure-state fixture evidence, separate from the real successful save.
- Invalid fields use branded inline messages and summary links that focus the corresponding input or custom-control trigger. A stale page receiving errors for newly published fields displays an explicit refresh instruction. Forms with no enabled fields disable submission. The actual draft-preview browser check also confirmed disabled submission and the editable publish message.

Editor instructions are in [FORM-EDITOR-GUIDE.md](FORM-EDITOR-GUIDE.md). Exact designer state comparison remains G12 below; these checks establish implemented behavior and sampled responsive layout.

## Final main-preview HTTP check — 18 October

After restoring the server to the main preview database, all **27 published routes** returned HTTP 200 with one H1; every present contact form had an enabled submit button. Private enquiries and site-settings reads returned 403, unauthorized preview returned 401, and a missing route returned 404.

The main database retained **0 users, 0 enquiries and 0 testimonials**. Its Contact page has seven builder fields and its shared Contact form has six. No first owner has been created; use `/admin` to create that account. The separate QA database used for the admin workflow and fictional enquiry was removed.

## Earlier layout revision and fresh-seed baseline — 18 October

Before the form-builder migration, the preview was backed up and its reviewed layouts were updated within a transaction; the three exact Contact/CTA images were registered. A subsequent apply run made no changes. No sample testimonial endorsements or owner accounts were created.

At that earlier point, a separate clean PostgreSQL environment applied **four migrations** and ran the seed twice. The first run created the complete starter site; the second preserved documents, timestamps, versions, settings and uploaded filenames/bytes/modification times without adding records. Its disposable database and temporary uploads were removed. This earlier receipt is separate from the current five-migration seed proof above.

Earlier fresh-seed receipt:

| Record type | Count |
| --- | ---: |
| Pages | 8 |
| Reusable shared sections | 3 |
| Services | 5 |
| Projects | 11 |
| Posts | 3 |
| FAQs | 8 |
| Media records | 33 |
| Users / testimonials / enquiries | 0 / 0 / 0 |

The 33 media records generated 101 uploaded files including resized derivatives in that earlier isolated seed check. The receipt is saved in the task's `work/revision-2026-10-18/fresh-seed-verification.json`; it is verification evidence, not a production data export or a result for the later form-builder migration.

## Earlier HTTP and layout browser checks — 18 October

- All **27 public routes** returned HTTP 200 with one primary heading and no temporary Figma asset URLs. The unknown-route check returned 404.
- All **33 uploaded media records** returned nonempty image responses. Unauthenticated enquiry and draft-settings reads returned 403; unauthorized preview returned 401.
- Six reference routes—Home, About, Contact, Projects, Mobile Applications and DockiShip—were checked at **1920 CSS px** desktop width and **354 CSS px** phone width. Each had one H1 and no horizontal page overflow, empty headings or broken loaded images. Final checks of all six at **390 CSS px** also passed with one H1, no page overflow and no broken loaded images. These are sampled responsive checks, not an exhaustive device matrix.
- The five existing reference templates each render one final consultation CTA after FAQ; Contact follows its source composition without that final panel. The desktop Contact introduction uses a 1600 px grid beginning at x160 on the 1920 px page, with a 780 px form. About's dark process has four steps, its source artwork and the action at the right of the introduction.
- Local Home hover reaches the gradient/icon active state with `opacity 0.4s ease-out`. Read more reaches a 20 px gap and 6 px vertical / 12 px horizontal padding with the 0.2 s transition. The Services preview reaches opacity 1 and translateY(−160 px) in the 1760×206 px row, with a 0.2 s ease-out transition.
- Final website checks confirmed the mobile menu opens, Escape closes it and returns focus to its toggle, the second FAQ opens, and **Book a meeting** navigates to `/contact`. The final pale M consultation composition was checked after its opacity adjustment; the production build and 12 tests passed again.
- The actual testimonial renderer was exercised through an isolated temporary fixture at 1440 px and 390 px. Five ordinary photo/quote cards supported keyboard scrolling. A six-card stress fixture, including a card without a photo and a 2000-character quote, grew without clipping. No fake testimonials were inserted into the CMS; the temporary server was closed afterwards. The public site correctly hides the empty testimonial section until genuine entries are published.

The task retains route/media and responsive-check receipts under `work/revision-2026-10-18/`, including `browser-phone-final.json`. Source-prototype inspection and local website rendering are distinct checks.

## Figma source review and limits

The 18 October live browser prototype confirmed the dedicated Contact composition, About's new dark How We Work section, the consultation CTA after FAQ on Home/Service/Projects/Case Study/About, and Client Stories' existing photo-card/glass-caption treatment. The exact Contact callout artwork, office photograph and pale CTA artwork were recovered from observed static image resources. Contact's office image is illustrative source photography, not evidence of the company's actual premises.

The source prototype visibly reproduced problem-card gradient/icon hover and the Services preview rise. Dragging the inspected testimonial strip did not move the cards; no arrows or autoplay were observed. The inspected source CTA did not navigate and the second FAQ click did not expand it. The website retains working links, form submission and native FAQ behavior.

The follow-up form inspection clicked the source Contact service dropdown and date field without observing an opened control. The reviewed Components page showed Card, Card2, Card3, Services and Read more components; separate input, dropdown and calendar interaction-state variants were not identified there. Closed website controls follow the inspected form. Their open, focus, selected, error and disabled states use the shared brand styling and have functional browser checks; an exact designer-variant comparison is still pending as **G12**. This is a source-comparison limit, not a claim that the designer's website is unfinished or that every state is pixel-identical.

The exact three **400 ms Ease out Dissolve** card effects and two **200 ms Ease out Smart animate** Read more/Services effects were read from editor settings on **17 October**. Selected main-page Motion timelines then reported zero tracks/keyframes. These remain dated metadata: the rate-limited connector prevented a fresh exact-settings/timeline audit of the revised file. Browser playback does not establish exact revised timings or the absence of every nested interaction. No additional entrance, floating, page-transition or autoplay effect is claimed as copied.

G01 (About's missing section), G03 (gray pre-footer replacement) and Contact's part of G09 are resolved by implementation and local checks. Field structure is now editable and the custom controls are functionally verified; G12 retains their precise source-state comparison boundary. [DESIGN-GAPS.md](DESIGN-GAPS.md) records the remaining artwork, authentic-content, source-coverage and interaction-verification items. This is not a pixel-identical all-page sign-off: genuine company copy changes heights; project-specific screen/style-board compositions remain partial matches; genuine testimonials are still needed; separate mobile/tablet references were not identified in the review. [CASE-STUDY-SOURCES.md](CASE-STUDY-SOURCES.md) records researched capabilities and remaining screenshot/documentation needs.

The user reports that the website design is complete and only the brand book is pending. The brand book does not block this update; later rules can be applied through shared typography, tokens, assets and components.

## Earlier checks retained — 17 October

These checks were completed before the 18 October revision and were not all repeated during it:

- First-administrator bootstrap, editor permissions, private enquiry access, input validation, rate limiting and honeypot behavior in an isolated environment.
- Published A → private draft B → authenticated preview B → published B for pages, shared sections, services, posts and site settings.
- Browser enquiry submission saved to PostgreSQL, confirmed by the success message and stored record; the synthetic QA record was removed.
- Phone menu opening, Escape closing with focus restored, Mobile Apps filtering, keyboard navigation to Nutrilife, portrait gallery layout and FAQ expansion.
- Sticky header remaining at y0 after scrolling; compiled reduced-motion rules disabling transitions. The operating-system preference was not toggled in that pass.
- All eight expanded case studies checked at 1309 px and 354 px with four descriptive outcomes, four operational workflow steps and no page overflow/broken loaded images. Automation & AI filtering showed the two workers. Tijarat used its real product image without floating concept layers.
- Original five main desktop frames and eight standalone section studies inspected through the browser/editor. The studies were section explorations, not eight extra page routes. FAQ/About photos, mobile-service artwork and hover icon were recovered.

## Deployment and content boundaries

This is a **local production preview**. Nothing was deployed to `imadi-innovations.com`. Docker configuration is supplied, but image/container execution was not tested because this machine has no running Docker daemon or Compose plugin.

No client endorsements, numerical performance claims or development histories were invented. Repository review establishes source capabilities; those client applications were not started or deployed as part of this work. Approved testimonials, replacement screenshot placeholders and version-qualified Tijarat imagery can be managed through the admin.

Page block arrays and contact-form fields are editable/reorderable. Form labels, choices, required settings, widths, validation copy and picker labels use the admin panel. Core service/case-study field order and decorative layout/motion rules remain shared code; fundamentally new compositions, control types or integrations may require a component update.

Enquiries are stored in the admin inbox. **Outbound email and password recovery are not configured**: an email adapter and sender credentials are required before relying on delivery. Production migrations, durable media, authenticated publishing and enquiry/email behavior must be checked again in the actual hosting environment.
