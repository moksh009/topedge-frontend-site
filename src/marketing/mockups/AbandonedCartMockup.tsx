import { Clock, ShoppingCart, MessageCircle } from 'lucide-react';
import MockupFrame from './shared/MockupFrame';

const messages = [
  { delay: '15 min', text: 'Hi Priya — your blue kurta (M) is waiting. Checkout with COD ₹1,299?' },
  { delay: '2 hours', text: 'Still thinking? Use COMEBACK10 for 10% off — valid today only.' },
  { delay: '24 hours', text: 'Last chance — size M is low stock. Tap to complete your order.' },
];

export default function AbandonedCartMockup() {
  return (
    <MockupFrame>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-500">
            <ShoppingCart className="h-3.5 w-3.5 text-[#7C3AED]" />
            Shopify · Cart abandoned
          </div>
          <div className="mt-4 flex gap-3 rounded-2xl border border-slate-200 bg-white p-3">
            <div className="h-16 w-14 shrink-0 rounded-xl bg-gradient-to-br from-violet-100 to-violet-50" />
            <div>
              <p className="text-sm font-bold text-slate-900">Cotton Kurta — Blue</p>
              <p className="text-xs text-slate-500">Size M · Qty 1</p>
              <p className="mt-1 text-sm font-black text-[#7C3AED]">₹1,299</p>
              <p className="text-[10px] text-amber-600 font-semibold">COD available</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-[10px] font-semibold text-amber-800">
            <Clock className="h-3.5 w-3.5" />
            Trigger → Flow Builder recovery sequence
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-200/60 bg-[#f0fdf4]/50 p-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-emerald-700">
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp · Approved templates
          </div>
          <div className="mt-4 space-y-3">
            {messages.map((m, i) => (
              <div key={m.delay} className="flex gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-[9px] font-bold text-[#7C3AED]">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-[9px] font-bold text-slate-400">{m.delay}</p>
                  <div className="mt-1 rounded-3xl rounded-tl-sm bg-white px-3 py-2 text-[11px] leading-relaxed text-slate-700 shadow-sm ring-1 ring-emerald-100">
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
