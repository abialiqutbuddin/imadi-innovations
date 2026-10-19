"use client";

import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { CheckCircle2, LoaderCircle, Quote, Send, ShieldCheck, Star } from "lucide-react";

import styles from "./TestimonialForm.module.css";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function TestimonialForm() {
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [startedAt] = useState(() => Date.now());
  const statusRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/testimonial-submissions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          role: formData.get("role"),
          quote,
          rating,
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
          startedAt,
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
      setMessage("Your testimonial has been delivered for review. Nothing has been published automatically.");
      setQuote("");
      setRating(null);
      form.reset();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus("error");
      setMessage("The testimonial service is unavailable. Email hello@imadi-innovations.com instead.");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.quotePanel}>
        <div className={styles.panelLabel}><Quote aria-hidden="true" />Your experience</div>
        <label htmlFor="testimonial-quote">What did Imadi Innovations help change? <b aria-hidden="true">*</b></label>
        <textarea
          id="testimonial-quote"
          maxLength={1200}
          minLength={20}
          name="quote"
          onChange={(event) => setQuote(event.target.value)}
          placeholder="Describe the situation, what Imadi Innovations delivered, and the change you observed."
          required
          rows={12}
          value={quote}
        />
        <div className={styles.quoteHint}>
          <span>Use only details you are comfortable having reviewed for publication.</span>
          <span>{quote.length}/1200</span>
        </div>
        <div className={styles.reviewNote}>
          <ShieldCheck aria-hidden="true" />
          <p><strong>Review comes first.</strong> Permission, attribution, and evidence are checked before anything appears publicly.</p>
        </div>
      </div>

      <div className={styles.detailsPanel}>
        <div>
          <p className={styles.eyebrow}>Attribution details</p>
          <h2>Who is sharing this feedback?</h2>
        </div>

        <div className={styles.fields}>
          <label><span>Full name <b aria-hidden="true">*</b></span><input autoComplete="name" maxLength={120} name="name" required /></label>
          <label><span>Work email <b aria-hidden="true">*</b></span><input autoComplete="email" maxLength={254} name="email" required type="email" /></label>
          <label><span>Company</span><input autoComplete="organization" maxLength={140} name="company" /></label>
          <label><span>Role</span><input autoComplete="organization-title" maxLength={140} name="role" /></label>
        </div>

        <fieldset className={styles.rating}>
          <legend>Optional rating</legend>
          <p>Rating begins unselected. Choose only if it helps represent your experience.</p>
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  checked={rating === value}
                  name="rating"
                  onChange={() => setRating(value)}
                  type="radio"
                  value={value}
                />
                <span>{value}<Star aria-hidden="true" /></span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className={styles.consent}>
          <input name="consent" required type="checkbox" />
          <span>
            I allow Imadi Innovations to review this submission and, after approval, publish the testimonial with the attribution details and rating I provided. <b aria-hidden="true">*</b>
          </span>
        </label>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="testimonial-website">Website</label>
          <input autoComplete="off" id="testimonial-website" name="website" tabIndex={-1} />
        </div>

        {message ? (
          <div
            className={status === "success" ? styles.success : styles.error}
            ref={statusRef}
            role="status"
            tabIndex={-1}
          >
            {status === "success" ? <CheckCircle2 aria-hidden="true" /> : null}
            <span>{message}</span>
          </div>
        ) : null}

        <button disabled={status === "submitting"} type="submit">
          {status === "submitting" ? (
            <><LoaderCircle aria-hidden="true" className={styles.spinner} />Confirming delivery…</>
          ) : (
            <>Submit for Review <Send aria-hidden="true" /></>
          )}
        </button>
        <p className={styles.fallback}>For help, email <a href="mailto:hello@imadi-innovations.com">hello@imadi-innovations.com</a> or read the <Link href="/privacy-policy/">Privacy Policy</Link>.</p>
      </div>
    </form>
  );
}
