import { getUsage, aggregateApps, type DayUsage, APP_CATEGORIES } from "./app-usage";

export type WeekRange = { start: Date; end: Date; key: string; label: string };

function startOfWeek(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const day = (x.getDay() + 6) % 7; // Mon=0
  x.setDate(x.getDate() - day);
  return x;
}

function fmt(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function pastWeeks(count = 6): WeekRange[] {
  const weeks: WeekRange[] = [];
  const thisWeek = startOfWeek(new Date());
  for (let i = 0; i < count; i++) {
    const start = new Date(thisWeek);
    start.setDate(thisWeek.getDate() - i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    weeks.push({
      start,
      end,
      key: start.toISOString().slice(0, 10),
      label: `${fmt(start)} – ${fmt(end)}`,
    });
  }
  return weeks;
}

function generateWeekDays(childId: string, weekStart: Date): DayUsage[] {
  // Reuse generateDay via getUsage's helpers — replicate the 7 days
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    dates.push(d);
  }
  // Hack: use last-30 then filter? Simpler: pull this-week and shift via deterministic regen.
  // We import getUsage only for current ranges. So replicate inline:
  return dates.map((d) => mockDay(childId, d));
}

// minimal deterministic day mock (mirrors app-usage internal shape we need)
function mockDay(childId: string, date: Date): DayUsage {
  // Reuse the public helper by leveraging app-usage's seeded generator indirectly:
  // We can't access generateDay; emulate by calling getUsage with a range that includes date.
  // For determinism, just compute a stable seed and reuse logic from app-usage via a synthetic range:
  // Simplest: import getUsage for the right range key based on date offset from today.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysAgo = Math.round((today.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
  const days30 = getUsage(childId, "last-30");
  // last-30 returns 30 days ending today; index from end:
  const idx = days30.length - 1 - daysAgo;
  if (idx >= 0 && idx < days30.length) return days30[idx];
  // Fallback empty
  return {
    date: date.toISOString().slice(0, 10),
    weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
    total: 0,
    byCategory: APP_CATEGORIES.reduce((a, c) => ({ ...a, [c]: 0 }), {} as DayUsage["byCategory"]),
    periods: { morning: 0, afternoon: 0, evening: 0, night: 0 },
    apps: [],
  };
}

export type WeekStats = {
  totalHours: number;
  avgDaily: number;
  byCategory: Record<string, number>;
  topApps: { name: string; category: string; hours: number }[];
  diversity: number; // 0..1
  score: number; // 0..100
};

export function computeWeekStats(childId: string, weekStart: Date, alertCount = 0): WeekStats {
  const days = generateWeekDays(childId, weekStart);
  const totalHours = Math.round(days.reduce((s, d) => s + d.total, 0) * 10) / 10;
  const avgDaily = Math.round((totalHours / 7) * 10) / 10;
  const byCategory: Record<string, number> = {};
  for (const c of APP_CATEGORIES) byCategory[c] = 0;
  for (const d of days) for (const c of APP_CATEGORIES) byCategory[c] += d.byCategory[c];
  for (const c of APP_CATEGORIES) byCategory[c] = Math.round(byCategory[c] * 10) / 10;

  const topApps = aggregateApps(days).slice(0, 5);

  // Diversity: 1 - max share
  const sum = Object.values(byCategory).reduce((a, b) => a + b, 0) || 1;
  const maxShare = Math.max(...Object.values(byCategory)) / sum;
  const diversity = Math.round((1 - maxShare) * 100) / 100;

  // Score: screen-time component (lower hours = higher), balance, alerts
  const targetDaily = 3; // hours
  const timeScore = Math.max(0, 100 - Math.max(0, avgDaily - targetDaily) * 18);
  const balanceScore = diversity * 100;
  const alertScore = Math.max(0, 100 - alertCount * 12);
  const score = Math.round(timeScore * 0.5 + balanceScore * 0.3 + alertScore * 0.2);

  return { totalHours, avgDaily, byCategory, topApps, diversity, score: Math.min(100, Math.max(0, score)) };
}

export function summaryLine(stats: WeekStats) {
  return `${stats.totalHours}h total · avg ${stats.avgDaily}h/day · wellness ${stats.score}/100`;
}
