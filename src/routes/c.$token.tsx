import { createFileRoute, useParams, useServerFn } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Shield } from "lucide-react";
import { getPublicContract } from "@/lib/contracts-public.functions";
import { ContractSummary } from "@/components/ContractSummary";
import { DEFAULT_LIMITS, DEFAULT_RULES, type CategoryRules, type DailyLimits } from "@/lib/contracts";

export const Route = createFileRoute("/c/$token")({
  component: PublicContractPage,
});

function PublicContractPage() {
  const { token } = useParams({ from: "/c/$token" });
  const fetchContract = useServerFn(getPublicContract);
  const { data, isLoading, error } = useQuery({
    queryKey: ["public-contract", token],
    queryFn: () => fetchContract({ data: { token } }),
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-4 w-4" />
          </div>
          <span className="font-semibold text-foreground">Guardian AI</span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        {isLoading && (
          <p className="py-12 text-center text-sm text-muted-foreground">Loading…</p>
        )}
        {(error || (!isLoading && !data)) && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <h1 className="text-lg font-semibold text-foreground">Contract not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This link may have expired or been removed.
            </p>
          </div>
        )}
        {data && (
          <ContractSummary
            contract={{
              daily_limits: { ...DEFAULT_LIMITS, ...(data.daily_limits as Partial<DailyLimits>) },
              category_rules: { ...DEFAULT_RULES, ...(data.category_rules as Partial<CategoryRules>) },
              reward: data.reward,
              created_at: data.created_at,
            }}
            childName={data.child_name}
            readOnly
          />
        )}
      </main>
    </div>
  );
}
