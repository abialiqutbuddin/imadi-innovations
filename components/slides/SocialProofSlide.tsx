"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, Quote, Repeat, Star } from "lucide-react";
import { SocialProofContent, Testimonial } from "@/types";

const defaultSocialProof: SocialProofContent = {
    eyebrow: "Our Impact",
    heading: "Trusted By Businesses Across Industries",
    stats: [
        {
            value: "10+",
            label: "Completed Systems"
        },
        {
            value: "6+",
            label: "Countries Served"
        },
        {
            value: "90%",
            label: "Client Return Rate"
        }
    ],
    industries: [
        "Logistics", "Education", "Wellness", "Hospitality", "Community Platforms", "Retail"
    ],
};

const statIcons = [
    <Building2 key="building" className="w-8 h-8 text-brand-orange" />,
    <Globe2 key="globe" className="w-8 h-8 text-brand-orange" />,
    <Repeat key="repeat" className="w-8 h-8 text-brand-orange" />,
];

interface SocialProofSlideProps {
    disableAnimations?: boolean;
    socialProof?: SocialProofContent;
    testimonials?: Testimonial[];
}

export default function SocialProofSlide({
    disableAnimations = false,
    socialProof = defaultSocialProof,
    testimonials = [],
}: SocialProofSlideProps) {
    const stats = socialProof.stats?.length ? socialProof.stats : defaultSocialProof.stats;
    const industries = socialProof.industries?.length
        ? socialProof.industries
        : defaultSocialProof.industries;

    return (
        <div className="w-full md:h-full flex flex-col justify-center items-center px-5 sm:px-6 py-10 sm:py-20 relative overflow-x-hidden md:overflow-y-auto">
            <div className="relative z-10 max-w-5xl w-full text-center space-y-6 my-auto">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold">
                        {socialProof.eyebrow || defaultSocialProof.eyebrow}
                    </h2>
                    <h1 className="text-2xl md:text-3xl font-bold font-outfit text-gray-900 dark:text-white">
                        {socialProof.heading || defaultSocialProof.heading}
                    </h1>

                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {industries.map((industry, index) => (
                            <span key={index} className="px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-brand-navy/5 dark:border-white/10 text-brand-navy dark:text-gray-200 text-sm shadow-sm group-hover:bg-white/80 transition-colors">
                                {industry}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={disableAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            whileInView={disableAnimations ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 p-5 md:p-6 rounded-2xl flex flex-col items-center justify-center group hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
                        >
                            <div className="mb-3 p-2.5 bg-brand-orange/10 dark:bg-brand-navy/50 rounded-full group-hover:scale-110 transition-transform">
                                {statIcons[index % statIcons.length]}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 font-outfit">
                                {stat.value}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-[11px]">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {testimonials.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 text-left">
                        {testimonials.slice(0, 2).map((testimonial, index) => (
                            <motion.article
                                key={testimonial.id ?? index}
                                initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                                whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/55 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                            >
                                <Quote className="absolute right-5 top-5 h-10 w-10 text-brand-orange/15" />
                                <div className="mb-4 flex items-center gap-1 text-brand-orange">
                                    {Array.from({ length: testimonial.rating || 5 }).map((_, starIndex) => (
                                        <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                                    ))}
                                </div>
                                <p className="relative text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                    &quot;{testimonial.quote}&quot;
                                </p>
                                <div className="mt-5 flex items-center gap-3">
                                    {testimonial.image ? (
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="h-11 w-11 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/10 text-sm font-bold text-brand-orange">
                                            {testimonial.name.slice(0, 1)}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h3>
                                        {(testimonial.role || testimonial.company) && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
