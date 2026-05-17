import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Heart, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guardian AI — Raise digital-savvy kids, together." },
      {
        name: "description",
        content:
          "An AI-powered parental dashboard that helps families build healthier digital habits — warm, supportive, and modern.",
      },
      { property: "og:title", content: "Guardian AI — Raise digital-savvy kids, together." },
      {
        property: "og:description",
        content: "Build healthier digital habits as a family with Guardian AI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Guardian AI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Guardian AI — Raise digital-savvy kids, together." },
      {
        name: "twitter:description",
        content: "Build healthier digital habits as a family with Guardian AI.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Shield;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Guardian AI
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/auth" search={{ mode: "signup" }}>
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="py-20 text-center md:py-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI-powered, family-first
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Raise digital-savvy kids,{" "}
            <span className="text-primary">together.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Guardian AI helps families build healthier digital habits with gentle
            insights, shared agreements, and supportive nudges — never surveillance.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/auth" search={{ mode: "signup" }}>
              <Button size="lg" className="gap-2 rounded-xl px-6">
                Get started free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="ghost" className="rounded-xl">
                I already have an account
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-5 pb-24 md:grid-cols-3">
          <Feature
            icon={Heart}
            title="Built on trust"
            body="Open conversations and shared screen-time contracts replace silent monitoring."
          />
          <Feature
            icon={Sparkles}
            title="Gentle AI insights"
            body="Spot patterns early with thoughtful weekly wellness reports — not raw data dumps."
          />
          <Feature
            icon={Shield}
            title="Safe by default"
            body="Smart content filters and behavior alerts that adapt to your child's age and routines."
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
