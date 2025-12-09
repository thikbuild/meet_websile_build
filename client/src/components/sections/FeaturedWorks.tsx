'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
// Assuming you have a utility for merging classes, if not, use standard string concatenation
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import projectData from '@/data/projects.json';
// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
// Matches the structure requested
interface Project {
  name: string;
  description: string;
  img: string;
  slug: string;
  keywords: string[]; // e.g., ["Web Design", "Branding"]
  year?: string; // Derived from image text "Taraxa - 2024"
  about_project?: {
    industry: string;
    duration: string;
    services: string[];
  };
  gallery?: string[];
  challenges?: {
    problem: string;
    solution: string;
  }[];
  key_takeaways?: string[];
  project_link?: string;
}


const projectsData = projectData as unknown as Project[];

// --- Sub-Component: Project Card ---
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={`/projects/${project.slug}`} className="group relative block flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px] sm:w-[100vw] snap-center">
      <div className="flex flex-col gap-6">
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-100">
            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            
            <motion.img
              src={project.img}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              initial={{ scale: 1 }}
            />
            
            {/* Optional: 'View Project' indication on hover */}
            <div className="absolute right-6 top-6 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                    <ArrowUpRight className="h-5 w-5 text-black" />
                </div>
            </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {/* Title & Year */}
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {project.name}
                </h3>
                <span className="text-3xl font-light text-gray-400">
                    - {project.year}
                </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-start md:justify-end gap-2">
                {project.keywords.map((tag, i) => (
                    <span 
                        key={i} 
                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </Link>
  );
};

// --- Main Component: Featured Works ---
const FeaturedWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Handle Scroll Progress
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      // Prevent division by zero
      const percentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setProgress(percentage);
    }
  };

  // Scroll Helpers
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.6; // Scroll 60% of view
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
                
                // If we reached the end, scroll back to start, else scroll right
                if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
                   containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                   scroll('right');
                }
            }
        }, 5000); // Change slide every 5 seconds
    }

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section className="w-full bg-white py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-black"></span>
                <span className="text-sm font-medium uppercase tracking-wide text-gray-900">Our Works</span>
            </div>
            <h2 className="max-w-2xl text-4xl font-medium leading-tight text-gray-900 md:text-6xl">
              Check Our Featured Projects
            </h2>
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
                className="no-scrollbar flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
                
                {/* Spacer at the end for visual balance */}
                <div className="w-[5vw] flex-shrink-0" /> 
            </div>

            {/* Controls Section (Progress + Buttons) */}
            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                
                {/* Progress Bar */}
                <div className="relative h-[2px] w-full md:w-1/2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                        className="absolute top-0 bottom-0 left-0 bg-black rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4 self-end md:self-auto">
                     <button 
                        onClick={() => scroll('left')}
                        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-black hover:text-white disabled:opacity-50"
                        aria-label="Previous project"
                     >
                        <ArrowLeft className="h-5 w-5" />
                     </button>
                     <button 
                        onClick={() => scroll('right')}
                        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-black hover:text-white disabled:opacity-50"
                        aria-label="Next project"
                     >
                        <ArrowRight className="h-5 w-5" />
                     </button>
                </div>
            </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
             <Link 
                href="/projects" 
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black px-8 py-4 text-white transition-all hover:bg-gray-800"
            >
                <span className="font-medium">All projects</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedWorks;