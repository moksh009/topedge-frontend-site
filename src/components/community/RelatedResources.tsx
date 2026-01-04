import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { getRelatedResources, ResourceLite } from '@/utils/recommendations';
import { Link } from 'react-router-dom';

interface Props {
  current: ResourceLite;
}

export default function RelatedResources({ current }: Props) {
  const [items, setItems] = useState<ResourceLite[]>([]);

  useEffect(() => {
    const run = async () => {
      const snap = await getDocs(query(collection(db, 'community_resources'), orderBy('createdAt', 'desc')));
      const all = snap.docs.map(d => {
        const data = d.data() as any;
        return {
          id: d.id,
          title: data.title,
          tools: data.tools || [],
          category: (data.category || 'automation') as ResourceLite['category'],
          userId: data.userId
        } as ResourceLite;
      });
      const related = getRelatedResources(current, all);
      setItems(related);
    };
    run();
  }, [current.id]);

  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-slate-900 mb-4">You Might Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(r => (
          <Link
            key={r.id}
            to={`/community/resource/${r.id}`}
            className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-200 transition-all"
          >
            <div className="h-28 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
              <div className="text-xs font-bold text-slate-400 uppercase">{r.category}</div>
            </div>
            <div className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600">{r.title}</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {(r.tools || []).slice(0, 3).map((t, i) => (
                <span key={i} className="px-2 py-1 text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 rounded">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

