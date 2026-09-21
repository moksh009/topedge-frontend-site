import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import MarketingNavbar from './marketing/components/MarketingNavbar';
import CommunityNavbar from './components/community/layout/CommunityNavbar';
import Footer from './components/Footer';
import MarketingFooter from './marketing/components/MarketingFooter';
import MarketingConvertPrompt from './marketing/components/MarketingConvertPrompt';
import MarketingSmoothScroll, {
  SmoothScrollToTop,
} from './marketing/components/effects/MarketingSmoothScroll';
import { isMarketingRoute } from './marketing/routes';
import MarketingPageLoader from './marketing/components/MarketingPageLoader';
import MetaPixel from './components/MetaPixel';
import Home from './pages/Home';

const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Pricing = React.lazy(() => import('./marketing/pages/PricingPage'));
const FeaturesPage = React.lazy(() => import('./marketing/pages/FeaturesPage'));
const FeatureDetailPage = React.lazy(() => import('./marketing/pages/FeatureDetailPage'));
const IntegrationsPage = React.lazy(() => import('./marketing/pages/IntegrationsPage'));
const CustomersPage = React.lazy(() => import('./marketing/pages/CustomersPage'));
const SignupRedirect = React.lazy(() => import('./marketing/pages/SignupRedirect'));
const LoginRedirect = React.lazy(() => import('./marketing/pages/LoginRedirect'));
const DocsRedirect = React.lazy(() => import('./marketing/pages/DocsRedirect'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const TermsPage = React.lazy(() => import('./marketing/pages/TermsPage'));
const CompareIndexPage = React.lazy(() => import('./marketing/pages/CompareIndexPage'));
const ComparePage = React.lazy(() => import('./marketing/pages/ComparePage'));
const CompareAlternativesPage = React.lazy(
  () => import('./marketing/pages/CompareAlternativesPage'),
);
const CompareThreeWayPage = React.lazy(() => import('./marketing/pages/CompareThreeWayPage'));
const SeoTopicPage = React.lazy(() => import('./marketing/pages/SeoTopicPage'));
const NotFoundPage = React.lazy(() => import('./marketing/pages/NotFoundPage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const ProtectedRoute = React.lazy(() =>
  import('./components/admin/ProtectedRoute').then((m) => ({ default: m.ProtectedRoute }))
);

const DevShowcasePage = import.meta.env.DEV
  ? React.lazy(() => import('./marketing/pages/DevShowcasePage'))
  : null;

// Community
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isCommunityRoute = location.pathname.startsWith('/community');
  const isAuthPage =
    location.pathname === '/community/login' || location.pathname === '/community/signup';
  const marketing = isMarketingRoute(location.pathname);
  const isLegalRoute =
    location.pathname === '/privacy' ||
    location.pathname === '/privacy-policy' ||
    location.pathname === '/terms' ||
    location.pathname === '/terms-of-service';
  const isAuthHandoff =
    location.pathname === '/signup' || location.pathname === '/login';

  const pageTitle = isCommunityRoute
    ? 'Community | TopEdge'
    : marketing
      ? 'TopEdge | WhatsApp Automation & Cart Recovery for Shopify India'
      : 'TopEdge';

  const pageDescription = isCommunityRoute
    ? 'Join the TopEdge community, automation workflows, resources, and builders.'
    : marketing
      ? 'WhatsApp automation for Shopify: abandoned cart recovery, COD confirmations, Live Chat, and ecommerce journeys for Indian D2C.'
      : 'TopEdge, WhatsApp growth for Shopify and builders.';

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
            <meta
              name="keywords"
              content="TopEdge, WhatsApp Shopify, community, automation workflows, Indian D2C"
            />
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
      </Helmet>

      {!isCommunityRoute && !isLegalRoute && !isAuthHandoff && (
        <motion.div key="marketing-nav">
          <MarketingNavbar />
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

      {isCommunityRoute && !isAuthPage && <Footer />}
    </div>
  );
};

function RouteOutlet() {
  const { pathname } = useLocation();
  const marketing = isMarketingRoute(pathname);
  const isCommunityRoute = pathname.startsWith('/community');
  const isLegalRoute =
    pathname === '/privacy' ||
    pathname === '/privacy-policy' ||
    pathname === '/terms' ||
    pathname === '/terms-of-service';
  const isAuthHandoff = pathname === '/signup' || pathname === '/login';

  return (
    <>
      <AnimatedRoutes />
      {!isCommunityRoute && !isLegalRoute && !isAuthHandoff && <MarketingFooter />}
      {marketing && !isCommunityRoute && !isLegalRoute && !isAuthHandoff ? (
        <MarketingConvertPrompt />
      ) : null}
    </>
  );
}

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
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
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-2">
              Something went wrong
            </p>
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
              <MarketingSmoothScroll>
                <SmoothScrollToTop />
                <MetaPixel />
                <Layout>
                  <React.Suspense fallback={<MarketingPageLoader />}>
                    <RouteOutlet />
                  </React.Suspense>
                </Layout>
              </MarketingSmoothScroll>
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Routes location={location}>
          {/* Marketing */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/features/:slug" element={<FeatureDetailPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/compare" element={<CompareIndexPage />} />
          <Route path="/compare/topedge-vs-wati-vs-aisensy" element={<CompareThreeWayPage />} />
          <Route path="/compare/alternatives" element={<CompareAlternativesPage />} />
          <Route path="/compare/:competitor" element={<ComparePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route
            path="/shopify-whatsapp-integration"
            element={<SeoTopicPage slug="shopify-whatsapp-integration" />}
          />
          <Route path="/signup" element={<SignupRedirect />} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/docs" element={<DocsRedirect />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />

          {/* Legacy plural blog URL */}
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/blogs/*" element={<Navigate to="/blog" replace />} />

          {DevShowcasePage && <Route path="/dev/showcase" element={<DevShowcasePage />} />}

          <Route path="/admin/login" element={<CommunityLogin />} />

          {/* Community */}
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
