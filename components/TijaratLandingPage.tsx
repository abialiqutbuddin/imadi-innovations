"use client";

import Image from "next/image";
import Link from "next/link";
import type { ElementType, FormEvent } from "react";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
    ArrowRight,
    BadgeDollarSign,
    BarChart3,
    BookOpenText,
    Building2,
    CheckCircle2,
    ChevronDown,
    CircleDollarSign,
    ClipboardList,
    CloudUpload,
    Crown,
    Headphones,
    Languages,
    Loader2,
    LockKeyhole,
    Menu,
    PackageCheck,
    ReceiptText,
    ShieldCheck,
    Store,
    UsersRound,
    WifiOff,
    X,
} from "lucide-react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.41, ease: [0.22, 1, 0.36, 1] },
    },
};

const staggerGroup: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.056,
            delayChildren: 0.056,
        },
    },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 18 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
};

const navItems = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Benefits", href: "#benefits" },
    { label: "Early Access", href: "#early-access" },
];

const systemFeatures = [
    { icon: ReceiptText, iconClass: "text-blue-600 bg-blue-50 ring-blue-100 group-hover:bg-blue-600", title: "Create invoices", text: "and bills quickly" },
    { icon: PackageCheck, iconClass: "text-amber-600 bg-amber-50 ring-amber-100 group-hover:bg-amber-600", title: "Track inventory", text: "and stock movement" },
    { icon: UsersRound, iconClass: "text-violet-600 bg-violet-50 ring-violet-100 group-hover:bg-violet-600", title: "Manage customers", text: "and suppliers" },
    { icon: CircleDollarSign, iconClass: "text-amber-600 bg-amber-50 ring-amber-100 group-hover:bg-amber-600", title: "Record expenses", text: "and payments" },
    { icon: BarChart3, iconClass: "text-sky-600 bg-sky-50 ring-sky-100 group-hover:bg-sky-600", title: "View reports", text: "profit, sales and stock" },
    { icon: ClipboardList, iconClass: "text-indigo-600 bg-indigo-50 ring-indigo-100 group-hover:bg-indigo-600", title: "Track balances", text: "and receivables" },
    { icon: Languages, iconClass: "text-indigo-600 bg-indigo-50 ring-indigo-100 group-hover:bg-indigo-600", title: "Urdu & English", text: "for local teams" },
    { icon: Store, iconClass: "text-orange-600 bg-orange-50 ring-orange-100 group-hover:bg-orange-600", title: "Retail & wholesale", text: "workflows included" },
    { icon: CloudUpload, iconClass: "text-sky-600 bg-sky-50 ring-sky-100 group-hover:bg-sky-600", title: "Continuous updates", text: "based on feedback" },
];

const walkthrough = [
    {
        icon: ReceiptText,
        iconClass: "text-blue-600 bg-blue-50 ring-blue-100 group-hover:bg-blue-100 group-hover:ring-blue-200",
        title: "Billing & Invoicing",
        outcome: "Make bills faster",
        body: "Create professional invoices in seconds. Add products, discounts, payments and customer details without slowing down the counter.",
        visual: "invoice",
    },
    {
        icon: PackageCheck,
        iconClass: "text-amber-600 bg-amber-50 ring-amber-100 group-hover:bg-amber-100 group-hover:ring-amber-200",
        title: "Inventory Management",
        outcome: "Avoid stockouts",
        body: "Know what is in stock, what is running low and which products need attention before you lose sales.",
        visual: "stock",
    },
    {
        icon: UsersRound,
        iconClass: "text-violet-600 bg-violet-50 ring-violet-100 group-hover:bg-violet-100 group-hover:ring-violet-200",
        title: "Customer & Supplier Management",
        outcome: "Know every balance",
        body: "Track balances, payment history, purchase records and contact details for every party in one place.",
        visual: "customers",
    },
    {
        icon: CircleDollarSign,
        iconClass: "text-amber-600 bg-amber-50 ring-amber-100 group-hover:bg-amber-100 group-hover:ring-amber-200",
        title: "Accounting & Expenses",
        outcome: "Track money clearly",
        body: "Record expenses, receivables, payables and daily cash flow without needing complicated accounting software.",
        visual: "expense",
    },
    {
        icon: BarChart3,
        iconClass: "text-sky-600 bg-sky-50 ring-sky-100 group-hover:bg-sky-100 group-hover:ring-sky-200",
        title: "Business Reports",
        outcome: "See profit quickly",
        body: "View sales, profit, inventory value, pending payments and top-selling products from a clean dashboard.",
        visual: "profit",
    },
    {
        icon: Languages,
        iconClass: "text-indigo-600 bg-indigo-50 ring-indigo-100 group-hover:bg-indigo-100 group-hover:ring-indigo-200",
        title: "Urdu & English Support",
        outcome: "Easy for local teams",
        body: "Built for owners, managers, cashiers and staff who work across both Urdu and English.",
        visual: "language",
    },
    {
        icon: WifiOff,
        iconClass: "text-blue-600 bg-blue-50 ring-blue-100 group-hover:bg-blue-100 group-hover:ring-blue-200",
        title: "Offline-Friendly Workflows",
        outcome: "Keep selling offline",
        body: "Your shop should not stop because internet is slow. Tijarat is planned for real Pakistani business conditions.",
        visual: "offline",
    },
    {
        icon: ShieldCheck,
        iconClass: "text-slate-700 bg-slate-100 ring-slate-200 group-hover:bg-slate-200 group-hover:ring-slate-300",
        title: "Secure & Reliable",
        outcome: "Protect business data",
        body: "Your data and business records stay protected with secure backups, user roles and regular data protection.",
        visual: "secure",
    },
];

