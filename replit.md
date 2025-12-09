# Websile - Creative Digital Agency Website

## Overview
Websile is a creative digital agency website built with React, TypeScript, and Express. It features sophisticated animations using Framer Motion, a custom cursor with hover effects, and a clean, modern design with generous whitespace.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn UI components
- **Animations**: Framer Motion
- **Backend**: Express.js
- **Data**: JSON files for projects and testimonials

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/          # Shadcn UI components
│   │   ├── sections/    # Page sections (Hero, WhoWeAre, etc.)
│   │   ├── CustomCursor.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── pages/           # All page components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
data/
├── projects.json        # Project portfolio data
└── testimonials.json    # Client testimonials
server/
├── routes.ts            # API endpoints
├── storage.ts           # In-memory storage
└── index.ts             # Server entry point
shared/
└── schema.ts            # Zod schemas and TypeScript types
```

## Features

### Core Pages
- **/** - Home page with Hero, Who We Are, Featured Works, Services, Testimonials, Contact sections
- **/about** - About page with company info, stats, values
- **/projects** - Portfolio grid of all projects
- **/project/:slug** - Dynamic project detail pages
- **/services** - All services overview
- **/website, /digital-marketing, /branding, /e-commerce, /social-media, /seo-sem** - Individual service pages
- **/contacts** - Contact form page
- **/privacy-policy** - Privacy policy
- **/terms** - Terms of use

### Key Components
1. **Custom Cursor** - Black circle that follows mouse, expands 50% with 50% opacity on hover over interactive elements
2. **Navigation** - Fixed header with services dropdown, WhatsApp CTA
3. **Hero Section** - Bold typography, animated text marquee
4. **Featured Works Carousel** - Auto-rotating project showcase
5. **Testimonials Carousel** - Client reviews with progress indicator
6. **Contact Form** - Validated form with interests/budget selectors

### Design System
- **Background**: #E5E9EB (light gray-blue)
- **Text**: #000000 (pure black)
- **Typography**: DM Sans (body), Times New Roman/Georgia (headings)
- **Animations**: Framer Motion for all interactions

## API Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:slug` - Get single project by slug
- `GET /api/testimonials` - Get all testimonials
- `POST /api/contact` - Submit contact form

## Running the Project
The application runs on port 5000 with `npm run dev`.

## Environment Variables
- `VITE_FORM_ENDPOINT` - External form endpoint (optional)
- `EMAILJS_SERVICE_ID` - EmailJS service ID (optional)
- `EMAILJS_TEMPLATE_ID` - EmailJS template ID (optional)
- `EMAILJS_PUBLIC_KEY` - EmailJS public key (optional)

## Recent Changes
- Initial build of complete Websile creative agency website
- Implemented all pages and navigation
- Created custom cursor with hover expansion
- Built project and testimonials carousels
- Added contact form with validation
- Set up API endpoints for data fetching

{/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/services">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
              data-testid="link-back-to-services"
            >
              <ArrowLeft className="w-4 h-4" />
              All Services
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="p-4 rounded-2xl bg-foreground/5 inline-block mb-6">
              <Icon className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 block">
              what's included
            </span>
            <h2 className="text-4xl font-serif">Service Features</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-foreground/5 flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <p>{feature}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 block">
              how we work
            </span>
            <h2 className="text-4xl font-serif">Our Process</h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-foreground/10 mb-4">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.step}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faq.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can help you achieve your goals.
            </p>
            <Link href="/contacts">
              <Button size="lg" className="rounded-full px-8 gap-2 group" data-testid="button-service-contact">
                Get in Touch
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>