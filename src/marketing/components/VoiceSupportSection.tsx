import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mic, Headphones } from 'lucide-react';
import { Eyebrow } from './ui';
import { Reveal } from './motion';

const AICallerDemoSection = lazy(() => import('../../components/sections/new-home/AICallerDemoSection'));

export default function VoiceSupportSection() {
  return (
    <section className="marketing-section-subtle relative overflow-hidden border-y border-violet-100/60 py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Voice AI</Eyebrow>
          <h2 className="text-[1.875rem] leading-[1.1] tracking-[-0.035em] md:text-[2.5rem]">
            Ask TopEdge anything — out loud
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
            Pricing, WhatsApp setup, Flow Builder — our voice assistant answers in real time. Try the demo below or use
            the widget on any page.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] text-slate-600">
              <Mic className="h-3.5 w-3.5" />
              Live voice demo
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] text-slate-600">
              <Headphones className="h-3.5 w-3.5" />
              Widget on every page
            </span>
          </div>
        </Reveal>

        <Reveal className="mt-14 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_64px_-24px_rgba(12,18,34,0.12)]">
          <Suspense
            fallback={
              <div className="flex h-[400px] items-center justify-center text-sm text-slate-400">
                Loading voice demo…
              </div>
            }
          >
            <AICallerDemoSection />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}
