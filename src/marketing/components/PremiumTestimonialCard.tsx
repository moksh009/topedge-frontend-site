import { Quote } from 'lucide-react';
import { MarketingCard } from './ui';

type Props = {
  quote: string;
  metric: string;
  name: string;
  role: string;
  category?: string;
};

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function PremiumTestimonialCard({ quote, metric, name, role, category }: Props) {
  return (
    <MarketingCard className="marketing-premium-card relative flex h-full flex-col !rounded-2xl !p-7">
      {category && (
        <span className="mb-3 inline-flex w-fit rounded-full border border-violet-200/80 bg-violet-50/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#7C3AED]">
          {category}
        </span>
      )}
      <Quote className="h-7 w-7 text-violet-200" aria-hidden />
      <p className="mt-3 text-xl font-semibold tracking-tight text-[#7C3AED]">{metric}</p>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-600">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 border-t border-violet-100/80 pt-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] text-xs font-bold text-white shadow-md shadow-violet-500/20">
          {initials(name)}
        </span>
        <div>
          <p className="text-sm font-medium text-[#0c1222]">{name}</p>
          <p className="text-sm text-slate-400">{role}</p>
        </div>
      </div>
    </MarketingCard>
  );
}
