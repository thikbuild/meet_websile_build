import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Monitor,
  TrendingUp,
  Palette,
  ShoppingCart,
  Share2,
  Search,
  ArrowLeft,
  Calendar
} from "lucide-react";

const servicesData = {
  website: {
    icon: Monitor,
    title: "Web Design & Development",
    subtitle: "Custom websites & web applications",
    description: "We create stunning, responsive websites that captivate your audience and drive results. From simple landing pages to complex web applications, we bring your vision to life with modern technologies and best practices.",
    features: [
      "Custom responsive design tailored to your brand",
      "Modern front-end development with React, Vue, or Next.js",
      "Content Management System integration",
      "E-commerce functionality",
      "Performance optimization and SEO-ready structure",
      "Ongoing maintenance and support",
    ],
    process: [
      { step: "Discovery", desc: "Understanding your goals and requirements" },
      { step: "Design", desc: "Creating wireframes and visual designs" },
      { step: "Development", desc: "Building your website with clean code" },
      { step: "Testing", desc: "Ensuring everything works perfectly" },
      { step: "Launch", desc: "Deploying your site and going live" },
    ],
    faq: [
      { q: "What is website development?", a: "Website development is the process of creating and maintaining websites and web applications. It involves designing and coding the user interface, developing the content, and optimizing the website for performance and security." },
      { q: "What are the benefits of website development?", a: "Website development can help you create a professional-looking website, improve user experience, and increase conversions. It can also help you save time and resources, reduce costs, and improve your search engine rankings." },
      { q: "How can I improve my website development skills?", a: "There are many ways to improve your website development skills, including learning HTML, CSS, JavaScript, and other web development technologies. You can also use website development tools and frameworks, such as WordPress, Drupal, and Joomla, to speed up your development process." },
      { q: "How can I track my website development progress?", a: "There are several tools available to track your website development progress, including Google Analytics, Webflow, and Adobe Creative Cloud. These tools can help you monitor your website traffic, conversions, and other metrics." },
      { q: "How can I optimize my website development strategy?", a: "There are several strategies you can use to optimize your website development strategy, including optimizing your website's speed, improving your website's security, and implementing effective SEO practices. You can also use website development analytics to track your progress and make data-driven decisions." },
    ]
  },
  "digital-marketing": {
    icon: TrendingUp,
    title: "Digital Marketing",
    subtitle: "Strategic campaigns that convert",
    description: "Strategic digital marketing campaigns that reach your target audience and convert. We use data-driven approaches to maximize your ROI and grow your business through multiple channels.",
    features: [
      "Comprehensive digital marketing strategy",
      "Pay-per-click (PPC) advertising management",
      "Content marketing and copywriting",
      "Email marketing campaigns",
      "Analytics and performance reporting",
      "Conversion rate optimization",
    ],
    process: [
      { step: "Research", desc: "Analyzing your market and competition" },
      { step: "Strategy", desc: "Developing a comprehensive marketing plan" },
      { step: "Execution", desc: "Launching and managing campaigns" },
      { step: "Optimization", desc: "Continuously improving performance" },
      { step: "Reporting", desc: "Regular insights and recommendations" },
    ],
    faq: [
      { q: "What is digital marketing?", a: "Digital marketing is the process of using digital channels, such as search engines, social media, email, and mobile apps, to promote and sell products or services online. It involves creating and distributing content, building relationships with customers, and measuring the effectiveness of campaigns." },
      { q: "What are the benefits of digital marketing?", a: "Digital marketing can help you reach a wider audience, increase brand awareness, and drive sales. It can also help you establish thought leadership, build trust, and increase customer engagement." },
      { q: "How can I improve my digital marketing strategy?", a: "There are many ways to improve your digital marketing strategy, including creating engaging content, building relationships with your audience, and measuring the effectiveness of your campaigns. You can also use digital marketing analytics to track your progress and make data-driven decisions." },
      { q: "How can I track my digital marketing progress?", a: "There are several tools available to track your digital marketing progress, including Google Analytics, HubSpot, Hootsuite, and Buffer. These tools can help you monitor your website traffic, sales, and other metrics." },
      { q: "How can I optimize my digital marketing strategy?", a: "There are several strategies you can use to optimize your digital marketing strategy, including identifying your target audience, creating engaging content, and measuring the effectiveness of your campaigns. You can also use digital marketing analytics to track your progress and make data-driven decisions." },
    ]
  },
  branding: {
    icon: Palette,
    title: "Branding & Identity",
    subtitle: "Build a memorable brand",
    description: "Build a memorable brand that resonates with your audience. We craft comprehensive brand identities that tell your story and differentiate you from the competition.",
    features: [
      "Brand strategy and positioning",
      "Logo design and visual identity",
      "Brand guidelines documentation",
      "Marketing collateral design",
      "Brand voice and messaging",
      "Brand refresh and rebranding",
    ],
    process: [
      { step: "Discovery", desc: "Understanding your vision and values" },
      { step: "Research", desc: "Analyzing your market and audience" },
      { step: "Concept", desc: "Developing brand concepts" },
      { step: "Design", desc: "Creating visual identity elements" },
      { step: "Delivery", desc: "Providing complete brand assets" },
    ],
    faq: [
      { q: "What is branding?", a: "Branding is the process of creating a unique identity for a business or product. It involves defining the brand's values, mission, and personality, as well as creating a consistent visual identity that represents the brand." },
      { q: "What are the benefits of branding?", a: "Branding can help you establish a strong brand identity, build brand loyalty, and differentiate your business from competitors. It can also help you create a memorable brand experience, increase customer engagement, and drive sales." },
      { q: "How can I improve my branding strategy?", a: "There are many ways to improve your branding strategy, including defining your brand's values, creating a consistent visual identity, and developing a strong brand voice and messaging. You can also use branding analytics to track your progress and make data-driven decisions." },
      { q: "How can I track my branding progress?", a: "There are several tools available to track your branding progress, including Google Analytics, Brandwatch, and Brandwatcher. These tools can help you monitor your brand metrics, track your ROI, and make data-driven decisions." },
      { q: "How can I optimize my branding strategy?", a: "There are several strategies you can use to optimize your branding strategy, including defining your brand's values, creating a consistent visual identity, and developing a strong brand voice and messaging. You can also use branding analytics to track your progress and make data-driven decisions." },
    ]
  },
  "e-commerce": {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    subtitle: "Online stores that sell",
    description: "Launch and grow your online store with our comprehensive e-commerce solutions. We build scalable, secure platforms that turn visitors into customers and maximize your revenue.",
    features: [
      "Custom e-commerce development",
      "Shopify and WooCommerce stores",
      "Payment gateway integration",
      "Inventory management systems",
      "Order fulfillment integration",
      "E-commerce SEO optimization",
    ],
    process: [
      { step: "Planning", desc: "Mapping out your store requirements" },
      { step: "Design", desc: "Creating a compelling shopping experience" },
      { step: "Development", desc: "Building a secure, scalable platform" },
      { step: "Integration", desc: "Connecting payment and shipping" },
      { step: "Launch", desc: "Going live and monitoring performance" },
    ],
    faq: [
      { q: "What is e-commerce?", a: "E-commerce refers to the buying and selling of goods and services online. It involves the use of electronic payment methods, such as credit cards and PayPal, to facilitate transactions between buyers and sellers." },
      { q: "What are the benefits of e-commerce?", a: "E-commerce can help you reach a wider audience, increase sales, and build customer loyalty. It can also help you streamline your business operations, reduce costs, and improve customer satisfaction." },
      { q: "How can I improve my e-commerce strategy?", a: "There are many ways to improve your e-commerce strategy, including optimizing your website for search engines, creating compelling product descriptions, and implementing effective marketing campaigns. You can also use e-commerce analytics to track your progress and make data-driven decisions." },
      { q: "How can I track my e-commerce performance?", a: "There are several tools available to track your e-commerce performance, including Google Analytics, Shopify, WooCommerce, and BigCommerce. These tools can help you monitor your website traffic, sales, and other metrics." },
      { q: "How can I optimize my e-commerce website?", a: "There are several strategies you can use to optimize your e-commerce website, including improving your website's speed, optimizing your product pages, and implementing effective marketing campaigns. You can also use e-commerce analytics to track your progress and make data-driven decisions." },
    ]
  },
  "social-media": {
    icon: Share2,
    title: "Social Media Marketing",
    subtitle: "Grow your social presence",
    description: "Grow your social presence and engage with your audience across platforms. We create compelling content and manage your social media to build brand awareness and drive engagement.",
    features: [
      "Social media strategy development",
      "Content creation and curation",
      "Community management",
      "Social media advertising",
      "Influencer marketing",
      "Analytics and reporting",
    ],
    process: [
      { step: "Audit", desc: "Analyzing your current social presence" },
      { step: "Strategy", desc: "Developing a tailored social plan" },
      { step: "Content", desc: "Creating engaging content" },
      { step: "Engagement", desc: "Managing community interactions" },
      { step: "Growth", desc: "Scaling your social presence" },
    ],
    faq: [
      { q: "What is social media marketing?", a: "Social media marketing is the process of using social media platforms to promote and engage with your brand, products, or services. It involves creating and sharing content, building relationships with your audience, and measuring the effectiveness of your campaigns." },
      { q: "What are the benefits of social media marketing?", a: "Social media marketing can help you reach a wider audience, build brand awareness, and drive sales. It can also help you establish thought leadership, build trust, and increase customer engagement." },
      { q: "How can I improve my social media marketing?", a: "There are many ways to improve your social media marketing, including creating engaging content, building relationships with your audience, and measuring the effectiveness of your campaigns. You can also use social media analytics to track your progress and make data-driven decisions." },
      { q: "How can I track my social media marketing progress?", a: "There are several tools available to track your social media marketing progress, including Google Analytics, Hootsuite, Sprout Social, and Buffer. These tools can help you monitor your social media metrics, track your ROI, and make data-driven decisions." },
      { q: "How can I optimize my social media marketing strategy?", a: "There are several strategies you can use to optimize your social media marketing strategy, including identifying your target audience, creating engaging content, and measuring the effectiveness of your campaigns. You can also use social media analytics to track your progress and make data-driven decisions." },
    ]
  },
  "seo-sem": {
    icon: Search,
    title: "SEO & SEM",
    subtitle: "Get found online",
    description: "Get found online with our search engine optimization and marketing services. We improve your visibility and drive organic traffic to your website through proven strategies.",
    features: [
      "Technical SEO audits and fixes",
      "On-page SEO optimization",
      "Content strategy for SEO",
      "Link building campaigns",
      "Google Ads management",
      "Local SEO optimization",
    ],
    process: [
      { step: "Audit", desc: "Analyzing your current SEO status" },
      { step: "Strategy", desc: "Developing a comprehensive SEO plan" },
      { step: "Optimization", desc: "Implementing on-page and technical fixes" },
      { step: "Content", desc: "Creating SEO-optimized content" },
      { step: "Monitoring", desc: "Tracking rankings and traffic" },
    ],
    faq: [
      { q: "What is SEO?", a: "Search engine optimization (SEO) is the process of improving the visibility and ranking of a website or web page in search engine results pages (SERPs) to increase organic traffic and visibility." },
      { q: "What are the benefits of SEO?", a: "SEO can help improve your website's visibility, attract more organic traffic, and increase your search engine rankings. It can also help you build backlinks to your website, which can improve your website's authority and credibility." },
      { q: "How can I improve my SEO?", a: "There are many ways to improve your SEO, including optimizing your website's content, using relevant keywords, building high-quality backlinks, and improving your website's technical structure." },
      { q: "How can I track my SEO progress?", a: "There are several tools available to track your SEO progress, including Google Analytics, SEMrush, Ahrefs, and Moz. These tools can help you monitor your website's traffic, rankings, and other metrics." },
      { q: "How can I optimize my website for SEO?", a: "There are several strategies you can use to optimize your website for SEO, including keyword research, on-page optimization, link building, and technical optimization. These strategies can help you improve your website's visibility and rankings." },
    ]
  },
};

