import Image from "next/image";
import Link from "next/link";

type LegalSection = {
    title: string;
    body?: string[];
    items?: string[];
};

interface LegalPageProps {
    title: string;
    subtitle: string;
    lastUpdated: string;
    sections: LegalSection[];
}

export default function LegalPage({ title, subtitle, lastUpdated, sections }: LegalPageProps) {
    return (
        <main className="min-h-screen bg-white text-slate-950 dark:bg-[#020919] dark:text-white">
            <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#020919]/90">
                <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 lg:px-8">
                    <Link href="/" className="flex items-center gap-3" aria-label="Imadi Innovations home">
                        <span className="relative flex h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-white dark:border-white/15 dark:bg-white/10">
                            <Image src="/logo.jpg" alt="Imadi Innovations" width={36} height={36} className="h-full w-full object-cover" priority />
                        </span>
                        <span className="leading-none">
                            <span className="block text-sm font-extrabold tracking-wide text-orange-500">IMADI</span>
                            <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">Innovations</span>
                        </span>
                    </Link>

                    <Link href="/contact" className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-orange-300 hover:text-orange-600 dark:border-white/15 dark:text-slate-100 dark:hover:border-orange-300 dark:hover:text-orange-300">
                        Contact Us
                    </Link>
                </div>
            </header>

            <section className="border-b border-slate-200 bg-slate-50/70 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mx-auto max-w-4xl px-5 py-10 lg:px-8">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-orange-600 dark:text-orange-300">
                        Legal
                    </p>
                    <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-4xl">{title}</h1>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {subtitle}
                    </p>
                    <p className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-5 py-8 lg:px-8">
                <div className="divide-y divide-slate-200 dark:divide-white/10">
                    {sections.map((section) => (
                        <article key={section.title} className="py-5 first:pt-0 last:pb-0">
                            <h2 className="text-lg font-extrabold tracking-tight">{section.title}</h2>
                            {section.body?.map((paragraph) => (
                                <p key={paragraph} className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                                    {paragraph}
                                </p>
                            ))}
                            {section.items && (
                                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                                    {section.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            <footer className="border-t border-slate-200 bg-slate-50/70 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mx-auto flex max-w-4xl flex-col gap-3 px-5 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-300">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">Imadi Innovations</p>
                    <nav className="flex gap-5" aria-label="Legal page footer">
                        <Link href="/" className="transition hover:text-orange-600 dark:hover:text-orange-300">
                            Home
                        </Link>
                        <Link href="/privacy-policy" className="transition hover:text-orange-600 dark:hover:text-orange-300">
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
            </footer>
        </main>
    );
}
