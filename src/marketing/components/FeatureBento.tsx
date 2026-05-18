import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BentoTileImage from './BentoTileImage';
import { Stagger, StaggerItem } from './motion';
import { SectionHeading, SecondaryButton } from './ui';

const tiles = [
  {
    imageId: 'flow-builder',
    title: 'AI Form → Flow Builder',
    desc: 'Live automations in ~10 min',
    to: '/features/flow-builder',
    span: 'md:col-span-2 md:row-span-2',
    tall: true,
  },
  {
    imageId: 'meta-manager-library',
    title: 'Meta Manager',
    desc: 'Templates you approve',
    to: '/features/meta-manager',
    span: '',
    tall: false,
  },
  {
    imageId: 'live-chat',
    title: 'Live Chat',
    desc: 'Order context in every thread',
    to: '/features/live-chat',
    span: '',
    tall: false,
  },
  {
    imageId: 'abandoned-cart',
    title: 'Abandoned Cart',
    desc: '3-message WhatsApp recovery',
    to: '/features/abandoned-cart',
    span: '',
    tall: false,
  },
  {
    imageId: 'campaigns-broadcast',
    title: 'Campaigns',
    desc: 'Segments + approved templates',
    to: '/features/campaigns',
    span: 'md:col-span-2',
    tall: false,
  },
  {
    imageId: 'ai-brain',
    title: 'AI Brain',
    desc: 'Catalog-aware replies',
    to: '/features/ai-brain',
    span: '',
    tall: false,
  },
  {
    imageId: 'audience-crm',
    title: 'Audience CRM',
    desc: 'Segments, loyalty, reviews',
    to: '/features/audience-crm',
    span: '',
    tall: false,
  },
  {
    imageId: 'store-engine',
    title: 'Shopify Engine',
    desc: 'Commerce Hub + live sync',
    to: '/features/shopify',
    span: '',
    tall: false,
  },
  {
    imageId: 'order-automations',
    title: 'Order automations',
    desc: 'Paid → shipped → delivered',
    to: '/features/order-automations',
    span: '',
    tall: false,
  },
  {
    imageId: 'analytics',
    title: 'Analytics',
    desc: 'Revenue & read rates',
    to: '/features/analytics',
    span: '',
    tall: false,
  },
];

export default function FeatureBento() {
  return (
    <div>
      <SectionHeading
        eyebrow="Full platform"
        title="Twelve modules. One WhatsApp growth OS."
        subtitle="Every item in the Product menu — inbox, AI, flows, Meta, campaigns, CRM, cart recovery, Shopify, orders, and analytics."
        center
      />
      <Stagger className="grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-4">
        {tiles.map((tile) => (
          <StaggerItem key={tile.title} className={tile.span}>
            <Link to={tile.to} className="group block h-full">
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="marketing-gradient-border relative flex h-full min-h-[160px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-400/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[15px] font-medium text-slate-900">{tile.title}</h3>
                      <p className="mt-1 text-xs text-slate-500">{tile.desc}</p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-[#7C3AED] transition-colors group-hover:bg-[#7C3AED] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <BentoTileImage imageId={tile.imageId} title={tile.title} tall={tile.tall} />
                </div>
              </motion.article>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <SecondaryButton to="/features">View all 12 modules</SecondaryButton>
        <Link to="/features/sequences" className="text-sm font-medium text-[#7C3AED] hover:underline">
          Sequences →
        </Link>
        <Link to="/features/orders" className="text-sm font-medium text-[#7C3AED] hover:underline">
          Orders →
        </Link>
      </div>
    </div>
  );
}
