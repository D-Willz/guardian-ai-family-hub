import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 text-sm text-muted-foreground">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground">
              Guardian AI
            </p>
            <ul className="space-y-1.5">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/editorial-policy" className="hover:text-foreground">Editorial policy</Link></li>
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground">
              Resources
            </p>
            <ul className="space-y-1.5">
              <li><Link to="/resources" className="hover:text-foreground">All articles</Link></li>
              <li><Link to="/resources/downloads" className="hover:text-foreground">Free tools & templates</Link></li>
              <li><Link to="/resources/talking-to-kids-about-ai" className="hover:text-foreground">AI safety guide</Link></li>
              <li><Link to="/resources/healthy-screen-time-habits" className="hover:text-foreground">Screen-time habits</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground">
              Family tools
            </p>
            <ul className="space-y-1.5">
              <li><Link to="/resources/family-technology-agreement-template" className="hover:text-foreground">Family tech agreement</Link></li>
              <li><Link to="/resources/age-by-age-ai-conversation-guide" className="hover:text-foreground">Age-by-age AI guide</Link></li>
              <li><Link to="/resources/chatbot-safety-checklist" className="hover:text-foreground">Chatbot safety checklist</Link></li>
              <li><Link to="/resources/app-privacy-review-checklist" className="hover:text-foreground">App privacy checklist</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground">
              Legal
            </p>
            <ul className="space-y-1.5">
              <li><Link to="/privacy" className="hover:text-foreground">Privacy policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground">Terms of service</Link></li>
              <li><a href="mailto:hello@myguardianai.app" className="hover:text-foreground">hello@myguardianai.app</a></li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border pt-4 text-center text-xs">
          © {new Date().getFullYear()} Guardian AI. Made for families by Willie Dampier Jr.
        </p>
      </div>
    </footer>
  );
}
