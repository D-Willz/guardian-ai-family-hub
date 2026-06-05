import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Guardian AI. Made for families.</p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link to="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/resources" className="hover:text-foreground transition-colors">
            Resources
          </Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
