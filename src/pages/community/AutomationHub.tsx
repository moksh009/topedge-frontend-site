import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, ArrowRight, Zap, Code2, Layers, SlidersHorizontal, Sparkles } from 'lucide-react';
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
  category: 'automation' | 'project' | 'tool' | 'prompt';
}

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
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-20">
        
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative mx-auto px-6 max-w-7xl pt-16">
          
          {/* ================= HEADER SECTION ================= */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-indigo-600 mb-6">
                <Zap className="w-3.5 h-3.5 fill-indigo-600" />
                Automation Marketplace
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Discover verified <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
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
              className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] overflow-hidden transition-all"
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
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-100 text-slate-400 group-focus-within:bg-indigo-50 group-focus-within:text-indigo-600 transition-colors">
                  <Search className="w-4 h-4" />
                </div>
                <input 
                  type="text"
                  placeholder="Search workflows, stacks, or creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-4 h-14 bg-transparent rounded-xl text-slate-900 placeholder:text-slate-400 font-medium outline-none border border-transparent focus:bg-white focus:border-indigo-100 transition-all"
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

          {/* ================= GRID SECTION ================= */}
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
                  <motion.div
                    layout
                    key={resource.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group flex flex-col h-full bg-white rounded-[32px] border border-slate-200 p-2 hover:border-indigo-200 hover:shadow-[0_20px_40px_-20px_rgba(79,70,229,0.15)] transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Card Content Wrapper */}
                    <div className="flex-1 p-6 flex flex-col relative overflow-hidden rounded-[24px]">
                      
                      {/* Hover Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Top Row: User & Price */}
                      <div className="relative flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {resource.userPhoto ? (
                                <img src={resource.userPhoto} alt={resource.userName} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold ring-2 ring-white">
                                    {resource.userName?.charAt(0)}
                                </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                              <Sparkles className="w-2 h-2 text-white" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Creator</p>
                            <p className="text-sm font-semibold text-slate-900">{resource.userName}</p>
                          </div>
                        </div>

                        <span className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5",
                          resource.isPaid 
                            ? "bg-white text-slate-900 border-slate-200 shadow-sm" 
                            : "bg-emerald-50 text-emerald-700 border-emerald-100"
                        )}>
                          {resource.isPaid ? (
                            <><span className="text-slate-400">$</span>{resource.price}</>
                          ) : (
                            <>FREE</>
                          )}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="relative mb-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                          {resource.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="relative mt-auto">
                        <div className="flex items-center gap-2 mb-3">
                           <Code2 className="w-3.5 h-3.5 text-slate-400" />
                           <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Built With</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(resource.tools || []).slice(0, 3).map((tool, i) => (
                            <span key={i} className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-white group-hover:shadow-sm transition-all">
                              {tool}
                            </span>
                          ))}
                          {(resource.tools || []).length > 3 && (
                            <span className="px-2 py-1 text-[10px] font-semibold rounded-md bg-slate-50 text-slate-400 border border-slate-100">
                              +{resource.tools.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <Link 
                      to={`/community/resource/${resource.id}`}
                      className="mt-2 mx-2 mb-2 py-3.5 rounded-[24px] bg-slate-50 border border-transparent text-slate-900 text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-lg transition-all duration-300"
                    >
                        View Details
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
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
                  <SlidersHorizontal className="w-8 h-8 text-slate-400" />
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