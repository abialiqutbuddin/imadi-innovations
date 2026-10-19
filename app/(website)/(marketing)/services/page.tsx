import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Glyph, ServiceGlyph } from "@/components/visuals/Glyph";
import { getPublicCaseStudiesFromCms } from "@/lib/cms/case-studies";
import { marketingServices } from "@/lib/content/marketing";

import styles from "./ServicesPage.module.css";

export const metadata: Metadata = {
  title: "Software Development Services | Imadi Innovations",
  description:
    "Custom software, web and mobile applications, MVP delivery, workflow automation, integrations, modernization, and support.",
  alternates: { canonical: "/services/" },
};

const engagementShapes = [
  ["Define", "Clarify the workflow, users, constraints, evidence needs, and responsible first boundary."],
  ["Deliver", "Build an approved system or product scope through visible decisions and reviewable increments."],
  ["Improve", "Integrate, modernize, or support an existing system within an explicitly agreed operational boundary."],
] as const;

const assurancePoints = [
  ["Scope", "Changes and tradeoffs remain visible instead of disappearing into an assumed feature list."],
  ["Review", "Working increments create useful review points before decisions become expensive to reverse."],
  ["Quality", "Roles, exceptions, responsive behavior, and acceptance checks follow the approved system boundary."],
  ["Handover", "Documentation, deployment ownership, and any ongoing support are treated as explicit deliverables."],
] as const;

const serviceFaqs = [
  ["Which service should we choose?", "Start with the operating problem, not the technology label. The first discussion can establish whether the work is a new product, a workflow system, a mobile context, automation, or change to an existing platform."],
  ["Are these fixed packages?", "No fixed commercial packages are published on this site. The relevant boundary, review cadence, responsibilities, and formal terms are defined for the specific engagement."],
  ["Can multiple services be involved?", "Yes. A system can include web, mobile, integrations, or automation, but the proposal should still identify one coherent operational responsibility and an approved first scope."],
] as const;

export default async function ServicesPage() {
  const caseStudies = await getPublicCaseStudiesFromCms();
  const selectedCases = caseStudies.slice(0, 3);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> Services</p>
            <h1>Choose the delivery path after the problem is clear.</h1>
            <p>
              Six service routes, each grounded in the operation, users, constraints,
              and decisions the software must support.
            </p>
          </div>
          <div className={styles.routePreview} role="group" aria-label="Service selection model">
            <p>Operating condition</p>
            <div aria-hidden="true"><span /><i /><span /></div>
            <p>Responsible delivery path</p>
            <dl>
              <div><dt>Start with</dt><dd>The workflow or product decision</dd></div>
              <div><dt>Make visible</dt><dd>Scope, risk, ownership, and evidence</dd></div>
              <div><dt>Deliver</dt><dd>A supported system boundary</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <section className={styles.routes} aria-labelledby="routes-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Service routes / 06</p>
            <h2 id="routes-title">Match the constraint to the work.</h2>
            <p>Each route explains the buyer situation, supported outcomes, boundaries, and delivery sequence.</p>
          </div>
          <div className={styles.routeList}>
            {marketingServices.map((service, index) => (
              <Link className={styles.route} href={`/services/${service.slug}/`} key={service.slug}>
                <span className={styles.routeNumber}>{String(index + 1).padStart(2, "0")}</span>
                <ServiceGlyph className={styles.routeIcon} slug={service.slug} />
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                </div>
                <span className={styles.routeAction}>View scope <b aria-hidden="true">↗</b></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.problemMap} aria-labelledby="problem-map-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Problem → service</p>
            <h2 id="problem-map-title">A practical first routing decision.</h2>
          </div>
          <div className={styles.mapTable} role="list">
            {marketingServices.map((service) => (
              <div className={styles.mapRow} role="listitem" key={service.slug}>
                <p><span>When</span>{service.buyerProblems[0]}</p>
                <i aria-hidden="true" />
                <Link href={`/services/${service.slug}/`}><span>Consider</span>{service.shortName}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.engagements} aria-labelledby="engagement-title">
        <div className={styles.inner}>
          <div className={styles.engagementIntro}>
            <p className={styles.eyebrow}>Engagement shape</p>
            <h2 id="engagement-title">Set by the responsibility—not a preset package.</h2>
            <p>
              These are possible work boundaries, not published commercial packages. The actual
              scope, cadence, support, and formal terms are confirmed for each engagement.
            </p>
          </div>
          <ol className={styles.engagementGrid}>
            {engagementShapes.map(([title, detail], index) => (
              <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.work} aria-labelledby="service-work-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Selected work</p>
            <h2 id="service-work-title">Published systems, controlled through WordPress.</h2>
            <Link href="/work/">View all work <span aria-hidden="true">↗</span></Link>
          </div>
          {selectedCases.length ? (
            <div className={styles.caseGrid}>
              {selectedCases.map((caseStudy) => {
                const media = caseStudy.media.find((item) => item.width >= item.height) ?? caseStudy.media[0];
                return (
                  <Link className={styles.case} href={`/work/${caseStudy.slug}/`} key={caseStudy.id}>
                    <div className={styles.caseMedia}>
                      {media ? <Image alt={media.alt} fill sizes="(max-width: 48rem) 100vw, 33vw" src={media.src} /> : <Glyph name="evidence" />}
                    </div>
                    <p>{caseStudy.deliveredSystem}</p>
                    <h3>{caseStudy.title}</h3>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Glyph name="evidence" />
              <div><h3>No approved cases are available.</h3><p>Related work will appear after its WordPress content, disclosure, and media are approved.</p></div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.assurance} aria-labelledby="assurance-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Delivery assurance</p>
            <h2 id="assurance-title">Confidence comes from visible responsibilities.</h2>
          </div>
          <div className={styles.assuranceGrid}>
            {assurancePoints.map(([title, detail], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.inner}>
          <div className={styles.faqIntro}><p className={styles.eyebrow}>FAQ</p><h2 id="faq-title">Before choosing a route.</h2></div>
          <div className={styles.faqList}>
            {serviceFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="services-cta-title">
        <div className={styles.ctaInner}>
          <div><p className={styles.darkEyebrow}>Not sure which service fits?</p><h2 id="services-cta-title">Start with what needs to change.</h2></div>
          <Link href="/contact/">Discuss Your Workflow <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
