import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import WhatsAppLogo from '../icons/WhatsAppLogo';
import { cn } from '@/lib/utils';

type Props = {
  scrollProgress?: MotionValue<number>;
  className?: string;
  /** Force static layout — no scroll transforms (homepage performance) */
  static?: boolean;
};

function useProgress(external?: MotionValue<number>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const local = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  return { ref, progress: external ?? local };
}

export default function HomeHeroProductVisual({ scrollProgress, className, static: forceStatic }: Props) {
  const reduce = useReducedMotion() || forceStatic;
  const { ref, progress } = useProgress(forceStatic ? undefined : scrollProgress);

  const yMain = useTransform(progress, [0, 0.5, 1], [0, -12, 24]);
  const scaleMain = useTransform(progress, [0, 0.35, 1], [0.94, 1, 0.92]);
  const rotateX = useTransform(progress, [0, 1], [6, -2]);

  const cardLeftX = useTransform(progress, [0, 0.45, 1], [-24, 0, -8]);
  const cardLeftY = useTransform(progress, [0, 0.45, 1], [20, 0, -16]);
  const cardLeftOpacity = useTransform(progress, [0, 0.2, 1], [0, 1, 1]);

  const cardRightX = useTransform(progress, [0, 0.45, 1], [24, 0, 8]);
  const cardRightY = useTransform(progress, [0, 0.45, 1], [28, 0, 12]);
  const cardRightOpacity = useTransform(progress, [0, 0.25, 1], [0, 1, 1]);

  const waScale = useTransform(progress, [0, 0.4, 1], [0.85, 1.05, 1]);
  const waY = useTransform(progress, [0, 0.5, 1], [16, 0, -8]);

  const metaY = useTransform(progress, [0, 0.35, 1], [-20, 0, -32]);
  const metaOpacity = useTransform(progress, [0, 0.15, 1], [0, 1, 0.85]);
  const pillsOpacity = useTransform(progress, [0.5, 0.85], [0, 1]);

  if (reduce) {
    return (
      <div ref={ref} className={cn('home-hero-visual', className)}>
        <StaticVisual />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('home-hero-visual relative', className)}>
      <div
        style={{ y: yMain, scale: scaleMain, rotateX }}
        className="home-hero-visual-stage relative mx-auto aspect-[4/3] w-full max-w-lg origin-center will-change-transform"
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#5b21b6] via-[#7C3AED] to-[#a78bfa] shadow-[0_40px_100px_-30px_rgba(124,58,237,0.55)]"
        />
        <div className="absolute -left-8 top-1/4 h-32 w-32 rounded-full bg-white/20 blur-3xl" aria-hidden />
        <div className="absolute -right-6 bottom-1/4 h-40 w-40 rounded-full bg-violet-900/25 blur-3xl" aria-hidden />

        <div
          style={{ y: metaY, opacity: metaOpacity }}
          className="absolute left-1/2 top-6 z-20 -translate-x-1/2"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Meta template approved
          </span>
        </div>

        <div
          style={{ x: cardLeftX, y: cardLeftY, opacity: cardLeftOpacity }}
          className="absolute left-4 top-[28%] z-10 w-[42%] max-w-[168px]"
        >
          <StorePulseCard />
        </div>

        <div
          style={{ scale: waScale, y: waY }}
          className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
        >
          <WhatsAppHub />
        </div>

        <div
          style={{ x: cardRightX, y: cardRightY, opacity: cardRightOpacity }}
          className="absolute right-4 top-[32%] z-10 w-[44%] max-w-[172px]"
        >
          <ChatPreviewCard />
        </div>

        <div
          style={{ opacity: pillsOpacity }}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2"
        >
          {['Shopify', 'Meta', 'AI'].map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-bold text-white backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticVisual() {
  return (
    <div className="home-hero-visual-stage relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#5b21b6] via-[#7C3AED] to-[#a78bfa] shadow-[0_40px_100px_-30px_rgba(124,58,237,0.55)]">
      <div className="absolute left-4 top-[28%] w-[42%]">
        <StorePulseCard />
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <WhatsAppHub />
      </div>
      <div className="absolute right-4 top-[32%] w-[44%]">
        <ChatPreviewCard />
      </div>
    </div>
  );
}

function StorePulseCard() {
  return (
    <div className="home-hero-float-card rounded-2xl bg-white/95 p-3.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md md:p-4">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Store pulse</p>
      <p className="mt-0.5 text-xl font-black text-slate-900 md:text-2xl">₹8.4L</p>
      <p className="text-[11px] font-semibold text-emerald-600">+18% this week</p>
      <div className="mt-3 flex h-10 items-end gap-1">
        {[40, 65, 50, 82, 70, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-[#7C3AED] to-violet-300"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatPreviewCard() {
  return (
    <div className="home-hero-float-card rounded-2xl bg-white/95 p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md md:p-3.5">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <WhatsAppLogo size={22} />
        <div>
          <p className="text-[11px] font-bold text-slate-900">Priya S.</p>
          <p className="text-[9px] text-emerald-600">online</p>
        </div>
      </div>
      <div className="mt-2 space-y-1.5">
        <div className="max-w-[92%] rounded-xl rounded-tl-sm bg-[#e7f8ef] px-2 py-1.5 text-[10px] text-slate-700">
          COD to Mumbai?
        </div>
        <div className="ml-auto max-w-[92%] rounded-xl rounded-tr-sm bg-slate-50 px-2 py-1.5 text-[10px] text-slate-700 ring-1 ring-slate-100">
          Yes — ₹1,299 · reserve?
        </div>
      </div>
    </div>
  );
}

function WhatsAppHub() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 scale-110 rounded-full bg-[#25D366]/40 blur-xl" aria-hidden />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366] shadow-lg shadow-emerald-500/40 md:h-20 md:w-20 md:rounded-3xl">
          <WhatsAppLogo size={44} className="md:h-12 md:w-12" />
        </div>
      </div>
      <p className="text-center text-[11px] font-bold text-white drop-shadow-sm">WhatsApp OS</p>
      <p className="text-[9px] font-medium text-white/80">Shopify · Meta · AI</p>
    </div>
  );
}