export default function ServiceDetail() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [, params] = useRoute("/:service");
  const serviceKey = params?.service as keyof typeof servicesData;
  const service = servicesData[serviceKey];

  if (!service) {
    return (
      <Layout>
        <div className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-serif mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The service you're looking for doesn't exist.
            </p>
            <Link href="/services">
              <Button variant="outline" className="rounded-full gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = service.icon;

  return (
    <Layout>
      {/* Hero Section - Asymmetrical Balance & High Contrast */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#F9FAFB] overflow-hidden">
        {/* Decorative Abstract Shape */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D8ECF9]/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-20">

            {/* Left Column: Navigation & Title */}
            <div className="lg:w-7/12">
              <Link href="/services">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-black transition-colors mb-12 group"
                  data-testid="link-back-to-services"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E5E9EB] flex items-center justify-center group-hover:bg-[#D8ECF9] transition-colors">
                    <ArrowLeft className="w-4 h-4 text-black" />
                  </div>
                  <span className="tracking-wide uppercase text-xs">Back to Services</span>
                </motion.div>
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Decorative Icon integration */}
                <div className="inline-block p-3 rounded-xl bg-white border border-[#E5E9EB] shadow-sm mb-8">
                  <Icon className="w-8 h-8 text-black" />
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-black leading-[0.9]">
                  {service.title}
                </h1>
              </motion.div>
            </div>

            {/* Right Column: Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:w-4/12 lg:pb-4"
            >
              <div className="h-1 w-20 bg-black mb-8" /> {/* Line element for Balance */}
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Grid Repetition & White Space */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-baseline justify-between mb-16 border-b border-[#E5E9EB] pb-6"
          >
            <h2 className="text-3xl font-serif">What's Included</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">01 — Features</span>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E9EB] border border-[#E5E9EB]">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white p-10 hover:bg-[#F9FAFB] transition-colors group relative overflow-hidden"
              >
                {/* Hover accent */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-black group-hover:h-full transition-all duration-300" />

                <div className="w-10 h-10 rounded-full bg-[#E5E9EB] flex items-center justify-center mb-6 text-black group-hover:bg-[#D8ECF9] transition-colors">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-lg font-medium text-black group-hover:translate-x-2 transition-transform duration-300">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - Rhythm & Movement */}
      <section className="py-32 bg-[#F9FAFB] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-24"
          >
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">02 — Workflow</span>
              <h2 className="text-4xl md:text-5xl font-serif">How we bring it to life</h2>
            </div>
            <div className="hidden md:block w-1/3 h-px bg-[#E5E9EB]" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative pt-8 group cursor-default" // Added 'group' for hover states
              >
                {/* Static Border Base */}
                <div className="absolute top-0 left-0 w-full h-px bg-black/10" />

                {/* Animated Interactive Border (Expands on hover) */}
                <div className="absolute top-0 left-0 w-0 h-px bg-black transition-all duration-700 ease-out group-hover:w-full" />

                {/* Massive Number for Depth */}
                {/* Interactive: Slides up, Changes color to palette accent, Scales slightly */}
                <div className="absolute top-0 right-0 -mt-10 text-9xl font-serif text-[#E5E9EB] opacity-60 select-none z-0 
            transition-all duration-500 ease-out 
            group-hover:-translate-y-4 group-hover:scale-110 group-hover:text-[#000] group-hover:opacity-100">
                  {String(index + 1)}
                </div>

                <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                  <h3 className="text-2xl font-medium mb-4 text-black">{step.step}</h3>
                  <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-black/80">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Alignment & Proportion (Sticky Layout) */}
      <section className="py-32 bg-white border-y border-[#E5E9EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Sticky Header */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 block">03 — Support</span>
                <h2 className="text-4xl font-serif mb-6">Common Questions</h2>
                <p className="text-muted-foreground mb-8">
                  Everything you need to know about the product and billing. Can't find the answer you're looking for?
                </p>
                <Link href="/contacts">
                  <span className="text-black font-medium border-b border-black pb-1 hover:text-muted-foreground transition-colors cursor-pointer">
                    Contact our team
                  </span>
                </Link>
              </div>
            </div>

            {/* Accordion List */}
            <div className="lg:col-span-8 lg:col-start-6 space-y-8">
              {service.faq.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="p-8 rounded-3xl bg-[#F9FAFB] hover:bg-[#E5E9EB] transition-colors duration-300">
                    <div className="flex gap-4 items-start">
                      <span className="font-serif text-xl italic text-muted-foreground">Q.</span>
                      <div>
                        <h3 className="text-xl font-medium mb-3 text-black">{faq.q}</h3>
                        <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Emphasis & Closure */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] bg-[#000] overflow-hidden px-6 py-24 text-center"
          >
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D8ECF9] rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#E5E9EB] rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                Ready to start your journey?
              </h2>
              <p className="text-xl text-gray-400 mb-12 font-light">
                Let's discuss your project and see how we can help you achieve your goals with precision and style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contacts">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-[#D8ECF9] hover:text-black rounded-full px-10 py-8 text-lg font-medium transition-all duration-300 transform hover:scale-105"
                    data-testid="button-service-contact"
                  >
                    Start Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-white text-black hover:bg-[#D8ECF9] rounded-full px-10 py-8 text-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Meeting
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        sourceSection="service-detail"
      />
    </Layout>
  );
}
