import { supabase } from "@/integrations/supabase/client";

export const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Day = (typeof DAYS)[number];
export const DAY_LABEL: Record<Day, string> = {
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun",
};

export const CATEGORIES = [
  "Social Media", "Gaming", "Streaming", "Education", "Messaging", "Other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type CategoryRule = "allowed" | "time-limited" | "blocked";
export const RULE_LABEL: Record<CategoryRule, string> = {
  allowed: "Allowed",
  "time-limited": "Time-limited",
  blocked: "Blocked",
};

export type DailyLimits = Record<Day, number>; // hours
export type CategoryRules = Record<Category, CategoryRule>;

export type ContractStatus = "active" | "pending" | "expired";

export type Contract = {
  id: string;
  parent_id: string;
  child_id: string;
  daily_limits: DailyLimits;
  category_rules: CategoryRules;
  reward: string | null;
  status: ContractStatus;
  share_token: string;
  expires_at: string | null;
  created_at: string;
};

export const DEFAULT_LIMITS: DailyLimits = {
  mon: 2, tue: 2, wed: 2, thu: 2, fri: 2, sat: 4, sun: 4,
};

export const DEFAULT_RULES: CategoryRules = {
  "Social Media": "time-limited",
  Gaming: "time-limited",
  Streaming: "allowed",
  Education: "allowed",
  Messaging: "allowed",
  Other: "time-limited",
};

export async function listContracts(): Promise<Contract[]> {
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(normalize);
}

export async function getContractByToken(token: string): Promise<(Contract & { child_name: string }) | null> {
  // Note: this requires the user to be signed-in parent (RLS).
  // For true public access, we'd use a server function with admin client.
  // For MVP, the share link works for the parent and any signed-in parent who knows token won't see it.
  // We expose via a server-side route using admin client below in contracts.functions.ts.
  const { data, error } = await supabase
    .from("contracts")
    .select("*, children(first_name)")
    .eq("share_token", token)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const { children: child, ...rest } = data as never as { children: { first_name: string } | null } & Record<string, unknown>;
  return { ...normalize(rest as never), child_name: child?.first_name ?? "your child" };
}

function normalize(row: Record<string, unknown>): Contract {
  return {
    id: row.id as string,
    parent_id: row.parent_id as string,
    child_id: row.child_id as string,
    daily_limits: { ...DEFAULT_LIMITS, ...(row.daily_limits as Partial<DailyLimits>) },
    category_rules: { ...DEFAULT_RULES, ...(row.category_rules as Partial<CategoryRules>) },
    reward: (row.reward as string) ?? null,
    status: (row.status as ContractStatus) ?? "pending",
    share_token: row.share_token as string,
    expires_at: (row.expires_at as string) ?? null,
    created_at: row.created_at as string,
  };
}

export async function createContract(input: {
  child_id: string;
  daily_limits: DailyLimits;
  category_rules: CategoryRules;
  reward?: string;
}): Promise<Contract> {
  const { data: sessionRes } = await supabase.auth.getSession();
  const userId = sessionRes.session?.user.id;
  if (!userId) throw new Error("Not signed in");
  const { data, error } = await supabase
    .from("contracts")
    .insert({
      parent_id: userId,
      child_id: input.child_id,
      daily_limits: input.daily_limits,
      category_rules: input.category_rules,
      reward: input.reward ?? null,
      status: "pending",
    })
    .select()
    .single();
  if (error) throw error;
  return normalize(data as never);
}

export async function activateContract(id: string): Promise<void> {
  const { error } = await supabase.from("contracts").update({ status: "active" }).eq("id", id);
  if (error) throw error;
}

export async function deleteContract(id: string): Promise<void> {
  const { error } = await supabase.from("contracts").delete().eq("id", id);
  if (error) throw error;
}

export function computeStatus(c: Contract): ContractStatus {
  if (c.expires_at && new Date(c.expires_at) < new Date()) return "expired";
  return c.status;
}

export function statusClass(s: ContractStatus): string {
  switch (s) {
    case "active": return "bg-emerald-100 text-emerald-800";
    case "pending": return "bg-amber-100 text-amber-800";
    case "expired": return "bg-muted text-muted-foreground";
  }
}
