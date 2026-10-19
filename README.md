# Current production deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the HostHatch deployment, CI, SMTP settings, backups and recovery. The Docker examples below are an optional alternative.

# Imadi Innovations website

A responsive Next.js website with an integrated Payload CMS admin panel, PostgreSQL content storage, reusable page sections, and locally hosted brand assets and fonts. Routine copy, images, services, projects, articles, testimonials, FAQs, menus, and contact details are editable through `/admin`.

This source is a working application, not a static HTML export. Run it on a Node.js host or with the included Docker configuration. The Docker setup starts a separate PostgreSQL service and preserves uploaded files. Hosting must support this runtime; deploying the files to a static or Workers-only site does not run Payload.

## Local preview

Use Node.js 22 or newer and npm. Work from this directory.

If a prepared `.env` already exists, keep it: it points at the isolated `imadi_website_codex` development database used for the local preview. Do not point the seed command at a business application's database.

For a fresh checkout:

1. Copy `.env.example` to `.env`.
2. Generate a private secret with `openssl rand -hex 32` and put the result in `PAYLOAD_SECRET`.
3. Choose a database password; set both `POSTGRES_PASSWORD` and the password inside `DATABASE_URL` to the same value. A hex password avoids URI escaping.
4. Keep `NEXT_PUBLIC_SERVER_URL=http://localhost:3100`.
5. Either provide your own blank PostgreSQL database or start the included database only:

```sh
docker compose up -d db
```

The database container is available on `127.0.0.1:55432` by default. The example `DATABASE_URL` uses this port. The website container uses the internal Docker address automatically.

Install, populate the blank development database, and start the preview:

```sh
npm install
npm run seed
npm run dev
```

Open:

- Website: <http://localhost:3100>
- Admin: <http://localhost:3100/admin>

Use Payload's first-user screen to create your own administrator account. No administrator email or password is hardcoded or seeded. Open the admin panel yourself before making a new environment publicly reachable.

In development, Payload synchronizes the schema to the selected development database. `PAYLOAD_DB_PUSH=false` does not disable this automatic development behavior. Production uses explicit migrations.

The optional SQLite adapter is for isolated local experimentation: clear `DATABASE_URL` and set `SQLITE_DATABASE_PATH`. PostgreSQL is the intended deployment database. Switching database adapters does not transfer content between them. Production configuration requires PostgreSQL and rejects the SQLite fallback.

### Useful commands

| Command | Purpose |
|---|---|
| `npm run dev` | Run the development preview on port 3100 |
| `npm run typecheck` | Check TypeScript |
| `npm test` | Run the focused CMS and validation checks |
| `npm run build` | Create a production build |
| `npm run start` | Run a built application on port 3100 |
| `npm run generate:types` | Regenerate Payload types after schema changes |
| `npm run generate:importmap` | Regenerate the admin component map |
| `npm run payload -- migrate:status` | Inspect migration status |

The seed populates the initial site content. It is additive: existing records and saved editorial changes are preserved on reruns, while missing starter records may be added. Use it for a new, dedicated environment, not as a replacement for CMS editing or an automatic deployment step. Back up content before any deliberate reseed.

## Editing the website

Sign in at `/admin`. Administrators manage content and team accounts. Editors can manage and publish content; they cannot grant themselves administrator access or delete enquiries.

### Add a testimonial

1. Open **Content library → Testimonials → Create new**.
2. Add the approved client quote, name, role, company, and photo.
3. Add related services if relevant. Enable **Featured** for automatic featured sections.
4. Set **Sort order** if needed; lower numbers appear first.
5. Save a draft and review it, then publish.

A page's **Testimonials** section can choose specific records in a chosen order. If its selection is empty, it uses published featured testimonials. Keep unapproved quotes as drafts. Placeholder names and stock portraits from the Figma design are not evidence of client endorsements.

### Add a project or case study

Open **Projects** and add its title, summary, cover, categories, related services, challenge, approach, gallery, and project story. Add numerical results only when supported by actual project evidence. Its published record powers the project listing and case study, and can be reused in homepage or service sections.

Use **Featured** and **Sort order** for automatic selections, or select the project explicitly inside a page's **Selected projects** section. The slug controls its `/projects/your-slug` address; changing a published slug needs a redirect implemented by a developer.

