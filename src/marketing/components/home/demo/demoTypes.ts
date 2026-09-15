export type DemoPanelId =
  | 'home'
  | 'live-chat'
  | 'flow-builder'
  | 'journeys'
  | 'analytics'
  | 'orders'
  | 'abandoned-carts'
  | 'warranty';

export type DemoNavIcon =
  | 'home'
  | 'message'
  | 'network'
  | 'route'
  | 'bar'
  | 'truck'
  | 'cart'
  | 'shield';

export type DemoNavItem = {
  id: DemoPanelId;
  label: string;
  interactive: boolean;
  section: string;
  icon: DemoNavIcon;
};

export const DEMO_DEFAULT_PANEL: DemoPanelId = 'home';

export function isDemoPanelId(id: string): id is DemoPanelId {
  return (
    id === 'home' ||
    id === 'live-chat' ||
    id === 'flow-builder' ||
    id === 'journeys' ||
    id === 'analytics' ||
    id === 'orders' ||
    id === 'abandoned-carts' ||
    id === 'warranty'
  );
}
