import { impactStats } from '../../data/home';

export default function HomeStatsBar() {
  return (
    <section className="border-b border-violet-100/80 bg-white py-12 md:py-14">
      <div className="marketing-container">
        <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
          Built for Indian Shopify D2C
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {impactStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-medium tracking-tight text-[#0c1222] md:text-4xl">{s.value}</p>
              <p className="mt-1.5 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
