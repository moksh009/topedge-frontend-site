import { useState } from 'react';
import { demoOrders } from '../demoFixtures';

export default function DemoOrdersPanel() {
  const [selectedId, setSelectedId] = useState(demoOrders[0].id);
  const order = demoOrders.find((o) => o.id === selectedId) ?? demoOrders[0];

  return (
    <div className="demo-page">
      <header className="demo-page__header">
        <div>
          <h2>Orders</h2>
          <p>Shopify orders with WhatsApp context</p>
        </div>
      </header>

      <div className="demo-table-card">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Channel</th>
            </tr>
          </thead>
          <tbody>
            {demoOrders.map((o) => (
              <tr
                key={o.id}
                className={o.id === selectedId ? 'is-active' : undefined}
                onClick={() => setSelectedId(o.id)}
              >
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.items}</td>
                <td>{o.total}</td>
                <td>
                  <span className={`demo-pill demo-pill--${o.status.toLowerCase()}`}>{o.status}</span>
                </td>
                <td>{o.channel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="demo-detail-strip">
        <strong>
          {order.id} · {order.customer}
        </strong>
        <p>
          {order.total} · {order.status} · via {order.channel}
        </p>
      </div>
    </div>
  );
}
