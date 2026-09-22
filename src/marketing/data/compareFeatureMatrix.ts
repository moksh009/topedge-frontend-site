/**
 * Compare capability matrices.
 * WATI / AiSensy / Bitespeed / Interakt / 3-way each have independent boards.
 */

export type MatrixCompetitor =
  | 'wati'
  | 'aisensy'
  | 'interakt'
  | 'bitespeed'
  | 'zoko'
  | 'getgabs'
  | 'kanal'
  | 'dondy'
  | 'updatrr';

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

/** TopEdge Ai vs Bitespeed — verbatim board. */
export const BITESPEED_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'subscription',
    label: 'Subscription Model',
    topedge: '14 Days free trial, then starts from ~₹1,800',
    competitor:
      'Requires stores to generate a minimum of ₹5,00,000 MRR to qualify for onboarding, with baseline plans starting at ~₹15,000/month',
  },
  {
    id: 'template-markup',
    label: 'WhatsApp API Template Message Markup',
    description:
      'How messaging usage is billed and whether the platform applies hidden markup fees on top of standard Meta conversation rates.',
    topedge:
      '0% WhatsApp API platform markup (Direct Meta API Billing on your Meta Business Account)',
    competitor:
      'Platform usage charges and conversation markup fees applied on top of base Meta conversation rates',
  },
  {
    id: 'ai-llm',
    label: 'Generative AI Support Engine & Custom LLM Integration',
    description:
      'Enterprise LLM integration framework allowing brands to deploy generative customer support with flexible AI model selection and zero feature paywalls.',
    topedge:
      'Bring Your Own Key (BYOK) architecture with built-in RAG pipeline (est. ~₹0.10-₹0.30 per AI response, depending on selected AI model), available on all plans',
    competitor: 'No official information found.',
  },
  {
    id: 'unified-identity',
    label: 'Unified Customer Identity (Identity Resolution CRM)',
    description:
      'Independent CRM engine that automatically stitches fragmented orders, multiple contact numbers, and emails into a single master buyer profile.',
    topedge:
      "Native Identity Resolution Engine (Operates independently to auto-merge a buyer's multiple contact numbers and emails into one master record)",
    competitor:
      "Standard sync (Primarily relies on Shopify’s default customer data structure)",
  },
  {
    id: 'lead-dedupe',
    label: 'Lead Deduplication',
    description:
      'Automated CRM cleaning mechanism that prevents duplicate broadcast delivery and eliminates wasted marketing budget on duplicate contacts. Intelligent CRM cleaning engine that detects when a single buyer uses multiple phone numbers across different orders, ensuring marketing broadcasts are sent only once, eliminating wasted marketing budget.',
    topedge:
      'Native cross-channel auto-deduplication system (Prevents sending duplicate marketing messages to the same person if they use multiple contact numbers)',
    competitor:
      'Standard list segmentation (Relies on basic tag management and list filtering)',
  },
  {
    id: 'store-pixel',
    label: 'Visitor Identity Pixel',
    description:
      'Store pixel that identifies visitor contacts and tracks product views, visitor activity & checkout sessions prior to account creation.',
    topedge: '1-Click to Install',
    competitor:
      'Relies primarily on interactive opt-in widgets (e.g., Spin-the-wheel pop-ups) and standard Shopify abandoned checkout webhooks for data capture',
  },
  {
    id: 'optin-widgets',
    label: 'Opt-In Widget Builder & Website Popups builder',
    description:
      'Customizable interactive website widgets, sticky opt-in bars designed to capture visitor information, Website Offer Popup builder and WhatsApp opt-in consent collector. (e.g. such as Spin-the-Wheel popups, offer banner popups, etc...)',
    topedge: 'Advance, unlocked across all subscription plans',
    competitor: 'Standard.',
  },
  {
    id: 'order-mod',
    label: 'Chat Order Modifications',
    description:
      'Automated WhatsApp self-service flow allowing buyers to edit shipping addresses or cancel orders securely before dispatch.',
    topedge:
      'Native, Order modification backed by fulfillment status and time locks (Fully automated without live agents)',
    competitor: 'Standard.',
  },
  {
    id: 'cod-prepaid',
    label: 'COD to Prepaid Order Conversion Funnel',
    description:
      'Automated post-checkout messaging sequences designed to convert cash-on-delivery (COD) orders to prepaid status.',
    topedge:
      'Flexible Native integration for Shopify and 3rd-party checkout stacks (GoKwik, Razorpay, etc.)',
    competitor: 'Native',
  },
  {
    id: 'warranty',
    label: 'Automated Order Warranty Management',
    description:
      'Systemized warranty assignment that auto-generates warranty batches and attaches duration logs directly to individual customer profiles.',
    topedge:
      'Built-in automated warranty batch creation linked directly to the unified customer profile',
    competitor: 'Not natively supported',
  },
  {
    id: 'ecommerce-analytics',
    label: 'E-commerce Growth Analytics & Revenue Tracking',
    description:
      'Complete retention dashboard providing accurate visibility into Average Order Value (AOV), Customer Lifetime Value (LTV), Geographic purchase density, future revenue projections, many more...',
    topedge: 'Native Detailed E-commerce Intelligence Dashboard',
    competitor: 'Standard',
  },
  {
    id: 'intent-routing',
    label: 'Algorithmic Chat Intent Routing Engine',
    description:
      'Real-time message intent recognition that dynamically channels user inquiries to targeted automation chat flows without burning any AI tokens.',
    topedge: 'Native, Intent detection &  Chat flow routing',
    competitor:
      'Rule-based chat routing relying on predefined template triggers and live-agent handoffs',
  },
  {
    id: 'flow-cap',
    label: 'Chatbot Session & Flow Execution Limits',
    description:
      'Operational execution limits placed on automated chat triggers and monthly flow executions.',
    topedge: 'Unlimited flow execution included across all subscription plans',
    competitor: 'No official information found',
  },
];

