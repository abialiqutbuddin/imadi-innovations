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
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#020919] dark:text-white">
            <header className="border-b border-slate-200 bg-white/92 backdrop-blur-xl dark:border-white/10 dark:bg-[#020919]/90">
                <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 lg:px-8">
                    <Link href="/" className="flex items-center gap-3" aria-label="Imadi Innovations home">
                        <span className="relative flex h-11 w-11 overflow-hidden rounded-full border border-slate-200 bg-white dark:border-white/15 dark:bg-white/10">
                            <Image src="/logo.jpg" alt="Imadi Innovations" width={44} height={44} className="h-full w-full object-cover" priority />
                        </span>
                        <span className="leading-none">
                            <span className="block text-base font-extrabold tracking-wide text-orange-500">IMADI</span>
                            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900 dark:text-white">Innovations</span>
                        </span>
                    </Link>

                    <Link href="/#contact" className="rounded-md bg-orange-400 px-5 py-3 text-sm font-extrabold text-[#160d02] transition hover:bg-orange-300">
                        Contact Us
                    </Link>
                </div>
            </header>

            <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-[#050d20]">
                <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                        Legal
                    </p>
                    <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                        {subtitle}
                    </p>
                    <p className="mt-5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
                <div className="space-y-8">
                    {sections.map((section) => (
                        <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.04]">
                            <h2 className="text-xl font-extrabold">{section.title}</h2>
                            {section.body?.map((paragraph) => (
                                <p key={paragraph} className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    {paragraph}
                                </p>
                            ))}
                            {section.items && (
                                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    {section.items.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
