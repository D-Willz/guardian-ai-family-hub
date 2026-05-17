import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function useAuthReady() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;
    let initialSessionRestored = false;

    const restoreSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        initialSessionRestored = true;
        if (!mounted) return;
        setUser(data.session?.user ?? null);
        setIsReady(true);
      } catch {
        initialSessionRestored = true;
        if (!mounted) return;
        setUser(null);
        setIsReady(true);
      }
    };

    void restoreSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "INITIAL_SESSION" && !initialSessionRestored) {
        return;
      }

      setUser(session?.user ?? null);
      setIsReady(true);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return { isReady, user };
}
