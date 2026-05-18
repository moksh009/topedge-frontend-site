import { motion } from 'framer-motion';

export default function HoverStatChip({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      className="feature-stat-chip marketing-premium-card rounded-2xl px-5 py-3 text-center"
    >
      <p className="bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] bg-clip-text text-xl font-black tracking-tight text-transparent md:text-2xl">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] font-medium text-slate-500">{label}</p>
    </motion.div>
  );
}
