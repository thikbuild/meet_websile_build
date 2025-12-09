import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Loader2, Check, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getTimezone,
  getTimezoneAbbr,
  getNextSevenDays,
  getGroupedTimeSlots,
  formatTime,
  isTimePast,
  TimeCategory,
} from "@/lib/meeting-utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceSection?: string;
}

interface FormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  subject: string;
  // Step 2
  date: string;
  time: string;
  // Step 3
  guests: string[];
  notes: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  date: "",
  time: "",
  guests: [],
  notes: "",
};

export default function BookingModal({ isOpen, onClose, sourceSection }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [guestInput, setGuestInput] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const timezone = getTimezone();
  const timezoneAbbr = getTimezoneAbbr();
  const nextSevenDays = getNextSevenDays();
  const groupedSlots = getGroupedTimeSlots();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGuest = () => {
    if (guestInput && guestInput.includes("@")) {
      setFormData((prev) => ({
        ...prev,
        guests: [...prev.guests, guestInput],
      }));
      setGuestInput("");
    }
  };

  const handleRemoveGuest = (guest: string) => {
    setFormData((prev) => ({
      ...prev,
      guests: prev.guests.filter((g) => g !== guest),
    }));
  };

  const handleDateSelect = (dateString: string) => {
    setFormData((prev) => ({ ...prev, date: dateString, time: "" }));
  };

  const handleTimeSelect = (time: string) => {
    // Don't allow selecting past times for today
    if (!isTimePast(time, formData.date)) {
      setFormData((prev) => ({ ...prev, time }));
    }
  };

  const validateStep = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1:
        return !!(formData.name && formData.email && formData.phone && formData.subject);
      case 2:
        return !!(formData.date && formData.time);
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep((step + 1) as 1 | 2 | 3);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/meetings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timezone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book meeting");
      }

      const data = await response.json();
      setStatus("success");

      // Reset form after delay
      setTimeout(() => {
        setFormData(INITIAL_FORM_DATA);
        setStep(1);
        setStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Booking error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-black to-gray-900 px-6 lg:px-8 py-8 text-white">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </motion.button>

              <div>
                <div className="text-sm font-medium text-white/70 mb-2">Step {step} of 3</div>
                <h2 className="text-2xl lg:text-3xl font-bold">
                  {step === 1 && "Let's Schedule"}
                  {step === 2 && "Pick a Time"}
                  {step === 3 && "Confirm Details"}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 min-h-[400px] max-h-[70vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Meeting Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Website Redesign Project"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time Selection */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    {/* Date Selection */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar size={18} className="text-gray-900" />
                        <label className="block text-sm font-semibold text-gray-900">
                          Select Date
                        </label>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {nextSevenDays.map((day) => (
                          <motion.button
                            key={day.dateString}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDateSelect(day.dateString)}
                            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              formData.date === day.dateString
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-900 border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <div className="font-semibold">{day.dayOfWeek}</div>
                            <div className="text-xs opacity-75">{day.displayText.split(", ")[1]}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    {formData.date && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <Clock size={18} className="text-gray-900" />
                          <label className="block text-sm font-semibold text-gray-900">
                            Select Time
                          </label>
                        </div>

                        <div className="space-y-4">
                          {Object.entries(groupedSlots).map(([category, slots]) => (
                            <div key={category}>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                {category === "morning"
                                  ? "🌅 Morning"
                                  : category === "noon"
                                  ? "☀️ Noon"
                                  : category === "evening"
                                  ? "🌅 Evening"
                                  : "🌙 Night"}
                              </div>
                              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                                {slots.map((slot) => {
                                  const isPast = isTimePast(slot.time, formData.date);
                                  return (
                                    <motion.button
                                      key={slot.time}
                                      whileHover={!isPast ? { scale: 1.05 } : {}}
                                      whileTap={!isPast ? { scale: 0.95 } : {}}
                                      onClick={() => handleTimeSelect(slot.time)}
                                      disabled={isPast}
                                      className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                        formData.time === slot.time
                                          ? "bg-black text-white border-black"
                                          : isPast
                                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                          : "bg-white text-gray-900 border-gray-200 hover:border-gray-400"
                                      }`}
                                    >
                                      {formatTime(slot.time)}
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                          Timezone: {timezone} ({timezoneAbbr})
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Review & Additional Details */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase mb-1">
                            Name
                          </div>
                          <div className="text-sm font-medium text-gray-900">{formData.name}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase mb-1">
                            Email
                          </div>
                          <div className="text-sm font-medium text-gray-900">{formData.email}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase mb-1">
                            Phone
                          </div>
                          <div className="text-sm font-medium text-gray-900">{formData.phone}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase mb-1">
                            Subject
                          </div>
                          <div className="text-sm font-medium text-gray-900">{formData.subject}</div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <div className="text-xs text-gray-500 font-semibold uppercase mb-1">
                          Scheduled Time
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(formData.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })} at {formData.time} {timezoneAbbr}
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Notes {"(Optional)"}
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Add any additional details about the meeting..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
                      />
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Add Guests {"(Optional)"}
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="email"
                          value={guestInput}
                          onChange={(e) => setGuestInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddGuest();
                            }
                          }}
                          placeholder="guest@example.com"
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAddGuest}
                          className="px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-900 transition-colors"
                        >
                          Add
                        </motion.button>
                      </div>

                      {formData.guests.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.guests.map((guest) => (
                            <motion.div
                              key={guest}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-900 flex items-center gap-2"
                            >
                              {guest}
                              <button
                                onClick={() => handleRemoveGuest(guest)}
                                className="text-gray-500 hover:text-gray-900 transition-colors"
                              >
                                ×
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Status Messages */}
                    <AnimatePresence>
                      {status === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 text-green-900"
                        >
                          <Check size={20} />
                          <span className="font-medium">Meeting booked successfully! Check your email.</span>
                        </motion.div>
                      )}
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-900 font-medium"
                        >
                          Something went wrong. Please try again.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 lg:px-8 py-4 bg-gray-50 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                disabled={step === 1}
                className={`p-2 rounded-lg transition-colors ${
                  step === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-900 hover:bg-gray-200"
                }`}
              >
                <ChevronLeft size={24} />
              </motion.button>

              <div className="flex gap-2">
                {step === 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={loading || status === "success"}
                    className="px-6 py-2 bg-black text-white rounded-lg font-medium flex items-center gap-2 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Booking...
                      </>
                    ) : status === "success" ? (
                      <>
                        <Check size={18} />
                        Booked!
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!validateStep(step)}
                    className="px-6 py-2 bg-black text-white rounded-lg font-medium flex items-center gap-2 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                    <ChevronRight size={18} />
                  </motion.button>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Skip
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
