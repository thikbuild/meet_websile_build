# Meeting Booking & Email Features Implementation Guide

## Overview

Your website now includes two major features:
1. **Nodemailer Email Integration** - Send contact form submissions via email
2. **Meeting Booking System** - Interactive booking modal with Google Meet link generation

## Feature 1: Nodemailer Email Integration

### Configuration

Email settings are stored in environment variables:
- `SMTP_HOST`: smtp-relay.brevo.com
- `SMTP_PORT`: 587
- `SMTP_SECURE`: false
- `SMTP_USER`: Brevo SMTP credentials
- `SMTP_PASS`: Brevo SMTP password
- `TO_EMAIL`: Recipients list (comma-separated)

### Email Templates

The system includes two HTML email templates:

#### 1. Contact Submission Email
Sent to admin when a contact form is submitted with:
- Visitor name, email, phone, company
- Interest & budget information
- Full message
- Submission timestamp

#### 2. Meeting Booking Email
Sent to admin when a meeting is booked with:
- Visitor information (name, email, phone)
- Meeting subject & scheduled time
- Meeting link (Google Meet)
- Additional notes & guest list
- Timezone information

### API Endpoint: POST /api/contact

Accepts contact form data and sends email notification.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "interests": "Web Design",
  "budget": ">$10k",
  "message": "We need a new website..."
}
```

**Response:**
```json
{
  "message": "Message sent successfully",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "timestamp": "2024-01-15T10:30:00.000Z",
    ...
  }
}
```

## Feature 2: Meeting Booking System

### Architecture

The meeting booking feature is built with three layers:

#### 1. Frontend Modal Component (`BookingModal.tsx`)
- Multi-step form (Step 1-3)
- Framer Motion animations
- Responsive design

**Step 1: Basic Information**
- Name, Email, Phone, Meeting Subject
- Form validation

**Step 2: Date & Time Selection**
- Next 7 days calendar picker
- Time slots grouped by timezone-based categories:
  - 🌅 Morning: 9:00 - 12:00
  - ☀️ Noon: 12:00 - 17:00
  - 🌅 Evening: 17:00 - 21:00
  - 🌙 Night: 21:00 - 22:30
- Past times disabled for today
- Auto-detected timezone display

**Step 3: Review & Confirmation**
- Summary of entered information
- Optional notes field
- Guest email addition (comma-separated)
- Form submission with API call

#### 2. Backend API Endpoint: POST /api/meetings/book

Processes meeting booking and sends emails.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555-0000",
  "subject": "Website Redesign Project",
  "date": "2024-01-20",
  "time": "14:00",
  "timezone": "America/New_York",
  "notes": "Discuss timeline and budget",
  "guests": ["guest@example.com"]
}
```

**Response:**
```json
{
  "message": "Meeting booked successfully",
  "data": {
    "name": "John Doe",
    ...
    "meetingLink": "https://meet.google.com/abc-defg-hij",
    "calendarLink": "https://calendar.google.com/calendar/u/0/r/eventedit?..."
  }
}
```

#### 3. Utility Functions (`meeting-utils.ts`)
- **Timezone Detection**: Auto-detect user's timezone
- **Time Slot Generation**: Generate 1-hour intervals from 9:00-22:30
- **Date Formatting**: Format dates for display and API
- **Past Time Detection**: Prevent booking past times for today

#### 4. Google Meet Integration (`google-meet.ts`)
- **Meeting Link Generation**: Creates unique Google Meet URLs
- **Calendar Link Generation**: Creates Google Calendar event links
- Users can manually add to their calendar

### "Book Meeting" Button Placement

The "Book a Meeting" button has been added to:

1. **Hero Section** (`Hero.tsx`)
   - Alongside "Request a Quote" button
   - Opens booking modal on click

2. **Service Detail Page** (`ServiceDetail.tsx`)
   - In CTA section alongside "Start Project"
   - Specific to the service being viewed

3. **Project Detail Page** (`ProjectDetail.tsx`)
   - In footer alongside "Back to Projects" and "Visit Website"
   - Context-specific project booking

4. **Contact Page** (`Contact.tsx`)
   - Alongside "Submit" button
   - Alternative to contact form

5. **About Page** (`About.tsx`)
   - Alongside "Start a Project" button
   - For general meeting scheduling

### Email Confirmation Flow

#### Admin Notification (to all configured emails)
When a meeting is booked, admins receive:
- Booking details (name, email, phone, subject)
- Scheduled date/time with timezone
- Google Meet link
- Guest list & notes
- HTML-formatted professional email

#### User Confirmation (to visitor's email)
Visitors receive:
- Confirmation of booking
- Meeting details summary
- Google Meet link
- Meeting time with timezone

### User Experience Flow

