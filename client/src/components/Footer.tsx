// import { Link } from "wouter";
// import { motion } from "framer-motion";
// import { ArrowUp, Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const footerLinks = {
//   company: [
//     { label: "About", href: "/about" },
//     { label: "Projects", href: "/projects" },
//     { label: "Services", href: "/services" },
//     { label: "Contact", href: "/contacts" },
//   ],
//   services: [
//     { label: "Web Design", href: "/website" },
//     { label: "Digital Marketing", href: "/digital-marketing" },
//     { label: "Branding", href: "/branding" },
//     { label: "E-commerce", href: "/e-commerce" },
//     { label: "Social Media", href: "/social-media" },
//     { label: "SEO & SEM", href: "/seo-sem" },
//   ],
//   legal: [
//     { label: "Privacy Policy", href: "/privacy-policy" },
//     { label: "Terms of Use", href: "/terms" },
//   ],
// };

// const socialLinks = [
//   { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
//   { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
//   { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
//   { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
// ];

// export default function Footer() {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <footer className="bg-foreground text-white">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
//           {/* Brand */}
//           <div className="lg:col-span-1">
//             <Link href="/">
//               <div className="font-serif text-3xl font-bold mb-6 cursor-pointer" data-testid="link-footer-logo">
//                 Websile
//               </div>
//             </Link>
//             <p className="text-background/70 text-sm leading-relaxed mb-8">
//               A creative agency specializing in design, development, digital marketing, and branding.
//             </p>
//             <div className="flex items-center gap-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
//                   data-testid={`link-social-${social.label.toLowerCase()}`}
//                 >
//                   <social.icon className="w-4 h-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Company Links */}
//           <div>
//             <h4 className="font-medium mb-6 text-sm uppercase tracking-wider">
//               Company
//             </h4>
//             <ul className="space-y-4">
//               {footerLinks.company.map((link) => (
//                 <li key={link.href}>
//                   <Link href={link.href}>
//                     <span 
//                       className="text-background/70 hover:text-background transition-colors text-sm cursor-pointer"
//                       data-testid={`link-footer-${link.label.toLowerCase()}`}
//                     >
//                       {link.label}
//                     </span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services Links */}
//           <div>
//             <h4 className="font-medium mb-6 text-sm uppercase tracking-wider">
//               Services
//             </h4>
//             <ul className="space-y-4">
//               {footerLinks.services.map((link) => (
//                 <li key={link.href}>
//                   <Link href={link.href}>
//                     <span 
//                       className="text-background/70 hover:text-background transition-colors text-sm cursor-pointer"
//                       data-testid={`link-footer-service-${link.href.slice(1)}`}
//                     >
//                       {link.label}
//                     </span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Legal Links */}
//           <div>
//             <h4 className="font-medium mb-6 text-sm uppercase tracking-wider">
//               Legal
//             </h4>
//             <ul className="space-y-4">
//               {footerLinks.legal.map((link) => (
//                 <li key={link.href}>
//                   <Link href={link.href}>
//                     <span 
//                       className="text-background/70 hover:text-background transition-colors text-sm cursor-pointer"
//                       data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
//                     >
//                       {link.label}
//                     </span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
//           <p className="text-background/50 text-sm">
//             © {new Date().getFullYear()} Websile. All rights reserved.
//           </p>
//           <p className="text-background/50 text-sm">
//             Crafted with passion for digital excellence
//           </p>
//         </div>
//       </div>

//       {/* Scroll to Top Button */}
//       <motion.div
//         className="fixed bottom-8 right-8 z-50"
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 1 }}
//       >
//         <Button
//           onClick={scrollToTop}
//           size="icon"
//           className="rounded-full w-12 h-12 shadow-lg"
//           data-testid="button-scroll-to-top"
//         >
//           <ArrowUp className="w-5 h-5" />
//         </Button>
//       </motion.div>
//     </footer>
//   );
// }

import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUp, Linkedin, Instagram, Twitter, Facebook, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contacts" },
  ],
  services: [
    { label: "Web Design", href: "/website" },
    { label: "Digital Marketing", href: "/digital-marketing" },
    { label: "Branding", href: "/branding" },
    { label: "E-commerce", href: "/e-commerce" },
    { label: "Social Media", href: "/social-media" },
    { label: "SEO & SEM", href: "/seo-sem" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br bg-[#000] text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <div className="inline-flex items-center gap-3 font-serif text-5xl lg:text-6xl font-bold mb-6 cursor-pointer group" data-testid="link-footer-logo">
                <Sparkles className="w-8 h-8 text-purple-400 group-hover:rotate-180 transition-transform duration-500" />
                Websile
                <Sparkles className="w-8 h-8 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </Link>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              A creative agency specializing in design, development, digital marketing, and branding.
            </p>
          </motion.div>
        </div>

        {/* Links Grid with Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Company & Legal Combined - Larger Column */}
          <motion.div
            className="md:col-span-5 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold mb-6 text-xl flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Navigate
            </h4>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-4">Company</p>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span 
                          className="text-slate-300 hover:text-white hover:translate-x-1 transition-all text-sm cursor-pointer inline-block"
                          data-testid={`link-footer-${link.label.toLowerCase()}`}
                        >
                          → {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-4">Legal</p>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <span 
                          className="text-slate-300 hover:text-white hover:translate-x-1 transition-all text-sm cursor-pointer inline-block"
                          data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          → {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Services - Featured Column */}
          <motion.div
            className="md:col-span-7 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold mb-6 text-xl flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Our Expertise
            </h4>
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                >
                  <Link href={link.href}>
                    <span 
                      className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm cursor-pointer p-3 rounded-lg hover:bg-white/5"
                      data-testid={`link-footer-service-${link.href.slice(1)}`}
                    >
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-150 transition-transform"></span>
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Links - Creative Floating Design */}
        <motion.div
          className="flex justify-center items-center gap-3 mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500"></div>
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              data-testid={`link-social-${social.label.toLowerCase()}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative p-3 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 group-hover:border-white/40 transition-all">
                <social.icon className="w-5 h-5" />
              </div>
            </motion.a>
          ))}
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
        </motion.div>

        {/* Bottom Bar - Diagonal Split Design */}
        <div className="relative pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <motion.p
              className="text-slate-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              © {new Date().getFullYear()} Websile. All rights reserved.
            </motion.p>
            <motion.p
              className="text-slate-400 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Crafted with 
              <span className="text-red-400 animate-pulse">❤</span> 
              for digital excellence
            </motion.p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button - Enhanced */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="relative rounded-full w-14 h-14 shadow-2xl bg-[#000] hover:bg-black/20 border-2 hover:text-black border-white/20 hover:border-black"
            data-testid="button-scroll-to-top"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl"></div>
            <ArrowUp className="w-6 h-6 relative z-10" />
          </Button>
        </motion.div>
      </motion.div>
    </footer>
  );
}