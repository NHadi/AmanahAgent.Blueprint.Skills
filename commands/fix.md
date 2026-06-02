---
description: Generate a bug fix plan (Lite Mode — fix.md)
---

# Fix: $ARGUMENTS

## Step 1: Read Project Context

Read `.amanah/atlas/` files if they exist. Fall back to `CLAUDE.md` if not.

## Step 2: Investigate

1. Understand the bug — symptoms, reproduction steps, error messages
2. Find root cause — grep for error messages, trace data flow, read the code
3. Identify the minimal fix needed
4. Check if the same pattern exists elsewhere (could break the same way)
5. Check `conventions.md` for gotchas the fix must respect

## Step 3: Generate fix.md

Create `.amanah/blueprints/{kebab-case-name}/fix.md` with:

1. **Problem** — what's broken, what the user sees (concrete example)
2. **Root Cause** — WHERE (file:line) and WHY (with code reference)
3. **Files Affected** — table: File | Change Type | What Changes
4. **Fix Steps** — numbered with exact file paths, line numbers, old → new code
5. **Edge Cases to Verify** — 3+ scenarios that could break
6. **Tests** — 1 fix test + 1 regression test minimum
7. **Risks** — what could go wrong with this fix
8. **Notes** — related context, PRs, issues
9. **Revision Log** — initialized with today's date

**STOP. Ask user: "fix.md is ready. Review it — any revisions before implementing?"**

## Escalation

If during investigation:
- Bug affects >5 files → recommend switching to Full Mode (`/blueprint`)
- Bug needs new architecture → recommend Full Mode
- Root cause unclear after investigation → note hypotheses in fix.md

## Rules

- Fix must be minimal (≤5 files). If bigger, escalate to Full Mode.
- Root cause must reference specific file:line (not vague)
- Every fix step needs old code → new code (not "fix the bug")
- Include regression test to prevent the same bug returning
