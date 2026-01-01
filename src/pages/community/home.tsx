import React from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Zap, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const CommunityHome = () => {
  const { user } = useAuth();

  return (
    <CommunityLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gray-100/50 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-semibold text-gray-700 bg-gray-50 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-default"
            >
              <Sparkles className="w-4 h-4 text-gray-600" />
              <span>Welcome to the Hub</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 mb-8 tracking-tight leading-[1.1]">
              The Future of AI <br /> 
              <span className="text-gray-900">Built Together.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed font-light">
              Connect with elite AI builders, share cutting-edge automations, and access exclusive resources. 
              TopEdge AI Community is your gateway to the next generation of intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Link 
                  to="/community/automation-hub" 
                  className="px-10 py-5 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3 group shadow-lg shadow-gray-900/20"
                >
                  Go to Hub
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link 
                  to="/community/signup" 
                  className="px-10 py-5 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3 group shadow-lg shadow-gray-900/20"
                >
                  Join the Community
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              <Link 
                to="/community/profiles" 
                className="px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-all border border-gray-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Explore Profiles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-gray-50/50 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Why Join Us?</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">Everything you need to accelerate your AI journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: "Network",
                description: "Connect with like-minded AI enthusiasts, developers, and business leaders.",
                bg: "bg-blue-50/80"
              },
              {
                icon: <Zap className="w-8 h-8 text-purple-600" />,
                title: "Build",
                description: "Share your automation projects, get feedback, and monetize your tools.",
                bg: "bg-purple-50/80"
              },
              {
                icon: <Globe className="w-8 h-8 text-green-600" />,
                title: "Grow",
                description: "Access exclusive resources, tutorials, and open-source libraries.",
                bg: "bg-green-50/80"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm", item.bg)}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto p-16 md:p-24 rounded-[3rem] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black text-white shadow-2xl shadow-gray-900/30 overflow-hidden relative group"
          >
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Ready to Start Building?</h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Join thousands of developers and entrepreneurs pushing the boundaries of what's possible with AI.
              </p>
              <Link 
                to="/community/signup" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </CommunityLayout>
  );
};

export default CommunityHome;
