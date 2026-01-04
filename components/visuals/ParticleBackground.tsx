"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ParticleBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Increased count for better visibility
    const particles = Array.from({ length: 25 });

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                        opacity: 0,
                    }}
                    animate={{
                        x: [
                            Math.random() * 1000,
                            Math.random() * 1000,
                            Math.random() * 1000,
                        ],
                        y: [
                            Math.random() * 800,
                            Math.random() * 800,
                            Math.random() * 800,
                        ],
                        opacity: [0.3, 0.6, 0.3], // Increased opacity range
                    }}
                    transition={{
                        duration: 15 + Math.random() * 15, // Slightly faster
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-orange/40 dark:bg-brand-orange/30 rounded-full blur-[1px]" // Larger and more visible
                />
            ))}
        </div>
    );
}
