import restaurant, { DayOfWeek, HolidayOverride } from "@/config/restaurant.config";

export interface OpenStatus {
  isOpen: boolean;
  statusText: string;
  statusTextAr: string;
  nextChangeTime: string;
}

const DAY_NAMES: DayOfWeek[] = [
  "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday",
];

function parseTime(timeStr: string): { h: number; m: number } {
  const [h, m] = timeStr.split(":").map(Number);
  return { h, m };
}

/** Convert "HH:MM" to total minutes from midnight */
function toMinutes(timeStr: string): number {
  const { h, m } = parseTime(timeStr);
  return h * 60 + m;
}

/** Format "HH:MM" (24h) → "h:MM AM/PM" */
function formatTime12h(timeStr: string): string {
  const { h, m } = parseTime(timeStr);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  const mins = m === 0 ? "" : `:${String(m).padStart(2, "0")}`;
  return `${hour}${mins} ${suffix}`;
}

export function getOpenStatus(): OpenStatus {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const todayDayOfWeek = DAY_NAMES[now.getDay()];

  // Check holiday overrides first
  const holidayOverride: HolidayOverride | undefined = (
    restaurant.holidayOverrides as unknown as HolidayOverride[]
  ).find((o) => o.date === todayStr);

  const todayHours = holidayOverride ?? restaurant.hours[todayDayOfWeek];

  if (!todayHours || todayHours.closed) {
    // Find next open day
    return {
      isOpen: false,
      statusText: "Closed Today",
      statusTextAr: "مغلق اليوم",
      nextChangeTime: "",
    };
  }

  const openMinutes = toMinutes(todayHours.open);
  let closeMinutes = toMinutes(todayHours.close);

  // Handle overnight close (e.g., close at 00:30 = 30 mins past midnight = 1470 mins next day)
  if (closeMinutes <= openMinutes) {
    closeMinutes += 24 * 60;
  }

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    const closeDisplay = formatTime12h(todayHours.close);
    return {
      isOpen: true,
      statusText: `Open Now · Closes at ${closeDisplay}`,
      statusTextAr: `مفتوح الآن · يغلق الساعة ${closeDisplay}`,
      nextChangeTime: closeDisplay,
    };
  } else {
    if (currentMinutes < openMinutes) {
      const openDisplay = formatTime12h(todayHours.open);
      return {
        isOpen: false,
        statusText: `Closed · Opens at ${openDisplay}`,
        statusTextAr: `مغلق · يفتح الساعة ${openDisplay}`,
        nextChangeTime: openDisplay,
      };
    } else {
      // After closing, show tomorrow's open time
      const tomorrowIndex = (now.getDay() + 1) % 7;
      const tomorrowDay = DAY_NAMES[tomorrowIndex];
      const tomorrowHours = restaurant.hours[tomorrowDay];
      const openDisplay = tomorrowHours?.closed
        ? ""
        : formatTime12h(tomorrowHours?.open ?? "12:00");
      return {
        isOpen: false,
        statusText: openDisplay ? `Closed · Opens Tomorrow at ${openDisplay}` : "Closed",
        statusTextAr: openDisplay ? `مغلق · يفتح غداً الساعة ${openDisplay}` : "مغلق",
        nextChangeTime: openDisplay,
      };
    }
  }
}
