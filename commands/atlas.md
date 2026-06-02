---
description: Generate project atlas (5 context maps from codebase)
---

# Generate Atlas

## Step 1: Detect Stack

Check project files to determine the tech stack:
- `CLAUDE.md`, `README.md`, `package.json`, `requirements.txt`, `go.mod`, `Cargo.toml`, etc.
- Directory structure (`src/`, `api/`, `app/`, etc.)
- Framework indicators (Next.js, Django, FastAPI, Express, Spring Boot, etc.)

## Step 2: Scan the Codebase

Research the project thoroughly:
- Read CLAUDE.md and README.md for project overview
- List directory structure (top 3 levels)
- Identify all models, services, routers/controllers
- Find external service integrations (databases, APIs, LLMs)
- Extract coding patterns and conventions
- Look for gotchas, TODOs, anti-patterns in existing code

## Step 3: Generate 5 Atlas Files

Create these in `.amanah/atlas/`:

### product.md
- What the product is and who uses it
- Core concepts and domain terms
- User roles and permissions
- Business model (if applicable)

### tech.md
- Language, framework, version
- Libraries and their purposes
- Databases (types, which features use which)
- External services (APIs, LLMs, payment, etc.)
- Dev commands (run, test, migrate, deploy)

### structure.md
- Directory layout with purpose of each folder
- Code patterns used (e.g., Model/Service/Router)
- Where to find: models, services, routers, tests, configs
- File naming conventions

### conventions.md
- Import order
- Naming rules (files, classes, functions, variables)
- Do's and Don'ts with examples
- Common gotchas and how to avoid them
- Error handling patterns
- Testing patterns

### quickstart.md
- Copy-paste recipes for common tasks:
  - Add a new API endpoint
  - Add a new database model
  - Add a new service
  - Add a new test
  - Run common dev commands

## Rules

- Each file should be 80-120 lines — dense, no filler
- Use real names from the actual codebase (not placeholders)
- Include actual dev commands (not "run your test command")
- Commit atlas files to the repo (they're project documentation)
