import { Link } from 'react-router-dom';

export default function HomeProof() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-20 md:py-28">
      <div className="marketing-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:items-center">
          <div>
            <p className="home-quote-metric">22%</p>
            <p className="mt-2 text-sm font-medium text-neutral-500">cart recovery · D2C apparel</p>
          </div>
          <div>
            <blockquote className="home-quote">
              &ldquo;Cart recovery on COD changed our month. We stopped losing buyers who already had items in
              cart.&rdquo;
            </blockquote>
            <footer className="mt-8">
              <p className="font-medium text-[#0a0a0a]">Rahul K.</p>
              <p className="text-sm text-neutral-500">Growth lead · Shopify brand</p>
            </footer>
            <Link to="/customers" className="mt-6 inline-block text-sm font-medium text-[#0a0a0a] underline-offset-4 hover:underline">
              More customer stories →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
