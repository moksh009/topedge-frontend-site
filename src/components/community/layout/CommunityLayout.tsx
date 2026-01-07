import React from 'react';
import CommunityNavbar from './CommunityNavbar';
import Footer from '@/components/Footer';

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500/30">
      <CommunityNavbar />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default CommunityLayout;
