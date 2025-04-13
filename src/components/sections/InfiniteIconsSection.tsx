import { motion } from 'framer-motion';
import React from 'react';

const images = [
  {
    src: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Digital AI Brain',
    color: '#4ade80'
  },
  {
    src: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Futuristic AI Interface',
    color: '#60a5fa'
  },
  {
    src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
    alt: 'Robot Hand',
    color: '#f472b6'
  },
  {
    src: 'https://images.unsplash.com/photo-1625314887424-9f190599bd56?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'AI Network',
    color: '#818cf8'
  },
  {
    src: 'https://images.unsplash.com/photo-1684864411311-b2a65c30b698?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'AI Generated Art',
    color: '#fb923c'
  },
  {
    src: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=800&auto=format&fit=crop',
    alt: 'AI Technology',
    color: '#f43f5e'
  }
];

const InfiniteIconsSection = () => {
  return (
    <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-black overflow-hidden">
      {/* Single row of images moving left */}
      <div className="absolute w-full h-full flex items-center">
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center"
          initial={{ x: 0 }}
          animate={{
            x: [-2400, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {/* Triple the images to create seamless loop */}
          {[...images, ...images, ...images].map((image, index) => (
            <div
              key={index}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 group"
            >
              <div 
                className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden transform transition-all duration-300 group-hover:scale-105"
                style={{ boxShadow: `0 0 15px ${image.color}20` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white text-xs sm:text-sm md:text-base font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {image.alt}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient overlays for smooth fade at edges */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-32 md:w-40 lg:w-48 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-32 md:w-40 lg:w-48 bg-gradient-to-l from-black to-transparent z-10" />
    </div>
  );
};

export default InfiniteIconsSection;
