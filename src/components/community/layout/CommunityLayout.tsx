import React from 'react';

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500/30 pt-16 md:pt-20">
      {children}
    </div>
  );
};

export default CommunityLayout;
