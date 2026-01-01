import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { auth, db } from '@/services/firebase';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';

interface Notification {
  id: string;
  type: 'resource' | 'announcement';
  title: string;
  createdAt: any; // Firestore Timestamp
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

  useEffect(() => {
    // Listen for new resources
    const resourcesQuery = query(
      collection(db, 'community_resources'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    // Listen for new announcements
    const announcementsQuery = query(
      collection(db, 'community_announcements'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribeResources = onSnapshot(resourcesQuery, (snapshot) => {
      const newResources = snapshot.docs.map(doc => ({
        id: doc.id,
        type: 'resource' as const,
        title: `New Resource: ${doc.data().title}`,
        createdAt: doc.data().createdAt,
        link: `/community/resource/${doc.id}`
      }));
      updateNotifications(newResources, 'resource');
    });

    const unsubscribeAnnouncements = onSnapshot(announcementsQuery, (snapshot) => {
      const newAnnouncements = snapshot.docs.map(doc => ({
        id: doc.id,
        type: 'announcement' as const,
        title: `New Announcement: ${doc.data().title}`,
        createdAt: doc.data().createdAt,
        link: '/community/announcements'
      }));
      updateNotifications(newAnnouncements, 'announcement');
    });

    return () => {
      unsubscribeResources();
      unsubscribeAnnouncements();
    };
  }, []);

  const updateNotifications = (newItems: Notification[], type: 'resource' | 'announcement') => {
    setNotifications(prev => {
      // Remove existing items of this type and add new ones
      const otherItems = prev.filter(item => item.type !== type);
      const allItems = [...otherItems, ...newItems];
      // Sort by date desc
      return allItems.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      }).slice(0, 10); // Keep top 10
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowProfileMenu(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/community/home' },
    { label: 'Public Profiles', path: '/community/profiles' },
    { label: 'Automation Hub', path: '/community/automation-hub' },
    { label: 'OpenSource Library', path: '/community/open-source' },
    { label: 'Announcements', path: '/community/announcements' },
    { label: 'Discord', path: '/community/discord' },
    { label: 'Website', path: '/' },
    { label: 'Book Appointment', path: '/booking' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
      isScrolled ? "pt-4" : "pt-6"
    )}>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl px-4"
      >
        <div className={cn(
          "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
          "bg-white/70 backdrop-blur-md border border-white/40 shadow-sm",
          isScrolled && "bg-white/90 shadow-md border-gray-200"
        )}>
          {/* Logo Section */}
          <Link to="/community/home" className="flex items-center gap-3 group mr-auto">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              TE
            </div>
            <span className="font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">TopEdge AI</span>
          </Link>

          {/* User Controls */}
          <div className="flex items-center gap-4 mr-4">
            {user ? (
              <>
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    )}
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-80 bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden py-1 z-50"
                      >
                         <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <span className="font-semibold text-sm">Notifications</span>
                            <span className="text-xs text-gray-500">{notifications.length} New</span>
                         </div>
                         <div className="max-h-80 overflow-y-auto">
                            {notifications.length > 0 ? (
                              notifications.map((notification) => (
                                <Link
                                  key={notification.id}
                                  to={notification.link}
                                  onClick={() => setShowNotifications(false)}
                                  className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                >
                                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{notification.title}</p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {notification.createdAt?.toDate?.().toLocaleDateString()}
                                  </p>
                                </Link>
                              ))
                            ) : (
                              <div className="p-4 text-center text-sm text-gray-500">
                                No new notifications
                              </div>
                            )}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[1px] shadow-sm"
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-bold text-gray-700">{user.displayName?.charAt(0) || 'U'}</span>
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-12 w-56 bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden py-1 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="p-1">
                          <Link to="/community/promote-profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setShowProfileMenu(false)}>
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>
                          <Link to="/community/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setShowProfileMenu(false)}>
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-gray-100 p-1 mt-1">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Log Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/community/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                  Log In
                </Link>
                <Link to="/community/signup" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all shadow-md">
                  Join Community
                </Link>
              </div>
            )}
          </div>

          {/* Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-all text-sm font-medium border border-transparent"
          >
            <span className="hidden sm:inline">Menu</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
             {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            
            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl transition-all group",
                        location.pathname === link.path 
                          ? "bg-gray-100 text-black" 
                          : "hover:bg-gray-50 text-gray-600 hover:text-black"
                      )}
                    >
                      <span className="font-medium">{link.label}</span>
                      {location.pathname === link.path && (
                        <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-black" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default CommunityNavbar;
