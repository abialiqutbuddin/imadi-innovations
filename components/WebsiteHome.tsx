"use client";

import Image from "next/image";
import type { ElementType, RefObject } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
    ArrowRight,
    Bot,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Cloud,
    Code2,
    Gauge,
    Globe2,
    Layers3,
    Link2,
    Mail,
    MapPin,
    Menu,
    PanelTop,
    Play,
    Quote,
    Rocket,
    Search,
    Send,
    ShieldCheck,
    Sparkles,
    Star,
    Timer,
    Users,
    Workflow,
    X,
    Zap,
} from "lucide-react";
import { useRef, useState } from "react";

import SmoothPageScroller from "@/components/SmoothPageScroller";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Project, SocialProofContent, Testimonial } from "@/types";

interface WebsiteHomeProps {
    projects?: Project[];
    socialProof?: SocialProofContent;
    testimonials?: Testimonial[];
}

const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#solutions" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
];

const services = [
    {
        icon: Bot,
        tone: "violet",
        title: "AI-Powered Platforms",
        desc: "Intelligent systems that learn, predict, and automate complex workflows.",
    },
    {
        icon: PanelTop,
        tone: "blue",
        title: "Internal Tools & Dashboards",
        desc: "Custom tools that simplify operations and boost team productivity.",
    },
    {
        icon: Cloud,
        tone: "green",
        title: "SaaS Products",
        desc: "Scalable, secure, and user-friendly products built for growth.",
    },
    {
        icon: Link2,
        tone: "orange",
        title: "Integrations & Automation",
        desc: "Connect apps and automate workflows end-to-end.",
    },
];

const reasons = [
    {
        icon: Rocket,
        title: "Built for real operations",
        desc: "Intelligent systems your team can actually use, not features that get ignored.",
        tone: "violet",
    },
    {
        icon: Timer,
        title: "Fast execution",
        desc: "Weekly demos, predictable sprints, and clear communication.",
        tone: "orange",
    },
    {
        icon: Users,
        title: "Full-stack, remote team",
        desc: "Scalable engineering, QA, and PMs working together as one unit.",
        tone: "green",
    },
    {
        icon: ShieldCheck,
        title: "Secure & scalable",
        desc: "Security and performance are built in from day one, not added later.",
        tone: "blue",
    },
];

const processSteps = [
    {
        icon: Search,
        title: "Discover",
        desc: "We understand your goals, challenges, and users.",
        tone: "violet",
    },
    {
        icon: Layers3,
        title: "Design",
        desc: "We plan the solution, architecture, and UX.",
        tone: "blue",
    },
    {
        icon: Code2,
        title: "Build",
        desc: "We build, test, and iterate in short cycles.",
        tone: "green",
    },
    {
        icon: Rocket,
        title: "Deliver",
        desc: "We launch, monitor, and continuously improve.",
        tone: "orange",
    },
];

const fallbackSocialProof: SocialProofContent = {
    eyebrow: "Our Impact",
    heading: "Trusted by teams around the world.",
    stats: [
        { value: "50+", label: "Projects Delivered" },
        { value: "6+", label: "Countries Served" },
        { value: "99.9%", label: "Uptime Delivered" },
        { value: "40%", label: "Avg. Cost Reduction" },
    ],
    industries: ["PayLite", "eClinicAssist", "Restro", "Office Outlook", "Figma"],
};

const fallbackTestimonials: Testimonial[] = [
    {
        name: "Sood Khan",
        role: "CTO",
        company: "PayLite",
        quote: "Imadi Innovations built a system that completely transformed how we operate. The team is reliable, fast, and truly understands our needs.",
        rating: 5,
    },
    {
        name: "Dr. Ayesha Malik",
        role: "Operations Head",
        company: "eClinicAssist",
        quote: "Their AI automation solution saved us hundreds of hours every month. Excellent communication and top-notch engineering.",
        rating: 5,
    },
    {
        name: "Usman Tariq",
        role: "Founder",
        company: "Restro",
        quote: "Professional, proactive, and always deliver beyond expectations. Highly recommended.",
        rating: 5,
    },
];

const toneStyles: Record<string, string> = {
    violet: "bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-400/20",
    blue: "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-400/20",
    green: "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/20",
    orange: "bg-orange-100 text-orange-500 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-400/20",
};

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.58, ease: "easeOut" },
    },
};

