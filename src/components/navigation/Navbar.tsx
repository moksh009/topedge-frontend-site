import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Brain, ArrowRight, Calendar } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      x: '100%',
      scale: 0.95,
      rotate: 5
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: '100%',
      scale: 0.95,
      rotate: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      x: 50,
      rotate: 5
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: {
      opacity: 0,
      x: 50,
      rotate: -5
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/10' : 'py-5 bg-transparent'
        }`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="relative group md:block hidden">
              <div className="flex items-center space-x-4">
                <img src="logo.png" alt="TopEdge Logo" className="h-14 w-auto" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    <span className="text-white">Top</span>
                    <span className="text-violet-500">E</span>
                    <span className="text-white">dge</span>
                  </span>
                  {/* <span className="text-sm text-gray-400 mt-0.5">make you're not behind the world</span> */}
                </div>
              </div>
            </Link>

            {/* Mobile Logo Text */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden block"
                >
                  <Link to="/">
                    <div className="flex items-center space-x-3">
                      <img src="logo.png" alt="TopEdge Logo" className="h-10 w-auto" />
                      <div className="flex flex-col">
                        <span className="text-lg font-bold">
                          <span className="text-white">Top</span>
                          <span className="text-violet-500">E</span>
                          <span className="text-white">dge</span>
                        </span>
                        {/* <span className="text-[10px] text-gray-400">make you're not behind the world</span> */}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`relative group px-4 py-2 ${
                      location.pathname === item.path
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-lg"
                        layoutId="navBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
              {/* Book Appointment Button */}
              <Link to="/booking">
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={{
                    hover: { scale: 1.05 },
                    tap: { scale: 0.95 }
                  }}
                  className="group relative rounded-full"
                >
                  {/* Button Container */}
                  <div className="relative px-6 py-2 rounded-full">
                    {/* Outer Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-indigo-500/30 to-violet-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    
                    {/* Moving Particles Background */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-violet-400 rounded-full"
                          animate={{
                            x: [
                              Math.random() * 100,
                              Math.random() * -100,
                              Math.random() * 100
                            ],
                            y: [
                              Math.random() * 50,
                              Math.random() * -50,
                              Math.random() * 50
                            ],
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}
                        />
                      ))}
                    </div>

                    {/* Main Button Background */}
                    <div className="absolute inset-0 bg-black border border-violet-500/50 group-hover:border-violet-400 rounded-full" />
                    
                    {/* Animated Border Lines */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                        animate={{
                          x: [-100, 100, -100],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                        animate={{
                          x: [100, -100, 100],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>

                    {/* Button Content */}
                    <div className="relative flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-400 group-hover:text-white transition-colors duration-300" />
                      <span className="text-sm font-medium bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                        Book Appointment
                      </span>
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                          y: [0, -2, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="w-4 h-4 text-violet-400 group-hover:text-white transition-colors duration-300" />
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative z-50 p-2 rounded-lg bg-black/50 backdrop-blur-xl border border-white/10"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            {/* Backdrop with blur and gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/98 to-black/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl shadow-violet-500/5"
              variants={mobileMenuVariants}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
                  animate={{
                    x: [-100, 100],
                    opacity: [0.1, 0.5, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
                  animate={{
                    x: [100, -100],
                    opacity: [0.1, 0.5, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Content Container */}
              <div className="relative h-full p-8">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-center w-full mb-12">
                  <motion.div
                    variants={menuItemVariants}
                    className="relative"
                  >
                    {/* Glowing effect behind logo */}
                    <motion.div
                      className="absolute inset-0 bg-violet-500/20 blur-2xl rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <img 
                      src="logo.png" 
                      alt="TopEdge Logo" 
                      className="h-12 w-auto relative z-10" 
                    />
                  </motion.div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.path}
                      variants={menuItemVariants}
                      className="flex justify-center"
                    >
                      <Link
                        to={item.path}
                        className={`relative group block py-3 px-6 rounded-xl w-full text-center transition-all duration-300 ${
                          location.pathname === item.path
                            ? 'text-white bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <motion.span
                          className="relative z-10 block"
                          whileHover={{ x: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
                        {/* Hover effect */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-violet-500 to-indigo-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        />
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Book Appointment Button */}
                  <motion.div
                    variants={menuItemVariants}
                    className="pt-6"
                  >
                    <Link to="/booking" className="block">
                      <motion.button
                        whileHover="hover"
                        whileTap="tap"
                        variants={{
                          hover: { scale: 1.02 },
                          tap: { scale: 0.98 }
                        }}
                        className="group relative w-full rounded-xl overflow-hidden"
                        onClick={() => setIsOpen(false)}
                      >
                        {/* Button Container */}
                        <div className="relative px-6 py-4">
                          {/* Animated gradient background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-indigo-500/20 to-violet-600/20"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          
                          {/* Button border */}
                          <div className="absolute inset-0 border border-violet-500/30 rounded-xl" />
                          
                          {/* Button Content */}
                          <div className="relative flex items-center justify-center gap-3">
                            <Calendar className="w-5 h-5 text-violet-400" />
                            <span className="text-base font-medium text-white">
                              Book Appointment
                            </span>
                            <motion.div
                              animate={{
                                x: [0, 5, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <ArrowRight className="w-5 h-5 text-violet-400" />
                            </motion.div>
                          </div>
                        </div>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>

                {/* Mobile Menu Footer */}
                <motion.div
                  className="absolute bottom-8 left-8 right-8"
                  variants={menuItemVariants}
                >
                  <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600/10 to-indigo-600/10 backdrop-blur-xl border border-white/10">
                    <p className="text-sm text-gray-400 text-center">
                      Stay ahead with TopEdge
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
