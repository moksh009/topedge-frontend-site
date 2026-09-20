/**
 * Compare capability matrices.
 * WATI / AiSensy / Bitespeed / Interakt / 3-way each have independent boards.
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

export type ThreeWayFeatureRow = {
  id: string;
  name: string;
  description?: string;
  topedge: string;
  wati: string;
  aisensy: string;
};

export type PairwiseFeatureRow = {
  id: string;
  label: string;
  description?: string;
  topedge: string;
  competitor: string;
};

/** Frozen legacy matrix for Interakt / Bitespeed only. */
export const LEGACY_COMPARE_FEATURE_MATRIX: CompareFeatureRow[] = [
  {
    id: 'template-markup',
    name: 'WhatsApp Template Message Markup %',
    description: 'What you pay above Meta’s base WhatsApp conversation rates.',
    topedge: '0% markup, billing direct on Meta',
    wati: 'Platform usage charges applied above Meta base rates',
    aisensy: 'Platform usage charges applied above Meta base rates',
    interakt: 'Shopify App sub + Meta conversation charges (FB actuals)',
    bitespeed: 'Meta conversation fees on top of USD plan, verify live',
  },
  {
    id: 'ai-llm',
    name: 'AI LLM Integration / AI Messages',
    description: 'How AI replies are powered and what they cost per conversation.',
    topedge: 'BYOK & built-in RAG pipeline, optimised token usage est. ₹0.2-₹0.3 / message',
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
    bitespeed: 'Omnichannel profiles, verify merge depth live',
  },
  {
    id: 'lead-dedupe',
    name: 'Duplicate Lead Prevention / Lead Deduplication',
    description: 'Stop the same shopper from flooding CRM as multiple leads.',
    topedge: 'Native, auto-deduplication',
    wati: 'Manual contact management',
    aisensy: 'Manual contact management',
    interakt: 'Standard contact / CRM handling',
    bitespeed: 'Segmentation & CRM, verify auto-dedupe live',
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
    bitespeed: 'Popups & spin-the-wheel widgets, full pixel depth not verified',
  },
  {
    id: 'cod-prepaid',
    name: 'Cash On Delivery → Prepaid Funnel Builder',
    description: 'Convert COD risk into prepaid checkouts from WhatsApp.',
    topedge: 'Shopify-native checkout (GoKwik & other checkout partners compatible)',
    wati: 'Requires manual developer API setup',
    aisensy: 'Requires API setup to map payment links to WhatsApp templates',
    interakt: 'WhatsApp Pay COD → prepaid (Razorpay / PayU), documented',
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
    interakt: 'Not found in public feature set, external CRM',
    bitespeed: 'Not found in public feature set',
  },
  {
    id: 'order-mod',
    name: 'Order Modification via WhatsApp',
    description:
      'Customers can cancel orders or change shipping address with time-based and fulfillment-status locks.',
    topedge: 'Yes, with security layer',
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

/** @deprecated Alias for legacy consumers; prefer LEGACY_COMPARE_FEATURE_MATRIX. */
export const COMPARE_FEATURE_MATRIX = LEGACY_COMPARE_FEATURE_MATRIX;

/** TopEdge Ai vs WATI vs AiSensy — verbatim board. */
export const THREE_WAY_FEATURE_MATRIX: ThreeWayFeatureRow[] = [
  {
    id: 'template-markup',
    name: 'WhatsApp API Template Message Markup %',
    topedge: '0% WhatsApp markup (Direct Meta API Billing)',
    wati: 'Platform usage charges applied above Meta base rates',
    aisensy: 'Platform usage charges applied above Meta base rates',
  },
  {
    id: 'ai-llm',
    name: 'Generative AI Chat messages',
    topedge:
      'Bring Your Own Key (BYOK) & Built-in RAG Pipeline (Optimized token usage est. ₹0.1-₹0.3 per AI response, depends on selected AI Model)',
    wati: 'Requires Astra / Higher Tier Plan for AI capabilities',
    aisensy: 'Per-message AI add-on fee structure',
  },
  {
    id: 'store-pixel',
    name: 'E-commerce Store Tracking Pixel',
    description:
      '1-click Install pixel that captures identity (Contact No., Email) and tracks viewed products & abandoned cart sessions without store account sign-in.',
    topedge: '1-click Install Pixel',
    wati: 'Standard webhook integration',
    aisensy: 'Standard webhook integration',
  },
  {
    id: 'intent-routing',
    name: 'Automated Intent Routing Engine',
    description:
      'Algorithm that detects user chat intent and routes to the correct automation workflow (No AI required) for seamless customer support.',
    topedge: 'Native algorithmic intent detection & routing',
    wati: 'Rule/keyword-based triggers',
    aisensy: 'Rule/keyword-based triggers',
  },
  {
    id: 'unified-identity',
    name: 'Unified Customer Identity (Identity Resolution CRM)',
    description:
      'Auto-merges multiple Orders, Contact numbers, and Emails of a single customer into one Unified Master CRM profile.',
    topedge: 'Native Built-in Identity Resolution',
    wati: 'Single-number contact record',
    aisensy: 'Single-number contact record',
  },
  {
    id: 'lead-dedupe',
    name: 'Duplicate Lead Prevention (CRM Deduplication)',
    description:
      'Automated CRM cleaning mechanism that prevents duplicate broadcast delivery and eliminates redundant messaging costs.',
    topedge: 'Native cross-channel auto-deduplication system',
    wati: 'Manual contact management',
    aisensy: 'Manual contact management',
  },
  {
    id: 'cod-prepaid',
    name: 'COD to Prepaid Conversion Funnel',
    topedge:
      'Shopify-native checkout integration (Compatible with 3rd-party checkouts like GoKwik)',
    wati: 'Requires manual developer APIs setup',
    aisensy: 'Requires API setup to map payment links to WhatsApp templates.',
  },
  {
    id: 'ecommerce-analytics',
    name: 'E-commerce Analytics',
    description:
      'Accurate metrics e.g., Average Order Value (AOV), Customer Lifetime Value (LTV), Campaign Revenue tracking, Geographical sales analytics, Returning customer analysis and revenue projections.',
    topedge: 'Native Built-in E-commerce Dashboard.',
    wati: 'Standard Analytics',
    aisensy: 'Standard Analytics',
  },
  {
    id: 'warranty',
    name: 'Order Warranty Management Automation',
    description:
      'Automated warranty assignment, create a warranty batch for products, each unified customer profile have warranty duration with information for their all individual past orders',
    topedge: 'Built-in automated warranty batch creation tied to unified customer profile',
    wati: 'Requires external CRM / custom setup',
    aisensy: 'Requires external CRM / custom setup',
  },
  {
    id: 'order-mod',
    name: 'In-Chat Order Modification (Self-Service Automation)',
    description:
      'Allow the customer to cancel order or change the shipping address with Time-based & Fulfillment status based Locks.',
    topedge: 'Yes, with native fulfillment security-layer',
    wati: 'Standard trigger-based',
    aisensy: 'Standard trigger-based',
  },
  {
    id: 'journey-builder',
    name: 'Customer Marketing Journey Builder',
    description:
      'Turn one-time buyers into loyal repeat customers by designing an optimized, high-converting post-purchase automation framework in the journey builder.',
    topedge: 'Advanced journey builder with deduplication filters.',
    wati: 'Standard sequential automation',
    aisensy: 'Standard sequential automation',
  },
  {
    id: 'flow-builder',
    name: 'No-Code Chatbot Flow Builder',
    description: 'Design chatbot flow node-to-node.',
    topedge: 'Advanced drag-and-drop node builder unlocked on all plans',
    wati: 'Standard visual drag-and-drop flow builder',
    aisensy: 'Chatbot Flow Builder requires higher plan tier / paid add-on',
  },
  {
    id: 'flow-cap',
    name: 'Chatbot Session / Flow Execution Cap',
    topedge: 'Unlimited flow execution on all plans',
    wati: 'Capped by monthly plan trigger limits',
    aisensy: 'Capped by purchased credit / subscription tiers',
  },
];

/** TopEdge Ai vs WATI — verbatim board. */
export const WATI_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'template-markup',
    label: 'WhatsApp API Template Message Markup %',
    topedge: '0% WhatsApp API markup (Direct Meta API Billing on your own Meta Business Account)',
    competitor: 'Platform usage charges applied above Meta base rates',
  },
  {
    id: 'ai-llm',
    label: 'AI messages cost',
    topedge:
      'Bring Your Own Key (BYOK) with native RAG pipeline (Lower token cost est.~₹0.10-₹0.30 per AI message, depends on AI model)',
    competitor: 'Requires Astra / Higher Tier Plan for AI capabilities',
  },
  {
    id: 'store-pixel',
    label: 'Pre-Checkout Store Tracking Pixel',
    description:
      'Captures visitor contact info, viewed products, and cart sessions before account creation or checkout completion.',
    topedge: '1-Click Install Visitor Identity Pixel',
    competitor: 'Standard post-checkout webhook notifications only',
  },
  {
    id: 'intent-routing',
    label: 'Algorithmic Intent Router',
    description:
      'Contextual routing algorithm that detects buyer intent and directs chats to workflows without burning AI credits.',
    topedge: 'Native chat intent detection & flow routing',
    competitor: 'Standard keyword triggers and rule-based flow execution',
  },
  {
    id: 'unified-identity',
    label: 'Unified Customer Identity',
    description:
      'Merges multiple e-commerce orders, alternate phone numbers, and email addresses of same buyer into a single master buyer profile.',
    topedge: 'Built-in, Unified Customer Identity',
    competitor: 'Single-number contact architecture (1 phone number = 1 profile)',
  },
  {
    id: 'lead-dedupe',
    label: 'Duplicate Lead Prevention (CRM Deduplication)',
    description:
      'Automated CRM cleaning mechanism that prevents duplicate broadcast delivery and eliminates redundant messaging costs.',
    topedge: 'Native, auto-deduplication system',
    competitor: 'Manual contact management',
  },
  {
    id: 'cod-prepaid',
    label: 'Automated COD-to-Prepaid Funnel',
    topedge: 'Shopify-native checkout compatibility (Supports GoKwik & other checkouts)',
    competitor: 'Requires custom developer API setup and webhook mapping',
  },
  {
    id: 'ecommerce-analytics',
    label: 'E-commerce Analytics',
    description:
      'Accurate metrics e.g., Average Order Value (AOV), Customer Lifetime Value (LTV), Campaign Revenue tracking, Geographical sales analytics, Returning customer analysis and revenue projections.',
    topedge: 'Native E-commerce Intelligence Dashboard',
    competitor: 'Standard Analytics',
  },
  {
    id: 'warranty',
    label: 'Automated Order Warranty Assignment',
    description:
      'Assigns automated product warranty coverage to unified customer profiles across all historical orders.',
    topedge: 'Built-in automated warranty batch creation',
    competitor: 'Requires custom 3rd-party CRM integration',
  },
  {
    id: 'order-mod',
    label: 'Order Modification in Chat',
    description:
      'Allows buyers to cancel order or modify shipping addresses with fulfillment-status security locks.',
    topedge: 'Native, with time & fulfillment status locks',
    competitor: 'Standard trigger-based.',
  },
  {
    id: 'journey-builder',
    label: 'Post-Purchase Marketing Journey Builder',
    description:
      'Maximize repeat buyers by designing an optimized, high-converting post-purchase automated framework in the journey builder.',
    topedge: 'Multi-step journey builder with deduplication filters',
    competitor: 'Standard sequential automation workflows',
  },
  {
    id: 'flow-builder',
    label: 'Visual No-Code Chatbot Builder',
    description: 'Node-by-node chatbot canvas with developer-grade visual navigation.',
    topedge: 'Advance visual node builder included on all plans',
    competitor: 'Standard drag-and-drop flow builder',
  },
  {
    id: 'flow-cap',
    label: 'Automation Session Execution Limits',
    topedge: 'Unlimited workflow execution across all plans',
    competitor: 'Capped by monthly trigger.',
  },
];

