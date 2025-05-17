import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact', href: '/contact' },
  { name: 'Pricing', href: '/pricing' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setScrolled(window.scrollY > 24);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Special style for /landing page
  const isLanding = typeof window !== 'undefined' && window.location.pathname === '/landing';

  return (
    <nav
      className={`
        fixed left-0 top-0 w-full z-50 transition-all duration-500
        ${isLanding ?
          'bg-[#101e3a]/95 text-white shadow-lg border-b border-blue-900' :
          'bg-white/90 text-blue-900 shadow-md border-b border-gray-100'
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="TopEdge AI Logo" className="w-9 h-9" />
          <span className={`font-bold text-xl tracking-tight ${isLanding ? 'text-white' : 'text-blue-900'}`}>TopEdge <span className={isLanding ? 'text-blue-300' : 'text-blue-600'}>AI</span></span>
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`font-medium transition-colors text-base ${isLanding ? 'text-white hover:text-blue-200' : 'text-blue-900 hover:text-blue-600'}`}
            >
              {item.name}
            </a>
          ))}
        </div>
        <a href="#" className={`ml-4 px-6 py-2 rounded-full font-semibold shadow transition-colors text-base
          ${isLanding ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500'}`}>Book Appointment</a>
      </div>
    </nav>
  );
};

export default Navbar; 