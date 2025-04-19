import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Play, Mic, Waves, Bot, Shield, ArrowRight, PhoneOutgoing } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Bot className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />,
    title: "Smart Call Handling",
    description: "Ready to serve 24/7, Qualifies leads, Books appointments\n100% accurate scheduling — no missed opportunities."
  },
  {
    icon: <Waves className="w-7 h-7 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />,
    title: "50+ Languages",
    description: "Break language barriers and expand your global reach. Multiple Languages"
  },
  {
    icon: <PhoneOutgoing className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />,
    title: "Outgoing Calls",
    description: "Upload a contact list — the AI Agent calls them one by one.\nPerfect for: Cold Calls, Appointment Reminders, Sales Calls, Promotional Campaigns."
  },
  {
    icon: <Shield className="w-7 h-7 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />,
    title: "Lead Prioritization",
    description: "Route high-value prospects to your team automatically"
  }
];

const AICallerSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDemoClick = () => {
    navigate('/services');
  };

  return (
    <section
      ref={containerRef}
      id="ai-caller-demo"
      className="relative min-h-[120vh] sm:min-h-screen bg-[#000000] py-8 sm:py-20 overflow-hidden"
    >
      {/* Premium Background Effects - Reduced complexity for mobile */}
      <div className="absolute inset-0">
        {/* Reduced number of animated lines for better performance */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${(i + 1) * 20}%`,
              background: 'linear-gradient(90deg, transparent, rgba(32, 33, 60, 0.2), transparent)',
            }}
          />
        ))}
      </div>

      {/* Content Container - Improved mobile spacing */}
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-12">
          {/* Left Content - Adjusted for mobile */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Label */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-white/80 backdrop-blur-sm border border-white/10">
                AI Phone Agent
              </span>
            </div>

            <h2
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-6 mx-auto lg:mx-0 max-w-[15ch]"
              style={{
                background: 'linear-gradient(to right, #fff, #6366F1, #fff)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Never Miss a <br/>Single call
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl mb-8 sm:mb-12 mx-auto lg:mx-0 max-w-[35ch]">
              AI voice agent handles unlimited calls 24/7, turning inquiries into revenue
            </p>

            {/* Features Grid - Improved mobile layout */}
            <div className="grid grid-cols-1 gap-3 sm:gap-6 mb-6 sm:mb-12 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4"
                >
                  <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 backdrop-blur-sm border border-indigo-500/30 shadow-xl group hover:from-indigo-500/30 hover:to-violet-500/30 transition-all duration-300 shrink-0">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base whitespace-pre-line">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Single CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <motion.button
                onClick={handleDemoClick}
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative rounded-full"
              >
                {/* Button Container */}
                <div className="relative px-8 py-4 rounded-full">
                  {/* Main Button Background */}
                  <div className="absolute inset-0 bg-black border border-purple-500/50 group-hover:border-purple-400 rounded-full" />
                  
                  {/* Button Content */}
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                        See how AI works
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Right Content - EVE Image with optimized animations */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <div className="relative w-full h-[500px] sm:h-[700px] mx-auto">
              <div className="relative w-full h-full">
                <img
                  src="whatsapp , insta/eev.png"
                  alt="EVE AI Assistant"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICallerSection; 