/** TopEdge vs Zoko — verified against zoko.io/pricing (Sep 2026). */
export const ZOKO_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'template-markup',
    label: 'WhatsApp conversation economics',
    description: 'How platform fees sit on top of Meta rates.',
    topedge: '0% markup; Meta pass-through; flat INR plan by Shopify orders',
    competitor:
      'Starter: ~$0.015/conversation markup (zoko.io). Plus/Elite/Max: included conversation buckets then overage rates',
  },
  {
    id: 'ai-llm',
    label: 'AI / auto order agents',
    description: 'How AI replies and order collection are priced.',
    topedge: 'BYOK + RAG on core plans (~₹0.2–₹0.3 / message)',
    competitor: 'AI agents billed per resolution (e.g. ~$0.09/resolution on Guru/WISMO; Sello % of order value) — verify live',
  },
  {
    id: 'intent-routing',
    label: 'Intent routing',
    description: 'Route chats without burning LLM tokens on every message.',
    topedge: 'Native algorithmic intent detection',
    competitor: 'Flows + AI agents; intent engine depth verify live',
  },
  {
    id: 'unified-identity',
    label: 'Unified customer identity',
    description: 'Merge phones, emails, and orders into one profile.',
    topedge: 'Native built-in',
    competitor: 'Shopify sync + inbox contacts; multi-number merge depth verify live',
  },
  {
    id: 'cod-prepaid',
    label: 'COD confirm & COD → prepaid',
    description: 'India COD risk tools on WhatsApp.',
    topedge: 'Native journeys + Shopify checkout partners',
    competitor: 'Essential free flows include double-confirm COD and convert COD → prepaid (zoko.io)',
  },
  {
    id: 'warranty',
    label: 'Warranty management',
    description: 'Warranty hub tied to orders and profiles.',
    topedge: 'Native warranty hub',
    competitor: 'Not found as a first-class warranty product on public pricing',
  },
  {
    id: 'flow-builder',
    label: 'Flow / journey builder',
    description: 'Visual automation for recovery and support.',
    topedge: 'Visual journeys + Flow Builder, unlimited runs on all plans',
    competitor:
      '11 essential ecommerce flows free; custom/premium flows ~$5.99/mo each + step fair-use overage',
  },
  {
    id: 'flow-cap',
    label: 'Execution / conversation meters',
    description: 'What spikes during festival or sale traffic.',
    topedge: 'Plan priced on Shopify order volume; Meta fees separate',
    competitor: 'Conversation buckets/markup + FlowHippo step fair use (500K steps then overage)',
  },
  {
    id: 'ecommerce-analytics',
    label: 'Ecommerce analytics',
    description: 'Recovery ₹ and store metrics operators actually use.',
    topedge: 'Native ecommerce / P&L style analytics',
    competitor: 'Detailed analytics listed; depth vs TopEdge P&L verify live',
  },
  {
    id: 'india-payments',
    label: 'India payment / commerce hooks',
    description: 'UPI / Razorpay / in-chat commerce patterns.',
    topedge: 'Shopify checkout partners + WhatsApp journeys',
    competitor: 'Strong India commerce positioning (UPI/Razorpay, catalog, CTWA) — verify live',
  },
];

