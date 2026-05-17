import { supabase } from "@/integrations/supabase/client";

export type FilterState = "blocked" | "restricted" | "allowed";
export type AgePreset = "young" | "preteen" | "early-teen" | "older-teen";

export const CATEGORIES = [
  { key: "adult", label: "Adult content" },
  { key: "violence", label: "Violence & gore" },
  { key: "gambling", label: "Gambling" },
  { key: "drugs", label: "Drugs & alcohol" },
  { key: "hate", label: "Hate speech" },
  { key: "horror", label: "Horror" },
  { key: "dating", label: "Dating apps" },
  { key: "purchases", label: "In-app purchases" },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];
export type CategoryStates = Record<CategoryKey, FilterState>;

export const AGE_PRESETS: { value: AgePreset; label: string }[] = [
  { value: "young", label: "Young child (6–9)" },
  { value: "preteen", label: "Preteen (10–12)" },
  { value: "early-teen", label: "Early teen (13–15)" },
  { value: "older-teen", label: "Older teen (16–17)" },
];

export const PRESET_DEFAULTS: Record<AgePreset, CategoryStates> = {
  young: {
    adult: "blocked", violence: "blocked", gambling: "blocked", drugs: "blocked",
    hate: "blocked", horror: "blocked", dating: "blocked", purchases: "blocked",
  },
  preteen: {
    adult: "blocked", violence: "blocked", gambling: "blocked", drugs: "blocked",
    hate: "blocked", horror: "restricted", dating: "blocked", purchases: "restricted",
  },
  "early-teen": {
    adult: "blocked", violence: "restricted", gambling: "blocked", drugs: "restricted",
    hate: "blocked", horror: "restricted", dating: "restricted", purchases: "restricted",
  },
  "older-teen": {
    adult: "restricted", violence: "allowed", gambling: "blocked", drugs: "restricted",
    hate: "blocked", horror: "allowed", dating: "allowed", purchases: "allowed",
  },
};

export const DEFAULT_STATES: CategoryStates = PRESET_DEFAULTS.preteen;

export type ContentFilter = {
  id: string;
  child_id: string;
  parent_id: string;
  age_preset: AgePreset | null;
  category_states: CategoryStates;
  blocked_sites: string[];
  safe_search: boolean;
};

export async function getFilter(childId: string): Promise<ContentFilter | null> {
  const { data, error } = await supabase
    .from("content_filters")
    .select("*")
    .eq("child_id", childId)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as ContentFilter | null;
}

export async function saveFilter(input: {
  child_id: string;
  age_preset: AgePreset | null;
  category_states: CategoryStates;
  blocked_sites: string[];
  safe_search: boolean;
}) {
  const { data: sessionRes } = await supabase.auth.getSession();
  const userId = sessionRes.session?.user.id;
  if (!userId) throw new Error("Not signed in");
  const { data, error } = await supabase
    .from("content_filters")
    .upsert(
      { ...input, parent_id: userId },
      { onConflict: "child_id" },
    )
    .select()
    .single();
  if (error) throw error;
  return data as unknown as ContentFilter;
}

export function normalizeDomain(input: string): string | null {
  const trimmed = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!trimmed) return null;
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(trimmed)) return null;
  return trimmed;
}

export const STATE_STYLES: Record<FilterState, { label: string; dot: string; btn: string }> = {
  blocked: {
    label: "Blocked",
    dot: "bg-red-500",
    btn: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
  },
  restricted: {
    label: "Restricted",
    dot: "bg-amber-500",
    btn: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  },
  allowed: {
    label: "Allowed",
    dot: "bg-emerald-500",
    btn: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900",
  },
};

export function cycleState(s: FilterState): FilterState {
  return s === "blocked" ? "restricted" : s === "restricted" ? "allowed" : "blocked";
}