/** TopEdge Ai vs AiSensy — verbatim board. */
export const AISENSY_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'template-markup',
    label: 'WhatsApp API Message Markup',
    description:
      'Direct Meta conversation rate card vs. platform per-message delivery markups for WhatsApp marketing campaigns.',
    topedge:
      '0% WhatsApp API platform markup (Direct Meta API Billing on your Meta Business Account)',
    competitor: 'Platform usage charges applied on top of base Meta conversation rates',
  },
  {
    id: 'ai-llm',
    label: 'Generative AI Message Costs & LLM Architecture',
    topedge:
      'Bring Your Own Key (BYOK) architecture with built-in RAG pipeline (est. ~₹0.10-₹0.30 per AI response, depending on selected AI model)',
    competitor: 'Per-message AI add-on fee structure with credit-based usage charges',
  },
  {
    id: 'intent-routing',
    label: 'Algorithmic Chat Intent Routing',
    description:
      'Real-time message intent recognition that dynamically channels user inquiries to targeted automation workflows without AI token consumption.',
    topedge: 'Native intent detection & chatflow routing',
    competitor: 'Rule/keyword-based flow triggers and manual setup',
  },
  {
    id: 'store-pixel',
    label: 'E-commerce Visitor Identity Pixel',
    description:
      '1-click store pixel that identifies visitor contact information and tracks product views and checkout sessions without store signin.',
    topedge: '1-Click Install Visitor Identity Pixel',
    competitor: 'Standard post-checkout webhook integration',
  },
  {
    id: 'unified-identity',
    label: 'Unified Customer Identity (Identity Resolution CRM)',
    description:
      'Merges multiple orders, alternate phone numbers, and email addresses of same buyer into a single master buyer profile.',
    topedge: "Native, Auto-merges customer's multiple contact numbers and emails.",
    competitor:
      'Single-number contact record system (Each unique phone number creates an isolated lead record)',
  },
  {
    id: 'lead-dedupe',
    label: 'Lead Deduplication',
    description:
      'Automated CRM cleaning mechanism that prevents duplicate broadcast delivery and eliminates redundant messaging costs.',
    topedge: 'Native auto-deduplication system',
    competitor: 'Standard contact list management and list deduplication',
  },
  {
    id: 'cod-prepaid',
    label: 'COD to Prepaid Order Conversion Funnel',
    description:
      'Automated post-checkout messaging sequences designed to convert cash-on-delivery orders to prepaid status across custom checkout stacks.',
    topedge:
      'Shopify-native checkout integration (Fully compatible with 3rd-party checkout stacks like GoKwik)',
    competitor:
      'Requires API integration and manual mapping of payment links to WhatsApp templates',
  },
  {
    id: 'ecommerce-analytics',
    label: 'E-commerce Growth Analytics & Revenue Tracking',
    description:
      'Complete retention dashboard providing accurate visibility into AOV, customer LTV, geographic purchase density, and future revenue projections.',
    topedge: 'Native E-commerce Intelligence Dashboard',
    competitor: 'Standard analytics.',
  },
  {
    id: 'warranty',
    label: 'Automated Order Warranty Management',
    description:
      'Systemized warranty assignment that auto-generates warranty batches and attaches duration logs to individual customer profiles.',
    topedge: 'Built-in automated warranty batch creation linked to unified customer profiles',
    competitor: 'Requires external CRM tools or custom integration setup',
  },
  {
    id: 'order-mod',
    label: 'In-Chat Order Modifications',
    description:
      'Automated WhatsApp chatflow allowing buyers to edit shipping addresses or cancel orders with fulfillment status-locked security controls.',
    topedge: 'Native order modification backed by fulfillment status and time locks',
    competitor: 'Standard trigger-based',
  },
  {
    id: 'journey-builder',
    label: 'Customer Lifecycle Marketing Journey Builder',
    description:
      'Visual automation canvas to construct multi-stage post-purchase retention sequences with built-in deduplication filters.',
    topedge: 'Advanced multi-stage journey builder with deduplication enrollment filters',
    competitor: 'Standard sequential campaign automation',
  },
  {
    id: 'flow-builder',
    label: 'Visual No-Code Chatbot Builder',
    description: 'Node-to-node workflow builder equipped with advanced developer canvas controls.',
    topedge: 'Advanced drag-and-drop node builder unlocked on all plans',
    competitor:
      'Chatbot flow builder features require purchasing a higher plan tier or dedicated add-on module',
  },
  {
    id: 'flow-cap',
    label: 'Chatbot Session & Flow Execution Limits',
    description:
      'Operational execution allowances placed on automated chat triggers and monthly flow executions.',
    topedge: 'Unlimited flow execution included across all subscription plans',
    competitor: 'Capped by purchased subscription credits and monthly plan tiers',
  },
];