/** TopEdge vs Getgabs — verified against getgabs.com/pricing + Shopify App Store listing. */
export const GETGABS_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'template-markup',
    label: 'Meta markup',
    description: 'Platform fee above Meta conversation rates.',
    topedge: '0% markup; Meta pass-through',
    competitor: 'Claims 0% Meta markup on getgabs.com; platform subscription billed separately (USD)',
  },
  {
    id: 'ai-llm',
    label: 'AI chatbot',
    description: 'AI replies included vs metered.',
    topedge: 'BYOK + RAG on core plans',
    competitor: 'AI AnswerNode included on website plans with crawl limits / add-ons — verify live',
  },
  {
    id: 'unified-identity',
    label: 'Unified customer identity',
    description: 'One shopper across phones and emails.',
    topedge: 'Native built-in',
    competitor: 'Lead CRM / contacts; multi-identity merge depth not highlighted',
  },
  {
    id: 'cod-prepaid',
    label: 'COD → prepaid conversion',
    description: 'Distinct COD risk conversion, not only COD confirm texts.',
    topedge: 'Native COD → prepaid journeys with checkout partners',
    competitor: 'COD verification / confirmations listed; COD→prepaid builder depth verify live',
  },
  {
    id: 'warranty',
    label: 'Warranty management',
    description: 'Post-purchase warranty hub.',
    topedge: 'Native warranty hub',
    competitor: 'Not found as a first-class warranty product',
  },
  {
    id: 'flow-builder',
    label: 'Automation / journeys',
    description: 'Visual builders for cart and lifecycle.',
    topedge: 'Visual journeys + Flow Builder, unlimited runs',
    competitor: 'Chatbot Flow builder (unlimited flows claimed); Shopify ecommerce automations on paid tiers',
  },
  {
    id: 'cart-recovery',
    label: 'Abandoned cart recovery',
    description: 'Shopify cart / checkout recovery on WhatsApp.',
    topedge: 'Native cart recovery journeys with Meta gating',
    competitor: 'Abandoned cart recovery on Shopify app + site ecommerce features',
  },
  {
    id: 'flow-cap',
    label: 'Plan meters',
    description: 'What you hit as volume grows.',
    topedge: 'Order-volume INR plans',
    competitor: 'Broadcast / widget / agent / crawl limits by USD tier',
  },
  {
    id: 'pricing-entry',
    label: 'Entry pricing',
    description: 'Cost to start.',
    topedge: 'Launch ₹1,999/mo (published INR)',
    competitor: 'Free to install on Shopify; paid from ~$11–$15/mo (App Store / getgabs.com — verify live)',
  },
];

