import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bell, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { listChildren, type Child } from "@/lib/children";
import {
  generateAlerts,
  useDismissed,
  severityDot,
  severityLabel,
  formatRelative,
  type AlertSeverity,
} from "@/lib/alerts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/behavior-alerts")({
  head: () => ({
    meta: [
      { title: "Behavior Alerts — Guardian AI" },
      { name: "description", content: "Gentle, prioritized signals when something in your child's digital routine needs attention." },
      { property: "og:title", content: "Behavior Alerts — Guardian AI" },
      { property: "og:description", content: "Gentle, prioritized signals when something in your child's digital routine needs attention." },
    ],
    links: [{ rel: "canonical", href: "https://guardian-ai-family-hub.lovable.app/behavior-alerts" }],
  }),
  component: BehaviorAlertsPage,
});

const FILTERS: { value: "all" | AlertSeverity; label: string }[] = [
  { value: "all", label: "All" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function BehaviorAlertsPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [filter, setFilter] = useState<"all" | AlertSeverity>("all");
  const { dismissed, dismiss } = useDismissed();

  useEffect(() => {
    listChildren().then(setChildren).catch(() => setChildren([]));
  }, []);

  const alerts = useMemo(() => generateAlerts(children), [children]);
  const visible = useMemo(
    () =>
      alerts
        .filter((a) => !dismissed.has(a.id))
        .filter((a) => filter === "all" || a.severity === filter),
    [alerts, dismissed, filter],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Behavior Alerts
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Gentle notices when patterns shift — surfaced so you can check in early, not to alarm.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI-assisted
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <p className="text-base font-medium text-foreground">All clear for now</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Nothing worth a conversation right now. We'll flag anything new here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {visible.map((a) => (
            <Card key={a.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-3">
                    <div className="pt-1.5">
                      <span
                        className={cn(
                          "block h-2.5 w-2.5 rounded-full",
                          severityDot(a.severity),
                        )}
                        aria-label={`${severityLabel(a.severity)} severity`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">{a.title}</h3>
                        <Badge variant="outline" className="text-xs font-normal">
                          {a.childName}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {severityLabel(a.severity)} · {formatRelative(a.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {a.description}
                      </p>
                    </div>
                  </div>
                  <div className="sm:pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismiss(a.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
