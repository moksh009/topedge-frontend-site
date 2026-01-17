import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/services/firebase';
import { doc, getDoc, updateDoc, serverTimestamp, arrayUnion, addDoc, collection } from 'firebase/firestore';
import { emailService } from '@/services/emailService';
import { isAdminEmail } from '@/utils/admin';
import toast from 'react-hot-toast';
import { Loader2, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

interface AccessRequest {
  id: string;
  resourceId: string;
  resourceTitle: string;
  ownerId: string;
  ownerEmail?: string | null;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  isPaid?: boolean;
  price?: number;
  pricingType?: 'one_time' | 'monthly';
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  expiresAt?: any;
  approvalToken?: string;
}

interface ResourceDoc {
  id: string;
  title: string;
  userId: string;
  userName?: string;
  link?: string;
  purchasers?: string[];
  isPaid?: boolean;
  price?: number;
  pricingType?: 'one_time' | 'monthly';
}

const ApproveAccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const requestId = searchParams.get('requestId');
  const tokenParam = searchParams.get('token');

  const { user, loading: authLoading, isAdmin } = useAuth();

  const [request, setRequest] = useState<AccessRequest | null>(null);
  const [resource, setResource] = useState<ResourceDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!requestId) {
        setLoading(false);
        return;
      }
      try {
        const reqRef = doc(db, 'resource_access_requests', requestId);
        const reqSnap = await getDoc(reqRef);
        if (!reqSnap.exists()) {
          setLoading(false);
          return;
        }
        const data = reqSnap.data() as any;

        let status: AccessRequest['status'] = data.status || 'pending';
        let expiresAt: any = data.expiresAt;

        if (status === 'pending' && expiresAt && typeof expiresAt.toDate === 'function') {
          const expiresDate = expiresAt.toDate();
          if (expiresDate.getTime() < Date.now()) {
            status = 'expired';
            try {
              await updateDoc(reqRef, {
                status: 'expired',
                expiredAt: serverTimestamp(),
              });

              if (user && data.resourceId && data.buyerId) {
                try {
                  await addDoc(collection(db, 'resource_access_audit_logs'), {
                    resourceId: data.resourceId,
                    buyerId: data.buyerId,
                    action: 'expired',
                    performedBy: user.uid,
                    requestId,
                    createdAt: serverTimestamp(),
                  });
                } catch (e) {
                  console.error('Failed to write access audit log (expired):', e);
                }

                try {
                  await addDoc(collection(db, 'notifications'), {
                    recipientId: data.buyerId,
                    senderId: user.uid,
                    senderName: user.displayName || user.email || 'Creator',
                    type: 'access_expired',
                    resourceId: data.resourceId,
                    resourceTitle: data.resourceTitle || '',
                    read: false,
                    createdAt: serverTimestamp(),
                  });
                } catch (e) {
                  console.error('Failed to create access expired notification:', e);
                }
              }
            } catch (e) {
              console.error('Failed to mark request as expired:', e);
            }
          }
        }

        const req: AccessRequest = {
          id: reqSnap.id,
          resourceId: data.resourceId,
          resourceTitle: data.resourceTitle || '',
          ownerId: data.ownerId,
          ownerEmail: data.ownerEmail || null,
          buyerId: data.buyerId,
          buyerName: data.buyerName || 'Buyer',
          buyerEmail: data.buyerEmail || '',
          isPaid: data.isPaid,
          price: data.price,
          pricingType: data.pricingType || 'one_time',
          status,
          expiresAt,
          approvalToken: data.approvalToken || '',
        };
        if (tokenParam && req.approvalToken && tokenParam !== req.approvalToken) {
          setInvalidToken(true);
        }
        setRequest(req);

        if (data.resourceId) {
          const resRef = doc(db, 'community_resources', data.resourceId);
          const resSnap = await getDoc(resRef);
          if (resSnap.exists()) {
            const r = resSnap.data() as any;
            setResource({
              id: resSnap.id,
              title: r.title || '',
              userId: r.userId,
              userName: r.userName,
              link: r.link,
              purchasers: r.purchasers || [],
              isPaid: r.isPaid,
              price: r.price,
              pricingType: r.pricingType || 'one_time',
            });
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [requestId]);

  const canManage =
    !!user &&
    !!request &&
    (user.uid === request.ownerId || isAdmin || isAdminEmail(user.email || ''));

  const handleApprove = async () => {
    if (!requestId || !request) return;
    if (!user) {
      toast.error('Login required to approve');
      return;
    }
    if (!canManage) {
      toast.error('You do not have permission to approve this request');
      return;
    }
    if (tokenParam && request.approvalToken && tokenParam !== request.approvalToken) {
      toast.error('This approval link is no longer valid. Please use the latest link from your email or approve from the dashboard.');
      return;
    }
    if (request.status === 'expired') {
      toast.error('This approval link has expired. Ask the buyer to submit a new request.');
      return;
    }
    if (request.status !== 'pending') {
      toast.error('This request is no longer pending');
      return;
    }
    setActionLoading(true);
    try {
      const reqRef = doc(db, 'resource_access_requests', requestId);
      const resRef = doc(db, 'community_resources', request.resourceId);

      await updateDoc(reqRef, {
        status: 'approved',
        approvedAt: serverTimestamp(),
        approvedBy: user.uid,
      });

      await updateDoc(resRef, {
        purchasers: arrayUnion(request.buyerId),
      });

      try {
        await addDoc(collection(db, 'resource_access_audit_logs'), {
          resourceId: request.resourceId,
          buyerId: request.buyerId,
          action: 'approved',
          performedBy: user.uid,
          requestId,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Failed to write access audit log (approved):', e);
      }

      if (request.buyerEmail) {
        const resTitle = resource?.title || request.resourceTitle || 'Resource';
        const priceText =
          request.isPaid && typeof request.price === 'number'
            ? `$${request.price || 0} ${
                (request.pricingType || 'one_time') === 'monthly' ? '(Monthly)' : '(One-time)'
              }`
            : 'Free';

        const messageLines = [
          `Good news – your access request has been approved for: ${resTitle}.`,
          '',
          `Price: ${priceText}`,
          '',
          'You can now access this resource directly from your TopEdge AI community account.',
          'Sign in, open the community resource page, and the resource will be unlocked for your account.',
        ];

        await emailService.sendContactEmails({
          name: request.buyerName || 'Buyer',
          email: request.buyerEmail,
          phone: '',
          companyName: '',
          subject: 'Your paid resource access has been approved',
          message: messageLines.join('\n'),
        });
      }

      if (request.ownerEmail) {
        const resTitle = resource?.title || request.resourceTitle || 'Resource';
        await emailService.sendContactEmails({
          name: resource?.userName || 'Creator',
          email: request.ownerEmail,
          phone: '',
          companyName: '',
          subject: 'You approved a paid resource access request',
          message: `You approved access for ${request.buyerEmail || 'a buyer'} to "${resTitle}".`,
        });
      }

      try {
        await addDoc(collection(db, 'notifications'), {
          recipientId: request.buyerId,
          senderId: user.uid,
          senderName: user.displayName || user.email || 'Creator',
          type: 'access_approved',
          resourceId: request.resourceId,
          resourceTitle: resource?.title || request.resourceTitle || 'Paid Resource',
          read: false,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Failed to create access approved notification:', e);
      }

      setRequest(prev => (prev ? { ...prev, status: 'approved' } : prev));
      toast.success('Access approved and buyer notified');
    } catch (e) {
      console.error(e);
      toast.error('Failed to approve request. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!requestId || !request) return;
    if (!user) {
      toast.error('Login required to reject');
      return;
    }
    if (!canManage) {
      toast.error('You do not have permission to reject this request');
      return;
    }
    if (request.status !== 'pending') {
      toast.error('This request is no longer pending');
      return;
    }
    setActionLoading(true);
    try {
      const reqRef = doc(db, 'resource_access_requests', requestId);
      await updateDoc(reqRef, {
        status: 'rejected',
        rejectedAt: serverTimestamp(),
        rejectedBy: user.uid,
      });

      if (request.buyerEmail) {
        const resTitle = resource?.title || request.resourceTitle || 'Resource';
        await emailService.sendContactEmails({
          name: request.buyerName || 'Buyer',
          email: request.buyerEmail,
          phone: '',
          companyName: '',
          subject: 'Your paid resource access request was rejected',
          message: `Your request for access to "${resTitle}" was rejected by the creator. You can contact them via the community profile if you believe this is a mistake.`,
        });
      }

      setRequest(prev => (prev ? { ...prev, status: 'rejected' } : prev));
      toast.success('Request rejected and buyer notified');
      try {
        await addDoc(collection(db, 'notifications'), {
          recipientId: request.buyerId,
          senderId: user.uid,
          senderName: user.displayName || user.email || 'Creator',
          type: 'access_rejected',
          resourceId: request.resourceId,
          resourceTitle: resource?.title || request.resourceTitle || 'Paid Resource',
          read: false,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Failed to create access rejected notification:', e);
      }

      try {
        await addDoc(collection(db, 'resource_access_audit_logs'), {
          resourceId: request.resourceId,
          buyerId: request.buyerId,
          action: 'rejected',
          performedBy: user.uid,
          requestId,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Failed to write access audit log (rejected):', e);
      }

      setRequest(prev => (prev ? { ...prev, status: 'rejected' } : prev));
      toast.success('Request rejected and buyer notified');
    } catch (e) {
      console.error(e);
      toast.error('Failed to reject request. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  if (!requestId) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-4">
            <XCircle className="w-10 h-10 text-red-500 mx-auto" />
            <h1 className="text-lg font-bold text-slate-900">Invalid approval link</h1>
            <p className="text-sm text-slate-500">
              This approval link is missing a request identifier. Please use the latest link from your email.
            </p>
            <Link
              to="/community/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl"
            >
              Go to Creator Dashboard
            </Link>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  if (loading || authLoading) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
          <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
        </div>
      </CommunityLayout>
    );
  }

  if (!request) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-4">
            <XCircle className="w-10 h-10 text-red-500 mx-auto" />
            <h1 className="text-lg font-bold text-slate-900">Request not found</h1>
            <p className="text-sm text-slate-500">
              This access request may have been deleted or the link has expired.
            </p>
            <Link
              to="/community/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl"
            >
              Go to Creator Dashboard
            </Link>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  const statusLabel =
    request.status === 'approved'
      ? 'Approved'
      : request.status === 'rejected'
      ? 'Rejected'
      : request.status === 'expired'
      ? 'Expired'
      : 'Pending';

  const statusColor =
    request.status === 'approved'
      ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
      : request.status === 'rejected'
      ? 'text-red-700 bg-red-50 border-red-100'
      : request.status === 'expired'
      ? 'text-slate-700 bg-slate-100 border-slate-200'
      : 'text-amber-700 bg-amber-50 border-amber-100';

  if (invalidToken) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-4">
            <XCircle className="w-10 h-10 text-red-500 mx-auto" />
            <h1 className="text-lg font-bold text-slate-900">Invalid or reused approval link</h1>
            <p className="text-sm text-slate-500">
              This approval link is not valid for the current request. Please use the latest link from your email or open this request from your Creator Dashboard.
            </p>
            <Link
              to="/community/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl"
            >
              Go to Creator Dashboard
            </Link>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-10">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/community/dashboard"
              className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Access Approval
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                  {request.resourceTitle || resource?.title || 'Paid Resource'}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Approve or reject this user&apos;s access to your paid community resource.
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${statusColor}`}>
                {statusLabel}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Buyer</p>
                <p className="text-sm font-semibold text-slate-900 break-words">
                  {request.buyerName || 'Buyer'}
                </p>
                <p className="text-xs text-slate-500 break-words">{request.buyerEmail || 'No email'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resource</p>
                <p className="text-sm font-semibold text-slate-900 break-words">
                  {resource?.title || request.resourceTitle || 'Paid Resource'}
                </p>
                <p className="text-xs text-slate-500">
                  {request.isPaid
                    ? `$${request.price || 0} ${
                        (request.pricingType || 'one_time') === 'monthly' ? '(Monthly)' : '(One-time)'
                      }`
                    : 'Free'}
                </p>
              </div>
            </div>

            {!user && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
                Login with your creator account to approve or reject this request.
              </div>
            )}

            {user && !canManage && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800">
                You are logged in as {user.email || 'this account'}, which does not match the creator of this
                resource. Only the resource owner or an admin can approve access.
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-[11px] text-slate-500 flex-1">
                Approving will permanently unlock this resource for the buyer&apos;s account by adding them to the
                purchasers list. This cannot be undone from here.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReject}
                  disabled={!canManage || actionLoading || request.status !== 'pending'}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading && request.status === 'pending' ? 'Processing...' : 'Reject'}
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={!canManage || actionLoading || request.status !== 'pending'}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading && request.status === 'pending' ? 'Processing...' : 'Approve Access'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default ApproveAccess;
