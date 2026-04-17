"use client";

import { useSwiper } from "swiper/react";
import { motion } from "framer-motion";

export default function Navbar() {
    const swiper = useSwiper();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center pointer-events-none"
        >
            {/* Logo Area */}
            <div className="pointer-events-auto">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-brand-orange/20">
                        {/* Ensure you have a logo.jpg in your public folder */}
                        <img
                            src="/logo.jpg"
                            alt="Imadi Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold font-outfit text-white tracking-wide">
                        IMADI INNOVATIONS
                    </span>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pointer-events-auto items-center">
                <button
                    onClick={() => swiper.slideTo(5)} // Index of first portfolio item (approx)
                    className="hidden md:block text-sm font-medium text-gray-300 hover:text-brand-orange transition-colors uppercase tracking-widest mr-2"
                >
                    Projects
                </button>

                <button
                    onClick={() => swiper.slideTo(11)} // Index of contact slide
                    className="px-6 py-2 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange border border-brand-orange/50 rounded-full text-sm font-medium transition-all uppercase tracking-widest backdrop-blur-md"
                >
                    Contact
                </button>
            </div>
        </motion.nav>
    );
}
