import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/behavior-alerts")({
  component: () => (
    <PagePlaceholder
      title="Behavior Alerts"
      description="Gentle, AI-powered notices when patterns shift — so you can check in early."
    />
  ),
});
