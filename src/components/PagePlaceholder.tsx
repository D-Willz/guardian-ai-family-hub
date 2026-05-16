import { Sparkles } from "lucide-react";

export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground md:text-base">{description}</p>
      </header>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center shadow-sm">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/30 text-accent-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="text-base font-semibold text-foreground">Coming soon</h2>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          We're crafting this experience to feel warm and supportive — not clinical.
          Check back soon.
        </p>
      </div>
    </div>
  );
}
