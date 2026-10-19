import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Glyph, ServiceGlyph } from "@/components/visuals/Glyph";
import { getPublicCaseStudiesFromCms } from "@/lib/cms/case-studies";
import { getMarketingService, marketingServices } from "@/lib/content/marketing";

import styles from "./ServicePage.module.css";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return marketingServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getMarketingService(slug);

  if (!service) return {};

  return {
    title: `${service.name} | Imadi Innovations`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getMarketingService(slug);
  if (!service) notFound();

  const caseStudies = await getPublicCaseStudiesFromCms();
  const relatedCases = caseStudies
    .filter((caseStudy) => caseStudy.relatedServiceIds.includes(service.slug))
    .slice(0, 3);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroMain}>
            <nav aria-label="Breadcrumb"><Link href="/services/">Services</Link><span aria-hidden="true">/</span><span>{service.shortName}</span></nav>
            <ServiceGlyph className={styles.heroGlyph} slug={service.slug} />
            <h1>{service.name}</h1>
            <p>{service.summary}</p>
          </div>
          <aside className={styles.situation} aria-labelledby="situation-title">
            <p className={styles.eyebrow}>Use this service when</p>
            <h2 id="situation-title">{service.situation}</h2>
            <Link href="#recognized-problems">Check the fit <span aria-hidden="true">↓</span></Link>
          </aside>
        </div>
      </header>

      <section className={styles.fit} id="recognized-problems" aria-labelledby="fit-title">
        <div className={styles.inner}>
          <div className={styles.fitIntro}>
            <p className={styles.eyebrow}>Recognized problems</p>
            <h2 id="fit-title">The signals that make this route relevant.</h2>
          </div>
          <ul className={styles.problemList}>
            {service.buyerProblems.map((problem, index) => <li key={problem}><span>{String(index + 1).padStart(2, "0")}</span><p>{problem}</p></li>)}
          </ul>
        </div>
      </section>

      <section className={styles.outcomes} aria-labelledby="outcomes-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Outcomes this work can support</p>
            <h2 id="outcomes-title">Direction without unsupported guarantees.</h2>
            <p>These describe the responsibilities the work is designed to support. Actual results depend on the approved scope, adoption, operating context, and evidence available.</p>
          </div>
          <div className={styles.outcomeGrid}>
            {service.supportedOutcomes.map((outcome, index) => <article key={outcome}><span>0{index + 1}</span><Glyph name="evidence" /><p>{outcome}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.deliverables} aria-labelledby="deliverables-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Delivered system</p>
            <h2 id="deliverables-title">What the approved scope establishes.</h2>
          </div>
          <ol className={styles.deliverableList}>
            {service.deliverables.map((item, index) => (
              <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.workflow} aria-labelledby="workflow-title">
        <div className={styles.inner}>
          <div className={styles.workflowIntro}>
            <p className={styles.eyebrow}>Typical collaboration</p>
            <h2 id="workflow-title">A sequence built around inspectable decisions.</h2>
            <p>The exact cadence is agreed for the engagement; this is the working sequence the service is designed to support.</p>
          </div>
          <ol className={styles.workflowRail}>
            {service.workflow.map((step, index) => (
              <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.architecture} aria-labelledby="architecture-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Useful architecture decisions</p>
            <h2 id="architecture-title">Technical choices stay tied to operating responsibility.</h2>
          </div>
          <div className={styles.architectureGrid}>
            {service.architecture.map((item) => <article key={item.title}><Glyph name="define" /><h3>{item.title}</h3><p>{item.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Related client work</p>
            <h2 id="related-title">Published evidence connected to this service.</h2>
            <Link href="/work/">All case studies <span aria-hidden="true">↗</span></Link>
          </div>
          {relatedCases.length ? (
            <div className={styles.caseGrid}>
              {relatedCases.map((caseStudy) => {
                const media = caseStudy.media.find((item) => item.width >= item.height) ?? caseStudy.media[0];
                return (
                  <Link className={styles.case} href={`/work/${caseStudy.slug}/`} key={caseStudy.id}>
                    <div className={styles.caseMedia}>{media ? <Image alt={media.alt} fill sizes="(max-width: 48rem) 100vw, 33vw" src={media.src} /> : <Glyph name="evidence" />}</div>
                    <p>{caseStudy.deliveredSystem}</p><h3>{caseStudy.title}</h3>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}><Glyph name="evidence" /><div><h3>No matching case is published.</h3><p>A related case will appear here only after its WordPress record, media, and disclosure are approved.</p></div></div>
          )}
        </div>
      </section>

      <section className={styles.boundaries} aria-labelledby="boundaries-title">
        <div className={styles.inner}>
          <div className={styles.boundaryIntro}><p className={styles.eyebrow}>Scope boundary</p><h2 id="boundaries-title">Included by agreement. Excluded unless agreed.</h2></div>
          <div className={styles.boundaryColumns}>
            <div><h3><span aria-hidden="true">✓</span> Included in the service boundary</h3><ul>{service.included.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3><span aria-hidden="true">×</span> Not assumed</h3><ul>{service.excluded.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.inner}>
          <div className={styles.faqIntro}><p className={styles.eyebrow}>FAQ</p><h2 id="faq-title">Questions specific to {service.shortName.toLowerCase()}.</h2></div>
          <div className={styles.faqList}>{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="service-cta-title">
        <div className={styles.ctaInner}>
          <div><p className={styles.darkEyebrow}>Next decision</p><h2 id="service-cta-title">{service.cta}</h2><p>{service.ctaDetail}</p></div>
          <Link href="/contact/">Discuss the Work <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
