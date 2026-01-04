"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { ArrowDown, PhoneCall } from "lucide-react";
import HeroSlide from "./slides/HeroSlide";
import ParticleBackground from "./visuals/ParticleBackground";
import ServicesSlide from "./slides/ServicesSlide";
import WhyChooseUsSlide from "./slides/WhyChooseUsSlide";
import PortfolioSection from "./PortfolioSection";
import SocialProofSlide from "./slides/SocialProofSlide";
import ProcessSlide from "./slides/ProcessSlide";
import AboutSlide from "./slides/AboutSlide";
import TechStackSlide from "./slides/TechStackSlide";
import ContactSlide from "./slides/ContactSlide";
import MobileLayout from "./MobileLayout";
import { Project } from "@/types";
import { ThemeToggle } from "./ThemeToggle";

interface SlideshowProps {
    projects?: Project[];
}

export default function Slideshow({ projects = [] }: SlideshowProps) {
    const slides = useMemo(
        () => [
            { label: "Overview", note: "Introduction" },
            { label: "Services", note: "What we do" },
            { label: "Why Us", note: "Business Techniques" },
            { label: "Work", note: "Projects Portfolio" },
            { label: "Impact", note: "Results & reach" },
            { label: "Process", note: "How we deliver" },
            { label: "About", note: "Team & roots" },
            { label: "Stack", note: "How we build" },
            { label: "Contact", note: "Talk to us" },
        ],
        []
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperRef, setSwiperRef] = useState<any>(null);
    const progress = Math.max(0, Math.min(100, (activeIndex / (slides.length - 1)) * 100));

    const scrollToProjects = () => {
        if (swiperRef) {
            swiperRef.slideTo(3);
        }
    };

    return (
        <>
            {/* Mobile Layout (Vertical Scroll) */}
            <div className="block md:hidden">
                <MobileLayout projects={projects} />
            </div>

            {/* Desktop Layout (Swiper Slideshow) */}
            <div className="hidden md:block relative w-full h-screen bg-transparent transition-colors duration-300">
                {/* Always-visible chrome for brand recall and CTA */}
                <ParticleBackground />
                <div className="pointer-events-none absolute inset-0 z-30">
                    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-4">
                        <div className="flex items-center gap-3 text-xs">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-white/10 border border-white/10 shadow-lg shadow-brand-orange/20">
                                <Image
                                    src="/logo.jpg"
                                    alt="Imadi Innovations logo"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                    priority
                                />
                            </div>
                            <div className="leading-tight text-foreground flex flex-col justify-center">
                                <p className="text-[14px] font-bold tracking-wide text-brand-orange">
                                    IMADI
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                    Innovations
                                </p>
                            </div>
                        </div>

                        <div className="hidden items-center gap-6 md:flex pointer-events-auto">
                            <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                                <button onClick={() => swiperRef?.slideTo(1)} className="hover:text-foreground transition-colors">Services</button>
                                <button onClick={() => swiperRef?.slideTo(6)} className="hover:text-foreground transition-colors">About Us</button>
                                <button onClick={() => swiperRef?.slideTo(8)} className="hover:text-foreground transition-colors">Contact</button>
                            </nav>
                            <div className="h-4 w-px bg-white/10" />
                            <button
                                onClick={scrollToProjects}
                                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-orange/20 transition-transform hover:scale-105 hover:bg-brand-orange/90"
                            >
                                Projects
                            </button>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Slide indicator & hints */}
                    <div className="absolute bottom-4 left-4 hidden items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gray-500 sm:flex">
                        <ArrowDown className="h-3.5 w-3.5 text-brand-orange" />
                        <span>Scroll or use arrows</span>
                    </div>
                    <div className="absolute bottom-6 right-6 hidden items-center gap-4 text-sm font-medium text-foreground sm:flex">
                        <div className="text-right leading-tight">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                                {slides[activeIndex]?.note}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300">
                                {slides[activeIndex]?.label}
                            </div>
                        </div>
                        <div className="h-px w-28 rounded-full bg-brand-navy/10 dark:bg-white/15">
                            <div
                                className="h-full rounded-full bg-brand-orange transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-sm px-4 py-1.5 text-[12px] tracking-[0.2em] text-brand-navy dark:text-gray-200 border border-brand-navy/5 dark:border-white/10 shadow-sm">
                            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                        </div>
                    </div>
                </div>

                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    spaceBetween={0}
                    mousewheel={true}
                    keyboard={{ enabled: true }}
                    onSwiper={setSwiperRef}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    pagination={{
                        clickable: true,
                        dynamicBullets: false,
                    }}
                    modules={[Mousewheel, Pagination, Keyboard]}
                    className="h-full w-full"
                >
                    {/* 1. Hero (Value + Credibility + CTA) */}
                    <SwiperSlide>
                        <HeroSlide />
                    </SwiperSlide>

                    {/* 2. What We Do (Services) */}
                    <SwiperSlide>
                        <ServicesSlide />
                    </SwiperSlide>

                    {/* 3. Why Choose Us */}
                    <SwiperSlide>
                        <WhyChooseUsSlide />
                    </SwiperSlide>

                    {/* 4. Portfolio Slider */}
                    <SwiperSlide>
                        <PortfolioSection projects={projects} />
                    </SwiperSlide>

                    {/* 5. Social Proof */}
                    <SwiperSlide>
                        <SocialProofSlide />
                    </SwiperSlide>

                    {/* 6. Our Process */}
                    <SwiperSlide>
                        <ProcessSlide />
                    </SwiperSlide>

                    {/* 7. About / Leadership */}
                    <SwiperSlide>
                        <AboutSlide />
                    </SwiperSlide>

                    {/* 8. Tech Stack Strip */}
                    <SwiperSlide>
                        <TechStackSlide />
                    </SwiperSlide>

                    {/* 9. Call-to-Action & Footer */}
                    <SwiperSlide>
                        <ContactSlide />
                    </SwiperSlide>
                </Swiper>
                <style jsx global>{`
                    @media (min-width: 768px) {
                        .swiper-pagination-vertical {
                            top: 60% !important;
                        }
                    }
                `}</style>
            </div>
        </>
    );
}
