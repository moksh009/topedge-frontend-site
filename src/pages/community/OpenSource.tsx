import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, BookOpen, GitBranch, Terminal, FolderGit2, Code2 } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import LaunchGate from '@/components/ui/LaunchGate';
import { useAuth } from '@/contexts/AuthContext';

interface Resource {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  tools: string[];
  userId: string;
  userName: string;
  userPhoto?: string;
  category: 'automation' | 'project' | 'tool' | 'prompt';
  createdAt?: any;
}

const OpenSource = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'automation' | 'prompt' | 'tool' | 'project'>('all');
  const { user } = useAuth();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Fetch only free resources
        const q = query(
          collection(db, 'community_resources'),
          where('isPaid', '==', false)
        );
        const querySnapshot = await getDocs(q);
        const resourcesRaw = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        const resourcesData = resourcesRaw.sort((a, b) => {
          const ad = a.createdAt?.toDate?.() || new Date(0);
          const bd = b.createdAt?.toDate?.() || new Date(0);
          return bd.getTime() - ad.getTime();
        }) as Resource[];
        setResources(resourcesData);
      } catch (error) {
        console.error("Error fetching open source resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tools.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || resource.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-slate-900 selection:text-white pb-14 md:pb-20">
        
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative mx-auto px-6 max-w-7xl pt-12 md:pt-16">

          {/* ================= HERO SECTION ================= */}
          {/* UPDATED: items-center (mobile) -> md:items-end (desktop), mb-10 (reduced margin) */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // UPDATED: text-center (mobile) -> md:text-left (desktop)
              className="max-w-2xl text-center md:text-left"
            >
              {/* UPDATED: mx-auto (mobile) -> md:mx-0 (desktop) to center badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-slate-600 mb-6 mx-auto md:mx-0">
                <GitBranch className="w-3.5 h-3.5" />
                Open Source Library
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
                Community <br/>
                <span className="text-slate-400">Codebase & Tools</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto md:mx-0">
                Free, community-contributed resources. Fork, learn, and deploy production-ready automations without the cost.
              </p>
            </motion.div>
          </div>

          {/* ================= CONTROLS TOOLBAR ================= */}
          {/* UPDATED: relative (not sticky), improved mobile flex layout */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative z-30 mb-12"
          >
             <div className="p-2 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-2">
                {/* Search */}
                <div className="relative flex-grow group">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
                      <Search className="w-4 h-4" />
                   </div>
                   <input 
                      type="text"
                      placeholder="Search repositories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-12 md:h-12 pl-12 pr-4 bg-transparent rounded-xl text-slate-900 placeholder:text-slate-400 font-medium outline-none"
                   />
                </div>

                {/* Divider (Hidden on Mobile) */}
                <div className="hidden md:block w-px h-8 bg-slate-200 my-auto" />

                {/* Filters (Scrollable on Mobile) */}
                <div className="flex bg-slate-100/50 p-1 rounded-xl overflow-x-auto no-scrollbar">
                   {(['all', 'automation', 'prompt', 'tool', 'project'] as const).map((f) => (
                      <button
                         key={f}
                         onClick={() => setActiveFilter(f)}
                         className={cn(
                            "px-4 h-10 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap flex-shrink-0",
                            activeFilter === f 
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
                <p className="text-sm font-medium text-slate-500">Fetching repositories...</p>
             </div>
          ) : (
            <>
              {(() => {
                const myResources = filteredResources.filter(r => r.userId === (user?.uid || ''));
                const otherResources = filteredResources.filter(r => r.userId !== (user?.uid || ''));
                const isPreLaunch = new Date() < new Date('2026-01-19');
                return (
                  <>
                    {myResources.length > 0 && (
                      <div className="mb-12">
                        {/* UPDATED: Flex layout to stack properly on mobile */}
                        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 gap-3 text-center sm:text-left">
                          <h2 className="text-2xl font-bold text-slate-900">My Open Source</h2>
                          <Link to="/community/submit-resource" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg">
                            Contribute More
                          </Link>
                        </div>
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-2">
                          <AnimatePresence>
                            {myResources.map((resource, index) => (
                              <motion.div
                                layout
                                key={resource.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative flex flex-col bg-white rounded-[24px] border border-slate-200 p-6 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
                              >
                                <div className="flex justify-between items-start mb-6">
                                   <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                      <BookOpen className="w-6 h-6" />
                                   </div>
                                   <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                                      {resource.category}
                                   </span>
                                </div>
                                <div className="flex-1 mb-6">
                                   <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:underline decoration-slate-300 underline-offset-4 decoration-2">
                                      {resource.title}
                                   </h3>
                                   <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                                      {resource.description}
                                   </p>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                   {(resource.tools || []).slice(0, 3).map((tool, i) => (
                                      <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-600">
                                         <Terminal className="w-3 h-3 text-slate-400" />
                                         {tool}
                                      </div>
                                   ))}
                                </div>
                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                   <div className="flex items-center gap-2">
                                      {resource.userPhoto ? (
                                         <img src={resource.userPhoto} alt={resource.userName} className="w-6 h-6 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                      ) : (
                                         <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                            {resource.userName?.charAt(0)}
                                         </div>
                                      )}
                                      <span className="text-xs font-semibold text-slate-500 truncate max-w-[100px]">{resource.userName}</span>
                                   </div>
                                   <Link 
                                     to={`/community/resource/${resource.id}`}
                                     className="flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-slate-600 transition-colors"
                                   >
                                     View Code <ArrowRight className="w-3 h-3" />
                                   </Link>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    )}
                    
                    {/* UPDATED: Flex layout for consistency */}
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 gap-2 text-center sm:text-left">
                      <h2 className="text-2xl font-bold text-slate-900">Community Library</h2>
                      <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Locked until launch</span>
                    </div>
                    
                    <LaunchGate
                      active={isPreLaunch}
                      title="Open source visible after launch"
                      description="Contribute now. Library unlocks on launch day."
                    >
                      {/* UPDATED: Added max-h-[500px] + overflow-hidden to fix mobile height issue */}
                      <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 max-h-[500px] md:max-h-none overflow-hidden"
                      >
                        <AnimatePresence>
                          {otherResources.map((resource, index) => (
                            <motion.div
                              layout
                              key={resource.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ delay: index * 0.05 }}
                              className="group relative flex flex-col bg-white rounded-[24px] border border-slate-200 p-6 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1"
                            >
                              <div className="flex justify-between items-start mb-6">
                                 <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                    <BookOpen className="w-6 h-6" />
                                 </div>
                                 <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    {resource.category}
                                 </span>
                              </div>
                              <div className="flex-1 mb-6">
                                 <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:underline decoration-slate-300 underline-offset-4 decoration-2">
                                    {resource.title}
                                 </h3>
                                 <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                                    {resource.description}
                                 </p>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-6">
                                 {(resource.tools || []).slice(0, 3).map((tool, i) => (
                                    <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-600">
                                       <Terminal className="w-3 h-3 text-slate-400" />
                                       {tool}
                                    </div>
                                 ))}
                              </div>
                              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                    {resource.userPhoto ? (
                                       <img src={resource.userPhoto} alt={resource.userName} className="w-6 h-6 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                    ) : (
                                       <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                          {resource.userName?.charAt(0)}
                                       </div>
                                    )}
                                    <span className="text-xs font-semibold text-slate-500 truncate max-w-[100px]">{resource.userName}</span>
                                 </div>
                                 <Link 
                                   to={`/community/resource/${resource.id}`}
                                   className="flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-slate-600 transition-colors"
                                 >
                                   View Code <ArrowRight className="w-3 h-3" />
                                 </Link>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </LaunchGate>
                  </>
                );
              })()}
            </>
          )}
          
          {/* Empty State */}
          {!loading && filteredResources.length === 0 && (
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-300"
            >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FolderGit2 className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No open source projects found</h3>
                <p className="text-slate-500">
                  Try adjusting your search terms or be the first to contribute to the library.
                </p>
             </motion.div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
};

export default OpenSource;