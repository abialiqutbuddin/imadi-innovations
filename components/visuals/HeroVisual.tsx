"use client";

import { motion } from "framer-motion";
import { BarChart3, Bot, Code2, Globe2, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroVisual() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[400px] h-[400px] bg-brand-orange/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute w-[300px] h-[300px] bg-brand-navy/10 dark:bg-brand-navy/30 rounded-full blur-[80px] -translate-x-10 translate-y-10" />
            </div>

            {/* Central Element: The "Dashboard" */}
            <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-[320px] sm:w-[380px] bg-white/70 dark:bg-brand-navy/80 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Dashboard Header */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="h-2 w-20 bg-gray-200 dark:bg-white/10 rounded-full ml-4" />
                </div>

                {/* Dashboard Body */}
                <div className="p-5 space-y-4">
                    {/* Stat Row */}
                    <div className="flex gap-4">
                        <div className="flex-1 bg-white/50 dark:bg-black/20 rounded-lg p-3">
                            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center mb-2">
                                <BarChart3 className="w-4 h-4 text-brand-orange" />
                            </div>
                            <div className="h-1.5 w-12 bg-gray-200 dark:bg-white/10 rounded-full mb-1" />
                            <div className="h-3 w-8 bg-brand-navy/80 dark:bg-white/80 rounded-full" />
                        </div>
                        <div className="flex-1 bg-white/50 dark:bg-black/20 rounded-lg p-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                                <Globe2 className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="h-1.5 w-12 bg-gray-200 dark:bg-white/10 rounded-full mb-1" />
                            <div className="h-3 w-8 bg-brand-navy/80 dark:bg-white/80 rounded-full" />
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="h-24 bg-white/50 dark:bg-black/20 rounded-lg p-3 flex items-end gap-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex-1 bg-brand-orange/80 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                            />
                        ))}
                    </div>

                    {/* Code Snippet Area */}
                    <div className="bg-brand-navy/5 dark:bg-black/40 rounded-lg p-3 font-mono text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed overflow-hidden">
                        <div className="flex gap-2">
                            <span className="text-purple-500">const</span>
                            <span className="text-blue-500">future</span>
                            <span>=</span>
                            <span className="text-brand-orange">await innovation();</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                            <span className="text-purple-500">if</span>
                            <span>(ready)</span>
                            <span className="text-green-500">scale();</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Element 1: AI Badge */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[50%] xs:left-[60%] sm:right-[10%] bg-white/80 dark:bg-brand-navy/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/60 dark:border-white/10 flex items-center gap-3 z-20"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <Bot className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs font-bold text-foreground">AI Powered</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Optimization Active</div>
                </div>
            </motion.div>

            {/* Floating Element 2: Code/Tech */}
            <motion.div
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] left-[5%] md:left-[-5%] bg-white/80 dark:bg-brand-navy/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/60 dark:border-white/10 flex items-center gap-3 z-20"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white shadow-lg">
                    <Code2 className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs font-bold text-foreground">Full Stack</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Robust Architecture</div>
                </div>
            </motion.div>

            {/* Floating Element 3: Speed/Performance */}
            <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[40%] right-[-5%] md:right-[0%] bg-white/80 dark:bg-brand-navy/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/60 dark:border-white/10 flex items-center gap-3 z-20"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-amber-300 flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs font-bold text-foreground">Lightning Fast</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">99.9% Uptime</div>
                </div>
            </motion.div>
        </div>
    );
}
