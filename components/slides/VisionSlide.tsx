"use client";

import { motion } from "framer-motion";
import { Lightbulb, RefreshCw, TrendingUp } from "lucide-react";

const visionPoints = [
    {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: "Innovate",
        desc: "Constantly adopting the latest technologies including Cloud architecture, Mobile ecosystems, and AI models to keep your business ahead.",
    },
    {
        icon: <RefreshCw className="w-8 h-8 text-brand-orange" />,
        title: "Automate",
        desc: "Eliminating manual redundancies and reducing human error by embedding intelligent automation into core business processes.",
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-green-400" />,
        title: "Scale",
        desc: "Building robust, custom software architectures designed from the ground up to grow seamlessly alongside your business.",
    },
];

export default function VisionSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-black px-6 md:px-20">
            <motion.h2
                initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={disableAnimations ? { duration: 0 } : { duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold font-outfit text-white mb-16"
            >
                Our Vision
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                {visionPoints.map((point, index) => (
                    <motion.div
                        key={index}
                        initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                        transition={disableAnimations ? { duration: 0 } : { duration: 0.6, delay: index * 0.2 }}
                        className="bg-brand-navy/30 p-8 rounded-2xl border border-white/5 hover:border-brand-orange/50 transition-colors"
                    >
                        <div className="mb-6 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center">
                            {point.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-outfit">{point.title}</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {point.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
