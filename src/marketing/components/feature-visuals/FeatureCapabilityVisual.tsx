import { cn } from '@/lib/utils';
import { CapabilityVisualBody } from './capabilityVisualContent';

type Props = {
  slug: string;
  variant: number;
  title: string;
  desc: string;
  className?: string;
};

/** Rich capability preview — unique UI per capability, no 3D tilt */
export default function FeatureCapabilityVisual({ slug, variant, title, desc, className }: Props) {
  return (
    <div
      className={cn(
        'feature-cap-visual relative min-h-[168px] overflow-hidden rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5',
        'bg-gradient-to-br from-violet-50/90 via-white to-violet-50/40',
        'shadow-[0_12px_40px_-16px_rgba(124,58,237,0.25)]',
        className
      )}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-200/40 blur-2xl" aria-hidden />
      <p className="relative text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]/70">{title}</p>
      <div className="relative mt-3">
        <CapabilityVisualBody slug={slug} variant={variant} title={title} desc={desc} />
      </div>
    </div>
  );
}
