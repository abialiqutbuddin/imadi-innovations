"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full border border-brand-navy/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-sm flex items-center justify-center">
                {/* Placeholder to prevent layout shift */}
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className="relative w-10 h-10 rounded-full border border-brand-navy/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center justify-center group"
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-brand-orange" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
        </button>
    );
}
