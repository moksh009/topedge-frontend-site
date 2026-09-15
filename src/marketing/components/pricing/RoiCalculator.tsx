import { useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function fillStyle(value: number, min: number, max: number): CSSProperties {
  return { '--fill': `${((value - min) / (max - min)) * 100}%` } as CSSProperties;
}

type PresetId = 'small' | 'growing' | 'busy';

const PRESETS: Record<
  PresetId,
  { label: string; hint: string; orders: number; aov: number; abandon: number; lift: number }
> = {
  small: { label: 'Small', hint: '200 orders', orders: 200, aov: 1800, abandon: 70, lift: 10 },
  growing: { label: 'Growing', hint: '400 orders', orders: 400, aov: 2500, abandon: 70, lift: 10 },
  busy: { label: 'Busy', hint: '900 orders', orders: 900, aov: 3200, abandon: 68, lift: 12 },
};

/**
 * orders × AOV × abandon % × recovery lift
 */
export default function RoiCalculator() {
  const [preset, setPreset] = useState<PresetId | 'custom'>('growing');
  const [orders, setOrders] = useState(PRESETS.growing.orders);
  const [aov, setAov] = useState(PRESETS.growing.aov);
  const [abandon, setAbandon] = useState(PRESETS.growing.abandon);
  const [lift, setLift] = useState(PRESETS.growing.lift);

  const recovered = useMemo(
    () => orders * (abandon / 100) * (lift / 100) * aov,
    [orders, aov, abandon, lift]
  );
  const carts = Math.round(orders * (abandon / 100) * (lift / 100));
  const vsLaunch = recovered / 1999;

  const applyPreset = (id: PresetId) => {
    const p = PRESETS[id];
    setPreset(id);
    setOrders(p.orders);
    setAov(p.aov);
    setAbandon(p.abandon);
    setLift(p.lift);
  };

  const markCustom = () => {
    if (preset !== 'custom') setPreset('custom');
  };

  return (
    <div className="mkt-roi">
      <div className="mkt-roi__presets" role="group" aria-label="Store size">
        {(Object.keys(PRESETS) as PresetId[]).map((id) => {
          const p = PRESETS[id];
          const active = preset === id;
          return (
            <button
              key={id}
              type="button"
              className={`mkt-roi__preset${active ? ' is-active' : ''}`}
              onClick={() => applyPreset(id)}
              aria-pressed={active}
            >
              <span>{p.label}</span>
              <em>{p.hint}</em>
            </button>
          );
        })}
      </div>

      <div className="mkt-roi__grid">
        <div className="mkt-roi__result">
          <p className="mkt-roi__kicker">Recovered / month</p>
          <p className="mkt-roi__value">{formatInr(recovered)}</p>
          <p className="mkt-roi__week">
            ~{carts.toLocaleString('en-IN')} carts · {formatInr(recovered / 4)} / week
          </p>
          <dl className="mkt-roi__stats">
            <div>
              <dt>Vs Launch (₹1,999)</dt>
              <dd>~{vsLaunch >= 10 ? Math.round(vsLaunch) : vsLaunch.toFixed(1)}×</dd>
            </div>
            <div>
              <dt>How we estimate</dt>
              <dd>Orders × AOV × abandon × lift</dd>
            </div>
          </dl>
          <Link className="mkt-roi__cta" to="/signup">
            Start free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mkt-roi__controls">
          <label className="mkt-roi__field">
            <span>
              Orders / month
              <input
                className="mkt-roi__num"
                type="number"
                min={80}
                max={2000}
                step={20}
                value={orders}
                onChange={(e) => {
                  markCustom();
                  setOrders(clamp(Number(e.target.value) || 80, 80, 2000));
                }}
              />
            </span>
            <input
              type="range"
              min={80}
              max={2000}
              step={20}
              value={orders}
              onChange={(e) => {
                markCustom();
                setOrders(Number(e.target.value));
              }}
              style={fillStyle(orders, 80, 2000)}
            />
          </label>

          <label className="mkt-roi__field">
            <span>
              Average order value
              <input
                className="mkt-roi__num"
                type="number"
                min={500}
                max={8000}
                step={100}
                value={aov}
                onChange={(e) => {
                  markCustom();
                  setAov(clamp(Number(e.target.value) || 500, 500, 8000));
                }}
              />
            </span>
            <input
              type="range"
              min={500}
              max={8000}
              step={100}
              value={aov}
              onChange={(e) => {
                markCustom();
                setAov(Number(e.target.value));
              }}
              style={fillStyle(aov, 500, 8000)}
            />
          </label>

          <label className="mkt-roi__field">
            <span>
              Cart abandon rate
              <span className="mkt-roi__num mkt-roi__num--suffix">
                <input
                  type="number"
                  min={40}
                  max={90}
                  step={1}
                  value={abandon}
                  onChange={(e) => {
                    markCustom();
                    setAbandon(clamp(Number(e.target.value) || 40, 40, 90));
                  }}
                />
                <em>%</em>
              </span>
            </span>
            <input
              type="range"
              min={40}
              max={90}
              step={1}
              value={abandon}
              onChange={(e) => {
                markCustom();
                setAbandon(Number(e.target.value));
              }}
              style={fillStyle(abandon, 40, 90)}
            />
          </label>

          <label className="mkt-roi__field">
            <span>
              Recovery lift
              <span className="mkt-roi__num mkt-roi__num--suffix">
                <input
                  type="number"
                  min={4}
                  max={25}
                  step={1}
                  value={lift}
                  onChange={(e) => {
                    markCustom();
                    setLift(clamp(Number(e.target.value) || 4, 4, 25));
                  }}
                />
                <em>%</em>
              </span>
            </span>
            <input
              type="range"
              min={4}
              max={25}
              step={1}
              value={lift}
              onChange={(e) => {
                markCustom();
                setLift(Number(e.target.value));
              }}
              style={fillStyle(lift, 4, 25)}
            />
          </label>

          <p className="mkt-roi__hint">
            Conservative default is 10% lift. Dashboard shows zeros until Shopify is connected.
          </p>
        </div>
      </div>
    </div>
  );
}
