import React, { useEffect, useState } from 'react';
import '../i18n';
import { motion } from 'framer-motion';
import { 
  Instagram, Youtube, Mail, MapPin, 
  Bot, MessageSquare, Linkedin, 
  Smartphone, ArrowRight, Globe
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { EmailService } from '@/services/emailService';

interface LinkItem {
  label: string;
  path: string;
  isNew?: boolean;
}

const LAUNCH_DATE = new Date('2026-01-29T00:00:00');

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
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/topedgeai', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white hover:border-blue-600' },
  { icon: Instagram, href: 'https://www.instagram.com/topedge_ai/', label: 'Instagram', color: 'hover:bg-pink-500 hover:text-white hover:border-pink-500' },
  { icon: Youtube, href: 'https://www.youtube.com/@topedge_ai', label: 'YouTube', color: 'hover:bg-red-500 hover:text-white hover:border-red-500' },
];

const Footer = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isCommunity = location.pathname.startsWith('/community');
  const [topResources, setTopResources] = useState<{ id: string; title: string }[]>([]);
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    setIsLaunched(new Date() >= LAUNCH_DATE);
  }, []);

  useEffect(() => {
    const fetchTop = async () => {
      if (!isCommunity || !isLaunched) return;
      try {
        const emailService = new EmailService();
        const apiData = await emailService.getPublicStats();
        
        if (apiData && apiData.success && apiData.topResourcesByUpvotes) {
           setTopResources(apiData.topResourcesByUpvotes);
           return;
        }

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
  }, [isCommunity, isLaunched, user]);

  return (
    <footer className="relative bg-white pt-24 pb-0 overflow-hidden">
      
      {/* --- BACKGROUND WATERMARK (Adjusted for visibility) --- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[18vw] font-black text-slate-100/80 leading-none tracking-tighter">
          TOPEDGE
        </h1>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl pb-8 md:pb-12">
        
        {/* Main Footer Card */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-white/60">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* BRAND COLUMN (Span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
               <div className="space-y-6">
                  <Link to="/" className="inline-flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-white to-slate-50 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
                       <img src="/logo.png" alt="TopEdge Logo" className="w-7 h-7 object-contain" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {isCommunity ? 'AI Community' : 'TopEdge AI'}
                    </span>
                  </Link>
                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    {isCommunity 
                      ? 'Build, learn, and share automation together. Join the builders creating the future.'
                      : 'Empowering businesses with intelligent automation. We turn customer support into your biggest growth engine.'}
                  </p>
               </div>

               {/* Social Icons (Moved down for balance) */}
               <div className="flex flex-wrap gap-2 pt-8">
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className={`w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 transition-all duration-200 ${social.color} bg-white shadow-sm`}
                      aria-label={social.label}
                    >
                       <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
               </div>
            </div>

            {/* LINKS COLUMNS (Span 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
               
               {/* Column 1: Navigation */}
               <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">
                    {isCommunity ? 'Platform' : 'Explore'}
                  </h4>
                  <ul className="space-y-3">
                     {(isCommunity ? communityQuickLinks : quickLinks).map((link, idx) => (
                        <li key={idx}>
                           <Link 
                              to={link.path}
                              className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors py-1"
                           >
                              <span className="font-medium text-sm">{link.label}</span>
                              {(!isCommunity && (link as any).isNew) && (
                                <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-wide">
                                    New
                                </span>
                              )}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Column 2: Resources/Support */}
               <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">
                    {isCommunity ? 'Trending' : 'Support'}
                  </h4>
                  {isCommunity ? (
                    <ul className="space-y-3">
                      {isLaunched && topResources.length > 0 ? (
                          topResources.map((res) => (
                            <li key={res.id}>
                              <Link 
                                to={`/community/resource/${res.id}`}
                                className="group flex items-start gap-2 text-slate-500 hover:text-blue-600 transition-colors py-1"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors mt-1.5 shrink-0" />
                                <span className="font-medium text-sm line-clamp-1">{res.title}</span>
                              </Link>
                            </li>
                          ))
                      ) : (
                        <li className="text-slate-400 text-sm italic">Coming soon...</li>
                      )}
                    </ul>
                  ) : (
                    <ul className="space-y-3">
                        <li><Link to="/help" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">Help Center</Link></li>
                        <li><Link to="/status" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">System Status</Link></li>
                        <li><Link to="/api-docs" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">API Docs</Link></li>
                    </ul>
                  )}
               </div>

               {/* Column 3: Contact Info (Fixed UI) */}
               <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">
                    Get in Touch
                  </h4>
                  
                  {/* Email Card */}
                  <a 
                    href="mailto:team@topedgeai.com" 
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all shadow-sm border border-slate-100 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Email Us</p>
                      <p className="text-sm font-bold text-slate-900 break-words">team@topedgeai.com</p>
                    </div>
                  </a>

                  {/* Location Card */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-transparent">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Visit Us</p>
                      <p className="text-sm font-bold text-slate-900 leading-tight">
                        Ahmedabad, Gujarat,<br/>India 382350
                      </p>
                    </div>
                  </div>
               </div>

            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
             <div className="flex items-center gap-1">
               <span>© {new Date().getFullYear()} TopEdge AI. All rights reserved.</span>
             </div>
             
             <div className="flex flex-wrap justify-center gap-6">
                {legals.map((legal, idx) => (
                   <Link key={idx} to={legal.path} className="hover:text-blue-600 transition-colors">
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