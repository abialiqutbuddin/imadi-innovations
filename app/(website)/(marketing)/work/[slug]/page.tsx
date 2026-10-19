import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Glyph, type GlyphName } from "@/components/visuals/Glyph";
import {
  getPublicCaseStudiesFromCms,
  getPublicCaseStudy,
} from "@/lib/cms/case-studies";
import { marketingServices } from "@/lib/content/marketing";

import styles from "./CaseStudyPage.module.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function MissingContent({ label }: { label: string }) {
  return (
    <div className={styles.missingContent}>
      <Glyph name="evidence" />
      <p>Content for {label.toLowerCase()} is not yet published in WordPress.</p>
    </div>
  );
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className={styles.sectionMarker} aria-hidden="true">
      <span>{number}</span>
      <i />
      <small>{label}</small>
    </div>
  );
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getPublicCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Available | Imadi Innovations",
      robots: { index: false, follow: false },
    };
  }

  const socialImage = caseStudy.seo.socialImage;

  return {
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    alternates: { canonical: caseStudy.seo.canonicalPath },
    robots: caseStudy.seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: socialImage
      ? {
          title: caseStudy.seo.title,
          description: caseStudy.seo.description,
          type: "article",
          images: [{ url: socialImage.src, width: socialImage.width, height: socialImage.height, alt: socialImage.alt }],
        }
      : undefined,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [caseStudy, allCases] = await Promise.all([
    getPublicCaseStudy(slug),
    getPublicCaseStudiesFromCms(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  const relatedServices = marketingServices.filter((service) =>
    caseStudy.relatedServiceIds.includes(service.slug),
  );
  const caseIndex = allCases.findIndex((item) => item.id === caseStudy.id);
  const nextCase = allCases.length > 1
    ? allCases[(caseIndex + 1) % allCases.length]
    : undefined;
  const firstOutcome = caseStudy.outcomes[0];
  const hasLongTitle = caseStudy.title.length > 52;
  const disclosureLabel = caseStudy.disclosureLevel === "anonymous"
    ? "Anonymized client engagement"
    : caseStudy.clientDisplayName ?? "Published client engagement";

  const evidenceStages: Array<{
    label: string;
    status: string;
    icon: GlyphName;
  }> = [
    {
      label: "Problem",
      status: caseStudy.problem ? "Context published" : "Not yet published",
      icon: "workflow",
    },
    {
      label: "Decision",
      status: caseStudy.decisions.length > 0
        ? `${caseStudy.decisions.length} decision${caseStudy.decisions.length === 1 ? "" : "s"} published`
        : "Not yet published",
      icon: "define",
    },
    {
      label: "Delivered system",
      status: caseStudy.deliveredScope.length > 0
        ? `${caseStudy.deliveredScope.length} delivered area${caseStudy.deliveredScope.length === 1 ? "" : "s"}`
        : "System type published",
      icon: "deliver",
    },
    {
      label: "Outcome",
      status: firstOutcome?.verifiedAt
        ? `Verified ${formatDate(firstOutcome.verifiedAt)}`
        : "Evidence not published",
      icon: "outcome",
    },
  ];

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} href="/work/">
              <span aria-hidden="true">←</span> All client work
            </Link>
            <p className={styles.eyebrow}>
              {disclosureLabel}{caseStudy.industry ? ` / ${caseStudy.industry}` : ""}
            </p>
            <h1 className={hasLongTitle ? styles.longTitle : undefined}>{caseStudy.title}</h1>
            <p className={styles.heroLead}>{caseStudy.summary}</p>
          </div>

          <dl className={styles.heroMeta}>
            <div><dt>Delivered system</dt><dd>{caseStudy.deliveredSystem}</dd></div>
            <div><dt>Disclosure</dt><dd>{caseStudy.disclosureLevel}</dd></div>
            <div>
              <dt>Evidence status</dt>
              <dd>{firstOutcome ? "Verified outcome published" : "Delivery public; outcome pending"}</dd>
            </div>
            <div><dt>Case record updated</dt><dd>{formatDate(caseStudy.updatedAt)}</dd></div>
          </dl>
        </div>
      </header>

      <section className={styles.storySection} aria-labelledby="situation-title">
        <div className={styles.sectionInner}>
          <SectionMarker label="Situation" number="01" />
          <div className={styles.storyContent}>
            <p className={styles.eyebrow}>Before the project</p>
            <h2 id="situation-title">The operating situation.</h2>
            {caseStudy.situation ? (
              <p className={styles.primaryNarrative}>{caseStudy.situation}</p>
            ) : (
              <MissingContent label="The operating situation" />
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.storySection} ${styles.problemSection}`} aria-labelledby="problem-title">
        <div className={styles.sectionInner}>
          <SectionMarker label="Problem" number="02" />
          <div className={styles.storyContent}>
            <p className={styles.eyebrow}>Operational problem</p>
            <h2 id="problem-title">What the system needed to change.</h2>
            {caseStudy.problem ? (
              <p className={styles.primaryNarrative}>{caseStudy.problem}</p>
            ) : (
              <MissingContent label="The operational problem" />
            )}

            <div className={styles.problemDetails}>
              <div>
                <h3>Objective</h3>
                {caseStudy.objective ? <p>{caseStudy.objective}</p> : <MissingContent label="The objective" />}
              </div>
              <div>
                <h3>Success criteria</h3>
                {caseStudy.successCriteria.length > 0 ? (
                  <ul>{caseStudy.successCriteria.map((item) => <li key={item}>{item}</li>)}</ul>
                ) : (
                  <MissingContent label="Success criteria" />
                )}
              </div>
              <div>
                <h3>Constraints and risks</h3>
                {caseStudy.constraints.length > 0 ? (
                  <ul>{caseStudy.constraints.map((item) => <li key={item}>{item}</li>)}</ul>
                ) : (
                  <MissingContent label="Constraints and risks" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.evidenceSection} aria-labelledby="evidence-title">
        <div className={styles.evidenceInner}>
          <div className={styles.evidenceHeading}>
            <p className={styles.darkEyebrow}>Evidence rail</p>
            <h2 id="evidence-title">From operating friction to public evidence.</h2>
          </div>
          <ol className={styles.evidenceRail}>
            {evidenceStages.map((stage, index) => (
              <li key={stage.label}>
                <div className={styles.railIcon}><Glyph name={stage.icon} /></div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage.label}</h3>
                <p>{stage.status}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.storySection} aria-labelledby="decision-title">
        <div className={styles.sectionInner}>
          <SectionMarker label="Decision" number="03" />
          <div className={styles.storyContent}>
            <p className={styles.eyebrow}>Product and technical reasoning</p>
            <h2 id="decision-title">Decisions tied to the constraint.</h2>

            {caseStudy.decisions.length > 0 ? (
              <div className={styles.decisionList}>
                {caseStudy.decisions.map((decision, index) => (
                  <article key={`${decision.title}-${index}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{decision.title}</h3>
                    <p>{decision.rationale}</p>
                  </article>
                ))}
              </div>
            ) : (
              <MissingContent label="Product and technical decisions" />
            )}

            {caseStudy.technologies.length > 0 ? (
              <div className={styles.technologyBlock}>
                <h3>Technology connected to the decision</h3>
                <dl>
                  {caseStudy.technologies.map((technology) => (
                    <div key={technology.name}><dt>{technology.name}</dt><dd>{technology.rationale}</dd></div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className={`${styles.storySection} ${styles.deliverySection}`} aria-labelledby="delivery-title">
        <div className={styles.sectionInner}>
          <SectionMarker label="Delivered system" number="04" />
          <div className={styles.storyContent}>
            <p className={styles.eyebrow}>Delivered system</p>
            <h2 id="delivery-title">{caseStudy.deliveredSystem}</h2>

            {caseStudy.deliveredWorkflows.length > 0 ? (
              <div className={styles.workflowList}>
                {caseStudy.deliveredWorkflows.map((workflow, index) => (
                  <article key={`${workflow.title}-${index}`}>
                    <div><Glyph name="check" /><span>{String(index + 1).padStart(2, "0")}</span></div>
                    <h3>{workflow.title}</h3>
                    {workflow.detail ? <p>{workflow.detail}</p> : null}
                  </article>
                ))}
              </div>
            ) : (
              <MissingContent label="The delivered scope" />
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.storySection} ${styles.mediaSection}`} aria-labelledby="media-title">
        <div className={styles.sectionInner}>
          <SectionMarker label="Screens" number="05" />
          <div className={styles.storyContent}>
            <p className={styles.eyebrow}>Approved project media</p>
            <h2 id="media-title">The delivered interface, framed for its device.</h2>

            {caseStudy.media.length > 0 ? (
              <div className={styles.mediaGallery}>
                {caseStudy.media.map((media, index) => {
                  const isMobile = media.height > media.width;
                  const aspectStyle = { "--media-aspect": `${media.width} / ${media.height}` } as CSSProperties;

                  return (
                    <figure className={isMobile ? styles.mobileMedia : styles.desktopMedia} key={`${media.src}-${index}`}>
                      <div className={styles.deviceFrame}>
                        <div className={styles.mediaChrome} aria-hidden="true">
                          {isMobile ? <span /> : <><i /><i /><i /></>}
                        </div>
                        <div className={styles.mediaCanvas} style={aspectStyle}>
                          <Image
                            alt={media.alt}
                            fill
                            sizes={isMobile ? "(max-width: 42rem) 72vw, 22vw" : "(max-width: 58rem) 100vw, 70vw"}
                            src={media.src}
                          />
                        </div>
                      </div>
                      {media.caption ? <figcaption>{media.caption}</figcaption> : null}
                    </figure>
                  );
                })}
              </div>
            ) : (
              <MissingContent label="Approved project media" />
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.storySection} ${styles.outcomeSection}`} aria-labelledby="outcome-title">
        <div className={styles.sectionInner}>
          <SectionMarker label="Verified outcome" number="06" />
          <div className={styles.storyContent}>
            <p className={styles.darkEyebrow}>Verified outcome</p>
            <h2 id="outcome-title">What can be stated publicly.</h2>

            {caseStudy.outcomes.length > 0 ? (
              <dl className={styles.outcomeList}>
                {caseStudy.outcomes.map((outcome) => (
                  <div key={outcome.id}>
                    <dt>{outcome.label}</dt>
                    <dd>{outcome.statement}</dd>
                    {outcome.verifiedAt ? <small>Verified {formatDate(outcome.verifiedAt)}</small> : null}
                    {outcome.publicSourceUrl && outcome.publicSourceLabel ? (
                      <a href={outcome.publicSourceUrl}>{outcome.publicSourceLabel} <span aria-hidden="true">↗</span></a>
                    ) : null}
                  </div>
                ))}
              </dl>
            ) : (
              <div className={styles.outcomeEmpty}>
                <Glyph name="evidence" />
                <div>
                  <h3>Verified outcome evidence is not published.</h3>
                  <p>
                    The delivered system and approved media may be public while the outcome remains
                    private or unverified. No metric or testimonial is being substituted for it.
                  </p>
                </div>
              </div>
            )}

            {caseStudy.duration || caseStudy.team || caseStudy.engagementModel ? (
              <dl className={styles.approvedMeta}>
                {caseStudy.duration ? <div><dt>Duration</dt><dd>{caseStudy.duration}</dd></div> : null}
                {caseStudy.team ? <div><dt>Team</dt><dd>{caseStudy.team}</dd></div> : null}
                {caseStudy.engagementModel ? <div><dt>Engagement</dt><dd>{caseStudy.engagementModel}</dd></div> : null}
              </dl>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className={styles.relatedInner}>
          <div>
            <p className={styles.eyebrow}>Continue evaluating the work</p>
            <h2 id="related-title">Related services and the next case.</h2>
            {relatedServices.length > 0 ? (
              <nav aria-label="Related services">
                {relatedServices.map((service) => (
                  <Link href={`/services/${service.slug}/`} key={service.slug}>
                    {service.shortName} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>

          {nextCase ? (
            <Link className={styles.nextCase} href={`/work/${nextCase.slug}/`}>
              <span>Next case</span>
              <strong>{nextCase.clientDisplayName ?? nextCase.title}</strong>
              <small>{nextCase.title}</small>
              <b aria-hidden="true">→</b>
            </Link>
          ) : null}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="case-cta-title">
        <div className={styles.ctaInner}>
          <div>
            <p className={styles.darkEyebrow}>Discuss a similar system</p>
            <h2 id="case-cta-title">Bring the operating constraint, not a finished feature list.</h2>
          </div>
          <Link href="/contact/">Discuss Your Workflow <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </article>
  );
}
