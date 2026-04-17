"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AppBackground() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    // Brand-aligned colors
    // Dark: Deep navy with purple undertones
    // Light: Warm cream/white with subtle orange warmth
    const bgColor = isDark ? "#0a1628" : "#fffbf5";
    const gradient = isDark
        ? "linear-gradient(135deg, #0a1628 0%, #102a43 40%, #1e3a5f 100%)"
        : "linear-gradient(135deg, #fffbf5 0%, #fff8ef 30%, #fef3e2 100%)";

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: -1,
                overflow: "hidden",
                pointerEvents: "none",
                backgroundColor: bgColor,
                transition: "background-color 0.5s ease",
            }}
        >
            {/* Base Gradient Layer */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: gradient,
                    transition: "background 0.5s ease",
                }}
            />

            {/* Animated Orbs - Brand aligned */}
            <div style={{ position: "absolute", inset: 0, opacity: isDark ? 0.6 : 0.5 }}>
                {/* Primary Orange Orb - Brand Orange */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: "absolute",
                        top: "-10%",
                        left: "-10%",
                        width: "70vw",
                        height: "70vw",
                        borderRadius: "50%",
                        filter: "blur(100px)",
                        backgroundColor: isDark
                            ? "rgba(245, 158, 11, 0.25)"
                            : "rgba(245, 158, 11, 0.12)",
                        transition: "background-color 0.5s ease",
                    }}
                />

                {/* Secondary Navy Orb - Brand Navy */}
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    style={{
                        position: "absolute",
                        top: "20%",
                        right: "-10%",
                        width: "60vw",
                        height: "60vw",
                        borderRadius: "50%",
                        filter: "blur(120px)",
                        backgroundColor: isDark
                            ? "rgba(16, 42, 67, 0.5)"
                            : "rgba(16, 42, 67, 0.08)",
                        transition: "background-color 0.5s ease",
                    }}
                />

                {/* Bottom Warm Accent Orb */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5,
                    }}
                    style={{
                        position: "absolute",
                        bottom: "-20%",
                        left: "20%",
                        width: "50vw",
                        height: "50vw",
                        borderRadius: "50%",
                        filter: "blur(100px)",
                        backgroundColor: isDark
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(251, 191, 36, 0.1)",
                        transition: "background-color 0.5s ease",
                    }}
                />
            </div>
        </div>
    );
}
