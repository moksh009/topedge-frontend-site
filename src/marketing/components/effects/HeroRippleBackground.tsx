import { useMemo } from 'react';
import RippleDistortion, { type RippleQuality } from './RippleDistortion';

const HERO_MESH = '/hero-mesh.png';

function pickDeviceProfile(): {
  quality: RippleQuality;
  maxDpr: number;
  maxWaves: number;
  enabled: boolean;
} {
  if (typeof window === 'undefined') {
    return { quality: 'medium', maxDpr: 1, maxWaves: 40, enabled: false };
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    return { quality: 'low', maxDpr: 1, maxWaves: 8, enabled: false };
  }

  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (connection?.saveData || connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
    return { quality: 'low', maxDpr: 1, maxWaves: 8, enabled: false };
  }

  const mobile = window.matchMedia('(max-width: 900px)').matches;
  // CSS mesh is enough on phones/tablets — WebGL kills low-end scroll
  if (mobile) {
    return { quality: 'low', maxDpr: 1, maxWaves: 12, enabled: false };
  }

  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowEnd = cores <= 4 || (typeof mem === 'number' && mem <= 4);

  if (lowEnd) {
    return { quality: 'low', maxDpr: 1, maxWaves: 16, enabled: false };
  }

  return { quality: 'high', maxDpr: 1.25, maxWaves: 36, enabled: true };
}

/**
 * Hero mesh background + pointer ripple (desktop capable devices only).
 * Mobile / low-end / save-data → CSS fallback only.
 */
export default function HeroRippleBackground() {
  const profile = useMemo(() => pickDeviceProfile(), []);

  if (!profile.enabled) {
    return <div className="home-hero__ripple home-hero__ripple--static" aria-hidden />;
  }

  return (
    <div className="home-hero__ripple" aria-hidden>
      <RippleDistortion
        src={HERO_MESH}
        brushSize={105}
        strength={0.28}
        swirl={0.9}
        rings={3}
        grayscale={false}
        spread={4.2}
        fade={2.4}
        spacing={16}
        dispersion={0.05}
        glint={0.12}
        tint="#c4b5fd"
        tintAmount={0.1}
        highlightColor="#ffffff"
        trigger="both"
        clickStrength={1.8}
        quality={profile.quality}
        maxDpr={profile.maxDpr}
        maxWaves={profile.maxWaves}
        enabled
      />
    </div>
  );
}
