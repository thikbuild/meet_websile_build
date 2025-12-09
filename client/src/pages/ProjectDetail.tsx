import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock, Layers, Globe, Calendar } from "lucide-react";
import projectsData from "@/data/projects.json";
import BookingModal from "@/components/BookingModal";

// --- Types based on your JSON Data ---
interface Project {
  id: number;
  name: string;
  description: string;
  img: string;
  slug: string;
  keywords: string[];
  year: number;
  about_project: {
    industry: string;
    duration: string;
    services: string[];
  };
  gallery: string[];
  challenges: {
    problem: string;
    solution: string;
  };
  key_takeaways: string[];
  project_link: string;
}

// --- Mock Data Import (Replace this with your actual import) ---

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ProjectDetails() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  // Wouter hook to get the slug from the URL (e.g., /project/techflow-solutions)
  const [match, params] = useRoute("/project/:slug");

  // Find the specific project data
  const project = projectsData.find((p: Project) => p.slug === params?.slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  if (!match || !project) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Project not found.
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen text-slate-900 selection:bg-emerald-100">

      {/* --- 1. Hero Section --- */}
      <section className="container mx-auto px-6 py-20 lg:py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Main Image */}
          <motion.div variants={fadeInUp} className="relative group">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3]">
              <img
                src={project.img}
                alt={project.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              {project.year} Release
            </div>
          </motion.div>

          {/* Right: Intro Text */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                {project.name}
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Keywords/Tags */}
            <div className="flex flex-wrap gap-3">
              {project.keywords.map((keyword, i) => (
                <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                  {keyword}
                </span>
              ))}
            </div>

            <a
              href={project.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-600 font-bold text-lg hover:gap-4 transition-all"
            >
              Visit Live Site <ArrowUpRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* --- 2. About The Project (Stats/Info) --- */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12">About the project</motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Industry */}
              <motion.div variants={fadeInUp} className="border-t border-gray-300 pt-6">
                <div className="flex items-center gap-3 mb-4 text-emerald-600">
                  <Globe className="w-6 h-6" />
                  <span className="font-semibold uppercase tracking-wide text-sm">Industry</span>
                </div>
                <p className="text-2xl font-medium">{project.about_project.industry}</p>
              </motion.div>

              {/* Duration */}
              <motion.div variants={fadeInUp} className="border-t border-gray-300 pt-6">
                <div className="flex items-center gap-3 mb-4 text-emerald-600">
                  <Clock className="w-6 h-6" />
                  <span className="font-semibold uppercase tracking-wide text-sm">Duration</span>
                </div>
                <p className="text-2xl font-medium">{project.about_project.duration}</p>
              </motion.div>

              {/* Services */}
              <motion.div variants={fadeInUp} className="border-t border-gray-300 pt-6">
                <div className="flex items-center gap-3 mb-4 text-emerald-600">
                  <Layers className="w-6 h-6" />
                  <span className="font-semibold uppercase tracking-wide text-sm">Services</span>
                </div>
                <ul className="space-y-2">
                  {project.about_project.services.map((service, i) => (
                    <li key={i} className="text-xl text-gray-600">{service}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 3. Gallery Grid --- */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {project.gallery.map((imgUrl, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              // Make the first image span full width for variety like the screenshot
              className={`rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ${idx === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                }`}
            >
              <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- 4. Challenges (Problem & Solution) --- */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-16">Challenges</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Problem */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-emerald-800 bg-emerald-50 inline-block px-4 py-2 rounded-lg">
                The Problem
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.challenges.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-emerald-800 bg-emerald-50 inline-block px-4 py-2 rounded-lg">
                The Solution
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.challenges.solution}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- 5. Key Takeaways --- */}
      <section className="bg-slate-900 text-white py-24 rounded-t-[3rem] mt-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-12">
                Key Takeaways
              </motion.h2>
              <motion.div variants={staggerContainer} className="space-y-6">
                {project.key_takeaways.map((point, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-4 p-4 border border-slate-700 rounded-xl bg-slate-800/50"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                    <span className="text-lg text-slate-200">{point}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Visual Placeholder for Results (e.g. Dashboard view) */}
            <motion.div variants={fadeInUp} className="h-full min-h-[400px] bg-gradient-to-br from-emerald-900 to-slate-800 rounded-3xl flex items-center justify-center relative overflow-hidden border border-slate-700">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              {/* Simulated Graph/Chart Graphic */}
              <div className="relative z-10 text-center">
                <p className="text-6xl font-bold text-emerald-400">200%</p>
                <p className="text-slate-400 mt-2 uppercase tracking-widest text-sm">Growth Achieved</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 6. Summary / Footer --- */}
      <section className="bg-white py-24 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to see more?</h2>
          <p className="text-gray-500 mb-10 text-lg">
            This project represents a significant milestone in digital transformation.
            Check out the live build or browse other case studies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/" className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Back to Projects
            </a>
            <a href={project.project_link} className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors">
              Visit Website
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-colors flex items-center gap-2"
            >
              <Calendar size={18} />
              Book a Meeting
            </motion.button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        sourceSection="project-detail"
      />
    </main>
  );
}
