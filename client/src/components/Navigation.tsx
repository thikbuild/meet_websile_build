// import { useState, useRef, useEffect } from "react";
// import { Link, useLocation } from "wouter";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Monitor,
//   TrendingUp,
//   Palette,
//   ShoppingCart,
//   Share2,
//   Search,
//   Menu,
//   X,
//   MessageCircle,
//   ArrowRight
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const services = [
//   {
//     icon: Monitor,
//     title: "Web Design & Development",
//     subtitle: "Custom websites & web applications",
//     href: "/website",
//   },
//   {
//     icon: TrendingUp,
//     title: "Digital Marketing",
//     subtitle: "Strategic campaigns that convert",
//     href: "/digital-marketing",
//   },
//   {
//     icon: Palette,
//     title: "Branding & Identity",
//     subtitle: "Build a memorable brand",
//     href: "/branding",
//   },
//   {
//     icon: ShoppingCart,
//     title: "E-commerce",
//     subtitle: "Online stores that sell",
//     href: "/e-commerce",
//   },
//   {
//     icon: Share2,
//     title: "Social Media Marketing",
//     subtitle: "Grow your social presence",
//     href: "/social-media",
//   },
//   {
//     icon: Search,
//     title: "SEO & SEM",
//     subtitle: "Get found online",
//     href: "/seo-sem",
//   },
// ];

// export default function Navigation() {
//   const [isServicesOpen, setIsServicesOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [location] = useLocation();
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setIsServicesOpen(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setIsServicesOpen(false);
//     }, 150);
//   };

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location]);

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
//     { href: "/projects", label: "Projects" },
//   ];

//   const whatsappLink = "https://wa.me/1234567890";

//   return (
//     <>
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link href="/">
//               <motion.div
//                 className="font-serif text-2xl font-bold tracking-tight cursor-pointer"
//                 whileHover={{ scale: 1.02 }}
//                 data-testid="link-logo"
//               >
//                 Websile
//               </motion.div>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-8">
//               {navLinks.map((link) => (
//                 <Link key={link.href} href={link.href}>
//                   <motion.span
//                     className={`text-sm font-medium cursor-pointer transition-colors ${location === link.href
//                       ? "text-foreground"
//                       : "text-muted-foreground hover:text-foreground"
//                       }`}
//                     whileHover={{ y: -1 }}
//                     data-testid={`link-nav-${link.label.toLowerCase()}`}
//                   >
//                     {link.label}
//                   </motion.span>
//                 </Link>
//               ))}

//               {/* Services Dropdown — Stacked + Animated */}
//               <div
//                 ref={dropdownRef}
//                 className="relative"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <motion.span
//                   className={`text-sm font-medium cursor-pointer transition-colors ${location.startsWith("/services") ||
//                       [
//                         "/website",
//                         "/digital-marketing",
//                         "/branding",
//                         "/e-commerce",
//                         "/social-media",
//                         "/seo-sem"
//                       ].includes(location)
//                       ? "text-foreground"
//                       : "text-muted-foreground hover:text-foreground"
//                     }`}
//                   whileHover={{ y: -2 }}
//                 >
//                   Services
//                 </motion.span>

//                 <AnimatePresence>
//                   {isServicesOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 15, scale: 0.96 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.96 }}
//                       transition={{ duration: 0.25, ease: "easeOut" }}
//                       className="
//           absolute top-full left-1/2 -translate-x-1/2 mt-5
//           w-[520px] rounded-2xl shadow-xl border border-border
//           p-5 bg-[#F1F3F5]
//         "
//                       onMouseEnter={handleMouseEnter}
//                       onMouseLeave={handleMouseLeave}
//                     >
//                       {/* STACK LIST */}
//                       <motion.div
//                         className="flex flex-col gap-2"
//                         initial="hidden"
//                         animate="show"
//                         variants={{
//                           hidden: { opacity: 0, y: 10 },
//                           show: {
//                             opacity: 1,
//                             y: 0,
//                             transition: { staggerChildren: 0.07, delayChildren: 0.05 }
//                           }
//                         }}
//                       >
//                         {services.map((service) => (
//                           <Link key={service.href} href={service.href}>
//                             <motion.div
//                               variants={{
//                                 hidden: { opacity: 0, y: 10 },
//                                 show: { opacity: 1, y: 0 }
//                               }}
//                               whileHover={{
//                                 x: 5,
//                                 scale: 1.02,
//                                 boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
//                               }}
//                               transition={{ type: "spring", stiffness: 260, damping: 18 }}
//                               className="
//                   group relative flex items-center gap-3 p-4 rounded-xl cursor-pointer
//                   bg-white/80 backdrop-blur-sm
//                   hover:bg-white transition-all
//                 "
//                             >
//                               {/* LEFT ICON */}
//                               <motion.div
//                                 className="
//                     p-2 rounded-lg bg-white border border-transparent
//                     group-hover:border-foreground/30 transition
//                   "
//                                 whileHover={{ scale: 1.1, rotate: 4 }}
//                               >
//                                 <service.icon className="w-5 h-5 text-foreground" />
//                               </motion.div>

