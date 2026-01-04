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
  stars?: number;
}

export function calculateReputation(
  userProfile: UserProfileForReputation,
  resources: ResourceForReputation[]
): ReputationResult {
  const resourcesCount = resources.length;
  const totalStars = resources.reduce((sum, r) => sum + (r.stars || 0), 0);

  const hasCompleteProfile =
    !!userProfile?.bio &&
    !!userProfile?.photoURL &&
    (!!userProfile?.github || !!userProfile?.linkedin || !!userProfile?.websiteURL);

  const score =
    resourcesCount * 15 +
    totalStars * 2 +
    (hasCompleteProfile ? 10 : 0);

  let tier: BadgeTier = 'Builder';
  if (score >= 201) tier = 'Grandmaster';
  else if (score >= 51) tier = 'Architect';

  return { score, tier };
}

