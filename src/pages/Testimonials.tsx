import React from 'react';
import TestimonialsHero from '../components/sections/testimonials/TestimonialsHero';
import TestimonialsGrid from '../components/sections/testimonials/TestimonialsGrid';
import { CTASection } from '../components/sections/CTASection';
import SEO from '../components/SEO';

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <SEO
        title="Testimonials | TopEdge AI"
        description="See what our clients say about our AI voice and chatbot solutions. Real results, real impact."
      />

      {/* Hero Section */}
      <TestimonialsHero />

      {/* Grid Section */}
      <TestimonialsGrid />

      {/* CTA Section */}
      <CTASection variant="light" />
    </div>
  );
};

export default Testimonials;