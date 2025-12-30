import React from 'react';
import { AlertTriangle, Sparkles, MessageCircle, Clock, CheckCircle, Zap, Users, Target } from 'lucide-react';

const problems = [
  {
    icon: <Clock className="w-8 h-8 text-red-500" />,
    title: 'Missed Messages',
    description: 'Late night queries go unanswered'
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-orange-500" />,
    title: 'Unanswered Queries',
    description: 'Customer questions remain pending'
  },
  {
    icon: <Users className="w-8 h-8 text-purple-500" />,
    title: 'Platform Overload',
    description: 'Too many channels to manage'
  },
];

const solutions = [
  {
    icon: <Zap className="w-8 h-8 text-green-500" />,
    title: 'Instant AI Replies',
    description: '24/7 automated responses'
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-500" />,
    title: 'Accurate Answers',
    description: 'Human-like conversation quality'
  },
  {
    icon: <Target className="w-8 h-8 text-emerald-500" />,
    title: 'Growth Focused',
    description: 'Never miss opportunities'
  },
];

const ProblemsSolutionsSection = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-4 leading-tight tracking-tight" style={{fontFamily: 'Inter, ui-sans-serif, system-ui'}}>
          Messages Everywhere. Customers Everywhere. Time? <span className="text-theme-glow-primary">Nowhere.</span>
        </h2>
        <p className="text-lg md:text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">
          Empowering businesses with instant, human-style AI replies—so you never miss a growth opportunity.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl shadow-xl p-8 lg:p-10 flex flex-col gap-8 border border-red-100/50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-400 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400 rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-sm font-semibold text-red-700 bg-red-100 px-4 py-2 rounded-full">
                  Problems
                </span>
              </div>
              
              <p className="text-xl text-gray-800 mb-8 leading-relaxed">
                Your customers expect instant replies on all platforms. Miss any message, and you lose a sale and customer trust.
              </p>
              
              <div className="space-y-4">
                {problems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-red-100/30 backdrop-blur-sm">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-8 lg:p-10 flex flex-col gap-8 border border-green-100/50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-green-400 rounded-full -translate-y-16 -translate-x-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-400 rounded-full translate-y-12 translate-x-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-green-700 bg-green-100 px-4 py-2 rounded-full">
                  Solution
                </span>
              </div>
              
              <p className="text-xl text-gray-800 mb-8 leading-relaxed">
                TopEdge AI responds instantly with a natural, human style—on DMs, comments, product queries, and bookings—so you never miss a growth opportunity.
              </p>
              
              <div className="space-y-4">
                {solutions.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-green-100/30 backdrop-blur-sm">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSolutionsSection; 
