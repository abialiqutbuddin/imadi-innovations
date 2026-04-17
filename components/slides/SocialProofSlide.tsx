"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, Repeat } from "lucide-react";

export default function SocialProofSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    const stats = [
        {
            icon: <Building2 className="w-8 h-8 text-brand-orange" />,
            value: "10+",
            label: "Completed Systems"
        },
        {
            icon: <Globe2 className="w-8 h-8 text-brand-orange" />,
            value: "6+",
            label: "Countries Served"
        },
        {
            icon: <Repeat className="w-8 h-8 text-brand-orange" />,
            value: "90%",
            label: "Client Return Rate"
        }
    ];

    const industries = [
        "Logistics", "Education", "Wellness", "Hospitality", "Community Platforms", "Retail"
    ];

    return (
        <div className="w-full md:h-full flex flex-col justify-center items-center px-5 sm:px-6 py-10 sm:py-20 relative overflow-x-hidden md:overflow-y-auto">
            <div className="relative z-10 max-w-5xl w-full text-center space-y-6 my-auto">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold">
                        Our Impact
                    </h2>
                    <h1 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 dark:text-white">
                        Trusted By Businesses Across Industries
                    </h1>

                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {industries.map((industry, index) => (
                            <span key={index} className="px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-brand-navy/5 dark:border-white/10 text-brand-navy dark:text-gray-200 text-sm shadow-sm group-hover:bg-white/80 transition-colors">
                                {industry}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={disableAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            whileInView={disableAnimations ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 p-5 md:p-6 rounded-2xl flex flex-col items-center justify-center group hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
                        >
                            <div className="mb-3 p-2.5 bg-brand-orange/10 dark:bg-brand-navy/50 rounded-full group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 font-outfit">
                                {stat.value}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-[11px]">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
