import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProjectsIntroSlide from "./slides/ProjectsIntroSlide";
import PortfolioSlide from "./slides/PortfolioSlide";
import MobileProjectCard from "./MobileProjectCard";

export default function PortfolioSection() {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);


    const projects = [
        {
            title: "Portfolio: Restro",
            headline: "Catering Automation System",
            description: "A complete operation system for catering teams: Google Calendar synchronization, smart scheduling, menu builders, invoicing, and KPI dashboards. Impact: Reduced manual coordination by 70%.",
            type: "Web & Mobile",
            features: [
                { title: "Smart Scheduling", desc: "Auto-fetches events from Google Calendar." },
                { title: "Order Management", desc: "Custom entry for items, catering types, and pricing." },
                { title: "Financials", desc: "Invoicing, payment tracking, and KPI dashboards." },
            ],
            techStack: "Flutter, NestJS, MySQL",
            desktopImg: "/projects/restro-desktop.png"
        },
        {
            title: "Portfolio: Community PM Tool",
            headline: "Collaborative Project Ecosystem",
            description: "A platform for community-driven project teams with Gantt charts, task tracking, channels, and real-time chat. Impact: Replaced scattered WhatsApp + Excel workflows with a single source of truth.",
            type: "Web",
            features: [
                { title: "Interactive Gantt charts", desc: "Visual planning & KPI dashboards." },
                { title: "Issue tracking", desc: "With assigning & tagging." },
                { title: "Real-time chat", desc: "Interface with channels." },
            ],
            techStack: "React + Vite, NestJS, Prisma",
            desktopImg: "/projects/community-desktop.png"
        },
        {
            title: "Portfolio: DockiShip",
            headline: "3PL Inventory Management",
            description: "A third-party logistics system connecting suppliers and warehouses with real-time stock, inbound shipment tracking, and direct shipping. Impact: Streamlined warehouse-to-customer flow for multi-supplier operations.",
            type: "Web",
            features: [
                { title: "Inventory Control", desc: "Real-time tracking and supplier linking." },
                { title: "Warehouse Logistics", desc: "Inbound shipment tracking." },
                { title: "Direct Shipping", desc: "Seamless processing from warehouse to customer." },
            ],
            techStack: "React, Node.js, MySQL",
            desktopImg: "/projects/dockiship-desktop.png"
        },
        {
            title: "Portfolio: Magnet Cargo",
            headline: "End-to-End Logistics",
            description: "A complete shipping ecosystem: booking engine, admin dashboard, rider app, and operational KPIs. Impact: Improved transparency and delivery accuracy across the entire lifecycle.",
            type: "Web & Mobile",
            features: [
                { title: "Customer Portal", desc: "Booking engine & service selection." },
                { title: "Admin Control", desc: "Rider management & KPI dashboards." },
                { title: "Rider Portal", desc: "Dedicated app for delivery assignments." },
            ],
            techStack: "React, NestJS, Prisma",
            desktopImg: "/projects/magnet-desktop.png"
        },
        {
            title: "Portfolio: OWS",
            headline: "Smart Education Assistance Portal",
            description: "A guided aid system for students from Nursery to PhD, including dynamic forms, smart routing, and verification flows. Impact: Digitized processes that were previously fully manual.",
            type: "Web",
            features: [
                { title: "Smart Routing", desc: "Logic-based application routing to programs." },
                { title: "Dynamic Forms", desc: "Customized forms based on student grade." },
                { title: "Admin Oversight", desc: "Centralized verification and review." },
            ],
            techStack: "Flutter, Node.js, MySQL",
            desktopImg: "/projects/ows-desktop.png",
            mobileImg: "/projects/ows-mobile.png"
        },
        {
            title: "Portfolio: NutriLife",
            headline: "AI-Powered Wellness App",
            description: "Connects users with certified nutritionists, includes smart chat, AI recipe suggestions, and nutrition insights. Impact: Enabled dieticians to scale their client communication 3×.",
            type: "Mobile",
            features: [
                { title: "Direct Connect", desc: "Chat interface with nutritionists." },
                { title: "AI Chef", desc: "Suggests recipes based on ingredients user has." },
                { title: "Insights", desc: "Deep analytics on nutritional intake." },
            ],
            techStack: "Flutter, Firebase, AI Integration",
            mobileImg: "/projects/nutrilife-mobile.png",
            hideDesktop: true
        }
    ];

    return (
        <div className="w-full h-full relative group">
            {/* Mobile View: Horizontal Scroll (Carousel) */}
            <div className="block md:hidden w-full pb-6 pt-10 px-5">
                {/* Custom Mobile Header */}
                <div className="mb-6 space-y-2 text-center">
                    <h2 className="text-brand-orange uppercase tracking-widest text-[11px] font-semibold">
                        Our Portfolio
                    </h2>
                    <h1 className="text-2xl font-bold font-outfit text-white">
                        Featured Projects
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
                        Explore our diverse range of solutions, from enterprise-grade web platforms to consumer-facing mobile applications.
                    </p>
                </div>

                {/* Carousel */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-5 px-5 no-scrollbar">
                    {projects.map((project, index) => (
                        <MobileProjectCard
                            key={index}
                            {...project}
                        />
                    ))}
                    {/* Spacer for end of list */}
                    <div className="w-1 flex-shrink-0" />
                </div>

                {/* Swipe Instruction - Below Carousel */}
                <div className="flex items-center justify-center gap-2 text-brand-orange font-medium uppercase tracking-widest text-xs animate-pulse mt-2">
                    <span>Swipe Right to Explore</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>

            {/* Desktop View: Swiper */}
            <div className="hidden md:block w-full h-full">
                <Swiper
                    direction="horizontal"
                    slidesPerView={1}
                    spaceBetween={0}
                    nested={true}
                    navigation={{
                        prevEl,
                        nextEl,
                    }}
                    keyboard={{ enabled: true }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    modules={[Navigation, Pagination, Keyboard]}
                    className="h-full w-full portfolio-swiper"
                >
                    {/* Intro Slide */}
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

                {/* Custom Navigation Buttons */}
                <button
                    ref={setPrevEl}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Previous Project"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    ref={setNextEl}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Next Project"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
