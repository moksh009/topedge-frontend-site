import { useState } from 'react';
import { demoAbandonedCarts, demoCartMetrics } from '../demoFixtures';

export default function DemoAbandonedCartsPanel() {
  const [selectedId, setSelectedId] = useState(demoAbandonedCarts[0].id);
  const cart =
    demoAbandonedCarts.find((c) => c.id === selectedId) ?? demoAbandonedCarts[0];

  return (
    <div className="demo-page">
      <header className="demo-page__header">
        <div>
          <h2>Abandoned carts</h2>
          <p>Store growth · WhatsApp recovery</p>
        </div>
      </header>

      <div className="demo-kpi-strip demo-kpi-strip--4">
        {demoCartMetrics.map((k) => (
          <div key={k.label} className="demo-kpi">
            <span>{k.label}</span>
            <strong>{k.value}</strong>
          </div>
        ))}
      </div>

      <div className="demo-table-card">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Value</th>
              <th>Age</th>
              <th>Channel</th>
            </tr>
          </thead>
          <tbody>
            {demoAbandonedCarts.map((c) => (
              <tr
                key={c.id}
                className={c.id === selectedId ? 'is-active' : undefined}
                onClick={() => setSelectedId(c.id)}
              >
                <td>{c.customer}</td>
                <td>{c.product}</td>
                <td>₹{c.valueInr.toLocaleString('en-IN')}</td>
                <td>{c.age}</td>
                <td>{c.channel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="demo-detail-strip demo-detail-strip--row">
        <div>
          <strong>{cart.customer}</strong>
          <p>
            {cart.product} · ₹{cart.valueInr.toLocaleString('en-IN')} · {cart.age} ago
          </p>
        </div>
        <button type="button" className="demo-btn-primary" disabled aria-disabled="true">
          Send recovery
        </button>
      </div>
    </div>
  );
}
