import React, { useState } from 'react';
import { Phone, HeartPulse, Scissors, Banknote, Building2, CheckCircle, ArrowRight, MessageSquare, Clock, Users, Zap, Shield, Star, ChevronRight, Play, Pause, Mic, Volume2 } from 'lucide-react';
import { useRef } from 'react';

const industries = [
  {
    key: 'health',
    label: 'Healthcare',
    icon: <HeartPulse className="w-8 h-8 text-red-500" />,
    color: 'from-red-50 to-white border-red-100',
    bgColor: 'bg-red-50',
    scenarios: [
      'AI answers patient calls, books appointments, and sends reminders.',
      'Prescription refills and test results handled automatically.',
      'Emergency triage and after-hours support.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center shadow-lg">
        <HeartPulse className="w-16 h-16 text-red-500" />
      </div>
    )
  },
  {
    key: 'beauty',
    label: 'Beauty & Salons',
    icon: <Scissors className="w-8 h-8 text-pink-500" />,
    color: 'from-pink-50 to-white border-pink-100',
    bgColor: 'bg-pink-50',
    scenarios: [
      'AI books appointments, sends reminders, and manages waitlists.',
      'Upsells products and services during calls.',
      'Handles rescheduling and cancellations instantly.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl flex items-center justify-center shadow-lg">
        <Scissors className="w-16 h-16 text-pink-500" />
      </div>
    )
  },
  {
    key: 'banking',
    label: 'Banking & Finance',
    icon: <Banknote className="w-8 h-8 text-emerald-500" />,
    color: 'from-emerald-50 to-white border-emerald-100',
    bgColor: 'bg-emerald-50',
    scenarios: [
      'AI answers account queries, loan info, and fraud alerts.',
      'Automates appointment scheduling with advisors.',
      '24/7 support for lost cards and urgent issues.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center shadow-lg">
        <Banknote className="w-16 h-16 text-emerald-500" />
      </div>
    )
  },
  {
    key: 'realestate',
    label: 'Real Estate',
    icon: <Building2 className="w-8 h-8 text-blue-500" />,
    color: 'from-blue-50 to-white border-blue-100',
    bgColor: 'bg-blue-50',
    scenarios: [
      'AI answers property inquiries and schedules viewings.',
      'Captures leads from ads and open houses 24/7.',
      'Provides instant info on listings and availability.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center shadow-lg">
        <Building2 className="w-16 h-16 text-blue-500" />
      </div>
    )
  }
];

