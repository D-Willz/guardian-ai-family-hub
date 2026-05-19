import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Bell, HeartPulse, Smartphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type Child, colorClass, initialsOf } from "@/lib/children";

export const Route = createFileRoute("/_app/child/$childId")({
  head: () => ({
    meta: [
      { title: "Child Profile — Guardian AI" },
      { name: "description", content: "A focused view of one child's screen time, alerts, and wellness trends." },
      { property: "og:title", content: "Child Profile — Guardian AI" },
      { property: "og:description", content: "A focused view of one child's screen time, alerts, and wellness trends." },
    ],
  }),
  component: ChildDashboard,
});

const stats = [
  { label: "Screen time today", value: "1h 42m", icon: Clock },
  { label: "Alerts this week", value: "0", icon: Bell },
  { label: "Top app", value: "Reading", icon: Smartphone },
  { label: "Wellness score", value: "8.7", icon: HeartPulse },
];

function ChildDashboard() {
  const { childId } = useParams({ from: "/_app/child/$childId" });
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("children")
      .select("*")
      .eq("id", childId)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setChild((data as Child) ?? null);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [childId]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  if (!child) {
    return (
      <div>
        <Link to="/dashboard" className="text-sm text-primary hover:underline">
          ← Back to overview
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">Profile not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to overview
      </Link>

      <header className="mt-4 flex items-center gap-4">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-semibold ${colorClass(
            child.avatar_color,
          )}`}
        >
          {initialsOf(child.first_name)}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {child.first_name}
          </h1>
          <p className="text-sm text-muted-foreground">Age {child.age} • Personal overview</p>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <h2 className="text-base font-semibold text-foreground">Daily activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A gentle look at {child.first_name}'s rhythm this week.
          </p>
          <div className="mt-6 grid grid-cols-7 gap-2">
            {[4, 6, 5, 7, 6, 8, 7].map((v, i) => (
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
          <h2 className="text-base font-semibold text-foreground">Highlights</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Calmer evenings this week</li>
            <li>• More outdoor minutes on weekends</li>
            <li>• No new behavior alerts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
