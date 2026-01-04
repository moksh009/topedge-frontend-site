import React, { useEffect, useState } from 'react';
import { Star, Loader2, MessageSquare, UserCircle2, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

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
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);

  useEffect(() => {
    // Real-time listener for instant updates
    const q = query(collection(db, 'community_resources', resourceId, 'reviews'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, async (snap) => {
        const items = await Promise.all(snap.docs.map(async (d) => {
            const data = d.data();
            // Basic data from review doc
            let userName = 'Anonymous'; 
            let userPhoto = '';

            // Try to enhance with live profile data if needed, or use stored snapshot
            // For speed, using stored snapshot in review doc is better, but here we can try fetching
            if (data.userId) {
               try {
                 const p = await getDoc(doc(db, 'public_profiles', data.userId));
                 if(p.exists()) {
                    userName = p.data().fullName;
                    userPhoto = p.data().photoURL;
                 }
               } catch {}
            }

            return { id: d.id, ...data, userName: userName || 'User', userPhoto } as Review;
        }));

        setReviews(items);
        
        // Stats
        const validRatings = items.map(r => r.rating).filter(n => n > 0);
        setCount(validRatings.length);
        setAvg(validRatings.length ? validRatings.reduce((a,b)=>a+b,0)/validRatings.length : 0);

        // Check if current user reviewed
        if (user) {
            const found = items.find(r => r.userId === user.uid);
            setHasReviewed(!!found);
        }
        
        setLoading(false);
    });
    return () => unsub();
  }, [resourceId, user]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating < 1) return;
    
    if (hasReviewed) {
        toast.error("You have already reviewed this resource.");
        return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'community_resources', resourceId, 'reviews'), {
        userId: user.uid,
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp()
      });

      // Notification Logic
      try {
        const rDoc = await getDoc(doc(db, 'community_resources', resourceId));
        if (rDoc.exists()) {
          const rData = rDoc.data() as any;
          if (rData.userId && rData.userId !== user.uid) {
            await addDoc(collection(db, 'notifications'), {
              recipientId: rData.userId,
              senderId: user.uid,
              senderName: userProfile?.fullName || user.displayName || 'User',
              senderPhoto: userProfile?.photoURL || user.photoURL || '',
              type: 'review',
              resourceId,
              resourceTitle: rData.title || '',
              read: false,
              createdAt: serverTimestamp()
            });
          }
        }
      } catch {}

      setRating(0);
      setComment('');
      toast.success("Review published!");
    } catch {
        toast.error("Failed to publish review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            Reviews <span className="text-slate-400 text-sm font-medium">({count})</span>
        </h3>
        
        {count > 0 && (
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm self-start sm:self-auto">
                <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(n => (
                        <Star key={n} className={cn("w-3.5 h-3.5", n <= Math.round(avg) ? "text-yellow-400 fill-current" : "text-slate-200")} />
                    ))}
                </div>
                <span className="text-sm font-bold text-slate-700 ml-1">{avg.toFixed(1)}</span>
            </div>
        )}
      </div>

      {/* --- SUBMIT REVIEW FORM --- */}
      <div className="bg-slate-50/50 rounded-[2rem] border border-slate-200 p-1">
        {user ? (
            !hasReviewed ? (
                <div className="bg-white rounded-[1.8rem] p-6 sm:p-8 shadow-sm border border-slate-100">
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Avatar */}
                        <div className="shrink-0 hidden sm:block">
                            {userProfile?.photoURL ? (
                                <img src={userProfile.photoURL} alt="You" className="w-12 h-12 rounded-full object-cover border border-slate-100" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <form onSubmit={submitReview} className="flex-1 w-full space-y-5">
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
                                            "w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-200",
                                            (hover || rating) >= n 
                                                ? "text-yellow-400 fill-current drop-shadow-sm" 
                                                : "text-slate-200"
                                        )}
                                        />
                                    </button>
                                    ))}
                                    <span className="ml-3 text-sm font-bold text-slate-500 mt-1 block sm:inline">
                                        {(hover || rating) > 0 ? (
                                            ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][(hover || rating) - 1]
                                        ) : 'Select stars'}
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={3}
                                    placeholder="Share your experience with this resource..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none text-slate-700"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting || rating === 0}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto justify-center"
                                >
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                    {submitting ? 'Publishing...' : 'Post Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                // --- ALREADY REVIEWED STATE ---
                <div className="bg-emerald-50/50 rounded-[1.8rem] p-8 text-center border border-emerald-100">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">Thanks for your feedback!</h4>
                    <p className="text-slate-500 text-sm mt-1">You have already reviewed this resource.</p>
                </div>
            )
        ) : (
            // --- LOGGED OUT STATE ---
            <div className="flex flex-col items-center justify-center py-10 text-center bg-white rounded-[1.8rem]">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                  <Star className="w-6 h-6 fill-current" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Have you used this?</h4>
              <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Log in to share your experience and help others in the community.</p>
              <Link to="/community/login" className="px-8 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
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
                        className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            {/* Avatar */}
                            <Link to={`/community/profile/${r.userId}`} className="shrink-0 group flex items-center gap-3 sm:block">
                                {r.userPhoto ? (
                                    <img src={r.userPhoto} alt={r.userName} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-indigo-100 transition-all" />
                                ) : (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-slate-200 transition-colors">
                                        <UserCircle2 className="w-6 h-6" />
                                    </div>
                                )}
                                {/* Mobile Name (Visible only on small screens next to avatar) */}
                                <div className="sm:hidden">
                                    <p className="font-bold text-slate-900 text-sm">{r.userName}</p>
                                    <span className="text-xs text-slate-400">
                                        {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                    </span>
                                </div>
                            </Link>

                            <div className="flex-1 w-full">
                                {/* Desktop Header */}
                                <div className="hidden sm:flex items-center justify-between mb-1">
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

                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line break-words">
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