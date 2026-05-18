import { Link } from 'react-router-dom';
import { Calculator, TrendingUp } from 'lucide-react';
import RoiCalculator from '../RoiCalculator';
import { Eyebrow } from '../ui';

export default function HomeRoiTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-violet-100/80 bg-gradient-to-b from-violet-50/40 to-white py-20 md:py-28">
      <div className="marketing-container relative">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>ROI</Eyebrow>
            <h2 className="text-[1.875rem] leading-[1.1] tracking-[-0.035em] text-[#0c1222] md:text-[2.5rem]">
              Will WhatsApp cart recovery pay for itself?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500 md:text-lg">
              Adjust your orders, AOV, and abandonment — see monthly ₹ uplift and payback on Growth.
            </p>
          </div>
          <Link
            to="/roi"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#7C3AED] shadow-sm transition hover:border-violet-300 hover:shadow-md md:self-auto"
          >
            <Calculator className="h-4 w-4" />
            Full calculator
          </Link>
        </div>
        <RoiCalculator compact />
        <p className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
            <TrendingUp className="h-4 w-4" />
            Most brands on 400+ orders/mo recover Growth plan from one flow
          </span>
        </p>
      </div>
    </section>
  );
}
