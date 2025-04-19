import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';

const ROICalculator = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Monthly Inquiries",
      value: "1,200",
      subtitle: "Average inquiries per month",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Close Rate",
      value: "+5%",
      subtitle: "Increase in conversion rate",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Revenue Gain",
      value: "$12,000",
      subtitle: "Additional monthly revenue",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <motion.section
      id="roi-calculator"
      className="relative py-16 sm:py-24 md:py-32"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-black via-purple-950/5 to-black" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)"
          }}
        />
        {/* Animated Grid Background */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(to right, rgba(124, 58, 237, 0.03) 0px, rgba(124, 58, 237, 0.03) 1px, transparent 1px, transparent 100px),
                            repeating-linear-gradient(to bottom, rgba(124, 58, 237, 0.03) 0px, rgba(124, 58, 237, 0.03) 1px, transparent 1px, transparent 100px)`,
            backgroundSize: '100px 100px',
            opacity: 0.5
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Title Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6"
          >
            <Calculator className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">ROI Calculator</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Calculate Your AI Investment Returns
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Discover how our AI solutions can transform your business metrics and boost your revenue
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/roi')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Calculate My ROI
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="relative group"
              >
                <div className="relative h-full rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                  {/* Gradient Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative space-y-4">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Stats */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-300 mb-1">
                        {stat.title}
                      </h3>
                      <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="inline-flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <p className="text-xl sm:text-2xl font-medium text-gray-300 mb-2">
              Ready to see your potential growth?
            </p>
            <p className="text-gray-400 mb-6">
              Get a detailed breakdown of your business transformation
            </p>
            <button
              onClick={() => navigate('/roi')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
            >
              Start Calculation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ROICalculator;