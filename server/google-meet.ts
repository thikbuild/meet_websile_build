/**
 * Google Meet link generation utility
 * Generates a Google Meet URL that users can use to join
 * The link follows Google Meet's URL pattern: https://meet.google.com/[code]
 * Users can then add this to their calendar manually
 */

const GOOGLE_MEET_BASE = "https://meet.google.com";

// Generate a Google Meet code (3 words separated by hyphens)
// Format: xxx-xxxx-xxx (similar to Google Meet's own format)
function generateMeetingCode(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  
  const generatePart = (length: number): string => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  return `${generatePart(3)}-${generatePart(4)}-${generatePart(3)}`;
}

// Generate a Google Meet URL
export function generateGoogleMeetLink(): string {
  const code = generateMeetingCode();
  return `${GOOGLE_MEET_BASE}/${code}`;
}

// Generate Google Calendar event creation URL
// Users can click this to add the event to their calendar
export function generateGoogleCalendarLink(
  title: string,
  startDate: string, // ISO format: YYYY-MM-DD
  startTime: string, // HH:MM format
  timezone: string,
  description: string = "",
  guests: string[] = []
): string {
  // Convert date and time to ISO format
  const [hours, minutes] = startTime.split(":").map(Number);
  const startDateTime = new Date(`${startDate}T${startTime}:00`);
  
  // Set duration to 1 hour
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  // Format as ISO 8601 for Google Calendar
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const startISO = formatDate(startDateTime);
  const endISO = formatDate(endDateTime);

  // Build query parameters
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${startISO}/${endISO}`,
    details: description,
    location: "Google Meet",
    ctz: timezone,
    add: guests.join(","),
  });

  return `https://calendar.google.com/calendar/u/0/r/eventedit?${params.toString()}`;
}
