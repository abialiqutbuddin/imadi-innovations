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

export default function MobileLayout() {
    return (
        <div className="w-full min-h-screen bg-brand-dark bg-grid-pattern text-white overflow-x-hidden">
            {/* Mobile Header - Floating */}
            <div className="fixed top-4 left-4 right-4 z-50 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl shadow-black/40">
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
                    <div className="flex flex-col">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-white leading-tight">
                            Imadi
                        </span>
                        <span className="text-[10px] text-brand-orange tracking-wider uppercase font-medium">
                            Innovations
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="#portfolio"
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-white uppercase tracking-wider hover:bg-brand-orange/10 hover:text-brand-orange hover:border-brand-orange/20 transition-all duration-300"
                    >
                        Projects
                    </a>
                    <a
                        href="https://wa.me/923330365252"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20 hover:bg-brand-orange hover:text-black transition-all duration-300"
                    >
                        <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                    </a>
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
                    <PortfolioSection />
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
