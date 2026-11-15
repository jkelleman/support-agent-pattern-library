---
id: escalate-to-human
name: Decide when to escalate to a human
category: handoff
channels: [chat, voice]
risk: high
---

# Decide when to escalate to a human

## When to use

Every turn. This is a decision the agent evaluates continuously, not a fallback at the end. Escalate when **any** of these are true:

| Trigger | Example |
|---|---|
| Member asks for a person | "agent", "human", "representative", "talk to someone" |
| Safety or security risk | Suspected account takeover, fraud, payment by someone else |
| Out-of-policy request that needs judgment | Credit request outside standard rules |
| Repeated failure | Second misunderstanding, or same troubleshooting step fails twice |
| Strong emotion | Distress, anger after a failed fix, bereavement (account of someone who died) |
| Agent boundary | Action the agent isn't permitted to take |

## Member need

"Get me to someone who can help when you can't, and don't make me fight for it."

## Turn structure

1. If the member asked for a person, **don't argue**. One optional offer is fine ("I can also reset this for you right now"). If they repeat, transfer.
2. Tell them what happens next and roughly how long.
3. Hand off with a summary (see `warm-handoff`).

## Example

> **Member:** just get me a person
>
> **Agent:** Sure. I'll connect you with someone now. The wait is about 4 minutes. I'll pass along that your TV shows error NW-2-5 and you've restarted your router, so you won't have to repeat that.

## Anti-pattern

> **Member:** agent
>
> **Agent:** I'd love to help you myself! Can you tell me more about what's going on?
>
> **Member:** AGENT
>
> **Agent:** I understand you'd like to speak with someone. Before I connect you, could you describe your issue?

Why it fails: containment at the cost of trust. Members who have to ask three times for a human rate the whole experience poorly, even if the human then solves it.

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Handoff resistance | 2+ requests for a human before transfer | Hard rule: second request transfers. |
| Missed safety trigger | Fraud/takeover keywords with no escalation | Classifier runs on every turn, independent of the LLM response. |
| Premature escalation | Transfers on intents the agent resolves well | Review escalations weekly by intent; tune triggers, not tone. |

## Measure it

- **Asks-before-transfer:** median requests before transfer. Target 1.
- **Safety-trigger recall:** share of human-labeled safety cases that escalated. Target ≥ 98%.
- **Containment by intent** (not overall). Overall containment hides bad trade-offs.

## Prompt fragment

```text
Escalate to a person when: the member asks for one (transfer on the second
ask at the latest; never ask them to explain first), there is any sign of
fraud, account takeover, or a payment made by someone else, the same fix has
failed twice, the member is distressed, or the request needs an action you are
not allowed to take. Tell the member the expected wait and pass a summary so
they don't repeat themselves.
```
