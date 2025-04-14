import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Phone, Mail, MapPin, Globe, Bot, MessageSquare, Calendar, Users, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const services = [
  {
    icon: Bot,
    title: "AI Voice Agent",
    description: "24/7 Intelligent Call Handling",
    path: "/services",
    section: "ai-caller-demo"
  },
  {
    icon: MessageSquare,
    title: "Advanced Chatbot",
    description: "Instant Multi-Channel Support",
    path: "/services",
    section: "chatbot-showcase"
  }
];

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleServiceClick = (path: string, section: string) => {
    navigate(path);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const socialLinks = [
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/topedgenetwork/', 
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    { 
      icon: Youtube, 
      href: 'https://www.youtube.com/@TopEdgeNetwork', 
      label: 'YouTube',
      color: 'hover:text-red-500'
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/TopEdgeNetwork', 
      label: 'X (Twitter)',
      color: 'hover:text-blue-400'
    }
  ];

  const contactInfo = [
    { 
      icon: Mail, 
      text: 'team@topedgeai.com', 
      href: 'mailto:team@topedgeai.com',
      color: 'group-hover:text-blue-400'
    },
    { 
      icon: Mail, 
      text: 'team@aitopedge.com', 
      href: 'mailto:team@aitopedge.com',
      color: 'group-hover:text-blue-400'
    },
    { 
      icon: Mail, 
      text: 'team@topedgenetwork.com', 
      href: 'mailto:team@topedgenetwork.com',
      color: 'group-hover:text-blue-400'
    },
    { 
      icon: Mail, 
      text: 'team@topedge.co.in', 
      href: 'mailto:team@topedge.co.in',
      color: 'group-hover:text-blue-400'
    },
  ];

  return (
    <footer className="bg-[#050505] border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="/logo.png" 
                alt="TopEdge Logo" 
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TopEdge
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              We tech-enable businesses and strengthen their customer acquisition game by Upleveling Customer Support
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className={`text-gray-400 ${social.color} transition-colors`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
              <motion.a
                href="https://www.threads.net/@topedgenetwork"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-purple-500 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.186V11.5h6.607v.687c0 1.879.386 3.2 1.146 3.925.761.726 1.85 1.101 3.237 1.122 1.374-.019 2.461-.397 3.224-1.125.763-.727 1.148-2.047 1.148-3.925V3.99c0-1.879-.386-3.2-1.146-3.925C14.955.339 13.866-.037 12.479-.058c-1.37.019-2.454.397-3.215 1.125-.761.727-1.146 2.047-1.146 3.925v2.95H1.5V5.031C1.5 1.779 2.35-1.027 3.995-3.283 5.64-5.538 8.393-6.719 11.98-6.744h.007c3.581.024 6.334 1.205 8.184 3.509C21.65-1.026 22.5 1.828 22.5 5.228v6.958c0 3.401-.85 6.257-2.495 8.512-1.645 2.255-4.398 3.436-7.979 3.461l-.84-.159z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Our Services</h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleServiceClick(service.path, service.section)}
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <service.icon className="w-5 h-5 mr-2" />
                    <span>{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group"
                  >
                    <item.icon className={`w-5 h-5 mr-2 text-gray-500 ${item.color} transition-colors`} />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Book Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} TopEdge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;