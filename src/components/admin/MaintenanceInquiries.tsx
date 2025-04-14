import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { motion } from 'framer-motion';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  createdAt: {
    toDate: () => Date;
  };
}

export const MaintenanceInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a query against the collection
    const q = query(
      collection(db, 'maintenance-inquiries'),
      orderBy('createdAt', 'desc')
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const inquiriesData: Inquiry[] = [];
      querySnapshot.forEach((doc) => {
        inquiriesData.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      setInquiries(inquiriesData);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Maintenance Price Inquiries</h1>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
            />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No inquiries yet
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inquiries.map((inquiry) => (
              <motion.div
                key={inquiry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{inquiry.name}</h3>
                  <span className="text-sm text-purple-400 font-medium">
                    {inquiry.plan}
                  </span>
                </div>
                
                <div className="space-y-2 text-gray-400">
                  <p className="flex items-center gap-2">
                    <span className="text-gray-500">Email:</span>
                    <a href={`mailto:${inquiry.email}`} className="text-blue-400 hover:text-blue-300">
                      {inquiry.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gray-500">Phone:</span>
                    <a href={`tel:${inquiry.phone}`} className="text-blue-400 hover:text-blue-300">
                      {inquiry.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gray-500">Date:</span>
                    {new Date(inquiry.createdAt.toDate()).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 