The starter portfolio includes eleven entries. DockiShip, eClinicAssist, LyncHR, PMO Karachi, Magnet Cargo, WhatsApp Worker, Codex Worker and Attendance System have fuller source-based stories and operational workflows. Restro, One Window and Nutrilife retain shorter public descriptions. The three new entries use labelled screenshot placeholders: replace their **Cover image**, then add screenshots under **Gallery** when ready. See [CASE-STUDY-SOURCES.md](CASE-STUDY-SOURCES.md) for the source map and editing handoff.

### Update services, articles, and FAQs

- **Services:** edit the summary, benefits, imagery, introduction, related content, and additional sections. Published entries use the reusable `/services/your-slug` template.
- **Posts:** write an article, upload its cover, set author/category/date, and add search metadata. Published entries appear at `/insights/your-slug` and can be featured in shared Insights sections.
- **FAQs:** write each question and answer once; reuse it across pages and relate it to a service.
- **Media:** upload an image once and reuse it. Add meaningful alternative text and an optional caption or source credit. Use the focal point to control cropping. Uploaded images have a 15 MB limit.

### Change page text or arrange sections

Open **Website → Pages** and choose a page. The `home` slug represents `/`; ordinary page slugs represent their site address.

Expand a section to change its heading, highlighted phrase, description, imagery, button labels, and destinations. Add, duplicate, hide, or reorder sections using the section controls. Turning off **Enabled** hides a section without deleting it.

The seventeen reusable section types include hero, statistics, problems, services, selected projects, process, product spotlight, testimonials, insights, contact form, email and collaboration, FAQs, call to action, formatted text, image and text, image gallery, and a reusable-section reference. Collection sections can select individual records; empty selections use published featured records.

Choose the hero's **Editorial** layout for the About-style heading, introduction and wide photograph. Problem/story cards have optional **Link destination** and **Link text** fields for Read more actions. Light process sections use a four-stage Journey presentation; image galleries preserve portrait screen proportions. These options support later designer revisions without rebuilding every page.

Page sections have constrained themes so editors can compose layouts while retaining the brand styling. New page compositions and ordinary wording changes use the admin panel. A fundamentally new component layout, animation, or data integration requires a developer to add a block and its renderer.

### Edit Contact, About and the shared consultation CTA

- **Contact page:** open **Pages → Contact → Contact form**. Choose **Contact page introduction** for the top section; **Shared contact section** is the section-heading variant used elsewhere. Edit the heading, description, callout title, artwork and button. Edit the field rows under **Editable form builder**; the older fixed label controls are hidden in this mode. The initial callout's **Book a Call** action uses the verified company phone number.
- **Preferred time:** the starter field is optional; its label, hint, required setting and position are editable in its field row. The branded calendar saves a local date/time and browser time zone in **Enquiries**. It records a scheduling preference, not a confirmed reservation or calendar booking.
- **Contact email channels:** edit **Email & collaboration** in Contact's page sections. Change each channel's label, displayed link text and destination, and replace the full-width photograph through its image field. Both starter channels use the verified public company email; change them when separate approved addresses exist. The source office photo is illustrative.
- **About process:** open **Pages → About → Our process**. Edit its heading, action, each step label/title/description, portrait and background image. It follows the feature rows and can be moved with the page-section controls. Home has its own editable process copy.
- **Consultation CTA:** open **Reusable sections → Call to action**, choose **Consultation panel**, and edit its heading/highlight, description, panel artwork and actions. Publish once to update every referencing page. On the five reference templates, this shared section follows FAQ and precedes the footer. Contact follows its own source layout and has no final consultation panel.

For Client Stories, edit the reusable **Testimonials** records and the relevant section's record selection/order. The updated heading/layout is ready; the public section is hidden until approved published testimonials are available. Figma's repeated sample identities are not seeded as endorsements.

### Add, remove and reorder form fields

The Contact page and shared Contact form both use editable field rows. Open **Pages → Contact → Contact form**, or **Reusable sections → Contact → Contact form** for the form reused across other pages. Under **Form fields**, add a row, choose its type, write its label/placeholder/help text, set required/optional and half/full-row width, then drag it into order. The row menu provides **Move Up**, **Move Down** and **Remove**; turn off **Show field** to hide it without deleting its configuration. Keep each **Field key** stable and unique. Name, email and project details can also be made optional or removed.

