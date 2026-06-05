import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/resources/family-technology-agreements")({
  head: () => ({
    meta: [
      { title: "Writing a Family Technology Agreement That Works — Guardian AI" },
      {
        name: "description",
        content:
          "A practical template for co-creating tech rules with your kids — built on trust, not surveillance.",
      },
      { property: "og:title", content: "Writing a Family Technology Agreement That Works" },
      {
        property: "og:description",
        content:
          "Co-create tech rules your kids will actually follow, with a simple, repeatable template.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://guardian-ai-family-hub.lovable.app/resources/family-technology-agreements",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://guardian-ai-family-hub.lovable.app/resources/family-technology-agreements",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="Writing a Family Technology Agreement That Works">
      <p>
        A family tech agreement isn't a contract for kids to obey — it's a
        shared document you write together. Done well, it cuts daily
        screen-time fights, builds trust, and gives everyone (including
        parents) a clear, fair set of expectations.
      </p>

      <h2>Why co-creation matters</h2>
      <p>
        Rules handed down from above get tested, ignored, or worked around.
        Rules a kid helped write get defended — even by the kid. The
        agreement is the artifact; the conversation that creates it is the
        real win.
      </p>

      <h2>What to include</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li><strong>Device-free times.</strong> Meals, mornings, the hour before bed.</li>
        <li><strong>Device-free places.</strong> Bedrooms, bathrooms, the dinner table, the car (for short trips).</li>
        <li><strong>What gets posted publicly.</strong> Photos of others, location tags, school name.</li>
        <li><strong>What needs a parent's okay.</strong> New apps, in-app purchases, sharing a phone number.</li>
        <li><strong>How to ask for help.</strong> The "no-trouble" rule: tell a parent within 24 hours of any mistake, and the consequences are paused.</li>
        <li><strong>What parents agree to.</strong> Knock before entering, no snooping without cause, model the same rules.</li>
        <li><strong>When you'll review it.</strong> Every 6 months, or whenever someone gets a new device.</li>
      </ol>

      <h2>How to write it in one evening</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Block out 30 quiet minutes. No phones in the room.</li>
        <li>Each person lists their top 3 things they want from the agreement.</li>
        <li>Find overlap. Negotiate the rest. Write the final list together.</li>
        <li>Everyone signs (yes, including parents). Stick it on the fridge.</li>
      </ul>

      <h2>What makes an agreement fail</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>It's a parent's wish list with the kid's name added.</li>
        <li>Parents don't follow the same rules they're asking kids to follow.</li>
        <li>Consequences are vague, dramatic, or change every time.</li>
        <li>It's never revisited, so it stops matching real life.</li>
      </ul>

      <h2>Keep it alive</h2>
      <p>
        A tech agreement is a living document. Phones change, schools
        change, friendships change. A 15-minute check-in twice a year is
        enough to keep it relevant — and to keep the conversation about
        technology going.
      </p>
    </MarketingLayout>
  );
}
