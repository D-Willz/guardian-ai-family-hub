import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/filters")({
  component: () => (
    <PagePlaceholder
      title="Content Filters"
      description="Age-aware filters that protect without isolating — adjustable as kids grow."
    />
  ),
});