const benefits = [
    { icon: BadgeDollarSign, title: "Lifetime founder pricing", text: "Special pricing for early members." },
    { icon: Crown, title: "Priority onboarding", text: "We will help you get started faster." },
    { icon: Headphones, title: "Direct influence on features", text: "Your feedback shapes the roadmap." },
    { icon: CloudUpload, title: "Free data migration", text: "We will move your data for free." },
    { icon: PackageCheck, title: "Beta access before launch", text: "Try new features before everyone else." },
];

const businessTypes = [
    "Retail shop",
    "Wholesale business",
    "Distributor",
    "Pharmacy / medical store",
    "Restaurant / cafe",
    "Services business",
    "Manufacturing",
    "Online business",
    "Other",
];

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function IconTile({ icon: Icon, className }: { icon: ElementType; className?: string }) {
    return (
        <span className={cx("grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-700 ring-1 ring-slate-200", className)}>
            <Icon className="h-5 w-5" />
        </span>
    );
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.22 }}
            variants={{
                hidden: fadeUp.hidden,
                visible: {
                    ...(fadeUp.visible as object),
                    transition: { duration: 0.41, delay: delay * 0.7, ease: [0.22, 1, 0.36, 1] },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

function TijaratHeader() {
    const [open, setOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -86, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.39, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl"
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                <Link href="/" className="flex items-center gap-3" aria-label="Imadi Innovations home">
                    <span className="relative flex h-11 w-11 overflow-hidden rounded-lg border border-slate-200 bg-white">
                        <Image src="/logo.jpg" alt="Imadi Innovations" width={44} height={44} className="h-full w-full object-cover" priority />
                    </span>
                    <span className="leading-none">
                        <span className="block text-lg font-black tracking-wide text-slate-950">IMADI</span>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Innovations</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex" aria-label="Tijarat landing page">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} className="text-sm font-extrabold text-slate-700 transition hover:text-emerald-700">
                            {item.label}
                        </a>
                    ))}
                </nav>

                <a href="#early-access" className="hidden rounded-md bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_32px_rgba(4,120,87,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-600 lg:inline-flex">
                    Get Early Access
                </a>

                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-900 lg:hidden"
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {open && (
                <div className="border-t border-slate-200 bg-white px-5 pb-5 lg:hidden">
                    <nav className="mx-auto grid max-w-7xl gap-1 py-4">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="rounded-md px-3 py-3 text-sm font-extrabold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <a href="#early-access" onClick={() => setOpen(false)} className="mx-auto flex max-w-7xl items-center justify-center rounded-md bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white">
                        Get Early Access
                    </a>
                </div>
            )}
        </motion.header>
    );
}