Supported controls include text, email, phone, website, number, long text, dropdown, date/time and checkbox. Dropdowns use custom label/value choices or published services. Validation messages, character/number limits, picker labels and form status copy are editable. The website uses branded dropdown and calendar controls with keyboard access and inline validation.

Save a draft to review changes; publish the page or reusable section to change the public form. Draft-preview submission is disabled, and the server always validates against the published definition. An empty builder disables submission instead of restoring the original fields. Older forms can retain **Original fields and labels** mode. See [FORM-EDITOR-GUIDE.md](FORM-EDITOR-GUIDE.md) for the complete workflow and date-picker behavior.

### Change the shared header and footer

Open **Website → Site settings**. Update branding, contact information, navigation, social links, booking action, footer copy, and interface labels there. A change applies across the website after publication. Use internal paths such as `/about` or full `https://` links for external destinations.

The footer has its own optional logo upload, independent of the header logo. Its initial asset is the standalone Imadi mark from Figma.

### Drafts, previews, and publishing

Save changes as drafts until reviewed. Open the preview action while signed in to see unpublished page, service, case study, or article changes. Preview access requires a signed-in editor or administrator; a public visitor sees published content. The preview notice includes an exit action.

Publishing makes the saved content available to visitors. Version history retains recent document revisions so editors can review or restore content. For a fresh visual check, open the public page in another browser session after publishing. A developer can verify permissions separately through the REST API.

### Search and social sharing

Pages, services, projects, and articles have a **Search & social sharing** group for the page title, description, and sharing image. Published content is included in `/sitemap.xml`. Enabling **No index** adds a robots `noindex` instruction to that page and removes its address from the sitemap. Save and publish the change for it to affect public output. Search engines decide when to recrawl and update their listings.

### Enquiries

The contact form saves successful submissions under **Business → Enquiries**, including the source page, form identity and an ordered **Submitted answers** snapshot of field labels, types and values. Form edits do not rewrite historical answers. If original summary fields are removed, read their replacements in **Submitted answers**. Change enquiry status and add internal notes to track follow-up; the answer snapshot is protected from later editor updates.

Email notifications are **not configured**. The success message means the enquiry was saved to the CMS; it does not mean an email was delivered. Review the admin inbox regularly, or add and test an email adapter before relying on notifications. Input validation, a honeypot, and submission limits are included. A deployment proxy should replace untrusted forwarding headers.

## Designer and developer handoff

| Change | Where to make it |
|---|---|
| Wording, buttons, images, page order | Payload admin page sections and Site settings |
| New testimonials, FAQs, projects, services, articles | Reusable collections in Payload admin |
| Form questions, dropdown choices, required rules and field order | Contact form's **Form fields** in Payload admin; [FORM-EDITOR-GUIDE.md](FORM-EDITOR-GUIDE.md) |
| Theme, typography, spacing, responsive behavior | Frontend stylesheet and shared components |
| Figma layout and hover refinements | `src/components/figma-layout.css`, `src/components/figma-motion.css` |
| New reusable section or section options | `src/payload/blocks/index.ts` plus its frontend renderer |
| Collection fields and editor controls | `src/payload/collections/index.ts`, `src/payload/fields.ts` |
| Form builder schema, validation and interactive controls | `src/payload/contact-fields.ts`, `src/lib/contact-form.ts`, `src/components/ContactForm.tsx`, `src/components/FormControls.tsx` |
| Shared brand/navigation/footer fields | `src/payload/globals/SiteSettings.ts` |
| Starter company content | `src/content/company.ts` and the seed script |
| 18 October Contact/About/CTA starter content | `src/content/figma-revision.ts`; routine edits belong in admin |
| Access and publishing permissions | `src/payload/access.ts` and collection access rules |
| CMS database and media configuration | `src/payload.config.ts` |
| Figma asset provenance | `src/content/figma-assets.json` and `public/figma/` |

Keep presentation changes separate from editorial records. Once content is being edited in the CMS, update it in the CMS rather than changing seed files and rerunning the seed.

Six main source references are identified, including the new Contact page. The 18 October live browser-prototype review confirmed Contact's form/email/photo composition, About's dark process, the final consultation CTA after FAQ on all five existing reference pages, and Client Stories' photo-card treatment. The exact Contact callout, office photograph and pale CTA artwork are retained as local, text-free image files.