1. **User clicks "Book Meeting"** button anywhere on site
2. **Modal opens** with Step 1 form
3. **Step 1 completion** - enters contact information
4. **Step 2 completion** - selects date & time
   - Calendar shows next 7 days
   - Time slots auto-categorized by timezone
   - Past times for today disabled
5. **Step 3 review** - confirms details
   - Can add optional notes
   - Can add guest emails
   - Review all information
6. **Submit booking**
   - API generates Google Meet link
   - Email sent to admin
   - Confirmation email sent to user
   - Modal shows success message
   - Closes after 2 seconds

## Files Modified/Created

### New Files
- `server/email.ts` - Nodemailer configuration & templates
- `server/google-meet.ts` - Google Meet link generation
- `client/src/lib/meeting-utils.ts` - Timezone & scheduling utilities
- `client/src/components/BookingModal.tsx` - Main booking modal component
- `MEETING_BOOKING_FEATURES.md` - This file

### Modified Files
- `shared/schema.ts` - Added meeting booking schema
- `server/routes.ts` - Added API endpoints for contact & meetings
- `server/index.ts` - Already compatible with serverless
- `script/build.ts` - Added nodemailer to allowlist
- `client/src/components/sections/Hero.tsx` - Added booking button
- `client/src/components/sections/Contact.tsx` - Added booking button & updated form
- `client/src/pages/ServiceDetail.tsx` - Added booking button
- `client/src/pages/ProjectDetail.tsx` - Added booking button
- `client/src/pages/About.tsx` - Added booking button

## Environment Variables

Required for production/development:

```bash
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
TO_EMAIL=email1@example.com,email2@example.com,email3@example.com
NODE_ENV=production  # For email sending
```

## Validation

### Contact Form Validation
- Name: Required (minimum 2 characters)
- Email: Required (valid email format)
- Phone: Required (minimum 10 characters)
- Subject: Required (minimum 3 characters)
- Message: Required (minimum 10 characters)

### Meeting Booking Validation
- Name: Required (minimum 2 characters)
- Email: Required (valid email format)
- Phone: Required (minimum 10 characters)
- Subject: Required (minimum 3 characters)
- Date: Required (within next 7 days)
- Time: Required (valid HH:MM format)
- Timezone: Auto-detected

## Technical Stack

### Frontend
- React 18
- Framer Motion - Animations
- Tailwind CSS - Styling
- Lucide Icons - Icons
- Zod - Validation

### Backend
- Express.js
- Nodemailer - Email service
- Zod - Data validation

### Email Service
- Brevo (formerly Sendinblue)
- SMTP relay

### Scheduling
- Native JavaScript Date/Time APIs
- Timezone detection via Intl API

## Testing

### Contact Form
1. Fill contact form on `/contacts` page
2. Submit
3. Check admin emails for notification

### Meeting Booking
1. Click "Book Meeting" button anywhere
2. Fill Step 1: Name, Email, Phone, Subject
3. Click "Next"
4. Fill Step 2: Select date & time
5. Click "Next"
6. Review Step 3: Add optional notes/guests
7. Click "Confirm Booking"
8. Check emails for confirmations

## Troubleshooting

### Emails Not Sending
1. **Check SMTP credentials** in environment variables
2. **Verify Brevo account** is active and SMTP enabled
3. **Check recipient emails** in TO_EMAIL variable
4. **Review browser console** for API errors
5. **Check server logs** for error messages

### Meeting Link Not Generating
- Meeting link generation is deterministic
- Links should always be generated
- Users can manually create calendar event using provided link

### Timezone Issues
- Ensure browser has correct timezone set
- All times displayed relative to user's timezone
- Calendar/email shows timezone abbreviation (e.g., EST, PST)

### Modal Not Opening
- Ensure BookingModal component is imported
- Check that onClick handler references correct state setter
- Verify modal is rendered in component JSX

## Future Enhancements

Potential improvements:
1. **OAuth Integration** - Automatic Google Calendar sync
2. **Recurring Bookings** - Allow multiple meeting slots
3. **Custom Availability** - Admin-set available slots
4. **Calendar Sync** - Automatic Outlook/iCal support
5. **SMS Confirmations** - Text message reminders
6. **Webhook Integrations** - Slack/Discord notifications
7. **Payment Integration** - Stripe for paid consultations
8. **Analytics** - Track meeting source & conversion rates

## API Documentation

### GET /api/projects
Returns all projects

### GET /api/projects/:slug
Returns specific project by slug

### GET /api/testimonials
Returns all testimonials

### POST /api/contact
Submit contact form

### POST /api/meetings/book
Book a meeting

## Support

For issues or questions:
1. Check environment variables are set
2. Verify email service is working
3. Review server logs for errors
4. Check browser console for client-side errors

## Security Notes

- SMTP credentials stored in environment variables (never in code)
- Zod validation on all inputs
- Email addresses validated before sending
- Guest emails validated before adding
- No sensitive data logged to console
