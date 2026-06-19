import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Guardian AI" },
      {
        name: "description",
        content:
          "Get in touch with Guardian AI for feedback, corrections, partnerships, or media inquiries.",
      },
      { property: "og:title", content: "Contact Guardian AI" },
      {
        property: "og:description",
        content: "Email Guardian AI's team for support, feedback, or media inquiries.",
      },
      { property: "og:url", content: "https://www.myguardianai.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <MarketingLayout title="Contact">
      <p>
        Guardian AI is a small, independent project. We read every email,
        though it may take a few days to reply.
      </p>

      <h2>Choose the right inbox</h2>
      <ul className="ml-5 list-disc space-y-2">
        <li>
          <strong>General questions and feedback:</strong>{" "}
          <a href="mailto:hello@myguardianai.app">hello@myguardianai.app</a>
        </li>
        <li>
          <strong>Account, billing, and product support:</strong>{" "}
          <a href="mailto:support@myguardianai.app">support@myguardianai.app</a>
        </li>
        <li>
          <strong>Corrections or factual errors:</strong>{" "}
          <a href="mailto:corrections@myguardianai.app">corrections@myguardianai.app</a>
        </li>
        <li>
          <strong>Press, interviews, and partnerships:</strong>{" "}
          <a href="mailto:press@myguardianai.app">press@myguardianai.app</a>
        </li>
        <li>
          <strong>Privacy requests (access, deletion, questions):</strong>{" "}
          <a href="mailto:privacy@myguardianai.app">privacy@myguardianai.app</a>
        </li>
      </ul>

      <h2>What helps us respond faster</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Use a clear subject line — e.g. "Correction: screen-time article".</li>
        <li>Include links or screenshots when reporting a bug.</li>
        <li>For privacy requests, tell us which account email to look up.</li>
      </ul>

      <h2>Mailing address</h2>
      <p>
        Guardian AI is operated remotely by its founder. For postal mail or
        legal notices, please first email{" "}
        <a href="mailto:hello@myguardianai.app">hello@myguardianai.app</a> so
        we can confirm the correct address.
      </p>
    </MarketingLayout>
  );
}
