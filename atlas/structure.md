# {Project Name} — Project Structure & Patterns

> **Atlas Map: Code Map**
> Directory layout, code patterns, where things live.
> The blueprint generator reads this to produce file-path-correct specs.

## Directory Layout

```
{project-root}/
├── {dir}/                    # {What goes here}
├── {dir}/                    # {What goes here}
│   └── {subdir}/             # {What goes here}
├── {dir}/                    # {What goes here}
└── {dir}/                    # {What goes here}
```

## Code Patterns

### {Pattern Name} Pattern
```{lang}
# {When to use this pattern}
{code example with imports, class/function definition, key logic}
```

### {Pattern Name} Pattern
```{lang}
{code example}
```

### {Pattern Name} Pattern
```{lang}
{code example}
```

## API Response Format

```json
{"status": "success"|"error", "data": ..., "message": "..."}
```

## Critical Rules

1. **{Rule}** — {Why}
2. **{Rule}** — {Why}
3. **{Rule}** — {Why}

## Key File Locations

| Need to... | Look at... |
|------------|-----------|
| {Add endpoint} | `{path}` |
| {Add business logic} | `{path}` |
| {Add DB model} | `{path}` |
| {Add migration} | `{path}` |
| {Change config} | `{path}` |
