"use client";

import { motion } from "framer-motion";
import { Bot, Code2, Database } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

export default function ServicesSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    const services = [
        {
            icon: <Code2 className="w-8 h-8 text-[var(--brand-primary)]" />,
            title: "Custom Software Development",
            desc: "Web apps, mobile apps, dashboards, and complete business systems built around your exact process."
        },
        {
            icon: <Bot className="w-8 h-8 text-[var(--brand-primary)]" />,
            title: "AI Automation & Integration",
            desc: "We connect AI to your existing workflows to reduce repetitive tasks, improve accuracy, and increase speed."
        },
        {
            icon: <Database className="w-8 h-8 text-[var(--brand-primary)]" />,
            title: "Cloud & Backend Architecture",
            desc: "Reliable databases, APIs, and secure infrastructure designed to scale with your business."
        }
    ];

    return (
        <div className="w-full md:min-h-screen flex flex-col items-center px-5 sm:px-6 pt-4 pb-10 sm:pt-28 sm:pb-24 relative overflow-x-hidden md:overflow-y-auto">
            <div className="relative z-10 max-w-6xl w-full space-y-12">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-3"
                >
                    <h2 className="text-section-label">
                        What We Do Best
                    </h2>
                    <h1 className="text-section-title">
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
                        >
                            <SpotlightCard className="card-service group">
                                <div className="icon-box">
                                    {service.icon}
                                </div>
                                <h3 className="text-card-title mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-card-desc">
                                    {service.desc}
                                </p>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
