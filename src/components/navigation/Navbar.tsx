import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Calendar, Home, User, Star, Tag, Mail, Users, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home, desc: 'Main Page' },
    { path: '/contact', label: 'Contact', icon: Mail, desc: 'Get in Touch' },
    { path: '/about', label: 'About', icon: User, desc: 'Our Story' },
    { path: '/services', label: 'Services', icon: Calendar, desc: 'What We Do' },
    { path: '/testimonials', label: 'Testimonials', icon: Star, desc: 'Client Love' },
    { path: '/pricing', label: 'Pricing', icon: Tag, desc: 'Plans & Costs' },
    { path: '/community/home', label: 'Community', icon: Users, desc: 'Join Builders' },
    
  ];

  // Apple-style Glass Morphism Classes
  const glassPanel = "bg-white/80 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]";
  const glassDropdown = "bg-white/95 backdrop-blur-2xl backdrop-saturate-150 border border-slate-200/60 shadow-2xl shadow-black/10 ring-1 ring-black/5";

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out pointer-events-none",
        isScrolled ? "pt-4" : "pt-6"
      )}>
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="pointer-events-auto w-full max-w-5xl px-4"
        >
          <div className={cn(
            "relative flex items-center justify-between rounded-full px-2 py-2 pr-2 transition-all duration-500",
            glassPanel,
            isScrolled && "bg-white/90 shadow-md"
          )}>
            
            {/* --- Logo Section --- */}
            <Link to="/" className="flex items-center gap-3 px-4 group">
              <div className="relative w-9 h-9 overflow-hidden rounded-full shadow-sm ring-2 ring-white group-hover:scale-105 transition-transform duration-300">
                 <img 
                   src="/logo.png" 
                   alt="TopEdge" 
                   className="w-full h-full object-cover"
                   onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = '/favicon.ico'; }}
                 />
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">
                Top<span className="text-blue-600">E</span>dge AI
              </span>
            </Link>

            {/* --- Desktop Actions --- */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 mr-2">
                 <Link 
                   to="/community/home" 
                   className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100/50"
                 >
                   Community
                 </Link>
                 <Link 
                   to="/booking" 
                   className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                 >
                   <span>Book Now</span>
                   <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>

              {/* --- Menu Toggle --- */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "flex items-center gap-2 pl-4 pr-2 py-2 rounded-full transition-all duration-300 border",
                  isOpen 
                    ? "bg-slate-900 text-white border-slate-900 pr-4" 
                    : "bg-white/50 hover:bg-white text-slate-700 border-transparent hover:border-slate-200"
                )}
              >
                <span className="text-sm font-semibold ml-1 hidden sm:block">{isOpen ? 'Close' : 'Menu'}</span>
                <div className={cn("p-1.5 rounded-full transition-colors", isOpen ? "bg-white/20" : "bg-slate-200")}>
                  {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* --- Full Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <>
             {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            
            {/* Menu Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className={cn(
                "fixed z-50 overflow-hidden flex flex-col",
                // Responsive Sizing
                "inset-x-4 top-24 bottom-auto rounded-[2rem]",
                "sm:inset-auto sm:top-28 sm:left-1/2 sm:-translate-x-1/2 sm:w-[600px] sm:h-auto sm:max-h-[80vh]",
                glassDropdown
              )}
            >
              <div className="flex-1 overflow-y-auto p-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group flex items-center p-3 rounded-[1.25rem] transition-all duration-300 border border-transparent",
                          location.pathname === item.path 
                            ? "bg-white shadow-sm border-slate-100" 
                            : "hover:bg-white/60 hover:shadow-sm"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors mr-3 shrink-0",
                          location.pathname === item.path ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                        )}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={cn("block text-sm font-bold transition-colors", location.pathname === item.path ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900")}>
                            {item.label}
                          </span>
                          <span className="block text-[11px] font-medium text-slate-400 group-hover:text-slate-500">
                            {item.desc}
                          </span>
                        </div>
                        {location.pathname === item.path && (
                           <ChevronRight className="w-4 h-4 text-slate-900" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Only CTAs */}
                  <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="sm:hidden col-span-1 mt-2 pt-2 border-t border-slate-100"
                  >
                     <Link
                       to="/booking"
                       onClick={() => setIsOpen(false)}
                       className="flex items-center justify-center w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-colors"
                     >
                       Book Appointment
                     </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;