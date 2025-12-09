"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import SplitType from "split-type";

export default function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  // GSAP Split Text Animation
  useEffect(() => {
    if (!isInView || !ref.current) return;

    const splitHeadline = new SplitType(".who-headline", { types: "words" });
    const splitParagraph = new SplitType(".who-para", { types: "lines" });

    gsap.from(splitHeadline.words, {
      opacity: 0,
      y: 20,
      stagger: 0.09,
      duration: 0.7,
      ease: "power2.out",
    });

    gsap.from(splitParagraph.lines, {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.2,
    });

    return () => {
      splitHeadline.revert();
      splitParagraph.revert();
    };
  }, [isInView]);

  return (
    <section ref={ref} className="py-28 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 bg-[#E5E9EB]/40 rounded-3xl py-28 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center relative ">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Dot + Label */}
            <div className="flex items-center gap-3 text-muted-foreground uppercase tracking-widest text-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-foreground"></div>
              <span>Who we are</span>
            </div>

            {/* Headline */}
            <h2
              className="who-headline text-5xl md:text-6xl font-medium leading-tight"
              aria-label="We are design-first creative studio"
            >
              We are design-first creative studio
            </h2>

            {/* Paragraphs */}
            <p className="who-para text-lg text-muted-foreground max-w-xl leading-relaxed">
              We believe in the power of purposeful design to solve real business challenges.
              Every line, color, and interaction is crafted with intent to create meaningful
              experiences that connect and drive impact.
            </p>

            <p className="who-para text-lg text-muted-foreground max-w-xl leading-relaxed">
              For us, design isn’t just visual — it’s a strategic tool that helps brands achieve
              lasting success.
            </p>

            {/* Button */}
            <Link href="/about">
              <button className="relative overflow-hidden group inline-flex items-center gap-6 hover:text-black bg-black text-white px-8 py-4 mt-2 rounded-xl text-lg">
                <span className="relative z-10">About us</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-[#E5E9EB] w-full h-0 group-hover:h-full transition-all duration-300"></div>
              </button>
            </Link>
          </motion.div>

          {/* RIGHT SIDE — Video */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <video
                src="https://cdn.prod.website-files.com/673786754d248974527e65b5%2F68ee33a7b0684a17a64c6325_Eloqwnt%20Showreel%20Q2%202025-transcode.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative background box */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl bg-foreground/5 -z-10"></div>

            {/* Bottom Label */}
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>Websile Inc.</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
