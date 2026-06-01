# {Project Name} — Conventions & Gotchas

> **Atlas Map: Rules of the Land**
> Coding conventions, common pitfalls, naming rules.
> The blueprint generator reads this to avoid generating code that violates project standards.

## Import Order

```{lang}
# 1. stdlib
{imports}

# 2. third-party
{imports}

# 3. local
{imports}
```

## Common Gotchas

### {Gotcha Title}
```{lang}
# Bad
{wrong code}

# Good
{right code}
```

### {Gotcha Title}
```{lang}
{explanation with code}
```

### {Gotcha Title}
```{lang}
{explanation with code}
```

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| {Model class} | {PascalCase + "Model"} | `{Example}Model` |
| {Table name} | {snake_case plural} | `{examples}` |
| {Service class} | {PascalCase + "Service"} | `{Example}Service` |
| {Router file} | {snake_case} | `{example}.py` |
| {API prefix} | {kebab-case} | `/{example}` |
| {Migration} | {date prefix} | `{YYYYMMDD}_add_...` |

## Response Patterns

```{lang}
# Success
{pattern}

# Error
{pattern}

# Paginated
{pattern}
```

## Do's and Don'ts

| Do | Don't |
|----|-------|
| {Good practice} | {Bad practice} |
| {Good practice} | {Bad practice} |
