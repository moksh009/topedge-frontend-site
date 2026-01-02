import React, { useState, useEffect, useRef } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, ArrowRight, Zap, Code2, Sparkles, 
  Workflow, Database, Terminal, Box, Filter, Play, CheckCircle2
} from 'lucide-react';
import { collection, query, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Resource {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  price?: number;
  tools: string[];
  userId: string;
  userName: string;
  userPhoto?: string;
  videoUrl?: string; // Added videoUrl
  category: 'automation' | 'project' | 'tool' | 'prompt';
}

// Sub-component for handling video hover effects
const ResourceCard = ({ resource, index }: { resource: Resource; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-play video on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.play().catch(() => {}); // Ignore play errors
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovering]);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'automation': return <Workflow className="w-4 h-4 text-indigo-500" />;
      case 'tool': return <Terminal className="w-4 h-4 text-emerald-500" />;
      case 'prompt': return <Sparkles className="w-4 h-4 text-amber-500" />;
      default: return <Box className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group flex flex-col h-full bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:border-indigo-200 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2"
    >
      {/* 1. MEDIA HEADER */}
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-50">
          
          {/* Floating Badges (Glassmorphism) */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
             <div className="px-2.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-white/20 shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                {getCategoryIcon(resource.category)}
                {resource.category}
             </div>
          </div>

          <div className="absolute top-4 right-4 z-20">
             <span className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm backdrop-blur-md",
                resource.isPaid 
                  ? "bg-slate-900/90 text-white border-slate-900" 
                  : "bg-white/90 text-slate-700 border-white/20"
             )}>
                {resource.isPaid ? `$${resource.price}` : 'Free'}
             </span>
          </div>

          {/* Video / Placeholder Logic */}
          {resource.videoUrl ? (
             resource.videoUrl.includes('cloudinary') || resource.videoUrl.endsWith('.mp4') ? (
                // Direct Video (Cloudinary) - Plays on Hover
                <video 
                   ref={videoRef}
                   src={resource.videoUrl} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   muted 
                   loop 
                   playsInline
                />
             ) : (
                // Fallback for YouTube links (Just show a nice cover + play icon)
                <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/50 to-purple-900/50"></div>
                   <Play className="w-12 h-12 text-white opacity-80" fill="white" />
                </div>
             )
          ) : (
             // No Video - Decorative Pattern
             <div className="w-full h-full bg-slate-50 relative">
                <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                       {getCategoryIcon(resource.category)}
                    </div>
                </div>
             </div>
          )}
      </div>

      {/* 2. CARD BODY */}
      <div className="p-6 flex-1 flex flex-col">
          
          <div className="mb-4">
             <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
                {resource.title}
             </h3>
             <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 h-10">
                {resource.description}
             </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
             {(resource.tools || []).slice(0, 3).map((tool, i) => (
                 <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide rounded-md group-hover:bg-slate-100 transition-colors">
                    {tool}
                 </span>
             ))}
             {(resource.tools || []).length > 3 && (
                 <span className="px-2 py-1 text-[10px] font-bold text-slate-400">+{resource.tools.length - 3}</span>
             )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 {resource.userPhoto ? (
                    <img src={resource.userPhoto} alt={resource.userName} className="w-8 h-8 rounded-full object-cover border border-slate-100" />
                 ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {resource.userName?.charAt(0)}
                    </div>
                 )}
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{resource.userName}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                       <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> Verified
                    </span>
                 </div>
              </div>

              <Link 
                to={`/community/resource/${resource.id}`}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all"
              >
                 <ArrowRight className="w-4 h-4" />
              </Link>
          </div>
      </div>
    </motion.div>
  );
};

const AutomationHub = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const q = query(
          collection(db, 'community_resources'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const resourcesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Resource[];
        setResources(resourcesData);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handlePromoteProject = async () => {
    if (!user) {
      navigate('/community/login');
      return;
    }
    try {
      const profileDoc = await getDoc(doc(db, 'public_profiles', user.uid));
      if (profileDoc.exists()) {
        navigate('/community/submit-resource');
      } else {
        if (window.confirm("You need a public profile to post a resource. Create one now?")) {
            navigate('/community/promote-profile');
        }
      }
    } catch (error) {
      console.error("Error checking profile:", error);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tools.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                          (filter === 'free' && !resource.isPaid) || 
                          (filter === 'paid' && resource.isPaid);

    return matchesSearch && matchesFilter;
  });

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-900 selection:text-white pb-20">
        
        {/* Subtle Noise Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

        <div className="container relative z-10 mx-auto px-6 max-w-7xl pt-16">
          
          {/* ================= HEADER SECTION ================= */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-slate-600 mb-6">
                <Zap className="w-3.5 h-3.5" />
                Automation Marketplace
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Discover verified <br/>
                <span className="text-slate-400">
                  Engineering Assets
                </span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                Stop rebuilding the basics. Access production-ready automations, agents, and templates built by the community.
              </p>
            </motion.div>
            
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePromoteProject}
              className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-lg shadow-slate-900/20 overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="flex items-center gap-2 relative z-10">
                <Plus className="w-5 h-5" />
                <span>Submit Resource</span>
              </div>
            </motion.button>
          </div>

          {/* ================= CONTROLS TOOLBAR ================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="sticky top-24 z-30 mb-12"
          >
            <div className="p-2 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[24px] shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-2">
              
              {/* Search Input */}
              <div className="relative flex-grow group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-100 text-slate-400 group-focus-within:bg-slate-200 group-focus-within:text-slate-900 transition-colors">
                  <Search className="w-4 h-4" />
                </div>
                <input 
                  type="text"
                  placeholder="Search workflows, stacks, or creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-4 h-14 bg-transparent rounded-xl text-slate-900 placeholder:text-slate-400 font-medium outline-none border border-transparent focus:bg-white focus:border-slate-300 transition-all"
                />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-10 bg-slate-200 my-auto mx-2" />

              {/* Filters */}
              <div className="flex bg-slate-100/50 p-1 rounded-xl">
                {(['all', 'free', 'paid'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-6 h-12 rounded-lg text-sm font-bold capitalize transition-all duration-300",
                      filter === f 
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" 
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= PREMIUM GRID SECTION ================= */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 opacity-50">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-medium text-slate-500">Loading marketplace...</p>
             </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
            >
              <AnimatePresence>
                {filteredResources.map((resource, index) => (
                  <ResourceCard key={resource.id} resource={resource} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          
          {/* Empty State */}
          {!loading && filteredResources.length === 0 && (
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-300"
            >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Filter className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No resources found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  We couldn't find any resources matching your search. Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={() => {setSearchTerm(''); setFilter('all');}}
                  className="mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Clear all filters
                </button>
             </motion.div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
};

export default AutomationHub;