//                               {/* TEXT */}
//                               <div className="flex-1">
//                                 <div
//                                   className="
//                       font-semibold text-[15px]
//                       group-hover:underline underline-offset-4
//                     "
//                                 >
//                                   {service.title}
//                                 </div>
//                                 <div className="text-[13px] text-muted-foreground mt-1">
//                                   {service.subtitle}
//                                 </div>
//                               </div>

//                               {/* RIGHT ARROW — FIXED + FULLY WORKING */}
//                               <motion.div
//                                 className="text-muted-foreground absolute right-4"
//                                 initial={{ opacity: 0, x: -6 }}
//                                 whileHover={{ opacity: 1, x: 0, rotate: [0, 3, -3, 0] }}
//                                 transition={{ duration: 0.3 }}
//                               >
//                                 <ArrowRight className="w-4 h-4" />
//                               </motion.div>
//                             </motion.div>
//                           </Link>
//                         ))}
//                       </motion.div>

//                       {/* Footer CTA */}
//                       <div className="mt-4 pt-4 border-t border-border/60">
//                         <Link href="/services">
//                           <Button
//                             variant="ghost"
//                             className="
//                 w-full justify-center text-sm hover:text-primary
//               "
//                           >
//                             View All Services
//                           </Button>
//                         </Link>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>


//             </div>

//             {/* CTA Button */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
//                 <Button className="gap-2 rounded-full px-6" data-testid="button-whatsapp-cta">
//                   <MessageCircle className="w-4 h-4" />
//                   Let's Chat
//                 </Button>
//               </a>
//             </div>

//             {/* Mobile Menu Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               data-testid="button-mobile-menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 top-20 z-40 bg-background lg:hidden"
//           >
//             <div className="p-6 space-y-6">
//               {navLinks.map((link) => (
//                 <Link key={link.href} href={link.href}>
//                   <div
//                     className={`text-2xl font-serif cursor-pointer py-2 ${location === link.href
//                       ? "text-foreground"
//                       : "text-muted-foreground"
//                       }`}
//                     data-testid={`link-mobile-${link.label.toLowerCase()}`}
//                   >
//                     {link.label}
//                   </div>
//                 </Link>
//               ))}

//               <div className="py-2">
//                 <div className="text-2xl font-serif text-foreground mb-4">
//                   Services
//                 </div>
//                 <div className="space-y-3 pl-4">
//                   {services.map((service) => (
//                     <Link key={service.href} href={service.href}>
//                       <div
//                         className="flex items-center gap-3 text-muted-foreground py-2"
//                         data-testid={`link-mobile-service-${service.href.slice(1)}`}
//                       >
//                         <service.icon className="w-4 h-4" />
//                         <span>{service.title}</span>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               <div className="pt-6">
//                 <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
//                   <Button className="w-full gap-2 rounded-full" size="lg" data-testid="button-mobile-whatsapp">
//                     <MessageCircle className="w-5 h-5" />
//                     Let's Chat
//                   </Button>
//                 </a>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Monitor,
  TrendingUp,
  Palette,
  ShoppingCart,
  Share2,
  Search,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Data Structure for Services
