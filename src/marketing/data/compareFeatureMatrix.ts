/**
 * Shared capability matrix for pairwise compare pages.
 * WATI / AiSensy / Interakt / Bitespeed all read from this source.
 */

export type MatrixCompetitor = 'wati' | 'aisensy' | 'interakt' | 'bitespeed';

export type CompareFeatureRow = {
  id: string;
  name: string;
  description?: string;
  topedge: string;
  wati: string;
  aisensy: string;
  interakt: string;
  bitespeed: string;
};

export const COMPARE_FEATURE_MATRIX: CompareFeatureRow[] = [
  {
    id: 'template-markup',
    name: 'WhatsApp Template Message Markup %',
    description: 'What you pay above Meta’s base WhatsApp conversation rates.',
    topedge: '0% markup — billing direct on Meta',
    wati: 'Platform usage charges applied above Meta base rates',
    aisensy: 'Platform usage charges applied above Meta base rates',
    interakt: 'Shopify App sub + Meta conversation charges (FB actuals)',
    bitespeed: 'Meta conversation fees on top of USD plan — verify live',
  },
  {
    id: 'ai-llm',
    name: 'AI LLM Integration / AI Messages',
    description: 'How AI replies are powered and what they cost per conversation.',
    topedge: 'BYOK & built-in RAG pipeline — optimised token usage est. ₹0.2–₹0.3 / message',
    wati: 'Requires Astra / higher-tier plan',
    aisensy: 'Per-message AI add-on fee structure',
    interakt: 'AI Agents on Enterprise App (~$99) or ~$74.99 add-on on Growth/Advanced',
    bitespeed: 'AI chatbot & AI marketing agent ~$100/mo add-ons each (1k then ~$0.05)',
  },
  {
    id: 'intent-routing',
    name: 'Intent Routing Engine',
    description:
      'Algorithm detects chat message intent and routes chatbot flow accordingly (no AI used) for better chat support.',
    topedge: 'Native algorithmic intent detection & routing',
    wati: 'Rule / keyword-based triggers',
    aisensy: 'Rule / keyword-based triggers',
    interakt: 'Chatbot / rule-based automation + AI agents on higher tiers',
    bitespeed: 'AI agents / chatbot flows (often add-on)',
  },
  {
    id: 'unified-identity',
    name: 'Unified Customer Identity',
    description:
      'Auto-merges multiple orders, contact numbers, and emails for a single customer into one unified profile.',
    topedge: 'Native built-in',
    wati: 'Single-number contact record',
    aisensy: 'Single-number contact record',
    interakt: 'Standard Shopify + WhatsApp contact records',
    bitespeed: 'Omnichannel profiles — verify merge depth live',
  },
  {
    id: 'lead-dedupe',
    name: 'Duplicate Lead Prevention / Lead Deduplication',
    description: 'Stop the same shopper from flooding CRM as multiple leads.',
    topedge: 'Native, auto-deduplication',
    wati: 'Manual contact management',
    aisensy: 'Manual contact management',
    interakt: 'Standard contact / CRM handling',
    bitespeed: 'Segmentation & CRM — verify auto-dedupe live',
  },
  {
    id: 'store-pixel',
    name: 'Store Tracking Pixel',
    description:
      'Pixel captures visitor identity (contact no., email) plus products viewed, product visitors, and abandoned checkout sessions.',
    topedge: '1-click install pixel',
    wati: 'Standard webhook integration',
    aisensy: 'Standard webhook integration',
    interakt: 'WhatsApp number popup / widget capture',
    bitespeed: 'Popups & spin-the-wheel widgets — full pixel depth not verified',
  },
  {
    id: 'cod-prepaid',
    name: 'Cash On Delivery → Prepaid Funnel Builder',
    description: 'Convert COD risk into prepaid checkouts from WhatsApp.',
    topedge: 'Shopify-native checkout (GoKwik & other checkout partners compatible)',
    wati: 'Requires manual developer API setup',
    aisensy: 'Requires API setup to map payment links to WhatsApp templates',
    interakt: 'WhatsApp Pay COD → prepaid (Razorpay / PayU) — documented',
    bitespeed: 'COD confirmation / COD → prepaid supported',
  },
  {
    id: 'ecommerce-analytics',
    name: 'E-commerce Analytics',
    description:
      'Accurate metrics: AOV, LTV, campaign revenue, most-sold products by city, upcoming months revenue projection, and other scale metrics brands need.',
    topedge: 'Native built-in',
    wati: 'Standard analytics',
    aisensy: 'Standard analytics',
    interakt: 'Analytics & reports on Growth+ App tiers',
    bitespeed: 'Campaign & recovery analytics (omnichannel)',
  },
  {
    id: 'warranty',
    name: 'Order Warranty Management',
    description:
      'Automated warranty assignment and warranty batches per product; each unified profile stores warranty duration for every past order.',
    topedge: 'Built-in automated warranty batches tied to unified customer profile',
    wati: 'Requires external CRM / custom setup',
    aisensy: 'Requires external CRM / custom setup',
    interakt: 'Not found in public feature set — external CRM',
    bitespeed: 'Not found in public feature set',
  },
  {
    id: 'order-mod',
    name: 'Order Modification via WhatsApp',
    description:
      'Customers can cancel orders or change shipping address with time-based and fulfillment-status locks.',
    topedge: 'Yes — with security layer',
    wati: 'Standard trigger-based order updates',
    aisensy: 'Standard trigger-based order updates',
    interakt: 'Order updates / Order Management AI on higher tiers',
    bitespeed: 'Order updates & support automation',
  },
  {
    id: 'journey-builder',
    name: 'Customer Marketing Journey Builder',
    description:
      'Turn one-time buyers into loyal repeat customers with a high-converting post-purchase messaging framework in the journey builder.',
    topedge: 'Journey builder with deduplication enrollment',
    wati: 'Standard sequential automation',
    aisensy: 'Standard sequential automation',
    interakt: 'Automated notifications, winbacks & workflow builder',
    bitespeed: 'Automation flows + AI marketing agents (add-on)',
  },
  {
    id: 'flow-builder',
    name: 'Linear Chatbot Flow Builder',
    description: 'Design chatbot flows node-to-node with a visual builder.',
    topedge: 'Advanced drag-and-drop node builder unlocked on all plans',
    wati: 'Standard visual drag-and-drop flow builder',
    aisensy: 'Chatbot flow builder requires higher plan tier / paid add-on',
    interakt: 'Basic linear on Growth · Advanced branching / API on Advanced+',
    bitespeed: 'Chatbots included; AI chatbot depth often add-on',
  },
  {
    id: 'flow-cap',
    name: 'Chatflow Execution Cap',
    description: 'How many chatbot / flow runs you get before hitting plan limits.',
    topedge: 'Unlimited flow execution on all plans',
    wati: 'Capped by monthly plan trigger limits',
    aisensy: 'Capped by purchased credit / subscription tiers',
    interakt: 'Plan / API rate limits (e.g. ~600 msg/min on Advanced App)',
    bitespeed: 'Conversation & AI conversation meters on plans / add-ons',
  },
];

