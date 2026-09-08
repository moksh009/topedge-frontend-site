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
    return { quality: 'medium', maxDpr: 1, maxWaves: 40, enabled: true };
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    return { quality: 'low', maxDpr: 1, maxWaves: 8, enabled: false };
  }

  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowEnd = cores <= 4 || (typeof mem === 'number' && mem <= 4) || mobile;

  if (lowEnd && mobile) {
    return { quality: 'low', maxDpr: 1, maxWaves: 20, enabled: true };
  }
  if (lowEnd) {
    return { quality: 'medium', maxDpr: 1, maxWaves: 32, enabled: true };
  }
  return { quality: 'high', maxDpr: 1.25, maxWaves: 40, enabled: true };
}

/**
 * Hero mesh background + pointer ripple (same image for CSS fallback + WebGL).
 */
export default function HeroRippleBackground() {
  const profile = useMemo(() => pickDeviceProfile(), []);

  if (!profile.enabled) {
    return <div className="home-hero__ripple" aria-hidden />;
  }

  return (
    <div className="home-hero__ripple" aria-hidden>
      <RippleDistortion
        src={HERO_MESH}
        brushSize={105}
        strength={0.32}
        swirl={1}
        rings={4}
        grayscale={false}
        spread={4.5}
        fade={2.4}
        spacing={14}
        dispersion={0.06}
        glint={0.15}
        tint="#c4b5fd"
        tintAmount={0.1}
        highlightColor="#ffffff"
        trigger="both"
        clickStrength={2}
        quality={profile.quality}
        maxDpr={profile.maxDpr}
        maxWaves={profile.maxWaves}
        enabled
      />
    </div>
  );
}
