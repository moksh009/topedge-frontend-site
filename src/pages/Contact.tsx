import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Loader2, Send, CheckCircle2, XCircle, Building2, ArrowRight, Mail, Phone, User, Briefcase } from 'lucide-react';
import { emailService } from '../services/emailService';
import { toast } from 'react-hot-toast';

const Contact = () => {
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
        toast.error('Please fill in all required fields');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      await emailService.sendContactEmails(formData);
      
      formRef.current.reset();
      toast.success('Message sent successfully! We will get back to you soon.');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300";

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[180px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: { duration: 0.1 },
            y: { duration: 0.1 },
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: mousePosition.x * -2,
            y: mousePosition.y * -2,
          }}
          transition={{
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: { duration: 0.1 },
            y: { duration: 0.1 },
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[200px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
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
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Building2 className="w-20 h-20 text-white mx-auto relative z-10" />
          </motion.div>
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's Build Your Vision Together
          </motion.h1>
          <motion.p
            className="text-gray-400 text-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your ideas into reality with our expert team.
          </motion.p>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-6 relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            perspective: "1000px",
            transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-xl rounded-2xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          
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
                      className="absolute -top-6 left-0 text-sm text-purple-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Your Name
                    </motion.span>
                  )}
                </AnimatePresence>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className={inputClasses}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-purple-500/20 opacity-0 group-hover:opacity-100 -z-10 blur"
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
                      className="absolute -top-6 left-0 text-sm text-purple-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Company Name
                    </motion.span>
                  )}
                </AnimatePresence>
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name"
                  required
                  className={inputClasses}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-blue-500/20 opacity-0 group-hover:opacity-100 -z-10 blur"
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
                      className="absolute -top-6 left-0 text-sm text-purple-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Email Address
                    </motion.span>
                  )}
                </AnimatePresence>
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Email Address"
                  required
                  className={inputClasses}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-indigo-500/20 opacity-0 group-hover:opacity-100 -z-10 blur"
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
                      className="absolute -top-6 left-0 text-sm text-purple-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Phone Number
                    </motion.span>
                  )}
                </AnimatePresence>
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className={inputClasses}
                />
                <motion.div
                  className="absolute inset-0 rounded-lg bg-violet-500/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>

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
                    className="absolute -top-6 left-0 text-sm text-purple-400"
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
                className="absolute inset-0 rounded-lg bg-purple-500/20 opacity-0 group-hover:opacity-100 -z-10 blur"
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
                    className="absolute -top-6 left-0 text-sm text-purple-400"
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
                className="absolute inset-0 rounded-lg bg-blue-500/20 opacity-0 group-hover:opacity-100 -z-10 blur"
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg relative overflow-hidden group disabled:opacity-70"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0"
                animate={{
                  x: ["0%", "200%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.4) 0%, transparent 100%)",
                }}
              />
              <span className="relative flex items-center justify-center gap-2">
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </motion.div>
                  ) : submitStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent Successfully!
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
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
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Send Message
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;