On 17 October, editor Prototype settings supplied the five implemented card, Read more and Services transitions; selected main-frame timelines reported zero tracks/keyframes. Those exact timings are dated metadata. On 18 October, browser playback reproduced problem-card hover and the Services preview rise, but the rate-limited connector prevented a fresh exact-settings audit. Inspected source FAQ/CTA clicks did not change the prototype; the website keeps functioning navigation and FAQ controls. No extra entrance, floating or autoplay effects are claimed as copied. The source's fixed header is represented by a sticky website header with keyboard/touch navigation.

The 18 October form review clicked the source Contact dropdown and date field without observing an opened control. The reviewed Components page showed Card, Card2, Card3, Services and Read more components; separate input/dropdown/calendar state variants were not identified there. Closed controls follow the inspected form, while custom open, focus, selected, error and disabled treatments use its typography and brand tokens. Functionality and responsive behavior were checked in the browser; an exact comparison against designer-defined interactive state variants remains G12. This does not mean the website design is unfinished or establish pixel identity for every state.

See [DESIGN-GAPS.md](DESIGN-GAPS.md) for source links, evidence dates and remaining content/artwork/coverage items. About's missing section, the final CTA and Contact's missing reference are resolved. Case studies remain a partial match to the sample screen/style-board composition. Smaller-screen layouts are responsive adaptations; separate mobile/tablet references were not identified during this review. The user reports that the website design is complete and only the brand book is pending; its eventual rules can be applied through shared tokens/assets without blocking this website.

Existing portfolio images come from the company’s previous public website. The expanded case studies use local project documentation and implemented workflows. They describe capabilities without inventing measured outcomes, endorsements or development history. Tijarat now uses its genuine public invoicing image and logo, with a version-qualified caption; the original Figma concept assets remain available for designer reference. Replace product imagery through the product section’s image fields when updated artwork is ready.

`public/figma/` contains original exported assets and narrowly derived footer/hover assets. Runtime pages use local files rather than temporary Figma download links. Space Grotesk and Satoshi are self-hosted in `public/fonts/`; their supplied license files remain beside them.

`scripts/refine-design-content.ts` and `scripts/sync-figma-assets.ts` are guarded one-time helpers for the initial local build. They default to a dry run and refuse to overwrite content that no longer matches the expected starter records. They are not deployment steps. Use the admin panel once editorial work begins; the current local preview has already received these refinements.

The same boundary applies to `scripts/refine-project-case-studies.ts` and `scripts/refine-tijarat-content.ts`. They were applied to the initial local preview, and subsequent dry runs report no pending updates. Fresh seeds already include the new content; do not rerun refinement scripts to replace editorial changes.

`scripts/update-figma-content.ts` applied the 18 October revision to the pre-admin local preview after a database backup. It requires production mode with schema push disabled, restricts its database target to the local preview, refuses to run after accounts exist or overwrite private drafts/unrecognized editorial changes, and updates reviewed layouts within a transaction. It has already been applied; the follow-up apply run made no changes. Fresh seeds contain this revision automatically. This helper is not a deployment step or a general CMS content synchronizer.

`scripts/upgrade-contact-forms.ts` then enabled the editable builder on the two reviewed local starter forms after another database backup and a reviewed dry-run plan. It preserves their copy and layout, requires an unchanged preflight fingerprint, refuses accounts/private drafts, restricts its target to the local preview database and updates both records transactionally. It is already applied; use the admin panel for subsequent form edits. This helper is not a production deployment step.

## Production deployment

Use a Node.js 22+ server or the Docker stack, an independent PostgreSQL database, durable uploads, and HTTPS. Set a new, private `PAYLOAD_SECRET` of at least 32 characters for each environment. Keep it stable across deployments; changing it invalidates sessions. Set `NEXT_PUBLIC_SERVER_URL` to the final public origin before building and at runtime so metadata, previews, and origin checks agree.

