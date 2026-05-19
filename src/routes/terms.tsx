import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Guardian AI" },
      {
        name: "description",
        content:
          "The simple terms that cover how Guardian AI is provided and how it should be used.",
      },
      { property: "og:title", content: "Terms of Service — Guardian AI" },
      {
        property: "og:description",
        content: "The simple terms for using Guardian AI.",
      },
    ],
    links: [{ rel: "canonical", href: "https://guardian-ai-family-hub.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <MarketingLayout title="Terms of Service">
      <p>
        Welcome to Guardian AI. By using the app, you agree to these simple
        terms. We've kept them short and human.
      </p>

      <h2>The service is provided as-is</h2>
      <p>
        Guardian AI is offered on an "as-is" and "as-available" basis. While we
        work hard to make the product reliable and helpful, we don't make
        guarantees that it will be uninterrupted, error-free, or perfectly
        accurate. The insights and reports we generate are meant to support
        your parenting — not replace your judgment.
      </p>

      <h2>You're in charge of how you use it</h2>
      <p>
        As a parent or guardian, you are responsible for how you use the
        monitoring and reporting features. Guardian AI is designed to encourage
        trust and conversation in your family. Please use it kindly, with your
        child's wellbeing in mind, and in line with the laws that apply where
        you live.
      </p>

      <h2>Changes to the service</h2>
      <p>
        We may update, improve, or change parts of the service over time —
        including features, pricing, and these terms. When we make a meaningful
        change, we'll do our best to let you know in advance.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, reach out at{" "}
        <a href="mailto:support@guardianai.app">support@guardianai.app</a>.
      </p>

      <p className="text-xs text-muted-foreground/80">
        Last updated: May 2026.
      </p>
    </MarketingLayout>
  );
}
