import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FilePlus2, Share2, Trash2, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContractBuilder } from "@/components/ContractBuilder";
import { ContractSummary } from "@/components/ContractSummary";
import { listChildren, type Child } from "@/lib/children";
import {
  activateContract,
  computeStatus,
  deleteContract,
  listContracts,
  statusClass,
  type Contract,
} from "@/lib/contracts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/contracts")({
  component: ContractsPage,
});

function ContractsPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);

  const refresh = () => {
    listContracts().then(setContracts).catch(() => setContracts([]));
  };

  useEffect(() => {
    listChildren().then(setChildren).catch(() => setChildren([]));
    refresh();
  }, []);

  const childById = useMemo(
    () => Object.fromEntries(children.map((c) => [c.id, c])),
    [children],
  );
  const focused = contracts.find((c) => c.id === focusId) ?? contracts[0] ?? null;

  const handleShare = async (c: Contract) => {
    if (c.status === "pending") {
      try {
        await activateContract(c.id);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't activate");
        return;
      }
    }
    const url = `${window.location.origin}/c/${c.share_token}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Share link copied to clipboard");
    } catch {
      window.prompt("Copy this link to share:", url);
    }
    refresh();
  };

  const handleDelete = async (c: Contract) => {
    if (!window.confirm("Delete this contract?")) return;
    try {
      await deleteContract(c.id);
      toast.success("Contract removed");
      if (focusId === c.id) setFocusId(null);
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't delete");
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Screen-Time Contracts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Co-create simple agreements with your kids — built on trust and reviewed together.
          </p>
        </div>
        <Button onClick={() => setBuilderOpen(true)} className="gap-2">
          <FilePlus2 className="h-4 w-4" /> Create contract
        </Button>
      </header>

      {contracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">No contracts yet</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Sit down with your child and draft your first agreement together. It only takes a minute.
          </p>
          <Button onClick={() => setBuilderOpen(true)} className="mt-2 gap-2">
            <FilePlus2 className="h-4 w-4" /> Create your first contract
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              All contracts
            </h2>
            {contracts.map((c) => {
              const status = computeStatus(c);
              const child = childById[c.child_id];
              const active = (focused?.id ?? null) === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setFocusId(c.id)}
                  className={cn(
                    "flex w-full flex-col gap-2 rounded-2xl border p-4 text-left transition",
                    active
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:bg-secondary/50",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">
                      {child?.first_name ?? "Child"}'s contract
                    </span>
                    <Badge className={cn("border-0", statusClass(status))} variant="outline">
                      {status[0].toUpperCase() + status.slice(1)}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Drafted {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </button>
              );
            })}
          </div>

          {focused && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => handleShare(focused)} variant="default" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share with child
                </Button>
                {computeStatus(focused) === "pending" && (
                  <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={async () => {
                      await activateContract(focused.id);
                      toast.success("Contract activated");
                      refresh();
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Mark active
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="gap-2 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(focused)}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
              <ContractSummary
                contract={focused}
                childName={childById[focused.child_id]?.first_name ?? "your child"}
              />
            </div>
          )}
        </div>
      )}

      <ContractBuilder
        open={builderOpen}
        onOpenChange={setBuilderOpen}
        children={children}
        onCreated={refresh}
      />
    </div>
  );
}
