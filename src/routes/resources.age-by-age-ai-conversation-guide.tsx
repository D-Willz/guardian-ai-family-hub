import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles } from "@/components/ArticleMeta";
import { PrintButton } from "@/components/PrintButton";

export const Route = createFileRoute("/resources/age-by-age-ai-conversation-guide")({
  head: () => ({
    meta: [
      { title: "Age-by-Age AI Conversation Guide — Guardian AI" },
      {
        name: "description",
        content:
          "What to say about AI, chatbots, and generative tools at every age from 5 to 17. A free guide for parents.",
      },
      { property: "og:title", content: "Age-by-Age AI Conversation Guide" },
      {
        property: "og:description",
        content: "Age-appropriate language and prompts for talking to kids about AI at every stage.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/age-by-age-ai-conversation-guide" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/age-by-age-ai-conversation-guide" }],
  }),
  component: Tool,
});

function Tool() {
  return (
    <MarketingLayout title="Age-by-Age AI Conversation Guide">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" />
      <PrintButton />
      <p>
        A practical guide for what to say about AI at every age — and what
        questions to ask. Pick the section that matches your child and use
        one prompt per week.
      </p>

      <h2>Ages 5–7: AI is a guessing machine, not a friend</h2>
      <p><strong>Core idea to teach:</strong> the computer doesn't really know things — it makes a very fast guess.</p>
      <ul className="ml-5 list-disc space-y-1">
        <li>"That cartoon voice was made by a computer. It isn't a real person."</li>
        <li>"The computer can be wrong. Let's check together."</li>
        <li>"We never tell the computer your name or where you live."</li>
      </ul>
      <p><strong>One question to ask:</strong> "What's something the computer got wrong this week?"</p>

      <h2>Ages 8–10: AI can sound sure and still be wrong</h2>
      <p><strong>Core idea:</strong> a confident answer isn't the same as a correct one.</p>
      <ul className="ml-5 list-disc space-y-1">
        <li>"Let's ask the chatbot a question we already know the answer to, and see if it's right."</li>
        <li>"Whose work is this — yours, or the AI's?"</li>
        <li>"If an image looks weird, it might be fake. What clues can you spot?"</li>
      </ul>
      <p><strong>One activity:</strong> ask a chatbot to draw your pet from a description and laugh at what it gets wrong.</p>

      <h2>Ages 11–13: AI, schoolwork, and honesty</h2>
      <p><strong>Core idea:</strong> using AI is a tool choice with rules — your teacher's rules, our family's rules, and your own integrity.</p>
      <ul className="ml-5 list-disc space-y-1">
        <li>"What does your teacher say is okay to use AI for in this class?"</li>
        <li>"Brainstorming with AI is fine. Turning in AI's writing as yours isn't."</li>
        <li>"Anything you type into a chatbot might be saved. Would you write it on a postcard?"</li>
      </ul>
      <p><strong>One activity:</strong> together, write a personal "honest AI use" rule for school.</p>

      <h2>Ages 14–17: AI, identity, and pressure</h2>
      <p><strong>Core idea:</strong> AI companions and image generators can cause real harm — and the harm often lands on whoever is in the picture, not the person making it.</p>
      <ul className="ml-5 list-disc space-y-1">
        <li>"AI 'friend' apps are designed to be agreeable. A real friend pushes back sometimes."</li>
        <li>"Running someone else's photo through an AI tool can do real damage — and in many places, it's illegal."</li>
        <li>"What would make you tell me if a chatbot conversation got weird?"</li>
        <li>"How do you tell which images and videos online are real anymore?"</li>
      </ul>
      <p><strong>One question to ask:</strong> "If a chatbot felt like the only one who 'got' you, would you tell me?"</p>

      <h2>Rules that hold at every age</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>No real name, address, school, or phone number in any AI tool.</li>
        <li>No photos of yourself or others, ever, in unknown AI apps.</li>
        <li>If a chatbot answer matters, verify it from a second source.</li>
        <li>If something feels off, tell a parent. No trouble for telling.</li>
      </ol>

      <RelatedArticles
        links={[
          { to: "/resources/talking-to-kids-about-ai", title: "How Parents Can Talk to Kids About AI Safely" },
          { to: "/resources/chatbot-safety-for-families", title: "Chatbot Safety: What Every Family Should Know" },
          { to: "/resources/chatbot-safety-checklist", title: "Chatbot Safety Checklist" },
        ]}
      />
    </MarketingLayout>
  );
}
