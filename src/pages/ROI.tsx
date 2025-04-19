import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import CountUp from 'react-countup'
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
import { X, AlertCircle } from 'lucide-react'

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

export default function ROICalculator() {
  const [formData, setFormData] = useState({
    businessName: '',
    ticketCount: '',
    aov: '',
    closeRate: ''
  })
  const [results, setResults] = useState<any>(null)
  const [showForm, setShowForm] = useState(true)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const calculateROI = (e: React.FormEvent) => {
    e.preventDefault()
    // Base calculations
    const totalLeads = parseInt(formData.ticketCount)
    const extraLeads = Math.round(totalLeads * 0.28) // 28% increase in leads
    const newTotalLeads = totalLeads + extraLeads
    
    const currentCloseRate = parseInt(formData.closeRate)
    const newCloseRate = currentCloseRate // Keep same conversion rate
    
    // Calculate customers based on respective rates
    const currentCustomers = Math.round(totalLeads * (currentCloseRate / 100))
    const newCustomersFromGainOnly = Math.round(extraLeads * (newCloseRate / 100)) // only gained portion
    const totalCustomers = currentCustomers + newCustomersFromGainOnly
    const extraCustomers = newCustomersFromGainOnly
    
    // Calculate revenue
    const aov = parseInt(formData.aov)
    const currentRevenue = Math.round(currentCustomers * aov)
    const newRevenue = Math.round(totalCustomers * aov)
    const revenueGain = newRevenue - currentRevenue
    
    const annualGain = revenueGain * 12
    const dailyLoss = Math.round(revenueGain / 30)
    const dailyLostLeads = Math.round(extraLeads / 30)
    const currentAnnualRevenue = currentRevenue * 12
    
    // Calculate 2-year cost savings based on real data
    const costPerLead = 2 // Base cost per lead
    const yearlyLeadCost = totalLeads * 12 * costPerLead // Annual cost without AI
    const yearOneAISavings = yearlyLeadCost * 0.65 // 65% savings in first year
    const yearTwoAISavings = yearlyLeadCost * 0.85 // 85% savings in second year
    const totalTwoYearSavings = yearOneAISavings + yearTwoAISavings

    setResults({
      businessName: formData.businessName,
      totalLeads,
      extraLeads,
      newTotalLeads,
      currentCloseRate,
      newCloseRate,
      currentCustomers,
      newCustomers: totalCustomers,
      extraCustomers,
      currentRevenue,
      newRevenue,
      revenueGain,
      annualGain,
      dailyLoss,
      dailyLostLeads,
      currentAnnualRevenue,
      aov,
      yearlyLeadCost,
      yearOneAISavings,
      yearTwoAISavings,
      totalTwoYearSavings
    })
    setShowForm(false)
  }

  const resetCalculator = () => {
    setShowForm(true)
    setResults(null)
    setFormData({
      businessName: '',
      ticketCount: '',
      aov: '',
      closeRate: ''
    })
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  // Revenue Projection Chart
  const revenueChartData = results ? {
    labels: ['Current', 'Year 1', 'Year 2'],
    datasets: [
      {
        label: 'Without AI Support',
        data: [
          results.currentAnnualRevenue,
          results.currentAnnualRevenue * 1.05,
          results.currentAnnualRevenue * 1.1
        ],
        borderColor: 'rgba(239, 68, 68, 0.8)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: 'With AI Support',
        data: [
          results.currentAnnualRevenue,
          results.currentAnnualRevenue + results.annualGain,
          (results.currentAnnualRevenue + results.annualGain) * 1.2
        ],
        borderColor: 'rgba(52, 211, 153, 0.8)',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  } : null

  // Remove CX Cost Comparison Chart and replace with Annual Projection
  const annualProjectionChartData = results ? {
    labels: ['Current', 'With AI Support'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Annual Revenue',
        data: [
          results.currentAnnualRevenue,
          results.currentAnnualRevenue + results.annualGain
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(52, 211, 153, 0.8)'
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(52, 211, 153, 1)'
        ],
        borderWidth: 2
      }
    ]
  } : null

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#94A3B8',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#94A3B8',
          font: {
            size: 12
          },
          callback: (value: any) => '$' + formatNumber(value)
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#94A3B8',
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 13
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '$' + formatNumber(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    
    try {
      await storeROIData({
        email,
        notes,
        businessName: results.businessName,
        monthlyInquiries: parseInt(results.totalLeads),
        averageOrderValue: parseInt(results.aov),
        closeRate: parseInt(results.currentCloseRate),
        projectedRevenue: parseInt(results.newRevenue),
        additionalRevenue: parseInt(results.revenueGain)
      })
      setShowThankYou(true)
      setError(null)
    } catch (error: any) {
      console.error('Error submitting data:', error)
      setError(error.message || 'Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO 
        title="ROI Calculator"
        description="Calculate your potential ROI with TopEdge AI's voice automation solutions. Discover how much revenue you could add by letting AI handle your leads 24/7."
        keywords="ROI calculator, AI ROI, voice automation ROI, business automation calculator, TopEdge AI calculator"
        type="website"
      />

      <div className="min-h-screen bg-[#030712] relative overflow-hidden pt-24 sm:pt-32">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-blue-900/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
              ROI Calculator
            </h1>
            <p className="text-base sm:text-lg text-blue-300/60 max-w-xl mx-auto">
              See how AI automation can transform your business metrics
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl mx-auto"
              >
                <div className="bg-[#0A0F1A] rounded-2xl shadow-xl p-6 sm:p-8 border border-[#1E293B]">
                  <form onSubmit={calculateROI} className="space-y-6">
                    <div className="space-y-5">
                      <div>
                        <label className="block text-base font-medium text-[#E2E8F0] mb-2">
                          Business Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Acme Corporation"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-[#151B2A] border border-[#334155] text-white placeholder-[#4B5563] focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all text-base"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-[#E2E8F0] mb-2">
                          Monthly Inquiries
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 1000"
                          required
                          min="1"
                          className="w-full px-4 py-3 rounded-lg bg-[#151B2A] border border-[#334155] text-white placeholder-[#4B5563] focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all text-base"
                          value={formData.ticketCount}
                          onChange={(e) => setFormData({ ...formData, ticketCount: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-[#E2E8F0] mb-2">
                          Average Order Value ($)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 500"
                          required
                          min="1"
                          className="w-full px-4 py-3 rounded-lg bg-[#151B2A] border border-[#334155] text-white placeholder-[#4B5563] focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all text-base"
                          value={formData.aov}
                          onChange={(e) => setFormData({ ...formData, aov: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-[#E2E8F0] mb-2">
                          Current Close Rate (%)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g., 15"
                          required
                          min="1"
                          max="100"
                          className="w-full px-4 py-3 rounded-lg bg-[#151B2A] border border-[#334155] text-white placeholder-[#4B5563] focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all text-base"
                          value={formData.closeRate}
                          onChange={(e) => setFormData({ ...formData, closeRate: e.target.value })}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 transform hover:scale-[1.02] transition-all duration-200 text-base shadow-lg shadow-purple-500/25"
                    >
                      Calculate ROI
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Current vs Projected Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Current State */}
                  <motion.div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 rounded-2xl blur-xl transition-all duration-300 group-hover:from-red-500/10 group-hover:to-purple-500/10" />
                    <div className="relative bg-[#0A0F1A] rounded-2xl p-4 sm:p-6 border border-red-500/10 backdrop-blur-xl overflow-hidden">
                      {/* Animated gradient border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-[100%] animate-[shimmer_2s_infinite]" />
                      
                      <div className="relative z-10">
                        <h3 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2 justify-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          {results.businessName} without AI powered
                        </h3>
                        <div className="space-y-6">
                          <div className="flex gap-8">
                            <div className="space-y-6 flex-1">
                              <div className="text-center">
                                <p className="text-gray-400 mb-2 text-sm">Monthly Inquiries</p>
                                <p className="text-3xl font-bold text-white tracking-tight">{formatNumber(results.totalLeads)}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-400 mb-2 text-sm">Close Rate</p>
                                <p className="text-3xl font-bold text-white tracking-tight">{results.currentCloseRate}%</p>
                              </div>
                            </div>
                            <div className="w-px bg-gray-800" />
                            <div className="space-y-6 flex-1">
                              <div className="text-center">
                                <p className="text-gray-400 mb-2 text-sm">Average Order Value</p>
                                <p className="text-3xl font-bold text-white tracking-tight">${formatNumber(results.aov)}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-400 mb-2 text-sm">Monthly Customers</p>
                                <p className="text-3xl font-bold text-white tracking-tight">{formatNumber(results.currentCustomers)}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-center pt-4 border-t border-gray-800">
                            <p className="text-gray-400 mb-2 text-sm">Monthly Revenue</p>
                            <p className="text-4xl font-bold text-white tracking-tight">
                              ${formatNumber(results.currentRevenue)}
                            </p>
                            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2 justify-center">
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                              Current revenue without AI support
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Projected State */}
                  <motion.div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 rounded-2xl blur-xl transition-all duration-300 group-hover:from-emerald-500/10 group-hover:to-blue-500/10" />
                    <div className="relative bg-[#0A0F1A] rounded-2xl p-4 sm:p-6 border border-emerald-500/10 backdrop-blur-xl overflow-hidden">
                      {/* Animated gradient border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-[100%] animate-[shimmer_2s_infinite]" />
                      
                      <div className="relative z-10">
                        <h3 className="text-xl font-semibold text-emerald-400 mb-6 flex items-center gap-2 justify-center">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {results.businessName} With AI Support Squad
                        </h3>
                        <div className="space-y-6">
                          <div className="flex gap-8">
                            <div className="space-y-6 flex-1">
                              <div className="text-center">
                                <p className="text-gray-400 mb-2 text-sm">Monthly Inquiries</p>
                                <div className="flex items-center gap-3 justify-center">
                                  <p className="text-3xl font-bold text-white tracking-tight">{formatNumber(results.newTotalLeads)}</p>
                                  <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                                    +{formatNumber(results.extraLeads)}
                                  </span>
                                </div>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-400 mb-2 text-sm">Close Rate</p>
                                <p className="text-3xl font-bold text-white tracking-tight">{results.newCloseRate}%</p>
                              </div>
                            </div>
                            <div className="w-px bg-gray-800" />
                            <div className="space-y-6 flex-1">
                              <div className="text-center">
                                <p className="text-gray-400 mb-2 text-sm">Average Order Value</p>
                                <p className="text-3xl font-bold text-white tracking-tight">${formatNumber(results.aov)}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-400 mb-2 text-sm">Monthly Customers</p>
                                <div className="flex items-center gap-3 justify-center">
                                  <p className="text-3xl font-bold text-white tracking-tight">{formatNumber(results.newCustomers)}</p>
                                  <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                                    +{formatNumber(results.extraCustomers)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-center pt-4 border-t border-gray-800">
                            <p className="text-gray-400 mb-2 text-sm">Monthly Revenue</p>
                            <div className="flex items-center gap-3 justify-center">
                              <p className="text-4xl font-bold text-white tracking-tight">
                                ${formatNumber(results.newRevenue)}
                              </p>
                              <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-lg font-medium">
                                +${formatNumber(results.revenueGain)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2 justify-center">
                              <span className="inline-block w-1 h-1 rounded-full bg-emerald-500" />
                              Additional revenue from 28% increase in inquiries
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Revenue Projection Graph */}
                  <motion.div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl blur-xl transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-purple-500/10" />
                    <div className="relative bg-[#0A0F1A] rounded-2xl p-4 sm:p-6 border border-blue-500/10 backdrop-blur-xl">
                      <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Revenue Projection
                      </h3>
                      <div className="h-[300px]">
                        {revenueChartData && <Line data={revenueChartData} options={chartOptions} />}
                      </div>
                    </div>
                  </motion.div>

                  {/* Annual Projection */}
                  <motion.div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl blur-xl transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-pink-500/10" />
                    <div className="relative bg-[#0A0F1A] rounded-2xl p-4 sm:p-6 border border-purple-500/10 backdrop-blur-xl">
                      <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        Annual Projection
                      </h3>
                      <div className="h-[300px]">
                        {annualProjectionChartData && <Bar data={annualProjectionChartData} options={chartOptions} />}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Daily Loss Alert Section */}
                <motion.div 
                  className="max-w-3xl mx-auto text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-black/50 via-purple-900/10 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/10">
                    <p className="text-2xl font-medium bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                      You're slipping away <span className="text-emerald-400 font-semibold">${formatNumber(Math.round(results.revenueGain / 30))}</span> and{' '}
                      <span className="text-emerald-400 font-semibold">{Math.round(results.extraLeads / 30)} leads</span> every day.
                    </p>
                    <p className="mt-2 text-gray-400 text-lg">
                      Secure your personalized plan to capitalize on it.
                    </p>
                    <motion.button
                      onClick={() => setShowEmailModal(true)}
                      className="mt-6 inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg font-medium
                        hover:from-emerald-400 hover:to-teal-400 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="mr-3">Get Your Personalized Plan</span>
                      <svg 
                        className="w-6 h-6 transform transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Calculate Again Button */}
                <div className="text-center">
                  <motion.button
                    onClick={resetCalculator}
                    className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-lg font-medium
                      hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-purple-500/25 
                      transition-all duration-300 border border-purple-400/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Calculate Again
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowEmailModal(false)
                setShowThankYou(false)
                setEmail('')
                setNotes('')
              }
            }}
          >
            <div className="absolute left-1/2 sm:top-[60%] top-[75%] -translate-x-1/2 -translate-y-1/10 w-full max-w-lg px-4 sm:px-0">
              <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border border-purple-500/20 mx-4 sm:mx-0 mb-8 sm:mb-0"
              >
                <button
                  onClick={() => {
                    setShowEmailModal(false)
                    setShowThankYou(false)
                    setEmail('')
                    setNotes('')
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>

                <AnimatePresence mode="wait">
                  {!showThankYou ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8"
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                          Get Your Personalized Plan
                        </h3>
                        <p className="text-gray-400">
                          We'll analyze your data and send you a detailed strategy within 24 hours.
                        </p>
                      </div>

                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                              error ? 'border-red-500/50' : 'border-purple-500/20'
                            } text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all`}
                            placeholder="you@company.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Additional Notes
                          </label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                              error ? 'border-red-500/50' : 'border-purple-500/20'
                            } text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none`}
                            placeholder="Any specific requirements or questions..."
                          />
                        </div>
                        
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>{error}</span>
                          </motion.div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium
                            hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            'Get My Personalized Plan'
                          )}
                        </button>

                        <p className="text-xs text-gray-400 text-center mt-4">
                          By submitting, you agree to receive personalized plan for your business.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8 text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-400 mb-6">
                        We're working on your personalized plan. Check your email - we'll contact you within 24 hours with your detailed strategy.
                      </p>
                      
                      <button
                        onClick={() => {
                          setShowEmailModal(false)
                          setShowThankYou(false)
                          setEmail('')
                          setNotes('')
                        }}
                        className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium
                          hover:from-purple-400 hover:to-blue-400 transition-all duration-300"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 