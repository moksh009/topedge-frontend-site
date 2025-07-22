import React from 'react';
import { Wand2, Sparkles } from 'lucide-react';

const problems = [
  {
    img: (
      <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20 mx-auto"><rect width="64" height="64" rx="16" fill="#18181B"/><path d="M20 44c0-6 8-6 8-12V20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><circle cx="32" cy="48" r="2.5" fill="#fff"/></svg>
    ),
    alt: 'Late night, missed messages',
  },
  {
    img: (
      <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20 mx-auto"><rect width="64" height="64" rx="16" fill="#F5E9D7"/><rect x="18" y="24" width="28" height="16" rx="3" fill="#fff"/><rect x="22" y="28" width="20" height="2" rx="1" fill="#EAB308"/><rect x="22" y="32" width="12" height="2" rx="1" fill="#EAB308"/></svg>
    ),
    alt: 'Unanswered queries',
  },
  {
    img: (
      <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20 mx-auto"><rect width="64" height="64" rx="16" fill="#F5E9D7"/><rect x="18" y="18" width="28" height="28" rx="6" fill="#fff"/><rect x="24" y="24" width="16" height="4" rx="2" fill="#F87171"/><rect x="24" y="32" width="10" height="4" rx="2" fill="#F87171"/></svg>
    ),
    alt: 'Overwhelmed by platforms',
  },
];

const solutions = [
  {
    img: (
      <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20 mx-auto"><rect width="64" height="64" rx="16" fill="#F5E9D7"/><circle cx="32" cy="32" r="16" fill="#22C55E"/><path d="M28 32l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    alt: 'AI handles replies',
  },
  {
    img: (
      <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20 mx-auto"><rect width="64" height="64" rx="16" fill="#F5E9D7"/><rect x="18" y="24" width="28" height="16" rx="3" fill="#fff"/><rect x="22" y="28" width="20" height="2" rx="1" fill="#22C55E"/><rect x="22" y="32" width="12" height="2" rx="1" fill="#22C55E"/></svg>
    ),
    alt: 'Instant, accurate answers',
  },
  {
    img: (
      <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20 mx-auto"><rect width="64" height="64" rx="16" fill="#F5E9D7"/><rect x="18" y="18" width="28" height="28" rx="6" fill="#fff"/><rect x="24" y="24" width="16" height="4" rx="2" fill="#22C55E"/><rect x="24" y="32" width="10" height="4" rx="2" fill="#22C55E"/></svg>
    ),
    alt: 'Never miss a growth opportunity',
  },
];

const ProblemsSolutionsSection = () => {
  return (
    <section className="w-full bg-[#F7F8FA] py-16 md:py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-4 leading-tight tracking-tight" style={{fontFamily: 'Inter, ui-sans-serif, system-ui'}}>Messages Everywhere. Customers Everywhere. Time? <span className="text-theme-glow-primary">Nowhere.</span></h2>
        <p className="text-lg md:text-xl text-center text-gray-500 mb-12 max-w-2xl mx-auto">Empowering businesses with instant, human-style AI replies—so you never miss a growth opportunity.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problems */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Wand2 className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Problems</span>
            </div>
            <p className="text-lg text-gray-800 mb-4">Your customers expect instant replies on all platforms. Miss any message, and you lose a sale and customer trust.</p>
            <div className="flex gap-4 justify-center">
              {problems.map((item, i) => (
                <div key={i} className="bg-[#F7F8FA] rounded-xl p-3 flex flex-col items-center w-24 h-24 shadow-sm">
                  {item.img}
                  <span className="sr-only">{item.alt}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Solutions */}
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">Solution</span>
            </div>
            <p className="text-lg text-gray-800 mb-4">TopEdge AI responds instantly with a natural, human style—on DMs, comments, product queries, and bookings—so you never miss a growth opportunity.</p>
            <div className="flex gap-4 justify-center">
              {solutions.map((item, i) => (
                <div key={i} className="bg-[#F7F8FA] rounded-xl p-3 flex flex-col items-center w-24 h-24 shadow-sm">
                  {item.img}
                  <span className="sr-only">{item.alt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSolutionsSection; 