/** TopEdge vs Kanal — verified against getkanal.com/pricing (EUR). */
export const KANAL_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'template-markup',
    label: 'Pricing currency / model',
    description: 'How the platform fee is published.',
    topedge: 'Flat INR Launch / Growth / Scale by Shopify orders',
    competitor: 'EUR plans from Pro €89/mo (getkanal.com/pricing); Meta fees separate',
  },
  {
    id: 'ai-llm',
    label: 'AI agent',
    description: 'Where AI unlocks.',
    topedge: 'BYOK + RAG on core plans',
    competitor: 'AI Agent on Scale+ (€149+) — verify live',
  },
  {
    id: 'klaviyo',
    label: 'Email stack complement',
    description: 'Works beside an ESP instead of replacing it.',
    topedge: 'WhatsApp + Shopify focus; pair your ESP',
    competitor: 'Native Klaviyo integration (and Recharge / Crisp / Gorgias)',
  },
  {
    id: 'cod-prepaid',
    label: 'India COD workflows',
    description: 'COD confirm and COD → prepaid for Indian D2C.',
    topedge: 'Native COD journeys for India checkout patterns',
    competitor: 'No India-specific COD positioning found on public marketing',
  },
  {
    id: 'unified-identity',
    label: 'Unified customer identity',
    description: 'Merge phones / emails / orders.',
    topedge: 'Native built-in',
    competitor: 'Shopify sync + automations; merge depth verify live',
  },
  {
    id: 'warranty',
    label: 'Warranty management',
    description: 'Warranty hub for post-purchase.',
    topedge: 'Native warranty hub',
    competitor: 'Not found as a first-class warranty product',
  },
  {
    id: 'cart-recovery',
    label: 'Abandoned cart recovery',
    description: 'WhatsApp cart recovery on Shopify.',
    topedge: 'Native cart recovery journeys',
    competitor: 'Abandoned cart recovery on Pro+',
  },
  {
    id: 'flow-builder',
    label: 'Automations depth',
    description: 'Advanced automation unlocks.',
    topedge: 'Journeys + Flow Builder on core plans',
    competitor: 'Advanced automations / unlimited automations on Scale+',
  },
  {
    id: 'india-focus',
    label: 'India / INR positioning',
    description: 'Built for Indian D2C operators.',
    topedge: 'India-first: INR pricing, COD, Meta gating',
    competitor: 'Global / multi-market WhatsApp marketing (EUR)',
  },
];

/** TopEdge vs Dondy — verified Sep 21 2026 against apps.shopify.com/dondy-marketing-ai and dondy.net/dondy-pricing. */
export const DONDYY_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'template-markup',
    label: 'Meta messaging markup',
    description: 'What you pay versus Meta’s own marketing rate.',
    topedge: '0% markup; Meta pass-through on flat INR plans',
    competitor:
      'Published rate table is ~60% above Meta marketing rates (India $0.01888/msg on dondy.net — verify Meta’s card live)',
  },
  {
    id: 'ai-llm',
    label: 'AI sales / support agent',
    description: 'Where AI unlocks.',
    topedge: 'Intelligence / BYOK on core plans',
    competitor: 'AI chatbot for sales & support on Elite ($159.99/mo) — Shopify listing',
  },
  {
    id: 'cod-prepaid',
    label: 'COD → prepaid',
    description: 'India COD risk conversion, not only a verification tag.',
    topedge: 'Native COD → prepaid journeys',
    competitor: 'COD verification is a listed Shopify feature; COD→prepaid builder depth not shown as India-native',
  },
  {
    id: 'unified-identity',
    label: 'Unified customer identity',
    description: 'Merge phones, emails, and orders.',
    topedge: 'Native built-in',
    competitor: 'Inbox + Shopify sync; multi-number merge depth verify live',
  },
  {
    id: 'warranty',
    label: 'Warranty management',
    description: 'Post-purchase warranty hub.',
    topedge: 'Native warranty hub',
    competitor: 'Not found as a first-class warranty product',
  },
  {
    id: 'flow-builder',
    label: 'Widget, flows, and inbox',
    description: 'Out-of-the-box WhatsApp surface area.',
    topedge: 'Journeys + Flow Builder + WhatsApp inbox',
    competitor:
      'Free floating widget; automations from Power ($79.99); multi-agent inbox on Elite (listing says 5 agents; site says unlimited)',
  },
  {
    id: 'klaviyo',
    label: 'Klaviyo',
    description: 'Works beside an email stack.',
    topedge: 'Pair your own ESP',
    competitor: 'Klaviyo listed under Works with on the Shopify listing',
  },
  {
    id: 'india-focus',
    label: 'India / INR positioning',
    description: 'Built for Indian D2C operators.',
    topedge: 'India-first: INR pricing, COD, Meta gating',
    competitor: 'USD plans; public languages are EN/ES/IT/PT-BR/FR — not India-specific',
  },
  {
    id: 'flow-cap',
    label: 'Message economics at 1,000',
    description: 'Concrete message-line math, before subscription.',
    topedge: '1,000 India marketing messages ≈ Meta’s own rate (0% platform markup)',
    competitor:
      '1,000 × India table rate $0.01888 ≈ $18.88 vs ~$11.80 at Meta $0.0118 — about $7.08 / 60% more on the message line',
  },
];

