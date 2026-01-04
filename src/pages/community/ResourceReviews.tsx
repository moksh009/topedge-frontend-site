import React, { useEffect, useState } from 'react';
import { Star, Loader2, MessageSquare, UserCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Review = {
  id: string;
  userId: string;
  userName?: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  createdAt?: any;
};

export default function ResourceReviews({ resourceId }: { resourceId: string }) {
  const { user, userProfile } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avg, setAvg] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'community_resources', resourceId, 'reviews'),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      
      // Fetch user details for each review to show name/photo
      const items = await Promise.all(snap.docs.map(async (d) => {
        const data = d.data();
        let userName = 'Anonymous';
        let userPhoto = '';
        
        // Try to fetch user profile
        try {
            const userDoc = await getDoc(doc(db, 'public_profiles', data.userId));
            if (userDoc.exists()) {
                userName = userDoc.data().fullName || 'Anonymous';
                userPhoto = userDoc.data().photoURL || '';
            }
        } catch (e) {
            console.error("Error fetching review user:", e);
        }

        return { 
            id: d.id, 
            ...data,
            userName,
            userPhoto
        } as Review;
      }));

      setReviews(items);
      const ratings = items.map(r => r.rating).filter(n => typeof n === 'number');
      const c = ratings.length;
      const a = c > 0 ? ratings.reduce((t, n) => t + n, 0) / c : 0;
      setCount(c);
      setAvg(a);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [resourceId]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating < 1) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'community_resources', resourceId, 'reviews'), {
        userId: user.uid,
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp()
      });
      try {
        const rDoc = await getDoc(doc(db, 'community_resources', resourceId));
        if (rDoc.exists()) {
          const rData = rDoc.data() as any;
          const ownerId = rData.userId as string;
          if (ownerId && ownerId !== user.uid) {
            await addDoc(collection(db, 'notifications'), {
              recipientId: ownerId,
              senderId: user.uid,
              senderName: userProfile?.fullName || user.displayName || user.email || 'User',
              senderPhoto: userProfile?.photoURL || user.photoURL || '',
              type: 'review',
              resourceId,
              resourceTitle: rData.title || '',
              read: false,
              createdAt: serverTimestamp()
            });
          }
        }
      } catch (err) {
        console.error('Notify review failed', err);
      }
      setRating(0);
      setHover(0);
      setComment('');
      await fetchReviews();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            Community Reviews
        </h3>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <div className="flex">
             {[1,2,3,4,5].map(n => (
                 <Star key={n} className={cn("w-4 h-4", n <= Math.round(avg) ? "text-yellow-400 fill-current" : "text-slate-200")} />
             ))}
          </div>
          <span className="text-sm font-bold text-slate-700 ml-1">
            {count > 0 ? `${avg.toFixed(1)}` : '0.0'}
          </span>
          <span className="text-xs text-slate-400 font-medium border-l border-slate-200 pl-2 ml-1">
             {count} {count === 1 ? 'Review' : 'Reviews'}
          </span>
        </div>
      </div>

      {/* --- SUBMIT REVIEW FORM --- */}
      <div className="bg-slate-50/50 rounded-[1.5rem] border border-slate-200 p-1">
        {user ? (
            <div className="bg-white rounded-[1.3rem] p-6 shadow-sm border border-slate-100">
                <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <div className="shrink-0">
                        {userProfile?.photoURL ? (
                            <img src={userProfile.photoURL} alt="You" className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <form onSubmit={submitReview} className="flex-1 space-y-4">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Rating</p>
                            <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map(n => (
                                <button
                                    key={n}
                                    type="button"
                                    onMouseEnter={() => setHover(n)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(n)}
                                    className="p-1 -ml-1 transition-transform hover:scale-110 focus:outline-none"
                                >
                                    <Star
                                    className={cn(
                                        "w-8 h-8 transition-colors duration-200",
                                        (hover || rating) >= n 
                                            ? "text-yellow-400 fill-current drop-shadow-sm" 
                                            : "text-slate-200"
                                    )}
                                    />
                                </button>
                                ))}
                                <span className="ml-2 text-sm font-medium text-slate-500">
                                    {(hover || rating) > 0 ? (
                                        ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][(hover || rating) - 1]
                                    ) : 'Select stars'}
                                </span>
                            </div>
                        </div>

                        <div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                                placeholder="Share your experience with this resource..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting || rating === 0}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                {submitting ? 'Publishing...' : 'Post Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                  <Star className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Have you used this?</h4>
              <p className="text-slate-500 text-sm mb-4">Log in to share your feedback with the community.</p>
              <Link to="/community/login" className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 rounded-xl text-sm font-bold transition-all shadow-sm">
                  Sign in to Review
              </Link>
            </div>
        )}
      </div>

      {/* --- REVIEWS LIST --- */}
      <div className="space-y-4">
        {loading ? (
            <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-slate-300 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Loading reviews...</p>
            </div>
        ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-[1.5rem] border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No reviews yet. Be the first!</p>
            </div>
        ) : (
            <AnimatePresence>
                {reviews.map((r, i) => (
                    <motion.div
                        key={r.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <Link to={`/community/profile/${r.userId}`} className="shrink-0 group">
                                {r.userPhoto ? (
                                    <img src={r.userPhoto} alt={r.userName} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-indigo-100 transition-all" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-slate-200 transition-colors">
                                        <UserCircle2 className="w-6 h-6" />
                                    </div>
                                )}
                            </Link>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <Link to={`/community/profile/${r.userId}`} className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                                        {r.userName}
                                    </Link>
                                    <span className="text-xs font-medium text-slate-400">
                                        {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-1 mb-3">
                                    {[1,2,3,4,5].map(n => (
                                        <Star
                                            key={n}
                                            className={cn(
                                                "w-3.5 h-3.5",
                                                r.rating >= n ? "text-yellow-400 fill-current" : "text-slate-200"
                                            )}
                                        />
                                    ))}
                                </div>

                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                    {r.comment}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        )}
      </div>
    </div>
  );
}
