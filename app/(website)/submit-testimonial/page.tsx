import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import TestimonialSubmissionForm from "@/components/TestimonialSubmissionForm";

export const metadata: Metadata = {
    title: "Submit a Testimonial | Imadi Innovations",
    description: "Share your experience working with Imadi Innovations. Testimonials are reviewed before publication.",
    alternates: {
        canonical: "/submit-testimonial",
    },
};

export default function SubmitTestimonialPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#020919] dark:text-white lg:h-svh lg:overflow-hidden">
            <header className="border-b border-slate-200 bg-white/92 backdrop-blur-xl dark:border-white/10 dark:bg-[#020919]/90">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
                    <Link href="/" className="flex items-center gap-3" aria-label="Imadi Innovations home">
                        <span className="relative flex h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-white dark:border-white/15 dark:bg-white/10">
                            <Image src="/logo.jpg" alt="Imadi Innovations" width={44} height={44} className="h-full w-full object-cover" priority />
                        </span>
                        <span className="leading-none">
                            <span className="block text-base font-extrabold tracking-wide text-orange-500">IMADI</span>
                            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 dark:text-white">Innovations</span>
                        </span>
                    </Link>

                    <Link href="/" className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-950 transition hover:border-orange-300 hover:text-orange-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-orange-300/40 dark:hover:text-orange-200">
                        Back Home
                    </Link>
                </div>
            </header>

            <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#050d20] lg:h-[calc(100svh-4rem)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_16%_82%,rgba(251,146,60,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.85),rgba(248,250,252,0.96))] dark:bg-[radial-gradient(circle_at_78%_18%,rgba(124,58,237,0.26),transparent_30%),radial-gradient(circle_at_16%_82%,rgba(251,146,60,0.16),transparent_28%),linear-gradient(180deg,rgba(5,13,32,0.92),rgba(2,9,25,0.98))]" />
                <div className="relative mx-auto flex max-w-6xl px-5 py-8 lg:h-full lg:items-center lg:px-8 lg:py-6">
                    <TestimonialSubmissionForm />
                </div>
            </section>
        </main>
    );
}
