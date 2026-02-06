import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Star, Quote, Play, Pause, Volume2, VolumeX, Building2 } from 'lucide-react';

// --- TYPES ---
interface Company {
  name: string;
  logo: string;
}

interface Video {
  url: string;
  poster: string;
}

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  company?: Company;
  video?: Video;
}

// --- DATA ---
const featuredTestimonials: Testimonial[] = [
  {
    id: "vid-1",
    name: "Steven Mugabe",
    role: "Doctor at Code Clinic",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    content: "TopEdge's AI solutions transformed our customer service. Response times dropped by 90% while satisfaction increased by 55%. It's like having a superhuman team that never sleeps.",
    rating: 5,
    company: { name: "Code Clinic", logo: "/logos/code-clinic.png" },
    video: {
      url: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
      poster: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
    }
  },
  {
    id: "vid-2",
    name: "Shubham Patel",
    role: "Realtor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2544&auto=format&fit=crop",
    content: "As a realtor running ads, I get hundreds of inquiries. My TopEdge Voice Agent handles them all—answering questions and sending brochures automatically. I only talk to serious buyers now.",
    rating: 5,
    company: { name: "Patel Realty", logo: "/logos/realty.png" },
    video: {
      url: "https://assets.mixkit.co/videos/preview/mixkit-young-man-talking-on-phone-at-home-406-large.mp4",
      poster: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2544&auto=format&fit=crop"
    }
  }
];

const scrollingTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechFlow",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    content: "Implementing TopEdge AI was a game-changer. Our customer engagement is up 200%.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Director at Innovate",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    content: "The ROI has been incredible. We've seen a 40% reduction in operational costs.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Support Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    content: "The chatbots are remarkably human-like. Customers can't tell the difference.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
    content: "Setup was instant. We were live and closing leads within 24 hours.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Wong",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1559526324-593bc8141829?q=80&w=2070&auto=format&fit=crop",
    content: "Our conversion rate on inbound traffic doubled in the first month.",
    rating: 5
  }
];

// --- COMPONENT: MARQUEE CARD ---
const MarqueeCard = ({ review }: { review: Testimonial }) => (
  <div className="w-[350px] md:w-[400px] flex-shrink-0 mx-4 bg-[#0B1121] border border-white/10 p-6 rounded-3xl relative group hover:border-indigo-500/30 transition-colors duration-300">
    <div className="absolute top-6 right-6 text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors">
      <Quote size={40} className="fill-current" />
    </div>
    
    <div className="flex gap-1 mb-4">
      {[...Array(review.rating)].map((_, i) => (
        <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
      ))}
    </div>
    
    <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">
      "{review.content}"
    </p>
    
    <div className="flex items-center gap-3 mt-auto">
      <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
      <div>
        <h4 className="text-white text-sm font-bold">{review.name}</h4>
        <p className="text-slate-500 text-xs">{review.role}</p>
      </div>
    </div>
  </div>
);

// --- COMPONENT: FEATURED VIDEO CARD ---
const VideoTestimonialCard = ({ testimonial, index }: { testimonial: Testimonial, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="w-full bg-[#0B1121] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 group shadow-2xl"
    >
      <div className="flex flex-col lg:flex-row">
        
        {/* Video Half */}
        <div className="lg:w-5/12 relative aspect-[4/5] lg:aspect-auto min-h-[400px] cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={testimonial.video?.url}
            poster={testimonial.video?.poster}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            loop
            // Auto-play on hover for desktop, click for mobile
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => {
               videoRef.current?.pause();
               videoRef.current!.currentTime = 0; // Reset
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B1121]" />
          
          {/* Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
             </div>
          </div>

          <button 
            onClick={toggleMute}
            className="absolute bottom-4 left-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors z-20"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Content Half */}
        <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center relative">
          <div className="absolute top-8 right-8 text-slate-800">
             <Quote size={80} />
          </div>

          <div className="relative z-10">
             <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                   <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
             </div>

             <h3 className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
               "{testimonial.content}"
             </h3>

             <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-indigo-500 to-violet-500">
                   <img src={testimonial.image} alt={testimonial.name} className="w-full h-full rounded-full object-cover border-2 border-[#0B1121]" />
                </div>
                <div>
                   <div className="text-white font-bold text-lg">{testimonial.name}</div>
                   <div className="text-indigo-400 text-sm flex items-center gap-2">
                      {testimonial.role} 
                      {testimonial.company && (
                         <>
                           <span className="w-1 h-1 bg-slate-600 rounded-full" />
                           <span className="text-slate-500">{testimonial.company.name}</span>
                         </>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// --- MAIN SECTION ---
const TestimonialsSection = () => {
  return (
    <section className="bg-[#020617] py-24 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* PART 1: INFINITE MARQUEE */}
      <div className="mb-24 relative z-10">
         <div className="text-center mb-16 px-4">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
               <Star className="w-3 h-3 fill-current" />
               Client Love
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
               Trusted by the world's <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">fastest growing brands.</span>
            </h2>
         </div>

         {/* Gradient Masks for Marquee */}
         <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#020617] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#020617] to-transparent z-10" />
            
            {/* Row 1: Left Scroll */}
            <div className="flex overflow-hidden mb-8">
               <motion.div 
                  className="flex"
                  animate={{ x: [0, -1000] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
               >
                  {[...scrollingTestimonials, ...scrollingTestimonials, ...scrollingTestimonials].map((item, idx) => (
                     <MarqueeCard key={`${item.id}-${idx}`} review={item} />
                  ))}
               </motion.div>
            </div>

            {/* Row 2: Right Scroll (Optional - add different data if available) */}
            {/* <div className="flex overflow-hidden"> ...reverse direction... </div> */}
         </div>
      </div>

      {/* PART 2: FEATURED VIDEO CASE STUDIES */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
         <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Featured Stories</span>
            <div className="h-px bg-white/10 flex-1" />
         </div>

         <div className="space-y-12">
            {featuredTestimonials.map((testimonial, index) => (
               <VideoTestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                  index={index} 
               />
            ))}
         </div>
         
         <div className="mt-20 text-center">
            <p className="text-slate-400 mb-6">Ready to join them?</p>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-sm hover:bg-indigo-50 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
               Start Your Free Trial
            </button>
         </div>
      </div>

    </section>
  );
};

export default TestimonialsSection;