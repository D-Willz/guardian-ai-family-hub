import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield, Heart, Sparkles, ArrowRight, MessageCircle, Clock, Lock,
  FileText, BookOpen, CheckCircle2, ShieldCheck, Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guardian AI — Raise digital-savvy kids, together." },
      {
        name: "description",
        content:
          "Guardian AI helps families build healthier digital habits with practical guides, free tools, and a calm, parent-built dashboard — never surveillance.",
      },
      { property: "og:title", content: "Guardian AI — Raise digital-savvy kids, together." },
      {
        property: "og:description",
        content: "Build healthier digital habits as a family with Guardian AI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.myguardianai.app/" },
      { property: "og:site_name", content: "Guardian AI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Guardian AI — Raise digital-savvy kids, together." },
      {
        name: "twitter:description",
        content: "Build healthier digital habits as a family with Guardian AI.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Guardian AI",
          url: "https://www.myguardianai.app",
          logo: "https://www.myguardianai.app/favicon.ico",
          description:
            "An AI-powered parental companion that helps families build healthier digital habits.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Guardian AI",
          url: "https://www.myguardianai.app",
        }),
      },
    ],
  }),
  component: Landing,
});

function Feature({
  icon: Icon, title, body,
}: { icon: typeof Shield; title: string; body: string }) {
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

function ResourceCard({
  to, icon: Icon, tag, title, excerpt,
}: { to: string; icon: typeof Shield; tag: string; title: string; excerpt: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{tag}</span>
      <h3 className="mt-1.5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
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
          <span className="text-lg font-semibold tracking-tight text-foreground">Guardian AI</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/resources" className="hover:text-foreground">Resources</Link>
          <Link to="/resources/downloads" className="hover:text-foreground">Free tools</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/faq" className="hover:text-foreground">FAQ</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth"><Button variant="ghost" size="sm">Sign in</Button></Link>
          <Link to="/auth" search={{ mode: "signup" }}><Button size="sm">Get started</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* HERO */}
        <section className="py-20 text-center md:py-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI-powered, family-first
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Raise digital-savvy kids, <span className="text-primary">together.</span>
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
            <Link to="/resources">
              <Button size="lg" variant="ghost" className="rounded-xl">
                Browse family resources
              </Button>
            </Link>
          </div>
        </section>

        {/* WHY TRUST */}
        <section className="grid gap-5 pb-20 md:grid-cols-3">
          <Feature icon={Heart} title="Built on trust" body="Open conversations and shared screen-time agreements replace silent monitoring." />
          <Feature icon={Sparkles} title="Gentle AI insights" body="Spot patterns early with thoughtful weekly wellness reports — not raw data dumps." />
          <Feature icon={Shield} title="Safe by default" body="Smart content filters and behavior alerts that adapt to your child's age and routines." />
        </section>

        {/* HOW IT WORKS */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">How Guardian AI works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              Three simple steps. No surveillance.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">1</div>
              <h3 className="text-base font-semibold text-foreground">Add your family</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Set up profiles for each child in a few minutes. Choose age-appropriate defaults — no spreadsheets, no app catalogs.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">2</div>
              <h3 className="text-base font-semibold text-foreground">Agree on the rules together</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Co-create a screen-time agreement your kids actually help shape — using our free template or a custom one.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">3</div>
              <h3 className="text-base font-semibold text-foreground">Get weekly insights</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Receive a calm, plain-language wellness summary every week with one or two things worth talking about — not 50 data points to panic over.
              </p>
            </div>
          </div>
        </section>

        {/* LATEST RESOURCES */}
        <section className="border-t border-border py-20">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Latest resources</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Practical guides for real parents</h2>
            </div>
            <Link to="/resources" className="text-sm font-medium text-primary hover:underline">
              View all articles →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard to="/resources/talking-to-kids-about-ai" icon={Shield} tag="AI safety" title="Talking to Kids About AI Safely" excerpt="A calm, age-by-age script for the conversation every parent now needs to have." />
            <ResourceCard to="/resources/healthy-screen-time-habits" icon={Clock} tag="Screen time" title="Healthy Screen-Time Habits" excerpt="Build screen-time rhythms that protect sleep, attention, and family connection." />
            <ResourceCard to="/resources/teaching-kids-online-privacy" icon={Lock} tag="Online privacy" title="Teaching Kids Online Privacy" excerpt="Privacy basics every child should know, with examples you can use tonight." />
            <ResourceCard to="/resources/chatbot-safety-for-families" icon={MessageCircle} tag="Chatbots" title="Chatbot Safety for Families" excerpt="Where AI chatbots help, where they hurt, and how to set guardrails that stick." />
            <ResourceCard to="/resources/family-technology-agreements" icon={FileText} tag="Agreements" title="Family Technology Agreements" excerpt="How to co-create tech rules with your kids — built on trust, not control." />
            <ResourceCard to="/resources/setting-digital-boundaries" icon={Compass} tag="Boundaries" title="Setting Digital Boundaries" excerpt="Phone-free zones, bedtime cutoffs, and weekend resets — without daily fights." />
          </div>
        </section>

        {/* FREE TOOLS */}
        <section className="border-t border-border py-20">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Free family tools</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Printable templates and checklists</h2>
              <p className="mt-2 text-sm text-muted-foreground">No account required. Use them with your family tonight.</p>
            </div>
            <Link to="/resources/downloads" className="text-sm font-medium text-primary hover:underline">
              All free tools →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard to="/resources/family-technology-agreement-template" icon={FileText} tag="Template" title="Family Technology Agreement" excerpt="A blank template you fill out together as a family." />
            <ResourceCard to="/resources/age-by-age-ai-conversation-guide" icon={MessageCircle} tag="Guide" title="Age-by-Age AI Conversation Guide" excerpt="What to say about AI at every age from 5 to 17." />
            <ResourceCard to="/resources/chatbot-safety-checklist" icon={ShieldCheck} tag="Checklist" title="Chatbot Safety Checklist" excerpt="15 settings to check before your kid uses any AI chatbot." />
            <ResourceCard to="/resources/family-digital-boundaries-planner" icon={Compass} tag="Planner" title="Digital Boundaries Planner" excerpt="A one-page rhythm for phone-free times, places, and resets." />
            <ResourceCard to="/resources/app-privacy-review-checklist" icon={Lock} tag="Checklist" title="App Privacy Review Checklist" excerpt="A 60-second privacy check for any new app." />
          </div>
        </section>

        {/* WHY TRUST */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Why families trust Guardian AI</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">A calm, honest companion — not another panic button</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["Written and reviewed by the Guardian AI team", "Every article is written and reviewed by the Guardian AI Editorial Team — parents and researchers focused on healthier family technology habits."],
              ["No fabricated stats or fake experts", "We cite primary sources, label anecdotes as anecdotes, and never use AI to invent studies, quotes, or credentials."],
              ["Trust over surveillance", "We don't sell ourselves on tracking your kids. We help families talk about tech together."],
              ["Reviewed and dated", "Every article carries a published and last-reviewed date. If something's outdated, we fix it openly."],
            ].map(([t, b]) => (
              <div key={t} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-base font-semibold text-foreground">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/editorial-policy" className="text-sm font-medium text-primary hover:underline">
              Read our editorial policy →
            </Link>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="border-t border-border py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr]">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl bg-primary/10 text-primary md:h-48 md:w-48">
              <BookOpen className="h-16 w-16" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Meet the founder</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Hi, I'm Willie Dampier Jr.</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Guardian AI started because I got tired of choosing between
                cold surveillance apps and doing nothing at all. Most
                parental-control tools treat kids like suspects and parents
                like wardens. I wanted something calmer — built around
                conversation, written in plain language, and grounded in
                trust. Everything you read here is something I'd want my
                own family to read.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/about"><Button variant="outline" size="sm">More about Guardian AI</Button></Link>
                <Link to="/contact"><Button variant="ghost" size="sm">Get in touch</Button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ PREVIEW */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Common questions</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">What parents ask us most</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {[
              ["Is Guardian AI free?", "All of our articles, checklists, templates, and planners are free and require no login. The Guardian AI parent dashboard is a separate optional product."],
              ["Who writes the articles?", "Willie Dampier Jr., Guardian AI's founder. AI tools may help with brainstorming or clarity edits — never with inventing facts."],
              ["What age range is this for?", "Most useful for parents of kids ages 5 to 18. Many articles include age-specific notes for younger children, tweens, and teens."],
              ["Do you sell my data?", "No. See our Privacy Policy for what we collect and why."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-xl border border-border bg-card p-5">
                <p className="text-base font-semibold text-foreground">{q}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="text-sm font-medium text-primary hover:underline">
              See the full FAQ →
            </Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="border-t border-border py-20 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Ready to make tech a calmer part of your family?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/auth" search={{ mode: "signup" }}>
              <Button size="lg" className="gap-2 rounded-xl px-6">
                Get started free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/resources/downloads">
              <Button size="lg" variant="ghost" className="rounded-xl">
                Grab a free tool first
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
