import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import jsPDF from 'jspdf'; // Requires: npm install jspdf
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  Calculator, TrendingUp, DollarSign, Users, 
  Clock, ArrowRight, Activity, 
  X, Download, Mail, CheckCircle2, FileText
} from 'lucide-react';
import { db } from '@/services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ROICalculatorSection = () => {
  // --- STATE ---
  const [inputs, setInputs] = useState({
    monthlyLeads: 500,
    avgDealValue: 2000,
    closeRate: 15,
  });

  const [metrics, setMetrics] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // --- CALCULATIONS ---
  useEffect(() => {
    const currentRevenue = inputs.monthlyLeads * (inputs.closeRate / 100) * inputs.avgDealValue;
    
    // AI Assumptions
    const aiLeads = Math.round(inputs.monthlyLeads * 1.4); // 40% Boost
    const aiCloseRate = inputs.closeRate * 1.2; // 20% Quality Boost
    const aiRevenue = aiLeads * (aiCloseRate / 100) * inputs.avgDealValue;
    
    const monthlyGain = aiRevenue - currentRevenue;
    const annualGain = monthlyGain * 12;
    const hoursSaved = Math.round(aiLeads * 0.25); // 15 mins/lead

    // Cumulative Wealth (Cash in Bank)
    const cumulativeWealth = [
        monthlyGain,
        monthlyGain * 3,
        monthlyGain * 6,
        monthlyGain * 9,
        monthlyGain * 12
    ];

    setMetrics({
      currentRevenue,
      aiRevenue,
      monthlyGain,
      annualGain,
      aiLeads,
      hoursSaved,
      cumulativeWealth
    });
  }, [inputs]);

  // --- PDF GENERATION LOGIC ---
  const handleDownloadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // Store email and metrics in Firebase
      await addDoc(collection(db, "roi_downloads"), {
        email,
        metrics,
        inputs,
        timestamp: serverTimestamp(),
        downloadedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error("Error storing download data:", err);
      // We continue with download even if storage fails, or we could show error
      // setError('Something went wrong. Please try again.');
      // setIsGenerating(false);
      // return;
    }

    // Simulate API delay for email capture
    await new Promise(resolve => setTimeout(resolve, 1500));

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // -- PDF DESIGN --
    // Header
    doc.setFillColor(248, 250, 252); // Slate-50 background
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text("TopEdge AI", 20, 30);
    
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229); // Indigo-600
    doc.text("ROI Projection Report", 20, 40);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`Generated for: ${email}`, 20, 50);
    doc.text(`Date: ${date}`, 20, 55);

    doc.setDrawColor(203, 213, 225); // Divider
    doc.line(20, 65, 190, 65);

    // Section 1: Inputs
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("1. Business Baseline", 20, 80);
    
    doc.setFontSize(12);
    doc.setTextColor(51, 65, 85);
    doc.text(`• Monthly Leads: ${inputs.monthlyLeads}`, 30, 95);
    doc.text(`• Avg Deal Value: $${inputs.avgDealValue}`, 30, 105);
    doc.text(`• Current Close Rate: ${inputs.closeRate}%`, 30, 115);

    // Section 2: AI Impact
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("2. Projected Impact", 20, 135);

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, 145, 170, 40, 3, 3, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(20, 145, 170, 40, 3, 3, 'S');

    doc.setFontSize(12);
    doc.text("New Monthly Revenue:", 30, 160);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(16, 185, 129); // Emerald
    doc.text(`+$${Math.round(metrics.monthlyGain).toLocaleString()}`, 100, 160);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text("Annual Net Uplift:", 30, 175);
    doc.setFont("helvetica", "bold");
    doc.text(`+$${Math.round(metrics.annualGain).toLocaleString()}`, 100, 175);

    // Section 3: Operational Efficiency
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("3. Operational Efficiency", 20, 205);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(51, 65, 85);
    doc.text(`• Qualified Leads: ${Math.round(metrics.aiLeads)} /mo (+35%)`, 30, 220);
    doc.text(`• Hours Saved: ${metrics.hoursSaved} hrs /mo`, 30, 230);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text("Powered by TopEdge AI Engine", 105, 280, { align: 'center' });

    // Save
    doc.save("TopEdge_ROI_Report.pdf");
    
    setIsGenerating(false);
    setShowModal(false);
    setEmail('');
  };

  // --- CHART DATA ---
  const revenueData = {
    labels: ['Current', 'With TopEdge'],
    datasets: [{
      label: 'Monthly Revenue',
      data: metrics ? [metrics.currentRevenue, metrics.aiRevenue] : [],
      backgroundColor: ['#e2e8f0', '#8b5cf6'],
      borderRadius: 8,
      barThickness: 50,
    }]
  };

  const growthData = {
    labels: ['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'],
    datasets: [{
      label: 'Cumulative Wealth',
      data: metrics ? metrics.cumulativeWealth : [],
      borderColor: '#f59e0b', // Amber
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(245, 158, 11, 0.2)');
        gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 2,
    }]
  };

  const funnelData = {
    labels: ['Current', 'AI Powered'],
    datasets: [{
      label: 'Qualified Leads',
      data: metrics ? [inputs.monthlyLeads * 0.4, metrics.aiLeads * 0.6] : [],
      backgroundColor: ['#94a3b8', '#3b82f6'],
      borderRadius: 6,
      barThickness: 20,
      indexAxis: 'y' as const,
    }]
  };

  const timeData = {
    labels: ['Automated', 'Manual Admin'],
    datasets: [{
      data: metrics ? [metrics.hoursSaved, 40] : [],
      backgroundColor: ['#10b981', '#f1f5f9'],
      borderWidth: 0,
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { display: false } }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setInputs(prev => ({ ...prev, [field]: parseInt(e.target.value) || 0 }));
  };

  return (
    <section id="roi-calculator-section" className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden font-sans">
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <Calculator className="w-3.5 h-3.5 text-violet-600" />
            ROI Projection
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-6 tracking-tight">
            See Your <span className="text-violet-600">Future Growth.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Interactive breakdown of how AI automation impacts your bottom line, lead volume, and operational hours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: CONTROLS (Input Panel) */}
          <div className="lg:w-1/3 space-y-8">
             <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
                      <Activity className="w-5 h-5" />
                   </div>
                   Business Metrics
                </h3>

                <div className="space-y-8">
                   {/* Input 1 */}
                   <div className="space-y-4">
                      <div className="flex justify-between items-center">
                         <label className="text-sm font-semibold text-slate-600">Monthly Leads</label>
                         <span className="text-sm font-mono font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-lg">{inputs.monthlyLeads}</span>
                      </div>
                      <input 
                         type="range" min="100" max="5000" step="50"
                         value={inputs.monthlyLeads}
                         onChange={(e) => handleInputChange(e, 'monthlyLeads')}
                         className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-violet-600"
                      />
                   </div>

                   {/* Input 2 */}
                   <div className="space-y-4">
                      <div className="flex justify-between items-center">
                         <label className="text-sm font-semibold text-slate-600">Avg. Deal Value</label>
                         <span className="text-sm font-mono font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-lg">${inputs.avgDealValue}</span>
                      </div>
                      <input 
                         type="range" min="500" max="20000" step="500"
                         value={inputs.avgDealValue}
                         onChange={(e) => handleInputChange(e, 'avgDealValue')}
                         className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-violet-600"
                      />
                   </div>

                   {/* Input 3 */}
                   <div className="space-y-4">
                      <div className="flex justify-between items-center">
                         <label className="text-sm font-semibold text-slate-600">Close Rate</label>
                         <span className="text-sm font-mono font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-lg">{inputs.closeRate}%</span>
                      </div>
                      <input 
                         type="range" min="5" max="50" step="1"
                         value={inputs.closeRate}
                         onChange={(e) => handleInputChange(e, 'closeRate')}
                         className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-violet-600"
                      />
                   </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                   <div className="flex items-center justify-between text-slate-500 text-sm mb-2">
                      <span>Total Annual Upside</span>
                   </div>
                   <div className="text-4xl font-black text-slate-900 tracking-tight">
                      ${Math.round((metrics?.monthlyGain * 12) / 1000)}k<span className="text-violet-500">+</span>
                   </div>
                   
                   {/* Trigger Modal Button */}
                   <button 
                      onClick={() => setShowModal(true)}
                      className="w-full mt-6 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/20"
                   >
                      Get Full Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             </div>
          </div>

          {/* RIGHT: BENTO GRID DASHBOARD */}
          <div className="lg:w-2/3">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CARD 1: REVENUE IMPACT */}
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <h4 className="text-base font-bold text-slate-900">Revenue Impact</h4>
                         <p className="text-xs text-slate-500 mt-1">Monthly Comparison</p>
                      </div>
                      <div className="p-2 bg-violet-50 rounded-lg text-violet-600"><DollarSign className="w-5 h-5" /></div>
                   </div>
                   <div className="h-48 w-full relative"><Bar data={revenueData} options={commonOptions} /></div>
                   <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span className="w-3 h-3 rounded-full bg-violet-500" /> +${Math.round(metrics?.monthlyGain || 0).toLocaleString()} /mo
                   </div>
                </motion.div>

                {/* CARD 2: WEALTH GENERATION (Cumulative) */}
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <h4 className="text-base font-bold text-slate-900">Wealth Generation</h4>
                         <p className="text-xs text-slate-500 mt-1">Cash in Bank (12 Months)</p>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-lg text-amber-500"><TrendingUp className="w-5 h-5" /></div>
                   </div>
                   <div className="h-48 w-full relative"><Line data={growthData} options={{...commonOptions, scales: { x: { display: true, grid: {display: false} }, y: {display: false} }}} /></div>
                   <div className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span className="w-3 h-3 rounded-full bg-amber-500" /> +${Math.round(metrics?.annualGain || 0).toLocaleString()} Accumulated
                   </div>
                </motion.div>

                {/* CARD 3: LEAD VELOCITY */}
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                      <div>
                         <h4 className="text-base font-bold text-slate-900">Lead Qualification</h4>
                         <p className="text-xs text-slate-500 mt-1">Volume of Qualified Leads</p>
                      </div>
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><Users className="w-5 h-5" /></div>
                   </div>
                   <div className="h-40 w-full relative flex items-center"><Bar data={funnelData} options={{...commonOptions, indexAxis: 'y'}} /></div>
                   <div className="mt-auto pt-2 text-xs font-medium text-slate-500">AI qualifies leads 24/7 without delays.</div>
                </motion.div>

                {/* CARD 4: EFFICIENCY */}
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-col">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                         <h4 className="text-base font-bold text-slate-900">Efficiency</h4>
                         <p className="text-xs text-slate-500 mt-1">Hours Saved vs Spent</p>
                      </div>
                      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500"><Clock className="w-5 h-5" /></div>
                   </div>
                   <div className="flex-1 flex items-center gap-6">
                      <div className="h-32 w-32 relative">
                         <Doughnut data={timeData} options={{cutout: '70%', plugins: {legend: {display: false}}}} />
                         <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-xl font-bold text-slate-900">{metrics?.hoursSaved}h</span>
                            <span className="text-[10px] text-slate-400">Saved</span>
                         </div>
                      </div>
                      <div className="flex-1 space-y-3">
                         <div>
                            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-xs font-bold text-slate-700">Automated</span></div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[80%]" /></div>
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 rounded-full bg-slate-300" /><span className="text-xs font-bold text-slate-700">Manual</span></div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-300 w-[20%]" /></div>
                         </div>
                      </div>
                   </div>
                </motion.div>

             </div>
          </div>
        </div>

        {/* --- MODAL --- */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
              >
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                   <X className="w-4 h-4" />
                </button>

                <div className="text-center mb-6">
                   <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                      <FileText className="w-7 h-7" />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Your ROI Report</h3>
                   <p className="text-slate-500 text-sm">Enter your email to download the detailed PDF breakdown of your growth projection.</p>
                </div>

                <form onSubmit={handleDownloadReport} className="space-y-4">
                   <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                   </div>
                   
                   <button 
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                      {isGenerating ? (
                         <>Generating PDF...</> 
                      ) : (
                         <><Download className="w-4 h-4" /> Download Report</>
                      )}
                   </button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                   <CheckCircle2 className="w-3 h-3 text-emerald-500" /> No spam, just data.
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ROICalculatorSection;