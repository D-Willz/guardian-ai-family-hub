import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Guardian AI" },
      {
        name: "description",
        content:
          "Guardian AI is a warm, AI-powered companion for parents raising kids in a digital world.",
      },
      { property: "og:title", content: "About — Guardian AI" },
      {
        property: "og:description",
        content:
          "Meet Guardian AI — a supportive companion for modern parents.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MarketingLayout title="About Guardian AI">
      <p>
        Guardian AI is a gentle, AI-powered companion for parents raising kids
        in a digital world. Instead of cold dashboards and silent surveillance,
        we focus on weekly wellness reports, shared screen-time agreements, and
        warm conversation starters that help families talk about technology
        together.
      </p>

      <p>
        It's built for parents and guardians of children and teens who want a
        calmer, more thoughtful approach to screen time — one that builds
        trust rather than tension.
      </p>

      <h2>Get in touch</h2>
      <p>
        We'd love to hear from you. Reach the team any time at{" "}
        <a href="mailto:hello@guardianai.app">hello@guardianai.app</a>.
      </p>
    </MarketingLayout>
  );
}
