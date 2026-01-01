import React from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Shield, ArrowRight } from 'lucide-react';

const Discord = () => {
  return (
    <CommunityLayout>
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-[#5865F2] to-[#7289da] rounded-[2rem] mx-auto flex items-center justify-center mb-10 shadow-2xl shadow-[#5865F2]/30 ring-4 ring-white">
                <MessageCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5865F2] to-[#99aab5]">Community</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 mb-16 max-w-2xl mx-auto leading-relaxed">
              Connect with AI builders, get exclusive updates, and collaborate on the future of automation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-200/40 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[4rem] -z-0 transition-transform group-hover:scale-110" />
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                            <Users className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Network</h3>
                        <p className="text-gray-500 leading-relaxed">Connect with like-minded developers and entrepreneurs building the next generation of AI tools.</p>
                    </div>
                </motion.div>

                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-200/40 relative overflow-hidden group"
                >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-[4rem] -z-0 transition-transform group-hover:scale-110" />
                     <div className="relative z-10">
                        <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 text-yellow-600">
                            <Zap className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Early Access</h3>
                        <p className="text-gray-500 leading-relaxed">Get first dibs on new features, tools, and resources before they are released to the public.</p>
                     </div>
                </motion.div>

                <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-200/40 relative overflow-hidden group"
                >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[4rem] -z-0 transition-transform group-hover:scale-110" />
                     <div className="relative z-10">
                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                            <Shield className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Support</h3>
                        <p className="text-gray-500 leading-relaxed">Direct access to the TopEdge AI team and community support to help you overcome challenges.</p>
                     </div>
                </motion.div>
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://discord.gg/topedgeai" // Placeholder link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-[#5865F2] text-white font-bold text-xl rounded-2xl hover:bg-[#4752C4] transition-all shadow-xl shadow-[#5865F2]/30 group"
            >
              <MessageCircle className="w-7 h-7" />
              Join Discord Server
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default Discord;