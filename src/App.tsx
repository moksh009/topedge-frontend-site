import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, createRoutesFromElements } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/navigation/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ROI from './pages/ROI';
import { MaintenanceInquiries } from './components/admin/MaintenanceInquiries';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { Login } from './components/admin/Login';
import Testimonials from './pages/Testimonials';
import './styles/fonts.css';
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
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <div className="min-h-screen bg-black text-white">
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
              <Route path="/admin/login" element={<Login />} />
              <Route 
                path="/admin/maintenance-inquiries" 
                element={
                  <ProtectedRoute>
                    <MaintenanceInquiries />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;