import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles } from "@/components/ArticleMeta";
import { PrintButton } from "@/components/PrintButton";

export const Route = createFileRoute("/resources/family-technology-agreement-template")({
  head: () => ({
    meta: [
      { title: "Family Technology Agreement Template (Free) — Guardian AI" },
      {
        name: "description",
        content:
          "A free, printable family technology agreement template you fill out together. Built on trust, not surveillance.",
      },
      { property: "og:title", content: "Family Technology Agreement Template" },
      {
        property: "og:description",
        content: "A blank, customizable family tech agreement you complete together.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/family-technology-agreement-template" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/family-technology-agreement-template" }],
  }),
  component: Tool,
});

function Field({ label, lines = 2 }: { label: string; lines?: number }) {
  return (
    <div className="not-prose">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="mt-1 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-7 rounded border-b border-dashed border-border" />
        ))}
      </div>
    </div>
  );
}

function Tool() {
  return (
    <MarketingLayout title="Family Technology Agreement template">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" readingTime="Print in 1 page" />
      <PrintButton />
      <p>
        Print this page or copy the headings into a shared document. Fill it
        out <em>together</em> — every section should reflect what the whole
        family agreed to, including the adults. Revisit it every six months.
      </p>

      <h2>1. Who's signing this agreement</h2>
      <Field label="Family members participating:" lines={3} />

      <h2>2. Device-free times</h2>
      <p>When are no screens allowed for anyone in the house?</p>
      <Field label="Examples: mornings before school, dinner, 60 min before bed." lines={3} />

      <h2>3. Device-free places</h2>
      <Field label="Examples: bedrooms, bathrooms, dinner table." lines={3} />

      <h2>4. What needs a parent's okay before doing it</h2>
      <Field label="Examples: installing a new app, in-app purchases, sharing a phone number." lines={4} />

      <h2>5. What we never post publicly</h2>
      <Field label="Examples: other people without permission, location tags, school name." lines={3} />

      <h2>6. How we ask for help when something goes wrong</h2>
      <p>
        The "no-trouble rule": if you tell a parent within 24 hours of any
        mistake, consequences pause and we figure it out together.
      </p>
      <Field label="Who you'll tell, and how:" lines={2} />

      <h2>7. What the parents agree to</h2>
      <Field label="Examples: knock before entering, model the same rules, no snooping without cause." lines={4} />

      <h2>8. When we'll review this agreement</h2>
      <Field label="Date of next review:" lines={1} />

      <h2>9. Signatures</h2>
      <Field label="Everyone signs (including the adults):" lines={4} />

      <h2>How to fill this out in one evening</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Block out 30 quiet minutes with no phones in the room.</li>
        <li>Each person lists their top 3 wishes for the agreement.</li>
        <li>Find the overlap. Negotiate the rest. Write it up together.</li>
        <li>Everyone signs. Stick it on the fridge.</li>
      </ol>

      <RelatedArticles
        links={[
          { to: "/resources/family-technology-agreements", title: "Writing a Family Technology Agreement That Works" },
          { to: "/resources/setting-digital-boundaries", title: "Setting Digital Boundaries Without the Drama" },
          { to: "/resources/family-digital-boundaries-planner", title: "Family Digital Boundaries Planner" },
        ]}
      />
    </MarketingLayout>
  );
}
