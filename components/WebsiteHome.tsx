"use client";

import Image from "next/image";
import type { ElementType } from "react";
import { motion, type Variants } from "framer-motion";
import {
    ArrowRight,
    BriefcaseBusiness,
    CheckCircle2,
    Code2,
    Gauge,
    Globe2,
    Layers3,
    Link2,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    PanelTop,
    Play,
    Quote,
    Rocket,
    Search,
    Send,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Star,
    Timer,
    Users,
    Workflow,
    X,
    Zap,
} from "lucide-react";
import { useState } from "react";

import ContactSection from "@/components/ContactSection";
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
    { label: "Products", href: "/tijarat" },
    { label: "Services", href: "#services" },
    { label: "Problems", href: "#problems" },
    { label: "Work", href: "/projects" },
    { label: "Process", href: "#process" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
];

const services = [
    {
        icon: Smartphone,
        tone: "violet",
        title: "Mobile Apps",
        desc: "Android and iOS apps for customers, staff, delivery teams, field teams, and internal operations.",
    },
    {
        icon: PanelTop,
        tone: "blue",
        title: "Web Apps",
        desc: "Dashboards, portals, admin panels, booking systems, CRMs, and reporting platforms.",
    },
    {
        icon: Code2,
        tone: "green",
        title: "Desktop Apps",
        desc: "Windows software for billing, inventory, printing, offline workflows, shops, and offices.",
    },
    {
        icon: Sparkles,
        tone: "violet",
        title: "AI Integrations",
        desc: "AI features for smart search, document reading, reports, summaries, and workflow assistance.",
    },
    {
        icon: Link2,
        tone: "orange",
        title: "Automation & Integrations",
        desc: "Connect your apps, forms, databases, APIs, CRMs, payment systems, and internal tools.",
    },
];

const reasons = [
    {
        icon: Rocket,
        title: "Built around your process",
        desc: "We study your current workflow and build software that matches how your business actually operates.",
        tone: "violet",
    },
    {
        icon: Timer,
        title: "Clear communication",
        desc: "You get proper updates, demos, and simple explanations throughout the project.",
        tone: "orange",
    },
    {
        icon: Users,
        title: "Practical design",
        desc: "Your software will be clean, easy to use, and made for real users, not just for looks.",
        tone: "green",
    },
    {
        icon: ShieldCheck,
        title: "Scalable development",
        desc: "We build systems that can grow with your users, data, features, and business needs.",
        tone: "blue",
    },
];

const processSteps = [
    {
        icon: Search,
        title: "Understand",
        desc: "We discuss your business, current workflow, users, and the problem you want to solve.",
        tone: "violet",
    },
    {
        icon: Layers3,
        title: "Plan",
        desc: "We define the features, screens, user roles, and project scope before development.",
        tone: "blue",
    },
    {
        icon: PanelTop,
        title: "Design",
        desc: "We create a clean and simple interface so users can understand the system easily.",
        tone: "violet",
    },
    {
        icon: Code2,
        title: "Build",
        desc: "We develop the app, portal, desktop software, backend, database, and integrations.",
        tone: "green",
    },
    {
        icon: Rocket,
        title: "Launch",
        desc: "We test, deploy, and help your team start using the system with confidence.",
        tone: "orange",
    },
    {
        icon: Gauge,
        title: "Improve",
        desc: "After launch, we can improve the software based on real usage and feedback.",
        tone: "blue",
    },
];

const problemItems = [
    "Manual Excel sheets",
    "WhatsApp-based order handling",
    "Repeated data entry",
    "Missing reports",
    "No central dashboard",
    "No customer portal",
    "No staff tracking",
    "No proper approval process",
    "Disconnected tools",
    "Slow follow-ups",
    "Paper-based records",
];

const demoFeatures = [
    "Order form",
    "Booking form",
    "Product catalog",
    "Basic dashboard",
    "Customer inquiry form",
    "Staff task form",
];

