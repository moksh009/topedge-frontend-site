import {
  InboxCapPreview,
  AiCapPreview,
  FlowCapPreview,
  MetaCapPreview,
  CampaignCapPreview,
  CrmCapPreview,
  OrdersCapPreview,
  AnalyticsCapPreview,
  StoreCapPreview,
  RoutingCapPreview,
  GenericCapPreview,
} from './capabilityPreviews';

export function CapabilityVisualBody({ slug, variant, title, desc }: {
  slug: string;
  variant: number;
  title: string;
  desc: string;
}) {
  switch (`${slug}-${variant}`) {
    case 'ai-brain-0':
      return (
        <AiCapPreview variant={0} title="Intent Engine" />
      );
    case 'ai-brain-1':
      return (
        <AiCapPreview variant={1} title="Knowledge Base" />
      );
    case 'ai-brain-2':
      return (
        <AiCapPreview variant={2} title="AI Persona" />
      );
    case 'ai-brain-3':
      return (
        <InboxCapPreview variant={3} title="Training Inbox" />
      );
    case 'ai-brain-4':
      return (
        <AiCapPreview variant={4} title="Bot Quality" />
      );
    case 'ai-brain-5':
      return (
        <AnalyticsCapPreview variant={5} title="Export reports" />
      );
    case 'flow-builder-0':
      return (
        <AiCapPreview variant={0} title="AI Form intake" />
      );
    case 'flow-builder-1':
      return (
        <FlowCapPreview variant={1} title="Auto-generated canvas" />
      );
    case 'flow-builder-2':
      return (
        <GenericCapPreview variant={2} title="~10 min to publish" desc="Most Indian D2C brands go live the same day they sign up." />
      );
    case 'flow-builder-3':
      return (
        <FlowCapPreview variant={3} title="Cart & COD flows" />
      );
    case 'flow-builder-4':
      return (
        <GenericCapPreview variant={4} title="Visual fine-tuning" desc="Optional drag-and-drop edits for power users." />
      );
    case 'flow-builder-5':
      return (
        <MetaCapPreview variant={5} title="Meta-safe sends" />
      );
    case 'live-chat-0':
      return (
        <InboxCapPreview variant={0} title="Unified threads" />
      );
    case 'live-chat-1':
      return (
        <InboxCapPreview variant={1} title="Order cards in chat" />
      );
    case 'live-chat-2':
      return (
        <AiCapPreview variant={2} title="AI suggested replies" />
      );
    case 'live-chat-3':
      return (
        <InboxCapPreview variant={3} title="Assign & snooze" />
      );
    case 'live-chat-4':
      return (
        <StoreCapPreview variant={4} title="Real-time sync" />
      );
    case 'live-chat-5':
      return (
        <GenericCapPreview variant={5} title="Indian CX ready" desc="COD, sizing, and delivery questions handled in-thread." />
      );
    case 'meta-manager-0':
      return (
        <MetaCapPreview variant={0} title="Template library" />
      );
    case 'meta-manager-1':
      return (
        <AiCapPreview variant={1} title="AI Studio" />
      );
    case 'meta-manager-2':
      return (
        <MetaCapPreview variant={2} title="One-tap to Meta" />
      );
    case 'meta-manager-3':
      return (
        <GenericCapPreview variant={3} title="Status tracking" desc="See reviewing, approved, or rejected at a glance." />
      );
    case 'meta-manager-4':
      return (
        <FlowCapPreview variant={4} title="Use in flows" />
      );
    case 'meta-manager-5':
      return (
        <MetaCapPreview variant={5} title="WABA connections" />
      );
    case 'campaigns-0':
      return (
        <CampaignCapPreview variant={0} title="Segments" />
      );
    case 'campaigns-1':
      return (
        <MetaCapPreview variant={1} title="Template sends" />
      );
    case 'campaigns-2':
      return (
        <GenericCapPreview variant={2} title="Sequences" desc="Multi-step follow-ups after a broadcast." />
      );
    case 'campaigns-3':
      return (
        <CampaignCapPreview variant={3} title="Schedule" />
      );
    case 'campaigns-4':
      return (
        <AnalyticsCapPreview variant={4} title="Analytics" />
      );
    case 'campaigns-5':
      return (
        <GenericCapPreview variant={5} title="Compliance" desc="Opt-in aware; no sends without approved templates." />
      );
    case 'shopify-0':
      return (
        <OrdersCapPreview variant={0} title="Order sync" />
      );
    case 'shopify-1':
      return (
        <StoreCapPreview variant={1} title="Products & discounts" />
      );
    case 'shopify-2':
      return (
        <FlowCapPreview variant={2} title="Abandoned cart" />
      );
    case 'shopify-3':
      return (
        <AnalyticsCapPreview variant={3} title="COD / RTO insights" />
      );
    case 'shopify-4':
      return (
        <GenericCapPreview variant={4} title="Demand forecast" desc="Plan inventory from conversation trends." />
      );
    case 'shopify-5':
      return (
        <GenericCapPreview variant={5} title="Suppliers" desc="Manage vendor data alongside commerce." />
      );
    case 'audience-crm-0':
      return (
        <CrmCapPreview variant={0} title="All Customers" />
      );
    case 'audience-crm-1':
      return (
        <CrmCapPreview variant={1} title="Loyalty & Rewards" />
      );
    case 'audience-crm-2':
      return (
        <CrmCapPreview variant={2} title="Reviews & Reputation" />
      );
    case 'audience-crm-3':
      return (
        <CampaignCapPreview variant={3} title="Segments" />
      );
    case 'audience-crm-4':
      return (
        <FlowCapPreview variant={4} title="Abandoned Carts" />
      );
    case 'audience-crm-5':
      return (
        <CrmCapPreview variant={5} title="Warranty" />
      );
    case 'order-automations-0':
      return (
        <RoutingCapPreview variant={0} title="Routing Engine" />
      );
    case 'order-automations-1':
      return (
        <GenericCapPreview variant={1} title="Conditions" desc="VIP tag, keyword, or custom fields." />
      );
    case 'order-automations-2':
      return (
        <OrdersCapPreview variant={2} title="Priority order" />
      );
    case 'order-automations-3':
      return (
        <RoutingCapPreview variant={3} title="Smart message rules" />
      );
    case 'order-automations-4':
      return (
        <GenericCapPreview variant={4} title="Fallback" desc="Default team when no rule matches." />
      );
    case 'order-automations-5':
      return (
        <GenericCapPreview variant={5} title="Socket alerts" desc="Agents notified on assignment instantly." />
      );
    case 'abandoned-cart-0':
      return (
        <StoreCapPreview variant={0} title="Shopify trigger" />
      );
    case 'abandoned-cart-1':
      return (
        <MetaCapPreview variant={1} title="3-message rhythm" />
      );
    case 'abandoned-cart-2':
      return (
        <FlowCapPreview variant={2} title="Product cards" />
      );
    case 'abandoned-cart-3':
      return (
        <CampaignCapPreview variant={3} title="COD-aware copy" />
      );
    case 'abandoned-cart-4':
      return (
        <CrmCapPreview variant={4} title="Audience sync" />
      );
    case 'abandoned-cart-5':
      return (
        <MetaCapPreview variant={5} title="Meta-safe only" />
      );

    case 'analytics-0':
      return <AnalyticsCapPreview variant={0} title="Platform Analytics" />;
    case 'analytics-1':
      return <AnalyticsCapPreview variant={1} title="Agent Performance" />;
    case 'analytics-2':
      return <CampaignCapPreview variant={2} title="Campaign ROI" />;
    case 'analytics-3':
      return <AiCapPreview variant={3} title="Bot vs human" />;
    case 'analytics-4':
      return <FlowCapPreview variant={4} title="Cart recovery" />;
    case 'analytics-5':
      return <GenericCapPreview variant={5} title="Export reports" desc="PDF summaries for stakeholders." />;
    case 'sequences-0':
      return <CampaignCapPreview variant={0} title="Post-broadcast steps" />;
    case 'sequences-1':
      return <FlowCapPreview variant={1} title="Reply branches" />;
    case 'sequences-2':
      return <MetaCapPreview variant={2} title="Template-only" />;
    case 'sequences-3':
      return <CrmCapPreview variant={3} title="Segment aware" />;
    case 'sequences-4':
      return <OrdersCapPreview variant={4} title="Pause on purchase" />;
    case 'sequences-5':
      return <AnalyticsCapPreview variant={5} title="Analytics" />;
    case 'orders-0':
      return <OrdersCapPreview variant={0} title="Live order sync" />;
    case 'orders-1':
      return <OrdersCapPreview variant={1} title="COD & prepaid" />;
    case 'orders-2':
      return <InboxCapPreview variant={2} title="Order → chat" />;
    case 'orders-3':
      return <GenericCapPreview variant={3} title="Line items & totals" desc="SKU, qty, discounts, and ₹ totals in one view." />;
    case 'orders-4':
      return <GenericCapPreview variant={4} title="RTO signals" desc="Economics fields for Indian delivery reality." />;
    case 'orders-5':
      return <GenericCapPreview variant={5} title="Automation source" desc="Powers order messages and Flow Builder triggers." />;

    default:
      return <GenericCapPreview variant={variant} title={title} desc={desc} />;
  }
}
