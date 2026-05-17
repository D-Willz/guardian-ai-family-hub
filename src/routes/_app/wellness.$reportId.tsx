import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Download, Sparkles, TrendingUp, MessageCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { listChildren, colorClass, initialsOf, type Child } from "@/lib/children";
import { pastWeeks, computeWeekStats } from "@/lib/wellness";
import { generateAlerts, useDismissed } from "@/lib/alerts";
import {
  generateWellnessReport,
  type WellnessInsights,
} from "@/lib/wellness-ai.functions";

export const Route = createFileRoute("/_app/wellness/$reportId")({
  component: ReportPage,
});

function ScoreRing({ score }: { score: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  const color =
    score >= 80 ? "var(--chart-2)" : score >= 60 ? "var(--chart-3)" : "var(--chart-4)";
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="var(--muted)" strokeWidth="12" fill="none" />
        <circle
          cx="70"
          cy="70"
          r={r}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold">{score}</div>
        <div className="text-xs text-muted-foreground">/ 100</div>
      </div>
    </div>
  );
}

function ReportPage() {
  const { reportId } = useParams({ from: "/_app/wellness/$reportId" });
  const [childId, weekKey] = reportId.split("_");
  const [children, setChildren] = useState<Child[]>([]);
  const [insights, setInsights] = useState<WellnessInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);
  const { dismissed } = useDismissed();
  const callAI = useServerFn(generateWellnessReport);

  useEffect(() => {
    listChildren().then(setChildren);
  }, []);

  const child = children.find((c) => c.id === childId);
  const weeks = useMemo(() => pastWeeks(8), []);
  const weekIdx = weeks.findIndex((w) => w.key === weekKey);
  const week = weeks[weekIdx];
  const prevWeek = weeks[weekIdx + 1];

  const alerts = useMemo(() => generateAlerts(children), [children]);
  const alertCount = alerts.filter(
    (a) => !dismissed.has(a.id) && a.childName === child?.first_name,
  ).length;

  const stats = useMemo(
    () => (child && week ? computeWeekStats(child.id, week.start, weekIdx === 0 ? alertCount : 0) : null),
    [child, week, weekIdx, alertCount],
  );
  const prevStats = useMemo(
    () => (child && prevWeek ? computeWeekStats(child.id, prevWeek.start, 0) : null),
    [child, prevWeek],
  );

  useEffect(() => {
    if (!child || !stats || !week) return;
    setLoading(true);
    setError(null);
    callAI({
      data: {
        childName: child.first_name,
        childAge: child.age,
        weekLabel: week.label,
        stats: {
          totalHours: stats.totalHours,
          avgDaily: stats.avgDaily,
          score: stats.score,
          byCategory: stats.byCategory,
          topApps: stats.topApps,
        },
        prevStats: prevStats
          ? {
              totalHours: prevStats.totalHours,
              avgDaily: prevStats.avgDaily,
              score: prevStats.score,
            }
          : null,
        alertCount,
      },
    })
      .then((r) => setInsights(r))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [child?.id, week?.key, retryNonce]);

  if (!child || !week || !stats) {
    return <div className="text-sm text-muted-foreground">Loading report…</div>;
  }

  return (
    <div className="space-y-6 print:space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          to="/wellness"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All reports
        </Link>
        <Button onClick={() => window.print()} variant="outline">
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-6 p-6">
          <ScoreRing score={stats.score} />
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold ${colorClass(child.avatar_color)}`}
              >
                {initialsOf(child.first_name)}
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Wellness report for</div>
                <div className="text-xl font-semibold">{child.first_name}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{week.label}</div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl font-semibold">{stats.totalHours}h</div>
                <div className="text-xs text-muted-foreground">Total screen time</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">{stats.avgDaily}h</div>
                <div className="text-xs text-muted-foreground">Daily average</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">{alertCount}</div>
                <div className="text-xs text-muted-foreground">Alerts this week</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm text-destructive">
            <span>Couldn't load insights right now — {error}</span>
            <Button size="sm" variant="outline" onClick={() => setRetryNonce((n) => n + 1)}>
              Try again
            </Button>
          </CardContent>
        </Card>
      )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" /> This week at a glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          ) : (
            <ul className="space-y-2 text-sm">
              {insights?.insights.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" /> Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-4 w-3/4" />
          ) : insights && insights.trends.length ? (
            <ul className="space-y-2 text-sm">
              {insights.trends.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No previous week to compare against yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageCircle className="h-4 w-4 text-primary" /> Conversation starters
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-4 w-2/3" />
          ) : (
            <div className="space-y-3">
              {insights?.conversationStarters.map((q, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-secondary/40 p-3 text-sm italic"
                >
                  "{q}"
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-primary" /> Next week focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-4 w-1/2" />
          ) : (
            <p className="text-sm">{insights?.nextWeekFocus}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
