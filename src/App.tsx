import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import MarketingNavbar from './marketing/components/MarketingNavbar';
import MarketingFooter from './marketing/components/MarketingFooter';
import MarketingConvertPrompt from './marketing/components/MarketingConvertPrompt';
import MarketingSmoothScroll, {
  SmoothScrollToTop,
} from './marketing/components/effects/MarketingSmoothScroll';
import MarketingPageLoader from './marketing/components/MarketingPageLoader';
import MetaPixel from './components/MetaPixel';
import Analytics from './marketing/components/Analytics';
import Home from './pages/Home';

const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Pricing = React.lazy(() => import('./marketing/pages/PricingPage'));
const FeaturesPage = React.lazy(() => import('./marketing/pages/FeaturesPage'));
const FeatureDetailPage = React.lazy(() => import('./marketing/pages/FeatureDetailPage'));
const CodConfirmationPage = React.lazy(() => import('./marketing/pages/CodConfirmationPage'));
const IntegrationsPage = React.lazy(() => import('./marketing/pages/IntegrationsPage'));
const CustomersPage = React.lazy(() => import('./marketing/pages/CustomersPage'));
const SignupRedirect = React.lazy(() => import('./marketing/pages/SignupRedirect'));
const LoginRedirect = React.lazy(() => import('./marketing/pages/LoginRedirect'));
const DocsPage = React.lazy(() => import('./marketing/pages/DocsPage'));
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

const DevShowcasePage = import.meta.env.DEV
  ? React.lazy(() => import('./marketing/pages/DevShowcasePage'))
  : null;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLegalRoute =
    location.pathname === '/privacy' ||
    location.pathname === '/privacy-policy' ||
    location.pathname === '/terms' ||
    location.pathname === '/terms-of-service';
  const isAuthHandoff = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <div className="min-h-screen transition-colors duration-200 relative bg-white text-[#0c1222]">
      <Helmet>
        <meta name="theme-color" content="#7C3AED" />
      </Helmet>

      {!isLegalRoute && !isAuthHandoff && (
        <motion.div key="marketing-nav">
          <MarketingNavbar />
        </motion.div>
      )}

      <div className="flex-grow" role="main">
        <Toaster />
        {children}
      </div>
    </div>
  );
};

function RouteOutlet() {
  const { pathname } = useLocation();
  const isLegalRoute =
    pathname === '/privacy' ||
    pathname === '/privacy-policy' ||
    pathname === '/terms' ||
    pathname === '/terms-of-service';
  const isAuthHandoff = pathname === '/signup' || pathname === '/login';

  return (
    <>
      <AnimatedRoutes />
      {!isLegalRoute && !isAuthHandoff && <MarketingFooter />}
      {!isLegalRoute && !isAuthHandoff ? (
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

const App: React.FC = () => {
  return (
    <HelmetProvider>
        <AppErrorBoundary>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <MarketingSmoothScroll>
                <SmoothScrollToTop />
                <MetaPixel />
                <Analytics />
                <Layout>
                  <React.Suspense fallback={<MarketingPageLoader />}>
                    <RouteOutlet />
                  </React.Suspense>
                </Layout>
              </MarketingSmoothScroll>
          </Router>
        </AppErrorBoundary>
    </HelmetProvider>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
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
          <Route path="/features/cod-confirmation" element={<CodConfirmationPage />} />
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
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/*" element={<DocsPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />

          {/* Legacy plural blog URL */}
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/blogs/*" element={<Navigate to="/blog" replace />} />

          {DevShowcasePage && <Route path="/dev/showcase" element={<DevShowcasePage />} />}


          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
