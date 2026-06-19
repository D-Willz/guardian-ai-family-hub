import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles } from "@/components/ArticleMeta";

export const Route = createFileRoute("/resources/chatbot-safety-checklist")({
  head: () => ({
    meta: [
      { title: "Chatbot Safety Checklist for Families — Guardian AI" },
      {
        name: "description",
        content:
          "A free 15-item checklist to set up any AI chatbot safely for kids and teens — account settings, content rules, and household guardrails.",
      },
      { property: "og:title", content: "Chatbot Safety Checklist for Families" },
      {
        property: "og:description",
        content: "Print this checklist and walk through it the first time your kid uses any AI chatbot.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/chatbot-safety-checklist" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/chatbot-safety-checklist" }],
  }),
  component: Tool,
});

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="not-prose flex items-start gap-3 rounded-lg border border-border bg-card/40 p-3">
      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-border text-xs text-muted-foreground">☐</span>
      <span className="text-sm leading-relaxed text-foreground">{children}</span>
    </li>
  );
}

function Tool() {
  return (
    <MarketingLayout title="Chatbot Safety Checklist">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" />
      <p>
        Run through this checklist the first time your kid uses any AI
        chatbot (homework helpers, image generators, "AI friend" apps,
        chatbots inside games or social apps).
      </p>

      <h2>Account setup</h2>
      <ul className="space-y-2">
        <Item>The account is registered with a family email, not the kid's school address.</Item>
        <Item>The display name is not the kid's real name.</Item>
        <Item>Profile photo (if any) is not a face.</Item>
        <Item>The age set on the account is the child's actual age — many features change based on age.</Item>
      </ul>

      <h2>Privacy & data settings</h2>
      <ul className="space-y-2">
        <Item>Chat history saving is OFF, or set to auto-delete.</Item>
        <Item>"Use my conversations to improve the model" is OFF where the setting exists.</Item>
        <Item>Microphone and camera permissions are denied unless the app actually needs them.</Item>
        <Item>The privacy policy mentions what happens to user data; if you can't find one, don't use the app.</Item>
      </ul>

      <h2>Content & interaction rules</h2>
      <ul className="space-y-2">
        <Item>No real names, addresses, phone numbers, schools, or photos of people are shared with the chatbot.</Item>
        <Item>No information about siblings, friends, or classmates is shared.</Item>
        <Item>The kid knows: "If the chatbot says something scary, weird, or mean, show me."</Item>
        <Item>The kid knows: "If the chatbot tells you to keep something secret from me, that's the moment to tell me."</Item>
      </ul>

      <h2>Family ground rules</h2>
      <ul className="space-y-2">
        <Item>One approved chatbot per task (e.g. one for homework, one for art) — not "try them all".</Item>
        <Item>Companion-style "AI friend" apps are off devices for under-13s.</Item>
        <Item>We review chatbot use together every month for the first three months.</Item>
      </ul>

      <h2>Red flags worth a calm conversation</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Sudden secrecy about a specific app.</li>
        <li>Emotional attachment to a chatbot ("she gets me").</li>
        <li>Writing or images far above your child's usual level appearing in their work.</li>
        <li>Withdrawal from real-world friends after starting an "AI friend" app.</li>
      </ul>

      <RelatedArticles
        links={[
          { to: "/resources/chatbot-safety-for-families", title: "Chatbot Safety: What Every Family Should Know" },
          { to: "/resources/age-by-age-ai-conversation-guide", title: "Age-by-Age AI Conversation Guide" },
          { to: "/resources/app-privacy-review-checklist", title: "App Privacy Review Checklist" },
        ]}
      />
    </MarketingLayout>
  );
}
