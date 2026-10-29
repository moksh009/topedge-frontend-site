/**
 * Service catalogue for /services.
 *
 * Why this page exists, and why it is not /features in different words.
 * `/services` 301'd to `/features` until 2026-10-29, which put it in GSC's
 * "Page with redirect" bucket while the query family it should answer
 * ("whatsapp automation services india", "whatsapp api service provider")
 * had no landing page at all.
 *
 * The split that keeps the two pages off each other's queries:
 *   - /features  describes a capability ("what the product does").
 *   - /services  describes an outcome we take responsibility for ("what you
 *     get done"), and routes to the capability pages that deliver it.
 *
 * Every claim here must already be true somewhere else in this repo — these
 * are groupings of shipped product, NOT an agency retainer, managed-service
 * tier or SLA. Do not add a service line that no feature page backs.
 */

export type ServiceLink = { label: string; href: string };

export type ServiceGroup = {
  id: string;
  /** Outcome, in the words a store owner would use. */
  title: string;
  /** What we actually do for that outcome. */
  body: string;
  /** Concrete deliverables. Each must map to shipped product. */
  deliverables: readonly string[];
  /** Capability pages that deliver this outcome. */
  links: readonly ServiceLink[];
};

export const SERVICES_PATH = '/services';

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    id: 'recover-revenue',
    title: 'Recover the revenue you are already losing',
    body: 'Abandoned carts and unconfirmed COD orders are the two largest leaks in an Indian Shopify store. Both are recovered with approved WhatsApp templates triggered off real Shopify events, not a generic broadcast blast.',
    deliverables: [
      'Abandoned-cart journeys triggered off Shopify checkout events',
      'COD order confirmation, and the COD-to-prepaid nudge that lowers RTO',
      'Order, shipping and delivery updates on the same canvas',
      'Recovered revenue reported in ₹, not in sends delivered',
    ],
    links: [
      { label: 'Visual journeys', href: '/features/journeys' },
      { label: 'COD confirmation', href: '/features/cod-confirmation' },
      { label: 'Cart recovery calculator', href: '/tools/cart-recovery-calculator' },
    ],
  },
  {
    id: 'meta-compliance',
    title: 'Get on the WhatsApp Cloud API without a Meta rejection loop',
    body: 'Template rejections and category mistakes are what stall most WhatsApp launches in India. Templates are drafted in the right Meta category, submitted for approval, and nothing is allowed to send until Meta returns APPROVED.',
    deliverables: [
      'Meta WhatsApp Cloud API connected on your own number and credentials',
      'Templates drafted in the correct Meta category and tracked to approval',
      'A hard gate: an unapproved template cannot send',
      'Meta India rates passed through at 0% markup',
    ],
    links: [
      { label: 'Meta manager', href: '/features/meta-manager' },
      { label: 'Meta India rate card', href: '/pricing/meta-rates' },
      { label: 'Fixing a rejected template', href: '/blog/whatsapp-template-rejected-meta-shopify-fix' },
    ],
  },
  {
    id: 'grow-list',
    title: 'Grow a WhatsApp list you are allowed to message',
    body: 'An opt-in list collected properly is the difference between a channel that compounds and one that gets your number rate-limited. Opt-in is captured on the storefront and at checkout, with consent recorded against the customer.',
    deliverables: [
      'Storefront and checkout opt-in widgets for your Shopify theme',
      'Consent recorded per customer, with the source it came from',
      'Website intent tracked and handed to WhatsApp as a lead',
      'Segments and lead scores built from order and browse behaviour',
    ],
    links: [
      { label: 'Opt-in tools', href: '/features/opt-in-tools' },
      { label: 'Audience CRM', href: '/features/audience-crm' },
      { label: 'Tracking pixel and intent', href: '/features/analytics' },
      { label: 'Opt-in rules in India', href: '/blog/whatsapp-opt-in-shopify-india' },
    ],
  },
  {
    id: 'campaigns',
    title: 'Send campaigns that do not quietly burn margin',
    body: 'A broadcast is only worth sending if the revenue beats the Meta conversation cost. Campaigns are costed in ₹ before they send, and measured against what came back after.',
    deliverables: [
      'Segment-targeted broadcasts with the ₹ cost shown before you send',
      'Marketing and utility categories kept separate so costs stay honest',
      'Per-campaign revenue attribution against spend',
      'Net margin after product, shipping, ads, RTO and platform fees',
    ],
    links: [
      { label: 'Audience campaigns', href: '/features/campaigns' },
      { label: 'Profit and costs', href: '/features/profit-loss' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    id: 'support-at-scale',
    title: 'Answer customers at scale without losing the thread',
    body: 'Most incoming WhatsApp messages are the same handful of questions about an order. Those are answered automatically with order context attached, and anything that needs a person is routed to the right one.',
    deliverables: [
      'An AI agent answering on your own API keys and your own catalogue',
      'Intent detection that routes a chat by what it actually means',
      'Rules that assign conversations to the right agent or team',
      'A shared inbox where every chat carries its Shopify order context',
    ],
    links: [
      { label: 'AI Brain', href: '/features/ai-brain' },
      { label: 'Intent detection', href: '/features/intent-detection' },
      { label: 'Chat rules', href: '/features/chat-rules' },
      { label: 'Flow builder', href: '/features/flow-builder' },
    ],
  },
  {
    id: 'post-purchase',
    title: 'Handle warranty and post-purchase claims in one place',
    body: 'Warranty and returns arrive on WhatsApp whether or not there is a process behind them. Claims get a registration step, a queue, and an owner, instead of living in one person’s chat history.',
    deliverables: [
      'Digital warranty registration tied to the original order',
      'A claims hub with a queue and per-claim assignment',
      'Status updates sent back to the customer on WhatsApp',
      'Claim volume and resolution visible alongside the rest of the funnel',
    ],
    links: [
      { label: 'Warranty workspace', href: '/features/warranty' },
      { label: 'Journey examples', href: '/whatsapp-journey-examples' },
    ],
  },
  {
    id: 'migration',
    title: 'Move across from another WhatsApp platform',
    body: 'If you are already on WATI, AiSensy, Interakt, Bitespeed or a CPaaS reseller, the number and the templates come with you. The comparison boards below set out what changes on cost and on control before you commit.',
    deliverables: [
      'Your existing WhatsApp number and Meta assets kept, not re-provisioned',
      'Templates re-created and re-submitted in the right categories',
      'Flat INR plans with 0% markup on Meta rates, billed in rupees',
      'A side-by-side of what you pay now against what you would pay here',
    ],
    links: [
      { label: 'All alternatives', href: '/compare/alternatives' },
      { label: 'TopEdge vs WATI', href: '/compare/wati' },
      { label: 'TopEdge vs AiSensy', href: '/compare/aisensy' },
      { label: 'Find the right tool', href: '/tools/best-whatsapp-tool-for-shopify' },
    ],
  },
];

/** The real onboarding sequence (matches the steps on /integrations). */
export const SERVICE_STEPS = [
  {
    title: 'Connect Shopify',
    body: 'Authorize the store with Shopify OAuth. Orders, carts and catalog start syncing immediately.',
  },
  {
    title: 'Add your WhatsApp Cloud API',
    body: 'Your own Meta credentials and your own number. Onboarding walks each field, so the number stays yours.',
  },
  {
    title: 'Approve templates',
    body: 'Submit templates to Meta and wait for APPROVED. Nothing is allowed to send before that returns.',
  },
  {
    title: 'Publish and measure',
    body: 'Publish the journey, then read recovered ₹ and net margin rather than sends delivered.',
  },
] as const;

export const SERVICE_FAQS = [
  {
    question: 'Is this a managed service or software I run myself?',
    answer:
      'It is software you run yourself, with guided onboarding. You connect Shopify and your own Meta WhatsApp Cloud API credentials, and your number and Meta assets stay in your name. There is no agency retainer and no implementation fee.',
  },
  {
    question: 'What does WhatsApp automation cost in India?',
    answer:
      'Plans are flat INR, starting at ₹1,999/mo plus GST, with 20% off annually and a 14-day free trial. Meta conversation charges are passed through at 0% markup on the published India rate card, so marketing and utility conversations cost what Meta charges.',
  },
  {
    question: 'Do I need my own WhatsApp Business API account?',
    answer:
      'Yes, and that is deliberate. You connect your own Meta WhatsApp Cloud API credentials, so the number, the template library and the quality rating belong to you and move with you if you ever leave.',
  },
  {
    question: 'Can I keep my existing WhatsApp number when I switch?',
    answer:
      'Yes. Because the integration runs on your own Meta credentials, migrating from WATI, AiSensy, Interakt or a CPaaS reseller keeps your existing number and Meta assets. Templates are re-created and re-submitted for approval.',
  },
  {
    question: 'How long does it take to go live?',
    answer:
      'Connecting Shopify and your WhatsApp Cloud API takes under an hour. The variable is Meta template approval, which is usually same-day for correctly categorised utility templates and can take longer for marketing templates.',
  },
] as const;
