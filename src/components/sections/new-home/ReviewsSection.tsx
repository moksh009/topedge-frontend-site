import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Steven Mugabe",
    role: "Doctor at Code Clinic",
    image: "/images/testimonials/dr-steven.jpeg",
    quote: "TopEdge's AI solutions transformed our customer service. Response times dropped by 90% while satisfaction increased by 55%. It's like having a superhuman team that never sleeps.",
    rating: 5,
    video: "/images/testimonials/steeven.mp4",
    poster: "/images/testimonials/dr-steven.jpeg"
  },
  {
    name: "Shubham Patel",
    role: "Realtor",
    image: "/images/testimonials/jake-miller.jpeg",
    quote: "TopEdge AI has completely changed how I manage inbound leads. As a realtor running ads across platforms, I get a lot of inquiries—and my Inbound Voice Agent (Edge V2 Model) handles them all. It answers questions, shares property info, and even sends brochures automatically.",
    rating: 5,
    video: "/images/testimonials/shubham.mp4",
    poster: "/images/testimonials/jake-miller.jpeg"
  },
  {
    name: "Sarah Johnson",
    role: "CEO at TechFlow",
    image: "/images/testimonials/harold.jpeg",
    quote: "Implementing TopEdge AI has been a game-changer for our business. Our customer engagement is up 200% and our team can focus on strategic tasks while AI handles routine inquiries.",
    rating: 5
  }
];

const ReviewsSection = () => {
  return (
    <section className="py-32 bg-[#F5F5F7] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
          >
            <Star className="w-3 h-3 fill-current" />
            Testimonials
          </motion.div>
          <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight"
          >
            Loved by <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Industry Leaders.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            See how TopEdge AI is transforming businesses across the globe with intelligent voice and chat solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/5 border border-white/60 flex flex-col h-full relative group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
            >
              {/* Card Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {review.video ? (
                <div className="w-full aspect-[4/3] relative bg-black overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
                   <video 
                     src={review.video}
                     poster={review.poster}
                     controls
                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                   />
                </div>
              ) : null}
              
              <div className="p-8 flex flex-col flex-1 relative z-10">
                <Quote className="w-10 h-10 text-blue-100 mb-6 absolute top-8 right-8 rotate-180" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 mb-8">
                  <p className="text-lg text-[#1d1d1f] font-medium leading-relaxed">
                    "{review.quote}"
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 ring-2 ring-white shadow-sm">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => e.currentTarget.src = `https://ui-avatars.com/api/?name=${review.name.replace(' ', '+')}&background=random`}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1d1d1f]">{review.name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
