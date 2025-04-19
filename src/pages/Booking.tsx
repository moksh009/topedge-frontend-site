import { AnimatePresence, motion, useMotionValue, useTransform, LayoutGroup } from 'framer-motion';
import { Bot, Send, CheckCircle, Calendar as CalendarIcon, Star, Clock, Mail, ArrowRight, ArrowLeft, ListChecks, User, Phone, Building2, Loader2, Check } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookingDetails, emailService } from '../services/emailService';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { utcToZonedTime, formatInTimeZone } from 'date-fns-tz';

interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  monthlyFee?: string;
  icon: string;
  rating: string;
  duration: string;
  type: 'voice' | 'chatbot';
  features: string[];
  popular?: boolean;
}

interface TimeZoneOption {
  value: string;
  label: string;
  offset: string;
}

const services: Service[] = [];  // Empty services array

const availableTimes = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
  
];

const timeZones: TimeZoneOption[] = [
  { value: 'America/New_York', label: 'Eastern Time (ET)', offset: 'UTC-4' },
  { value: 'America/Chicago', label: 'Central Time (CT)', offset: 'UTC-5' },
  { value: 'America/Denver', label: 'Mountain Time (MT)', offset: 'UTC-6' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: 'UTC-7' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)', offset: 'UTC-8' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)', offset: 'UTC-10' },
  { value: 'Europe/London', label: 'British Time (BST)', offset: 'UTC+1' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)', offset: 'UTC+2' },
  { value: 'Asia/Dubai', label: 'Gulf Time (GT)', offset: 'UTC+4' },
  { value: 'Asia/Kolkata', label: 'India Time (IST)', offset: 'UTC+5:30' },
  { value: 'Asia/Singapore', label: 'Singapore Time (SGT)', offset: 'UTC+8' },
  { value: 'Asia/Tokyo', label: 'Japan Time (JST)', offset: 'UTC+9' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)', offset: 'UTC+10' },
  { value: 'Pacific/Auckland', label: 'New Zealand Time (NZT)', offset: 'UTC+12' },
];

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: React.ReactNode;
  expectsResponse?: boolean;
  options?: {
    type: string;
    data?: any;
  };
}

