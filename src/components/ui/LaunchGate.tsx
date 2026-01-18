import { ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Lock, ArrowRight, Stars, Calendar } from 'lucide-react';
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
  description = 'Join the waitlist or complete your profile to get early access.',
  className,
  children,
  dark = false
}: Props) {
  
  // --- COUNTDOWN LOGIC ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  // Responsive Time Card
  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className={cn(
      "flex flex-col items-center justify-center py-2 rounded-lg sm:rounded-xl backdrop-blur-md border shadow-sm w-full",
      dark 
        ? "bg-white/5 border-white/10 text-white" 
        : "bg-white/60 border-white/40 text-slate-900"
    )}>
      <span className="text-lg sm:text-2xl font-bold tabular-nums tracking-tight leading-none">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className={cn(
        "text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80",
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
          // Reduced min-height slightly to fit better
          'transition-all duration-700 ease-in-out select-none pointer-events-none min-h-[340px] md:min-h-[500px]',
          dark ? 'blur-xl brightness-[0.3] grayscale-[0.6]' : 'blur-xl opacity-30 grayscale-[0.3]'
        )}
      >
        {children}
      </div>

      {/* ================= THE GATE OVERLAY ================= */}
      {/* Reduced pt-10 to pt-4/8 to pull it up */}
      <div className="absolute inset-0 z-20 flex items-start md:items-center justify-center px-4 pt-8 md:pt-0 pb-4">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            'relative w-full max-w-[340px] sm:max-w-[480px]', 
            'rounded-[2rem] sm:rounded-[2.5rem] p-px', 
            'shadow-2xl'
          )}
        >
          {/* Animated Border Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 opacity-100 rounded-[2rem] sm:rounded-[2.5rem]" />
          
          {/* Main Card Content */}
          <div className={cn(
            'relative w-full rounded-[1.9rem] sm:rounded-[2.4rem] p-6 sm:p-8 text-center overflow-hidden',
            dark 
              ? 'bg-[#0F172A]/95 backdrop-blur-2xl border border-white/5' 
              : 'bg-white/90 backdrop-blur-2xl border border-white/50'
          )}>
            
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
            
            <div className={cn(
                "absolute top-[-20%] left-1/2 -translate-x-1/2 w-60 h-60 sm:w-80 sm:h-80 rounded-full blur-[70px] sm:blur-[90px] opacity-40 pointer-events-none",
                dark ? "bg-indigo-500" : "bg-blue-400"
            )} />

            {/* --- CARD INTERIOR --- */}
            <div className="relative z-10 flex flex-col items-center">
              
              {/* 1. Launch Date Badge */}
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[10px] sm:text-sm font-bold uppercase tracking-widest mb-6 sm:mb-8 border shadow-sm backdrop-blur-sm",
                dark 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              )}>
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
                <span>Launch: Jan 19, 2026</span>
              </div>

              {/* 2. Floating Lock Icon */}
              <div className="mb-5 sm:mb-6 relative">
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={cn(
                    "w-12 h-12 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-[1.2rem] flex items-center justify-center shadow-xl border ring-4",
                    dark 
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 border-white/10 ring-white/5 text-white" 
                      : "bg-gradient-to-br from-white to-slate-50 border-white ring-white/40 text-slate-900"
                  )}
                >
                  <Lock className="w-5 h-5 sm:w-7 sm:h-7" />
                </motion.div>
                <div className="absolute -top-1 -right-1 p-1 bg-indigo-500 rounded-full text-white shadow-lg animate-pulse">
                    <Stars className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
              </div>

              {/* 3. Typography */}
              <h3 className={cn(
                "text-xl sm:text-3xl font-extrabold tracking-tight mb-2 sm:mb-3 px-2",
                dark ? "text-white" : "text-slate-900"
              )}>
                {title}
              </h3>
              
              <p className={cn(
                "text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-[260px] sm:max-w-xs mx-auto font-medium px-1",
                dark ? "text-slate-400" : "text-slate-500"
              )}>
                {description}
              </p>

              {/* 4. THE COUNTDOWN GRID */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8 w-full">
                 <TimeCard value={timeLeft.days} label="Days" />
                 <TimeCard value={timeLeft.hours} label="Hrs" />
                 <TimeCard value={timeLeft.minutes} label="Mins" />
                 <TimeCard value={timeLeft.seconds} label="Secs" />
              </div>

              {/* 5. Action Buttons - Updated Layout */}
              <div className="flex flex-col gap-3 w-full sm:w-auto sm:min-w-[340px]">
                
                {/* PRIMARY: DISCORD BUTTON (Full Width) */}
                <a
                  href="https://discord.gg/cvRnZTjZ8r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl group text-sm relative overflow-hidden",
                    "bg-[#5865F2] text-white hover:bg-[#4752C4]"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.226 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/></svg>
                  Join Community Discord
                </a>

                {/* SECONDARY BUTTONS ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    to="/community/promote-profile"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all border text-xs sm:text-sm whitespace-nowrap",
                      dark 
                        ? "bg-white text-slate-900 hover:bg-indigo-50" 
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    )}
                  >
                    Promote Profile 
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  
                  <Link
                    to="/community/submit-resource"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all border text-xs sm:text-sm whitespace-nowrap",
                      dark 
                        ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                    )}
                  >
                    Share Resource
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}