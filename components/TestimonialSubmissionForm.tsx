"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Quote, ShieldCheck, Star } from "lucide-react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const WORDPRESS_API_URL =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

function wordpressEndpoint(path: string) {
    return `${WORDPRESS_API_URL.replace(/\/$/, "")}/wp-json/imadi/v1/${path}`;
}

const initialForm = {
    name: "",
    email: "",
    company: "",
    role: "",
    quote: "",
    rating: 5,
    consent: false,
    website: "",
};

export default function TestimonialSubmissionForm() {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState<SubmitState>("idle");
    const [message, setMessage] = useState("");

    const updateField = (field: keyof typeof initialForm, value: string | number | boolean) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("submitting");
        setMessage("");

        try {
            const response = await fetch(wordpressEndpoint("testimonial-submissions"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setStatus("error");
                setMessage(data.message || "We could not submit your testimonial right now.");
                return;
            }

            setStatus("success");
            setMessage(data.message || "Thank you. Your testimonial has been submitted for review.");
            setForm(initialForm);
        } catch {
            setStatus("error");
            setMessage("The testimonial service is unavailable right now.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#071126] lg:h-full lg:max-h-[660px] lg:grid-cols-[1.05fr_0.95fr]">
            <section className="flex min-h-0 flex-col border-b border-orange-100 bg-gradient-to-br from-orange-50 via-white to-violet-50 p-6 text-slate-950 dark:border-white/10 dark:from-orange-400/10 dark:via-slate-950 dark:to-violet-500/10 dark:text-white lg:border-b-0 lg:border-r lg:p-7">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-orange-600 dark:border-orange-300/20 dark:bg-orange-400/10 dark:text-orange-200">
                    <Quote className="h-4 w-4" />
                    Client Feedback
                </div>
                <h1 className="mt-5 text-3xl font-black tracking-tight lg:text-4xl">
                    Share your experience with Imadi Innovations.
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Write a short testimonial that explains what we helped with and what changed after working together.
                </p>

                <label htmlFor="testimonial-quote" className="mt-6 text-sm font-extrabold text-slate-950 dark:text-white">
                    Your Testimonial <span className="text-orange-500">*</span>
                </label>
                <textarea
                    id="testimonial-quote"
                    name="quote"
                    value={form.quote}
                    onChange={(event) => updateField("quote", event.target.value)}
                    className="mt-2 min-h-56 flex-1 resize-none rounded-2xl border border-orange-200 bg-white/82 p-4 text-sm font-semibold leading-7 text-slate-950 outline-none shadow-inner transition placeholder:text-slate-400 hover:border-orange-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/38 dark:focus:border-violet-300/60 dark:focus:bg-white/[0.08] dark:focus:ring-violet-400/10 lg:min-h-0"
                    placeholder="Example: Imadi Innovations helped us launch a reliable dashboard that saved our team hours every week..."
                    minLength={20}
                    maxLength={1200}
                    required
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>Tip: mention the result, speed, communication, or business impact.</span>
                    <span>{form.quote.length}/1200</span>
                </div>
            </section>

            <section className="flex min-h-0 flex-col p-6 lg:p-7">
                <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
                        Submit for Review
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">Your details</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Nothing publishes automatically. New submissions are saved in WordPress as pending testimonials.
                    </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Field label="Full Name" htmlFor="testimonial-name" required>
                        <input
                            id="testimonial-name"
                            name="name"
                            value={form.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            className="field-input"
                            placeholder="Sarah Ahmed"
                            maxLength={120}
                            required
                        />
                    </Field>

                    <Field label="Email" htmlFor="testimonial-email" required>
                        <input
                            id="testimonial-email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            className="field-input"
                            placeholder="you@company.com"
                            maxLength={160}
                            required
                        />
                    </Field>

                    <Field label="Company" htmlFor="testimonial-company">
                        <input
                            id="testimonial-company"
                            name="company"
                            value={form.company}
                            onChange={(event) => updateField("company", event.target.value)}
                            className="field-input"
                            placeholder="Company name"
                            maxLength={140}
                        />
                    </Field>

                    <Field label="Role" htmlFor="testimonial-role">
                        <input
                            id="testimonial-role"
                            name="role"
                            value={form.role}
                            onChange={(event) => updateField("role", event.target.value)}
                            className="field-input"
                            placeholder="Founder, CTO..."
                            maxLength={140}
                        />
                    </Field>
                </div>

                <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 dark:border-orange-300/15 dark:bg-orange-400/10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-extrabold text-slate-950 dark:text-white">Rating</p>
                            <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">Choose the score that fits your experience.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                    key={rating}
                                    type="button"
                                    onClick={() => updateField("rating", rating)}
                                    className={`inline-flex h-10 items-center gap-1.5 rounded-xl border px-3 text-sm font-black transition ${form.rating === rating
                                        ? "border-orange-300 bg-orange-400 text-[#160d02] shadow-[0_12px_25px_rgba(251,146,60,0.25)]"
                                        : "border-white bg-white text-slate-600 hover:border-orange-200 hover:text-orange-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300"
                                    }`}
                                    aria-pressed={form.rating === rating}
                                >
                                    {rating}
                                    <Star className="h-4 w-4 fill-current" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden" aria-hidden="true">
                    <label htmlFor="testimonial-website">Website</label>
                    <input
                        id="testimonial-website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(event) => updateField("website", event.target.value)}
                    />
                </div>

                <label className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-slate-700 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-slate-200">
                    <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(event) => updateField("consent", event.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600"
                        required
                    />
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                    <span>I allow Imadi Innovations to review and publish this testimonial with my name, role, company, and rating.</span>
                </label>

                {message && (
                    <div className={`mt-4 flex items-start gap-3 rounded-xl border p-3 text-sm font-semibold ${status === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-200"
                        : "border-red-200 bg-red-50 text-red-700 dark:border-red-300/20 dark:bg-red-400/10 dark:text-red-200"
                    }`}>
                        {status === "success" && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
                        <span>{message}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-400 px-6 py-3.5 text-sm font-extrabold text-[#160d02] shadow-[0_16px_35px_rgba(251,146,60,0.28)] transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {status === "submitting" ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting
                        </>
                    ) : (
                        <>
                            Submit Testimonial
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </section>
        </form>
    );
}

function Field({
    label,
    htmlFor,
    required,
    children,
}: {
    label: string;
    htmlFor: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label htmlFor={htmlFor} className="text-sm font-extrabold text-slate-950 dark:text-white">
                {label}
                {required && <span className="text-orange-500"> *</span>}
            </label>
            <div className="mt-2">{children}</div>
        </div>
    );
}
