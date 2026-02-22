import SEO from '../components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';

// New Home Sections
import HeroSection from '../components/sections/new-home/HeroSection';
import TrustedBySection from '../components/sections/new-home/TrustedBySection';
import AICallerDemoSection from '../components/sections/new-home/AICallerDemoSection';
import HowAICallerWorksSection from '../components/sections/new-home/HowAICallerWorksSection';
import AICallerDashboardSection from '../components/sections/new-home/AICallerDashboardSection';
import EndToEndSolutionsSection from '../components/sections/new-home/EndToEndSolutionsSection';
import BenefitsSection from '../components/sections/new-home/BenefitsSection';
import WhatsAppChatbotSection from '../components/sections/new-home/WhatsAppChatbotSection';
import HowChatbotWorksSection from '../components/sections/new-home/HowChatbotWorksSection';
import ChatbotDashboardSection from '../components/sections/new-home/ChatbotDashboardSection';
import ChatbotBenefitsSection from '../components/sections/new-home/ChatbotBenefitsSection';
import ROICalculatorSection from '../components/sections/new-home/ROICalculatorSection';
import ReviewsSection from '../components/sections/new-home/ReviewsSection';
import { CTASection } from '../components/sections/CTASection';

const Home = () => {
  // Home page SEO metadata
  const seoTitle = 'TopEdge AI | AI Voice & Chatbot Automation for Business';
  const seoDescription = 'Automate your business with advanced AI voice agents, WhatsApp automation, and chatbots. Improve efficiency, boost leads, and enhance customer experience with TopEdge AI.';
  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <SEO
        title="TopEdge AI | Intelligent Automation for Modern Business"
        description="Empower your business with TopEdge AI’s intelligent automation solutions. Streamline operations, boost productivity, and deliver outstanding customer experiences with cutting-edge AI voice agents and chat automation—trusted by forward-thinking companies."
        keywords="AI automation, TopEdge AI, voice agents, chat automation, business efficiency, digital transformation, customer experience, workflow automation, AI technology"
        type="website"
        url="https://topedge.ai/"
        image="/logo.png"
        canonical="https://topedge.ai/"
        ogTitle="TopEdge AI | Intelligent Automation for Modern Business"
        ogDescription="Reimagine your business with TopEdge AI—seamless automation, smarter workflows, and next-level customer engagement. Discover the future of business efficiency."
        ogImage="/logo.png"
        ogUrl="https://topedge.ai/"
        twitterTitle="TopEdge AI | Intelligent Automation for Modern Business"
        twitterDescription="Experience the power of AI-driven automation. TopEdge AI helps you work smarter, serve customers better, and stay ahead in a digital world."
        twitterImage="/logo.png"
        twitterCard="summary_large_image"
      />
      {/* BreadcrumbList Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://topedge.ai/'
              }
            ]
          })
        }}
      />
      {/* Organization Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'TopEdge AI',
            'url': 'https://topedge.ai/',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://topedge.ai/logo.png'
            },
            'sameAs': [
              'https://www.linkedin.com/company/topedge-ai/',
              'https://twitter.com/topedgeai'
            ]
          })
        }}
      />
      {/* Website Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'TopEdge AI',
            'url': 'https://topedge.ai/'
          })
        }}
      />

      {/* Theme-aware Wrapper for Home Page */}
      <div className="relative min-h-screen bg-theme-bg-primary text-theme-text-primary font-sans selection:bg-theme-text-primary selection:text-theme-text-inverse">

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
          style={{ scaleX: progressBarWidth }}
        />

        {/* Content */}
        <div className="relative z-10">
          <HeroSection />

          <TrustedBySection />

          <AICallerDemoSection />

          <AICallerDashboardSection />

          <HowAICallerWorksSection />

          <EndToEndSolutionsSection />



          <BenefitsSection />

          <ROICalculatorSection />

          <WhatsAppChatbotSection />

          <ChatbotDashboardSection />

          <HowChatbotWorksSection />

          <ChatbotBenefitsSection />

          <ReviewsSection />

          <CTASection />
        </div>
      </div>
    </>
  );
};

export default Home;
