import Image from "next/image";
import Link from "next/link";

import { getPublicCaseStudiesFromCms } from "@/lib/cms/case-studies";
import type { CaseStudy, CmsImage } from "@/lib/cms/types";
import { Glyph, type GlyphName } from "@/components/visuals/Glyph";

import styles from "./HomePage.module.css";

const operatingProblems: Array<{
  title: string;
  direction: string;
  href: string;
  icon: GlyphName;
}> = [
  {
    title: "Scattered information",
    direction: "Create one dependable source of truth.",
    href: "/services/integrations-modernization-support/",
    icon: "connect",
  },
  {
    title: "Invisible handoffs",
    direction: "Give every request a clear next owner.",
    href: "/services/custom-software-development/",
    icon: "workflow",
  },
  {
    title: "Unclear priorities",
    direction: "Show each team what needs attention now.",
    href: "/services/web-application-development/",
    icon: "web",
  },
  {
    title: "Repetitive admin work",
    direction: "Automate the repeatable steps with oversight.",
    href: "/services/ai-workflow-automation/",
    icon: "ai",
  },
];

const servicePathways: Array<{
  label: string;
  title: string;
  detail: string;
  href: string;
  action: string;
  icon: GlyphName;
  tags: string[];
}> = [
  {
    label: "For an operation that no longer fits off-the-shelf tools",
    title: "Build around the way your team works.",
    detail: "Turn roles, approvals, exceptions, and reporting into one dependable operational system.",
    href: "/services/custom-software-development/",
    action: "Explore Custom Software",
    icon: "custom",
    tags: ["Internal tools", "Portals", "Role-based systems"],
  },
  {
    label: "For a product that needs to work wherever people are",
    title: "Put the right experience in the right hands.",
    detail: "Design and build web, mobile, and MVP products that stay clear across devices and daily use.",
    href: "/services/web-application-development/",
    action: "Explore Digital Products",
    icon: "mobile",
    tags: ["Web platforms", "Mobile apps", "MVP & SaaS"],
  },
  {
    label: "For useful systems that do not yet work together",
    title: "Connect, automate, and improve the flow.",
    detail: "Link existing software, remove repetitive information work, and modernize without losing operational context.",
    href: "/services/ai-workflow-automation/",
    action: "Explore Automation",
    icon: "integrations",
    tags: ["AI workflows", "Integrations", "Modernization"],
  },
];

const deliverySteps: Array<{ title: string; detail: string; icon: GlyphName }> = [
  {
    title: "Understand the operation",
    detail: "Map the people, decisions, exceptions, and constraints before choosing features.",
    icon: "discover",
  },
  {
    title: "Build the working flow",
    detail: "Turn the approved model into reviewable software, integrations, and interfaces.",
    icon: "build",
  },
  {
    title: "Validate and evolve",
    detail: "Test real use, hand over clearly, and improve the system as the operation changes.",
    icon: "validate",
  },
];

function landscapeMedia(caseStudy: CaseStudy): CmsImage | undefined {
  return caseStudy.media.find((item) => item.width >= item.height) ?? caseStudy.media[0];
}