// Add new industry verticals
industries.push(
  {
    key: 'hospitality',
    label: 'Hospitality',
    icon: <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" /></svg>,
    color: 'from-orange-50 to-white border-orange-100',
    bgColor: 'bg-orange-50',
    scenarios: [
      'AI answers reservation calls, books tables/rooms, and handles special requests.',
      'Automated check-in/out and feedback collection.',
      '24/7 support for guest inquiries.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center shadow-lg">
        <svg className="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
        </svg>
      </div>
    )
  },
  {
    key: 'education',
    label: 'Education',
    icon: <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    color: 'from-indigo-50 to-white border-indigo-100',
    bgColor: 'bg-indigo-50',
    scenarios: [
      'AI answers admission queries, schedules campus tours, and provides info.',
      'Automates parent-teacher meeting bookings.',
      'Handles fee reminders and event notifications.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center shadow-lg">
        <svg className="w-16 h-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    )
  },
  {
    key: 'automotive',
    label: 'Automotive',
    icon: <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    color: 'from-amber-50 to-white border-amber-100',
    bgColor: 'bg-amber-50',
    scenarios: [
      'AI books test drives, answers inventory questions, and schedules service.',
      'Handles roadside assistance and emergency calls.',
      'Automates follow-ups and feedback.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center shadow-lg">
        <svg className="w-16 h-16 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  },
  {
    key: 'ecommerce',
    label: 'E-commerce',
    icon: <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    color: 'from-purple-50 to-white border-purple-100',
    bgColor: 'bg-purple-50',
    scenarios: [
      'AI answers order status, return, and product queries.',
      'Automates order placement and payment reminders.',
      'Handles delivery issues and feedback.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center shadow-lg">
        <svg className="w-16 h-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
    )
  },
  {
    key: 'logistics',
    label: 'Logistics',
    icon: <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    color: 'from-teal-50 to-white border-teal-100',
    bgColor: 'bg-teal-50',
    scenarios: [
      'AI answers delivery status, pickup, and tracking queries.',
      'Automates driver dispatch and customer notifications.',
      'Handles lost package and claims calls.'
    ],
    illustration: (
      <div className="w-32 h-32 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center shadow-lg">
        <svg className="w-16 h-16 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
    )
  }
);

const steps = [
  {
    title: 'Customer Calls',
    desc: 'A customer calls your business number at any time.',
    icon: <Phone className="w-10 h-10 text-blue-600" />
  },
  {
    title: 'AI Answers Instantly',
    desc: 'AI greets, qualifies, and handles the call with human-like conversation.',
    icon: <CheckCircle className="w-10 h-10 text-emerald-600" />
  },
  {
    title: 'You Get Results',
    desc: 'Receive bookings, leads, and call summaries in real time.',
    icon: <ArrowRight className="w-10 h-10 text-purple-600" />
  }
];

const AICaller = () => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].key);
  const industry = industries.find(i => i.key === activeIndustry);

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-20">
        <div className="flex flex-col items-center gap-8">
          <div className="relative inline-block">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Phone className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              AI Caller
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Never miss a call, never lose a lead. TopEdge AI Caller answers, qualifies, and books for you—24/7, with a human touch.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
              Watch Demo
            </button>
          </div>
          {/* Hero Animation */}
          <div className="mt-12 relative">
            <div className="w-96 h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <p className="text-gray-600 font-medium">AI Caller in Action</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ChevronRight className="w-12 h-12 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Supported Channels Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Supported Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">Phone</h3>
            <p className="text-gray-600">Traditional phone calls with AI intelligence</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">WhatsApp</h3>
            <p className="text-gray-600">Voice messages and calls via WhatsApp</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">SMS</h3>
            <p className="text-gray-600">Text message integration and responses</p>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Industry Use Cases</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries.map((ind) => (
            <button
              key={ind.key}
              onClick={() => setActiveIndustry(ind.key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold border-2 transition-all duration-300 ${
                activeIndustry === ind.key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {ind.icon}
              {ind.label}
            </button>
          ))}
        </div>
        <div className={`rounded-3xl bg-gradient-to-br ${industry?.color} p-12 shadow-2xl border ${industry?.color.includes('border') ? industry.color.split(' ')[2] : 'border-gray-100'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                {industry?.icon}
                <h3 className="text-3xl font-bold text-gray-900">{industry?.label}</h3>
              </div>
              <ul className="space-y-4">
                {industry?.scenarios.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-gray-700 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              {industry?.illustration}
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">See AI Caller in Action</h2>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Demo</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Try calling our demo number or watch the AI handle real customer calls—booking, qualifying, and delighting customers 24/7.
            </p>
          </div>
          <CallDemo />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why TopEdge AI Caller?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">Never Miss a Lead</h3>
            <p className="text-gray-600 leading-relaxed">AI answers every call, captures every opportunity, and sends you instant notifications.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">Human-Like Experience</h3>
            <p className="text-gray-600 leading-relaxed">Conversational AI that feels natural, friendly, and always on-brand for your business.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">24/7 Automation</h3>
            <p className="text-gray-600 leading-relaxed">No more after-hours stress. AI handles calls, bookings, and follow-ups around the clock.</p>
          </div>
        </div>
      </section>

      <AnalyticsDashboard />
      <TestimonialsCarousel />
      <FAQAccordion />
      <StickyCTA />
    </div>
  );
};

// Interactive Call Demo Component
const CallDemo = () => {
  const [state, setState] = useState<'idle'|'ringing'|'inCall'|'ended'>('idle');
  const [scenario, setScenario] = useState('');
  const [transcript, setTranscript] = useState<string[]>([]);
  const callRef = useRef<any>(null);

  const scenarios = [
    'Book appointment',
    'Ask for hours',
    'Request callback',
    'Product inquiry',
    'Cancel booking'
  ];

  const startCall = () => {
    setState('ringing');
    setTranscript([]);
    setScenario('');
    setTimeout(() => setState('inCall'), 1200);
  };
  const endCall = () => setState('ended');
  const selectScenario = (s: string) => {
    setScenario(s);
    setTranscript([`AI: Hello! How can I help you today?`, `You: ${s}`, `AI: [Simulated response for '${s}']`]);
  };
  const reset = () => setState('idle');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-6 text-center text-gray-900">Interactive AI Call Demo</h3>
      {state === 'idle' && (
        <button 
          onClick={startCall} 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Start Call Demo
        </button>
      )}
      {state === 'ringing' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Phone className="w-10 h-10 text-white" />
          </div>
          <span className="text-lg font-medium text-gray-700">Ringing...</span>
        </div>
      )}
      {state === 'inCall' && (
        <div className="space-y-6">
          <div>
            <span className="font-medium text-gray-900 mb-3 block">Select a scenario:</span>
            <div className="grid grid-cols-2 gap-2">
              {scenarios.map(s => (
                <button 
                  key={s} 
                  onClick={() => selectScenario(s)} 
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-300 ${
                    scenario === s 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 min-h-[120px] border border-gray-200">
            {transcript.length === 0 ? (
              <span className="text-gray-400 text-center block">Waiting for your input...</span>
            ) : (
              transcript.map((line, i) => (
                <div key={i} className="mb-2 text-left text-sm">
                  {line}
                </div>
              ))
            )}
          </div>
          <button 
            onClick={endCall} 
            className="w-full bg-red-500 text-white px-6 py-3 rounded-full font-medium hover:bg-red-600 transition-colors"
          >
            End Call
          </button>
        </div>
      )}
      {state === 'ended' && (
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <span className="font-medium text-gray-900 mb-4 block">Call Ended</span>
          <button 
            onClick={reset} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            Start New Call
          </button>
        </div>
      )}
    </div>
  );
};

// Analytics Dashboard Section
const AnalyticsDashboard = () => (
  <section className="max-w-7xl mx-auto px-6 mb-24">
    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">AI Caller Impact</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center hover:shadow-2xl transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <span className="text-5xl font-black text-gray-900 block mb-2">98%</span>
        <div className="text-gray-600 font-medium">Calls Answered</div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center hover:shadow-2xl transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ArrowRight className="w-8 h-8 text-white" />
        </div>
        <span className="text-5xl font-black text-gray-900 block mb-2">+37%</span>
        <div className="text-gray-600 font-medium">More Bookings</div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center hover:shadow-2xl transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <span className="text-5xl font-black text-gray-900 block mb-2">-85%</span>
        <div className="text-gray-600 font-medium">Missed Calls</div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center hover:shadow-2xl transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-white" />
        </div>
        <span className="text-5xl font-black text-gray-900 block mb-2">4.9★</span>
        <div className="text-gray-600 font-medium">Customer Rating</div>
      </div>
    </div>
  </section>
);

// Testimonials Carousel
const testimonials = [
  { 
    name: 'Dr. Sarah Smith', 
    industry: 'Healthcare', 
    avatar: '/avatar1.jpg', 
    rating: 5, 
    text: 'AI Caller has transformed our clinic. No more missed appointments and our patients love the instant booking experience!' 
  },
  { 
    name: 'Priya Patel', 
    industry: 'Beauty & Wellness', 
    avatar: '/avatar2.jpg', 
    rating: 5, 
    text: 'Our salon runs smoother than ever. Clients love the instant booking and our team can focus on what they do best.' 
  },
  { 
    name: 'John Lee', 
    industry: 'Automotive', 
    avatar: '/avatar3.jpg', 
    rating: 5, 
    text: 'AI handles all our test drive calls and follow-ups. The conversion rate has increased dramatically!' 
  },
  { 
    name: 'Sonia Gupta', 
    industry: 'E-commerce', 
    avatar: '/avatar4.jpg', 
    rating: 5, 
    text: 'Order queries and returns are now 100% automated. Our customer satisfaction scores have never been higher.' 
  },
];

const TestimonialsCarousel = () => {
  const [idx, setIdx] = useState(0);
  return (
    <section className="max-w-6xl mx-auto px-6 mb-24">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">What Our Clients Say</h2>
      <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-white">{testimonials[idx].name.charAt(0)}</span>
          </div>
          <div className="font-bold text-xl mb-2 text-gray-900">{testimonials[idx].name}</div>
          <div className="text-blue-600 font-medium mb-4">{testimonials[idx].industry}</div>
          <div className="flex justify-center gap-1 mb-6">
            {Array(testimonials[idx].rating).fill(0).map((_,i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            "{testimonials[idx].text}"
          </div>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setIdx((idx-1+testimonials.length)%testimonials.length)} 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 rotate-180" />
            </button>
            <button 
              onClick={() => setIdx((idx+1)%testimonials.length)} 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Accordion
const faqs = [
  { 
    q: 'Is AI Caller HIPAA compliant for healthcare?', 
    a: 'Yes, we meet all major compliance standards including HIPAA for healthcare, PCI DSS for payments, and SOC 2 for security.' 
  },
  { 
    q: 'Can I customize the AI voice and personality?', 
    a: 'Absolutely! Choose from multiple voices, languages, and customize the personality to match your brand perfectly.' 
  },
  { 
    q: 'Does it integrate with my existing CRM and booking systems?', 
    a: 'Yes, we support all major CRMs including Salesforce, HubSpot, and custom integrations via API.' 
  },
  { 
    q: 'How fast can I get started with AI Caller?', 
    a: 'Most clients are live within 24 hours. We provide quick setup and training to get you up and running immediately.' 
  },
];

const FAQAccordion = () => {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section className="max-w-4xl mx-auto px-6 mb-24">
      <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <button 
              className="w-full text-left p-8 font-bold text-xl flex justify-between items-center hover:bg-gray-50 transition-colors" 
              onClick={() => setOpen(open===i?null:i)}
            >
              {faq.q}
              <ChevronRight className={`w-6 h-6 text-gray-400 transition-transform ${open===i?'rotate-90':''}`} />
            </button>
            {open===i && (
              <div className="px-8 pb-8 text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Sticky CTA
const StickyCTA = () => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
    <a 
      href="/booking" 
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full shadow-2xl text-lg font-bold hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-pulse"
    >
      Get Started with AI Caller
    </a>
  </div>
);

export default AICaller; 