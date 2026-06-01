---
name: amanah-atlas-generator
description: Use for generate atlas, create atlas, setup atlas, initialize atlas, project context, scan project, analyze codebase, generate project maps. Scans any project and auto-generates .amanah/atlas/ context files for the blueprint generator.
version: 1.0.0
---

# Amanah Atlas Generator

Scans any project's codebase and auto-generates `.amanah/atlas/` — persistent project context maps that the blueprint generator reads before creating specs.

## When to Use

- User says "generate atlas", "setup atlas", "create atlas for this project"
- User says "initialize project context", "scan project"
- User runs `/atlas` or `/setup-atlas`
- After installing `.amanah/` in a new project (atlas is the first thing to set up)

## What It Does

```mermaid
flowchart LR
    A[Scan Project] --> B[Detect Stack]
    B --> C[Analyze Patterns]
    C --> D[Extract Conventions]
    D --> E[Generate 5 Atlas Files]
    E --> F[User adds custom maps]

    style A fill:#3498DB,color:#fff
    style B fill:#3498DB,color:#fff
    style C fill:#9B59B6,color:#fff
    style D fill:#9B59B6,color:#fff
    style E fill:#2ECC71,color:#fff
    style F fill:#F39C12,color:#fff
```

## Process

### Step 1: Detect Stack

Check project root for indicators:

| File | Stack |
|------|-------|
| `requirements.txt` / `pyproject.toml` / `setup.py` | Python |
| `package.json` / `tsconfig.json` | Node.js / TypeScript |
| `go.mod` | Go |
| `pom.xml` / `build.gradle` | Java |
| `Cargo.toml` | Rust |
| `Gemfile` | Ruby |
| `composer.json` | PHP |
| `*.csproj` / `*.sln` | .NET / C# |

Also check:
- `CLAUDE.md`, `README.md` for project description
- Framework-specific files: `next.config.js` (Next.js), `django_settings.py` (Django), `fastapi` imports, etc.
- Database files: `prisma/schema.prisma`, `alembic/`, `migrations/`

### Step 2: Read Existing Context

Read in order:
1. `CLAUDE.md` — existing AI instructions
2. `README.md` — project overview
3. `CONTRIBUTING.md` — if exists
4. Framework config files (package.json, requirements.txt, etc.)
5. Any existing `.amanah/` or `.kiro/` context files

### Step 3: Scan Codebase Structure

Run directory listing and pattern detection:

```
1. ls / glob the root directory
2. Identify key directories: src/, api/, app/, lib/, tests/, etc.
3. Find entry points: main.py, index.ts, App.tsx, server.js, etc.
4. Find config: settings.py, .env.example, config.ts, etc.
5. Find database: models/, prisma/, alembic/, migrations/
6. Find tests: tests/, __tests__/, spec/
```

### Step 4: Extract Patterns

Search for recurring code patterns:

- **Model pattern**: grep for `class.*Model` or `schema` or `@Entity`
- **Service pattern**: grep for `class.*Service` or service-like files
- **Router/Controller pattern**: grep for `router` or `@Controller` or `app.get`
- **Test pattern**: grep for `test` or `describe` or `it(`
- **Response format**: grep for `return.*status` or `res.json`

### Step 5: Generate Atlas Files

Generate 5 core atlas files. Each file MUST be filled with REAL content from the project (not templates or placeholders).

#### 5.1 `product.md` — Product Landscape

Generate by reading README + CLAUDE.md:

```markdown
# {Project Name} — Product Overview

## What Is This?
{From README/CLAUDE.md — 1-2 paragraphs}

## Core Concepts
{List 3-8 key architectural concepts found in the code}

## Key User Roles
{List roles found in auth/permissions code}

## Business Model
{From README or inferred from billing/payment code}

## What AI Should Know When Working Here
{3-5 critical rules derived from CLAUDE.md and code patterns}
```

#### 5.2 `tech.md` — Tech Terrain

Generate by analyzing dependencies and config:

```markdown
# {Project Name} — Technology Stack

## Core Stack
{From package.json / requirements.txt / go.mod — language, framework, ORM, etc.}

## Databases
{From config files — DB type, driver, env vars}

## External Services
{From dependencies — payment, email, AI providers, etc.}

## Key Libraries
{Top 10 libraries from dependency file with purposes}

## Architecture Pattern
{From directory structure — Router → Service → Data, or MVC, etc.}

## Auth Flow
{From auth/dependencies code}

## Development Commands
{From package.json scripts / Makefile / README}
```

#### 5.3 `structure.md` — Code Map

Generate by scanning directories and code patterns:

