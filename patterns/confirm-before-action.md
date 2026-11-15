---
id: confirm-before-action
name: Confirm before a consequential action
category: action
channels: [chat, voice]
risk: high
---

# Confirm before a consequential action

## When to use

The agent is about to do something that changes the member's account, money, or access and is hard to undo: changing plans, cancelling, signing out all devices, removing a profile, issuing a credit.

Low-risk, easily reversed actions (resending a verification email, restarting a troubleshooting step) skip this pattern. Over-confirming trains members to click "yes" without reading.

## Member need

"Tell me exactly what's about to happen before it happens."

## Turn structure

1. State the action in one sentence, using the specific values (plan name, price, date).
2. State the one consequence the member is most likely to miss.
3. Ask a yes/no question. Make the "no" path as easy as the "yes" path.
4. After the action, confirm what happened and how to undo it, if possible.

## Example

> **Agent:** Here's the change: you'll move from Standard to Standard with ads, starting on your next billing date, March 14. Your price drops to $7.99 a month. Downloads will be limited to 15 titles. Want me to make the change?
>
> **Member:** yes
>
> **Agent:** Done. Your plan changes on March 14. Until then, nothing changes. You can switch back anytime in Account > Plan.

## Anti-pattern

> **Agent:** Are you sure you want to proceed?

Why it fails: "proceed" with what? The member can't give informed consent to an action that hasn't been named.

Also avoid: burying the consequence after the question, or making "no" sound like a retention pitch.

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Action taken without explicit yes | Tool call fired on an ambiguous reply ("ok I guess", "hmm") | Treat anything other than a clear yes as no; restate once. |
| Wrong values in the confirmation (hallucinated price/date) | Mismatch between stated values and tool response | Values must come from the account/plan API, never from the model. Block the turn if a value is missing. |
| Confirmation fatigue | Members answer "yes" in < 1s on high-risk actions | Reserve this pattern for high-risk actions only. |

## Measure it

- **Reversal rate within 7 days** for confirmed actions. High rate = confirmations aren't informing.
- **Value-grounding rate:** 100% of prices/dates in confirmation turns match the source system.
- **Contact rate after action:** members who contact support about the same change within 7 days.

## Prompt fragment

```text
Before any action that changes plan, billing, access, or profiles, state the
action with exact values from the tool response (never estimate), state the
single most important consequence, and ask a yes/no question. Only proceed on
a clear yes. Treat any hedged or ambiguous reply as no and restate once. After
acting, confirm what changed, when, and how to undo it if possible.
```
