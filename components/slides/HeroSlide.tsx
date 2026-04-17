"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Timer, Sparkles } from "lucide-react";
import HeroVisual from "../visuals/HeroVisual";

export default function HeroSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    return (
        <div className="relative flex min-h-auto md:min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 pt-0 pb-4 sm:px-6 sm:pb-28 md:pt-28 lg:pt-32 text-left">
            {/* Background Elements - Subtle abstract animations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {!disableAnimations && (
                    <>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.4, 0.3],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-navy/30 rounded-full blur-[140px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.15, 0.3, 0.15],
                            }}
                            transition={{ duration: 12, repeat: Infinity, delay: 2, ease: "easeInOut" }}
                            className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-brand-orange/10 rounded-full blur-[140px]"
                        />
                    </>
                )}
            </div>

            {/* Soft vignette behind content for lift - only in dark mode */}
            <div className="pointer-events-none absolute inset-0 z-0 dark:bg-[radial-gradient(circle_at_40%_40%,rgba(0,0,0,0.35),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.3),transparent_50%)]" />

            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:gap-12 lg:gap-20">
                {/* Left Side: Content */}
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    animate={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 max-w-3xl space-y-8"
                >
                    <div className="inline-flex items-center gap-3 rounded-full border border-brand-navy/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-navy dark:text-gray-300 shadow-sm">
                        Software Development
                        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-orange" />
                        <span className="text-brand-navy dark:text-gray-300">Go-live in weeks</span>
                    </div>

                    <h1 className="text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl font-outfit font-bold tracking-tight">
                        Software + <span className="text-brand-orange relative inline-block">
                            AI
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-orange opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                        </span> that keeps your operations moving.
                    </h1>

                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl font-light md:font-normal max-w-2xl">
                        We design, build, and operate digital tools that remove manual work, connect data, and make complex operations feel simple for your team and your customers.
                    </p>

                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <a
                            href="#contact"
                            className="w-full rounded-full bg-brand-orange px-8 py-4 text-center text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-orange/90 hover:shadow-[0_10px_40px_rgba(245,158,11,0.35)] sm:w-auto inline-flex items-center justify-center gap-2"
                        >
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </a>
                        <a
                            href="https://calendly.com/your-calendly-link" // Replace with actual link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full rounded-full bg-teal-500/90 border border-teal-400/20 px-8 py-4 text-center text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-500 hover:shadow-[0_10px_40px_rgba(20,184,166,0.25)] sm:w-auto inline-flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
                            Book a Discovery Call
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {[
                            { icon: <ShieldCheck className="w-4 h-4 text-brand-orange" />, text: "10+ systems shipped" },
                            { icon: <Sparkles className="w-4 h-4 text-brand-orange" />, text: "Clients in 6 countries" },
                            { icon: <Timer className="w-4 h-4 text-brand-orange" />, text: "90% return rate" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-sm px-4 py-2 text-[13px] font-medium text-brand-navy dark:text-gray-300 border border-brand-navy/5 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-colors cursor-default shadow-sm">
                                {item.icon}
                                {item.text}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side: Visuals (Desktop Only) */}
                <div className="hidden md:block flex-1 h-full w-full">
                    <HeroVisual />
                </div>
            </div>
        </div>
    );
}
