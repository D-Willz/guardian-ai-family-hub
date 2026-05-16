import { supabase } from "@/integrations/supabase/client";

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
