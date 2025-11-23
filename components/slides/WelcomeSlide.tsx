"use client";

import { motion } from "framer-motion";

export default function WelcomeSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-brand-dark text-center px-6 md:px-20">
            <motion.div
                initial={disableAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                whileInView={disableAnimations ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={disableAnimations ? { duration: 0 } : { duration: 0.8 }}
                className="max-w-4xl"
            >
                <h2 className="text-brand-orange uppercase tracking-widest text-sm md:text-base font-semibold mb-4">
                    Bridging the Gap
                </h2>
                <h1 className="text-4xl md:text-6xl font-bold font-outfit text-white mb-8">
                    Welcome to Imadi Innovations
                </h1>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12">
                    We are a forward-thinking software development company established in 2024. We specialize in bridging the gap between complex business problems and user-friendly digital solutions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-3 font-outfit">Custom Ecosystems</h3>
                        <p className="text-gray-400">
                            We don&apos;t just build apps; we build interconnected systems.
                        </p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-3 font-outfit">Intelligent Automation</h3>
                        <p className="text-gray-400">
                            Our edge lies in integrating cutting-edge AI into existing software to reduce manual workflows.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
