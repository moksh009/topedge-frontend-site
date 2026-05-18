import { Reveal } from './motion';

type Stat = { value: string; label: string };

export default function MarketingStatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-violet-100/80 bg-white py-10 md:py-12">
      <Reveal className="marketing-container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
