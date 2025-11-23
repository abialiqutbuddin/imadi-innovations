"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

export default function ProcessSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    const steps = [
        {
            icon: <Search className="w-6 h-6 text-white" />,
            title: "Discovery & Requirements",
            desc: "We understand your workflow, pain points, and desired outcomes."
        },
        {
            icon: <PenTool className="w-6 h-6 text-white" />,
            title: "Design & Architecture",
            desc: "Wireframes, user flows, and a system blueprint to make sure everything is aligned."
        },
        {
            icon: <Code className="w-6 h-6 text-white" />,
            title: "Development Sprints",
            desc: "Weekly progress demos, stable builds, and constant communication."
        },
        {
            icon: <Rocket className="w-6 h-6 text-white" />,
            title: "Launch & Support",
            desc: "Deployment, training, monitoring, and long-term iteration."
        }
    ];

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-dark bg-grid-pattern px-5 sm:px-6 py-16 sm:py-20 relative overflow-x-hidden overflow-y-auto">
            <div className="relative z-10 max-w-6xl w-full space-y-12">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold">
                        Our Process
                    </h2>
                    <h1 className="text-2xl md:text-3xl font-bold font-outfit text-white">
                        How We Build Software That Actually Works
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-white/10 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-brand-navy border-4 border-brand-dark flex items-center justify-center mb-6 relative z-10 group-hover:border-brand-orange transition-colors">
                                {step.icon}
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl w-full h-full hover:bg-white/10 transition-colors">
                                <div className="text-brand-orange font-bold text-lg mb-2">0{index + 1}</div>
                                <h3 className="text-lg font-bold text-white mb-3 font-outfit leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
