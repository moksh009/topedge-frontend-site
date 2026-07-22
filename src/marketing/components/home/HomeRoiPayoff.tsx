import { useMemo, useState, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../ui';

const LITE_PRICE = 799;

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

/**
 * Recovery ROI — calm, brand-aligned calculator (violet / ink / white).
 * Embedded inside the chaos → white bridge.
 */
export default function HomeRoiPayoff({ embedded = false }: { embedded?: boolean }) {
  const [carts, setCarts] = useState(160);
  const [aov, setAov] = useState(2500);
  const [rate, setRate] = useState(10);

  const recovered = useMemo(
    () => carts * (rate / 100) * aov,
    [carts, aov, rate],
  );
  const multiple = recovered / LITE_PRICE;
  const perWeek = recovered / 4;
  const cartsWon = Math.round(carts * (rate / 100));
  const meter = Math.min(100, (multiple / 40) * 100);

  const body = (
    <div className={`home-roi-lab${embedded ? ' is-embedded' : ''}`}>
      <header className="home-roi-lab__head">
        <p className="home-roi-lab__eyebrow">Recovery payoff</p>
        <h2 className="home-roi-lab__title">
          What WhatsApp recovery is worth for your store
        </h2>
        <p className="home-roi-lab__sub">
          Tune the inputs. We estimate recovered revenue from timed nudges, then
          compare it to Lite.
        </p>
      </header>

      <div className="home-roi-lab__layout">
        <div className="home-roi-lab__result">
          <p className="home-roi-lab__kicker">Estimated recovered / month</p>
          <p className="home-roi-lab__value mkt-kpi" key={Math.round(recovered)}>
            {formatInr(recovered)}
          </p>
          <p className="home-roi-lab__week">
            About {formatInr(perWeek)} each week if volume stays steady
          </p>

          <div className="home-roi-lab__meter" aria-hidden>
            <span
              className="home-roi-lab__meter-fill"
              style={{ width: `${meter}%` }}
            />
          </div>

          <dl className="home-roi-lab__stats">
            <div>
              <dt>Lite plan</dt>
              <dd>{formatInr(LITE_PRICE)}/mo</dd>
            </div>
            <div>
              <dt>Pays for itself</dt>
              <dd>
                ~{multiple >= 10 ? Math.round(multiple) : multiple.toFixed(1)}×
              </dd>
            </div>
            <div>
              <dt>Carts recovered</dt>
              <dd>{cartsWon}/mo</dd>
            </div>
          </dl>
        </div>

        <div className="home-roi-lab__controls">
          <label className="home-roi-lab__field">
            <span className="home-roi-lab__label">
              Abandoned carts / month
              <strong className="mkt-kpi">{carts}</strong>
            </span>
            <input
              type="range"
              min={40}
              max={800}
              step={10}
              value={carts}
              onChange={(e) => setCarts(Number(e.target.value))}
              style={
                {
                  '--fill': `${((carts - 40) / (800 - 40)) * 100}%`,
                } as CSSProperties
              }
            />
          </label>

          <label className="home-roi-lab__field">
            <span className="home-roi-lab__label">
              Average order value
              <strong className="mkt-kpi">{formatInr(aov)}</strong>
            </span>
            <input
              type="range"
              min={500}
              max={8000}
              step={100}
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              style={
                {
                  '--fill': `${((aov - 500) / (8000 - 500)) * 100}%`,
                } as CSSProperties
              }
            />
          </label>

          <label className="home-roi-lab__field">
            <span className="home-roi-lab__label">
              Assumed recovery rate
              <strong className="mkt-kpi">{rate}%</strong>
            </span>
            <input
              type="range"
              min={4}
              max={25}
              step={1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              style={
                {
                  '--fill': `${((rate - 4) / (25 - 4)) * 100}%`,
                } as CSSProperties
              }
            />
          </label>

          <p className="home-roi-lab__hint">
            Conservative default is 10%. Many stores land between 8% and 15%.
          </p>

          <div className="home-roi-lab__actions">
            <PrimaryButton to="/signup" className="home-roi-lab__cta">
              Start free
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <a href="#home-pricing" className="home-roi-lab__link">
              See plans
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="home-roi home-roi--embedded" aria-label="Recovery ROI">
        {body}
      </div>
    );
  }

  return (
    <section className="home-roi" aria-label="Recovery ROI">
      {body}
    </section>
  );
}
