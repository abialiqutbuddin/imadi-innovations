"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Timer, Sparkles } from "lucide-react";

export default function HeroSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    return (
        <div className="relative flex min-h-auto md:min-h-screen w-full flex-col items-center justify-center overflow-x-hidden md:overflow-y-auto px-5 pt-0 pb-4 sm:px-6 sm:pb-28 md:pt-28 lg:pt-32 text-left">
            {/* Background Elements - Simplified for cleaner look */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {!disableAnimations && (
                    <>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-navy/30 rounded-full blur-[120px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px]"
                        />
                    </>
                )}
            </div>

            {/* Soft vignette behind content for lift */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_40%_40%,rgba(0,0,0,0.35),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.3),transparent_50%)]" />

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:gap-12">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    animate={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl space-y-6"
                >
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-300">
                        Software Development
                        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-orange" />
                        <span className="text-white/80">Go-live in weeks</span>
                    </div>

                    <h1 className="text-2xl leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl font-outfit font-bold">
                        Software + <span className="text-brand-orange">AI</span> that keeps your operations moving.
                    </h1>

                    <p className="text-sm leading-[1.7] text-gray-300 sm:text-base md:text-[17px]">
                        We design, build, and operate digital tools that remove manual work, connect data, and make complex operations feel simple for your team and your customers.
                    </p>

                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                        <a
                            href="https://wa.me/923330365252"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full rounded-full bg-brand-orange px-6 py-3 text-center text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-orange/90 hover:shadow-[0_10px_40px_rgba(245,158,11,0.35)] sm:w-auto inline-flex items-center justify-center gap-2"
                        >
                            <svg viewBox="0 0 16 16" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                            WhatsApp
                        </a>
                        <a
                            href="mailto:abialigadi@gmail.com"
                            className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-center text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange hover:bg-white/20 sm:w-auto"
                        >
                            Book a working session
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-2.5 md:gap-3">
                        {["10+ systems shipped", "Clients in 6 countries", "90% return rate", "Full-stack remote team"].map((item) => (
                            <span key={item} className="rounded-full bg-white/5 px-3.5 py-2 text-[12px] sm:text-[13px] text-gray-300 border border-white/10">
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
