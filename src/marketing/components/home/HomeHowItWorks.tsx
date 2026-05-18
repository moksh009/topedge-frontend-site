import { Link } from 'react-router-dom';
import { howItWorksSteps } from '../../data/home';
import { PrimaryButton } from '../ui';

/** Minimal 4-step strip — no stagger animations */
export default function HomeHowItWorks() {
  return (
    <section className="marketing-section-subtle py-20 md:py-28">
      <div className="marketing-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7C3AED]/80">
            How it works
          </p>
          <h2 className="mt-4 text-[1.875rem] leading-[1.1] tracking-[-0.035em] text-[#0c1222] md:text-[2.5rem]">
            Live on WhatsApp in about fifteen minutes
          </h2>
          <p className="mt-4 text-slate-500">
            Connect once. Store data, Meta templates, automations, and inbox share the same truth.
          </p>
        </div>

        <div className="relative mt-14">
          <div
            className="marketing-step-line absolute left-[10%] right-[10%] top-5 hidden h-px md:block"
            aria-hidden
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {howItWorksSteps.map((s) => (
              <li key={s.n} className="relative text-center md:text-left">
                <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#7C3AED] text-[11px] font-semibold text-white">
                  {s.n}
                </span>
                <h3 className="mt-5 text-[15px] font-semibold text-[#0c1222]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 text-center">
          <PrimaryButton to="/signup">Start free — setup in ~15 min</PrimaryButton>
          <p className="mt-4">
            <Link to="/integrations" className="text-sm font-medium text-[#7C3AED] hover:underline">
              See integrations →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
