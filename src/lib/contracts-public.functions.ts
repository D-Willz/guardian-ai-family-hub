import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getPublicContract = createServerFn({ method: "GET" })
  .inputValidator((input) =>
    z.object({ token: z.string().min(8).max(128).regex(/^[a-f0-9]+$/) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("contracts")
      .select("id, daily_limits, category_rules, reward, status, expires_at, created_at, children(first_name)")
      .eq("share_token", data.token)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child = (row as any).children as { first_name: string } | null;
    return {
      id: row.id as string,
      daily_limits: row.daily_limits as Record<string, number>,
      category_rules: row.category_rules as Record<string, string>,
      reward: (row.reward as string) ?? null,
      status: row.status as string,
      expires_at: (row.expires_at as string) ?? null,
      created_at: row.created_at as string,
      child_name: child?.first_name ?? "your child",
    };
  });
