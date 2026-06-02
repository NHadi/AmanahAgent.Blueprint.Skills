---
description: Read existing blueprint specs before working on a feature
---

# Spec: $ARGUMENTS

## Read All Blueprint Files

Read these files from `.amanah/blueprints/{name}/` if they exist:
1. `what.md` — requirements, edge cases, risks
2. `how.md` — architecture, code design, properties
3. `now.md` — action items and progress

If `fix.md` exists instead, read that (Lite Mode bug fix).

## Summarize

After reading, provide:
1. **What this feature does** — 2-3 sentence summary
2. **Current progress** — count `- [x]` vs `- [ ]` in now.md
3. **Key design decisions** — from how.md
4. **Edge cases to watch** — from what.md
5. **Next steps** — first unchecked items in now.md

## Then Wait

Ask user: "What would you like to do?
- Implement the next tasks?
- Update the specs?
- Something else?"

## Rules

- Always read ALL spec files before touching feature code
- If no blueprint exists, suggest running `/blueprint $ARGUMENTS`
- Never modify code without understanding the spec first
