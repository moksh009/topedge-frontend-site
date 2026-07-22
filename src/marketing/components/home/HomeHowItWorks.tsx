import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, GitBranch, Link2, Sparkles } from 'lucide-react';
import { howItWorks } from '../../data/home';
import { SectionHeading } from '../ui';
import { WhatsAppMark } from '../foundation/BrandMarks';

const stepIcons = [Link2, Sparkles, GitBranch, WhatsAppMark];

export default function HomeHowItWorks() {
  return (
    <section className="mkt-wash home-story">
      <div className="mx-auto max-w-[var(--mkt-max-wide)]">
        <SectionHeading
          title="Connect. Approve. Publish. Sell."
          subtitle="Shopify data, Meta approvals, and operator control in four steps."
          className="mb-14 max-w-3xl"
        />
        <div className="home-steps">
          {howItWorks.map((step, i) => {
            const Icon = stepIcons[i] ?? CheckCircle2;
            return (
              <div key={step.step} className="home-steps__item">
                {i > 0 && <div className="home-steps__line" aria-hidden />}
                <div className="home-steps__card">
                  <span className="home-steps__icon">
                    {Icon === WhatsAppMark ? (
                      <WhatsAppMark className="h-5 w-5" />
                    ) : (
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    )}
                  </span>
                  <p className="mkt-kpi text-xs text-[#7C3AED]">{step.step}</p>
                  <h3 className="mt-3 text-lg font-medium text-[#0c1222]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7C3AED] hover:text-[#6d28d9]"
          >
            Explore product
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
