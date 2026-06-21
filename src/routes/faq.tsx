import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

const faqs: { q: string; a: string }[] = [
  {
    q: "What is Guardian AI?",
    a: "Guardian AI is a parent-built companion that helps families build healthier digital habits. It combines practical written guidance with optional tools — like shared family technology agreements and gentle weekly wellness reports — designed around trust instead of surveillance.",
  },
  {
    q: "Who writes the articles?",
    a: "Articles are written and reviewed by the Guardian AI Editorial Team. AI tools are sometimes used to brainstorm or pressure-test ideas, but every final article is reviewed by a person. Our founder is identified on the About page. See our editorial policy for details.",
  },
  {
    q: "Is Guardian AI free?",
    a: "All of the articles, checklists, templates, and planners in our Resources section are free and require no login. The Guardian AI parent dashboard is a separate optional product with its own pricing.",
  },
  {
    q: "What age range is this for?",
    a: "Our written guidance is most useful for parents of kids ages 5 to 18. Many articles include age-specific notes for younger children, tweens, and teens.",
  },
  {
    q: "Do you sell my data?",
    a: "No. We do not sell personal data. See our Privacy Policy for what we collect and why.",
  },
  {
    q: "Do you use AI to write articles?",
    a: "We may use AI for brainstorming, outlining, or clarity edits. Final copy is written and reviewed by a human. We do not allow AI to invent statistics, quotations, studies, or credentials.",
  },
  {
    q: "Is this advice from a doctor, therapist, or lawyer?",
    a: "No. Guardian AI is a parent sharing what they've learned researching family technology. Our articles are educational, not medical, legal, or psychological advice. For clinical concerns, consult a qualified professional.",
  },
  {
    q: "Can I share or republish your articles?",
    a: "You can quote short passages with a link back to the original article. For longer reuse, syndication, or translation, email hello@myguardianai.app.",
  },
  {
    q: "How do I report a mistake?",
    a: "Email corrections@myguardianai.app with the article URL and what's wrong. When we make a material correction, we add a dated note at the bottom of the article.",
  },
  {
    q: "Do you take advertising or sponsorships?",
    a: "We may run display ads on the public site. Sponsored content, if ever published, will be clearly labeled. We do not accept payment to alter editorial recommendations.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Guardian AI" },
      {
        name: "description",
        content:
          "Common questions about Guardian AI: who writes our content, how we use AI, pricing, age guidance, privacy, and corrections.",
      },
      { property: "og:title", content: "Guardian AI — FAQ" },
      {
        property: "og:description",
        content: "Answers to the most common questions parents ask about Guardian AI.",
      },
      { property: "og:url", content: "https://www.myguardianai.app/faq" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <MarketingLayout title="Frequently Asked Questions">
      <p>
        Quick answers to the questions parents ask us most often. For
        anything else, email{" "}
        <a href="mailto:hello@myguardianai.app">hello@myguardianai.app</a>.
      </p>
      <div className="not-prose mt-6 space-y-5">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-xl border border-border bg-card/50 p-5">
            <h2 className="text-base font-semibold text-foreground">{f.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
