"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
    CheckCircle2,
    ChevronRight,
    Clock,
    Loader2,
    Mail,
    Phone,
    Send,
} from "lucide-react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const WORDPRESS_API_URL =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://wordpress.imadi-innovations.com";

function wordpressEndpoint(path: string) {
    return `${WORDPRESS_API_URL.replace(/\/$/, "")}/wp-json/imadi/v1/${path}`;
}

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function ContactField({
    label,
    name,
    placeholder,
    type = "text",
    required,
    className,
}: {
    label: string;
    name: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    className?: string;
}) {
    return (
        <label className={cx("text-sm font-bold text-slate-950 dark:text-white", className)}>
            {label}
            {required && <span className="text-orange-500"> *</span>}
            <input name={name} type={type} placeholder={placeholder} required={required} className="field-input mt-2" />
        </label>
    );
}

export default function ContactSection({
    id = "contact",
    className,
}: {
    id?: string;
    className?: string;
}) {
    const [contactStatus, setContactStatus] = useState<SubmitStatus>("idle");
    const [contactMessage, setContactMessage] = useState("");

    const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formElement = event.currentTarget;
        const formData = new FormData(formElement);
        const fullName = String(formData.get("fullName") || "");
        const email = String(formData.get("email") || "");
        const company = String(formData.get("company") || "");
        const projectType = String(formData.get("projectType") || "");
        const budget = String(formData.get("budget") || "");
        const message = String(formData.get("message") || "");
        const website = String(formData.get("website") || "");

        setContactStatus("submitting");
        setContactMessage("");

        try {
            const response = await fetch(wordpressEndpoint("contact-submissions"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    email,
                    company,
                    projectType,
                    budget,
                    message,
                    website,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setContactStatus("error");
                setContactMessage(data.message || "We could not send your message right now.");
                return;
            }

            setContactStatus("success");
            setContactMessage(data.message || "Thank you. Your message has been sent.");
            formElement.reset();
        } catch {
            setContactStatus("error");
            setContactMessage("The contact service is unavailable right now.");
        }
    };

    return (
        <section id={id} className={cx("relative scroll-mt-20 overflow-hidden border-t border-slate-200 bg-white px-5 py-20 dark:border-white/10 dark:bg-slate-950", className)}>
            <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-orange-500">Get in touch</p>
                    <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 dark:text-white md:text-4xl">
                        Let&apos;s Talk About Your Project
                    </h2>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Tell us what you want to manage, automate, or improve. We&apos;ll help turn it into a clear software plan.
                    </p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                        <div className="space-y-4">
                            {[
                                { icon: Mail, title: "Email Us", text: "hello@imadi-innovations.com", href: "mailto:hello@imadi-innovations.com" },
                                { icon: Phone, title: "Call Us", text: "+92 333 036 5252", href: "https://wa.me/923330365252" },
                                { icon: Clock, title: "Working Hours", text: "Mon - Fri\n9:00 AM - 6:00 PM PKT" },
                            ].map((item) => {
                                const Icon = item.icon;
                                const content = (
                                    <>
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-400/10 dark:text-orange-300">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <span>
                                            <span className="block text-sm font-extrabold text-slate-950 dark:text-white">{item.title}</span>
                                            <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">
                                                {item.text.split("\n").map((line) => (
                                                    <span key={line} className="block">
                                                        {line}
                                                    </span>
                                                ))}
                                            </span>
                                        </span>
                                    </>
                                );

                                return item.href ? (
                                    <a key={item.title} href={item.href} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-orange-400/10">
                                        {content}
                                    </a>
                                ) : (
                                    <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                                        {content}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04]">
                            <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">What happens next?</h3>
                            <div className="mt-5 space-y-4">
                                {[
                                    ["1", "We review your requirements", "Our team will analyze your needs and project scope."],
                                    ["2", "We'll get back to you", "Expect a response within 24 hours to discuss details."],
                                    ["3", "Proposal & next steps", "You'll receive a tailored proposal and clear roadmap."],
                                ].map(([step, title, desc]) => (
                                    <div key={step} className="flex gap-3">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-orange-600 dark:bg-orange-400/15 dark:text-orange-200">
                                            {step}
                                        </span>
                                        <span>
                                            <span className="block text-sm font-extrabold text-slate-950 dark:text-white">{title}</span>
                                            <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{desc}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleContactSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-white/[0.04] md:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white">Send Us a Message</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Fill out the form below and we&apos;ll get back to you shortly.</p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                        <ContactField label="Full Name" name="fullName" placeholder="Your full name" required className="lg:col-span-3" />
                        <ContactField label="Email Address" name="email" type="email" placeholder="you@example.com" required className="lg:col-span-3" />
                        <ContactField label="Company Name" name="company" placeholder="Your company" className="lg:col-span-2" />
                        <label className="text-sm font-bold text-slate-950 dark:text-white lg:col-span-2">
                            Project Type
                            <span className="relative mt-2 block">
                                <select name="projectType" className="field-input appearance-none pr-12">
                                    <option value="">Select project type</option>
                                    <option>Mobile App</option>
                                    <option>Web App / Portal</option>
                                    <option>Desktop App</option>
                                    <option>Dashboard / Admin Panel</option>
                                    <option>AI Integration</option>
                                    <option>Automation / Integration</option>
                                    <option>Complete Business System</option>
                                </select>
                                <ChevronRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-500 dark:text-slate-300" />
                            </span>
                        </label>
                        <label className="text-sm font-bold text-slate-950 dark:text-white lg:col-span-2">
                            Budget Range
                            <span className="relative mt-2 block">
                                <select name="budget" className="field-input appearance-none pr-12">
                                    <option value="">Select budget range</option>
                                    <option>Under $2,500</option>
                                    <option>$2,500 - $5,000</option>
                                    <option>$5,000 - $10,000</option>
                                    <option>$10,000+</option>
                                </select>
                                <ChevronRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-500 dark:text-slate-300" />
                            </span>
                        </label>
                        <label className="text-sm font-bold text-slate-950 dark:text-white md:col-span-2 lg:col-span-6">
                            Message <span className="text-orange-500">*</span>
                            <textarea name="message" required minLength={10} maxLength={2000} className="field-input mt-2 min-h-32 resize-y" placeholder="Tell us about your project, goals, and any specific requirements..." />
                        </label>
                    </div>

                    <div className="hidden" aria-hidden="true">
                        <label htmlFor={`${id}-website`}>Website</label>
                        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    {contactMessage && (
                        <div className={cx(
                            "mt-5 flex items-start gap-3 rounded-xl border p-3 text-sm font-semibold",
                            contactStatus === "success"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-400/10 dark:text-emerald-200"
                                : "border-red-200 bg-red-50 text-red-700 dark:border-red-300/20 dark:bg-red-400/10 dark:text-red-200"
                        )}>
                            {contactStatus === "success" && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
                            <span>{contactMessage}</span>
                        </div>
                    )}

                    <button type="submit" disabled={contactStatus === "submitting"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-4 text-sm font-extrabold text-white shadow-[0_16px_35px_rgba(249,115,22,0.25)] transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70">
                        {contactStatus === "submitting" ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <Send className="h-4 w-4" />
                            </>
                        )}
                    </button>
                    <p className="mt-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                        We usually reply within 24 hours.
                    </p>
                </form>
            </div>
        </section>
    );
}
