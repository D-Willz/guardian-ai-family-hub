import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ArticleMeta, RelatedArticles, Sources } from "@/components/ArticleMeta";

export const Route = createFileRoute("/resources/teaching-kids-online-privacy")({
  head: () => ({
    meta: [
      { title: "How to Teach Kids Online Privacy — Guardian AI" },
      {
        name: "description",
        content:
          "A practical, plain-language guide for parents on teaching kids the online privacy basics they'll actually remember — with scenarios, an activity, and a family FAQ.",
      },
      { property: "og:title", content: "How to Teach Kids Online Privacy" },
      {
        property: "og:description",
        content: "Privacy basics every kid should know — with examples you can use tonight.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.myguardianai.app/resources/teaching-kids-online-privacy" },
    ],
    links: [{ rel: "canonical", href: "https://www.myguardianai.app/resources/teaching-kids-online-privacy" }],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="How to Teach Kids Online Privacy">
      <ArticleMeta published="June 19, 2026" reviewed="June 19, 2026" readingTime="8 min read" />

      <p>
        Most kids learn online privacy the painful way: a screenshot that
        gets passed around, a username that leaks their real identity, a
        quiz that scrapes their data. You can shortcut all of that with a
        handful of clear, repeatable ideas — taught the way kids actually
        learn, through examples and small experiments.
      </p>

      <h2>The one-sentence rule</h2>
      <p>
        Teach this first, and repeat it for years:{" "}
        <em>"Anything you put online — even in a private chat — could end
        up in front of anyone."</em> Not as a threat. As a fact, like
        gravity. Once kids internalize it, every other lesson gets easier.
      </p>

      <h2>Family scenarios that come up a lot</h2>
      <ul className="ml-5 list-disc space-y-2">
        <li>
          <strong>"It's just a fun quiz."</strong> "Which Disney villain
          are you?" quizzes are often data-collection in costume. Make it
          a household rule: no quizzes that ask for an email, a birthday,
          or a phone number.
        </li>
        <li>
          <strong>"My friends already have my phone number."</strong>
          That's fine — but contact-sync in a brand-new app can leak it
          to thousands. Walk through the sync screen together before
          tapping "Allow".
        </li>
        <li>
          <strong>"I want to post my new room."</strong> Great. Crop out
          the window, the school uniform on the chair, and the package
          with your address. Then post.
        </li>
      </ul>

      <h2>The five things kids should learn to protect</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li><strong>Their real name.</strong> Usernames shouldn't include it, neither should their email handle.</li>
        <li><strong>Their location.</strong> School name, town, sports team logos, street signs in photos — all leak it.</li>
        <li><strong>Their face.</strong> Especially in profile pictures on public accounts.</li>
        <li><strong>Their passwords.</strong> Not even to best friends. Especially not to best friends.</li>
        <li><strong>Other people's information.</strong> A friend's secret, a sibling's photo, a parent's credit card.</li>
      </ol>

      <h2>Age-specific guidance</h2>

      <h3>Ages 5–8</h3>
      <ul className="ml-5 list-disc space-y-1">
        <li>Teach the words "private" and "public" with concrete examples (bedroom vs. front yard).</li>
        <li>No real name in any account a parent didn't set up.</li>
        <li>Parents enter all passwords. The kid doesn't need to know them yet.</li>
      </ul>

      <h3>Ages 9–12</h3>
      <ul className="ml-5 list-disc space-y-1">
        <li>Set up a family password manager together — let them pick the family passphrase style.</li>
        <li>Lock down defaults on every new app together for the first six months.</li>
        <li>Introduce the "Grandparent test" for posts.</li>
      </ul>

      <h3>Ages 13+</h3>
      <ul className="ml-5 list-disc space-y-1">
        <li>Show them how to read an app's privacy label in the app store.</li>
        <li>Teach metadata: photos can carry GPS and timestamps.</li>
        <li>Talk through what to do if an intimate image of theirs or a friend's is shared without consent — including who to tell at school and online (e.g. NCMEC's Take It Down service).</li>
      </ul>

      <h2>A 15-minute family activity: the "App Audit"</h2>
      <ol className="ml-5 list-decimal space-y-1">
        <li>Pick one app on your kid's phone — start with the one they use most.</li>
        <li>Open Settings → Privacy together. Read out loud what permissions it has.</li>
        <li>For each permission, ask: "Does the app actually need this to work?"</li>
        <li>Turn off everything the app doesn't truly need.</li>
        <li>Find the "Who can contact me" and "Who can see my profile" settings. Set both to friends-only.</li>
        <li>Repeat next week with a different app.</li>
      </ol>

      <h2>Two demos that make it click</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>
          <strong>Reverse image search.</strong> Take a photo of your
          living room and run it through Google Image Search. Show how
          much can be pieced together from a single picture.
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
        Kids will mess up. The most important rule in your house should
        be: "If you make a privacy mistake, tell me — you won't get in
        trouble for telling me, only for hiding it." That single sentence
        buys you years of early warnings.
      </p>

      <h2>FAQ</h2>
      <h3>Should I read my kid's messages?</h3>
      <p>
        For young kids using a family device, yes — openly, with them
        knowing. For tweens and teens, blanket surveillance usually
        backfires. Better: clear agreements about when you'll check
        together, and a strong "no trouble for telling me" rule.
      </p>
      <h3>Is a private account actually private?</h3>
      <p>
        Safer, not private. Followers can screenshot. Platforms can
        breach. Always assume anything posted could become public.
      </p>
      <h3>What should we do about old accounts?</h3>
      <p>
        Once a year, sit down together and delete or deactivate accounts
        your kid no longer uses. Old accounts are common breach targets.
      </p>

      <RelatedArticles
        links={[
          { to: "/resources/app-privacy-review-checklist", title: "App Privacy Review Checklist" },
          { to: "/resources/talking-to-kids-about-ai", title: "How Parents Can Talk to Kids About AI Safely" },
          { to: "/resources/family-technology-agreements", title: "Writing a Family Technology Agreement That Works" },
        ]}
      />

      <Sources
        items={[
          {
            title: "Protecting Kids' Privacy Online",
            publisher: "U.S. Federal Trade Commission",
            url: "https://consumer.ftc.gov/articles/protecting-kids-online",
          },
          {
            title: "Privacy and digital wellbeing for families",
            publisher: "Common Sense Media",
            url: "https://www.commonsensemedia.org/privacy-and-internet-safety",
          },
          {
            title: "Have I Been Pwned",
            publisher: "Troy Hunt",
            url: "https://haveibeenpwned.com/",
          },
          {
            title: "Take It Down (remove explicit images of minors)",
            publisher: "National Center for Missing & Exploited Children",
            url: "https://takeitdown.ncmec.org/",
          },
        ]}
      />
    </MarketingLayout>
  );
}
