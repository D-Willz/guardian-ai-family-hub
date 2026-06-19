import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, MessageCircle, ShieldCheck, Compass, Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/resources/downloads")({
  head: () => ({
    meta: [
      { title: "Free Family Tech Tools & Templates — Guardian AI" },
      {
        name: "description",
        content:
          "Free, printable family tech tools from Guardian AI: a family technology agreement template, an age-by-age AI conversation guide, a chatbot safety checklist, a digital boundaries planner, and an app privacy review checklist.",
      },
      { property: "og:title", content: "Free Family Tech Tools & Templates" },
      {
        property: "og:description",
        content: "Five free, printable tools to help families talk about technology together.",
      },
      { property: "og:url", content: "https://www.myguardianai.app/resources/downloads" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/downloads" }],
  }),
  component: DownloadsPage,
});

const tools = [
  {
    to: "/resources/family-technology-agreement-template",
    title: "Family Technology Agreement template",
    excerpt: "A blank, customizable template you fill out together as a family — built on trust, not surveillance.",
    icon: FileText,
  },
  {
    to: "/resources/age-by-age-ai-conversation-guide",
    title: "Age-by-Age AI Conversation Guide",
    excerpt: "What to say about AI, chatbots, and generative tools at every age from 5 to 17.",
    icon: MessageCircle,
  },
  {
    to: "/resources/chatbot-safety-checklist",
    title: "Chatbot Safety Checklist",
    excerpt: "A 15-item printable checklist to set up any AI chatbot safely for kids and teens.",
    icon: ShieldCheck,
  },
  {
    to: "/resources/family-digital-boundaries-planner",
    title: "Family Digital Boundaries Planner",
    excerpt: "A one-page planner for phone-free times, places, and weekend resets that actually stick.",
    icon: Compass,
  },
  {
    to: "/resources/app-privacy-review-checklist",
    title: "App Privacy Review Checklist",
    excerpt: "The 60-second privacy check to run on any new app before your kid uses it.",
    icon: Lock,
  },
];

function DownloadsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">Guardian AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/auth"><Button variant="ghost" size="sm">Sign in</Button></Link>
          <Link to="/auth" search={{ mode: "signup" }}><Button size="sm">Get started</Button></Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Free family tech tools
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Printable, no-login templates and checklists you can use with your
            family tonight. Designed to spark conversation — not replace it.
          </p>
        </div>
        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ to, title, excerpt, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-base font-semibold text-foreground">{title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
