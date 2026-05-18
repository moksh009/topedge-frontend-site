import { useEffect, useState } from 'react';
import { getFeatureGif } from '../../data/featureGifManifest';
import { FEATURE_ANIMATED_DEMOS } from './FeatureAnimatedDemos';
import { cn } from '@/lib/utils';

type Props = {
  slug: string;
  className?: string;
};

/**
 * Tries AI/static GIF or WebP in /public/marketing/gifs/.
 * Falls back to crisp React loop animations (better than heavy GIFs on mobile).
 */
export default function FeatureGifPlayer({ slug, className }: Props) {
  const slot = getFeatureGif(slug);
  const Demo = FEATURE_ANIMATED_DEMOS[slug];
  const [useDemo, setUseDemo] = useState(true);

  useEffect(() => {
    const path = slot?.gif ?? slot?.webp;
    if (!path) return;
    const img = new Image();
    img.onload = () => setUseDemo(false);
    img.onerror = () => setUseDemo(true);
    img.src = path;
  }, [slot?.gif, slot?.webp]);

  const src = !useDemo && slot?.gif ? slot.gif : !useDemo && slot?.webp ? slot.webp : null;

  if (!Demo && !src) return null;

  if (useDemo || !src) {
    if (!Demo) return null;
    return (
      <div className={cn('feature-gif-player', className)}>
        <Demo />
      </div>
    );
  }

  return (
    <div className={cn('feature-gif-player relative', className)}>
      <div className="feature-animation-frame overflow-hidden rounded-[1.75rem] border border-violet-200/70 shadow-[0_32px_80px_-20px_rgba(124,58,237,0.45)]">
        <img
          src={src}
          alt={slot?.alt ?? `${slug} preview`}
          className="block w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setUseDemo(true)}
        />
      </div>
      <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
        Product preview
      </p>
    </div>
  );
}
