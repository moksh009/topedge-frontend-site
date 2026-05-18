import { Calculator, IndianRupee, ShoppingCart, Sparkles } from 'lucide-react';
import SEO from '../../components/SEO';
import MarketingPage from '../components/MarketingPage';
import MarketingCtaBand from '../components/MarketingCtaBand';
import RoiCalculator from '../components/RoiCalculator';
import { GradientMesh, Reveal, TextGradient } from '../components/motion';

export default function RoiPage() {
  return (
    <>
      <SEO
        title="ROI Calculator | TopEdge"
        description="Estimate WhatsApp cart recovery revenue for your Shopify store. See monthly uplift, annual impact, and payback on the Growth plan."
      />
      <MarketingPage>
        <section className="marketing-hero-bg relative overflow-hidden border-b border-violet-100/80 pb-12 pt-28 md:pb-16 md:pt-32">
          <GradientMesh />
          <div className="marketing-container relative max-w-4xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C3AED]/90 backdrop-blur-sm">
                <Calculator className="h-3.5 w-3.5" />
                ROI calculator
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[2rem] leading-[1.08] tracking-[-0.04em] text-[#0c1222] md:text-[2.75rem] lg:text-[3.25rem]">
                <TextGradient>Will WhatsApp cart recovery pay for itself?</TextGradient>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
                Plug in your Shopify orders, AOV, and abandonment rate. We model incremental revenue using ~32%
                recovery on WhatsApp — tuned for Indian D2C.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: ShoppingCart, text: 'Abandoned cart flows' },
                  { icon: IndianRupee, text: '₹-first metrics' },
                  { icon: Sparkles, text: 'Growth plan payback' },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-[#7C3AED]" />
                    {text}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="marketing-container">
            <RoiCalculator />
          </div>
        </section>

        <MarketingCtaBand
          variant="light"
          title="Want a forecast with your real catalog and COD mix?"
          subtitle="We will map your abandonment funnel and recommend templates — usually a 15-minute call."
          primaryLabel="Start free"
          primaryTo="/signup"
          secondaryLabel="Book a walkthrough"
          secondaryTo="/contact"
          tertiaryLabel="Compare plans →"
          tertiaryTo="/pricing"
        />
      </MarketingPage>
    </>
  );
}
