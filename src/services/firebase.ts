import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug check for missing configuration
const missingKeys = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  console.error(`Missing Firebase configuration keys: ${missingKeys.join(', ')}. Check your .env file.`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

 

// Initialize Auth
const auth = getAuth(app);

// Initialize Storage using default bucket from config
const storage = getStorage(app);

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

interface ROIData {
  email: string;
  businessName: string;
  monthlyInquiries: number;
  averageOrderValue: number;
  closeRate: number;
  projectedRevenue: number;
  additionalRevenue: number;
  notes?: string;  // Optional notes field
  timestamp?: Date;
}

// Function to store ROI calculator data with validation
export const storeROIData = async (data: {
  email: string;
  businessName: string;
  monthlyInquiries: number;
  averageOrderValue: number;
  closeRate: number;
  projectedRevenue: number;
  additionalRevenue: number;
  notes?: string;  // Added notes field
  timestamp?: Date;
}): Promise<string> => {
  try {
    // Validate required fields
    if (!data.email || !data.businessName) {
      throw new Error('Email and business name are required');
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    // Validate numeric values
    if (
      isNaN(data.monthlyInquiries) ||
      isNaN(data.averageOrderValue) ||
      isNaN(data.closeRate) ||
      isNaN(data.projectedRevenue) ||
      isNaN(data.additionalRevenue)
    ) {
      throw new Error('Invalid numeric values');
    }

    // Prepare data with server timestamp
    const roiData = {
      ...data,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
      status: 'pending', // For tracking follow-up status
      source: 'roi_calculator',
    };

    // Store in Firestore
    const roiCollection = collection(db, 'roi_calculations');
    const docRef = await addDoc(roiCollection, roiData);

    console.log('ROI data stored successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error storing ROI data:', error);
    throw error;
  }
};

export { db, auth }; 
export { storage };
