"use client";

import Image from "next/image";
import HeroSlide from "./slides/HeroSlide";
import ServicesSlide from "./slides/ServicesSlide";
import WhyChooseUsSlide from "./slides/WhyChooseUsSlide";
import PortfolioSection from "./PortfolioSection";
import SocialProofSlide from "./slides/SocialProofSlide";
import ProcessSlide from "./slides/ProcessSlide";
import AboutSlide from "./slides/AboutSlide";
import TechStackSlide from "./slides/TechStackSlide";
import ContactSlide from "./slides/ContactSlide";

import { Project } from "@/types";
import { ThemeToggle } from "./ThemeToggle";

interface MobileLayoutProps {
    projects: Project[];
}

export default function MobileLayout({ projects }: MobileLayoutProps) {
    return (
        <div className="w-full min-h-screen bg-transparent text-foreground overflow-x-hidden">
            {/* Mobile Header - Floating */}
            <div className="fixed top-4 left-4 right-4 z-50 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 flex items-center justify-between shadow-2xl shadow-black/40">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-[1px] overflow-hidden shadow-inner">
                        <div className="w-full h-full rounded-[10px] overflow-hidden relative">
                            <Image
                                src="/logo.jpg"
                                alt="Imadi Innovations"
                                width={36}
                                height={36}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold tracking-wide text-brand-orange leading-tight">
                            IMADI
                        </span>
                        <span className="text-[9px] text-gray-400 tracking-wider uppercase font-medium">
                            Innovations
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="#portfolio"
                        className="px-4 py-2 rounded-full bg-brand-orange text-[11px] font-bold text-white shadow-lg shadow-brand-orange/20"
                    >
                        Projects
                    </a>
                    <ThemeToggle />
                </div>
            </div>

            {/* Content Stack */}
            <div className="pt-24 pb-0 space-y-0">
                <section id="hero">
                    <HeroSlide />
                </section>

                <section id="services">
                    <ServicesSlide />
                </section>

                <section id="why-us">
                    <WhyChooseUsSlide />
                </section>

                <section id="portfolio">
                    <PortfolioSection projects={projects} />
                </section>

                <section id="social-proof">
                    <SocialProofSlide />
                </section>

                <section id="process">
                    <ProcessSlide />
                </section>

                <section id="about">
                    <AboutSlide />
                </section>

                <section id="tech-stack">
                    <TechStackSlide />
                </section>

                <section id="contact" className="min-h-[60vh]">
                    <ContactSlide />
                </section>
            </div>
        </div>
    );
}
