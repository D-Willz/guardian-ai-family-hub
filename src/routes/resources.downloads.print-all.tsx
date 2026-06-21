import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/resources/downloads/print-all")({
  head: () => ({
    meta: [
      { title: "Print all family tech tools — Guardian AI" },
      {
        name: "description",
        content:
          "Printer-friendly version of every Guardian AI family tech tool — agreement, conversation guide, chatbot safety checklist, boundaries planner, and app privacy checklist.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrintAll,
});

function Line() {
  return <div className="h-7 border-b border-dashed border-black/70" />;
}

function Field({ label, lines = 2 }: { label: string; lines?: number }) {
  return (
    <div className="mt-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-1 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Line key={i} />
        ))}
      </div>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 py-1">
      <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center border border-black" />
      <span className="text-sm leading-relaxed">{children}</span>
    </li>
  );
}

function ToolSection({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section className="print-tool mb-10 border-b border-black/30 pb-8 last:border-0">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm italic">{intro}</p>
      <div className="mt-4 space-y-4 text-[14px] leading-relaxed [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold">
        {children}
      </div>
    </section>
  );
}

function PrintAll() {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="no-print mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link to="/resources/downloads">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Button>
        </Link>
        <Button size="sm" onClick={() => window.print()}>
          <Printer className="h-4 w-4" />
          Print all tools
        </Button>
      </div>

      <main className="print-area mx-auto max-w-3xl px-6 pb-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Guardian AI — Family Tech Tools</h1>
          <p className="mt-2 text-sm">
            Five printable tools to use together as a family. Fill them in by hand.
          </p>
        </header>

        {/* 1. Family Technology Agreement */}
        <ToolSection
          title="1. Family Technology Agreement"
          intro="Fill out together. Every section should reflect what the whole family agreed to, including the adults. Revisit every six months."
        >
          <h3>1. Who's signing this agreement</h3>
          <Field label="Family members participating:" lines={3} />
          <h3>2. Device-free times</h3>
          <Field label="Examples: mornings before school, dinner, 60 min before bed." lines={3} />
          <h3>3. Device-free places</h3>
          <Field label="Examples: bedrooms, bathrooms, dinner table." lines={3} />
          <h3>4. What needs a parent's okay before doing it</h3>
          <Field label="Examples: installing a new app, in-app purchases, sharing a phone number." lines={4} />
          <h3>5. What we never post publicly</h3>
          <Field label="Examples: other people, location tags, school name." lines={3} />
          <h3>6. How we ask for help when something goes wrong</h3>
          <p className="text-sm">
            No-trouble rule: if you tell a parent within 24 hours of any mistake,
            consequences pause and we figure it out together.
          </p>
          <Field label="Who you'll tell, and how:" lines={2} />
          <h3>7. What the parents agree to</h3>
          <Field label="Examples: knock before entering, model the same rules, no snooping without cause." lines={4} />
          <h3>8. When we'll review this agreement</h3>
          <Field label="Date of next review:" lines={1} />
          <h3>9. Signatures</h3>
          <Field label="Everyone signs (including the adults):" lines={4} />
        </ToolSection>

        {/* 2. Age-by-Age AI Conversation Guide */}
        <ToolSection
          title="2. Age-by-Age AI Conversation Guide"
          intro="Pick the section that matches your child. Use one prompt per week and jot what they said."
        >
          <h3>Ages 5–7 — AI is a guessing machine, not a friend</h3>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li>"That voice was made by a computer. It isn't a real person."</li>
            <li>"The computer can be wrong. Let's check together."</li>
            <li>"We never tell the computer your name or where you live."</li>
          </ul>
          <Field label="Notes from this week's conversation:" lines={2} />

          <h3>Ages 8–10 — AI can sound sure and still be wrong</h3>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li>"Let's ask a question we already know the answer to, see if it's right."</li>
            <li>"Whose work is this — yours, or the AI's?"</li>
            <li>"If an image looks weird, it might be fake. What clues can you spot?"</li>
          </ul>
          <Field label="Notes:" lines={2} />

          <h3>Ages 11–13 — AI, schoolwork, and honesty</h3>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li>"What does your teacher say is okay to use AI for in this class?"</li>
            <li>"Brainstorming is fine. Turning in AI's writing as yours isn't."</li>
            <li>"Anything you type into a chatbot might be saved. Would you write it on a postcard?"</li>
          </ul>
          <Field label="Our family's honest-AI rule:" lines={2} />

          <h3>Ages 14–17 — AI, identity, and pressure</h3>
          <ul className="ml-5 list-disc space-y-1 text-sm">
            <li>"AI 'friend' apps are designed to be agreeable. A real friend pushes back."</li>
            <li>"Running someone else's photo through an AI tool can do real damage."</li>
            <li>"What would make you tell me if a chatbot conversation got weird?"</li>
          </ul>
          <Field label="Notes:" lines={2} />

          <h3>Rules that hold at every age</h3>
          <ol className="ml-5 list-decimal space-y-1 text-sm">
            <li>No real name, address, school, or phone number in any AI tool.</li>
            <li>No photos of yourself or others in unknown AI apps.</li>
            <li>If a chatbot answer matters, verify it from a second source.</li>
            <li>If something feels off, tell a parent. No trouble for telling.</li>
          </ol>
        </ToolSection>

        {/* 3. Chatbot Safety Checklist */}
        <ToolSection
          title="3. Chatbot Safety Checklist"
          intro="Run through this the first time your kid uses any AI chatbot. Tick each item."
        >
          <h3>Account setup</h3>
          <ul className="space-y-1">
            <Check>Registered with a family email, not the kid's school address.</Check>
            <Check>Display name is not the kid's real name.</Check>
            <Check>Profile photo (if any) is not a face.</Check>
            <Check>The age set on the account is the child's actual age.</Check>
          </ul>
          <h3>Privacy & data settings</h3>
          <ul className="space-y-1">
            <Check>Chat history saving is OFF, or set to auto-delete.</Check>
            <Check>"Use my conversations to improve the model" is OFF.</Check>
            <Check>Microphone and camera permissions denied unless needed.</Check>
            <Check>Privacy policy exists and is readable.</Check>
          </ul>
          <h3>Content & interaction rules</h3>
          <ul className="space-y-1">
            <Check>No real names, addresses, phones, schools, or photos shared.</Check>
            <Check>No information about siblings, friends, or classmates shared.</Check>
            <Check>The kid knows: "If the chatbot says something scary or mean, show me."</Check>
            <Check>The kid knows: "If the chatbot tells you to keep a secret, tell me."</Check>
          </ul>
          <h3>Family ground rules</h3>
          <ul className="space-y-1">
            <Check>One approved chatbot per task — not "try them all".</Check>
            <Check>Companion-style "AI friend" apps are off devices for under-13s.</Check>
            <Check>Review chatbot use together every month for the first three months.</Check>
          </ul>
          <Field label="Apps reviewed today:" lines={2} />
        </ToolSection>

        {/* 4. Family Digital Boundaries Planner */}
        <ToolSection
          title="4. Family Digital Boundaries Planner"
          intro="The boundaries that work are predictable, fair, and followed by the whole family — including the adults."
        >
          <h3>1. Our phone-free times</h3>
          <Line /><Line /><Line />
          <h3>2. Our phone-free places</h3>
          <Line /><Line />
          <h3>3. Our bedtime cutoff</h3>
          <p className="text-sm">All screens off at:</p>
          <Line />
          <p className="text-sm">Devices charge overnight at:</p>
          <Line />
          <h3>4. Our weekend reset</h3>
          <p className="text-sm">One screen-light family activity each week — what and when?</p>
          <Line /><Line />
          <h3>5. What the adults will do differently</h3>
          <Line /><Line /><Line />
          <h3>6. Our two-week trial — review date</h3>
          <Line />
        </ToolSection>

        {/* 5. App Privacy Review Checklist */}
        <ToolSection
          title="5. App Privacy Review Checklist"
          intro="Run this checklist the first time your kid installs any new app. Takes about 60 seconds."
        >
          <Field label="App name:" lines={1} />
          <h3>Before installing</h3>
          <ul className="space-y-1">
            <Check>Read the age rating and parent reviews (not app store stars).</Check>
            <Check>Find the privacy policy. If missing, don't install.</Check>
            <Check>Check the "Data the app collects" section.</Check>
            <Check>Search the app name + "kids" or "controversy" for recent news.</Check>
          </ul>
          <h3>During first launch</h3>
          <ul className="space-y-1">
            <Check>Account set to PRIVATE by default.</Check>
            <Check>Location sharing OFF.</Check>
            <Check>Contact syncing OFF.</Check>
            <Check>Camera and microphone denied unless core to the app.</Check>
            <Check>Notifications denied, then re-enable only what's useful.</Check>
            <Check>Username doesn't include real name, school, or birth year.</Check>
            <Check>Profile photo is not a clear face shot.</Check>
          </ul>
          <h3>Inside the app</h3>
          <ul className="space-y-1">
            <Check>"Who can message me" set to friends only (or off).</Check>
            <Check>"Suggest me to others" OFF.</Check>
            <Check>"Personalised ads" OFF.</Check>
            <Check>"Use my data to train AI" OFF.</Check>
            <Check>In-app chat / DMs reviewed and decided together.</Check>
          </ul>
          <h3>Family agreements</h3>
          <ul className="space-y-1">
            <Check>Kid knows what to do if a stranger messages them.</Check>
            <Check>App is on the home screen, not hidden.</Check>
            <Check>Follow-up check together after two weeks.</Check>
          </ul>
          <Field label="Notes / red flags spotted:" lines={3} />
        </ToolSection>
      </main>
    </div>
  );
}
