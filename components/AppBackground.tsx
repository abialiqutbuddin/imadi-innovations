"use client";

import { useTheme } from "next-themes";

export default function AppBackground() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const bgColor = isDark ? "#020919" : "#ffffff";
    const gradient = isDark
        ? "linear-gradient(135deg, #020919 0%, #0b1531 52%, #150f3d 100%)"
        : "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)";

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
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: gradient,
                    transition: "background 0.5s ease",
                }}
            />
        </div>
    );
}
