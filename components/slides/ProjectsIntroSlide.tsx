"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, Zap, Globe } from "lucide-react";

export default function ProjectsIntroSlide() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-dark bg-grid-pattern text-center px-5 sm:px-6 md:px-14 relative overflow-x-hidden overflow-y-auto py-16 sm:py-20">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-navy/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl space-y-6"
            >
                <h2 className="text-brand-orange uppercase tracking-widest text-[11px] md:text-xs font-semibold">
                    Our Portfolio
                </h2>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-outfit text-white">
                    Featured Projects
                </h1>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    Explore our diverse range of solutions, from enterprise-grade web platforms to consumer-facing mobile applications.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
                        <div className="w-12 h-12 bg-brand-navy/50 rounded-full flex items-center justify-center mb-4 text-brand-orange">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Web Platforms</h3>
                        <p className="text-gray-400 text-sm">Scalable SaaS & Portals</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
                        <div className="w-12 h-12 bg-brand-navy/50 rounded-full flex items-center justify-center mb-4 text-brand-orange">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Mobile Apps</h3>
                        <p className="text-gray-400 text-sm">iOS & Android Solutions</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center">
                        <div className="w-12 h-12 bg-brand-navy/50 rounded-full flex items-center justify-center mb-4 text-brand-orange">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Automation</h3>
                        <p className="text-gray-400 text-sm">AI-Driven Workflows</p>
                    </div>
                </div>

                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center justify-center gap-2 text-brand-orange font-medium uppercase tracking-widest text-sm"
                >
                    <span>Swipe Right to Explore</span>
                    <ArrowRight className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </div>
    );
}
