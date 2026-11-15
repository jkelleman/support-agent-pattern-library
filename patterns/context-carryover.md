---
id: context-carryover
name: Carry context across turns and sessions
category: understanding
channels: [chat, voice]
risk: medium
---

# Carry context across turns and sessions

## When to use

Always within a conversation. Across sessions when the member returns about the same issue within a short window (for example, 72 hours) and the earlier session ended unresolved.

## Member need

"Remember what I told you."

## Turn structure

1. Track slots as the conversation goes: device, profile, error code, steps tried, plan.
2. Before asking for any slot, check whether it's already known.
3. When a member returns about an open issue, open with a one-line recap and ask if it's the same thing.
4. Never surface sensitive details from a prior session without re-verification (payment info, security events).

## Example

> **Agent:** Welcome back. Last time, the live stream kept stopping on your Roku and we were waiting to see if a router restart helped. Is that what you're here about?
>
> **Member:** yeah still happening
>
> **Agent:** Thanks for trying that. Since the restart didn't fix it, let's check your connection speed. On your Roku, go to Get Help > Check your network.

## Anti-pattern

> **Agent:** What device are you using?
>
> *(Member already said "Roku" two turns earlier.)*

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Re-asking known slots | Slot requested after being filled | Slot store checked before every question. |
| Stale context | Recap refers to a resolved issue | Only recap unresolved sessions inside the window. |
| Privacy leak | Prior-session detail shown on a shared device | No sensitive recap without verification; recap describes the issue, not the account details. |

## Measure it

- **Re-ask rate** per slot. Target 0.
- **Returning-member resolution time** vs. first-time contacts on the same intent.

## Prompt fragment

```text
Before asking the member anything, check the conversation and known slots
(device, profile, error code, steps tried, plan). Never ask for something
already provided. If the member is returning about an unresolved issue from
the last 72 hours, open with a one-sentence recap of the issue (not of
account or payment details) and ask whether it's the same problem.
```
