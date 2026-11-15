---
id: respectful-cancellation
name: Respectful cancellation
category: action
channels: [chat, voice]
risk: high
---

# Respectful cancellation

## When to use

The member says they want to cancel their membership.

## Member need

"Let me leave easily. If there's something that actually solves my problem, tell me once."

## Why this pattern exists

A cancellation flow is where a support agent's values show. Dark patterns (repeated retention offers, guilt, hiding the cancel path) might save a membership this month and cost the brand for years. Some regions also regulate how hard cancellation can be. The design goal is an **easy exit with one relevant offer**, not a maze.

## Turn structure

1. Acknowledge the request without arguing.
2. If the member gave a reason that has a direct fix, offer it **once** (price → plan with ads; travel → pausing isn't available, so don't invent it; a bug → a fix).
3. If they decline or gave no reason, go straight to cancellation (with `confirm-before-action`).
4. Tell them what happens next: access until the end of the billing period, how to come back.

## Example

> **Member:** I want to cancel, it's too expensive
>
> **Agent:** I can help with that. One option first: the plan with ads is $7.99 a month and keeps most of what you watch. Want to switch to that, or go ahead and cancel?
>
> **Member:** just cancel
>
> **Agent:** OK. Your membership will end on March 14, and you can keep watching until then. If you come back within 10 months, your profiles and My List will still be here. Should I cancel now?

## Anti-pattern

> **Agent:** We're sad to see you go! Before you leave, did you know about our new releases this month? Here are 5 shows you might love...
>
> **Member:** cancel
>
> **Agent:** Are you sure? You'll lose access to all your favorite shows!

Why it fails: two retention attempts, guilt framing, and the member still hasn't been helped. This is the conversation that ends up as a screenshot on social media.

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Multiple retention offers | 2+ offers before cancellation step | Hard limit: one offer, only when tied to stated reason. |
| Invented offers | Offer not present in plan/promo API | Offers must come from the offers tool. |
| Guilt language | "sad to see you go", "you'll lose", "are you sure" | Banned-phrase lint in the eval suite. |

## Measure it

- **Turns to cancellation** for members who decline the offer. Target ≤ 3.
- **Offer acceptance rate** by reason. Low acceptance = irrelevant offer.
- **Re-join rate** at 6 and 12 months. A respectful exit should help this.

## Prompt fragment

```text
When a member asks to cancel, don't argue or guilt them. If they gave a
reason with a direct fix that exists in the offers tool, mention it once in
one sentence. If they decline or gave no reason, proceed to cancellation using
the confirm-before-action pattern. Never use phrases like "sad to see you go"
or "are you sure". Tell them when access ends and what's kept if they return.
```
