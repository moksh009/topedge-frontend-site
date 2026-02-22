import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import SEO from '../components/SEO'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarController
} from 'chart.js'
import { useNavigate } from 'react-router-dom'
import { storeROIData } from '../services/firebase'
import {
  X, AlertCircle, BarChart2, TrendingUp, DollarSign,
  PieChart, PiggyBank, Calculator, ArrowRight,
  ArrowLeft, Clock, Users, Sparkles, Coffee,
  ChevronRight, CheckCircle2, ShieldCheck, Mail
} from 'lucide-react'
import { toast } from 'react-hot-toast'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
)

const responseOptions = [
  { label: "Under 5 minutes", value: 0.05, id: 'A' },
  { label: "15 to 30 minutes", value: 0.15, id: 'B' },
  { label: "1 to 2 hours", value: 0.30, id: 'C' },
  { label: "4+ hours", value: 0.40, id: 'D' },
  { label: "Next business day", value: 0.60, id: 'E' }
];

export default function ROICalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    ticketCount: 1000,
    aov: 500,
    closeRate: 15,
    responseTime: 0.15
  })
  const [results, setResults] = useState<any>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const navigate = useNavigate()

  // --- MATH ---
  const calculateROI = () => {
    const totalLeads = formData.ticketCount || 0
    const extraLeads = Math.round(totalLeads * 0.28) // 28% increase in leads (Synced Logic)
    const newTotalLeads = totalLeads + extraLeads

    const currentCloseRate = formData.closeRate || 0
    const currentCustomers = Math.round(totalLeads * (currentCloseRate / 100))
    const extraCustomers = Math.round(extraLeads * (currentCloseRate / 100))
    const totalCustomers = currentCustomers + extraCustomers

    const aov = formData.aov || 0
    const currentRevenue = currentCustomers * aov
    const newRevenue = totalCustomers * aov
    const revenueGain = newRevenue - currentRevenue

    const annualGain = revenueGain * 12
    const dailyLoss = Math.round(revenueGain / 30)
    const currentAnnualRevenue = currentRevenue * 12

    // Performance Charts Data
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
    }

    setResults({
      businessName: formData.businessName,
      totalLeads,
      extraLeads,
      newTotalLeads,
      currentCustomers,
      totalCustomers,
      extraCustomers,
      currentRevenue,
      newRevenue,
      monthlyGain: revenueGain,
      annualGain,
      dailyLoss,
      aov,
      revenueChartData
    })
  }

  useEffect(() => {
    if (step === 6) calculateROI();
  }, [step]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await storeROIData({
        email,
        businessName: results.businessName,
        monthlyInquiries: results.totalLeads,
        averageOrderValue: results.aov,
        closeRate: formData.closeRate,
        projectedRevenue: results.newRevenue,
        additionalRevenue: results.monthlyGain
      })
      setShowThankYou(true)
      toast.success("Analysis sent successfully!")
    } catch (error: any) {
      toast.error("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-[#FAFAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20 overflow-x-hidden">
      <SEO
        title="Interactive ROI Calculator | TopEdge AI"
        description="Calculate exactly how much revenue your business is losing to missed calls and slow responses. Get a personalized AI automation strategy."
      />

      {/* Hero Header */}
      <div className="pt-32 pb-16 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Calculator className="w-3.5 h-3.5" />
            Performance Estimator
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Quantify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Growth Potential.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Stop guessing. Plug in your metrics to visualize how TopEdge AI transforms slow inquiries into high-performing revenue streams.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Main Interface */}
        <div className="relative">
          {/* Progress Indicator */}
          {step < 6 && (
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-500 ${s === step ? 'w-10 sm:w-16 bg-indigo-600' : s < step ? 'w-5 sm:w-8 bg-emerald-500' : 'w-5 sm:w-8 bg-slate-200'
                      }`}
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden mx-auto"
            >
              {/* Step Content */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight uppercase tracking-widest">Business Detail</h3>
                    <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">What's your business called?</p>
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full text-2xl md:text-4xl font-bold text-indigo-600 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-8 outline-none focus:border-indigo-600 focus:bg-white transition-all pt-12"
                    />
                    <div className="absolute top-4 left-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Company</div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={nextStep}
                      disabled={!formData.businessName}
                      className="group flex items-center gap-3 bg-indigo-600 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-slate-900 transition-all"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Monthly Inquiries</h3>
                    <p className="text-lg text-slate-500">How many total leads come in via calls, WhatsApp, and Web?</p>
                  </div>
                  <div className="relative group">
                    <input
                      type="number"
                      value={formData.ticketCount === 0 ? '' : formData.ticketCount}
                      onChange={(e) => setFormData({ ...formData, ticketCount: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-full text-4xl md:text-6xl font-black text-indigo-600 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-10 outline-none focus:border-indigo-600 focus:bg-white transition-all pt-12"
                    />
                    <div className="absolute top-4 left-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leads / Month</div>
                  </div>
                  <div className="flex justify-between items-center pt-8">
                    <button onClick={prevStep} className="text-slate-400 font-bold flex items-center gap-2 hover:text-slate-900 transition-colors">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button onClick={nextStep} className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg">
                      Next <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Average Deal Value</h3>
                    <p className="text-lg text-slate-500">What is the average revenue value of a single customer?</p>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-5xl font-black text-indigo-200 mt-5">$</div>
                    <input
                      type="number"
                      value={formData.aov === 0 ? '' : formData.aov}
                      onChange={(e) => setFormData({ ...formData, aov: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-full text-4xl md:text-6xl font-black text-indigo-600 bg-slate-50 border-2 border-slate-100 rounded-2xl pl-16 md:pl-20 px-6 py-10 outline-none focus:border-indigo-600 focus:bg-white transition-all pt-12"
                    />
                    <div className="absolute top-4 left-16 md:left-20 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue / Lead</div>
                  </div>
                  <div className="flex justify-between items-center pt-8">
                    <button onClick={prevStep} className="text-slate-400 font-bold flex items-center gap-2 hover:text-slate-900 transition-colors">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button onClick={nextStep} className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg">
                      Next <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Average Response Time</h3>
                    <p className="text-lg text-slate-500">How long do leads currently wait before getting a reply?</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {responseOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, responseTime: opt.value })}
                        className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${formData.responseTime === opt.value ? 'bg-indigo-50 border-indigo-600 text-indigo-700' : 'bg-slate-50 border-slate-100 text-slate-600'
                          }`}
                      >
                        <span className="font-bold text-lg">{opt.label}</span>
                        <div className={`w-5 h-5 rounded-full border-2 ${formData.responseTime === opt.value ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-8">
                    <button onClick={prevStep} className="text-slate-400 font-bold flex items-center gap-2 hover:text-slate-900 transition-colors">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button onClick={nextStep} className="group flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg">
                      Next <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Current Close Rate</h3>
                    <p className="text-lg text-slate-500">Out of every 100 inquiries, how many successfully close?</p>
                  </div>
                  <div className="relative group">
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-5xl font-black text-indigo-200 mt-5">%</div>
                    <input
                      type="number"
                      value={formData.closeRate === 0 ? '' : formData.closeRate}
                      onChange={(e) => setFormData({ ...formData, closeRate: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-full text-4xl md:text-6xl font-black text-indigo-600 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-10 outline-none focus:border-indigo-600 focus:bg-white transition-all pt-12 pr-12 md:pr-16"
                    />
                    <div className="absolute top-4 left-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversion %</div>
                  </div>
                  <div className="flex justify-between items-center pt-8">
                    <button onClick={prevStep} className="text-slate-400 font-bold flex items-center gap-2 hover:text-slate-900 transition-colors">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button onClick={nextStep} className="group flex items-center gap-3 bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-500/20">
                      Reveal Results <Sparkles className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 6 && results && (
                <div className="space-y-12 md:space-y-16">
                  {/* Results Header */}
                  <div className="text-center space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-400 uppercase tracking-widest">Monthly Growth Potential</h2>
                    <div className="text-5xl sm:text-7xl md:text-9xl font-black text-slate-900 tracking-tighter">
                      {formatCurrency(results.monthlyGain)}
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
                      <div className="px-4 md:px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[10px] sm:text-sm uppercase tracking-wide">
                        +{results.extraLeads} Extra Leads Captured
                      </div>
                      <div className="px-4 md:px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-[10px] sm:text-sm uppercase tracking-wide">
                        {results.totalCustomers} Projected Monthly Closures
                      </div>
                    </div>
                  </div>

                  {/* Matrix Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 space-y-2">
                      <div className="p-3 bg-white shadow-sm rounded-xl w-fit text-indigo-600 mb-4">
                        <TrendingUp size={24} />
                      </div>
                      <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Annual Projection</h4>
                      <p className="text-2xl md:text-3xl font-black text-slate-900">{formatCurrency(results.annualGain)}</p>
                    </div>

                    <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 space-y-2">
                      <div className="p-3 bg-white shadow-sm rounded-xl w-fit text-red-500 mb-4">
                        <Clock size={24} />
                      </div>
                      <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Daily Inefficient Loss</h4>
                      <p className="text-2xl md:text-3xl font-black text-red-600">{formatCurrency(results.dailyLoss)}</p>
                    </div>

                    <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 space-y-2">
                      <div className="p-3 bg-white shadow-sm rounded-xl w-fit text-emerald-600 mb-4">
                        <ShieldCheck size={24} />
                      </div>
                      <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Data Accuracy</h4>
                      <p className="text-2xl md:text-3xl font-black text-emerald-600">99.9%</p>
                    </div>
                  </div>

                  {/* Chart Section */}
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Revenue Projection Chart</h3>
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /> Current</div>
                        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> With AI</div>
                      </div>
                    </div>
                    <div className="h-[250px] sm:h-[400px] w-full bg-slate-50/50 rounded-3xl p-4 sm:p-6">
                      <Line
                        data={results.revenueChartData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          scales: {
                            y: { ticks: { font: { size: 10 }, callback: (val: any) => formatCurrency(val) } },
                            x: { ticks: { font: { size: 10 } } }
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Summary Banner */}
                  <div className="bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Want a detailed specifications report?</h3>
                      <p className="text-slate-400 text-sm md:text-lg mb-8 max-w-2xl mx-auto">
                        Enter your email below and we'll send a full 24-month roadmap with technical breakdowns for {results.businessName}.
                      </p>

                      {!showThankYou ? (
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
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
                            className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-slate-100 transition-colors disabled:opacity-50 flex items-center gap-2 justify-center"
                          >
                            {isSubmitting ? 'Sending...' : 'Get Spec Report'}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </form>
                      ) : (
                        <div className="flex flex-col items-center gap-4 text-emerald-400 py-4">
                          <CheckCircle2 size={56} />
                          <h4 className="text-xl font-bold">Report Sent! Check your inbox soon.</h4>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col items-center gap-6 pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="text-slate-400 font-bold hover:text-indigo-600 transition-colors underline underline-offset-8 text-sm"
                    >
                      Recalculate with different metrics
                    </button>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 px-4 py-2 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      Powered by TopEdge AI Logical Engine V2.1
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
