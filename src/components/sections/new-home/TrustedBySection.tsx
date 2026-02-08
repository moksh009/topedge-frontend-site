import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, Building2 } from 'lucide-react';

// --- TYPES ---
interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

// --- DATA ---
const testimonials: Testimonial[] = [
  {
    id: '3',
    name: "Dr. Steven Mugabe",
    role: "Lead Dentist",
    company: "Code Clinic",
    image: "/images/testimonials/dr-steven.jpeg",
    content: "Integrating TopEdge AI into our practice has been a turning point. Our appointment scheduling is now fully automated, reducing admin workload by over 60%. Response times are nearly instant, and we've seen a 55% increase in patient satisfaction.",
    rating: 5
  },
  {
    id: '2',
    name: "Shubham Patel",
    role: "Realtor",
    company: "Patel Realty",
    image: "/images/testimonials/jake-miller.jpeg",
    content: "TopEdge AI handles all my inbound leads automatically — answering questions, sharing property details, and sending brochures. As a realtor, it saves me hours daily and delivers only serious, high-intent clients.",
    rating: 5
  },
  {
    id: '4',
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechFlow",
    image: "/images/testimonials/dr-steven.jpeg",
    content: "Implementing TopEdge AI has been a game-changer for our business. Our customer engagement is up 200% and our team can focus on strategic tasks while AI handles routine inquiries. The ROI has been incredible from day one.",
    rating: 5
  },
  {
    id: '1',
    name: "Jake Miller",
    role: "Realtor, US",
    company: "TechSolutions",
    image: "/images/testimonials/jake-miller.jpeg",
    content: "TopEdge's AI Agent helped me secure 3 extra confirmed property visits in just one week—opportunities I would've completely missed. The AI follow-ups fixed my broken inquiry process and reactivated cold leads effortlessly.",
    rating: 5
  },
  {
    id: '5',
    name: "Dr. Steven",
    role: "CX Specialist",
    company: "Global CX",
    image: "/images/testimonials/dr-steven.jpeg",
    content: "Since using TopEdge AI Chat Agent, we've seen a 23% increase in inquiries and over 2% growth in conversion rates. Our Google reviews have also improved significantly. Their service is fast, friendly, and absolutely game-changing!",
    rating: 5
  },
  {
    id: '6',
    name: "Mr. Harold",
    role: "Realtor",
    company: "Global Sales",
    image: "/images/testimonials/harold.jpeg",
    content: "TopEdge AI Support Agents have transformed our outbound sales! We upload 100+ contacts daily, and with a 20% interest rate and an 8–10% conversion rate, the results speak for themselves. It saves us 3–4 hours daily.",
    rating: 5
  },
  {
    id: '7',
    name: "Jason Lee",
    role: "Head of Sales",
    company: "Sales Pro",
    image: "https://ui-avatars.com/api/?name=Jason+Lee&background=0D8ABC&color=fff",
    content: "TopEdge helped us automate follow-ups and track performance in real time. Our sales team's productivity has doubled, and we're closing deals faster than ever.",
    rating: 5
  },
  {
    id: '8',
    name: "Emily Carter",
    role: "CX Manager",
    company: "Tech Innovate",
    image: "https://ui-avatars.com/api/?name=Emily+Carter&background=6366f1&color=fff",
    content: "The AI chatbot is a game-changer. It handles support 24/7 and has reduced our average response time by 80%. Customers are consistently giving us great feedback.",
    rating: 5
  }
];

// --- COMPONENT: CARD ---
const ReviewCard = ({ review }: { review: Testimonial }) => (
  <div className="w-[230px] md:w-[400px] flex-shrink-0 mx-2 md:mx-5 bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:border-indigo-100 transition-all duration-500 group relative overflow-hidden">
    
    {/* Decorative Background Quote */}
    <Quote className="absolute top-4 right-6 w-10 h-10 md:w-16 md:h-16 text-slate-50 rotate-12 -z-10 group-hover:text-indigo-50 transition-colors duration-500" />

    <div className="flex flex-col h-full">
      {/* Stars */}
      <div className="flex gap-1 mb-2 md:mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={12} className="fill-amber-400 text-amber-400 md:w-3.5 md:h-3.5" />
        ))}
      </div>

      {/* Content */}
      <p className="text-slate-700 text-xs md:text-base leading-relaxed font-medium mb-3 md:mb-6 line-clamp-3">
        "{review.content}"
      </p>

      {/* User Profile */}
      <div className="mt-auto flex items-center gap-2 md:gap-3 pt-3 md:pt-6 border-t border-slate-50">
        <div className="relative">
            <img 
                src={review.image} 
                alt={review.name} 
                className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-100" 
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-500 fill-white" />
            </div>
        </div>
        
        <div>
          <h4 className="text-slate-900 text-xs md:text-sm font-bold leading-tight">{review.name}</h4>
          <div className="flex items-center gap-1.5 mt-0.5">
             <span className="text-slate-500 text-[9px] md:text-xs font-medium">{review.role}</span>
             <span className="text-slate-300">•</span>
             <span className="text-indigo-600 text-[9px] md:text-xs font-bold flex items-center gap-1">
                <Building2 size={9} className="md:w-[10px] md:h-[10px]" /> {review.company}
             </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TrustedBySection = () => {
  return (
    <section className="pt-6 pb-2 md:py-14 bg-white relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="container mx-auto px-4 mb-2 md:mb-6 text-center relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center justify-center gap-2 mb-2"
        >
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Social Proof</span>
        </motion.div>
        
        <motion.h2 
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-xl md:text-3xl font-semibold text-slate-900 tracking-tight"
        >
           Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 animate-gradient-x">500+ High-Growth Teams</span>
        </motion.h2>
      </div>

      {/* Infinite Marquee Container */}
      {/* Mask Image creates the fade effect on left/right edges */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div 
          className="flex py-2 md:py-10"
          animate={{ x: "-50%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 50 // Slower, smoother scroll
          }}
          style={{ width: "fit-content" }}
        >
          {/* Render List Twice for Seamless Loop */}
          {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
            <ReviewCard key={`${item.id}-${idx}`} review={item} />
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default TrustedBySection;
