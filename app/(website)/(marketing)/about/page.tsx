import type { Metadata } from "next";
import Link from "next/link";

import { Glyph, type GlyphName } from "@/components/visuals/Glyph";

import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About Imadi Innovations",
  description:
    "How Imadi Innovations approaches software responsibility, capability, quality, communication, and handover from Karachi, Pakistan.",
  alternates: { canonical: "/about/" },
};

const capabilities: Array<[string, string, GlyphName]> = [
  ["Discovery & product definition", "Workflow, users, constraints, evidence needs, and a responsible first boundary.", "discover"],
  ["Experience & system design", "Journeys, roles, states, responsive behavior, and exceptions designed together.", "define"],
  ["Software engineering", "Web, mobile, backend, integration, and automation work tied to the approved system.", "build"],
  ["Quality & release", "Acceptance checks, edge cases, accessibility, deployment responsibilities, and handover.", "evidence"],
];

const continuityPractices: Array<[string, string]> = [
  ["Quality", "Validation follows the approved workflow, roles, exceptions, responsive behavior, and acceptance criteria."],
  ["Security", "Security responsibilities are defined for the system and its data. No universal certification or assurance is implied by this page."],
  ["Documentation", "Decisions, operating ownership, deployment information, and known boundaries belong in the handover."],
  ["Support", "Ongoing support is described only when its scope, responsibilities, and exclusions have been explicitly agreed."],
];

const principles = [
  ["Understand before prescribing", "A feature list cannot replace a clear view of the people, decisions, and constraints in the operation.", "/services/"],
  ["Keep tradeoffs visible", "Scope, architecture, delivery risk, and quality decisions should be understandable to the people accountable for them.", "/process/"],
  ["Design for exceptions", "Real operations rarely follow a perfect happy path. Unusual cases need a visible, manageable route.", "/work/"],
  ["Handover is delivery", "Documentation, deployment ownership, support expectations, and the next improvement path belong in the plan.", "/process/"],
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> About Imadi Innovations</p>
            <h1>Software responsibility extends beyond the build.</h1>
            <p>
              Imadi Innovations brings product thinking, engineering, delivery,
              quality, and handover into one accountable operating system.
            </p>
          </div>
          <div className={styles.thesis}>
            <p className={styles.eyebrow}>Operating thesis</p>
            <ol>
              <li><span>01</span><p>Understand the work</p></li>
              <li><span>02</span><p>Expose the decisions</p></li>
              <li><span>03</span><p>Build the supported system</p></li>
              <li><span>04</span><p>Transfer clear ownership</p></li>
            </ol>
          </div>
        </div>
      </header>

      <section className={styles.origin} aria-labelledby="origin-title">
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Why the company operates this way</p>
          <div>
            <h2 id="origin-title">The difficult part is rarely the interface alone.</h2>
            <div className={styles.originCopy}>
              <p>
                Business software sits inside roles, approvals, edge cases, data ownership,
                and existing habits. Treating delivery as a sequence of isolated screens leaves
                those responsibilities unresolved.
              </p>
              <p>
                The operating thesis is practical: make the workflow and tradeoffs visible,
                deliver in inspectable increments, and leave the organization with an understood
                system rather than an opaque handoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.accountability} aria-labelledby="accountability-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Accountability</p>
            <h2 id="accountability-title">Show the responsibilities. Do not invent the roster.</h2>
          </div>
          <div className={styles.accountabilityGrid}>
            <aside className={styles.profileState} aria-labelledby="leadership-title">
              <Glyph name="evidence" />
              <p className={styles.stateLabel}>Leadership disclosure</p>
              <h3 id="leadership-title">Named leadership profiles are not yet published.</h3>
              <p>
                This space will be populated only after names, roles, biographies, photographs,
                and disclosure permission are approved. No placeholder people or credentials are shown.
              </p>
            </aside>
            <div className={styles.capabilityMap} role="group" aria-label="Delivery capability map">
              {capabilities.map(([title, detail, glyph], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Glyph name={glyph} />
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
          <p className={styles.capabilityNote}>
            The map describes project responsibilities and capabilities. It is not a statement of team size or a substitute for approved personnel profiles.
          </p>
        </div>
      </section>

      <section className={styles.location} aria-labelledby="location-title">
        <div className={styles.inner}>
          <div className={styles.locationIntro}>
            <p className={styles.eyebrow}>Karachi / remote collaboration</p>
            <h2 id="location-title">Local context. Written decisions. Project-specific cadence.</h2>
          </div>
          <dl className={styles.locationGrid}>
            <div><dt>Working context</dt><dd>Karachi, Pakistan</dd></div>
            <div><dt>Remote work</dt><dd>Decisions and review points kept visible across locations</dd></div>
            <div><dt>Time zones</dt><dd>Communication cadence agreed for the specific project</dd></div>
            <div><dt>Project record</dt><dd>Scope, feedback, decisions, and ownership documented as the work progresses</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.continuity} aria-labelledby="continuity-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Continuity by design</p>
            <h2 id="continuity-title">Quality, security, documentation, and support have boundaries.</h2>
          </div>
          <div className={styles.continuityGrid}>
            {continuityPractices.map(([title, detail], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.inner}>
          <div className={styles.principleIntro}>
            <p className={styles.eyebrow}>Working principles</p>
            <h2 id="principles-title">Standards with a place to inspect them.</h2>
          </div>
          <div className={styles.principleList}>
            {principles.map(([title, detail, href], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
                <Link href={href}>Inspect the approach <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="about-cta-title">
        <div className={styles.ctaInner}>
          <div><p className={styles.darkEyebrow}>Work together</p><h2 id="about-cta-title">Start with the responsibility the system must carry.</h2></div>
          <Link href="/contact/">Discuss a Project <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
