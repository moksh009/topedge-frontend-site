import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, Phone, Mail, MapPin, Globe, Bot, MessageSquare, Calendar, Users, ArrowRight, Facebook, Linkedin } from 'lucide-react';
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
      href: 'https://www.instagram.com/topedge_ai/', 
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
    },
    {
      icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=61553261702229',
      label: 'Facebook',
      color: 'hover:text-blue-600'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/topedgenetwork',
      label: 'LinkedIn',
      color: 'hover:text-blue-500'
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
      icon: Instagram,
      text: 'Chat on Instagram',
      href: 'https://www.instagram.com/topedge_ai/',
      color: 'group-hover:text-pink-500'
    },
    {
      icon: Facebook,
      text: 'Chat on Facebook',
      href: 'https://www.facebook.com/profile.php?id=61553261702229',
      color: 'group-hover:text-blue-600'
    }
  ];

  return (
    <footer className="bg-theme-bg-secondary border-t border-theme-border-primary">
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
              <h3 className="text-2xl font-bold bg-gradient-to-r from-theme-text-accent to-primary-dark bg-clip-text text-transparent">
                TopEdge
              </h3>
            </div>
            <p className="text-theme-text-secondary mb-6">
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
                  className={`text-theme-text-secondary ${social.color} transition-colors`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
              <motion.a
                href="https://www.threads.net/@topedge_ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-theme-text-secondary hover:text-purple-500 transition-colors"
              >
                <svg 
                  className="w-6 h-6" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.743 11.123a8.547 8.547 0 0 0-.315-.142c-.185-.074-.374-.143-.565-.207-.336-.112-.674-.22-1.013-.314l-.063-.019c-.263-.075-.526-.135-.791-.194-.904-.198-1.637-.293-2.291-.293-.653 0-1.387.095-2.29.293-.266.059-.529.119-.792.194l-.063.019c-.339.094-.676.202-1.012.314-.191.064-.381.133-.566.207-.105.042-.21.091-.315.142-.781.381-1.206.851-1.206 1.334 0 .483.425.953 1.206 1.334.105.051.21.1.315.142.185.074.375.143.566.207.336.112.673.22 1.012.314l.063.019c.263.075.526.135.792.194.903.198 1.637.293 2.29.293.654 0 1.387-.095 2.291-.293.265-.059.528-.119.791-.194l.063-.019c.339-.094.677-.202 1.013-.314.191-.064.38-.133.565-.207.105-.042.21-.091.315-.142.781-.381 1.206-.851 1.206-1.334 0-.483-.425-.953-1.206-1.334zm-5.474 4.321c-2.723 0-4.931-1.555-4.931-3.472s2.208-3.472 4.931-3.472c2.724 0 4.932 1.555 4.932 3.472s-2.208 3.472-4.932 3.472z" />
                  <path d="M12.269 2C6.692 2 2.174 6.518 2.174 12.095c0 5.577 4.518 10.095 10.095 10.095 5.577 0 10.095-4.518 10.095-10.095C22.364 6.518 17.846 2 12.269 2zm0 18.19c-4.473 0-8.095-3.622-8.095-8.095 0-4.473 3.622-8.095 8.095-8.095 4.473 0 8.095 3.622 8.095 8.095 0 4.473-3.622 8.095-8.095 8.095z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-theme-text-primary mb-6">Our Services</h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleServiceClick(service.path, service.section)}
                    className="flex items-center text-theme-text-secondary hover:text-theme-text-accent transition-colors"
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
            <h3 className="text-xl font-semibold text-theme-text-primary mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="flex items-center text-theme-text-secondary hover:text-theme-text-accent transition-colors group"
                  >
                    <item.icon className={`w-5 h-5 mr-2 text-theme-text-secondary/70 ${item.color} transition-colors`} />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-theme-text-primary mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-theme-text-secondary hover:text-theme-text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-theme-text-secondary hover:text-theme-text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-theme-text-secondary hover:text-theme-text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-theme-text-secondary hover:text-theme-text-accent transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-theme-text-secondary hover:text-theme-text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-theme-text-secondary hover:text-theme-text-accent transition-colors">
                  Book Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-theme-border-primary text-center text-theme-text-secondary">
          <p>© {new Date().getFullYear()} TopEdge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;