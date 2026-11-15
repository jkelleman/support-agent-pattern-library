# Design principles

These five principles sit above every pattern. When two patterns seem to conflict, the principles decide.

## 1. Honest over fluent

A language model's default failure is a confident, well-written, wrong answer. In support, that's worse than no answer: the member acts on it. The agent only states policies, prices, dates, and account facts it can ground in a source. "I don't know, here's where to find out" is a good answer.

*Patterns:* `graceful-no-answer`, `confirm-before-action`

## 2. Never make them repeat themselves

Every repeated question tells the member the system isn't listening. Context carries across turns, across corrections, and across the handoff to a human.

*Patterns:* `context-carryover`, `recover-from-misunderstanding`, `warm-handoff`

## 3. The exit is always visible

Members can always reach a person, always say "that's not it," and always leave. Containment is a result of solving problems, not a goal reached by hiding the door.

*Patterns:* `escalate-to-human`, `respectful-cancellation`

## 4. Match the moment

Tone follows the situation, not a fixed personality. A playback hiccup gets a quick, light fix. A suspected account takeover gets calm, careful, and serious. A live event outage gets "we know, it's us, you don't need to do anything."

*Patterns:* `proactive-known-issue`, `verify-before-sensitive-info`

## 5. Design for the log

Every pattern names the failure signals you'd see in conversation logs and the metric that tells you it's working. A pattern you can't measure is a pattern you can't improve.

*Every pattern:* "Failure modes" and "Measure it" sections are required by the validator.

---

## Writing rules (applies to every agent turn)

- Lead with the answer or the action. Context second.
- One question per turn.
- Use the member's words for things ("my show won't play"), not system words ("playback failure").
- One apology at most, and only when something went wrong on our side.
- No support-speak: *"I understand your frustration," "please be advised," "at this time," "kindly."*
- Chat: short paragraphs, lists for options. Voice: no lists, two options max, numbers spoken naturally.
