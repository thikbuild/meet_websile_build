import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import BookingModal from "@/components/BookingModal";
import { Mouse, Calendar } from "lucide-react";

const marqueeItems = [
  "Brand Alchemy",
  "Pixel Poetry",
  "Purpose Driven",
  "Human Centered",
  "Conversion Craft",
  "Visual Strategy",
  "UX Elegance",
  "Digital Storytelling",
  "Engagement Engine",
  "Insight Driven",
  "Data Inspired",
  "Bold Simplicity",
  "Audience First",
  "Performance Design",
  "Market Momentum",
  "Creative Impact",
  "Seamless Experience",
  "Meaningful Metrics",
  "Future Ready",
  "Brand Clarity",
  "Growth Focused",
  "Emotionally Intelligent",
  "Adaptive Design",
  "Strategic Narrative",
  "Conversion Optimized"
];


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-[#F9FAFB]"
    >
      <motion.div
        style={{ y, opacity }}
        className="max-w-5xl mx-auto px-6 lg:px-8 py-20 flex flex-col items-center text-center z-10"
      >
        {/* Main Content */}
        <div className="max-w-4xl">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8"
          >
            Crafting digital
            <br />
            presence & impact
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            We deliver creative branding, web design, and digital solutions
            to help businesses make the most impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/contacts">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-medium bg-secondary/50 hover:bg-secondary/80 transition-all duration-300"
                data-testid="button-request-quote"
              >
                Request a quote 👋
              </Button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingModalOpen(true)}
              className="rounded-full px-8 h-14 text-base font-medium bg-black text-white hover:bg-gray-900 transition-all duration-300 flex items-center gap-2"
            >
              <Calendar size={18} />
              Book a Meeting
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Section: Scroll Indicator & Marquee */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">

        {/* Scroll Down Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mb-8 z-20"
        >
          <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
            <Mouse className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Large Marquee */}
        <div className="w-full overflow-hidden bg-background py-6">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                key={index}
                className="flex items-center mx-4"
              >
                <span className="text-3xl md:text-5xl font-medium uppercase tracking-tight text-foreground/90">
                  / {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        sourceSection="hero"
      />
    </section>
  );
}