/** TopEdge Ai vs Bitespeed — dedicated pairwise board. */
export const BITESPEED_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'template-markup',
    label: 'WhatsApp Template Message Markup %',
    description: 'What you pay above Meta’s base WhatsApp conversation rates.',
    topedge: '0% markup, billing direct on Meta',
    competitor: 'Meta conversation fees on top of USD plan, verify live',
  },
  {
    id: 'ai-llm',
    label: 'AI LLM Integration / AI Messages',
    description: 'How AI replies are powered and what they cost per conversation.',
    topedge: 'BYOK & built-in RAG pipeline, optimised token usage est. ₹0.2-₹0.3 / message',
    competitor: 'AI chatbot & AI marketing agent ~$100/mo add-ons each (1k then ~$0.05)',
  },
  {
    id: 'intent-routing',
    label: 'Intent Routing Engine',
    description:
      'Algorithm detects chat message intent and routes chatbot flow accordingly (no AI used) for better chat support.',
    topedge: 'Native algorithmic intent detection & routing',
    competitor: 'AI agents / chatbot flows (often add-on)',
  },
  {
    id: 'unified-identity',
    label: 'Unified Customer Identity',
    description:
      'Auto-merges multiple orders, contact numbers, and emails for a single customer into one unified profile.',
    topedge: 'Native built-in',
    competitor: 'Omnichannel profiles, verify merge depth live',
  },
  {
    id: 'lead-dedupe',
    label: 'Duplicate Lead Prevention / Lead Deduplication',
    description: 'Stop the same shopper from flooding CRM as multiple leads.',
    topedge: 'Native, auto-deduplication',
    competitor: 'Segmentation & CRM, verify auto-dedupe live',
  },
  {
    id: 'store-pixel',
    label: 'Store Tracking Pixel',
    description:
      'Pixel captures visitor identity (contact no., email) plus products viewed, product visitors, and abandoned checkout sessions.',
    topedge: '1-click install pixel',
    competitor: 'Popups & spin-the-wheel widgets, full pixel depth not verified',
  },
  {
    id: 'cod-prepaid',
    label: 'Cash On Delivery → Prepaid Funnel Builder',
    description: 'Convert COD risk into prepaid checkouts from WhatsApp.',
    topedge: 'Shopify-native checkout (GoKwik & other checkout partners compatible)',
    competitor: 'COD confirmation / COD → prepaid supported',
  },
  {
    id: 'ecommerce-analytics',
    label: 'E-commerce Analytics',
    description:
      'Accurate metrics: AOV, LTV, campaign revenue, most-sold products by city, upcoming months revenue projection, and other scale metrics brands need.',
    topedge: 'Native built-in',
    competitor: 'Campaign & recovery analytics (omnichannel)',
  },
  {
    id: 'warranty',
    label: 'Order Warranty Management',
    description:
      'Automated warranty assignment and warranty batches per product; each unified profile stores warranty duration for every past order.',
    topedge: 'Built-in automated warranty batches tied to unified customer profile',
    competitor: 'Not found in public feature set',
  },
  {
    id: 'order-mod',
    label: 'Order Modification via WhatsApp',
    description:
      'Customers can cancel orders or change shipping address with time-based and fulfillment-status locks.',
    topedge: 'Yes, with security layer',
    competitor: 'Order updates & support automation',
  },
  {
    id: 'journey-builder',
    label: 'Customer Marketing Journey Builder',
    description:
      'Turn one-time buyers into loyal repeat customers with a high-converting post-purchase messaging framework in the journey builder.',
    topedge: 'Journey builder with deduplication enrollment',
    competitor: 'Automation flows + AI marketing agents (add-on)',
  },
  {
    id: 'flow-builder',
    label: 'Linear Chatbot Flow Builder',
    description: 'Design chatbot flows node-to-node with a visual builder.',
    topedge: 'Advanced drag-and-drop node builder unlocked on all plans',
    competitor: 'Chatbots included; AI chatbot depth often add-on',
  },
  {
    id: 'flow-cap',
    label: 'Chatflow Execution Cap',
    description: 'How many chatbot / flow runs you get before hitting plan limits.',
    topedge: 'Unlimited flow execution on all plans',
    competitor: 'Conversation & AI conversation meters on plans / add-ons',
  },
];

