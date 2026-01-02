import { ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Lock, ArrowRight, Stars, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Props = {
  active?: boolean;
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
};

// Target Date: January 19, 2026
const TARGET_DATE = new Date('2026-01-19T00:00:00');

export default function LaunchGate({
  active = false,
  title = 'Community Launching Soon',
  description = 'We are curating the best profiles and resources. Join the waitlist or complete your profile to get early access.',
  className,
  children,
  dark = false
}: Props) {
  
  // --- COUNTDOWN LOGIC ---
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +TARGET_DATE - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Smaller, Premium Time Card
  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className={cn(
      "flex flex-col items-center justify-center py-2.5 rounded-xl w-16 sm:w-20 backdrop-blur-md border shadow-sm",
      dark 
        ? "bg-white/5 border-white/10 text-white" 
        : "bg-white/60 border-white/40 text-slate-900"
    )}>
      <span className="text-xl sm:text-2xl font-bold tabular-nums tracking-tight leading-none">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className={cn(
        "text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80",
        dark ? "text-indigo-200" : "text-indigo-600"
      )}>
        {label}
      </span>
    </div>
  );

  if (!active) return <>{children}</>;

  return (
    <div className={cn('relative w-full', className)}>
      
      {/* ================= BLURRED CONTENT LAYER ================= */}
      <div
        aria-hidden="true"
        className={cn(
          'transition-all duration-700 ease-in-out select-none pointer-events-none',
          dark ? 'blur-xl brightness-[0.3] grayscale-[0.6]' : 'blur-xl opacity-30 grayscale-[0.3]'
        )}
      >
        {children}
      </div>

      {/* ================= THE GATE OVERLAY ================= */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            'relative w-full max-w-[500px]', // Reduced width for better proportions
            'rounded-[2.5rem] p-px', 
            'shadow-2xl'
          )}
        >
          {/* Animated Border Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 opacity-100 rounded-[2.5rem]" />
          
          {/* Main Card Content */}
          <div className={cn(
            'relative w-full rounded-[2.4rem] p-8 text-center overflow-hidden',
            dark 
              ? 'bg-[#0F172A]/95 backdrop-blur-2xl border border-white/5' 
              : 'bg-white/90 backdrop-blur-2xl border border-white/50'
          )}>
            
            {/* Ambient Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
            
            {/* Ambient Glow Orb */}
            <div className={cn(
                "absolute top-[-20%] left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[90px] opacity-40 pointer-events-none",
                dark ? "bg-indigo-500" : "bg-blue-400"
            )} />

            {/* --- CARD INTERIOR --- */}
            <div className="relative z-10 flex flex-col items-center">
              
              {/* 1. Launch Date Badge (Larger & More Prominent) */}
              <div className={cn(
                "inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border shadow-sm backdrop-blur-sm",
                dark 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              )}>
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Launch: Jan 19, 2026</span>
              </div>

              {/* 2. Floating Lock Icon (Slightly Smaller) */}
              <div className="mb-6 relative">
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={cn(
                    "w-16 h-16 rounded-[1.2rem] flex items-center justify-center shadow-xl border ring-4",
                    dark 
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 border-white/10 ring-white/5 text-white" 
                      : "bg-gradient-to-br from-white to-slate-50 border-white ring-white/40 text-slate-900"
                  )}
                >
                  <Lock className="w-7 h-7" />
                </motion.div>
                <div className="absolute -top-1 -right-1 p-1 bg-indigo-500 rounded-full text-white shadow-lg animate-pulse">
                    <Stars className="w-3 h-3" />
                </div>
              </div>

              {/* 3. Typography */}
              <h3 className={cn(
                "text-2xl md:text-3xl font-extrabold tracking-tight mb-3",
                dark ? "text-white" : "text-slate-900"
              )}>
                {title}
              </h3>
              
              <p className={cn(
                "text-sm leading-relaxed mb-8 max-w-xs mx-auto font-medium",
                dark ? "text-slate-400" : "text-slate-500"
              )}>
                {description}
              </p>

              {/* 4. THE COUNTDOWN GRID (Compact) */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-8 w-full max-w-[360px]">
                 <TimeCard value={timeLeft.days} label="Days" />
                 <TimeCard value={timeLeft.hours} label="Hrs" />
                 <TimeCard value={timeLeft.minutes} label="Mins" />
                 <TimeCard value={timeLeft.seconds} label="Secs" />
              </div>

              {/* 5. Action Buttons (Compact) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/community/promote-profile"
                  className={cn(
                    "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20 group text-sm",
                    dark 
                      ? "bg-white text-slate-900 hover:bg-indigo-50" 
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  )}
                >
                  Create Profile 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  to="/community/submit-resource"
                  className={cn(
                    "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border text-sm",
                    dark 
                      ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                  )}
                >
                  Submit Resource
                </Link>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}