/** TopEdge Ai vs Updatrr — verbatim board. */
export const UPDATRR_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'subscription',
    label: 'Subscription Model',
    topedge: '14 Days free trial, then starts from ~₹1,800',
    competitor: '7 Days free trial, then starts from ~$19.99 (₹1,900)',
  },
  {
    id: 'website-platform',
    label: 'Website Platform',
    description:
      'Shows whether the software works on website or is dependent on platform like Shopify.',
    topedge: 'Web-based Software',
    competitor: 'Works only on Shopify',
  },
  {
    id: 'template-markup',
    label: 'WhatsApp API Template Message Markup %',
    description:
      'How messaging usage is billed and whether the platform applies hidden markup fees on top of standard Meta conversation rates.',
    topedge:
      '0% WhatsApp API platform markup (Meta API Billing directly on your Meta Business Account)',
    competitor:
      '0% platform markup (pay the direct fees billed by Meta alongside your chosen Updatrr software subscription.)',
  },
  {
    id: 'ai-llm',
    label: 'AI Message Costs & LLM Architecture',
    description:
      'Enterprise LLM integration framework allowing brands to deploy generative customer support with flexible AI model selection and transparent messaging costs.',
    topedge:
      'Bring Your Own Key (BYOK) architecture with built-in RAG pipeline (est. ~₹0.10-₹0.30 per AI response depending on selected AI model)',
    competitor:
      'Per-conversation pricing model (est. ~₹4.50 per AI conversation / plan-based usage fees)',
  },
  {
    id: 'store-pixel',
    label: 'E-commerce Tracking Pixel',
    description:
      'Store pixel that identifies visitor contact information and tracks product views, visitor activity and checkout sessions without shopper store account sign-in.',
    topedge: '1-Click Install Visitor Identity Pixel for advanced pre-checkout capture',
    competitor: 'Relies on standard Shopify abandoned checkout triggers.',
  },
  {
    id: 'unified-identity',
    label: 'Unified Customer Identity',
    description:
      'Independent CRM engine that automatically merges multiple orders, alternate phone numbers, and emails of same buyer into one master buyer profile.',
    topedge:
      'Native Built-in Identity Resolution Engine (Operates independently of e-commerce platform constraints)',
    competitor:
      'Standard sync (Relies entirely on Shopify’s default customer data structure and account tracking)',
  },
  {
    id: 'intent-routing',
    label: 'Intent Routing Engine (Algorithmic)',
    description:
      'Real-time message intent recognition that dynamically channels user inquiries to targeted automation chat flow without requiring Ai usage.',
    topedge: 'Native algorithmic intent detection & chat flow routing',
    competitor: 'Rule/keyword-based triggers heavily tied to Shopify events',
  },
  {
    id: 'lead-dedupe',
    label: 'Duplicate Lead Filter (Lead Deduplication)',
    description:
      'Automated CRM cleaning mechanism that prevents duplicate broadcast delivery and eliminates wasted marketing budget on duplicate contacts. Intelligent CRM cleaning engine that detects when a single buyer uses multiple phone numbers across different orders, ensuring marketing broadcasts are sent only once, eliminating wasted marketing budget.',
    topedge: 'Native auto-deduplication system',
    competitor:
      "Standard contact sync (Managed via Shopify's default contact management system)",
  },
  {
    id: 'cod-prepaid',
    label: 'COD to Prepaid Conversion Funnel',
    description:
      'Post-checkout automated messaging sequences designed to verify Cash-on-Delivery (COD) orders and convert them to prepaid status.',
    topedge:
      'Native integration for Shopify and 3rd-party checkout compatible (e.g. GoKwik, Razorpay, etc.)',
    competitor: 'Native.',
  },
  {
    id: 'warranty',
    label: 'Order Warranty Management Automation',
    description:
      'Systemized post-purchase warranty assignment that auto-assign warranty batches and attaches duration logs directly to individual customer profiles.',
    topedge:
      'Built-in automated warranty batch creation linked directly to the unified customer profile',
    competitor: 'Not supported',
  },
  {
    id: 'order-mod',
    label: 'In-Chat Order Modification (Self-Service Automation)',
    description:
      'Automated WhatsApp chat flow allowing buyers to edit shipping addresses or cancel orders securely before dispatch.',
    topedge: 'Native order modification backed by fulfillment status and time locks',
    competitor:
      'Not supported, Order modifications generally require routing to a live agent',
  },
  {
    id: 'journey-builder',
    label: 'Customer Marketing Journey Builder',
    description:
      'Visual automation canvas to construct multi-stage post-purchase retention sequences personalised for customers.',
    topedge:
      'Advanced multi-stage journey builder integrated with deduplication enrollment filters',
    competitor:
      'Standard automated sequences (Drip campaigns and abandoned cart reminders triggered by Shopify events only)',
  },
  {
    id: 'flow-cap',
    label: 'Chatbot Session & Flow Execution Limits',
    description:
      'Operational execution limits placed on automated chat triggers and monthly flow executions by the platform.',
    topedge: 'Unlimited flow execution included across all subscription plans',
    competitor: 'Not mentioned Execution tier limits on subscription plans',
  },
  {
    id: 'ecommerce-analytics',
    label: 'E-commerce Growth Analytics & Revenue Tracking',
    description:
      'Complete retention dashboard providing accurate visibility into Average Order Value (AOV), Customer Lifetime Value (LTV), Geographic purchase density, and future revenue projections.',
    topedge: 'Native Advance E-commerce Intelligence Dashboard',
    competitor: 'Standard e-commerce analytics.',
  },
  {
    id: 'flow-builder',
    label: 'Visual No-Code Chatbot Builder',
    description:
      'Node-by-node workflow canvas equipped with advanced developer controls for building custom support and automated marketing flows.',
    topedge: 'Advanced drag-and-drop chatbot builder unlocked on all subscription plans',
    competitor:
      'Standard visual flow builder tied to Shopify event triggers and plan subscription tiers',
  },
];

