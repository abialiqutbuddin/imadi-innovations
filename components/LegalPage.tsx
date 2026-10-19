import { UtilityShell } from "@/components/shell/SiteShell";

import styles from "./LegalPage.module.css";

type LegalSection = {
  title: string;
  body?: string[];
  items?: string[];
};

interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function LegalPage({ title, subtitle, lastUpdated, sections }: LegalPageProps) {
  return (
    <UtilityShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.eyebrow}>Legal document</p>
              <h1>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <dl className={styles.documentMeta}>
              <div><dt>Company</dt><dd>Imadi Innovations</dd></div>
              <div><dt>Last updated</dt><dd>{lastUpdated}</dd></div>
              <div><dt>Sections</dt><dd>{sections.length}</dd></div>
            </dl>
          </div>
        </header>

        <div className={styles.documentLayout}>
          <aside className={styles.toc}>
            <p>On this page</p>
            <nav aria-label={`${title} table of contents`}>
              {sections.map((section) => (
                <a href={`#${sectionId(section.title)}`} key={section.title}>{section.title}</a>
              ))}
            </nav>
          </aside>

          <div className={styles.document}>
            {sections.map((section) => (
              <section id={sectionId(section.title)} key={section.title}>
                <h2>{section.title}</h2>
                {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items ? (
                  <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </UtilityShell>
  );
}
