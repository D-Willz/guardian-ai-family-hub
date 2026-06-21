import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton({ label = "Print this tool" }: { label?: string }) {
  return (
    <div className="not-prose no-print mb-6 flex justify-end">
      <Button type="button" size="sm" variant="outline" onClick={() => window.print()}>
        <Printer className="h-4 w-4" />
        {label}
      </Button>
    </div>
  );
}
