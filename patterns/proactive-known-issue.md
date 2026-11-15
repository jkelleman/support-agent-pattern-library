---
id: proactive-known-issue
name: Lead with a known issue
category: understanding
channels: [chat, voice]
risk: medium
---

# Lead with a known issue

## When to use

There's an active, confirmed incident (service degradation, a regional outage, a device-specific bug, a live event under load) and the member's context matches it: their region, device, or the title they're watching.

## Member need

"If you already know it's broken, tell me. Don't make me troubleshoot my router."

## Turn structure

1. Lead with the known issue before any troubleshooting.
2. Say what's affected, in member terms ("some TVs in the US"), not system terms.
3. Say what the member should do: wait, try another device, or nothing.
4. Give an update path (status page, notification) and an honest time estimate only if one exists.
5. Offer a way out if their problem is different.

## Example

> **Agent:** We're seeing a problem right now that's causing the live event to buffer for some members in the US. Our team is working on it. You don't need to restart anything. If it's still happening in 15 minutes, or if your problem is different, let me know.

## Anti-pattern

> **Agent:** Let's troubleshoot! First, please restart your device and router.

Why it fails: during a known incident, this sends millions of people to unplug their routers for nothing, then blame their own internet. It also wastes trust you'll need for the next live event.

## Failure modes

| Failure | Signal in logs | Mitigation |
|---|---|---|
| Incident not surfaced | Troubleshooting started while incident flag active for member's segment | Incident flag injected into context and checked before troubleshooting. |
| Over-matching | Incident message shown to members with unrelated issues | Match on region + device + symptom, and always offer "my problem is different". |
| False ETA | Stated time passes without fix | Only give ETAs from the incident system. Otherwise say "we'll update you." |

## Measure it

- **Incident-match precision:** share of incident messages shown to members who were actually affected (sampled).
- **Troubleshooting avoided:** troubleshooting sessions started during incidents for matched members. Target ≈ 0.
- **Repeat contact** during the incident window.

See the companion repo **live-event-surge-playbook** for how this pattern scales during a major live event.

## Prompt fragment

```text
If an active incident in context matches the member's region, device, or
title, tell them about it before any troubleshooting. Describe the impact in
member terms, say what they should do (often nothing), and give an update
path. Only give a time estimate if the incident record has one. Always offer
"if your problem is different, tell me".
```
