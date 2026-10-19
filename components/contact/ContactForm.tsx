"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";

import styles from "./ContactPage.module.css";

type SubmitStatus = "idle" | "submitting" | "error";

type FieldName =
  | "fullName"
  | "email"
  | "company"
  | "projectType"
  | "timeline"
  | "budget"
  | "message"
  | "consent";

type SubmissionError = {
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
};

const attributionKey = "imadi-innovations-lead-attribution-v1";

function readAttribution() {
  try {
    const stored = sessionStorage.getItem(attributionKey);
    if (stored) {
      return JSON.parse(stored) as Record<string, string>;
    }
  } catch {
    // Storage is optional; the form remains usable when it is blocked.
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmTerm: params.get("utm_term") ?? "",
    utmContent: params.get("utm_content") ?? "",
    referrer: document.referrer,
    landingPage: `${window.location.pathname}${window.location.search}`,
  };
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <span className={styles.fieldError} id={id}>{message}</span> : null;
}

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<SubmissionError["fieldErrors"]>({});
  const [startedAt] = useState(() => Date.now());
  const errorRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact-submissions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formKind: "contact",
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          company: formData.get("company"),
          projectType: formData.get("projectType"),
          timeline: formData.get("timeline"),
          budget: formData.get("budget"),
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
          startedAt,
          attribution: readAttribution(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as SubmissionError;

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.message ?? "We could not confirm delivery. Please use email or WhatsApp instead.");
        setFieldErrors(data.fieldErrors ?? {});
        requestAnimationFrame(() => errorRef.current?.focus());
        return;
      }

      router.push("/thank-you/");
    } catch {
      setStatus("error");
      setErrorMessage("The contact service is unavailable. Please use email or WhatsApp instead.");
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Project context</p>
        <h2 id="contact-form-title">What needs to change?</h2>
        <p>Required fields are marked with an asterisk.</p>
      </div>

      {errorMessage ? (
        <div className={styles.errorSummary} ref={errorRef} role="alert" tabIndex={-1}>
          <strong>Message not sent</strong>
          <p>{errorMessage}</p>
        </div>
      ) : null}

      <div className={styles.formGrid}>
        <label>
          <span>Full name <b aria-hidden="true">*</b></span>
          <input
            aria-describedby={fieldErrors?.fullName ? "fullName-error" : undefined}
            aria-invalid={fieldErrors?.fullName ? true : undefined}
            autoComplete="name"
            maxLength={100}
            name="fullName"
            required
          />
          <FieldError id="fullName-error" message={fieldErrors?.fullName} />
        </label>

        <label>
          <span>Work email <b aria-hidden="true">*</b></span>
          <input
            aria-describedby={fieldErrors?.email ? "email-error" : undefined}
            aria-invalid={fieldErrors?.email ? true : undefined}
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            name="email"
            required
            type="email"
          />
          <FieldError id="email-error" message={fieldErrors?.email} />
        </label>

        <label>
          <span>Company</span>
          <input
            aria-describedby={fieldErrors?.company ? "company-error" : undefined}
            aria-invalid={fieldErrors?.company ? true : undefined}
            autoComplete="organization"
            maxLength={120}
            name="company"
          />
          <FieldError id="company-error" message={fieldErrors?.company} />
        </label>

        <label>
          <span>What kind of work is this?</span>
          <select
            aria-describedby={fieldErrors?.projectType ? "projectType-error" : undefined}
            aria-invalid={fieldErrors?.projectType ? true : undefined}
            name="projectType"
            defaultValue=""
          >
            <option value="">Select if known</option>
            <option value="Custom software">Custom software</option>
            <option value="Web application">Web application or portal</option>
            <option value="Mobile application">Mobile application</option>
            <option value="MVP or SaaS">MVP or SaaS product</option>
            <option value="AI or workflow automation">AI or workflow automation</option>
            <option value="Integration or modernization">Integration or modernization</option>
            <option value="Not sure">Not sure yet</option>
          </select>
          <FieldError id="projectType-error" message={fieldErrors?.projectType} />
        </label>

        <label>
          <span>Desired timeline</span>
          <select
            aria-describedby={fieldErrors?.timeline ? "timeline-error" : undefined}
            aria-invalid={fieldErrors?.timeline ? true : undefined}
            name="timeline"
            defaultValue=""
          >
            <option value="">Select if known</option>
            <option value="Exploring options">Exploring options</option>
            <option value="Within 1–3 months">Within 1–3 months</option>
            <option value="Within 3–6 months">Within 3–6 months</option>
            <option value="More than 6 months">More than 6 months</option>
            <option value="Existing system needs attention">Existing system needs attention</option>
          </select>
          <FieldError id="timeline-error" message={fieldErrors?.timeline} />
        </label>

        <label>
          <span>Budget or engagement range</span>
          <select
            aria-describedby={fieldErrors?.budget ? "budget-error" : undefined}
            aria-invalid={fieldErrors?.budget ? true : undefined}
            name="budget"
            defaultValue=""
          >
            <option value="">Prefer not to say / not known</option>
            <option value="Under $2,500">Under $2,500</option>
            <option value="$2,500–$5,000">$2,500–$5,000</option>
            <option value="$5,000–$10,000">$5,000–$10,000</option>
            <option value="$10,000+">$10,000+</option>
            <option value="Ongoing support">Ongoing support</option>
          </select>
          <FieldError id="budget-error" message={fieldErrors?.budget} />
        </label>

        <label className={styles.messageField}>
          <span>What needs to change? <b aria-hidden="true">*</b></span>
          <textarea
            aria-describedby={`message-hint${fieldErrors?.message ? " message-error" : ""}`}
            aria-invalid={fieldErrors?.message ? true : undefined}
            maxLength={2500}
            minLength={30}
            name="message"
            placeholder="Describe the current workflow, who is affected, and what a better result would look like."
            required
            rows={7}
          />
          <small id="message-hint">30–2,500 characters. Do not include credentials or sensitive records.</small>
          <FieldError id="message-error" message={fieldErrors?.message} />
        </label>

        <label className={styles.consentField}>
          <input
            aria-describedby={fieldErrors?.consent ? "consent-error" : undefined}
            aria-invalid={fieldErrors?.consent ? true : undefined}
            name="consent"
            required
            type="checkbox"
          />
          <span>
            I agree that Imadi Innovations may use this information to respond to my enquiry,
            as described in the <Link href="/privacy-policy/">Privacy Policy</Link>. <b aria-hidden="true">*</b>
          </span>
        </label>
        <FieldError id="consent-error" message={fieldErrors?.consent} />
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input autoComplete="off" id="contact-website" name="website" tabIndex={-1} />
      </div>

      <button className={styles.submitButton} disabled={status === "submitting"} type="submit">
        {status === "submitting" ? (
          <><LoaderCircle aria-hidden="true" className={styles.spinner} /> Confirming delivery…</>
        ) : (
          <>Send Project Context <Send aria-hidden="true" /></>
        )}
      </button>
      <p className={styles.formFallback}>
        If the form does not work, email <a href="mailto:hello@imadi-innovations.com">hello@imadi-innovations.com</a>.
      </p>
    </form>
  );
}
