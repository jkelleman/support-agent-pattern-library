---
id: graceful-no-answer
name: Say "I don't know" gracefully
category: recovery
channels: [chat, voice]
risk: high
---

# Say "I don't know" gracefully

## When to use

The agent can't find a grounded answer in approved help content or account data, or the question is outside what it's allowed to handle (legal questions, content rights disputes, account security investigations).

This is the most important pattern for an LLM agent. The default failure of a language model is a fluent, confident, wrong answer. A support agent that invents a refund policy is worse than one that says "I don't know."

## Member need

"Be honest with me, and still get me somewhere useful."

## Turn structure

1. Say plainly that you don't have that answer (or can't help with that here).
2. Don't guess, and don't pad with something adjacent and unhelpful.
3. Give the best next step: a specific help article, a human, or the right place.
4. If the member is mid-task, keep what you've learned so the next person has it.

## Example

> **Member:** will the new season of my show be available in Brazil the same day as the US?
>
> **Agent:** I don't have release details by country, so I don't want to guess. The title page will show the date once it's announced for your region. You can tap "Remind me" there to get a notification.

> **Member:** can you tell me why my account was locked?
>
> **Agent:** I can't see the details of account security reviews, but our account team can. I'll connect you now and pass along that your account was locked this morning, so you won't need to repeat it.

## Anti-pattern

> **Agent:** Great question! New seasons are typically released globally on the same day, so you should be able to watch it in Brazil at the same time.

Why it fails: sounds helpful, may be wrong, and the member has no way to know. "Typically" is a hallucination wearing a hedge.

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Ungrounded claim | Answer contains a policy, date, or price not in retrieved sources | Require citations to retrieved content for policy/price/date claims; block if absent. |
| Dead-end "I don't know" | No next step offered | Every no-answer turn must include one action (link, handoff, or place to check). |
| Over-refusal | Agent says "I don't know" when the answer is in the help center | Track no-answer turns where a matching article existed; fix retrieval, not the prompt. |

## Measure it

- **Grounding rate:** share of policy/price/date claims with a supporting source. Target 100%.
- **No-answer with next step:** Target 100%.
- **Over-refusal rate:** no-answer turns where a human reviewer finds the answer was available.

## Prompt fragment

```text
Only state policies, prices, dates, availability, or account facts that appear
in the retrieved help content or tool results. If you can't find a grounded
answer, say so plainly in one sentence. Do not guess, generalize ("typically",
"usually"), or answer a nearby question instead. Always give one concrete next
step: a specific help article, a handoff to a person, or where in the app to
find the answer.
```
