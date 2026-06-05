import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export const Route = createFileRoute("/resources/healthy-screen-time-habits")({
  head: () => ({
    meta: [
      { title: "Healthy Screen-Time Habits for Modern Families — Guardian AI" },
      {
        name: "description",
        content:
          "Move beyond strict timers. Build screen-time rhythms that protect sleep, attention, and family connection without daily battles.",
      },
      { property: "og:title", content: "Healthy Screen-Time Habits for Modern Families" },
      {
        property: "og:description",
        content:
          "A calmer approach to screen time, built on rhythms instead of rules.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://guardian-ai-family-hub.lovable.app/resources/healthy-screen-time-habits",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://guardian-ai-family-hub.lovable.app/resources/healthy-screen-time-habits",
      },
    ],
  }),
  component: Article,
});

function Article() {
  return (
    <MarketingLayout title="Healthy Screen-Time Habits for Modern Families">
      <p>
        Screen-time fights are exhausting — and they usually don't work. The
        families with the calmest tech lives aren't the ones with the
        strictest timers. They're the ones who've built <em>rhythms</em> kids
        can predict, so screens stop feeling like the only thing worth
        wanting.
      </p>
      <p>
        This guide walks through a practical framework you can adapt to any
        age, plus the small habits that make the biggest difference.
      </p>

      <h2>Quality beats quantity</h2>
      <p>
        Two hours of a creative project, a video call with cousins, or a
        co-watched documentary is not the same as two hours of autoplay
        shorts. Before you measure minutes, sort screen time into three
        buckets:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li><strong>Create</strong> — coding, drawing, music, writing, building.</li>
        <li><strong>Connect</strong> — video calls with family, co-op games with real friends.</li>
        <li><strong>Consume</strong> — scrolling, short videos, passive watching.</li>
      </ul>
      <p>
        Most families don't need less total screen time. They need less of
        the third bucket.
      </p>

      <h2>The three rhythms that change everything</h2>

      <h3>1. Protect sleep first</h3>
      <p>
        Phones, tablets, and game consoles out of bedrooms after a set time
        — no exceptions, including for parents. A simple charging station in
        the kitchen or hallway removes the daily negotiation. Aim for
        screens off at least 60 minutes before bedtime; melatonin and sleep
        quality both improve.
      </p>

      <h3>2. Protect meals</h3>
      <p>
        One meal a day, ideally dinner, is screen-free for everyone. This is
        the single highest-leverage habit in this whole article. It
        normalizes conversation, models presence, and gives kids a daily
        baseline of undistracted attention from the adults they love.
      </p>

      <h3>3. Protect mornings</h3>
      <p>
        Mornings set the tone for the whole day. No screens before school —
        not for kids, not for parents-at-the-table. Breakfast, getting ready,
        and the walk or drive to school are protected.
      </p>

      <h2>A simple weekday/weekend rhythm</h2>
      <p>
        Rules that change daily are exhausting. Try one of these shapes and
        adapt it:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li>
          <strong>Weekdays:</strong> homework first, then up to 60 minutes of
          screen time before dinner. No screens after dinner.
        </li>
        <li>
          <strong>Weekends:</strong> a longer block (e.g. 2 hours) of their
          choosing, plus one screen-free family activity.
        </li>
      </ul>
      <p>
        Predictability matters more than perfection. Kids who know what's
        coming negotiate less.
      </p>

      <h2>Make the off-screen options easy</h2>
      <p>
        "Less screen time" doesn't motivate kids. Better alternatives do.
        Keep a low-effort "boredom shelf" stocked: a deck of cards, art
        supplies, a half-finished puzzle, a guitar with a tuner, library
        books refreshed weekly. The easier the alternative, the less screens
        win by default.
      </p>

      <h2>Use built-in tools without making them a battle</h2>
      <ul className="ml-5 list-disc space-y-1">
        <li>Set app limits on the most addictive apps, not all apps.</li>
        <li>Turn off autoplay and notifications by default.</li>
        <li>Use grayscale mode in the evening — it dulls the dopamine hit of bright feeds.</li>
        <li>Set "downtime" windows that match your family's sleep rhythm.</li>
      </ul>
      <p>
        Involve your kid in the setup. Tools imposed in secret get
        circumvented; tools set up together get respected.</p>

      <h2>Watch for the real warning signs</h2>
      <p>
        The number on the screen-time report matters less than these
        behavioral signals:
      </p>
      <ul className="ml-5 list-disc space-y-1">
        <li>Mood crashes when devices are put away.</li>
        <li>Sleep getting later, harder, or more interrupted.</li>
        <li>Dropping a hobby, sport, or friendship they used to love.</li>
        <li>Sneaking devices into bedrooms or bathrooms.</li>
        <li>Lying about what they're using or for how long.</li>
      </ul>
      <p>
        Any one of these is worth a calm, curious conversation — not a
        crackdown.
      </p>

      <h2>Model what you want to see</h2>
      <p>
        Kids absorb our screen habits long before they form their own. If
        you scroll through dinner, they'll fight for the same. If your phone
        lives in the other room during family time, theirs eventually will
        too. The most effective screen-time policy in any home is the one
        the adults follow.
      </p>

      <h2>Reset, don't restart, when things slip</h2>
      <p>
        Vacations, illness, and busy seasons will blow up the rhythm — that's
        normal. Pick one anchor habit (often the screen-free dinner) and
        rebuild from there. You don't need a perfect plan. You need a
        repeatable one.
      </p>
    </MarketingLayout>
  );
}
