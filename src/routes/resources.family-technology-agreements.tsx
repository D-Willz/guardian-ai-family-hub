import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles, Sources } from "@/components/ArticleMeta";

export const Route = createFileRoute("/resources/family-technology-agreements")({
  head: () => ({
    meta: [
      { title: "Writing a Family Technology Agreement That Works — Guardian AI" },
      {
        name: "description",
        content:
          "A practical template for co-creating tech rules with your kids — with family scenarios, age guidance, a step-by-step writing activity, and an FAQ.",
      },
      { property: "og:title", content: "Writing a Family Technology Agreement That Works" },
      {
        property: "og:description",
        content: "Co-create tech rules your kids will actually follow, with a simple, repeatable template.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/family-technology-agreements" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/family-technology-agreements" }],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="Writing a Family Technology Agreement That Works">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" readingTime="7 min read" />

      <p>
        A family tech agreement isn't a contract for kids to obey — it's
        a shared document you write together. Done well, it cuts daily
        screen-time fights, builds trust, and gives everyone (including
        parents) a clear, fair set of expectations.
      </p>

      <h2>Why co-creation matters</h2>
      <p>
        Rules handed down from above get tested, ignored, or worked
        around. Rules a kid helped write get defended — even by the kid.
        The agreement is the artifact; the conversation that creates it
        is the real win.
      </p>

      <h2>Real family scenarios</h2>
      <ul className="ml-5 list-disc space-y-2">
        <li>
          <strong>The first phone.</strong> A new phone is the perfect
          moment to write the agreement — the kid is motivated, the rules
          are fresh, and the trust is at its peak. Don't wait six months.
        </li>
        <li>
          <strong>The blended family.</strong> Two homes, two sets of
          rules. Write one agreement that travels with the kid. The
          consistency matters more than which exact rules you choose.
        </li>
        <li>
          <strong>The teen who already has a phone.</strong> Don't impose
          an agreement from nowhere. Invite a conversation: "We've never
          actually written down our rules — can we do it together?"
        </li>
      </ul>

      <h2>What to include</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li><strong>Device-free times.</strong> Meals, mornings, the hour before bed.</li>
        <li><strong>Device-free places.</strong> Bedrooms, bathrooms, the dinner table, the car for short trips.</li>
        <li><strong>What gets posted publicly.</strong> Photos of others, location tags, school name.</li>
        <li><strong>What needs a parent's okay.</strong> New apps, in-app purchases, sharing a phone number.</li>
        <li><strong>How to ask for help.</strong> The "no-trouble" rule: tell a parent within 24 hours of any mistake, and the consequences are paused.</li>
        <li><strong>What parents agree to.</strong> Knock before entering, no snooping without cause, model the same rules.</li>
        <li><strong>When you'll review it.</strong> Every six months, or whenever someone gets a new device.</li>
      </ol>

      <h2>Age-specific guidance</h2>
      <h3>Ages 6–9</h3>
      <p>
        Keep it short — five or six bullet points the kid can read out
        loud. Focus on places (bedroom, dinner table) and on the
        "tell-a-grown-up" rule.
      </p>
      <h3>Ages 10–13</h3>
      <p>
        Add app-specific rules: which apps need permission, what's
        public vs. private, who can DM them. Give them real input — and
        write down what the parents will do too.
      </p>
      <h3>Ages 14+</h3>
      <p>
        Treat it as a negotiation between near-equals. Teens are months
        from being adults — agreements at this age should focus on
        principles (consent, honesty, sleep) more than minute rules.
      </p>

      <h2>A 30-minute family activity: write the agreement</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Block out 30 quiet minutes. No phones in the room.</li>
        <li>Each person lists their top 3 things they want from the agreement.</li>
        <li>Find overlap. Negotiate the rest. Write the final list together.</li>
        <li>Read it out loud. Adjust anything that sounds off.</li>
        <li>Everyone signs (yes, including parents). Stick it on the fridge.</li>
        <li>Put the next review date on the family calendar.</li>
      </ol>

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

      <h2>FAQ</h2>
      <h3>What if my kid refuses to sign?</h3>
      <p>
        Refusal is information. Ask which part feels unfair, then revise.
        An unsigned agreement that gets discussed is more useful than a
        signed one no one believes in.
      </p>
      <h3>How often should we update it?</h3>
      <p>
        Every six months, plus whenever a device, school, or major
        platform changes.
      </p>
      <h3>What if a parent breaks a rule?</h3>
      <p>
        Name it out loud and apologize. Modeling repair teaches kids more
        about responsibility than a clean record ever would.
      </p>

      <RelatedArticles
        links={[
          { to: "/resources/family-technology-agreement-template", title: "Family Technology Agreement template" },
          { to: "/resources/setting-digital-boundaries", title: "Setting Digital Boundaries Without the Drama" },
          { to: "/resources/family-digital-boundaries-planner", title: "Family Digital Boundaries Planner" },
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
            title: "Family Media Agreement",
            publisher: "Common Sense Media",
            url: "https://www.commonsensemedia.org/family-media-agreement",
          },
        ]}
      />
    </MarketingLayout>
  );
}
