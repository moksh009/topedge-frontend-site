import React, { useState } from 'react';
import { MessageCircle, HeartPulse, Scissors, Banknote, Building2, CheckCircle, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const industries = [
  {
    key: 'health',
    label: 'Healthcare',
    icon: <HeartPulse className="w-6 h-6 text-red-500" />,
    color: 'from-red-100 to-red-50',
    scenarios: [
      'AI chatbot books appointments, sends reminders, and answers patient queries.',
      'Handles prescription refills and test results via chat.',
      '24/7 support for urgent health questions.'
    ],
    illustration: (
      <img src="/chatbot-health.gif" alt="Healthcare Chatbot Demo" className="w-24 h-24 mx-auto rounded-xl" />
    )
  },
  {
    key: 'beauty',
    label: 'Beauty & Salons',
    icon: <Scissors className="w-6 h-6 text-pink-400" />,
    color: 'from-pink-100 to-pink-50',
    scenarios: [
      'Chatbot books appointments, manages waitlists, and sends reminders.',
      'Recommends products and services in chat.',
      'Handles rescheduling and cancellations instantly.'
    ],
    illustration: (
      <img src="/chatbot-beauty.gif" alt="Beauty Chatbot Demo" className="w-24 h-24 mx-auto rounded-xl" />
    )
  },
  {
    key: 'banking',
    label: 'Banking & Finance',
    icon: <Banknote className="w-6 h-6 text-green-500" />,
    color: 'from-green-100 to-green-50',
    scenarios: [
      'AI chatbot answers account queries, loan info, and fraud alerts.',
      'Automates appointment scheduling with advisors via chat.',
      '24/7 support for lost cards and urgent issues.'
    ],
    illustration: (
      <img src="/chatbot-banking.gif" alt="Banking Chatbot Demo" className="w-24 h-24 mx-auto rounded-xl" />
    )
  },
  {
    key: 'realestate',
    label: 'Real Estate',
    icon: <Building2 className="w-6 h-6 text-blue-500" />,
    color: 'from-blue-100 to-blue-50',
    scenarios: [
      'Chatbot answers property inquiries and schedules viewings.',
      'Captures leads from ads and open houses 24/7.',
      'Provides instant info on listings and availability.'
    ],
    illustration: (
      <img src="/chatbot-realestate.gif" alt="Real Estate Chatbot Demo" className="w-24 h-24 mx-auto rounded-xl" />
    )
  }
];

const steps = [
  {
    title: 'Customer Messages',
    desc: 'A customer sends a message on WhatsApp, web, or social.',
    icon: <MessageCircle className="w-8 h-8 text-theme-glow-primary" />
  },
  {
    title: 'AI Replies Instantly',
    desc: 'AI chatbot greets, answers, and handles the chat with human-like conversation.',
    icon: <CheckCircle className="w-8 h-8 text-green-500" />
  },
  {
    title: 'You Get Results',
    desc: 'Receive bookings, leads, and chat summaries in real time.',
    icon: <ArrowRight className="w-8 h-8 text-theme-glow-accent" />
  }
];

const AIChatbot = () => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].key);
  const industry = industries.find(i => i.key === activeIndustry);

  return (
    <div className="min-h-screen bg-theme-bg-primary pt-24 pb-12">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 text-center mb-16">
        <div className="flex flex-col items-center gap-6">
          <div className="relative inline-block">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">
              <MessageCircle className="w-20 h-20 text-theme-glow-accent drop-shadow-xl" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-theme-glow-primary to-theme-glow-accent bg-clip-text text-transparent mb-4">AI Chatbot</h1>
          </div>
          <p className="text-lg md:text-2xl text-theme-text-secondary max-w-2xl mx-auto">Instant replies, happier customers. TopEdge AI Chatbot automates conversations, bookings, and support—across WhatsApp, web, and more.</p>
          {/* Animated chat UI (placeholder GIF/SVG) */}
          <div className="mx-auto mt-6">
            <img src="/ai-chatbot-hero.gif" alt="AI Chatbot Demo" className="rounded-2xl shadow-lg w-full max-w-md mx-auto" />
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
            <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-12 h-12 mb-2" />
            <span className="font-medium text-gray-700">WhatsApp</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/webchat-icon.svg" alt="Website Chat" className="w-12 h-12 mb-2" />
            <span className="font-medium text-gray-700">Website</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/instagram-icon.svg" alt="Instagram" className="w-12 h-12 mb-2" />
            <span className="font-medium text-gray-700">Instagram</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/messenger-icon.svg" alt="Messenger" className="w-12 h-12 mb-2" />
            <span className="font-medium text-gray-700">Messenger</span>
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
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium border transition-all duration-200 ${activeIndustry === ind.key ? 'bg-theme-glow-accent text-white border-theme-glow-accent shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-theme-glow-accent/10 hover:text-theme-glow-accent'}`}
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
              <img src={`/ai-chatbot-${activeIndustry}-animated.gif`} alt={`${industry?.label} Animated Demo`} className="rounded-xl shadow-lg w-full max-w-xs" />
            </div>
          </div>
          {/* Animated chat demo (placeholder GIF/SVG) */}
          <div className="flex-1 flex justify-center items-center">
            <img src="/ai-chatbot-demo.gif" alt="AI Chatbot Industry Demo" className="rounded-xl shadow-lg w-full max-w-xs" />
          </div>
        </div>
      </section>
      {/* Live Demo Section */}
      <section className="max-w-4xl mx-auto px-4 mb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">See AI Chatbot in Action</h2>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <img src="/ai-chatbot-live.gif" alt="Live AI Chatbot Demo" className="w-64 h-64 object-contain mb-4" />
          <p className="text-lg text-gray-700 mb-4">Try chatting with our demo bot or watch the AI handle real customer conversations—booking, answering, and delighting customers 24/7.</p>
          <div className="w-full flex justify-center">
            <img src="/ai-chatbot-live-animated.gif" alt="Animated Live Demo" className="rounded-xl shadow-lg w-full max-w-xs" />
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why TopEdge AI Chatbot?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <CheckCircle className="w-10 h-10 text-theme-glow-primary mb-2" />
            <h3 className="font-semibold text-lg mb-1">Instant Replies</h3>
            <p className="text-gray-500">AI chatbot replies instantly, 24/7, across all channels—never miss a message or a sale.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <CheckCircle className="w-10 h-10 text-theme-glow-accent mb-2" />
            <h3 className="font-semibold text-lg mb-1">Conversational & Smart</h3>
            <p className="text-gray-500">Feels human, understands context, and adapts to your brand’s voice and needs.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <CheckCircle className="w-10 h-10 text-green-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Omnichannel Automation</h3>
            <p className="text-gray-500">Works on WhatsApp, web, and more—automating bookings, support, and sales.</p>
          </div>
        </div>
      </section>
      {/* Interactive Chat Demo */}
      <ChatDemo />
      {/* Analytics Dashboard */}
      <AnalyticsDashboard />
      {/* Testimonials Carousel */}
      <TestimonialsCarousel />
      {/* FAQ Accordion */}
      <FAQAccordion />
      {/* Sticky CTA */}
      <StickyCTA />
    </div>
  );
};

// Add new industry verticals
industries.push(
  {
    key: 'hospitality',
    label: 'Hospitality',
    icon: <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24"><path d="M4 21V7a2 2 0 012-2h12a2 2 0 012 2v14" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="17" r="2" fill="currentColor"/></svg>,
    color: 'from-orange-100 to-orange-50',
    scenarios: [
      'Chatbot books reservations, answers guest queries, and handles feedback.',
      'Automates check-in/out and event reminders.',
      '24/7 support for guest inquiries.'
    ],
    illustration: (<img src="/chatbot-hospitality.gif" alt="Hospitality Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  },
  {
    key: 'education',
    label: 'Education',
    icon: <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24"><path d="M12 3L2 9l10 6 10-6-10-6z" stroke="currentColor" strokeWidth="2"/><path d="M2 17l10 6 10-6" stroke="currentColor" strokeWidth="2"/></svg>,
    color: 'from-indigo-100 to-indigo-50',
    scenarios: [
      'Chatbot answers admission queries, schedules campus tours, and provides info.',
      'Automates parent-teacher meeting bookings.',
      'Handles fee reminders and event notifications.'
    ],
    illustration: (<img src="/chatbot-education.gif" alt="Education Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  },
  {
    key: 'automotive',
    label: 'Automotive',
    icon: <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="6" rx="3" stroke="currentColor" strokeWidth="2"/><circle cx="7.5" cy="17.5" r="1.5" fill="currentColor"/><circle cx="16.5" cy="17.5" r="1.5" fill="currentColor"/></svg>,
    color: 'from-yellow-100 to-yellow-50',
    scenarios: [
      'Chatbot books test drives, answers inventory questions, and schedules service.',
      'Handles roadside assistance and emergency chats.',
      'Automates follow-ups and feedback.'
    ],
    illustration: (<img src="/chatbot-automotive.gif" alt="Automotive Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  },
  {
    key: 'ecommerce',
    label: 'E-commerce',
    icon: <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="2"/></svg>,
    color: 'from-pink-100 to-pink-50',
    scenarios: [
      'Chatbot answers order status, return, and product queries.',
      'Automates order placement and payment reminders.',
      'Handles delivery issues and feedback.'
    ],
    illustration: (<img src="/chatbot-ecommerce.gif" alt="E-commerce Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  },
  {
    key: 'logistics',
    label: 'Logistics',
    icon: <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M6 17v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2"/></svg>,
    color: 'from-teal-100 to-teal-50',
    scenarios: [
      'Chatbot answers delivery status, pickup, and tracking queries.',
      'Automates driver dispatch and customer notifications.',
      'Handles lost package and claims chats.'
    ],
    illustration: (<img src="/chatbot-logistics.gif" alt="Logistics Demo" className="w-24 h-24 mx-auto rounded-xl" />)
  }
);

// Interactive Chat Demo Component
const ChatDemo = () => {
  const [ui, setUI] = useState<'whatsapp'|'website'|'instagram'|'messenger'>('whatsapp');
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const scenarios = [
    'Book appointment',
    'Product info',
    'Cancel booking',
    'Order status',
    'Talk to human'
  ];
  const send = (msg: string) => {
    setMessages([...messages, { from: 'user', text: msg }]);
    setTimeout(() => {
      setMessages(m => [...m, { from: 'ai', text: `[Simulated AI reply for: ${msg}]` }]);
    }, 800);
    setInput('');
  };
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-md mx-auto mb-12">
      <h3 className="text-xl font-bold mb-4">Interactive AI Chat Demo</h3>
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setUI('whatsapp')} className={`px-3 py-1 rounded-full ${ui==='whatsapp'?'bg-green-500 text-white':'bg-gray-100 text-gray-700'}`}>WhatsApp</button>
        <button onClick={()=>setUI('website')} className={`px-3 py-1 rounded-full ${ui==='website'?'bg-blue-500 text-white':'bg-gray-100 text-gray-700'}`}>Website</button>
        <button onClick={()=>setUI('instagram')} className={`px-3 py-1 rounded-full ${ui==='instagram'?'bg-pink-500 text-white':'bg-gray-100 text-gray-700'}`}>Instagram</button>
        <button onClick={()=>setUI('messenger')} className={`px-3 py-1 rounded-full ${ui==='messenger'?'bg-indigo-500 text-white':'bg-gray-100 text-gray-700'}`}>Messenger</button>
      </div>
      <div className={`w-full rounded-xl p-4 mb-4 ${ui==='whatsapp'?'bg-green-50':ui==='website'?'bg-blue-50':ui==='instagram'?'bg-pink-50':'bg-indigo-50'}`} style={{minHeight:180}}>
        {messages.map((m,i)=>(
          <div key={i} className={`mb-2 flex ${m.from==='user'?'justify-end':'justify-start'}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-[70%] ${m.from==='user'?'bg-theme-glow-primary text-white':'bg-white text-gray-800 border'}`}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 w-full mb-2">
        {scenarios.map(s=>(<button key={s} onClick={()=>send(s)} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">{s}</button>))}
      </div>
      <form className="flex w-full gap-2" onSubmit={e=>{e.preventDefault();if(input)send(input);}}>
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 px-3 py-2 rounded-full border border-gray-200" placeholder="Type a message..." />
        <button type="submit" className="bg-theme-glow-accent text-white px-4 py-2 rounded-full font-medium">Send</button>
      </form>
    </div>
  );
};

// Analytics Dashboard Section
const AnalyticsDashboard = () => (
  <section className="max-w-6xl mx-auto px-4 mb-20">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">AI Chatbot Impact</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <span className="text-4xl font-bold text-theme-glow-primary">99%</span>
        <div className="text-gray-500 mt-2">Chats Answered</div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <span className="text-4xl font-bold text-green-500">+42%</span>
        <div className="text-gray-500 mt-2">More Bookings</div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <span className="text-4xl font-bold text-theme-glow-accent">-90%</span>
        <div className="text-gray-500 mt-2">Missed Messages</div>
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
  { name: 'Dr. Smith', industry: 'Healthcare', avatar: '/avatar1.jpg', rating: 5, text: 'AI Chatbot has transformed our clinic. No more missed messages!' },
  { name: 'Priya Patel', industry: 'Beauty', avatar: '/avatar2.jpg', rating: 5, text: 'Our salon runs smoother and our clients love the instant replies.' },
  { name: 'John Lee', industry: 'Automotive', avatar: '/avatar3.jpg', rating: 4, text: 'AI handles all our service chats and follow-ups. Amazing!' },
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
  { q: 'Is AI Chatbot HIPAA compliant?', a: 'Yes, we meet all major compliance standards for healthcare and other industries.' },
  { q: 'Can I customize the chatbot personality?', a: 'Absolutely! Choose from multiple personalities, voices, and languages.' },
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
    <a href="/booking" className="bg-theme-glow-accent text-white px-8 py-4 rounded-full shadow-xl text-lg font-bold animate-bounce hover:bg-theme-glow-primary transition">Get Started with AI Chatbot</a>
  </div>
);

export default AIChatbot; 