import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Play, DollarSign, Wrench, Filter, Github, ArrowRight } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

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

const OpenSource = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'automation' | 'prompt' | 'tool' | 'project'>('all');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        // Fetch only free resources (client-side sort to avoid composite index requirement)
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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">OpenSource Library</h1>
              <p className="text-gray-500 max-w-xl text-lg">
                Free resources, automations, and tools for the community. 
                Learn, build, and contribute.
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search free resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
              />
            </div>
            
            <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
              {(['all', 'automation', 'prompt', 'tool', 'project'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-sm font-medium transition-all capitalize whitespace-nowrap",
                    activeFilter === f 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
             <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white border border-gray-200 rounded-[2rem] overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 shadow-sm ring-1 ring-gray-100 hover:ring-blue-100"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-[3rem] -z-0 transition-transform group-hover:scale-110" />
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {resource.userPhoto ? (
                            <img src={resource.userPhoto} alt={resource.userName} className="w-10 h-10 rounded-xl object-cover border border-gray-100 shadow-sm" />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-bold border border-blue-100 shadow-sm">
                                {resource.userName?.charAt(0)}
                            </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-gray-900">{resource.userName}</p>
                          <p className="text-xs text-gray-500">Creator</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-full text-xs font-bold border bg-gray-50 text-gray-600 border-gray-200 uppercase tracking-wider">
                          {resource.category}
                        </span>
                        <span className="px-3 py-1.5 rounded-full text-xs font-bold border bg-green-50 text-green-700 border-green-100">
                          Free
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(resource.tools || []).slice(0, 3).map((tool, i) => (
                        <span key={i} className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                          {tool}
                        </span>
                      ))}
                      {(resource.tools || []).length > 3 && (
                        <span className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg">
                          +{(resource.tools || []).length - 3}
                        </span>
                      )}
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
                         <Link 
                           to={`/community/resource/${resource.id}`}
                           className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl text-sm hover:shadow-lg transition-all shadow-md flex items-center justify-center gap-2 group/btn hover:scale-[1.01]"
                         >
                           Access Free
                           <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {!loading && filteredResources.length === 0 && (
             <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-200 shadow-sm mt-8">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No open source resources found</h3>
                <p className="text-gray-500">Be the first to contribute!</p>
             </div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
};

export default OpenSource;
