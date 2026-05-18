import {
  LayoutDashboard,
  MessageSquare,
  Workflow,
  Megaphone,
  Send,
  Users,
  Settings,
  Brain,
  Package,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BRAND_LOGO } from '../../assets';

export type MockupNavId =
  | 'dashboard'
  | 'live-chat'
  | 'flow-builder'
  | 'meta-manager'
  | 'campaigns'
  | 'audience'
  | 'intelligence'
  | 'orders'
  | 'commerce'
  | 'settings';

const NAV: { id: MockupNavId; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'live-chat', label: 'Live Chat', icon: MessageSquare },
  { id: 'flow-builder', label: 'Flow Builder', icon: Workflow },
  { id: 'meta-manager', label: 'Meta Manager', icon: Megaphone },
  { id: 'campaigns', label: 'Campaigns', icon: Send },
  { id: 'audience', label: 'Audience', icon: Users },
  { id: 'intelligence', label: 'AI Brain', icon: Brain },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'settings', label: 'Settings', icon: Settings },
];

type Props = {
  activeNav: MockupNavId;
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  heightClass?: string;
  connector?: boolean;
};

export default function DashboardMockupShell({
  activeNav,
  children,
  header,
  className,
  heightClass = 'min-h-[400px] md:min-h-[460px]',
  connector = true,
}: Props) {
  const baseVisible: MockupNavId[] = [
    'dashboard',
    'live-chat',
    'flow-builder',
    'meta-manager',
    'campaigns',
    'audience',
    'settings',
  ];
  const visibleIds = new Set<MockupNavId>([...baseVisible, activeNav]);
  const visibleNav = NAV.filter((n) => visibleIds.has(n.id));

  return (
    <div className={cn('relative flex overflow-hidden bg-white', heightClass, className)}>
      <aside className="relative z-10 hidden w-[200px] shrink-0 flex-col border-r border-slate-200/80 bg-slate-50/90 p-3 sm:flex">
        <div className="mb-5 flex items-center gap-2.5 px-2">
          <img src={BRAND_LOGO} alt="" className="h-8 w-8 rounded-xl object-contain" />
          <span className="text-sm font-bold tracking-tight text-slate-900">TopEdge AI</span>
        </div>
        <nav className="flex-1 space-y-0.5">
          {visibleNav.map((item) => {
            const active = item.id === activeNav;
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={cn(
                  'flex items-center gap-2.5 rounded-2xl px-2.5 py-2 text-xs font-semibold',
                  active ? 'bg-[#ede9fe] text-[#7C3AED]' : 'text-slate-500'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-[#7C3AED]' : 'text-slate-400')} />
                {item.label}
              </div>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-2.5 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] text-[10px] font-bold text-white">
            RS
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold text-slate-800">Store owner</p>
            <p className="truncate text-[9px] text-slate-400">Growth plan</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </div>
      </aside>

      {connector && (
        <div
          aria-hidden
          className="absolute left-[188px] top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-violet-200/80 bg-white shadow-lg shadow-violet-500/20 sm:flex"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#6d28d9]">
            <Workflow className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle, #c4b5fd 1.2px, transparent 1.2px)',
            backgroundSize: '18px 18px',
          }}
        />
        {header && (
          <div className="relative z-10 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-sm">
            {header}
          </div>
        )}
        <div className="relative z-10 flex-1 overflow-hidden p-4 md:p-5">{children}</div>
      </div>
    </div>
  );
}