```markdown
# {Project Name} — Project Structure & Patterns

## Directory Layout
{Full tree from glob/ls — annotated with what each dir does}

## Code Patterns
{Actual patterns found in the codebase — with REAL code examples from the project}
### Model Pattern
{Found pattern with example}
### Service Pattern
{Found pattern with example}
### Router/Controller Pattern
{Found pattern with example}

## API Response Format
{From actual API code — JSON shape}

## Critical Rules
{From CLAUDE.md + inferred from code}

## Key File Locations
{Table: "Need to do X → look at Y"}
```

#### 5.4 `conventions.md` — Rules of the Land

Generate by analyzing import patterns, naming, and gotchas:

```markdown
# {Project Name} — Conventions & Gotchas

## Import Order
{From actual import statements in 3-5 files}

## Common Gotchas
{Patterns that look wrong but are intentional, or common mistakes}
{Look for: comments like "IMPORTANT", "NOTE", "DON'T", "FIXME" in code}

## Naming Conventions
{Table derived from actual file/class/function names in the project}

## Response Patterns
{Actual API response shapes from router code}

## Do's and Don'ts
{Inferred from CLAUDE.md rules + code patterns}
```

#### 5.5 `quickstart.md` — Trails to Follow

Generate by analyzing common task patterns:

```markdown
# {Project Name} — Quick Start Recipes

## Common Tasks — Copy-Paste Ready

### Add a New API Endpoint
{Derived from existing router files — exact steps for THIS project}

### Add a New {Project-Specific Concept}
{E.g., for Django: Add a new model. For Next.js: Add a new page.}

## Quick Commands
{From package.json scripts, Makefile, or README}

## Environment Quick Setup
{From README or .env.example}
```

### Step 6: Suggest Custom Maps

After generating the 5 core files, suggest custom atlas maps the user might want to add:

```
Atlas generated successfully! 5 core maps created in .amanah/atlas/

You can also add CUSTOM maps for specific subsystems:
- .amanah/atlas/auth.md          — Deep dive on authentication/authorization
- .amanah/atlas/payments.md      — Payment integration details
- .amanah/atlas/pipeline.md      — Message/data pipeline architecture
- .amanah/atlas/{subsystem}.md   — Any other subsystem deep dive

Custom maps are automatically read by the blueprint generator alongside
the core 5 files. Add them when a subsystem needs more context than
the core maps provide.

To add a custom map: create a new .md file in .amanah/atlas/ and fill
it with subsystem-specific knowledge.
```

## Rules

- **Read everything before writing anything** — Don't generate atlas files until the full codebase scan is complete
- **Use REAL content** — Never use placeholder text like `{project_name}`. Every line should be actual project knowledge
- **Extract from code, not imagination** — Patterns, conventions, and gotchas come from reading actual source files
- **Read at least 5 source files** per atlas file to ensure accuracy
- **Verify file paths** — Every path mentioned in atlas must actually exist (glob/grep verify)
- **Adapt to stack** — Don't force Python patterns on a TypeScript project. Detect and adapt
- **Keep it concise** — Each atlas file should be 50-150 lines. Dense, useful, no fluff
- **Custom maps are user-driven** — Only suggest custom map topics, don't auto-generate them
- **Preserve existing atlas** — If `.amanah/atlas/` already has files, ask before overwriting. Only regenerate files the user requests

## Validation

After generating atlas files, verify:

- [ ] All 5 core files exist: product.md, tech.md, structure.md, conventions.md, quickstart.md
- [ ] No placeholder text ({}, TODO, FIXME, "placeholder")
- [ ] File paths mentioned in files actually exist in the project
- [ ] Code examples are from actual project files (not made up)
- [ ] Import statements match what's actually in the source files
- [ ] Commands work (from package.json scripts / Makefile)
- [ ] Naming conventions match actual file/class names
- [ ] No contradictions between atlas files (e.g., tech.md says PostgreSQL but structure.md says MySQL)

## Output Format

After completion, show the user:

```
Atlas generated in .amanah/atlas/

| File | Lines | Content |
|------|-------|---------|
| product.md | {N} | {Brief: what concepts are covered} |
| tech.md | {N} | {Brief: what stack/libraries documented} |
| structure.md | {N} | {Brief: what patterns documented} |
| conventions.md | {N} | {Brief: what gotchas/rules listed} |
| quickstart.md | {N} | {Brief: what recipes included} |

The blueprint generator will now read these files before generating
any blueprint in this project.

To add custom maps for specific subsystems:
  .amanah/atlas/{subsystem}.md

To regenerate a specific map:
  "regenerate atlas tech.md"
```
