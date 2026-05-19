import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { HeartPulse, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { listChildren, colorClass, initialsOf, type Child } from "@/lib/children";
import { pastWeeks, computeWeekStats, summaryLine } from "@/lib/wellness";
import { generateAlerts, useDismissed } from "@/lib/alerts";

export const Route = createFileRoute("/_app/wellness/")({
  head: () => ({
    meta: [
      { title: "Weekly Wellness Reports — Guardian AI" },
      { name: "description", content: "Warm weekly summaries of your child's digital wellbeing — patterns, wins, and gentle nudges." },
      { property: "og:title", content: "Weekly Wellness Reports — Guardian AI" },
      { property: "og:description", content: "Warm weekly summaries of your child's digital wellbeing — patterns, wins, and gentle nudges." },
    ],
    links: [{ rel: "canonical", href: "https://guardian-ai-family-hub.lovable.app/wellness" }],
  }),
  component: WellnessPage,
});

function WellnessPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [childId, setChildId] = useState<string>("");
  const { dismissed } = useDismissed();

  useEffect(() => {
    listChildren().then((c) => {
      setChildren(c);
      if (c[0]) setChildId(c[0].id);
    });
  }, []);

  const child = children.find((c) => c.id === childId);
  const weeks = useMemo(() => pastWeeks(6), []);
  const allAlerts = useMemo(() => generateAlerts(children), [children]);
  const activeAlertCount = allAlerts.filter(
    (a) => !dismissed.has(a.id) && a.childName === child?.first_name,
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HeartPulse className="h-4 w-4 text-primary" />
            Wellness Reports
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Weekly digests</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Calm, AI-written summaries of {child?.first_name ?? "your child"}'s digital week.
          </p>
        </div>
        {children.length > 0 && (
          <select
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            className="h-10 rounded-xl border border-border bg-card px-3 text-sm"
          >
            {children.map((c) => (
              <option key={c.id} value={c.id}>
                {c.first_name}
              </option>
            ))}
          </select>
        )}
      </div>

      {!child ? (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            Add a child profile from the Overview page to see weekly reports.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {weeks.map((w, i) => {
            const stats = computeWeekStats(child.id, w.start, i === 0 ? activeAlertCount : 0);
            return (
              <Link
                key={w.key}
                to="/wellness/$reportId"
                params={{ reportId: `${child.id}_${w.key}` }}
                className="block"
              >
                <Card className="transition-colors hover:border-primary/40 hover:bg-secondary/40">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-base font-semibold ${colorClass(child.avatar_color)}`}
                    >
                      {initialsOf(child.first_name)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{w.label}</span>
                        {i === 0 && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            This week
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{summaryLine(stats)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{stats.score}</div>
                      <div className="text-xs text-muted-foreground">/ 100</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
