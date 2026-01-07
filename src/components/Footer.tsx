import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, Youtube, Twitter, Mail, MapPin, 
  Bot, MessageSquare, Facebook, Linkedin, 
  Smartphone
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/services/firebase';

interface LinkItem {
  label: string;
  path: string;
  isNew?: boolean;
}
// Custom Discord Icon
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// --- CONFIGURATION ---
const services = [
  {
    icon: Bot,
    title: "AI Voice Agent",
    path: "/services",
    section: "ai-caller-demo"
  },
  {
    icon: MessageSquare,
    title: "Advanced Chatbot",
    path: "/services",
    section: "chatbot-showcase"
  },
  {
    icon: Smartphone,
    title: "WhatsApp Automation",
    path: "/services",
    section: "whatsapp-automation"
  }
];

const quickLinks: LinkItem[] = [
  { label: "Home", path: "/" },
  { label: "Community", path: "/community/home", isNew: true },
  { label: "About Us", path: "/about" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
  { label: "Book Demo", path: "/booking" },
];

const communityQuickLinks: LinkItem[] = [
  { label: "Community Home", path: "/community/home" },
  { label: "Profiles Directory", path: "/community/profiles" },
  { label: "Automation Hub", path: "/community/automation-hub" },
  { label: "Open Source", path: "/community/open-source" },
  { label: "Submit Resource", path: "/community/submit-resource" },
  { label: "Promote Profile", path: "/community/promote-profile" },
  { label: "Login", path: "/community/login" }
];

const legals = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms" },
];

const socialLinks = [
  { 
    icon: Instagram, 
    href: 'https://www.instagram.com/topedge_ai/', 
    label: 'Instagram',
    color: 'hover:bg-pink-500 hover:text-white hover:border-pink-500'
  },
  { 
    icon: Youtube, 
    href: 'https://www.youtube.com/@topedge_ai', 
    label: 'YouTube',
    color: 'hover:bg-red-500 hover:text-white hover:border-red-500'
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/topedgenetwork',
    label: 'LinkedIn',
    color: 'hover:bg-blue-600 hover:text-white hover:border-blue-600'
  },
  {
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=61553261702229',
    label: 'Facebook',
    color: 'hover:bg-blue-700 hover:text-white hover:border-blue-700'
  },
  {
    icon: DiscordIcon,
    href: 'https://discord.gg/your-invite-code',
    label: 'Discord',
    color: 'hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2]'
  }
];

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isCommunity = location.pathname.startsWith('/community');
  const [topResources, setTopResources] = useState<{ id: string; title: string }[]>([]);

  const handleServiceClick = (path: string, section: string) => {
    navigate(path);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    const fetchTop = async () => {
      if (!isCommunity) return;
      try {
        const q = query(
          collection(db, 'community_resources'),
          orderBy('upvotes', 'desc'),
          limit(5)
        );
        const snap = await getDocs(q);
        const items = snap.docs.map(d => ({ id: d.id, title: (d.data() as any).title || 'Untitled' }));
        setTopResources(items);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTop();
  }, [isCommunity]);

  return (
    <footer className="relative bg-white pt-12 md:pt-20 pb-0 overflow-hidden">
      
      {/* --- HUGE WATERMARK --- */}
      {/* Positioned absolute bottom, z-0 so it sits BEHIND the glass card */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[16vw] md:text-[20vw] font-black text-[#F3F4F6] leading-none tracking-tighter">
          TOPEDGE
        </h1>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl pb-8 md:pb-12">
        
        {/* Main Footer Card - Glassmorphism enabled to show watermark */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-white/50">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* BRAND COLUMN (Span 4) */}
            <div className="lg:col-span-4 space-y-8">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                       <img src="/logo.png" alt="TopEdge Logo" className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">
                      {isCommunity ? 'AI Community' : 'TopEdge AI'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-lg leading-relaxed max-w-sm font-medium">
                    {isCommunity 
                      ? 'Build, learn, and share automation together.'
                      : 'Empowering businesses with intelligent automation. We turn customer support into your biggest growth engine.'}
                  </p>
               </div>

               {/* Social Dock */}
               <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4 }}
                      className={`w-11 h-11 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color} bg-white`}
                      aria-label={social.label}
                    >
                       <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
               </div>
            </div>

            {/* LINKS COLUMNS (Span 8 - Divided into 3) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
               
              

               {/* Column 2: Company/Community */}
               <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">
                    {isCommunity ? 'Community' : 'Company'}
                  </h4>
                  <ul className="space-y-4">
                     {(isCommunity ? communityQuickLinks : quickLinks).map((link, idx) => (
                        <li key={idx}>
                           <Link 
                              to={link.path}
                              className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors"
                           >
                              <span className="font-medium">{link.label}</span>
                              {(!isCommunity && (link as any).isNew) && (
                                <span className="text-[9px] font-extrabold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wide">
                                    New
                                </span>
                              )}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Column 3: Top Resources or Contact */}
               <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">
                    {isCommunity ? 'Top Resources' : 'Get in Touch'}
                  </h4>
                  {isCommunity ? (
                    <ul className="space-y-4">
                      {topResources.length === 0 ? (
                        <li className="text-slate-400">No resources yet</li>
                      ) : (
                        topResources.map((res) => (
                          <li key={res.id}>
                            <Link 
                              to={`/community/resource/${res.id}`}
                              className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                              <span className="font-medium">{res.title}</span>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  ) : (
                    <div className="space-y-4">
                      <a href="mailto:team@topedgeai.com" className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white/80 transition-colors group border border-transparent hover:border-slate-200">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-slate-900 shadow-sm border border-slate-100 shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Email Us</p>
                          <p className="text-sm font-bold text-slate-900 break-all leading-tight">
                            team@topedgeai.com
                          </p>
                        </div>
                      </a>
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-transparent">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Visit Us</p>
                          <p className="text-sm font-bold text-slate-900 leading-snug">
                            Ahmedabad, Gujarat,<br/>India 382350
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
               </div>

            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
             <div className="flex items-center gap-1">
               <span>© {new Date().getFullYear()} {isCommunity ? 'AI Community' : 'TopEdge AI'}.</span>
               
             </div>
             
             <div className="flex flex-wrap justify-center gap-6">
                {legals.map((legal, idx) => (
                   <Link key={idx} to={legal.path} className="hover:text-slate-900 transition-colors">
                      {legal.label}
                   </Link>
                ))}
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
