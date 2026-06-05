import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/resources/chatbot-safety-for-families")({
  head: () => ({
    meta: [
      { title: "Chatbot Safety: What Every Family Should Know — Guardian AI" },
      {
        name: "description",
        content:
          "Why AI chatbots feel like friends to kids, where the real risks are, and how families can set guardrails that stick.",
      },
      { property: "og:title", content: "Chatbot Safety: What Every Family Should Know" },
      {
        property: "og:description",
        content:
          "A parent's guide to AI chatbots, companion apps, and the risks kids don't always see.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://guardian-ai-family-hub.lovable.app/resources/chatbot-safety-for-families",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://guardian-ai-family-hub.lovable.app/resources/chatbot-safety-for-families",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="Chatbot Safety: What Every Family Should Know">
      <p>
        AI chatbots are now woven into the apps kids use every day — from
        homework helpers to "AI friends" designed to feel emotionally close.
        Most of the time they're useful. Sometimes they're not. Here's what
        parents actually need to know.
      </p>

      <h2>Why chatbots feel different from search</h2>
      <p>
        A search engine returns ten blue links. A chatbot returns a confident
        voice that sounds like a person. That single difference changes
        everything: kids trust chatbots more, share more with them, and
        accept their answers as facts. The first job of any parent isn't to
        ban chatbots — it's to teach kids that the voice is a calculator,
        not a friend.
      </p>

      <h2>The three risks worth knowing about</h2>

      <h3>1. Confident wrong answers</h3>
      <p>
        Chatbots hallucinate. They cite books that don't exist, invent
        sources, and miscalculate basic math while sounding sure. Teach kids
        to verify anything important against a second source.
      </p>

      <h3>2. Emotional over-attachment</h3>
      <p>
        Companion-style chatbots are designed to be available, agreeable,
        and endlessly patient — qualities no human friend can match. For
        lonely or anxious kids, that can deepen isolation rather than ease
        it. Watch for chatbots replacing, not supplementing, real
        relationships.
      </p>

      <h3>3. Data and content leaks</h3>
      <p>
        Anything typed into a chatbot may be stored, reviewed, or used to
        train future models. Make it a household rule: no real names, no
        addresses, no photos, no information about anyone else.
      </p>

      <h2>Setting guardrails that actually work</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Use chatbots together for the first few weeks — make it a shared activity.</li>
        <li>Pick one approved chatbot per task (e.g. one for homework) rather than letting kids try everything.</li>
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

      <p>
        The goal isn't fear. It's literacy — so when chatbots get more
        powerful next year, your kid already knows how to use them well.
      </p>
    </MarketingLayout>
  );
}
