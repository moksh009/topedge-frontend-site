import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Brain, ArrowRight, Calendar, Home, User, Star, Tag, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/services', label: 'Services', icon: Calendar },
    { path: '/testimonials', label: 'Testimonials', icon: Star },
    { path: '/pricing', label: 'Pricing', icon: Tag },
    { path: '/contact', label: 'Contact', icon: Mail },
    
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
        {/* Mobile pill navbar when scrolled */}
        <AnimatePresence>
  <motion.div
    className={
      `md:hidden flex fixed top-2 left-0 right-0 mx-auto w-[96vw] max-w-xl items-center justify-between z-50 ${scrolled ? 'rounded-full bg-white shadow-lg px-4 py-3' : 'rounded-2xl bg-white/90 px-4 py-3 border border-gray-200 shadow-md'} mt-1`
    }
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {/* Logo and Company Name */}
    <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
      <img src="logo.png" alt="TopEdge Logo" className="h-8 w-8 rounded-full object-cover" />
      <span className="text-base font-bold text-gray-900">Top<span className="text-theme-glow-primary">E</span>dge</span>
    </Link>
    {/* Hamburger/Close menu animation */}
    <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 hover:text-theme-glow-primary focus:outline-none transition-all duration-300">
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  </motion.div>
</AnimatePresence>
        {isOpen && (
  <AnimatePresence>
    <motion.div
      key="mobile-dropdown"
      initial={{ opacity: 0, y: -16, scale: 0.97 }}
      animate={{ opacity: 1, y: 12, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="md:hidden flex flex-col items-center fixed left-1/2 top-20 -translate-x-1/2 w-[85vw] max-w-xs bg-white rounded-3xl shadow-2xl py-6 px-4 z-50"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
    >
      {navItems.map((item, i) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 transition font-medium text-gray-900 text-lg justify-start"
          onClick={() => setIsOpen(false)}
        >
          {item.icon && <item.icon className="w-5 h-5 text-theme-glow-primary" />}
          {item.label}
        </Link>
      ))}
      <Link to="/booking" className="mt-4 block w-full">
  <button
    className="w-full flex-nowrap flex items-center justify-center gap-2 bg-theme-glow-primary text-white font-semibold py-3 px-4 rounded-2xl text-lg shadow hover:bg-blue-700 transition whitespace-nowrap"
    style={{ minWidth: 0 }}
  >
    <Calendar className="w-5 h-5 flex-shrink-0" />
    <span className="truncate">Book Appointment</span>
  </button>
</Link>
    </motion.div>
  </AnimatePresence>
)}
        {/* Desktop or default navbar */}
        <div className="container mx-auto px-4 md:flex hidden">
          <div className="flex items-center w-full">
            {/* Logo */}
            <Link to="/" className="relative group md:block hidden">
              <div className="flex items-center space-x-4">
                {/* Logo from public directory with fallback alt and style */}
                <picture>
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img 
                    src="/logo.png" 
                    alt="TopEdge AI Logo" 
                    className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" 
                    style={{ minWidth: 40, minHeight: 40, objectFit: 'contain' }} 
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = '/favicon.ico'; }}
                  />
                </picture>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    <span className="text-theme-text-primary">Top</span>
                    <span className="text-theme-glow-primary">E</span>
                    <span className="text-theme-text-primary">dge</span>
                  </span>
                </div>
              </div>
            </Link>
            {/* Desktop Navigation Links */}
            <div className="flex-1 flex items-center ml-40 space-x-6">
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
            </div>
            {/* Book Appointment Button (remains at far right) */}
            <div className="flex items-center ml-auto">
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

    </>
  );
};

export default Navbar;
