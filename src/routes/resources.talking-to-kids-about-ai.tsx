import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles, Sources } from "@/components/ArticleMeta";

export const Route = createFileRoute("/resources/talking-to-kids-about-ai")({
  head: () => ({
    meta: [
      { title: "How Parents Can Talk to Kids About AI Safely — Guardian AI" },
      {
        name: "description",
        content:
          "An age-by-age guide for parents on talking to kids about AI chatbots, generative AI, and what's safe to share — with real family scenarios and a step-by-step activity.",
      },
      { property: "og:title", content: "How Parents Can Talk to Kids About AI Safely" },
      {
        property: "og:description",
        content: "Open honest, age-appropriate conversations about AI with your kids.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/talking-to-kids-about-ai" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/talking-to-kids-about-ai" }],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="How Parents Can Talk to Kids About AI Safely">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" readingTime="9 min read" />

      <p>
        AI is no longer a future technology — it's already in your child's
        homework helpers, in the chatbots embedded in their favorite apps,
        and in the recommendation engines that decide what they watch next.
        The good news: you don't need a computer-science degree to guide
        them. What kids actually need is a parent who'll talk about it with
        them openly, before something goes wrong.
      </p>

      <h2>Start with curiosity, not fear</h2>
      <p>
        If your first conversation about AI sounds like a warning, kids
        will stop telling you what they're using. Open with curiosity:
        "I keep hearing about ChatGPT — have you tried it? What's it
        actually good at?" You'll learn more in two minutes than a week of
        monitoring will ever show you.
      </p>

      <h2>A few real family scenarios</h2>
      <p>
        These come up in almost every family I talk to. Use them as
        rehearsals before the moment shows up at home.
      </p>
      <ul className="ml-5 list-disc space-y-2">
        <li>
          <strong>"The chatbot helped me write my essay."</strong> Don't
          start with discipline. Ask: "Walk me through how you used it —
          what parts are yours, what parts are its?" Then connect the
          answer to the teacher's rules and your family's rules.
        </li>
        <li>
          <strong>"My friends are sending each other AI-generated
          photos."</strong> The conversation isn't about the app — it's
          about consent. Even silly edits of a real classmate's face cause
          real harm and, in many places, real legal trouble.
        </li>
        <li>
          <strong>"This AI knows me better than my friends."</strong> Take
          it seriously. Companion-style chatbots are engineered to be
          agreeable. Acknowledge the feeling, then talk about what real
          friendship gives them that an AI can't.
        </li>
      </ul>

      <h2>What to cover by age</h2>

      <h3>Ages 5–8: AI is a tool, not a person</h3>
      <p>
        Young kids personify everything. They'll assume a chatbot has
        feelings, knows them, and is always right. Keep it simple:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li>"It's a very fast guessing machine, not a friend."</li>
        <li>"It can be wrong, even when it sounds sure."</li>
        <li>"Never tell it your name, address, or where you go to school."</li>
      </ul>

      <h3>Ages 9–12: AI can make mistakes — and so can the people using it</h3>
      <p>
        This is when kids start using AI for homework, art, and social
        apps. Teach them to fact-check, and explain that AI-generated
        images, voices, and videos can look completely real. Try a
        hands-on demo: ask a chatbot a question you already know the
        answer to, and spot the mistakes together.
      </p>

      <h3>Ages 13+: AI, identity, and pressure</h3>
      <p>
        Teens face newer risks: AI "companion" apps that feel emotionally
        intimate, deepfake images shared in group chats, and pressure to
        outsource thinking. Talk about:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li>How AI companions are designed to keep them engaged, not to care.</li>
        <li>Why running their photos or classmates' photos through AI tools can cause real harm.</li>
        <li>When using AI is honest help (brainstorming) vs. cheating (submitting AI work as their own).</li>
      </ul>

      <h2>A 20-minute family activity: the "Spot the Mistake" experiment</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Sit down with your kid and one device, side by side.</li>
        <li>Pick a chatbot the family already uses.</li>
        <li>Each person types one question they already know the answer to (history, a family fact, a sports stat).</li>
        <li>Read the answers together. Mark what's right, what's wrong, and what's "sounds right but is actually guessing".</li>
        <li>Pick one rule to add to your house — something like "always verify a fact before using it for school".</li>
        <li>Put the rule on the fridge. Revisit in a month.</li>
      </ol>
      <p>
        The point isn't to "win" against the chatbot. It's to teach your
        kid that the chatbot can sound confident and still be wrong —
        and that they have the tools to notice.
      </p>

      <h2>Five things kids should never share with an AI</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Their full name, address, school, or phone number.</li>
        <li>Photos of themselves, family members, or friends.</li>
        <li>Passwords or login details — for anything, ever.</li>
        <li>Information about a friend's mental health or family situation.</li>
        <li>Anything they wouldn't want a stranger reading aloud at school.</li>
      </ol>

      <h2>FAQ</h2>
      <h3>What age should kids start using AI chatbots?</h3>
      <p>
        There is no single right age. Most major chatbots set their
        minimum at 13. Below that, use chatbots with your child, not
        instead of them. Above 13, focus on shared rules and regular
        check-ins, not blanket bans.
      </p>
      <h3>Are "AI friend" apps safe for kids?</h3>
      <p>
        Companion-style apps designed to feel like a friend are best kept
        off devices for under-13s, and approached cautiously for teens.
        They are engineered to maximize engagement, which is not the same
        as serving your child's well-being.
      </p>
      <h3>How often should we talk about AI?</h3>
      <p>
        Short, frequent conversations beat one big talk. Aim for a
        two-minute check-in once a week, usually when something AI-related
        comes up naturally (homework, a new app, a news headline).
      </p>

      <RelatedArticles
        links={[
          { to: "/resources/chatbot-safety-for-families", title: "Chatbot Safety: What Every Family Should Know" },
          { to: "/resources/age-by-age-ai-conversation-guide", title: "Age-by-Age AI Conversation Guide" },
          { to: "/resources/teaching-kids-online-privacy", title: "How to Teach Kids Online Privacy" },
        ]}
      />

      <Sources
        items={[
          {
            title: "How to talk to your kids about AI",
            publisher: "Common Sense Media",
            url: "https://www.commonsensemedia.org/articles/parents-ultimate-guide-to-generative-ai",
          },
          {
            title: "Generative AI: What parents need to know",
            publisher: "Common Sense Education",
            url: "https://www.commonsense.org/education/articles/chatgpt-and-beyond-how-to-handle-ai-in-schools",
          },
          {
            title: "Beyond Screen Time: A Parent's Guide to the Digital World",
            publisher: "American Academy of Pediatrics (HealthyChildren.org)",
            url: "https://www.healthychildren.org/English/family-life/Media/Pages/default.aspx",
          },
        ]}
      />
    </MarketingLayout>
  );
}
