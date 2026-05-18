import WhatsAppLogo from '../icons/WhatsAppLogo';
import StepVisualFrame, { StepInnerCard } from './StepVisualFrame';
import {
  ChatBubble,
  FlowNodes,
  LiveBadge,
  MetricCell,
  OrderMini,
  ShopifyMark,
  StatusRow,
  TagChip,
  TimelineRhythm,
} from './stepVisualPrimitives';

const SOLUTIONS: Record<string, { title: string; subtitle: string; body: React.ReactNode }> = {
  'live-chat': {
    title: 'One inbox, full context',
    subtitle: 'Shopify order beside every WhatsApp thread',
    body: (
      <StepInnerCard className="space-y-2">
        <div className="flex items-center gap-2">
          <WhatsAppLogo size={28} />
          <span className="text-[11px] font-bold text-slate-800">Priya Sharma · +91</span>
        </div>
        <ChatBubble side="customer" text="Where is my order?" />
        <OrderMini id="TE-1042" amount="₹1,299" status="COD · Shipped" />
        <span className="inline-flex rounded-full bg-[#faf5ff] px-2 py-0.5 text-[8px] font-bold text-[#7C3AED]">
          92% threads with order context
        </span>
      </StepInnerCard>
    ),
  },
  'ai-brain': {
    title: 'On-policy intelligence',
    subtitle: 'Catalog + PDFs + persona — not generic ChatGPT',
    body: (
      <StepInnerCard>
        <div className="space-y-2">
          <StatusRow label="1,240 SKUs · prices locked" status="ok" />
          <StatusRow label="24 knowledge docs indexed" status="ok" />
          <StatusRow label="0 hallucinated prices this week" status="ok" />
        </div>
        <p className="mt-2 text-[10px] font-bold text-[#7C3AED]">89% on-policy replies</p>
      </StepInnerCard>
    ),
  },
  'flow-builder': {
    title: 'Live in ~10 minutes',
    subtitle: 'AI Form → canvas → publish on WhatsApp',
    body: (
      <StepInnerCard>
        <FlowNodes nodes={['Cart abandoned', 'Wait 15m', 'Recovery template']} active={2} />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <MetricCell label="Recovery" value="32%" />
          <MetricCell label="Sends" value="Meta-safe" />
        </div>
      </StepInnerCard>
    ),
  },
  'meta-manager': {
    title: 'You approve every word',
    subtitle: 'Library → AI copy → Meta → reuse everywhere',
    body: (
      <StepInnerCard className="space-y-2">
        <div className="rounded-xl bg-[#e7f8ef] p-3 text-[11px] text-slate-700">
          Your cart is waiting — tap to checkout on WhatsApp.
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-slate-500">Status</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">Approved</span>
        </div>
      </StepInnerCard>
    ),
  },
  campaigns: {
    title: 'Segments + approved templates',
    subtitle: 'Broadcasts that respect Meta policy',
    body: (
      <StepInnerCard>
        <div className="mb-2 flex flex-wrap gap-1">
          <TagChip label="VIP" active />
          <TagChip label="Cart abandon" active />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <MetricCell label="Sent" value="2.8k" />
          <MetricCell label="Read" value="71%" />
          <MetricCell label="₹" value="42k" />
        </div>
      </StepInnerCard>
    ),
  },
  'audience-crm': {
    title: 'Unified customer graph',
    subtitle: 'Shopify + WhatsApp events → segments',
    body: (
      <StepInnerCard>
        <div className="flex items-center gap-2">
          <ShopifyMark />
          <span className="text-[11px] font-bold">12,400 profiles</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <TagChip label="VIP" active />
          <TagChip label="Repeat" active />
          <TagChip label="At-risk" active />
        </div>
      </StepInnerCard>
    ),
  },
  sequences: {
    title: 'Follow-ups that convert',
    subtitle: 'Post-broadcast chains with reply branches',
    body: (
      <StepInnerCard>
        <TimelineRhythm items={['Offer broadcast', 'Wait 48h nudge', 'Stop on purchase']} />
        <p className="mt-2 text-[10px] font-bold text-emerald-600">+18% vs single blast</p>
      </StepInnerCard>
    ),
  },
  'abandoned-cart': {
    title: 'Recover on WhatsApp',
    subtitle: '15m → 2h → 24h · product + ₹ in every nudge',
    body: (
      <StepInnerCard>
        <TimelineRhythm items={['Product card + ₹1,299', 'COD-aware reminder', 'Final checkout link']} />
        <p className="mt-2 text-[10px] font-bold text-[#7C3AED]">32% recovery rate</p>
      </StepInnerCard>
    ),
  },
  shopify: {
    title: 'Commerce Hub sync',
    subtitle: 'Orders, carts, catalog — one source of truth',
    body: (
      <StepInnerCard className="space-y-2">
        <StatusRow label="mybrand.myshopify.com" status="ok" />
        <StatusRow label="cart · order · customer webhooks" status="ok" />
        <StatusRow label="Powers flows + inbox" status="ok" />
      </StepInnerCard>
    ),
  },
  orders: {
    title: 'Every order, one click to chat',
    subtitle: 'COD/prepaid · line items · real-time sync',
    body: (
      <StepInnerCard className="space-y-2">
        <OrderMini id="TE-1042" amount="₹1,299" status="Shipped" />
        <div className="flex items-center justify-center gap-2 rounded-lg bg-violet-50 py-2 text-[10px] font-bold text-[#7C3AED]">
          <WhatsAppLogo size={18} />
          Open customer thread
        </div>
      </StepInnerCard>
    ),
  },
  'order-automations': {
    title: 'Proactive order updates',
    subtitle: 'Paid → shipped → delivered on WhatsApp',
    body: (
      <StepInnerCard className="space-y-2">
        <StatusRow label="Paid → order confirm" status="ok" />
        <StatusRow label="Shipped → tracking link" status="ok" />
        <StatusRow label="Delivered → review +2 days" status="ok" />
        <p className="text-[10px] text-slate-500">−38% “where is my order?” tickets</p>
      </StepInnerCard>
    ),
  },
  analytics: {
    title: 'Revenue, not vanity metrics',
    subtitle: 'Cart recovery ₹ · campaign ROI · agent performance',
    body: (
      <StepInnerCard>
        <div className="grid grid-cols-3 gap-2">
          <MetricCell label="Recovered" value="₹2.1L" />
          <MetricCell label="Read" value="71%" />
          <MetricCell label="Bot" value="62%" />
        </div>
      </StepInnerCard>
    ),
  },
};

type Props = { slug: string };

export default function FeatureSolutionVisual({ slug }: Props) {
  const s = SOLUTIONS[slug] ?? {
    title: 'Built for Indian D2C',
    subtitle: 'Shopify + Meta WhatsApp in one workspace',
    body: (
      <StepInnerCard>
        <LiveBadge />
      </StepInnerCard>
    ),
  };

  return (
    <StepVisualFrame step={0} title={s.title} subtitle={s.subtitle}>
      {s.body}
    </StepVisualFrame>
  );
}
