import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
}

export function ResourceDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="flex-1 space-y-4 w-full">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-10 w-3/4 sm:w-1/2" />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-8 w-px bg-slate-200" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Skeleton className="h-12 w-full md:w-32 rounded-xl" />
              <Skeleton className="h-12 w-12 rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media Placeholder */}
            <div className="aspect-video bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
               <Skeleton className="w-full h-full rounded-xl" />
            </div>

            {/* Tabs & Description */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex gap-6 border-b border-slate-100 pb-4 mb-6">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             {/* Get Access Card */}
             <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-12 w-full rounded-xl mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
             </div>

             {/* Author Card */}
             <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                   <Skeleton className="w-12 h-12 rounded-full" />
                   <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                   </div>
                </div>
                <Skeleton className="h-8 w-full rounded-xl" />
             </div>

             {/* Tools */}
             <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <Skeleton className="h-5 w-24 mb-4" />
                <div className="flex flex-wrap gap-2">
                   <Skeleton className="h-8 w-20 rounded-full" />
                   <Skeleton className="h-8 w-16 rounded-full" />
                   <Skeleton className="h-8 w-24 rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResourceCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] border border-slate-200 overflow-hidden">
      {/* Media Header Skeleton */}
      <div className="relative aspect-video w-full bg-slate-100 border-b border-slate-50">
        <Skeleton className="absolute top-4 left-4 w-24 h-8 rounded-full" />
        <Skeleton className="absolute top-4 right-4 w-16 h-8 rounded-full" />
        <div className="w-full h-full flex items-center justify-center">
          <Skeleton className="w-16 h-16 rounded-3xl" />
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="p-6 flex-1 flex flex-col relative">
        <div className="mb-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
          
          {/* Stats Skeleton */}
          <div className="flex items-center gap-3 mt-4">
             <Skeleton className="h-4 w-20" />
             <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Tools Skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner Skeleton */}
      <div className="h-48 md:h-64 bg-white border-b border-slate-200 relative overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar Skeleton */}
          <div className="w-full md:w-80 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center">
              <Skeleton className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md -mt-20 mb-4" />
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto mb-6" />
              <div className="flex justify-center gap-4 mb-8">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                 <div className="text-center">
                   <Skeleton className="h-8 w-12 mx-auto mb-1" />
                   <Skeleton className="h-3 w-16 mx-auto" />
                 </div>
                 <div className="text-center">
                   <Skeleton className="h-8 w-12 mx-auto mb-1" />
                   <Skeleton className="h-3 w-16 mx-auto" />
                 </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCardSkeleton />
                <ResourceCardSkeleton />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden relative flex flex-col items-center">
      {/* Banner Skeleton */}
      <div className="h-24 sm:h-32 w-full bg-slate-50 relative border-b border-slate-100">
         <div className="absolute top-4 right-4 flex gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
         </div>
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8 flex-1 flex flex-col relative items-center w-full">
        {/* Avatar Skeleton */}
        <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 bg-white shadow-xl relative z-10 -mt-12 sm:-mt-16">
           <Skeleton className="w-full h-full rounded-[1.7rem] sm:rounded-[2.1rem]" />
        </div>
        
        {/* Identity Skeleton */}
        <div className="mb-4 sm:mb-5 flex flex-col items-center mt-4 w-full">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-6 w-32 rounded-full mb-3" />
            <Skeleton className="h-4 w-40" />
        </div>

        {/* Bio Skeleton */}
        <div className="mb-6 w-full flex justify-center">
            <div className="space-y-2 w-full max-w-xs">
               <Skeleton className="h-3 w-full" />
               <Skeleton className="h-3 w-5/6 mx-auto" />
            </div>
        </div>

        {/* Skills Skeleton */}
        <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-100 w-full flex justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
               <Skeleton className="h-6 w-16 rounded-full" />
               <Skeleton className="h-6 w-20 rounded-full" />
               <Skeleton className="h-6 w-14 rounded-full" />
            </div>
        </div>
      </div>
    </div>
  );
}

export function TopBuildersSkeleton() {
  return (
    <div className="mb-0">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-2" />
            <Skeleton className="h-4 w-20 mx-auto mb-1" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
