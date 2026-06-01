# Amanah Blueprint Generator

**Implementation-ready feature blueprints and bug fix plans for Claude Code.**

Stop guessing what to build. Generate structured specs that any developer (or AI) can implement without coming back to ask "what did you mean?"

> Used in production at [AmanahAgent](https://github.com/nurulhadi/AmanahAgent) — a 12-project monorepo with FastAPI, Next.js, Expo, and more.

---

## What It Does

Two modes, one skill:

### Full Mode — New Features

Generates three files that work together:

```
.amanah/blueprints/{feature-name}/
├── what.md   → WHAT to build (requirements, edge cases, risks)
├── how.md    → HOW to build it (architecture, code, properties)
└── now.md    → WHAT TO DO NOW (action items, tests, checkpoints)
```

**Why three files?** Because mixing requirements, design, and tasks in one doc creates mess. `what.md` is for stakeholders. `how.md` is for architects. `now.md` is for developers.

### Lite Mode — Bug Fixes

Generates a single file:

```
.amanah/blueprints/{bug-name}/
└── fix.md   → Problem, root cause, fix steps, tests
```

Fast investigation → structured fix → ship it.

---

## Quick Start (60 seconds)

### 1. Copy to your project

```bash
# Clone this repo (or download the files)
git clone https://github.com/nurulhadi/amanah-blueprint.git /tmp/abp

# Copy the toolkit into your project
cp -r /tmp/abp/.amanah /path/to/your-project/
```

### 2. Install the Claude Code skill + agent

```bash
cd /path/to/your-project

# Install skill
mkdir -p .claude/skills/amanah-blueprint
cp .amanah/SKILL.md .claude/skills/amanah-blueprint/SKILL.md

# Install agent
cp .amanah/AGENT.md .claude/agents/amanah-blueprint-generator.agent.md
```

### 3. Add to your CLAUDE.md

```markdown
## Feature Blueprints

Blueprints live in `.amanah/blueprints/{feature-name}/`:
- `what.md` — What the feature must do
- `how.md` — How it's implemented
- `now.md` — Action items (implementation checklist)
- `fix.md` — Bug fix plans (Lite Mode)

**Always read these before modifying code for a feature.**
```

### 4. Start using it

Open Claude Code in your project and say:

```
create blueprint for user-authentication
```

Or for a bug fix:

```
fix bug: audio cuts off in video at 8 seconds
```

That's it. Claude researches your codebase and generates the blueprint.

---

## How It Works

### Full Mode Flow

```
You: "create blueprint for payment-integration"
                    ↓
    Claude researches your codebase
    (reads CLAUDE.md, finds existing patterns,
     checks for related services/models)
                    ↓
    Generates what.md → STOPS → asks "any revisions?"
                    ↓ (you confirm)
    Generates how.md  → STOPS → asks "any revisions?"
                    ↓ (you confirm)
    Generates now.md  → STOPS → asks "any revisions?"
                    ↓ (you confirm)
    Validates all 3 files (17 checks)
                    ↓
    Ready to implement
```

### Lite Mode Flow

```
You: "fix bug: login fails on Safari"
                    ↓
    Claude investigates root cause
    (greps for error, reads code, traces data flow)
                    ↓
    Generates fix.md → STOPS → asks "ready to implement?"
                    ↓ (you confirm)
    Ready to fix
```

---

## Usage Examples

### Full Mode

| You say | What happens |
|---------|-------------|
| "create blueprint for user-authentication" | Generates full what/how/now |
| "plan a new feature for payment-integration" | Researches codebase, generates blueprint |
| "blueprint for notification-system" | Full spec with edge cases, tests |
| "update the how doc for notifications" | Reads and edits existing blueprint |
| "what's left to do?" | Scans now.md for unchecked items |

### Lite Mode

| You say | What happens |
|---------|-------------|
| "fix bug: audio cuts off in video" | Investigates, generates fix.md |
| "why does login fail on Safari?" | Root cause analysis + fix plan |
| "hotfix: payment amount wrong" | Quick investigation + fix.md |
| "investigate: API returns 500 on large payloads" | Research, findings, fix steps |

---

## What Makes It Different

### vs. Just Asking Claude to "Plan a Feature"

| Without Blueprint | With Blueprint |
|---|---|
| Claude writes a plan from memory | Claude reads YOUR code first, finds patterns |
| Vague requirements | Formal WHEN/THEN SHALL acceptance criteria with examples |
| No edge cases | 5-10 edge cases with exact expected behavior |
| "Handle errors" | Error table: Scenario, HTTP code, Response, Recovery |
| "Write tests" | Property-based + unit + integration test plan |
| No traceability | Every task refs M-X.Y, every Property refs edge cases |
| Hope it works | 17 validation checks before you start coding |

### Key Features

- **Sequential workflow** — one file at a time, you review each before proceeding
- **Edge case discovery** — built-in checklist forces you to think about empty inputs, race conditions, timeouts, unicode
- **Existing code reuse** — searches your codebase BEFORE designing new components
- **Risks & mitigations** — what could go wrong in production, with how to handle it
- **Revision log** — tracks WHY changes were made (git only shows WHAT)
- **Cross-referencing** — every action item links to requirements (`_Ref: M-1.2_`)
- **Auto-validation** — file path verification, conflict detection, test coverage checks

---

## File Reference

### what.md — Requirements

| Section | Purpose |
|---------|---------|
| Overview | What and why (1-2 paragraphs) |
| Glossary | Domain terms defined |
| Must-Haves (M-1, M-2...) | P0/P1/P2 priority, user stories, acceptance criteria |
| Quality Targets | Measurable: "95th percentile < 200ms" |
| Risks & Mitigations | What could go wrong in production |
| Edge Cases | 5-10 tricky scenarios with exact behavior |
| Open Decisions | Questions that block implementation |
| Boundaries | Constraints (no DB changes, etc.) |
| Not Doing | Explicitly excluded |
| Depends On | Internal/external dependencies |

### how.md — Design

| Section | Purpose |
|---------|---------|
| Overview + Key Decisions | WHY these design choices |
| Architecture | Mermaid sequence diagram |
| Existing Code to Reuse | Table of services/utils to leverage |
| Components | Full code examples with imports, type hints |
| Data Models | New + existing model changes |
| Correctness Properties | Formal statements linking to M-N |
| Error Handling | Scenario, HTTP code, Response, Recovery |
| Testing Strategy | Property-based + unit + integration |

### now.md — Action Items

| Section | Purpose |
|---------|---------|
| Action Items | Numbered, exact file paths, method signatures |
| Checkpoints | Phase-gate validation between waves |
| Tests | Every Property and edge case has a test |
| Dependency Graph | JSON waves for parallelization |

### fix.md — Bug Fix (Lite Mode)

| Section | Purpose |
|---------|---------|
| Problem | What's broken (concrete example) |
| Root Cause | WHERE (file:line) and WHY |
| Files Affected | Table of changes |
| Fix Steps | Numbered, old code → new code |
| Edge Cases | 3+ scenarios to verify |
| Tests | Fix test + regression test |
| Risks | What could go wrong with this fix |

---

## Optional: Progress Tracking Hook

Add to `.claude/settings.json` to see blueprint progress in your terminal:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "file=\"$TOOL_INPUT_FILE_PATH\"; if [ -n \"$file\" ] && echo \"$file\" | grep -qE '\\.amanah/blueprints/[^/]+/(what|how|now|fix)\\.md$'; then echo \"BLUEPRINT UPDATED: $file\"; if echo \"$file\" | grep -qE '(now|fix)\\.md$'; then checked=$(grep -c '\\- \\[x\\]' \"$file\" 2>/dev/null || echo 0); unchecked=$(grep -c '\\- \\[ \\]' \"$file\" 2>/dev/null || echo 0); total=$((checked + unchecked)); echo \"PROGRESS: $checked/$total done\"; fi; fi"
          }
        ]
      }
    ]
  }
}
```

---

## Conventions

- Feature names are **kebab-case** (`user-authentication`, not `UserAuthentication`)
- Items are numbered (1, 1.1, 1.1.1) for cross-referencing
- All tasks start as `- [ ]` (unchecked) — mark `- [x]` when done
- Every action item refs at least one requirement (`_Ref: M-X.Y_`)
- Acceptance criteria use formal SHALL/WHEN/THEN language
- Every criterion includes a **concrete example** with actual values

---

## FAQ

**Q: Does this work with any tech stack?**
Yes. The templates adapt to your stack. Python/FastAPI, TypeScript/Next.js, Go, Java, Ruby — the skill detects your stack from CLAUDE.md, package.json, requirements.txt, etc.

**Q: Can I use this without Claude Code?**
The skill and agent files are designed for Claude Code. But the blueprint structure (what/how/now) is universal — you can use it with any AI or even write them manually.

**Q: Does it modify my code?**
No. It only writes files to `.amanah/blueprints/`. Your source code is untouched.

**Q: What if I already have specs in another format?**
The skill checks `.amanah/blueprints/` for existing specs and follows the same structure. You can migrate old specs incrementally — no big bang needed.

**Q: How is this different from GitHub Issues or Jira?**
Issues/Jira track work. Blueprints define HOW to do the work. A blueprint is what you hand to a developer (or AI) so they can implement without guessing.

---

## License

MIT — Use it anywhere, no attribution required.

---

## Contributing

Found a bug? Have an improvement? PRs welcome.

1. Fork this repo
2. Make your changes to `SKILL.md` or `AGENT.md`
3. Test by generating a blueprint in a real project
4. Submit a PR explaining what improved and why
