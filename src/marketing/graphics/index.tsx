import type { ComponentType } from 'react';
import HeroGraphic from './HeroGraphic';
import FlowBuilderGraphic from './FlowBuilderGraphic';
import MetaManagerGraphic from './MetaManagerGraphic';
import AbandonedCartGraphic from './AbandonedCartGraphic';
import LiveChatGraphic from './LiveChatGraphic';
import AiBrainGraphic from './AiBrainGraphic';
import CampaignsGraphic from './CampaignsGraphic';
import StoreEngineGraphic from './StoreEngineGraphic';
import OrderAutomationGraphic from './OrderAutomationGraphic';
import IntegrationsGraphic from './IntegrationsGraphic';
import AnalyticsGraphic from './AnalyticsGraphic';
import AudienceCrmGraphic from './AudienceCrmGraphic';
import SequencesGraphic from './SequencesGraphic';
import OrdersGraphic from './OrdersGraphic';

export type FeatureGraphicId =
  | 'hero'
  | 'flow-builder'
  | 'meta-manager'
  | 'abandoned-cart'
  | 'live-chat'
  | 'ai-brain'
  | 'campaigns'
  | 'sequences'
  | 'shopify'
  | 'orders'
  | 'order-automations'
  | 'integrations'
  | 'analytics'
  | 'audience-crm';

const GRAPHICS: Record<FeatureGraphicId, ComponentType> = {
  hero: HeroGraphic,
  'flow-builder': FlowBuilderGraphic,
  'meta-manager': MetaManagerGraphic,
  'abandoned-cart': AbandonedCartGraphic,
  'live-chat': LiveChatGraphic,
  'ai-brain': AiBrainGraphic,
  campaigns: CampaignsGraphic,
  sequences: SequencesGraphic,
  shopify: StoreEngineGraphic,
  orders: OrdersGraphic,
  'order-automations': OrderAutomationGraphic,
  integrations: IntegrationsGraphic,
  analytics: AnalyticsGraphic,
  'audience-crm': AudienceCrmGraphic,
};

export default function FeatureGraphic({ id }: { id: FeatureGraphicId }) {
  const Graphic = GRAPHICS[id];
  if (!Graphic) return null;
  return <Graphic />;
}

export {
  HeroGraphic,
  FlowBuilderGraphic,
  MetaManagerGraphic,
  AbandonedCartGraphic,
  LiveChatGraphic,
  AiBrainGraphic,
  CampaignsGraphic,
  StoreEngineGraphic,
  OrderAutomationGraphic,
  IntegrationsGraphic,
};
