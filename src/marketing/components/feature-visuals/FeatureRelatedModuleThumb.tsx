import { cn } from '@/lib/utils';
import FeatureMockupBySlug, { hasFeatureMockup } from '../FeatureMockupBySlug';
import { getFeaturePageMeta } from '../../data/featurePageMeta';

type Props = {
  slug: string;
  className?: string;
};

/** Compact related-module preview — real workspace mockup, not repeated step cards */
export default function FeatureRelatedModuleThumb({ slug, className }: Props) {
  const meta = getFeaturePageMeta(slug);

  if (hasFeatureMockup(slug)) {
    return (
      <div
        className={cn(
          'feature-related-thumb relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 to-white',
          className
        )}
      >
        <div className="pointer-events-none absolute inset-0 origin-top scale-[0.42]">
          <FeatureMockupBySlug slug={slug} compact />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-3 pb-2 pt-8">
          <div className="flex gap-2">
            {meta.highlights.slice(0, 2).map((h) => (
              <span
                key={h.label}
                className="rounded-full bg-violet-50 px-2 py-0.5 text-[8px] font-bold text-[#7C3AED]"
              >
                {h.value} {h.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-violet-400 p-4 text-center',
        className
      )}
    >
      <p className="text-sm font-bold text-white">{meta.highlights[0]?.value}</p>
    </div>
  );
}
