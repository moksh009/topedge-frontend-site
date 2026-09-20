import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { ProductGlow, ProductPageId } from '../../data/productPages';

export type MeshTint = ProductGlow | 'default';

export type MeshKey = ProductPageId | 'features-index' | 'default';

/** AI-generated hero-style meshes (unique color mood per page). */
const MESH_SRC: Record<MeshKey, string> = {
  journeys: '/meshes/journeys.png',
  'flow-builder': '/meshes/flow-builder.png',
  'opt-in-tools': '/meshes/opt-in-tools.png',
  campaigns: '/meshes/campaigns.png',
  'audience-crm': '/meshes/audience-crm.png',
  'tracking-pixel': '/meshes/tracking-pixel.png',
  'live-chat': '/meshes/live-chat.png',
  'ai-brain': '/meshes/ai-brain.png',
  'meta-manager': '/meshes/meta-manager.png',
  'chat-rules': '/meshes/chat-rules.png',
  instagram: '/meshes/instagram.png',
  warranty: '/meshes/warranty.png',
  'profit-loss': '/meshes/profit-loss.png',
  'intent-detection': '/meshes/intent-detection.png',
  'features-index': '/meshes/features-index.png',
  default: '/meshes/features-index.png',
};

/**
 * First-viewport mesh atmosphere, AI image per feature page
 * (same language as homepage `/hero-mesh.png`, different color mood).
 */
export default function FeatureMeshStage({
  mesh = 'default',
  children,
  className,
  fillViewport = true,
}: {
  mesh?: MeshKey;
  /** @deprecated unused, color comes from the AI mesh image */
  tint?: MeshTint;
  children: ReactNode;
  className?: string;
  fillViewport?: boolean;
}) {
  const src = MESH_SRC[mesh] ?? MESH_SRC.default;

  return (
    <div
      className={cn(
        'mkt-pf__stage',
        !fillViewport && 'mkt-pf__stage--compact',
        className,
      )}
    >
      <div
        className="mkt-pf__mesh"
        aria-hidden
        style={{ backgroundImage: `url('${src}')` }}
      />
      <div className="mkt-pf__stage-content">{children}</div>
    </div>
  );
}
