import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Lightbulb, ShieldCheck, Users, TrendingUp } from 'lucide-react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon, color }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      className="group relative rounded-3xl p-0.5 bg-gradient-to-br from-blue-400/30 via-theme-glow-accent/20 to-blue-500/30 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative z-10 flex flex-col items-center justify-between h-full w-full rounded-3xl bg-theme-bg-surface/80 backdrop-blur-xl p-8">
        <h3 className={`text-2xl font-extrabold text-center mb-4 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{title}</h3>
        <p className="text-base text-theme-text-secondary text-center font-light">{description}</p>
      </div>
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-400/20 via-transparent to-blue-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const AboutValues: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const values = [
    {
      title: "Innovation & Vision",
      description: "We relentlessly pursue new ideas, pushing boundaries to deliver transformative AI solutions that shape the future.",
      icon: Lightbulb,
      color: 'from-purple-500 to-indigo-400',
    },
    {
      title: "Integrity & Trust",
      description: "We uphold the highest standards of ethics, transparency, and reliability in every partnership and product.",
      icon: ShieldCheck,
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: "Client-Centric Impact",
      description: "Your goals drive our mission. We create tailored AI experiences that deliver measurable value and lasting relationships.",
      icon: Users,
      color: 'from-pink-400 to-rose-500',
    },
    {
      title: "Excellence & Growth",
      description: "We strive for excellence and continuous growth, always learning, adapting, and exceeding expectations.",
      icon: TrendingUp,
      color: 'from-yellow-400 to-orange-400',
    },
  ];

  return (
    <section ref={containerRef} className="relative py-16 sm:py-32 bg-theme-bg-primary overflow-hidden">
      {/* Section Header */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="h-px w-10 bg-gradient-to-r from-blue-400 to-blue-500 block" />
            <span className="text-base sm:text-lg font-semibold tracking-widest text-transparent bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text uppercase">Our Values</span>
            <span className="h-px w-10 bg-gradient-to-l from-blue-400 to-blue-500 block" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-theme-text-primary via-blue-500 to-theme-text-primary bg-clip-text text-transparent mb-3">Principles That Inspire Us</h2>
          <p className="text-lg sm:text-xl text-theme-text-secondary max-w-2xl mx-auto font-light">We are driven by a passion for innovation, a commitment to integrity, and a relentless focus on delivering real value to our clients.</p>
        </div>
        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <ValueCard
              key={value.title}
              title={value.title}
              description={value.description}
              icon={value.icon}
              color={value.color}
            />
          ))}
        </div>
      </div>
      {/* Add floating icons as background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-10 top-10 text-blue-400/20"
          animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Lightbulb className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-10 bottom-10 text-yellow-400/20"
          animate={{ y: [10, -10, 10], rotate: [0, -360, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <TrendingUp className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-1/4 text-emerald-400/20"
          animate={{ x: [-10, 10, -10], rotate: [0, 180, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <ShieldCheck className="w-16 h-16" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutValues;
