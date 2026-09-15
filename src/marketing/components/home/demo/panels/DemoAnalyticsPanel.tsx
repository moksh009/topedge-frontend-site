import { useState } from 'react';
import { demoAnalyticsByRange } from '../demoFixtures';

export default function DemoAnalyticsPanel() {
  const [range, setRange] = useState<'7d' | '30d'>('7d');
  const data = demoAnalyticsByRange[range];

  return (
    <div className="demo-page">
      <header className="demo-page__header">
        <div>
          <h2>Analytics</h2>
          <p>Insights hub · attributed revenue</p>
        </div>
        <div className="demo-page__tabs">
          <button type="button" className={range === '7d' ? 'is-on' : undefined} onClick={() => setRange('7d')}>
            7 days
          </button>
          <button type="button" className={range === '30d' ? 'is-on' : undefined} onClick={() => setRange('30d')}>
            30 days
          </button>
        </div>
      </header>

      <div className="demo-kpi-strip demo-kpi-strip--4">
        {data.kpis.map((k) => (
          <div key={k.label} className="demo-kpi">
            <span>{k.label}</span>
            <strong>{k.value}</strong>
          </div>
        ))}
      </div>

      <div className="demo-chart-shell">
        <div className="demo-chart-shell__head">
          <h3>Channel contribution</h3>
        </div>
        <div className="demo-analytics__bars">
          {data.bars.map((b) => (
            <div key={b.label}>
              <span>{b.label}</span>
              <div className="demo-analytics__bar-track">
                <div className="demo-analytics__bar-fill" style={{ width: `${b.pct}%` }} />
              </div>
              <em>{b.pct}%</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
