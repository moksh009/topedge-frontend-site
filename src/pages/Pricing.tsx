import SEO from '../components/SEO';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import PricingHero from '../components/sections/pricing/PricingHero';
import PricingBenefits from '../components/sections/pricing/PricingBenefits';
import PricingPlans from '../components/sections/pricing/PricingPlans';
import PricingFAQ, { faqs } from '../components/sections/pricing/PricingFAQ';
import PricingCTA from '../components/sections/pricing/PricingCTA';

const Pricing = () => {
  // Pricing page SEO metadata
  const seoTitle = 'Pricing Plans';
  const seoDescription = 'Explore TopEdge AI’s transparent pricing plans for AI voice agents, chatbots, and automation solutions. Find the best plan for your business and maximize your ROI.';
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords="AI pricing, TopEdge AI plans, chatbot pricing, voice agent cost, automation solutions, business ROI, AI packages"
        type="website"
      />
      {/* FAQPage Schema.org JSON-LD (dynamic) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.map(faq => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer.replace(/\n/g, ' ')
              }
            }))
          })
        }}
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
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Pricing',
                'item': 'https://topedge.ai/pricing'
              }
            ]
          })
        }}
      />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-theme-bg-primary overflow-x-hidden"
      ref={containerRef}
    >
      <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
        <PricingHero />
        <PricingBenefits />
        <PricingPlans />
        <PricingFAQ />
        <PricingCTA />
      </div>
    </motion.div>
    </>
  );
};

export default Pricing;