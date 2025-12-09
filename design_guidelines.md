# Websile Creative Agency - Design Guidelines

## Brand Identity
**Agency Focus:** Design, development, digital marketing, and branding
**Tone:** Creative, bold, clean with generous whitespace
**Animation Library:** GSAP + Framer Motion for sophisticated interactions

## Color Palette
- **Background:** #E5E9EB (light gray-blue)
- **Text:** #000000 (pure black)
- **Accent:** #E5E9EB
- **Accent Hover:** #000000

## Typography
- **Body Text:** Mazzard font family
- **Headings:** Times New Roman (creates bold/creative contrast)
- **Hero Title:** Mix bold fonts ("crafting digital") with creative fonts ("presence & impact")

## Custom Cursor Interaction
- **Default:** Small black filled circle follows cursor at all times
- **Hover State:** Circle expands 50% larger with 50% transparency when over interactive elements (buttons, links, text inputs, clickable items)

## Navigation Structure
**Elements:** Logo, Home, About, Projects, Services (dropdown), "Let's Chat" WhatsApp CTA button

**Services Dropdown:**
- Displays on hover with white background
- Each item: icon + service name + subtext
- Hover state: white bg, underlined text
- Clean UI with generous whitespace between items
- Services: Web Design & Development, Digital Marketing, Branding & Identity, E-commerce, Social Media Marketing, SEO & SEM

## Section Designs

### Hero Section
- **Title:** "crafting digital" (bold fonts) + "presence & impact" (creative fonts) - use font variation for drama
- **Subtitle:** Agency mission statement (2-3 lines)
- **CTA Button:** "Request a Quote" → /contacts
- **Animated Element:** Continuous text marquee at bottom flowing right-to-left with keywords: /business value /results driven /solutions (loop infinitely)
- **Style:** Maximum whitespace, clean, minimal, impactful

### Who We Are
- **Layout:** Two-column approach
- **Left:** Tagline "who we are", bold title "We are Creative Digital Agency", description text, "About us" button → /about
- **Right:** Embedded YouTube video (https://www.youtube.com/watch?v=OmdhW5PO59s)
- **Style:** Clean, breathing room, professional

### Featured Works
- **Header:** Tagline + "We create solutions but most importantly we identify problems"
- **Carousel Design:** Medium-large cards with project image, name, keyword tags
- **Card Style:** Rounded corners, big format, clean presentation
- **Controls:** Auto-rotation + progress tracker line + left/right navigation buttons
- **CTA:** "All Projects" → /projects
- **Data Source:** projects.json

### Our Services
- **Header:** Tagline + agency description
- **Layout:** 6 vertically stacked rows (01-06 numbering)
- **Rows:** Web Design → Digital Marketing → Branding → E-commerce → Social Media → SEO/SEM
- **Interaction:** On hover, background color changes with styling that indicates clickability
- **CTA:** "All Services" → /services
- **Style:** Clean, stacked, interactive

### Testimonials
- **Carousel Format:** 5:6 ratio cards
- **Content:** Client photo, name, position, company, social links, review text
- **Controls:** Similar to projects carousel (auto-rotate, tracker, navigation)
- **Data Source:** testimonials.json

### Contact Section
- **Layout:** Full-screen, two-column split
- **Left Column:** Contact form with fields: name, company, email, interests, budget, message + Submit button
- **Right Column:** Card with "Let's Make an Impact" heading
- **Header:** "We're here to help" tagline + "Ready to take next step with us?" title
- **Card Style:** White background, rounded corners, clean
- **Form Action:** POST to VITE_FORM_ENDPOINT + EmailJS integration

### Footer
- **Elements:** Sitemap links, social media icons, copyright, privacy policy, terms of use
- **Special:** Floating scroll-to-top button
- **Style:** Comprehensive, well-organized

## Project Detail Pages
**Dynamic Generation:** /project/{slug} pages generated from projects.json
**Structure:** Industry, duration, services, gallery, challenges (problem/solution), key takeaways, project link

## General Design Principles
- **Whitespace:** Generous throughout all sections
- **Cleanliness:** Minimal, uncluttered layouts
- **Rounded Corners:** Apply to cards and major components
- **Animations:** Smooth GSAP/Framer Motion transitions between sections and on scroll
- **Responsiveness:** All layouts adapt gracefully to mobile/tablet

## Interactive Elements
- All buttons, links, form inputs trigger custom cursor expansion
- Hover states are subtle but clear
- Dropdown menus animate smoothly
- Carousels auto-rotate with manual override
- Form validation states clearly indicated

## Images
**Hero Section:** No large hero image - rely on typography and animated marquee for impact
**Featured Works:** Project images in carousel cards
**Testimonials:** Client photos in cards
**Who We Are:** YouTube video embed (no static image)
**Overall:** Images support content but don't dominate; focus is on clean design and typography