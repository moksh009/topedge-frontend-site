import React from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CommunityHome = () => {
  const { user } = useAuth();

  return (
    <CommunityLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] right-[-20%] w-[700px] h-[700px] bg-gray-100 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-30%] left-[-20%] w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center px-4 py-1.5 mb-10 text-sm font-medium text-gray-700 bg-gray-50 rounded-full border border-gray-200">
              <span>Welcome to the Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
              The future of AI, built together
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed font-light">
              Connect with elite AI builders, share cutting-edge automations, and access exclusive resources. 
              TopEdge AI Community is your gateway to the next generation of intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Link 
                  to="/community/automation-hub" 
                  className="px-10 py-5 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all shadow-lg shadow-gray-900/20"
                >
                  Go to Hub →
                </Link>
              ) : (
                <Link 
                  to="/community/signup" 
                  className="px-10 py-5 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 hover:shadow-xl hover:scale-105 transition-all shadow-lg shadow-gray-900/20"
                >
                  Join the Community →
                </Link>
              )}
              <Link 
                to="/community/profiles" 
                className="px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-all border border-gray-200 shadow-md hover:shadow-lg"
              >
                Explore Profiles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Why join us</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">Everything you need to accelerate your AI journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Network",
                description: "Connect with like‑minded AI enthusiasts, developers, and business leaders.",
              },
              {
                title: "Build",
                description: "Share automation projects, get feedback, and grow your tools.",
              },
              {
                title: "Grow",
                description: "Access exclusive resources, tutorials, and open‑source libraries.",
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Build. Share. Grow.</h3>
              <p className="text-xl text-gray-600 max-w-xl">A curated space for serious builders. Publish automations, discover open‑source tools, and connect with the right people.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/community/automation-hub" className="px-6 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors">Explore Automation Hub</Link>
                <Link to="/community/open-source" className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-colors">Browse Open‑Source</Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-[2rem] bg-[radial-gradient(circle_at_30%_30%,#f3f4f6_0,#e5e7eb_60%,transparent_100%)] border border-gray-200 p-10 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Hub</div>
                    <div className="text-lg font-semibold text-gray-900">Automation Library</div>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Library</div>
                    <div className="text-lg font-semibold text-gray-900">Open‑Source Tools</div>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Community</div>
                    <div className="text-lg font-semibold text-gray-900">Profiles & Networking</div>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Updates</div>
                    <div className="text-lg font-semibold text-gray-900">Announcements</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] p-10 bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all"
            >
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Automation Hub</h4>
              <p className="text-gray-600 mb-6">Discover community‑shared automations that save time and scale outcomes.</p>
              <Link to="/community/automation-hub" className="inline-flex items-center px-5 py-2 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors">Browse Hub</Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[2rem] p-10 bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all"
            >
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Open‑Source Library</h4>
              <p className="text-gray-600 mb-6">Explore curated resources and tools released by the community.</p>
              <Link to="/community/open-source" className="inline-flex items-center px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-colors">View Library</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-gray-200 bg-gray-50 p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900">Growing</div>
              <div className="text-gray-500 mt-2">Active builders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">Curated</div>
              <div className="text-gray-500 mt-2">Weekly resources</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">Open</div>
              <div className="text-gray-500 mt-2">Collaborations</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-white relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto p-16 md:p-24 rounded-[3rem] bg-gray-900 text-white shadow-2xl overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Ready to start building?</h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Join developers and entrepreneurs pushing the boundaries of what’s possible with AI.
              </p>
              <Link 
                to="/community/signup" 
                className="inline-flex items-center px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Get started →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </CommunityLayout>
  );
};

export default CommunityHome;
