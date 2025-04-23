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
    { path: '/testimonials', label: 'Testimonials' },
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
      scale: 1
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      x: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      x: 20
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-3 bg-theme-bg-surface/80 backdrop-blur-xl border-b border-theme-border-primary/10' : 'py-5 bg-transparent'
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
                    <span className="text-theme-text-primary">Top</span>
                    <span className="text-theme-glow-primary">E</span>
                    <span className="text-theme-text-primary">dge</span>
                  </span>
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
                          <span className="text-theme-text-primary">Top</span>
                          <span className="text-theme-glow-primary">E</span>
                          <span className="text-theme-text-primary">dge</span>
                        </span>
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
                        ? 'text-theme-text-primary'
                        : 'text-theme-text-secondary hover:text-theme-text-primary'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/10 to-theme-glow-accent/10 rounded-lg"
                        layoutId="navBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-theme-glow-primary to-theme-glow-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-accent/30 to-theme-glow-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    
                    {/* Main Button Background */}
                    <div className="absolute inset-0 bg-theme-bg-surface border border-theme-glow-primary/50 group-hover:border-theme-glow-primary rounded-full" />
                    
                    {/* Button Content */}
                    <div className="relative flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-theme-glow-primary group-hover:text-theme-text-primary transition-colors duration-300" />
                      <span className="text-sm font-medium text-theme-text-primary">
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
                        <ArrowRight className="w-4 h-4 text-theme-glow-primary group-hover:text-theme-text-primary transition-colors duration-300" />
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-theme-text-primary hover:text-theme-text-secondary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
            <div className="absolute inset-0 bg-theme-bg-primary/95 backdrop-blur-xl" />
            
            <div className="relative h-full p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                  <img src="logo.png" alt="TopEdge Logo" className="h-10 w-auto" />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">
                      <span className="text-theme-text-primary">Top</span>
                      <span className="text-theme-glow-primary">E</span>
                      <span className="text-theme-text-primary">dge</span>
                    </span>
                  </div>
                </Link>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-theme-text-primary hover:text-theme-text-secondary focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4">
                {navItems.map((item, i) => (
                  <motion.div 
                    key={item.path}
                    variants={menuItemVariants}
                    custom={i}
                  >
                    <Link
                      to={item.path}
                      className={`block py-4 px-4 text-2xl font-semibold border-b border-theme-border-primary/10 ${
                        location.pathname === item.path
                          ? 'text-theme-glow-primary'
                          : 'text-theme-text-primary hover:text-theme-glow-primary'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div 
                className="mt-12"
                variants={menuItemVariants}
                custom={navItems.length}
              >
                <Link
                  to="/booking"
                  className="block w-full bg-gradient-to-r from-theme-glow-primary to-theme-glow-accent text-theme-text-inverse py-4 px-6 rounded-xl font-medium text-center text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
