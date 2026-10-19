"use client";

import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

import styles from "./TijaratPage.module.css";

type SubmitState = "idle" | "submitting" | "success" | "error";

const attributionKey = "imadi-innovations-lead-attribution-v1";

function readAttribution() {
  try {
    const stored = sessionStorage.getItem(attributionKey);
    if (stored) {
      const value: unknown = JSON.parse(stored);
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        return value;
      }
    }
  } catch {
    // Attribution is optional and must not block the form.
  }

  return {};
}

export function TijaratInterestForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [startedAt] = useState(() => Date.now());
  const statusRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const context = [
      "Tijarat POS demo request",
      `Business type: ${formData.get("businessType") || "Not provided"}`,
      `City: ${formData.get("city") || "Not provided"}`,
      `Phone: ${formData.get("phone") || "Not provided"}`,
      "",
      `Current operational problem: ${formData.get("problem")}`,
    ].join("\n");

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact-submissions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formKind: "tijarat",
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          company: formData.get("businessName"),
          projectType: "Tijarat Demo",
          timeline: "",
          budget: "",
          message: context,
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
          startedAt,
          attribution: readAttribution(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "We could not confirm delivery. Please use email instead.");
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      setStatus("success");
      setMessage("Your Tijarat POS demo request has been delivered to Imadi Innovations for review.");
      form.reset();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus("error");
      setMessage("The form service is unavailable. Email hello@imadi-innovations.com instead.");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form className={styles.interestForm} onSubmit={handleSubmit}>
      <p className={styles.requiredNote}>Required fields are marked with an asterisk.</p>
      <div className={styles.fieldGrid}>
        <label><span>Full name <b aria-hidden="true">*</b></span><input autoComplete="name" maxLength={100} name="fullName" required /></label>
        <label><span>Work email <b aria-hidden="true">*</b></span><input autoComplete="email" inputMode="email" maxLength={254} name="email" required type="email" /></label>
        <label><span>Business name <b aria-hidden="true">*</b></span><input autoComplete="organization" maxLength={120} name="businessName" required /></label>
        <label><span>Business type</span><select defaultValue="" name="businessType"><option value="">Select if known</option><option>Retail</option><option>Wholesale</option><option>Distribution</option><option>Manufacturing</option><option>Services</option><option>Other</option></select></label>
        <label><span>City</span><input autoComplete="address-level2" maxLength={100} name="city" /></label>
        <label><span>Phone</span><input autoComplete="tel" inputMode="tel" maxLength={40} name="phone" type="tel" /></label>
        <label className={styles.problemField}>
          <span>What currently slows the business down? <b aria-hidden="true">*</b></span>
          <textarea maxLength={2200} minLength={30} name="problem" placeholder="Describe the repeated work, missing visibility, or handoff that causes the most friction." required rows={7} />
          <small>30–2,200 characters. Do not include passwords, financial records, or sensitive personal data.</small>
        </label>
        <label className={styles.consentField}>
          <input name="consent" required type="checkbox" />
          <span>I agree that Imadi Innovations may use this information to assess product-research fit and respond, as described in the <Link href="/privacy-policy/">Privacy Policy</Link>. <b aria-hidden="true">*</b></span>
        </label>
      </div>

      <div className={styles.honeypot} aria-hidden="true"><label htmlFor="tijarat-website">Website</label><input autoComplete="off" id="tijarat-website" name="website" tabIndex={-1} /></div>

      {message ? (
        <div className={status === "success" ? styles.formSuccess : styles.formError} ref={statusRef} role={status === "error" ? "alert" : "status"} tabIndex={-1}>
          {status === "success" ? <CheckCircle2 aria-hidden="true" /> : null}<span>{message}</span>
        </div>
      ) : null}

      <button disabled={status === "submitting"} type="submit">
        {status === "submitting" ? <><LoaderCircle aria-hidden="true" className={styles.spinner} />Confirming delivery…</> : <>Request a Demo <Send aria-hidden="true" /></>}
      </button>
      <p className={styles.formFallback}>Prefer email? Write to <a href="mailto:hello@imadi-innovations.com">hello@imadi-innovations.com</a>.</p>
    </form>
  );
}
