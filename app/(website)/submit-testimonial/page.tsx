import type { Metadata } from "next";

import { UtilityShell } from "@/components/shell/SiteShell";
import { TestimonialForm } from "@/components/testimonials/TestimonialForm";

import styles from "./SubmitTestimonialPage.module.css";

export const metadata: Metadata = {
  title: "Submit a Testimonial | Imadi Innovations",
  description: "Share your experience working with Imadi Innovations for review before publication.",
  alternates: { canonical: "/submit-testimonial/" },
  robots: { index: false, follow: false },
};

export default function SubmitTestimonialPage() {
  return (
    <UtilityShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Client feedback / review required</p>
            <h1>Share what changed after working with Imadi Innovations.</h1>
            <p>
              Specific context is more useful than general praise. Nothing publishes automatically,
              and every submission is reviewed for permission and evidence before public use.
            </p>
          </div>
        </header>
        <section className={styles.formSection} aria-label="Testimonial submission">
          <TestimonialForm />
        </section>
      </div>
    </UtilityShell>
  );
}
