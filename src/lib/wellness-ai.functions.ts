import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  childName: z.string().min(1).max(40),
  childAge: z.number().int().min(1).max(25),
  weekLabel: z.string().min(1).max(60),
  stats: z.object({
    totalHours: z.number(),
    avgDaily: z.number(),
    score: z.number(),
    byCategory: z.record(z.string(), z.number()),
    topApps: z
      .array(z.object({ name: z.string(), category: z.string(), hours: z.number() }))
      .max(10),
  }),
  prevStats: z
    .object({
      totalHours: z.number(),
      avgDaily: z.number(),
      score: z.number(),
    })
    .nullable(),
  alertCount: z.number().int().min(0).max(50),
});

export type WellnessInsights = {
  insights: string[];
  trends: string[];
  conversationStarters: string[];
  nextWeekFocus: string;
};

export const generateWellnessReport = createServerFn({ method: "POST" })
  .inputValidator((data) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<WellnessInsights> => {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("ANTHROPIC_API_KEY is not configured");

    const prompt = `You are a warm, empathetic family wellness coach writing a weekly digital wellness report for a parent. Be calm, non-alarming, solution-focused. Use "${data.childName}" by name. Avoid words like "violation", "caught", "bad". Use language like "noticed", "spent time on", "might be worth".

Child: ${data.childName}, age ${data.childAge}
Week: ${data.weekLabel}
Total screen time: ${data.stats.totalHours}h (avg ${data.stats.avgDaily}h/day)
Wellness score: ${data.stats.score}/100
Behavior alerts this week: ${data.alertCount}
Time by category (hours): ${JSON.stringify(data.stats.byCategory)}
Top apps: ${data.stats.topApps.map((a) => `${a.name} (${a.category}, ${a.hours}h)`).join(", ")}
${
  data.prevStats
    ? `Previous week: ${data.prevStats.totalHours}h total, avg ${data.prevStats.avgDaily}h/day, score ${data.prevStats.score}/100`
    : "No previous week data available."
}

Return ONLY valid JSON matching this exact shape:
{
  "insights": ["3 to 4 short bullet observations about this week, warm tone, under 20 words each"],
  "trends": ["2 to 3 short notes comparing to last week, neutral and curious"],
  "conversationStarters": ["2 to 3 questions a parent could warmly ask their child, curious not accusatory, under 25 words each"],
  "nextWeekFocus": "one short, simple, actionable recommendation for next week, under 30 words"
}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Anthropic API error [${res.status}]: ${body.slice(0, 400)}`);
    }

    const json = (await res.json()) as { content?: { type: string; text: string }[] };
    const text = json.content?.find((c) => c.type === "text")?.text ?? "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("AI did not return JSON");

    const parsed = JSON.parse(match[0]) as WellnessInsights;
    return {
      insights: (parsed.insights ?? []).slice(0, 4),
      trends: (parsed.trends ?? []).slice(0, 3),
      conversationStarters: (parsed.conversationStarters ?? []).slice(0, 3),
      nextWeekFocus: parsed.nextWeekFocus ?? "",
    };
  });
