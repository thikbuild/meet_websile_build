// @gemni https://gemini.google.com/share/8e087975f59a
import Layout from "@/components/Layout";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, Users, Target, Lightbulb, Award, ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import BookingModal from "@/components/BookingModal";
import FeaturedWorks from "@/components/sections/FeaturedWorks";


const Button = ({ className, size, children, ...props }: any) => (
  <button
    className={`inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-neutral-800 h-12 px-8 ${className}`}
    {...props}
  >
    {children}
  </button>
);
// ----------------------------------------------------------------

const values = [
  {
    id: "01",
    icon: Users,
    title: "Radical Collaboration",
    description: "We don't just work for you; we work with you. Blurring the lines between client and agency to create a unified vision.",
  },
  {
    id: "02",
    icon: Target,
    title: "Impact Obsessed",
    description: "Beauty is nothing without function. Every pixel is placed with the specific intent of driving measurable business growth.",
  },
  {
    id: "03",
    icon: Lightbulb,
    title: "Future Proofing",
    description: "We anticipate the digital curve, ensuring your brand isn't just relevant today, but leads the conversation tomorrow.",
  },
  {
    id: "04",
    icon: Award,
    title: "Uncompromising Quality",
    description: "Good enough is never enough. We push the boundaries of design and engineering to deliver excellence.",
  },
];

const stats = [
  { number: "150", label: "Projects Shipped" },
  { number: "50", label: "Happy Clients" },
  { number: "10", label: "Years Experience" },
  { number: "25", label: "Creatives" },
];

export default function About() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const containerRef = useRef(null);

  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <Layout>
      <div ref={containerRef} className="relative">
        
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 pt-20 overflow-hidden">
          {/* Abstract Background Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-neutral-100 to-transparent -z-10 opacity-50" />
          
          <div className="max-w-7xl mx-auto w-full z-10">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col font-serif text-[12vw] leading-[0.85] tracking-tighter text-neutral-950">
                <motion.span className="self-start">WE CRAFT</motion.span>
                <motion.span 
                  className="self-center text-neutral-400 italic pr-12"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  DIGITAL
                </motion.span>
                <motion.span className="self-end">FUTURES</motion.span>
              </div>
            </motion.div>

            <motion.div 
              className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8 border-t border-neutral-200 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <p className="max-w-md text-lg text-neutral-600 font-light leading-relaxed">
                Websile is a creative digital agency dealing in strategic thinking and aesthetic excellence. We help businesses thrive in the noise.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-neutral-950" />
                <span className="uppercase tracking-widest text-xs font-bold">Est. 2014</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- IMAGE & STORY SECTION (Asymmetrical) --- */}
        <section className="py-32 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Image Container with Parallax */}
              <div className="lg:col-span-7 relative">
                <motion.div style={{ y: y1 }} className="relative z-10">
                  <div className="aspect-[4/5] bg-neutral-900 rounded-none overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                      alt="Office environment" 
                      className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </motion.div>
                {/* Decorative rectangle behind */}
                <div className="absolute -bottom-12 -left-12 w-full h-full border border-neutral-200 -z-0 hidden lg:block" />
              </div>

              {/* Text Content - Overlapping */}
              <div className="lg:col-span-5 lg:-ml-24 relative z-20 mt-12 lg:mt-0">
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-8 md:p-12 shadow-xl border border-neutral-100"
                >
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 block">
                    Our Philosophy
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
                    Building brands that dare to <span className="italic text-neutral-500">stand out.</span>
                  </h2>
                  <div className="space-y-6 text-neutral-600 leading-relaxed font-light">
                    <p>
                      Founded in 2014, Websile started with a simple mission: to help businesses navigate the digital world with confidence. What began as a small team has grown into a powerhouse of creativity.
                    </p>
                    <p>
                      We believe that good design is invisible, but great design is felt. It's the silent ambassador of your brand, working 24/7 to tell your story.
                    </p>
                  </div>
                  <div className="mt-10">
                    <Link href="/services">
                        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider border-b border-black pb-1 cursor-pointer hover:opacity-70 transition-opacity">
                            View Our Services <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </Link>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* --- STATS STRIP (Minimalist) --- */}
        <section className="py-24 bg-neutral-950 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-start gap-12 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex-1 min-w-[150px]"
                >
                  <div className="text-6xl md:text-7xl lg:text-8xl font-serif opacity-30 font-light">
                    {stat.number}<span className="text-4xl text-blue-500">+</span>
                  </div>
                  <div className="h-px w-full bg-white/20 my-4" />
                  <div className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- VALUES SECTION (Grid with Hover Effects) --- */}
        <section className="py-32 px-6 lg:px-12 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8"
            >
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 block">Our DNA</span>
                <h2 className="text-4xl md:text-5xl font-serif">Core Values</h2>
              </div>
              <p className="max-w-sm text-neutral-500 text-sm leading-relaxed">
                The principles that guide our every decision, pixel, and line of code.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {values.map((value, index) => (
                <ValueCard key={value.title} value={value} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Works Section */}
        <FeaturedWorks />

        {/* --- BIG CTA --- */}
        <section className="py-32 lg:py-48 px-6 lg:px-12 bg-white relative overflow-hidden">
           {/* Decorative big circle */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-100 rounded-full blur-3xl -z-0" />
           
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif leading-none mb-12"
            >
              Ready to make <br/>
              <span className="italic text-neutral-400">history?</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Link href="/contacts">
                    <Button size="lg" className="h-20 px-12 rounded-full text-lg group bg-black hover:bg-neutral-900 transition-all hover:px-16" data-testid="button-about-contact">
                        Start a Project
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="h-20 px-12 rounded-full text-lg font-medium bg-gray-200 text-black hover:bg-gray-300 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a Meeting
                </motion.button>
            </motion.div>
          </div>
        </section>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        sourceSection="about"
      />
    </Layout>
  );
}

// Sub-component for clean code structure
function ValueCard({ value, index }: { value: any, index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`group p-8 lg:p-12 bg-white border border-neutral-100 hover:border-neutral-900 transition-colors duration-500 relative overflow-hidden ${!isEven ? 'md:translate-y-12' : ''}`}
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-4xl font-serif font-bold">{value.id}</span>
      </div>
      
      <div className="mb-8 p-4 bg-neutral-50 w-fit rounded-full group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-500">
        <value.icon className="w-6 h-6" />
      </div>
      
      <h3 className="text-2xl font-serif mb-4 group-hover:translate-x-2 transition-transform duration-300">
        {value.title}
      </h3>
      <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-900 transition-colors duration-300">
        {value.description}
      </p>
    </motion.div>
  );
}