const heroOutcomes = ["Dashboards", "Workflows", "One system"];

const fallbackSocialProof: SocialProofContent = {
    eyebrow: "Our Impact",
    heading: "Trusted by teams around the world.",
    stats: [
        { value: "50+", label: "Projects Delivered" },
        { value: "6+", label: "Countries Served" },
        { value: "99.9%", label: "Uptime Delivered" },
        { value: "40%", label: "Avg. Cost Reduction" },
    ],
    industries: ["Logistics", "Education", "Healthcare", "Retail", "Services", "Community Platforms"],
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
        quote: "They turned our manual clinic workflow into a clear system our team can actually use every day.",
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
            viewport={{ once: false, amount: 0.35 }}
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
                        Contact Us
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
                            Contact Us
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
        <div className="relative mx-auto w-full max-w-[600px] lg:mx-0 xl:max-w-[620px] [@media(max-height:760px)]:lg:max-w-[560px]">
            <div className="absolute -left-10 top-48 z-20 hidden rounded-xl border border-white/15 bg-[#0b1635]/90 px-4 py-3 shadow-2xl backdrop-blur md:block [@media(max-height:760px)]:lg:top-40">
                <div className="flex items-center gap-3">
                    <IconBadge icon={Link2} tone="violet" className="h-9 w-9 rounded-lg" />
                    <div>
                        <p className="text-xs font-extrabold text-white">Live Data Sync</p>
                        <p className="text-[10px] text-white/60">All systems connected</p>
                    </div>
                </div>
            </div>
            <div className="absolute -right-8 top-4 z-20 hidden rounded-xl border border-white/15 bg-[#181343]/90 px-4 py-3 shadow-2xl backdrop-blur md:block">
                <div className="flex items-center gap-3">
                    <IconBadge icon={Sparkles} tone="violet" className="h-9 w-9 rounded-lg" />
                    <div>
                        <p className="text-xs font-extrabold text-white">Smart Reports</p>
                        <p className="text-[10px] text-white/60">Ready when needed</p>
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
                <div className="flex min-h-[360px] gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 [@media(max-height:760px)]:lg:min-h-[320px] [@media(max-height:760px)]:lg:p-3">
                    <div className="hidden w-12 shrink-0 flex-col items-center gap-5 rounded-lg border border-white/10 bg-white/[0.04] py-4 sm:flex">
                        <Image src="/logo.jpg" alt="" width={26} height={26} className="rounded-full" />
                        {[Workflow, Gauge, Users, ShieldCheck, Link2, Code2].map((Icon, index) => (
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
                                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.05] p-4 [@media(max-height:760px)]:lg:p-3">
                                    <p className="text-[10px] text-white/50">{label}</p>
                                    <p className="mt-2 text-xl font-extrabold text-white [@media(max-height:760px)]:lg:text-lg">{value}</p>
                                    <p className="mt-1 text-[10px] text-emerald-300">{delta}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
                            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 [@media(max-height:760px)]:lg:p-3">
                                <p className="text-xs font-extrabold text-white">AI Insights</p>
                                <p className="mt-3 max-w-[220px] text-[11px] leading-5 text-white/65 [@media(max-height:760px)]:lg:mt-2">
                                    Demand is predicted to increase 24% in the next 30 days.
                                </p>
                                <div className="mt-5 h-24 overflow-hidden rounded-md bg-gradient-to-t from-violet-500/25 to-transparent [@media(max-height:760px)]:lg:mt-3 [@media(max-height:760px)]:lg:h-20">
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

                            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 [@media(max-height:760px)]:lg:p-3">
                                <p className="text-xs font-extrabold text-white">Active Workflows</p>
                                <div className="mt-4 space-y-4 [@media(max-height:760px)]:lg:mt-3 [@media(max-height:760px)]:lg:space-y-3">
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

function HeroSection() {
    return (
        <section id="home" className="relative min-h-svh overflow-hidden bg-[#020919] pt-20 text-white">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(2,9,25,0.98)_0%,rgba(4,12,35,0.94)_46%,rgba(34,24,82,0.62)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(124,58,237,0.35),transparent_30%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,80px_80px,80px_80px]" />

            <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:pt-12 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-8 lg:px-8 lg:py-10 xl:gap-10 [@media(max-height:760px)]:lg:py-7">
                <motion.div
                    className="flex flex-col justify-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/86 backdrop-blur [@media(max-height:760px)]:lg:mb-4 [@media(max-height:760px)]:lg:py-1.5">
                        <Sparkles className="h-4 w-4 text-violet-300" />
                        Practical software for business operations
                    </div>

                    <h1 className="max-w-3xl text-4xl font-black leading-[1.06] tracking-normal sm:text-5xl md:text-[56px] xl:text-[60px] [@media(max-height:760px)]:lg:text-[50px]">
                        Software built around{" "}
                        <span className="text-violet-300">
                            your workflow.
                        </span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/78 md:text-lg md:leading-8 [@media(max-height:760px)]:lg:mt-4 [@media(max-height:760px)]:lg:text-base [@media(max-height:760px)]:lg:leading-7">
                        Replace spreadsheets, WhatsApp follow-ups, and scattered tools with simple apps, dashboards, and automations.
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row [@media(max-height:760px)]:lg:mt-5">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-400 px-6 py-3.5 text-sm font-extrabold text-[#160d02] transition hover:-translate-y-0.5 hover:bg-orange-300 [@media(max-height:760px)]:lg:py-3"
                        >
                            Start Your Project
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                            href="/projects"
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/18 bg-white/[0.04] px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.09] [@media(max-height:760px)]:lg:py-3"
                        >
                            View Our Work
                        </a>
                    </div>

                    <div className="mt-7 flex max-w-2xl flex-wrap gap-3 [@media(max-height:700px)]:lg:hidden">
                        {heroOutcomes.map((outcome) => (
                            <div key={outcome} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 py-2.5 text-sm font-extrabold text-white backdrop-blur">
                                <CheckCircle2 className="h-4 w-4 text-violet-300" />
                                {outcome}
                            </div>
                        ))}
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
    const visibleStats = stats.slice(0, 4);

    if (!visibleStats.length) {
        return null;
    }

    return (
        <section className="relative -mt-8 px-5 sm:-mt-10">
            <motion.div
                className={cx(
                    "mx-auto grid max-w-6xl gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-slate-900",
                    visibleStats.length === 1 && "md:grid-cols-1",
                    visibleStats.length === 2 && "md:grid-cols-2",
                    visibleStats.length === 3 && "md:grid-cols-3",
                    visibleStats.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
                )}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
            >
                {visibleStats.map((stat, index) => {
                    const Icon = icons[index % icons.length];
                    const isLast = index === visibleStats.length - 1;

                    return (
                        <div
                            key={stat.label}
                            className={cx(
                                "flex items-center gap-5 border-b border-slate-200 px-6 py-6 last:border-b-0 md:border-b-0 lg:px-7 dark:border-white/10",
                                !isLast && "md:border-r"
                            )}
                        >
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
                    title="Software that solves"
                    highlight="real business problems."
                    description="We do not build random apps. We first understand how your business works, then build software that fits your process."
                />

                <motion.div
                    className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-5"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.18 }}
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
        <section id="why" className="bg-white px-5 pb-24 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="Why Businesses Work With Us"
                    title="We keep software simple,"
                    highlight="useful, and business-focused."
                />

                <motion.div
                    className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.18 }}
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

function ProblemsSection() {
    return (
        <section id="problems" className="bg-slate-50 px-5 py-24 dark:bg-slate-900">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                    <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">Problems We Solve</p>
                    <h2 className="max-w-xl text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-4xl">
                        Still managing business through manual work?
                    </h2>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                        We help businesses replace slow, scattered processes with custom software that keeps work organized and easier to manage.
                    </p>
                </div>

                <motion.div
                    className="grid gap-3 sm:grid-cols-2"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.18 }}
                >
                    {problemItems.map((problem) => (
                        <motion.div key={problem} variants={fadeUp} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-[0_12px_34px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-violet-500" />
                            {problem}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
    if (!projects.length) {
        return null;
    }

    const platformTypes = new Set(projects.map((project) => project.type)).size;
    const techCount = new Set(projects.flatMap((project) => splitTechStack(project.techStack))).size;
    const moduleCount = projects.reduce((total, project) => total + (project.features?.length ?? 0), 0);

    const workStats = [
        { icon: Layers3, value: `${projects.length}+`, label: "Successful Projects" },
        { icon: Users, value: `${moduleCount}+`, label: "Business Modules" },
        { icon: BriefcaseBusiness, value: `${platformTypes}`, label: "Platform Types" },
        { icon: Gauge, value: `${techCount}+`, label: "Technologies Used" },
    ];

    const highlights = [
        {
            title: "In-depth case studies",
            desc: "Detailed views of the problem, solution, platform, modules, and stack.",
        },
        {
            title: "Diverse industries",
            desc: "Healthcare, logistics, HR, hospitality, wellness, community operations, and more.",
        },
        {
            title: "Practical business impact",
            desc: "Systems built around live workflows, reporting, roles, approvals, and automation.",
        },
    ];

    return (
        <section id="work" className="bg-slate-50 px-5 py-16 dark:bg-slate-900 md:py-20">
            <motion.div
                className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-violet-100 bg-[radial-gradient(circle_at_12%_18%,rgba(124,58,237,0.10),transparent_28%),#f8f7ff] px-5 py-12 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_12%_18%,rgba(124,58,237,0.16),transparent_28%),#0f172a] md:px-10 lg:px-14"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.18 }}
            >
                <div className="relative">
                    <div className="pointer-events-none absolute left-0 top-16 hidden grid-cols-4 gap-3 opacity-35 md:grid">
                        {Array.from({ length: 24 }).map((_, index) => (
                            <span key={`work-dot-left-${index}`} className="h-1 w-1 rounded-full bg-violet-300" />
                        ))}
                    </div>
                    <div className="pointer-events-none absolute right-0 top-16 hidden grid-cols-4 gap-3 opacity-35 md:grid">
                        {Array.from({ length: 24 }).map((_, index) => (
                            <span key={`work-dot-right-${index}`} className="h-1 w-1 rounded-full bg-violet-300" />
                        ))}
                    </div>

                    <div className="relative mx-auto max-w-4xl text-center">
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
                            Our Work
                        </p>
                        <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl">
                            Real Solutions.{" "}
                            <span className="text-violet-600 dark:text-violet-300">Real Results.</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
                            We partner with businesses across industries to build custom software that solves complex workflow problems and supports real growth.
                        </p>
                    </div>

                    <motion.div
                        className="relative mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        variants={staggerGroup}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        {workStats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <motion.div key={stat.label} variants={fadeUp} className="flex items-center gap-4 rounded-lg border border-violet-100 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.05]">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-400/10 dark:text-violet-200">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <span>
                                        <span className="block text-2xl font-black text-slate-950 dark:text-white">{stat.value}</span>
                                        <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.label}</span>
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <div className="relative mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950 md:p-9">
                        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                            <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
                                <div className="grid h-28 w-28 place-items-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-200">
                                    <BriefcaseBusiness className="h-12 w-12" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black leading-tight text-slate-950 dark:text-white md:text-3xl">
                                        Want to see how we&apos;ve helped businesses like yours?
                                    </h3>
                                    <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
                                        Explore detailed case studies showing how ideas become scalable web apps, mobile apps, dashboards, and automation systems.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-7 border-slate-200 lg:grid-cols-[1fr_auto] lg:border-l lg:pl-9 dark:border-white/10">
                                <div className="grid gap-5">
                                    {highlights.map((highlight) => (
                                        <div key={highlight.title} className="flex gap-4">
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-300" />
                                            <div>
                                                <p className="text-sm font-black text-slate-950 dark:text-white">{highlight.title}</p>
                                                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{highlight.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col justify-center gap-4">
                                    <a
                                        href="/projects"
                                        className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(249,115,22,0.24)] transition hover:-translate-y-0.5 hover:bg-orange-400"
                                    >
                                        View All Case Studies
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                    <a
                                        href="#process"
                                        className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-extrabold text-violet-600 transition hover:bg-violet-50 dark:text-violet-200 dark:hover:bg-white/[0.05]"
                                    >
                                        See Our Process
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-7 overflow-hidden rounded-xl border border-white/10 bg-[#020919] p-7 text-white shadow-[0_20px_70px_rgba(15,23,42,0.18)] md:p-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_26%,rgba(124,58,237,0.24),transparent_28%)]" />
                        <div className="relative grid gap-7 md:grid-cols-[auto_1fr_auto] md:items-center">
                            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/20">
                                <MessageCircle className="h-10 w-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black md:text-3xl">Have a project in mind?</h3>
                                <p className="mt-2 max-w-xl text-sm font-medium leading-7 text-white/82">
                                    Let&apos;s discuss how we can help you build the right solution for your business.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="https://wa.me/923330365252"
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-400 px-6 py-3.5 text-sm font-extrabold text-[#160d02] transition hover:-translate-y-0.5 hover:bg-orange-300"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    Chat on WhatsApp
                                </a>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                                >
                                    Get In Touch
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
function ProcessSection() {
    return (
        <section id="process" className="bg-white px-5 py-16 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="Our Process" title="Simple process from" highlight="idea to launch." />

                <div className="relative mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {processSteps.map((step, index) => (
                        <RoadmapCard key={step.title} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function RoadmapCard({
    step,
    index,
}: {
    step: (typeof processSteps)[number];
    index: number;
}) {
    const StepIcon = step.icon;

    return (
        <motion.article
            className="relative"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.05 }}
            whileHover={{ y: -5 }}
        >
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.055)] transition-shadow hover:shadow-[0_20px_55px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-white/[0.04]">
                <div className="absolute inset-x-0 top-0 h-1 bg-orange-400/70" />
                <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-black text-orange-600 dark:border-orange-300/20 dark:bg-orange-400/10 dark:text-orange-200">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                        <StepIcon className="h-5 w-5" />
                    </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Roadmap step
                </span>
                <h3 className="mt-2 text-lg font-black text-slate-950 dark:text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.desc}</p>
            </div>
        </motion.article>
    );
}

function FreeDemoOfferSection() {
    return (
        <section className="border-t border-slate-200 bg-slate-50 px-5 py-20 dark:border-white/10 dark:bg-slate-900">
            <motion.div
                className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_65px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-slate-950"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
            >
                <div className="border-b border-slate-200 bg-white px-7 py-5 dark:border-white/10 dark:bg-slate-950 md:px-9">
                    <span className="inline-flex rounded-full bg-orange-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                        Free Demo Offer
                    </span>
                </div>

                <div className="grid gap-8 p-7 md:p-9 lg:grid-cols-[0.86fr_1.14fr]">
                    <div>
                        <h2 className="text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-4xl">
                            Get a free 1-feature demo app
                        </h2>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                            Have an idea for an app or business system? We can create a simple 1-feature demo to show the core idea in action before you build the full version.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {["1 feature", "Simple demo", "Selected businesses"].map((item) => (
                                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-extrabold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-orange-400">
                                Get Free Demo App
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a href="/free-demo-app" className="inline-flex items-center justify-center rounded-md border border-slate-200 px-6 py-3.5 text-sm font-extrabold text-slate-800 transition hover:border-orange-300 hover:text-orange-600 dark:border-white/10 dark:text-white dark:hover:text-orange-300">
                                Terms & Conditions Apply
                            </a>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-base font-black text-slate-950 dark:text-white">Example demo features</h3>
                            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-600 dark:text-orange-300">
                                Pick one
                            </span>
                        </div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {demoFeatures.map((feature) => (
                                <div key={feature} className="flex items-center gap-3 rounded-lg bg-white p-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 dark:bg-white/[0.04] dark:text-slate-200 dark:ring-white/10">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                        <p className="mt-5 text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
                            Hosting, publishing, database, admin panel, integrations, and full app development are quoted separately.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <section className="border-t border-slate-200 bg-white px-5 py-24 dark:border-white/10 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow="What Our Clients Say" title="Trusted by teams" highlight="around the world." />

                <motion.div
                    className="mt-14 grid gap-7 md:grid-cols-3"
                    variants={staggerGroup}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.18 }}
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
        <section id="about" className="border-t border-slate-200 bg-slate-50 px-5 py-20 dark:border-white/10 dark:bg-slate-900">
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
                    viewport={{ once: false, amount: 0.22 }}
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
        <footer className="bg-[#020919] text-white">
            <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                <div className="grid items-center gap-8 rounded-2xl border border-white/10 bg-[#0d1630] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:grid-cols-[auto_1fr_auto] md:p-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/16 text-violet-200 shadow-xl ring-1 ring-violet-300/20">
                        <Send className="h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black">Ready to build software for your business?</h2>
                        <p className="mt-2 text-sm font-medium text-white/82">Tell us what you want to manage, automate, or improve. We&apos;ll help turn it into a clear software plan.</p>
                    </div>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-400 px-6 py-4 text-sm font-extrabold text-[#160d02] transition hover:-translate-y-0.5 hover:bg-orange-300">
                        Contact Us
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
                            Imadi Innovations builds custom mobile apps, web apps, desktop software, AI integrations, and business automation systems for companies that want practical software built around their workflow.
                        </p>
                    </div>

                    <FooterColumn title="Services" links={["Mobile Apps", "Web Apps", "Desktop Apps", "AI Integrations", "Automation"]} />
                    <FooterColumn title="Company" links={["About Us", "Our Process", "Careers", "Blog", "Submit Testimonial"]} />
                    <div>
                        <h3 className="font-black">Contact</h3>
                        <div className="mt-5 space-y-3 text-sm text-white/62">
                            <a href="mailto:hello@imadi-innovations.com" className="flex items-center gap-2 hover:text-orange-300">
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
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
                        <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
                        <a href="/terms-of-service" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
    const footerHref = (link: string) => {
        const hrefs: Record<string, string> = {
            "Mobile Apps": "#services",
            "Web Apps": "#services",
            "Desktop Apps": "#services",
            "AI Integrations": "#services",
            "Automation": "#services",
            "About Us": "#about",
            "Our Process": "#process",
            Careers: "#contact",
            Blog: "#contact",
            "Submit Testimonial": "/submit-testimonial",
        };

        return hrefs[link] ?? "#contact";
    };

    return (
        <div>
            <h3 className="font-black">{title}</h3>
            <div className="mt-5 grid gap-3 text-sm text-white/62">
                {links.map((link) => (
                    <a key={link} href={footerHref(link)} className="hover:text-orange-300">
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
            <HeroSection />
            <StatStrip stats={proof.stats} />
            <ServicesSection />
            <WhySection />
            <ProblemsSection />
            <ProjectsSection projects={projects} />
            <ProcessSection />
            <FreeDemoOfferSection />
            <TestimonialsSection testimonials={quotes} />
            <AboutSection />
            <ContactSection />
            <CTAFooter />
        </main>
    );
}
