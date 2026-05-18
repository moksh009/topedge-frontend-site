import ShopifyLogo from '../icons/ShopifyLogo';
import WhatsAppLogo from '../icons/WhatsAppLogo';
import { logoBrands } from '../../data/home';

/** Static trust row — no marquee (reduces jank) */
export default function HomeTrustBar() {
  return (
    <section className="border-b border-violet-100/60 bg-[#fafafa] py-8">
      <div className="marketing-container">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <ShopifyLogo size={36} />
            <span className="text-slate-300">+</span>
            <WhatsAppLogo size={36} />
            <span className="text-sm text-slate-500">Official integrations</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {logoBrands.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
