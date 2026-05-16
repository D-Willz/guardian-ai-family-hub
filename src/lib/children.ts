import { supabase } from "@/integrations/supabase/client";

export const CHILD_LIMIT_FREE = 3;

export type AvatarColor =
  | "peach"
  | "mint"
  | "sky"
  | "lavender"
  | "butter"
  | "rose";

export type Child = {
  id: string;
  parent_id: string;
  first_name: string;
  age: number;
  avatar_color: AvatarColor;
  created_at: string;
};

export const AVATAR_COLORS: { value: AvatarColor; label: string; className: string }[] = [
  { value: "peach", label: "Peach", className: "bg-[#FFD9C2] text-[#7a3b1c]" },
  { value: "mint", label: "Mint", className: "bg-[#C8EBD9] text-[#1f5a42]" },
  { value: "sky", label: "Sky", className: "bg-[#CBE3F7] text-[#1f4870]" },
  { value: "lavender", label: "Lavender", className: "bg-[#E0D4F7] text-[#4b347a]" },
  { value: "butter", label: "Butter", className: "bg-[#FBEAB6]  text-[#7a5a14]" },
  { value: "rose", label: "Rose", className: "bg-[#F7CFD9] text-[#7a2541]" },
];

export function colorClass(c: AvatarColor) {
  return AVATAR_COLORS.find((a) => a.value === c)?.className ?? AVATAR_COLORS[0].className;
}

export function initialsOf(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export async function listChildren(): Promise<Child[]> {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Child[];
}

export async function createChild(input: {
  first_name: string;
  age: number;
  avatar_color: AvatarColor;
}) {
  const { data: sessionRes } = await supabase.auth.getSession();
  const userId = sessionRes.session?.user.id;
  if (!userId) throw new Error("Not signed in");
  const { data, error } = await supabase
    .from("children")
    .insert({ ...input, parent_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data as Child;
}
