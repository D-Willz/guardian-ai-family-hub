import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles } from "@/components/ArticleMeta";

export const Route = createFileRoute("/resources/family-digital-boundaries-planner")({
  head: () => ({
    meta: [
      { title: "Family Digital Boundaries Planner — Guardian AI" },
      {
        name: "description",
        content:
          "A one-page planner for phone-free times, places, and weekend resets that actually stick. Free, printable.",
      },
      { property: "og:title", content: "Family Digital Boundaries Planner" },
      {
        property: "og:description",
        content: "Plan the screen-free rhythms your family will actually follow.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/family-digital-boundaries-planner" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/family-digital-boundaries-planner" }],
  }),
  component: Tool,
});

function Line() {
  return <div className="not-prose h-7 rounded border-b border-dashed border-border" />;
}

function Tool() {
  return (
    <MarketingLayout title="Family Digital Boundaries Planner">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" />
      <p>
        Fill this out together. The boundaries that work are predictable,
        fair, and followed by the whole family — including the adults.
      </p>

      <h2>1. Our phone-free times</h2>
      <p>When are no screens allowed for anyone?</p>
      <Line /><Line /><Line />

      <h2>2. Our phone-free places</h2>
      <p>Where are no screens allowed?</p>
      <Line /><Line />

      <h2>3. Our bedtime cutoff</h2>
      <p>All screens off at:</p>
      <Line />
      <p>Devices charge overnight at:</p>
      <Line />

      <h2>4. Our weekend reset</h2>
      <p>One screen-light family activity each week — what and when?</p>
      <Line /><Line />

      <h2>5. What the adults will do differently</h2>
      <p>Kids follow what parents do. Pick at least two changes the adults will model first.</p>
      <Line /><Line /><Line />

      <h2>6. Our two-week trial</h2>
      <p>We'll try this rhythm for two weeks, then meet to adjust.</p>
      <p>Review date:</p>
      <Line />

      <h2>How to introduce it without drama</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Announce the changes once, calmly, before they start.</li>
        <li>Explain the why in one sentence — "sleep" is enough.</li>
        <li>Apply each rule to yourself first.</li>
        <li>Hold the line for two weeks. Most pushback fades by day 10.</li>
        <li>Review together. Adjust what isn't working.</li>
      </ol>

      <h2>Quick gut-check before adding a rule</h2>
      <p>Ask yourself: "Is this consistent, kind, and something I'm willing to follow myself?" If yes, it'll probably work.</p>

      <RelatedArticles
        links={[
          { to: "/resources/setting-digital-boundaries", title: "Setting Digital Boundaries Without the Drama" },
          { to: "/resources/healthy-screen-time-habits", title: "Healthy Screen-Time Habits for Modern Families" },
          { to: "/resources/family-technology-agreement-template", title: "Family Technology Agreement template" },
        ]}
      />
    </MarketingLayout>
  );
}
