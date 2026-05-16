import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/settings")({
  component: () => (
    <PagePlaceholder
      title="Settings"
      description="Manage your family profile, devices, and notification preferences."
    />
  ),
});
