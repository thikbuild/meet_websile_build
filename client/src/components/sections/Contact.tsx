import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Sparkles, User, MessageSquare, Calendar } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

// --- Types ---
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  budget: string;
  message: string;
}

// --- Configuration ---
// NOTE: Due to environment limitations, we are removing import.meta.env
// and using direct placeholders. In a real project, ensure you replace
// these strings with your actual EmailJS IDs and load the EmailJS library
// via a script tag or ensure it's bundled correctly.
const EMAIL_CONFIG = {
  SERVICE_ID: "EMAILJS_SERVICE_ID",
  TEMPLATE_ID: "EMAILJS_TEMPLETE_ID",
  PUBLIC_KEY: "YOUR_PUBLIC_KEY"
};

// --- Sub-Components ---

// 1. Clean Input Component (Underline Style)
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-semibold text-gray-800">{label}</label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full border-b border-gray-300 py-2 text-gray-600 placeholder-gray-300 focus:outline-none focus:border-black transition-colors resize-none bg-transparent"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border-b border-gray-300 py-2 text-gray-600 placeholder-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent"
      />
    )}
  </div>
);

// 2. Selectable Pill Component
const SelectionPill = ({
  label,
  selected,
  onClick
}: {
  label: string;
  selected: boolean;
  onClick: () => void
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-3 rounded-full text-sm font-medium border transition-all duration-200 ${selected
        ? 'bg-black text-white border-black shadow-lg'
        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
      }`}
  >
    {label}
  </motion.button>
);

// --- Main Component ---
export default function ContactForm() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form State
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    budget: '',
    message: ''
  });

  // Options
  const interests = [
    "Branding", "Website Design", "UX/UI", "Motion Design",
    "Landing page", "Content Creation", "Webflow Development"
  ];

  const budgets = [
    ">1k", "≤ $10k", "> $10k", "> $25k"
  ];

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          interests: formData.interest,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      setStatus('success');
      // Reset form after delay
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', company: '', interest: '', budget: '', message: '' });
      }, 3000);

    } catch (error) {
      console.error("Submission Error:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4 font-sans pt-16 pb-20">

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#EBEFF2] rounded-[40px] w-full max-w-7xl overflow-hidden flex flex-col lg:flex-row min-h-[800px]"
      >

        {/* LEFT COLUMN: Static Content */}
        <div className="lg:w-1/3 bg-white p-12 flex flex-col justify-between relative">
          <div>
            <div className="inline-block px-4 py-2 rounded-full border border-gray-200 text-xs font-medium text-gray-500 mb-8 uppercase tracking-wide">
              Contact us
            </div>

            <h1 className="text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6 leading-[1.1]">
              Let’s make<br />
              an impact
            </h1>
          </div>

          <div className="mt-12 lg:mt-0">
            <h3 className="text-lg font-medium text-black mb-4">Our Testimonials:</h3>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                <User size={20} />
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                <Sparkles size={20} />
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                <MessageSquare size={20} />
              </div>
            </div>
          </div>

          {/* Decorative background blur element (optional) */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="lg:w-2/3 p-8 lg:p-16 lg:pt-24 bg-white relative">

          <form onSubmit={handleSubmit} className="space-y-12">

            {/* Top Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <InputField
                label="Name"
                name="name"
                placeholder="Evan"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Company"
                name="company"
                placeholder="Microsoft"
                value={formData.company}
                onChange={handleChange}
              />
              <InputField
                label="Your Email"
                name="email"
                type="email"
                placeholder="evan@microsoft.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                label="Your Phone"
                name="phone"
                type="tel"
                placeholder="Your number phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Interest Selection */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-800">I'm interested in...</label>
              <div className="flex flex-wrap gap-3">
                {interests.map((item) => (
                  <SelectionPill
                    key={item}
                    label={item}
                    selected={formData.interest === item}
                    onClick={() => setFormData(prev => ({ ...prev, interest: item }))}
                  />
                ))}
              </div>
            </div>

            {/* Budget Selection */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-800">Project Budget (USD)</label>
              <div className="flex flex-wrap gap-3">
                {budgets.map((item) => (
                  <SelectionPill
                    key={item}
                    label={item}
                    selected={formData.budget === item}
                    onClick={() => setFormData(prev => ({ ...prev, budget: item }))}
                  />
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-2 h-32">
              <InputField
                label="Tell us about your project."
                name="message"
                type="textarea"
                placeholder="> Write something concise..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={16}
                columns={80}
                className="resize-y min-h-[8rem] max-h-[24rem] w-full"
              />
            </div>

            {/* Submit & CTA Buttons */}
            <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="w-full md:w-auto px-12 py-4 bg-black text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check size={20} />
                    Sent!
                  </>
                ) : (
                  "Submit"
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full md:w-auto px-12 py-4 bg-gray-200 text-black rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
              >
                <Calendar size={20} />
                Schedule Meeting
              </motion.button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-600 text-center font-medium"
                >
                  Thanks! We'll be in touch shortly.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-center font-medium"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </AnimatePresence>

          </form>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        sourceSection="contact"
      />
    </div>
  );
}
