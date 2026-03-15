import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageSquare, Users, Eye, ArrowRight, Zap, Sparkles, Shield, Check, Star, TrendingUp, ZapIcon } from 'lucide-react';
import SEO from '../components/SEO';
import PricingSection2 from '../components/sections/PricingSection2';

// ─── Word Reveal ────────────────────────────────────────────────────────────
const WordReveal = ({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(' ');
  return (
    <div className={`flex flex-wrap justify-center gap-x-[0.2em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// ─── Glow Orb ───────────────────────────────────────────────────────────────
const Orb = ({ className = '' }: { className?: string }) => (
  <div
    className={`absolute pointer-events-none rounded-full blur-[120px] opacity-50 animate-pulse ${className}`}
  />
);

// ─── Audio Engine ───────────────────────────────────────────────────────────
const useSfx = () => {
  const ctx = useRef<AudioContext | null>(null);

  const playSfx = (type: 'woosh' | 'pop' | 'success' = 'woosh', frequency = 800) => {
    try {
      if (!ctx.current) ctx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ac = ctx.current;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      const filter = ac.createBiquadFilter();

      filter.type = 'lowpass';

      if (type === 'woosh') {
        filter.frequency.setValueAtTime(40, ac.currentTime);
        filter.frequency.exponentialRampToValueAtTime(frequency, ac.currentTime + 0.15);
        filter.frequency.exponentialRampToValueAtTime(40, ac.currentTime + 0.6);
        gain.gain.setValueAtTime(0, ac.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ac.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0, ac.currentTime + 0.6);
        osc.start();
        osc.stop(ac.currentTime + 0.6);
      } else if (type === 'pop') {
        osc.frequency.setValueAtTime(frequency, ac.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, ac.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, ac.currentTime);
        gain.gain.linearRampToValueAtTime(0, ac.currentTime + 0.1);
        osc.start();
        osc.stop(ac.currentTime + 0.1);
      }

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ac.destination);
    } catch (_) { }
  };

  return playSfx;
};

// ─── Shared animation variants ──────────────────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(15px)', transition: { duration: 0.6, ease: "easeInOut" } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const painCards = [
  {
    icon: ShoppingCart,
    stat: '68%',
    title: 'Cart abandonment',
    desc: '68% of Indian shoppers abandon carts because no one follows up in time.',
    color: 'from-blue-600 to-indigo-700',
    pitch: 400
  },
  {
    icon: MessageSquare,
    stat: '11 PM',
    title: 'Unanswered queries',
    desc: 'Customers ask on WhatsApp at 11 PM. Your team replies at 10 AM. Sale gone.',
    color: 'from-purple-600 to-indigo-700',
    pitch: 600
  },
  {
    icon: Users,
    stat: '0×',
    title: 'Lost repeat buyers',
    desc: 'No broadcast = no re-engagement. Previous buyers forget you exist.',
    color: 'from-indigo-600 to-purple-800',
    pitch: 800
  },
  {
    icon: Eye,
    stat: '?',
    title: 'Zero visibility',
    desc: "You don't know who added to cart, who checked out, who needs a nudge.",
    color: 'from-pink-600 to-purple-700',
    pitch: 1000
  },
];

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════
const Ecommerce = () => {
  const [step, setStep] = useState(0);
  const [cardsShown, setCardsShown] = useState(0);
  const playSfx = useSfx();

  const go = (s: number) => {
    playSfx('woosh');
    setStep(s);
    if (s !== 1) setCardsShown(0);
  };

  // Auto-advance intro
  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => go(1), 5000);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Sequential Cards for Step 1
  useEffect(() => {
    if (step === 1 && cardsShown < painCards.length) {
      const t = setTimeout(() => {
        setCardsShown(prev => prev + 1);
        playSfx('pop', painCards[cardsShown].pitch);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [step, cardsShown]);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden select-none font-sans">
      <SEO title="E-commerce Scaling | TopEdge AI" description="Transform your brand with high-performance e-commerce automation." />

      {/* Background Visuals */}
      <Orb className="top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-700/20" />
      <Orb className="bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-indigo-700/15" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* HUD Branding */}
      <div className="fixed top-8 left-8 z-50 flex items-center gap-4">
        <div className="h-10 w-10 flex items-center justify-center bg-white rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <Zap className="w-6 h-6 text-black fill-current" />
        </div>
        <div>
          <div className="text-base font-black tracking-[0.4em] uppercase leading-none">TopEdge AI</div>
          <div className="text-[10px] font-bold text-zinc-700 tracking-[0.2em] uppercase mt-1">Scale Protocol // v2.6</div>
        </div>
      </div>

      {/* Phase HUD */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/60 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/10 shadow-2xl transition-all hover:border-purple-500/30">
        {[0, 1, 2, 3].map((s) => (
          <button key={s} onClick={() => go(s)} className="group flex flex-col items-center gap-1.5">
            <div className={`h-1 rounded-full transition-all duration-700 ${step === s ? 'w-10 bg-purple-500 shadow-[0_0_15px_#A855F7]' : 'w-3 bg-zinc-800 group-hover:bg-zinc-600'}`} />
            <span className={`text-[8px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${step === s ? 'text-white' : 'text-transparent h-0 overflow-hidden'}`}>{step === s ? `0${s + 1}` : ''}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="intro" initial="hidden" animate="visible" exit="exit" variants={container} className="h-full flex flex-col items-center justify-center px-8 text-center relative z-10">
            <motion.div variants={item} className="mb-10">
              <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-400 text-xs font-black tracking-[0.5em] uppercase shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Revenue System Alert
              </span>
            </motion.div>
            <WordReveal text="Every single day, you are missing out on major revenue." className="text-[clamp(1.75rem,8vw,5.5rem)] font-black tracking-tighter leading-[1.0] max-w-6xl mb-8 px-4" delay={0.5} />
            <motion.p variants={item} className="text-zinc-600 text-lg md:text-2xl font-black italic tracking-tight px-6 underline decoration-purple-500/30">Scale your protocol. Reclaim your time.</motion.p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="cards" initial="hidden" animate="visible" exit="exit" variants={container} className="h-full flex flex-col items-center justify-center px-8 py-20 relative z-10">
            <motion.div variants={item} className="mb-10 text-center px-4">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-purple-500 block mb-3">The friction points</span>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white leading-tight mb-4">The scale-killing friction.</h2>
              <p className="text-zinc-600 text-base md:text-xl font-bold italic">Draining your bottom line daily.</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full max-w-6xl h-auto px-2">
              {painCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={cardsShown > i ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-zinc-950 border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-700 shadow-2xl"
                >
                  <div className={`absolute -right-8 -top-8 md:-right-16 md:-top-16 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 blur-[60px] md:blur-[80px] transition-opacity duration-1000`} />
                  <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                    <card.icon className="w-5 h-5 md:w-7 md:h-7 text-white group-hover:text-black" />
                  </div>
                  <div className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2 tracking-tighter">{card.stat}</div>
                  <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/50 mb-2 md:mb-3 group-hover:text-purple-400 transition-colors">{card.title}</h3>
                  <p className="text-zinc-500 text-[10px] md:text-sm leading-relaxed font-bold italic line-clamp-3 md:line-clamp-none">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={cardsShown === painCards.length ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-10"
            >
              <button onClick={() => go(2)} className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-lg hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                Expose the Math <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="stats" initial="hidden" animate="visible" exit="exit" variants={container} className="h-full flex flex-col items-center justify-center px-8 relative z-10">
            <Orb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/30" />
            <motion.div variants={item} className="text-center relative z-20 max-w-4xl px-4">
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-purple-600 block mb-6 px-1">Diagnosis Complete</span>
              <WordReveal text="On average, brands lose 10–12 potential orders every single week." className="text-[clamp(1.5rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.05] text-white mb-8" delay={0.2} />
              <motion.p variants={item} className="text-zinc-600 text-base md:text-xl font-black italic tracking-[0.1em] uppercase mb-10">Slow replies. Dead windows. LEAKS.</motion.p>

              <motion.div variants={item} className="relative inline-flex flex-col items-center">
                <div className="inline-flex items-center justify-center gap-4 mb-2 md:mb-4 px-8 py-6 md:px-12 md:py-8 rounded-[2rem] md:rounded-[3rem] border border-purple-500/50 bg-[#020202] shadow-[0_0_80px_rgba(168,85,247,0.3)] whitespace-nowrap">
                  <span className="text-zinc-800 text-3xl md:text-5xl font-black italic">₹</span>
                  <span className="text-[clamp(2rem,7vw,6.5rem)] font-black tracking-tighter leading-none">1,000 – 5,000</span>
                </div>
                <motion.p variants={item} className="text-zinc-600 text-[10px] font-black tracking-[0.4em] uppercase mb-8 md:mb-12">Perishable revenue loss per window</motion.p>
              </motion.div>

              <div className="flex flex-col items-center">
                <motion.button variants={item} onClick={() => go(3)} className="bg-purple-600 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)] active:scale-95">
                  Plug the Leak Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="pricing" initial="hidden" animate="visible" exit="exit" variants={container} className="h-full w-full overflow-y-auto no-scrollbar relative z-10">
            <PricingSection2 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Ecommerce;
