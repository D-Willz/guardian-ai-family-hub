import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/_app/contracts")({
  component: () => (
    <PagePlaceholder
      title="Screen-Time Contracts"
      description="Co-create simple agreements with your kids — built on trust and reviewed together."
    />
  ),
});
