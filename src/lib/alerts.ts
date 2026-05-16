import { useEffect, useState, useCallback } from "react";
import type { Child } from "./children";

export type AlertSeverity = "low" | "medium" | "high";

export type BehaviorAlert = {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  timestamp: number; // ms epoch
  childName: string;
};

const STORAGE_KEY = "guardian.dismissedAlerts.v1";
const EVENT = "guardian:alerts-changed";

function readDismissed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeDismissed(s: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
  window.dispatchEvent(new Event(EVENT));
}

const DAY = 24 * 60 * 60 * 1000;

// Mock alert templates — warm, non-alarming language.
const TEMPLATES: Omit<BehaviorAlert, "id" | "timestamp" | "childName">[] = [
  {
    severity: "medium",
    title: "Late night activity noticed",
    description:
      "{name} was active on gaming apps after midnight on Tuesday — might be worth a gentle conversation about wind-down time.",
  },
  {
    severity: "low",
    title: "New app installed",
    description:
      "TikTok was added to {name}'s device on Wednesday. A good moment to chat about what they're enjoying there.",
  },
  {
    severity: "high",
    title: "Usage spike flagged",
    description:
      "{name}'s screen time is up 40% this week compared to last week. Worth checking in to see what's going on.",
  },
  {
    severity: "low",
    title: "Shift in app mix",
    description:
      "{name} is spending more time in messaging apps than usual this week — likely catching up with friends.",
  },
  {
    severity: "medium",
    title: "Streaming binge noticed",
    description:
      "We flagged a long streaming session for {name} on Saturday afternoon. Could be a movie day — just a heads up.",
  },
];

export function generateAlerts(children: Child[]): BehaviorAlert[] {
  const names = children.length ? children.map((c) => c.first_name) : ["Jordan"];
  const now = Date.now();
  const alerts: BehaviorAlert[] = [];
  TEMPLATES.forEach((t, i) => {
    const name = names[i % names.length];
    alerts.push({
      id: `mock-${i}-${name}`,
      severity: t.severity,
      title: t.title,
      description: t.description.replaceAll("{name}", name),
      timestamp: now - (i + 1) * (DAY / 2) - i * 1000 * 60 * 37,
      childName: name,
    });
  });
  return alerts.sort((a, b) => b.timestamp - a.timestamp);
}

export function useDismissed() {
  const [dismissed, setDismissed] = useState<Set<string>>(() => readDismissed());

  useEffect(() => {
    const sync = () => setDismissed(readDismissed());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    const next = readDismissed();
    next.add(id);
    writeDismissed(next);
  }, []);

  return { dismissed, dismiss };
}

export function severityDot(s: AlertSeverity) {
  if (s === "high") return "bg-destructive";
  if (s === "medium") return "bg-amber-500";
  return "bg-emerald-500";
}

export function severityLabel(s: AlertSeverity) {
  return s === "high" ? "High" : s === "medium" ? "Medium" : "Low";
}

export function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
