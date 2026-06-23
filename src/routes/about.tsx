import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Guardian AI — Willie Dampier Jr." },
      {
        name: "description",
        content:
          "Guardian AI is a warm, parent-built companion for raising digitally healthy kids. Meet the founder, our editorial principles, and how we work.",
      },
      { property: "og:title", content: "About Guardian AI" },
      {
        property: "og:description",
        content:
          "Why Guardian AI exists, who it's for, and how we write and review our family tech guidance.",
      },
      { property: "og:url", content: "https://www.myguardianai.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MarketingLayout title="About Guardian AI">
      <p>
        Guardian AI is a gentle, parent-built companion for raising kids in a
        world reshaped by smartphones, social feeds, and generative AI. We
        publish practical guidance for families and build calm, supportive
        tools that help parents and kids talk about technology together —
        instead of fighting about it.
      </p>

      <h2>Why this exists</h2>
      <p>
        Guardian AI was started by <strong>Willie Dampier Jr.</strong>, a
        parent who got tired of choosing between cold surveillance apps and
        doing nothing at all. Most parental-control tools treat kids like
        suspects and parents like wardens. Most family-tech advice is either
        academic or alarmist. There was a gap in the middle for
        plain-language, practical guidance written by a parent figuring this
        out in real time.
      </p>
      <p>
        Everything here is built around one belief: <em>trust scales better
        than surveillance</em>. The families that handle technology best
        aren't the ones with the strictest controls — they're the ones who
        talk about it the most.
      </p>

      <h2>Who this is for</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Parents and guardians of kids ages 5 to 18.</li>
        <li>Families navigating first phones, first social accounts, and first AI chatbots.</li>
        <li>Caregivers who want a calmer, more thoughtful approach to screen time.</li>
        <li>Anyone who wants practical guidance instead of fear-based headlines.</li>
      </ul>

      <h2>Editorial principles</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>
          <strong>Practical over alarmist.</strong> Every article ends with
          something a parent can actually do this week.
        </li>
        <li>
          <strong>Plain language.</strong> No jargon, no condescension, no
          ten-page essays where two paragraphs would do.
        </li>
        <li>
          <strong>Honest about uncertainty.</strong> When research is
          inconclusive, we say so instead of pretending otherwise.
        </li>
        <li>
          <strong>No fabricated credentials or statistics.</strong> If we
          cite something, we link to a primary source.
        </li>
        <li>
          <strong>Respect for kids.</strong> We write for parents, but we
          assume kids are capable, curious, and worth talking with — not at.
        </li>
      </ul>

      <h2>How we use AI in our writing</h2>
      <p>
        We sometimes use AI tools to brainstorm article outlines, suggest
        clearer phrasings, or pressure-test our examples. Every published
        article is written and edited by Willie. AI does not write our final
        copy unedited, does not invent statistics, and is never used to
        generate quotations or testimonials. When AI assistance materially
        shapes an article, we say so on the page.
      </p>

      <h2>How we review claims</h2>
      <p>
        Before publishing, each article is checked against these rules:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li>Any statistic must link to its primary source.</li>
        <li>Any "study shows" claim must name the study and link to it.</li>
        <li>Anecdotes are clearly marked as anecdotes, not data.</li>
        <li>Practical advice must be testable — would a parent know whether they did it?</li>
      </ul>
      <p>
        Every article also carries a <em>Last reviewed</em> date. We re-read
        the article on that date and either update it or confirm it still
        holds up. Family tech changes fast; what was true two years ago
        often isn't now.
      </p>

      <h2>Corrections</h2>
      <p>
        If you find an error — a broken link, an outdated statistic, advice
        that hasn't aged well, or anything that feels off — email{" "}
        <a href="mailto:support@myguardianai.app">support@myguardianai.app</a>.
        We read every message. When we correct something material, we add a
        dated note at the bottom of the article so the change is visible.
      </p>

      <h2>Get in touch</h2>
      <p>
        General questions, feedback, or media requests:{" "}
        <a href="mailto:hello@myguardianai.app">hello@myguardianai.app</a>.
        Product support and account help:{" "}
        <a href="mailto:support@myguardianai.app">support@myguardianai.app</a>.
      </p>
    </MarketingLayout>
  );
}
