"use client";

import { motion } from "framer-motion";

export default function TechStackSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    const stack = [
        { category: "Frontend & Mobile", techs: ["Flutter", "React", "Vite", "Tailwind"] },
        { category: "Backend", techs: ["NestJS", "Node.js", "Django", "Python"] },
        { category: "Database", techs: ["MySQL", "PostgreSQL", "MongoDB", "Prisma"] },
        { category: "Cloud", techs: ["Firebase", "AWS", "Supabase"] }
    ];

    return (
        <div className="w-full md:h-full flex flex-col justify-center items-center px-5 sm:px-6 py-10 sm:py-20 relative overflow-x-hidden md:overflow-y-auto">
            <div className="relative z-10 max-w-6xl w-full text-center space-y-10">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold">
                        Our Toolkit
                    </h2>
                    <h1 className="text-2xl md:text-3xl font-bold font-outfit text-foreground">
                        Technologies We Work With
                    </h1>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-5 md:gap-6">
                    {stack.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={disableAnimations ? { opacity: 1, scale: 0.95 } : { opacity: 0, scale: 0.9 }}
                            whileInView={disableAnimations ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 p-6 rounded-xl hover:bg-white/70 dark:hover:bg-white/10 transition-colors text-center flex flex-col items-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
                        >
                            <h3 className="text-brand-orange font-bold mb-3 font-outfit">
                                {item.category}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {item.techs.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-full text-brand-navy dark:text-gray-300 text-sm border border-brand-navy/5 dark:border-white/10 shadow-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
