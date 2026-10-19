import type { Metadata } from "next";
import Link from "next/link";

import { Glyph, type GlyphName } from "@/components/visuals/Glyph";

import styles from "./ProcessPage.module.css";

export const metadata: Metadata = {
  title: "Software Delivery Process | Imadi Innovations",
  description:
    "How Imadi Innovations moves from workflow discovery and scope decisions through design, development, validation, handover, and support.",
  alternates: { canonical: "/process/" },
};

type ProcessStage = {
  title: string;
  summary: string;
  clientProvides: string;
  produces: string;
  gate: string;
  cadence: string;
  icon: GlyphName;
};

const stages: ProcessStage[] = [
  {
    title: "Discover",
    summary: "Trace the operation, users, current tools, constraints, and the change the project is expected to support.",
    clientProvides: "Working context, process owners, existing material, and examples of where the current workflow breaks down.",
    produces: "A workflow map, open questions, constraints, and a shared description of the operating problem.",
    gate: "Is the problem understood well enough to define a responsible boundary?",
    cadence: "Working sessions followed by a written playback for correction.",
    icon: "discover",
  },
  {
    title: "Define",
    summary: "Turn the operating problem into users, roles, priority journeys, exceptions, and observable acceptance criteria.",
    clientProvides: "Priority decisions, policy constraints, responsible reviewers, and clarification of exceptions.",
    produces: "An approved first scope, role model, success criteria, exclusions, and unresolved dependencies.",
    gate: "Does the proposed scope carry one coherent operational responsibility?",
    cadence: "Scope review with decisions and exclusions recorded together.",
    icon: "define",
  },
  {
    title: "Plan",
    summary: "Choose delivery stages, system boundaries, dependencies, review points, and controls for the known risks.",
    clientProvides: "Access constraints, integration owners, operational dates, and dependencies outside the delivery team.",
    produces: "A staged delivery plan, architecture decisions, risk register, and agreed review sequence.",
    gate: "Is the first delivery path feasible, reviewable, and owned?",
    cadence: "Plan and risk review before build commitments are treated as fixed.",
    icon: "plan",
  },
  {
    title: "Design",
    summary: "Translate the approved workflows into interfaces, states, permissions, and important failure or exception paths.",
    clientProvides: "Operational feedback from the people accountable for and affected by the workflow.",
    produces: "Reviewable flows, interface decisions, responsive behavior, and clarified acceptance examples.",
    gate: "Can the priority users complete the intended journey without hidden assumptions?",
    cadence: "Focused reviews of complete journeys rather than isolated screen decoration.",
    icon: "web",
  },
  {
    title: "Build",
    summary: "Deliver working vertical slices while keeping implementation decisions, scope, and tradeoffs visible.",
    clientProvides: "Timely review, required access, representative examples, and decisions when tradeoffs surface.",
    produces: "Working increments, implementation records, updated risks, and demonstrable progress against scope.",
    gate: "Does the increment satisfy its agreed behavior and remain safe to extend?",
    cadence: "Reviewable increments replace a single end-of-project reveal.",
    icon: "build",
  },
  {
    title: "Validate",
    summary: "Check requirements, roles, edge cases, accessibility, responsive behavior, performance, and reliability in scope.",
    clientProvides: "Acceptance participation, representative data or scenarios, and confirmation of operational readiness.",
    produces: "Test evidence, issue decisions, acceptance status, and a known limitations record.",
    gate: "Is the approved system boundary ready for its intended release context?",
    cadence: "Defects and acceptance decisions are recorded against the relevant criterion.",
    icon: "validate",
  },
  {
    title: "Deploy & hand over",
    summary: "Prepare the release, ownership, documentation, knowledge transfer, and rollback considerations agreed for the system.",
    clientProvides: "Production ownership, release approvals, operational contacts, and required platform access.",
    produces: "Release checklist, deployment record, operating documentation, and an explicit ownership handoff.",
    gate: "Can the responsible people operate, support, and recover the released system?",
    cadence: "A release-readiness review precedes the final production decision.",
    icon: "deliver",
  },
  {
    title: "Support & improve",
    summary: "Use real operational feedback to separate incidents, defects, requested changes, and later product opportunities.",
    clientProvides: "Observed behavior, reproducible context, priority, and the operational impact of requested changes.",
    produces: "An agreed support record and a prioritized improvement path when support is included in scope.",
    gate: "What needs immediate support, and what belongs in a separately approved change?",
    cadence: "The support cadence and responsibility exist only when explicitly agreed.",
    icon: "support",
  },
];

