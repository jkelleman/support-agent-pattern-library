---
id: kebab-case-id
name: Human-readable pattern name
category: understanding | action | recovery | handoff
channels: [chat, voice]
risk: low | medium | high
---

# Pattern name

## When to use

The situation that triggers this pattern, and when NOT to use it.

## Member need

One sentence in the member's voice, in quotes.

## Turn structure

Numbered steps the agent follows.

## Example

A short, realistic exchange. Add a voice variant if the chat version doesn't work read aloud.

## Anti-pattern

A realistic bad version, and one or two sentences on why it fails.

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| | | |

## Measure it

2–3 metrics with targets. Prefer metrics you can compute from logs.

## Prompt fragment

```text
The instruction text an engineer can drop into the system prompt.
```

<!--
Checklist before opening a PR:
- [ ] Added to patterns.yaml with eval_criteria
- [ ] Example uses member language, not support-speak
- [ ] Voice variant included if the chat example uses lists or links
- [ ] `python scripts/validate_patterns.py` passes
-->
