import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Calendar, Home, User, Star, Tag, Mail, Users } from 'lucide-react';
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
    { path: '/', label: 'Home', icon: Home },
    { path: '/community/home', label: 'Community', icon: Users },
    { path: '/about', label: 'About', icon: User },
    { path: '/services', label: 'Services', icon: Calendar },
    { path: '/testimonials', label: 'Testimonials', icon: Star },
    { path: '/pricing', label: 'Pricing', icon: Tag },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
      isScrolled ? "pt-4" : "pt-6"
    )}>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl px-4"
      >
        <div className={cn(
          "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
          "bg-white/70 backdrop-blur-md border border-white/40 shadow-sm",
          isScrolled && "bg-white/90 shadow-md border-gray-200"
        )}>
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group mr-auto">
            <div className="relative w-10 h-10 overflow-hidden rounded-full shadow-sm">
               <img 
                 src="/logo.png" 
                 alt="TopEdge" 
                 className="w-full h-full object-cover"
                 onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = '/favicon.ico'; }}
               />
            </div>
            <span className="font-bold text-gray-900 tracking-tight text-lg">
              Top<span className="text-blue-600">E</span>dge
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3 mr-4">
            {/* Community Link - Visible on Desktop */}
            <Link 
              to="/community/home" 
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Users className="w-4 h-4" />
              Community
            </Link>

            {/* Book Appointment CTA */}
            <Link 
              to="/booking" 
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>

          {/* Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-all text-sm font-medium border border-transparent"
          >
            <span className="hidden sm:inline">Menu</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
             {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            
            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl transition-all group",
                        location.pathname === item.path 
                          ? "bg-gray-100 text-blue-600" 
                          : "hover:bg-gray-50 text-gray-600 hover:text-black"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        location.pathname === item.path ? "bg-white shadow-sm" : "bg-gray-100 group-hover:bg-white group-hover:shadow-sm"
                      )}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                      {location.pathname === item.path && (
                        <motion.div layoutId="activeDot" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                      )}
                    </Link>
                  ))}
                  
                  {/* Mobile Only CTAs if needed */}
                  <Link
                     to="/booking"
                     onClick={() => setIsOpen(false)}
                     className="md:hidden flex items-center gap-3 p-4 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all col-span-1 md:col-span-2"
                  >
                     <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <Calendar className="w-5 h-5" />
                     </div>
                     <span className="font-bold">Book Appointment</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
