---
description: One-command setup — generates atlas, installs commands + skills + agents
---

# Initialize Amanah Blueprint

The one command to rule them all. Sets up everything the framework needs in your project.

## Step 1: Detect Stack

Check project files to determine the tech stack:
- Read `CLAUDE.md`, `README.md` if they exist
- Check `package.json`, `requirements.txt`, `go.mod`, `Cargo.toml`, `pyproject.toml`, etc.
- Scan directory structure (top 3 levels)
- Identify framework (Next.js, Django, FastAPI, Express, Spring Boot, Rails, etc.)

Tell the user what you detected:
```
Detected stack:
  Language:  Python 3.11
  Framework: FastAPI
  Database:  PostgreSQL + Redis
  ORM:       SQLAlchemy 2.0
  Tests:     pytest
```

## Step 2: Install Commands

Copy slash commands from `.amanah/commands/` to `.claude/commands/`:

```bash
mkdir -p .claude/commands
cp .amanah/commands/*.md .claude/commands/
```

If `.amanah/commands/` doesn't exist (user installed differently), skip this step — the commands are already in this prompt.

Create these 5 commands in `.claude/commands/`:

### blueprint.md
### fix.md
### atlas.md
### spec.md
### setup.md

(See `.amanah/commands/` for templates.)

## Step 3: Install Skill + Agent

Create directories and copy:

```bash
mkdir -p .claude/skills/amanah-blueprint
mkdir -p .claude/skills/amanah-atlas-generator
mkdir -p .claude/agents
```

Copy from `.amanah/` source to `.claude/` installed:
- `SKILL.md` → `.claude/skills/amanah-blueprint/SKILL.md`
- `AGENT.md` → `.claude/agents/amanah-blueprint-generator.agent.md`
- `atlas-generator/SKILL.md` → `.claude/skills/amanah-atlas-generator/SKILL.md`

If source files don't exist, skip — user may have installed them differently.

## Step 4: Generate Atlas (Most Important)

This is the key step. Atlas makes the AI actually understand your project.

Scan the codebase thoroughly and generate 5 files in `.amanah/atlas/`:

### product.md — What the product is
- Product overview (what it does, who uses it)
- Core domain concepts (define every term)
- User roles and permissions
- Business model (if applicable)

### tech.md — Tech stack details
- Language, framework, version
- All libraries and what they do (read package.json, requirements.txt, etc.)
- Databases (type, version, which features use which)
- External services (APIs, LLMs, payment, email, etc.)
- Dev commands (how to run, test, migrate, deploy)

### structure.md — Code map
- Directory layout with purpose of each folder (top 3 levels)
- Code patterns used (e.g., Model/Service/Router, MVC, etc.)
- Where to find things: models, services, controllers, tests, configs
- File naming conventions

### conventions.md — Rules of the land
- Import order rules
- Naming conventions (files, classes, functions, variables, constants)
- Do's and Don'ts with real code examples from THIS project
- Common gotchas and how to avoid them
- Error handling patterns
- Testing patterns
- Any project-specific rules (e.g., "always filter by tenant_id")

### quickstart.md — Copy-paste recipes
- How to add a new API endpoint (with real code skeleton)
- How to add a new database model (with real base class)
- How to add a new service (with real pattern)
- How to add a new test (with real test structure)
- Common dev commands (run, test, lint, migrate, deploy)

**Atlas rules:**
- Each file: 80-120 lines. Dense, no filler.
- Use REAL names from the codebase (not "MyModel", "YourService")
- Include actual dev commands (not "run your test command")
- Include actual code patterns from the project
- If the project is small, files can be shorter. Don't pad.

## Step 5: Update CLAUDE.md

If `CLAUDE.md` exists, append this section (skip if already present):

```markdown
## Feature Blueprints

Blueprints live in `.amanah/blueprints/{feature-name}/`:
- `what.md` — What the feature must do
- `how.md` — How it's implemented
- `now.md` — Action items (implementation checklist)
- `fix.md` — Bug fix plans (Lite Mode)

**Always read these before modifying code for a feature.**

### Slash Commands
- `/blueprint <name>` — Generate full feature blueprint
- `/fix <name>` — Generate bug fix plan
- `/spec <name>` — Read existing blueprint before working
- `/atlas` — Regenerate atlas from codebase
- `/setup` — Full setup (atlas + commands + skills)
```

## Step 6: Summary

Print a summary of everything that was set up:

```
Amanah Blueprint setup complete!

  Atlas:     .amanah/atlas/ (5 files generated)
  Commands:  .claude/commands/ (5 slash commands)
  Skills:    .claude/skills/amanah-blueprint/
  Agents:    .claude/agents/amanah-blueprint-generator.agent.md
  CLAUDE.md: Updated with blueprint reference

  Try it:
    /blueprint user-authentication
    /fix login-redirect-bug
    /spec existing-feature-name
```

## Rules

- Atlas is the priority — spend most effort on good atlas files
- Read actual code to generate atlas, don't guess
- Keep atlas files under 120 lines each
- If something already exists (atlas, commands, skills), don't overwrite without asking
- Detect stack FIRST so atlas content matches the actual project
