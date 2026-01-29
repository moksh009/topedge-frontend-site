import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Calculator, TrendingUp, DollarSign, PieChart, ArrowUpRight } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ROICalculatorSection = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ticketCount: '1000',
    aov: '500',
    closeRate: '15'
  });
  const [results, setResults] = useState<any>(null);

  const calculateROI = () => {
    // Base calculations
    const totalLeads = parseInt(formData.ticketCount) || 0;
    const extraLeads = Math.round(totalLeads * 0.28); // 28% increase
    const newTotalLeads = totalLeads + extraLeads;
    
    const currentCloseRate = parseInt(formData.closeRate) || 0;
    
    // Calculate customers
    const currentCustomers = Math.round(totalLeads * (currentCloseRate / 100));
    const newCustomersFromGainOnly = Math.round(extraLeads * (currentCloseRate / 100));
    const totalCustomers = currentCustomers + newCustomersFromGainOnly;
    
    // Calculate revenue
    const aov = parseInt(formData.aov) || 0;
    const currentRevenue = Math.round(currentCustomers * aov);
    const newRevenue = Math.round(totalCustomers * aov);
    const revenueGain = newRevenue - currentRevenue;
    const annualGain = revenueGain * 12;

    setResults({
      currentRevenue,
      newRevenue,
      revenueGain,
      annualGain,
      totalLeads,
      newTotalLeads,
      extraLeads
    });
  };

  const chartData = results ? {
    labels: ['Current Monthly', 'Projected Monthly'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [results.currentRevenue, results.newRevenue],
        backgroundColor: ['rgba(156, 163, 175, 0.5)', 'rgba(0, 113, 227, 0.8)'],
        borderColor: ['rgba(156, 163, 175, 1)', 'rgba(0, 113, 227, 1)'],
        borderWidth: 1,
        borderRadius: 8,
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1d1d1f',
        bodyColor: '#1d1d1f',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
            label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
            }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: {
            font: { family: "'Inter', sans-serif" },
            callback: function(value: any) {
                return '$' + value / 1000 + 'k';
            }
        }
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: "'Inter', sans-serif" } }
      }
    }
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
          >
            <TrendingUp className="w-3 h-3" />
            Growth Calculator
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight"
          >
            Calculate Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Potential</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed"
          >
            See how TopEdge AI can impact your bottom line with a 28% increase in lead engagement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Calculator Inputs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/5 border border-gray-100 relative overflow-hidden group"
          >
             {/* Subtle Glow */}
             <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Monthly Inquiries</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <PieChart className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                    type="number"
                    value={formData.ticketCount}
                    onChange={(e) => setFormData({...formData, ticketCount: e.target.value})}
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-[#1d1d1f] transition-all outline-none font-medium"
                    placeholder="e.g. 1000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Average Order Value ($)</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <DollarSign className="h-5 w-5 text-gray-400" />
                   </div>
                  <input
                    type="number"
                    value={formData.aov}
                    onChange={(e) => setFormData({...formData, aov: e.target.value})}
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-[#1d1d1f] transition-all outline-none font-medium"
                    placeholder="e.g. 500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Close Rate (%)</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <TrendingUp className="h-5 w-5 text-gray-400" />
                   </div>
                  <input
                    type="number"
                    value={formData.closeRate}
                    onChange={(e) => setFormData({...formData, closeRate: e.target.value})}
                    className="w-full pl-11 pr-4 py-4 rounded-xl bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-[#1d1d1f] transition-all outline-none font-medium"
                    placeholder="e.g. 15"
                  />
                </div>
              </div>
              
              <button
                onClick={calculateROI}
                className="w-full py-4 bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-4"
              >
                <Calculator className="w-5 h-5" />
                Calculate Impact
              </button>
            </div>
          </motion.div>

          {/* Results Display */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/5 border border-gray-100 h-full flex flex-col"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-gray-100 group hover:border-blue-100 transition-colors">
                      <p className="text-sm text-gray-500 mb-2 font-medium">Projected Monthly Revenue</p>
                      <p className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                        ${new Intl.NumberFormat('en-US').format(results.newRevenue)}
                      </p>
                      <div className="flex items-center gap-1 mt-3 text-green-600 text-sm font-semibold bg-green-50 inline-block px-2 py-1 rounded-md border border-green-100">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+${new Intl.NumberFormat('en-US').format(results.revenueGain)} increase</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 group hover:border-blue-200 transition-colors">
                      <p className="text-sm text-blue-600 mb-2 font-medium">Projected Annual Gain</p>
                      <p className="text-3xl font-bold text-[#0071e3] tracking-tight">
                        +${new Intl.NumberFormat('en-US').format(results.annualGain)}
                      </p>
                      <p className="text-xs text-blue-400 mt-3 font-medium flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        Based on 28% efficiency boost
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 min-h-[300px] w-full bg-white rounded-2xl p-4 border border-gray-50">
                    <Bar data={chartData!} options={chartOptions} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }} 
                  className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-gray-200 border-dashed text-center p-8"
                >
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 animate-pulse">
                    <Calculator className="w-10 h-10 text-[#0071e3]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-2">Ready to Calculate?</h3>
                  <p className="text-gray-500 max-w-sm leading-relaxed">
                    Enter your current business metrics to see how TopEdge AI can scale your revenue exponentially.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;