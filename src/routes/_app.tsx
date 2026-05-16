import { createFileRoute, redirect, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Smartphone,
  Bell,
  FileText,
  Filter,
  HeartPulse,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/auth" });
    }
  },
  component: AppShell,
});

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/app-monitoring", label: "App Monitoring", icon: Smartphone },
  { to: "/behavior-alerts", label: "Behavior Alerts", icon: Bell },
  { to: "/contracts", label: "Screen-Time Contracts", icon: FileText },
  { to: "/filters", label: "Content Filters", icon: Filter },
  { to: "/wellness", label: "Wellness Reports", icon: HeartPulse },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function AppShell() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur md:hidden">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-4 w-4" />
          </div>
          <span className="font-semibold text-foreground">Guardian AI</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "pt-14 md:pt-0",
        )}
      >
        <div className="hidden h-16 items-center gap-2 px-6 md:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Guardian AI
          </span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-10 bg-foreground/20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <main className="flex-1 pt-14 md:ml-64 md:pt-0">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
