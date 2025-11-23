"use client";

import { motion } from "framer-motion";

export default function ContactSlide({ disableAnimations = false }: { disableAnimations?: boolean }) {
    return (
        <div className="w-full md:min-h-screen flex flex-col justify-center items-center px-5 sm:px-6 py-10 sm:py-20 relative overflow-x-hidden md:overflow-y-auto">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {!disableAnimations && (
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px]"
                    />
                )}
            </div>

            <div className="relative z-10 max-w-7xl w-full text-center">
                <motion.div
                    initial={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={disableAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16 space-y-6"
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit text-white leading-tight">
                        Ready to Build or Automate Your Next Big Project?
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Send us your goals, screenshots, or a Loom—we’ll map a clear path, timeline, and a realistic first milestone before we write a line of code.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <a
                            href="https://wa.me/923330365252"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-7 py-3.5 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-brand-orange/20 w-full sm:w-auto"
                        >
                            WhatsApp Us
                        </a>
                        <a
                            href="mailto:abialigadi@gmail.com"
                            className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 backdrop-blur-md transition-all w-full sm:w-auto"
                        >
                            Book a Free Call
                        </a>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
                        {[
                            { title: "Avg response", desc: "Under 1 hour to first reply." },
                            { title: "Kickoff", desc: "Project start within 7 days once aligned." },
                            { title: "Engagements", desc: "Fixed scope, sprints, or dedicated team." },
                        ].map((item) => (
                            <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
                                <p className="text-xs uppercase tracking-[0.25em] text-brand-orange/90 mb-2">{item.title}</p>
                                <p className="text-gray-200">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={disableAnimations ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={disableAnimations ? { opacity: 1 } : { opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-left"
                >
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white font-outfit mb-2">Imadi Innovations</h3>
                        <p className="text-gray-400 text-sm">
                            Building custom software and AI automations for modern businesses.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 text-center md:text-left">
                        <div>
                            <h4 className="text-white font-bold mb-2">Contact</h4>
                            <p className="text-gray-400 text-sm mb-1">WhatsApp: +92 333 036 5252</p>
                            <a href="mailto:abialigadi@gmail.com" className="text-gray-400 text-sm hover:text-brand-orange transition-colors">
                                Email: abialigadi@gmail.com
                            </a>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-2">Location</h4>
                            <p className="text-gray-400 text-sm">Pakistan Based • Serving Clients Worldwide</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
