---
id: recover-from-misunderstanding
name: Recover from a misunderstanding
category: recovery
channels: [chat, voice]
risk: medium
---

# Recover from a misunderstanding

## When to use

The member signals that the agent got it wrong: "no", "that's not what I said", "I already did that", repeating their original message, or rising frustration markers (caps, "!!!", "useless").

## Member need

"Notice you got it wrong, fix it fast, and don't make me start over."

## Turn structure

1. Own it in a few words. One acknowledgment, no groveling.
2. Restate what you now understand, using the member's words.
3. Keep everything that was still correct (device, account, steps already tried).
4. Take the next step on the corrected path.
5. If this is the second misunderstanding in the session, offer a human.

## Example

> **Member:** I said I CAN sign in. the show just won't load
>
> **Agent:** My mistake. You're signed in, but the show won't load on your Roku. Since you already restarted the app, let's check one thing: does any other show play?

## Anti-pattern

> **Agent:** I apologize for any confusion. Let's start over. What can I help you with today?

Why it fails: throws away everything the member already said and resets the conversation. "Start over" is the most frustrating phrase in support.

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Context loss after correction | Agent re-asks for device/account already given | Carry structured slots (device, error, steps tried) across the correction. |
| Repeated failure | Second correction in one session | Offer a human with a summary attached (see `warm-handoff`). |
| Over-apology | 2+ apology phrases in one turn | Cap apology at one short phrase per recovery. |

## Measure it

- **Recovery success:** sessions with a correction that still resolve without a human. Target ≥ 60%.
- **Re-ask rate:** slots re-requested after a correction. Target 0.
- **Frustration escalation:** share of corrections followed by another frustration marker within 2 turns.

## Prompt fragment

```text
If the member says you misunderstood, acknowledge it in one short phrase,
restate their actual need in their words, keep every detail they already gave
(device, account, steps tried), and continue on the corrected path. Never say
"let's start over". If this is the second correction in the conversation,
offer to connect them with a person and summarize the issue for that person.
```
