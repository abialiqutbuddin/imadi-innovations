"use client";

import { motion } from "framer-motion";
import { Bot, Code2, Database } from "lucide-react";

export default function ServicesSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    const services = [
        {
            icon: <Code2 className="w-8 h-8 text-brand-orange" />,
            title: "Custom Software Development",
            desc: "Web apps, mobile apps, dashboards, and complete business systems built around your exact process."
        },
        {
            icon: <Bot className="w-8 h-8 text-brand-orange" />,
            title: "AI Automation & Integration",
            desc: "We connect AI to your existing workflows to reduce repetitive tasks, improve accuracy, and increase speed."
        },
        {
            icon: <Database className="w-8 h-8 text-brand-orange" />,
            title: "Cloud & Backend Architecture",
            desc: "Reliable databases, APIs, and secure infrastructure designed to scale with your business."
        }
    ];

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-dark bg-grid-pattern px-5 sm:px-6 py-16 sm:py-20 relative overflow-x-hidden overflow-y-auto">
            <div className="relative z-10 max-w-6xl w-full space-y-12">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-3"
                >
                    <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold">
                        What We Do Best
                    </h2>
                    <h1 className="text-2xl md:text-3xl font-bold font-outfit text-white">
                        Value Pillars
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl hover:bg-white/10 transition-colors group"
                        >
                            <div className="w-14 h-14 bg-brand-navy/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-outfit">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
