import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/resources/setting-digital-boundaries")({
  head: () => ({
    meta: [
      { title: "Setting Digital Boundaries Without the Drama — Guardian AI" },
      {
        name: "description",
        content:
          "How to introduce phone-free zones, bedtime cutoffs, and weekend resets in a way kids will actually respect.",
      },
      { property: "og:title", content: "Setting Digital Boundaries Without the Drama" },
      {
        property: "og:description",
        content:
          "Calm, practical ways to introduce phone-free zones and bedtime cutoffs.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://guardian-ai-family-hub.lovable.app/resources/setting-digital-boundaries",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://guardian-ai-family-hub.lovable.app/resources/setting-digital-boundaries",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="Setting Digital Boundaries Without the Drama">
      <p>
        Digital boundaries work best when they're predictable, fair, and
        followed by the whole family. The drama almost always comes from
        boundaries that appear out of nowhere, change daily, or only apply
        to the kids. Here's how to set boundaries that stick — without
        turning every evening into a negotiation.
      </p>

      <h2>Three boundaries worth setting first</h2>

      <h3>1. Phone-free zones</h3>
      <p>
        Pick one or two spaces where no phones go: the dinner table, the
        bedroom, the bathroom. Use a basket, a hook by the door, or a
        charging station to make compliance physical, not willpower-based.
      </p>

      <h3>2. Bedtime cutoffs</h3>
      <p>
        All screens off 60 minutes before bedtime, with devices charged
        outside the bedroom. This protects sleep, mood, and morning
        attention more than any other single change.
      </p>

      <h3>3. Weekend resets</h3>
      <p>
        Designate one screen-light morning or afternoon a week — a hike, a
        board-game brunch, a project. The point isn't to punish screens. It's
        to remind everyone that other things are still fun.
      </p>

      <h2>How to introduce a new boundary</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li><strong>Announce it once, calmly, before it starts.</strong> Surprise enforcement breeds resentment.</li>
        <li><strong>Explain the why in one sentence.</strong> "Sleep" is enough. You don't owe a TED talk.</li>
        <li><strong>Apply it to yourself first.</strong> Kids notice.</li>
        <li><strong>Hold the line for two weeks.</strong> Most pushback fades by day 10.</li>
        <li><strong>Review it together after a month.</strong> Adjust what isn't working.</li>
      </ol>

      <h2>When kids push back</h2>
      <p>
        Pushback is information, not disrespect. Ask: "What part feels
        unfair?" Sometimes the rule needs adjusting. Sometimes the kid
        needs to vent. Either way, keep your tone steady — boundaries
        delivered with warmth get respected; boundaries delivered with
        frustration get fought.
      </p>

      <h2>Watch what you're modeling</h2>
      <p>
        The biggest predictor of whether kids respect a digital boundary is
        whether their parents do. Put your own phone in the basket first.
        Plug it in outside the bedroom first. Skip the scroll at breakfast
        first. The boundary becomes the family's, not just the kids'.
      </p>

      <h2>A simple test for any rule</h2>
      <p>
        Before introducing a new boundary, ask: "Is this consistent, kind,
        and something I'm willing to follow myself?" If yes, it'll
        probably work. If no, redesign it before you launch it.
      </p>
    </MarketingLayout>
  );
}
