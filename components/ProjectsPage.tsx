"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    CheckCircle2,
    Code2,
    Filter,
    Gauge,
    Globe2,
    Layers3,
    Mail,
    MessageCircle,
    MonitorSmartphone,
    PanelTop,
    Rocket,
    Smartphone,
    Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Project } from "@/types";

interface ProjectsPageProps {
    projects: Project[];
}

type ProjectFilter = "All" | Project["type"];

const filters: Array<{ label: string; value: ProjectFilter; icon: typeof BriefcaseBusiness }> = [
    { label: "All Projects", value: "All", icon: BriefcaseBusiness },
    { label: "Web Applications", value: "Web", icon: PanelTop },
    { label: "Mobile Apps", value: "Mobile", icon: Smartphone },
    { label: "Web & Mobile", value: "Web & Mobile", icon: MonitorSmartphone },
];

const typeStyles: Record<Project["type"], string> = {
    Web: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-400/10 dark:text-violet-200 dark:ring-violet-300/20",
    Mobile: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/20",
    "Web & Mobile": "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-400/10 dark:text-orange-200 dark:ring-orange-300/20",
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

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

function projectKey(project: Project, index: number) {
    return project._id ?? `${project.title}-${index}`;
}

function ProjectsHeader() {
    const navItems = [
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Process", href: "/#process" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020919]/90 backdrop-blur-2xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                <Link href="/" className="flex items-center gap-3" aria-label="Imadi Innovations home">
                    <span className="relative flex h-11 w-11 overflow-hidden rounded-full border border-white/15 bg-white/10">
                        <Image src="/logo.jpg" alt="Imadi Innovations" width={44} height={44} className="h-full w-full object-cover" priority />
                    </span>
                    <span className="leading-none">
                        <span className="block text-base font-extrabold tracking-wide text-orange-400">IMADI</span>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white">Innovations</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="text-sm font-bold text-white/82 transition hover:text-orange-400">
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="hidden items-center gap-2 rounded-md bg-orange-400 px-5 py-3 text-sm font-extrabold text-[#160d02] shadow-[0_14px_36px_rgba(251,146,60,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-300 sm:inline-flex"
                    >
                        Start a Project
                    </Link>
                </div>
            </div>
        </header>
    );
}

function DevicePreview({ projects }: { projects: Project[] }) {
    const desktopProject = projects.find((project) => project.desktopImg) ?? projects[0];
    const mobileProject = projects.find((project) => project.mobileImg);
    const desktopTitle = decodeText(desktopProject?.title ?? "Project dashboard");
    const mobileTitle = decodeText(mobileProject?.title ?? desktopTitle);

    return (
        <div className="relative min-h-[360px] w-full lg:min-h-[470px]">
            <div className="absolute right-0 top-2 w-[86%] overflow-hidden rounded-lg border border-white/15 bg-[#0c1430] p-3 shadow-[0_34px_110px_rgba(0,0,0,0.48)] rotate-[1.5deg]">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-orange-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    </div>
                    <span className="text-[10px] font-bold text-white/50">{desktopTitle}</span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-white">
                    {desktopProject?.desktopImg ? (
                        <Image
                            src={desktopProject.desktopImg}
                            alt={`${desktopTitle} desktop preview`}
                            fill
                            priority
                            sizes="(min-width: 1024px) 50vw, 90vw"
                            className="object-cover object-top"
                            unoptimized
                        />
                    ) : (
                        <DashboardFallback />
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-3 w-[38%] max-w-[190px] overflow-hidden rounded-[1.7rem] border-[7px] border-slate-950 bg-slate-950 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[9/19] overflow-hidden rounded-[1.2rem] bg-white">
                    {mobileProject?.mobileImg ? (
                        <Image
                            src={mobileProject.mobileImg}
                            alt={`${mobileTitle} mobile preview`}
                            fill
                            priority
                            sizes="190px"
                            className="object-cover object-top"
                            unoptimized
                        />
                    ) : (
                        <MobileFallback />
                    )}
                </div>
            </div>

            <div className="absolute bottom-12 right-2 hidden rounded-lg border border-white/12 bg-white/[0.08] px-4 py-3 text-white shadow-2xl backdrop-blur md:block">
                <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-orange-400 text-[#160d02]">
                        <Rocket className="h-5 w-5" />
                    </span>
                    <div>
                        <p className="text-sm font-black">Built for operations</p>
                        <p className="text-xs text-white/60">Dashboards, portals, apps, and workflows</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DashboardFallback() {
    return (
        <div className="h-full bg-slate-50 p-5">
            <div className="grid grid-cols-4 gap-3">
                {["Orders", "Users", "Tasks", "Reports"].map((item, index) => (
                    <div key={item} className="rounded-md border border-slate-200 bg-white p-3">
                        <p className="text-[10px] font-bold text-slate-400">{item}</p>
                        <p className="mt-2 text-lg font-black text-slate-900">{[128, 52, 91, 24][index]}</p>
                    </div>
                ))}
            </div>
            <div className="mt-5 grid grid-cols-[1.2fr_0.8fr] gap-3">
                <div className="rounded-md border border-slate-200 bg-white p-4">
                    <div className="h-28 rounded bg-[linear-gradient(135deg,rgba(139,92,246,0.18),rgba(251,146,60,0.18))]" />
                </div>
                <div className="rounded-md border border-slate-200 bg-white p-4">
                    <div className="mx-auto h-24 w-24 rounded-full bg-[conic-gradient(#8b5cf6_0_68%,#fb923c_68%_84%,#10b981_84%_100%)]" />
                </div>
            </div>
        </div>
    );
}

function MobileFallback() {
    return (
        <div className="h-full bg-slate-50 p-4">
            <div className="h-28 rounded-md bg-[linear-gradient(135deg,#ddd6fe,#fed7aa)]" />
            <div className="mt-4 space-y-3">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-md border border-slate-200 bg-white p-3">
                        <div className="h-2 w-20 rounded-full bg-slate-300" />
                        <div className="mt-2 h-2 w-28 rounded-full bg-slate-200" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function HeroSection({ projects }: { projects: Project[] }) {
    const types = new Set(projects.map((project) => project.type));
    const techCount = new Set(projects.flatMap((project) => splitTechStack(project.techStack))).size;
    const webCount = projects.filter((project) => project.type === "Web" || project.type === "Web & Mobile").length;

    const stats = [
        { icon: BriefcaseBusiness, value: `${projects.length}+`, label: "Projects Showcased" },
        { icon: Globe2, value: `${webCount}+`, label: "Web Systems" },
        { icon: MonitorSmartphone, value: `${types.size}`, label: "Platform Types" },
        { icon: Code2, value: `${techCount}+`, label: "Stack Items" },
    ];

    return (
        <section className="relative overflow-hidden bg-[#020919] pt-20 text-white">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(2,9,25,0.98)_0%,rgba(8,14,45,0.95)_50%,rgba(42,20,98,0.52)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(124,58,237,0.28),transparent_32%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,78px_78px,78px_78px]" />

            <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-12 lg:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:pt-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
                    <div className="mb-5 flex items-center gap-2 text-sm font-bold text-white/62">
                        <Link href="/" className="text-violet-300 transition hover:text-orange-300">Home</Link>
                        <span>/</span>
                        <span>Projects</span>
                    </div>

                    <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl md:text-[64px]">
                        Project work built for real business operations.
                    </h1>
                    <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/76 md:text-lg">
                        Explore custom software systems for HR, healthcare operations, logistics, event coordination, restaurants, wellness, and internal business dashboards.
                    </p>

                    <div className="mt-8 grid max-w-2xl grid-cols-2 gap-4 lg:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div key={stat.label} className="rounded-lg border border-white/12 bg-white/[0.055] p-4 backdrop-blur">
                                    <Icon className="h-5 w-5 text-violet-300" />
                                    <p className="mt-4 text-2xl font-black text-violet-200">{stat.value}</p>
                                    <p className="mt-1 text-xs font-semibold leading-5 text-white/64">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.62, ease: "easeOut", delay: 0.08 }}>
                    <DevicePreview projects={projects} />
                </motion.div>
            </div>
        </section>
    );
}

function ProjectVisual({ project }: { project: Project }) {
    const title = decodeText(project.title);
    const hasDesktop = Boolean(project.desktopImg && !project.hideDesktop);
    const hasMobile = Boolean(project.mobileImg);

    if (!hasDesktop && !hasMobile) {
        return (
            <div className="grid min-h-[280px] place-items-center rounded-lg border border-slate-200 bg-slate-100 text-slate-400 dark:border-white/10 dark:bg-white/[0.04]">
                <PanelTop className="h-12 w-12" />
            </div>
        );
    }

    return (
        <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 p-4 dark:border-white/10 dark:bg-slate-900 md:min-h-[360px]">
            {hasDesktop && (
                <div className={cx("overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-white/10", hasMobile && "w-[82%]")}>
                    <div className="relative aspect-[16/10]">
                        <Image
                            src={project.desktopImg as string}
                            alt={`${title} desktop screen`}
                            fill
                            sizes="(min-width: 1024px) 44vw, 100vw"
                            className="object-cover object-top"
                            unoptimized
                        />
                    </div>
                </div>
            )}

            {hasMobile && (
                <div className={cx(
                    "overflow-hidden rounded-[1.45rem] border-[6px] border-slate-950 bg-slate-950 shadow-2xl",
                    hasDesktop ? "absolute bottom-4 right-5 w-[28%] min-w-[112px] max-w-[160px]" : "mx-auto w-[48%] max-w-[190px]"
                )}>
                    <div className="relative aspect-[9/19] overflow-hidden rounded-[1rem] bg-white">
                        <Image
                            src={project.mobileImg as string}
                            alt={`${title} mobile screen`}
                            fill
                            sizes="180px"
                            className="object-cover object-top"
                            unoptimized
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const title = decodeText(project.title);
    const headline = decodeText(project.headline);
    const description = decodeText(project.description);
    const techItems = splitTechStack(project.techStack);
    const featureCount = project.features?.length ?? 0;
    const hasStack = techItems.length > 0;
    const FeatureIcon = project.type === "Mobile" ? Smartphone : project.type === "Web & Mobile" ? MonitorSmartphone : PanelTop;

    const metrics = [
        { icon: Layers3, value: featureCount ? `${featureCount}` : "Custom", label: featureCount ? "Core Modules" : "Build Scope" },
        { icon: FeatureIcon, value: project.type, label: "Platform" },
        { icon: Code2, value: hasStack ? `${techItems.length}+` : "Ready", label: hasStack ? "Technologies" : "Delivery" },
    ];

    return (
        <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.16 }}
            transition={{ duration: 0.48, ease: "easeOut", delay: Math.min(index * 0.04, 0.16) }}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950"
        >
            <div className="grid gap-0 lg:grid-cols-[0.96fr_1.04fr]">
                <div className="flex flex-col justify-center p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={cx("rounded-md px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] ring-1", typeStyles[project.type])}>
                            {project.type}
                        </span>
                        {techItems[0] && (
                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
                                {techItems[0]}
                            </span>
                        )}
                    </div>

                    <h2 className="mt-5 text-2xl font-black leading-tight text-slate-950 dark:text-white md:text-3xl">
                        {title}
                    </h2>
                    <p className="mt-3 text-base font-bold leading-7 text-slate-700 dark:text-slate-200">
                        {headline}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {description}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {metrics.map((metric) => {
                            const Icon = metric.icon;

                            return (
                                <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                                    <Icon className="h-5 w-5 text-violet-500 dark:text-violet-300" />
                                    <p className="mt-3 text-base font-black text-slate-950 dark:text-white">{metric.value}</p>
                                    <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500 dark:text-slate-400">{metric.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    {project.features?.length > 0 && (
                        <div className="mt-6 grid gap-3">
                            {project.features.slice(0, 3).map((feature) => (
                                <div key={`${title}-${feature.title}`} className="flex gap-3">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                                    <div>
                                        <p className="text-sm font-black text-slate-950 dark:text-white">{decodeText(feature.title)}</p>
                                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{decodeText(feature.desc)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {hasStack && (
                        <div className="mt-7 flex flex-wrap gap-2">
                            {techItems.map((tech) => (
                                <span key={`${title}-${tech}`} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 p-5 dark:bg-slate-900 md:p-6">
                    <ProjectVisual project={project} />
                </div>
            </div>
        </motion.article>
    );
}

function ProjectsShowcase({ projects }: { projects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
    const visibleProjects = activeFilter === "All"
        ? projects
        : projects.filter((project) => project.type === activeFilter);

    const availableFilters = filters.filter((filter) => (
        filter.value === "All" || projects.some((project) => project.type === filter.value)
    ));

    return (
        <section className="bg-slate-50 px-5 py-16 dark:bg-slate-900 md:py-20">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
                            Case Studies
                        </p>
                        <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-slate-950 dark:text-white md:text-4xl">
                            Practical systems customized for each workflow.
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {availableFilters.map((filter) => {
                            const Icon = filter.icon;
                            const isActive = activeFilter === filter.value;

                            return (
                                <button
                                    key={filter.value}
                                    type="button"
                                    onClick={() => setActiveFilter(filter.value)}
                                    className={cx(
                                        "inline-flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-extrabold transition",
                                        isActive
                                            ? "border-violet-600 bg-violet-600 text-white shadow-[0_14px_32px_rgba(124,58,237,0.24)]"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-300/30 dark:hover:text-violet-200"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {filter.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 grid gap-6">
                    {visibleProjects.map((project, index) => (
                        <ProjectCard key={projectKey(project, index)} project={project} index={index} />
                    ))}
                </div>

                {!visibleProjects.length && (
                    <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/10 dark:bg-white/[0.04]">
                        <Filter className="mx-auto h-9 w-9 text-slate-400" />
                        <p className="mt-4 text-lg font-black text-slate-950 dark:text-white">No projects in this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

function CapabilityStrip({ projects }: { projects: Project[] }) {
    const capabilities = useMemo(() => {
        const featureTitles = projects.flatMap((project) => project.features?.map((feature) => decodeText(feature.title)) ?? []);
        return Array.from(new Set(featureTitles)).slice(0, 8);
    }, [projects]);

    if (!capabilities.length) {
        return null;
    }

    return (
        <section className="border-y border-slate-200 bg-white px-5 py-12 dark:border-white/10 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-orange-500">
                            What appears in our work
                        </p>
                        <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950 dark:text-white">
                            Common modules across real projects.
                        </h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {capabilities.map((capability, index) => (
                            <div key={capability} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                                <div className="mb-4 flex items-center justify-between">
                                    <BadgeCheck className={cx("h-5 w-5", index % 3 === 0 && "text-violet-500", index % 3 === 1 && "text-orange-500", index % 3 === 2 && "text-emerald-500")} />
                                    <span className="text-[10px] font-black text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                                </div>
                                <p className="text-sm font-black leading-6 text-slate-800 dark:text-slate-100">{capability}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function EmptyProjects() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
            <ProjectsHeader />
            <section className="grid min-h-screen place-items-center px-5 pt-20">
                <div className="max-w-xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.04]">
                    <Sparkles className="mx-auto h-10 w-10 text-orange-400" />
                    <h1 className="mt-5 text-3xl font-black">Projects are being updated.</h1>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        The current project feed is empty, but Imadi Innovations still builds web apps, mobile apps, desktop software, AI integrations, and automation systems.
                    </p>
                    <Link href="/contact" className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3.5 text-sm font-extrabold text-white">
                        Contact Us
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}

function CTASection() {
    return (
        <section className="bg-white px-5 py-16 dark:bg-slate-950">
            <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-slate-200 bg-white p-7 shadow-[0_22px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
                <div className="grid h-16 w-16 place-items-center rounded-lg bg-violet-50 text-violet-600 shadow-lg dark:bg-violet-400/10 dark:text-violet-300">
                    <Gauge className="h-8 w-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-950 dark:text-white md:text-3xl">
                        Have a similar project in mind?
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Share your workflow, business problem, or app idea. We can turn it into a clear project plan and practical software.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                    <a
                        href="https://wa.me/923330365252"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-orange-400"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Chat on WhatsApp
                    </a>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-800 transition hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:text-violet-200"
                    >
                        <Mail className="h-4 w-4" />
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ProjectsFooter() {
    return (
        <footer className="border-t border-white/10 bg-[#020919] px-5 py-8 text-white">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex items-center gap-3">
                    <Image src="/logo.jpg" alt="Imadi Innovations" width={42} height={42} className="rounded-full" />
                    <div>
                        <p className="font-black text-orange-400">IMADI</p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white">Innovations</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/60">
                    <Link href="/" className="hover:text-orange-300">Home</Link>
                    <Link href="/#services" className="hover:text-orange-300">Services</Link>
                    <Link href="/contact" className="hover:text-orange-300">Contact</Link>
                    <Link href="/privacy-policy" className="hover:text-orange-300">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
    if (!projects.length) {
        return <EmptyProjects />;
    }

    return (
        <main className="min-h-screen overflow-x-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
            <ProjectsHeader />
            <HeroSection projects={projects} />
            <ProjectsShowcase projects={projects} />
            <CapabilityStrip projects={projects} />
            <CTASection />
            <ProjectsFooter />
        </main>
    );
}
