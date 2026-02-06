import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface CacheData {
  resources: any[];
  profiles: Record<string, any>;
  publicProfilesList: any[];
  userResources: Record<string, any[]>;
  topBuilders: any[];
  resourceStats: Record<string, any>;
  resourceDetails: Record<string, any>;
  lastFetched: Record<string, number>;
}

interface CommunityCacheContextType {
  cache: CacheData;
  setCachedResources: (resources: any[]) => void;
  setCachedProfile: (userId: string, data: any) => void;
  setCachedPublicProfilesList: (profiles: any[]) => void;
  setCachedUserResources: (userId: string, resources: any[]) => void;
  setCachedTopBuilders: (builders: any[]) => void;
  setCachedResourceStats: (resourceId: string, stats: any) => void;
  cacheResource: (resource: any) => void;
  invalidateCache: () => void;
}

const CommunityCacheContext = createContext<CommunityCacheContextType | undefined>(undefined);

export const CommunityCacheProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState<CacheData>({
    resources: [],
    profiles: {},
    publicProfilesList: [],
    userResources: {},
    topBuilders: [],
    resourceStats: {},
    resourceDetails: {},
    lastFetched: {}
  });

  const setCachedResources = useCallback((resources: any[]) => {
    setCache(prev => ({
      ...prev,
      resources,
      lastFetched: { ...prev.lastFetched, resources: Date.now() }
    }));
  }, []);

  const setCachedProfile = useCallback((userId: string, data: any) => {
    setCache(prev => ({
      ...prev,
      profiles: { ...prev.profiles, [userId]: data }
    }));
  }, []);

  const setCachedPublicProfilesList = useCallback((profiles: any[]) => {
    setCache(prev => ({
      ...prev,
      publicProfilesList: profiles,
      lastFetched: { ...prev.lastFetched, publicProfilesList: Date.now() }
    }));
  }, []);

  const setCachedUserResources = useCallback((userId: string, resources: any[]) => {
    setCache(prev => ({
      ...prev,
      userResources: { ...prev.userResources, [userId]: resources }
    }));
  }, []);

  const setCachedTopBuilders = useCallback((builders: any[]) => {
    setCache(prev => ({
      ...prev,
      topBuilders: builders,
      lastFetched: { ...prev.lastFetched, topBuilders: Date.now() }
    }));
  }, []);

  const setCachedResourceStats = useCallback((resourceId: string, stats: any) => {
    setCache(prev => ({
      ...prev,
      resourceStats: { ...prev.resourceStats, [resourceId]: stats }
    }));
  }, []);

  const cacheResource = useCallback((resource: any) => {
    setCache(prev => {
      // 1. Update resourceDetails
      const newResourceDetails = { ...prev.resourceDetails, [resource.id]: resource };

      // 2. Update resources list (if exists)
      const newResources = prev.resources.map(r => 
        r.id === resource.id ? { ...r, ...resource } : r
      );

      // 3. Update userResources (if exists)
      const userId = resource.userId;
      let newUserResources = { ...prev.userResources };
      if (userId && newUserResources[userId]) {
         newUserResources[userId] = newUserResources[userId].map(r => 
            r.id === resource.id ? { ...r, ...resource } : r
         );
      }

      return {
        ...prev,
        resourceDetails: newResourceDetails,
        resources: newResources,
        userResources: newUserResources
      };
    });
  }, []);

  const invalidateCache = useCallback(() => {
    setCache({
      resources: [],
      profiles: {},
      publicProfilesList: [],
      userResources: {},
      topBuilders: [],
      resourceStats: {},
      resourceDetails: {},
      lastFetched: {}
    });
  }, []);

  return (
    <CommunityCacheContext.Provider value={{
      cache,
      setCachedResources,
      setCachedProfile,
      setCachedPublicProfilesList,
      setCachedUserResources,
      setCachedTopBuilders,
      setCachedResourceStats,
      cacheResource,
      invalidateCache
    }}>
      {children}
    </CommunityCacheContext.Provider>
  );
};

export const useCommunityCache = () => {
  const context = useContext(CommunityCacheContext);
  if (context === undefined) {
    throw new Error('useCommunityCache must be used within a CommunityCacheProvider');
  }
  return context;
};
