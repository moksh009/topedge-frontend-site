import { useEffect, useMemo, useState } from 'react';
import RippleDistortion, { type RippleQuality } from './RippleDistortion';

/**
 * Clean hero gradient texture (PNG — no JPEG/noise artifacts).
 * Matches CSS: white → lilac → violet at 165deg.
 */
function createHeroGradientDataUrl() {
  const width = 1024;
  const height = 768;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const angle = (165 * Math.PI) / 180;
  const dx = Math.sin(angle);
  const dy = -Math.cos(angle);
  const cx = width / 2;
  const cy = height / 2;
  const len = Math.hypot(width, height) / 2;
  const gradient = ctx.createLinearGradient(
    cx - dx * len,
    cy - dy * len,
    cx + dx * len,
    cy + dy * len
  );
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.18, '#f7f4ff');
  gradient.addColorStop(0.4, '#ebe4ff');
  gradient.addColorStop(0.62, '#c4b5fd');
  gradient.addColorStop(0.82, '#8b5cf6');
  gradient.addColorStop(1, '#7c3aed');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Soft large blobs only (same palette) — enough structure for ripples, no grain
  const glowA = ctx.createRadialGradient(
    width * 0.72,
    height * 0.22,
    20,
    width * 0.72,
    height * 0.22,
    width * 0.45
  );
  glowA.addColorStop(0, 'rgba(255,255,255,0.35)');
  glowA.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, width, height);

  const glowB = ctx.createRadialGradient(
    width * 0.2,
    height * 0.75,
    10,
    width * 0.2,
    height * 0.75,
    width * 0.4
  );
  glowB.addColorStop(0, 'rgba(124,58,237,0.18)');
  glowB.addColorStop(1, 'rgba(124,58,237,0)');
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/png');
}

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
 * Hero ripple over a clean purple gradient (no grain / compression artifacts).
 */
export default function HeroRippleBackground() {
  const [src, setSrc] = useState('');
  const profile = useMemo(() => pickDeviceProfile(), []);

  useEffect(() => {
    if (!profile.enabled) return;
    const id = window.setTimeout(() => setSrc(createHeroGradientDataUrl()), 40);
    return () => window.clearTimeout(id);
  }, [profile.enabled]);

  if (!profile.enabled || !src) {
    return <div className="home-hero__ripple" aria-hidden />;
  }

  return (
    <div className="home-hero__ripple" aria-hidden>
      <RippleDistortion
        src={src}
        brushSize={105}
        strength={0.38}
        swirl={1.1}
        rings={4}
        grayscale={false}
        spread={4.5}
        fade={2.4}
        spacing={14}
        dispersion={0.08}
        glint={0.12}
        tint="#a855f7"
        tintAmount={0.08}
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
