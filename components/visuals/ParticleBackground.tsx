"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 25 }, (_, index) => {
    const x = (index * 37) % 100;
    const y = (index * 53) % 100;

    return {
        x: `${x}vw`,
        y: `${y}vh`,
        pathX: [`${x}vw`, `${(x + 24) % 100}vw`, `${(x + 52) % 100}vw`],
        pathY: [`${y}vh`, `${(y + 31) % 100}vh`, `${(y + 67) % 100}vh`],
        duration: 15 + (index % 8),
    };
});

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: particle.x,
                        y: particle.y,
                        opacity: 0,
                    }}
                    animate={{
                        x: particle.pathX,
                        y: particle.pathY,
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-orange/40 dark:bg-brand-orange/30 rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
}
