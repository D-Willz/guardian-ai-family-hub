import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sun, Sunrise, Sunset, Moon, Smartphone } from "lucide-react";
import { listChildren, type Child, colorClass, initialsOf } from "@/lib/children";
import {
  APP_CATEGORIES,
  CATEGORY_BADGE,
  CATEGORY_COLORS,
  RANGE_LABEL,
  type RangeKey,
  aggregateApps,
  aggregatePeriods,
  getUsage,
} from "@/lib/app-usage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/app-monitoring")({
  head: () => ({
    meta: [
      { title: "App Monitoring — Guardian AI" },
      { name: "description", content: "See which apps your child uses most, with healthy-use insights — no surveillance." },
      { property: "og:title", content: "App Monitoring — Guardian AI" },
      { property: "og:description", content: "See which apps your child uses most, with healthy-use insights — no surveillance." },
    ],
    links: [{ rel: "canonical", href: "https://guardian-ai-family-hub.lovable.app/app-monitoring" }],
  }),
  component: AppMonitoring,
});

const RANGES: RangeKey[] = ["this-week", "last-week", "last-30"];

function AppMonitoring() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [childId, setChildId] = useState<string | null>(null);
  const [range, setRange] = useState<RangeKey>("this-week");

  useEffect(() => {
    listChildren()
      .then((c) => {
        setChildren(c);
        setChildId(c[0]?.id ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  const days = useMemo(
    () => (childId ? getUsage(childId, range) : []),
    [childId, range],
  );

  const chartData = useMemo(
    () =>
      days.map((d) => ({
        label:
          range === "last-30"
            ? d.date.slice(5) // MM-DD
            : d.weekday,
        ...d.byCategory,
      })),
    [days, range],
  );

  const topApps = useMemo(() => aggregateApps(days).slice(0, 6), [days]);
  const periods = useMemo(() => aggregatePeriods(days), [days]);
  const totalHours = useMemo(
    () => Math.round(days.reduce((s, d) => s + d.total, 0) * 10) / 10,
    [days],
  );
  const dailyAvg = days.length
    ? Math.round((totalHours / days.length) * 10) / 10
    : 0;

  return (
    <div>
      <header className="mb-6">
        <p className="text-sm font-medium text-primary">App Monitoring</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Apps & websites this week
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
          A gentle, judgement-free look at where time is going.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Child picker */}
        <div className="flex flex-wrap gap-2">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading profiles…</p>
          ) : children.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Add a child on the Overview page to see app activity.
            </p>
          ) : (
            children.map((c) => {
              const active = c.id === childId;
              return (
                <button
                  key={c.id}
                  onClick={() => setChildId(c.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground hover:bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                      colorClass(c.avatar_color),
                    )}
                  >
                    {initialsOf(c.first_name)}
                  </span>
                  {c.first_name}
                </button>
              );
            })
          )}
        </div>

        {/* Range filter */}
        <div className="inline-flex rounded-xl border border-border bg-card p-1 shadow-sm">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                range === r
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {RANGE_LABEL[r]}
            </button>
          ))}
        </div>
      </div>

      {!childId ? null : (
        <>
          {/* Summary stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Total screen time"
              value={`${totalHours}h`}
              hint={RANGE_LABEL[range]}
            />
            <StatCard label="Daily average" value={`${dailyAvg}h`} hint="Across all apps" />
            <StatCard
              label="Apps used"
              value={String(aggregateApps(days).length)}
              hint="Unique titles"
            />
          </div>

          {/* Chart */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Hours per day by category
                </h2>
                <p className="text-xs text-muted-foreground">{RANGE_LABEL[range]}</p>
              </div>
            </div>
            <div className="h-[280px] w-full md:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    interval={range === "last-30" ? 3 : 0}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    width={36}
                    unit="h"
                  />
                  <Tooltip
                    cursor={{ fill: "var(--muted)" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    iconType="circle"
                  />
                  {APP_CATEGORIES.map((cat, i) => (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      stackId="usage"
                      fill={CATEGORY_COLORS[cat]}
                      radius={i === APP_CATEGORIES.length - 1 ? [6, 6, 0, 0] : 0}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="mt-6 grid gap-5 lg:grid-cols-5">
            {/* Top apps */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6 lg:col-span-3">
              <h2 className="text-base font-semibold text-foreground">Top apps this week</h2>
              <p className="text-xs text-muted-foreground">{RANGE_LABEL[range]}</p>
              <ul className="mt-4 divide-y divide-border">
                {topApps.length === 0 && (
                  <li className="py-6 text-sm text-muted-foreground">No activity yet.</li>
                )}
                {topApps.map((a, i) => {
                  const max = topApps[0]?.hours || 1;
                  const pct = Math.round((a.hours / max) * 100);
                  return (
                    <li key={a.name} className="flex items-center gap-3 py-3">
                      <span className="w-5 text-xs font-medium text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Smartphone className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium text-foreground">
                            {a.name}
                          </p>
                          <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                            {a.hours}h
                          </p>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
                              CATEGORY_BADGE[a.category],
                            )}
                          >
                            {a.category}
                          </span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary/70"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Daily breakdown */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6 lg:col-span-2">
              <h2 className="text-base font-semibold text-foreground">Daily time breakdown</h2>
              <p className="text-xs text-muted-foreground">Active periods, {RANGE_LABEL[range].toLowerCase()}</p>

              <PeriodRow
                icon={<Sunrise className="h-4 w-4" />}
                label="Morning"
                window="6–12"
                hours={periods.morning}
                accent="bg-[color-mix(in_oklab,var(--accent)_70%,white)]"
              />
              <PeriodRow
                icon={<Sun className="h-4 w-4" />}
                label="Afternoon"
                window="12–18"
                hours={periods.afternoon}
                accent="bg-[color-mix(in_oklab,var(--accent)_85%,white)]"
              />
              <PeriodRow
                icon={<Sunset className="h-4 w-4" />}
                label="Evening"
                window="18–22"
                hours={periods.evening}
                accent="bg-primary/60"
              />
              <PeriodRow
                icon={<Moon className="h-4 w-4" />}
                label="Night"
                window="22–6"
                hours={periods.night}
                accent="bg-primary"
              />
            </section>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function PeriodRow({
  icon,
  label,
  window,
  hours,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  window: string;
  hours: number;
  accent: string;
}) {
  const max = 14; // visual cap in hours
  const pct = Math.min(100, Math.round((hours / max) * 100));
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            {icon}
          </span>
          <span className="font-medium">{label}</span>
          <span className="text-xs text-muted-foreground">{window}</span>
        </div>
        <span className="font-semibold tabular-nums text-foreground">{hours}h</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", accent)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
