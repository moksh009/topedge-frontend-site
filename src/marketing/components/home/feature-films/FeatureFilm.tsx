import { useEffect, useRef, useState, type ComponentType } from 'react';
import type { FeatureFilmId } from './types';
import CartRecoveryFilm from './films/CartRecoveryFilm';
import JourneyCodFilm from './films/JourneyCodFilm';
import PixelInsightsFilm from './films/PixelInsightsFilm';
import AudienceBroadcastFilm from './films/AudienceBroadcastFilm';
import StockMonitorFilm from './films/StockMonitorFilm';
import WarrantyFilm from './films/WarrantyFilm';

const FILM_MAP: Record<FeatureFilmId, ComponentType<{ active: boolean }>> = {
  'cart-recovery': CartRecoveryFilm,
  'journey-cod': JourneyCodFilm,
  'pixel-insights': PixelInsightsFilm,
  'audience-broadcast': AudienceBroadcastFilm,
  'stock-monitor': StockMonitorFilm,
  warranty: WarrantyFilm,
};

export default function FeatureFilm({ id }: { id: FeatureFilmId }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(Boolean(e?.isIntersecting && (e.intersectionRatio ?? 0) >= 0.45)),
      { threshold: [0, 0.45, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Film = FILM_MAP[id];

  return (
    <div ref={ref} className="film-stage-host">
      <Film active={active} />
    </div>
  );
}
