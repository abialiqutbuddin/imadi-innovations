import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

import { Glyph } from "@/components/visuals/Glyph";

import styles from "./ThankYouPage.module.css";

export const metadata: Metadata = {
  title: "Message Received | Imadi Innovations",
  description: "Confirmation that Imadi Innovations received your project enquiry.",
  alternates: { canonical: "/thank-you/" },
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const receipt = (await cookies()).get("imadi-contact-receipt")?.value;
  const deliveryConfirmed = receipt === "confirmed";

  return (
    <div className={styles.page}>
      <section className={styles.confirmation} aria-labelledby="confirmation-title">
        <div className={styles.panel}>
          <div className={styles.statusGraphic} aria-hidden="true">
            <span><Glyph name="deliver" /></span>
            <i />
            <span><Glyph name="evidence" /></span>
            <i />
            <span><Glyph name="outcome" /></span>
          </div>

          <div className={styles.copy}>
            <p className={styles.eyebrow}>{deliveryConfirmed ? "Delivery confirmed" : "Delivery status"}</p>
            <h1 id="confirmation-title">
              {deliveryConfirmed
                ? "Your project context has been received."
                : "This page cannot confirm a submission."}
            </h1>
            <p className={styles.lead}>
              {deliveryConfirmed
                ? "Imadi Innovations will review the workflow, constraints, and desired change before deciding which next conversation would be useful."
                : "A confirmation is shown only after the contact service accepts delivery. If you intended to send an enquiry, return to the Contact page or use the email fallback."}
            </p>
          </div>

          <div className={styles.expectation}>
            <Glyph name="workflow" />
            <div>
              <h2>{deliveryConfirmed ? "What happens next" : "Send or verify your enquiry"}</h2>
              <p>
                {deliveryConfirmed
                  ? "The enquiry is reviewed before a response is prepared. A guaranteed response window is not currently published."
                  : "No receipt is present in this browser, so Imadi Innovations is not claiming that a message was delivered."}{" "}
                If the request is time-sensitive, email{" "}
                <a href="mailto:hello@imadi-innovations.com">hello@imadi-innovations.com</a>.
              </p>
            </div>
          </div>

          <nav className={styles.links} aria-label="Recommended next pages">
            <Link href="/work/">
              <Glyph name="evidence" />
              <span><small>Evidence standard</small>Review Client Work</span>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/process/">
              <Glyph name="plan" />
              <span><small>Delivery method</small>See the Process</span>
              <b aria-hidden="true">→</b>
            </Link>
          </nav>

          <Link className={styles.homeLink} href={deliveryConfirmed ? "/" : "/contact/"}>
            {deliveryConfirmed ? "Return to Home" : "Return to Contact"}
          </Link>
        </div>
      </section>
    </div>
  );
}
