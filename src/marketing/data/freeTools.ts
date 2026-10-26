/** The free tools, in the order the hub shows them. One list feeds the hub,
 *  the footer and the "more free tools" strip on every tool page. */
export type FreeTool = {
  slug: string;
  href: string;
  title: string;
  /** Short name for the footer. */
  short: string;
  body: string;
  tag: string;
  icon: 'compass' | 'truck' | 'cart' | 'link' | 'receipt';
  feature?: boolean;
};

export const TOOLS_PATH = '/tools';

export const FREE_TOOLS: FreeTool[] = [
  {
    slug: 'best-whatsapp-tool-for-shopify',
    href: '/tools/best-whatsapp-tool-for-shopify',
    title: 'Find the best WhatsApp tool for your store',
    short: 'WhatsApp tool finder',
    body: 'Answer six questions and get an honest shortlist of TopEdge, WATI, Interakt, AiSensy and Bitespeed, with the reasons.',
    tag: '2-minute quiz',
    icon: 'compass',
    feature: true,
  },
  {
    slug: 'rto-cost-calculator',
    href: '/tools/rto-cost-calculator',
    title: 'RTO cost calculator',
    short: 'RTO cost calculator',
    body: 'See how much returned COD parcels cost your store every month, and what confirming COD orders on WhatsApp costs instead.',
    tag: 'Calculator',
    icon: 'truck',
  },
  {
    slug: 'cart-recovery-calculator',
    href: '/tools/cart-recovery-calculator',
    title: 'Cart recovery revenue calculator',
    short: 'Cart recovery calculator',
    body: 'Work out the revenue WhatsApp reminders could win back from abandoned carts, and what the messages cost.',
    tag: 'Calculator',
    icon: 'cart',
  },
  {
    slug: 'whatsapp-link-generator',
    href: '/tools/whatsapp-link-generator',
    title: 'WhatsApp link and QR code generator',
    short: 'WhatsApp link generator',
    body: 'Create a click-to-chat link and QR code with a pre-filled message, plus a chat button you can paste into your Shopify theme.',
    tag: 'Generator',
    icon: 'link',
  },
  {
    slug: 'meta-rates',
    href: '/pricing/meta-rates',
    title: 'WhatsApp message cost calculator',
    short: 'WhatsApp cost calculator',
    body: 'Meta’s India rate card with a calculator for your own monthly message volume.',
    tag: 'Calculator',
    icon: 'receipt',
  },
];

export function otherTools(slug: string) {
  return FREE_TOOLS.filter((t) => t.slug !== slug);
}
