import { DASH_DOCS } from '../constants';
import {
  Brain,
  Workflow,
  Megaphone,
  MessageSquare,
  Users,
  ShoppingBag,
  Package,
  BarChart3,
  Inbox,
  BookOpen,
  HelpCircle,
  FileText,
  GitBranch,
  ShoppingCart,
  Rocket,
  Headphones,
  LineChart,
  Building2,
  Calculator,
  Mail,
  type LucideIcon,
} from 'lucide-react';

export type MegaMenuItem = {
  label: string;
  desc: string;
  to?: string;
  href?: string;
  icon: LucideIcon;
};

export type MegaMenuSection = {
  title: string;
  items: MegaMenuItem[];
};

/** Product mega menu — matches marketing feature hubs */
export const productMegaMenu: MegaMenuSection[] = [
  {
    title: 'WhatsApp & AI',
    items: [
      { label: 'Live Chat', desc: 'Unified inbox for WhatsApp', to: '/features/live-chat', icon: Inbox },
      { label: 'AI Brain', desc: 'Intent, persona, knowledge base', to: '/features/ai-brain', icon: Brain },
      {
        label: 'AI Form → Flow Builder',
        desc: 'Live flow in ~10 min, no code',
        to: '/features/flow-builder',
        icon: Workflow,
      },
      { label: 'Meta Manager', desc: 'Templates → Meta approval', to: '/features/meta-manager', icon: Megaphone },
    ],
  },
  {
    title: 'Growth',
    items: [
      { label: 'Campaigns', desc: 'Broadcasts & sequences', to: '/features/campaigns', icon: MessageSquare },
      { label: 'Audience CRM', desc: 'Leads, segments, loyalty', to: '/features/audience-crm', icon: Users },
      { label: 'Sequences', desc: 'Follow-up message flows', to: '/features/sequences', icon: GitBranch },
      {
        label: 'Abandoned Cart',
        desc: 'Recover carts on WhatsApp',
        to: '/features/abandoned-cart',
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: 'Store',
    items: [
      { label: 'Shopify Engine', desc: 'Commerce Hub workspace', to: '/features/shopify', icon: ShoppingBag },
      { label: 'Orders', desc: 'Order sync & management', to: '/features/orders', icon: Package },
      { label: 'Order automations', desc: 'Transactional WhatsApp', to: '/features/order-automations', icon: Package },
      { label: 'Analytics', desc: 'Revenue-oriented insights', to: '/features/analytics', icon: BarChart3 },
    ],
  },
];

export const featureHubSections = productMegaMenu.map((hub) => ({
  title: hub.title,
  slugs: hub.items.map((item) => item.to!.replace('/features/', '')),
}));

/** Solutions — audience + high-intent use cases */
export const solutionsMegaMenu: MegaMenuSection[] = [
  {
    title: 'Built for',
    items: [
      {
        label: 'D2C Founders',
        desc: 'Cart recovery, COD confirm, and AI inbox — live in a day',
        to: '/customers',
        icon: Rocket,
      },
      {
        label: 'Growth marketers',
        desc: 'Segments, broadcasts, and sequences on approved templates',
        to: '/customers',
        icon: LineChart,
      },
      {
        label: 'Support teams',
        desc: 'One WhatsApp inbox with Shopify order context',
        to: '/customers',
        icon: Headphones,
      },
      {
        label: 'Agencies',
        desc: 'Multi-brand WhatsApp ops with Meta-safe workflows',
        to: '/customers',
        icon: Building2,
      },
    ],
  },
  {
    title: 'Popular outcomes',
    items: [
      {
        label: 'Abandoned cart recovery',
        desc: '~32% recovery · 15m → 2h → 24h nudges',
        to: '/features/abandoned-cart',
        icon: ShoppingCart,
      },
      {
        label: 'COD confirmation',
        desc: 'Reduce RTO with WhatsApp COD flows',
        to: '/features/flow-builder',
        icon: Workflow,
      },
      {
        label: 'Order status updates',
        desc: 'Paid → shipped → delivered automatically',
        to: '/features/order-automations',
        icon: Package,
      },
      {
        label: 'AI sales inbox',
        desc: 'Suggest replies trained on your catalog',
        to: '/features/live-chat',
        icon: Inbox,
      },
    ],
  },
];

export type ResourceMenuItem = MegaMenuItem & { external?: boolean };

export const resourcesMegaMenu: ResourceMenuItem[] = [
  { label: 'Help Center', desc: 'Guides for setup, Meta, and Shopify', href: DASH_DOCS, icon: HelpCircle, external: true },
  { label: 'Documentation', desc: 'API, webhooks, and workspace reference', href: DASH_DOCS, icon: BookOpen, external: true },
  { label: 'Blog', desc: 'Playbooks for Indian D2C on WhatsApp', to: '/blog', icon: FileText },
  { label: 'Contact', desc: 'Talk to our team — India timezone friendly', to: '/contact', icon: Mail },
];