const TypewriterEffect = ({ text, delay = 50, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span>{currentText}</span>;
};

const MessageBubble = ({ children, type }: { children: React.ReactNode; type: 'user' | 'bot' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        flex ${type === 'user' ? 'justify-end' : 'justify-start'}
        w-full mb-4
      `}
    >
      <div className={`
        max-w-[80%] rounded-2xl p-4
        ${type === 'user' 
          ? 'bg-blue-600 text-white ml-auto'
          : 'bg-gray-800 text-gray-100'
        }
      `}>
        {children}
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-4 max-w-[100px] bg-gray-800 rounded-2xl">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        className="w-2 h-2 bg-gray-400 rounded-full"
      />
    </div>
  );
};

const ServiceCard = ({ service, isSelected, onSelect }: { service: Service; isSelected: boolean; onSelect: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'bg-gradient-to-b from-[#4D07E3]/20 to-[#7A0BC0]/20 border-2 border-[#4D07E3]'
          : 'bg-black/50 border border-gray-800 hover:border-[#4D07E3]/50'
      }`}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {service.popular && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-3 -right-2 z-10"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#4D07E3] blur-md opacity-50" />
            
            {/* Badge */}
            <div className="relative px-4 py-1 bg-gradient-to-r from-[#4D07E3] to-[#7A0BC0] rounded-full">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-300" />
                <span className="text-xs font-semibold text-white">Popular</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Selection Indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full
              flex items-center justify-center"
          >
            <CheckCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Icon */}
      <motion.div
        initial={false}
        animate={{
          scale: isSelected ? 1.1 : 1,
          y: isSelected ? -5 : 0
        }}
        className="text-4xl mb-4"
      >
        {service.icon}
      </motion.div>

      {/* Service Info */}
      <motion.div
        initial={false}
        animate={{
          y: isSelected ? -5 : 0
        }}
      >
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent
          group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400
          transition-all duration-300"
        >
          {service.name}
        </h3>
        <p className="text-gray-400 mb-4 text-sm">{service.description}</p>
        <p className="text-gray-400 mb-4 text-sm">{service.monthlyFee}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-purple-400">
            <Clock className="w-4 h-4" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-400">
            <Star className="w-4 h-4" />
            <span>{service.rating}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-4 space-y-2">
          {service.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
              <Check className="w-4 h-4 text-green-400" />
              <span>{feature}</span>
            </div>
          ))}
          {service.features.length > 3 && (
            <div className="text-sm text-purple-400">+{service.features.length - 3} more features</div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-white font-bold">${service.price}</span>
          <motion.div
            initial={false}
            animate={{
              x: isSelected ? 0 : -10,
              opacity: isSelected ? 1 : 0
            }}
            className="text-purple-400 flex items-center gap-1 text-sm"
          >
            <span>Selected</span>
            <CheckCircle className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>

      {/* Background Gradient Animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={false}
        animate={{
          background: isSelected
            ? [
                'radial-gradient(circle at 0% 0%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
              ]
            : 'none'
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

const FormInput = ({ label, value, onChange, type = 'text', placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    <motion.div
      whileFocus={{ scale: 1.02 }}
      className="relative"
    >
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-3 rounded-lg
          bg-[#0a0a0a] border border-[#1a1a1a]
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-purple-500/50
          transition-all duration-300
        `}
      />
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  </div>
);

const Calendar = ({ selectedDate, onSelect }: { selectedDate: Date | undefined; onSelect: (date: Date) => void }) => {
  const selectedModifier = selectedDate ? { selected: [selectedDate] } : undefined;

  return (
    <div className="calendar-wrapper p-2 sm:p-4 bg-[#0a0a0a] rounded-lg overflow-x-auto">
      <style>
        {`
          .rdp {
            --rdp-cell-size: clamp(30px, 8vw, 40px);
            margin: 0;
          }
          @media (max-width: 640px) {
            .rdp {
              --rdp-cell-size: 30px;
            }
          }
        `}
      </style>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onSelect(date)}
        modifiers={selectedModifier}
        modifiersClassNames={{
          selected: 'bg-purple-600 text-white rounded-lg',
          today: 'text-purple-600 font-bold',
        }}
        styles={{
          caption: { color: 'white' },
          head_cell: { color: '#9ca3af' },
          cell: { 
            margin: '0.1rem',
            color: 'white',
          },
          day: {
            margin: '0.1rem',
            borderRadius: '0.5rem',
            transition: 'all 0.2s',
            width: 'var(--rdp-cell-size)',
            height: 'var(--rdp-cell-size)',
          },
          nav_button: { 
            color: 'white',
          }
        }}
        fromDate={new Date()}
        className="p-0"
      />
    </div>
  );
};

const GlowingOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Large purple orb */}
      <motion.div
        initial={{ x: "0%", y: "0%" }}
        animate={{ 
          x: ["0%", "25%", "0%", "-25%", "0%"],
          y: ["0%", "25%", "50%", "25%", "0%"],
          scale: [1, 1.2, 1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%]"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-blue-500/30 blur-[120px] animate-pulse" />
      </motion.div>

      {/* Blue orb */}
      <motion.div
        initial={{ x: "100%", y: "0%" }}
        animate={{ 
          x: ["100%", "75%", "85%", "75%", "100%"],
          y: ["0%", "25%", "50%", "75%", "0%"],
          scale: [1, 1.1, 1, 1.1, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] right-[-20%] w-[70%] h-[70%]"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-blue-500/30 via-cyan-500/20 to-purple-500/30 blur-[120px] animate-pulse" />
      </motion.div>

      {/* Pink accent orb */}
      <motion.div
        initial={{ x: "50%", y: "100%" }}
        animate={{ 
          x: ["50%", "30%", "50%", "70%", "50%"],
          y: ["100%", "60%", "50%", "60%", "100%"],
          scale: [1, 1.2, 1, 1.2, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%]"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-pink-500/30 via-purple-500/20 to-indigo-500/30 blur-[120px] animate-pulse" />
      </motion.div>

      {/* Additional small orbs for depth */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] left-[30%] w-[20%] h-[20%]"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-[80px]" />
      </motion.div>
    </div>
  );
};

const TimeZoneSelector = ({ selectedZone, onSelect }: { selectedZone: string; onSelect: (zone: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = timeZones.find(tz => tz.value === selectedZone);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/50 rounded-xl border border-white/10 px-4 py-4 text-white 
          hover:border-purple-500/50 transition-all duration-300 flex items-center justify-between"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          {selectedOption ? selectedOption.label : 'Select Timezone'}
        </span>
        <span className="text-gray-400 text-sm">{selectedOption?.offset}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 mt-2 bg-black/90 border border-white/10 rounded-xl shadow-xl max-h-[300px] overflow-y-auto"
            style={{ zIndex: 100 }}
          >
            <div className="divide-y divide-white/10">
              {timeZones.map((tz) => (
                <motion.button
                  key={tz.value}
                  type="button"
                  onClick={() => {
                    onSelect(tz.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-4 text-left transition-colors flex items-center justify-between
                    ${selectedZone === tz.value 
                      ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white' 
                      : 'text-gray-300 hover:bg-purple-500/10'
                    }
                  `}
                  whileHover={{ x: 4 }}
                >
                  <span>{tz.label}</span>
                  <span className="text-sm text-gray-400">{tz.offset}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Add custom scrollbar styles to your global CSS or in this component
const scrollbarStyles = `
  .timezone-dropdown::-webkit-scrollbar {
    width: 8px;
  }

  .timezone-dropdown::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .timezone-dropdown::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 4px;
  }

  .timezone-dropdown::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.7);
  }
`;

const Booking = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [totalDuration, setTotalDuration] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTimezone, setSelectedTimezone] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return 'America/New_York'; // Default fallback
    }
  });

  useEffect(() => {
    if (progressBarRef.current) {
      const progress = ((currentStep - 1) / 2) * 100;
      progressBarRef.current.style.width = `${progress}%`;
    }
  }, [currentStep]);

  useEffect(() => {
    // Calculate total duration whenever selected services change
    const duration = selectedServices.reduce((total, service) => {
      const duration = parseInt(service.duration);
      return total + (isNaN(duration) ? 0 : duration);
    }, 0);
    setTotalDuration(`${duration} hour${duration !== 1 ? 's' : ''}`);
  }, [selectedServices]);

  const handleServiceSelect = (service: Service) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.id === service.id);
      if (isSelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      const zonedDate = utcToZonedTime(date, selectedTimezone);
      setSelectedDate(zonedDate);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const isFormValid = () => {
    return (
      selectedServices.length > 0 &&
      name &&
      email &&
      phone &&
      selectedDate &&
      selectedTime
    );
  };

  const formattedDateTime = selectedDate && selectedTime
    ? formatInTimeZone(
        selectedDate, 
        selectedTimezone,
        "MMMM d, yyyy 'at' h:mm a zzz"
      )
    : 'Select a date and time';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !selectedDate) return;

    setIsSubmitting(true);

    try {
      const formData:BookingDetails = {
        name: formRef.current.user_name.value,
        email: formRef.current.user_email.value,
        phone: formRef.current.phone.value,
        services: selectedServices,
        date: formattedDateTime,
        time: selectedTime,
        additionalInfo: formRef.current.notes?.value || '',
      };

      // Validate required fields
      if (!formData.name || !formData.email || !formData.services.length || !formData.time) {
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setIsSubmitting(false);
        return;
      }

      await emailService.sendBookingEmails(formData);
      setIsSuccess(true);
      
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedServices([]);
    setSelectedDate(undefined);
    setSelectedTime('');
    setName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setAdditionalInfo('');
    setCurrentStep(1);
    setIsSuccess(false);
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedServices.length === 0) {
      toast.error('Please select at least one service');
      return;
    }
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      toast.error('Please select date and time');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black pt-28 pb-20 px-4 sm:px-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl w-full mx-auto bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 md:p-12 border border-[#1a1a1a] backdrop-blur-xl relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 blur-xl" />
              <CheckCircle className="w-12 h-12 text-white relative z-10" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Booking Confirmed!
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Thank you for booking with us! We've sent a confirmation email with all the details.
                Our team will be in touch with you shortly to confirm your appointment.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Date & Time</p>
                    <p className="text-gray-400">
                      {formattedDateTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Duration</p>
                    <p className="text-gray-400">{totalDuration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ListChecks className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Services</p>
                    <p className="text-gray-400">
                      {selectedServices.map(s => s.name).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                Book Another Session
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
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <LayoutGroup>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black relative overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-20 px-3 sm:px-6"
      >
        {/* Glowing Orbs Background */}
        <GlowingOrbs />

        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.04, 0.62, 0.23, 0.98]
              }}
              className="text-center mb-16 sm:mb-20"
            >
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-purple-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Book a Service
              </motion.h1>
              <motion.p 
                className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Choose your preferred time that works for you.
                Let's create something amazing together.
              </motion.p>
            </motion.div>

            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 sm:space-y-8 md:space-y-10 backdrop-blur-xl bg-white/5 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl mx-2 sm:mx-4 md:mx-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Select Date *</label>
                  <div className="bg-black/50 rounded-xl border border-white/10 p-4 hover:border-purple-500/50 transition-colors duration-300">
                    <Calendar selectedDate={selectedDate} onSelect={handleDateSelect} />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Select Timezone *</label>
                  <style>{scrollbarStyles}</style>
                  <TimeZoneSelector
                    selectedZone={selectedTimezone}
                    onSelect={setSelectedTimezone}
                  />

                  <label className="block text-gray-300 text-sm font-medium mb-2 mt-6">Select Time *</label>
                  <div className="relative z-0 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-8">
                    {availableTimes.map((time) => (
                      <motion.button
                        key={time}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTimeSelect(time)}
                        className={`
                          px-4 py-3 rounded-xl text-sm font-medium
                          ${selectedTime === time
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-black/50 border border-white/10 text-gray-300 hover:border-purple-500/50'
                          }
                          transition-all duration-300
                        `}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    All times are shown in {timeZones.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}
                  </p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Name *</label>
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-400 transition-colors" />
                    <input
                      type="text"
                      name="user_name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        hover:border-purple-500/50 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Email *</label>
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-400 transition-colors" />
                    <input
                      type="email"
                      name="user_email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        hover:border-purple-500/50 transition-all duration-300"
                      placeholder="Your email"
                    />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Phone *</label>
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-400 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        hover:border-purple-500/50 transition-all duration-300"
                      placeholder="Your phone number"
                    />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Company</label>
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-purple-400 transition-colors" />
                    <input
                      type="text"
                      name="company_name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 pl-10 text-white placeholder:text-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        hover:border-purple-500/50 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">Additional Notes</label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <textarea
                    name="notes"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={4}
                    className="w-full bg-black/50 rounded-lg border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                      hover:border-purple-500/50 transition-all duration-300 resize-none"
                    placeholder="Any additional information or special requests"
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`
                  w-full rounded-xl px-8 py-4 
                  bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 
                  text-white font-medium text-lg
                  flex items-center justify-center gap-3 
                  hover:shadow-lg hover:shadow-purple-500/30 
                  transition-all duration-300
                  ${(isSubmitting || !isFormValid()) ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'}
                `}
                whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing your booking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Book Your Session</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </LayoutGroup>
  );
};

export default Booking;