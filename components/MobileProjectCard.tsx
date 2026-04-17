"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface MobileProjectCardProps {
    title: string;
    headline: string;
    description: string;
    type: string;
    techStack: string;
    desktopImg?: string;
    mobileImg?: string;
    hideDesktop?: boolean;
}

export default function MobileProjectCard({
    title,
    headline,
    description,
    type,
    techStack,
    desktopImg,
    mobileImg,
    hideDesktop = false,
}: MobileProjectCardProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="w-[85vw] sm:w-[350px] flex-shrink-0 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden snap-center flex flex-col">
            {/* Image Area - "The Frame" */}
            <div className="h-[220px] bg-gradient-to-br from-brand-navy/10 dark:from-brand-navy/30 to-gray-100 dark:to-black relative flex items-center justify-center p-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-orange/10 rounded-full blur-[40px]" />

                {!hideDesktop ? (
                    // Laptop Frame
                    <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg border-[4px] border-gray-300 dark:border-gray-700 shadow-xl flex flex-col">
                        {/* Screen */}
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
                            {desktopImg && !imgError ? (
                                <img
                                    src={desktopImg}
                                    alt={title}
                                    className="w-full h-full object-cover object-top"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 text-brand-orange animate-spin" />
                                </div>
                            )}
                        </div>
                        {/* Base */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[120%] h-3 bg-gray-300 dark:bg-gray-700 rounded-b-md" />
                    </div>
                ) : (
                    // Mobile Frame
                    <div className="relative h-full aspect-[9/19] bg-gray-200 dark:bg-gray-800 rounded-[1.5rem] border-[4px] border-gray-300 dark:border-gray-700 shadow-xl overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-3 bg-gray-300 dark:bg-gray-700 rounded-b-lg z-10" />

                        {/* Screen */}
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
                            {mobileImg && !imgError ? (
                                <img
                                    src={mobileImg}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 text-brand-orange animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-brand-orange text-xs font-bold tracking-wider uppercase">
                        {title.replace("Portfolio: ", "")}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[10px] text-foreground font-medium border border-gray-200 dark:border-white/10">
                        {type}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-foreground font-outfit mb-2 leading-tight">
                    {headline}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                    {description}
                </p>

                <div className="pt-4 border-t border-gray-200 dark:border-white/5">
                    <p className="text-xs text-gray-500 mb-1">Tech Stack</p>
                    <p className="text-brand-orange text-xs font-medium truncate">
                        {techStack}
                    </p>
                </div>
            </div>
        </div>
    );
}
