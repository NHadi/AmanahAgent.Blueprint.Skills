---
description: Generate a full feature blueprint (what.md → how.md → now.md)
---

# Blueprint: $ARGUMENTS

## Step 1: Read Project Context

Read ALL files in `.amanah/atlas/` if they exist:
- `product.md` — product domain, user roles
- `tech.md` — stack, libraries, databases
- `structure.md` — directory layout, code patterns
- `conventions.md` — coding rules, gotchas
- `quickstart.md` — common task recipes

If atlas doesn't exist, fall back to `CLAUDE.md`, `README.md`, and project files.

## Step 2: Research the Codebase

Search for related existing code BEFORE designing anything:
- Similar services/modules (grep for related class/function names)
- Similar data models (grep for related table/type names)
- Similar API endpoints (grep for related URL patterns)
- Check `.amanah/blueprints/` for existing specs — match their depth

## Step 3: Generate what.md

Create `.amanah/blueprints/{kebab-case-name}/what.md` with:

1. **Overview** — what and why (1-2 paragraphs)
2. **Glossary** — every domain term with `**Term**: Definition`
3. **Must-Haves** — M-1, M-2, ... each with:
   - **Priority**: P0 | P1 | P2
   - **User Story**: `As a {role}, I want {goal}, so that {benefit}`
   - **Acceptance Criteria**: `WHEN/IF/THEN THE SYSTEM SHALL` with concrete examples
4. **Quality Targets** — Q-1, Q-2 with measurable targets
5. **Security Considerations** — threat surface, data sensitivity
6. **Performance & Scalability** — expected load, indexes, N+1 risks, timeouts
7. **Risks & Mitigations** — table with Risk | Impact | Likelihood | Mitigation
8. **Edge Cases** — table with 5+ scenarios: Scenario | Expected Behavior | Why It's Tricky
9. **Open Decisions** — checkbox list of unresolved questions (or "None")
10. **Boundaries** — technical and business constraints
11. **Not Doing** — explicitly excluded
12. **Depends On** — internal and external dependencies
13. **Revision Log** — table initialized with today's date

**STOP. Ask user: "what.md is ready. Review it — any revisions before I proceed to how.md?"**

## Step 4: Generate how.md (only after user confirms what.md)

1. **Overview** — summary + Key Design Decisions (3-5 bullets explaining WHY)
2. **Architecture** — Mermaid sequence diagram
3. **Components and Interfaces**:
   - **Existing Code to Reuse** — table: What | File Path | How to Reuse
   - For each component: full code with imports, type hints, method signatures, logic
   - Empty input guards, no stubbed code, `asyncio.to_thread()` for blocking I/O
4. **Data Models** — new and existing model changes
5. **Correctness Properties** — `Property N: Title` with `Validates: M-X` refs
6. **Error Handling** — table: Scenario | HTTP Code | Response | Recovery
7. **Testing Strategy** — property-based + unit + integration
8. **Revision Log**

**STOP. Ask user: "how.md is ready. Review it — any revisions before I proceed to now.md?"**

## Step 5: Generate now.md (only after user confirms how.md)

1. **Overview** — brief recap
2. **Action Items** — numbered, exact file paths, method signatures, `_Ref: M-X.Y_`
3. **Checkpoints** — between implementation phases
4. **Notes** — constraints, ordering, gotchas
5. **Dependency Graph** — JSON waves format
6. **Revision Log**

**STOP. Ask user: "now.md is ready. Any final revisions?"**

## Rules

- Generate one file at a time. STOP after each. Never generate all three at once.
- Use formal language: `WHEN/THEN THE SYSTEM SHALL`
- Every acceptance criterion needs a concrete example with actual values
- Every edge case needs exact expected behavior (not "handle gracefully")
- Code examples must have full implementations (no `# ... same as ...`)
- Search for reusable code BEFORE designing new components
- Match the depth of existing blueprints in `.amanah/blueprints/`
