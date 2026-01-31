import { useEffect, useState } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import CommunitySEO from '@/components/community/CommunitySEO';
import { motion } from 'framer-motion';
import { db } from '@/services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { ArrowRight, Code2, Sparkles, MoveRight, Terminal, User } from 'lucide-react';
import LaunchGate from '@/components/ui/LaunchGate';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminEmail } from '@/utils/admin';
import { calculateReputation } from '@/utils/reputation';
import { EmailService } from '@/services/emailService';
import HireModal from '@/components/community/HireModal';

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVar = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

// --- CUSTOM BUTTON COMPONENT ---
const PremiumButton = ({ children, variant = 'primary', className, to }: any) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium rounded-2xl transition-all duration-300 group active:scale-[0.98]";
  
  const variants = {
    primary: "bg-slate-900 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]",
    secondary: "bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md",
    glow: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:-translate-y-1"
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
      )}
    </>
  );

  if (to) return <Link to={to} className={cn(baseStyles, variants[variant as keyof typeof variants], className)}>{content}</Link>;
  return <button className={cn(baseStyles, variants[variant as keyof typeof variants], className)}>{content}</button>;
};

const CommunityHome = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [activeHireId, setActiveHireId] = useState<string | null>(null);
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Try fetching from public API (works for guests)
        const emailService = new EmailService();
        const apiData = await emailService.getPublicStats();

        if (apiData && apiData.success) {
           if (apiData.topProfiles && apiData.topProfiles.length > 0) setProfiles(apiData.topProfiles);
           if (apiData.newResources && apiData.newResources.length > 0) setResources(apiData.newResources);
           
           // If we got both, we are good. If partial, maybe fallback?
           // Usually API returns both or fails.
           if (apiData.topProfiles?.length > 0 && apiData.newResources?.length > 0) return;
        }
      } catch (e) { console.error("API fetch failed, falling back to Firestore", e); }

      // If user is not logged in, we rely on public API first.
      // If API fails, we fallback to Firestore which allows public read.
      
      try {
        // Fetch profiles
        const qp = query(collection(db, 'public_profiles'));
        const rp = await getDocs(qp);
        const allProfiles = rp.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

        // Fetch resources for reputation calculation
        const qrAll = query(collection(db, 'community_resources'));
        const rrAll = await getDocs(qrAll);
        const allResources = rrAll.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

        // Calculate scores and sort
        const scoredProfiles = allProfiles
          .filter(p => p.fullName && p.fullName.trim().length > 0)
          .map(p => {
            const userResources = allResources.filter(r => r.userId === p.id || (p.uid && r.userId === p.uid));
            const { score, tier } = calculateReputation(
              {
                bio: p.description || p.bio,
                photoURL: p.photoURL,
                github: p.github,
                linkedin: p.linkedin,
                websiteURL: p.websiteURL
              },
              userResources.map(r => ({
                userId: r.userId,
                upvotes: Number((r.upvotes ?? r.stars) || 0),
                views: Number(r.views || 0),
                downloads: Number(r.downloads || 0),
                linkClicks: Number(r.linkClicks || 0),
                purchasers: r.purchasers || []
              }))
            );
            return { ...p, score, tier };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);

        setProfiles(scoredProfiles);
      } catch (e) { console.error(e) }

      try {
        const qr = query(collection(db, 'community_resources'), orderBy('createdAt', 'desc'), limit(2));
        const rr = await getDocs(qr);
        setResources(rr.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) { console.error(e) }
    };
    fetchData();
  }, []);

  return (
    <CommunityLayout>
      <CommunitySEO 
        title="TopEdge AI Community - Build, Scale & Learn Together"
        description="Join the premier ecosystem for AI engineers and founders. Access production-grade workflows, connect with top talent, and scale your AI automation business."
        url="/community/home"
      />
      <div className="bg-[#F8F9FB] min-h-screen text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-0">

        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-widest text-indigo-600 mb-8">
                <Sparkles className="w-3 h-3" />
                Web Based Community
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-slate-900 leading-[1.15] md:leading-[1.05] mb-6">
                Build First. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-500">
                  Ship Faster.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed font-light px-4">
A curated AI community where engineers share automations, sell workflows, and collaborate with serious builders working on production-grade systems.
              </p>

              <div className="flex flex-col items-center gap-4 px-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative z-20">
                  <PremiumButton to="/community/automation-hub" variant="primary" className="w-auto px-6 py-3 text-sm sm:text-base relative z-30">
                    Explore Hub <ArrowRight className="w-4 h-4" />
                  </PremiumButton>
                  <PremiumButton to="/community/promote-profile" variant="secondary" className="w-auto px-6 py-3 text-sm sm:text-base relative z-30">
                    Share Work
                  </PremiumButton>
                </div>
                {user && (!userProfile || !userProfile.fullName) && (
                 <Link
      to="/community/promote-profile"
      className="
        group relative flex w-full max-w-lg items-center justify-between
        overflow-hidden rounded-2xl border border-indigo-100
        bg-gradient-to-r from-white via-indigo-50/50 to-indigo-50
        p-5 shadow-sm transition-all duration-300
        hover:border-indigo-200 hover:shadow-md hover:to-indigo-100/60
      "
    >
      {/* Text Section */}
      <div className="flex flex-col gap-1 pr-4">
        <h3 className="text-[15px] font-semibold text-slate-900 leading-tight">
          Your profile isn't visible to community members.
        </h3>
        <p className="text-sm text-slate-500 leading-snug">
          Let's setup your profile first and boost your visibility.
        </p>
      </div>

      {/* Arrow Section - Vertically Centered */}
      <div className="flex shrink-0 items-center justify-center rounded-full bg-white/60 p-2 shadow-sm ring-1 ring-indigo-100 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-indigo-600 group-hover:ring-indigo-600">
        <ArrowRight className="h-5 w-5 text-indigo-600 transition-colors duration-300 group-hover:text-white" />
      </div>
    </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= FEATURED EXPERTS (Redesigned) ================= */}
        <section className="py-10 md:py-20 mb-0">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Featured Experts</h2>
                <p className="mt-3 text-lg text-slate-500">Engineering leaders shaping the future of AI.</p>
              </div>
              <div className="hidden md:block">
                 <PremiumButton to="/community/profiles" variant="secondary" className="px-6 py-3 text-sm">
                   View All Talent
                 </PremiumButton>
              </div>
            </div>

            {profiles.length > 0 ? (
              <>
              <motion.div 
                variants={containerVar}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-4"
              >
                {profiles.map((p, i) => (
                  <motion.div
                    key={p.id || i}
                    variants={itemVar}
                    className="group relative h-full"
                  >
                    <div className="relative h-full bg-white rounded-[2rem] p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl border border-slate-100 hover:border-indigo-100 group-hover:-translate-y-2 overflow-hidden">
                       {/* Gradient Overlay Effect */}
                       <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       
                       {/* Profile Image Area */}
                       <div className="relative mb-6 z-10">
                         <div className="w-32 h-32 rounded-full p-1.5 bg-white shadow-xl shadow-indigo-100/50 ring-1 ring-slate-100">
                           <div className="w-full h-full rounded-full overflow-hidden relative">
                             {p.photoURL ? (
                                <img src={p.photoURL} alt={p.fullName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             ) : (
                                <div className="w-full h-full bg-slate-50 flex items-center justify-center text-3xl font-bold text-slate-300">
                                  {(p.fullName || 'U')[0]}
                                </div>
                             )}
                           </div>
                         </div>
                         {/* Score Badge */}
                         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white z-10 whitespace-nowrap">
                            <Sparkles className="w-3 h-3 text-yellow-400" />
                            <span>{p.score || 0} Rep</span>
                         </div>
                       </div>

                       {/* Info */}
                       <div className="relative z-10 w-full flex flex-col items-center">
                         <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                           {p.fullName || 'Anonymous User'}
                         </h3>
                         <p className="text-slate-500 font-medium mb-6 line-clamp-2 max-w-[240px] h-12">
                           {p.currentWork || 'AI Enthusiast & Builder'}
                         </p>

                         {/* Skills */}
                         <div className="flex flex-wrap justify-center gap-2 mb-8 w-full min-h-[32px]">
                            {(p.aiSkills || ['Python', 'System Design']).slice(0, 3).map((skill: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 group-hover:text-indigo-600 transition-colors">
                                {skill}
                              </span>
                            ))}
                         </div>

                         {/* Action */}
                         <div className="mt-auto w-full flex flex-col gap-2">
                           <Link 
                             to={`/community/profile/${p.id}`}
                             className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold transition-all duration-300 hover:bg-slate-800 hover:shadow-lg active:scale-95 group/btn"
                           >
                             View Profile
                           </Link>
                           {p.workingStatus === 'Open to Work' && (
                             <button
                               onClick={() => {
                                 if (!user) {
                                   navigate('/community/signup');
                                   return;
                                 }
                                 setActiveHireId(p.id);
                               }}
                               className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 text-white font-semibold transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg active:scale-95"
                             >
                               Hire Me
                             </button>
                           )}
                         </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="md:hidden flex justify-center mt-8">
                 <PremiumButton to="/community/profiles" variant="secondary" className="w-auto px-6 py-3 text-sm">
                   View All Talent
                 </PremiumButton>
              </div>
             </>
            ) : (
               <div className="text-center py-20">
                 <p className="text-slate-500">Loading experts...</p>
               </div>
            )}
          </div>
        </section>

        {/* ================= CURATED AUTOMATIONS (Redesigned) ================= */}
        <section className="py-16 md:py-24 bg-[#0F1115] text-white relative overflow-hidden mb-6 rounded-[3rem] mx-2 md:mx-6 md:rounded-[4rem]">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container relative z-10 mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-20 text-center lg:text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-indigo-400 font-bold tracking-wider text-xs uppercase mb-4 justify-center lg:justify-start w-full">
                  <Terminal className="w-4 h-4" />
                  Marketplace
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Don't reinvent the wheel. <br />
                  <span className="text-slate-400">Deploy verified workflows.</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-md mx-auto lg:mx-0">
                  Skip the boilerplate. Access a library of agents, scrapers, and automation flows built by verified experts.
                </p>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <PremiumButton to="/community/automation-hub" variant="glow" className="w-auto sm:w-auto">
                  Browse Marketplace
                </PremiumButton>
              </div>
            </div>

            {(() => {
              const myResources = resources.filter(r => (user?.uid || '') === r.userId);
              const otherResources = resources.filter(r => (user?.uid || '') !== r.userId);
              const isPreLaunch = new Date() < new Date('2026-01-29');
              const isAdmin = isAdminEmail(user?.email);
              const showGate = isPreLaunch && !isAdmin;
              return (
                <>
                  {myResources.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {myResources.map((r, i) => (
                        <motion.div
                          key={r.id || i}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          className="group relative rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden hover:bg-white/[0.05] active:scale-[0.99]"
                        >
                          <div className="p-8 md:p-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-8">
                              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                <Code2 className="w-7 h-7" />
                              </div>
                              <span className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide",
                                r.isPaid 
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : "bg-white/10 text-white border-white/10"
                              )}>
                                {r.isPaid ? `$${r.price} USD` : 'FREE LICENSE'}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">
                              {r.title || "Untitled Automation"}
                            </h3>
                            <p className="text-slate-400 mb-8 line-clamp-2 leading-relaxed">
                              {r.description || "A powerful automation workflow designed to streamline your operations."}
                            </p>
                            <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tech Stack</div>
                                <div className="flex -space-x-2">
                                  {[1,2,3].map(n => (
                                    <div key={n} className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700" />
                                  ))}
                                </div>
                              </div>
                              <Link 
                                to={`/community/resource/${r.id}`}
                                className="flex items-center gap-2 text-sm font-bold text-white group/link"
                              >
                                Get Access 
                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  <LaunchGate
                    active={showGate}
                    title="Resources visible after launch"
                    description="Promote your resource now. Marketplace unlocks on launch day."
                    dark
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {otherResources.map((r, i) => (
                        <motion.div
                          key={r.id || i}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.6 }}
                          viewport={{ once: true }}
                          className="group relative rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden hover:bg-white/[0.05]"
                        >
                          <div className="p-8 md:p-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-8">
                              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                <Code2 className="w-7 h-7" />
                              </div>
                              <span className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-bold border tracking-wide",
                                r.isPaid 
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : "bg-white/10 text-white border-white/10"
                              )}>
                                {r.isPaid ? `$${r.price} USD` : 'FREE LICENSE'}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">
                              {r.title || "Untitled Automation"}
                            </h3>
                            <p className="text-slate-400 mb-8 line-clamp-2 leading-relaxed">
                              {r.description || "A powerful automation workflow designed to streamline your operations."}
                            </p>
                            <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tech Stack</div>
                                <div className="flex -space-x-2">
                                  {[1,2,3].map(n => (
                                    <div key={n} className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700" />
                                  ))}
                                </div>
                              </div>
                              <Link 
                                to={`/community/resource/${r.id}`}
                                className="flex items-center gap-2 text-sm font-bold text-white group/link"
                              >
                                Get Access 
                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </LaunchGate>
                </>
              );
            })()}
          </div>
        </section>

        {/* ================= EXTRAORDINARY CTA ================= */}
        <section className="pt-0 md:pt-16 pb-0 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="relative rounded-[2.5rem] md:rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl">
              {/* Abstract Background Shapes */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-[50%] -left-[20%] w-[100%] h-[200%] bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rotate-12 blur-3xl opacity-60" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px]" />
              </div>

              <div className="relative z-10 p-10 md:p-24 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight mb-6 md:mb-8 leading-tight">
                    Ready to scale your <br />
                    <span className="text-indigo-400">engineering journey?</span>
                  </h2>
                  
                  <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 md:mb-12">
                    Join a high-signal community where serious builders share code, feedback, and opportunities.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 relative z-30">
                    <PremiumButton to="/community/signup" variant="secondary" className="w-auto sm:w-auto px-8 md:px-10 py-4 md:py-5 text-lg font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] border-0">
                      Join Community Free
                    </PremiumButton>
                    {/* <button className="w-20% sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                      View Documentation
                    </button> */}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

      </div>
      {activeHireId && (() => {
        const p = profiles.find(x => x.id === activeHireId);
        if (!p) return null;
        return (
          <HireModal
            open={!!activeHireId}
            onClose={() => setActiveHireId(null)}
            name={p.fullName}
            photoURL={p.photoURL}
            contactEmail={p.email} 
            contactWebsite={p.websiteURL} 
            availableFor={p.workingStatus === 'Open to Work' ? ['Freelance', 'Full-time', 'Consulting'] : ['Networking']}
            recipientId={p.id}
          />
        );
      })()}
    </CommunityLayout>
  );
};

export default CommunityHome;
