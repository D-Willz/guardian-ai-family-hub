import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Child, colorClass, initialsOf } from "@/lib/children";
import {
  CATEGORIES,
  type Category,
  type CategoryRule,
  type CategoryRules,
  type DailyLimits,
  DAYS,
  DAY_LABEL,
  DEFAULT_LIMITS,
  DEFAULT_RULES,
  RULE_LABEL,
  createContract,
} from "@/lib/contracts";
import { cn } from "@/lib/utils";

const RULE_OPTIONS: CategoryRule[] = ["allowed", "time-limited", "blocked"];

export function ContractBuilder({
  open,
  onOpenChange,
  children,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: Child[];
  onCreated: () => void;
}) {
  const [step, setStep] = useState(1);
  const [childId, setChildId] = useState<string>(children[0]?.id ?? "");
  const [limits, setLimits] = useState<DailyLimits>(DEFAULT_LIMITS);
  const [rules, setRules] = useState<CategoryRules>(DEFAULT_RULES);
  const [reward, setReward] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setStep(1);
    setChildId(children[0]?.id ?? "");
    setLimits(DEFAULT_LIMITS);
    setRules(DEFAULT_RULES);
    setReward("");
  };

  const close = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const handleSubmit = async () => {
    if (!childId) {
      toast.error("Pick a child first");
      setStep(1);
      return;
    }
    setLoading(true);
    try {
      await createContract({
        child_id: childId,
        daily_limits: limits,
        category_rules: rules,
        reward: reward.trim() || undefined,
      });
      toast.success("Contract drafted");
      reset();
      onOpenChange(false);
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save contract");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a screen-time contract</DialogTitle>
          <DialogDescription>
            A simple, shared agreement. Step {step} of 3.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-2 flex gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                n <= step ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Which child is this for?</Label>
              {children.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Add a child profile first from the Overview page.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {children.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setChildId(c.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border p-2.5 text-left transition",
                        childId === c.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                          colorClass(c.avatar_color),
                        )}
                      >
                        {initialsOf(c.first_name)}
                      </span>
                      <span className="text-sm font-medium">{c.first_name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Daily screen-time limit (hours)</Label>
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map((d) => (
                  <div key={d} className="flex flex-col items-center gap-1">
                    <span className="text-xs text-muted-foreground">{DAY_LABEL[d]}</span>
                    <Input
                      type="number"
                      min={0}
                      max={24}
                      step={0.5}
                      value={limits[d]}
                      onChange={(e) =>
                        setLimits({ ...limits, [d]: Number(e.target.value) || 0 })
                      }
                      className="h-9 px-2 text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Label>App category rules</Label>
            {CATEGORIES.map((cat) => (
              <div
                key={cat}
                className="flex flex-col gap-2 rounded-xl border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-medium">{cat}</span>
                <div className="flex gap-1.5">
                  {RULE_OPTIONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRules({ ...rules, [cat]: r })}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                        rules[cat] === r
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-secondary",
                      )}
                    >
                      {RULE_LABEL[r]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <Label htmlFor="reward">Reward note (optional)</Label>
            <Textarea
              id="reward"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              placeholder="e.g. If you stick to the agreement for 2 weeks, we'll plan a movie night."
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              Keep it warm and motivating — this is what your child reads.
            </p>
          </div>
        )}

        <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => (step === 1 ? close(false) : setStep(step - 1))}
            disabled={loading}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step < 3 ? (
            <Button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !childId}
            >
              Continue
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving…" : "Create contract"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