function HeroInterfaceStage({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const primaryCase = caseStudies[0];
  const secondaryCase = caseStudies[1];
  const primaryMedia = primaryCase ? landscapeMedia(primaryCase) : undefined;
  const secondaryMedia = secondaryCase ? landscapeMedia(secondaryCase) : undefined;

  return (
    <div className={styles.heroStage} role="img" aria-label="Software interfaces delivered by Imadi Innovations">
      <div className={styles.stageGlow} aria-hidden="true" />
      <div className={styles.stageRoute} aria-hidden="true">
        <span>Input</span>
        <i />
        <span>Decision</span>
        <i />
        <span>Action</span>
      </div>

      <div className={styles.primaryScreen}>
        <div className={styles.screenChrome}>
          <span aria-hidden="true"><i /><i /><i /></span>
          <small>{primaryCase?.clientDisplayName ?? "Operational system"}</small>
          <b>Live interface</b>
        </div>
        <div className={styles.screenCanvas}>
          {primaryMedia ? (
            <Image
              alt={primaryMedia.alt}
              fill
              priority
              sizes="(max-width: 70rem) 92vw, 52vw"
              src={primaryMedia.src}
            />
          ) : (
            <div className={styles.screenFallback}>
              <Glyph name="workflow" />
              <strong>Workflow made visible</strong>
              <span>Roles · decisions · actions</span>
            </div>
          )}
        </div>
      </div>

      {secondaryMedia ? (
        <div className={styles.secondaryScreen}>
          <div className={styles.secondaryLabel}>
            <span>{secondaryCase?.clientDisplayName}</span>
            <i>Connected view</i>
          </div>
          <div className={styles.secondaryCanvas}>
            <Image
              alt={secondaryMedia.alt}
              fill
              sizes="(max-width: 45rem) 68vw, 24vw"
              src={secondaryMedia.src}
            />
          </div>
        </div>
      ) : null}

      <div className={styles.decisionCard}>
        <span><i aria-hidden="true" /> Decision visible</span>
        <strong>Ready for the next owner</strong>
        <small>Context travels with the work.</small>
      </div>
    </div>
  );
}

export async function HomePage() {
  const selectedCases = (await getPublicCaseStudiesFromCms()).slice(0, 3);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              <span aria-hidden="true" /> Custom software for operational work
            </p>
            <h1 id="home-title">
              Turn a difficult workflow into <em>working software.</em>
            </h1>
            <p className={styles.heroLead}>
              Imadi Innovations designs web platforms, mobile apps, and automation
              for teams held back by spreadsheets, manual follow-ups, and disconnected systems.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/contact/">
                Discuss Your Workflow <span aria-hidden="true">↗</span>
              </Link>
              <Link className={styles.heroTextLink} href="/work/">
                See Client Work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <HeroInterfaceStage caseStudies={selectedCases} />
        </div>
        <div className={styles.heroProof}>
          <span>Designed around real operations</span>
          <span>Web · mobile · automation</span>
          <span>From workflow to supported system</span>
        </div>
      </section>

      <section className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Selected client work</p>
            <h2 id="work-title">See the systems, not just the promises.</h2>
          </div>
          <div className={styles.headingAside}>
            <p>Real interfaces managed through WordPress, with delivery context kept visible.</p>
            <Link href="/work/" className={styles.textLink}>
              Explore All Work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {selectedCases.length > 0 ? (
          <div className={styles.caseGrid}>
            {selectedCases.map((caseStudy, index) => {
              const media = landscapeMedia(caseStudy);
              return (
                <Link
                  className={index === 0 ? styles.featuredCase : styles.caseCard}
                  href={`/work/${caseStudy.slug}/`}
                  key={caseStudy.id}
                >
                  <span className={styles.caseMedia}>
                    {media ? (
                      <Image
                        alt={media.alt}
                        fill
                        sizes={index === 0
                          ? "(max-width: 52rem) 100vw, 66vw"
                          : "(max-width: 52rem) 100vw, 33vw"}
                        src={media.src}
                      />
                    ) : (
                      <span className={styles.caseFallback}><Glyph name="system" /></span>
                    )}
                    <span className={styles.caseNumber}>0{index + 1}</span>
                  </span>
                  <span className={styles.caseBody}>
                    <small>{caseStudy.clientDisplayName ?? caseStudy.industry}</small>
                    <strong>{caseStudy.title}</strong>
                    <span>{caseStudy.deliveredSystem}</span>
                    <i aria-hidden="true">↗</i>
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.workFallback}>
            <Glyph name="workforce" />
            <p>Project interfaces will appear here when published in WordPress.</p>
          </div>
        )}
      </section>

      <section className={styles.problems} aria-labelledby="problems-title">
        <div className={styles.problemHeading}>
          <p className={styles.eyebrow}>Where software starts earning its place</p>
          <h2 id="problems-title">Recognize the friction?</h2>
          <p>Start with the part of the operation that is hard to see, own, or repeat.</p>
        </div>

        <div className={styles.problemGrid}>
          {operatingProblems.map((item) => (
            <Link href={item.href} key={item.title}>
              <span className={styles.problemIcon}><Glyph name={item.icon} /></span>
              <strong>{item.title}</strong>
              <span>{item.direction}</span>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.services} aria-labelledby="services-title">
        <div className={styles.serviceHeading}>
          <div>
            <p className={styles.darkEyebrow}>Choose the change you need</p>
            <h2 id="services-title">Three ways to move the work forward.</h2>
          </div>
          <Link href="/services/" className={styles.darkTextLink}>
            Compare All Services <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.pathwayGrid}>
          {servicePathways.map((pathway, index) => (
            <article key={pathway.title}>
              <div className={styles.pathwayTopline}>
                <span>0{index + 1}</span>
                <Glyph name={pathway.icon} />
              </div>
              <p>{pathway.label}</p>
              <h3>{pathway.title}</h3>
              <span>{pathway.detail}</span>
              <ul aria-label={`${pathway.title} capabilities`}>
                {pathway.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <Link href={pathway.href}>
                {pathway.action} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.tijarat} aria-labelledby="tijarat-title">
        <div className={styles.tijaratCopy}>
          <div className={styles.tijaratBrand}>
            <Image alt="Tijarat POS" height={58} src="/tijarat/tijarat-logo.png" width={58} />
            <div>
              <strong>Tijarat POS</strong>
              <span>A product by Imadi Innovations</span>
            </div>
          </div>
          <p className={styles.tijaratEyebrow}>Retail operations software · Beta</p>
          <h2 id="tijarat-title">Billing, stock, and business visibility in one flow.</h2>
          <p>
            Tijarat connects invoicing, inventory, purchasing, customer and supplier balances,
            and reporting for retail and wholesale teams.
          </p>
          <Link href="/tijarat/" className={styles.tijaratAction}>
            Explore Tijarat POS <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={styles.tijaratVisual} role="img" aria-label="Tijarat POS product interface">
          <div className={styles.tijaratWindow}>
            <div className={styles.tijaratChrome}>
              <span aria-hidden="true"><i /><i /><i /></span>
              <small>Product dashboard</small>
              <b>Beta</b>
            </div>
            <div className={styles.tijaratCanvas}>
              <Image
                alt="Tijarat POS dashboard showing sales and inventory information"
                fill
                sizes="(max-width: 60rem) 92vw, 52vw"
                src="/tijarat/tijarat-dashboard.jpeg"
              />
            </div>
          </div>
          <div className={styles.tijaratStatus}>
            <Glyph name="commerce" />
            <span>Offline-capable operations</span>
          </div>
        </div>
      </section>

      <section className={styles.close} aria-labelledby="process-title">
        <div className={styles.closeInner}>
          <div className={styles.processIntro}>
            <p className={styles.eyebrow}>From difficult process to dependable system</p>
            <h2 id="process-title">Move with clarity at every stage.</h2>
            <Link href="/process/" className={styles.textLink}>
              See the Full Process <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ol className={styles.deliverySteps}>
            {deliverySteps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <Glyph name={step.icon} />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.finalCta}>
          <div className={styles.ctaRoute} aria-hidden="true">
            <span>Workflow</span><i /><span>Decision</span><i /><span>Working system</span>
          </div>
          <div>
            <p>Start with what is difficult today</p>
            <h2>Let’s make the work easier to run.</h2>
          </div>
          <Link href="/contact/" className={styles.primaryAction}>
            Start a Conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
