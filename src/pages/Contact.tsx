import SEO from '../components/SEO';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Loader2, Send, CheckCircle2, XCircle, Building2, ArrowRight, Mail, Phone, User, Briefcase } from 'lucide-react';
import { emailService } from '../services/emailService';
import { toast } from 'react-hot-toast';

const Contact = () => {
  // Contact page SEO metadata
  const seoTitle = 'Contact Us';
  const seoDescription = 'Get in touch with TopEdge AI for business inquiries, support, or partnership opportunities. Our team responds quickly to help you leverage AI solutions for your business.';
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = {
        name: formRef.current.user_name.value,
        email: formRef.current.user_email.value,
        phone: formRef.current.phone.value,
        companyName: formRef.current.company_name.value,
        subject: formRef.current.subject.value,
        message: formRef.current.message.value,
        queries: formRef.current.queries.value,
      };

      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.queries) {
        toast.error('Please fill in all required fields');
        setSubmitStatus('error');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        setSubmitStatus('error');
        return;
      }

      await emailService.sendContactEmails(formData);
      
      formRef.current.reset();
      setSubmitStatus('success');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white rounded-lg border border-black-600 px-4 py-3 pl-10 text-black placeholder:text-black-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 shadow-sm transition-colors duration-200";

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords="Contact TopEdge AI, AI agency contact, business inquiries, support, partnership, AI solutions, customer service"
        type="website"
      />
      {/* BreadcrumbList Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://topedge.ai/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Contact',
                'item': 'https://topedge.ai/contact'
              }
            ]
          })
        }}
      />
      <motion.div
        ref={containerRef}
        className="relative min-h-screen bg-theme-bg-primary overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Decorative Lucide icons background */}
          <Mail className="absolute top-16 left-24 w-24 h-24 text-purple-300 opacity-40 rotate-12 pointer-events-none" />
          <Phone className="absolute bottom-24 right-32 w-20 h-20 text-blue-300 opacity-40 rotate-6 pointer-events-none" />
          <User className="absolute top-1/2 left-8 w-16 h-16 text-pink-300 opacity-40 rotate-12 pointer-events-none" />
          <Building2 className="absolute bottom-10 left-40 w-24 h-24 text-green-300 opacity-40 pointer-events-none" />
          <Send className="absolute top-28 right-1/4 w-16 h-16 text-yellow-300 opacity-40 pointer-events-none" />
          <CheckCircle2 className="absolute bottom-1/4 right-12 w-20 h-20 text-indigo-300 opacity-40 pointer-events-none" />
          {/* End Decorative Lucide icons */}
          <motion.div 
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-theme-glow-primary/10 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.4, 0.2],
              x: mousePosition.x * 2,
              y: mousePosition.y * 2,
            }}
            transition={{
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              opacity: {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-16"
            style={{ y, opacity, scale }}
          >
            <motion.div
              className="inline-block mb-4 relative"
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", duration: 1.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-theme-accent-primary to-theme-accent-secondary rounded-full blur-xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Building2 className="w-20 h-20 text-theme-text-primary mx-auto relative z-10" />
            </motion.div>
            <motion.div
              className="space-y-6 relative z-20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] relative z-20">
                <span className="block text-black mb-1">Let's transform with</span>
                <span className="block bg-gradient-to-r from-black via-purple-500 to-purple-700 bg-clip-text text-transparent">AI-Powered Support Squad</span>
              </h1>
              <div className="space-y-2">
                <p className="text-theme-text-primary text-lg sm:text-xl font-medium">
                  Partner with the best, Perform like the best.
                </p>
                <p className="text-theme-text-secondary text-base sm:text-lg">
                  The Best choose us. Now it's your turn.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto space-y-6 relative bg-white rounded-2xl shadow-xl shadow-theme-glow shadow-xl overflow-hidden"
            style={{ zIndex: 10 }}
          >
            {/* Gradient border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-xl shadow-theme-glow p-[1.5px] z-10" aria-hidden="true">
              <motion.div
                className="absolute inset-0 rounded-2xl shadow-xl shadow-theme-glow bg-gradient-to-r from-theme-accent-primary to-theme-accent-secondary blur-[1.5px]"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <div className="relative p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02, z: 20 }}
                  transition={{ duration: 0.2 }}
                  onFocus={() => setActiveField("name")}
                  onBlur={() => setActiveField(null)}
                >
                  <AnimatePresence>
                    {activeField === "name" && (
                      <motion.span
                        className="absolute -top-6 left-0 text-sm text-theme-accent-primary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Your Name
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 group-focus-within:text-purple-600 group-hover:text-purple-600 transition-colors duration-200" />
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className={inputClasses}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-theme-glow-primary/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02, z: 20 }}
                  transition={{ duration: 0.2 }}
                  onFocus={() => setActiveField("company")}
                  onBlur={() => setActiveField(null)}
                >
                  <AnimatePresence>
                    {activeField === "company" && (
                      <motion.span
                        className="absolute -top-6 left-0 text-sm text-theme-accent-primary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Company Name
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 group-focus-within:text-purple-600 group-hover:text-purple-600 transition-colors duration-200" />
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Company Name"
                    required
                    className={inputClasses}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-theme-glow-secondary/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02, z: 20 }}
                  transition={{ duration: 0.2 }}
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField(null)}
                >
                  <AnimatePresence>
                    {activeField === "email" && (
                      <motion.span
                        className="absolute -top-6 left-0 text-sm text-theme-accent-primary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Email Address
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 group-focus-within:text-purple-600 group-hover:text-purple-600 transition-colors duration-200" />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Email Address"
                    required
                    className={inputClasses}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-theme-glow-accent/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>

                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02, z: 20 }}
                  transition={{ duration: 0.2 }}
                  onFocus={() => setActiveField("phone")}
                  onBlur={() => setActiveField(null)}
                >
                  <AnimatePresence>
                    {activeField === "phone" && (
                      <motion.span
                        className="absolute -top-6 left-0 text-sm text-theme-accent-primary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Phone Number
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 group-focus-within:text-purple-600 group-hover:text-purple-600 transition-colors duration-200" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className={inputClasses}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-theme-glow-secondary/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </div>

              <motion.div
                className="group relative"
                whileHover={{ scale: 1.02, z: 20 }}
                transition={{ duration: 0.2 }}
                onFocus={() => setActiveField("queries")}
                onBlur={() => setActiveField(null)}
              >
                <AnimatePresence>
                  {activeField === "queries" && (
                    <motion.span
                      className="absolute -top-6 left-0 text-sm text-theme-accent-primary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Average Monthly Queries
                    </motion.span>
                  )}
                </AnimatePresence>
                <select
                  name="queries"
                  required
                  className={inputClasses}
                  defaultValue=""
                >
                  <option value="" disabled>Calls + Text Combined</option>
                  <option value="upto-5000">Upto 5000 queries/month</option>
                  <option value="5000-10000">5000 - 10000 queries/month</option>
                  <option value="10000-20000">10000 - 20000 queries/month</option>
                  <option value="20000-40000">20000 - 40000 queries/month</option>
                  <option value="40000-plus">More than 40000 queries/month</option>
                </select>
                <motion.div
                  className="absolute inset-0 rounded-lg bg-theme-glow-primary/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div
                className="group relative"
                whileHover={{ scale: 1.02, z: 20 }}
                transition={{ duration: 0.2 }}
                onFocus={() => setActiveField("subject")}
                onBlur={() => setActiveField(null)}
              >
                <AnimatePresence>
                  {activeField === "subject" && (
                    <motion.span
                      className="absolute -top-6 left-0 text-sm text-theme-accent-primary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Subject
                    </motion.span>
                  )}
                </AnimatePresence>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className={inputClasses}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-theme-glow-primary/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.div
                className="group relative"
                whileHover={{ scale: 1.02, z: 20 }}
                transition={{ duration: 0.2 }}
                onFocus={() => setActiveField("message")}
                onBlur={() => setActiveField(null)}
              >
                <AnimatePresence>
                  {activeField === "message" && (
                    <motion.span
                      className="absolute -top-6 left-0 text-sm text-theme-accent-primary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Your Message
                    </motion.span>
                  )}
                </AnimatePresence>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  required
                  className={inputClasses}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-theme-glow-secondary/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 mt-6 font-bold text-lg rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 hover:shadow-xl border-0 animate-gradient-x flex items-center justify-center gap-3 group"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                      <span>Sending...</span>
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2 text-red-200"
                    >
                      <XCircle className="w-5 h-5" />
                      Failed to Send
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-5 h-5 text-white group-hover:text-purple-200 group-focus:text-purple-300 group-hover:translate-x-1 transition-transform transition-colors duration-200" />
                      Send Message
                      <ArrowRight className="w-5 h-5 text-white group-hover:text-purple-200 group-focus:text-purple-300 group-hover:translate-x-2 transition-transform transition-colors duration-200" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;