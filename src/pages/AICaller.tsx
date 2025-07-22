import React, { useState } from 'react';
import { Phone, HeartPulse, Scissors, Banknote, Building2, CheckCircle, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const industries = [
  {
    key: 'health',
    label: 'Healthcare',
    icon: <HeartPulse className="w-6 h-6 text-red-500" />,
    color: 'from-red-100 to-red-50',
    scenarios: [
      'AI answers patient calls, books appointments, and sends reminders.',
      'Prescription refills and test results handled automatically.',
      'Emergency triage and after-hours support.'
    ],
    illustration: (
      <svg viewBox="0 0 80 80" className="w-24 h-24 mx-auto"><rect width="80" height="80" rx="20" fill="#FEE2E2"/><Phone x="20" y="20" width="40" height="40" className="w-16 h-16 text-red-500 mx-auto"/></svg>
    )
  },
  {
    key: 'beauty',
    label: 'Beauty & Salons',
    icon: <Scissors className="w-6 h-6 text-pink-400" />,
    color: 'from-pink-100 to-pink-50',
    scenarios: [
      'AI books appointments, sends reminders, and manages waitlists.',
      'Upsells products and services during calls.',
      'Handles rescheduling and cancellations instantly.'
    ],
    illustration: (
      <svg viewBox="0 0 80 80" className="w-24 h-24 mx-auto"><rect width="80" height="80" rx="20" fill="#FCE7F3"/><Scissors x="20" y="20" width="40" height="40" className="w-16 h-16 text-pink-400 mx-auto"/></svg>
    )
  },
  {
    key: 'banking',
    label: 'Banking & Finance',
    icon: <Banknote className="w-6 h-6 text-green-500" />,
    color: 'from-green-100 to-green-50',
    scenarios: [
      'AI answers account queries, loan info, and fraud alerts.',
      'Automates appointment scheduling with advisors.',
      '24/7 support for lost cards and urgent issues.'
    ],
    illustration: (
      <svg viewBox="0 0 80 80" className="w-24 h-24 mx-auto"><rect width="80" height="80" rx="20" fill="#DCFCE7"/><Banknote x="20" y="20" width="40" height="40" className="w-16 h-16 text-green-500 mx-auto"/></svg>
    )
  },
  {
    key: 'realestate',
    label: 'Real Estate',
    icon: <Building2 className="w-6 h-6 text-blue-500" />,
    color: 'from-blue-100 to-blue-50',
    scenarios: [
      'AI answers property inquiries and schedules viewings.',
      'Captures leads from ads and open houses 24/7.',
      'Provides instant info on listings and availability.'
    ],
    illustration: (
      <svg viewBox="0 0 80 80" className="w-24 h-24 mx-auto"><rect width="80" height="80" rx="20" fill="#DBEAFE"/><Building2 x="20" y="20" width="40" height="40" className="w-16 h-16 text-blue-500 mx-auto"/></svg>
    )
  }
];

// Add new industry verticals
industries.push(
  {
    key: 'hospitality',
    label: 'Hospitality',
    icon: <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24"><path d="M4 21V7a2 2 0 012-2h12a2 2 0 012 2v14" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="17" r="2" fill="currentColor"/></svg>,
    color: 'from-orange-100 to-orange-50',
    scenarios: [
      'AI answers reservation calls, books tables/rooms, and handles special requests.',
      'Automated check-in/out and feedback collection.',
      '24/7 support for guest inquiries.'
    ],
    illustration: (<img src="/ai-caller-hospitality.gif" alt="Hospitality Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  },
  {
    key: 'education',
    label: 'Education',
    icon: <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24"><path d="M12 3L2 9l10 6 10-6-10-6z" stroke="currentColor" strokeWidth="2"/><path d="M2 17l10 6 10-6" stroke="currentColor" strokeWidth="2"/></svg>,
    color: 'from-indigo-100 to-indigo-50',
    scenarios: [
      'AI answers admission queries, schedules campus tours, and provides info.',
      'Automates parent-teacher meeting bookings.',
      'Handles fee reminders and event notifications.'
    ],
    illustration: (<img src="/ai-caller-education.gif" alt="Education Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  },
  {
    key: 'automotive',
    label: 'Automotive',
    icon: <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="6" rx="3" stroke="currentColor" strokeWidth="2"/><circle cx="7.5" cy="17.5" r="1.5" fill="currentColor"/><circle cx="16.5" cy="17.5" r="1.5" fill="currentColor"/></svg>,
    color: 'from-yellow-100 to-yellow-50',
    scenarios: [
      'AI books test drives, answers inventory questions, and schedules service.',
      'Handles roadside assistance and emergency calls.',
      'Automates follow-ups and feedback.'
    ],
    illustration: (<img src="/ai-caller-automotive.gif" alt="Automotive Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  },
  {
    key: 'ecommerce',
    label: 'E-commerce',
    icon: <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="2"/></svg>,
    color: 'from-pink-100 to-pink-50',
    scenarios: [
      'AI answers order status, return, and product queries.',
      'Automates order placement and payment reminders.',
      'Handles delivery issues and feedback.'
    ],
    illustration: (<img src="/ai-caller-ecommerce.gif" alt="E-commerce Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  },
  {
    key: 'logistics',
    label: 'Logistics',
    icon: <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M6 17v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2"/></svg>,
    color: 'from-teal-100 to-teal-50',
    scenarios: [
      'AI answers delivery status, pickup, and tracking queries.',
      'Automates driver dispatch and customer notifications.',
      'Handles lost package and claims calls.'
    ],
    illustration: (<img src="/ai-caller-logistics.gif" alt="Logistics Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  }
);

const steps = [
  {
    title: 'Customer Calls',
    desc: 'A customer calls your business number at any time.',
    icon: <Phone className="w-8 h-8 text-theme-glow-primary" />
  },
  {
    title: 'AI Answers Instantly',
    desc: 'AI greets, qualifies, and handles the call with human-like conversation.',
    icon: <CheckCircle className="w-8 h-8 text-green-500" />
  },
  {
    title: 'You Get Results',
    desc: 'Receive bookings, leads, and call summaries in real time.',
    icon: <ArrowRight className="w-8 h-8 text-theme-glow-accent" />
  }
];

const AICaller = () => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].key);
  const industry = industries.find(i => i.key === activeIndustry);

  return (
    <div className="min-h-screen bg-theme-bg-primary pt-24 pb-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 text-center mb-16">
        <div className="flex flex-col items-center gap-6">
          <div className="relative inline-block">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">
              <Phone className="w-20 h-20 text-theme-glow-primary drop-shadow-xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-theme-glow-primary to-theme-glow-accent bg-clip-text text-transparent mb-4">AI Caller</h1>
          </div>
          <p className="text-lg md:text-2xl text-theme-text-secondary max-w-2xl mx-auto">Never miss a call, never lose a lead. TopEdge AI Caller answers, qualifies, and books for you—24/7, with a human touch.</p>
          {/* Animated phone UI (placeholder GIF/SVG) */}
          <div className="mx-auto mt-6">
            <img src="/ai-caller-hero.gif" alt="AI Caller Demo" className="rounded-2xl shadow-lg w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>
      {/* How it Works */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3 flex-1">
              <div className="bg-white rounded-full shadow-lg p-4 mb-2">{step.icon}</div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-gray-500 text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Supported Channels Section */}
      <section className="max-w-4xl mx-auto px-4 mb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Supported Channels</h2>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          <div className="flex flex-col items-center">
            <Phone className="w-12 h-12 text-theme-glow-primary mb-2" />
            <span className="font-medium text-gray-700">Phone</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-12 h-12 mb-2" />
            <span className="font-medium text-gray-700">WhatsApp</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/sms-icon.svg" alt="SMS" className="w-12 h-12 mb-2" />
            <span className="font-medium text-gray-700">SMS</span>
          </div>
        </div>
      </section>
      {/* Industry Use Cases */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Industry Use Cases</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {industries.map((ind) => (
            <button
              key={ind.key}
              onClick={() => setActiveIndustry(ind.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium border transition-all duration-200 ${activeIndustry === ind.key ? 'bg-theme-glow-primary text-white border-theme-glow-primary shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-theme-glow-primary/10 hover:text-theme-glow-primary'}`}
            >
              {ind.icon}
              {ind.label}
            </button>
          ))}
        </div>
        <div className={`rounded-3xl bg-gradient-to-br ${industry?.color} p-8 shadow-xl flex flex-col md:flex-row items-center gap-8`}>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="mb-4">{industry?.illustration}</div>
            <ul className="list-disc pl-6 text-lg text-gray-800 space-y-2">
              {industry?.scenarios.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            {/* Animated demo placeholder */}
            <div className="mt-6 w-full flex justify-center">
              <img src={`/ai-caller-${activeIndustry}-animated.gif`} alt={`${industry?.label} Animated Demo`} className="rounded-xl shadow-lg w-full max-w-xs" />
            </div>
          </div>
          {/* Animated phone demo (placeholder GIF/SVG) */}
          <div className="flex-1 flex justify-center items-center">
            <img src="/ai-caller-demo.gif" alt="AI Caller Industry Demo" className="rounded-xl shadow-lg w-full max-w-xs" />
          </div>
        </div>
      </section>
      {/* Live Demo Section */}
      <section className="max-w-4xl mx-auto px-4 mb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">See AI Caller in Action</h2>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <img src="/ai-caller-live.gif" alt="Live AI Caller Demo" className="w-64 h-64 object-contain mb-4" />
          <p className="text-lg text-gray-700 mb-4">Try calling our demo number or watch the AI handle real customer calls—booking, qualifying, and delighting customers 24/7.</p>
          <div className="w-full flex justify-center">
            <img src="/ai-caller-live-animated.gif" alt="Animated Live Demo" className="rounded-xl shadow-lg w-full max-w-xs" />
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why TopEdge AI Caller?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <CheckCircle className="w-10 h-10 text-theme-glow-primary mb-2" />
            <h3 className="font-semibold text-lg mb-1">Never Miss a Lead</h3>
            <p className="text-gray-500">AI answers every call, captures every opportunity, and sends you instant notifications.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <CheckCircle className="w-10 h-10 text-theme-glow-accent mb-2" />
            <h3 className="font-semibold text-lg mb-1">Human-Like Experience</h3>
            <p className="text-gray-500">Conversational AI that feels natural, friendly, and always on-brand for your business.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">24/7 Automation</h3>
            <p className="text-gray-500">No more after-hours stress. AI handles calls, bookings, and follow-ups around the clock.</p>
          </div>
        </div>
      </section>
      <CallDemo />
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
    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-md mx-auto mb-12">
      <h3 className="text-xl font-bold mb-4">Interactive AI Call Demo</h3>
      {state === 'idle' && (
        <button onClick={startCall} className="bg-theme-glow-primary text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-theme-glow-accent transition">Call Now</button>
      )}
      {state === 'ringing' && (
        <div className="flex flex-col items-center">
          <Phone className="w-16 h-16 text-theme-glow-primary animate-pulse mb-2" />
          <span className="text-lg font-medium">Ringing...</span>
        </div>
      )}
      {state === 'inCall' && (
        <div className="w-full">
          <div className="mb-4">
            <span className="font-medium">Select a scenario:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {scenarios.map(s => (
                <button key={s} onClick={() => selectScenario(s)} className={`px-4 py-2 rounded-full border ${scenario === s ? 'bg-theme-glow-primary text-white' : 'bg-gray-100 text-gray-700'} font-medium transition`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 min-h-[100px] mb-4">
            {transcript.length === 0 ? <span className="text-gray-400">Waiting for your input...</span> : transcript.map((line, i) => <div key={i} className="mb-1 text-left">{line}</div>)}
          </div>
          <button onClick={endCall} className="bg-red-500 text-white px-4 py-2 rounded-full font-medium">End Call</button>
        </div>
      )}
      {state === 'ended' && (
        <div className="flex flex-col items-center">
          <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
          <span className="font-medium mb-2">Call Ended</span>
          <button onClick={reset} className="bg-theme-glow-primary text-white px-4 py-2 rounded-full font-medium">Start New Call</button>
        </div>
      )}
    </div>
  );
};

// Analytics Dashboard Section
const AnalyticsDashboard = () => (
  <section className="max-w-6xl mx-auto px-4 mb-20">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">AI Caller Impact</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <span className="text-4xl font-bold text-theme-glow-primary">98%</span>
        <div className="text-gray-500 mt-2">Calls Answered</div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <span className="text-4xl font-bold text-green-500">+37%</span>
        <div className="text-gray-500 mt-2">More Bookings</div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <span className="text-4xl font-bold text-theme-glow-accent">-85%</span>
        <div className="text-gray-500 mt-2">Missed Calls</div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <span className="text-4xl font-bold text-yellow-500">4.9★</span>
        <div className="text-gray-500 mt-2">Customer Rating</div>
      </div>
    </div>
  </section>
);

// Testimonials Carousel
const testimonials = [
  { name: 'Dr. Smith', industry: 'Healthcare', avatar: '/avatar1.jpg', rating: 5, text: 'AI Caller has transformed our clinic. No more missed appointments!' },
  { name: 'Priya Patel', industry: 'Beauty', avatar: '/avatar2.jpg', rating: 5, text: 'Our salon runs smoother and our clients love the instant booking.' },
  { name: 'John Lee', industry: 'Automotive', avatar: '/avatar3.jpg', rating: 4, text: 'AI handles all our test drive calls and follow-ups. Amazing!' },
  { name: 'Sonia Gupta', industry: 'E-commerce', avatar: '/avatar4.jpg', rating: 5, text: 'Order queries and returns are now 100% automated.' },
];
const TestimonialsCarousel = () => {
  const [idx, setIdx] = useState(0);
  return (
    <section className="max-w-4xl mx-auto px-4 mb-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">What Our Clients Say</h2>
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <img src={testimonials[idx].avatar} alt={testimonials[idx].name} className="w-16 h-16 rounded-full mb-2" />
        <div className="font-semibold text-lg mb-1">{testimonials[idx].name} <span className="text-theme-glow-primary text-sm">({testimonials[idx].industry})</span></div>
        <div className="flex gap-1 mb-2">{Array(testimonials[idx].rating).fill(0).map((_,i)=>(<span key={i}>★</span>))}</div>
        <div className="text-gray-700 mb-4">{testimonials[idx].text}</div>
        <div className="flex gap-2">
          <button onClick={()=>setIdx((idx-1+testimonials.length)%testimonials.length)} className="px-3 py-1 rounded-full bg-gray-100">Prev</button>
          <button onClick={()=>setIdx((idx+1)%testimonials.length)} className="px-3 py-1 rounded-full bg-gray-100">Next</button>
        </div>
      </div>
    </section>
  );
};

// FAQ Accordion
const faqs = [
  { q: 'Is AI Caller HIPAA compliant?', a: 'Yes, we meet all major compliance standards for healthcare and other industries.' },
  { q: 'Can I customize the AI voice?', a: 'Absolutely! Choose from multiple voices and languages.' },
  { q: 'Does it integrate with my CRM?', a: 'Yes, we support all major CRMs and booking systems.' },
  { q: 'How fast can I get started?', a: 'Most clients are live within 24 hours.' },
];
const FAQAccordion = () => {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section className="max-w-3xl mx-auto px-4 mb-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4">
            <button className="w-full text-left font-semibold text-lg flex justify-between items-center" onClick={()=>setOpen(open===i?null:i)}>
              {faq.q}
              <span>{open===i?'-':'+'}</span>
            </button>
            {open===i && <div className="mt-2 text-gray-600">{faq.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

// Sticky CTA
const StickyCTA = () => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
    <a href="/booking" className="bg-theme-glow-primary text-white px-8 py-4 rounded-full shadow-xl text-lg font-bold animate-bounce hover:bg-theme-glow-accent transition">Get Started with AI Caller</a>
  </div>
);

export default AICaller; 