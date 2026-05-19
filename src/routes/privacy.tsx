import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Guardian AI" },
      {
        name: "description",
        content:
          "How Guardian AI collects, stores, and protects the small amount of data families share with us.",
      },
      { property: "og:title", content: "Privacy Policy — Guardian AI" },
      {
        property: "og:description",
        content: "How Guardian AI handles family data — clearly and simply.",
      },
    ],
    links: [{ rel: "canonical", href: "https://guardian-ai-family-hub.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <MarketingLayout title="Privacy Policy">
      <p>
        Guardian AI is built for parents who care about their family's digital
        wellbeing. We collect as little information as possible, and we treat
        what we do collect with care.
      </p>

      <h2>What we collect</h2>
      <p>
        We only collect what we need to make the product work for you:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Your email address (used to sign in and to contact you).</li>
        <li>Your child's first name and age (so reports feel personal).</li>
        <li>The settings and screen-time agreements you create inside the app.</li>
      </ul>
      <p>
        We do not collect your child's last name, contact information, photos,
        or messages.
      </p>

      <h2>How we store it</h2>
      <p>
        Your data is stored securely with Supabase, our backend infrastructure
        provider. Access is protected by row-level security so each parent can
        only see their own family's information.
      </p>

      <h2>What we don't do</h2>
      <p>
        We do not sell your data. We do not share it with advertisers. We do
        not share it with third parties for marketing purposes.
      </p>

      <h2>Deleting your data</h2>
      <p>
        You can request deletion of your account and all associated data at any
        time by emailing{" "}
        <a href="mailto:support@guardianai.app">support@guardianai.app</a>.
        We'll confirm within a few business days.
      </p>

      <h2>A note about children</h2>
      <p>
        Guardian AI is intended for use by parents and guardians only. Children
        do not sign in or interact with the app directly. The information you
        share about your child is kept minimal and anonymized wherever possible
        — only what's needed to give you helpful, gentle insights.
      </p>

      <p className="text-xs text-muted-foreground/80">
        Last updated: May 2026.
      </p>
    </MarketingLayout>
  );
}