const staggerGroup: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.08,
        },
    },
};

function decodeText(value = "") {
    return value
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .trim();
}

function splitTechStack(stack = "") {
    return stack
        .split(",")
        .map((item) => decodeText(item).trim())
        .filter(Boolean);
}

function SectionHeading({
    eyebrow,
    title,
    highlight,
    suffix,
    description,
}: {
    eyebrow: string;
    title: string;
    highlight?: string;
    suffix?: string;
    description?: string;
}) {
    return (
        <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
        >
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
                {eyebrow}
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-950 dark:text-white md:text-4xl">
                {title}{" "}
                {highlight && (
                    <span className="text-violet-600 dark:text-violet-300">
                        {highlight}
                    </span>
                )}
                {suffix && ` ${suffix}`}
            </h2>
            {description && (
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                    {description}
                </p>
            )}
        </motion.div>
    );
}

function IconBadge({
    icon: Icon,
    tone = "orange",
    className,
}: {
    icon: ElementType;
    tone?: string;
    className?: string;
}) {
    return (
        <div className={cx("flex h-14 w-14 items-center justify-center rounded-2xl border", toneStyles[tone], className)}>
            <Icon className="h-7 w-7" />
        </div>
    );
}

function SiteHeader() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020919]/90 backdrop-blur-2xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                <a href="#home" className="flex items-center gap-3" aria-label="Imadi Innovations home">
                    <span className="relative flex h-11 w-11 overflow-hidden rounded-full border border-white/15 bg-white/10">
                        <Image src="/logo.jpg" alt="Imadi Innovations" width={44} height={44} className="h-full w-full object-cover" priority />
                    </span>
                    <span className="leading-none">
                        <span className="block text-base font-extrabold tracking-wide text-orange-400">IMADI</span>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white">Innovations</span>
                    </span>
                </a>

                <nav className="hidden items-center gap-7 lg:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-bold text-white/82 transition hover:text-orange-400"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <ThemeToggle />
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-md bg-orange-400 px-5 py-3 text-sm font-extrabold text-[#160d02] shadow-[0_14px_36px_rgba(251,146,60,0.32)] transition hover:-translate-y-0.5 hover:bg-orange-300"
                    >
                        Book a Discovery Call
                    </a>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white lg:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {open && (
                <div className="border-t border-white/10 bg-[#020919] px-5 pb-5 lg:hidden">
                    <nav className="mx-auto grid max-w-7xl gap-1 py-4">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="rounded-md px-3 py-3 text-sm font-bold text-white/85 hover:bg-white/5 hover:text-orange-400"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <div className="mx-auto flex max-w-7xl items-center gap-3">
                        <ThemeToggle />
                        <a
                            href="#contact"
                            onClick={() => setOpen(false)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-orange-400 px-5 py-3 text-sm font-extrabold text-[#160d02]"
                        >
                            Book a Discovery Call
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}

function HeroDashboard() {
    const workflows = ["Order Processing", "Invoice Automation", "Customer Onboarding", "Data Sync"];

    return (
        <div className="relative mx-auto w-full max-w-[620px] lg:mx-0">
            <div className="absolute -left-10 top-48 z-20 hidden rounded-xl border border-white/15 bg-[#0b1635]/90 px-4 py-3 shadow-2xl backdrop-blur md:block">
                <div className="flex items-center gap-3">
                    <IconBadge icon={Cloud} tone="violet" className="h-9 w-9 rounded-lg" />
                    <div>
                        <p className="text-xs font-extrabold text-white">Live Data Sync</p>
                        <p className="text-[10px] text-white/60">All systems connected</p>
                    </div>
                </div>
            </div>
            <div className="absolute -right-8 top-4 z-20 hidden rounded-xl border border-white/15 bg-[#181343]/90 px-4 py-3 shadow-2xl backdrop-blur md:block">
                <div className="flex items-center gap-3">
                    <IconBadge icon={Bot} tone="violet" className="h-9 w-9 rounded-lg" />
                    <div>
                        <p className="text-xs font-extrabold text-white">AI Predictions</p>
                        <p className="text-[10px] text-white/60">High accuracy</p>
                    </div>
                </div>
            </div>
            <div className="absolute -right-2 bottom-6 z-20 hidden rounded-xl border border-orange-300/20 bg-[#2a1d1b]/90 px-4 py-3 shadow-2xl backdrop-blur md:block">
                <div className="flex items-center gap-3">
                    <IconBadge icon={Zap} tone="orange" className="h-9 w-9 rounded-lg" />
                    <div>
                        <p className="text-xs font-extrabold text-white">Automated Workflow</p>
                        <p className="text-[10px] text-white/60">72 tasks automated</p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 rounded-2xl border border-white/14 bg-[#080f2b]/82 p-4 shadow-[0_34px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl">
                <div className="flex min-h-[360px] gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4">
                    <div className="hidden w-12 shrink-0 flex-col items-center gap-5 rounded-lg border border-white/10 bg-white/[0.04] py-4 sm:flex">
                        <Image src="/logo.jpg" alt="" width={26} height={26} className="rounded-full" />
                        {[Workflow, Gauge, Users, ShieldCheck, Cloud, Code2].map((Icon, index) => (
                            <Icon key={index} className="h-4 w-4 text-white/55" />
                        ))}
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-extrabold text-white">Overview</h3>
                            <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-200">
                                Healthy
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                            {[
                                ["$2.45M", "Total Revenue", "+18.6%"],
                                ["128", "Automations", "+24.5%"],
                                ["1,248h", "Time Saved", "+32.1%"],
                                ["99.9%", "System Health", "Excellent"],
                            ].map(([value, label, delta]) => (
                                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                                    <p className="text-[10px] text-white/50">{label}</p>
                                    <p className="mt-2 text-xl font-extrabold text-white">{value}</p>
                                    <p className="mt-1 text-[10px] text-emerald-300">{delta}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
                            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                                <p className="text-xs font-extrabold text-white">AI Insights</p>
                                <p className="mt-3 max-w-[220px] text-[11px] leading-5 text-white/65">
                                    Demand is predicted to increase 24% in the next 30 days.
                                </p>
                                <div className="mt-5 h-24 overflow-hidden rounded-md bg-gradient-to-t from-violet-500/25 to-transparent">
                                    <svg viewBox="0 0 300 110" className="h-full w-full" role="img" aria-label="Growth chart">
                                        <path
                                            d="M0 92 C28 44 48 96 78 64 C110 30 128 76 158 46 C190 12 208 54 232 22 C254 -4 270 34 300 6"
                                            fill="none"
                                            stroke="#8b5cf6"
                                            strokeWidth="5"
                                        />
                                        <path
                                            d="M0 92 C28 44 48 96 78 64 C110 30 128 76 158 46 C190 12 208 54 232 22 C254 -4 270 34 300 6 L300 110 L0 110 Z"
                                            fill="url(#chartFill)"
                                        />
                                        <defs>
                                            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.36" />
                                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                                <p className="text-xs font-extrabold text-white">Active Workflows</p>
                                <div className="mt-4 space-y-4">
                                    {workflows.map((workflow, index) => (
                                        <div key={workflow} className="flex items-center justify-between gap-3">
                                            <span className="text-[11px] font-semibold text-white/82">{workflow}</span>
                                            <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-300">
                                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                                {index === 3 ? "Syncing" : "Running"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HeroSection({ socialProof }: { socialProof: SocialProofContent }) {
    return (
        <section id="home" className="relative overflow-hidden bg-[#020919] pt-20 text-white">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(2,9,25,0.98)_0%,rgba(4,12,35,0.92)_42%,rgba(28,14,76,0.72)_70%,rgba(255,145,35,0.12)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(124,58,237,0.35),transparent_30%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,80px_80px,80px_80px]" />

            <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-32 lg:pt-20">
                <motion.div
                    className="flex flex-col justify-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/86 backdrop-blur">
                        <Sparkles className="h-4 w-4 text-violet-300" />
                        AI-powered software solutions
                    </div>

                    <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-normal sm:text-5xl md:text-[64px]">
                        We build intelligent software that drives{" "}
                        <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-orange-300 bg-clip-text text-transparent">
                            real business outcomes.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/78 md:text-lg">
                        We design, build, and scale AI-powered systems that automate workflows, connect data, and help teams move faster.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-400 px-6 py-4 text-sm font-extrabold text-[#160d02] transition hover:-translate-y-0.5 hover:bg-orange-300"
                        >
                            Start a Project
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                            href="mailto:abialigadi@gmail.com"
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/18 bg-white/[0.04] px-6 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.09]"
                        >
                            <CalendarDays className="h-4 w-4" />
                            Book a Discovery Call
                        </a>
                    </div>

                    <div className="mt-10">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-white/50">
                            Trusted by innovative teams
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-white/62">
                            {socialProof.industries.slice(0, 5).map((industry) => (
                                <span key={industry} className="inline-flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-white/45" />
                                    {industry}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
                >
                    <HeroDashboard />
                </motion.div>
            </div>
        </section>
    );
}

function StatStrip({ stats }: { stats: SocialProofContent["stats"] }) {
    const icons = [BriefcaseBusiness, Globe2, ShieldCheck, Gauge];

    return (
        <section className="relative -mt-10 px-5">
            <motion.div
                className="mx-auto grid max-w-6xl gap-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.11)] md:grid-cols-4 dark:border-white/10 dark:bg-slate-900"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
            >
                {stats.slice(0, 4).map((stat, index) => {
                    const Icon = icons[index % icons.length];

                    return (
                        <div key={stat.label} className="flex items-center gap-5 border-b border-slate-200 px-7 py-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 dark:border-white/10">
                            <Icon className={cx("h-10 w-10", index === 0 && "text-violet-600", index === 1 && "text-blue-600", index === 2 && "text-emerald-600", index === 3 && "text-orange-500")} />
                            <div>
                                <p className="text-2xl font-black text-slate-950 dark:text-white">{stat.value}</p>
                                <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </section>
    );
}

function ServicesSection() {
    return (
        <section id="services" className="bg-white px-5 py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="What We Build"
                    title="Software solutions that solve"
                    highlight="real business problems."
                    description="From AI automation to full-scale platforms, we build systems that are secure, scalable, and designed for impact."
                />

                <motion.div
                    className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-4"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                >
                    {services.map((service) => (
                        <motion.article key={service.title} variants={fadeUp} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.045)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-white/[0.04]">
                            <IconBadge icon={service.icon} tone={service.tone} />
                            <h3 className="mt-7 text-lg font-extrabold text-slate-950 dark:text-white">{service.title}</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.desc}</p>
                            <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-violet-600 dark:text-violet-300">
                                Learn more
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function WhySection() {
    return (
        <section id="solutions" className="bg-white px-5 pb-24 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="Why Businesses Work With Us" title="We focus on what" highlight="matters most." />

                <motion.div
                    className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                >
                    {reasons.map((reason, index) => (
                        <motion.article key={reason.title} variants={fadeUp} className="relative pr-6">
                            <IconBadge icon={reason.icon} tone={reason.tone} className="h-11 w-11 rounded-xl" />
                            <h3 className="mt-5 text-base font-extrabold text-slate-950 dark:text-white">{reason.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{reason.desc}</p>
                            {index < reasons.length - 1 && <div className="absolute right-0 top-14 hidden h-20 w-px bg-slate-200 lg:block dark:bg-white/10" />}
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function CaseStudySection() {
    return (
        <section className="bg-white px-5 pb-24 dark:bg-slate-950">
            <motion.div
                className="mx-auto grid max-w-6xl overflow-hidden rounded-xl bg-[#0d0b35] text-white shadow-[0_28px_80px_rgba(15,23,42,0.22)] lg:grid-cols-[0.9fr_1.1fr]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
            >
                <div className="p-8 md:p-10">
                    <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-orange-300">Case Study</p>
                    <h2 className="max-w-md text-3xl font-black leading-tight md:text-4xl">
                        Reduced manual work by <span className="text-violet-400">70%</span> for a fintech client.
                    </h2>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-white/72">
                        We built an AI-powered automation system that streamlined transaction monitoring, reporting, and compliance.
                    </p>
                    <a href="#work" className="mt-8 inline-flex items-center gap-2 rounded-md bg-violet-500 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-violet-400">
                        View Case Study
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="p-4 md:p-6">
                    <div className="h-full rounded-lg border border-white/10 bg-white/[0.07] p-5">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                            <p className="text-sm font-extrabold">Transactions</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {[
                                ["$1.24M", "Total Volume"],
                                ["+24.6%", "Growth"],
                                ["1,246", "Transactions"],
                            ].map(([value, label]) => (
                                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                                    <p className="text-xl font-black">{value}</p>
                                    <p className="mt-1 text-[10px] text-white/55">{label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_0.86fr]">
                            <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                                <div className="flex items-center gap-5">
                                    <div className="grid h-24 w-24 place-items-center rounded-full bg-[conic-gradient(#8b5cf6_0_70%,rgba(255,255,255,0.12)_70%_100%)]">
                                        <div className="h-14 w-14 rounded-full bg-[#14113d]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/55">Automation Impact</p>
                                        <p className="mt-2 text-3xl font-black">+70%</p>
                                        <p className="mt-1 text-[11px] text-white/55">Reduction in manual work</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
                                <p className="text-xs font-extrabold">Top Categories</p>
                                <div className="mt-4 space-y-3">
                                    {[
                                        ["Payments", "45%", "bg-violet-400"],
                                        ["Transfers", "29%", "bg-orange-300"],
                                        ["Refunds", "18%", "bg-blue-300"],
                                        ["Others", "12%", "bg-emerald-300"],
                                    ].map(([name, value, color]) => (
                                        <div key={name} className="flex items-center justify-between text-[11px] text-white/70">
                                            <span className="inline-flex items-center gap-2"><span className={cx("h-2 w-2 rounded-full", color)} />{name}</span>
                                            <span>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] ?? null);
    const detailRef = useRef<HTMLDivElement | null>(null);
    const visibleProjects = projects;
    const selectedProjectKey = selectedProject ? selectedProject._id ?? selectedProject.title : null;

    const handleSelectProject = (project: Project) => {
        setSelectedProject(project);
        window.setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    };

    if (!visibleProjects.length) {
        return null;
    }

    return (
        <section id="work" className="bg-slate-50 px-5 py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="Selected Work"
                    title="Practical systems shipped for"
                    highlight="real teams."
                    description="A sample of dashboards, platforms, and mobile products built around live operations."
                />

                <motion.div
                    className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                >
                    {visibleProjects.map((project, index) => {
                        const imageSrc = project.desktopImg || project.mobileImg;
                        const title = decodeText(project.title);
                        const headline = decodeText(project.headline || project.description);
                        const description = decodeText(project.description);
                        const techItems = splitTechStack(project.techStack);
                        const previewFeatures = project.features?.slice(0, 2) ?? [];
                        const projectKey = project._id ?? project.title;
                        const isSelected = selectedProjectKey === projectKey;

                        return (
                            <motion.article
                                key={`${projectKey}-${index}`}
                                variants={fadeUp}
                                className={cx(
                                    "group flex overflow-hidden rounded-xl border bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,23,42,0.1)] dark:bg-white/[0.04]",
                                    isSelected
                                        ? "border-violet-300 ring-2 ring-violet-200 dark:border-violet-300/40 dark:ring-violet-400/15"
                                        : "border-slate-200 dark:border-white/10"
                                )}
                            >
                                <div className="flex w-full flex-col">
                                    <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800">
                                        {imageSrc ? (
                                            <Image
                                                src={imageSrc}
                                                alt={`${title} project preview`}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <PanelTop className="h-12 w-12 text-slate-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="mb-4 flex items-center justify-between gap-3">
                                            <span className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                                                {project.type}
                                            </span>
                                            {techItems.length > 0 && (
                                                <span className="text-right text-[11px] font-semibold text-slate-400">
                                                    {techItems.slice(0, 2).join(", ")}
                                                    {techItems.length > 2 ? " +" : ""}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-extrabold leading-tight text-slate-950 dark:text-white">{title}</h3>
                                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                            {description || headline}
                                        </p>
                                        {previewFeatures.length > 0 && (
                                            <div className="mt-5 grid gap-2">
                                                {previewFeatures.map((feature) => (
                                                    <div key={`${title}-${feature.title}`} className="flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                                        <span>{decodeText(feature.title)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleSelectProject(project)}
                                            className={cx(
                                                "mt-6 inline-flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition",
                                                isSelected
                                                    ? "bg-violet-600 text-white shadow-[0_14px_30px_rgba(124,58,237,0.24)]"
                                                    : "border border-slate-200 text-slate-950 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-white/10 dark:text-white dark:hover:border-violet-300/30 dark:hover:bg-violet-500/10 dark:hover:text-violet-200"
                                            )}
                                        >
                                            {isSelected ? "Selected" : "View project"}
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>

                <AnimatePresence mode="wait">
                    {selectedProject && (
                        <ProjectDetailPanel key={selectedProject._id ?? selectedProject.title} project={selectedProject} detailRef={detailRef} />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

function ProjectDetailPanel({ project, detailRef }: { project: Project; detailRef: RefObject<HTMLDivElement | null> }) {
    const title = decodeText(project.title);
    const headline = decodeText(project.headline);
    const description = decodeText(project.description);
    const techItems = splitTechStack(project.techStack);
    const hasVisuals = Boolean(project.desktopImg || project.mobileImg);

    return (
        <motion.div
            ref={detailRef}
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-slate-950"
        >
            <div className="border-b border-slate-200 bg-slate-950 px-6 py-4 text-white dark:border-white/10 md:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-orange-300">Selected case study</p>
                        <h3 className="mt-2 text-2xl font-black md:text-3xl">{title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-[11px] font-bold text-violet-100">
                            {project.type}
                        </span>
                        {techItems.slice(0, 3).map((tech) => (
                            <span key={`${title}-${tech}-top`} className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white/80">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
                <div className="bg-slate-100 p-4 dark:bg-slate-900">
                        {hasVisuals ? (
                            <div className="grid gap-4">
                                {project.desktopImg && (
                                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-800">
                                        <div className="relative aspect-[16/10]">
                                            <Image
                                                src={project.desktopImg}
                                                alt={`${title} desktop screen`}
                                                fill
                                                sizes="(min-width: 1024px) 52vw, 100vw"
                                                className="object-cover object-top"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                )}
                                {project.mobileImg && (
                                    <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-[1.5rem] border-[6px] border-slate-800 bg-slate-950 shadow-2xl">
                                        <div className="relative aspect-[9/19]">
                                            <Image
                                                src={project.mobileImg}
                                                alt={`${title} mobile screen`}
                                                fill
                                                sizes="220px"
                                                className="object-cover object-top"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="grid min-h-[420px] place-items-center rounded-lg border border-dashed border-slate-300 bg-white text-slate-400 dark:border-white/10 dark:bg-white/[0.03]">
                                <PanelTop className="h-14 w-14" />
                            </div>
                        )}
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
                                {project.type}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
                                Project details
                            </span>
                        </div>

                        <h3 id="project-detail-title" className="mt-5 text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-4xl">
                            {title}
                        </h3>
                        {headline && (
                            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700 dark:text-slate-200">
                                {headline}
                            </p>
                        )}
                        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {description}
                        </p>

                        {project.features?.length > 0 && (
                            <div className="mt-8">
                                <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">What we built</h4>
                                <div className="mt-4 grid gap-3">
                                    {project.features.map((feature) => (
                                        <div key={`${title}-${feature.title}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                                                <div>
                                                    <p className="font-extrabold text-slate-950 dark:text-white">{decodeText(feature.title)}</p>
                                                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{decodeText(feature.desc)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {techItems.length > 0 && (
                            <div className="mt-8">
                                <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">Tech stack</h4>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {techItems.map((tech) => (
                                        <span key={`${title}-${tech}`} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </motion.div>
    );
}

function ProcessSection() {
    return (
        <section id="process" className="bg-white px-5 py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="Our Process" title="A simple, transparent process from" highlight="idea to impact." />

                <motion.div
                    className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                >
                    {processSteps.map((step, index) => (
                        <motion.article key={step.title} variants={fadeUp} className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.045)] dark:border-white/10 dark:bg-white/[0.04]">
                            <IconBadge icon={step.icon} tone={step.tone} className="h-11 w-11 rounded-xl" />
                            <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">{step.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.desc}</p>
                            {index < processSteps.length - 1 && (
                                <ChevronRight className="absolute -right-6 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block" />
                            )}
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <section className="bg-slate-50 px-5 py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="What Our Clients Say" title="Trusted by teams" highlight="around the world." />

                <motion.div
                    className="mt-14 grid gap-7 md:grid-cols-3"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                >
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <motion.article key={testimonial.id ?? `${testimonial.name}-${index}`} variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.04]">
                            <Quote className="h-9 w-9 text-violet-300" />
                            <p className="mt-5 line-clamp-4 text-sm leading-7 text-slate-700 dark:text-slate-200">&quot;{testimonial.quote}&quot;</p>
                            <div className="mt-7 flex text-orange-400">
                                {Array.from({ length: testimonial.rating || 5 }).map((_, starIndex) => (
                                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <div className="mt-6 flex items-center gap-3">
                                {testimonial.image ? (
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        width={48}
                                        height={48}
                                        className="h-12 w-12 rounded-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-base font-black text-violet-600 dark:bg-white/10 dark:text-violet-300">
                                        {testimonial.name.slice(0, 1)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-black text-slate-950 dark:text-white">{testimonial.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <section id="about" className="bg-white px-5 py-24 dark:bg-slate-950">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                    <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">About Us</p>
                    <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-4xl">
                        Pakistan-based builders serving clients worldwide.
                    </h2>
                    <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                        Founded in 2024, Imadi Innovations combines strong engineering with deep operational understanding. We design and build practical systems for teams that need speed, clarity, and reliability.
                    </p>
                </div>

                <motion.div
                    className="grid gap-4 sm:grid-cols-3"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.22 }}
                >
                    {[
                        ["Remote-first", "A focused team that works clearly across time zones."],
                        ["Operator mindset", "We map the workflow before we design the interface."],
                        ["Long-term support", "Launch, monitoring, iteration, and maintenance."],
                    ].map(([title, desc]) => (
                        <motion.article key={title} variants={fadeUp} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.04]">
                            <h3 className="font-black text-slate-950 dark:text-white">{title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{desc}</p>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function CTAFooter() {
    return (
        <footer id="contact" className="bg-[#020919] text-white">
            <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                <div className="grid items-center gap-8 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 p-8 md:grid-cols-[auto_1fr_auto] md:p-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#32148a] text-white shadow-xl">
                        <Send className="h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black">Ready to build something amazing?</h2>
                        <p className="mt-2 text-sm font-medium text-white/82">Let&apos;s turn your ideas into intelligent software solutions.</p>
                    </div>
                    <a href="mailto:abialigadi@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-4 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5">
                        Book a Discovery Call
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <Image src="/logo.jpg" alt="Imadi Innovations" width={44} height={44} className="rounded-full" />
                            <div>
                                <p className="font-black text-orange-400">IMADI</p>
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white">Innovations</p>
                            </div>
                        </div>
                        <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
                            We design, build, and scale AI-powered software that drives real business results.
                        </p>
                    </div>

                    <FooterColumn title="Services" links={["AI-Powered Platforms", "Internal Tools", "SaaS Products", "Integrations & Automation"]} />
                    <FooterColumn title="Company" links={["About Us", "Our Process", "Careers", "Blog"]} />
                    <div>
                        <h3 className="font-black">Contact</h3>
                        <div className="mt-5 space-y-3 text-sm text-white/62">
                            <a href="mailto:abialigadi@gmail.com" className="flex items-center gap-2 hover:text-orange-300">
                                <Mail className="h-4 w-4" />
                                hello@imadi-innovations.com
                            </a>
                            <a href="https://wa.me/923330365252" className="flex items-center gap-2 hover:text-orange-300">
                                <Play className="h-4 w-4" />
                                +92 333 036 5252
                            </a>
                            <p className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Karachi, Pakistan
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/46 md:flex-row">
                    <p>© 2024 Imadi Innovations. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
    return (
        <div>
            <h3 className="font-black">{title}</h3>
            <div className="mt-5 grid gap-3 text-sm text-white/62">
                {links.map((link) => (
                    <a key={link} href="#contact" className="hover:text-orange-300">
                        {link}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function WebsiteHome({
    projects = [],
    socialProof,
    testimonials = [],
}: WebsiteHomeProps) {
    const proof = {
        ...fallbackSocialProof,
        ...socialProof,
        stats: socialProof?.stats?.length ? socialProof.stats : fallbackSocialProof.stats,
        industries: socialProof?.industries?.length ? socialProof.industries : fallbackSocialProof.industries,
    };
    const quotes = testimonials.length ? testimonials : fallbackTestimonials;

    return (
        <main className="min-h-screen overflow-x-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
            <SmoothPageScroller />
            <SiteHeader />
            <HeroSection socialProof={proof} />
            <StatStrip stats={proof.stats} />
            <ServicesSection />
            <WhySection />
            <CaseStudySection />
            <ProjectsSection projects={projects} />
            <ProcessSection />
            <TestimonialsSection testimonials={quotes} />
            <AboutSection />
            <CTAFooter />
        </main>
    );
}
