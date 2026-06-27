import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
    title: "Contact Us | Imadi Innovations",
    description: "Contact Imadi Innovations to discuss custom mobile apps, web apps, desktop software, dashboards, AI integrations, and business automation.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white text-slate-950 dark:bg-[#020919] dark:text-white">
            <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#020919]/90">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
                    <Link href="/" className="flex items-center gap-3" aria-label="Imadi Innovations home">
                        <span className="relative flex h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-white dark:border-white/15 dark:bg-white/10">
                            <Image src="/logo.jpg" alt="Imadi Innovations" width={40} height={40} className="h-full w-full object-cover" priority />
                        </span>
                        <span className="leading-none">
                            <span className="block text-base font-extrabold tracking-wide text-orange-500">IMADI</span>
                            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 dark:text-white">Innovations</span>
                        </span>
                    </Link>

                    <Link href="/" className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-orange-300 hover:text-orange-600 dark:border-white/15 dark:text-slate-100 dark:hover:border-orange-300 dark:hover:text-orange-300">
                        Home
                    </Link>
                </div>
            </header>

            <ContactSection id="contact-page" className="border-t-0 py-12 lg:py-16" />

            <footer className="border-t border-slate-200 bg-slate-50/70 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-300">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">Imadi Innovations</p>
                    <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Contact page footer">
                        <Link href="/" className="transition hover:text-orange-600 dark:hover:text-orange-300">
                            Home
                        </Link>
                        <Link href="/privacy-policy" className="transition hover:text-orange-600 dark:hover:text-orange-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="transition hover:text-orange-600 dark:hover:text-orange-300">
                            Terms of Service
                        </Link>
                    </nav>
                </div>
            </footer>
        </main>
    );
}
