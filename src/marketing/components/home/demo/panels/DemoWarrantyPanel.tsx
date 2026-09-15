import { useState } from 'react';
import { demoWarranties } from '../demoFixtures';

export default function DemoWarrantyPanel() {
  const [selectedId, setSelectedId] = useState(demoWarranties[0].id);
  const row = demoWarranties.find((w) => w.id === selectedId) ?? demoWarranties[0];

  return (
    <div className="demo-page">
      <header className="demo-page__header">
        <div>
          <h2>Warranty</h2>
          <p>Product terms + WhatsApp claim path</p>
        </div>
        <button type="button" className="demo-btn-primary" disabled>
          Assign product
        </button>
      </header>

      <div className="demo-table-card">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Term</th>
              <th>Claims</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {demoWarranties.map((w) => (
              <tr
                key={w.id}
                className={w.id === selectedId ? 'is-active' : undefined}
                onClick={() => setSelectedId(w.id)}
              >
                <td>{w.product}</td>
                <td>{w.term}</td>
                <td>{w.claims}</td>
                <td>
                  <span className={`demo-pill demo-pill--${w.status === 'Active' ? 'paid' : 'cod'}`}>
                    {w.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="demo-detail-strip">
        <strong>{row.product}</strong>
        <p>
          {row.term} coverage · {row.claims} open claims · reply CLAIM on WhatsApp
        </p>
      </div>
    </div>
  );
}
