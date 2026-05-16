// Mock app usage data simulation layer for Guardian AI MVP.
// Deterministic per (childId, date) so the same child sees consistent numbers.

export type AppCategory =
  | "Social Media"
  | "Gaming"
  | "Education"
  | "Streaming"
  | "Messaging"
  | "Other";

export const APP_CATEGORIES: AppCategory[] = [
  "Social Media",
  "Gaming",
  "Education",
  "Streaming",
  "Messaging",
  "Other",
];

// Maps each category to a chart color token defined in styles.css
export const CATEGORY_COLORS: Record<AppCategory, string> = {
  "Social Media": "var(--chart-1)",
  Gaming: "var(--chart-4)",
  Education: "var(--chart-2)",
  Streaming: "var(--chart-3)",
  Messaging: "var(--chart-5)",
  Other: "var(--muted-foreground)",
};

export const CATEGORY_BADGE: Record<AppCategory, string> = {
  "Social Media": "bg-[#F7CFD9] text-[#7a2541]",
  Gaming: "bg-[#E0D4F7] text-[#4b347a]",
  Education: "bg-[#C8EBD9] text-[#1f5a42]",
  Streaming: "bg-[#CBE3F7] text-[#1f4870]",
  Messaging: "bg-[#FBEAB6] text-[#7a5a14]",
  Other: "bg-muted text-muted-foreground",
};

type AppDef = { name: string; category: AppCategory };

const APP_CATALOG: AppDef[] = [
  { name: "TikTok", category: "Social Media" },
  { name: "Instagram", category: "Social Media" },
  { name: "Snapchat", category: "Social Media" },
  { name: "Roblox", category: "Gaming" },
  { name: "Minecraft", category: "Gaming" },
  { name: "Fortnite", category: "Gaming" },
  { name: "Khan Academy", category: "Education" },
  { name: "Duolingo", category: "Education" },
  { name: "Google Classroom", category: "Education" },
  { name: "YouTube", category: "Streaming" },
  { name: "Netflix", category: "Streaming" },
  { name: "Disney+", category: "Streaming" },
  { name: "WhatsApp", category: "Messaging" },
  { name: "iMessage", category: "Messaging" },
  { name: "Discord", category: "Messaging" },
  { name: "Safari", category: "Other" },
  { name: "Spotify", category: "Other" },
];

// Tiny deterministic PRNG (mulberry32) so the same seed always produces the same numbers.
function seededRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type DayUsage = {
  date: string; // YYYY-MM-DD
  weekday: string; // Mon, Tue...
  total: number; // hours, 1 decimal
  byCategory: Record<AppCategory, number>;
  periods: { morning: number; afternoon: number; evening: number; night: number };
  apps: { name: string; category: AppCategory; hours: number }[];
};

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function weekdayShort(d: Date) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
}

function generateDay(childId: string, date: Date): DayUsage {
  const key = `${childId}:${dayKey(date)}`;
  const rand = seededRandom(hashString(key));
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  // Pick 4–7 active apps for the day
  const count = 4 + Math.floor(rand() * 4);
  const pool = [...APP_CATALOG];
  const picked: AppDef[] = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(rand() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }

  const apps = picked.map((a) => {
    const base = isWeekend ? 0.4 + rand() * 1.6 : 0.2 + rand() * 1.1;
    return { name: a.name, category: a.category, hours: Math.round(base * 10) / 10 };
  });

  const byCategory = APP_CATEGORIES.reduce(
    (acc, c) => ({ ...acc, [c]: 0 }),
    {} as Record<AppCategory, number>,
  );
  for (const a of apps) byCategory[a.category] += a.hours;
  for (const c of APP_CATEGORIES) byCategory[c] = Math.round(byCategory[c] * 10) / 10;

  const total = Math.round(apps.reduce((s, a) => s + a.hours, 0) * 10) / 10;

  // Distribute total across periods of the day
  const w = [0.15, 0.3, 0.4, 0.15].map((x) => x * (0.7 + rand() * 0.6));
  const wSum = w.reduce((a, b) => a + b, 0);
  const periods = {
    morning: Math.round((total * w[0]) / wSum * 10) / 10,
    afternoon: Math.round((total * w[1]) / wSum * 10) / 10,
    evening: Math.round((total * w[2]) / wSum * 10) / 10,
    night: Math.round((total * w[3]) / wSum * 10) / 10,
  };

  return {
    date: dayKey(date),
    weekday: weekdayShort(date),
    total,
    byCategory,
    periods,
    apps,
  };
}

export type RangeKey = "this-week" | "last-week" | "last-30";

export const RANGE_LABEL: Record<RangeKey, string> = {
  "this-week": "This week",
  "last-week": "Last week",
  "last-30": "Last 30 days",
};

function rangeDates(range: RangeKey, today = new Date()): Date[] {
  const dates: Date[] = [];
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);

  if (range === "this-week") {
    // Mon..Sun of current week
    const day = (start.getDay() + 6) % 7; // 0 = Monday
    start.setDate(start.getDate() - day);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(d);
    }
  } else if (range === "last-week") {
    const day = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - day - 7);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(d);
    }
  } else {
    for (let i = 29; i >= 0; i--) {
      const d = new Date(start);
      d.setDate(start.getDate() - i);
      dates.push(d);
    }
  }
  return dates;
}

export function getUsage(childId: string, range: RangeKey): DayUsage[] {
  return rangeDates(range).map((d) => generateDay(childId, d));
}

export function aggregateApps(days: DayUsage[]) {
  const map = new Map<string, { name: string; category: AppCategory; hours: number }>();
  for (const d of days) {
    for (const a of d.apps) {
      const existing = map.get(a.name);
      if (existing) existing.hours = Math.round((existing.hours + a.hours) * 10) / 10;
      else map.set(a.name, { ...a });
    }
  }
  return [...map.values()].sort((a, b) => b.hours - a.hours);
}

export function aggregatePeriods(days: DayUsage[]) {
  const acc = { morning: 0, afternoon: 0, evening: 0, night: 0 };
  for (const d of days) {
    acc.morning += d.periods.morning;
    acc.afternoon += d.periods.afternoon;
    acc.evening += d.periods.evening;
    acc.night += d.periods.night;
  }
  const round = (n: number) => Math.round(n * 10) / 10;
  return {
    morning: round(acc.morning),
    afternoon: round(acc.afternoon),
    evening: round(acc.evening),
    night: round(acc.night),
  };
}
