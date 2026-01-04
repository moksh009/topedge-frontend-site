import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Send, Heart, Reply, MoreHorizontal, CornerDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

type Comment = {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  text: string;
  parentId: string | null; // For nesting
  likes: number;
  likedBy: string[];
  createdAt: any;
  replies?: Comment[]; // For UI structure
};

export default function ResourceDiscussion({ resourceId }: { resourceId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch Comments
  useEffect(() => {
    const q = query(collection(db, 'community_resources', resourceId, 'discussions'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Comment[];
      
      // Organize into Tree Structure
      const map: Record<string, Comment> = {};
      const roots: Comment[] = [];
      
      all.forEach(c => {
        map[c.id] = { ...c, replies: [] };
      });

      all.forEach(c => {
        if (c.parentId && map[c.parentId]) {
          map[c.parentId].replies?.push(map[c.id]);
        } else {
          roots.push(map[c.id]);
        }
      });

      // Sort by newest at top for roots, oldest at top for replies (conversation flow)
      setComments(roots.reverse());
    });
    return () => unsub();
  }, [resourceId]);

  const handleSubmit = async (parentId: string | null = null, content: string) => {
    if (!user || !content.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'community_resources', resourceId, 'discussions'), {
        userId: user.uid,
        userName: user.displayName || 'User',
        userPhoto: user.photoURL || '',
        text: content.trim(),
        parentId,
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp()
      });
      setText('');
      setReplyText('');
      setReplyingTo(null);
      toast.success(parentId ? 'Reply sent' : 'Comment posted');
    } catch {
      toast.error('Failed to post');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleLike = async (comment: Comment) => {
    if (!user) return toast.error('Login to like');
    const ref = doc(db, 'community_resources', resourceId, 'discussions', comment.id);
    const isLiked = comment.likedBy?.includes(user.uid);

    if (isLiked) {
      await updateDoc(ref, { likes: increment(-1), likedBy: arrayRemove(user.uid) });
    } else {
      await updateDoc(ref, { likes: increment(1), likedBy: arrayUnion(user.uid) });
    }
  };

  // Recursive Comment Renderer
  const CommentNode = ({ comment, depth = 0 }: { comment: Comment, depth?: number }) => (
    <div className={cn("group", depth > 0 && "mt-3")}>
      <div className="flex gap-3">
        {/* Avatar Line Logic */}
        <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 overflow-hidden border border-slate-200">
                {comment.userPhoto ? (
                    <img src={comment.userPhoto} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {comment.userName.charAt(0)}
                    </div>
                )}
            </div>
            {/* Thread Line */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="w-px h-full bg-slate-200 my-1 group-last:hidden" />
            )}
        </div>

        <div className="flex-1 pb-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{comment.userName}</span>
                    <span className="text-[10px] text-slate-400">
                        {comment.createdAt ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true }) : 'just now'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="mt-1 text-sm text-slate-700 leading-relaxed bg-slate-50 px-3 py-2 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-slate-100 inline-block max-w-full">
                {comment.text}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-2">
                <button 
                    onClick={() => toggleLike(comment)}
                    className={cn(
                        "flex items-center gap-1.5 text-[11px] font-bold transition-colors",
                        comment.likedBy?.includes(user?.uid || '') ? "text-rose-500" : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    <Heart className={cn("w-3.5 h-3.5", comment.likedBy?.includes(user?.uid || '') && "fill-current")} />
                    {comment.likes || 0}
                </button>
                <button 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                >
                    <Reply className="w-3.5 h-3.5" /> Reply
                </button>
            </div>

            {/* Reply Input */}
            {replyingTo === comment.id && (
                <form 
                    onSubmit={(e) => { e.preventDefault(); handleSubmit(comment.id, replyText); }}
                    className="mt-3 flex gap-2 animate-in fade-in slide-in-from-top-2"
                >
                    <input 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..." 
                        autoFocus
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button disabled={submitting} className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50">
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </form>
            )}

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-2">
                    {comment.replies.map(reply => (
                        <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-indigo-500" />
            Discussion <span className="text-slate-400 text-xs font-medium">({comments.length})</span>
        </h3>

        {/* Main Input */}
        {user ? (
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 overflow-hidden">
                    <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} className="w-full h-full object-cover" />
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(null, text); }} className="flex-1 relative">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ask a question or share your thoughts..."
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none h-24"
                    />
                    <button 
                        type="submit" 
                        disabled={!text.trim() || submitting}
                        className="absolute bottom-3 right-3 p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all hover:scale-105"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <p className="text-sm text-slate-500">Log in to join the discussion.</p>
            </div>
        )}

        {/* Comment List */}
        <div className="space-y-2">
            {comments.map(c => <CommentNode key={c.id} comment={c} />)}
            {comments.length === 0 && <p className="text-slate-400 text-sm italic">No discussions yet. Start one!</p>}
        </div>
    </div>
  );
}