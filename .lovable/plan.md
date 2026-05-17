## Root cause

`/wellness/$reportId` IS registered and the link IS correct — but clicking does nothing because the parent route `src/routes/_app/wellness.tsx` renders the list directly and never renders `<Outlet />`. In TanStack Router, when a child route matches, the parent's component is what shows on screen; without an `<Outlet />` slot, the child detail view has nowhere to render. The URL changes, the list stays.

The detail page, AI server function, skeleton loaders, error banner, and "Download PDF" button are all already implemented in `src/routes/_app/wellness.$reportId.tsx` — they just never get mounted.

## Fix

Split the parent into a layout + index pair (standard TanStack pattern for parent-with-children):

1. **Rename** `src/routes/_app/wellness.tsx` → `src/routes/_app/wellness.index.tsx` (this becomes the list page at `/wellness`, no code changes inside).
2. **Create** a new `src/routes/_app/wellness.tsx` as a pathless layout that just renders `<Outlet />`:
   ```tsx
   import { createFileRoute, Outlet } from "@tanstack/react-router";
   export const Route = createFileRoute("/_app/wellness")({
     component: () => <Outlet />,
   });
   ```

After this, `/wellness` renders the list (from `wellness.index.tsx`) and `/wellness/$reportId` renders the existing detail view with its AI sections, skeletons, error fallback, and Download PDF button.

## Verification

- Click a report card on `/wellness` → URL goes to `/wellness/{childId}_{weekKey}` and the detail view mounts.
- While Claude responds, the four cards show `<Skeleton />` placeholders (already in place).
- If `generateWellnessReport` throws, the existing destructive error card renders with the message (already in place). I'll also add a small "Try again" button inside that error card to satisfy the retry requirement.
- "Download PDF" button at the top calls `window.print()` (already in place).

## Small additional tweak

Add a "Try again" button to the existing error card in `wellness.$reportId.tsx` that re-invokes the server function (currently the card shows the error message but no retry control).

No other files change. No schema changes. No new dependencies.
