import { Section, SectionHeading } from '../ui';
import { Reveal, Stagger, StaggerItem } from '../motion';
import FeatureStepVisual from '../feature-visuals/stepVisualContent';
import type { FeatureDetail } from '../../data/features';

export default function FeatureStepsTimeline({ detail, slug }: { detail: FeatureDetail; slug: string }) {
  return (
    <Section subtle>
      <SectionHeading title="How it works" subtitle="Same flow inside your TopEdge dashboard — step by step." center />
      <div className="relative mx-auto max-w-5xl">
        <div className="feature-steps-line absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-px md:block" aria-hidden />

        <Stagger className="space-y-20 md:space-y-28">
          {detail.steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <Reveal>
                <article className="relative grid items-center gap-10 md:grid-cols-2 md:gap-14">
                  <div
                    data-side={i % 2 === 0 ? 'right' : 'left'}
                    className={`feature-step-badge-wrap ${i % 2 === 0 ? 'md:order-1 md:pr-14 md:text-right' : 'md:order-2 md:pl-14'}`}
                  >
                    <span className="feature-step-badge" aria-hidden>
                      {i + 1}
                    </span>
                    <h3 className="feature-step-title text-xl font-medium tracking-tight text-[#0c1222] md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 md:text-base">{step.desc}</p>
                  </div>

                  <div className={i % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                    <FeatureStepVisual
                      slug={slug}
                      stepIndex={i}
                      stepTitle={step.title}
                      stepDesc={step.desc}
                    />
                  </div>
                </article>
              </Reveal>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
