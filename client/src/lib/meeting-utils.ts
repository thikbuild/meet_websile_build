/**
 * Meeting scheduling utilities
 * Includes timezone detection, time slot generation, and formatting
 */

// Get current timezone
export function getTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Get timezone abbreviation
export function getTimezoneAbbr(): string {
  const timezone = getTimezone();
  const date = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "short",
  }).formatToParts(date);

  const tzPart = parts.find((p) => p.type === "timeZoneName");
  return tzPart?.value || "UTC";
}

// Get timezone offset
export function getTimezoneOffset(): string {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: getTimezone(),
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const hours = parseInt(parts.find((p) => p.type === "hour")?.value || "0");
  const minutes = parseInt(parts.find((p) => p.type === "minute")?.value || "0");

  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();

  let offset = hours - utcHours;
  if (minutes !== utcMinutes) {
    offset += (minutes - utcMinutes) / 60;
  }

  const sign = offset >= 0 ? "+" : "";
  const absOffset = Math.abs(offset);
  const offsetHours = Math.floor(absOffset);
  const offsetMinutes = Math.round((absOffset - offsetHours) * 60);

  return `${sign}${offsetHours.toString().padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;
}

// Time slot categories
export enum TimeCategory {
  MORNING = "morning",
  NOON = "noon",
  EVENING = "evening",
  NIGHT = "night",
}

export interface TimeSlot {
  time: string; // HH:MM format
  category: TimeCategory;
  label: string;
}

// Generate all available time slots for the day
export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 22;
  const minuteInterval = 60; // 1 hour intervals

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += minuteInterval) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      
      let category: TimeCategory;
      let label: string;

      if (hour >= 9 && hour < 12) {
        category = TimeCategory.MORNING;
        label = "Morning";
      } else if (hour >= 12 && hour < 17) {
        category = TimeCategory.NOON;
        label = "Noon";
      } else if (hour >= 17 && hour < 21) {
        category = TimeCategory.EVENING;
        label = "Evening";
      } else {
        category = TimeCategory.NIGHT;
        label = "Night";
      }

      slots.push({
        time: timeString,
        category,
        label,
      });
    }
  }

  return slots;
}

// Get time slots grouped by category
export function getGroupedTimeSlots(): Record<TimeCategory, TimeSlot[]> {
  const slots = generateTimeSlots();
  return {
    [TimeCategory.MORNING]: slots.filter((s) => s.category === TimeCategory.MORNING),
    [TimeCategory.NOON]: slots.filter((s) => s.category === TimeCategory.NOON),
    [TimeCategory.EVENING]: slots.filter((s) => s.category === TimeCategory.EVENING),
    [TimeCategory.NIGHT]: slots.filter((s) => s.category === TimeCategory.NIGHT),
  };
}

// Generate next 7 days from today
export function getNextSevenDays(): { date: Date; dateString: string; displayText: string; dayOfWeek: string }[] {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue, etc.
    const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Jan 1

    const displayText = i === 0 ? `Today, ${monthDay}` : `${dayOfWeek}, ${monthDay}`;

    days.push({
      date,
      dateString,
      displayText,
      dayOfWeek,
    });
  }

  return days;
}

// Format time for display
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

// Parse time string (HH:MM) to get hour and minute
export function parseTime(timeString: string): { hour: number; minute: number } {
  const [hour, minute] = timeString.split(":").map(Number);
  return { hour, minute };
}

// Check if a time is in the past (today only)
export function isTimePast(timeString: string, date: string): boolean {
  const today = new Date().toISOString().split("T")[0];
  
  if (date !== today) {
    return false; // Future dates are never in the past
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const [slotHour, slotMinute] = timeString.split(":").map(Number);

  return slotHour < currentHour || (slotHour === currentHour && slotMinute <= currentMinute);
}
