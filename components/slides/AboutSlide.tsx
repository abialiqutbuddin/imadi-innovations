"use client";

import { motion } from "framer-motion";

export default function AboutSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    return (
        <div className="w-full md:h-full flex flex-col justify-center items-center px-5 sm:px-6 py-10 sm:py-20 relative overflow-x-hidden md:overflow-y-auto">
            <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">

                {/* Left Side: About Company */}
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        whileInView={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold mb-2">
                            About Us
                        </h2>
                        <h1 className="text-2xl md:text-3xl font-bold font-outfit text-foreground mb-3">
                            Imadi Innovations
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                            Founded in 2024, we're a Pakistan-based remote team that builds custom digital systems for clients around the world.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                            Our focus is simple: combine strong engineering with a deep understanding of real business operations.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Leadership */}
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        whileInView={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 p-8 rounded-2xl"
                    >
                        <h3 className="text-foreground font-bold text-xl mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
                            Leadership
                        </h3>

                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0 border-2 border-brand-orange">
                                {/* Placeholder for Founder Photo */}
                                <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
                                    Photo
                                </div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-foreground font-outfit">
                                    Abi Ali Qutbuddin
                                </h4>
                                <p className="text-brand-orange font-medium text-sm mb-2">
                                    CEO & Founder
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                    Software architect, automation specialist, and founder of Imadi Innovations. Focused on building tools that help businesses operate faster and smarter.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
