"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Users, Layout } from "lucide-react";

export default function WhyChooseUsSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    const reasons = [
        {
            icon: <CheckCircle2 className="w-6 h-6 text-brand-orange" />,
            title: "Built for real operations",
            desc: "We design systems your team can actually use—not theoretical features that get ignored."
        },
        {
            icon: <Clock className="w-6 h-6 text-brand-orange" />,
            title: "Fast execution",
            desc: "Weekly demos, predictable sprints, and clear communication so you always know what’s happening."
        },
        {
            icon: <Layout className="w-6 h-6 text-brand-orange" />,
            title: "Human-centered design",
            desc: "Interfaces your team instantly understands, even without training."
        },
        {
            icon: <Users className="w-6 h-6 text-brand-orange" />,
            title: "Full-stack, remote team",
            desc: "Engineers, designers, QA, and PMs working together as one integrated unit."
        }
    ];

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-dark bg-grid-pattern px-5 sm:px-6 py-16 sm:py-20 relative overflow-x-hidden overflow-y-auto">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 to-brand-dark pointer-events-none" />

            <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center">

                {/* Left Side: Heading */}
                <div className="w-full md:w-1/3 text-center md:text-left">
                    <motion.div
                        initial={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        whileInView={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold mb-2">
                            Why Choose Us
                        </h2>
                        <h1 className="text-2xl md:text-3xl font-bold font-outfit text-white mb-3">
                            Why Businesses Work With Us
                        </h1>
                        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                            We don&apos;t just write code; we solve business problems with technology that works in the real world.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Grid */}
                <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-6 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-brand-navy/50 p-2 rounded-lg">
                                    {reason.icon}
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-outfit">
                                        {reason.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {reason.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
