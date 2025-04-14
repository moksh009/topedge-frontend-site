import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Loader2, Send, CheckCircle2, XCircle, Building2, ArrowRight, Mail, Phone, User, Briefcase } from 'lucide-react';
import { emailService } from '../../services/emailService';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

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
      };

      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        toast.error('Please fill in all required fields', {
          position: 'bottom-right',
          style: {
            background: 'linear-gradient(to right, #FF3B30, #FF453A)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
          }
        });
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address', {
          position: 'bottom-right',
          style: {
            background: 'linear-gradient(to right, #FF3B30, #FF453A)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
          }
        });
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      await emailService.sendContactEmails(formData);
      setSubmitStatus('success');
      formRef.current.reset();
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitStatus('error');
      toast.error('Failed to send message. Please try again.', {
        position: 'bottom-right',
        style: {
          background: 'linear-gradient(to right, #FF3B30, #FF453A)',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0A84FF]/10 to-[#0066CC]/10 border border-white/10 backdrop-blur-xl max-w-lg w-full mx-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#0A84FF] to-[#0066CC] flex items-center justify-center relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0A84FF] to-[#0066CC] opacity-20 blur-xl" />
                <CheckCircle2 className="w-10 h-10 text-white relative z-10" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent"
              >
                Message Received!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                Thank you for reaching out! We've received your message and our team will get back to you within 24-48 hours. Keep an eye on your inbox for our response.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSubmitStatus('idle');
                    formRef.current?.reset();
                  }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#0A84FF] to-[#0066CC] text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Send Another Message
                </motion.button>
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-all duration-300"
                >
                  Return Home
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 container mx-auto px-4 py-16"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent">
                  Get in Touch
                </h1>
                <p className="text-gray-400 text-lg">
                  Have a question or want to work together? We'd love to hear from you.
                </p>
              </motion.div>

              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6 backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="user_name"
                        required
                        className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="user_email"
                        required
                        className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm font-medium">Company</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="company_name"
                        className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Message subject"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Your message"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-lg px-6 py-4 bg-gradient-to-r from-[#0A84FF] to-[#0066CC] text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Contact; 