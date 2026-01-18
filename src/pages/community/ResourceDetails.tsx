import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import CommunitySEO from '@/components/community/CommunitySEO';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc, updateDoc, serverTimestamp, deleteDoc, arrayUnion, arrayRemove, increment, addDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { isAdminEmail } from '@/utils/admin';
import { emailService } from '@/services/emailService';
import toast from 'react-hot-toast';
import ResourceReviews from '@/pages/community/ResourceReviews';
import RelatedResources from '@/components/community/RelatedResources';
import ResourceDiscussion from '@/pages/community/ResourceDiscussion';
import { ArrowBigUp, ArrowLeft, ArrowRight, Box, CheckCircle2, Clock, Edit2, Loader2, PlayCircle, Share2, Sparkles, Trash2, Upload, User, X, Zap, ExternalLink } from 'lucide-react';

// CLOUDINARY CONFIG
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dn9gh1goq";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

interface Resource {
  id: string;
  title: string;
  description: string;
  whatItDoes?: string;
  outcome?: string;
  videoUrl?: string;
  imageUrl?: string;
  isPaid: boolean;
  price?: number;
  pricingType?: 'one_time' | 'monthly';
  tools: string[];
  attachments?: Array<{ name: string; url: string; size?: number }>;
  userId: string;
  userName: string;
  userPhoto?: string;
  link?: string;
  category: 'automation' | 'project' | 'tool' | 'prompt';
  createdAt?: any;
  contactEmail?: string;
  contactPhone?: string;
  contactWebsite?: string;
  upvotes?: number;
  upvotedBy?: string[];
  purchasers?: string[];
  hasProtectedLink?: boolean;
}

const ResourceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState<Resource | null>(null);
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState<number>(0);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const [purchaseRequestLoading, setPurchaseRequestLoading] = useState(false);
  const [purchaseRequestSent, setPurchaseRequestSent] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [authorProfile, setAuthorProfile] = useState<any>(null);
  const [protectedLink, setProtectedLink] = useState<string | null>(null);
  const [hasApprovedAccess, setHasApprovedAccess] = useState(false);
  const [isImageCropOpen, setIsImageCropOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [isCroppingDrag, setIsCroppingDrag] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const cropImageRef = useRef<HTMLImageElement | null>(null);
  const cropDragStartRef = useRef<{ x: number; y: number } | null>(null);

  const COVER_PREVIEW_WIDTH = 288;
  const COVER_PREVIEW_HEIGHT = 162;
  const COVER_OUTPUT_WIDTH = 1280;
  const COVER_OUTPUT_HEIGHT = 720;

  const clampCoverOffset = (next: { x: number; y: number }, zoom: number) => {
    const img = cropImageRef.current;
    if (!img) return next;
    const cropWidth = COVER_PREVIEW_WIDTH;
    const cropHeight = COVER_PREVIEW_HEIGHT;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!naturalWidth || !naturalHeight) return next;
    const baseScale = Math.max(cropWidth / naturalWidth, cropHeight / naturalHeight);
    const scale = baseScale * zoom;
    const scaledWidth = naturalWidth * scale;
    const scaledHeight = naturalHeight * scale;
    const maxX = Math.max(0, (scaledWidth - cropWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - cropHeight) / 2);
    let x = next.x;
    let y = next.y;
    if (x > maxX) x = maxX;
    if (x < -maxX) x = -maxX;
    if (y > maxY) y = maxY;
    if (y < -maxY) y = -maxY;
    return { x, y };
  };

  // Edit Form State
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    whatItDoes: '',
    outcome: '',
    videoUrl: '',
    imageUrl: '',
    link: '',
    price: '',
    tools: '',
    category: 'automation',
    isPaid: false,
    contactEmail: '',
    contactPhone: '',
    contactWebsite: '',
    attachments: [] as Array<{ name: string; url: string; size?: number }>,
    pricingType: 'one_time' as 'one_time' | 'monthly'
  });

  const [videoSourceType, setVideoSourceType] = useState<'link' | 'upload'>('link');

  const isOwner = user && resource && (user.uid === resource.userId || isAdminEmail(user.email));

  useEffect(() => {
    const fetchResource = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'community_resources', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setResource({ ...data, id: docSnap.id } as Resource);
          setUpvoteCount((data as any).upvotes || 0);
          setIsUpvoted(((data as any).upvotedBy || []).includes(user?.uid));
          
          setEditForm({
            title: data.title || '',
            description: data.description || '',
            whatItDoes: data.whatItDoes || '',
            outcome: data.outcome || '',
            videoUrl: data.videoUrl || '',
            imageUrl: data.imageUrl || '',
            link: data.link || '',
            price: data.price?.toString() || '',
            tools: data.tools ? data.tools.join(', ') : '',
            category: data.category as any || 'automation',
            isPaid: !!data.isPaid,
            contactEmail: data.contactEmail || '',
            contactPhone: data.contactPhone || '',
            contactWebsite: data.contactWebsite || '',
            attachments: (data.attachments || []) as Array<{ name: string; url: string; size?: number }>,
            pricingType: (data.pricingType as 'one_time' | 'monthly') || 'one_time'
          });

          if (data.videoUrl && data.videoUrl.includes('cloudinary')) {
            setVideoSourceType('upload');
          } else {
            setVideoSourceType('link');
          }
        } else {
          toast.error("Resource not found");
          navigate('/community/automation-hub');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id, navigate, user]);

  useEffect(() => {
    if (resource?.userId) {
      const fetchAuthorProfile = async () => {
        try {
          const profileDocRef = doc(db, 'public_profiles', resource.userId);
          const profileDoc = await getDoc(profileDocRef);
          if (profileDoc.exists()) {
            setAuthorProfile(profileDoc.data());
          }
        } catch (error) {
          console.error("Error fetching author profile:", error);
        }
      };
      fetchAuthorProfile();
    }
  }, [resource?.userId]);

  useEffect(() => {
    const loadProtectedLinkForOwner = async () => {
      if (!isOwner || !resource?.isPaid || !isEditing) return;
      try {
        const ref = doc(db, 'protected_resource_links', resource.id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as any;
          setEditForm(prev => ({ ...prev, link: data.privateUrl || data.link || '' }));
        }
      } catch (error) {
        console.error('Error loading protected link for edit:', error);
      }
    };
    loadProtectedLinkForOwner();
  }, [isOwner, resource?.id, resource?.isPaid, isEditing]);

  useEffect(() => {
    const checkPendingRequest = async () => {
      if (!resource || !user) return;
      try {
        const q = query(
          collection(db, 'resource_access_requests'),
          where('resourceId', '==', resource.id),
          where('buyerId', '==', user.uid),
          where('status', '==', 'pending')
        );
        const snap = await getDocs(q);
        const has = !snap.empty;
        setHasPendingRequest(has);
        setPurchaseRequestSent(has);
      } catch (error) {
        console.error('Error checking pending access request:', error);
      }
    };
    checkPendingRequest();
  }, [resource?.id, user?.uid]);

  useEffect(() => {
    const checkApprovedAccess = async () => {
      if (!resource || !user) return;
      try {
        const q = query(
          collection(db, 'resource_access_requests'),
          where('resourceId', '==', resource.id),
          where('buyerId', '==', user.uid),
          where('status', '==', 'approved')
        );
        const snap = await getDocs(q);
        setHasApprovedAccess(!snap.empty);
      } catch (error) {
        console.error('Error checking approved access request:', error);
      }
    };
    checkApprovedAccess();
  }, [resource?.id, user?.uid]);

  // View Counter logic
  useEffect(() => {
    if (!resource) return;
    const key = `viewed_resource_${resource.id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    try {
      updateDoc(doc(db, 'community_resources', resource.id), { views: increment(1) });
    } catch {}
  }, [resource?.id]);

  const getYouTubeEmbed = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url; 
  };

  const handleLockedAttachmentClick = () => {
    toast.error("Unlock attachments by requesting access and completing payment with the creator.");
  };

  const toggleUpvote = async () => {
    if (!resource || !user) return toast.error("Please login to upvote");
    try {
      const ref = doc(db, 'community_resources', resource.id);
      if (isUpvoted) {
        await updateDoc(ref, { upvotes: increment(-1), upvotedBy: arrayRemove(user.uid) });
        setUpvoteCount(c => Math.max(0, c - 1));
        setIsUpvoted(false);
      } else {
        await updateDoc(ref, { upvotes: increment(1), upvotedBy: arrayUnion(user.uid) });
        setUpvoteCount(c => c + 1);
        setIsUpvoted(true);
        if (resource.userId !== user.uid) {
            addDoc(collection(db, 'notifications'), {
                recipientId: resource.userId,
                senderId: user.uid,
                senderName: user.displayName || 'User',
                type: 'upvote',
                resourceId: resource.id,
                resourceTitle: resource.title,
                read: false,
                createdAt: serverTimestamp()
            });
        }
      }
    } catch (e) { console.error(e); }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) return toast.error("File too large (Max 100MB)");

    setUploadingVideo(true);
    const toastId = toast.loading("Uploading video...");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET as string); 
      data.append("cloud_name", CLOUD_NAME);
      data.append("resource_type", "video");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
        method: "POST",
        body: data
      });
      const result = await response.json();
      if (result.secure_url) {
        setEditForm(prev => ({ ...prev, videoUrl: result.secure_url, imageUrl: '' }));
        toast.success("Video uploaded!", { id: toastId });
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      toast.error("Failed to upload video", { id: toastId });
    } finally {
      setUploadingVideo(false);
    }
  };

  const uploadCroppedImage = async (blob: Blob) => {
    setUploadingImage(true);
    const toastId = toast.loading("Uploading image...");
    try {
      const data = new FormData();
      data.append("file", blob, "cover.jpg");
      data.append("upload_preset", UPLOAD_PRESET as string);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data
      });
      const result = await response.json();
      if (result.secure_url) {
        setEditForm(prev => ({ ...prev, imageUrl: result.secure_url, videoUrl: '' }));
        toast.success("Image uploaded!", { id: toastId });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image", { id: toastId });
    } finally {
      setUploadingImage(false);
      setIsImageCropOpen(false);
      setCropImageSrc(null);
      setCropZoom(1);
      setCropOffset({ x: 0, y: 0 });
      setIsCroppingDrag(false);
      cropDragStartRef.current = null;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image is too large (Max 10MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        toast.error("Failed to load image");
        return;
      }
      setCropImageSrc(result);
      setIsImageCropOpen(true);
      setCropZoom(1);
      setCropOffset({ x: 0, y: 0 });
    };
    reader.onerror = () => {
      toast.error("Failed to load image");
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  const handleImageCropPointerDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsCroppingDrag(true);
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    cropDragStartRef.current = { x: point.clientX, y: point.clientY };
  };

  const handleImageCropPointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isCroppingDrag || !cropDragStartRef.current) return;
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    const dx = point.clientX - cropDragStartRef.current.x;
    const dy = point.clientY - cropDragStartRef.current.y;
    cropDragStartRef.current = { x: point.clientX, y: point.clientY };
    setCropOffset(prev => clampCoverOffset({ x: prev.x + dx, y: prev.y + dy }, cropZoom));
  };

  const handleImageCropPointerUp = () => {
    setIsCroppingDrag(false);
    cropDragStartRef.current = null;
  };

  const handleImageCropSave = () => {
    if (!cropImageSrc) return;
    const img = cropImageRef.current;
    if (!img) return;
    const previewWidth = COVER_PREVIEW_WIDTH;
    const previewHeight = COVER_PREVIEW_HEIGHT;
    const outputWidth = COVER_OUTPUT_WIDTH;
    const outputHeight = COVER_OUTPUT_HEIGHT;
    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!naturalWidth || !naturalHeight) return;
    const baseScalePreview = Math.max(previewWidth / naturalWidth, previewHeight / naturalHeight);
    const scale = baseScalePreview * cropZoom * (outputWidth / previewWidth);
    const offsetNormX = cropOffset.x / previewWidth;
    const offsetNormY = cropOffset.y / previewHeight;
    ctx.clearRect(0, 0, outputWidth, outputHeight);
    ctx.save();
    ctx.translate(outputWidth / 2 + offsetNormX * outputWidth, outputHeight / 2 + offsetNormY * outputHeight);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -naturalWidth / 2, -naturalHeight / 2);
    ctx.restore();
    canvas.toBlob(blob => {
      if (!blob) {
        toast.error("Failed to process image");
        return;
      }
      uploadCroppedImage(blob);
    }, 'image/jpeg', 0.9);
  };

  const handleAttachmentsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      setUploadingAttachment(true);
      for (const file of files) {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          toast.error('Images and videos are not allowed here');
          continue;
        }
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET as string);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, {
          method: "POST",
          body: data
        });
        const json = await res.json();
        if (json.secure_url) {
          setEditForm(prev => ({
            ...prev,
            attachments: [...prev.attachments, { name: file.name, url: json.secure_url, size: file.size }]
          }));
        } else {
          throw new Error(json.error?.message || 'Upload failed');
        }
      }
      toast.success('Attachment(s) uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload attachment');
    } finally {
      setUploadingAttachment(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resource || !user) return;
    const canEdit = user.uid === resource.userId || isAdminEmail(user.email);
    if (!canEdit) {
      toast.error("You do not have permission to update this resource");
      return;
    }
    setSaving(true);
    try {
      const isPaid = editForm.isPaid;
      const cleanedLink = editForm.link.trim();
      const hasProtectedLink = isPaid && !!cleanedLink;

      let finalVideoUrl = editForm.videoUrl;
      const finalImageUrl = editForm.imageUrl;

      if (finalVideoUrl && finalImageUrl) {
        finalVideoUrl = '';
      }

      const updatedData = {
        title: editForm.title,
        description: editForm.description,
        whatItDoes: editForm.whatItDoes,
        outcome: editForm.outcome,
        videoUrl: finalVideoUrl,
        imageUrl: finalImageUrl,
        link: isPaid ? '' : cleanedLink,
        isPaid,
        price: isPaid ? parseFloat(editForm.price) || 0 : 0,
        tools: editForm.tools.split(',').map(t => t.trim()).filter(Boolean),
        category: editForm.category,
        contactEmail: editForm.contactEmail,
        contactPhone: editForm.contactPhone,
        contactWebsite: editForm.contactWebsite,
        attachments: editForm.attachments,
        pricingType: editForm.pricingType,
        hasProtectedLink
      };

      await updateDoc(doc(db, 'community_resources', resource.id), updatedData as any);
      if (isPaid) {
        const protectedRef = doc(db, 'protected_resource_links', resource.id);
        if (hasProtectedLink) {
          await setDoc(protectedRef, {
            resourceId: resource.id,
            privateUrl: cleanedLink,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } else {
          try {
            await deleteDoc(protectedRef);
          } catch {}
        }
      }

      setResource(prev =>
        prev
          ? ({
              ...prev,
              ...updatedData,
              tools: updatedData.tools as string[],
              category: updatedData.category as any
            })
          : null
      );
      setIsEditing(false);
      toast.success("Resource updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!resource || !user) return;
    const canDelete = user.uid === resource.userId || isAdminEmail(user.email);
    if (!canDelete) {
      toast.error("You do not have permission to delete this resource");
      return;
    }
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'community_resources', resource.id));
      toast.success("Deleted");
      navigate('/community/automation-hub');
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const hasAccess =
    !!resource &&
    (!resource.isPaid ||
      (user &&
        (user.uid === resource.userId ||
          isAdminEmail(user.email) ||
          (resource.purchasers || []).includes(user.uid) ||
          hasApprovedAccess)));

  useEffect(() => {
    const fetchProtectedLink = async () => {
      if (!resource || !resource.isPaid || !hasAccess || !user) {
        setProtectedLink(null);
        return;
      }
      try {
        const ref = doc(db, 'protected_resource_links', resource.id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setProtectedLink(null);
          return;
        }
        const data = snap.data() as any;
        const candidate = (data.privateUrl || data.link || data.url || '').trim();
        setProtectedLink(candidate || null);
      } catch (error) {
        console.error('Error fetching protected link:', error);
        setProtectedLink(null);
      }
    };
    fetchProtectedLink();
  }, [resource?.id, resource?.isPaid, hasAccess, user]);

  const handlePurchaseRequest = async () => {
    if (!resource) return;
    if (!user) {
      toast.error("Please login to request access");
      return;
    }
    if (!resource.isPaid) {
      toast.error("This resource is free to access");
      return;
    }
    if (
      user.uid === resource.userId ||
      isAdminEmail(user.email) ||
      (resource.purchasers || []).includes(user.uid)
    ) {
      toast.success("You already have access to this resource");
      return;
    }
    if (hasPendingRequest) {
      toast.error("You already have a pending access request for this resource.");
      return;
    }
    if (purchaseRequestLoading) return;

    setPurchaseRequestLoading(true);
    try {
      const existingQ = query(
        collection(db, 'resource_access_requests'),
        where('resourceId', '==', resource.id),
        where('buyerId', '==', user.uid),
        where('status', '==', 'pending')
      );
      const existingSnap = await getDocs(existingQ);
      if (!existingSnap.empty) {
        setHasPendingRequest(true);
        setPurchaseRequestSent(true);
        toast.error("You already have a pending access request for this resource.");
        return;
      }

      const approvalToken = self.crypto?.randomUUID ? self.crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`;

      const requestRef = await addDoc(collection(db, 'resource_access_requests'), {
        resourceId: resource.id,
        resourceTitle: resource.title,
        ownerId: resource.userId,
        ownerEmail: resource.contactEmail || null,
        buyerId: user.uid,
        buyerName: user.displayName || user.email || 'User',
        buyerEmail: user.email || '',
        isPaid: resource.isPaid,
        price: resource.price || 0,
        pricingType: resource.pricingType || 'one_time',
        createdAt: serverTimestamp(),
        status: 'pending',
        approvalToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      const origin = window.location.origin;
      const approveUrl = `${origin}/community/approve-access?requestId=${encodeURIComponent(
        requestRef.id
      )}&token=${encodeURIComponent(approvalToken)}`;

      const priceText = resource.isPaid
        ? `$${resource.price || 0} ${
            (resource.pricingType || 'one_time') === 'monthly' ? '(Monthly)' : '(One-time)'
          }`
        : 'Free';

      if (resource.contactEmail) {
        try {
          await emailService.sendAccessRequestCreatorEmail({
            creatorName: resource.userName || 'Resource Creator',
            creatorEmail: resource.contactEmail,
            buyerName: user.displayName || 'User',
            buyerEmail: user.email || '',
            resourceTitle: resource.title,
            priceText,
            approvalUrl: approveUrl,
          });

          await addDoc(collection(db, 'resource_access_audit_logs'), {
            resourceId: resource.id,
            buyerId: user.uid,
            action: 'email_sent',
            performedBy: user.uid,
            requestId: requestRef.id,
            emailType: 'request_creator',
            createdAt: serverTimestamp(),
          });
        } catch (e) {
          console.error('Failed to send creator request email:', e);
          await addDoc(collection(db, 'resource_access_audit_logs'), {
            resourceId: resource.id,
            buyerId: user.uid,
            action: 'email_failed',
            performedBy: user.uid,
            requestId: requestRef.id,
            emailType: 'request_creator',
            errorMessage: e instanceof Error ? e.message : String(e),
            createdAt: serverTimestamp(),
          });
        }
      }

      if (user.email) {
        try {
          await emailService.sendAccessRequestUserEmail({
            buyerName: user.displayName || 'Resource Buyer',
            buyerEmail: user.email,
            resourceTitle: resource.title,
          });

          await addDoc(collection(db, 'resource_access_audit_logs'), {
            resourceId: resource.id,
            buyerId: user.uid,
            action: 'email_sent',
            performedBy: user.uid,
            requestId: requestRef.id,
            emailType: 'request_user',
            createdAt: serverTimestamp(),
          });
        } catch (e) {
          console.error('Failed to send buyer request email:', e);
          await addDoc(collection(db, 'resource_access_audit_logs'), {
            resourceId: resource.id,
            buyerId: user.uid,
            action: 'email_failed',
            performedBy: user.uid,
            requestId: requestRef.id,
            emailType: 'request_user',
            errorMessage: e instanceof Error ? e.message : String(e),
            createdAt: serverTimestamp(),
          });
        }
      }

      try {
        await addDoc(collection(db, 'resource_access_audit_logs'), {
          resourceId: resource.id,
          buyerId: user.uid,
          action: 'requested',
          performedBy: user.uid,
          requestId: requestRef.id,
          createdAt: serverTimestamp()
        });
      } catch (e) {
        console.error('Failed to write access audit log (requested):', e);
      }

      try {
        await addDoc(collection(db, 'notifications'), {
          recipientId: resource.userId,
          senderId: user.uid,
          senderName: user.displayName || user.email || 'User',
          type: 'access_request',
          resourceId: resource.id,
          resourceTitle: resource.title,
          read: false,
          createdAt: serverTimestamp()
        });
      } catch (e) {
        console.error('Failed to create access request notification:', e);
      }

      setPurchaseRequestSent(true);
      setHasPendingRequest(true);
      toast.success("Request sent. After you complete payment and the creator approves, this resource will unlock for your account.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send purchase request. Please try again.");
    } finally {
      setPurchaseRequestLoading(false);
    }
  };

  // --- SUB-COMPONENTS ---
  const TechStack = () => (
    <div className="bg-white rounded-[1.25rem] p-5 border border-slate-200 shadow-sm w-full">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Box className="w-3.5 h-3.5" /> Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
            {(resource?.tools || []).map((tool, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-700 text-[10px] lg:text-xs font-bold uppercase tracking-wide rounded-lg">
                    {tool}
                </span>
            ))}
            {(!resource?.tools || resource.tools.length === 0) && <span className="text-slate-400 text-xs italic">No tools listed</span>}
        </div>
    </div>
  );

  const AccessCard = () => {
    const isPaid = !!resource?.isPaid;
    const combinedUrl = (protectedLink || resource?.link || '').trim();
    const hasAnyLink = !!combinedUrl;

    const accessNote = () => {
      if (!resource) return null;

      if (!isPaid) {
        if (!hasAnyLink) {
          return (
            <p className="text-[10px] text-center text-slate-400 font-medium">
              This resource is free, but the creator has not added an external link yet. You can still download any files below or contact the creator.
            </p>
          );
        }
        return (
          <p className="text-[10px] text-center text-slate-400 font-medium">
            This resource is free. Click Open Resource to visit the shared link. Files below are also available to download.
          </p>
        );
      }

      if (!hasAccess) {
        return (
          <p className="text-[10px] text-center text-slate-400 font-medium">
            For paid resources, click Unlock Resource to send an email to you and the creator. After you complete payment and they approve from the email, the resource unlocks for your account. TopEdge takes 0% platform fee.
          </p>
        );
      }

      if (hasAnyLink) {
        return (
          <p className="text-[10px] text-center text-slate-400 font-medium">
            This paid resource is unlocked for your account. Open Resource will take you to the private access link configured by the creator.
          </p>
        );
      }

      return (
        <p className="text-[10px] text-center text-slate-400 font-medium">
          This paid resource is unlocked for your account. The creator has not added an external access link yet, but you can still download files or contact them directly.
        </p>
      );
    };

    return (
    <div className="bg-white rounded-[1.25rem] p-5 border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex items-end justify-between mb-4 pb-4 border-b border-slate-50">
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Access</p>
                <h2 className="text-3xl font-extrabold text-slate-900">
                    {resource?.isPaid ? `$${resource.price}` : 'Free'}
                </h2>
            </div>
            {resource?.isPaid && (
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">
                {(resource.pricingType || 'one_time') === 'monthly' ? 'Monthly' : 'One-time'}
              </span>
            )}
        </div>

        <button 
            onClick={toggleUpvote} 
            className={cn("w-full py-3 rounded-xl text-sm font-bold border mb-3 flex items-center justify-center gap-2 transition-all", isUpvoted ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}
        >
            <ArrowBigUp className={cn("w-5 h-5", isUpvoted ? "fill-orange-600 text-orange-600" : "text-slate-400")} />
            <span>{isUpvoted ? "Upvoted" : "Upvote"}</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs text-slate-600 ml-1">{upvoteCount}</span>
        </button>

        {isPaid ? (
          hasAccess ? (
            hasAnyLink ? (
              <a 
                href={combinedUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 mb-2 group text-sm"
              >
                Open Resource <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <button disabled className="w-full py-3 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed text-sm">
                Access Approved
              </button>
            )
          ) : (
            <button
              onClick={handlePurchaseRequest}
              disabled={purchaseRequestLoading || purchaseRequestSent}
              className={cn(
                "w-full py-3 bg-slate-900 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 mb-2 text-sm",
                (purchaseRequestLoading || purchaseRequestSent) && "opacity-60 cursor-not-allowed"
              )}
            >
              {purchaseRequestSent
                ? "Request Sent"
                : purchaseRequestLoading
                ? "Sending Request..."
                : "Unlock Resource"}
            </button>
          )
        ) : hasAnyLink ? (
            <a 
                href={combinedUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 mb-2 group text-sm"
            >
                Open Resource <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <button disabled className="w-full py-3 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed text-sm">
                Link Unavailable
            </button>
          )
        }
        {accessNote()}
    </div>
    );
  };

  const ContactCard = () => (
    <div className="bg-white rounded-[1.25rem] p-5 border border-slate-200 shadow-sm w-full">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <User className="w-3.5 h-3.5" /> Contact Creator
        </h3>
        <div className="space-y-2">
            {resource?.contactEmail && <a href={`mailto:${resource.contactEmail}`} className="block text-sm font-medium text-slate-700 hover:text-indigo-600 truncate">{resource.contactEmail}</a>}
            {resource?.contactPhone && <div className="text-sm font-medium text-slate-700 truncate">{resource.contactPhone}</div>}
            {resource?.contactWebsite && <a href={resource.contactWebsite} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-slate-700 hover:text-indigo-600 truncate">{resource.contactWebsite.replace(/^https?:\/\//, '')}</a>}
            {!resource?.contactEmail && !resource?.contactPhone && !resource?.contactWebsite && <div className="text-xs text-slate-400">No contact details provided.</div>}
        </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!resource) return null;

  return (
    <CommunityLayout>
      <CommunitySEO 
        title={`${resource.title} - ${resource.category} | TopEdge AI`}
        description={resource.description}
        url={`/community/resource/${id}`}
        type="article"
        author={resource.userName}
      />
      <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
        {/* --- EDIT MODAL --- */}
        <AnimatePresence>
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:p-6 overflow-y-auto">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setIsEditing(false)}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[calc(100vh-3rem)] sm:max-h-[calc(100vh-4rem)] flex flex-col"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                            <h2 className="text-lg font-bold text-slate-900">Edit Resource</h2>
                            <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-6 space-y-8 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Title</label>
                                    <input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Category</label>
                                    <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value as any})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                        <option value="automation">Automation</option>
                                        <option value="project">Project</option>
                                        <option value="tool">Tool</option>
                                        <option value="prompt">Prompt</option>
                                        <option value="resource">Resource</option>
                              <option value="other">Others</option>
                                        
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-slate-700">Description</label>
                                <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Contact Email</label>
                                    <input
                                        type="email"
                                        value={editForm.contactEmail}
                                        onChange={e => setEditForm({...editForm, contactEmail: e.target.value})}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Contact Phone</label>
                                    <input
                                        value={editForm.contactPhone}
                                        onChange={e => setEditForm({...editForm, contactPhone: e.target.value})}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Website</label>
                                    <input
                                        type="url"
                                        value={editForm.contactWebsite}
                                        onChange={e => setEditForm({...editForm, contactWebsite: e.target.value})}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center text-green-600">$</span>
                                        Monetization
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setEditForm(p => ({ ...p, isPaid: false, price: '' }))}
                                            className={cn("p-3 rounded-xl border-2 text-sm font-bold transition-all", !editForm.isPaid ? "bg-white border-green-500 text-green-600 shadow-sm" : "bg-transparent border-slate-200 text-slate-500 hover:bg-white")}
                                        >
                                            Free
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditForm(p => ({ ...p, isPaid: true }))}
                                            className={cn("p-3 rounded-xl border-2 text-sm font-bold transition-all", editForm.isPaid ? "bg-white border-green-500 text-green-600 shadow-sm" : "bg-transparent border-slate-200 text-slate-500 hover:bg-white")}
                                        >
                                            Paid
                                        </button>
                                    </div>

                                    {editForm.isPaid && (
                                        <div className="space-y-4 pt-2">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Price ($)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={editForm.price}
                                                    onChange={e => setEditForm({...editForm, price: e.target.value})}
                                                    className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none font-bold"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Payment Type</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditForm(p => ({ ...p, pricingType: 'one_time' }))}
                                                        className={cn("p-2 rounded-lg text-xs font-bold border transition-all", editForm.pricingType === 'one_time' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200")}
                                                    >
                                                        One-time
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditForm(p => ({ ...p, pricingType: 'monthly' }))}
                                                        className={cn("p-2 rounded-lg text-xs font-bold border transition-all", editForm.pricingType === 'monthly' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200")}
                                                    >
                                                        Monthly
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Access Link</label>
                                        <input
                                            type="url"
                                            value={editForm.link}
                                            onChange={e => setEditForm({...editForm, link: e.target.value})}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Tech Stack</label>
                                        <input
                                            value={editForm.tools}
                                            onChange={e => setEditForm({...editForm, tools: e.target.value})}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                            placeholder="n8n, OpenAI..."
                                        />
                                        <p className="text-[11px] text-slate-400">Separate tools with commas</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">Demo Video</label>
                                    <div className="flex gap-2 mb-2">
                                        <button
                                            type="button"
                                            onClick={() => setVideoSourceType('link')}
                                            className={cn("flex-1 py-2 text-xs font-bold rounded-xl border", videoSourceType === 'link' ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 text-slate-700 border-slate-200")}
                                        >
                                            YouTube / Video Link
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setVideoSourceType('upload')}
                                            className={cn("flex-1 py-2 text-xs font-bold rounded-xl border", videoSourceType === 'upload' ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 text-slate-700 border-slate-200")}
                                        >
                                            Upload Video
                                        </button>
                                    </div>

                                    {videoSourceType === 'link' && (
                                        <input
                                            type="url"
                                            value={editForm.videoUrl}
                                            onChange={e => setEditForm(prev => ({ ...prev, videoUrl: e.target.value, imageUrl: '' }))}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                                            placeholder="https://youtube.com/..."
                                        />
                                    )}

                                    {videoSourceType === 'upload' && (
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-4 flex flex-col gap-3 items-center justify-center text-center">
                                            {editForm.videoUrl ? (
                                                <div className="w-full relative">
                                                    <video src={editForm.videoUrl} className="w-full h-48 object-cover rounded-xl bg-black" controls />
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditForm(prev => ({ ...prev, videoUrl: '' }))}
                                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-4">
                                                    {uploadingVideo ? <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-2" /> : <Upload className="w-8 h-8 text-slate-400 mb-2" />}
                                                    <span className="text-sm font-bold text-slate-700">{uploadingVideo ? "Uploading..." : "Upload Demo Video"}</span>
                                                    <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={uploadingVideo} />
                                                </label>
                                            )}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Cover Image</label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-4 flex flex-col gap-3 items-center justify-center text-center">
                                            {editForm.imageUrl ? (
                                                <div className="w-full relative">
                                                    <img src={editForm.imageUrl} alt={editForm.title || "Cover"} className="w-full h-48 object-cover rounded-xl bg-slate-100" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditForm(prev => ({ ...prev, imageUrl: '' }))}
                                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-4">
                                                    {uploadingImage ? <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-2" /> : <Upload className="w-8 h-8 text-slate-400 mb-2" />}
                                                    <span className="text-sm font-bold text-slate-700">{uploadingImage ? "Uploading..." : "Upload Cover Image"}</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">Attachments</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-4 flex flex-col gap-3 items-center justify-center text-center">
                                        <label className="cursor-pointer w-full flex flex-col items-center justify-center py-2">
                                            {uploadingAttachment ? <Loader2 className="w-6 h-6 animate-spin text-indigo-500" /> : <Upload className="w-6 h-6 text-slate-400" />}
                                            <span className="text-sm font-bold text-slate-700 mt-2">{uploadingAttachment ? "Uploading..." : "Upload files (.zip, .json, .csv)"}</span>
                                            <input type="file" multiple className="hidden" onChange={handleAttachmentsUpload} disabled={uploadingAttachment} />
                                        </label>
                                        {editForm.attachments.length > 0 && (
                                            <div className="w-full grid gap-2">
                                                {editForm.attachments.map((f, i) => (
                                                    <div key={`${f.name}-${i}`} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-xs">
                                                        <span className="truncate max-w-[180px]">{f.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setEditForm(prev => ({
                                                                    ...prev,
                                                                    attachments: prev.attachments.filter((_, idx) => idx !== i)
                                                                }))
                                                            }
                                                            className="text-rose-500"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Setup User Guide</label>
                                    <textarea
                                        value={editForm.whatItDoes}
                                        onChange={e => setEditForm({...editForm, whatItDoes: e.target.value})}
                                        rows={4}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">What it Does / Outcome</label>
                                    <textarea
                                        value={editForm.outcome}
                                        onChange={e => setEditForm({...editForm, outcome: e.target.value})}
                                        rows={4}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 sticky bottom-0 z-10">
                            <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50">Cancel</button>
                            <button onClick={handleUpdate} disabled={saving} className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg">{saving ? 'Saving...' : 'Save Changes'}</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        <AnimatePresence>
            {isDeleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => !deleting && setIsDeleteOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                                <Trash2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Delete resource?</h2>
                                <p className="text-sm text-slate-500">
                                    This will permanently remove this resource from the community.
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-rose-500 font-medium mb-6">
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsDeleteOpen(false)}
                                disabled={deleting}
                                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-sm font-bold text-white hover:bg-rose-700 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        <AnimatePresence>
            {isImageCropOpen && cropImageSrc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => !uploadingImage && setIsImageCropOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10"
                    >
                        <h2 className="text-lg font-bold text-slate-900 mb-2">Adjust cover image</h2>
                        <p className="text-sm text-slate-500 mb-4">
                            Drag to reposition and use the slider to zoom.
                        </p>
                        <div
                            className="mx-auto mb-4 w-[288px] h-[162px] rounded-2xl bg-slate-900 overflow-hidden relative touch-none"
                            onMouseDown={handleImageCropPointerDown}
                            onMouseMove={handleImageCropPointerMove}
                            onMouseUp={handleImageCropPointerUp}
                            onMouseLeave={handleImageCropPointerUp}
                            onTouchStart={handleImageCropPointerDown}
                            onTouchMove={handleImageCropPointerMove}
                            onTouchEnd={handleImageCropPointerUp}
                        >
                            {cropImageSrc && (
                                <img
                                    ref={cropImageRef}
                                    src={cropImageSrc}
                                    alt="Crop"
                                    className="absolute inset-0 m-auto select-none"
                                    style={{
                                        transform: `translate3d(${cropOffset.x}px, ${cropOffset.y}px, 0) scale(${cropZoom})`,
                                        transformOrigin: 'center center'
                                    }}
                                    draggable={false}
                                />
                            )}
                        </div>
                        <div className="mb-6">
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.05}
                                value={cropZoom}
                                onChange={e => {
                                  const z = parseFloat(e.target.value);
                                  setCropZoom(z);
                                  setCropOffset(prev => clampCoverOffset(prev, z));
                                }}
                                className="w-full accent-slate-900"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsImageCropOpen(false)}
                                disabled={uploadingImage}
                                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleImageCropSave}
                                disabled={uploadingImage}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-sm font-bold text-white hover:bg-slate-800 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                Save
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* --- RESOURCE HEADER --- */}
        <div className="bg-white border-b border-slate-200 relative md:sticky md:top-0 z-30 shadow-sm/50 mt-8 md:mt-0">
             <div className="container mx-auto px-4 sm:px-6 max-w-6xl h-16 lg:h-20 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Link to="/community/automation-hub" className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors shrink-0">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-5 w-px bg-slate-200 hidden sm:block shrink-0"></div>
                    
                    <div className="min-w-0 flex-1">
                        <h1 className="text-base lg:text-lg font-bold text-slate-900 leading-none truncate">{resource.title}</h1>
                        <span className="text-[10px] lg:text-xs font-semibold text-slate-400 uppercase tracking-wide block truncate">{resource.category}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {isOwner && (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded-full hover:bg-slate-200 transition-colors"
                            >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                                onClick={() => setIsDeleteOpen(true)}
                                disabled={deleting}
                                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold uppercase rounded-full hover:bg-rose-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Delete</span>
                            </button>
                        </>
                    )}
                    <button onClick={handleShare} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
             </div>
        </div>

        {/* Main Grid */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-6 lg:pt-8 pb-14 lg:pb-20 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-8 space-y-6 min-w-0">
                    <div className="w-full rounded-2xl overflow-hidden bg-black shadow-lg ring-1 ring-slate-200 relative aspect-video">
                        {resource.imageUrl ? (
                          <img
                            src={resource.imageUrl}
                            alt={resource.title}
                            className="w-full h-full object-cover bg-black"
                          />
                        ) : resource.videoUrl ? (
                          resource.videoUrl.includes('cloudinary') ? (
                            <video src={resource.videoUrl} controls className="w-full h-full object-contain bg-black" poster={resource.userPhoto} />
                          ) : (
                            <iframe src={getYouTubeEmbed(resource.videoUrl)} title="Resource Video" className="w-full h-full" allowFullScreen />
                          )
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300">
                            <PlayCircle className="w-16 h-16 opacity-50" />
                          </div>
                        )}
                    </div>

                    {/* Author Row - UPDATED */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 sm:gap-0">
                        <Link to={`/community/profile/${resource.userId}`} className="flex items-center gap-3 group">
                            {resource.userPhoto ? (
                                <img src={resource.userPhoto} alt={resource.userName} className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User className="w-6 h-6" /></div>
                            )}
                            <div>
                                <p className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{resource.userName}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {resource.createdAt?.toDate ? resource.createdAt.toDate().toLocaleDateString() : 'New'}</span>
                                </div>
                            </div>
                        </Link>

                        {/* NEW: View Profile Button */}
                        <Link 
                            to={`/community/profile/${resource.userId}`}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase rounded-xl transition-all w-full sm:w-auto justify-center"
                        >
                            View Profile <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Mobile Only: Tech Stack & Sidebar */}
                    <div className="block lg:hidden space-y-4">
                        <AccessCard />
                        <TechStack />
                        <ContactCard />
                    </div>

                    {/* Content Tabs */}
                    <div className="space-y-8">
                        {/* 1. Overview */}
                        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-indigo-500" />
                              Overview
                            </h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm lg:text-base">
                              {resource.description}
                            </div>
                        </section>

                        {/* 2. What it Does / Outcome */}
                        {(resource.outcome) && (
                            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> What it Does / Outcome Achieved</h3>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm lg:text-base">{resource.outcome}</div>
                            </section>
                        )}

                        {/* 3. Setup Guide */}
                        {resource.whatItDoes && (
                            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-500" /> Setup User Guide</h3>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm lg:text-base">{resource.whatItDoes}</div>
                            </section>
                        )}

                        {/* 4. Files */}
                        {resource.attachments && resource.attachments.length > 0 && (
                          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Box className="w-5 h-5 text-indigo-500" /> Resource Files</h3>
                            <ul className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200">
                              {resource.attachments.map((f, i) => (
                                <li key={`${f.name}-${i}`} className="flex items-center justify-between px-4 py-3 text-sm">
                                  <a href={!resource.isPaid || hasAccess ? f.url : undefined} className="font-medium text-slate-700 hover:text-indigo-600 truncate max-w-[200px] sm:max-w-md">
                                    {f.name}
                                  </a>
                                  {resource.isPaid && !hasAccess ? (
                                    <button onClick={handleLockedAttachmentClick} className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-200 flex items-center gap-1">
                                       Download
                                    </button>
                                  ) : (
                                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                                      Download
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </section>
                        )}
                        
                        <div className="pt-8 border-t border-slate-200">
                            <ResourceDiscussion resourceId={resource.id} />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200">
                        <ResourceReviews resourceId={resource.id} />
                    </div>

                    <RelatedResources current={{ id: resource.id, title: resource.title, tools: resource.tools || [], category: resource.category, userId: resource.userId }} />
                </div>

                {/* RIGHT COLUMN (Desktop Sidebar) */}
                <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-5">
                    <AccessCard />
                    <TechStack />
                    <ContactCard />
                </div>
             </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default ResourceDetails;
