import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AVATAR_COLORS, type AvatarColor, createChild } from "@/lib/children";
import { cn } from "@/lib/utils";

const schema = z.object({
  first_name: z.string().trim().min(1, "Enter a first name").max(40),
  age: z.coerce.number().int().min(0).max(25),
  avatar_color: z.enum(["peach", "mint", "sky", "lavender", "butter", "rose"]),
});

export function AddChildDialog({
  open,
  onOpenChange,
  onAdded,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdded: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState<AvatarColor>("peach");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setFirstName("");
    setAge("");
    setColor("peach");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ first_name: firstName, age, avatar_color: color });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the form");
      return;
    }
    setLoading(true);
    try {
      await createChild(parsed.data);
      toast.success(`${parsed.data.first_name} added`);
      reset();
      onOpenChange(false);
      onAdded();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add child");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a child profile</DialogTitle>
          <DialogDescription>
            We only ever store a first name — no last names or identifying details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First name</Label>
            <Input
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={40}
              placeholder="e.g. Mila"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min={0}
              max={25}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 9"
            />
          </div>
          <div className="space-y-2">
            <Label>Avatar color</Label>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  aria-label={c.label}
                  onClick={() => setColor(c.value)}
                  className={cn(
                    "h-10 w-10 rounded-full border-2 transition",
                    c.className,
                    color === c.value
                      ? "border-foreground ring-2 ring-primary/30"
                      : "border-transparent",
                  )}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding…" : "Add child"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
