import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProjectsIntroSlide from "./slides/ProjectsIntroSlide";
import PortfolioSlide from "./slides/PortfolioSlide";

export default function PortfolioSection() {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

    return (
        <div className="w-full h-full bg-black relative group">
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

                {/* Portfolio: Restro */}
                <SwiperSlide>
                    <PortfolioSlide
                        title="Portfolio: Restro"
                        headline="Catering Automation System"
                        description="A complete operation system for catering teams: Google Calendar synchronization, smart scheduling, menu builders, invoicing, and KPI dashboards. Impact: Reduced manual coordination by 70%."
                        type="Web & Mobile"
                        features={[
                            { title: "Smart Scheduling", desc: "Auto-fetches events from Google Calendar." },
                            { title: "Order Management", desc: "Custom entry for items, catering types, and pricing." },
                            { title: "Financials", desc: "Invoicing, payment tracking, and KPI dashboards." },
                        ]}
                        techStack="Flutter, NestJS, MySQL"
                        desktopImg="/projects/restro-desktop.png"
                    />
                </SwiperSlide>

                {/* Portfolio: Community PM Tool */}
                <SwiperSlide>
                    <PortfolioSlide
                        title="Portfolio: Community PM Tool"
                        headline="Collaborative Project Ecosystem"
                        description="A platform for community-driven project teams with Gantt charts, task tracking, channels, and real-time chat. Impact: Replaced scattered WhatsApp + Excel workflows with a single source of truth."
                        type="Web"
                        features={[
                            { title: "Interactive Gantt charts", desc: "Visual planning & KPI dashboards." },
                            { title: "Issue tracking", desc: "With assigning & tagging." },
                            { title: "Real-time chat", desc: "Interface with channels." },
                        ]}
                        techStack="React + Vite, NestJS, Prisma"
                        desktopImg="/projects/community-desktop.png"
                    />
                </SwiperSlide>

                {/* Portfolio: DockiShip */}
                <SwiperSlide>
                    <PortfolioSlide
                        title="Portfolio: DockiShip"
                        headline="3PL Inventory Management"
                        description="A third-party logistics system connecting suppliers and warehouses with real-time stock, inbound shipment tracking, and direct shipping. Impact: Streamlined warehouse-to-customer flow for multi-supplier operations."
                        type="Web"
                        features={[
                            { title: "Inventory Control", desc: "Real-time tracking and supplier linking." },
                            { title: "Warehouse Logistics", desc: "Inbound shipment tracking." },
                            { title: "Direct Shipping", desc: "Seamless processing from warehouse to customer." },
                        ]}
                        techStack="React, Node.js, MySQL"
                        desktopImg="/projects/dockiship-desktop.png"
                    />
                </SwiperSlide>

                {/* Portfolio: Magnet Cargo */}
                <SwiperSlide>
                    <PortfolioSlide
                        title="Portfolio: Magnet Cargo"
                        headline="End-to-End Logistics"
                        description="A complete shipping ecosystem: booking engine, admin dashboard, rider app, and operational KPIs. Impact: Improved transparency and delivery accuracy across the entire lifecycle."
                        type="Web & Mobile"
                        features={[
                            { title: "Customer Portal", desc: "Booking engine & service selection." },
                            { title: "Admin Control", desc: "Rider management & KPI dashboards." },
                            { title: "Rider Portal", desc: "Dedicated app for delivery assignments." },
                        ]}
                        techStack="React, NestJS, Prisma"
                        desktopImg="/projects/magnet-desktop.png"
                    />
                </SwiperSlide>

                {/* Portfolio: OWS */}
                <SwiperSlide>
                    <PortfolioSlide
                        title="Portfolio: OWS"
                        headline="Smart Education Assistance Portal"
                        description="A guided aid system for students from Nursery to PhD, including dynamic forms, smart routing, and verification flows. Impact: Digitized processes that were previously fully manual."
                        type="Web"
                        features={[
                            { title: "Smart Routing", desc: "Logic-based application routing to programs." },
                            { title: "Dynamic Forms", desc: "Customized forms based on student grade." },
                            { title: "Admin Oversight", desc: "Centralized verification and review." },
                        ]}
                        techStack="Flutter, Node.js, MySQL"
                        desktopImg="/projects/ows-desktop.png"
                        mobileImg="/projects/ows-mobile.png"
                    />
                </SwiperSlide>

                {/* Portfolio: NutriLife */}
                <SwiperSlide>
                    <PortfolioSlide
                        title="Portfolio: NutriLife"
                        headline="AI-Powered Wellness App"
                        description="Connects users with certified nutritionists, includes smart chat, AI recipe suggestions, and nutrition insights. Impact: Enabled dieticians to scale their client communication 3×."
                        type="Mobile"
                        features={[
                            { title: "Direct Connect", desc: "Chat interface with nutritionists." },
                            { title: "AI Chef", desc: "Suggests recipes based on ingredients user has." },
                            { title: "Insights", desc: "Deep analytics on nutritional intake." },
                        ]}
                        techStack="Flutter, Firebase, AI Integration"
                        mobileImg="/projects/nutrilife-mobile.png"
                        hideDesktop={true}
                    />
                </SwiperSlide>
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
    );
}
