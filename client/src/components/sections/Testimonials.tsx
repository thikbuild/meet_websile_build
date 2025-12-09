'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, type ClassValue } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Linkedin, Twitter, Quote } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Testimonial {
  name: string;
  position: string;
  company: string;
  links: {
    linkedin?: string;
    twitter?: string;
  };
  photo: string;
  review: string;
}

// --- Self-Contained Testimonial Data ---
const testimonialsData: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    position: "Chief Marketing Officer",
    company: "TechFlow Inc.",
    photo: "https://placehold.co/200x200/505050/ffffff?text=SJ",
    review: "The attention to detail and creative solutions provided were outstanding. They didn't just build a website; they crafted a digital experience that perfectly aligns with our brand identity.",
    links: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Marcus Chen",
    position: "Founder",
    company: "Apex Startups",
    photo: "https://placehold.co/200x200/404040/ffffff?text=MC",
    review: "Incredible workflow and communication. The team anticipated our needs before we even voiced them. A truly partnership-driven approach to development and execution.",
    links: { linkedin: "#" }
  },
  {
    name: "Elena Rodriguez",
    position: "Product Director",
    company: "Novus Design Studio",
    photo: "https://placehold.co/200x200/606060/ffffff?text=ER",
    review: "I've worked with many agencies, but this level of technical expertise combined with genuine design intuition is rare. They transformed our chaotic vision into a sleek, performant reality.",
    links: { twitter: "#" }
  },
  {
    name: "David Park",
    position: "CTO",
    company: "Skyline Systems",
    photo: "https://placehold.co/200x200/303030/ffffff?text=DP",
    review: "Robust code, clean architecture, and a beautiful UI. It's rare to find a team that cares as much about the backend performance as they do about the frontend aesthetics.",
    links: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Olivia White",
    position: "Head of Strategy",
    company: "Global Innovations",
    photo: "https://placehold.co/200x200/707070/ffffff?text=OW",
    review: "The results exceeded our expectations. Our conversion rates jumped immediately after the new section went live. Highly recommend for any serious digital transformation project.",
    links: { linkedin: "#" }
  },
];


