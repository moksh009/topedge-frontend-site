export interface ResourceLite {
  id: string;
  title: string;
  tools: string[];
  category: 'automation' | 'project' | 'tool' | 'prompt';
  userId: string;
}

export function getRelatedResources(
  current: ResourceLite,
  all: ResourceLite[]
): ResourceLite[] {
  const others = all.filter(r => r.id !== current.id);
  const score = (r: ResourceLite) => {
    let s = 0;
    if (r.category === current.category) s += 5;
    const currentTools = new Set((current.tools || []).map(t => t.toLowerCase()));
    (r.tools || []).forEach(t => {
      if (currentTools.has((t || '').toLowerCase())) s += 3;
    });
    if (r.userId === current.userId) s += 1;
    return s;
  };
  return others
    .map(r => ({ r, s: score(r) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map(x => x.r);
}

