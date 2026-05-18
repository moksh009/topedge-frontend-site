/** Per-module marketing page enrichments — visuals, metrics, UI accents */
export type FeaturePageMeta = {
  imageId: string;
  /** Hero stat chips */
  highlights: { value: string; label: string }[];
  /** Outcome strip below showcase */
  outcomes: { value: string; label: string }[];
  /** Accent for capability mini-UI */
  visualTheme: 'inbox' | 'ai' | 'flow' | 'meta' | 'campaign' | 'crm' | 'store' | 'orders';
};

export const featurePageMeta: Record<string, FeaturePageMeta> = {
  'live-chat': {
    imageId: 'live-chat',
    highlights: [
      { value: '4×', label: 'faster replies' },
      { value: '1', label: 'unified inbox' },
      { value: '₹', label: 'order in thread' },
    ],
    outcomes: [
      { value: '92%', label: 'threads with order context' },
      { value: '<2m', label: 'avg. first response' },
      { value: '24/7', label: 'AI + human' },
    ],
    visualTheme: 'inbox',
  },
  'ai-brain': {
    imageId: 'ai-brain',
    highlights: [
      { value: '0', label: 'hallucinated prices' },
      { value: 'PDF', label: '+ catalog sync' },
      { value: '3', label: 'persona modes' },
    ],
    outcomes: [
      { value: '89%', label: 'on-policy replies' },
      { value: '12k', label: 'intents trained' },
      { value: 'BYOK', label: 'Gemini / OpenAI' },
    ],
    visualTheme: 'ai',
  },
  'flow-builder': {
    imageId: 'flow-builder',
    highlights: [
      { value: '~10m', label: 'to publish' },
      { value: '0', label: 'code required' },
      { value: 'COD', label: 'flows built-in' },
    ],
    outcomes: [
      { value: '32%', label: 'avg. cart recovery' },
      { value: '3', label: 'default nudges' },
      { value: '100%', label: 'Meta-safe sends' },
    ],
    visualTheme: 'flow',
  },
  'meta-manager': {
    imageId: 'meta-manager-library',
    highlights: [
      { value: '10+', label: 'starter templates' },
      { value: '1-tap', label: 'send to Meta' },
      { value: 'You', label: 'approve all copy' },
    ],
    outcomes: [
      { value: '24–48h', label: 'typical approval' },
      { value: '0', label: 'auto-submits' },
      { value: '∞', label: 'reuse in flows' },
    ],
    visualTheme: 'meta',
  },
  campaigns: {
    imageId: 'campaigns-broadcast',
    highlights: [
      { value: 'Segments', label: 'from Shopify' },
      { value: 'Meta', label: 'templates only' },
      { value: 'Schedule', label: 'or send now' },
    ],
    outcomes: [
      { value: '71%', label: 'avg. read rate' },
      { value: '₹', label: 'revenue attributed' },
      { value: '0', label: 'policy violations' },
    ],
    visualTheme: 'campaign',
  },
  'audience-crm': {
    imageId: 'audience-crm',
    highlights: [
      { value: 'LTV', label: 'scoring' },
      { value: '1-click', label: 'segments' },
      { value: 'Loyalty', label: 'on WhatsApp' },
    ],
    outcomes: [
      { value: '100%', label: 'Shopify customers' },
      { value: 'VIP', label: 'auto-tags' },
      { value: 'Reviews', label: 'routed smart' },
    ],
    visualTheme: 'crm',
  },
  sequences: {
    imageId: 'campaigns-broadcast',
    highlights: [
      { value: 'Multi', label: 'step chains' },
      { value: 'Reply', label: 'branches' },
      { value: 'Stop', label: 'on purchase' },
    ],
    outcomes: [
      { value: '+18%', label: 'vs single blast' },
      { value: '3–5', label: 'steps typical' },
      { value: 'Meta', label: 'approved each step' },
    ],
    visualTheme: 'campaign',
  },
  'abandoned-cart': {
    imageId: 'abandoned-cart',
    highlights: [
      { value: '3', label: 'nudge rhythm' },
      { value: '15m', label: 'first send' },
      { value: 'COD', label: 'aware copy' },
    ],
    outcomes: [
      { value: '32%', label: 'recovery rate' },
      { value: '₹1,299', label: 'in every nudge' },
      { value: 'Shopify', label: 'real-time trigger' },
    ],
    visualTheme: 'flow',
  },
  shopify: {
    imageId: 'store-engine',
    highlights: [
      { value: '2 min', label: 'OAuth connect' },
      { value: 'Live', label: 'webhooks' },
      { value: '1', label: 'source of truth' },
    ],
    outcomes: [
      { value: 'Orders', label: 'products · carts' },
      { value: 'COD', label: 'RTO insights' },
      { value: 'Flows', label: 'powered by sync' },
    ],
    visualTheme: 'store',
  },
  orders: {
    imageId: 'store-engine',
    highlights: [
      { value: 'Live', label: 'Shopify sync' },
      { value: 'COD', label: 'vs prepaid' },
      { value: '1-click', label: '→ WhatsApp' },
    ],
    outcomes: [
      { value: 'Real-time', label: 'status updates' },
      { value: 'SKU', label: 'line items' },
      { value: 'Hub', label: 'Commerce view' },
    ],
    visualTheme: 'orders',
  },
  'order-automations': {
    imageId: 'order-automations',
    highlights: [
      { value: 'Paid', label: 'shipped · delivered' },
      { value: 'Delay', label: 'rules' },
      { value: 'Meta', label: 'templates' },
    ],
    outcomes: [
      { value: '-38%', label: 'WISMO tickets' },
      { value: 'Auto', label: 'proactive updates' },
      { value: 'COD', label: 'different copy' },
    ],
    visualTheme: 'orders',
  },
  analytics: {
    imageId: 'analytics',
    highlights: [
      { value: '₹', label: 'revenue KPIs' },
      { value: 'Bot', label: 'vs human' },
      { value: 'Export', label: 'PDF reports' },
    ],
    outcomes: [
      { value: 'Cart', label: 'recovery ₹' },
      { value: 'Campaign', label: 'ROI' },
      { value: 'Agent', label: 'performance' },
    ],
    visualTheme: 'store',
  },
};

export function getFeaturePageMeta(slug: string): FeaturePageMeta {
  return (
    featurePageMeta[slug] ?? {
      imageId: 'hero-dashboard',
      highlights: [
        { value: '15m', label: 'setup' },
        { value: '12', label: 'modules' },
        { value: '₹', label: 'India-first' },
      ],
      outcomes: [
        { value: 'Shopify', label: 'connected' },
        { value: 'Meta', label: 'approved' },
        { value: 'Live', label: 'on WhatsApp' },
      ],
      visualTheme: 'store',
    }
  );
}
