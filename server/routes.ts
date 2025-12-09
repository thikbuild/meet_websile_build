import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { z } from "zod";

// Import data directly as modules for better serverless compatibility
import projectsData from "../client/src/data/projects.json";
import testimonialsData from "../client/src/data/testimonials.json";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get all projects
  app.get("/api/projects", (req, res) => {
    res.json(projectsData);
  });

  // Get single project by slug
  app.get("/api/projects/:slug", (req, res) => {
    const project = projectsData.find((p: any) => p.slug === req.params.slug);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  });

  // Get all testimonials
  app.get("/api/testimonials", (req, res) => {
    res.json(testimonialsData);
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);

      // Add timestamp
      const submission = {
        ...validatedData,
        timestamp: new Date().toISOString(),
      };

      // Store the contact submission
      await storage.createContactSubmission(submission);

      // Send email notification
      const { sendContactSubmissionEmail } = await import("./email");
      await sendContactSubmissionEmail(submission).catch((err) => {
        console.error("Error sending email:", err);
        // Don't fail the request if email fails
      });

      res.status(200).json({
        message: "Message sent successfully",
        data: submission
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      }

      console.error("Contact form error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Meeting booking endpoint
  app.post("/api/meetings/book", async (req, res) => {
    try {
      const { meetingBookingSchema } = await import("@shared/schema");
      const { sendMeetingBookingEmail, sendMeetingConfirmationToUser } = await import("./email");
      const { generateGoogleMeetLink, generateGoogleCalendarLink } = await import("./google-meet");

      // Validate the request body
      const validatedData = meetingBookingSchema.parse(req.body);

      // Generate Google Meet link
      const meetingLink = generateGoogleMeetLink();

      // Generate Google Calendar link
      const calendarLink = generateGoogleCalendarLink(
        validatedData.subject,
        validatedData.date,
        validatedData.time,
        validatedData.timezone,
        `Meeting with ${validatedData.name}\n\nJoin via: ${meetingLink}`,
        validatedData.guests
      );

      // Send notification email to admin
      await sendMeetingBookingEmail(validatedData, meetingLink).catch((err) => {
        console.error("Error sending admin notification:", err);
      });

      // Send confirmation email to user
      await sendMeetingConfirmationToUser(validatedData, meetingLink).catch((err) => {
        console.error("Error sending user confirmation:", err);
      });

      res.status(200).json({
        message: "Meeting booked successfully",
        data: {
          ...validatedData,
          meetingLink,
          calendarLink,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors,
        });
      }

      console.error("Meeting booking error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
