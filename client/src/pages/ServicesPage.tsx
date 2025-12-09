import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Monitor, 
  TrendingUp, 
  Palette, 
  ShoppingCart, 
  Share2, 
  Search,
  Plus,
  Minus,
  Calendar,
  DollarSign
} from "lucide-react";

// --- Data ---
const services = [
  {
    number: "01",
    icon: Monitor,
    title: "Web Design & Dev",
    description: "Stunning, responsive websites that captivate audience and drive results. From landing pages to complex web apps.",
    features: ["Custom Design", "React/Next.js", "CMS", "Performance"],
    href: "/website",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategic campaigns that reach your target audience using data-driven approaches to maximize ROI.",
    features: ["PPC", "Content Strategy", "Email", "Analytics"],
    href: "/digital-marketing",
  },
  {
    number: "03",
    icon: Palette,
    title: "Branding & Identity",
    description: "Build a memorable brand. We craft comprehensive identities that tell your story and differentiate you.",
    features: ["Logo Design", "Guidelines", "Visual Identity", "Strategy"],
    href: "/branding",
  },
  {
    number: "04",
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Launch and grow your online store with scalable, secure platforms that turn visitors into loyal customers.",
    features: ["Shopify", "WooCommerce", "Payments", "Inventory"],
    href: "/e-commerce",
  },
  {
    number: "05",
    icon: Share2,
    title: "Social Media",
    description: "Grow your presence. We create compelling content and manage your channels to build brand awareness.",
    features: ["Content Creation", "Community", "Influencers", "Ads"],
    href: "/social-media",
  },
  {
    number: "06",
    icon: Search,
    title: "SEO & SEM",
    description: "Get found online. We improve your visibility and drive organic traffic through technical optimization.",
    features: ["On-page", "Technical SEO", "Link Building", "Google Ads"],
    href: "/seo-sem",
  },
];

const faqs = [
  {
    question: "What is your typical turnaround time?",
    answer: "Project timelines vary based on complexity. A standard branding package takes 2-3 weeks, while a custom website can take 4-8 weeks. We provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Absolutely. We offer various maintenance packages to ensure your digital products stay secure, updated, and performing optimally long after launch."
  },
  {
    question: "How does the payment structure work?",
    answer: "We typically require a 50% deposit to secure your slot in our schedule, with the remaining balance due upon project completion or based on specific milestones."
  },
  {
    question: "Can you work with existing brand guidelines?",
    answer: "Yes! We love breathing new life into existing brands. We can work strictly within your current guidelines or help you evolve them for the digital age."
  }
];

// --- Sub-Components ---

// Custom FAQ Item for smooth animation without external dependencies
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-foreground/10 last:border-none">
      <button 
        onClick={onClick}
        className="flex items-center justify-between w-full py-6 text-left group"
      >
        <span className="text-lg font-medium group-hover:text-primary transition-colors">{question}</span>
        <span className="ml-4 p-1 rounded-full border border-foreground/10 group-hover:border-primary/50 transition-colors">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ServicesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <Layout>
      {/* 1. Hero Section - Emphasis & Negative Space */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background decorative blob for Contrast/Depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <motion.div 
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-foreground/5 text-xs font-semibold tracking-widest uppercase mb-6">
                Our Expertise
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.9] tracking-tight mb-8">
                Crafting Digital <br />
                <span className="text-muted-foreground">Excellence.</span>
              </h1>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl text-muted-foreground leading-relaxed">
                We blend creative vision with technical precision to build brands that don't just exist—they thrive and dominate.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Services Grid - Repetition & Rhythm */}
      <section className="py-24 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="group h-full cursor-pointer relative bg-card hover:bg-background transition-colors duration-500">
                    <Card className="h-full p-8 rounded-none border border-border/50 hover:border-foreground/20 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-6 h-6" />
                        </div>
                        <span className="text-4xl font-serif text-muted-foreground/20 font-bold group-hover:text-primary/20 transition-colors">
                          {service.number}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-medium mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Divider */}
                      <div className="h-px w-full bg-border/50 mb-6 group-hover:bg-primary/20 transition-colors" />

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <span key={feature} className="text-xs font-medium text-muted-foreground/80 bg-secondary px-2 py-1 rounded-md">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FAQ Section - Balance & Alignment */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Column: Sticky Title */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-serif mb-6">
                    Common <br /> Questions
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Everything you need to know about how we work. Can't find the answer you're looking for? Reach out to our team.
                  </p>
                  <Link href="/contacts">
                    <Button variant="outline" className="rounded-full group">
                      Contact Support 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-7">
              <div className="divide-y divide-border">
                {faqs.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <FAQItem 
                      question={faq.question} 
                      answer={faq.answer} 
                      isOpen={openFaqIndex === idx}
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Big CTA Section - Contrast & Emphasis */}
      <section className="py-4">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-foreground text-background rounded-[2.5rem] py-24 px-6 md:px-12 lg:px-24 text-center overflow-hidden relative"
          >
            {/* Abstract Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 tracking-tight text-white">
                Let's work together
              </h2>
              <p className="text-xl md:text-2xl mb-12 font-light leading-relaxed text-white">
                Let’s bring your vision to life and transform your ideas into a powerful, unforgettable brand that drives growth and success!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
                <Link href="/schedule">
                  <Button 
                    
                    className="h-14 px-8 rounded-full text-lg bg-white text-black hover:bg-white/90 w-full sm:w-auto"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Call
                  </Button>
                </Link>
                <Link href="/contacts">
                  <Button 
                    className="h-14 px-8 rounded-full text-lg border-solid border-white text-background  hover:text-black hover:bg-white/80 w-full sm:w-auto"
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Get Pricing Info
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Bottom spacer to let the CTA breathe */}
      <div className="h-12" />
    </Layout>
  );
}