import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { calculateReputation } from '@/utils/reputation';
import { Trophy, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useCommunityCache } from '@/contexts/CommunityCacheContext';
import { EmailService } from '@/services/emailService';
import { Link } from 'react-router-dom';
import { TopBuildersSkeleton } from '@/components/ui/Skeleton';

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
  const { user } = useAuth();
  const { cache, setCachedTopBuilders } = useCommunityCache();
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState<
    Array<{ profile: Profile; score: number; tier: 'Builder' | 'Architect' | 'Grandmaster' }>
  >([]);

  useEffect(() => {
    const run = async () => {
      // Check cache first
      if (cache.topBuilders && cache.topBuilders.length > 0) {
        setTop(cache.topBuilders);
        // Check if cache is stale (e.g. 10 minutes)
        const lastFetched = cache.lastFetched?.topBuilders || 0;
        if (Date.now() - lastFetched < 10 * 60 * 1000) {
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      
      try {
        // 1. Try fetching from public API (works for guests)
        const emailService = new EmailService();
        const apiData = await emailService.getPublicStats();

        if (apiData && apiData.success && apiData.topProfiles && apiData.topProfiles.length > 0) {
          // Map API data to component structure
          const mapped = apiData.topProfiles.map((p: any) => ({
            profile: {
              id: p.id,
              fullName: p.fullName,
              photoURL: p.photoURL,
              description: p.description || p.bio,
              github: p.github,
              linkedin: p.linkedin,
              websiteURL: p.websiteURL
            },
            score: p.score,
            tier: p.tier
          }));
          setTop(mapped);
          setCachedTopBuilders(mapped);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("API fetch failed in TopBuilders", e);
      }

      // 2. Fallback to Firestore (skip for guests to avoid permission errors)
      // Note: Rules allow public read for public_profiles, so guests can fetch too.
      
      try {
        const pSnap = await getDocs(
          query(collection(db, 'public_profiles'), orderBy('createdAt', 'desc'), limit(100))
        );
        const profiles = pSnap.docs
          .map(d => ({ id: d.id, ...(d.data() as any) }) as Profile)
          .filter(p => !!p.fullName);

        const rSnap = await getDocs(
          query(collection(db, 'community_resources'), orderBy('createdAt', 'desc'), limit(200))
        );
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
        const finalTop = scored.slice(0, 3);
        setTop(finalTop);
        setCachedTopBuilders(finalTop);
      } catch (error) {
        console.error("Firestore fetch failed in TopBuilders", error);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [user]);

  if (loading) return <TopBuildersSkeleton />;
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
            <Link to={`/community/profile/${t.profile.id}`} className="block">
              <motion.div
                key={t.profile.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 text-center cursor-pointer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
