---
id: warm-handoff
name: Warm handoff with summary
category: handoff
channels: [chat, voice]
risk: medium
---

# Warm handoff with summary

## When to use

Any transfer from the virtual agent to a human agent, or between queues.

## Member need

"Don't make me repeat myself."

## Agent need (the human on the other side)

"Tell me what's wrong, what's been tried, and how this person is feeling, in 10 seconds of reading."

## Turn structure

**To the member**
1. Say who they're going to (billing team, account security, a support agent).
2. Give the wait time.
3. Say what you're passing along.

**To the human agent (structured summary)**

```yaml
intent: playback_error
member_goal: "Watch live event on living room TV"
device: Roku Ultra
error_code: NW-2-5
steps_tried:
  - restarted app
  - restarted router
agent_attempts: 2
sentiment: frustrated
risk_flags: []
verbatim_last_message: "this is the third time this month"
```

## Example

> **Agent:** I'm connecting you with a support agent now. The wait is about 3 minutes. I've shared that your Roku shows NW-2-5 and that you've restarted both the app and your router, so they'll pick up from there.

## Anti-pattern

> **Agent:** Please hold while I transfer you.
>
> *(Human agent):* Hi! How can I help you today?

Why it fails: the member just spent five minutes explaining. The human starts from zero. This is the moment members decide the bot "wasted their time."

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Summary missing or empty | Handoff payload has null intent/steps | Block transfer UI from showing "summary attached" unless it is. |
| Summary is wrong | Human agent edits/overrides summary | Track override rate; review summaries with highest correction rate. |
| Sentiment omitted | Human opens cheerfully with an upset member | Always include sentiment and the member's last message verbatim. |

## Measure it

- **Repeat-ask rate:** human agent asks for info already in the summary. Target ≤ 10%.
- **Summary accuracy:** human-rated, sampled weekly. Target ≥ 90% accurate.
- **Handle time delta:** human handle time for warm vs. cold transfers.

## Prompt fragment

```text
When transferring, tell the member who they're going to, the wait time, and
what you're passing along. Produce a structured summary for the human agent
with: intent, member goal in their words, device, error code, steps tried,
number of your attempts, sentiment, risk flags, and the member's last message
verbatim. Never claim to pass along information you did not include.
```
