import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { whyTopEdge } from '../../data/home';

export default function HomeCompare() {
  return (
    <section className="marketing-section-subtle py-20 md:py-28">
      <div className="marketing-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="home-eyebrow">Why TopEdge</p>
          <h2 className="home-section-title mt-3">Built for Indian D2C — not a generic inbox bolt-on</h2>
          <p className="home-section-lead">
            What changes when Shopify, Meta, and your team share one system instead of three tools.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {whyTopEdge.map((row) => (
            <div key={row.before} className="home-compare-card">
              <p className="home-compare-before text-sm">{row.before}</p>
              <p className="home-compare-after">{row.after}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            to="/customers"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:underline"
          >
            See how teams use TopEdge
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
