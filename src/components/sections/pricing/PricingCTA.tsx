import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Mesh Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-12 shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deployment Ready</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tighter mb-8 leading-[1.1]">
            Ready to architect <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-600 to-slate-900">your AI future?</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Join the visionary brands leveraging <span className="text-slate-900 font-medium">TopEdge Intelligence</span> to redefine customer engagement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/booking')}
              className="group px-8 py-4 rounded-[1.5rem] bg-slate-900 text-white font-bold text-lg flex items-center gap-3 shadow-lg"
            >
              <span>Secure Your Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/roi')}
              className="px-8 py-4 rounded-[1.5rem] bg-white border border-slate-200 text-slate-900 font-bold text-lg flex items-center gap-3 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Zap className="w-5 h-5 text-indigo-600" />
              <span>Analyze ROI</span>
            </motion.button>
          </div>

          {/* Trust Line */}
          <div className="mt-16 pt-8 border-t border-slate-50 flex justify-center gap-8 grayscale opacity-30">
            <div className="flex items-center gap-2 font-bold text-[9px] uppercase tracking-widest text-slate-500">256-Bit Encryption</div>
            <div className="flex items-center gap-2 font-bold text-[9px] uppercase tracking-widest text-slate-500">GDPR Compliant</div>
            <div className="flex items-center gap-2 font-bold text-[9px] uppercase tracking-widest text-slate-500">Global Deployment</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
