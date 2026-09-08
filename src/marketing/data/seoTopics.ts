export type SeoTopic = {
  slug: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  title: string;
  description: string;
  keywords: string;
  answerFirst: string;
  sections: { h2: string; body: string }[];
  bullets: string[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

export const SEO_TOPICS: Record<string, SeoTopic> = {
  'whatsapp-cart-recovery': {
    slug: 'whatsapp-cart-recovery',
    eyebrow: 'Cart recovery',
    h1: 'WhatsApp cart recovery for Shopify',
    subtitle:
      'Recover abandoned carts on WhatsApp with Meta-approved templates, live Shopify cart data, and a three-message sequence built for Indian D2C.',
    title: 'WhatsApp Cart Recovery for Shopify | TopEdge',
    description:
      'Abandoned cart recovery on WhatsApp for Shopify India — timing, Meta templates, COD-aware journeys, and recovery ₹ tracking in one workspace.',
    keywords:
      'WhatsApp cart recovery, abandoned cart recovery WhatsApp, Shopify cart recovery, ecommerce automation India',
    answerFirst:
      'WhatsApp cart recovery is ecommerce automation that detects Shopify abandoned checkouts and sends Meta-approved WhatsApp messages with product, price, and a return-to-checkout link. For Indian D2C, it typically outperforms email because shoppers read WhatsApp faster — especially on COD-heavy catalogs.',
    sections: [
      {
        h2: 'Why abandoned cart recovery belongs on WhatsApp',
        body: 'Email still matters for newsletters, but cart abandonment is a short-window problem. A WhatsApp reminder within 30–60 minutes, grounded in live Shopify cart lines and ₹ totals, gives shoppers a one-tap path back to checkout. Pair it with a second value nudge and a final close within 72 hours — without spamming beyond Meta policy.',
      },
      {
        h2: 'A three-message sequence that respects Meta rules',
        body: 'Message one is a gentle utility-friendly reminder. Message two clarifies shipping, size, or COD. Message three offers human help via Live Chat rather than endless discounts. Gate every send until templates are APPROVED so drafts never blast customers.',
      },
      {
        h2: 'Measure recovery ₹, not vanity opens',
        body: 'Track sent → read → clicked → paid against Shopify orders. That is how you know cart recovery software is paying for itself — not just message volume.',
      },
    ],
    bullets: [
      'Shopify abandon events trigger journeys automatically',
      'Product cards and checkout links from live store data',
      'COD vs prepaid branching inside the same canvas',
      'Shared inbox takeover when a shopper replies',
    ],
    faqs: [
      {
        question: 'What is WhatsApp cart recovery for Shopify?',
        answer:
          'It is automated WhatsApp messaging triggered by abandoned Shopify checkouts, using Meta-approved templates and live cart data to bring shoppers back to pay.',
      },
      {
        question: 'How many WhatsApp cart recovery messages should I send?',
        answer:
          'Most Indian D2C brands see strong results with two to three messages over 48–72 hours. More than that often hurts trust and risks template quality.',
      },
      {
        question: 'Does TopEdge require Zapier for cart recovery?',
        answer:
          'No. TopEdge connects Shopify over OAuth and Meta WhatsApp Cloud API directly, then runs journeys and Live Chat in one workspace.',
      },
    ],
    related: [
      { label: 'Journey builder', href: '/features/journeys' },
      { label: 'COD confirmation', href: '/cod-confirmation-whatsapp' },
      { label: 'Cart recovery playbook', href: '/blog/whatsapp-abandoned-cart-recovery-shopify' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  'cod-confirmation-whatsapp': {
    slug: 'cod-confirmation-whatsapp',
    eyebrow: 'COD / RTO',
    h1: 'COD confirmation on WhatsApp',
    subtitle:
      'Confirm Cash on Delivery orders before you ship — cut RTO risk with utility templates, Shopify order context, and operator takeover.',
    title: 'COD Confirmation on WhatsApp | Reduce RTO Shopify',
    description:
      'WhatsApp COD confirmation for Shopify India: confirm, reschedule, or cancel before dispatch to reduce RTO while keeping conversion high.',
    keywords:
      'COD confirmation WhatsApp, reduce RTO Shopify, COD WhatsApp automation, Cash on Delivery confirmation India',
    answerFirst:
      'COD confirmation on WhatsApp asks buyers to confirm, reschedule, or cancel a Cash on Delivery order before you ship. Indian Shopify brands use it to reduce return-to-origin (RTO) while keeping the conversion lift COD provides at checkout.',
    sections: [
      {
        h2: 'Confirm before you pack',
        body: 'Trigger confirmation right after order creation. Show order number, items, and ₹ COD amount from Shopify. Offer clear reply paths — YES / reschedule / cancel — and escalate unsure buyers to Live Chat instead of shipping blindly.',
      },
      {
        h2: 'Branch journeys on payment method',
        body: 'Prepaid and COD should not share the same tone. Condition WhatsApp journeys on COD status so recovery and confirmation stay honest and Meta-safe.',
      },
      {
        h2: 'Pair with cart recovery',
        body: 'Cart recovery wins the order; COD confirmation protects the margin. Run both from the same Shopify + Meta workspace so ops is not juggling three tools.',
      },
    ],
    bullets: [
      'Utility-friendly COD confirm templates',
      'Shopify order # and COD amount in-thread',
      'Pause automation when an agent takes over',
      'Transparent Meta utility rates on pricing',
    ],
    faqs: [
      {
        question: 'Does COD confirmation on WhatsApp reduce RTO?',
        answer:
          'Yes — confirming intent before dispatch typically cuts failed deliveries and refusal-on-delivery. Exact lift varies by category, AOV, and follow-up policy.',
      },
      {
        question: 'Is COD confirmation a marketing or utility message?',
        answer:
          'Order confirmation and shipping-related COD checks often qualify as utility when they follow Meta’s category rules. Always submit templates for approval before automating.',
      },
    ],
    related: [
      { label: 'COD solution page', href: '/solutions/cod' },
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'RTO playbook', href: '/blog/how-to-reduce-rto-with-whatsapp-cod-confirmation' },
      { label: 'Journeys', href: '/features/journeys' },
    ],
  },
  'shopify-whatsapp-integration': {
    slug: 'shopify-whatsapp-integration',
    eyebrow: 'Integrations',
    h1: 'Shopify WhatsApp integration',
    subtitle:
      'Connect Shopify OAuth and Meta WhatsApp Cloud API in one workspace — carts, orders, catalogs, and templates without duct-taping tools.',
    title: 'Shopify WhatsApp Integration | Meta Cloud API',
    description:
      'Native Shopify WhatsApp integration for Indian ecommerce: sync carts and orders, approve Meta templates, and run WhatsApp automation in TopEdge.',
    keywords:
      'Shopify WhatsApp integration, WhatsApp for Shopify, Meta Cloud API Shopify, ecommerce WhatsApp automation',
    answerFirst:
      'A Shopify WhatsApp integration connects your store events (carts, orders, customers, catalog) to Meta’s WhatsApp Cloud API so you can automate cart recovery, COD confirmation, order updates, and support with live store data — not generic chatbot replies.',
    sections: [
      {
        h2: 'What syncs from Shopify',
        body: 'Products, variants, prices, abandoned checkouts, orders, and COD flags flow into TopEdge after OAuth. Agents see order context beside WhatsApp threads; journeys fire from real store events.',
      },
      {
        h2: 'What Meta WhatsApp Cloud API adds',
        body: 'Official template messaging, quality ratings, and category-based rates. TopEdge’s Meta manager tracks approvals so automation never sends drafts.',
      },
      {
        h2: 'Go live without a three-month project',
        body: 'Most stores connect Shopify and WhatsApp credentials in about fifteen minutes. Meta business verification and first template approvals are the usual wait — not engineering.',
      },
    ],
    bullets: [
      'One-click Shopify OAuth',
      'Meta Cloud API credentials in-dashboard',
      'Template approval tracking',
      'Live Chat + journeys on the same data',
    ],
    faqs: [
      {
        question: 'How do I connect Shopify to WhatsApp?',
        answer:
          'Use a platform that supports Shopify OAuth and Meta WhatsApp Cloud API. In TopEdge, connect the store, add WABA credentials, approve templates, then publish journeys.',
      },
      {
        question: 'Do I need Zapier for Shopify WhatsApp automation?',
        answer:
          'Not with TopEdge. Native sync covers carts, orders, and catalog for standard ecommerce automation flows.',
      },
    ],
    related: [
      { label: 'Integrations overview', href: '/integrations' },
      { label: 'Shopify connection feature', href: '/features/shopify' },
      { label: 'Meta template manager', href: '/features/meta-manager' },
      { label: 'What to automate first', href: '/blog/shopify-whatsapp-automation-what-to-automate-first' },
    ],
  },
};

export function getSeoTopic(slug: string) {
  return SEO_TOPICS[slug] ?? null;
}
