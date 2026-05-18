import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getFeatureBySlug } from '../data/features';
import { IconBox } from './ui';

export default function FeatureCard({ slug }: { slug: string }) {
  const f = getFeatureBySlug(slug);
  if (!f) return null;

  return (
    <Link
      to={`/features/${f.slug}`}
      className="marketing-premium-card marketing-card-interactive group flex h-full flex-col rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <IconBox>
          <f.icon className="h-5 w-5" strokeWidth={1.5} />
        </IconBox>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-[#7C3AED] opacity-0 transition-all group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <h3 className="mt-4 text-lg tracking-tight text-[#0c1222]">{f.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{f.tagline}</p>
      <span className="mt-4 text-sm font-medium text-[#7C3AED]">Learn more →</span>
    </Link>
  );
}
