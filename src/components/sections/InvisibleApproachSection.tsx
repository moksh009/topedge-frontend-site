import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '/wizard.png';

const InvisibleApproachSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const textY1 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const textY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-black py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] md:bg-[size:5rem_5rem] pointer-events-none" />
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        {/* Text container */}
        <div className="relative z-10 text-center">
          <motion.h2 
            className="text-[clamp(3rem,40vw,6rem)] sm:text-[clamp(2rem,10vw,8rem)] md:text-[clamp(2.5rem,12vw,11rem)] font-bold tracking-tight leading-none mb-2 sm:mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
              background: 'linear-gradient(to right, #fff 20%, #666 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              y: textY1
            }}
          >
            let's save
          </motion.h2>
          <motion.h2 
            className="text-[clamp(3rem,40vw,6rem)] sm:text-[clamp(2rem,10vw,8rem)] md:text-[clamp(2.5rem,12vw,11rem)] font-bold tracking-tight leading-none"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
              background: 'linear-gradient(to right, #666 20%, #fff 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              y: textY2
            }}
          >
            valuable time
          </motion.h2>
        </div>

        {/* Image container */}
        <motion.div 
          ref={imageRef}
          className="absolute top-1/2 left-1/2 w-[min(35vw,170px)] sm:w-[min(70vw,300px)] md:w-[min(80vw,350px)] h-[min(35vw,170px)] sm:h-[min(70vw,300px)] md:h-[min(80vw,350px)] z-20"
          initial={{ scale: 0, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            x: '-50%',
            y: '-50%',
            scale: imageScale,
            opacity,
            rotate: imageRotate,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div 
            className="w-full h-full bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${heroImage})`,
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.2)) sm:drop-shadow(0 0 25px rgba(59, 130, 246, 0.25)) md:drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default InvisibleApproachSection; 