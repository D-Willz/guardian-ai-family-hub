import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles } from "@/components/ArticleMeta";
import { PrintButton } from "@/components/PrintButton";

export const Route = createFileRoute("/resources/app-privacy-review-checklist")({
  head: () => ({
    meta: [
      { title: "App Privacy Review Checklist — Guardian AI" },
      {
        name: "description",
        content:
          "The 60-second privacy check to run on any new app before your kid uses it. Free, printable.",
      },
      { property: "og:title", content: "App Privacy Review Checklist" },
      {
        property: "og:description",
        content: "A 60-second checklist to run on any new app before your kid uses it.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/app-privacy-review-checklist" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/app-privacy-review-checklist" }],
  }),
  component: Tool,
});

function Box({ children }: { children: React.ReactNode }) {
  return (
    <li className="not-prose flex items-start gap-3 rounded-lg border border-border bg-card/40 p-3">
      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-border text-xs text-muted-foreground">☐</span>
      <span className="text-sm leading-relaxed text-foreground">{children}</span>
    </li>
  );
}

function Tool() {
  return (
    <MarketingLayout title="App Privacy Review Checklist">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" />
      <PrintButton />
      <p>
        Run this checklist the first time your kid installs any new app.
        With practice it takes 60 seconds — and it catches most of the
        problems that bite families later.
      </p>

      <h2>Before installing</h2>
      <ul className="space-y-2">
        <Box>Read the age rating in the app store — and look up real reviews from parents (not the app store stars).</Box>
        <Box>Find the privacy policy. If it doesn't have one or you can't load it, don't install.</Box>
        <Box>Check the app store's "Data the app collects" section. Anything that surprises you is worth a question.</Box>
        <Box>Search the app name plus "kids" or "controversy" to see recent news.</Box>
      </ul>

      <h2>During first launch</h2>
      <ul className="space-y-2">
        <Box>Set the account to PRIVATE by default.</Box>
        <Box>Turn off location sharing.</Box>
        <Box>Turn off contact syncing.</Box>
        <Box>Deny camera and microphone access unless the app's core feature needs them.</Box>
        <Box>Deny notifications, then re-enable only what's truly useful.</Box>
        <Box>Use a username that doesn't include your kid's real name, school, or birth year.</Box>
        <Box>Profile photo is not a clear face shot.</Box>
      </ul>

      <h2>Inside the app</h2>
      <ul className="space-y-2">
        <Box>Find any "Who can message me" setting — set to friends only (or off).</Box>
        <Box>Find any "Suggest me to others" setting — turn it off.</Box>
        <Box>Find any "Personalised ads" setting — turn it off.</Box>
        <Box>Find any "Use my data to train AI" setting — turn it off.</Box>
        <Box>Look for an in-app chat or DMs. Decide together whether it stays on.</Box>
      </ul>

      <h2>Family agreements</h2>
      <ul className="space-y-2">
        <Box>The kid knows what to do if a stranger messages them (don't reply, screenshot, show a parent).</Box>
        <Box>The app is on the home screen, not hidden in a folder.</Box>
        <Box>You'll do a follow-up check together after two weeks.</Box>
      </ul>

      <h2>If anything on this list isn't possible</h2>
      <p>
        If you can't lock down basic privacy settings, the app may not be
        designed for kids at all. That's a strong signal to skip it and
        look for an alternative.
      </p>

      <RelatedArticles
        links={[
          { to: "/resources/teaching-kids-online-privacy", title: "How to Teach Kids Online Privacy" },
          { to: "/resources/chatbot-safety-checklist", title: "Chatbot Safety Checklist" },
          { to: "/resources/family-technology-agreement-template", title: "Family Technology Agreement template" },
        ]}
      />
    </MarketingLayout>
  );
}
