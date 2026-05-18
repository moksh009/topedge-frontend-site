import { Brain } from 'lucide-react';
import WhatsAppLogo from '../icons/WhatsAppLogo';
import StepVisualFrame, { StepInnerCard } from './StepVisualFrame';
import {
  StatusRow,
  FileRow,
  ChatBubble,
  PillButton,
  FormField,
  FlowNodes,
  LiveBadge,
  MetricCell,
  TemplateRow,
  ModuleChip,
  TagChip,
  ShopifyMark,
  OrderMini,
  SequenceSteps,
  WebhookRow,
  OrderRow,
  ActionRow,
  MapRow,
  RuleRow,
  TimelineRhythm,
  EventChip,
  ProductCard,
} from './stepVisualPrimitives';

type Props = { slug: string; stepIndex: number; stepTitle: string; stepDesc?: string };

export default function FeatureStepVisual({ slug, stepIndex, stepTitle, stepDesc }: Props) {
  return (
    <StepVisualFrame step={stepIndex + 1} title={stepTitle} subtitle={stepDesc}>
      <StepVisualBody slug={slug} stepIndex={stepIndex} />
    </StepVisualFrame>
  );
}

function StepVisualBody({ slug, stepIndex }: { slug: string; stepIndex: number }) {
  switch (`${slug}-${stepIndex}`) {
    case 'live-chat-0':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-3">
            <WhatsAppLogo size={36} />
            <div>
              <p className="text-[11px] font-bold text-slate-800">WhatsApp Business API</p>
              <p className="text-[10px] text-emerald-600">Connected · sending enabled</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="Meta Business verified" status="ok" />
            <StatusRow label="Phone +91 linked" status="ok" />
            <StatusRow label="Webhook active" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'live-chat-1':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-2">
            <ShopifyMark />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Shopify</p>
              <p className="text-[10px] text-emerald-600">Sync active</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="Order #TE-1042" status="ok" />
            <StatusRow label="LTV ₹4,200" status="ok" />
            <StatusRow label="COD · Mumbai" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'live-chat-2':
      return (
        <StepInnerCard className="space-y-2">
          <ChatBubble side="customer" text="Where is order #TE-1042?" />
          <OrderMini id="TE-1042" amount="₹1,299" status="Shipped" />
          <ChatBubble side="ai" text="Shipped yesterday — tracking shared on WhatsApp." badge="Approved" />
        </StepInnerCard>
      );
    case 'ai-brain-0':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-2">
            <ShopifyMark />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Shopify</p>
              <p className="text-[10px] text-emerald-600">Sync active</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="1,240 SKUs synced" status="ok" />
            <StatusRow label="Policies imported" status="ok" />
            <StatusRow label="Prices locked" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'ai-brain-1':
      return (
        <StepInnerCard>
          <div className="space-y-2">
            <FileRow name="return-policy.pdf" indexed />
            <FileRow name="sizing-chart.pdf" indexed />
            <FileRow name="FAQ page" indexed />
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2">
            <Brain className="h-4 w-4 text-[#7C3AED]" />
            <span className="text-[10px] font-semibold text-[#7C3AED]">Concierge tone · friendly</span>
          </div>
        </StepInnerCard>
      );
    case 'ai-brain-2':
      return (
        <StepInnerCard className="space-y-2">
          <ChatBubble side="customer" text="Is COD available to Pune?" />
          <ChatBubble side="ai" text="Yes — COD to Pune in 3–5 days. Order #TE-1042 is ₹1,299 prepaid option too." badge="AI suggested" />
          <div className="flex gap-2">
            <PillButton label="Approve" primary />
            <PillButton label="Edit" />
          </div>
        </StepInnerCard>
      );
    case 'flow-builder-0':
      return (
        <StepInnerCard className="space-y-2.5">
            <FormField label="Trigger" value="cart abandoned" />
            <FormField label="Tone" value="friendly Hindi" />
            <FormField label="Delay" value="15 min" />
        </StepInnerCard>
      );
    case 'flow-builder-1':
      return (
        <StepInnerCard>
          <FlowNodes nodes={['Trigger', 'Wait 15m', 'Send template']} active={1} />
        </StepInnerCard>
      );
    case 'flow-builder-2':
      return (
        <StepInnerCard>
          <LiveBadge />
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <MetricCell value="Live" label="Status" />
            <MetricCell value="✓" label="32% recovery" />
            <MetricCell value="✓" label="Meta-safe sends" />
          </div>
        </StepInnerCard>
      );
    case 'meta-manager-0':
      return (
        <StepInnerCard className="space-y-2">
            <TemplateRow name="Cart recovery" approved={false} />
            <TemplateRow name="COD confirm" approved={false} />
            <TemplateRow name="Order shipped" approved={false} />
        </StepInnerCard>
      );
    case 'meta-manager-1':
      return (
        <StepInnerCard className="space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Preview</p>
          <div className="rounded-xl bg-[#e7f8ef] p-3 text-[11px] text-slate-700">Hi {'{{name}}'}, your cart is waiting — complete checkout with one tap.</div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500">Status</span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700">Sent to Meta</span>
          </div>
        </StepInnerCard>
      );
    case 'meta-manager-2':
      return (
        <StepInnerCard>
          <div className="flex flex-wrap gap-2">
            <ModuleChip label="Flow Builder" />
            <ModuleChip label="Campaigns" />
            <ModuleChip label="Order rules" />
          </div>
        </StepInnerCard>
      );
    case 'campaigns-0':
      return (
        <StepInnerCard>
          <div className="flex flex-wrap gap-2">
            <TagChip label="VIP buyers" active />
            <TagChip label="Cart abandoners" active />
            <TagChip label="Repeat 3×" active />
          </div>
        </StepInnerCard>
      );
    case 'campaigns-1':
      return (
        <StepInnerCard className="space-y-2">
            <TemplateRow name="Diwali offer" approved={true} />
            <TemplateRow name="Approved ✓" approved={true} />
            <TemplateRow name="Variables mapped" approved={true} />
        </StepInnerCard>
      );
    case 'campaigns-2':
      return (
        <StepInnerCard>
          <div className="grid grid-cols-3 gap-2">
            <MetricCell label="2,840" value="sent" />
            <MetricCell label="71%" value="read" />
            <MetricCell label="₹42k" value="attributed" />
          </div>
        </StepInnerCard>
      );
    case 'audience-crm-0':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-2">
            <ShopifyMark />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Shopify</p>
              <p className="text-[10px] text-emerald-600">Sync active</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="12,400 profiles" status="ok" />
            <StatusRow label="Tags imported" status="ok" />
            <StatusRow label="Carts linked" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'audience-crm-1':
      return (
        <StepInnerCard>
          <div className="flex flex-wrap gap-2">
            <TagChip label="VIP" active />
            <TagChip label="At-risk" active />
            <TagChip label="Repeat buyer" active />
          </div>
        </StepInnerCard>
      );
    case 'audience-crm-2':
      return (
        <StepInnerCard className="space-y-2">
            <StatusRow label="Segment: VIP" status="ok" />
            <StatusRow label="Template ready" status="ok" />
            <StatusRow label="Schedule 6pm" status="ok" />
        </StepInnerCard>
      );
    case 'sequences-0':
      return (
        <StepInnerCard className="space-y-2">
            <StatusRow label="Broadcast sent" status="ok" />
            <StatusRow label="Segment: warm leads" status="ok" />
            <StatusRow label="Step 1 delivered" status="ok" />
        </StepInnerCard>
      );
    case 'sequences-1':
      return (
        <StepInnerCard>
          <SequenceSteps steps={['Wait 48h', 'If no reply → nudge', 'If order → stop']} />
        </StepInnerCard>
      );
    case 'sequences-2':
      return (
        <StepInnerCard>
          <div className="grid grid-cols-3 gap-2">
            <MetricCell label="Step 2" value="58% read" />
            <MetricCell label="Step 3" value="12% reply" />
            <MetricCell label="₹18k" value="recovered" />
          </div>
        </StepInnerCard>
      );
    case 'abandoned-cart-0':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-2">
            <ShopifyMark />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Shopify</p>
              <p className="text-[10px] text-emerald-600">Sync active</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="Checkout events on" status="ok" />
            <StatusRow label="Product + ₹ synced" status="ok" />
            <StatusRow label="COD detected" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'abandoned-cart-1':
      return (
        <StepInnerCard>
          <TimelineRhythm items={['15 min nudge', '2 hr reminder', '24 hr final']} />
        </StepInnerCard>
      );
    case 'abandoned-cart-2':
      return (
        <StepInnerCard className="space-y-3">
          <ProductCard name="Cotton Kurta · Blue · M" price="₹1,299" cod />
          <LiveBadge />
          <div className="grid grid-cols-2 gap-2">
            <MetricCell label="Recovery" value="32%" />
            <MetricCell label="Rhythm" value="3 nudges" />
          </div>
        </StepInnerCard>
      );
    case 'shopify-0':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-2">
            <ShopifyMark />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Shopify</p>
              <p className="text-[10px] text-emerald-600">Sync active</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="mybrand.myshopify.com" status="ok" />
            <StatusRow label="OAuth complete" status="ok" />
            <StatusRow label="Webhooks on" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'shopify-1':
      return (
        <StepInnerCard className="space-y-2">
            <WebhookRow topic="cart/create" />
            <WebhookRow topic="orders/paid" />
            <WebhookRow topic="customers/update" />
        </StepInnerCard>
      );
    case 'shopify-2':
      return (
        <StepInnerCard>
          <div className="space-y-2">
            <StatusRow label="Flows active" status="ok" />
            <StatusRow label="Order messages" status="ok" />
            <StatusRow label="Inbox context" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'orders-0':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-2">
            <ShopifyMark />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Shopify</p>
              <p className="text-[10px] text-emerald-600">Sync active</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="Real-time sync" status="ok" />
            <StatusRow label="COD + prepaid" status="ok" />
            <StatusRow label="Line items" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'orders-1':
      return (
        <StepInnerCard className="space-y-2">
            <OrderRow label="#TE-1042 · ₹1,299" />
            <OrderRow label="#TE-1041 · COD" />
            <OrderRow label="Filter: shipped" />
        </StepInnerCard>
      );
    case 'orders-2':
      return (
        <StepInnerCard className="space-y-2">
            <ActionRow label="Open WhatsApp" />
            <ActionRow label="Send template" />
            <ActionRow label="Mark fulfilled" />
        </StepInnerCard>
      );
    case 'order-automations-0':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-2">
            <ShopifyMark />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Shopify</p>
              <p className="text-[10px] text-emerald-600">Sync active</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="orders/paid" status="ok" />
            <StatusRow label="orders/fulfilled" status="ok" />
            <StatusRow label="Real-time" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'order-automations-1':
      return (
        <StepInnerCard className="space-y-2">
            <MapRow label="Paid → confirm" />
            <MapRow label="Shipped → tracking" />
            <MapRow label="Delivered → review" />
        </StepInnerCard>
      );
    case 'order-automations-2':
      return (
        <StepInnerCard className="space-y-2">
            <RuleRow label="Rule 1: ON" on />
            <RuleRow label="Delay +2 days" on />
            <RuleRow label="COD variant" on />
        </StepInnerCard>
      );
    case 'analytics-0':
      return (
        <StepInnerCard>
          <div className="flex items-center gap-2">
            <ShopifyMark />
            <div>
              <p className="text-[11px] font-bold text-slate-800">Shopify</p>
              <p className="text-[10px] text-emerald-600">Sync active</p>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <StatusRow label="Revenue sync" status="ok" />
            <StatusRow label="Campaign events" status="ok" />
            <StatusRow label="Inbox metrics" status="ok" />
          </div>
        </StepInnerCard>
      );
    case 'analytics-1':
      return (
        <StepInnerCard>
          <div className="flex flex-wrap gap-2">
            <EventChip label="Cart recovery" />
            <EventChip label="Broadcasts" />
            <EventChip label="Bot resolution" />
          </div>
        </StepInnerCard>
      );
    case 'analytics-2':
      return (
        <StepInnerCard>
          <div className="grid grid-cols-3 gap-2">
            <MetricCell label="₹2.1L" value="recovered" />
            <MetricCell label="71%" value="read rate" />
            <MetricCell label="Export PDF" value="✓" />
          </div>
        </StepInnerCard>
      );
    default:
      return (
        <StepInnerCard>
          <p className="text-[11px] text-slate-500">Configure in TopEdge dashboard</p>
        </StepInnerCard>
      );
  }
}
