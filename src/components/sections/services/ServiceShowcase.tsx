import { motion } from 'framer-motion';
import { Brain, Cpu, Network, GitBranch, Users, BarChart } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      title: "AI Integration",
      description: "Seamlessly integrate cutting-edge AI models into your existing workflows and applications.",
      showcaseImage: "/images/ai-integration-showcase.jpg",
      icon: Brain,
      color: "blue",
      features: ["Custom AI Models", "API Integration", "Workflow Automation"]
    },
    {
      title: "Machine Learning",
      description: "Custom ML models trained on your data for precise predictions and insights.",
      showcaseImage: "/images/machine-learning-showcase.jpg",
      icon: Cpu,
      color: "purple",
      features: ["Deep Learning", "Neural Networks", "Data Analysis"]
    },
    {
      title: "Neural Networks",
      description: "Deep learning solutions for complex pattern recognition and data analysis.",
      showcaseImage: "/images/neural-networks-showcase.jpg",
      icon: Network,
      color: "orange",
      features: ["Pattern Recognition", "Predictive Analytics", "Real-time Processing"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    serviceRefs.current.forEach((ref, index) => {
      if (!ref) return;

      gsap.fromTo(
        ref,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref,
            start: "top bottom-=100",
            end: "bottom top+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    serviceRefs.current[index] = el;
  };

  return (
    <section className="relative py-32 overflow-hidden bg-black" ref={containerRef}>
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80" />
        <div className="absolute inset-0">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="absolute inset-0 bg-gradient-to-br from-black to-transparent"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: activeService === index ? 0.5 : 0,
                background: `radial-gradient(circle at 50% 50%, ${getColorClass(service.color)}, transparent)`
              }}
              transition={{ duration: 1 }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Service Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {services[activeService].title}
            </h2>
            <p className="text-xl text-gray-400">
              {services[activeService].description}
            </p>
            <div className="flex flex-wrap gap-4">
              {services[activeService].features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300"
                >
                  {feature}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <img
                src={services[activeService].showcaseImage}
                alt={services[activeService].title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40" />
            </div>
          </motion.div>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              ref={(el) => setRef(el, index)}
              className={`service-item ${activeService === index ? 'active' : ''}`}
              onClick={() => setActiveService(index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="relative z-10 bg-gray-900/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700/50 overflow-hidden">
                  <div className="relative mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                    <div className={`absolute -inset-4 bg-gradient-to-r ${getColorClass(service.color)} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getColorClass = (color: string) => {
  const colors = {
    blue: "from-blue-500/20 to-cyan-500/20",
    purple: "from-purple-500/20 to-pink-500/20",
    orange: "from-orange-500/20 to-amber-500/20",
    emerald: "from-emerald-500/20 to-teal-500/20",
    indigo: "from-indigo-500/20 to-blue-500/20",
    rose: "from-rose-500/20 to-pink-500/20"
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export default ServiceShowcase;