export function pairwiseMatrix(
  competitor: MatrixCompetitor,
): { label: string; description?: string; topedge: string; competitor: string }[] {
  return COMPARE_FEATURE_MATRIX.map((row) => ({
    label: row.name,
    description: row.description,
    topedge: row.topedge,
    competitor: row[competitor],
  }));
}

/** Standout rows for best-plan duel — where TopEdge usually wins, plus fair “they can too”. */
const PLAN_DUEL_IDS = [
  'template-markup',
  'ai-llm',
  'intent-routing',
  'unified-identity',
  'cod-prepaid',
  'warranty',
  'ecommerce-analytics',
  'flow-builder',
  'flow-cap',
] as const;

const PLAN_DUEL_SHORT: Record<(typeof PLAN_DUEL_IDS)[number], string> = {
  'template-markup': 'Template markup',
  'ai-llm': 'AI messages',
  'intent-routing': 'Intent routing',
  'unified-identity': 'Unified identity',
  'cod-prepaid': 'COD → prepaid',
  warranty: 'Warranty hub',
  'ecommerce-analytics': 'Ecommerce analytics',
  'flow-builder': 'Flow builder',
  'flow-cap': 'Flow execution',
};

export function planDuelFeatures(competitor: MatrixCompetitor): {
  label: string;
  topedge: string;
  competitor: string;
}[] {
  return PLAN_DUEL_IDS.map((id) => {
    const row = COMPARE_FEATURE_MATRIX.find((r) => r.id === id)!;
    return {
      label: PLAN_DUEL_SHORT[id],
      topedge: row.topedge,
      competitor: row[competitor],
    };
  });
}
