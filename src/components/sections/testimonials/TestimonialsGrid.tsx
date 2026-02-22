import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Volume2, VolumeX } from 'lucide-react';

// --- DATA ---
const featuredTestimonials = [
    {
        id: "vid-1",
        name: "Steven Mugabe",
        role: "Doctor at Code Clinic",
        image: "/images/testimonials/dr-steven.jpeg",
        content: "TopEdge's AI solutions transformed our customer service. Response times dropped by 90% while satisfaction increased by 55%. It's like having a superhuman team that never sleeps.",
        rating: 5,
        company: { name: "Code Clinic" },
        video: {
            url: "/images/testimonials/steeven.mp4",
            poster: "/images/testimonials/dr-steven.jpeg"
        }
    },
    {
        id: "vid-2",
        name: "Shubham Patel",
        role: "Realtor",
        image: "/images/testimonials/jake-miller.jpeg",
        content: "TopEdge AI has completely changed how I manage inbound leads. As a realtor running ads across platforms, I get a lot of inquiries—and my Inbound Voice Agent handles them all. Now I only deal with high-intent clients, saving hours every day.",
        rating: 5,
        company: { name: "Patel Realty" },
        video: {
            url: "/images/testimonials/shubham.mp4",
            poster: "/images/testimonials/jake-miller.jpeg"
        }
    }
];

const scrollingTestimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO at TechFlow",
        image: "/images/testimonials/harold.jpeg",
        content: "Implementing TopEdge AI has been a game-changer for our business. Our customer engagement is up 200% and our team can focus on strategic tasks while AI handles routine inquiries.",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Operations Director",
        image: "/images/testimonials/jake-miller.jpeg",
        content: "The ROI with TopEdge AI has been incredible. We've seen a 40% reduction in operational costs and our customer satisfaction scores have never been higher.",
        rating: 5
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        role: "Support Manager",
        image: "/images/testimonials/dr-steven.jpeg",
        content: "TopEdge AI's chatbots are remarkably human-like. Our customers often can't tell they're talking to an AI, and that's exactly what we wanted - seamless, natural interactions 24/7.",
        rating: 5
    }
];

const TestimonialCard = ({ review }: { review: any }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 relative group"
    >
        <div className="absolute top-8 right-8 text-slate-100 group-hover:text-indigo-50 transition-colors">
            <Quote size={48} className="fill-current" />
        </div>

        <div className="flex gap-1 mb-6">
            {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-500 text-amber-500" />
            ))}
        </div>

        <p className="text-slate-600 text-lg leading-relaxed mb-8 relative z-10 italic">
            "{review.content}"
        </p>

        <div className="flex items-center gap-4 mt-auto">
            <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
            <div>
                <h4 className="text-slate-900 text-base font-bold">{review.name}</h4>
                <p className="text-indigo-500 text-sm font-medium">{review.role}</p>
            </div>
        </div>
    </motion.div>
);

const VideoTestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 group"
        >
            <div className="flex flex-col lg:flex-row min-h-[450px]">
                {/* Video Half */}
                <div className="lg:w-1/2 relative aspect-video lg:aspect-auto bg-slate-100 cursor-pointer" onClick={toggleMute}>
                    <video
                        ref={videoRef}
                        src={testimonial.video?.url}
                        poster={testimonial.video?.poster}
                        className="absolute inset-0 w-full h-full object-cover"
                        playsInline
                        loop
                        autoPlay
                        muted={isMuted}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent lg:hidden" />

                    <button
                        onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                        className="absolute bottom-6 left-6 p-2.5 bg-white/40 backdrop-blur-md rounded-full text-slate-800 hover:bg-white transition-colors z-20 shadow-lg"
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                </div>

                {/* Content Half */}
                <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-white">
                    <div className="absolute top-10 right-10 text-slate-50 opacity-50">
                        <Quote size={80} />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex gap-1 mb-8">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                            ))}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-10 flex-grow">
                            "{testimonial.content}"
                        </h3>

                        <div className="flex items-center gap-5 pt-10 border-t border-slate-100">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full p-0.5 bg-gradient-to-tr from-indigo-500 to-purple-500 flex-shrink-0">
                                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full rounded-full object-cover border-2 border-white" />
                            </div>
                            <div>
                                <div className="text-slate-900 font-extrabold text-lg md:text-xl">{testimonial.name}</div>
                                <div className="text-indigo-600 text-sm md:text-base font-semibold">
                                    {testimonial.role} <span className="text-slate-300 mx-2 text-xs">|</span> <span className="text-slate-400 font-normal">{testimonial.company.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TestimonialsGrid = () => {
    return (
        <section className="bg-white py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Featured Video Stories */}
                <div className="mb-32">
                    <div className="flex flex-col items-center mb-16 px-4">
                        <span className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em] mb-4">Case Studies</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">In-depth Success Stories</h2>
                    </div>
                    <div className="space-y-16">
                        {featuredTestimonials.map((testimonial, index) => (
                            <VideoTestimonialCard
                                key={testimonial.id}
                                testimonial={testimonial}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Regular Feedback Grid */}
                <div className="pt-24 border-t border-slate-100">
                    <div className="flex flex-col items-center mb-16 px-4">
                        <span className="text-xs font-bold text-purple-500 uppercase tracking-[0.2em] mb-4">Client Feedback</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center">What our partners say</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {scrollingTestimonials.map((item) => (
                            <TestimonialCard key={item.id} review={item} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TestimonialsGrid;
