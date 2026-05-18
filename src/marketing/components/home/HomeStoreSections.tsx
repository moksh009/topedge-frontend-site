import { Link } from 'react-router-dom';
import FeatureMarketingImage from '../FeatureMarketingImage';
import { Section, SectionHeading } from '../ui';
import { Reveal } from '../motion';

const storeBullets = [
  'Real-time orders with COD and prepaid status',
  'Store economics: margins, SKU, RTO',
  'Products, discounts, suppliers, demand signals',
];

export default function HomeStoreSections() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal className="text-center lg:text-left">
          <SectionHeading
            eyebrow="Store Engine"
            title="Shopify data behind every message"
            subtitle="Products, orders, RTO economics, and customers stay in sync — the same truth your automations and inbox use."
            center={false}
            className="!mb-8"
          />
          <ul className="mx-auto max-w-md space-y-0 lg:mx-0">
            {storeBullets.map((b, i) => (
              <li
                key={b}
                className="flex items-start gap-4 border-t border-violet-100/80 py-4 text-[15px] text-slate-600 first:border-t-0 first:pt-0"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] text-[10px] text-white">
                  {i + 1}
                </span>
                {b}
              </li>
            ))}
          </ul>
          <Link
            to="/features/shopify"
            className="mt-8 inline-flex text-sm font-medium text-[#7C3AED] underline-offset-4 hover:underline"
          >
            See Store Engine →
          </Link>
        </Reveal>
        <Reveal delay={0.08}>
          <FeatureMarketingImage imageId="store-engine" />
        </Reveal>
      </div>

      <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal delay={0.08} className="lg:order-2">
          <FeatureMarketingImage imageId="order-automations" />
        </Reveal>
        <Reveal className="text-center lg:order-1 lg:text-left">
          <SectionHeading
            eyebrow="Order automations"
            title="Paid → shipped → delivered, on WhatsApp"
            subtitle="Rule-based order messages run beside Flow Builder — with delays and conditions you define."
            center={false}
            className="!mb-0"
          />
          <Link
            to="/features/order-automations"
            className="mt-6 inline-flex text-sm font-medium text-[#7C3AED] underline-offset-4 hover:underline"
          >
            See order automations →
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
