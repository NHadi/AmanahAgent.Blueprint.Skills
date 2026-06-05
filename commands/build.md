---
description: Autonomously execute a blueprint using Task & Mark
---

# Build: $ARGUMENTS

## Step 1: Read Blueprint
Read `.amanah/blueprints/$ARGUMENTS/now.md`. (If Full Mode) OR `.amanah/blueprints/$ARGUMENTS/fix.md` (If Lite Mode).

## Step 2: Identify Next Task
Find the first action item marked as `- [ ]` (unchecked). If it is blocked by dependencies in the Dependency Graph, notify the user.

## Step 3: Autonomous Implementation (Task & Mark)
1. **Implement**: Write the code required for the task.
2. **Mark**: Immediately edit the blueprint file to change `- [ ]` to `- [x]`.
3. **Validate**: Run linters or tests related to that specific file if possible.
4. **Loop**: Move to the next `- [ ]` task automatically until the current "Wave" or the entire blueprint is complete.
