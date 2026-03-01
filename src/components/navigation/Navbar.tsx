import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Calendar, Home, User, Star, Tag, Mail, Users, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger visually distinct state on scroll
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home, desc: 'Start' },
    // { path: '/contact', label: 'Contact', icon: Mail, desc: 'Support' },
    // { path: '/#reviews-section', label: 'About', icon: User, desc: 'Story' },
    // { path: '/services', label: 'Services', icon: Calendar, desc: 'Work' },
    { path: '/testimonials', label: 'Testimonials', icon: Star, desc: 'Trust' },
    { path: '/pricing', label: 'Pricing', icon: Tag, desc: 'Plans' },
    { path: '/community/home', label: 'Community', icon: Users, desc: 'Join' },
  ];

  // --- THE "IOS 26" LIQUID GLASS FORMULA ---
  // 1. High Blur (50px) to wash out text behind it
  // 2. Saturation (180%) to make background colors distinct but soft
  // 3. White Alpha to brighten dark backgrounds for readability
  const liquidGlass = cn(
    "backdrop-blur-[40px] backdrop-saturate-[180%] bg-white/70",
    "border border-white/40",
    "shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]",
    "ring-1 ring-white/30 ring-inset"
  );

  return (
    <>
      {/* Container - Fixed & Centered */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isScrolled ? "pt-4" : "pt-8"
      )}>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="pointer-events-auto w-full max-w-4xl px-4"
        >
          {/* --- THE CAPSULE BAR --- */}
          <div className={cn(
            "relative flex items-center justify-between rounded-full pl-2 pr-2 py-2.5 transition-all duration-500",
            liquidGlass,
            // When scrolled, increase opacity slightly to ensure contrast on complex backgrounds
            isScrolled && "bg-white/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
          )}>

            {/* Shimmer Overlay (Reflective Sheen) */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none opacity-40 mix-blend-overlay" />

            {/* --- Logo --- */}
            <Link to="/" className="relative flex items-center gap-3 px-4 group z-10">
              <div className="relative w-9 h-9 overflow-hidden rounded-full shadow-inner ring-1 ring-black/5 group-hover:scale-105 transition-transform duration-500 bg-white">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = '/favicon.ico'; }}
                />
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-lg flex items-center gap-0.5">
                Top<span className="text-blue-600">E</span>dge
              </span>
            </Link>

            {/* --- Actions & Toggle --- */}
            <div className="flex items-center gap-2 z-10">
              {/* Desktop Links (Hidden on Mobile) */}
              <div className="hidden md:flex items-center gap-1 mr-2">
                <Link
                  to="/booking"
                  className="group relative overflow-hidden px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 bg-slate-900"
                >
                  <span className="relative flex items-center gap-2">
                    Book Coffe Call <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* --- Morphing Menu Button --- */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "relative flex items-center gap-2 p-1 rounded-full transition-all duration-500 ease-out border overflow-hidden backdrop-blur-md",
                  isOpen
                    ? "bg-slate-900 border-slate-900 w-24 justify-end pr-1"
                    : "bg-white/50 border-white/40 hover:bg-white/80 w-[46px] justify-center"
                )}
              >
                <AnimatePresence mode='wait'>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      className="absolute left-3 text-xs font-bold text-white whitespace-nowrap"
                    >
                      Close
                    </motion.span>
                  )}
                </AnimatePresence>

                <div className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm",
                  isOpen
                    ? "bg-white/20 rotate-90 text-white"
                    : "bg-white text-slate-900"
                )}>
                  {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* --- Liquid Menu Dropdown --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            />

            {/* The Dropdown Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className={cn(
                "fixed z-50 overflow-hidden flex flex-col origin-top",
                // Position logic
                "inset-x-4 top-28", // Mobile position
                "md:inset-auto md:top-28 md:left-1/2 md:-translate-x-1/2 md:w-[600px]", // Desktop Position
                "rounded-[2.5rem]", // Super rounded corners
                // Reuse the Liquid Glass Style for consistency
                liquidGlass,
                "bg-white/95" // Slightly more opaque for the menu to ensure text legibility
              )}
            >
              <div className="p-3">
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + (i * 0.03) }}
                    >
                      <Link
                        to={item.path}
                        onClick={(e) => {
                          setIsOpen(false);
                          if (item.path.startsWith('/#')) {
                            e.preventDefault();
                            const targetId = item.path.split('#')[1];
                            if (location.pathname !== '/') {
                              window.location.href = `/#${targetId}`;
                            } else {
                              const el = document.getElementById(targetId);
                              if (el) {
                                el.scrollIntoView({ behavior: 'smooth' });
                              }
                            }
                            return;
                          }
                        }}
                        className={cn(
                          "group flex items-center p-3 rounded-[2rem] transition-all duration-300 relative overflow-hidden",
                          location.pathname === item.path
                            ? "bg-white shadow-md ring-1 ring-black/5"
                            : "hover:bg-white/40 hover:shadow-sm"
                        )}
                      >
                        {/* Icon Box */}
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 mr-3 shadow-inner",
                          location.pathname === item.path
                            ? "bg-slate-900 text-white"
                            : "bg-white/60 text-slate-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white"
                        )}>
                          <item.icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <span className={cn(
                            "text-sm font-bold transition-colors leading-tight",
                            location.pathname === item.path ? "text-slate-900" : "text-slate-700 group-hover:text-black"
                          )}>
                            {item.label}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-500">
                            {item.desc}
                          </span>
                        </div>

                        {/* Hover Arrow */}
                        <div className="w-6 h-6 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Specific CTA (Hidden on Desktop) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="md:hidden mt-2"
                >
                  <Link
                    to="/booking"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full py-4 rounded-[2rem] bg-slate-900 text-white font-bold text-sm shadow-xl active:scale-95 transition-all"
                  >
                    Book Appointment
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
