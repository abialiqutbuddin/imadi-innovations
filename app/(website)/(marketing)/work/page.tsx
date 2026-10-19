import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Glyph } from "@/components/visuals/Glyph";
import { getPublicCaseStudiesFromCms } from "@/lib/cms/case-studies";

import styles from "./WorkPage.module.css";

export const metadata: Metadata = {
  title: "Client Work & Case Studies | Imadi Innovations",
  description:
    "Explore approved project interfaces and the operational decisions behind systems delivered by Imadi Innovations.",
  alternates: { canonical: "/work/" },
};

export default async function WorkPage() {
  const caseStudies = await getPublicCaseStudiesFromCms();
  const hasAnonymousCases = caseStudies.some((item) => item.disclosureLevel === "anonymous");

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" /> Client work</p>
            <h1>Systems built for the work behind the business.</h1>
          </div>
          <div className={styles.heroAside}>
            <p>
              Approved interfaces from software delivered around real operational workflows.
              Open a case to follow the context, decisions, system, and available evidence.
            </p>
            <a href="#case-studies">Browse published work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </header>

      <section className={styles.index} id="case-studies" aria-labelledby="case-studies-title">
        <div className={styles.indexInner}>
          <div className={styles.indexHeading}>
            <p className={styles.eyebrow}>Published case studies</p>
            <h2 id="case-studies-title">The interface is the entry point. The reasoning is the case.</h2>
          </div>

          {hasAnonymousCases ? (
            <p className={styles.disclosureNote}>
              Some engagements are anonymized. Identifying copy, media, filenames, and metadata
              are withheld where disclosure is limited.
            </p>
          ) : null}

          {caseStudies.length > 0 ? (
            <div className={styles.caseGrid}>
              {caseStudies.map((caseStudy, index) => {
                const cover = caseStudy.media.find((media) => media.width >= media.height)
                  ?? caseStudy.media[0];
                const isPortrait = cover ? cover.height > cover.width : false;
                const clientLabel = caseStudy.disclosureLevel === "anonymous"
                  ? "Anonymized engagement"
                  : caseStudy.clientDisplayName;

                return (
                  <Link className={styles.caseCard} href={`/work/${caseStudy.slug}/`} key={caseStudy.id}>
                    <figure className={`${styles.caseMedia} ${isPortrait ? styles.portraitMedia : ""}`}>
                      {cover ? (
                        <>
                          <div className={styles.mediaChrome} aria-hidden="true">
                            {isPortrait ? <span /> : <><i /><i /><i /></>}
                          </div>
                          <div className={styles.imageStage}>
                            <Image
                              alt={cover.alt}
                              fill
                              priority={index === 0}
                              sizes="(max-width: 44rem) 100vw, (max-width: 70rem) 50vw, 42vw"
                              src={cover.src}
                            />
                          </div>
                        </>
                      ) : (
                        <div className={styles.mediaEmpty}>
                          <Glyph name="evidence" />
                          <span>Project media is not published.</span>
                        </div>
                      )}
                    </figure>

                    <div className={styles.caseBody}>
                      <div className={styles.caseMeta}>
                        <span>{clientLabel ?? caseStudy.deliveredSystem}</span>
                        {caseStudy.industry ? <span>{caseStudy.industry}</span> : null}
                      </div>
                      <h3>{caseStudy.title}</h3>
                      <p>{caseStudy.deliveredSystem}</p>
                      <span className={styles.openCase}>View the case <b aria-hidden="true">↗</b></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Glyph name="evidence" />
              <div>
                <h2>No case studies are published yet.</h2>
                <p>
                  Project records will appear here after their WordPress content, disclosure,
                  and media are approved. No substitute results are being shown.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="work-cta-title">
        <div className={styles.ctaInner}>
          <div>
            <p className={styles.darkEyebrow}>A similar operational constraint?</p>
            <h2 id="work-cta-title">Bring the workflow that needs to work better.</h2>
          </div>
          <Link href="/contact/">Discuss Your Workflow <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