/** TopEdge Ai vs Interakt — dedicated pairwise board. */
export const INTERAKT_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'template-markup',
    label: 'WhatsApp Template Message Markup %',
    description: 'What you pay above Meta’s base WhatsApp conversation rates.',
    topedge: '0% markup, billing direct on Meta',
    competitor: 'Shopify App sub + Meta conversation charges (FB actuals)',
  },
  {
    id: 'ai-llm',
    label: 'AI LLM Integration / AI Messages',
    description: 'How AI replies are powered and what they cost per conversation.',
    topedge: 'BYOK & built-in RAG pipeline, optimised token usage est. ₹0.2-₹0.3 / message',
    competitor: 'AI Agents on Enterprise App (~$99) or ~$74.99 add-on on Growth/Advanced',
  },
  {
    id: 'intent-routing',
    label: 'Intent Routing Engine',
    description:
      'Algorithm detects chat message intent and routes chatbot flow accordingly (no AI used) for better chat support.',
    topedge: 'Native algorithmic intent detection & routing',
    competitor: 'Chatbot / rule-based automation + AI agents on higher tiers',
  },
  {
    id: 'unified-identity',
    label: 'Unified Customer Identity',
    description:
      'Auto-merges multiple orders, contact numbers, and emails for a single customer into one unified profile.',
    topedge: 'Native built-in',
    competitor: 'Standard Shopify + WhatsApp contact records',
  },
  {
    id: 'lead-dedupe',
    label: 'Duplicate Lead Prevention / Lead Deduplication',
    description: 'Stop the same shopper from flooding CRM as multiple leads.',
    topedge: 'Native, auto-deduplication',
    competitor: 'Standard contact / CRM handling',
  },
  {
    id: 'store-pixel',
    label: 'Store Tracking Pixel',
    description:
      'Pixel captures visitor identity (contact no., email) plus products viewed, product visitors, and abandoned checkout sessions.',
    topedge: '1-click install pixel',
    competitor: 'WhatsApp number popup / widget capture',
  },
  {
    id: 'cod-prepaid',
    label: 'Cash On Delivery → Prepaid Funnel Builder',
    description: 'Convert COD risk into prepaid checkouts from WhatsApp.',
    topedge: 'Shopify-native checkout (GoKwik & other checkout partners compatible)',
    competitor: 'WhatsApp Pay COD → prepaid (Razorpay / PayU), documented',
  },
  {
    id: 'ecommerce-analytics',
    label: 'E-commerce Analytics',
    description:
      'Accurate metrics: AOV, LTV, campaign revenue, most-sold products by city, upcoming months revenue projection, and other scale metrics brands need.',
    topedge: 'Native built-in',
    competitor: 'Analytics & reports on Growth+ App tiers',
  },
  {
    id: 'warranty',
    label: 'Order Warranty Management',
    description:
      'Automated warranty assignment and warranty batches per product; each unified profile stores warranty duration for every past order.',
    topedge: 'Built-in automated warranty batches tied to unified customer profile',
    competitor: 'Not found in public feature set, external CRM',
  },
  {
    id: 'order-mod',
    label: 'Order Modification via WhatsApp',
    description:
      'Customers can cancel orders or change shipping address with time-based and fulfillment-status locks.',
    topedge: 'Yes, with security layer',
    competitor: 'Order updates / Order Management AI on higher tiers',
  },
  {
    id: 'journey-builder',
    label: 'Customer Marketing Journey Builder',
    description:
      'Turn one-time buyers into loyal repeat customers with a high-converting post-purchase messaging framework in the journey builder.',
    topedge: 'Journey builder with deduplication enrollment',
    competitor: 'Automated notifications, winbacks & workflow builder',
  },
  {
    id: 'flow-builder',
    label: 'Linear Chatbot Flow Builder',
    description: 'Design chatbot flows node-to-node with a visual builder.',
    topedge: 'Advanced drag-and-drop node builder unlocked on all plans',
    competitor: 'Basic linear on Growth · Advanced branching / API on Advanced+',
  },
  {
    id: 'flow-cap',
    label: 'Chatflow Execution Cap',
    description: 'How many chatbot / flow runs you get before hitting plan limits.',
    topedge: 'Unlimited flow execution on all plans',
    competitor: 'Plan / API rate limits (e.g. ~600 msg/min on Advanced App)',
  },
];

