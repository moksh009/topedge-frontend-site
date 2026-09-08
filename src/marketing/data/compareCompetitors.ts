export type CompareCompetitor = {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  subtitle: string;
  answerFirst: string;
  differentiators: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

export const COMPARE_COMPETITORS: Record<string, CompareCompetitor> = {
  wati: {
    slug: 'wati',
    name: 'WATI',
    title: 'TopEdge vs WATI for Shopify India',
    description:
      'Compare TopEdge and WATI for Shopify WhatsApp automation — cart recovery, COD, inbox, and Meta-safe journeys built for Indian D2C.',
    keywords: 'TopEdge vs WATI, WATI alternative India, Shopify WhatsApp WATI, cart recovery WhatsApp',
    h1: 'TopEdge vs WATI',
    subtitle:
      'Both help brands message on WhatsApp. TopEdge is built around Shopify store data, cart recovery journeys, and COD-first Indian ecommerce ops.',
    answerFirst:
      'Choose TopEdge over a generic WhatsApp BSP inbox when your primary job is Shopify cart recovery, COD confirmation, and shared support with live order context — not just broadcasts and chat widgets.',
    differentiators: [
      {
        title: 'Shopify-native journeys',
        body: 'Abandoned carts, COD status, and order events drive TopEdge journeys — not only contact lists and manual broadcasts.',
      },
      {
        title: 'Recovery math you can show finance',
        body: 'Track sent → paid recovery ₹ alongside transparent Meta pass-through rates on pricing.',
      },
      {
        title: 'Inbox with order context',
        body: 'Agents see Shopify order # and COD flags beside the thread so WISMO chats resolve faster.',
      },
    ],
    faqs: [
      {
        question: 'Is TopEdge a WATI alternative?',
        answer:
          'Yes for Shopify-first Indian D2C teams that need cart recovery and COD workflows with Meta Cloud API — evaluate inbox, pricing, and journey depth side by side.',
      },
      {
        question: 'Can I migrate from WATI?',
        answer:
          'Most teams reconnect Shopify + Meta, re-approve key templates, and republish recovery journeys. Contact us for a guided cutover.',
      },
    ],
    related: [
      { label: 'All comparisons', href: '/compare' },
      { label: 'Cart recovery', href: '/whatsapp-cart-recovery' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  interakt: {
    slug: 'interakt',
    name: 'Interakt',
    title: 'TopEdge vs Interakt for Shopify',
    description:
      'TopEdge vs Interakt for Shopify WhatsApp marketing — abandoned cart recovery, COD confirmation, AI inbox, and Meta templates for India.',
    keywords: 'TopEdge vs Interakt, Interakt alternative, Shopify WhatsApp Interakt, WhatsApp automation India',
    h1: 'TopEdge vs Interakt',
    subtitle:
      'Interakt is a popular Shopify WhatsApp app. TopEdge focuses on operator-grade journeys, Live Chat with order context, and transparent Meta rates.',
    answerFirst:
      'If you need Shopify WhatsApp automation with deep cart recovery journeys, COD branching, and a shared inbox tied to orders, compare TopEdge’s workspace against Interakt’s marketing + notifications feature set.',
    differentiators: [
      {
        title: 'Journey canvas with Meta gates',
        body: 'Visual journeys that refuse to send until templates are approved — built for teams burned by accidental drafts.',
      },
      {
        title: 'Catalog-grounded AI',
        body: 'AI Brain answers from live Shopify SKUs and ₹ prices, then hands off to humans cleanly.',
      },
      {
        title: 'Agency-ready playbooks',
        body: 'Reuse recovery and COD patterns across brands without rebuilding from scratch.',
      },
    ],
    faqs: [
      {
        question: 'Is TopEdge an Interakt alternative for Shopify?',
        answer:
          'Yes for brands prioritizing cart recovery, COD RTO control, and Shopify order-aware support on WhatsApp.',
      },
    ],
    related: [
      { label: 'Integrations', href: '/shopify-whatsapp-integration' },
      { label: 'Features', href: '/features' },
      { label: 'Compare hub', href: '/compare' },
    ],
  },
  bitespeed: {
    slug: 'bitespeed',
    name: 'Bitespeed',
    title: 'TopEdge vs Bitespeed | WhatsApp Shopify',
    description:
      'Compare TopEdge and Bitespeed for WhatsApp ecommerce automation on Shopify — recovery, COD, campaigns, and inbox for Indian D2C.',
    keywords: 'TopEdge vs Bitespeed, Bitespeed alternative, WhatsApp Shopify automation, cart recovery India',
    h1: 'TopEdge vs Bitespeed',
    subtitle:
      'Both target Indian ecommerce on WhatsApp. TopEdge emphasizes Shopify sync, Meta template hygiene, and recovery journeys you can audit.',
    answerFirst:
      'Pick TopEdge when you want one workspace for Shopify data, Meta-approved sends, cart recovery, COD confirmation, and Live Chat — with clear pricing and Meta rate pass-through.',
    differentiators: [
      {
        title: 'Honest Meta messaging',
        body: 'Template statuses are first-class. Journeys wait for APPROVED before any customer send.',
      },
      {
        title: 'Operator UX',
        body: 'Built for founders and support leads who live between Shopify admin and WhatsApp all day.',
      },
      {
        title: 'Free trial with real volume',
        body: 'Evaluate recovery and inbox on your catalog — not a slide deck.',
      },
    ],
    faqs: [
      {
        question: 'Who should choose TopEdge over Bitespeed?',
        answer:
          'Shopify D2C teams that want cart recovery + COD + shared inbox in one Meta-safe product, with transparent rates.',
      },
    ],
    related: [
      { label: 'Customers', href: '/customers' },
      { label: 'COD confirmation', href: '/cod-confirmation-whatsapp' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
};

export function getCompareCompetitor(slug: string) {
  return COMPARE_COMPETITORS[slug] ?? null;
}
