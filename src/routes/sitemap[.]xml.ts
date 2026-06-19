import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.myguardianai.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/editorial-policy", changefreq: "yearly", priority: "0.6" },
          { path: "/privacy", changefreq: "yearly", priority: "0.4" },
          { path: "/terms", changefreq: "yearly", priority: "0.4" },
          { path: "/auth", changefreq: "monthly", priority: "0.5" },
          { path: "/resources", changefreq: "weekly", priority: "0.9" },
          { path: "/resources/downloads", changefreq: "monthly", priority: "0.8" },
          { path: "/resources/talking-to-kids-about-ai", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/teaching-kids-online-privacy", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/healthy-screen-time-habits", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/chatbot-safety-for-families", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/family-technology-agreements", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/setting-digital-boundaries", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/family-technology-agreement-template", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/age-by-age-ai-conversation-guide", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/chatbot-safety-checklist", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/family-digital-boundaries-planner", changefreq: "monthly", priority: "0.7" },
          { path: "/resources/app-privacy-review-checklist", changefreq: "monthly", priority: "0.7" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
