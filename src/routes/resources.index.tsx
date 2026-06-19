import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield, Lock, Clock, MessageCircle, FileText, Compass,
  ShieldCheck, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Family Tech Resources — Guardian AI" },
      {
        name: "description",
        content:
          "Practical guides for parents on AI safety, online privacy for kids, healthy screen-time habits, chatbot safety, family tech agreements, and digital boundaries — plus free printable tools.",
      },
      { property: "og:title", content: "Family Tech Resources — Guardian AI" },
      {
        property: "og:description",
        content: "Original, parent-friendly articles and free tools on raising digitally healthy kids.",
      },
      { property: "og:url", content: "https://www.myguardianai.app/resources" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources" }],
  }),
  component: ResourcesIndex,
});

type Article = {
  to: string;
  title: string;
  excerpt: string;
  icon: typeof Shield;
  tag: string;
};

const articles: Article[] = [
  {
    to: "/resources/talking-to-kids-about-ai",
    title: "How Parents Can Talk to Kids About AI Safely",
    excerpt:
      "A calm, age-by-age guide to opening honest conversations about chatbots, generative AI, and what kids should never share.",
    icon: Shield,
    tag: "Family AI safety",
  },
  {
    to: "/resources/teaching-kids-online-privacy",
    title: "How to Teach Kids Online Privacy",
    excerpt:
      "The privacy basics every child should know — explained in plain language, with examples you can use at the dinner table tonight.",
    icon: Lock,
    tag: "Online privacy for kids",
  },
  {
    to: "/resources/healthy-screen-time-habits",
    title: "Healthy Screen-Time Habits for Modern Families",
    excerpt:
      "Move beyond strict timers. Build screen-time rhythms that protect sleep, attention, and family connection without daily battles.",
    icon: Clock,
    tag: "Healthy screen time",
  },
  {
    to: "/resources/chatbot-safety-for-families",
    title: "Chatbot Safety: What Every Family Should Know",
    excerpt:
      "Why AI chatbots feel like friends to kids, where the real risks are, and how to set guardrails that actually stick.",
    icon: MessageCircle,
    tag: "Chatbot safety",
  },
  {
    to: "/resources/family-technology-agreements",
    title: "Writing a Family Technology Agreement That Works",
    excerpt:
      "A practical template for co-creating tech rules with your kids — built on trust, not surveillance.",
    icon: FileText,
    tag: "Family tech agreements",
  },
  {
    to: "/resources/setting-digital-boundaries",
    title: "Setting Digital Boundaries Without the Drama",
    excerpt:
      "How to introduce phone-free zones, bedtime cutoffs, and weekend resets in a way kids will actually respect.",
    icon: Compass,
    tag: "Digital boundaries",
  },
];

const tools: Article[] = [
  {
    to: "/resources/family-technology-agreement-template",
    title: "Family Technology Agreement template",
    excerpt: "A blank, customizable template you fill out together as a family.",
    icon: FileText,
    tag: "Template",
  },
  {
    to: "/resources/age-by-age-ai-conversation-guide",
    title: "Age-by-Age AI Conversation Guide",
    excerpt: "What to say about AI at every age from 5 to 17.",
    icon: MessageCircle,
    tag: "Guide",
  },
  {
    to: "/resources/chatbot-safety-checklist",
    title: "Chatbot Safety Checklist",
    excerpt: "A 15-item printable checklist for setting up any AI chatbot safely.",
    icon: ShieldCheck,
    tag: "Checklist",
  },
  {
    to: "/resources/family-digital-boundaries-planner",
    title: "Family Digital Boundaries Planner",
    excerpt: "A one-page planner for phone-free times, places, and weekend resets.",
    icon: Compass,
    tag: "Planner",
  },
  {
    to: "/resources/app-privacy-review-checklist",
    title: "App Privacy Review Checklist",
    excerpt: "The 60-second privacy check to run on any new app before your kid uses it.",
    icon: Lock,
    tag: "Checklist",
  },
];


function ResourcesIndex() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
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

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Family tech resources
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Original, practical articles to help you raise digitally healthy kids
            — written for real parents, not tech experts.
          </p>
        </div>

        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map(({ to, title, excerpt, icon: Icon, tag }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tag}
              </span>
              <h2 className="mt-1.5 text-base font-semibold text-foreground">
                {title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </section>

        <div className="mt-16 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Free family tech tools
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Printable templates, checklists, and planners — no login required.
            </p>
          </div>
          <Link to="/resources/downloads" className="text-sm font-medium text-primary hover:underline">
            View all tools →
          </Link>
        </div>
        <section className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ to, title, excerpt, icon: Icon, tag }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tag}
              </span>
              <h3 className="mt-1.5 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open tool
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </section>
      </main>


      <SiteFooter />
    </div>
  );
}
