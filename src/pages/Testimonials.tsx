import MarketingSEO from '../marketing/components/MarketingSEO';
import MarketingPage from '../marketing/components/MarketingPage';
import MarketingCtaBand from '../marketing/components/MarketingCtaBand';
import { PageHero } from '../marketing/components/ui';
import HomeTestimonials from '../marketing/components/home/HomeTestimonials';

export default function Testimonials() {
  return (
    <>
      <MarketingSEO
        title="Testimonials | TopEdge — WhatsApp for Shopify India"
        description="What Indian D2C brands say about TopEdge — cart recovery, Live Chat, and Meta template workflows."
        path="/testimonials"
      />
      <MarketingPage>
        <PageHero
          eyebrow="Social proof"
          title="Teams on Shopify India trust TopEdge"
          subtitle="Recovery, speed, and control — from D2C brands running WhatsApp on live store data. Illustrative outcomes from merchant conversations."
        />
        <HomeTestimonials hideHeader />
        <MarketingCtaBand
          title="See what TopEdge can do on your store"
          subtitle="Connect Shopify, approve templates, and publish your first flow — free for 14 days."
          primaryLabel="Start free"
          secondaryLabel="View case studies"
          secondaryTo="/customers"
        />
      </MarketingPage>
    </>
  );
}
