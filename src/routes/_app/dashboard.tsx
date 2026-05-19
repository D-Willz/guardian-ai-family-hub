import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Smartphone, Bell, HeartPulse, Clock, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddChildDialog } from "@/components/AddChildDialog";
import {
  type Child,
  CHILD_LIMIT_FREE,
  colorClass,
  initialsOf,
  listChildren,
} from "@/lib/children";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Family Dashboard — Guardian AI" },
      { name: "description", content: "See today's screen time, gentle alerts, and your family's wellness score at a glance." },
      { property: "og:title", content: "Your Family Dashboard — Guardian AI" },
      { property: "og:description", content: "See today's screen time, gentle alerts, and your family's wellness score at a glance." },
    ],
    links: [{ rel: "canonical", href: "https://guardian-ai-family-hub.lovable.app/dashboard" }],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Screen time today", value: "2h 14m", icon: Clock, delta: "-18% vs avg" },
  { label: "Active alerts", value: "1", icon: Bell, delta: "Gentle nudge" },
  { label: "Apps monitored", value: "12", icon: Smartphone, delta: "All healthy" },
  { label: "Wellness score", value: "8.4", icon: HeartPulse, delta: "Trending up" },
];

function Dashboard() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loadingKids, setLoadingKids] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const refresh = () => {
    setLoadingKids(true);
    listChildren()
      .then(setChildren)
      .catch((e) => toast.error(e instanceof Error ? e.message : "Could not load profiles"))
      .finally(() => setLoadingKids(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  const atLimit = children.length >= CHILD_LIMIT_FREE;

  const handleAddClick = () => {
    if (atLimit) {
      setUpgradeOpen(true);
      return;
    }
    setDialogOpen(true);
  };

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

      {/* Children */}
      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Children</h2>
            <p className="text-xs text-muted-foreground">
              {children.length} of {CHILD_LIMIT_FREE} profiles on the free plan
            </p>
          </div>
          <Button onClick={handleAddClick} size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Add child
          </Button>
        </div>

        {loadingKids ? (
          <p className="text-sm text-muted-foreground">Loading profiles…</p>
        ) : children.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <p className="text-sm font-medium text-foreground">No profiles yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first child to start building healthy digital habits together.
            </p>
            <Button onClick={handleAddClick} className="mt-4 gap-1.5">
              <Plus className="h-4 w-4" /> Add child
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-semibold ${colorClass(
                      c.avatar_color,
                    )}`}
                  >
                    {initialsOf(c.first_name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{c.first_name}</p>
                    <p className="text-xs text-muted-foreground">Age {c.age}</p>
                  </div>
                </div>
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="mt-4 w-full rounded-xl"
                >
                  <Link to="/child/$childId" params={{ childId: c.id }}>
                    View
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Family stats */}
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

      <AddChildDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdded={refresh} />

      {/* Upgrade prompt */}
      {upgradeOpen && (
        <UpgradePrompt onClose={() => setUpgradeOpen(false)} />
      )}
    </div>
  );
}

function UpgradePrompt({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          You've reached the free family limit
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The free plan supports up to {CHILD_LIMIT_FREE} children. Upgrade to Guardian AI
          Family to add more profiles and unlock deeper wellness insights — gently, at your
          pace.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Not now
          </Button>
          <Button onClick={onClose}>Explore Family plan</Button>
        </div>
      </div>
    </div>
  );
}
