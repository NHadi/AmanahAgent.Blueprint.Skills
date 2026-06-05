---
description: Generate Vitest tests based on a blueprint strategy
---

# Test: $ARGUMENTS

## Step 1: Read Blueprint
Read the blueprint in `.amanah/blueprints/$ARGUMENTS/`. Focus on the **Testing Strategy** in `how.md` and **Tests** in `now.md`.

## Step 2: Read Existing Tests
Scan the project for existing test files to match the local pattern (e.g., `src/__tests__/` or `*.test.ts`).

## Step 3: Generate
Create a new Vitest test file that implements:
- Property-based tests (if specified)
- Unit tests
- Integration scenarios

## Step 4: Verification
Ensure all imports match the project's `@/` aliases.
