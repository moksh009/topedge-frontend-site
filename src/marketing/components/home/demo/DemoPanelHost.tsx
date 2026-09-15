import type { DemoPanelId } from '../demoTypes';
import DemoHomePanel from './panels/DemoHomePanel';
import DemoLiveChatPanel from './panels/DemoLiveChatPanel';
import DemoJourneysPanel from './panels/DemoJourneysPanel';
import DemoAbandonedCartsPanel from './panels/DemoAbandonedCartsPanel';
import DemoAnalyticsPanel from './panels/DemoAnalyticsPanel';
import DemoFlowBuilderPanel from './panels/DemoFlowBuilderPanel';
import DemoOrdersPanel from './panels/DemoOrdersPanel';
import DemoWarrantyPanel from './panels/DemoWarrantyPanel';

export default function DemoPanelHost({ activePanelId }: { activePanelId: DemoPanelId }) {
  switch (activePanelId) {
    case 'home':
      return <DemoHomePanel />;
    case 'live-chat':
      return <DemoLiveChatPanel />;
    case 'flow-builder':
      return <DemoFlowBuilderPanel />;
    case 'journeys':
      return <DemoJourneysPanel />;
    case 'analytics':
      return <DemoAnalyticsPanel />;
    case 'orders':
      return <DemoOrdersPanel />;
    case 'abandoned-carts':
      return <DemoAbandonedCartsPanel />;
    case 'warranty':
      return <DemoWarrantyPanel />;
    default:
      return null;
  }
}
