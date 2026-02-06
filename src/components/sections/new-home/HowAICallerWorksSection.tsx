import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Phone, Calendar, Clock, MessageSquare, Gift, Megaphone, CheckCircle2, Bot, Database } from 'lucide-react';

const steps = [
  {
    title: "Inbound Call Handling",
    description: "Customer calls your business. Our AI answers instantly, 24/7, with zero hold time.",
    icon: Phone,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "AI Intelligence Analysis",
    description: "The AI understands natural language, intent, and context just like a human receptionist.",
    icon: Bot,
    color: "bg-indigo-500",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Real-time Calendar Sync",
    description: "System checks your availability instantly across all calendars to find open slots.",
    icon: Calendar,
    color: "bg-violet-500",
    gradient: "from-violet-500 to-fuchsia-500"
  },
  {
    title: "Smart Booking & Action",
    description: "AI books the appointment directly into your CRM and sends confirmation details.",
    icon: CheckCircle2,
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Automated Reminders",
    description: "Reduces no-shows by sending timely SMS and email reminders before the appointment.",
    icon: MessageSquare,
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "Lifecycle Engagement",
    description: "The system continues to engage with birthday wishes and personalized marketing calls.",
    icon: Gift,
    color: "bg-rose-500",
    gradient: "from-rose-500 to-pink-500"
  }
];

const HowAICallerWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm"
          >
            <span className="text-indigo-400 font-medium">Seamless Workflow</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            How Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI Caller</span> Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto"
          >
            From the first ring to long-term customer retention, experience the fully automated journey.
          </motion.p>
        </div>

        {/* Workflow Visualization */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-slate-800 transform -translate-x-1/2 hidden lg:block">
            <motion.div 
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500"
            />
          </div>

          <div className="space-y-24 lg:space-y-0">
            {steps.map((step, index) => (
              <WorkflowStep 
                key={index} 
                step={step} 
                index={index} 
                isLast={index === steps.length - 1} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkflowStep = ({ step, index, isLast }: { step: any, index: number, isLast: boolean }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-0 lg:h-[400px]`}
    >
      {/* Content Side */}
      <div className={`flex-1 w-full lg:w-1/2 px-4 lg:px-12 ${isEven ? 'text-left lg:text-right' : 'text-left lg:text-left'}`}>
        <div className="relative z-10">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 bg-gradient-to-br ${step.gradient} shadow-lg shadow-${step.color.replace('bg-', '')}/20`}>
            <step.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
          <p className="text-lg text-slate-400 leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Center Node (Desktop) */}
      <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
        <div className="relative">
          <div className={`w-8 h-8 rounded-full border-4 border-slate-950 ${step.color} shadow-[0_0_20px_rgba(0,0,0,0.5)]`} />
          <div className={`absolute inset-0 w-full h-full rounded-full ${step.color} animate-ping opacity-20`} />
        </div>
      </div>

      {/* Visual Side */}
      <div className="flex-1 w-full lg:w-1/2 px-4 lg:px-12">
        <div className={`relative rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-2xl overflow-hidden group hover:border-${step.color.replace('bg-', '')}/30 transition-colors duration-500`}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50" />
          
          {/* Mock UI for each step */}
          <div className="relative h-48 md:h-64 rounded-xl bg-slate-950 border border-slate-800/50 overflow-hidden flex items-center justify-center">
            {index === 0 && (
              <div className="flex flex-col items-center animate-pulse">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-blue-200 font-medium">Incoming Call...</div>
                <div className="text-slate-500 text-sm mt-1">+1 (555) 123-4567</div>
              </div>
            )}
            
            {index === 1 && (
              <div className="w-full px-8 space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center"><Bot className="w-4 h-4 text-white"/></div>
                  <div className="bg-indigo-500/10 rounded-2xl rounded-tl-none p-3 text-sm text-indigo-200 border border-indigo-500/20">
                    Hello! How can I help you today?
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0" />
                  <div className="bg-slate-800 rounded-2xl rounded-tr-none p-3 text-sm text-slate-300 border border-slate-700">
                    I'd like to book an appointment.
                  </div>
                </div>
              </div>
            )}

            {index === 2 && (
              <div className="grid grid-cols-3 gap-2 p-4 w-full max-w-xs opacity-80">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`h-16 rounded-lg border border-slate-800 ${i === 4 ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-slate-900'}`}>
                    {i === 4 && <div className="w-full h-full flex items-center justify-center text-emerald-400 text-xs font-bold">Available</div>}
                  </div>
                ))}
              </div>
            )}

            {index === 3 && (
              <div className="text-center">
                 <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-white font-medium">Booking Confirmed</div>
                <div className="text-slate-500 text-sm mt-1">Tuesday, 10:00 AM</div>
              </div>
            )}

            {index === 4 && (
              <div className="w-full max-w-xs bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-lg transform translate-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">Reminder Sent</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-amber-500/50" />
                </div>
              </div>
            )}

            {index === 5 && (
              <div className="relative">
                 <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full" />
                 <div className="relative bg-slate-900 border border-rose-500/30 p-6 rounded-2xl text-center">
                    <Gift className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                    <div className="text-rose-100 font-medium">Happy Birthday!</div>
                    <div className="text-xs text-rose-300/60 mt-1">Automatic Offer Sent</div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HowAICallerWorksSection;
