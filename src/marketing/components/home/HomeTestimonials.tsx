import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PremiumTestimonialCard from '../PremiumTestimonialCard';
import { testimonials } from '../../data/home';

export default function HomeTestimonials() {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section className="border-t border-violet-100/80 bg-gradient-to-b from-violet-50/40 to-white py-20 md:py-28">
      <div className="marketing-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="home-eyebrow">Customers</p>
          <h2 className="home-section-title mt-3">Teams on Shopify India trust TopEdge</h2>
          <p className="home-section-lead">
            Recovery, speed, and control — from D2C brands running WhatsApp on live store data.
          </p>
        </div>

        <div className="home-testimonial-featured mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="home-testimonial-metric text-4xl md:text-5xl">{featured.metric}</p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {featured.category} · {featured.role}
            </p>
          </div>
          <div>
            <blockquote className="text-xl font-medium leading-snug tracking-tight text-[#0c1222] md:text-2xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <footer className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] text-xs font-bold text-white">
                {featured.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </span>
              <div>
                <p className="font-medium text-[#0c1222]">{featured.name}</p>
                <p className="text-sm text-slate-500">{featured.role}</p>
              </div>
            </footer>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {rest.map((t) => (
            <PremiumTestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            to="/customers"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:underline"
          >
            Read customer stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
