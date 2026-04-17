import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import ProjectsIntroSlide from "./slides/ProjectsIntroSlide";
import PortfolioSlide from "./slides/PortfolioSlide";
import MobileProjectCard from "./MobileProjectCard";

import { Project } from "@/types";

interface PortfolioSectionProps {
    projects: Project[];
}

export default function PortfolioSection({ projects = [] }: PortfolioSectionProps) {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full h-full relative group">
            {/* Mobile View */}
            <div className="block md:hidden w-full pb-6 pt-10 px-5">
                <div className="mb-6 space-y-2 text-center">
                    <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold">
                        Our Portfolio
                    </h2>
                    <h1 className="text-2xl font-bold font-outfit text-foreground">
                        Featured Projects
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
                        Explore our diverse range of solutions.
                    </p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-5 px-5 no-scrollbar">
                    {projects.map((project, index) => (
                        <MobileProjectCard key={index} {...project} />
                    ))}
                    <div className="w-1 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-center gap-2 text-brand-orange font-medium uppercase tracking-widest text-xs animate-pulse mt-2">
                    <span>Swipe Right to Explore</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block w-full h-full">
                <Swiper
                    direction="horizontal"
                    slidesPerView={1}
                    spaceBetween={0}
                    nested={true}
                    keyboard={{ enabled: true }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    navigation={{ prevEl, nextEl }}
                    modules={[Navigation, Keyboard]}
                    className="h-full w-full portfolio-swiper"
                >
                    <SwiperSlide>
                        <ProjectsIntroSlide />
                    </SwiperSlide>

                    {projects.map((project, index) => (
                        <SwiperSlide key={index}>
                            <PortfolioSlide
                                {...project}
                                type={project.type as "Web" | "Mobile" | "Web & Mobile"}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Control Bar - Simplified: Arrows + Centered Counter */}
                <div className="absolute bottom-12 left-0 right-0 mx-auto w-fit z-50 pointer-events-none">
                    <div className="flex items-center gap-4 bg-brand-navy/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 shadow-2xl pointer-events-auto hover:bg-brand-navy transition-colors">

                        <button
                            ref={setPrevEl}
                            className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 transition-all disabled:opacity-20"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Counter - Centered */}
                        <div className="text-[10px] font-medium tracking-widest text-white/70 font-mono min-w-[70px] text-center">
                            {activeIndex === 0 ? "SWIPE RIGHT" : `${String(activeIndex).padStart(2, "0")}/${String(projects.length).padStart(2, "0")}`}
                        </div>

                        <button
                            ref={setNextEl}
                            className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 transition-all disabled:opacity-20"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
