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

/**
 * orders × AOV × abandon % × recovery lift
 */
export default function RoiCalculator() {
  const [orders, setOrders] = useState(400);
  const [aov, setAov] = useState(2500);
  const [abandon, setAbandon] = useState(70);
  const [lift, setLift] = useState(10);

  const recovered = useMemo(
    () => orders * (abandon / 100) * (lift / 100) * aov,
    [orders, aov, abandon, lift],
  );
  const carts = Math.round(orders * (abandon / 100) * (lift / 100));
  const vsLaunch = recovered / 1999;

  return (
    <div className="mkt-roi">
      <div className="mkt-roi__result">
        <p className="mkt-roi__kicker">Estimated recovered / month</p>
        <p className="mkt-roi__value">{formatInr(recovered)}</p>
        <p className="mkt-roi__week">
          About {carts.toLocaleString('en-IN')} carts won · {formatInr(recovered / 4)} / week
        </p>
        <dl>
          <div>
            <dt>Vs Launch</dt>
            <dd>~{vsLaunch >= 10 ? Math.round(vsLaunch) : vsLaunch.toFixed(1)}×</dd>
          </div>
          <div>
            <dt>Formula</dt>
            <dd>Orders × AOV × abandon × lift</dd>
          </div>
        </dl>
      </div>

      <div className="mkt-roi__controls">
        <label>
          <span>
            Orders / month <strong>{orders}</strong>
          </span>
          <input
            type="range"
            min={80}
            max={2000}
            step={20}
            value={orders}
            onChange={(e) => setOrders(Number(e.target.value))}
            style={{ '--fill': `${((orders - 80) / (2000 - 80)) * 100}%` } as CSSProperties}
          />
        </label>
        <label>
          <span>
            Average order value <strong>{formatInr(aov)}</strong>
          </span>
          <input
            type="range"
            min={500}
            max={8000}
            step={100}
            value={aov}
            onChange={(e) => setAov(Number(e.target.value))}
            style={{ '--fill': `${((aov - 500) / (8000 - 500)) * 100}%` } as CSSProperties}
          />
        </label>
        <label>
          <span>
            Abandon rate <strong>{abandon}%</strong>
          </span>
          <input
            type="range"
            min={40}
            max={90}
            step={1}
            value={abandon}
            onChange={(e) => setAbandon(Number(e.target.value))}
            style={{ '--fill': `${((abandon - 40) / (90 - 40)) * 100}%` } as CSSProperties}
          />
        </label>
        <label>
          <span>
            Recovery lift <strong>{lift}%</strong>
          </span>
          <input
            type="range"
            min={4}
            max={25}
            step={1}
            value={lift}
            onChange={(e) => setLift(Number(e.target.value))}
            style={{ '--fill': `${((lift - 4) / (25 - 4)) * 100}%` } as CSSProperties}
          />
        </label>
        <p className="mkt-roi__hint">
          Conservative default is 10% lift. Dashboard shows zeros until you connect Shopify.
        </p>
        <Link className="mkt-roi__cta" to="/signup">
          Start free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
