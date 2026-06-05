import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/resources/teaching-kids-online-privacy")({
  head: () => ({
    meta: [
      { title: "How to Teach Kids Online Privacy — Guardian AI" },
      {
        name: "description",
        content:
          "A practical, plain-language guide for parents on teaching kids the online privacy basics they'll actually remember.",
      },
      { property: "og:title", content: "How to Teach Kids Online Privacy" },
      {
        property: "og:description",
        content:
          "Privacy basics every kid should know — with examples you can use tonight.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://guardian-ai-family-hub.lovable.app/resources/teaching-kids-online-privacy",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://guardian-ai-family-hub.lovable.app/resources/teaching-kids-online-privacy",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="How to Teach Kids Online Privacy">
      <p>
        Most kids learn online privacy the painful way: a screenshot that gets
        passed around, a username that leaks their real identity, a quiz that
        scrapes their data. You can shortcut all of that with a handful of
        clear, repeatable ideas — taught the way kids actually learn, through
        examples and small experiments.
      </p>

      <h2>The one-sentence rule</h2>
      <p>
        Teach this first, and repeat it for years:
        <em>
          {" "}
          "Anything you put online — even in a private chat — could end up in
          front of anyone."
        </em>{" "}
        Not as a threat. As a fact, like gravity. Once kids internalize it,
        every other lesson gets easier.
      </p>

      <h2>The five things kids should learn to protect</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li><strong>Their real name.</strong> Usernames shouldn't include it, neither should their email handle.</li>
        <li><strong>Their location.</strong> School name, town, sports team logos, street signs in photos — all leak it.</li>
        <li><strong>Their face.</strong> Especially in profile pictures on public accounts.</li>
        <li><strong>Their passwords.</strong> Not even to best friends. Especially not to best friends.</li>
        <li><strong>Other people's information.</strong> A friend's secret, a sibling's photo, a parent's credit card.</li>
      </ol>

      <h2>Five privacy habits worth building</h2>

      <h3>1. The "Grandparent test" for posts</h3>
      <p>
        Before posting anything, ask: would I be okay if Grandma, my teacher,
        and a future boss all saw this? If any of those make you wince, don't
        post it. (For older teens, swap "Grandma" for "a college admissions
        officer.")
      </p>

      <h3>2. Strong, unique passwords + a password manager</h3>
      <p>
        Reused passwords are the #1 way kids get hacked. Set up a family
        password manager together and walk through it once. Use long
        passphrases like <code>purple-otter-saturday-42</code> instead of
        clever single words.
      </p>

      <h3>3. Lock down defaults on every new app</h3>
      <p>
        Make it a rule: any new app gets a 60-second privacy check before
        first use. Set the profile to private, turn off location, turn off
        contact sync, deny camera/mic unless needed. Do it together the
        first few times so it becomes muscle memory.
      </p>

      <h3>4. Think before you tap "Allow"</h3>
      <p>
        Every "Allow access to your photos?" or "Allow notifications?" is a
        small privacy decision. Teach kids to pause and ask: "Does this app
        actually need this to work?" A flashlight app doesn't need contacts.
        A photo filter doesn't need location.
      </p>

      <h3>5. Scrub metadata before sharing</h3>
      <p>
        Photos carry hidden data — including GPS coordinates and timestamps.
        For older kids, show them how to strip metadata before posting
        anything publicly.
      </p>

      <h2>Two demos that make it click</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>
          <strong>Reverse image search.</strong> Take a photo of your living
          room and run it through Google Image Search. Show how much can be
          pieced together from a single picture.
        </li>
        <li>
          <strong>Have I Been Pwned.</strong> Visit{" "}
          <a href="https://haveibeenpwned.com" target="_blank" rel="noreferrer">
            haveibeenpwned.com
          </a>{" "}
          together and look up an old family email. Seeing real breach
          history makes "use strong passwords" suddenly concrete.
        </li>
      </ul>

      <h2>When something goes wrong</h2>
      <p>
        Kids will mess up. The most important rule in your house should be:
        "If you make a privacy mistake, tell me — you won't get in trouble
        for telling me, only for hiding it." That single sentence buys you
        years of early warnings.
      </p>

      <h2>Make privacy a family value, not a punishment</h2>
      <p>
        Audit your own habits out loud. "I just denied that app camera
        access — it didn't need it." "I just changed my password because I
        used the same one twice." Kids copy what parents do far more than
        what parents say.
      </p>
    </MarketingLayout>
  );
}
