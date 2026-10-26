import { Link } from 'react-router-dom';
import { Compass, Link2, Receipt, ShoppingCart, Truck } from 'lucide-react';
import type { FreeTool } from '../../data/freeTools';
import '../../styles/tools.css';

const ICONS = {
  compass: Compass,
  truck: Truck,
  cart: ShoppingCart,
  link: Link2,
  receipt: Receipt,
};

export function ToolCard({ tool }: { tool: FreeTool }) {
  const Icon = ICONS[tool.icon];
  return (
    <Link to={tool.href} className={`mkt-tool-card${tool.feature ? ' is-feature' : ''}`}>
      <span className="mkt-tool-card__icon" aria-hidden>
        <Icon size={20} strokeWidth={2} />
      </span>
      <span className="mkt-tool-card__tag">Free · {tool.tag}</span>
      <span className="mkt-tool-card__title">{tool.title}</span>
      <span className="mkt-tool-card__body">{tool.body}</span>
      <span className="mkt-tool-card__cta">Open the tool →</span>
    </Link>
  );
}

export default function ToolCards({ tools, columns = 2 }: { tools: FreeTool[]; columns?: 2 | 3 }) {
  return (
    <ul className={`mkt-tools-grid${columns === 3 ? ' is-3' : ''}`}>
      {tools.map((t) => (
        <li key={t.slug}>
          <ToolCard tool={t} />
        </li>
      ))}
    </ul>
  );
}
