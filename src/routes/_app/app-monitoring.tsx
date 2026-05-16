import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/app-monitoring")({
  component: () => (
    <PagePlaceholder
      title="App Monitoring"
      description="See which apps are part of your family's day — without judgment."
    />
  ),
});
