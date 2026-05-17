import { useEffect, useState } from "react";
import { Sparkles, HeartHandshake, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddChildDialog } from "@/components/AddChildDialog";

const STORAGE_PREFIX = "guardian-onboarded-";

export function OnboardingFlow({
  userId,
  hasChildren,
  onChildAdded,
}: {
  userId: string;
  hasChildren: boolean;
  onChildAdded: () => void;
}) {
  const key = `${STORAGE_PREFIX}${userId}`;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(key)) {
      setOpen(true);
      setStep(0);
    }
  }, [key]);

  const finish = () => {
    try {
      localStorage.setItem(key, new Date().toISOString());
    } catch {
      // ignore
    }
    setOpen(false);
  };

  if (!open) return null;

  const steps = [
    {
      icon: Sparkles,
      title: "Welcome to Guardian AI 👋",
      body:
        "A calm, supportive space to help your family build healthier digital habits together — never surveillance, always trust.",
      cta: "Let's get started",
      onCta: () => setStep(1),
    },
    {
      icon: HeartHandshake,
      title: "Add your first child",
      body:
        "Create a profile so we can tailor gentle insights and reports to their age and routines. You can add more later.",
      cta: hasChildren ? "Continue" : "Add a child",
      onCta: () => {
        if (hasChildren) {
          setStep(2);
        } else {
          setAddOpen(true);
        }
      },
    },
    {
      icon: PartyPopper,
      title: "Your dashboard is ready",
      body:
        "Take a look around — every section has a friendly empty state to guide you. We're here when you need us.",
      cta: "Go to dashboard",
      onCta: finish,
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-xl">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {current.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {current.body}
          </p>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {step < steps.length - 1 && (
                <Button variant="ghost" size="sm" onClick={finish}>
                  Skip
                </Button>
              )}
              <Button size="sm" onClick={current.onCta} className="gap-1.5">
                {current.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddChildDialog
        open={addOpen}
        onOpenChange={(o) => {
          setAddOpen(o);
        }}
        onAdded={() => {
          onChildAdded();
          setAddOpen(false);
          setStep(2);
        }}
      />
    </>
  );
}
