import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Company {
  logo: string;
  name: string;
}

interface Video {
  url: string; // Direct video URL instead of Vimeo ID
  poster?: string; // Optional poster image
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  company: Company;
  video?: Video;
}

const testimonials: Testimonial[] = [
  {
    name: "Steven Mugabe",
    role: "Doctor at Code Clinic",
    image: "/images/testimonials/dr-steven.jpeg",
    content: "TopEdge's AI solutions transformed our customer service. Response times dropped by 90% while satisfaction increased by 55%. It's like having a superhuman team that never sleeps.",
    rating: 5,
    company: {
      logo: "/images/logos/code-clinic.png",
      name: "Code Clinic"
    },
    video: {
      url: "/images/testimonials/steeven.mp4",
      poster: "/images/testimonials/dr-steven.jpeg"
    }
  },
  {
    name: "Shubham Patel",
    role: "Realtor",
    image: "/images/testimonials/jake-miller.jpeg",
    content: "TopEdge AI has completely changed how I manage inbound leads. As a realtor running ads across platforms, I get a lot of inquiries—and my Inbound Voice Agent (Edge V2 Model) handles them all. It answers questions, shares property info, and even sends brochures automatically. Now I only deal with high-intent clients, saving hours every day. It's like having a 24/7 lead manager that never misses a beat.",
    rating: 5,
    company: {
      logo: "/images/logos/your-realty-logo.png",
      name: "Patel Realty"
    },
    video: {
      url: "/images/testimonials/shubham.mp4",
      poster: "/images/testimonials/jake-miller.jpeg"
    }
  },
  {
    name: "Sarah Johnson",
    role: "CEO at TechFlow",
    image: "/images/testimonials/harold.jpeg",
    content: "Implementing TopEdge AI has been a game-changer for our business. Our customer engagement is up 200% and our team can focus on strategic tasks while AI handles routine inquiries.",
    rating: 5,
    company: {
      logo: "/images/logos/techflow.png",
      name: "TechFlow"
    }
  },
  {
    name: "Michael Chen",
    role: "Operations Director at InnovateCorp",
    image: "/images/testimonials/jake-miller.jpeg",
    content: "The ROI with TopEdge AI has been incredible. We've seen a 40% reduction in operational costs and our customer satisfaction scores have never been higher.",
    rating: 5,
    company: {
      logo: "/images/logos/innovatecorp.png",
      name: "InnovateCorp"
    }
  },
  {
    name: "Emma Rodriguez",
    role: "Support Manager at CloudScale",
    image: "/images/testimonials/dr-steven.jpeg",
    content: "TopEdge AI's chatbots are remarkably human-like. Our customers often can't tell they're talking to an AI, and that's exactly what we wanted - seamless, natural interactions 24/7.",
    rating: 5,
    company: {
      logo: "/images/logos/cloudscale.png",
      name: "CloudScale"
    }
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const cardRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="relative group max-w-3xl mx-auto mb-12"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10">
      
        {testimonial.video && (
          <div className="relative w-full max-w-[600px] mx-auto overflow-hidden">
            <div className="aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-t-3xl"
                autoPlay
                muted
                loop
                playsInline
                poster={testimonial.video.poster}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted;
                  }
                }}
              >
                <source src={testimonial.video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        <div className="p-8">
          {/* Quote icon */}
          <div className="absolute top-6 right-8 text-purple-500/20 transform rotate-180">
            <Quote size={80} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Rating */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>

            {/* Testimonial text */}
            <p className="text-xl text-center text-gray-200 font-light leading-relaxed mb-8">
              "{testimonial.content}"
            </p>

            {/* Author info */}
            <div className="flex items-center justify-center gap-4">
              <div className={
                `relative rounded-full border-2 border-purple-500/20 ` +
                (testimonial.name === "Emma Rodriguez" ? "w-20 h-20 overflow-visible" : "w-14 h-14 overflow-hidden")
              }>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className={testimonial.name === "Emma Rodriguez" ? "w-full h-full object-contain" : "w-full h-full object-cover"}
                />
              </div>
              <div className="text-center">
                <h4 className="text-lg text-white font-semibold mb-0.5">{testimonial.name}</h4>
                <p className="text-sm text-purple-400 font-medium">{testimonial.role}</p>
              </div>
              {testimonial.company.logo && (
                <div className="ml-4 border-l border-white/10 pl-4">
                  <img 
                    src={testimonial.company.logo} 
                    alt={testimonial.company.name}
                    className="h-10 opacity-70 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                    width={40}
                    height={40}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#030014] py-32 overflow-hidden"
    >
      {/* Background effects */}


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 mb-8">
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Client Success Stories</span>
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Trusted by Industry Leaders
            </span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 