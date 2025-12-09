import nodemailer from "nodemailer";
import type { ContactSubmission } from "@shared/schema";
import type { MeetingBooking } from "@shared/schema";

// Get SMTP config from environment
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const TO_EMAILS = (process.env.TO_EMAIL || "")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

// Create transporter
const createTransporter = () => {
  if (!SMTP_CONFIG.host || !SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    throw new Error("SMTP configuration is incomplete. Please check environment variables.");
  }
  
  return nodemailer.createTransport(SMTP_CONFIG);
};

// Contact submission email template
const contactSubmissionTemplate = (data: ContactSubmission): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #000000 0%, #1f1f1f 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #000; margin-bottom: 5px; }
          .value { color: #555; word-break: break-word; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${data.company || "Not provided"}</div>
            </div>
            <div class="field">
              <div class="label">Interest</div>
              <div class="value">${data.interests}</div>
            </div>
            <div class="field">
              <div class="label">Budget</div>
              <div class="value">${data.budget || "Not specified"}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
            </div>
            <div class="field">
              <div class="label">Submitted At</div>
              <div class="value">${new Date(data.timestamp).toLocaleString()}</div>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Meeting booking email template
const meetingBookingTemplate = (data: MeetingBooking, meetingLink?: string): string => {
  const guestsList = data.guests && data.guests.length > 0
    ? data.guests.map((g) => `<li>${g}</li>`).join("")
    : "<li>None</li>";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #000000 0%, #1f1f1f 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #000; margin-bottom: 5px; }
          .value { color: #555; word-break: break-word; }
          .meeting-link { background: white; padding: 20px; border-radius: 6px; border: 2px solid #000; margin: 20px 0; text-align: center; }
          .meeting-link a { color: #000; text-decoration: none; font-weight: 600; font-size: 16px; }
          .meeting-link a:hover { text-decoration: underline; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Meeting Booking</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${data.phone}</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${data.subject}</div>
            </div>
            <div class="field">
              <div class="label">Scheduled Date & Time</div>
              <div class="value">${new Date(data.date).toLocaleDateString()} at ${data.time} (${data.timezone})</div>
            </div>
            ${data.notes ? `
            <div class="field">
              <div class="label">Notes</div>
              <div class="value">${data.notes.replace(/\n/g, "<br>")}</div>
            </div>
            ` : ""}
            <div class="field">
              <div class="label">Guests</div>
              <ul style="margin: 5px 0; padding-left: 20px;">
                ${guestsList}
              </ul>
            </div>
            ${meetingLink ? `
            <div class="meeting-link">
              <p style="margin: 0 0 10px 0; color: #666;">Google Meet Link</p>
              <a href="${meetingLink}" target="_blank">${meetingLink}</a>
            </div>
            ` : ""}
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Send contact submission email
export const sendContactSubmissionEmail = async (data: ContactSubmission): Promise<void> => {
  if (!TO_EMAILS.length) {
    console.warn("No recipient emails configured. Skipping email send.");
    return;
  }

  try {
    const transporter = createTransporter();
    const htmlContent = contactSubmissionTemplate(data);

    await transporter.sendMail({
      from: SMTP_CONFIG.auth.user,
      to: TO_EMAILS.join(","),
      subject: `New Contact Form Submission from ${data.name}`,
      html: htmlContent,
      replyTo: data.email,
    });

    console.log("Contact submission email sent successfully");
  } catch (error) {
    console.error("Error sending contact submission email:", error);
    throw error;
  }
};

// Send meeting booking email
export const sendMeetingBookingEmail = async (
  data: MeetingBooking,
  meetingLink?: string
): Promise<void> => {
  if (!TO_EMAILS.length) {
    console.warn("No recipient emails configured. Skipping email send.");
    return;
  }

  try {
    const transporter = createTransporter();
    const htmlContent = meetingBookingTemplate(data, meetingLink);

    await transporter.sendMail({
      from: SMTP_CONFIG.auth.user,
      to: TO_EMAILS.join(","),
      subject: `New Meeting Booking: ${data.subject} - ${data.name}`,
      html: htmlContent,
      replyTo: data.email,
      cc: data.guests?.join(","),
    });

    console.log("Meeting booking email sent successfully");
  } catch (error) {
    console.error("Error sending meeting booking email:", error);
    throw error;
  }
};

// Send meeting confirmation to user
export const sendMeetingConfirmationToUser = async (
  data: MeetingBooking,
  meetingLink?: string
): Promise<void> => {
  try {
    const transporter = createTransporter();
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000000 0%, #1f1f1f 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #000; margin-bottom: 5px; }
            .value { color: #555; }
            .meeting-link { background: white; padding: 20px; border-radius: 6px; border: 2px solid #000; margin: 20px 0; text-align: center; }
            .meeting-link a { color: #000; text-decoration: none; font-weight: 600; font-size: 16px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Meeting Confirmed ✓</h1>
            </div>
            <div class="content">
              <p>Hi ${data.name},</p>
              <p>Thank you for booking a meeting with us! Your meeting has been scheduled.</p>
              <div class="field">
                <div class="label">Meeting Details</div>
                <div class="value">
                  <strong>Date & Time:</strong> ${new Date(data.date).toLocaleDateString()} at ${data.time} (${data.timezone})<br>
                  <strong>Subject:</strong> ${data.subject}
                </div>
              </div>
              ${meetingLink ? `
              <div class="meeting-link">
                <p style="margin: 0 0 10px 0; color: #666;">Join via Google Meet</p>
                <a href="${meetingLink}" target="_blank">${meetingLink}</a>
              </div>
              ` : ""}
              <p>We look forward to connecting with you!</p>
              <div class="footer">
                <p>© 2024 Websile Agency. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: SMTP_CONFIG.auth.user,
      to: data.email,
      subject: `Meeting Confirmed: ${data.subject}`,
      html: htmlContent,
    });

    console.log("Meeting confirmation email sent to user");
  } catch (error) {
    console.error("Error sending meeting confirmation to user:", error);
    throw error;
  }
};
