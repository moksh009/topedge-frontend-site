import type { DemoNavItem } from './demoTypes';
import { DEMO_DEFAULT_PANEL } from './demoTypes';

export { DEMO_DEFAULT_PANEL };

/** Merchant sidebar labels (IG Automation removed from marketing preview). */
export const DEMO_NAV_ITEMS: DemoNavItem[] = [
  { id: 'home', label: 'Dashboard', interactive: true, section: 'Main', icon: 'home' },
  { id: 'live-chat', label: 'Live Chat', interactive: true, section: 'Main', icon: 'message' },
  { id: 'flow-builder', label: 'Flow Builder', interactive: true, section: 'Automation', icon: 'network' },
  { id: 'journeys', label: 'Journeys', interactive: true, section: 'Automation', icon: 'route' },
  { id: 'analytics', label: 'Analytics', interactive: true, section: 'Intelligence', icon: 'bar' },
  { id: 'orders', label: 'Orders', interactive: true, section: 'Store', icon: 'truck' },
  { id: 'abandoned-carts', label: 'Abandoned carts', interactive: true, section: 'Store', icon: 'cart' },
  { id: 'warranty', label: 'Warranty', interactive: true, section: 'Store', icon: 'shield' },
];
