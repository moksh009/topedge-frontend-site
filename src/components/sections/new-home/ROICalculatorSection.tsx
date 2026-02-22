import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Calculator, ArrowRight, ArrowLeft, TrendingUp,
   Clock, Users, Sparkles, CheckCircle2, TrendingDown,
   Mail, ShieldCheck, Coffee, DollarSign
} from 'lucide-react';
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
   Filler,
} from 'chart.js';
import { toast } from 'react-hot-toast';
import { storeROIData } from '../../../services/firebase';
import { Link } from 'react-router-dom';

// Register Chart.js
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
   // --- STATE ---
   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
      inquiries: 1000,
      responseTime: 0.15,
      dealValue: 500,
      closeRate: 15
   });
   const [email, setEmail] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showThankYou, setShowThankYou] = useState(false);

   const responseOptions = [
      { label: "Under 5 minutes", value: 0.05, id: 'A' },
      { label: "15 to 30 minutes", value: 0.15, id: 'B' },
      { label: "1 to 2 hours", value: 0.30, id: 'C' },
      { label: "4+ hours", value: 0.40, id: 'D' },
      { label: "Next business day", value: 0.60, id: 'E' }
   ];

   // --- MATH ---
   const calculateResults = () => {
      const I = formData.inquiries || 0;
      const V = formData.dealValue || 0;
      const C = (formData.closeRate || 0) / 100;

      const extraLeads = Math.round(I * 0.28);

      const currentCustomers = Math.round(I * C);
      const newCustomersFromGain = Math.round(extraLeads * C);
      const totalCustomers = currentCustomers + newCustomersFromGain;

      const currentRevenue = currentCustomers * V;
      const newRevenue = totalCustomers * V;
      const monthlyGain = newRevenue - currentRevenue;
      const annualGain = monthlyGain * 12;
      const dailyLoss = Math.round(monthlyGain / 30);
      const currentAnnualRevenue = currentRevenue * 12;

      const hoursSaved = Math.round((I * 5) / 60);

      const revenueChartData = {
         labels: ['Current', 'Year 1', 'Year 2'],
         datasets: [
            {
               label: 'Without AI',
               data: [currentAnnualRevenue, currentAnnualRevenue * 1.05, currentAnnualRevenue * 1.1],
               borderColor: '#ef4444',
               backgroundColor: 'rgba(239, 68, 68, 0.1)',
               borderWidth: 3,
               tension: 0.4,
               fill: true
            },
            {
               label: 'With TopEdge AI',
               data: [currentAnnualRevenue, currentAnnualRevenue + annualGain, (currentAnnualRevenue + annualGain) * 1.25],
               borderColor: '#4f46e5',
               backgroundColor: 'rgba(79, 70, 229, 0.1)',
               borderWidth: 3,
               tension: 0.4,
               fill: true
            }
         ]
      };

      return {
         monthlyGain: monthlyGain.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
         annualGain: annualGain.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
         dailyLoss: dailyLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
         hours: hoursSaved,
         extraLeads: extraLeads,
         revenueChartData
      };
   };

   const results = calculateResults();

   // --- HANDLERS ---
   const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
   const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

   const progress = (step / 5) * 100;

   const handleInquiryChange = (val: string) => {
      if (val === '') {
         setFormData({ ...formData, inquiries: 0 });
      } else {
         const parsed = parseInt(val);
         if (!isNaN(parsed)) setFormData({ ...formData, inquiries: parsed });
      }
   };

   return (
      <section id="roi-calculator" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden font-sans">
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px]" />
         </div>

         <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center mb-12">
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6"
               >
                  <Calculator className="w-3.5 h-3.5" />
                  ROI CALCULATOR
               </motion.div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden relative">
               {step < 5 && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 overflow-hidden">
                     <motion.div
                        className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]"
                        initial={{ width: "20%" }}
                        animate={{ width: `${Math.max(20, progress)}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                     />
                  </div>
               )}

               <div className="p-8 md:p-16">
                  <AnimatePresence mode="wait">
                     {step === 1 && (
                        <motion.div
                           key="step1"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="space-y-8"
                        >
                           <div className="space-y-3">
                              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">How many inquiries do you receive per month?</h3>
                              <p className="text-lg text-slate-500 font-medium">Include calls, web chats, and WhatsApp messages.</p>
                           </div>

                           <div className="relative group">
                              <input
                                 type="number"
                                 value={formData.inquiries === 0 ? '' : formData.inquiries}
                                 onChange={(e) => handleInquiryChange(e.target.value)}
                                 placeholder="0"
                                 className="w-full text-4xl md:text-6xl font-black text-indigo-600 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-8 outline-none focus:border-indigo-500 focus:bg-white transition-all group-hover:bg-white pt-10"
                              />
                              <div className="absolute top-4 left-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Leads</div>
                           </div>

                           <div className="flex justify-end pt-4">
                              <button
                                 onClick={nextStep}
                                 className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-slate-900 transition-all hover:gap-5"
                              >
                                 Next <ArrowRight className="w-5 h-5" />
                              </button>
                           </div>
                        </motion.div>
                     )}

                     {step === 2 && (
                        <motion.div
                           key="step2"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="space-y-8"
                        >
                           <div className="space-y-3">
                              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">What is your average response time?</h3>
                              <p className="text-lg text-slate-500 font-medium">Be honest. How long does a lead wait before a human replies?</p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {responseOptions.map((opt) => (
                                 <button
                                    key={opt.id}
                                    onClick={() => setFormData({ ...formData, responseTime: opt.value })}
                                    className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${formData.responseTime === opt.value
                                       ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-md'
                                       : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300'
                                       }`}
                                 >
                                    <span className="font-bold text-lg">{opt.label}</span>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.responseTime === opt.value ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                                       }`}>
                                       {formData.responseTime === opt.value && <div className="w-2 h-2 rounded-full bg-white" />}
                                    </div>
                                 </button>
                              ))}
                           </div>

                           <div className="flex justify-between items-center pt-8">
                              <button onClick={prevStep} className="text-slate-400 font-bold flex items-center gap-2 hover:text-slate-900 transition-colors">
                                 <ArrowLeft className="w-5 h-5" /> Back
                              </button>
                              <button
                                 onClick={nextStep}
                                 className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-slate-900 transition-all hover:gap-5"
                              >
                                 Next <ArrowRight className="w-5 h-5" />
                              </button>
                           </div>
                        </motion.div>
                     )}

                     {step === 3 && (
                        <motion.div
                           key="step3"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="space-y-8"
                        >
                           <div className="space-y-3">
                              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">What is your average deal value?</h3>
                              <p className="text-lg text-slate-500 font-medium">How much revenue does one closed customer bring in?</p>
                           </div>

                           <div className="relative group">
                              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl md:text-6xl font-black text-indigo-300">$</div>
                              <input
                                 type="number"
                                 value={formData.dealValue === 0 ? '' : formData.dealValue}
                                 onChange={(e) => setFormData({ ...formData, dealValue: parseInt(e.target.value) || 0 })}
                                 placeholder="0"
                                 className="w-full text-4xl md:text-6xl font-black text-indigo-600 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-16 md:pl-20 pr-6 py-10 outline-none focus:border-indigo-500 focus:bg-white transition-all group-hover:bg-white"
                              />
                              <div className="absolute top-4 left-16 md:left-20 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue / Client</div>
                           </div>

                           <div className="flex justify-between items-center pt-8">
                              <button onClick={prevStep} className="text-slate-400 font-bold flex items-center gap-2 hover:text-slate-900 transition-colors">
                                 <ArrowLeft className="w-5 h-5" /> Back
                              </button>
                              <button
                                 onClick={nextStep}
                                 className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-slate-900 transition-all hover:gap-5"
                              >
                                 Next <ArrowRight className="w-5 h-5" />
                              </button>
                           </div>
                        </motion.div>
                     )}

                     {step === 4 && (
                        <motion.div
                           key="step4"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="space-y-8"
                        >
                           <div className="space-y-3">
                              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">What is your current close rate?</h3>
                              <p className="text-lg text-slate-500 font-medium">Out of 100 inquiries, how many usually buy?</p>
                           </div>

                           <div className="relative group">
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl md:text-6xl font-black text-indigo-300">%</div>
                              <input
                                 type="number"
                                 value={formData.closeRate === 0 ? '' : formData.closeRate}
                                 onChange={(e) => setFormData({ ...formData, closeRate: parseInt(e.target.value) || 0 })}
                                 placeholder="0"
                                 className="w-full text-4xl md:text-6xl font-black text-indigo-600 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-10 outline-none focus:border-indigo-500 focus:bg-white transition-all group-hover:bg-white pr-16 md:pr-20"
                              />
                              <div className="absolute top-4 left-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversion Rate</div>
                           </div>

                           <div className="flex justify-between items-center pt-8">
                              <button onClick={prevStep} className="text-slate-400 font-bold flex items-center gap-2 hover:text-slate-900 transition-colors">
                                 <ArrowLeft className="w-5 h-5" /> Back
                              </button>
                              <button
                                 onClick={nextStep}
                                 className="group flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-500/20 hover:bg-slate-900 transition-all hover:gap-5"
                              >
                                 Reveal Recovered Revenue <Sparkles className="w-5 h-5" />
                              </button>
                           </div>
                        </motion.div>
                     )}

                     {step === 5 && (
                        <motion.div
                           key="result"
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="text-center space-y-12"
                        >
                           <div className="space-y-3">
                              <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Monthly Growth Potential</h3>
                              <div className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">
                                 {results.monthlyGain}
                              </div>
                              <div className="flex flex-wrap justify-center gap-4 mt-6">
                                 <div className="px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-sm">
                                    +{results.extraLeads} Extra Leads Captured
                                 </div>
                                 <div className="px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-sm">
                                    High Conversion Probability
                                 </div>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
                              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-2">
                                 <div className="p-2 bg-white shadow-sm rounded-lg w-fit text-indigo-600 mb-2">
                                    <TrendingUp size={20} />
                                 </div>
                                 <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Annual Projection</h4>
                                 <p className="text-2xl font-black text-slate-900">{results.annualGain}</p>
                              </div>

                              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-2">
                                 <div className="p-2 bg-white shadow-sm rounded-lg w-fit text-red-500 mb-2">
                                    <Clock size={20} />
                                 </div>
                                 <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Daily Loss Without AI</h4>
                                 <p className="text-2xl font-black text-red-600">{results.dailyLoss}</p>
                              </div>

                              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-2">
                                 <div className="p-2 bg-white shadow-sm rounded-lg w-fit text-emerald-600 mb-2">
                                    <ShieldCheck size={20} />
                                 </div>
                                 <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Hours Saved</h4>
                                 <p className="text-2xl font-black text-emerald-600">~{results.hours}h</p>
                              </div>
                           </div>

                           <div className="space-y-6 pt-6 max-w-3xl mx-auto text-left">
                              <div className="flex items-center justify-between">
                                 <h3 className="text-xl font-bold text-slate-900">Revenue Projection</h3>
                                 <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Current</div>
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> With AI</div>
                                 </div>
                              </div>
                              <div className="h-[300px] w-full bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                 <Line
                                    data={results.revenueChartData}
                                    options={{
                                       responsive: true,
                                       maintainAspectRatio: false,
                                       plugins: { legend: { display: false } },
                                       scales: {
                                          y: { ticks: { font: { size: 10 } } },
                                          x: { ticks: { font: { size: 10 } } }
                                       }
                                    }}
                                 />
                              </div>
                           </div>

                           <div className="bg-slate-950 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden max-w-3xl mx-auto">
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent pointer-events-none" />
                              <div className="relative z-10">
                                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Want a detailed specifications report?</h3>
                                 <p className="text-slate-400 text-sm mb-8 max-w-xl mx-auto">
                                    Enter your email below and we'll send a full 24-month roadmap for your business.
                                 </p>

                                 {!showThankYou ? (
                                    <form
                                       onSubmit={async (e) => {
                                          e.preventDefault();
                                          setIsSubmitting(true);
                                          try {
                                             await storeROIData({
                                                email,
                                                businessName: "Home User",
                                                monthlyInquiries: formData.inquiries,
                                                averageOrderValue: formData.dealValue,
                                                closeRate: formData.closeRate,
                                                projectedRevenue: 0,
                                                additionalRevenue: 0
                                             });
                                             setShowThankYou(true);
                                             toast.success("Analysis sent!");
                                          } catch (err) {
                                             toast.error("Failed to send.");
                                          } finally {
                                             setIsSubmitting(false);
                                          }
                                       }}
                                       className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                                    >
                                       <input
                                          required
                                          type="email"
                                          placeholder="work@yourcompany.com"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="flex-grow px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 outline-none focus:border-white/40 transition-all font-medium"
                                       />
                                       <button
                                          disabled={isSubmitting}
                                          className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-colors disabled:opacity-50"
                                       >
                                          {isSubmitting ? 'Sending...' : 'Get Report'}
                                       </button>
                                    </form>
                                 ) : (
                                    <div className="flex flex-col items-center gap-2 text-emerald-400">
                                       <CheckCircle2 size={48} />
                                       <h4 className="text-lg font-bold">Report Sent! Check your inbox soon.</h4>
                                    </div>
                                 )}
                              </div>
                           </div>

                           <div className="pt-6">
                              <button
                                 onClick={() => setStep(1)}
                                 className="text-slate-400 font-bold hover:text-indigo-600 transition-colors underline underline-offset-8 text-sm"
                              >
                                 Recalculate
                              </button>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>

            <div className="mt-16 flex flex-col items-center gap-8">
               <Link
                  to="/booking"
                  className="inline-flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl shadow-indigo-600/20 hover:bg-slate-900 transition-all group"
               >
                  Book a quick coffee chat <Coffee className="w-6 h-6 group-hover:rotate-12 transition-transform" />
               </Link>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                  {[
                     { icon: Users, label: "Lead Capture", color: "text-blue-500" },
                     { icon: Clock, label: "24/7 Response", color: "text-emerald-500" },
                     { icon: DollarSign, label: "ROI Focused", color: "text-amber-500" },
                     { icon: TrendingUp, label: "Scalable Growth", color: "text-indigo-500" }
                  ].map((badge, i) => (
                     <div key={i} className="flex flex-col items-center gap-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className={`p-3 rounded-xl bg-slate-50 ${badge.color}`}>
                           <badge.icon size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">{badge.label}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default ROICalculatorSection;