import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import styles from "@/components/contact/ContactPage.module.css";
import { Glyph } from "@/components/visuals/Glyph";
import { OperationalVisual } from "@/components/visuals/OperationalVisual";

export const metadata: Metadata = {
  title: "Discuss Your Workflow | Imadi Innovations",
  description:
    "Share the workflow, system, or product decision your team needs to improve with Imadi Innovations.",
  alternates: { canonical: "/contact/" },
};

const usefulStartingPoints = [
  "A workflow held together by spreadsheets and follow-ups",
  "An existing platform that is difficult to connect or change",
  "A web, mobile, SaaS, or automation product that needs clear definition",
];

const nextSteps = [
  ["Context review", "We read the operating problem, constraints, and desired change before suggesting a format."],
  ["Clarifying conversation", "If the work appears suitable, we identify the unknowns and the first decision together."],
  ["Useful next step", "That may be discovery, a scoped build, a system review, or a candid recommendation to take another route."],
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>Discuss your workflow</p>
            <h1>Bring the operation that needs to work better.</h1>
            <p className={styles.heroLead}>
              Share what is difficult today, who the system must support, and what
              needs to change. A useful first step is clarity—not a rushed feature list.
            </p>
          </div>
          <OperationalVisual
            label="Current workflow → first decision → useful next step"
            variant="services"
          />
        </div>
      </header>

      <section className={styles.contactSection} aria-labelledby="contact-form-title">
        <div className={styles.contactGrid}>
          <aside className={styles.contextPanel}>
            <div>
              <p className={styles.eyebrow}>Useful starting points</p>
              <h2>Enough context to understand the work.</h2>
              <ul className={styles.startingPoints}>
                {usefulStartingPoints.map((item) => (
                  <li key={item}>
                    <Glyph name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.contactChannels}>
              <a href="mailto:hello@imadi-innovations.com">
                <Glyph name="evidence" />
                <span><small>Email</small>hello@imadi-innovations.com</span>
              </a>
              <a href="https://wa.me/923330365252">
                <Glyph name="community" />
                <span><small>WhatsApp</small>+92 333 036 5252</span>
              </a>
            </div>

            <div className={styles.privacyNote}>
              <Glyph name="validate" />
              <p>
                Do not send passwords, production credentials, regulated records, or
                confidential client data through this form. Read the{" "}
                <Link href="/privacy-policy/">Privacy Policy</Link>.
              </p>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>

      <section className={styles.nextSection} aria-labelledby="next-title">
        <div className={styles.nextInner}>
          <div className={styles.nextHeading}>
            <p className={styles.eyebrow}>After you send the form</p>
            <h2 id="next-title">A response should move the decision forward.</h2>
          </div>
          <ol className={styles.nextSteps}>
            {nextSteps.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Glyph name={index === 0 ? "discover" : index === 1 ? "workflow" : "plan"} />
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
