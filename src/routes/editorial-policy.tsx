import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy — Guardian AI" },
      {
        name: "description",
        content:
          "How Guardian AI writes, reviews, sources, and corrects its family technology guidance — including how we use AI.",
      },
      { property: "og:title", content: "Editorial Policy — Guardian AI" },
      {
        property: "og:description",
        content:
          "How Guardian AI sources, reviews, and corrects its family tech guidance — and how we use AI in our process.",
      },
      { property: "og:url", content: "https://www.myguardianai.app/editorial-policy" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/editorial-policy" }],
  }),
  component: EditorialPage,
});

function EditorialPage() {
  return (
    <MarketingLayout title="Editorial Policy">
      <p>
        Guardian AI publishes practical, parent-facing guidance about
        family technology, screen time, online privacy, AI safety, and
        digital well-being. This page explains how we write that guidance,
        how we use AI in our process, how we handle sources, and how we
        correct mistakes.
      </p>

      <h2>Who we are</h2>
      <p>
        Guardian AI content is created and reviewed by the{" "}
        <strong>Guardian AI Editorial Team</strong> — parents and
        researchers focused on healthier family technology habits. For
        transparency, our founder is identified on the{" "}
        <a href="/about">About page</a>. Guardian AI is independent and
        not affiliated with any device manufacturer, carrier, school
        system, or research institution.
      </p>

      <h2>What we publish</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Practical guides for parents and guardians.</li>
        <li>Checklists, templates, and planners families can use directly.</li>
        <li>Plain-language explanations of how common kid-facing tech works.</li>
      </ul>
      <p>
        We do <strong>not</strong> publish medical, legal, or psychological
        advice. Our work is educational. For clinical concerns about a
        specific child, parents should consult a qualified professional.
      </p>

      <h2>How we write</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li><strong>Pick a real parent question.</strong> Every article starts with a problem we've actually heard from families.</li>
        <li><strong>Outline the practical answer first.</strong> If it can't be turned into something parents can do, we don't publish it.</li>
        <li><strong>Draft.</strong> AI tools may be used here for brainstorming or rewriting an unclear paragraph.</li>
        <li><strong>Review for accuracy.</strong> Every claim is checked against the rules in the next section.</li>
        <li><strong>Add age guidance, scenarios, and an activity.</strong> So the article translates into family life, not just theory.</li>
        <li><strong>Publish with a byline and a review date.</strong> Visible and dated, not buried in metadata.</li>
      </ol>

      <h2>How we use AI</h2>
      <p>
        We use AI tools — including large language models — in narrow,
        disclosed ways:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li><strong>Allowed:</strong> brainstorming outlines, suggesting clearer phrasings, pressure-testing examples, and catching typos.</li>
        <li><strong>Not allowed:</strong> generating final copy unedited, inventing statistics or quotes, fabricating studies or sources, simulating expert credentials, or producing AI "experts" or testimonials.</li>
        <li><strong>Disclosure:</strong> when AI assistance materially shapes an article (more than light editing), we say so on the article itself.</li>
      </ul>
      <p>
        A human author reviews and signs off on every published article. AI
        is a drafting tool here, not an author.
      </p>

      <h2>How we handle facts and sources</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Any specific statistic links to its primary source.</li>
        <li>Any "study shows" claim names the study and links to it.</li>
        <li>We prefer government health agencies, academic institutions, and well-established nonprofits (e.g. AAP, WHO, CDC, NIH, Common Sense Media, Pew Research) for research-grade claims.</li>
        <li>Vendor and platform documentation is used only for describing how features work, not for evaluating them.</li>
        <li>Anecdotes are clearly labeled as anecdotes.</li>
        <li>If we can't find a credible source for a claim, we cut the claim.</li>
      </ul>

      <h2>Review schedule</h2>
      <p>
        Every article has a <em>Last reviewed</em> date. We re-read each
        article at least once every twelve months — and sooner if something
        major changes (a platform releases a new feature, a research body
        publishes new guidance, etc.). On review we either update the
        article or confirm it still holds up.
      </p>

      <h2>Corrections</h2>
      <p>
        When we make a material correction, we add a dated note at the
        bottom of the article describing what changed. We do not silently
        edit substantive claims. To report a mistake, email{" "}
        <a href="mailto:corrections@myguardianai.app">
          corrections@myguardianai.app
        </a>
        .
      </p>

      <h2>Conflicts of interest</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>We do not accept payment to recommend products or change article conclusions.</li>
        <li>If we ever publish sponsored content, it will be clearly labeled "Sponsored" at the top.</li>
        <li>Affiliate links, if used, will be disclosed in-line and never alter our recommendations.</li>
      </ul>

      <h2>Accessibility and inclusion</h2>
      <p>
        We write for parents and caregivers in any family structure —
        single parents, blended families, grandparents raising
        grandchildren, foster and adoptive families, same-sex parents, and
        more. We try to keep language plain enough to be readable at a
        sixth-to-eighth-grade level without being condescending.
      </p>

      <p className="text-xs">Last updated: June 19, 2026.</p>
    </MarketingLayout>
  );
}
