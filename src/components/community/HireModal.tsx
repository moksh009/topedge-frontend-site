import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, PhoneCall, User, Check, Mail, Phone, ExternalLink, Calendar, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { db } from '@/services/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface HireModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  photoURL?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactWebsite?: string;
  availableFor?: string[];
  recipientId: string;
}

export default function HireModal({
  open,
  onClose,
  name,
  photoURL,
  contactEmail,
  contactPhone,
  contactWebsite,
  availableFor = ['Freelance', 'Consulting'],
  recipientId
}: HireModalProps) {
  const { user } = useAuth();
  
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handleCopy = async (text: string, type: 'email' | 'phone') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      try {
        if (user && recipientId && recipientId !== user.uid) {
          await addDoc(collection(db, 'notifications'), {
            recipientId,
            senderId: user.uid,
            senderName: user.displayName || user.email || 'User',
            senderPhoto: user.photoURL || '',
            type: 'hire_request',
            resourceId: null,
            resourceTitle: '',
            read: false,
            createdAt: serverTimestamp()
          });
        }
      } catch (e) {
        console.error('Notify hire request failed', e);
      }
      if (type === 'email') {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } else {
        setPhoneCopied(true);
        setTimeout(() => setPhoneCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isCalendly = (url?: string) => !!url && /calendly\.com/i.test(url);

  // Animation variants for responsive behavior
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header / Profile Section */}
            <div className="relative bg-slate-50 border-b border-slate-100 p-6 sm:p-8 text-center overflow-hidden">
                {/* Decorative Background Blob */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white text-slate-400 hover:text-slate-700 transition-colors shadow-sm"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-4">
                        {photoURL ? (
                            <img src={photoURL} alt={name} className="w-24 h-24 rounded-[1.5rem] object-cover border-4 border-white shadow-xl shadow-indigo-500/10" />
                        ) : (
                            <div className="w-24 h-24 rounded-[1.5rem] bg-white border-4 border-white shadow-xl flex items-center justify-center text-slate-300">
                                <User className="w-10 h-10" />
                            </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-[3px] border-white rounded-full" title="Available" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{name}</h3>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {availableFor.map((item, i) => (
                            <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-white border border-slate-200 text-slate-500 rounded-md shadow-sm">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8 space-y-4 bg-white">
                
                {!user ? (
                    <div className="py-8 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                        <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-3 flex items-center justify-center text-slate-400">
                            <User className="w-6 h-6" />
                        </div>
                        <p className="text-slate-900 font-bold mb-1">Contact Info Hidden</p>
                        <p className="text-slate-500 text-sm mb-4">Please log in to view contact details.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-px flex-1 bg-slate-100"></div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Methods</span>
                            <div className="h-px flex-1 bg-slate-100"></div>
                        </div>

                        {/* 1. Email Card */}
                        <div className="group relative">
                            <button
                                onClick={() => handleCopy(contactEmail || '', 'email')}
                                disabled={!contactEmail}
                                className={cn(
                                    "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 text-left relative overflow-hidden",
                                    emailCopied 
                                        ? "bg-emerald-50 border-emerald-500/30 ring-1 ring-emerald-500/20" 
                                        : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/40"
                                )}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                        emailCopied ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-500 group-hover:text-slate-900"
                                    )}>
                                        {emailCopied ? <Check className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Email Address</p>
                                        <p className="text-sm text-slate-500 font-medium truncate max-w-[180px] sm:max-w-[220px]">
                                            {contactEmail || "Not provided"}
                                        </p>
                                    </div>
                                </div>
                                <div className={cn(
                                    "text-xs font-bold px-3 py-1.5 rounded-lg transition-colors",
                                    emailCopied ? "bg-emerald-100 text-emerald-700" : "bg-slate-50 text-slate-600 group-hover:bg-slate-100"
                                )}>
                                    {emailCopied ? "Copied" : "Copy"}
                                </div>
                            </button>
                        </div>

                        {/* 2. Phone Card (If exists) */}
                        {contactPhone && (
                            <div className="group relative">
                                <button
                                    onClick={() => handleCopy(contactPhone, 'phone')}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 text-left relative overflow-hidden",
                                        phoneCopied 
                                            ? "bg-emerald-50 border-emerald-500/30 ring-1 ring-emerald-500/20" 
                                            : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/40"
                                    )}
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                            phoneCopied ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-500 group-hover:text-slate-900"
                                        )}>
                                            {phoneCopied ? <Check className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">Phone Number</p>
                                            <p className="text-sm text-slate-500 font-medium">{contactPhone}</p>
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "text-xs font-bold px-3 py-1.5 rounded-lg transition-colors",
                                        phoneCopied ? "bg-emerald-100 text-emerald-700" : "bg-slate-50 text-slate-600 group-hover:bg-slate-100"
                                    )}>
                                        {phoneCopied ? "Copied" : "Copy"}
                                    </div>
                                </button>
                            </div>
                        )}

                        {/* 3. External Link (Calendly or Website) */}
                        {contactWebsite && (
                            <a
                                href={contactWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                        isCalendly(contactWebsite) ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-500 group-hover:text-slate-900"
                                    )}>
                                        {isCalendly(contactWebsite) ? <Calendar className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            {isCalendly(contactWebsite) ? "Book a Meeting" : "Visit Website"}
                                        </p>
                                        <p className="text-sm text-slate-500 font-medium truncate max-w-[180px] sm:max-w-[220px]">
                                            {contactWebsite.replace(/^https?:\/\//, '')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-slate-300 group-hover:text-indigo-500 transition-colors">
                                    <ExternalLink className="w-5 h-5" />
                                </div>
                            </a>
                        )}
                    </>
                )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
