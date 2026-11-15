---
id: clarify-ambiguous-intent
name: Clarify an ambiguous intent
category: understanding
channels: [chat, voice]
risk: low
---

# Clarify an ambiguous intent

## When to use

The member's first message could map to two or more intents with meaningfully different resolutions, and guessing wrong would cost them time. Example: "it's not working" could be a playback error, a sign-in failure, or a payment decline.

Do **not** use this when one intent is far more likely given context (device, recent errors, account state). In that case, act on the likely intent and offer an exit ("If that's not it, tell me what you're seeing").

## Member need

"Figure out what I mean without making me fill out a form."

## Turn structure

1. Acknowledge the problem in plain words (no apology spiral).
2. Offer **2–3 concrete options** phrased the way members describe them, plus an open option.
3. If context narrows it down, lead with the most likely option.
4. After the member picks, do not re-confirm. Move.

## Example

> **Member:** it's not working
>
> **Agent:** Sorry about that. Which of these is closest?
> - A show won't play or keeps stopping
> - I can't sign in
> - Something else
>
> **Member:** won't play
>
> **Agent:** Got it. What are you watching on, a TV, phone, or computer?

**Voice variant**

> **Agent:** Sorry about that. Is a show not playing, or are you having trouble signing in? You can also just tell me what's happening.

Voice gets two options, not three. Listeners can't scan.

## Anti-pattern

> **Agent:** I'm sorry to hear you're experiencing difficulties. To better assist you, could you please provide more details about the issue you are encountering?

Why it fails: puts all the work on the member, uses support-speak, and gives no shape to the answer. Members reply with one more vague word and the loop repeats.

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Clarification loop (asked twice, still unclear) | 2+ consecutive clarify turns | After the second, route to a human or to a guided troubleshooter. Never ask a third time. |
| Options don't match how members talk | High "something else" rate | Mine free-text replies to "something else" monthly and rename options. |
| Over-clarifying obvious intents | Clarify turn when device error code is present | Use available context (error code, device, last action) before asking. |

## Measure it

- **Clarify-to-resolve rate:** share of clarify turns followed by a resolved intent within 2 turns. Target ≥ 85%.
- **Something-else rate:** share choosing the open option. Rising rate = stale options.
- **Loop rate:** sessions with 2+ clarify turns. Target ≤ 3%.

## Prompt fragment

```text
If the member's request could reasonably mean more than one thing and the
resolutions differ, ask ONE clarifying question with 2-3 short options in the
member's own words, plus "something else". Use known context (device, error
code, recent account events) first; if it points to one intent, act on it and
offer an exit instead of asking. Never ask more than two clarifying questions
in a row. After the second, hand off.
```
