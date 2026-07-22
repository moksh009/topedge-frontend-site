import { testimonials } from '../../data/home';
import { SectionHeading, MarketingCard } from '../ui';

export default function HomeTestimonials({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section className={`home-story ${hideHeader ? '' : 'mkt-wash-deep'}`}>
      <div className="mx-auto max-w-[var(--mkt-max-wide)]">
        {!hideHeader && (
          <SectionHeading
            title="Operators notice when the product respects how they work"
            subtitle="Outcomes from recovery, inbox, and Meta-safe messaging."
            className="mb-14 max-w-3xl"
          />
        )}
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <MarketingCard
              key={testimonial.name}
              className="flex h-full flex-col !border-white/70 !bg-white/85 !p-8 backdrop-blur-sm"
            >
              <p className="flex-1 text-[0.95rem] leading-relaxed text-slate-600">
                “{testimonial.quote}”
              </p>
              <div className="mt-8 border-t border-[#efeaf8] pt-6">
                <p className="font-medium text-[#0c1222]">{testimonial.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {testimonial.role} · {testimonial.company}
                </p>
                <p className="mkt-kpi mt-4 text-sm text-[#7C3AED]">{testimonial.metric}</p>
              </div>
            </MarketingCard>
          ))}
        </div>
      </div>
    </section>
  );
}
