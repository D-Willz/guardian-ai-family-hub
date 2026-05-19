import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Shield } from "lucide-react";
import { listChildren, type Child, colorClass, initialsOf } from "@/lib/children";
import {
  AGE_PRESETS, CATEGORIES, DEFAULT_STATES, PRESET_DEFAULTS, STATE_STYLES,
  cycleState, getFilter, normalizeDomain, saveFilter,
  type AgePreset, type CategoryKey, type CategoryStates, type FilterState,
} from "@/lib/filters";

export const Route = createFileRoute("/_app/filters")({
  head: () => ({
    meta: [
      { title: "Content Filters — Guardian AI" },
      { name: "description", content: "Tune age-appropriate content filters by category and time of day." },
      { property: "og:title", content: "Content Filters — Guardian AI" },
      { property: "og:description", content: "Tune age-appropriate content filters by category and time of day." },
    ],
    links: [{ rel: "canonical", href: "https://guardian-ai-family-hub.lovable.app/filters" }],
  }),
  component: FiltersPage,
});

function FiltersPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [childId, setChildId] = useState<string>("");
  const [preset, setPreset] = useState<AgePreset | "">("");
  const [states, setStates] = useState<CategoryStates>(DEFAULT_STATES);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [safeSearch, setSafeSearch] = useState(true);
  const [domainInput, setDomainInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listChildren().then((list) => {
      setChildren(list);
      if (list[0]) setChildId(list[0].id);
    }).catch((e) => toast.error(e.message));
  }, []);

  useEffect(() => {
    if (!childId) return;
    setLoading(true);
    getFilter(childId)
      .then((row) => {
        if (row) {
          setPreset((row.age_preset as AgePreset) ?? "");
          setStates({ ...DEFAULT_STATES, ...row.category_states });
          setBlocked(row.blocked_sites ?? []);
          setSafeSearch(row.safe_search);
        } else {
          setPreset("");
          setStates(DEFAULT_STATES);
          setBlocked([]);
          setSafeSearch(true);
        }
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [childId]);

  const selectedChild = useMemo(() => children.find((c) => c.id === childId), [children, childId]);

  const handlePreset = (value: AgePreset) => {
    setPreset(value);
    setStates(PRESET_DEFAULTS[value]);
  };

  const handleAddDomain = () => {
    const d = normalizeDomain(domainInput);
    if (!d) {
      toast.error("Enter a valid domain (e.g. example.com)");
      return;
    }
    if (blocked.includes(d)) {
      toast.info("Already on the block list");
      return;
    }
    setBlocked([...blocked, d]);
    setDomainInput("");
  };

  const handleSave = async () => {
    if (!childId) return;
    setSaving(true);
    try {
      await saveFilter({
        child_id: childId,
        age_preset: preset || null,
        category_states: states,
        blocked_sites: blocked,
        safe_search: safeSearch,
      });
      toast.success("Saved", { description: `Filters updated for ${selectedChild?.first_name ?? "child"}.` });
    } catch (e: any) {
      toast.error(e.message ?? "Could not save");
    } finally {
      setSaving(false);
    }
  };

  if (children.length === 0) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Add a child profile on the Overview page to configure content filters.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Content Filters</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Age-aware filters that protect without isolating — adjustable as they grow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedChild && (
            <div className={`h-9 w-9 rounded-full grid place-items-center text-sm font-semibold ${colorClass(selectedChild.avatar_color)}`}>
              {initialsOf(selectedChild.first_name)}
            </div>
          )}
          <Select value={childId} onValueChange={setChildId}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Select child" /></SelectTrigger>
            <SelectContent>
              {children.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.first_name} · {c.age}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Age preset</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {AGE_PRESETS.map((p) => (
              <Button
                key={p.value}
                variant={preset === p.value ? "default" : "outline"}
                className="h-auto py-3 text-sm whitespace-normal"
                onClick={() => handlePreset(p.value)}
              >
                {p.label}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Picking a preset fills the categories below as a starting point — you can fine-tune each one.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {CATEGORIES.map((cat) => {
            const s = states[cat.key as CategoryKey] ?? "allowed";
            const style = STATE_STYLES[s];
            return (
              <div key={cat.key} className="flex items-center justify-between gap-4 p-3 rounded-md border bg-card/50">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                  <span className="text-sm font-medium truncate">{cat.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStates({ ...states, [cat.key]: cycleState(s) })}
                  className={`text-xs font-medium px-3 py-1.5 rounded-md border transition ${style.btn}`}
                >
                  {style.label}
                </button>
              </div>
            );
          })}
          <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
            <Legend color="bg-red-500" label="Blocked" />
            <Legend color="bg-amber-500" label="Restricted" />
            <Legend color="bg-emerald-500" label="Allowed" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Custom blocked sites</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="example.com"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddDomain(); } }}
            />
            <Button onClick={handleAddDomain} variant="secondary"><Plus className="h-4 w-4" /></Button>
          </div>
          {blocked.length === 0 ? (
            <p className="text-xs text-muted-foreground">No custom domains blocked yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {blocked.map((d) => (
                <Badge key={d} variant="secondary" className="gap-1.5 pl-2.5 pr-1 py-1">
                  {d}
                  <button
                    onClick={() => setBlocked(blocked.filter((x) => x !== d))}
                    className="rounded-full hover:bg-muted-foreground/20 p-0.5"
                    aria-label={`Remove ${d}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Safe search</div>
              <p className="text-xs text-muted-foreground">Enforces safe search on Google, Bing, and DuckDuckGo.</p>
            </div>
          </div>
          <Switch checked={safeSearch} onCheckedChange={setSafeSearch} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving || loading}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}
