export interface UserProfile {
  linkedin: string | undefined;
  github: string | undefined;
  uid: string;
  email: string;
  fullName: string;
  photoURL?: string;
  bannerURL?: string;
  location?: string;
  age?: number;
  gender?: string;
  buildingInAI?: string;
  companyName?: string;
  websiteURL?: string;
  description?: string;
  currentWork?: string;
  aiSkills?: string[];
  workOpenFor?: string;
  workingStatus?: string;
  networkingIntent?: string[];
  phoneNumber?: string;
  contactDetails?: string;
  lookingToGetHired?: boolean;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface Resource {
  id: string;
  userId: string;
  authorName: string;
  authorPhoto?: string;
  title: string;
  description: string;
  fullDescription: string;
  whatItDoes: string;
  outcome: string;
  demoVideoUrl?: string;
  isPaid: boolean;
  price?: number;
  toolkit?: string[];
  category: string;
  tags: string[];
  createdAt: any;
  updatedAt: any;
  downloads: number;
  views: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: any;
  authorId: string;
}

export const ADMIN_EMAILS = [
  'acctopedge@gmail.com',
  'moksh2031@gmail.com',
  'smittilva2006@gmail.com',
  'team@topedgeai.com'
];