const services = [
  {
    icon: Monitor,
    title: "Web Development",
    subtitle: "Custom high-performance websites",
    href: "/website",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    subtitle: "Campaigns that drive ROI",
    href: "/digital-marketing",
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Palette,
    title: "Branding",
    subtitle: " memorable brand identities",
    href: "/branding",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    subtitle: "Scalable online stores",
    href: "/e-commerce",
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    icon: Share2,
    title: "Social Media",
    subtitle: "Community growth strategies",
    href: "/social-media",
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  },
  {
    icon: Search,
    title: "SEO & SEM",
    subtitle: "Top-ranking search results",
    href: "/seo-sem",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50"
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Navigation() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

  // Handle Scroll Effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const whatsappLink = "https://wa.me/1234567890";

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${isScrolled
          ? "bg-background/85 backdrop-blur-xl border-border/60 shadow-sm py-2"
          : "bg-transparent border-transparent py-5"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                data-testid="link-logo"
              >
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-lg">
                  W
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-foreground group-hover:text-black/80 transition-colors">
                  Websile
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className="relative group cursor-pointer py-2">
                    <span className={`text-[15px] font-medium transition-colors ${location === link.href ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                      {link.label}
                    </span>
                    {location === link.href && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-black/20 rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                  </div>
                </Link>
              ))}

              {/* Services Dropdown - Vertically Aligned Design */}
              <div
                ref={dropdownRef}
                className="relative py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Dropdown Trigger */}
                <div className={`flex items-center gap-1 text-[15px] font-medium cursor-pointer transition-colors ${isServicesOpen || location.startsWith("/services") ? "text-primary dark:text-white" : "text-muted-foreground hover:text-primary dark:hover:text-white"
                  }`}>
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180 text-primary dark:text-white" : ""}`} />
                </div>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      // Adjusted Container Width for Vertical List
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[450px] rounded-[32px] shadow-3xl bg-white dark:bg-gray-900 border border-gray-100/50 dark:border-gray-800/50 backdrop-blur-md overflow-hidden ring-2 ring-[#D8ECF9]/50"
                    >
                      {/* Service List - Single Column, Strong Vertical Alignment */}
                      <div className="p-6 flex flex-col space-y-2">
                        {services.map((service, idx) => (
                          <Link key={service.href} href={service.href}>
                            <motion.div
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.04 }}
                              // Item Design: Horizontal Alignment, Clear Separation
                              className="group flex items-start p-4 rounded-xl transition-all duration-200 hover:bg-primary/5 dark:hover:bg-gray-800/50 cursor-pointer"
                            >
                              {/* Icon: Contrast and Emphasis */}
                              <div className={`p-3 rounded-lg ${service.bgColor} ${service.color} group-hover:shadow-md group-hover:scale-105 transition-all duration-300 flex-shrink-0 mr-4`}>
                                <service.icon className="w-5 h-5" />
                              </div>

                              {/* Text: Clear Vertical Flow and Hierarchy */}
                              <div className="flex-1">
                                <h4 className="text-[15px] font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                  {service.title}
                                  <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                                  {service.subtitle}
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>

                      {/* Call to Action Bar - Stronger Emphasis & Movement */}
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center px-6">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Explore our full suite
                        </span>
                        <Link href="/services">
                          <span className="text-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer flex items-center gap-1">
                            View all services
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  className="rounded-full px-7 h-11 text-[15px] font-medium bg-[#E5E9EB] text-black hover:bg-[#000] hover:text-white transition-all duration-300 border-none hover:shadow-sm hover:-translate-y-0.5"
                  data-testid="button-whatsapp-cta"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Let's Chat
                </Button>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-transparent"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6"
          >
            <motion.div
              className="flex flex-col gap-6"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: 20, opacity: 0 }
                    }}
                    className={`text-3xl font-serif font-medium cursor-pointer ${location === link.href ? "text-foreground" : "text-muted-foreground"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}

              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 }
                }}
                className="pt-4 border-t border-border/40"
              >
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Services
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {services.map((service) => (
                    <Link key={service.href} href={service.href}>
                      <div
                        className="flex items-center gap-3 p-2 -mx-2 rounded-xl active:bg-accent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className={`p-2 rounded-lg ${service.bgColor} ${service.color}`}>
                          <service.icon className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-medium">{service.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 }
                }}
                className="pt-6"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full h-12 rounded-full text-lg bg-[#E5E9EB] text-black hover:bg-black hover:text-white transition-all">
                    Let's Chat
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}