export function pairwiseMatrix(
  competitor: MatrixCompetitor,
): { label: string; description?: string; topedge: string; competitor: string }[] {
  if (competitor === 'wati') {
    return WATI_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
      label,
      description,
      topedge,
      competitor: cell,
    }));
  }
  if (competitor === 'aisensy') {
    return AISENSY_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
      label,
      description,
      topedge,
      competitor: cell,
    }));
  }
  if (competitor === 'bitespeed') {
    return BITESPEED_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
      label,
      description,
      topedge,
      competitor: cell,
    }));
  }
  if (competitor === 'interakt') {
    return INTERAKT_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
      label,
      description,
      topedge,
      competitor: cell,
    }));
  }
  return LEGACY_COMPARE_FEATURE_MATRIX.map((row) => ({
    label: row.name,
    description: row.description,
    topedge: row.topedge,
    competitor: row[competitor],
  }));
}

/** Standout rows for best-plan duel, where TopEdge usually wins, plus fair “they can too”. */
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

function pairwiseForDuel(competitor: MatrixCompetitor): PairwiseFeatureRow[] {
  if (competitor === 'wati') return WATI_PAIRWISE_MATRIX;
  if (competitor === 'aisensy') return AISENSY_PAIRWISE_MATRIX;
  if (competitor === 'bitespeed') return BITESPEED_PAIRWISE_MATRIX;
  if (competitor === 'interakt') return INTERAKT_PAIRWISE_MATRIX;
  return LEGACY_COMPARE_FEATURE_MATRIX.map((row) => ({
    id: row.id,
    label: row.name,
    description: row.description,
    topedge: row.topedge,
    competitor: row[competitor],
  }));
}

export function planDuelFeatures(competitor: MatrixCompetitor): {
  label: string;
  topedge: string;
  competitor: string;
}[] {
  const matrix = pairwiseForDuel(competitor);
  return PLAN_DUEL_IDS.map((id) => {
    const row = matrix.find((r) => r.id === id)!;
    return {
      label: PLAN_DUEL_SHORT[id],
      topedge: row.topedge,
      competitor: row.competitor,
    };
  });
}
