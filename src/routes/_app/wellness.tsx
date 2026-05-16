import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/wellness")({
  component: () => (
    <PagePlaceholder
      title="Wellness Reports"
      description="Thoughtful weekly summaries — not raw data dumps. Celebrate progress."
    />
  ),
});
