export type BadgeTier = 'Builder' | 'Architect' | 'Grandmaster';

export interface ReputationResult {
  score: number;
  tier: BadgeTier;
}

export interface UserProfileForReputation {
  bio?: string;
  photoURL?: string;
  github?: string;
  linkedin?: string;
  websiteURL?: string;
}

export interface ResourceForReputation {
  userId: string;
  upvotes?: number;
  views?: number;
  downloads?: number;
  linkClicks?: number;
  purchasers?: string[];
}

export function calculateReputation(
  userProfile: UserProfileForReputation,
  resources: ResourceForReputation[]
): ReputationResult {
  const resourcesCount = resources.length;
  const totalUpvotes = resources.reduce((sum, r) => sum + (r.upvotes || 0), 0);
  const totalViews = resources.reduce((sum, r) => sum + (r.views || 0), 0);
  const totalDownloads = resources.reduce((sum, r) => sum + (r.downloads || 0), 0);
  const totalLinkClicks = resources.reduce((sum, r) => sum + (r.linkClicks || 0), 0);
  const totalSales = resources.reduce((sum, r) => sum + (r.purchasers?.length || 0), 0);

  const hasBio = !!userProfile?.bio;
  const hasPhoto = !!userProfile?.photoURL;
  const hasSocial = !!userProfile?.github || !!userProfile?.linkedin || !!userProfile?.websiteURL;

  const profileScore = 
    (hasBio ? 5 : 0) +
    (hasPhoto ? 5 : 0) +
    (hasSocial ? 5 : 0);

  const score =
    resourcesCount * 15 +
    totalUpvotes * 2 +
    Math.floor(totalViews * 0.1) + // 1 point per 10 views
    totalDownloads * 1 + // 1 point per download
    totalLinkClicks * 1 + // 1 point per link click
    totalSales * 5 + // 5 points per sale
    profileScore;

  let tier: BadgeTier = 'Builder';
  if (score >= 500) tier = 'Grandmaster'; // Increased threshold due to more points sources
  else if (score >= 100) tier = 'Architect';

  return { score: Math.floor(score), tier };
}
