import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { howItWorksSteps } from '../data/home';
import { Stagger, StaggerItem } from '../components/motion';

export default function HowItWorksStrip() {
  return (
    <div className="relative">
      <div
        className="marketing-step-line absolute left-[8%] right-[8%] top-5 hidden h-px md:block"
        aria-hidden
      />

      <Stagger className="grid gap-10 md:grid-cols-4 md:gap-6">
        {howItWorksSteps.map((s, i) => (
          <StaggerItem
            key={s.n}
            className="relative flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] text-[11px] font-medium text-white shadow-lg shadow-violet-500/30">
              {s.n}
            </div>
            <h3 className="mt-5 text-[15px] font-semibold leading-snug text-slate-900">{s.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{s.desc}</p>
            {i === howItWorksSteps.length - 1 && (
              <Link
                to="/features/live-chat"
                className="mt-3 hidden items-center gap-1 text-[12px] font-medium text-[#7C3AED] hover:text-[#6d28d9] md:inline-flex"
              >
                See inbox <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
