import type { ComponentType } from 'react';
import LiveChatMockup from '../mockups/LiveChatMockup';
import AiBrainMockup from '../mockups/AiBrainMockup';
import FlowBuilderMockup from '../mockups/FlowBuilderMockup';
import MetaManagerMockup from '../mockups/MetaManagerMockup';
import CampaignMockup from '../mockups/CampaignMockup';
import AudienceCrmMockup from '../mockups/AudienceCrmMockup';
import SequencesMockup from '../mockups/SequencesMockup';
import AbandonedCartMockup from '../mockups/AbandonedCartMockup';
import StoreEngineMockup from '../mockups/StoreEngineMockup';
import OrdersMockup from '../mockups/OrdersMockup';
import OrderAutomationMockup from '../mockups/OrderAutomationMockup';
import AnalyticsMockup from '../mockups/AnalyticsMockup';
import FlowBuilderShowcase from './FlowBuilderShowcase';
import { MockupDisplayProvider } from '../mockups/shared/MockupDisplayContext';
import { cn } from '@/lib/utils';

const MOCKUPS: Record<string, ComponentType> = {
  'live-chat': LiveChatMockup,
  'ai-brain': AiBrainMockup,
  'flow-builder': FlowBuilderMockup,
  'meta-manager': MetaManagerMockup,
  campaigns: CampaignMockup,
  'audience-crm': AudienceCrmMockup,
  sequences: SequencesMockup,
  'abandoned-cart': AbandonedCartMockup,
  shopify: StoreEngineMockup,
  orders: OrdersMockup,
  'order-automations': OrderAutomationMockup,
  analytics: AnalyticsMockup,
};

type Props = {
  slug: string;
  className?: string;
  /** Compact scale for side panels */
  compact?: boolean;
  /** Single shadow layer — no float/glow (homepage product stories) */
  stage?: boolean;
};

export default function FeatureMockupBySlug({ slug, className, compact, stage }: Props) {
  const Mockup = MOCKUPS[slug];
  if (!Mockup) return null;

  const inner = (
    <div
      className={cn(
        'feature-mockup-root w-full',
        compact && 'feature-mockup-compact origin-top scale-[0.9] sm:scale-[0.94]',
        className
      )}
    >
      <Mockup />
      {slug === 'flow-builder' && !compact && (
        <div className="mt-10">
          <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
            AI Form → live canvas
          </p>
          <FlowBuilderShowcase />
        </div>
      )}
    </div>
  );

  if (stage) {
    return (
      <MockupDisplayProvider float={false} glow={false}>
        <div className="marketing-mockup-stage overflow-hidden rounded-[1.25rem] bg-white">{inner}</div>
      </MockupDisplayProvider>
    );
  }

  return inner;
}

export function hasFeatureMockup(slug: string) {
  return slug in MOCKUPS;
}
