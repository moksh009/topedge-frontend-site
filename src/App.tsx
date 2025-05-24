import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, createRoutesFromElements } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/navigation/Navbar';
import FloatingVoiceChat from './components/FloatingVoiceChat';
import Footer from './components/Footer';
import MetaPixel from './components/MetaPixel';
import Home from './pages/Home';
import Landing from './pages/Landing';
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
const Login = React.lazy(() => import('./components/admin/Login').then(module => ({ default: module.Login })));
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import Testimonials from './pages/Testimonials';
import './i18n';

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

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <MetaPixel />
          <div className="min-h-screen bg-background text-text transition-colors duration-200 relative">
            <Helmet>
              <title>TopEdge AI - Advanced AI Voice Agents & Chatbots</title>
              <meta name="description" content="Transform your customer service with TopEdge AI's advanced voice agents and chatbots. 24/7 availability, reduced costs, and improved customer satisfaction." />
              <meta name="keywords" content="AI voice agents, chatbots, customer service automation, TopEdge AI, business automation" />
              
              {/* Open Graph / Facebook */}
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://topedgeai.com/" />
              <meta property="og:title" content="TopEdge AI - Advanced AI Voice Agents & Chatbots" />
              <meta property="og:description" content="Transform your customer service with TopEdge AI's advanced voice agents and chatbots." />
              <meta property="og:image" content="https://topedgeai.com/og-image.jpg" />

              {/* Twitter */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:url" content="https://topedgeai.com/" />
              <meta name="twitter:title" content="TopEdge AI - Advanced AI Voice Agents & Chatbots" />
              <meta name="twitter:description" content="Transform your customer service with TopEdge AI's advanced voice agents and chatbots." />
              <meta name="twitter:image" content="https://topedgeai.com/og-image.jpg" />

              {/* Additional SEO tags */}
              <link rel="canonical" href="https://topedgeai.com" />
              <meta name="robots" content="index, follow" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
            <Navbar />
            <main className="flex-grow">
              <Toaster />
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
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/admin/login" element={<Login />} />
                  <Route 
                    path="/admin/maintenance-inquiries" 
                    element={
                      <ProtectedRoute>
                        <MaintenanceInquiries />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/landing" element={<Landing />} />
                </Routes>
              </React.Suspense>
            </main>
            <Footer />
            <FloatingVoiceChat />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;