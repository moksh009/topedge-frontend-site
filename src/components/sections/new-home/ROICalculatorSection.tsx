import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  Calculator, TrendingUp, DollarSign, Users, 
  Clock, Zap, ArrowRight, BarChart3, RefreshCcw 
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ROICalculatorSection = () => {
  // Input State
  const [inputs, setInputs] = useState({
    monthlyVisitors: 5000,
    leadsGenerated: 200,
    avgDealValue: 1000,
    closeRate: 10,
    qualificationRate: 30 // Slider for AI efficiency
  });

  // Output State
  const [results, setResults] = useState<any>(null);

  // Real-time Calculation Effect
  useEffect(() => {
    calculateMetrics();
  }, [inputs]);

  const calculateMetrics = () => {
    // 1. Current State
    const currentRevenue = inputs.leadsGenerated * (inputs.closeRate / 100) * inputs.avgDealValue;
    
    // 2. AI Impact Assumptions
    // TopEdge increases lead capture by engaging 24/7 (Conservative +40%)
    const aiLeads = Math.round(inputs.leadsGenerated * 1.4); 
    
    // AI pre-qualifies, so close rate on qualified leads usually goes up (+20% efficiency)
    const aiCloseRate = inputs.closeRate * 1.2; 
    
    // AI Revenue
    const aiRevenue = aiLeads * (aiCloseRate / 100) * inputs.avgDealValue;
    
    // 3. Operational Savings (Assume 15 mins saved per lead via auto-qualification)
    const hoursSaved = Math.round((aiLeads * 15) / 60); 
    const operationalSavings = hoursSaved * 50; // Assume $50/hr blended cost for sales rep

    // 4. Totals
    const monthlyGain = (aiRevenue - currentRevenue) + operationalSavings;
    const annualGain = monthlyGain * 12;

    setResults({
      currentRevenue,
      aiRevenue,
      monthlyGain,
      annualGain,
      aiLeads,
      hoursSaved,
      operationalSavings
    });
  };

  // Chart Data Generation (12 Month Projection)
  const chartData = {
    labels: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
    datasets: [
      {
        label: 'With TopEdge AI',
        data: results ? [
          results.aiRevenue, 
          results.aiRevenue * 3, 
          results.aiRevenue * 6, 
          results.aiRevenue * 9, 
          results.aiRevenue * 12
        ] : [],
        borderColor: '#6366f1', // Indigo 500
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#6366f1',
        pointBorderWidth: 2,
      },
      {
        label: 'Current Trajectory',
        data: results ? [
          results.currentRevenue, 
          results.currentRevenue * 3, 
          results.currentRevenue * 6, 
          results.currentRevenue * 9, 
          results.currentRevenue * 12
        ] : [],
        borderColor: '#94a3b8', // Slate 400
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top' as const, 
        align: 'end' as const,
        labels: { color: '#94a3b8', font: { family: "'Inter', sans-serif", size: 11 }, usePointStyle: true, boxWidth: 6 } 
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => ` ${context.dataset.label}: $${(context.parsed.y).toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#64748b', callback: (value: any) => '$' + value / 1000 + 'k' },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b' },
        border: { display: false }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setInputs(prev => ({ ...prev, [field]: parseInt(e.target.value) || 0 }));
  };

  return (
    <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
          >
            <Calculator className="w-3 h-3" />
            ROI Engine
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Calculate Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              AI Growth Potential
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Adjust the sliders below to see how TopEdge AI can impact your revenue, lead volume, and operational efficiency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: INPUT CONSOLE */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                   <Zap className="w-5 h-5 text-indigo-400" />
                   Your Metrics
                </h3>

                <div className="space-y-8">
                   {/* Monthly Leads */}
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                         <label className="text-slate-400 font-medium">Monthly Leads</label>
                         <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700">{inputs.leadsGenerated}</span>
                      </div>
                      <input 
                         type="range" min="50" max="5000" step="50"
                         value={inputs.leadsGenerated}
                         onChange={(e) => handleInputChange(e, 'leadsGenerated')}
                         className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                   </div>

                   {/* Average Deal Value */}
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                         <label className="text-slate-400 font-medium">Avg. Deal Value</label>
                         <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700">${inputs.avgDealValue}</span>
                      </div>
                      <input 
                         type="range" min="100" max="10000" step="100"
                         value={inputs.avgDealValue}
                         onChange={(e) => handleInputChange(e, 'avgDealValue')}
                         className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                   </div>

                   {/* Close Rate */}
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                         <label className="text-slate-400 font-medium">Current Close Rate</label>
                         <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700">{inputs.closeRate}%</span>
                      </div>
                      <input 
                         type="range" min="1" max="50" step="1"
                         value={inputs.closeRate}
                         onChange={(e) => handleInputChange(e, 'closeRate')}
                         className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                   </div>
                </div>

                <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                   <div className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                         <RefreshCcw className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-xs text-indigo-200 leading-relaxed">
                         <strong>AI Impact:</strong> We conservatively estimate a <span className="text-white font-bold">40% lift</span> in lead engagement and <span className="text-white font-bold">20% boost</span> in close rates due to instant 24/7 responses.
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* RIGHT: RESULTS DASHBOARD */}
          <div className="lg:col-span-8 space-y-6">
             
             {/* Key Metrics Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   className="bg-slate-900 border border-slate-800 p-5 rounded-3xl"
                >
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                         <DollarSign className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-sm text-slate-400 font-medium">Added Monthly Revenue</span>
                   </div>
                   <div className="text-2xl md:text-3xl font-bold text-white">
                      +${Math.round(results?.monthlyGain || 0).toLocaleString()}
                   </div>
                   <div className="text-xs text-emerald-500 mt-1 font-medium">+{(results?.monthlyGain / results?.currentRevenue * 100).toFixed(1)}% Growth</div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="bg-slate-900 border border-slate-800 p-5 rounded-3xl"
                >
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                         <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-sm text-slate-400 font-medium">Qualified Leads</span>
                   </div>
                   <div className="text-2xl md:text-3xl font-bold text-white">
                      {Math.round(results?.aiLeads || 0)} <span className="text-lg text-slate-500 font-normal">/mo</span>
                   </div>
                   <div className="text-xs text-blue-400 mt-1 font-medium">Up from {inputs.leadsGenerated}</div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                   className="bg-slate-900 border border-slate-800 p-5 rounded-3xl"
                >
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-500/10 rounded-lg">
                         <Clock className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="text-sm text-slate-400 font-medium">Hours Saved</span>
                   </div>
                   <div className="text-2xl md:text-3xl font-bold text-white">
                      {results?.hoursSaved || 0} <span className="text-lg text-slate-500 font-normal">hrs</span>
                   </div>
                   <div className="text-xs text-amber-400 mt-1 font-medium">Automated work</div>
                </motion.div>
             </div>

             {/* Main Chart Area */}
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-[400px] flex flex-col relative shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="text-white font-bold flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-indigo-400" />
                      12-Month Revenue Projection
                   </h4>
                   <div className="text-xs font-mono text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                      Total Annual Uplift: <span className="text-emerald-400 font-bold">+${Math.round(results?.annualGain || 0).toLocaleString()}</span>
                   </div>
                </div>
                
                <div className="flex-1 w-full min-h-0">
                   <Line data={chartData} options={chartOptions} />
                </div>
             </div>

             <div className="flex justify-center pt-4">
                <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium group">
                   Get a detailed audit for your business <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;