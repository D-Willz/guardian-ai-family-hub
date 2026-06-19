import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles, Sources } from "@/components/ArticleMeta";

export const Route = createFileRoute("/resources/chatbot-safety-for-families")({
  head: () => ({
    meta: [
      { title: "Chatbot Safety: What Every Family Should Know — Guardian AI" },
      {
        name: "description",
        content:
          "Why AI chatbots feel like friends to kids, where the real risks are, and how families can set guardrails that stick — with age guidance, a family activity, and an FAQ.",
      },
      { property: "og:title", content: "Chatbot Safety: What Every Family Should Know" },
      {
        property: "og:description",
        content: "A parent's guide to AI chatbots, companion apps, and the risks kids don't always see.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/chatbot-safety-for-families" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/chatbot-safety-for-families" }],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="Chatbot Safety: What Every Family Should Know">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" readingTime="8 min read" />

      <p>
        AI chatbots are now woven into the apps kids use every day — from
        homework helpers to "AI friends" designed to feel emotionally
        close. Most of the time they're useful. Sometimes they're not.
        Here's what parents actually need to know.
      </p>

      <h2>Why chatbots feel different from search</h2>
      <p>
        A search engine returns ten blue links. A chatbot returns a
        confident voice that sounds like a person. That single difference
        changes everything: kids trust chatbots more, share more with
        them, and accept their answers as facts. The first job of any
        parent isn't to ban chatbots — it's to teach kids that the voice
        is a calculator, not a friend.
      </p>

      <h2>Real family scenarios</h2>
      <ul className="ml-5 list-disc space-y-2">
        <li>
          <strong>"It's nicer to me than my real friends."</strong>{" "}
          Believe them — and take it seriously. Don't mock the feeling.
          Talk about what real friendship gives them that an AI never
          will, and watch for withdrawal from real-world relationships.
        </li>
        <li>
          <strong>"The chatbot told me to keep this private from
          you."</strong> That is a hard stop. Any app that asks a kid to
          keep secrets from a parent loses its spot on the device.
        </li>
        <li>
          <strong>"The chatbot said something wrong on my homework."</strong>
          Great teaching moment. Show your kid how to verify a claim
          against a textbook, a teacher, or two independent sources.
        </li>
      </ul>

      <h2>The three risks worth knowing about</h2>

      <h3>1. Confident wrong answers</h3>
      <p>
        Chatbots can produce convincing answers that aren't true — sometimes
        called "hallucinations". They may cite books that don't exist,
        invent sources, or miscalculate basic math while sounding sure.
        Teach kids to verify anything important against a second source.
      </p>

      <h3>2. Emotional over-attachment</h3>
      <p>
        Companion-style chatbots are designed to be available, agreeable,
        and endlessly patient — qualities no human friend can match. For
        lonely or anxious kids, that can deepen isolation rather than
        ease it. Watch for chatbots replacing, not supplementing, real
        relationships.
      </p>

      <h3>3. Data and content leaks</h3>
      <p>
        Anything typed into a chatbot may be stored, reviewed, or used to
        train future models. Make it a household rule: no real names, no
        addresses, no photos, no information about anyone else.
      </p>

      <h2>Age-specific guidance</h2>

      <h3>Under 10</h3>
      <p>
        Use chatbots together, not alone. Keep companion-style "AI
        friend" apps off devices entirely. Frame chatbots as "a fast
        guessing machine" — not "someone you can talk to".
      </p>

      <h3>Ages 10–13</h3>
      <p>
        Pick one approved chatbot per task. Turn off chat history and
        any "train on my conversations" setting. Keep companion apps off
        the device. Do a monthly check-in for the first six months.
      </p>

      <h3>Ages 14+</h3>
      <p>
        Talk about consent, deepfakes, and emotional manipulation
        openly. Make the "no trouble for telling me" rule explicit —
        teens are the ones most likely to encounter, and feel ashamed
        about, a chatbot interaction that goes wrong.
      </p>

      <h2>A 20-minute family activity: set up one chatbot together</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Pick one chatbot your kid wants to use (or already uses).</li>
        <li>Open the settings together. Turn OFF chat history saving.</li>
        <li>Find the "use my conversations for training" toggle. Turn it OFF.</li>
        <li>Review microphone and camera permissions. Deny anything not essential.</li>
        <li>Agree on three things that will never be typed in: real name, address, school.</li>
        <li>Agree on what to do if a conversation gets weird: screenshot and show a parent. No trouble.</li>
      </ol>

      <h2>Setting guardrails that actually work</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Use chatbots together for the first few weeks — make it a shared activity.</li>
        <li>Pick one approved chatbot per task.</li>
        <li>Turn off chat history and training where the setting exists.</li>
        <li>Keep companion-style "AI friend" apps off devices for under-13s.</li>
        <li>Revisit the rules every few months — these apps change fast.</li>
      </ul>

      <h2>Conversation starters</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>"What's the weirdest answer a chatbot ever gave you?"</li>
        <li>"If a chatbot said something that hurt your feelings, would you tell me?"</li>
        <li>"What would you never want a chatbot to know about you?"</li>
      </ul>

      <h2>FAQ</h2>
      <h3>Are AI chatbots safe for kids?</h3>
      <p>
        It depends on the chatbot, the age, and the rules around it.
        General-purpose homework chatbots with the right settings can be
        useful for tweens and older. Companion-style "AI friend" apps
        are best avoided for kids and approached with caution for teens.
      </p>
      <h3>What if my kid lies about which chatbots they use?</h3>
      <p>
        Treat it as a sign the conversation isn't open enough yet —
        not just a discipline issue. Reset the rules together, restate
        the "no trouble for telling me" rule, and rebuild trust slowly.
      </p>
      <h3>How do I know if a chatbot is appropriate?</h3>
      <p>
        Check the age rating, read the privacy policy, search recent
        news with the chatbot's name plus "kids" or "controversy", and
        try the chatbot yourself for ten minutes before your kid does.
      </p>

      <RelatedArticles
        links={[
          { to: "/resources/chatbot-safety-checklist", title: "Chatbot Safety Checklist" },
          { to: "/resources/age-by-age-ai-conversation-guide", title: "Age-by-Age AI Conversation Guide" },
          { to: "/resources/talking-to-kids-about-ai", title: "How Parents Can Talk to Kids About AI Safely" },
        ]}
      />

      <Sources
        items={[
          {
            title: "Parents' Ultimate Guide to AI Chatbots",
            publisher: "Common Sense Media",
            url: "https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-chatgpt",
          },
          {
            title: "Talking to your kids about AI companions",
            publisher: "Common Sense Media",
            url: "https://www.commonsensemedia.org/ai-ratings",
          },
          {
            title: "How parents can talk to teens about technology and well-being",
            publisher: "American Psychological Association",
            url: "https://www.apa.org/topics/social-media-internet/health-advisory-adolescent-social-media-use",
          },
        ]}
      />
    </MarketingLayout>
  );
}
