"use client";

import { useEffect } from "react";

export default function SmoothPageScroller() {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
            const hash = anchor?.getAttribute("href");

            if (!anchor || !hash || hash === "#") {
                return;
            }

            const section = document.querySelector(hash);

            if (!section) {
                return;
            }

            event.preventDefault();
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", hash);
        };

        document.addEventListener("click", handleClick);

        return () => document.removeEventListener("click", handleClick);
    }, []);

    return null;
}
