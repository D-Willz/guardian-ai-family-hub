import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/resources/talking-to-kids-about-ai")({
  head: () => ({
    meta: [
      { title: "How Parents Can Talk to Kids About AI Safely — Guardian AI" },
      {
        name: "description",
        content:
          "An age-by-age guide for parents on how to talk to kids about AI chatbots, generative AI, and what's safe to share.",
      },
      { property: "og:title", content: "How Parents Can Talk to Kids About AI Safely" },
      {
        property: "og:description",
        content:
          "Open honest, age-appropriate conversations about AI with your kids.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://guardian-ai-family-hub.lovable.app/resources/talking-to-kids-about-ai",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://guardian-ai-family-hub.lovable.app/resources/talking-to-kids-about-ai",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="How Parents Can Talk to Kids About AI Safely">
      <p>
        AI is no longer a future technology — it's already in your child's
        homework helpers, in the chatbots embedded in their favorite apps, and
        in the recommendation engines that decide what they watch next. The
        good news: you don't need a computer-science degree to guide them.
        What kids actually need is a parent who'll talk about it with them
        openly, before something goes wrong.
      </p>
      <p>
        This guide gives you the language, examples, and conversation starters
        to do that — at any age.
      </p>

      <h2>Start with curiosity, not fear</h2>
      <p>
        If your first conversation about AI sounds like a warning, kids will
        stop telling you what they're using. Open with curiosity: "I keep
        hearing about ChatGPT — have you tried it? What's it actually good
        at?" You'll learn more in two minutes than a week of monitoring will
        ever show you.
      </p>

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
        This is the age when kids start using AI for homework, art, and
        social apps. Teach them to fact-check, and explain that AI-generated
        images, voices, and videos can look completely real. Try a hands-on
        demo: ask a chatbot a question you already know the answer to, and
        spot the mistakes together.
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

      <h2>Five things kids should never share with an AI</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Their full name, address, school, or phone number.</li>
        <li>Photos of themselves, family members, or friends.</li>
        <li>Passwords or login details — for anything, ever.</li>
        <li>Information about a friend's mental health or family situation.</li>
        <li>Anything they wouldn't want a stranger reading aloud at school.</li>
      </ol>

      <h2>Conversation starters that actually work</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>"If a chatbot told you something that scared you, would you tell me? What would make that easier?"</li>
        <li>"Have you seen anyone at school use AI in a way that felt unfair?"</li>
        <li>"Let's both ask the same AI the same question and see who gets a better answer."</li>
        <li>"What's something you'd never want an AI to know about you? Why?"</li>
      </ul>

      <h2>Watch for these warning signs</h2>
      <p>
        Sudden secrecy about a particular app, emotional attachment to a
        chatbot, withdrawal from real friends, or content (text, images,
        voices) that's clearly above your child's writing level can all
        signal it's time for a check-in. Approach it with curiosity, not
        confiscation: "Show me what you've been working on — I want to
        understand."
      </p>

      <h2>Make it a habit, not a one-time talk</h2>
      <p>
        A single big "AI talk" rarely sticks. Two-minute conversations,
        repeated over months, build the trust that keeps kids coming to you
        when something feels off. The goal isn't to scare them away from AI
        — it's to make sure you're the first person they tell when something
        about it surprises them.
      </p>
    </MarketingLayout>
  );
}
