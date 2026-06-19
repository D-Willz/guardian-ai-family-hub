interface ArticleMetaProps {
  published: string; // human-readable date
  reviewed: string;
  readingTime?: string;
}

export function ArticleMeta({ published, reviewed, readingTime }: ArticleMetaProps) {
  return (
    <div className="not-prose mb-6 rounded-xl border border-border bg-card/50 p-4 text-sm">
      <p className="font-medium text-foreground">
        By{" "}
        <a href="/about" className="text-primary underline">
          Willie Dampier Jr.
        </a>
      </p>
      <p className="mt-1 text-muted-foreground">
        Founder, Guardian AI — parent researching healthier family technology habits.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Published {published} · Last reviewed {reviewed}
        {readingTime ? ` · ${readingTime}` : ""}
      </p>
    </div>
  );
}

interface RelatedLink {
  to: string;
  title: string;
}

export function RelatedArticles({ links }: { links: RelatedLink[] }) {
  return (
    <div className="not-prose mt-10 rounded-xl border border-border bg-card/50 p-5">
      <h2 className="mb-3 text-base font-semibold text-foreground">Related articles</h2>
      <ul className="space-y-1.5 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <a href={l.to} className="text-primary underline">
              {l.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Source {
  title: string;
  publisher: string;
  url: string;
}

export function Sources({ items }: { items: Source[] }) {
  return (
    <div className="not-prose mt-8">
      <h2 className="mb-3 text-lg font-semibold text-foreground">Sources & further reading</h2>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer" className="text-primary underline">
              {s.title}
            </a>
            <span className="text-muted-foreground"> — {s.publisher}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
