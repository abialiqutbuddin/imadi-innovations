"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

    /* Transform percentages (-0.5 to 0.5) to degrees - Increased intensity */
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        const xPct = clientX / width - 0.5;
        const yPct = clientY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`perspective-1000 ${className} relative overflow-hidden`}
        >
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
            {/* Glare Effect */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    opacity: useTransform(mouseX, [-0.5, 0, 0.5], [0.3, 0, 0.3]),
                    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)"
                }}
                className="absolute inset-0 pointer-events-none mix-blend-overlay z-50 transition-opacity duration-300"
            />
        </motion.div>
    );
}
