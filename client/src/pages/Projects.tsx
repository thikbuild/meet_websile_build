import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import projectsData from "@/data/projects.json";
import { motion } from "framer-motion";
import Contact from "@/components/sections/Contact";
// JSON TYPE
interface Project {
  id: number;
  name: string;
  img: string;
  slug: string;
  keywords: string[];
  year: number;
  description: string; // FIXED
}
const AnimatedHeroHeader = () => {
  // Animation variants for the Tag
  const tagVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Animation variants for the main Headline (Slide up and fade in)
  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };

  // Animation variants for the new Button (Springy entrance)
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: 0.7, // Appears after the headline
      },
    },
  };

  // Split the text 
  const part1 = "We build, design, and create ";
  const part2 = " digital experiences that make an impact."; // Added space for clean separation

  return (
    <div className="p-4 md:p-8 flex justify-center items-center w-full min-h-[50vh] bg-[#F9FAFB]">
      {/* Header Section Container - Centered Layout */}
      <div className="mb-12 flex flex-col items-center text-center gap-6 w-full max-w-4xl">
        <div className="space-y-4">

          {/* Tag: All Projects - Uses tagVariants, Centered */}
          <motion.div
            className="flex items-center justify-center gap-2"
            initial="hidden"
            animate="visible"
            variants={tagVariants}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white"></span>
            <span className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-gray-200">
              All Projects
            </span>
          </motion.div>

          {/* Headline: Uses headlineVariants, Centered, Creative Font, Secondary Color */}
          <motion.h2
            className="text-4xl font-serif font-extrabold leading-tight text-gray-900 md:text-6xl dark:text-white"
            initial="hidden"
            animate="visible"
            variants={headlineVariants}
          >
            {/* Displaying the text parts */}
            {part1}
            {/* Secondary Color: text-purple-600 is used instead of a gradient */}
            <span className="text-[#000] dark:text-[#F9FAFB] font-creative italic font-light">
              {part2}
            </span>
          </motion.h2>

        </div>

      </div>
    </div>
  );
};

// Tell TS the JSON is Project[]
const typedProjects = projectsData as Project[];
export default function Projects() {

  return (
    <Layout>
      {/* Main Content */}

      <div className="min-h-screen bg-white text-black ">
        {/* Header */}
        <AnimatedHeroHeader />

        {/* Projects Grid */}
        <main className="pt-24 pb-20 px-8 md:px-8 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {typedProjects.map((project) => (
              <Link key={project.id} href={`/project/${project.slug}`}>
                <div className="block">
                  <div className="group relative w-full h-[80vh] rounded-3xl overflow-hidden cursor-pointer isolate">

                    {/* Background Image */}
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <img
                        src={project.img}
                        alt={project.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/90 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">

                      {/* Year + Tags */}
                      <div className="flex justify-between items-start translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-mono border border-white/20">
                          {project.year}
                        </span>

                        <div className="flex flex-wrap justify-end gap-2 max-w-[50%]">
                          {project.keywords.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs uppercase tracking-wider text-gray-300 bg-black/50 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Section */}
                      <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
                        <div className="flex items-end justify-between mb-4">
                          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                            {project.name}
                          </h2>

                          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                            <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Description Reveal */}
                        <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                          <p className="text-lg text-gray-300 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 transform translate-y-4 group-hover:translate-y-0">
                            {project.description}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Contact />
    </Layout>
  );
}