const operatingRules = [
  ["Review", "Show complete, usable slices early enough for feedback to change the decision."],
  ["Scope", "Record the effect of new information before treating it as included work."],
  ["Risk", "Keep dependencies, assumptions, and unresolved decisions visible to their owners."],
  ["Evidence", "Tie acceptance to observable behavior instead of an unsupported outcome claim."],
] as const;

const artifactTypes = [
  ["Workflow map", "Roles · handoffs · exceptions · information"],
  ["Decision record", "Context · options · choice · consequence"],
  ["Acceptance criteria", "Scenario · expected behavior · evidence"],
  ["Release checklist", "Readiness · ownership · recovery · approval"],
] as const;

export default function ProcessPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> Delivery process</p>
            <h1>Delivery is a sequence of visible decisions.</h1>
            <p>
              Each stage makes the client input, delivery output, review rhythm,
              and decision needed to move forward explicit.
            </p>
          </div>
          <div className={styles.decisionLedger} role="group" aria-label="Delivery decision ledger">
            <div className={styles.ledgerHeader}><span>Decision ledger</span><b>08 stages</b></div>
            <ol>
              {stages.map((stage, index) => (
                <li key={stage.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{stage.title}</p>
                  <i aria-hidden="true" />
                </li>
              ))}
            </ol>
            <p className={styles.ledgerNote}>No stage closes until its decision and ownership are visible.</p>
          </div>
        </div>
      </header>

      <section className={styles.rules} aria-labelledby="rules-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Operating rules</p>
            <h2 id="rules-title">The discipline that stays consistent.</h2>
          </div>
          <div className={styles.ruleGrid}>
            {operatingRules.map(([title, detail], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stages} aria-labelledby="stages-title">
        <div className={styles.inner}>
          <div className={styles.stageIntro}>
            <p className={styles.eyebrow}>Delivery stages / 01–08</p>
            <h2 id="stages-title">From operating context to supported ownership.</h2>
            <p>The activities adapt to the engagement. The responsibility at each decision gate does not disappear.</p>
          </div>
          <ol className={styles.stageList}>
            {stages.map((stage, index) => (
              <li key={stage.title}>
                <div className={styles.stageIdentity}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Glyph name={stage.icon} />
                  <h3>{stage.title}</h3>
                  <p>{stage.summary}</p>
                </div>
                <dl>
                  <div><dt>Client provides</dt><dd>{stage.clientProvides}</dd></div>
                  <div><dt>Imadi Innovations produces</dt><dd>{stage.produces}</dd></div>
                  <div><dt>Review cadence</dt><dd>{stage.cadence}</dd></div>
                </dl>
                <div className={styles.gate}><span>Decision gate</span><p>{stage.gate}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.changeControl} aria-labelledby="change-title">
        <div className={styles.inner}>
          <div className={styles.changeIntro}>
            <p className={styles.eyebrow}>Scope and risk control</p>
            <h2 id="change-title">New information becomes a decision—not invisible work.</h2>
          </div>
          <ol className={styles.changeRail} aria-label="Change-control sequence">
            <li><span>01</span><p>Record the new information</p></li>
            <li><span>02</span><p>Assess scope, risk, and dependency effects</p></li>
            <li><span>03</span><p>Choose include, defer, replace, or stop</p></li>
            <li><span>04</span><p>Update the accountable project record</p></li>
          </ol>
        </div>
      </section>

      <section className={styles.artifacts} aria-labelledby="artifacts-title">
        <div className={styles.inner}>
          <div className={styles.artifactIntro}>
            <p className={styles.eyebrow}>Delivery artifacts</p>
            <h2 id="artifacts-title">The project record should survive the meeting.</h2>
            <p>These are representative artifact structures, not client evidence or downloadable templates.</p>
          </div>
          <div className={styles.artifactRegister}>
            {artifactTypes.map(([title, structure], index) => (
              <article key={title}><span>AR-{String(index + 1).padStart(2, "0")}</span><Glyph name="evidence" /><h3>{title}</h3><p>{structure}</p></article>
            ))}
          </div>
          <div className={styles.artifactEmpty}>
            <Glyph name="evidence" />
            <div><h3>No sanitized client artifact is published yet.</h3><p>An example will appear only after its content, metadata, and disclosure are approved. The structures above do not substitute for project proof.</p></div>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="process-cta-title">
        <div className={styles.ctaInner}>
          <div><p className={styles.darkEyebrow}>Start discovery</p><h2 id="process-cta-title">Bring the workflow that needs a clearer route.</h2></div>
          <div className={styles.ctaActions}>
            <Link href="/contact/">Discuss Your Workflow <span aria-hidden="true">↗</span></Link>
            <Link href="/work/">See the decisions in client work <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
