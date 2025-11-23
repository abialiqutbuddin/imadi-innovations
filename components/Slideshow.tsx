"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { ArrowDown, PhoneCall } from "lucide-react";
import HeroSlide from "./slides/HeroSlide";
import ServicesSlide from "./slides/ServicesSlide";
import WhyChooseUsSlide from "./slides/WhyChooseUsSlide";
import PortfolioSection from "./PortfolioSection";
import SocialProofSlide from "./slides/SocialProofSlide";
import ProcessSlide from "./slides/ProcessSlide";
import AboutSlide from "./slides/AboutSlide";
import TechStackSlide from "./slides/TechStackSlide";
import ContactSlide from "./slides/ContactSlide";

export default function Slideshow() {
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
    const progress = Math.max(0, Math.min(100, (activeIndex / (slides.length - 1)) * 100));

    return (
        <div className="relative w-full h-screen bg-black">
            {/* Always-visible chrome for brand recall and CTA */}
            <div className="pointer-events-none absolute inset-0 z-30">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-4">
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
                        <div className="leading-tight text-gray-300">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-brand-orange/80">
                                Imadi Innovations
                            </p>
                            <p className="text-[11px] text-gray-400">
                                Software Development
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <a
                            href="https://wa.me/923330365252"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur transition hover:border-brand-orange hover:bg-brand-orange/90 hover:text-black"
                        >
                            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Slide indicator & hints */}
                <div className="absolute bottom-4 left-4 hidden items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gray-500 sm:flex">
                    <ArrowDown className="h-3.5 w-3.5 text-brand-orange" />
                    <span>Scroll or use arrows</span>
                </div>
                <div className="absolute bottom-6 right-6 hidden items-center gap-4 text-sm font-medium text-white sm:flex">
                    <div className="text-right leading-tight">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            {slides[activeIndex]?.note}
                        </div>
                        <div className="text-xs text-gray-300">
                            {slides[activeIndex]?.label}
                        </div>
                    </div>
                    <div className="h-px w-28 rounded-full bg-white/15">
                        <div
                            className="h-full rounded-full bg-brand-orange transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="rounded-full bg-white/5 px-3 py-1 text-[12px] tracking-[0.2em] text-gray-200 border border-white/10">
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
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
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
                    <PortfolioSection />
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
        </div >
    );
}
