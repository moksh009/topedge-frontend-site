"use client";
import React, { useId, useRef, useState, useMemo } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { CheckCheck, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import * as PricingCard from "@/components/ui/pricing-card";

// ─── Toggle Switch ───────────────────────────────────────────────────────────
const PricingSwitch = ({
  button1,
  button2,
  onSwitch,
  className,
  layoutId,
}: {
  button1: string;
  button2: string;
  onSwitch: (value: string) => void;
  className?: string;
  layoutId?: string;
}) => {
  const [selected, setSelected] = useState("0");
  const uniqueId = useId();
  const switchLayoutId = layoutId || `switch-${uniqueId}`;

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div
      className={cn(
        "relative z-10 w-full flex rounded-2xl bg-zinc-900/50 border border-white/10 p-1.5 backdrop-blur-md",
        className,
      )}
    >
      <button
        onClick={() => handleSwitch("0")}
        className={cn(
          "relative z-10 w-full h-12 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300",
          selected === "0"
            ? "text-white"
            : "text-zinc-500 hover:text-zinc-300",
        )}
      >
        {selected === "0" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-20">{button1}</span>
      </button>

      <button
        onClick={() => handleSwitch("1")}
        className={cn(
          "relative z-10 w-full h-12 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300",
          selected === "1"
            ? "text-white"
            : "text-zinc-500 hover:text-zinc-300",
        )}
      >
        {selected === "1" && (
          <motion.span
            layoutId={switchLayoutId}
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-20">{button2}</span>
      </button>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PricingSection2() {
  const [tier, setTier] = useState("v1"); // v1 or v2
  const [cycle, setCycle] = useState("monthly"); // monthly or quarterly
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  };

  const delayedRevealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: (i * 0.15) + 0.5,
      },
    }),
    hidden: {
      filter: "blur(15px)",
      y: 30,
      opacity: 0,
    },
  };

  const timelineVariants = {
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(5px)",
      x: -10,
      opacity: 0,
    },
  };

  const prices = useMemo(() => {
    if (tier === "v1") {
      return cycle === "monthly"
        ? { current: 3499, original: 4499, setup: 4999, label: "/month" }
        : { current: 8999, original: 10497, setup: 0, label: "Total / 3 Months" };
    } else {
      return cycle === "monthly"
        ? { current: 4999, original: 6499, setup: 4999, label: "/month" }
        : { current: 12999, original: 14997, setup: 0, label: "Total / 3 Months" };
    }
  }, [tier, cycle]);

  const features = useMemo(() => {
    const base = [
      "Custom AI Trained on Your Brand",
      "Instant 0.1s Hero Support",
      "Auto-Pilot Tracking Updates",
      "Never Lose a Cart Again",
      "Real-Time VIP Lead Sniper",
    ];
    if (tier === "v2") {
      return [
        ...base,
        "Human handoff — Elite takeover",
        "Viral Broadcast Campaigns",
        "Precision WhatsApp ROI Tracking",
        "Deep Attribution Analytics",
        "Custom Infinite Feature Build",
      ];
    }
    return base;
  }, [tier]);

  const handleGetStarted = () => {
    const planName = tier === "v1" ? "Standard Protocol" : "Elite Scale Protocol";
    const cycleName = cycle === "monthly" ? "Monthly" : "Growth (3 Mo)";
    const message = `Hi! I'm ready to stop losing revenue. I want to activate the ${planName} ${cycleName} plan immediately. Let's get started.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919313045439?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full min-h-screen bg-black relative flex flex-col items-center justify-center py-16 px-6 md:px-24 overflow-hidden md:overflow-visible" ref={pricingRef}>
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/20 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1200px] w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_540px] gap-12 lg:gap-16 items-start pt-4 lg:pt-10">

        {/* Left Side: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pt-4">
          <TimelineContent
            as="div"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex items-center gap-3 mb-6 md:mb-8 bg-purple-500/10 px-5 py-2 rounded-full border border-purple-500/30"
          >
            <Zap className="h-4 w-4 text-purple-400 fill-purple-400" />
            <span className="text-purple-400 font-black tracking-[0.3em] uppercase text-[10px]">Elite Protocol Alpha</span>
          </TimelineContent>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.0] lg:leading-[0.95] tracking-tighter">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              transition={{
                type: "spring", stiffness: 250, damping: 40, delay: 0.4,
              }}
            >
              Scale Beyond Human Limits
            </VerticalCutReveal>
          </h1>

          <TimelineContent
            as="p"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-lg md:text-xl text-zinc-500 font-bold italic mb-8 md:mb-12 max-w-lg"
          >
            Don't let another lead slip away. Join elite brands using TopEdge AI to automate sales and close deals while you sleep.
          </TimelineContent>

          <div className="space-y-4 md:space-y-6 w-full max-w-md">
            {features.map((feature, index) => (
              <TimelineContent
                key={index}
                as="div"
                animationNum={index}
                timelineRef={pricingRef}
                customVariants={timelineVariants}
                className="flex items-center gap-3 md:gap-4 group justify-center lg:justify-start"
              >
                <div className="w-5 md:w-6 h-5 md:h-6 bg-purple-600/20 border border-purple-500/40 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                  <CheckCheck className="h-2.5 md:h-3 w-2.5 md:w-3 text-white" />
                </div>
                <span className="text-zinc-400 font-bold italic text-xs md:text-sm group-hover:text-white transition-colors">{feature}</span>
              </TimelineContent>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Card */}
        <div className="flex flex-col gap-8 w-full max-w-[540px] mx-auto lg:mr-0 outline-none">
          <PricingCard.Card className="p-7 md:p-9 bg-zinc-950/50 border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative overflow-visible group border border-purple-500/10 hover:border-purple-500/20 transition-all duration-500">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/15 blur-[60px] rounded-full" />

            <PricingCard.Body className="p-0 space-y-8 md:space-y-10">
              {/* Toggles */}
              <div className="space-y-6 md:space-y-8 relative z-10">
                <TimelineContent as="div" animationNum={0} timelineRef={pricingRef} customVariants={delayedRevealVariants}>
                  <h4 className="text-[9px] md:text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-3 md:mb-4">Select Protocol</h4>
                  <PricingSwitch
                    button1="Standard"
                    button2="Elite Scale"
                    onSwitch={(v) => setTier(v === "0" ? "v1" : "v2")}
                    className="w-full"
                    layoutId="tier-toggle"
                  />
                </TimelineContent>

                <TimelineContent as="div" animationNum={1} timelineRef={pricingRef} customVariants={delayedRevealVariants}>
                  <h4 className="text-[9px] md:text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] mb-3 md:mb-4">Select Cycle</h4>
                  <PricingSwitch
                    button1="Monthly"
                    button2="Growth (3 Mo)"
                    onSwitch={(v) => setCycle(v === "0" ? "monthly" : "quarterly")}
                    className="w-full"
                    layoutId="cycle-toggle"
                  />
                </TimelineContent>
              </div>

              <TimelineContent
                as="div"
                animationNum={2}
                timelineRef={pricingRef}
                customVariants={delayedRevealVariants}
                className="pt-10 md:pt-12 border-t border-white/10 relative z-10"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center lg:items-start w-full">
                    <div className="flex items-baseline gap-3 mb-2 w-full">
                      <span className="text-white text-5xl md:text-7xl font-bold italic leading-none">₹</span>
                      <NumberFlow
                        value={prices.current}
                        className="text-7xl md:text-8xl font-black tracking-tighter text-white leading-none"
                      />
                      <div className="flex flex-col ml-3 lg:ml-4">
                        <span className="text-zinc-500 font-semibold text-xs md:text-sm whitespace-nowrap">{prices.label}</span>
                        {cycle === 'quarterly' && (
                          <span className="text-zinc-600 text-[10px] md:text-[11px] font-bold uppercase tracking-widest whitespace-nowrap"></span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-zinc-600 text-xl md:text-2xl font-bold line-through">₹{prices.original}</span>

                      {(prices.setup > 0 || cycle === 'quarterly') && (
                        <div className={cn(
                          "border px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md transition-all duration-300",
                          cycle === 'quarterly'
                            ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                            : "bg-purple-600/15 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                        )}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full animate-pulse",
                            cycle === 'quarterly' ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          )} />
                          <span className={cn(
                            "text-[10px] md:text-xs font-black uppercase tracking-widest",
                            cycle === 'quarterly' ? "text-emerald-300" : "text-purple-300"
                          )}>
                            {cycle === 'quarterly' ? "FREE Setup Included" : `+ ₹${prices.setup} Setup`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 pt-4">
                    <button 
                      onClick={handleGetStarted}
                      className="w-full bg-white text-black py-5 md:py-8 rounded-2xl md:rounded-[2rem] font-black text-xl md:text-2xl hover:bg-purple-600 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_60px_rgba(168,85,247,0.25)] relative overflow-hidden group/btn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                      START SCALING NOW
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[9px] md:text-[10px] font-black text-zinc-700 tracking-[0.3em] uppercase">
                      <ShieldCheck className="h-4 w-4" />
                      SECURE PROTOCOL LOCKDOWN
                    </div>
                  </div>
                </div>
              </TimelineContent>
            </PricingCard.Body>
          </PricingCard.Card>
        </div>
      </div>
    </div>
  );
}
