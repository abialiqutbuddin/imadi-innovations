"use client";

import { motion } from "framer-motion";
import { Loader2, ArrowDown } from "lucide-react";
import { useState } from "react";

interface PortfolioSlideProps {
    title: string;
    headline: string;
    description: string;
    type: "Web" | "Mobile" | "Web & Mobile"; // New prop for project type
    features: { title: string; desc: string }[];
    techStack: string;
    desktopImg?: string; // Path to desktop image in public folder
    mobileImg?: string;  // Path to mobile image in public folder
    hideDesktop?: boolean; // Option to hide desktop frame
    disableAnimations?: boolean;
}

export default function PortfolioSlide({
    title,
    headline,
    description,
    type,
    features,
    techStack,
    desktopImg,
    mobileImg,
    hideDesktop = false,
    disableAnimations = false,
}: PortfolioSlideProps) {
    const [desktopError, setDesktopError] = useState(false);
    const [mobileError, setMobileError] = useState(false);

    return (
        <div className="w-full h-full flex flex-col lg:flex-row bg-brand-dark bg-grid-pattern overflow-x-hidden overflow-y-auto lg:overflow-y-hidden">
            {/* Content Side */}
            <div className="w-full lg:w-1/2 h-full flex flex-col px-6 md:px-12 lg:px-16 pt-28 pb-24 z-10 bg-brand-dark/90 backdrop-blur-sm overflow-y-auto no-scrollbar">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    whileInView={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                    transition={disableAnimations ? { duration: 0 } : { duration: 0.6 }}
                    className="my-auto" // Center vertically if content is short
                >
                    <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-2 block">
                        {title}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold font-outfit text-white mb-3 lg:mb-4">
                        {headline}
                    </h2>

                    {/* Project Type Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[rgba(245,158,11,1)] animate-pulse" />
                            {type} Application
                        </span>
                    </div>

                    <p className="text-gray-300 text-xs sm:text-xs lg:text-sm mb-4 md:mb-6 lg:mb-8 leading-relaxed">
                        {description}
                    </p>

                    <div className="space-y-4 md:space-y-5 lg:space-y-6 mb-6 lg:mb-8">
                        {features.map((feature, index) => (
                            <div key={index} className="border-l-2 border-[rgba(245,158,11,0.3)] pl-4">
                                <h4 className="text-white font-semibold mb-1 text-base">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="inline-block bg-white/5 rounded-lg px-4 py-2 border border-white/10">
                        <span className="text-gray-400 text-sm">Tech Stack: </span>
                        <span className="text-[rgba(245,158,11,1)] font-medium text-sm">{techStack}</span>
                    </div>

                    {/* Mobile Visuals Toggle Hint */}
                    <div className="lg:hidden mt-6">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Scroll down to see visuals
                        </p>
                        <ArrowDown className="w-5 h-5 text-brand-orange animate-bounce" />
                    </div>
                </motion.div>
            </div>

            {/* Visual Side with Device Frames */}
            <div className={`w-full lg:w-1/2 relative flex items-center justify-center p-8 lg:p-12 ${disableAnimations ? 'bg-[#102a43]' : 'bg-gradient-to-br from-brand-navy to-black'}`}>
                {/* Abstract Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[rgba(245,158,11,0.1)] rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[rgba(16,42,67,0.2)] rounded-full blur-[80px]" />
                </div>

                <div className="relative w-full max-w-2xl h-[50vh] lg:h-[60vh] flex items-center justify-center">
                    {/* Monitor Frame - Only show if not hidden */}
                    {!hideDesktop && (
                        <motion.div
                            initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            transition={disableAnimations ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
                            // Use aspect-video to enforce 16:9 ratio, ensuring image fills it correctly
                            className="absolute top-0 left-0 w-[90%] aspect-video bg-gray-800 rounded-xl border-[8px] border-gray-700 shadow-2xl overflow-hidden z-10 flex flex-col"
                        >
                            {/* Screen Content */}
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center relative group overflow-hidden flex-grow">
                                {desktopImg && !desktopError ? (
                                    <img
                                        src={desktopImg}
                                        alt={`${title} Desktop`}
                                        className="w-full h-full object-cover object-top"
                                        onError={() => setDesktopError(true)}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-center p-4 h-full">
                                        <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-[rgba(245,158,11,1)] animate-spin" />
                                        </div>
                                        <h3 className="text-white font-outfit font-bold text-xl mb-2">Under Development</h3>
                                        <p className="text-gray-400 text-sm">Visuals coming soon</p>

                                        {/* Scanning effect - Hide in print mode */}
                                        {!disableAnimations && (
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(245,158,11,0.05)] to-transparent h-[50%] w-full animate-scan pointer-events-none" />
                                        )}
                                    </div>
                                )}
                            </div>
                            {/* Monitor Stand */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-700 rounded-b-lg" />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600" />
                        </motion.div>
                    )}

                    {/* Mobile Frame */}
                    <motion.div
                        initial={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        whileInView={disableAnimations ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                        transition={disableAnimations ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
                        className={`absolute ${hideDesktop ? 'left-1/2 -translate-x-1/2 w-[40%]' : 'bottom-0 right-4 md:right-12 w-[25%]'} aspect-[9/19] bg-gray-800 rounded-[2rem] border-[6px] border-gray-700 shadow-2xl overflow-hidden z-20`}
                    >
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-gray-700 rounded-b-xl z-30" />

                        {/* Screen Content */}
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center relative group overflow-hidden">
                            {mobileImg && !mobileError ? (
                                <img
                                    src={mobileImg}
                                    alt={`${title} Mobile`}
                                    className="w-full h-full object-cover"
                                    onError={() => setMobileError(true)}
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-center p-4">
                                    <div className="w-12 h-12 mb-3 rounded-full bg-white/5 flex items-center justify-center relative overflow-hidden">
                                        <Loader2 className="w-6 h-6 text-[rgba(245,158,11,1)] animate-spin relative z-10" />
                                        <div className="absolute inset-0 bg-[rgba(245,158,11,0.2)] animate-pulse" />
                                    </div>
                                    <h3 className="text-white font-outfit font-bold text-sm mb-1">Under Development</h3>
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Coding in progress</p>

                                    {/* Coding Animation Effect */}
                                    <div className="mt-4 w-3/4 space-y-2 opacity-50">
                                        <div className="h-1 bg-[rgba(245,158,11,0.3)] rounded w-full animate-pulse" style={{ animationDelay: '0ms' }} />
                                        <div className="h-1 bg-[rgba(245,158,11,0.2)] rounded w-2/3 animate-pulse" style={{ animationDelay: '150ms' }} />
                                        <div className="h-1 bg-[rgba(245,158,11,0.2)] rounded w-4/5 animate-pulse" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
