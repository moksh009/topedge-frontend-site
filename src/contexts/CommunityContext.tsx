import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs, query, orderBy, limit, where, getDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebase';

interface Resource {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  price?: number;
  pricingType?: 'one_time' | 'monthly';
  tools: string[];
  userId: string;
  userName: string;
  userPhoto?: string;
  videoUrl?: string;
  imageUrl?: string;
  category: 'automation' | 'project' | 'tool' | 'prompt';
  upvotes?: number;
  upvotedBy?: string[];
  contactEmail?: string;
  contactPhone?: string;
  contactWebsite?: string;
  isHiring?: boolean;
  createdAt?: any;
}

interface TopCreator {
  id: string;
  name: string;
  photoURL: string;
  bio: string;
  role: string;
  isVerified?: boolean;
  resourcesCount: number;
  totalUpvotes: number;
  skills: string[];
}

interface CommunityContextType {
  resources: Resource[];
  topCreators: TopCreator[];
  isLoadingResources: boolean;
  isLoadingTopCreators: boolean;
  fetchResources: (force?: boolean) => Promise<void>;
  fetchTopCreators: (force?: boolean) => Promise<void>;
  resourceCache: Map<string, Resource>;
  userProfileCache: Map<string, any>;
  addToResourceCache: (resource: Resource) => void;
  addToUserProfileCache: (userId: string, profile: any) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [topCreators, setTopCreators] = useState<TopCreator[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(false);
  const [isLoadingTopCreators, setIsLoadingTopCreators] = useState(false);
  
  // In-memory caches
  const [resourceCache] = useState(new Map<string, Resource>());
  const [userProfileCache] = useState(new Map<string, any>());
  const [lastFetchTime, setLastFetchTime] = useState<{ resources: number; topCreators: number }>({
    resources: 0,
    topCreators: 0
  });

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const fetchResources = async (force = false) => {
    const now = Date.now();
    if (!force && resources.length > 0 && now - lastFetchTime.resources < CACHE_DURATION) {
      return;
    }

    setIsLoadingResources(true);
    try {
      const q = query(collection(db, 'community_resources'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedResources = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[];
      
      setResources(fetchedResources);
      fetchedResources.forEach(r => resourceCache.set(r.id, r));
      setLastFetchTime(prev => ({ ...prev, resources: now }));
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setIsLoadingResources(false);
    }
  };

  const fetchTopCreators = async (force = false) => {
    const now = Date.now();
    if (!force && topCreators.length > 0 && now - lastFetchTime.topCreators < CACHE_DURATION) {
      return;
    }

    setIsLoadingTopCreators(true);
    try {
      const q = query(collection(db, 'public_profiles'), orderBy('totalUpvotes', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);
      const fetchedCreators = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TopCreator[];
      
      setTopCreators(fetchedCreators);
      setLastFetchTime(prev => ({ ...prev, topCreators: now }));
    } catch (error) {
      console.error("Error fetching top creators:", error);
    } finally {
      setIsLoadingTopCreators(false);
    }
  };

  const addToResourceCache = (resource: Resource) => {
    resourceCache.set(resource.id, resource);
  };

  const addToUserProfileCache = (userId: string, profile: any) => {
    userProfileCache.set(userId, profile);
  };

  return (
    <CommunityContext.Provider value={{
      resources,
      topCreators,
      isLoadingResources,
      isLoadingTopCreators,
      fetchResources,
      fetchTopCreators,
      resourceCache,
      userProfileCache,
      addToResourceCache,
      addToUserProfileCache
    }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
