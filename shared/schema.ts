import { z } from "zod";

// Project schema
export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  img: z.string(),
  slug: z.string(),
  keywords: z.array(z.string()),
  about_project: z.object({
    industry: z.string(),
    duration: z.string(),
    services: z.array(z.string()),
  }),
  gallery: z.array(z.string()),
  challenges: z.object({
    problem: z.string(),
    solution: z.string(),
  }),
  key_takeaways: z.array(z.string()),
  project_link: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;

// Testimonial schema
export const testimonialSchema = z.object({
  name: z.string(),
  position: z.string(),
  company: z.string(),
  links: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
  }).optional(),
  photo: z.string(),
  review: z.string(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  interests: z.string().min(1, "Please select an interest"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Contact submission schema (includes timestamp)
export const contactSubmissionSchema = contactFormSchema.extend({
  timestamp: z.string(),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

// Service item schema
export const serviceItemSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  href: z.string(),
});

export type ServiceItem = z.infer<typeof serviceItemSchema>;

// Meeting booking schema
export const meetingBookingSchema = z.object({
  name: z.string().min(3, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  date: z.string().refine((date) => !isNaN(new Date(date).getTime()), "Invalid date"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  timezone: z.string().min(1, "Timezone is required"),
  notes: z.string().optional(),
  guests: z.array(z.string().email()).optional(),
});

export type MeetingBooking = z.infer<typeof meetingBookingSchema>;
