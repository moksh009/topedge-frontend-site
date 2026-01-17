import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/navigation/Navbar';
import FloatingVoiceChat from './components/FloatingVoiceChat';
import Footer from './components/Footer';
import MetaPixel from './components/MetaPixel';
import Home from './pages/Home';
import Landing from './pages/Landing';
import AICaller from './pages/AICaller';
import AIChatbot from './pages/AIChatbot';
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Booking = React.lazy(() => import('./pages/Booking'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const ROI = React.lazy(() => import('./pages/ROI'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const MaintenanceInquiries = React.lazy(() => import('./components/admin/MaintenanceInquiries').then(module => ({ default: module.MaintenanceInquiries })));
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import Testimonials from './pages/Testimonials';
import './i18n';

// Community Pages
const CommunityHome = React.lazy(() => import('./pages/community/home'));
const CommunityLogin = React.lazy(() => import('./pages/community/login'));
const CommunitySignup = React.lazy(() => import('./pages/community/signup'));
const CommunityProfiles = React.lazy(() => import('./pages/community/profiles'));
const CommunityPromoteProfile = React.lazy(() => import('./pages/community/PromoteProfile'));
const ProfileDetails = React.lazy(() => import('./pages/community/ProfileDetails'));
const AutomationHub = React.lazy(() => import('./pages/community/AutomationHub'));
const SubmitResource = React.lazy(() => import('./pages/community/SubmitResource'));
const ResourceDetails = React.lazy(() => import('./pages/community/ResourceDetails'));
const OpenSource = React.lazy(() => import('./pages/community/OpenSource'));
const Announcements = React.lazy(() => import('./pages/community/Announcements'));
const AdminAnnouncements = React.lazy(() => import('./pages/community/AdminAnnouncements'));
const Settings = React.lazy(() => import('./pages/community/Settings'));
const Discord = React.lazy(() => import('./pages/community/Discord'));
const CreatorDashboard = React.lazy(() => import('./pages/community/CreatorDashboard'));
const RequestBoard = React.lazy(() => import('./pages/community/RequestBoard'));
const ApproveAccess = React.lazy(() => import('./pages/community/ApproveAccess'));

// ScrollToTop component to handle smooth scrolling
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isCommunityRoute = location.pathname.startsWith('/community');

  // Dynamic Metadata based on route
  const pageTitle = isCommunityRoute 
    ? "Community | TopEdge AI" 
    : "TopEdge AI - Advanced AI Voice Agents & Chatbots";

  const pageDescription = isCommunityRoute
    ? "Join the TopEdge AI Community! Connect with builders, share automation workflows, access exclusive resources, and collaborate on the future of AI agents."
    : "Transform your customer service with TopEdge AI's advanced voice agents and chatbots. 24/7 availability, reduced costs, and improved customer satisfaction.";

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-200 relative">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="AI voice agents, chatbots, customer service automation, TopEdge AI, business automation, AI community, automation workflows" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://topedgeai.com/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://topedgeai.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://topedgeai.com/" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://topedgeai.com/og-image.jpg" />

        {/* Additional SEO tags */}
        <link rel="canonical" href="https://topedgeai.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      {!isCommunityRoute && <Navbar />}
      
      {isCommunityRoute ? (
        <>
          <Toaster />
          {children}
        </>
      ) : (
        <main className="flex-grow">
          <Toaster />
          {children}
        </main>
      )}
      
      {!isCommunityRoute && <Footer />}
      {!isCommunityRoute && <FloatingVoiceChat />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <MetaPixel />
            <Layout>
              <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-lg">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/roi" element={<ROI />} />
                  <Route path="/ai-caller" element={<AICaller />} />
                  <Route path="/ai-chatbot" element={<AIChatbot />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/admin/login" element={<CommunityLogin />} />
                  <Route 
                    path="/admin/maintenance-inquiries" 
                    element={
                      <ProtectedRoute requireAdmin>
                        <MaintenanceInquiries />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/landing" element={<Landing />} />

                  {/* Community Routes */}
                  <Route path="/community" element={<CommunityHome />} />
                  <Route path="/community/home" element={<CommunityHome />} />
                  <Route path="/community/login" element={<CommunityLogin />} />
                  <Route path="/community/signup" element={<CommunitySignup />} />
                  <Route path="/community/profiles" element={<CommunityProfiles />} />
                  <Route path="/community/profile/:id" element={<ProfileDetails />} />
                  <Route path="/community/promote-profile" element={<CommunityPromoteProfile />} />
                  <Route path="/community/automation-hub" element={<AutomationHub />} />
                  <Route path="/community/submit-resource" element={<SubmitResource />} />
                  <Route path="/community/resource/:id" element={<ResourceDetails />} />
                  <Route path="/community/open-source" element={<OpenSource />} />
                  <Route path="/community/announcements" element={<Announcements />} />
                  <Route path="/community/admin/announcements" element={<AdminAnnouncements />} />
                  <Route path="/community/settings" element={<Settings />} />
                  <Route path="/community/discord" element={<Discord />} />
                  <Route path="/community/approve-access" element={<ApproveAccess />} />
                  <Route 
                    path="/community/dashboard" 
                    element={
                      <ProtectedRoute>
                        <CreatorDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/community/requests" element={<RequestBoard />} />
                </Routes>
              </React.Suspense>
            </Layout>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
