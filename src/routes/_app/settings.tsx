import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Lock, BellRing, Sparkles, CreditCard, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuthReady } from "@/lib/auth";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Guardian AI" },
      { name: "description", content: "Manage your account, email digest preferences, and subscription plan." },
      { property: "og:title", content: "Settings — Guardian AI" },
      { property: "og:description", content: "Manage your account, email digest preferences, and subscription plan." },
    ],
    links: [{ rel: "canonical", href: "https://guardian-ai-family-hub.lovable.app/settings" }],
  }),
  component: SettingsPage,
});

type Digest = "daily" | "weekly" | "never";
const DIGEST_KEY = "guardian-digest-frequency";

function SettingsPage() {
  const { user } = useAuthReady();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [digest, setDigest] = useState<Digest>("weekly");

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user?.email]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DIGEST_KEY) as Digest | null;
      if (stored) setDigest(stored);
    } catch {
      // ignore
    }
  }, []);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || email === user?.email) {
      toast.info("That's already your email.");
      return;
    }
    setSavingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      toast.success("Check your inbox to confirm your new email.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update email.");
    } finally {
      setSavingEmail(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Pick a password with at least 6 characters.");
      return;
    }
    setSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated.");
      setPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDigestChange = (value: Digest) => {
    setDigest(value);
    try {
      localStorage.setItem(DIGEST_KEY, value);
      toast.success("Notification preference saved.");
    } catch {
      toast.error("Couldn't save preference.");
    }
  };

  const handleUpgrade = () => {
    toast.info("Opening checkout…", {
      description: "Stripe checkout is coming soon.",
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Settings
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
          Manage your account, notifications, and plan.
        </p>
      </header>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4 text-primary" /> Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailUpdate} className="space-y-3">
            <Label htmlFor="email">Email address</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@family.com"
                className="flex-1"
              />
              <Button type="submit" disabled={savingEmail} className="sm:w-auto">
                {savingEmail ? "Saving…" : "Update email"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              We'll send a confirmation link to your new address.
            </p>
          </form>

          <form onSubmit={handlePasswordUpdate} className="space-y-3">
            <Label htmlFor="password" className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> New password
            </Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="flex-1"
                autoComplete="new-password"
              />
              <Button
                type="submit"
                variant="secondary"
                disabled={savingPassword}
                className="sm:w-auto"
              >
                {savingPassword ? "Saving…" : "Change password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BellRing className="h-4 w-4 text-primary" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="digest">Email digest frequency</Label>
          <Select value={digest} onValueChange={(v) => handleDigestChange(v as Digest)}>
            <SelectTrigger id="digest" className="sm:w-72">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily — a short morning summary</SelectItem>
              <SelectItem value="weekly">Weekly — every Sunday evening</SelectItem>
              <SelectItem value="never">Never — I'll check in myself</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            We'll only email when there's something worth your time.
          </p>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4 text-primary" /> Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-foreground">
                    Free plan
                  </span>
                  <Badge variant="secondary" className="rounded-full">
                    Current
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Up to 2 children, weekly wellness reports.
                </p>
              </div>
            </div>
            <Button onClick={handleUpgrade} className="gap-1.5">
              <Sparkles className="h-4 w-4" /> Upgrade to Pro
            </Button>
          </div>

          <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-sm font-medium text-foreground">Pro includes</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {[
                "Up to 6 children",
                "Daily AI insights and conversation starters",
                "Priority support from our family team",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> {feat}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