Production schema synchronization is disabled by default. Leave `PAYLOAD_DB_PUSH=false`. Six PostgreSQL migrations are supplied in `src/payload/migrations/postgres/`, starting with `20261017_092407_initial_schema.ts`. `20261019_063411_email_settings.ts` adds private SMTP settings. `20261018_183306_contact_form_builder.ts` adds ordered field/option arrays, picker/status copy and private enquiry snapshots, and makes the original inbox summary fields optional. The preceding migration adds the Contact layout/artwork, email-channel block and consultation-panel options. Review migrations and test them against a clean staging database before deployment. Migration status and execution use the selected database adapter. Consult the [Payload migration workflow](https://payloadcms.com/docs/database/migrations).

```sh
npm run payload -- migrate:status
```

For future schema changes, generate a new named migration in development, review the SQL and snapshot, and commit them with the code change:

```sh
npm run payload -- migrate:create describe-your-change
```

PostgreSQL migrations live in `src/payload/migrations/postgres/`; local SQLite development uses the separate `src/payload/migrations/sqlite/` directory. Do not generate another initial schema for an existing deployment. Apply reviewed migrations as an explicit release step.

Before an application release, back up PostgreSQL and uploads, then apply outstanding reviewed migrations with the production database selected:

```sh
NODE_ENV=production npm run payload -- migrate
npm run build
npm run start
```

These commands assume dependencies are installed and the hosting environment supplies the correct secret, origin, database URL, and media directory. The app uses a Next.js standalone build in Docker. [Next.js self-hosting guidance](https://nextjs.org/docs/app/guides/self-hosting) covers reverse proxies and deployment behavior.

### Docker production-style preview

The compose file separates a minimal web image from a source-bearing **cms** tools image for migration and one-off seed commands. It does not automatically migrate or seed production at startup.

1. Prepare `.env`, choose unique secrets, and review the supplied/generated migrations.
2. Check the configuration and start PostgreSQL:

```sh
docker compose config --quiet
docker compose up -d db
docker compose --profile tools build cms
```

3. Inspect and apply the reviewed schema:

```sh
docker compose --profile tools run --rm cms npm run payload -- migrate:status
docker compose --profile tools run --rm cms npm run payload -- migrate
```

4. Only for a new blank environment, add the starter content:

```sh
docker compose --profile tools run --rm cms npm run seed
```

5. Build and start the public application:

```sh
docker compose build web
docker compose up -d web
docker compose ps
```

Open <http://localhost:3100/admin> and create the first administrator if this is a new environment. Then review the public website, upload an image, publish a small change, and submit an enquiry. Check the saved record in the admin inbox. These checks verify the actual environment; a successful image build alone does not verify database, media, or form behavior.

PostgreSQL is healthchecked before dependants start. Named volumes retain database data, uploads, and the Next cache across normal container recreation. `docker compose down` stops this stack; **do not add `-v`** when preserving its content. The default web binding is localhost. Put an HTTPS reverse proxy in front of it when deploying publicly, and do not expose PostgreSQL publicly.

Changing the production domain or DNS is a separate deployment action. These files do not modify `imadi-innovations.com` or publish over the existing website.

### Backups and maintenance

Back up both the PostgreSQL database and uploaded media to storage outside the server. Keep backups encrypted and test a restore into a separate environment. A database-only backup does not include image files.

Example database dump for this compose stack:

```sh
mkdir -p backups
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > backups/imadi-database.dump
```

Back up the **media** named volume using your hosting platform's volume snapshot or backup tooling. If deploying without Docker, persist the absolute directory named by `MEDIA_UPLOAD_DIR`. The local `media/` directory must not be a temporary build directory. Never store uploads only inside an image or an ephemeral filesystem.

Use administrator accounts for team access changes and editor accounts for routine publishing. An email adapter is needed for reliable password recovery and email notifications; delivery credentials and sender-domain setup are not included. Keep dependencies maintained, review upgrades in staging, and test migrations and media persistence before each release.

## Validation boundaries

Run the local checks below after code or schema changes:

```sh
npm run typecheck
npm test
npm run build
```

Then verify desktop/mobile layouts, keyboard navigation, draft visibility, content publication, an uploaded image after restart, and the complete enquiry save workflow in the target environment. Docker recipes and production instructions are supplied for deployment; use actual command results and staging checks to establish whether that environment is ready. No production deployment or existing-domain replacement is implied by this handoff.

The Docker YAML was parsed locally, including its shared environment, service targets, healthcheck, and persistent volumes. A Docker image build and container run were not exercised in this workspace because the Docker Compose plugin and running Docker daemon were unavailable. Install/use your hosting environment’s supported Docker tooling and complete the deployment checks there.

## This build

See `VERIFICATION.md` for the checks actually completed and the remaining deployment/design boundaries. `npm start` prepares the public assets and starts Next’s standalone server; the local preview binds to loopback by default. Use `WEBSITE_BIND_HOST` only when you deliberately need another binding.