/** TopEdge Ai vs Interakt — verbatim board. */
export const INTERAKT_PAIRWISE_MATRIX: PairwiseFeatureRow[] = [
  {
    id: 'subscription',
    label: 'Subscription Model',
    topedge: '14 Days free trial, then starts from ~₹1,800',
    competitor:
      '14 Days free trial, then starts from ~₹2,799 (plan which includes WhatsApp channel)',
  },
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
    competitor:
      'Paid add-on module for WhatsApp AI Agents , per-message AI usage cost ₹0.50/ message applied after a small allowance of 100 free messages',
  },
  {
    id: 'store-pixel',
    label: 'E-commerce Visitor Identity Pixel',
    description:
      '1-click store pixel that identifies visitor contact information and tracks product views, visitor activiy and checkout sessions without shopper store signin required.',
    topedge: '1-Click Install Visitor Identity Pixel',
    competitor: 'Standard post-checkout webhook integration and custom event tracking',
  },
  {
    id: 'intent-routing',
    label: 'Algorithmic Chat Intent Routing',
    description:
      'Real-time message intent recognition that dynamically channels user inquiries to targeted automation chat flows without AI token consumption.',
    topedge: 'Native intent detection & chat flow routing',
    competitor: 'Rule and keyword-based linear flows on standard plans',
  },
  {
    id: 'unified-identity',
    label: 'Unified Customer Identity (Identity Resolution CRM)',
    description:
      'Merges multiple orders, alternate phone numbers, and email addresses of same buyer into a single master buyer profile.',
    topedge: "Native, Auto-merges customer's alternative contact numbers and emails .",
    competitor:
      'Standard contact management where each unique phone number acts as an isolated contact record',
  },
  {
    id: 'lead-dedupe',
    label: 'Lead Deduplication',
    description:
      'Automated CRM cleaning mechanism that prevents duplicate broadcast delivery and eliminates wasted marketing budget on duplicate contacts. Intelligent CRM cleaning engine that detects when a single buyer uses multiple phone numbers across different orders, ensuring marketing broadcasts are sent only once, eliminating wasted marketing budget.',
    topedge: 'Native auto-deduplication system',
    competitor: 'Standard contact list management and basic tagging',
  },
  {
    id: 'cod-prepaid',
    label: 'COD to Prepaid Order Conversion Funnel',
    description:
      'Automated post-checkout messaging sequences designed to convert cash-on-delivery orders to prepaid status across custom checkout stacks.',
    topedge:
      'Shopify-native checkout integration (compatible with 3rd-party checkout stacks like GoKwik, Razorpay, etc...)',
    competitor:
      'Supported natively but locked behind the Advanced Shopify integration on higher-tier plans',
  },
  {
    id: 'ecommerce-analytics',
    label: 'E-commerce Growth Analytics',
    description:
      'Complete retention dashboard providing accurate visibility into AOV, customer LTV, Geographic product understanding, and future revenue projections.',
    topedge: 'Native E-commerce Intelligence Dashboard',
    competitor: 'Standard analytics',
  },
  {
    id: 'warranty',
    label: 'Order Warranty Management Automation',
    description:
      'Systemized warranty assignment that auto-generates warranty batches and attaches duration logs to individual customer profiles.',
    topedge:
      'Built-in automated warranty batch creation linked to unified customer profiles',
    competitor: 'Requires external CRM tools or custom integration setup via webhooks',
  },
  {
    id: 'order-mod',
    label: 'Order Modifications Chat flow',
    description:
      'Automated WhatsApp chat flow allowing buyers to edit shipping addresses or cancel orders with fulfillment status-locked security controls.',
    topedge: 'Native order modification backed by fulfillment status and time locks',
    competitor: 'Standard trigger-based workflow setups',
  },
  {
    id: 'journey-builder',
    label: 'Customer Lifecycle Marketing Journey Builder',
    description:
      'Visual automation canvas to construct multi-stage post-purchase retention sequences with built-in deduplication filters.',
    topedge: 'Advanced multi-stage journey builder with deduplication enrollment filters',
    competitor:
      'Standard sequential campaigns with basic post-reply flows and auto-replies',
  },
  {
    id: 'flow-builder',
    label: 'Visual No-Code Chatbot Builder',
    description:
      'Node-to-node workflow builder equipped with advanced developer canvas controls.',
    topedge: 'Advanced drag-and-drop node builder unlocked on all plans',
    competitor:
      'Basic linear chatbot builder on lower tiers; branched chatbots require the higher plan.',
  },
  {
    id: 'flow-cap',
    label: 'Chatbot Session & Flow Execution Limits',
    description:
      'Operational execution limits placed on automated chat triggers and monthly flow executions.',
    topedge: 'Unlimited flow execution included across all subscription plans',
    competitor:
      'Account limits for custom fields, custom events, and tags are capped based on your specific pricing tier',
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
  if (competitor === 'zoko') {
    return ZOKO_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
      label,
      description,
      topedge,
      competitor: cell,
    }));
  }
  if (competitor === 'getgabs') {
    return GETGABS_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
      label,
      description,
      topedge,
      competitor: cell,
    }));
  }
  if (competitor === 'kanal') {
    return KANAL_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
      label,
      description,
      topedge,
      competitor: cell,
    }));
  }
  if (competitor === 'dondy') {
    return DONDYY_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
      label,
      description,
      topedge,
      competitor: cell,
    }));
  }
  if (competitor === 'updatrr') {
    return UPDATRR_PAIRWISE_MATRIX.map(({ label, description, topedge, competitor: cell }) => ({
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
  if (competitor === 'zoko') return ZOKO_PAIRWISE_MATRIX;
  if (competitor === 'getgabs') return GETGABS_PAIRWISE_MATRIX;
  if (competitor === 'kanal') return KANAL_PAIRWISE_MATRIX;
  if (competitor === 'dondy') return DONDYY_PAIRWISE_MATRIX;
  if (competitor === 'updatrr') return UPDATRR_PAIRWISE_MATRIX;
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
  return PLAN_DUEL_IDS.flatMap((id) => {
    const row = matrix.find((r) => r.id === id);
    if (!row) return [];
    return [
      {
        label: PLAN_DUEL_SHORT[id],
        topedge: row.topedge,
        competitor: row.competitor,
      },
    ];
  });
}
