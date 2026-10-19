# Figma review and gap log

Updated 18 October 2026 against Imadi Innovations Website, file `4YOqW3WUKIlEaocLabMIXP`. The 17 October review used the browser, Figma editor, Prototype settings and Motion timeline. The follow-up inspected the live browser prototype and recovered exact Contact/CTA artwork. Local revision checks are recorded separately in [VERIFICATION.md](VERIFICATION.md).

The user reports that the website design is complete and the brand book is still pending. That brand book does not block this website update. The entries below distinguish source coverage, authentic content and project artwork from unfinished design; they do not assume the designer still needs to finish every listed item.

Six main page references are now identified, including Contact. The eight standalone hero/card/service/footer frames inventoried on 17 October are section studies rather than eight additional website pages. This is not a claim of pixel-identical pages: editable company copy and genuine portfolio material replace repeated sample content, and the specific differences below remain.

## Pages checked

| Page | Website | Figma frame | Review result |
| --- | --- | --- | --- |
| Home | `/` | [8019:126](https://www.figma.com/design/4YOqW3WUKIlEaocLabMIXP/Imadi-Innovations-Website?node-id=8019-126) | Existing sections retained; revised shared contact, Client Stories headings and final consultation CTA applied. Home process labels match the source's Step 01–04 treatment. Desktop/phone and hover checks passed. See G04–G06 for remaining content differences. |
| Service detail | `/services/mobile-applications` | [8157:1455](https://www.figma.com/design/4YOqW3WUKIlEaocLabMIXP/Imadi-Innovations-Website?node-id=8157-1455) | Exact phone composition restored. Dark capability strip, staggered four-card section, centered process, compact project introduction, two alternating feature rows and Insights corrected. Other service routes reuse this responsive template. See G07. |
| Projects | `/projects` | [8168:1041](https://www.figma.com/design/4YOqW3WUKIlEaocLabMIXP/Imadi-Innovations-Website?node-id=8168-1041) | Split hero, dark capability strip, filters, two-column portfolio grid, Insights and shared ending checked. Expanded to eleven portfolio entries; three new entries use labelled screenshot placeholders. |
| Case study | `/projects/dockiship` and other project routes | [8213:852](https://www.figma.com/design/4YOqW3WUKIlEaocLabMIXP/Imadi-Innovations-Website?node-id=8213-852) | Sentence-case hero, fact cards, challenge/approach, image presentation and pastel outcomes corrected. Eight entries have source-based narrative and workflow sections. Detailed sample composition remains a partial match; see G02/G11. |
| About | `/about` | [8222:2194](https://www.figma.com/design/4YOqW3WUKIlEaocLabMIXP/Imadi-Innovations-Website?node-id=8222-2194) | Earlier hero, photograph, capability strip, story cards and feature rows retained. Dark four-step How We Work `8377:475` now fills the old blank region. Consultation CTA `8381:1344` follows FAQ. Desktop/phone checks passed; G01 closed. |
| Contact | `/contact` | [8377:568](https://www.figma.com/design/4YOqW3WUKIlEaocLabMIXP/Imadi-Innovations-Website?node-id=8377-568) | Pale form/callout, dark email channels, exact full-width office photograph, editable testimonial selection, FAQ and footer implemented and checked at desktop/phone widths. Field rows are now editable and the custom dropdown/calendar behavior is browser-verified. Contact’s part of G09 closed; exact designer-state comparison remains G12. Genuine testimonials remain G04. |

Shared corrections include Space Grotesk/Satoshi typography, the sticky header matching the source’s fixed behavior, inner-hero capitalization, heading emphasis, the Services heading capsule, the exact FAQ photograph, a separate editable footer mark, and sizing that preserves longer CMS text. Text length, genuine project imagery and omitted sample endorsements change some section heights.

## Motion evidence and dates

The exact transition metadata below was read from the editor on **17 October**. The 18 October connector remains rate-limited, so these timings are preserved earlier evidence, not newly read settings for the revised file.

| Source component | Trigger and destination | Figma transition | Website treatment |
| --- | --- | --- | --- |
| Problem card `8035:632 → 8035:634` | While hovering → hover variant | Dissolve, 400 ms, Ease out | Gradient and exact purple icon-tile asset fade in. Keyboard focus has equivalent feedback. |
| Service benefit card `8159:737 → 8159:739` | While hovering → Variant2 | Dissolve, 400 ms, Ease out | Gradient fades in; ordinal and content remain still. |
| About story card `8280:489 → 8280:491` | While hovering → Variant2 | Dissolve, 400 ms, Ease out | Same shared gradient/icon treatment. |
| Read more `8035:791 → 8035:793` | While hovering → Variant2 | Smart animate, 200 ms, Ease out | Gap 10→20 px, horizontal padding 0→12 px, white background, purple label. Vertical padding 6 px; radius 6 px. |
| Services `8045:1912 → 8045:1914` | While hovering → Variant2 | Smart animate, 200 ms, Ease out | Text opacity increases, arrow changes to purple, image fades and moves from y67 to y−93. Source image is 480×280 at x1100 within a 1760 px row, with zero rotation. Geometry scales responsively. |

Hover-only effects are limited to suitable pointers. Focus feedback remains available by keyboard. Reduced-motion preferences disable these transitions.

On 17 October the selected five main-page Motion timelines each reported **0 tracks and 0 keyframes**; the checked header labels/booking button and FAQ controls had no assigned reactions. This was a selected-node inspection, not proof about every nested layer or a fresh timeline audit of the revision.

On **18 October**, the live source prototype visibly reproduced the Home problem-card gradient/icon hover and the Services preview fading/rising. Clicking the inspected CTA did not navigate, and clicking the second FAQ row did not expand it. Dragging the inspected Home testimonial strip did not move its cards; no arrows or autoplay were observed. Browser playback establishes those observed states, not exact duration/easing or the absence of every possible nested interaction. The website retains working navigation, enquiry submission and native FAQ controls. No extra entrance, floating, autoplay or page-transition effect is claimed as copied from this inspection.

The follow-up form inspection clicked the source Contact service dropdown and date field without observing an opened control. The reviewed Components page showed Card, Card2, Card3, Services and Read more components; distinct input/dropdown/calendar state variants were not identified there. This limits exact source-state comparison; it does not establish that the complete website design is missing those states. The implemented custom controls use the source form's typography, underline and brand tokens, with the functional checks recorded in [VERIFICATION.md](VERIFICATION.md).

## Resolved revision items — 18 October

| ID | Source resolution | Local verification |
| --- | --- | --- |
| G01 — closed | About’s former blank region is now dark How We Work `8377:475`, using the existing illustrated process-card treatment. | Editable four-step process inserted after the feature rows. Desktop/phone layout checked with source imagery and the introduction action at the right. |
| G03 — closed | The consultation CTA follows FAQ on Home, Service, Projects, Case Study and About, replacing the former gray pre-footer. | All five local reference routes render one final consultation panel with the recovered pale M and editable text/action. Contact correctly has no final panel. Desktop/phone checks passed. |
| G09 — Contact closed | Contact now has dedicated frame `8377:568`; its live prototype has been inspected. | Form/callout, email channels, exact office photo and FAQ checked at 1920 px and 354/390 px. Optional preferred-time persistence passed isolated CMS/API integration. Testimonial renderer checked with temporary fixtures; no sample endorsements seeded. Other G09 source-coverage notes remain below. |

The earlier form-structure limitation is also resolved: administrators can add, remove, hide and reorder field rows, change required rules and widths, edit dropdown options, validation copy and picker labels, and publish the result. The actual admin add → move → publish → remove → publish workflow was verified in a separate QA environment. Dropdown/calendar keyboard interactions, submission success and failure states were also checked; no synthetic enquiry or test owner was added to the main preview. See [FORM-EDITOR-GUIDE.md](FORM-EDITOR-GUIDE.md). G12 below concerns exact source-state comparison, not missing form functionality.

## Open gaps to revisit

| ID | Page or area | Gap / current decision | Further content or comparison | Next check |
| --- | --- | --- | --- | --- |
| G02 | Case study detail | Source-based narratives, four-step operational workflows and four descriptive outcome cards now exist for eight projects. The reference’s style board, grouped screens and detailed crypto/mobile composition still lack corresponding project artwork. Their pages are not identical to the sample. | Project-specific screen groups, design-system boards and final composition; approved dates, historical delivery stages or measured results if desired. Restro, One Window and Nutrilife need documentation before expanding their short descriptions. | Reinspect `8213:852`; compare actual section order, facts, image groups and outcome cards. Operational workflow steps describe product use, not an invented delivery history. See CASE-STUDY-SOURCES.md. |
| G04 | Testimonials | The 18 October Client Stories source retains photo cards/glass captions and repeats the sample identity Daniel Ross. Genuine quotes are still needed; the public section stays hidden when no approved published testimonials are selected. | Approved quote, name, role/company and optional photo. Designer sample identities are not endorsements. | Compare current Home `8377:523` and Contact `8381:479`; check selection/order, long quotes, photo/no-photo cards, scrolling and keyboard access when real entries are published. No autoplay was established. |
| G05 | Metrics / outcomes | Descriptive capability labels replace unverified numbers and ratings. | Verified counts, ratings or measured results if these are to be published. | Check the four-column bands and result-card wrapping after final wording. |
| G06 | Tijarat | The CashPilot concept has been replaced by a genuine public Tijarat invoicing image and logo. The image is captioned to acknowledge version differences. A single authentic screen replaces the source’s layered sample composition. | Final current Tijarat screen group/mockups and designer framing for the real product; confirm availability/launch wording separately. | Reinspect `8064:412`, compare real-product composition, responsive crop, caption and CTA. The real artwork resolves the identity mismatch; final multi-screen art remains open. |
| G07 | Service / portfolio artwork | Mobile service uses the exact Figma phone composition. Other services and project placements use relevant genuine portfolio imagery rather than repeating sample mockups. | Approved imagery for actual services/projects if a different presentation is wanted. This is an artwork/content choice, not a claim that the website design is unfinished. | Recheck the service template, each hero crop and the Services hover previews. |
| G08 | Interaction coverage | Existing hover metadata was read on 17 October; problem hover and service-preview movement were replayed in the source prototype on 18 October. Inspected FAQ/CTA clicks did not change that prototype view. Functional website controls remain. | Reinspect editor settings when available if different motion is expected; the exact revised settings have not been re-read. | Check affected Prototype settings/Motion tracks and replay completed browser flows. Do not infer timings, autoplay or scroll effects from static layers. |
| G09 | Additional routes, excluding Contact | Dedicated frames were not identified in the reviewed set for Services listing, Tijarat page, Insights listing, article detail, privacy or 404. These use the shared visual system. Contact is resolved separately above. | Identify any existing source frames for a separate comparison; bespoke frames are optional. | Compare newly identified frames with their corresponding routes. |
| G10 | Mobile / tablet source coverage | Responsive versions are adapted from desktop; separate mobile/tablet frames were not identified in this review. | Identify smaller-screen references if they exist or if bespoke behavior is desired. | Compare navigation, hero stacking, cards, form, galleries and FAQ at supplied sizes. |
| G11 | New portfolio screenshots | WhatsApp Worker, Codex Worker and Attendance System have source-based case studies and clearly labelled screenshot placeholders. | Public-safe screenshots or designed mockups for each project. | Replace each project cover/gallery in the CMS; recheck cards, hero crops, screen grouping and phone layouts. |
| G12 | Form interaction-state comparison | The admin field builder and branded inputs, dropdowns and date/time picker are implemented. Default, open, selected, focus, invalid, disabled, submitting, success and failure behavior has browser checks; exact matching against separate designer state variants is not established. Source dropdown/date clicks did not open a control in the inspected prototype, and corresponding state variants were not identified on the reviewed Components page. | Identify existing interactive-state frames/components or provide the designer's intended state reference if a stricter comparison is needed. No claim that the website design is unfinished. | Compare dropdown/calendar geometry, focus/error/disabled colors, selected styles and transition settings against identified source states. Repeat desktop/phone and keyboard checks after refinements. |

## Recovered assets and reusable content

The 18 October image resources were observed in the rendered prototype and downloaded as static images. These text-free originals keep headings/buttons editable:

| Runtime asset | Dimensions | Source image resource | Use |
| --- | --- | --- | --- |
| `/figma/contact-callout-art.png` | 1080×1080 | `fe15aadf4550cb90` | Saturated purple M in the form-side callout. |
| `/figma/contact-office-photo.jpg` | 2000×1335 | `cdc070096711cb36` | Contact office scene. Source illustration, not a claim that it depicts the company’s actual office. |
| `/figma/consultation-cta-art.png` | 1080×1080 | `c49c236e18db737c` | Pale M in the consultation CTA; source artwork lead `8381:1327`, “export (2) 2”. |

The M images have opaque white canvases despite their alpha channels; shared component styling handles their presentation. About’s dark process reuses `/figma/8062-182-imgHeroSection.png` and `/figma/8062-182-imgImage5.png`.

Previous completed work retained:

- Recovered original FAQ photo: node `8146:430`, design area 799×480.
- Recovered original About photo: node `8277:189`, design area 1760×600.
- Recovered mobile-service artwork: node `8159:135`, design area 744×840.
- Recovered exact hover icon tile: node `8035:641`, design area 88×88 including two inner-shadow effects.
- Verified Projects hero image frame `8204:259`: 780×493 at x1060/y120, radius24; retained genuine DockiShip content inside that framing.
- Added an editable editorial hero option, per-card Read more links and independent footer logo; preserved existing content and private drafts during the additive schema upgrade.
- Kept reusable contact, FAQ and CTA sections shared across pages. Editorial images, copy, links, block-array order and contact field definitions remain editable through Payload. Published form definitions govern server validation; older enquiry answers retain their original ordered snapshots.
- Expanded five existing case studies and added WhatsApp Worker, Codex Worker and Attendance System from local documentation/source. Replaced the product concept with genuine Tijarat artwork. [CASE-STUDY-SOURCES.md](CASE-STUDY-SOURCES.md) records the evidence and editing locations.

Service and case-study templates retain a fixed order for their core fields, such as hero, benefits, facts and results. Additional block sections can be reordered. Decorative assets, exact layout geometry and animation rules live in shared code; a new designer composition or motion behavior can require a component update, while routine content changes use the admin panel.

## Next review

Tell me which gap IDs, pages, authentic content or brand-book rules changed, or send the updated Figma link. Reopen affected frames, inspect layers and Prototype/Motion settings, compare local desktop/mobile pages, replay interactions and update this log. Recheck shared components on every page that uses them. Close an item only after its stated comparison/content requirement is met. Apply the eventual brand book through shared tokens, typography, assets and components wherever its rules differ from the current website.
