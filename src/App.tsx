import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/navigation/Navbar';
import MarketingNavbar from './marketing/components/MarketingNavbar';
import CommunityNavbar from './components/community/layout/CommunityNavbar';
import Footer from './components/Footer';
import MarketingFooter from './marketing/components/MarketingFooter';
import { isMarketingRoute } from './marketing/routes';
import MarketingPageLoader from './marketing/components/MarketingPageLoader';
import MetaPixel from './components/MetaPixel';
import Home from './pages/Home';
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./marketing/pages/ServicesRedirect'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Booking = React.lazy(() => import('./marketing/pages/BookingRedirect'));
const Pricing = React.lazy(() => import('./marketing/pages/PricingPage'));
const FeaturesPage = React.lazy(() => import('./marketing/pages/FeaturesPage'));
const FeatureDetailPage = React.lazy(() => import('./marketing/pages/FeatureDetailPage'));
const IntegrationsPage = React.lazy(() => import('./marketing/pages/IntegrationsPage'));
const CustomersPage = React.lazy(() => import('./marketing/pages/CustomersPage'));
const SolutionPage = React.lazy(() => import('./marketing/pages/SolutionPage'));
const AgencyPage = React.lazy(() => import('./marketing/pages/AgencyPage'));
const SecurityPage = React.lazy(() => import('./marketing/pages/SecurityPage'));
const SignupRedirect = React.lazy(() => import('./marketing/pages/SignupRedirect'));
const LoginRedirect = React.lazy(() => import('./marketing/pages/LoginRedirect'));
const DocsRedirect = React.lazy(() => import('./marketing/pages/DocsRedirect'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const RoiPage = React.lazy(() => import('./marketing/pages/RoiPage'));
const TermsPage = React.lazy(() => import('./marketing/pages/TermsPage'));
const CompareIndexPage = React.lazy(() => import('./marketing/pages/CompareIndexPage'));
const ComparePage = React.lazy(() => import('./marketing/pages/ComparePage'));
const NotFoundPage = React.lazy(() => import('./marketing/pages/NotFoundPage'));
const DevShowcasePage = import.meta.env.DEV
  ? React.lazy(() => import('./marketing/pages/DevShowcasePage'))
  : null;
const AiCallerRedirect = React.lazy(() =>
  import('./marketing/pages/legacyRedirects').then((m) => ({ default: m.AiCallerRedirect }))
);
const AiChatbotRedirect = React.lazy(() =>
  import('./marketing/pages/legacyRedirects').then((m) => ({ default: m.AiChatbotRedirect }))
);
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const ProtectedRoute = React.lazy(() =>
  import('./components/admin/ProtectedRoute').then((m) => ({ default: m.ProtectedRoute }))
);
const Testimonials = React.lazy(() => import('./pages/Testimonials'));

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

// ScrollToTop — scroll to top on route change, or to hash target when present
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isCommunityRoute = location.pathname.startsWith('/community');
  const isAuthPage = location.pathname === '/community/login' || location.pathname === '/community/signup';
  const marketing = isMarketingRoute(location.pathname);
  const isLegalRoute =
    location.pathname === '/privacy' ||
    location.pathname === '/privacy-policy' ||
    location.pathname === '/terms' ||
    location.pathname === '/terms-of-service';

  // Dynamic Metadata based on route
  const pageTitle = isCommunityRoute
    ? 'Community | TopEdge'
    : marketing
      ? 'TopEdge | WhatsApp Automation & Cart Recovery for Shopify India'
      : 'TopEdge';

  const pageDescription = isCommunityRoute
    ? 'Join the TopEdge community — automation workflows, resources, and builders.'
    : marketing
      ? 'WhatsApp automation for Shopify: abandoned cart recovery, COD confirmations, Live Chat, and ecommerce journeys for Indian D2C.'
      : 'TopEdge — WhatsApp growth for Shopify and builders.';

  return (
    <div
      className={`min-h-screen transition-colors duration-200 relative ${
        marketing ? 'bg-white text-[#0c1222]' : 'bg-background text-text [zoom:0.9]'
      }`}
    >
      <Helmet>
        {!marketing && (
          <>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content="TopEdge, WhatsApp Shopify, community, automation workflows, Indian D2C" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://topedgeai.com/" />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content="https://topedgeai.com/og/og-default.svg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content="https://topedgeai.com/" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content="https://topedgeai.com/og/og-default.svg" />
            <link rel="canonical" href="https://topedgeai.com" />
            <meta name="robots" content="index, follow" />
          </>
        )}
        <meta name="theme-color" content="#7C3AED" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {!isCommunityRoute && !isLegalRoute && (
        <motion.div key={marketing ? 'marketing-nav' : 'legacy-nav'}>
          {marketing ? <MarketingNavbar /> : <Navbar />}
        </motion.div>
      )}
      {isCommunityRoute && !isAuthPage && <CommunityNavbar />}

      {isCommunityRoute ? (
        <>
          <Toaster />
          {children}
        </>
      ) : (
        <div className="flex-grow" role="main">
          <Toaster />
          {children}
        </div>
      )}

      {!isCommunityRoute && !isLegalRoute && (marketing ? <MarketingFooter /> : <Footer />)}
      {isCommunityRoute && !isAuthPage && <Footer />}
    </div>
  );
};

class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('App error boundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] text-slate-900">
          <div className="text-center px-6">
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-2">Something went wrong</p>
            <p className="text-lg font-bold mb-4">The page failed to load.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/** Lazy-load Firebase/auth only for community & admin routes */
const LazyAuthShell = React.lazy(() =>
  Promise.all([import('./contexts/AuthContext'), import('./contexts/CommunityCacheContext')]).then(
    ([auth, cache]) => ({
      default: ({ children }: { children: React.ReactNode }) => (
        <auth.AuthProvider>
          <cache.CommunityCacheProvider>{children}</cache.CommunityCacheProvider>
        </auth.AuthProvider>
      ),
    })
  )
);

/** Skip Firebase/auth bundle on marketing routes — faster first paint for GTM pages */
function RouteProviders({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  if (isMarketingRoute(pathname)) {
    return <>{children}</>;
  }
  return (
    <React.Suspense fallback={<MarketingPageLoader />}>
      <LazyAuthShell>{children}</LazyAuthShell>
    </React.Suspense>
  );
}

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppErrorBoundary>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <RouteProviders>
              <ScrollToTop />
              <MetaPixel />
              <Layout>
                <React.Suspense fallback={<MarketingPageLoader />}>
                  <AnimatedRoutes />
                </React.Suspense>
              </Layout>
            </RouteProviders>
          </Router>
        </AppErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/features/:slug" element={<FeatureDetailPage />} />
          {DevShowcasePage && <Route path="/dev/showcase" element={<DevShowcasePage />} />}
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/solutions/:vertical" element={<SolutionPage />} />
          <Route path="/agency" element={<AgencyPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/signup" element={<SignupRedirect />} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/docs" element={<DocsRedirect />} />
          <Route path="/roi" element={<RoiPage />} />
          <Route path="/ai-caller" element={<AiCallerRedirect />} />
          <Route path="/ai-chatbot" element={<AiChatbotRedirect />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/compare" element={<CompareIndexPage />} />
          <Route path="/compare/:competitor" element={<ComparePage />} />
          <Route path="/admin/login" element={<CommunityLogin />} />

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
