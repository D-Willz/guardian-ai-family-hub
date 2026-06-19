import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles, Sources } from "@/components/ArticleMeta";

export const Route = createFileRoute("/resources/setting-digital-boundaries")({
  head: () => ({
    meta: [
      { title: "Setting Digital Boundaries Without the Drama — Guardian AI" },
      {
        name: "description",
        content:
          "How to introduce phone-free zones, bedtime cutoffs, and weekend resets in a way kids will actually respect — with real scenarios, age guidance, and a step-by-step family activity.",
      },
      { property: "og:title", content: "Setting Digital Boundaries Without the Drama" },
      {
        property: "og:description",
        content: "Calm, practical ways to introduce phone-free zones and bedtime cutoffs.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/setting-digital-boundaries" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/setting-digital-boundaries" }],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="Setting Digital Boundaries Without the Drama">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" readingTime="8 min read" />

      <p>
        Digital boundaries work best when they're predictable, fair, and
        followed by the whole family. The drama almost always comes from
        boundaries that appear out of nowhere, change daily, or only apply
        to the kids. Here's how to set boundaries that stick — without
        turning every evening into a negotiation.
      </p>

      <h2>Real family scenarios</h2>
      <ul className="ml-5 list-disc space-y-2">
        <li>
          <strong>The phone at dinner.</strong> The fix isn't a lecture —
          it's a basket on the counter that everyone empties their phones
          into before sitting down. Make compliance physical.
        </li>
        <li>
          <strong>The bedtime scroll.</strong> Move chargers out of
          bedrooms for the whole household for two weeks. Sleep improves
          before any argument has to.
        </li>
        <li>
          <strong>The weekend that disappears into screens.</strong>
          Plan one screen-light activity per weekend before the weekend
          starts — a hike, a board-game brunch, a half-day project.
        </li>
      </ul>

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
        Designate one screen-light morning or afternoon a week — a hike,
        a board-game brunch, a project. The point isn't to punish
        screens. It's to remind everyone that other things are still fun.
      </p>

      <h2>Age-specific guidance</h2>
      <h3>Ages 5–9</h3>
      <p>
        Boundaries here are mostly about consistency and modeling. Kids
        this age don't argue with rhythms — they argue with surprise
        changes. Keep the rules simple, visible, and the same every day.
      </p>
      <h3>Ages 10–13</h3>
      <p>
        Co-create the boundaries. A rule the kid helped pick is a rule
        the kid will defend. Introduce phone-free zones around homework
        and sleep first.
      </p>
      <h3>Ages 14+</h3>
      <p>
        Boundaries become principles. Anchor everything to sleep,
        attention, and consent. Avoid daily fights about minutes;
        protect the three or four moments that matter most (bedtime,
        the dinner table, the morning routine).
      </p>

      <h2>A 20-minute family activity: pick three boundaries</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Each family member writes down one boundary they wish existed in the house.</li>
        <li>Read them out loud. Look for overlap.</li>
        <li>Pick the top three the whole family will commit to for two weeks.</li>
        <li>Write down exactly what each one looks like in practice (e.g. "phones in the basket from 6–7 pm").</li>
        <li>Set a calendar reminder to review in two weeks.</li>
      </ol>

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
        The biggest predictor of whether kids respect a digital boundary
        is whether their parents do. Put your own phone in the basket
        first. Plug it in outside the bedroom first. Skip the scroll at
        breakfast first. The boundary becomes the family's, not just the
        kids'.
      </p>

      <h2>FAQ</h2>
      <h3>What about emergencies — what if my kid needs me at night?</h3>
      <p>
        Most families solve this by leaving the parent's phone on
        do-not-disturb with school and family numbers whitelisted, while
        the kid's phone charges in the kitchen. Real emergencies always
        find a way through; doom-scrolling at 1 a.m. doesn't.
      </p>
      <h3>Do these boundaries work for kids with ADHD or anxiety?</h3>
      <p>
        Often even more so — predictability lowers the negotiation tax
        these kids pay all day. But for any concern that feels clinical,
        loop in a qualified professional. We're not a substitute for one.
      </p>
      <h3>How long until things calm down after introducing a new boundary?</h3>
      <p>
        In most families, the worst pushback peaks around day 3–4 and
        fades by day 10. That's why two weeks is the typical trial.
      </p>

      <RelatedArticles
        links={[
          { to: "/resources/family-digital-boundaries-planner", title: "Family Digital Boundaries Planner" },
          { to: "/resources/healthy-screen-time-habits", title: "Healthy Screen-Time Habits for Modern Families" },
          { to: "/resources/family-technology-agreements", title: "Writing a Family Technology Agreement That Works" },
        ]}
      />

      <Sources
        items={[
          {
            title: "Family Media Plan",
            publisher: "American Academy of Pediatrics (HealthyChildren.org)",
            url: "https://www.healthychildren.org/English/fmp/Pages/MediaPlan.aspx",
          },
          {
            title: "Healthy screen-time tips for families",
            publisher: "U.S. Centers for Disease Control and Prevention",
            url: "https://www.cdc.gov/nccdphp/dnpao/multimedia/infographics/getmoving.html",
          },
          {
            title: "Screen time and children's sleep",
            publisher: "Sleep Foundation",
            url: "https://www.sleepfoundation.org/children-and-sleep/screen-time-and-childrens-sleep",
          },
        ]}
      />
    </MarketingLayout>
  );
}
