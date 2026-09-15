import {
  BarChart3,
  GitBranch,
  Home,
  MessageSquare,
  Network,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import clsx from 'clsx';
import { DEMO_NAV_ITEMS } from './demoNav';
import { isDemoPanelId, type DemoPanelId, type DemoNavIcon } from './demoTypes';

const ICONS: Record<DemoNavIcon, typeof Home> = {
  home: Home,
  message: MessageSquare,
  network: Network,
  route: GitBranch,
  bar: BarChart3,
  truck: Truck,
  cart: ShoppingCart,
  shield: ShieldCheck,
};

type Props = {
  activePanelId: DemoPanelId;
  onSelectPanel: (id: DemoPanelId) => void;
};

/** Uses real dashboard `app-sidebar*` class names + copied sidebar-nav.css */
export default function DemoSidebar({ activePanelId, onSelectPanel }: Props) {
  const sections = [...new Set(DEMO_NAV_ITEMS.map((i) => i.section))];

  return (
    <aside className="app-sidebar demo-sidebar" aria-label="Product preview navigation">
      <div className="demo-sidebar__brand">
        <img src="/brand-mark.png" alt="" width={22} height={22} decoding="async" />
        <div className="demo-sidebar__brand-text">
          <strong>TopEdge</strong>
          <span>Glow Skin Co.</span>
        </div>
      </div>
      <nav className="demo-sidebar__nav">
        {sections.map((section) => (
          <div key={section} className="demo-sidebar__section">
            <div className="demo-sidebar__section-title">{section}</div>
            {DEMO_NAV_ITEMS.filter((i) => i.section === section).map((item) => {
              const Icon = ICONS[item.icon];
              const active = item.id === activePanelId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={clsx('app-sidebar-nav-item', active && 'app-sidebar-nav-item--active')}
                  onClick={() => {
                    if (isDemoPanelId(item.id)) onSelectPanel(item.id);
                  }}
                >
                  <Icon
                    className={clsx(
                      'app-sidebar-nav-item__icon',
                      active ? 'app-sidebar-nav-item__icon--active' : 'app-sidebar-nav-item__icon--default',
                    )}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="app-sidebar-nav-item__label">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