function MiniLineChart() {
    return (
        <svg viewBox="0 0 420 170" className="h-full w-full" role="img" aria-label="Sales overview chart">
            <defs>
                <linearGradient id="tijaratChartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
            </defs>
            {[35, 70, 105, 140].map((y) => (
                <line key={y} x1="10" x2="410" y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />
            ))}
            <path d="M15 130 C45 92 70 125 98 88 C130 45 158 96 188 70 C222 38 248 112 282 78 C318 34 338 70 365 42 C386 22 398 28 410 18" fill="none" stroke="#047857" strokeLinecap="round" strokeWidth="5" />
            <path d="M15 130 C45 92 70 125 98 88 C130 45 158 96 188 70 C222 38 248 112 282 78 C318 34 338 70 365 42 C386 22 398 28 410 18 L410 165 L15 165 Z" fill="url(#tijaratChartFill)" />
        </svg>
    );
}

function ProductDashboard() {
    const statCards = [
        ["Total sales", "Rs. 1,250,000", "+18.5% this month"],
        ["Total profit", "Rs. 320,000", "+8.7% this month"],
        ["Invoices", "1,230", "+25.3% this month"],
        ["Receivables", "Rs. 560,000", "+12.3% last month"],
    ];

    return (
        <motion.div
            className="relative mx-auto w-full max-w-[720px]"
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: 0.13 }}
        >
            <motion.div
                className="absolute -right-2 top-10 z-20 hidden rounded-md border border-emerald-100 bg-white px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)] md:block"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">Live insight</p>
                <p className="mt-1 text-xs font-bold text-slate-600">Profit up 8.7%</p>
            </motion.div>

            <motion.div
                className="absolute -bottom-7 left-3 z-20 hidden w-[150px] rounded-[1.35rem] border-[7px] border-slate-950 bg-white shadow-2xl sm:block lg:-left-6"
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 3.15, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="rounded-[0.95rem] bg-white p-3">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-900">Invoices</p>
                        <ReceiptText className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400">This week</p>
                    <p className="mt-1 text-lg font-black text-slate-950">Rs. 78,540</p>
                    <div className="mt-4 space-y-2.5">
                        {[
                            ["Paid", "Rs. 44,250", "bg-emerald-500"],
                            ["Unpaid", "Rs. 21,390", "bg-orange-400"],
                            ["Overdue", "Rs. 12,900", "bg-rose-500"],
                        ].map(([label, value, dot]) => (
                            <div key={label} className="flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                                    <span className={cx("h-2 w-2 rounded-full", dot)} />
                                    {label}
                                </span>
                                <span className="text-[9px] font-black text-slate-700">{value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 rounded-md bg-emerald-700 py-2 text-center text-[9px] font-black text-white">
                        New invoice
                    </div>
                </div>
            </motion.div>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-3 text-xs font-black text-slate-500">Tijarat</span>
                </div>

                <div className="grid min-h-[430px] grid-cols-[68px_1fr] bg-white sm:grid-cols-[100px_1fr]">
                    <aside className="bg-slate-950 px-2 py-5 text-white sm:px-3">
                        <div className="mx-auto mb-7 grid h-9 w-9 place-items-center rounded-lg bg-white/10">
                            <span className="text-lg font-black">T</span>
                        </div>
                        <div className="space-y-2">
                            {["Dashboard", "Invoices", "Purchases", "Inventory", "Customers", "Expenses", "Reports"].map((item, index) => (
                                <div key={item} className={cx("truncate rounded-md px-2 py-2 text-[9px] font-bold sm:text-[11px]", index === 0 ? "bg-emerald-600 text-white" : "text-white/62")}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </aside>

                    <div className="p-4 sm:p-6">
                        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-black text-slate-950">Dashboard</h3>
                                <p className="text-xs font-semibold text-slate-400">Welcome back, Abi</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-8 w-8 rounded-full bg-slate-100" />
                                <span className="h-8 w-8 rounded-full bg-emerald-50" />
                                <span className="h-8 w-8 rounded-full bg-slate-900" />
                            </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-4">
                            {statCards.map(([label, value, delta]) => (
                                <div key={label} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                                    <p className="text-[10px] font-bold text-slate-400">{label}</p>
                                    <p className="mt-2 text-sm font-black text-slate-950 xl:text-base">{value}</p>
                                    <p className="mt-1 text-[10px] font-bold text-emerald-600">{delta}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-xs font-black text-slate-950">Sales overview</p>
                                    <span className="text-[10px] font-bold text-slate-400">This month</span>
                                </div>
                                <div className="h-36">
                                    <MiniLineChart />
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                <p className="text-xs font-black text-slate-950">Top products</p>
                                <div className="mt-4 space-y-3">
                                    {[
                                        ["Stainless tumbler", "1,220 sold"],
                                        ["Rice dispenser", "860 sold"],
                                        ["Storage box", "750 sold"],
                                    ].map(([name, sold]) => (
                                        <div key={name} className="flex items-center justify-between gap-3">
                                            <span className="flex min-w-0 items-center gap-2">
                                                <span className="h-7 w-7 shrink-0 rounded-md bg-emerald-50" />
                                                <span className="truncate text-[10px] font-black text-slate-700">{name}</span>
                                            </span>
                                            <span className="text-[9px] font-black text-orange-500">{sold}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                <p className="text-xs font-black text-slate-950">Recent invoices</p>
                                <div className="mt-3 space-y-2">
                                    {["INV-00125", "INV-00124", "INV-00123"].map((invoice, index) => (
                                        <div key={invoice} className="grid grid-cols-3 items-center gap-2 text-[10px] font-bold">
                                            <span className="text-slate-600">{invoice}</span>
                                            <span className="text-slate-950">Rs. {[2450, 8500, 1300][index].toLocaleString()}</span>
                                            <span className={cx("justify-self-end rounded px-2 py-1", index === 2 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700")}>
                                                {index === 2 ? "Unpaid" : "Paid"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                <p className="text-xs font-black text-slate-950">Expense summary</p>
                                <div className="mt-4 flex items-center gap-4">
                                    <div className="grid h-20 w-20 place-items-center rounded-full bg-[conic-gradient(#047857_0_36%,#22c55e_36%_58%,#38bdf8_58%_78%,#6366f1_78%_100%)]">
                                        <div className="h-11 w-11 rounded-full bg-white" />
                                    </div>
                                    <div className="space-y-2 text-[10px] font-bold text-slate-500">
                                        {["Purchases", "Rent", "Salaries", "Others"].map((item) => (
                                            <p key={item}>{item}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function SectionTitle({ title, eyebrow, text }: { title: string; eyebrow?: string; text?: string }) {
    return (
        <Reveal className="mx-auto max-w-3xl text-center">
            {eyebrow && <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p>}
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-4xl">{title}</h2>
            {text && <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 md:text-base">{text}</p>}
            <span className="mx-auto mt-4 block h-1 w-10 rounded-full bg-emerald-600" />
        </Reveal>
    );
}

function VisualFrame({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={cx("w-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-200 group-hover:-translate-y-1.5 group-hover:scale-[1.015] group-hover:border-emerald-200 group-hover:shadow-[0_14px_34px_rgba(15,23,42,0.08)]", className)}
        >
            {children}
        </div>
    );
}

function VisualCard({ type }: { type: string }) {
    if (type === "invoice") {
        return (
            <VisualFrame>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-slate-950">INVOICE</p>
                    <span className="text-[10px] font-black text-slate-400">INV-00025</span>
                </div>
                <div className="mt-5 space-y-3 text-xs font-semibold text-slate-500">
                    <p>Date <span className="float-right text-slate-800">4 May, 2026</span></p>
                    <p>Customer <span className="float-right text-slate-800">Al-Rafay Stores</span></p>
                    <p>Total amount <span className="float-right rounded bg-emerald-50 px-2 py-1 text-emerald-700">Paid</span></p>
                </div>
            </VisualFrame>
        );
    }

    if (type === "stock") {
        return (
            <VisualFrame>
                <p className="text-sm font-black text-slate-950">Low stock alerts</p>
                <div className="mt-4 space-y-3">
                    {["Stainless tumbler", "Rice dispenser", "Storage box"].map((item, index) => (
                        <div key={item} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-[11px] font-bold">
                            <span className="truncate text-slate-700">{item}</span>
                            <span className="text-red-500">{[12, 8, 5][index]} pcs</span>
                            <span className="rounded bg-red-50 px-2 py-1 text-red-600">Low</span>
                        </div>
                    ))}
                </div>
            </VisualFrame>
        );
    }

    if (type === "customers") {
        return (
            <VisualFrame>
                <p className="text-sm font-black text-slate-950">Top customers</p>
                <div className="mt-4 space-y-3">
                    {[
                        ["Al-Rafay Stores", "Rs. 14,450"],
                        ["Karachi Mart", "Rs. 9,200"],
                        ["Hashim Traders", "Rs. 7,800"],
                    ].map(([name, value]) => (
                        <div key={name} className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-700">{name}</span>
                            <span className="text-emerald-700">{value}</span>
                        </div>
                    ))}
                </div>
            </VisualFrame>
        );
    }

    if (type === "expense") {
        return (
            <VisualFrame>
                <p className="text-sm font-black text-slate-950">Expense summary</p>
                <div className="mt-5 flex items-center gap-5">
                    <div className="grid h-24 w-24 place-items-center rounded-full bg-[conic-gradient(#047857_0_34%,#22c55e_34%_54%,#38bdf8_54%_78%,#6366f1_78%_100%)]">
                        <div className="h-14 w-14 rounded-full bg-white" />
                    </div>
                    <div className="space-y-2 text-xs font-bold text-slate-500">
                        <p>Purchases</p>
                        <p>Rent</p>
                        <p>Salaries</p>
                        <p>Others</p>
                    </div>
                </div>
            </VisualFrame>
        );
    }

    if (type === "profit") {
        return (
            <VisualFrame>
                <p className="text-sm font-black text-slate-950">Profit & loss</p>
                <div className="mt-4 space-y-3 text-xs font-semibold text-slate-500">
                    <p>Total sales <span className="float-right text-slate-800">Rs. 1,250,000</span></p>
                    <p>Total expenses <span className="float-right text-slate-800">Rs. 930,000</span></p>
                    <p className="border-t border-slate-200 pt-3 font-black text-slate-950">Net profit <span className="float-right">Rs. 320,000</span></p>
                    <p className="text-right text-emerald-600">+9.7% vs last month</p>
                </div>
            </VisualFrame>
        );
    }

    if (type === "language") {
        return (
            <VisualFrame>
                <p className="text-sm font-black text-slate-950">Language</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">English</div>
                    <div className="rounded-md bg-emerald-700 px-4 py-3 text-center text-sm font-black text-white">اردو</div>
                </div>
            </VisualFrame>
        );
    }

    if (type === "offline") {
        return (
            <VisualFrame className="flex min-h-[150px] items-center gap-5">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-blue-600">
                    <WifiOff className="h-8 w-8" />
                </span>
                <div>
                    <p className="text-sm font-black text-slate-950">Works offline</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">Your data is safe. Syncs when you are back online.</p>
                </div>
            </VisualFrame>
        );
    }

    return (
        <VisualFrame className="grid min-h-[150px] place-items-center">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                <LockKeyhole className="h-11 w-11" />
            </span>
        </VisualFrame>
    );
}

function Field({ label, name, placeholder, type = "text", required, className }: { label: string; name: string; placeholder?: string; type?: string; required?: boolean; className?: string }) {
    return (
        <label className={cx("text-sm font-black text-slate-800", className)}>
            {label}
            {required && <span className="text-emerald-700"> *</span>}
            <input name={name} type={type} required={required} placeholder={placeholder} className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
        </label>
    );
}

function SelectField({ label, name, required, children, className }: { label: string; name: string; required?: boolean; children: React.ReactNode; className?: string }) {
    return (
        <label className={cx("text-sm font-black text-slate-800", className)}>
            {label}
            {required && <span className="text-emerald-700"> *</span>}
            <span className="relative mt-2 block">
                <select name={name} required={required} className="w-full appearance-none rounded-md border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                    {children}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </span>
        </label>
    );
}

export default function TijaratLandingPage() {
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const fullName = String(formData.get("fullName") || "");
        const businessName = String(formData.get("businessName") || "");
        const email = String(formData.get("email") || "");
        const phone = String(formData.get("phone") || "");
        const whatsapp = String(formData.get("whatsapp") || "");
        const city = String(formData.get("city") || "");
        const businessType = String(formData.get("businessType") || "");
        const currentSoftware = String(formData.get("currentSoftware") || "");
        const biggestProblem = String(formData.get("biggestProblem") || "");

        setStatus("submitting");
        setMessage("");

        try {
            const response = await fetch("/api/contact-submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    email: email || "tijarat-lead@imadi-innovations.com",
                    company: businessName,
                    projectType: "Tijarat Early Access",
                    budget: "Founder beta",
                    message: [
                        "Tijarat early access request",
                        `Business name: ${businessName}`,
                        `Phone: ${phone}`,
                        `WhatsApp: ${whatsapp}`,
                        `City: ${city}`,
                        `Business type: ${businessType}`,
                        `Currently using: ${currentSoftware}`,
                        `Biggest challenge: ${biggestProblem}`,
                    ].join("\n"),
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setStatus("error");
                setMessage(data.message || "We could not submit your early access request right now.");
                return;
            }

            setStatus("success");
            setMessage("Thank you. Your Tijarat early access request has been received.");
            form.reset();
        } catch {
            setStatus("error");
            setMessage("The submission service is unavailable right now. Please message us on WhatsApp.");
        }
    };

    return (
        <main className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
            <TijaratHeader />

            <section id="home" className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_8%,rgba(16,185,129,0.12),transparent_26%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 pb-12 pt-24 lg:pt-28">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
                    <motion.div initial="hidden" animate="visible" variants={staggerGroup}>
                        <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-emerald-100">
                            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                            Coming soon
                        </motion.div>
                        <motion.h1 variants={fadeUp} className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-normal text-slate-950 sm:text-5xl lg:text-[52px] xl:text-[56px]">
                            Tijarat: Business Software Built for <span className="text-emerald-700">Pakistan</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-700">
                            Manage billing, inventory, accounting, customers, suppliers and reports in one simple system designed for Pakistani shops, wholesalers, retailers, distributors and SMEs.
                        </motion.p>

                        <motion.div variants={fadeUp} className="mt-5 flex max-w-xl items-start gap-3 border-l-4 border-emerald-700 pl-4">
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-emerald-700 text-white">
                                <Store className="h-4 w-4" />
                            </span>
                            <p className="text-sm font-bold leading-6 text-slate-700">
                                Help us build a Pakistan-first alternative to complicated, foreign-focused business software.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-5 grid max-w-xl gap-3 sm:grid-cols-3">
                            {[
                                ["01", "Validate demand"],
                                ["02", "Find pain points"],
                                ["03", "Invite beta users"],
                            ].map(([step, label]) => (
                                <div key={step} className="rounded-md border border-slate-200 bg-white/80 p-3 shadow-sm">
                                    <p className="text-[10px] font-black text-emerald-700">{step}</p>
                                    <p className="mt-1 text-xs font-extrabold text-slate-700">{label}</p>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <a href="#early-access" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 py-4 text-sm font-black text-white shadow-[0_16px_38px_rgba(4,120,87,0.24)] transition hover:-translate-y-0.5 hover:bg-emerald-600">
                                Join Early Access
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-200 bg-white px-6 py-4 text-sm font-black text-emerald-800 transition hover:-translate-y-0.5 hover:border-emerald-500">
                                <BookOpenText className="h-4 w-4" />
                                Share Your Business Needs
                            </a>
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-6 flex max-w-xl items-center gap-4">
                            <div className="flex -space-x-2">
                                {["A", "S", "K", "M"].map((letter) => (
                                    <span key={letter} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-slate-100 text-xs font-black text-slate-700">
                                        {letter}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm font-semibold leading-6 text-slate-600">
                                Early members get lifetime founder pricing, beta access, free migration support and direct influence on features.
                            </p>
                        </motion.div>
                    </motion.div>

                    <ProductDashboard />
                </div>

                <a href="#features" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 md:flex">
                    Scroll
                    <span className="h-9 w-px overflow-hidden bg-slate-200">
                        <motion.span className="block h-4 w-px bg-emerald-700" animate={{ y: [-18, 38] }} transition={{ duration: 1.26, repeat: Infinity, ease: "easeInOut" }} />
                    </span>
                </a>
            </section>

            <section className="px-5 py-10">
                <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white px-5 py-8 shadow-[0_18px_55px_rgba(15,23,42,0.06)] lg:px-8">
                    <SectionTitle
                        title="One System to Run Your Business"
                        text="Our goal is to give Pakistani businesses a simple, reliable and powerful platform to manage daily operations. From creating invoices to tracking stock, from managing expenses to understanding profit, everything works in one place."
                    />

                    <motion.div
                        className="mt-10 grid overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9"
                        variants={staggerGroup}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.15 }}
                    >
                        {systemFeatures.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <motion.article
                                    key={feature.title}
                                    variants={scaleIn}
                                    whileHover={{ y: -4 }}
                                    className="group flex min-h-[168px] flex-col items-center justify-start border-b border-slate-200 px-4 py-6 text-center transition hover:bg-slate-50 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(3n)]:border-r xl:[&:nth-child(9n)]:border-r-0"
                                >
                                    <span className={cx("grid h-11 w-11 place-items-center rounded-lg ring-1 transition duration-200 group-hover:scale-105 group-hover:text-white", feature.iconClass)}>
                                        <Icon className="h-7 w-7" />
                                    </span>
                                    <h3 className="mt-4 flex min-h-10 items-center justify-center text-balance text-[15px] font-extrabold leading-5 text-slate-950">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 flex min-h-10 max-w-[150px] items-start justify-center text-balance text-xs font-semibold leading-5 text-slate-500">
                                        {feature.text}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            <section id="features" className="bg-slate-50 px-5 py-16">
                <div className="mx-auto max-w-7xl lg:px-8">
                    <SectionTitle title="Built Around How Pakistani Businesses Actually Work" />

                    <motion.div
                        className="relative mt-12 grid gap-6 lg:grid-cols-2"
                        variants={staggerGroup}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.08 }}
                    >
                        {walkthrough.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.article
                                    key={item.title}
                                    variants={fadeUp}
                                    whileHover={{ y: -6 }}
                                    transition={{ type: "spring", stiffness: 360, damping: 22 }}
                                    className="group relative grid gap-5 overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:bg-white hover:shadow-[0_20px_54px_rgba(15,23,42,0.10)] md:grid-cols-[0.85fr_1.15fr] md:items-stretch"
                                >
                                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-slate-100 transition group-hover:bg-emerald-600" />
                                    <div className="col-span-full flex items-center gap-3">
                                        <span
                                            className={cx("grid h-11 w-11 shrink-0 place-items-center rounded-lg ring-1 transition duration-200 group-hover:rotate-3 group-hover:scale-105", item.iconClass)}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <h3 className="min-w-0 text-balance text-2xl font-extrabold leading-tight text-slate-950 transition duration-200 group-hover:translate-x-1 group-hover:text-emerald-950">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="flex min-h-[170px] flex-col">
                                        <div className="mt-4 inline-flex w-fit rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-800 ring-1 ring-emerald-100 transition duration-200 group-hover:translate-x-1 group-hover:bg-emerald-100">
                                            {item.outcome}
                                        </div>

                                        <p className="mt-5 text-sm font-medium leading-7 text-slate-600 transition duration-200 group-hover:text-slate-700">{item.body}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <VisualCard type={item.visual} />
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            <section id="benefits" className="border-y border-slate-200 bg-white px-5 py-16">
                <div className="mx-auto max-w-7xl lg:px-8">
                    <SectionTitle title="Why Join Early?" text="We are inviting Pakistani business owners to help shape Tijarat before launch. Early members receive benefits that make switching easier." />

                    <motion.div
                        className="mt-10 grid overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-5"
                        variants={staggerGroup}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.18 }}
                    >
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.article
                                    key={benefit.title}
                                    variants={scaleIn}
                                    whileHover={{ y: -5 }}
                                    className="group relative flex min-h-[210px] flex-col items-center justify-start border-b border-slate-200 px-7 py-8 text-center transition hover:bg-slate-50 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
                                >
                                    <IconTile icon={Icon} className="mx-auto transition duration-200 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white group-hover:ring-slate-900" />
                                    <h3 className="mt-5 flex min-h-10 items-center justify-center text-balance text-base font-extrabold leading-5 text-slate-950">
                                        {benefit.title}
                                    </h3>
                                    <p className="mt-3 flex min-h-12 max-w-[210px] items-start justify-center text-balance text-sm font-semibold leading-6 text-slate-500">
                                        {benefit.text}
                                    </p>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            <section id="early-access" className="bg-slate-50 px-5 py-16">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch lg:px-8">
                    <Reveal className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">Early access</p>
                        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-4xl">
                            Help Us Build What You Actually Need
                        </h2>
                        <p className="mt-5 text-sm font-medium leading-7 text-slate-600">
                            Join early and help us build the software that will power thousands of businesses in Pakistan.
                        </p>
                        <div className="mt-7 space-y-4">
                            {[
                                "It takes less than 2 minutes",
                                "Your answers help us build better",
                                "Be among the first to get access",
                            ].map((item) => (
                                <p key={item} className="flex items-center gap-3 text-sm font-black text-slate-700">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                                    {item}
                                </p>
                            ))}
                        </div>

                        <div className="mt-10 rounded-lg border border-emerald-100 bg-emerald-50 p-5">
                            <div className="flex items-center gap-4">
                                <span className="grid h-14 w-14 place-items-center rounded-lg bg-emerald-700 text-white">
                                    <Building2 className="h-7 w-7" />
                                </span>
                                <div>
                                    <p className="text-sm font-black text-emerald-950">Join the first group</p>
                                    <p className="mt-1 text-xs font-semibold leading-5 text-emerald-800">
                                        Pakistani businesses helping shape Tijarat before public launch.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] md:p-8"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.18 }}
                        transition={{ duration: 0.41, ease: [0.22, 1, 0.36, 1], delay: 0.056 }}
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <Field label="Full Name" name="fullName" placeholder="Your name" required />
                            <Field label="Business Name" name="businessName" placeholder="Your business name" required />
                            <Field label="Phone Number" name="phone" placeholder="03XX-XXXXXXX" required />
                            <Field label="WhatsApp Number" name="whatsapp" placeholder="03XX-XXXXXXX" required />
                            <Field label="Email" name="email" type="email" placeholder="Optional email address" />
                            <SelectField label="City" name="city" required>
                                <option value="">Select your city</option>
                                {["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Hyderabad", "Other"].map((city) => (
                                    <option key={city}>{city}</option>
                                ))}
                            </SelectField>
                            <SelectField label="Business Type" name="businessType" required>
                                <option value="">Select business type</option>
                                {businessTypes.map((type) => (
                                    <option key={type}>{type}</option>
                                ))}
                            </SelectField>
                            <div className="text-sm font-black text-slate-800">
                                Currently Using
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    {["Excel / Manual", "Vyapar", "POS / Other Software", "Other"].map((item) => (
                                        <label key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                            <input name="currentSoftware" type="radio" value={item} className="h-4 w-4 accent-emerald-700" />
                                            {item}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <label className="text-sm font-black text-slate-800 md:col-span-2">
                                Biggest Challenge You Face
                                <textarea name="biggestProblem" minLength={5} maxLength={1000} placeholder="Tell us your biggest challenge..." className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                            </label>
                        </div>

                        {message && (
                            <div className={cx("mt-5 rounded-md border p-4 text-sm font-bold", status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700")}>
                                {message}
                            </div>
                        )}

                        <button type="submit" disabled={status === "submitting"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 py-4 text-sm font-black text-white shadow-[0_16px_38px_rgba(4,120,87,0.22)] transition hover:-translate-y-0.5 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70">
                            {status === "submitting" ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Join Early Access
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-semibold text-slate-500">
                            <LockKeyhole className="h-3.5 w-3.5" />
                            We respect your privacy. Your information is safe with us.
                        </p>
                    </motion.form>
                </div>
            </section>

            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <Image src="/logo.jpg" alt="Imadi Innovations" width={42} height={42} className="rounded-lg" />
                            <span className="leading-none">
                                <span className="block text-lg font-black text-slate-950">IMADI</span>
                                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Innovations</span>
                            </span>
                        </Link>
                        <p className="mt-5 max-w-sm text-sm font-medium leading-7 text-slate-600">
                            Building smart digital solutions for a better tomorrow.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-black text-slate-950">Company</h3>
                        <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-500">
                            <Link href="/#about">About Us</Link>
                            <Link href="/#services">Services</Link>
                            <Link href="/#work">Solutions</Link>
                            <Link href="/contact">Contact Us</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-black text-slate-950">Quick Links</h3>
                        <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-500">
                            <Link href="/">Home</Link>
                            <a href="#features">Features</a>
                            <Link href="/privacy-policy">Privacy Policy</Link>
                            <Link href="/terms-of-service">Terms of Service</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-black text-slate-950">Get in Touch</h3>
                        <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-500">
                            <a href="https://wa.me/923330365252">+92 333 036 5252</a>
                            <a href="mailto:hello@imadi-innovations.com">hello@imadi-innovations.com</a>
                            <span>Karachi, Pakistan</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-200 px-5 py-5 text-center text-xs font-semibold text-slate-500">
                    © 2026 Imadi Innovations. All rights reserved.
                </div>
            </footer>
        </main>
    );
}
