import SEO from '../components/SEO';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot, Send, CheckCircle2, Calendar as CalendarIcon,
  Clock, Mail, ArrowRight, ArrowLeft, User,
  Phone, Building2, ShieldCheck, Sparkles,
  ChevronDown, Check, Coffee, MessageSquare,
  Globe, Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookingDetails, emailService } from '../services/emailService';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { formatInTimeZone } from 'date-fns-tz';
import Footer from '../components/Footer';

const availableTimes = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
];

const monthlyInquiryOptions = [
  '0 - 100 Calls',
  '100 - 500 Calls',
  '500 - 2000 Calls',
  '2000 - 5000 Calls',
  '5000+ Calls'
];

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2 mb-12">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-100 relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
          initial={{ width: 0 }}
          animate={{ width: i <= current ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    ))}
  </div>
);

const Booking = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [monthlyInquiry, setMonthlyInquiry] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const formattedDateTime = selectedDate && selectedTime
    ? formatInTimeZone(selectedDate, selectedTimezone, "MMMM d, yyyy 'at' h:mm a zzz")
    : '';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data: BookingDetails = {
        name, email, phone, companyName, monthlyInquiry,
        date: formattedDateTime, time: selectedTime,
        additionalInfo
      };
      await emailService.sendBookingEmails(data);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Tell us about your business</h2>
              <p className="text-slate-500 text-lg">We'll use this context to prepare specific ROI insights for our chat.</p>
            </div>
            <div className="space-y-6">
              <div className="group relative">
                <p className="absolute left-6 top-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Organization Name</p>
                <input
                  type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full pl-6 pr-6 pt-9 pb-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-600 font-bold text-slate-900 transition-all outline-none"
                />
              </div>
              <div className="relative group">
                <p className="absolute left-6 top-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 z-10">Monthly Lead Volume</p>
                <select
                  value={monthlyInquiry} onChange={e => setMonthlyInquiry(e.target.value)}
                  className="w-full pl-6 pr-6 pt-9 pb-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-600 font-bold text-slate-900 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select volume range...</option>
                  {monthlyInquiryOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown className="absolute right-6 bottom-5 text-slate-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
            <button onClick={handleNext} disabled={!companyName || !monthlyInquiry} className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 disabled:opacity-50 group flex items-center justify-center gap-3 transition-all hover:bg-slate-900">
              <span>Choose a Time</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Select your window</h2>
              <p className="text-slate-500 text-lg">Pick a slot that works best for a deep dive session.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-3xl flex justify-center scale-90 sm:scale-100">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={{ before: new Date() }}
                  styles={{
                    caption: { color: '#0f172a', fontWeight: 'bold' },
                    head_cell: { color: '#64748b', fontWeight: 'bold', fontSize: '0.75rem' },
                    day_selected: { backgroundColor: '#4f46e5', color: 'white', borderRadius: '12px' },
                    day_today: { color: '#4f46e5', fontWeight: 'bold' }
                  }}
                />
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Available Slots (ET)</p>
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto px-1 pb-4 scrollbar-hide">
                  {availableTimes.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3.5 rounded-xl font-bold text-sm transition-all border ${selectedTime === t
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                        : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30'
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleBack} className="px-6 py-5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><ArrowLeft className="w-6 h-6" /></button>
              <button onClick={handleNext} disabled={!selectedDate || !selectedTime} className="flex-1 py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 disabled:opacity-50 group flex items-center justify-center gap-3 transition-all">
                <span>Contact Details</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Where should we reach you?</h2>
              <p className="text-slate-500 text-lg">We'll send a calendar invite and a brief intro once confirmed.</p>
            </div>
            <div className="space-y-4">
              <div className="group relative">
                <p className="absolute left-6 top-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full pl-6 pr-6 pt-9 pb-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-600 font-bold text-slate-900 transition-all outline-none" />
              </div>
              <div className="group relative">
                <p className="absolute left-6 top-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Work Email</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@company.com" className="w-full pl-6 pr-6 pt-9 pb-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-600 font-bold text-slate-900 transition-all outline-none" />
              </div>
              <div className="group relative">
                <p className="absolute left-6 top-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone (Optional)</p>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="w-full pl-6 pr-6 pt-9 pb-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-600 font-bold text-slate-900 transition-all outline-none" />
              </div>
              <div className="group relative">
                <p className="absolute left-6 top-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Additional Context (Optional)</p>
                <textarea
                  value={additionalInfo}
                  onChange={e => setAdditionalInfo(e.target.value)}
                  placeholder="Tell us about specific challenges or goals..."
                  className="w-full pl-6 pr-6 pt-9 pb-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-indigo-600 font-bold text-slate-900 transition-all outline-none min-h-[120px]"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleBack} className="px-6 py-5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><ArrowLeft className="w-6 h-6" /></button>
              <button onClick={handleNext} disabled={!name || !email} className="flex-1 py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 disabled:opacity-50 group flex items-center justify-center gap-3 transition-all">
                <span>Summary</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Review your request</h2>
              <p className="text-slate-500 text-lg">A quick confirmation before we lock it in.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Chat Window', val: formattedDateTime, icon: CalendarIcon },
                { label: 'Organization', val: companyName, icon: Building2 },
                { label: 'Strategist', val: name, icon: User },
                { label: 'Deliverable', val: email, icon: Mail },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-indigo-600 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                    <p className="text-slate-900 font-bold text-sm truncate">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {additionalInfo && (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Notes</p>
                <p className="text-slate-700 text-sm italic">"{additionalInfo}"</p>
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={handleBack} disabled={isSubmitting} className="px-6 py-5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"><ArrowLeft className="w-6 h-6" /></button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-2xl flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all">
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );
      default: return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center px-4 pt-24 pb-20">
        <SEO title="Booking Confirmed | TopEdge AI" description="Your coffee chat is locked in. Let's talk efficiency." />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl w-full text-center space-y-16">
          <div className="relative mx-auto w-32 h-32">
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-indigo-600 rounded-full blur-3xl" />
            <div className="relative w-full h-full bg-white rounded-3xl flex items-center justify-center shadow-xl border border-slate-100 group">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 transition-transform group-hover:scale-110" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">Window Locked.</h2>
            <p className="text-slate-500 text-xl font-light leading-relaxed max-w-xl mx-auto">
              Your coffee chat request has been priority-queued. Check your inbox at <span className="text-indigo-600 font-bold">{email}</span> for your confirmation and calendar invite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-8">
            {[
              { icon: Mail, title: 'Check Email', desc: 'SLA priority invite sent.' },
              { icon: Zap, title: 'AI Prep', desc: 'Our team is reviewing.' },
              { icon: Globe, title: 'Meet Link', desc: 'Zoom/Meet URI attached.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <item.icon className="w-6 h-6 text-indigo-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={() => window.location.href = '/'} className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-3 mx-auto shadow-xl mt-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Overview</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] pt-32 pb-20 px-4 relative overflow-hidden">
      <SEO title="Schedule Your Discovery Call | TopEdge AI" description="Let's have a quick coffee chat to look at your current workflow and ROI potential." />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-8">
          <ShieldCheck className="w-4 h-4" />
          <span>Priority Selection</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-tight font-semibold"
        >
          Let’s have a quick <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 font-semibold">coffee chat.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
            Let's look at your current workflow to see if ROI-driven system makes sense for your business.
          </p>
          <p className="text-lg text-slate-400 font-light italic">
            A casual, realistic conversation, rather than just adding fancy tech to your stack.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-100 relative">
          <StepIndicator current={step} total={totalSteps} />
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Dynamic Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Bot, label: "Neural Handling" },
            { icon: ShieldCheck, label: "Secure Auth" },
            { icon: Zap, label: "Instant Sync" }
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-3 grayscale group hover:max-grayscale-0 transition-all duration-500">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                <badge.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;