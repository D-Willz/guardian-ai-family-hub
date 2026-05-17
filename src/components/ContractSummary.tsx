import { CATEGORIES, DAYS, DAY_LABEL, RULE_LABEL, type Contract } from "@/lib/contracts";
import { cn } from "@/lib/utils";

export function ContractSummary({
  contract,
  childName,
  readOnly = false,
}: {
  contract: Pick<Contract, "daily_limits" | "category_rules" | "reward" | "created_at">;
  childName: string;
  readOnly?: boolean;
}) {
  const date = new Date(contract.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-[#fdfaf4] p-6 shadow-sm md:p-8">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Guardian AI · Family Agreement
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
          Screen-Time Contract
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Between a parent and {childName} · {date}
        </p>
      </div>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Daily screen-time limits</h3>
        <div className="grid grid-cols-7 gap-1.5 rounded-xl bg-white p-3 text-center">
          {DAYS.map((d) => (
            <div key={d} className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {DAY_LABEL[d]}
              </span>
              <span className="text-base font-semibold text-foreground">
                {contract.daily_limits[d]}h
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">App category rules</h3>
        <div className="grid gap-1.5 rounded-xl bg-white p-3 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <div key={c} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{c}</span>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-medium",
                  contract.category_rules[c] === "allowed" && "bg-emerald-100 text-emerald-800",
                  contract.category_rules[c] === "time-limited" && "bg-amber-100 text-amber-800",
                  contract.category_rules[c] === "blocked" && "bg-rose-100 text-rose-800",
                )}
              >
                {RULE_LABEL[contract.category_rules[c]]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {contract.reward && (
        <section className="mt-5 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Our reward</h3>
          <p className="rounded-xl bg-amber-50 p-3 text-sm italic text-amber-900">
            “{contract.reward}”
          </p>
        </section>
      )}

      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SignatureLine label="Parent" readOnly={readOnly} />
        <SignatureLine label={childName} readOnly={readOnly} />
      </section>
    </div>
  );
}

function SignatureLine({ label, readOnly }: { label: string; readOnly: boolean }) {
  return (
    <div>
      <div className={cn("h-10 border-b border-foreground/40", readOnly && "opacity-50")} />
      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
