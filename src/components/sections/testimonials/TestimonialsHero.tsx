import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, MessageSquare, Quote, Activity } from 'lucide-react';

const TestimonialsHero = () => {
    const titleVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const subtitleVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div className="relative min-h-[85vh] w-full overflow-hidden bg-[#FAFAFC] flex flex-col justify-center pt-24 pb-12">

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                {/* Mesh Gradients */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3], y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-5%] left-[-5%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-indigo-100/50 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2], y: [0, 20, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-5%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-purple-100/40 rounded-full blur-[120px]"
                />

                {/* Tech Annotations */}
                <div className="absolute inset-0 max-w-7xl mx-auto hidden md:block pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[25%] left-[8%] p-3 border border-slate-200/50 rounded-xl backdrop-blur-sm bg-white/30 shadow-sm"
                    >
                        <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">Social.Proof</div>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-indigo-500" />
                            <span className="text-[9px] font-mono text-slate-600 font-medium tracking-tight">VERIFIED_REVIEWS // 99.8% POSITIVE</span>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-[45%] right-[10%] p-3 border border-slate-200/50 rounded-xl backdrop-blur-sm bg-white/30 shadow-sm"
                    >
                        <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">Impact.Metrics</div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span className="text-[9px] font-mono text-slate-700 font-bold tracking-tight">70%+ ROI REPORTED</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-slate-500"
                >
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Client Love & Success Stories</span>
                </motion.div>

                {/* Title Reveal */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    className="max-w-5xl mx-auto"
                >
                    <motion.h1
                        variants={titleVariants}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-8"
                    >
                        Trusted by the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 pb-2">
                            fastest growing
                        </span> brands.
                    </motion.h1>

                    <motion.p
                        variants={subtitleVariants}
                        className="text-lg sm:text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto"
                    >
                        Real results from visionary companies who have redefined
                        <span className="text-slate-900"> their customer communication</span> with TopEdge AI.
                    </motion.p>
                </motion.div>

                {/* Floating Icons for extra detail */}
                <div className="mt-16 flex items-center justify-center gap-6 opacity-30">
                    <MessageSquare className="w-6 h-6 text-slate-400" />
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <Quote className="w-6 h-6 text-slate-400" />
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <Activity className="w-6 h-6 text-slate-400" />
                </div>
            </div>

        </div>
    );
};

export default TestimonialsHero;