// --- Sub-Component: Creative Testimonial Card ---
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex-shrink-0 w-[90vw] md:w-[600px] lg:w-[650px] snap-center px-4 z-[999] ">
      <motion.div
        // Changed bg-zinc-100 to the requested light background #F9FAFB
        className="group relative flex flex-col h-full bg-[#F9FAFB] rounded-[2.5rem] overflow-hidden"
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Decorative Gradient Blob (Using soft colors for the light theme) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E5E9EB] to-[#FFF] blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

        {/* Massive Watermark Icon - Now using the section background color for subtle texture */}
        <Quote className="absolute top-8 right-8 w-24 h-24 text-[#E5E9EB] rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />

        <div className="relative z-10 flex flex-col h-full p-8 md:p-12 lg:p-14">
            {/* Top Row: Stars - Changed to use black fill */}
            <div className="flex items-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#000] text-[#000]" />
                ))}
            </div>

            {/* Middle: Review Text - Changed to use black text */}
            <div className="flex-grow">
                <p className="font-serif text-2xl md:text-3xl leading-snug text-[#000]">
                &quot;{testimonial.review}&quot;
                </p>
            </div>

            {/* Bottom: Author & Socials */}
            <div className="mt-10 flex items-end justify-between border-t border-[#E5E9EB] pt-8">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#000] rounded-full blur opacity-5 translate-y-2"></div>
                        <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        // Using placeholder images now that the external JSON import is removed
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; 
                            target.src = `https://placehold.co/200x200/808080/ffffff?text=${testimonial.name.split(' ').map(n => n[0]).join('')}`;
                        }}
                        // Using white border for contrast on light background
                        className="relative w-16 h-16 object-cover rounded-full border-2 border-[#FFF]"
                        />
                    </div>
                    <div>
                        {/* Changed to use black text */}
                        <h4 className="text-lg font-bold text-[#000] tracking-tight">{testimonial.name}</h4>
                        <p className="text-sm font-medium text-[#000] opacity-60 uppercase tracking-wide mt-1">
                        {testimonial.position} @ {testimonial.company}
                        </p>
                    </div>
                </div>

                {/* Social Links with distinct styling */}
                <div className="flex gap-3">
                    {testimonial.links.linkedin && (
                        <a
                        href={testimonial.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        // Changed background to white, border to light gray, text to dark gray
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF] border border-[#E5E9EB] text-[#000] opacity-50 hover:opacity-100 hover:text-white hover:bg-[#000] hover:border-[#000] transition-all duration-300"
                        >
                        <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                    {testimonial.links.twitter && (
                        <a
                        href={testimonial.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        // Changed background to white, border to light gray, text to dark gray
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF] border border-[#E5E9EB] text-[#000] opacity-50 hover:opacity-100 hover:text-white hover:bg-[#000] hover:border-[#000] transition-all duration-300"
                        >
                        <Twitter className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Handle Scroll Progress
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const percentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setProgress(percentage);
    }
  };

  // Scroll Helpers
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% for better visibility
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Auto Scroll Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isHovering) {
      interval = setInterval(() => {
        if (containerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
          if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5) {
            containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scroll('right');
          }
        }
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    // Section Container: Changed bg-zinc-950 to the requested light background #E5E9EB
    <section className="w-full bg-[#F9FAFB] py-24 lg:py-36 relative overflow-auto">
      
      {/* Background Decorative Lines - Changed to black/transparent for contrast */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#000] to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#000] to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Layout: Asymmetrical Balance */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7 space-y-6">
                {/* Pill - Using black background and white text for high contrast */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#000] border border-[#000] backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FFF]">Testimonials</span>
                </div>
                {/* Main Heading - Changed to black text */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-[#000] tracking-tight leading-[1.1]">
                    Voices of <br/>
                    {/* Gradient span - Using black/dark gray gradient for effect */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#000] to-gray-700">Satisfaction.</span>
                </h2>
            </div>
            
            {/* Context/Description on right side - Changed to black text */}
            <div className="lg:col-span-5 pb-2">
                <p className="text-lg text-[#000] opacity-70 leading-relaxed">
                    We don't just build software; we build relationships. Here is what our partners have to say about the journey.
                </p>
            </div>
        </div>

        {/* Carousel Container */}
        <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
          {/* Scrollable Area */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex gap-0 pb-12 snap-x snap-mandatory scroll-smooth overflow-x-auto overflow-y-visible w-full no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              // Negative margins allow items to touch screen edge on mobile while respecting container padding
              marginLeft: '-1rem',
              marginRight: '-1rem',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
            
            {/* Spacer for end of scroll */}
            <div className="w-[10vw] flex-shrink-0" />
          </div>

          {/* Controls: Floating Bottom Bar */}
          {/* Border - Changed to light gray for subtle division */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between border-t border-[#E5E9EB] pt-8">
            
            {/* Custom Progress Bar */}
            <div className="flex items-center gap-4 w-full md:w-1/3 mb-6 md:mb-0">
                {/* Text - Changed to dark gray */}
                <span className="text-xs font-mono text-[#000] opacity-50">01</span>
                {/* Track - Changed to light gray */}
                <div className="relative h-px w-full bg-[#E5E9EB]">
                    <motion.div
                        // Fill - Changed to black
                        className="absolute top-0 bottom-0 left-0 bg-[#000]"
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.1 }}
                        style={{ height: '2px', top: '-0.5px' }} // Slightly thicker than track
                    />
                </div>
                {/* Text - Changed to dark gray */}
                <span className="text-xs font-mono text-[#000] opacity-50">
                  {testimonialsData.length < 10 ? `0${testimonialsData.length}` : testimonialsData.length}
                </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => scroll('left')}
                // Button - Changed to white background, light gray border, black text
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E9EB] bg-[#FFF] text-[#000] transition-all hover:bg-[#000] hover:text-[#FFF] hover:border-[#000] overflow-hidden"
                aria-label="Previous testimonial"
              >
                {/* Inner hover div - Changed to black */}
                <div className="absolute inset-0 bg-[#000] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                <ArrowLeft className="relative z-10 w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>
              <button
                onClick={() => scroll('right')}
                // Button - Changed to white background, light gray border, black text
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E9EB] bg-[#FFF] text-[#000] transition-all hover:bg-[#000] hover:text-[#FFF] hover:border-[#000] overflow-hidden"
                aria-label="Next testimonial"
              >
                {/* Inner hover div - Changed to black */}
                <div className="absolute inset-0 bg-[#000] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;