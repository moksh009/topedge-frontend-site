import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { calculateReputation } from '@/utils/reputation';
import { Trophy, User } from 'lucide-react';

interface Profile {
  id: string;
  fullName: string;
  photoURL?: string;
  description?: string;
  github?: string;
  linkedin?: string;
  websiteURL?: string;
}

export default function TopBuilders() {
  const [top, setTop] = useState<
    Array<{ profile: Profile; score: number; tier: 'Builder' | 'Architect' | 'Grandmaster' }>
  >([]);

  useEffect(() => {
    const run = async () => {
      const pSnap = await getDocs(query(collection(db, 'public_profiles'), orderBy('createdAt', 'desc')));
      const profiles = pSnap.docs
        .map(d => ({ id: d.id, ...(d.data() as any) }) as Profile)
        .filter(p => !!p.fullName);

      const rSnap = await getDocs(query(collection(db, 'community_resources'), orderBy('createdAt', 'desc')));
      const byUser: Record<string, { resources: { userId: string; upvotes: number }[] }> = {};
      rSnap.docs.forEach(d => {
        const data = d.data() as any;
        const uid = data.userId as string;
        if (!uid) return;
        if (!byUser[uid]) byUser[uid] = { resources: [] };
        byUser[uid].resources.push({
          userId: uid,
          upvotes: Number((data.upvotes ?? data.stars) || 0)
        });
      });

      const scored = profiles.map(p => {
        const entry = byUser[p.id];
        const resources = entry?.resources || [];
        const rep = calculateReputation(
          {
            bio: p.description,
            photoURL: p.photoURL,
            github: p.github,
            linkedin: p.linkedin,
            websiteURL: p.websiteURL
          },
          resources
        );
        return { profile: p, score: rep.score, tier: rep.tier };
      });

      scored.sort((a, b) => b.score - a.score);
      setTop(scored.slice(0, 3));
    };
    run();
  }, []);

  if (top.length === 0) return null;

  return (
    <div className="mb-0">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Billboard</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {top.map((t, i) => {
          const ring =
            t.tier === 'Grandmaster'
              ? 'ring-2 ring-yellow-300'
              : t.tier === 'Architect'
              ? 'ring-2 ring-blue-300'
              : 'ring-2 ring-slate-200';
          return (
            <div key={t.profile.id} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <div className={`w-16 h-16 rounded-full mx-auto mb-2 overflow-hidden ${ring}`}>
                {t.profile.photoURL ? (
                  <img src={t.profile.photoURL} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </div>
              <div className="text-sm font-bold text-slate-900 line-clamp-1">{t.profile.fullName}</div>
              <div className="text-[10px] text-slate-500">{t.tier} • {t.score} pts</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
