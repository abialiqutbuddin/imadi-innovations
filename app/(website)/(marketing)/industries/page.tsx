import type { Metadata } from "next";
import Link from "next/link";

import editorialStyles from "@/components/pages/EditorialPage.module.css";
import { Glyph, type GlyphName } from "@/components/visuals/Glyph";
import { OperationalVisual } from "@/components/visuals/OperationalVisual";

import styles from "./IndustriesPage.module.css";

export const metadata: Metadata = {
  title: "Operational Contexts | Imadi Innovations",
  description:
    "Common workflow patterns across logistics, healthcare operations, workforce systems, hospitality, commerce, and service businesses.",
  alternates: { canonical: "/industries/" },
};

const contexts: Array<[string, string, GlyphName]> = [
  ["Logistics & commerce", "Orders, inventory, fulfillment, exceptions, partner visibility, and cross-team handoffs.", "commerce"],
  ["Healthcare operations", "Credentialing, compliance tasks, document status, ownership, and time-sensitive follow-up.", "healthcare"],
  ["Workforce & HR", "Attendance, scheduling, approvals, employee records, payroll inputs, and manager visibility.", "workforce"],
  ["Hospitality & food service", "Bookings, orders, menus, production planning, customer communication, and fulfillment.", "hospitality"],
  ["Community & event operations", "Registration, roles, schedules, communication, coordination, and live status.", "community"],
  ["Service businesses", "Leads, requests, assignments, approvals, reporting, and customer portals.", "service"],
];

export default function IndustriesPage() {
  return (
    <div className={`${editorialStyles.page} ${styles.page}`}>
      <header className={`${editorialStyles.hero} ${styles.hero}`}>
        <div className={`${editorialStyles.heroInner} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={`${editorialStyles.eyebrow} ${styles.eyebrow}`}><span aria-hidden="true" /> Industries</p>
            <h1>Different sectors. Familiar operational patterns.</h1>
            <p className={`${editorialStyles.heroLead} ${styles.heroLead}`}>
              Industry context matters, but the deeper design work often begins with ownership,
              handoffs, exceptions, visibility, and decisions.
            </p>
          </div>
          <div className={`${editorialStyles.heroAside} ${styles.heroAside}`}>
            <OperationalVisual label="Context → handoffs → connected operation" variant="industries" />
            <dl className={`${editorialStyles.heroMeta} ${styles.heroMeta}`}>
              <div><dt>Current scope</dt><dd>Operational context overview</dd></div>
              <div><dt>Evidence policy</dt><dd>Case links appear after approval</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <section className={editorialStyles.section} aria-labelledby="contexts-title">
        <div className={editorialStyles.sectionInner}>
          <div className={editorialStyles.sectionHeading}>
            <div><p className={editorialStyles.eyebrow}>Operational contexts</p><h2 id="contexts-title">Start with the work the system must coordinate.</h2></div>
            <p>These are problem spaces, not unsupported claims of universal industry expertise.</p>
          </div>
          <div className={editorialStyles.grid}>
            {contexts.map(([title, detail, icon]) => (
              <article key={title}><Glyph className={editorialStyles.cardIcon} name={icon} /><p className={editorialStyles.listLabel}>Context</p><h3>{title}</h3><p>{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={editorialStyles.cta}>
        <div className={editorialStyles.ctaInner}>
          <div><p className={editorialStyles.utility}>Your context</p><h2>Describe the operation in its own language.</h2><p>Imadi Innovations can map the workflow before deciding whether a standard pattern applies.</p></div>
          <Link className={editorialStyles.buttonLink} href="/contact/">Discuss Your Context <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
