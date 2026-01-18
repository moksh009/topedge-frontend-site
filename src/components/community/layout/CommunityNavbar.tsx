import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut, Settings, ChevronRight, Home, Users, Zap, BookOpen, Megaphone, MessageCircle, Calendar, Star, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { auth, db } from '@/services/firebase';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, limit, onSnapshot, where, doc, updateDoc } from 'firebase/firestore';

interface Notification {
  id: string;
  type:
    | 'star'
    | 'review'
    | 'hire_request'
    | 'announcement'
    | 'resource'
    | 'upvote'
    | 'access_request'
    | 'access_approved'
    | 'access_rejected'
    | 'access_expired';
  title: string;
  createdAt: any;
  link: string;
  isRead?: boolean;
}

const CommunityNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, userProfile } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const location = useLocation();

  // --- Personal Activity Feed ---
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    const q = query(
      collection(db, 'notifications'),
      where('recipientId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(d => {
        const data = d.data() as any;
        const type = data.type as Notification['type'];

        let title: string;
        if (type === 'star') {
          title = `${data.senderName || 'Someone'} starred ${data.resourceTitle || 'your project'}`;
        } else if (type === 'upvote') {
          title = `${data.senderName || 'Someone'} upvoted ${data.resourceTitle || 'your resource'}`;
        } else if (type === 'review') {
          title = `${data.senderName || 'Someone'} reviewed ${data.resourceTitle || 'your project'}`;
        } else if (type === 'hire_request') {
          title = `${data.senderName || 'Someone'} wants to hire you`;
        } else if (type === 'access_request') {
          title = `${data.senderName || 'Someone'} requested access to ${data.resourceTitle || 'your resource'}`;
        } else if (type === 'access_approved') {
          title = `Your access request for ${data.resourceTitle || 'a paid resource'} was approved`;
        } else if (type === 'access_rejected') {
          title = `Your access request for ${data.resourceTitle || 'a paid resource'} was rejected`;
        } else if (type === 'access_expired') {
          title = `Your access request for ${data.resourceTitle || 'a paid resource'} expired`;
        } else {
          title = 'Activity';
        }

        const link =
          type === 'hire_request'
            ? '/community/promote-profile'
            : data.resourceId
            ? `/community/resource/${data.resourceId}`
            : '/community/home';

        return {
          id: d.id,
          type,
          title,
          createdAt: data.createdAt,
          link,
          isRead: !!data.read,
        };
      });
      setNotifications(items);
      setUnreadCount(items.filter(i => !i.isRead).length);
    });
    return () => unsub();
  }, [user]);

  const markRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (e) {
      console.error(e);
    }
  };

  // --- Scroll Effect ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowProfileMenu(false);
      setIsOpen(false);
    } catch (error) { console.error(error); }
  };

  const navLinks = [
    { label: 'Home', path: '/community/home', icon: Home, desc: 'Community Dashboard' },
    { label: 'Profiles', path: '/community/profiles', icon: Users, desc: 'Connect with Builders' },
    { label: 'Automation Hub', path: '/community/automation-hub', icon: Zap, desc: 'Tools & Workflows' },
    { label: 'Open Source', path: '/community/open-source', icon: BookOpen, desc: 'Library of Code' },
    { label: 'Requests', path: '/community/requests', icon: Briefcase, desc: 'Reverse Marketplace' },
    
    { label: 'Announcements', path: '/community/announcements', icon: Megaphone, desc: 'Latest Updates' },
    { label: 'Discord', path: '/community/discord', icon: MessageCircle, desc: 'Live Chat' },
  ];

  const glassPanel = "bg-white/80 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]";
  const glassDropdown = "bg-white/95 backdrop-blur-2xl backdrop-saturate-150 border border-slate-200/60 shadow-2xl shadow-black/10 ring-1 ring-black/5";

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out pointer-events-none",
        isScrolled ? "pt-4" : "pt-6"
      )}>
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={cn(
            "pointer-events-auto w-full max-w-5xl px-4 transition-all duration-300",
          )}
        >
          <div className={cn(
            "relative flex items-center justify-between rounded-full px-2 py-2 pr-3 transition-all duration-500",
            glassPanel,
            isScrolled && "bg-white/90 shadow-md"
          )}>
            
            {/* --- Left: Logo --- */}
            <Link to="/community/home" className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 group shrink-0">
               <img src="/logo.png" alt="TopEdge AI" className="h-7 sm:h-8 w-auto object-contain" />
               {/* Fixed: Removed 'hidden' so text shows on mobile too. Adjusted text size for mobile. */}
               <span className="font-bold text-slate-900 tracking-tight text-sm sm:text-lg group-hover:text-blue-600 transition-colors whitespace-nowrap">
                 AI Community
               </span>
            </Link>

            {/* --- Right: Controls --- */}
            <div className="flex items-center gap-2">
              
              {user ? (
                <div className="flex items-center gap-2 mr-2">
                  {/* Notifications */}
                  <div className="relative">
                    <button 
                      onClick={() => { 
                        setShowNotifications(!showNotifications); 
                        setShowProfileMenu(false); 
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95",
                        showNotifications ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-600"
                      )}
                    >
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[16px] sm:min-w-[18px] h-[16px] sm:h-[18px] px-1 bg-rose-600 text-white rounded-full border border-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {showNotifications && (
                        <>
                          <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setShowNotifications(false)} />
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={cn(
                                glassDropdown,
                                "fixed top-24 left-4 right-4 z-50 rounded-3xl", // Mobile
                                "sm:absolute sm:top-14 sm:right-0 sm:left-auto sm:w-80 sm:rounded-3xl" // Desktop
                            )}
                          >
                             <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-gray-50/50">
                                <span className="font-bold text-sm text-slate-900">Notifications</span>
                                <button onClick={() => setShowNotifications(false)} className="sm:hidden p-1 rounded-full hover:bg-slate-200"><X className="w-4 h-4" /></button>
                             </div>
                             <div className="max-h-[300px] overflow-y-auto">
                                {notifications.length > 0 ? (
                                  notifications.map((n) => (
                                    <Link
                                      key={n.id}
                                      to={n.link}
                                      onClick={() => { setShowNotifications(false); markRead(n.id); }}
                                      className="block px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 relative group"
                                    >
                                      <div className="flex gap-3">
                                        <div
                                          className={cn(
                                            "mt-1.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                                            n.type === 'star' || n.type === 'upvote'
                                              ? "bg-yellow-100 text-yellow-600"
                                              : n.type === 'review'
                                              ? "bg-blue-100 text-blue-600"
                                              : n.type === 'hire_request'
                                              ? "bg-emerald-100 text-emerald-600"
                                              : n.type === 'access_request'
                                              ? "bg-indigo-100 text-indigo-600"
                                              : n.type === 'access_approved'
                                              ? "bg-emerald-50 text-emerald-700"
                                              : n.type === 'access_rejected'
                                              ? "bg-red-50 text-red-600"
                                              : n.type === 'access_expired'
                                              ? "bg-slate-100 text-slate-600"
                                              : "bg-slate-100 text-slate-500"
                                          )}
                                        >
                                           {n.type === 'star' || n.type === 'upvote' ? (
                                             <Star className="w-4 h-4" />
                                           ) : n.type === 'review' ? (
                                             <MessageCircle className="w-4 h-4" />
                                           ) : n.type === 'hire_request' ? (
                                             <Briefcase className="w-4 h-4" />
                                           ) : (
                                             <Bell className="w-4 h-4" />
                                           )}
                                         </div>
                                         <div>
                                            <p className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">{n.title}</p>
                                            <p className="text-xs text-slate-400 mt-1 font-medium">
                                              {n.createdAt?.toDate ? n.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                            </p>
                                         </div>
                                      </div>
                                    </Link>
                                  ))
                                ) : (
                                  <div className="p-8 text-center text-sm text-slate-400">
                                    No new updates
                                  </div>
                                )}
                             </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Profile */}
                  <div className="relative">
                    <button 
                      onClick={() => { 
                        setShowProfileMenu(!showProfileMenu); 
                        setShowNotifications(false); 
                        setIsOpen(false);
                      }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 ring-2 ring-transparent hover:ring-slate-200 transition-all active:scale-95"
                    >
                      <img 
                        src={userProfile?.photoURL || user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover shadow-sm bg-slate-100"
                      />
                    </button>

                    <AnimatePresence>
                      {showProfileMenu && (
                        <>
                          <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setShowProfileMenu(false)} />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={cn(
                                glassDropdown,
                                "fixed top-24 left-4 right-4 z-50 rounded-3xl p-2", // Mobile
                                "sm:absolute sm:top-14 sm:right-0 sm:left-auto sm:w-64 sm:rounded-3xl" // Desktop
                            )}
                          >
                            <div className="px-4 py-3 mb-2 rounded-2xl bg-slate-50 border border-slate-100">
                              <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || 'User'}</p>
                              <p className="text-xs text-slate-500 truncate font-medium">{user.email}</p>
                            </div>
                            
                            <div className="space-y-1">
                              <Link to="/community/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all" onClick={() => setShowProfileMenu(false)}>
                                <Home className="w-4 h-4" /> Dashboard
                              </Link>
                              <Link to="/community/promote-profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all" onClick={() => setShowProfileMenu(false)}>
                                <User className="w-4 h-4" /> My Profile
                              </Link>
                              <Link to="/community/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all" onClick={() => setShowProfileMenu(false)}>
                                <Settings className="w-4 h-4" /> Settings
                              </Link>
                              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl transition-all text-left">
                                <LogOut className="w-4 h-4" /> Sign Out
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <>
                    {/* DESKTOP AUTH BUTTONS */}
                    <div className="hidden sm:flex items-center gap-2 mr-2">
                        <Link to="/community/login" className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                            Log In
                        </Link>
                        <Link to="/community/signup" className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Join Free
                        </Link>
                    </div>

                    {/* MOBILE AUTH ICON (New Feature) */}
                    <Link 
                        to="/community/login" 
                        className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors mr-1"
                    >
                        <User className="w-4 h-4" />
                    </Link>
                </>
              )}

              {/* Menu Toggle Button */}
              <button 
                onClick={() => { 
                  setIsOpen(!isOpen); 
                  setShowProfileMenu(false); 
                  setShowNotifications(false);
                }}
                className={cn(
                  "flex items-center gap-2 pl-3 sm:pl-4 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full transition-all duration-300 border",
                  isOpen 
                    ? "bg-slate-900 text-white border-slate-900 pr-3 sm:pr-4" 
                    : "bg-white/50 hover:bg-white text-slate-700 border-transparent hover:border-slate-200"
                )}
              >
                <span className="text-sm font-semibold ml-1 hidden sm:block">{isOpen ? 'Close' : 'Menu'}</span>
                <div className={cn("p-1.5 rounded-full transition-colors", isOpen ? "bg-white/20" : "bg-slate-200")}>
                  {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </div>
              </button>
            </div>

          </div>
        </motion.div>
      </nav>

      {/* --- Full Screen / Modal Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <>
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
             />

             <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className={cn(
                  "fixed z-50 flex flex-col",
                  "inset-x-4 top-24 bottom-6 rounded-[2rem]", 
                  "sm:inset-auto sm:top-28 sm:left-1/2 sm:-translate-x-1/2 sm:w-[400px] sm:max-h-[85vh] sm:h-auto sm:rounded-[2rem]",
                  glassDropdown
                )}
             >
                <div className="flex flex-col h-full overflow-hidden">
                   <div className="flex-1 overflow-y-auto p-2">
                      <div className="grid grid-cols-1 gap-1">
                         {navLinks.map((link, i) => (
                            <motion.div
                              key={link.path}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                            >
                              <Link
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "group flex items-center p-3 rounded-[1.25rem] transition-all duration-300 border border-transparent",
                                  location.pathname === link.path 
                                    ? "bg-white shadow-sm border-slate-100" 
                                    : "hover:bg-white/60 hover:shadow-sm"
                                )}
                              >
                                 <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors mr-3 shrink-0",
                                    location.pathname === link.path ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                                 )}>
                                    <link.icon className="w-5 h-5" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <h3 className={cn("text-sm font-bold transition-colors truncate", location.pathname === link.path ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900")}>
                                      {link.label}
                                    </h3>
                                    <p className="text-[11px] font-medium text-slate-400 group-hover:text-slate-500 truncate">{link.desc}</p>
                                 </div>
                                 <ChevronRight className={cn("w-4 h-4 text-slate-300 transition-transform group-hover:translate-x-1 shrink-0", location.pathname === link.path && "text-slate-900")} />
                              </Link>
                            </motion.div>
                         ))}
                      </div>
                   </div>
                   
                   {!user && (
                      <div className="p-3 mt-auto border-t border-slate-100 shrink-0 grid grid-cols-2 gap-3">
                        <Link 
                          to="/community/login" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center w-full py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                        >
                          Log In
                        </Link>
                        <Link 
                          to="/community/signup" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-800 transition-colors"
                        >
                          Join Free
                        </Link>
                      </div>
                   )}
                </div>
             </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommunityNavbar;
