import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, Bell, HeartPulse, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const stats = [
  { label: "Screen time today", value: "2h 14m", icon: Clock, delta: "-18% vs avg" },
  { label: "Active alerts", value: "1", icon: Bell, delta: "Gentle nudge" },
  { label: "Apps monitored", value: "12", icon: Smartphone, delta: "All healthy" },
  { label: "Wellness score", value: "8.4", icon: HeartPulse, delta: "Trending up" },
];

function Dashboard() {
  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium text-primary">Welcome back 👋</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Your family's overview
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
          A gentle snapshot of how things are going today.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-4 w-4" />
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {s.value}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-3 text-xs font-medium text-accent-foreground/80">
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <h2 className="text-base font-semibold text-foreground">This week's wellness</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Balanced screen time, more outdoor minutes, and calmer evenings.
          </p>
          <div className="mt-6 grid grid-cols-7 gap-2">
            {[5, 7, 6, 8, 7, 9, 8].map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-lg bg-primary/15"
                  style={{ height: `${v * 12}px` }}
                />
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Gentle nudge</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Evenings have felt screen-heavy this week. Want to try a 30-minute wind-down
            ritual together?
          </p>
          <button className="mt-4 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
            Start a contract
          </button>
        </div>
      </div>
    </div>
  );
}
